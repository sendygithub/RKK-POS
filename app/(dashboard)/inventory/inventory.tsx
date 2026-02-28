"use client";
import React from "react";
import { Trash2, SquarePenIcon } from "lucide-react";
import { CardContent } from "@/components/ui/card";
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
import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Package,
  Shield,
  X,
  BoxIcon,
  BookmarkX,
  BadgeDollarSign,
  BookMarkedIcon,
  CopyPlusIcon,
} from "lucide-react";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type Product = {
  id: number;
  sku: number;
  name: string;
  brand: string;
  kategori: string;
  imageUrl: string;
  stok: number;
  hargapokok: number;
  hargajual: number;
  deskripsi: string;
};
const reset = {
  sku: 0,
  name: "",
  brand: "",
  stok: 0,
  hargapokok: 0,
  hargajual: 0,
  kategori: "anjing",
  imageUrl: "",
  deskripsi: "",
};
export default function Inventory() {
  const [data, setData] = useState<Product[]>([]);
  const [showEdit, setShowEdit] = useState(false);
  const [formData, setFormData] = useState(reset);
  const [selectedProductId, setSelectedProductId] = useState<number | null>(
    null,
  );

  useEffect(() => {
    fetch("/api/product")
      .then((res) => res.json())
      .then(setData);
  }, []);

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

  const handleEdit = (product: Product) => {
    setSelectedProductId(product.id); // Simpan ID yang sedang diedit
    setFormData({
      name: product.name,
      sku: product.sku,
      brand: product.brand,
      stok: product.stok,
      hargapokok: product.hargapokok,
      hargajual: product.hargajual,
      kategori: product.kategori,
      imageUrl: product.imageUrl,
      deskripsi: product.deskripsi,
    });
    setShowEdit(true); // Buka modal edit
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const res = await fetch("/api/product", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: Number(selectedProductId),
        ...formData,
      }),
    });

    if (res.ok) {
      setFormData(reset);
      setShowEdit(false);
      window.location.reload();
    }
  };

  const handleDelete = async (id: number) => {
    if (confirm("Apakah Anda yakin ingin menghapus product ini?")) {
      const res = await fetch(`/api/product?id=${id}`, { method: "DELETE" });
      if (res.ok) {
        window.location.reload();
      } else {
        alert("Gagal menghapus");
      }
    }
  };
  return (
    <div>
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
            {data.map((product: any) => (
              <TableRow key={product.id}>
                <TableCell className="font-medium text-[#1F2937]">
                  {product.sku}
                </TableCell>
                <TableCell className="text-[hsl(var(--muted-foreground))]">
                  {product.name}
                </TableCell>
                <TableCell>
                  <Badge className="rounded-full">{product.brand}</Badge>
                </TableCell>
                <TableCell className="font-medium">
                  {product.kategori}
                </TableCell>
                <TableCell className="font-medium">
                  {product.stok}
                  <span className="ml-2 text-sm tabular-nums">unit</span>
                </TableCell>
                <TableCell className="font-medium">
                  {product.hargapokok}
                </TableCell>
                <TableCell className="font-medium">
                  {product.hargajual}
                </TableCell>
                <TableCell className=" font-medium">
                  {product.deskripsi}
                </TableCell>
                <TableCell className="font-medium text-[#1F2937]">
                  <Button onClick={() => handleEdit(product)}>
                    <SquarePenIcon className="size=16" />
                  </Button>

                  <Button onClick={() => handleDelete(product.id)}>
                    <Trash2 className="size=16" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>

      {showEdit && (
        <div className="fixed inset-0  flex justify-center bg-[#1F2937]/30 p-4 ">
          <Card className="glass-card w-full max-w-xl max-h-[90vh] overflow-y-auto rounded-2xl border-0 shadow-xl">
            <CardHeader className="flex flex-row items-center justify-between border-b border-[hsl(var(--border))]">
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-[#F97316]" />
                Tambah Product Baru
              </CardTitle>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-xl"
                onClick={() => setShowEdit(false)}
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
                    Update
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    className="rounded-xl"
                    onClick={() => setShowEdit(false)}
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
