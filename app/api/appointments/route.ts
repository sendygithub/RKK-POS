import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { error } from "console";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { namaPemilik, namaHewan, ras, layanan, date, time, telfon, alamat } =
      body;

    const newAppointments = await prisma.appointment.create({
      data: {
        namaPemilik,
        namaHewan,
        ras,
        layanan,
        date: new Date(date),
        time,
        telfon,
        alamat,
      },
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
