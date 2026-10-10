import Link from "next/link";
import {
  BarChart3,
  CheckSquare,
  ShieldCheck,
  ShoppingBag,
  Store,
  Users,
} from "lucide-react";
import { requireAdmin } from "@/lib/server/auth";
import { adminClient } from "@/lib/server/admin";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  await requireAdmin();

  const admin = adminClient();

  const { count: pendingApplications, error: applicationsError } =
    await admin
      .from("fernami_vendor_applications")
      .select("user_id", {
        count: "exact",
        head: true,
      })
      .in("status", ["pending_review", "pending"]);

  if (applicationsError) {
    console.error(
      "Pending applications count error:",
      applicationsError.message,
    );
  }

  const { count: activeVendors, error: vendorsError } =
    await admin
      .from("profiles")
      .select("id", {
        count: "exact",
        head: true,
      })
      .eq("role", "vendor")
      .in("status", ["active", "approved"]);

  if (vendorsError) {
    console.error(
      "Active vendors count error:",
      vendorsError.message,
    );
  }

  const { count: totalCustomers, error: customersError } =
    await admin
      .from("profiles")
      .select("id", {
        count: "exact",
        head: true,
      })
      .eq("role", "customer");

  if (customersError) {
    console.error(
      "Customer count error:",
      customersError.message,
    );
  }

  const { count: totalOrders, error: ordersError } =
    await admin
      .from("orders")
      .select("id", {
        count: "exact",
        head: true,
      });

  if (ordersError) {
    console.error(
      "Order count error:",
      ordersError.message,
    );
  }

  return (
    <div className="mx-auto max-w-7xl space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">
          Admin Dashboard
        </h1>

        <p className="mt-2 text-gray-500">
          Manage trust, vendors, and marketplace operations.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
        <DashboardCard
          href="/admin/vendor-applications"
          title="Pending Vendor Applications"
          value={pendingApplications ?? 0}
          description="Review applications"
          icon={<CheckSquare size={28} />}
          iconClass="bg-green-100 text-green-600"
          linkClass="text-green-700"
        />

        <DashboardCard
          href="/admin/vendor-applications"
          title="Active Vendors"
          value={activeVendors ?? 0}
          description="Manage approved vendors"
          icon={<Store size={28} />}
          iconClass="bg-orange-100 text-orange-600"
          linkClass="text-orange-700"
        />

        <DashboardCard
          href="/admin/customers"
          title="Customers"
          value={totalCustomers ?? 0}
          description="View customer accounts"
          icon={<Users size={28} />}
          iconClass="bg-purple-100 text-purple-600"
          linkClass="text-purple-700"
        />

        <DashboardCard
          href="/admin/orders"
          title="Orders"
          value={totalOrders ?? 0}
          description="Monitor marketplace orders"
          icon={<ShoppingBag size={28} />}
          iconClass="bg-blue-100 text-blue-600"
          linkClass="text-blue-700"
        />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Link
          href="/admin/vendor-applications"
          className="group rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition hover:border-green-300 hover:shadow-md"
        >
          <div className="mb-4 flex items-center justify-between">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-100 text-green-600">
              <CheckSquare size={26} />
            </div>

            <span className="text-sm font-semibold text-green-700 group-hover:underline">
              Review applications →
            </span>
          </div>

          <h2 className="text-xl font-bold text-gray-900">
            Vendor applications
          </h2>

          <p className="mt-2 text-sm leading-6 text-gray-500">
            Review submitted business details, identity documents, CAC
            certificates, and approval requests.
          </p>
        </Link>

        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
            <ShieldCheck size={28} />
          </div>

          <h2 className="text-xl font-bold text-gray-900">
            Platform Security
          </h2>

          <p className="mt-2 text-sm leading-6 text-gray-500">
            Admin access is restricted to active administrator profiles.
            Vendor authorization is checked against database role and status.
          </p>

          <div className="mt-5 inline-flex rounded-full bg-green-100 px-3 py-1 text-xs font-bold text-green-700">
            Protected
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
        <div className="flex items-center gap-3">
          <BarChart3 className="text-gray-700" size={24} />

          <h2 className="text-xl font-bold text-gray-900">
            Quick status
          </h2>
        </div>

        <div className="mt-5 grid grid-cols-1 gap-4 text-sm md:grid-cols-3">
          <StatusItem
            label="Applications awaiting review"
            value={pendingApplications ?? 0}
            tone="yellow"
          />

          <StatusItem
            label="Active vendors"
            value={activeVendors ?? 0}
            tone="green"
          />

          <StatusItem
            label="Total orders"
            value={totalOrders ?? 0}
            tone="blue"
          />
        </div>
      </div>
    </div>
  );
}

function DashboardCard({
  href,
  title,
  value,
  description,
  icon,
  iconClass,
  linkClass,
}: {
  href: string;
  title: string;
  value: number;
  description: string;
  icon: React.ReactNode;
  iconClass: string;
  linkClass: string;
}) {
  return (
    <Link
      href={href}
      className="group rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition hover:shadow-md"
    >
      <div
        className={`mb-5 flex h-12 w-12 items-center justify-center rounded-xl ${iconClass}`}
      >
        {icon}
      </div>

      <p className="text-sm text-gray-500">
        {title}
      </p>

      <p className="mt-2 text-4xl font-bold text-gray-900">
        {value}
      </p>

      <p
        className={`mt-4 text-sm font-semibold group-hover:underline ${linkClass}`}
      >
        {description} →
      </p>
    </Link>
  );
}

function StatusItem({
  label,
  value,
  tone,
}: {
  label: string;
  value: number;
  tone: "yellow" | "green" | "blue";
}) {
  const toneClasses = {
    yellow: "bg-yellow-50 text-yellow-800",
    green: "bg-green-50 text-green-800",
    blue: "bg-blue-50 text-blue-800",
  };

  return (
    <div className={`rounded-xl p-4 ${toneClasses[tone]}`}>
      <p className="text-xs font-bold uppercase tracking-wide">
        {label}
      </p>

      <p className="mt-2 text-2xl font-bold">
        {value}
      </p>
    </div>
  );
}