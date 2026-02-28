import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const newProduct = await prisma.product.create({
      data: {
        name: body.name,
        sku: parseInt(body.sku),
        brand: body.brand,
        stok: parseInt(body.stok),
        hargapokok: parseInt(body.hargapokok),
        hargajual: parseInt(body.hargajual),
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

export async function PUT(request: Request) {
  try {
    const body = await request.json();

    if (!body.id) {
      return NextResponse.json(
        { message: "ID wajib dikirim untuk update" },
        { status: 400 },
      );
    }

    const updatedProduct = await prisma.product.update({
      where: { id: Number(body.id) },
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

    return NextResponse.json(updatedProduct);
  } catch (error) {
    console.error("PUT ERROR:", error);
    return NextResponse.json(
      { message: "Terjadi kesalahan server" },
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

// DELETE CUSTOMER
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id)
      return NextResponse.json({ message: "ID dibutuhkan" }, { status: 400 });

    await prisma.product.delete({
      where: { id: Number(id) },
    });

    return NextResponse.json({ message: "product dihapus" });
  } catch (error) {
    return NextResponse.json(
      { message: "Gagal menghapus data" },
      { status: 500 },
    );
  }
}
