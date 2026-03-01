"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { AppSidebar } from "@/components/layout/app-sidebar";
import { HeaderDateTime } from "@/components/layout/header-datetime";

const PUBLIC_PATHS = ["/login"];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();

  const isPublic = PUBLIC_PATHS.some((p) => pathname.startsWith(p));

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
