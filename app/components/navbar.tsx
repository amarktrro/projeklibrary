'use client';

import React from 'react';
import Link from 'next/link';
import { FaUser, FaSignOutAlt, FaGraduationCap } from 'react-icons/fa';

export default function Navbar() {
  return (
    <nav className="bg-[#1e293b] text-white h-16 flex items-center justify-between px-6 shadow-md fixed w-full z-20">
      {/* Brand / Logo */}
      <div className="flex items-center gap-3">
        <FaGraduationCap className="text-3xl" />
        <h1 className="text-xl font-bold tracking-wide">SIMPES JTIK</h1>
      </div>

      {/* Right Side Actions */}
      <div className="flex items-center gap-6">
        {/* Profile Link - Path updated to match app/user/dashboard/profile */}
        <Link 
          href="/user/dashboard/profile" 
          className="flex items-center gap-2 hover:text-orange-400 transition-colors cursor-pointer group"
        >
          <div className="bg-white/10 p-1.5 rounded-full group-hover:bg-white/20 transition-all">
            <FaUser className="text-sm" />
          </div>
          <span className="font-medium text-sm">Ahmad Fajar</span>
        </Link>

        {/* Logout Button */}
        <Link href="/">
          <button className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-1.5 rounded-md text-sm font-bold flex items-center gap-2 transition-colors">
            <FaSignOutAlt /> Logout
          </button>
        </Link>
      </div>
    </nav>
  );
}