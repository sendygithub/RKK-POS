export const dynamic = "force-dynamic"; // WAJIB untuk fix build error

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      namaPemilik,
      namaHewan,
      ras,
      layanan,
      date,
      time,
      telfon,
      alamat,
      customerId,
    } = body;

    // Gunakan .create (bukan createMany jika hanya input 1 data)
    const newAppointment = await prisma.appointment.create({
      data: {
        namaPemilik,
        namaHewan,
        ras,
        layanan,
        date: new Date(date), // Pastikan formatnya Date
        time,
        telfon,
        alamat,
        customerId: Number(customerId), // Sesuaikan dengan skema prisma kamu
      },
    });

    return NextResponse.json({ message: "berhasil", data: newAppointment });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { message: "terjadi kesalahan server" },
      { status: 500 },
    );
  }
}

export async function GET() {
  try {
    const dataappointmen = await prisma.appointment.findMany({
      orderBy: { id: "asc" },
      include: { customer: true }, // Bonus: sekalian ambil data customernya jika perlu
    });

    return NextResponse.json(dataappointmen);
  } catch (err) {
    return NextResponse.json(
      { message: "Failed to fetch appointment" },
      { status: 500 },
    );
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const {
      id,
      namaPemilik,
      namaHewan,
      ras,
      layanan,
      date,
      time,
      telfon,
      alamat,
      status,
    } = body;

    if (!id) {
      return NextResponse.json(
        { error: "ID janji temu diperlukan" },
        { status: 400 },
      );
    }

    const updatedAppointment = await prisma.appointment.update({
      where: { id: Number(id) },
      data: {
        namaPemilik,
        namaHewan,
        ras,
        layanan,
        date: new Date(date),
        time,
        telfon,
        alamat,
        status: status || "menunggu",
      },
    });

    return NextResponse.json(updatedAppointment, { status: 200 });
  } catch (err: any) {
    console.error("Update Error:", err);
    if (err.code === "P2025") {
      return NextResponse.json(
        { error: "Data tidak ditemukan" },
        { status: 404 },
      );
    }
    return NextResponse.json(
      { error: "Gagal memperbarui data" },
      { status: 500 },
    );
  }
}
