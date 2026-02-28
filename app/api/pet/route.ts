import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, type, breed, customerId, weight, gender, birthDate } = body;

    // Validasi dasar
    if (!name || !type || !customerId) {
      return NextResponse.json(
        { message: "Nama, Jenis Hewan, dan Pemilik wajib diisi" },
        { status: 400 },
      );
    }

    const newPet = await prisma.pet.create({
      data: {
        name,
        type,
        breed: breed || null,
        gender: gender || null,
        weight: weight ? parseFloat(weight) : null,
        birthDate: birthDate ? new Date(birthDate) : null,
        // Menghubungkan ke Customer berdasarkan ID
        customerId: parseInt(customerId),
      },
    });

    return NextResponse.json({
      message: "Hewan berhasil didaftarkan",
      data: newPet,
    });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json(
      { message: "Gagal menyimpan data hewan" },
      { status: 500 },
    );
  }
}
