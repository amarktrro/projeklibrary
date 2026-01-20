'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FaHome, FaSearch, FaInfoCircle } from 'react-icons/fa';

export default function Sidebar() {
  const pathname = usePathname();

  // Helper function to style active links
  const getLinkStyle = (path: string) => {
    const isActive = pathname === path;
    return isActive
      ? "flex items-center gap-3 px-6 py-3 bg-[#1e293b] text-white border-l-4 border-orange-500 transition-all"
      : "flex items-center gap-3 px-6 py-3 text-gray-600 hover:bg-gray-50 hover:text-orange-500 transition-colors";
  };

  return (
    <aside className="w-64 bg-white shadow-lg fixed h-full hidden md:block z-10">
      <div className="py-6">
        <ul className="space-y-1">
          <li>
            <Link href="/user/dashboard" className={getLinkStyle('/user/dashboard')}>
              <FaHome />
              <span className="font-medium">Dashboard</span>
            </Link>
          </li>
          
          <li>
            <Link href="/user/dashboard/cari-buku" className={getLinkStyle('/user/dashboard/cari-buku')}>
              <FaSearch />
              <span className="font-medium">Cari Buku</span>
            </Link>
          </li>

          <li>
            <Link href="/user/dashboard/informasi" className={getLinkStyle('/user/dashboard/informasi')}>
              <FaInfoCircle />
              <span className="font-medium">Informasi</span>
            </Link>
          </li>
        </ul>
      </div>
    </aside>
  );
}