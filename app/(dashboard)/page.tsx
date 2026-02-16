import Link from "next/link";
import {
  ShoppingBag,
  Dog,
  AlertTriangle,
  Plus,
  ClipboardCheck,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function DashboardPage() {
  return (
    <div>
      <header className="mb-8">
        <h1 className="text-2xl font-semibold tracking-tight text-[#1F2937]">
          Dashboard
        </h1>
        <p className="mt-1 text-sm text-[hsl(var(--muted-foreground))]">
          Ringkasan toko hari ini
        </p>
      </header>

      <section className="mb-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <Card className="glass-card overflow-hidden rounded-2xl border-0">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-[hsl(var(--muted-foreground))]">
              Penjualan Hari Ini
            </CardTitle>
            <ShoppingBag className="h-5 w-5 text-[#F97316]" />
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-[#1F2937]">Rp 4.247.000</p>
            <p className="mt-1 text-xs text-emerald-600">+12% dari kemarin</p>
          </CardContent>
        </Card>
        <Card className="glass-card overflow-hidden rounded-2xl border-0">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-[hsl(var(--muted-foreground))]">
              Janji Grooming Baru
            </CardTitle>
            <Dog className="h-5 w-5 text-[#F97316]" />
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-[#1F2937]">5</p>
            <p className="mt-1 text-xs text-[hsl(var(--muted-foreground))]">
              Berikutnya: Max jam 14:00
            </p>
          </CardContent>
        </Card>
        <Card className="glass-card overflow-hidden rounded-2xl border-0">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-[hsl(var(--muted-foreground))]">
              Stok Rendah
            </CardTitle>
            <AlertTriangle className="h-5 w-5 text-amber-500" />
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-[#1F2937]">3</p>
            <p className="mt-1 text-xs text-amber-600">Perlu restock</p>
          </CardContent>
        </Card>
      </section>

      <section>
        <h2 className="mb-4 text-lg font-semibold text-[#1F2937]">
          Aksi Cepat
        </h2>
        <div className="flex flex-wrap gap-4">
          <Link href="/pos">
            <Button className="gap-2 rounded-xl shadow-sm">
              <Plus className="h-4 w-4" />
              Mulai Penjualan
            </Button>
          </Link>
          <Button variant="outline" className="gap-2 rounded-xl">
            <ClipboardCheck className="h-4 w-4" />
            Check-in Hewan
          </Button>
        </div>
      </section>
    </div>
  );
}
