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

const MOCK_USERS: UserRow[] = [
  { id: "1", name: "Admin", email: "admin@pawsome.com", role: "admin" },
  { id: "2", name: "Staff", email: "staff@pawsome.com", role: "staff" },
  { id: "3", name: "Kasir", email: "kasir@pawsome.com", role: "cashier" },
];

export default function AdminPage() {
  const { isAdmin, isLoggedIn } = useAuth();
  const router = useRouter();
  const [users, setUsers] = useState<UserRow[]>(MOCK_USERS);
  const [showAdd, setShowAdd] = useState(false);
  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newRole, setNewRole] = useState<"admin" | "staff" | "cashier">("staff");

  useEffect(() => {
    if (isLoggedIn && !isAdmin) {
      router.replace("/");
    }
  }, [isAdmin, isLoggedIn, router]);

  const handleAddUser = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim() || !newEmail.trim() || !newPassword.trim()) return;
    setUsers((prev) => [
      ...prev,
      {
        id: String(prev.length + 1),
        name: newName.trim(),
        email: newEmail.trim(),
        role: newRole,
      },
    ]);
    setNewName("");
    setNewEmail("");
    setNewPassword("");
    setNewRole("staff");
    setShowAdd(false);
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
        <Button
          className="gap-2 rounded-xl"
          onClick={() => setShowAdd(true)}
        >
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
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((u) => (
                <TableRow key={u.id}>
                  <TableCell className="font-medium">{u.name}</TableCell>
                  <TableCell className="text-[hsl(var(--muted-foreground))]">
                    {u.email}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        u.role === "admin"
                          ? "default"
                          : u.role === "staff"
                          ? "secondary"
                          : "outline"
                      }
                      className="rounded-full"
                    >
                      {u.role}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
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
              <form onSubmit={handleAddUser} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="add-name">Nama</Label>
                  <div className="relative">
                    <Input
                      id="add-name"
                      placeholder="Nama lengkap"
                      value={newName}
                      onChange={(e) => setNewName(e.target.value)}
                      className="rounded-xl pl-9"
                      required
                    />
                    <UserPlus className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[hsl(var(--muted-foreground))]" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="add-email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[hsl(var(--muted-foreground))]" />
                    <Input
                      id="add-email"
                      type="email"
                      placeholder="email@contoh.com"
                      value={newEmail}
                      onChange={(e) => setNewEmail(e.target.value)}
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
                      id="add-password"
                      type="password"
                      placeholder="••••••••"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="rounded-xl pl-9"
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Role</Label>
                  <select
                    value={newRole}
                    onChange={(e) =>
                      setNewRole(e.target.value as "admin" | "staff" | "cashier")
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
