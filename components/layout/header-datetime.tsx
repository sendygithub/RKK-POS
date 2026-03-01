"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Calendar, Clock, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSession, signOut } from "next-auth/react"; // Import dari NextAuth
import type { Session } from "next-auth";

declare module "next-auth" {
  interface User {
    id?: string;
    name?: string;
    email?: string;
  }
}

function formatDate(d: Date) {
  return d.toLocaleDateString("id-ID", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function formatTime(d: Date) {
  return d.toLocaleTimeString("id-ID", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
}

export function HeaderDateTime() {
  const router = useRouter();
  const [dateTime, setDateTime] = useState<Date>(new Date());
  const { data: session, status } = useSession();

  useEffect(() => {
    const t = setInterval(() => setDateTime(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  return (
    <header className="glass sticky top-0 z-20 flex h-14 items-center justify-between gap-4 border-b border-[var(--glass-border)] px-4 lg:px-8">
      <div className="flex-1" />
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-3 text-sm text-[#1F2937]/80">
          <span className="flex items-center gap-1.5">
            <Calendar className="h-4 w-4 text-[#F97316]" />
            {formatDate(dateTime)}
          </span>
          <span className="flex items-center gap-1.5 font-medium tabular-nums">
            <Clock className="h-4 w-4 text-[#F97316]" />
            {formatTime(dateTime)}
          </span>
        </div>
        <span className="hidden text-xs text-[hsl(var(--muted-foreground))] sm:inline">
          <span>
            <p className="text-[10px] text-[hsl(var(--muted-foreground))] uppercase tracking-wider">
              {session?.user?.role || "Staff"}
            </p>
          </span>
        </span>

        <p className="text-[10px] text-[hsl(var(--muted-foreground))] uppercase tracking-wider">
          {status === "loading" ? "Loading..." : session?.user?.name || "Admin"}
        </p>
        <Button
          variant="ghost"
          size="sm"
          className="gap-2 rounded-xl text-[hsl(var(--muted-foreground))]"
          onClick={() => {
            signOut();
            router.push("/login");
          }}
        >
          <LogOut className="h-4 w-4" />
          Logout
        </Button>
      </div>
    </header>
  );
}
