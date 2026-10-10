import { NextResponse } from "next/server";
import { authClient } from "@/lib/server/auth";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  const next = url.searchParams.get("next") || "/login";

  if (!code) {
    return NextResponse.redirect(
      new URL("/login?error=invalid_confirmation_link", url.origin),
    );
  }

  const client = await authClient();

  const { error } = await client.auth.exchangeCodeForSession(code);

  if (error) {
    return NextResponse.redirect(
      new URL("/login?error=confirmation_failed", url.origin),
    );
  }

  return NextResponse.redirect(
    new URL(`${next}?verified=1`, url.origin),
  );
}