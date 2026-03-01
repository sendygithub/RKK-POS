import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { error } from "console";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { namaPemilik, namaHewan, ras, layanan, date, time, telfon, alamat } =
      body;

    const newAppointments = await prisma.appointment.createMany({
      data: body,
    });
    return NextResponse.json({ message: "berhasil", data: newAppointments });
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
    const dataappointmen = await prisma.appointment.findMany({
      orderBy: { id: "asc" },
    });

    return NextResponse.json(dataappointmen);
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to fetch appointment" },
      { status: 500 },
    );
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();

    // Destruktur data dari body
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

    // 1. Validasi ID wajib ada
    if (!id) {
      return NextResponse.json(
        { error: "ID janji temu diperlukan" },
        { status: 400 },
      );
    }

    // 2. Eksekusi Update ke Database
    const updatedAppointment = await prisma.appointment.update({
      where: {
        id: Number(id), // Pastikan ID adalah angka sesuai model Prisma
      },
      data: {
        namaPemilik,
        namaHewan,
        ras,
        layanan,
        // Konversi string tanggal dari input ke objek Date JS
        date: new Date(date),
        time,
        telfon,
        alamat,
        status: status || "menunggu",
        // customerId biasanya tidak diubah saat reschedule,
        // tapi jika perlu diubah, tambahkan di sini.
      },
    });

    return NextResponse.json(updatedAppointment, { status: 200 });
  } catch (error: any) {
    console.error("Update Error:", error);

    // Handle jika ID tidak ditemukan
    if (error.code === "P2025") {
      return NextResponse.json(
        { error: "Data janji temu tidak ditemukan" },
        { status: 404 },
      );
    }

    return NextResponse.json(
      { error: "Gagal memperbarui data" },
      { status: 500 },
    );
  }
}
