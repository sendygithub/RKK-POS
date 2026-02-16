"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { CheckCircle, ShoppingBag, ArrowLeft } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const CART_STORAGE_KEY = "pawsome-pos-cart";

type StoredCart = {
  items: { product: { id: string; name: string; category: string; price: number }; qty: number }[];
  customerId: string;
  total: number;
  subtotal: number;
  tax: number;
};

export default function CheckoutPage() {
  const router = useRouter();
  const [data, setData] = useState<StoredCart | null>(null);
  const [confirmed, setConfirmed] = useState(false);

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem(CART_STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as StoredCart;
        setData(parsed);
      } else {
        setData(null);
      }
    } catch {
      setData(null);
    }
  }, []);

  const handleConfirm = () => {
    setConfirmed(true);
    try {
      sessionStorage.removeItem(CART_STORAGE_KEY);
      sessionStorage.removeItem("pawsome-pos-customer");
    } catch {}
  };

  if (!data && !confirmed) {
    return (
      <div className="flex min-h-[50vh] flex-col items-center justify-center gap-4">
        <p className="text-[hsl(var(--muted-foreground))]">
          Tidak ada data checkout. Mulai dari POS.
        </p>
        <Link href="/pos">
          <Button className="gap-2 rounded-xl">
            <ArrowLeft className="h-4 w-4" />
            Ke POS
          </Button>
        </Link>
      </div>
    );
  }

  if (confirmed) {
    return (
      <div className="flex min-h-[50vh] flex-col items-center justify-center gap-6">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
          <CheckCircle className="h-12 w-12" />
        </div>
        <h2 className="text-2xl font-semibold text-[#1F2937]">
          Transaksi Berhasil
        </h2>
        <p className="text-center text-sm text-[hsl(var(--muted-foreground))]">
          Pesanan telah dicatat. Terima kasih!
        </p>
        <div className="flex gap-4">
          <Link href="/pos">
            <Button className="gap-2 rounded-xl">Transaksi Baru</Button>
          </Link>
          <Link href="/">
            <Button variant="outline" className="gap-2 rounded-xl">
              Dashboard
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  if (!data) return null;

  const totalIdr = (data.total * 15000).toLocaleString("id-ID");

  return (
    <div className="mx-auto max-w-2xl">
      <header className="mb-6">
        <h1 className="text-2xl font-semibold tracking-tight text-[#1F2937]">
          Checkout
        </h1>
        <p className="mt-1 text-sm text-[hsl(var(--muted-foreground))]">
          Konfirmasi pesanan
        </p>
      </header>

      <Card className="glass-card overflow-hidden rounded-2xl border-0">
        <CardHeader className="flex flex-row items-center gap-2 border-b border-[hsl(var(--border))]">
          <ShoppingBag className="h-5 w-5 text-[#F97316]" />
          <CardTitle>Ringkasan Pesanan</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 pt-6">
          <ul className="space-y-2">
            {data.items.map(({ product, qty }) => (
              <li
                key={product.id}
                className="flex justify-between text-sm"
              >
                <span>
                  {product.name} × {qty}
                </span>
                <span>
                  Rp {((product.price * qty) * 15000).toLocaleString("id-ID")}
                </span>
              </li>
            ))}
          </ul>
          <div className="border-t border-[hsl(var(--border))] pt-4">
            <div className="flex justify-between text-lg font-semibold">
              <span>Total</span>
              <span className="text-[#F97316]">Rp {totalIdr}</span>
            </div>
          </div>
          <div className="flex gap-4 pt-4">
            <Button
              className="flex-1 rounded-xl"
              size="lg"
              onClick={handleConfirm}
            >
              Konfirmasi & Bayar
            </Button>
            <Link href="/pos">
              <Button variant="outline" className="rounded-xl" size="lg">
                Batal
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
