"use client";

import React from "react";
import Sidebar from "@/components/admin/Sidebar";
import TopNav from "@/components/admin/TopNav";
import { usePathname } from "next/navigation";
import "@/app/globals.css";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // Define the login path to hide sidebar
  const isLoginPage = pathname === "/admin-login";

  if (isLoginPage) {
    return <div className="min-h-screen bg-[#1a2e5a]">{children}</div>;
  }

  return (
    <div className="flex min-h-screen bg-[#f8fafc]">
      {/* Sidebar is rendered HERE ONLY */}
      <aside className="w-72 bg-[#1a2e5a] fixed h-full z-40 shadow-2xl">
        <Sidebar />
      </aside>

      {/* Content Area - Offset by Sidebar Width (ml-72) */}
      <div className="flex-1 ml-72 flex flex-col min-h-screen">
        <TopNav />
        <main className="p-10 flex-1 bg-white rounded-tl-[3rem] shadow-inner mt-4">
          {children}
        </main>
      </div>
    </div>
  );
}