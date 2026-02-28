"use client";

import React, { useState, useEffect } from "react";
import {
  Dog,
  Calendar,
  Clock,
  User,
  PhoneCall,
  MapPin,
  PawPrint,
  RefreshCw,
  Shield,
  SmilePlus,
  Cat,
  CalendarClock,
  Clock1,
  CopyPlusIcon,
  X, // Icon baru untuk reschedule
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button"; // Pastikan shadcn button sudah terinstall
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

export const dynamic = "force-dynamic";

export default function AppointmentGrid() {
  const [data, setData] = useState([]);
  const [showEdit, setShowEdit] = useState(false);

  useEffect(() => {
    fetch("/api/appointments")
      .then((res) => res.json())
      .then(setData);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "confirmed":
      case "selesai":
        return "bg-green-100 text-green-700 hover:bg-green-100 border-green-200";
      case "menunggu":
        return "bg-amber-100 text-amber-700 hover:bg-amber-100 border-amber-200";
      default:
        return "bg-slate-100 text-slate-700 hover:bg-slate-100";
    }
  };

  const handleEditOpen = () => {
    setShowEdit(true); // Buka modal edit
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
      setShowEdit(reset);
      setTampil(false);
      window.location.reload();
    }
  };

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 p-4">
      {data.map((x: any) => (
        <Card
          key={x.id}
          className="group relative overflow-hidden rounded-2xl border-0 bg-white/60 shadow-md backdrop-blur-md transition-all hover:shadow-xl hover:-translate-y-1"
        >
          {/* Accent Strip */}
          <div className="absolute top-0 left-0 h-1 w-full bg-gradient-to-r from-[#F97316] to-[#FB923C]" />

          <CardHeader className="pb-3">
            <div className="flex items-start justify-between">
              <div className="flex gap-3">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#F97316]/10 text-[#F97316] transition-colors group-hover:bg-[#F97316] group-hover:text-white">
                  <Dog className="h-6 w-6" />
                </div>
                <div>
                  <CardTitle className="text-lg font-bold text-gray-800">
                    {x.namaHewan}
                  </CardTitle>
                  <p className="flex items-center gap-1 text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <PawPrint className="h-3 w-3" /> {x.ras}
                  </p>
                </div>
              </div>
              <Badge
                className={`rounded-lg border px-2 py-1 text-[10px] font-bold uppercase ${getStatusColor(x.status)}`}
              >
                {x.status === "confirmed" ? "Dikonfirmasi" : "Menunggu"}
              </Badge>
            </div>
          </CardHeader>

          <CardContent className="space-y-4">
            {/* Service Highlight */}
            <div className="rounded-xl bg-gray-50 p-3 transition-colors group-hover:bg-[#F97316]/5">
              <p className="text-xs text-gray-400 uppercase font-bold">
                Layanan
              </p>
              <p className="text-lg font-extrabold text-[#F97316]">
                {x.layanan}
              </p>
            </div>

            {/* Owner Info */}
            <div className="space-y-2">
              <div className="flex items-center gap-3 text-sm text-gray-600">
                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-gray-100">
                  <User className="h-4 w-4" />
                </div>
                <span className="font-medium">{x.namaPemilik}</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-600">
                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-gray-100 text-blue-500">
                  <PhoneCall className="h-4 w-4" />
                </div>
                <span className="font-mono text-xs">{x.telfon}</span>
              </div>
            </div>

            <Separator className="bg-gray-100" />

            {/* Schedule Info */}
            <div className="flex items-center justify-between">
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                  <Calendar className="h-4 w-4 text-[#F97316]" />
                  {new Date(x.date).toLocaleDateString("id-ID", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                </div>
                <div className="flex items-center gap-2 text-xs font-bold text-gray-500">
                  <Clock className="h-3 w-3 text-gray-400" />
                  {x.time}
                </div>
              </div>

              {/* TOMBOL RESCHEDULE STRATEGIS */}
              <Button
                variant="outline"
                size="sm"
                className="h-9 rounded-xl border-[#F97316]/20 text-[#F97316] hover:bg-[#F97316] hover:text-white transition-all gap-2"
                onClick={() => handleEditOpen()}
              >
                <RefreshCw className="h-3.5 w-3.5" />
                <span className="text-xs font-bold uppercase tracking-tight">
                  Atur Ulang
                </span>
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}

      {showEdit && (
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
                onClick={() => setShowEdit(false)}
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
                    onClick={() => setShowEdit(false)}
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
