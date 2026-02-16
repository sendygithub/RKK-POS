"use client";

import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Cat, Lock, Mail } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/lib/auth-context";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login, isLoggedIn } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") ?? "/";

  if (isLoggedIn) {
    router.replace(redirect);
    return null;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (login(email, password)) {
      router.replace(redirect);
    } else {
      setError("Email atau password salah.");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#FDF8F3] p-4">
      <Card className="glass-card w-full max-w-md rounded-2xl border-0 p-6 shadow-lg">
        <CardHeader className="space-y-1 text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#F97316] text-white">
            <Cat className="h-8 w-8" />
          </div>
          <CardTitle className="text-2xl font-semibold text-[#1F2937]">
            Paw-some Retail
          </CardTitle>
          <p className="text-sm text-[hsl(var(--muted-foreground))]">
            Masuk ke dashboard
          </p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <p className="rounded-xl bg-red-50 px-3 py-2 text-sm text-red-600">
                {error}
              </p>
            )}
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[hsl(var(--muted-foreground))]" />
                <Input
                  id="email"
                  type="email"
                  placeholder="admin@pawsome.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="rounded-xl pl-9"
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[hsl(var(--muted-foreground))]" />
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="rounded-xl pl-9"
                  required
                />
              </div>
            </div>
            <Button type="submit" className="w-full rounded-xl" size="lg">
              Masuk
            </Button>
          </form>
          <p className="mt-4 text-center text-xs text-[hsl(var(--muted-foreground))]">
            Demo: admin@pawsome.com / admin123 (admin) atau staff@pawsome.com /
            staff123 (staff)
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-[#FDF8F3]">
          <p className="text-[hsl(var(--muted-foreground))]">Memuat...</p>
        </div>
      }
    >
      <LoginForm />
    </Suspense>
  );
}
