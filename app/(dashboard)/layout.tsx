"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { AppSidebar } from "@/components/layout/app-sidebar";
import { HeaderDateTime } from "@/components/layout/header-datetime";
import { useAuth } from "@/lib/auth-context";

const PUBLIC_PATHS = ["/login"];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const { isLoggedIn } = useAuth();
  const isPublic = PUBLIC_PATHS.some((p) => pathname.startsWith(p));

  useEffect(() => {
    if (!isPublic && !isLoggedIn) {
      router.replace(`/login?redirect=${encodeURIComponent(pathname)}`);
    }
  }, [isLoggedIn, isPublic, pathname, router]);

  if (!isPublic && !isLoggedIn) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#FDF8F3]">
        <p className="text-[hsl(var(--muted-foreground))]">Memuat...</p>
      </div>
    );
  }

  if (isPublic) {
    return <>{children}</>;
  }

  return (
    <>
      <AppSidebar />
      <div className="flex min-h-screen flex-col pl-14 lg:pl-64">
        <HeaderDateTime />
        <main className="flex-1 p-4 pt-4 lg:p-6 lg:pt-6">{children}</main>
      </div>
    </>
  );
}
