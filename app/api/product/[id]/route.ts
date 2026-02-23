import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PUT(
  request: Request,
  { params }: { params: { id: string } },
) {
  try {
    const body = await request.json();
    const id = Number(params.id);

    const updatedProduct = await prisma.product.update({
      where: { id },
      data: {
        sku: body.sku,
        name: body.name,
        brand: body.brand,
        stok: body.stok,
        hargapokok: body.hargapokok,
        hargajual: body.hargajual,
        kategori: body.kategori,
        imageUrl: body.imageUrl,
        deskripsi: body.deskripsi,
      },
    });

    return NextResponse.json(updatedProduct);
  } catch (error) {
    return NextResponse.json(
      { error: "Gagal update product" },
      { status: 500 },
    );
  }
}
