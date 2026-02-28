import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// --- FUNGSI GET (WAJIB ADA UNTUK FETCH DATA) ---
export async function GET() {
  try {
    const customers = await prisma.customer.findMany({
      include: {
        pets: true,
        appointments: true, // Agar data appointment ikut terambil
      },
      orderBy: {
        id: "desc", // Opsional: agar data terbaru di atas
      },
    });
    return NextResponse.json(customers);
  } catch (error) {
    return NextResponse.json(
      { message: "Gagal mengambil data" },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    console.log("Data masuk ke API:", body); // Cek ini di terminal VS Code Anda

    const { name, phone, email, address } = body;

    // Validasi input
    if (!name || name.trim() === "" || !phone || phone.trim() === "") {
      return NextResponse.json(
        { message: "Nama dan Nomor Telepon wajib diisi!" },
        { status: 400 },
      );
    }

    // Eksekusi Prisma
    const newCustomer = await prisma.customer.create({
      data: {
        name: name.trim(),
        phone: phone.trim(),
        // Pastikan email dan address benar-benar null jika kosong
        email: email && email.trim() !== "" ? email.trim() : null,
        address: address && address.trim() !== "" ? address.trim() : null,
      },
    });

    return NextResponse.json(
      {
        message: "Berhasil!",
        data: newCustomer,
      },
      { status: 201 },
    );
  } catch (error: any) {
    console.error("PRISMA ERROR:", error); // Cek error detail di terminal

    // Error Unique Constraint (Duplikat)
    if (error.code === "P2002") {
      return NextResponse.json(
        { message: "Nomor Telepon atau Email sudah digunakan pelanggan lain." },
        { status: 400 },
      );
    }

    // Error jika tabel tidak ditemukan atau schema belum di-push
    return NextResponse.json(
      { message: "Kesalahan Database: " + (error.message || "Unknown error") },
      { status: 500 },
    );
  }
}

// Tambahkan di /api/customer/route.ts

// UPDATE CUSTOMER
export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { id, name, phone, email, address } = body;

    const updated = await prisma.customer.update({
      where: { id: Number(id) },
      data: {
        name,
        phone,
        email: email?.trim() || null,
        address: address?.trim() || null,
      },
    });

    return NextResponse.json({
      message: "Data berhasil diperbarui",
      data: updated,
    });
  } catch (error: any) {
    return NextResponse.json({ message: "Gagal update data" }, { status: 500 });
  }
}

// DELETE CUSTOMER
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id)
      return NextResponse.json({ message: "ID dibutuhkan" }, { status: 400 });

    await prisma.customer.delete({
      where: { id: Number(id) },
    });

    return NextResponse.json({ message: "Customer dihapus" });
  } catch (error) {
    return NextResponse.json(
      { message: "Gagal menghapus data" },
      { status: 500 },
    );
  }
}
