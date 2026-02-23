"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function updateProduct(id: number, data: any) {
  await prisma.product.update({
    where: { id: id },
    data: {
      sku: data.sku,
      name: data.name,
      brand: data.brand,
      stok: data.stok,
      hargapokok: data.hargapokok,
      hargajual: data.hargajual,
      kategori: data.kategori,
      imageUrl: data.imageUrl,
      deskripsi: data.deskripsi,
    },
  });

  revalidatePath("/dashboard/inventory"); // Refresh data di tabel
  redirect("/dashboard/inventory"); // Balik ke halaman utama
}
