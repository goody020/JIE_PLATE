import "server-only";

import crypto from "node:crypto";
import { createClient } from "@supabase/supabase-js";
import { canonicalSupabaseUrl } from "@/lib/server/supabase-url";

const PAYSTACK_API = "https://api.paystack.co";

function secretKey() {
  const key = process.env.PAYSTACK_SECRET_KEY?.trim();
  if (!key) throw new Error("PAYSTACK_SECRET_KEY is not configured.");
  return key;
}

export function verifyPaystackSignature(payload: string, signature: string | null) {
  if (!signature) return false;
  const digest = crypto
    .createHmac("sha512", secretKey())
    .update(payload)
    .digest("hex");
  const expected = Buffer.from(digest);
  const received = Buffer.from(signature);
  return expected.length === received.length && crypto.timingSafeEqual(expected, received);
}

export async function initializePaystackPayment({
  email,
  orderId,
  amountNaira,
}: {
  email: string;
  orderId: string;
  amountNaira: number;
}) {
  if (!Number.isInteger(amountNaira) || amountNaira <= 0) {
    throw new Error("The order amount is invalid.");
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "");
  if (!siteUrl) throw new Error("NEXT_PUBLIC_SITE_URL is not configured.");

  const reference = `jie_${orderId}_${crypto.randomBytes(6).toString("hex")}`;
  const response = await fetch(`${PAYSTACK_API}/transaction/initialize`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${secretKey()}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      amount: amountNaira * 100,
      currency: "NGN",
      reference,
      callback_url: `${siteUrl}/api/payments/callback`,
      metadata: { order_id: orderId },
    }),
    cache: "no-store",
  });

  const result = (await response.json()) as {
    status: boolean;
    message?: string;
    data?: { authorization_url: string; access_code: string; reference: string };
  };

  if (!response.ok || !result.status || !result.data?.authorization_url) {
    throw new Error(result.message || "Paystack could not initialize payment.");
  }

  return result.data;
}

export async function verifyPaystackPayment(reference: string) {
  const response = await fetch(
    `${PAYSTACK_API}/transaction/verify/${encodeURIComponent(reference)}`,
    {
      headers: { Authorization: `Bearer ${secretKey()}` },
      cache: "no-store",
    },
  );

  const result = (await response.json()) as {
    status: boolean;
    message?: string;
    data?: {
      status: string;
      reference: string;
      amount: number;
      currency: string;
      channel: string;
      paid_at: string | null;
      metadata?: { order_id?: string };
    };
  };

  if (!response.ok || !result.status || !result.data) {
    throw new Error(result.message || "Paystack payment verification failed.");
  }

  return result.data;
}

export async function markOrderPaid(reference: string) {
  const payment = await verifyPaystackPayment(reference);
  if (payment.status !== "success" || payment.currency !== "NGN") return { paid: false, payment };

  const orderId = payment.metadata?.order_id;
  if (!orderId || payment.reference !== reference) return { paid: false, payment };

  const supabaseUrl = canonicalSupabaseUrl(process.env.SUPABASE_URL);
  const supabaseSecret = process.env.SUPABASE_SECRET_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!supabaseSecret) throw new Error("A server-only Supabase secret is not configured.");
  const client = createClient(supabaseUrl, supabaseSecret, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
  const { data: order, error: orderError } = await client
    .from("orders")
    .select("id, total_price, payment_status")
    .eq("id", orderId)
    .eq("payment_reference", reference)
    .maybeSingle();

  if (orderError) throw new Error(orderError.message);
  if (!order) return { paid: false, payment };

  const expectedKobo = Math.round(Number(order.total_price) * 100);
  if (payment.amount !== expectedKobo) {
    throw new Error("Paystack amount does not match the order amount.");
  }

  if (order.payment_status !== "paid") {
    const { error } = await client
      .from("orders")
      .update({
        payment_status: "paid",
        payment_paid_at: payment.paid_at || new Date().toISOString(),
        payment_channel: payment.channel,
      })
      .eq("id", order.id)
      .eq("payment_reference", reference)
      .neq("payment_status", "paid");
    if (error) throw new Error(error.message);
  }

  return { paid: true, payment, orderId };
}
