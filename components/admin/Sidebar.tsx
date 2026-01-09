"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, Book, Users, ClipboardList, Wallet, 
  QrCode, BarChart3, FileText, Info 
} from "lucide-react";

export default function Sidebar() {
  const pathname = usePathname();

  const menuItems = [
    { name: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },
    { name: "Kelola Buku", icon: Book, path: "/buku" },
    { name: "Kelola User", icon: Users, path: "/users" },
    { name: "Peminjaman", icon: ClipboardList, path: "/peminjaman" },
    { name: "Kelola Denda", icon: Wallet, path: "/denda" },
    { name: "Buku Tamu & Scan QR", icon: QrCode, path: "/guest-book" },
    { name: "Laporan Keuangan", icon: BarChart3, path: "/laporan" },
    { name: "Laporan Lainnya", icon: FileText, path: "/laporan-lainnya" },
    { name: "Informasi", icon: Info, path: "/informasi" },
  ];

  return (
    <div className="h-full bg-white flex flex-col p-6 pt-10">
      <nav className="flex-1 space-y-1">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.path;
          
          return (
            <Link
              key={item.name}
              href={item.path}
              className={`flex items-center gap-4 px-4 py-3 rounded-2xl font-bold text-sm transition-all relative group ${
                isActive 
                ? "bg-slate-50 text-[#1e293b]" 
                : "text-slate-400 hover:text-[#1e293b] hover:bg-slate-50/50"
              }`}
            >
              {/* Orange Active Indicator from your screenshot */}
              {isActive && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-8 bg-orange-500 rounded-r-full shadow-md" />
              )}
              
              <Icon size={18} className={isActive ? "text-[#1e293b]" : "text-slate-400"} />
              <span className="truncate">{item.name}</span>
            </Link>
          );
        })}
      </nav>

      {/* Bottom Profile Circle */}
      <div className="pt-6 border-t border-slate-50">
        <div className="w-10 h-10 bg-[#1e293b] rounded-full flex items-center justify-center text-white font-black text-xs border-4 border-white shadow-sm">
          N
        </div>
      </div>
    </div>
  );
}