"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Shield, UserPlus, Users, Mail, Lock, X } from "lucide-react";
import { useAuth } from "@/lib/auth-context";
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
import { Badge } from "@/components/ui/badge";

type UserRow = {
  id: string;
  name: string;
  email: string;
  role: string;
};

const initialFormState = {
  name: "",
  role: "",
  email: "",
  password: "",
};

export default function AdminPage() {
  const { isAdmin, isLoggedIn } = useAuth();
  const router = useRouter();
  const [showAdd, setShowAdd] = useState(false);
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [role, setrole] = useState<"admin" | "staff" | "cashier">("staff");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [admin, setAdmin] = useState<AdminRow[]>([]);
  const [loading, setLoading] = useState(true);

  type AdminRow = {
    id: number;
    name: string;
    email: string;
    password: string | null;
    role: string;
  };
  useEffect(() => {
    if (isLoggedIn && !isAdmin) {
      router.replace("/");
    }
  }, [isAdmin, isLoggedIn, router]);

  const handleAddAdmin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Bungkus data dari state individu ke dalam satu objek
    const payload = {
      name,
      email,
      password,
      role,
    };

    try {
      const res = await fetch("/api/admin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload), // Gunakan payload, bukan formData
      });

      const result = await res.json();

      if (!res.ok) {
        // Perhatikan: result.error atau result.message?
        // Sesuaikan dengan API yang kita buat tadi (menggunakan result.error)
        alert(`Gagal: ${result.error || result.message}`);
        return;
      }

      alert("Berhasil menyimpan data!");
      setShowAdd(false);
      window.location.reload(); // Refresh untuk melihat data baru
    } catch (error) {
      console.error("Gagal menyambung ke server:", error);
      alert("Terjadi kesalahan koneksi");
    } finally {
      setIsSubmitting(false);
    }
  };
  // Ambil data dari API saat komponen dimuat
  useEffect(() => {
    fetchAdmin();
  }, []);

  const fetchAdmin = async () => {
    try {
      const res = await fetch("/api/admin");
      const data = await res.json();

      // DEBUG: Tambahkan log ini untuk melihat struktur data asli dari database
      console.log("Data dari API:", data);

      // Pastikan data yang masuk ke state adalah array
      if (Array.isArray(data)) {
        setAdmin(data);
      } else if (data.admins) {
        // Jika API membungkusnya dalam properti 'admins'
        setAdmin(data.admins);
      }
    } catch (error) {
      console.error("Gagal mengambil data:", error);
    } finally {
      setLoading(false);
    }
  };
  if (!isLoggedIn) return null;
  if (!isAdmin) return null;

  return (
    <div>
      <header className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-[#1F2937]">
            Admin
          </h1>
          <p className="mt-1 text-sm text-[hsl(var(--muted-foreground))]">
            Kelola pengguna
          </p>
        </div>
        <Button className="gap-2 rounded-xl" onClick={() => setShowAdd(true)}>
          <UserPlus className="h-4 w-4" />
          Tambah User
        </Button>
      </header>

      <Card className="glass-card overflow-hidden rounded-2xl border-0">
        <CardHeader className="flex flex-row items-center gap-2 border-b border-[hsl(var(--border))]">
          <Users className="h-5 w-5 text-[#F97316]" />
          <CardTitle>Daftar User</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nama</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {admin.length > 0 ? (
                admin.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium">{item.name}</TableCell>
                    <TableCell>{item.email}</TableCell>
                    <TableCell>{item.role}</TableCell>
                    <TableCell>
                      <Button>edit</Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={3} className="text-center py-4">
                    {loading ? "Sedang memuat..." : "Tidak ada data admin."}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {showAdd && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#1F2937]/40 p-4">
          <Card className="glass-card w-full max-w-md rounded-2xl border-0 shadow-xl">
            <CardHeader className="flex flex-row items-center justify-between border-b border-[hsl(var(--border))]">
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-[#F97316]" />
                Tambah User Baru
              </CardTitle>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-xl"
                onClick={() => setShowAdd(false)}
              >
                <X className="h-5 w-5" />
              </Button>
            </CardHeader>
            <CardContent className="pt-6">
              <form onSubmit={handleAddAdmin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="add-name">Nama</Label>
                  <div className="relative">
                    <Input
                      id="name"
                      placeholder="Nama lengkap"
                      value={name}
                      onChange={(e) => setname(e.target.value)}
                      className="rounded-xl pl-9"
                      required
                    />
                    <UserPlus className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[hsl(var(--muted-foreground))]" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[hsl(var(--muted-foreground))]" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="email@contoh.com"
                      value={email}
                      onChange={(e) => setemail(e.target.value)}
                      className="rounded-xl pl-9"
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="add-password">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[hsl(var(--muted-foreground))]" />
                    <Input
                      id="password"
                      type="password"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setpassword(e.target.value)}
                      className="rounded-xl pl-9"
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Role</Label>
                  <select
                    value={role}
                    onChange={(e) =>
                      setrole(e.target.value as "admin" | "staff" | "cashier")
                    }
                    className="flex h-10 w-full rounded-xl border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F97316]"
                  >
                    <option value="admin">Admin</option>
                    <option value="staff">Staff</option>
                    <option value="cashier">Kasir</option>
                  </select>
                </div>
                <div className="flex gap-2 pt-2">
                  <Button type="submit" className="flex-1 rounded-xl">
                    Simpan
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    className="rounded-xl"
                    onClick={() => setShowAdd(false)}
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
