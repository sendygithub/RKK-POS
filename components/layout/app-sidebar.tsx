"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  ShoppingBag,
  Package,
  Dog,
  Cat,
  Settings,
  Menu,
  X,
  Shield,
} from "lucide-react";
import { useAuth } from "@/lib/auth-context";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/", label: "Dashboard", icon: LayoutDashboard },
  { href: "/pos", label: "POS", icon: ShoppingBag },
  { href: "/inventory", label: "Inventori", icon: Package },
  { href: "/appointments", label: "Janji Grooming", icon: Dog },
  { href: "/settings", label: "Pengaturan", icon: Settings },
];

export function AppSidebar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const { isAdmin } = useAuth();

  return (
    <>
      <button
        type="button"
        onClick={() => setMobileOpen(true)}
        className="fixed left-4 top-4 z-30 flex h-10 w-10 items-center justify-center rounded-xl bg-white/80 text-[#1F2937] shadow-sm backdrop-blur-sm lg:hidden"
        aria-label="Open menu"
      >
        <Menu className="h-5 w-5" />
      </button>

      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-[#1F2937]/20 backdrop-blur-[2px] lg:hidden"
          aria-hidden
          onClick={() => setMobileOpen(false)}
        />
      )}

      <aside
        className={cn(
          "glass fixed left-0 top-0 z-50 h-screen w-64 rounded-r-2xl border-r border-[var(--glass-border)] shadow-glass transition-transform duration-200 ease-out",
          "lg:translate-x-0",
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex h-full flex-col">
          <div className="flex h-16 items-center justify-between border-b border-[var(--glass-border)] px-4 lg:px-6">
            <div className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#F97316] text-white">
                <Cat className="h-5 w-5" />
              </div>
              <span className="text-lg font-semibold tracking-tight text-[#1F2937]">
                Paw-some Retail
              </span>
            </div>
            <button
              type="button"
              onClick={() => setMobileOpen(false)}
              className="flex h-9 w-9 items-center justify-center rounded-lg text-[#1F2937]/70 hover:bg-white/60 lg:hidden"
              aria-label="Close menu"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          <nav className="flex-1 space-y-1 p-4">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors",
                    isActive
                      ? "bg-[#F97316]/10 text-[#F97316]"
                      : "text-[#1F2937]/80 hover:bg-white/60 hover:text-[#1F2937]"
                  )}
                >
                  <Icon className="h-5 w-5 shrink-0" />
                  {item.label}
                </Link>
              );
            })}
            {isAdmin && (
              <Link
                href="/admin"
                onClick={() => setMobileOpen(false)}
                className={cn(
                  "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors",
                  pathname === "/admin"
                    ? "bg-[#F97316]/10 text-[#F97316]"
                    : "text-[#1F2937]/80 hover:bg-white/60 hover:text-[#1F2937]"
                )}
              >
                <Shield className="h-5 w-5 shrink-0" />
                Admin
              </Link>
            )}
          </nav>
          <div className="border-t border-[var(--glass-border)] p-4">
            <p className="text-xs text-[hsl(var(--muted-foreground))]">
              © Paw-some Retail
            </p>
          </div>
        </div>
      </aside>
    </>
  );
}
