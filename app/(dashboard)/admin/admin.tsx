"use client";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Users } from "lucide-react";
import React from "react";
import { useState, useEffect } from "react";
import CustomerPage from "../customer/customer";
import AdminPage from "./page";

type AdminRow = {
  id: number;
  name: string;
  phone: string;
  email?: string | null;
  address?: string | null;
};
export default function adminPage() {
  const [data, setData] = useState<AdminRow[]>([]);

  useEffect(() => {
    fetch("/api/admin")
      .then((res) => res.json())
      .then(setData);
  }, []);

  return (
    <div className="p-6">
      <Card className="glass-card overflow-hidden rounded-2xl border-0 shadow-sm">
        <CardHeader className="flex flex-row items-center gap-2 border-b border-[hsl(var(--border))]">
          <Users className="h-5 w-5 text-[#F97316]" />
          <CardTitle>Daftar Pelanggan</CardTitle>
        </CardHeader>
        <AdminPage />
      </Card>
    </div>
  );
}
