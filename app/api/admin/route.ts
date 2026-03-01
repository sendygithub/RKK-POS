import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs"; // Opsional: Jalankan 'npm install bcryptjs'

const prisma = new PrismaClient();

// ==========================================
// 1. POST: Membuat Admin Baru
// ==========================================
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, password, role } = body;

    if (!name || !email || !password || !role) {
      return NextResponse.json(
        { error: "Data tidak lengkap" },
        { status: 400 },
      );
    }

    // Hashing password agar aman
    const hashedPassword = await bcrypt.hash(password, 10);

    const newAdmin = await prisma.admin.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role,
      },
    });

    // Jangan kembalikan password ke client
    const { password: _, ...adminWithoutPass } = newAdmin;
    return NextResponse.json(adminWithoutPass, { status: 201 });
  } catch (error: any) {
    if (error.code === "P2002") {
      return NextResponse.json(
        { error: "Email sudah terdaftar" },
        { status: 400 },
      );
    }
    return NextResponse.json({ error: "Gagal membuat admin" }, { status: 500 });
  }
}

// ==========================================
// 2. PUT: Memperbarui Data Admin
// ==========================================
export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { id, name, email, password } = body;

    if (!id) {
      return NextResponse.json(
        { error: "ID Admin diperlukan" },
        { status: 400 },
      );
    }

    // Siapkan data yang akan diupdate
    const updateData: any = { name, email };

    // Jika password diisi, hash ulang
    if (password) {
      updateData.password = await bcrypt.hash(password, 10);
    }

    const updatedAdmin = await prisma.admin.update({
      where: { id: Number(id) },
      data: updateData,
    });

    const { password: _, ...adminWithoutPass } = updatedAdmin;
    return NextResponse.json(adminWithoutPass, { status: 200 });
  } catch (error: any) {
    if (error.code === "P2025") {
      return NextResponse.json(
        { error: "Admin tidak ditemukan" },
        { status: 404 },
      );
    }
    return NextResponse.json(
      { error: "Gagal memperbarui admin" },
      { status: 500 },
    );
  }
}

// ==========================================
// 3. DELETE: Menghapus Admin
// ==========================================
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "ID Admin diperlukan" },
        { status: 400 },
      );
    }

    await prisma.admin.delete({
      where: { id: Number(id) },
    });

    return NextResponse.json(
      { message: "Admin berhasil dihapus" },
      { status: 200 },
    );
  } catch (error: any) {
    if (error.code === "P2025") {
      return NextResponse.json(
        { error: "Admin tidak ditemukan" },
        { status: 404 },
      );
    }
    return NextResponse.json(
      { error: "Gagal menghapus admin" },
      { status: 500 },
    );
  }
}

export async function GET() {
  try {
    const admins = await prisma.admin.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        // role: true, // Buka ini jika kamu sudah menambahkannya di schema.prisma
        createdAt: true,
      },
      orderBy: {
        createdAt: "desc", // Admin terbaru di atas
      },
    });

    return NextResponse.json(admins, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Gagal mengambil data admin" },
      { status: 500 },
    );
  }
}
