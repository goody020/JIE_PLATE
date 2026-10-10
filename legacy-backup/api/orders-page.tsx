import { authClient } from "@/lib/server/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { ShoppingBag, Clock, CheckCircle, Truck, AlertTriangle, ChefHat, Calendar } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function OrdersPage({ searchParams }: { searchParams: { success?: string } }) {
  const client = await authClient();

  // 1. Get the current user
  const { data: { user } } = await client.auth.getUser();
  if (!user) redirect("/login");

  // 2. Fetch orders and their items
  const { data: orders } = await client
    .from("orders")
    .select("*, order_items(*)")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  return (
    <div className="min-h-screen bg-[#faf9f5] py-12 px-4">
      <div className="max-w-4xl mx-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-[#183e32] flex items-center gap-3">
              <ShoppingBag className="text-[#90a765]" size={32} />
              My Orders
            </h1>
            <p className="text-gray-500 mt-1 ml-11">Track your delicious meals.</p>
          </div>
          <Link href="/" className="text-sm font-bold text-[#183e32] hover:text-[#90a765] transition-colors">
            ← Back to Home
          </Link>
        </div>

        {/* Success Banner (Shows after placing an order) */}
        {searchParams.success === "true" && (
          <div className="bg-green-50 border border-green-200 text-green-700 p-4 rounded-xl flex items-center gap-3 mb-8 animate-in fade-in slide-in-from-top-2">
            <CheckCircle size={20} className="text-green-600 shrink-0" />
            <div>
              <p className="font-bold text-sm">Order Placed Successfully!</p>
              <p className="text-xs mt-0.5">The kitchen has received your order and will start preparing it soon.</p>
            </div>
          </div>
        )}

        {/* Orders List */}
        {orders && orders.length > 0 ? (
          <div className="space-y-6">
            {orders.map((order: any) => (
              <div key={order.id} className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
                
                {/* Order Header */}
                <div className="bg-gray-50 px-6 py-4 border-b border-gray-100 flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div>
                      <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">Order ID</p>
                      <p className="font-bold text-[#183e32]">#{order.id.slice(0, 8).toUpperCase()}</p>
                    </div>
                    <div className="h-8 w-px bg-gray-300"></div>
                    <div>
                      <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">Date</p>
                      <p className="text-sm font-medium text-gray-700 flex items-center gap-1">
                        <Calendar size={12} />
                        {new Date(order.created_at).toLocaleDateString()}
                      </p>
                    </div>
                  </div>

                  {/* Status Badge */}
                  <span className={`px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5 ${
                    order.status === "pending" ? "bg-yellow-100 text-yellow-700" :
                    order.status === "preparing" ? "bg-blue-100 text-blue-700" :
                    order.status === "out for delivery" ? "bg-purple-100 text-purple-700" :
                    "bg-green-100 text-green-700"
                  }`}>
                    {order.status === "pending" && <Clock size={12} />}
                    {order.status === "preparing" && <ChefHat size={12} />}
                    {order.status === "out for delivery" && <Truck size={12} />}
                    {order.status === "delivered" && <CheckCircle size={12} />}
                    {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                  </span>
                </div>

                {/* Order Body */}
                <div className="p-6">
                  {/* Items */}
                  <div className="space-y-3 mb-6">
                    {order.order_items?.map((item: any, idx: number) => (
                      <div key={idx} className="flex justify-between items-center py-2 border-b border-gray-50 last:border-0">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                            <ShoppingBag size={16} className="text-gray-400" />
                          </div>
                          <div>
                            <p className="font-medium text-gray-900 text-sm">Dish Item</p>
                            <p className="text-xs text-gray-500">{item.headcount} people</p>
                          </div>
                        </div>
                        <p className="font-bold text-gray-900">₦{item.total_price?.toLocaleString()}</p>
                      </div>
                    ))}
                  </div>

                  {/* Details Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-gray-100">
                    <div>
                      <p className="text-xs font-bold text-gray-500 uppercase mb-1">Delivery Address</p>
                      <p className="text-sm text-gray-700">{order.delivery_address}</p>
                    </div>
                    <div>
                      <p className="text-xs font-bold text-gray-500 uppercase mb-1">Event Type</p>
                      <p className="text-sm text-gray-700 capitalize">{order.event_type}</p>
                    </div>
                    
                    {/* Allergy Warning */}
                    {order.allergies && (
                      <div className="md:col-span-2 bg-orange-50 border border-orange-200 p-3 rounded-lg flex items-start gap-2">
                        <AlertTriangle size={16} className="text-orange-600 shrink-0 mt-0.5" />
                        <div>
                          <p className="text-xs font-bold text-orange-700 uppercase">Dietary Notes</p>
                          <p className="text-sm text-orange-800">{order.allergies}</p>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Total */}
                  <div className="mt-6 pt-4 border-t border-gray-200 flex justify-between items-center">
                    <span className="text-gray-600 font-medium">Total Paid</span>
                    <span className="text-2xl font-bold text-[#183e32]">{order.total_price?.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-gray-300">
            <ShoppingBag className="mx-auto h-12 w-12 text-gray-300 mb-4" />
            <h3 className="text-lg font-medium text-gray-900">No orders yet</h3>
            <p className="text-gray-500 mt-1 mb-6">You haven't placed any orders yet. Let's fix that!</p>
            <Link href="/" className="inline-flex items-center gap-2 px-6 py-3 bg-[#183e32] text-white font-bold rounded-xl hover:bg-[#90a765] hover:text-[#183e32] transition-all">
              Browse Kitchens
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}