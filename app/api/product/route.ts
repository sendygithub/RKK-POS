import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();
  console.log("data yang di input", body);

  return NextResponse.json({ message: "berhasil" });
}
