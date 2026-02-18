"use client";

import React from "react";
import Sidebar from "@/components/admin/Sidebar";
import TopNav from "@/components/admin/TopNav";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen bg-[#f5f5f5]">
      {/* Top Navbar - Fixed at the top with Navy Blue */}
      <div className="fixed top-0 w-full z-50">
        <TopNav />
      </div>

      <div className="flex flex-1 pt-16 min-h-screen">
        {/* Sidebar - Fixed to the left with white background */}
        <aside className="w-72 fixed h-[calc(100vh-64px)] z-40 bg-white shadow-xl">
          <Sidebar />
        </aside>

        {/* Main Content Area - This is where your page.tsx code appears */}
        <main className="flex-1 ml-72 p-10">
          <div className="bg-white rounded-[3.5rem] min-h-full shadow-sm border border-gray-200 p-12">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
