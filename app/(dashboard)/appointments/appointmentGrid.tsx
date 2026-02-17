"use client";

import React from "react";
import { Dog, Calendar, Clock, User, PhoneCall } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useState, useEffect } from "react";

export const dynamic = "force-dynamic";

export default function AppointmentGrid() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("/api/appointments")
      .then((res) => res.json())
      .then(setData);
  }, []);

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {data.map((x: any) => (
        <Card
          key={x.id}
          className="glass-card overflow-hidden rounded-2xl border-0"
        >
          <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
            <div className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#F97316]/10 text-[#F97316]">
                <Dog className="h-5 w-5" />
              </div>
              <div>
                <CardTitle className="text-base">{x.namaHewan}</CardTitle>
                <p className="text-xs text-muted-foreground">{x.ras}</p>
                <h1 className="text-3xl items-center justify-center">
                  {x.layanan}
                </h1>
                <p className="flex items-center gap-2 text-sm text-muted-foreground">
                  cp owner:
                </p>
              </div>
            </div>

            <Badge
              variant={x.status === "confirmed" ? "default" : "secondary"}
              className="rounded-full"
            >
              {x.status === "confirmed" ? "Dikonfirmasi" : "Menunggu"}
            </Badge>
          </CardHeader>

          <CardContent className="space-y-2">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <User className="h-4 w-4" />
              {x.namaPemilik}
              <PhoneCall className="h-4 w-4" />
              {x.telfon}
            </div>

            <div className="flex items-center gap-2 text-sm">
              <Calendar className="h-4 w-4 text-[#F97316]" />
              {new Date(x.date).toLocaleDateString("id-ID")}
            </div>

            <div className="flex items-center gap-2 text-sm">
              <Clock className="h-4 w-4 text-[#F97316]" />
              {x.time}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
