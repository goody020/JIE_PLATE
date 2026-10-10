"use server";

import { createClient } from "@supabase/supabase-js";
import { redirect } from "next/navigation";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function submitSupportRequest(formData: FormData) {
  const email = formData.get("email") as string;
  const subject = formData.get("subject") as string;
  const message = formData.get("message") as string;

  const { error } = await supabase.from("support_requests").insert({
    email,
    subject,
    message,
    status: "open",
  });

  if (error) {
    console.error("Support request error:", error);
    throw new Error("Failed to submit support request. Please try again.");
  }

  redirect("/?message=Support request submitted successfully! We will contact you soon.");
}