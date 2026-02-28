"use client";

import { useState, useEffect } from "react";
import { UserPlus, Users, Mail, Phone, MapPin, X, User } from "lucide-react";
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
import { format } from "date-fns";
import { id } from "date-fns/locale";

type CustomerRow = {
  id: number;
  name: string;
  phone: string;
  email?: string | null;
  address?: string | null;
  appointments: any[];
  pets?: any[];
};

type Appointment = {
  id: number;
  date: Date; // sesuaikan dengan schema
};

// Inisialisasi data kosong untuk reset form
const initialFormState = {
  name: "",
  phone: "",
  email: "",
  address: "",
};

export default function CustomerPage() {
  const [showAdd, setShowAdd] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [editFormData, setEditFormData] = useState(initialFormState);
  const [currentId, setCurrentId] = useState<number | null>(null);
  const [customers, setCustomers] = useState<CustomerRow[]>([]);
  const [formData, setFormData] = useState(initialFormState);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showAddPet, setShowAddPet] = useState(false);
  const [selectedCustomerId, setSelectedCustomerId] = useState<number | null>(
    null,
  );
  const [petFormData, setPetFormData] = useState({
    name: "",
    type: "Kucing", // Default value
    breed: "",
    weight: "",
    gender: "Male",
  });

  // Ambil data dari API saat komponen dimuat
  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      const res = await fetch("/api/customer");
      const data = await res.json();
      setCustomers(data);
    } catch (error) {
      console.error("Gagal mengambil data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await fetch("/api/customer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await res.json();

      if (!res.ok) {
        // Menampilkan pesan error dari API (misal: "phone sudah terdaftar")
        alert(`Gagal: ${result.message}`);
        return;
      }

      // Jika berhasil
      alert("Berhasil menyimpan data!");
      setFormData(initialFormState);
      setShowAdd(false);
      fetchCustomers(); // Refresh tabel
    } catch (error) {
      console.error("Gagal menyambung ke server:", error);
      alert("Terjadi kesalahan koneksi");
    } finally {
      setIsSubmitting(false);
    }
  };
  const handlePetSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/pet", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...petFormData,
          customerId: selectedCustomerId,
        }),
      });

      if (res.ok) {
        setShowAddPet(false);
        setPetFormData({
          name: "",
          type: "Kucing",
          breed: "",
          weight: "",
          gender: "Male",
        });
        fetchCustomers(); // Refresh tabel agar nama pet muncul
      } else {
        const err = await res.json();
        alert(err.message);
      }
    } catch (error) {
      alert("Terjadi kesalahan koneksi");
    }
  };

  const handleEditOpen = (customer: CustomerRow) => {
    setSelectedCustomerId(customer.id); // Simpan ID yang sedang diedit
    setFormData({
      name: customer.name,
      phone: customer.phone,
      email: customer.email || "",
      address: customer.address || "",
    });
    setShowEdit(true); // Buka modal edit
  };

  // 2. Tambahkan fungsi hapus
  const handleDelete = async (id: number) => {
    if (confirm("Apakah Anda yakin ingin menghapus pelanggan ini?")) {
      const res = await fetch(`/api/customer?id=${id}`, { method: "DELETE" });
      if (res.ok) {
        fetchCustomers();
      } else {
        alert("Gagal menghapus");
      }
    }
  };

  return (
    <div className="p-6">
      <header className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-[#1F2937]">
            Database Customer
          </h1>
          <p className="mt-1 text-sm text-[hsl(var(--muted-foreground))]">
            Kelola data pelanggan dan informasi kontak
          </p>
        </div>
        <Button
          className="gap-2 rounded-xl bg-[#F97316] hover:bg-[#EA580C]"
          onClick={() => setShowAdd(true)}
        >
          <UserPlus className="h-4 w-4" />
          Tambah Customer
        </Button>
      </header>

      <Card className="glass-card overflow-hidden rounded-2xl border-0 shadow-sm">
        <CardHeader className="flex flex-row items-center gap-2 border-b border-[hsl(var(--border))]">
          <Users className="h-5 w-5 text-[#F97316]" />
          <CardTitle>Daftar Pelanggan</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nama</TableHead>
                <TableHead>Telepon</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Alamat</TableHead>
                <TableHead>Hewan Peliharaan</TableHead>

                <TableHead>Appointment</TableHead>
                <TableHead>tambah hewan</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={4} className="text-center py-4">
                    Loading...
                  </TableCell>
                </TableRow>
              ) : (
                customers.map((customer) => (
                  <TableRow key={customer.id}>
                    <TableCell className="font-medium">
                      {customer.name}
                    </TableCell>
                    <TableCell>{customer.phone}</TableCell>
                    <TableCell>{customer.email || "-"}</TableCell>
                    <TableCell>{customer.address || "-"}</TableCell>
                    <TableCell>
                      {customer.pets?.map((p) => p.name).join(", ") || "-"}
                    </TableCell>
                    <TableCell>
                      {customer.appointments?.length
                        ? customer.appointments
                            .map((a) =>
                              format(new Date(a.date), "dd MMM yyyy", {
                                locale: id,
                              }),
                            )
                            .join(", ")
                        : "-"}
                    </TableCell>
                    <TableCell className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        className="rounded-lg border-orange-200 text-orange-600 hover:bg-orange-50"
                        onClick={() => {
                          setSelectedCustomerId(customer.id);
                          setShowAddPet(true);
                        }}
                      >
                        + Pet
                      </Button>
                      {/* Tombol Edit/Hapus Anda yang lain */}
                    </TableCell>
                    <TableCell>
                      {/* Di dalam mapping customers tabel */}

                      <Button onClick={() => handleEditOpen(customer)}>
                        Edit
                      </Button>
                      <Button onClick={() => handleDelete(customer.id)}>
                        Hapus
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Modal Overlay Tambah user */}
      {showAdd && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#1F2937]/40 backdrop-blur-sm p-4">
          <Card className="glass-card w-full max-w-md rounded-2xl border-0 shadow-xl">
            <CardHeader className="flex flex-row items-center justify-between border-b border-[hsl(var(--border))]">
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5 text-[#F97316]" />
                Customer Baru
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
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nama Lengkap *</Label>
                  <div className="relative">
                    <Input
                      id="name"
                      placeholder="Masukkan nama"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      className="rounded-xl pl-9"
                      required
                    />
                    <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[hsl(var(--muted-foreground))]" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Nomor Telepon *</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[hsl(var(--muted-foreground))]" />
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="0812..."
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                      className="rounded-xl pl-9"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email (Opsional)</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[hsl(var(--muted-foreground))]" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="email@contoh.com"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      className="rounded-xl pl-9"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address">Alamat (Opsional)</Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 h-4 w-4 text-[hsl(var(--muted-foreground))]" />
                    <textarea
                      id="address"
                      placeholder="Alamat lengkap..."
                      value={formData.address}
                      onChange={(e) =>
                        setFormData({ ...formData, address: e.target.value })
                      }
                      className="flex min-h-[80px] w-full rounded-xl border border-input bg-background px-3 py-2 pl-9 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F97316]"
                    />
                  </div>
                </div>

                <div className="flex gap-2 pt-2">
                  <Button
                    type="submit"
                    className="flex-1 rounded-xl bg-[#F97316]"
                  >
                    Simpan Data
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

      {/* Modal Overlay Edit user */}
      {showEdit && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#1F2937]/40 backdrop-blur-sm p-4">
          <Card className="glass-card w-full max-w-md rounded-2xl border-0 shadow-xl">
            <CardHeader className="flex flex-row items-center justify-between border-b border-[hsl(var(--border))]">
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5 text-[#F97316]" />
                Edit Data Customer
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
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nama Lengkap *</Label>
                  <div className="relative">
                    <Input
                      id="name"
                      placeholder="Masukkan nama"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      className="rounded-xl pl-9"
                      required
                    />
                    <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[hsl(var(--muted-foreground))]" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Nomor Telepon *</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[hsl(var(--muted-foreground))]" />
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="0812..."
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                      className="rounded-xl pl-9"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email (Opsional)</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[hsl(var(--muted-foreground))]" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="email@contoh.com"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      className="rounded-xl pl-9"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address">Alamat (Opsional)</Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 h-4 w-4 text-[hsl(var(--muted-foreground))]" />
                    <textarea
                      id="address"
                      placeholder="Alamat lengkap..."
                      value={formData.address}
                      onChange={(e) =>
                        setFormData({ ...formData, address: e.target.value })
                      }
                      className="flex min-h-[80px] w-full rounded-xl border border-input bg-background px-3 py-2 pl-9 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F97316]"
                    />
                  </div>
                </div>

                <div className="flex gap-2 pt-2">
                  <Button
                    type="submit"
                    className="flex-1 rounded-xl bg-[#F97316]"
                  >
                    Update Data
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

      {/* Modal Overlay tambah pet*/}
      {showAddPet && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#1F2937]/40 backdrop-blur-sm p-4">
          <Card className="glass-card w-full max-w-md rounded-2xl border-0 shadow-xl">
            <CardHeader className="flex flex-row items-center justify-between border-b">
              <CardTitle className="flex items-center gap-2 text-lg">
                <div className="bg-orange-100 p-2 rounded-lg">
                  <span className="text-xl">🐾</span>
                </div>
                Tambah Hewan Peliharaan
              </CardTitle>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowAddPet(false)}
              >
                <X className="h-5 w-5" />
              </Button>
            </CardHeader>
            <CardContent className="pt-6">
              <form onSubmit={handlePetSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Nama Hewan</Label>
                    <Input
                      required
                      placeholder="Moli..."
                      value={petFormData.name}
                      onChange={(e) =>
                        setPetFormData({ ...petFormData, name: e.target.value })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Jenis (Spesies)</Label>
                    <select
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                      value={petFormData.type}
                      onChange={(e) =>
                        setPetFormData({ ...petFormData, type: e.target.value })
                      }
                    >
                      <option value="Kucing">Kucing</option>
                      <option value="Anjing">Anjing</option>
                      <option value="Burung">Burung</option>
                      <option value="Lainnya">Lainnya</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Ras / Breed (Opsional)</Label>
                  <Input
                    placeholder="Persia, Golden Retriever..."
                    value={petFormData.breed}
                    onChange={(e) =>
                      setPetFormData({ ...petFormData, breed: e.target.value })
                    }
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Berat (kg)</Label>
                    <Input
                      type="number"
                      step="0.1"
                      placeholder="4.5"
                      value={petFormData.weight}
                      onChange={(e) =>
                        setPetFormData({
                          ...petFormData,
                          weight: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Gender</Label>
                    <select
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                      value={petFormData.gender}
                      onChange={(e) =>
                        setPetFormData({
                          ...petFormData,
                          gender: e.target.value,
                        })
                      }
                    >
                      <option value="Male">Jantan</option>
                      <option value="Female">Betina</option>
                    </select>
                  </div>
                </div>

                <div className="flex gap-2 pt-4">
                  <Button type="submit" className="flex-1 bg-[#F97316]">
                    Simpan Hewan
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setShowAddPet(false)}
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
