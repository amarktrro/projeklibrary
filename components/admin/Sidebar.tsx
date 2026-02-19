"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  FaHome, FaBook, FaUsers, FaClipboardList, FaWallet, 
  FaQrcode, FaChartBar, FaFileAlt, FaInfoCircle
} from "react-icons/fa";

export default function Sidebar() {
  const pathname = usePathname();

  const menuItems = [
    { name: "Dashboard", icon: FaHome, path: "/dashboard" },
    { name: "Kelola Buku", icon: FaBook, path: "/buku" },
    { name: "Kelola User", icon: FaUsers, path: "/users" },
    { name: "Peminjaman", icon: FaClipboardList, path: "/peminjaman" },
    { name: "Kelola Denda", icon: FaWallet, path: "/denda" },
    { name: "Buku Tamu & Scan QR", icon: FaQrcode, path: "/guest-book" },
    { name: "Laporan Keuangan", icon: FaChartBar, path: "/laporan" },
    { name: "Laporan Lainnya", icon: FaFileAlt, path: "/laporan-lainnya" },
    { name: "Informasi", icon: FaInfoCircle, path: "/informasi" },
  ];

  // Helper function to style active links
  const getLinkStyle = (path: string) => {
    const isActive = pathname === path || pathname.startsWith(path);
    return isActive
      ? "flex items-center gap-3 px-6 py-3 bg-[#172e5f] text-white border-l-4 border-orange-500 transition-all relative"
      : "flex items-center gap-3 px-6 py-3 text-gray-700 hover:text-[#172e5f] hover:font-bold hover:translate-x-1 transition-all transition-delay duration-200 relative group";
  };

  return (
    <div className="h-full">
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
          width: 4px;
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
            width: 4px;
          }
        }
      `}</style>
      <div className="py-6">
        <ul className="space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            
            return (
              <li key={item.name}>
                <Link 
                  href={item.path} 
                  className={getLinkStyle(item.path)}
                >
                  <Icon />
                  <span className="font-medium">{item.name}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
