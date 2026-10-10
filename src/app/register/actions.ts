"use server";

import { redirect } from "next/navigation";
import { createClient } from "@supabase/supabase-js";

function getField(formData: FormData, name: string) {
  const value = formData.get(name);

  return typeof value === "string" ? value.trim() : "";
}

function publicSupabaseClient() {
  const url =
    process.env.NEXT_PUBLIC_SUPABASE_URL ||
    process.env.SUPABASE_URL;

  const key =
    process.env.SUPABASE_PUBLISHABLE_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url) {
    throw new Error("Missing Supabase URL.");
  }

  if (!key) {
    throw new Error("Missing Supabase publishable key.");
  }

  return createClient(url, key, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}

function siteUrl() {
  return (
    process.env.NEXT_PUBLIC_SITE_URL ||
    "http://localhost:3000"
  );
}

export async function registerCustomer(
  formData: FormData,
): Promise<void> {
  const email = getField(formData, "email").toLowerCase();
  const password = getField(formData, "password");

  const firstName = getField(formData, "first_name");
  const lastName = getField(formData, "last_name");
  const phone = getField(formData, "phone");

  const birthday = getField(formData, "birthday");
  const referralCode = getField(formData, "referral_code");
  const primaryAddress = getField(
    formData,
    "primary_address",
  );

  const marketingOptIn =
    formData.get("marketing_opt_in") === "on" ||
    formData.get("marketing_opt_in") === "true";

  if (!email || !password || !firstName || !lastName || !phone) {
    throw new Error(
      "Please complete all required account fields.",
    );
  }

  if (!primaryAddress) {
    throw new Error("Please enter your primary delivery address.");
  }

  if (password.length < 8) {
    throw new Error(
      "Password must contain at least 8 characters.",
    );
  }

  const supabase = publicSupabaseClient();

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${siteUrl()}/auth/callback`,
      data: {
        full_name: `${firstName} ${lastName}`,
        phone,
        role: "customer",
        birthday: birthday || null,
        referral_code: referralCode || null,
        marketing_opt_in: marketingOptIn,
        primary_address: primaryAddress,
      },
    },
  });

  if (error) {
    throw new Error(error.message);
  }

  if (!data.user) {
    throw new Error("The customer account could not be created.");
  }

  redirect(
    `/check-email?type=customer&email=${encodeURIComponent(email)}`,
  );
}