"use client";

import React from "react";
import { GraduationCap, User, LogOut } from "lucide-react";

export default function TopBar() {
  return (
    <nav className="bg-[#1e293b] h-16 w-full flex items-center justify-between px-6 fixed top-0 left-0 z-50 shadow-md">
      {/* Brand Section */}
      <div className="flex items-center gap-3 text-white">
        <GraduationCap size={28} strokeWidth={2.5} />
        <span className="text-xl font-bold tracking-tight">SIMPES JTIK</span>
      </div>

      {/* User Actions Section */}
      <div className="flex items-center gap-6 text-white">
        {/* User Profile Info */}
        <div className="flex items-center gap-2">
          <User size={18} className="text-slate-300" />
          <span className="text-sm font-medium">Ahmad Fajar</span>
        </div>

        {/* Orange Logout Button */}
        <button className="bg-orange-500 hover:bg-orange-600 text-white px-5 py-2 rounded-lg text-sm font-bold flex items-center gap-2 transition-all shadow-sm">
          <LogOut size={16} />
          Logout
        </button>
      </div>
    </nav>
  );
}