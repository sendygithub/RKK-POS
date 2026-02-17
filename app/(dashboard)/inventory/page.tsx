"use client";

import { useState } from "react";
import {
  Package,
  Shield,
  X,
  BoxIcon,
  BookmarkX,
  BadgeDollarSign,
  BookMarkedIcon,
  CopyPlusIcon,
  SpellCheck,
  Trash2,
  SquarePenIcon,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Label } from "@/components/ui/label";

const reset = {
  sku: "",
  name: "",
  brand: "",
  stok: 0,
  hargapokok: 0,
  hargajual: 0,
  kategori: "anjing",
  imageUrl: "",
  deskripsi: "",
};
export default function InventoryPage() {
  const [search, setSearch] = useState("");
  const [showAdd, setShowAdd] = useState(false);

  //1. buat state untuk inisiasi data
  const [formData, setFormData] = useState(reset);

  //2. buat fungsi untuk menangani perubahan input secara dinamis
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { id, value } = e.target;

    setFormData((prev) => ({
      ...prev,

      [id]:
        id === "stok" || id === "hargapokok" || id === "hargajual"
          ? value === ""
            ? 0
            : Number(value)
          : value,
    }));
    console.log(id, value);
  };

  //3. buat fungsi untuk tombol simpan
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res = await fetch("/api/product", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (res.ok) {
      setFormData(reset);
      setShowAdd(false);
    }
  };

  return (
    <div>
      <header className="mb-6">
        <h1 className="text-2xl font-semibold tracking-tight text-[#1F2937]">
          Inventori / Stok
        </h1>

        <p className="mt-1 text-sm text-[hsl(var(--muted-foreground))]">
          Kelola stok produk
        </p>
      </header>

      <Card className="glass-card overflow-hidden rounded-2xl border-0">
        <CardHeader className="flex flex-row flex-wrap items-center justify-between gap-4 border-b border-[hsl(var(--border))] pb-4">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Package className="h-5 w-5 text-[#F97316]" />
            Daftar Produk
          </CardTitle>
          <div className="relative w-full sm:w-64 flex">
            <Input
              placeholder="Cari produk"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="rounded-xl pl-4 ml-2"
            />
            <Button
              className="rounded-xl pl-4 ml-2"
              onClick={() => setShowAdd(true)}
            >
              Tambah product
            </Button>
          </div>
        </CardHeader>

        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>SKU</TableHead>
                <TableHead>Nama Produk</TableHead>
                <TableHead>Brand</TableHead>
                <TableHead>Kategori</TableHead>
                <TableHead>Stok</TableHead>
                <TableHead>Harga Pokok</TableHead>
                <TableHead>Harga Jual</TableHead>
                <TableHead>Deskripsi</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              <TableRow>
                <TableCell className="font-medium text-[#1F2937]">
                  001
                </TableCell>
                <TableCell className="text-[hsl(var(--muted-foreground))]">
                  pakan kiucing
                </TableCell>
                <TableCell>
                  <Badge className="rounded-full">12</Badge>
                  <span className="ml-2 text-sm tabular-nums">unit</span>
                </TableCell>
                <TableCell className="font-medium">kuicing</TableCell>
                <TableCell className="font-medium">stok</TableCell>
                <TableCell className="font-medium">Rp.50.000</TableCell>
                <TableCell className="font-medium">Rp.59.000</TableCell>
                <TableCell className=" font-medium">pakan kucing</TableCell>
                <TableCell className="font-medium text-[#1F2937]">
                  <Button className="bg-transparent">
                    <SquarePenIcon className="size=16 bg-orange-500" />
                  </Button>
                  <Button className="bg-transparent">
                    <Trash2 className="size=16 bg-orange-500" />
                  </Button>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {showAdd && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#1F2937]/40 p-4">
          <Card className="glass-card w-full max-w-md rounded-2xl border-0 shadow-xl">
            <CardHeader className="flex flex-row items-center justify-between border-b border-[hsl(var(--border))]">
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-[#F97316]" />
                Tambah Product Baru
              </CardTitle>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-xl"
                onClick={() => setShowAdd(false)}
              >
                <X className="h-5 w-5" />
              </Button>
            </CardHeader>
            <CardContent className="pt-6">
              {/* 4. tambahkan onsubmit=handlesubmit */}

              <form className="space-y-4" onSubmit={handleSubmit}>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="sku">SKU</Label>
                    <div className="relative">
                      <Input
                        id="sku"
                        value={formData.sku}
                        onChange={handleChange}
                        placeholder="No SKU"
                        className="rounded-xl pl-9"
                        required
                      />
                      <BoxIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[hsl(var(--muted-foreground))]" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="name">Nama Product</Label>
                    <div className="relative">
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Nama Product"
                        className="rounded-xl pl-9"
                        required
                      />
                      <BookmarkX className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[hsl(var(--muted-foreground))]" />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="brand">Brand</Label>
                    <div className="relative">
                      <Input
                        id="brand"
                        value={formData.brand}
                        onChange={handleChange}
                        placeholder="Royal canin, Mei-O.."
                        className="rounded-xl pl-9"
                        required
                      />
                      <BookMarkedIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[hsl(var(--muted-foreground))]" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="stok">Stock</Label>
                    <div className="relative">
                      <CopyPlusIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[hsl(var(--muted-foreground))]" />
                      <Input
                        id="stok"
                        value={formData.stok}
                        onChange={handleChange}
                        type="number"
                        placeholder="1,2,3,4,5..."
                        className="rounded-xl pl-9"
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="hargapokok">Harga Pokok</Label>
                    <div className="relative">
                      <BadgeDollarSign className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[hsl(var(--muted-foreground))]" />
                      <Input
                        id="hargapokok"
                        value={formData.hargapokok}
                        onChange={handleChange}
                        type="number"
                        placeholder="Rp 100.000"
                        className="rounded-xl pl-9"
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="hargajual">Harga Jual ke Pelangan</Label>
                    <div className="relative">
                      <BadgeDollarSign className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[hsl(var(--muted-foreground))]" />
                      <Input
                        id="hargajual"
                        value={formData.hargajual}
                        onChange={handleChange}
                        type="number"
                        placeholder="Rp 120.000"
                        className="rounded-xl pl-9"
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Kategory</Label>
                    <select
                      className="flex h-10 w-full rounded-xl border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F97316]"
                      id="kategori"
                      value={formData.kategori}
                      onChange={handleChange}
                    >
                      <option value="anjing">Anjing</option>
                      <option value="kucing">Kucing</option>
                      <option value="kura-kura">Kura-Kura</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label>Image Upload</Label>
                    <div className="relative">
                      <input
                        type="file"
                        id="imageUrl"
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            imageUrl: e.target.files?.[0]?.name || "",
                          }))
                        }
                        className="flex h-10 w-full rounded-xl border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F97316]"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="deskripsi">Deskripsi</Label>
                  <div className="relative">
                    <textarea
                      id="deskripsi"
                      placeholder="masukan alamat"
                      value={formData.deskripsi}
                      onChange={handleChange}
                      className="min-h-[100px] rounded-xl pl-11"
                    />
                  </div>
                </div>

                <div className="flex gap-2 pt-2">
                  <Button type="submit" className="flex-1 rounded-xl">
                    Simpan
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    className="rounded-xl"
                    onClick={() => setShowAdd(false)}
                  >
                    Batal
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
