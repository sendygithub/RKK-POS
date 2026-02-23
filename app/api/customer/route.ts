import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { error } from "console";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { namaPemilik, namaHewan, ras, layanan, date, time, telfon, alamat } =
      body;

    const newCustomer = await prisma.customer.createMany({
      data: body,
    });
    return NextResponse.json({ message: "berhasil", data: newCustomer });
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
    const dataCustomer = await prisma.customer.findMany({
      orderBy: { id: "asc" },
      include: {
        appointments: true,
      },
    });

    return NextResponse.json(dataCustomer);
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to fetch appointment" },
      { status: 500 },
    );
  }
}
