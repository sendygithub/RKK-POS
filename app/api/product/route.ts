import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const newProduct = await prisma.product.create({
      data: {
        sku: Number(body.sku),
        name: body.name,
        brand: body.brand,
        stok: Number(body.stok),
        hargapokok: Number(body.hargapokok),
        hargajual: Number(body.hargajual),
        kategori: body.kategori,
        imageUrl: body.imageUrl,
        deskripsi: body.deskripsi,
      },
    });
    return NextResponse.json({ message: "berhasil", data: newProduct });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "terjadi kesalahan server" },
      { status: 500 },
    );
  }
}

export async function GET() {
  try {
    const dataproduct = await prisma.product.findMany({
      orderBy: { id: "asc" },
    });

    return NextResponse.json(dataproduct);
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to fetch appointment" },
      { status: 500 },
    );
  }
}
