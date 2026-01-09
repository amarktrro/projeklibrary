"use client";

import React from "react";
import { Book, Users, ClipboardList, AlertCircle, ArrowUpRight } from "lucide-react";

export default function DashboardPage() {
  const stats = [
    { label: "TOTAL BUKU", value: "1.234", trend: "+12%", icon: Book, color: "bg-blue-500" },
    { label: "ANGGOTA", value: "567", trend: "+5%", icon: Users, color: "bg-orange-500" },
    { label: "PEMINJAMAN", value: "89", trend: "+18%", icon: ClipboardList, color: "bg-emerald-500" },
    { label: "TERLAMBAT", value: "12", trend: "-2%", icon: AlertCircle, color: "bg-red-500" },
  ];

  return (
    <div className="space-y-10">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-black text-[#1e293b] tracking-tight">Dashboard Overview</h1>
        <p className="text-slate-400 font-bold mt-2">Monitoring data perpustakaan JTIK hari ini.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-50 flex flex-col gap-4">
            <div className={`${stat.color} w-12 h-12 rounded-2xl flex items-center justify-center text-white shadow-lg`}>
              <stat.icon size={24} />
            </div>
            <div>
              <div className="text-5xl font-black text-[#1e293b] tracking-tighter">{stat.value}</div>
              <div className="flex items-center gap-2 mt-2">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{stat.label}</span>
                <span className="text-[10px] font-black text-emerald-500 bg-emerald-50 px-2 py-0.5 rounded-full">{stat.trend}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Statistics Chart Placeholder */}
        <div className="lg:col-span-2 bg-white rounded-[3rem] p-10 border border-slate-50 shadow-sm">
             <h3 className="text-xl font-black text-[#1e293b]">Statistik Peminjaman</h3>
             <div className="h-64 mt-8 bg-slate-50 rounded-[2rem] border-2 border-dashed border-slate-200 flex items-center justify-center text-slate-300 font-bold">
                Chart Visualization
             </div>
        </div>

        {/* Aktivitas Terkini Section - SLATE NAVY #1e293b */}
        <div className="bg-[#1e293b] rounded-[3rem] p-10 text-white shadow-xl">
          <h3 className="text-2xl font-black mb-10 tracking-tight text-center">Aktivitas Terkini</h3>
          <div className="space-y-8">
            {[
              { user: "Andi Saputra", time: "2 MENIT LALU", action: "Meminjam Buku UI/UX Design", color: "bg-orange-500" },
              { user: "Siti Aminah", time: "15 MENIT LALU", action: "Mengembalikan Buku Clean Code", color: "bg-emerald-500" },
              { user: "Fajar Pratama", time: "1 JAM LALU", action: "Pendaftaran Anggota Baru", color: "bg-blue-500" },
            ].map((act, i) => (
              <div key={i} className="flex gap-4">
                <div className={`w-3 h-3 rounded-full mt-1.5 shrink-0 ${act.color}`} />
                <div>
                  <div className="font-black text-sm uppercase tracking-tight">{act.user}</div>
                  <div className="text-[10px] font-bold text-slate-400 mb-1">{act.time}</div>
                  <div className="text-sm italic text-slate-300">"{act.action}"</div>
                </div>
              </div>
            ))}
          </div>
          <button className="w-full mt-12 py-4 bg-white/10 hover:bg-white/20 rounded-2xl font-black text-xs uppercase tracking-widest transition-all">
            Lihat Semua Aktivitas
          </button>
        </div>
      </div>
    </div>
  );
}