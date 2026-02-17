"use client";

import {
  Dog,
  Calendar,
  Clock,
  User,
  Package,
  CatIcon,
  Shield,
  BoxIcon,
  CopyPlusIcon,
  BookMarkedIcon,
  BadgeDollarSign,
  SpellCheck,
  BookmarkX,
  X,
  SmilePlus,
  PawPrint,
  Cat,
  CalendarClock,
  Clock1,
  Bath,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Label } from "@/components/ui/label";

const MOCK_APPOINTMENTS = [
  {
    id: "1",
    petName: "Max",
    petType: "Golden Retriever",
    owner: "Budi",
    time: "09:00",
    date: "Hari ini",
    status: "confirmed",
  },
  {
    id: "2",
    petName: "Luna",
    petType: "Persian Cat",
    owner: "Siti",
    time: "10:30",
    date: "Hari ini",
    status: "confirmed",
  },
  {
    id: "3",
    petName: "Buddy",
    petType: "Beagle",
    owner: "Andi",
    time: "14:00",
    date: "Hari ini",
    status: "pending",
  },
  {
    id: "4",
    petName: "Mochi",
    petType: "Poodle",
    owner: "Dewi",
    time: "15:30",
    date: "Hari ini",
    status: "pending",
  },
  {
    id: "5",
    petName: "Shadow",
    petType: "German Shepherd",
    owner: "Rudi",
    time: "11:00",
    date: "Besok",
    status: "pending",
  },
];

export default function AppointmentsPage() {
  const [tampil, setTampil] = useState(false);
  const [formData, setFormData] = useState({});

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

      {/* HALAMAN LIST JANJI GROOMING */}

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {MOCK_APPOINTMENTS.map((apt) => (
          <Card
            key={apt.id}
            className="glass-card overflow-hidden rounded-2xl border-0"
          >
            <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
              <div className="flex items-center gap-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#F97316]/10 text-[#F97316]">
                  <Dog className="h-5 w-5" />
                </div>
                <div>
                  <CardTitle className="text-base">{apt.petName}</CardTitle>
                  <p className="text-xs text-[hsl(var(--muted-foreground))]">
                    {apt.petType}
                  </p>
                </div>
              </div>
              <Badge
                variant={apt.status === "confirmed" ? "inStock" : "secondary"}
                className="rounded-full"
              >
                {apt.status === "confirmed" ? "Dikonfirmasi" : "Menunggu"}
              </Badge>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-[hsl(var(--muted-foreground))]">
                <User className="h-4 w-4" />
                {apt.owner}
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Calendar className="h-4 w-4 text-[#F97316]" />
                {apt.date}
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Clock className="h-4 w-4 text-[#F97316]" />
                {apt.time}
              </div>
              <div className="flex gap-2 pt-2">
                <Button size="sm" className="rounded-xl flex-1">
                  Detail
                </Button>
                <Button size="sm" variant="outline" className="rounded-xl">
                  Reschedule
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

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
                className="rounded-xl
              "
                onClick={() => setTampil(false)}
              >
                <X className="h-5 w-5" />
              </Button>
            </CardHeader>
            <CardContent className="pt-6">
              {/* 4. tambahkan onsubmit=handlesubmit */}

              <form className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="namapemilik">Nama Pemilik</Label>
                    <div className="relative">
                      <Input
                        id="namapemilik"
                        placeholder="Nama pemilik"
                        className="rounded-xl pl-9"
                        required
                      />
                      <SmilePlus className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[hsl(var(--muted-foreground))]" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="namahewan">Nama Hewan</Label>
                    <div className="relative">
                      <Input
                        id="namahewan"
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
                    <Label htmlFor="brand">Ras/Jenis</Label>
                    <div className="relative">
                      <Input
                        id="brand"
                        placeholder="Persian/Golden Ret.."
                        className="rounded-xl pl-9"
                        required
                      />
                      <Cat className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[hsl(var(--muted-foreground))]" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="stok">No. Telf</Label>
                    <div className="relative">
                      <CopyPlusIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[hsl(var(--muted-foreground))]" />
                      <Input
                        id="stok"
                        type="number"
                        placeholder="+628.."
                        className="rounded-xl pl-9"
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="hargapokok">Hari & Tanggal</Label>
                    <div className="relative">
                      <CalendarClock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[hsl(var(--muted-foreground))]" />
                      <Input
                        id="hargapokok"
                        type="number"
                        placeholder="Senin, 2 Maret"
                        className="rounded-xl pl-9"
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="hargajual">Jam</Label>
                    <div className="relative">
                      <Clock1 className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[hsl(var(--muted-foreground))]" />
                      <Input
                        id="hargajual"
                        type="number"
                        placeholder="09:0 wib"
                        className="rounded-xl pl-9"
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>jenis layanan</Label>
                    <select
                      className="flex h-10 w-full rounded-xl border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F97316]"
                      id="kategori"
                    >
                      <option value="Cukur">Cukur</option>
                      <option value="Grooming">Grooming</option>
                      <option value="Steril">Steril</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label>Image Upload</Label>
                    <div className="relative">
                      <input
                        type="file"
                        id="imageUrl"
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            imageUrl: e.target.files?.[0]?.name || "",
                          }))
                        }
                        className="flex h-10 w-full rounded-xl border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F97316]"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="deskripsi">Catatan</Label>
                  <div className="relative">
                    <SpellCheck className="absolute left-3 top-3 h-4 w-4 text-[hsl(var(--muted-foreground))]" />
                    <textarea
                      id="deskripsi"
                      className="min-h-[120px] rounded-xl pl-9 pt-2.5"
                    />
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
