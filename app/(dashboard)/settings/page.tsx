"use client";

import { Settings, Store, Bell, Palette, Shield } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function SettingsPage() {
  return (
    <div>
      <header className="mb-6">
        <h1 className="text-2xl font-semibold tracking-tight text-[#1F2937]">
          Pengaturan
        </h1>
        <p className="mt-1 text-sm text-[hsl(var(--muted-foreground))]">
          Konfigurasi toko dan aplikasi
        </p>
      </header>

      <div className="space-y-6">
        <Card className="glass-card overflow-hidden rounded-2xl border-0">
          <CardHeader className="flex flex-row items-center gap-2">
            <Store className="h-5 w-5 text-[#F97316]" />
            <CardTitle>Informasi Toko</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="store-name">Nama Toko</Label>
              <Input
                id="store-name"
                defaultValue="Paw-some Retail"
                className="rounded-xl"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="store-address">Alamat</Label>
              <Input
                id="store-address"
                placeholder="Alamat lengkap"
                className="rounded-xl"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="store-phone">Telepon</Label>
              <Input
                id="store-phone"
                placeholder="+62 ..."
                className="rounded-xl"
              />
            </div>
            <Button className="rounded-xl">Simpan</Button>
          </CardContent>
        </Card>

        <Card className="glass-card overflow-hidden rounded-2xl border-0">
          <CardHeader className="flex flex-row items-center gap-2">
            <Bell className="h-5 w-5 text-[#F97316]" />
            <CardTitle>Notifikasi</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm">Notifikasi stok rendah</span>
              <input type="checkbox" defaultChecked className="rounded" />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Notifikasi janji grooming</span>
              <input type="checkbox" defaultChecked className="rounded" />
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card overflow-hidden rounded-2xl border-0">
          <CardHeader className="flex flex-row items-center gap-2">
            <Palette className="h-5 w-5 text-[#F97316]" />
            <CardTitle>Tampilan</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-[hsl(var(--muted-foreground))]">
              Tema: Paw-some Orange (default)
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
