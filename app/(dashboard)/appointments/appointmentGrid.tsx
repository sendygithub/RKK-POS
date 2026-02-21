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
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

export const dynamic = "force-dynamic";

export default function AppointmentGrid() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("/api/appointments")
      .then((res) => res.json())
      .then(setData);
  }, []);

  // Helper untuk warna status
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
              {x.alamat && (
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <div className="flex h-7 w-7 items-center justify-center rounded-full bg-gray-100">
                    <MapPin className="h-4 w-4" />
                  </div>
                  <span className="truncate italic text-gray-400">
                    {x.alamat}
                  </span>
                </div>
              )}
            </div>

            <Separator className="bg-gray-100" />

            {/* Schedule Info */}
            <div className="flex items-center justify-between rounded-xl">
              <div className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                <Calendar className="h-4 w-4 text-[#F97316]" />
                {new Date(x.date).toLocaleDateString("id-ID", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                })}
              </div>
              <div className="flex items-center gap-2 rounded-lg bg-black text-white px-3 py-1 text-sm font-bold">
                <Clock className="h-4 w-4 text-[#F97316]" />
                {x.time}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
