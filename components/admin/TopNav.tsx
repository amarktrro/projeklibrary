"use client";

import React from "react";
import { GraduationCap, User, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";

export default function TopNav() {
  const router = useRouter();

  const handleLogout = () => {
    router.push("/admin-login");
  };

  return (
    <nav className="bg-[#1e293b] h-16 w-full flex items-center justify-between px-8 text-white shadow-md border-b border-white/5">
      {/* Brand Section */}
      <div className="flex items-center gap-3">
        <GraduationCap size={28} className="text-white" />
        <span className="text-xl font-black tracking-tighter">
          SIMPES <span className="text-orange-500 italic">JTIK</span>
        </span>
      </div>

      {/* User Actions Section */}
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2">
          <User size={18} className="text-slate-300" />
          <span className="text-sm font-medium">Ahmad Fajar</span>
        </div>

        <button 
          onClick={handleLogout}
          className="bg-orange-500 hover:bg-orange-600 text-white px-5 py-2 rounded-lg text-sm font-bold flex items-center gap-2 transition-all shadow-sm active:scale-95"
        >
          <LogOut size={16} />
          Logout
        </button>
      </div>
    </nav>
  );
}