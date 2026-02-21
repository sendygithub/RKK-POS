"use client";

import { useState, useEffect } from "react";
import {
  UserPlus,
  Users,
  Mail,
  Phone,
  MapPin,
  X,
  Search,
  User,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// Sesuai dengan Model Prisma Customer
type CustomerRow = {
  id: number;
  name: string;
  phone: string;
  email?: string | null;
  address?: string | null;
};

export default function CustomerPage() {
  const [data, setData] = useState<CustomerRow[]>([]);

  useEffect(() => {
    fetch("/api/customer")
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
        <CustomerPage />
      </Card>
    </div>
  );
}
