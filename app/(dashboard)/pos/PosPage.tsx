"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { Search, ShoppingCart, Dog, Minus, Plus, Trash2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const CATEGORIES = ["All", "Food", "Toys", "Medicine", "Grooming"] as const;

type Product = {
  id: number;
  sku: number;
  name: string | null;
  brand: string;
  stok: number;
  hargapokok: number;
  hargajual: number;
  kategori: string;
  imageUrl: string;
  deskripsi: string;
  createdAt: Date;
  updatedAt: Date;
};

const MOCK_CUSTOMERS = [
  { id: "c1", label: "Golden Retriever - Max's Owner" },
  { id: "c2", label: "Persian Cat - Luna's Owner" },
  { id: "c3", label: "Beagle - Buddy's Owner" },
  { id: "c4", label: "Walk-in Customer" },
];

type CartItem = { product: Product; qty: number };

const TAX_RATE = 0.08;
const DISCOUNT_PERCENT = 0;
const CART_STORAGE_KEY = "pawsome-pos-cart";
const CUSTOMER_STORAGE_KEY = "pawsome-pos-customer";

type POSPageProps = {
  products: Product[];
};

export default function POSPage({ products }: POSPageProps) {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<(typeof CATEGORIES)[number]>("All");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedCustomer, setSelectedCustomer] = useState<string | null>("c4");

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchSearch =
        !search || p.name?.toLowerCase().includes(search.toLowerCase());
      const matchCategory = category === "All" || p.kategori === category;
      return matchSearch && matchCategory;
    });
  }, [search, category]);

  const addToCart = (product: (typeof products)[0], qty = 1) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.product.id === product.id);
      if (existing)
        return prev.map((i) =>
          i.product.id === product.id ? { ...i, qty: i.qty + qty } : i,
        );
      return [...prev, { product, qty }];
    });
  };

  const updateQty = (productId: number, delta: number) => {
    setCart((prev) =>
      prev
        .map((i) =>
          i.product.id === productId
            ? { ...i, qty: Math.max(0, i.qty + delta) }
            : i,
        )
        .filter((i) => i.qty > 0),
    );
  };

  const removeFromCart = (productId: number) => {
    setCart((prev) => prev.filter((i) => i.product.id !== productId));
  };

  const subtotal = cart.reduce(
    (sum, i) => sum + i.product.hargajual * i.qty,
    0,
  );
  const discount = subtotal * (DISCOUNT_PERCENT / 100);
  const afterDiscount = subtotal - discount;
  const tax = afterDiscount * TAX_RATE;
  const total = afterDiscount + tax;

  const goToCheckout = () => {
    if (cart.length === 0) return;
    try {
      sessionStorage.setItem(
        CART_STORAGE_KEY,
        JSON.stringify({
          items: cart,
          customerId: selectedCustomer,
          total,
          subtotal,
          tax,
        }),
      );
      sessionStorage.setItem(CUSTOMER_STORAGE_KEY, selectedCustomer ?? "");
    } catch {}
    router.push("/checkout");
  };

  return (
    <div className="flex h-[calc(100vh-8rem)] flex-col lg:flex-row lg:h-[calc(100vh-6rem)]">
      <div className="flex flex-1 flex-col overflow-hidden">
        <header className="mb-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <h1 className="text-xl font-semibold tracking-tight text-[#1F2937]">
            Point of Sale
          </h1>
          <div className="relative w-full sm:max-w-xs">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[hsl(var(--muted-foreground))]" />
            <Input
              placeholder="Cari produk..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="rounded-xl pl-9"
            />
          </div>
        </header>

        <div className="mb-4 flex flex-wrap gap-2">
          {CATEGORIES.map((cat) => (
            <Button
              key={cat}
              variant={category === cat ? "default" : "outline"}
              size="sm"
              className="rounded-xl"
              onClick={() => setCategory(cat)}
            >
              {cat}
            </Button>
          ))}
        </div>

        <div className="grid flex-1 gap-3 overflow-auto rounded-2xl sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
          {filteredProducts.map((product) => (
            <Card
              key={product.id}
              className="glass-card cursor-pointer overflow-hidden rounded-2xl border-0 transition-shadow hover:shadow-glass-lg"
              onClick={() => addToCart(product)}
            >
              <CardContent className="p-4">
                <p className="font-medium text-[#1F2937]">{product.name}</p>
                <p className="text-sm text-[hsl(var(--muted-foreground))]">
                  {product.kategori}
                </p>
                <p className="mt-2 text-lg font-semibold text-[#F97316]">
                  Rp {(product.hargajual * 15000).toLocaleString("id-ID")}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <aside className="glass flex w-full flex-col border-l border-[var(--glass-border)] lg:w-[380px] lg:min-w-[380px]">
        <div className="flex h-full flex-col overflow-hidden">
          <div className="border-b border-[var(--glass-border)] p-4">
            <div className="flex items-center gap-2 text-[#1F2937]">
              <ShoppingCart className="h-5 w-5 text-[#F97316]" />
              <span className="font-semibold">Keranjang</span>
              {cart.length > 0 && (
                <Badge variant="secondary" className="rounded-full">
                  {cart.reduce((s, i) => s + i.qty, 0)}
                </Badge>
              )}
            </div>

            <div className="mt-4">
              <label className="mb-2 flex items-center gap-2 text-xs font-medium text-[hsl(var(--muted-foreground))]">
                <Dog className="h-3.5 w-3" />
                Pelanggan
              </label>
              <select
                value={selectedCustomer ?? ""}
                onChange={(e) => setSelectedCustomer(e.target.value || null)}
                className={cn(
                  "flex h-10 w-full rounded-xl border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F97316] focus-visible:ring-offset-2",
                )}
              >
                {MOCK_CUSTOMERS.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-4">
            {cart.length === 0 ? (
              <p className="py-8 text-center text-sm text-[hsl(var(--muted-foreground))]">
                Keranjang kosong. Klik produk untuk menambah.
              </p>
            ) : (
              <ul className="space-y-3">
                {cart.map(({ product, qty }) => (
                  <li
                    key={product.id}
                    className="flex items-center justify-between gap-2 rounded-xl border border-[hsl(var(--border))] bg-white/60 p-3"
                  >
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium text-[#1F2937]">
                        {product.name}
                      </p>
                      <p className="text-xs text-[hsl(var(--muted-foreground))]">
                        Rp {(product.hargajual * 15000).toLocaleString("id-ID")}{" "}
                        × {qty}
                      </p>
                    </div>
                    <div className="flex items-center gap-1">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8 rounded-lg"
                        onClick={(e) => {
                          e.stopPropagation();
                          updateQty(product.id, -1);
                        }}
                      >
                        <Minus className="h-3.5 w-3.5" />
                      </Button>
                      <span className="w-6 text-center text-sm font-medium">
                        {qty}
                      </span>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8 rounded-lg"
                        onClick={(e) => {
                          e.stopPropagation();
                          updateQty(product.id, 1);
                        }}
                      >
                        <Plus className="h-3.5 w-3.5" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 rounded-lg text-red-500 hover:bg-red-50 hover:text-red-600"
                        onClick={(e) => {
                          e.stopPropagation();
                          removeFromCart(product.id);
                        }}
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="space-y-2 border-t border-[var(--glass-border)] p-4">
            <div className="flex justify-between text-sm">
              <span className="text-[hsl(var(--muted-foreground))]">
                Subtotal
              </span>
              <span className="font-medium">
                Rp {(subtotal * 15000).toLocaleString("id-ID")}
              </span>
            </div>
            {discount > 0 && (
              <div className="flex justify-between text-sm">
                <span className="text-[hsl(var(--muted-foreground))]">
                  Diskon
                </span>
                <span className="font-medium text-emerald-600">
                  -Rp {(discount * 15000).toLocaleString("id-ID")}
                </span>
              </div>
            )}
            <div className="flex justify-between text-sm">
              <span className="text-[hsl(var(--muted-foreground))]">
                Pajak (8%)
              </span>
              <span className="font-medium">
                Rp {(tax * 15000).toLocaleString("id-ID")}
              </span>
            </div>
            <div className="flex justify-between border-t border-[var(--glass-border)] pt-3 text-base font-semibold text-[#1F2937]">
              <span>Total</span>
              <span className="text-[#F97316]">
                Rp {(total * 15000).toLocaleString("id-ID")}
              </span>
            </div>
            <Button
              className="mt-2 w-full rounded-xl"
              size="lg"
              disabled={cart.length === 0}
              onClick={goToCheckout}
            >
              Checkout
            </Button>
          </div>
        </div>
      </aside>
    </div>
  );
}
