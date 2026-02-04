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
      <style>{`
        .group:hover::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(to right, rgba(200, 200, 200, 0.2), rgba(200, 200, 200, 0));
          border-radius: inherit;
          pointer-events: none;
          animation: fadeIn 0.3s ease-out forwards;
        }

        .group:hover::after {
          content: '';
          position: absolute;
          left: 0;
          top: 50%;
          transform: translateY(-50%);
          width: 6px;
          height: 32px;
          background-color: #f97316;
          border-radius: 0 4px 4px 0;
          animation: slideIn 0.3s ease-out 0.15s forwards;
          opacity: 0;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes slideIn {
          from {
            opacity: 0;
            width: 0;
          }
          to {
            opacity: 1;
            width: 6px;
          }
        }
      `}</style>
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
                ? "bg-[#172e5f] text-white" 
                : "text-gray-700 hover:text-[#172e5f] hover:font-bold hover:translate-x-1 transition-all duration-200"
              }`}
            >
              {/* Orange Active Indicator from your screenshot */}
              {isActive && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-8 bg-orange-500 rounded-r-full shadow-md" />
              )}
              
              <Icon size={18} className={isActive ? "text-white" : "text-gray-700"} />
              <span className="truncate">{item.name}</span>
            </Link>
          );
        })}
      </nav>

      {/* Bottom Profile Circle */}
      <div className="pt-6 border-t border-gray-200">
        <div className="w-10 h-10 bg-[#172e5f] rounded-full flex items-center justify-center text-white font-black text-xs border-4 border-[#172e5f] shadow-sm">
          N
        </div>
      </div>
    </div>
  );
}
