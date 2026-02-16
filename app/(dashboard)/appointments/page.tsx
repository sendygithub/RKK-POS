"use client";

import { Dog, Calendar, Clock, User } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const MOCK_APPOINTMENTS = [
  { id: "1", petName: "Max", petType: "Golden Retriever", owner: "Budi", time: "09:00", date: "Hari ini", status: "confirmed" },
  { id: "2", petName: "Luna", petType: "Persian Cat", owner: "Siti", time: "10:30", date: "Hari ini", status: "confirmed" },
  { id: "3", petName: "Buddy", petType: "Beagle", owner: "Andi", time: "14:00", date: "Hari ini", status: "pending" },
  { id: "4", petName: "Mochi", petType: "Poodle", owner: "Dewi", time: "15:30", date: "Hari ini", status: "pending" },
  { id: "5", petName: "Shadow", petType: "German Shepherd", owner: "Rudi", time: "11:00", date: "Besok", status: "pending" },
];

export default function AppointmentsPage() {
  return (
    <div>
      <header className="mb-6">
        <h1 className="text-2xl font-semibold tracking-tight text-[#1F2937]">
          Janji Grooming
        </h1>
        <p className="mt-1 text-sm text-[hsl(var(--muted-foreground))]">
          Jadwal grooming hewan peliharaan
        </p>
      </header>

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
    </div>
  );
}
