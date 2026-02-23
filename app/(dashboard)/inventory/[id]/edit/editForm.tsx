"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

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
};

export default function EditForm({ product }: { product: Product }) {
  const router = useRouter();

  const [form, setForm] = useState(product);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    await fetch(`/api/product/${product.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...form,
        sku: Number(form.sku),
        stok: Number(form.stok),
        hargapokok: Number(form.hargapokok),
        hargajual: Number(form.hargajual),
      }),
    });

    router.push("/inventory");
    router.refresh();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        name="name"
        value={form.name || ""}
        onChange={handleChange}
        placeholder="Nama"
        className="border p-2 w-full"
      />

      <input
        name="brand"
        value={form.brand}
        onChange={handleChange}
        placeholder="Brand"
        className="border p-2 w-full"
      />

      <input
        name="stok"
        type="number"
        value={form.stok}
        onChange={handleChange}
        placeholder="Stok"
        className="border p-2 w-full"
      />

      <input
        name="hargapokok"
        type="number"
        value={form.hargapokok}
        onChange={handleChange}
        placeholder="Harga Pokok"
        className="border p-2 w-full"
      />

      <input
        name="hargajual"
        type="number"
        value={form.hargajual}
        onChange={handleChange}
        placeholder="Harga Jual"
        className="border p-2 w-full"
      />

      <input
        name="deskripsi"
        type="text"
        value={form.deskripsi}
        onChange={handleChange}
        placeholder="deskripsi"
        className="border p-2 w-full"
      />

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Update
      </button>
    </form>
  );
}
