"use client";

import React from "react";
import Sidebar from "@/components/admin/Sidebar";
import TopNav from "@/components/admin/TopNav";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen bg-[#f1f5f9]">
      {/* Top Navbar - Fixed at the top with Slate Navy */}
      <div className="fixed top-0 w-full z-50">
        <TopNav />
      </div>

      <div className="flex flex-1 pt-16 min-h-screen">
        {/* Sidebar - Fixed to the left with White background */}
        <aside className="w-72 fixed h-[calc(100vh-64px)] z-40 bg-white border-r border-slate-100">
          <Sidebar />
        </aside>

        {/* Main Content Area - This is where your page.tsx code appears */}
        <main className="flex-1 ml-72 p-10">
          <div className="bg-white rounded-[3.5rem] min-h-full shadow-sm border border-slate-100 p-12">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}