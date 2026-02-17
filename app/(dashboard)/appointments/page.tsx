"use client";
import {
  CatIcon,
  Shield,
  CopyPlusIcon,
  X,
  SmilePlus,
  PawPrint,
  Cat,
  CalendarClock,
  Clock1,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";
import { Label } from "@/components/ui/label";
import AppointmentGrid from "./appointmentGrid";

const reset = {
  namaPemilik: "",
  namaHewan: "",
  ras: "",
  layanan: "",
  date: "",
  time: "",
  telfon: "",
  alamat: "",
};

export default function AppointmentsPage() {
  const [tampil, setTampil] = useState(false);
  const [formData, setFormData] = useState(reset);

  //2. buat fungsi untuk menangani perubahan input secara dinamis
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { id, value } = e.target;

    setFormData((prev) => ({
      ...prev,

      [id]: value,
    }));
    console.log(id, value);
  };

  //3. buat fungsi untuk tombol simpan
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res = await fetch("/api/appointments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (res.ok) {
      setFormData(reset);
      setTampil(false);
      window.location.reload();
    }
  };

  return (
    <div>
      <header className="mb-6 flex items-center gap-2 text-lg">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-[#1F2937]">
            Grooming Service
          </h1>
          <p className="mt-1 text-sm text-[hsl(var(--muted-foreground))]">
            Jadwal grooming hewan peliharaan
          </p>
        </div>
      </header>

      <CardHeader className="flex flex-row flex-wrap items-center justify-between gap-4 border-b border-[hsl(var(--border))] pb-4">
        <CardTitle className="flex items-center gap-2 text-2xl">
          List perjanjian
          <CatIcon className="h-5 w-5 text-[#F97316]" />
        </CardTitle>

        <div className="relative w-full sm:w-64 flex">
          <Input placeholder="Cari produk" className="rounded-xl pl-4 ml-2" />
          <Button
            className="rounded-xl pl-4 ml-2"
            onClick={() => setTampil(true)}
          >
            Buat Janji Baru
          </Button>
        </div>
      </CardHeader>

      <AppointmentGrid />

      {tampil && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#1F2937]/40 p-4">
          <Card className="glass-card w-full max-w-md rounded-2xl border-0 shadow-xl">
            <CardHeader className="flex flex-row items-center justify-between border-b border-[hsl(var(--border))]">
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-[#F97316]" />
                Buat Janji Baru
              </CardTitle>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-xl"
                onClick={() => setTampil(false)}
              >
                <X className="h-5 w-5" />
              </Button>
            </CardHeader>
            <CardContent className="pt-6">
              {/* 4. tambahkan onsubmit=handlesubmit */}

              <form className="space-y-4" onSubmit={handleSubmit}>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="namaPemilik">Nama Pemilik</Label>
                    <div className="relative">
                      <Input
                        id="namaPemilik"
                        placeholder="Nama pemilik"
                        value={formData.namaPemilik}
                        onChange={handleChange}
                        className="rounded-xl pl-9"
                        required
                      />
                      <SmilePlus className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[hsl(var(--muted-foreground))]" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="namaHewan">Nama Hewan</Label>
                    <div className="relative">
                      <Input
                        id="namaHewan"
                        value={formData.namaHewan}
                        onChange={handleChange}
                        placeholder="Nama Hewan"
                        className="rounded-xl pl-9"
                        required
                      />
                      <PawPrint className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[hsl(var(--muted-foreground))]" />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="ras">Ras/Jenis</Label>
                    <div className="relative">
                      <Input
                        id="ras"
                        value={formData.ras}
                        onChange={handleChange}
                        placeholder="Persian/Golden Ret.."
                        className="rounded-xl pl-9"
                        required
                      />
                      <Cat className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[hsl(var(--muted-foreground))]" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>jenis layanan</Label>
                    <select
                      className="flex h-10 w-full rounded-xl border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F97316]"
                      id="layanan"
                      value={formData.layanan}
                      onChange={handleChange}
                    >
                      <option value="Cukur">Cukur</option>
                      <option value="Grooming">Grooming</option>
                      <option value="Steril">Steril</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="date">Hari & Tanggal</Label>
                    <div className="relative">
                      <CalendarClock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[hsl(var(--muted-foreground))]" />
                      <Input
                        id="date"
                        type="date"
                        value={formData.date}
                        onChange={handleChange}
                        placeholder="Senin, 2 Maret"
                        className="rounded-xl pl-9"
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="time">Jam</Label>
                    <div className="relative">
                      <Clock1 className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[hsl(var(--muted-foreground))]" />
                      <Input
                        id="time"
                        type="time"
                        value={formData.time}
                        onChange={handleChange}
                        placeholder="09:0 wib"
                        className="rounded-xl pl-9"
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="telfon">No. Telf</Label>
                    <div className="relative">
                      <CopyPlusIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[hsl(var(--muted-foreground))]" />
                      <Input
                        id="telfon"
                        type="text"
                        value={formData.telfon}
                        onChange={handleChange}
                        placeholder="+628.."
                        className="rounded-xl pl-9"
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Alamat</Label>
                    <div className="relative">
                      <input
                        type="text"
                        id="alamat"
                        value={formData.alamat}
                        onChange={handleChange}
                        placeholder="jln. Merdeka.."
                        className="flex h-10 w-full rounded-xl border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F97316]"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex gap-2 pt-2">
                  <Button type="submit" className="flex-1 rounded-xl">
                    Simpan
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    className="rounded-xl"
                    onClick={() => setTampil(false)}
                  >
                    Batal
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
