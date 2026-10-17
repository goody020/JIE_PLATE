"use client";

import Link from "next/link";
import { useTransition } from "react";
import {
  BarChart3,
  ClipboardCheck,
  ClipboardList,
  LogOut,
  Settings,
  ShieldCheck,
  ShoppingBag,
  Store,
  UtensilsCrossed,
} from "lucide-react";
import { logoutAction } from "@/app/logout-action";

interface GlobalNavClientProps {
  isLoggedIn: boolean;
  role: "customer" | "vendor" | "admin";
  accountStatus: string | null;
}

export default function GlobalNavClient({
  isLoggedIn,
  role,
  accountStatus,
}: GlobalNavClientProps) {
  const [loggingOut, startTransition] = useTransition();

  function handleLogout() {
    startTransition(async () => {
      await logoutAction();
      window.location.href = "/login";
    });
  }

  const isAdmin =
    role === "admin" && accountStatus === "active";

  const isApprovedVendor =
    role === "vendor" && accountStatus === "approved";

  const isPendingVendor =
    role === "vendor" && accountStatus !== "approved";

  return (
    <header className="sticky top-0 z-40 bg-[#0a0a0a] border-b border-[#333333]">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between gap-6">
        <Link
          href={
            isAdmin
              ? "/admin"
              : isApprovedVendor
                ? "/vendor/dashboard"
                : "/"
          }
          className="flex items-center gap-3 shrink-0"
        >
          <span className="w-9 h-9 rounded-full bg-[#FF5500] text-white flex items-center justify-center font-bold">
            J
          </span>

          <span className="text-white font-bold tracking-tight">
            Bufer Feast
          </span>
        </Link>

        {isAdmin ? (
          <nav className="hidden md:flex items-center gap-5 text-sm font-bold">
            <Link
              href="/admin"
              className="text-[#a0a0a0] hover:text-white flex items-center gap-2"
            >
              <BarChart3 size={16} />
              Admin Dashboard
            </Link>

            <Link
              href="/admin/vendor-applications"
              className="text-[#a0a0a0] hover:text-white flex items-center gap-2"
            >
              <ClipboardCheck size={16} />
              Vendors
            </Link>

            <Link
              href="/admin/orders"
              className="text-[#a0a0a0] hover:text-white flex items-center gap-2"
            >
              <ShoppingBag size={16} />
              Orders
            </Link>

            <Link
              href="/admin/security"
              className="text-[#a0a0a0] hover:text-white flex items-center gap-2"
            >
              <ShieldCheck size={16} />
              Security
            </Link>

            <Link
              href="/kitchens"
              className="text-[#a0a0a0] hover:text-white flex items-center gap-2"
            >
              <Store size={16} />
              Marketplace
            </Link>
          </nav>
        ) : isApprovedVendor ? (
          <nav className="hidden md:flex items-center gap-5 text-sm font-bold">
            <Link
              href="/vendor/dashboard"
              className="text-[#a0a0a0] hover:text-white flex items-center gap-2"
            >
              <BarChart3 size={16} />
              Dashboard
            </Link>

            <Link
              href="/vendor/menus"
              className="text-[#a0a0a0] hover:text-white flex items-center gap-2"
            >
              <UtensilsCrossed size={16} />
              Menus
            </Link>

            <Link
              href="/vendor/orders"
              className="text-[#a0a0a0] hover:text-white flex items-center gap-2"
            >
              <ShoppingBag size={16} />
              Orders
            </Link>

            <Link
              href="/vendor/prep-sheet"
              className="text-[#a0a0a0] hover:text-white flex items-center gap-2"
            >
              <ClipboardList size={16} />
              Prep Sheet
            </Link>

            <Link
              href="/vendor/settings"
              className="text-[#a0a0a0] hover:text-white flex items-center gap-2"
            >
              <Settings size={16} />
              Settings
            </Link>
          </nav>
        ) : isPendingVendor ? (
          <nav className="hidden md:flex items-center gap-5 text-sm font-bold">
            <Link
              href="/vendor/pending"
              className="text-yellow-300 hover:text-yellow-200"
            >
              Vendor Application Pending
            </Link>

            <Link
              href="/"
              className="text-[#a0a0a0] hover:text-white"
            >
              Home
            </Link>
          </nav>
        ) : (
          <nav className="flex items-center gap-3 overflow-x-auto text-xs font-bold md:gap-6 md:text-sm">
            <Link
              href="/"
              className="text-[#a0a0a0] hover:text-white"
            >
              Home
            </Link>

            <Link
              href="/kitchens"
              className="text-[#a0a0a0] hover:text-white"
            >
              Find Food
            </Link>

            <Link
              href="/basket"
              className="text-[#a0a0a0] hover:text-white"
            >
              Basket
            </Link>

            <Link
              href="/orders"
              className="text-[#a0a0a0] hover:text-white"
            >
              My Orders
            </Link>

            <Link
              href="/account"
              className="text-[#a0a0a0] hover:text-white"
            >
              Account
            </Link>
          </nav>
        )}

        {isLoggedIn && (
          <button
            type="button"
            onClick={handleLogout}
            disabled={loggingOut}
            className="flex items-center gap-2 rounded-xl bg-red-500/10 px-4 py-2 text-sm font-bold text-red-400 hover:bg-red-500/20 disabled:opacity-50"
          >
            <LogOut size={16} />
            {loggingOut ? "Logging out..." : "Logout"}
          </button>
        )}
      </div>
    </header>
  );
}