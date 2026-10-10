"use client";

import Link from "next/link";
import { ArrowRight, Minus, Plus, Trash2 } from "lucide-react";
import { useCart } from "@/context/cart-context";

export function BasketView() {
  const {
    items,
    ready,
    total,
    updateQuantity,
    removeItem,
  } = useCart();

  if (!ready) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-20 text-center text-[#a0a0a0]">
        Loading your basket...
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-20 text-center">
        <h1 className="text-4xl font-bold text-white">
          Your basket is empty
        </h1>

        <p className="text-[#a0a0a0] mt-3 mb-8">
          Browse our partner kitchens and choose your meals.
        </p>

        <Link
          href="/kitchens"
          className="inline-flex items-center gap-2 px-6 py-3 bg-[#FF5500] text-white font-bold rounded-xl"
        >
          Browse Kitchens
          <ArrowRight size={18} />
        </Link>
      </div>
    );
  }

  const vendorName = items[0].vendorName;

  return (
    <div className="max-w-6xl mx-auto px-4 py-12 min-h-screen">
      <p className="text-[#FF5500] text-xs font-bold tracking-widest uppercase">
        YOUR ORDER
      </p>

      <h1 className="text-4xl font-bold text-white mt-2">
        Your basket
      </h1>

      <p className="text-[#a0a0a0] mt-2 mb-8">
        Ordering from {vendorName}. One kitchen per basket.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => (
            <article
              key={item.id}
              className="bg-[#111111] border border-[#333333] rounded-2xl p-6"
            >
              <div className="flex justify-between gap-4">
                <div>
                  <h2 className="text-xl font-bold text-white">
                    {item.dishName}
                  </h2>

                  <p className="text-sm text-[#a0a0a0] mt-1">
                    ₦{item.basePrice.toLocaleString()} per person
                  </p>

                  <div className="flex items-center gap-3 mt-5">
                    <button
                      type="button"
                      onClick={() =>
                        updateQuantity(item.id, item.headcount - 1)
                      }
                      className="w-9 h-9 rounded-lg bg-[#1a1a1a] border border-[#333333] text-white"
                    >
                      <Minus size={15} className="mx-auto" />
                    </button>

                    <span className="text-white font-bold min-w-20 text-center">
                      {item.headcount} people
                    </span>

                    <button
                      type="button"
                      onClick={() =>
                        updateQuantity(item.id, item.headcount + 1)
                      }
                      className="w-9 h-9 rounded-lg bg-[#1a1a1a] border border-[#333333] text-white"
                    >
                      <Plus size={15} className="mx-auto" />
                    </button>
                  </div>
                </div>

                <div className="text-right">
                  <p className="text-xl font-bold text-white">
                    ₦{item.totalPrice.toLocaleString()}
                  </p>

                  <button
                    type="button"
                    onClick={() => removeItem(item.id)}
                    className="mt-4 text-[#a0a0a0] hover:text-red-400"
                    aria-label={`Remove ${item.dishName}`}
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>

        <aside className="bg-[#111111] border border-[#333333] rounded-2xl p-6 h-fit lg:sticky lg:top-24">
          <h2 className="text-2xl font-bold text-white">Summary</h2>

          <div className="flex justify-between mt-6 text-[#a0a0a0]">
            <span>Food subtotal</span>
            <strong className="text-white">
              ₦{total.toLocaleString()}
            </strong>
          </div>

          <div className="flex justify-between mt-3 text-[#a0a0a0] text-sm">
            <span>Delivery</span>
            <span>Calculated at checkout</span>
          </div>

          <div className="border-t border-[#333333] mt-6 pt-5 flex justify-between">
            <span className="font-bold text-white">Estimated total</span>
            <strong className="text-[#FF5500] text-xl">
              ₦{total.toLocaleString()}
            </strong>
          </div>

          <Link
            href="/checkout"
            className="mt-6 w-full flex items-center justify-center gap-2 bg-[#FF5500] text-white font-bold py-3 rounded-xl"
          >
            Continue to checkout
            <ArrowRight size={17} />
          </Link>
        </aside>
      </div>
    </div>
  );
}