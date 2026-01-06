"use client";

import React from "react";
import { 
  Book, 
  Users, 
  Clock, 
  AlertCircle, 
  TrendingUp, 
  ArrowUpRight 
} from "lucide-react";

export default function DashboardPage() {
  const stats = [
    { 
      title: "TOTAL BUKU", 
      val: "1.234", 
      color: "bg-blue-600", 
      icon: <Book size={24} />, 
      trend: "+12%" 
    },
    { 
      title: "ANGGOTA", 
      val: "567", 
      color: "bg-orange-500", 
      icon: <Users size={24} />, 
      trend: "+5%" 
    },
    { 
      title: "PEMINJAMAN", 
      val: "89", 
      color: "bg-green-500", 
      icon: <Clock size={24} />, 
      trend: "+18%" 
    },
    { 
      title: "TERLAMBAT", 
      val: "12", 
      color: "bg-red-500", 
      icon: <AlertCircle size={24} />, 
      trend: "-2%" 
    },
  ];

  return (
    <div className="space-y-10 animate-in fade-in duration-500">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-black text-[#1a2e5a] tracking-tight">
            Dashboard Overview
          </h1>
          <p className="text-slate-400 font-medium mt-1">
            Monitoring data perpustakaan JTIK hari ini.
          </p>
        </div>
        <div className="flex items-center gap-2 bg-orange-50 text-orange-600 px-5 py-2.5 rounded-2xl border border-orange-100 shadow-sm">
          <TrendingUp size={18} />
          <span className="text-xs font-black uppercase tracking-widest">
            SYSTEM HEALTHY
          </span>
        </div>
      </div>

      {/* Statistics Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {stats.map((s) => (
          <div 
            key={s.title} 
            className="bg-white p-8 rounded-[3rem] border border-slate-100 shadow-sm hover:shadow-md transition-all group"
          >
            <div className={`${s.color} w-16 h-16 rounded-[1.5rem] mb-8 flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform`}>
              {s.icon}
            </div>
            <h3 className="text-5xl font-black text-slate-800 tracking-tighter">
              {s.val}
            </h3>
            <div className="flex items-center gap-3 mt-3">
              <p className="text-slate-400 font-black text-[10px] uppercase tracking-[0.15em]">
                {s.title}
              </p>
              <span className="text-[10px] font-black text-green-500 bg-green-50 px-2 py-1 rounded-lg">
                {s.trend}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Chart Area */}
        <div className="lg:col-span-2 bg-white p-10 rounded-[3rem] border border-slate-100 shadow-sm">
          <div className="flex justify-between items-center mb-10">
            <div>
              <h3 className="text-2xl font-black text-[#1a2e5a]">
                Statistik Peminjaman
              </h3>
              <p className="text-xs font-bold text-slate-300 uppercase tracking-widest mt-1">
                7 HARI TERAKHIR
              </p>
            </div>
            <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-400 border border-slate-100 cursor-pointer hover:bg-slate-100 transition-colors">
              <ArrowUpRight size={24} />
            </div>
          </div>
          
          {/* Static Chart Representation */}
          <div className="flex items-end justify-between h-64 gap-2 px-4 bg-slate-50/30 rounded-3xl p-6 border border-slate-50">
            {[40, 70, 45, 90, 65, 80, 50].map((height, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-3 group">
                <div 
                  style={{ height: `${height}%` }} 
                  className="w-full max-w-[40px] bg-orange-500 rounded-t-xl opacity-80 group-hover:opacity-100 transition-all shadow-lg shadow-orange-100"
                />
                <span className="text-[10px] font-black text-slate-300 uppercase">
                  Day {i + 1}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Activity Feed */}
        <div className="bg-[#1a2e5a] p-10 rounded-[3rem] text-white shadow-2xl relative overflow-hidden group">
          {/* Decorative background circle */}
          <div className="absolute -top-20 -right-20 w-40 h-40 bg-white/5 rounded-full blur-3xl group-hover:bg-orange-500/10 transition-colors" />
          
          <h3 className="text-2xl font-black mb-10 relative z-10">
            Aktivitas Terkini
          </h3>
          
          <div className="space-y-10 relative z-10">
            {[
              { 
                name: "Andi Saputra", 
                time: "2 Menit lalu", 
                action: "Meminjam Buku UI/UX Design", 
                color: "bg-orange-500" 
              },
              { 
                name: "Siti Aminah", 
                time: "15 Menit lalu", 
                action: "Mengembalikan Buku Clean Code", 
                color: "bg-green-500" 
              },
              { 
                name: "Fajar Pratama", 
                time: "1 Jam lalu", 
                action: "Pendaftaran Anggota Baru", 
                color: "bg-blue-500" 
              }
            ].map((item, idx) => (
              <div key={idx} className="flex gap-5 items-start">
                <div className={`w-3 h-3 rounded-full mt-1.5 shrink-0 ${item.color} shadow-[0_0_12px_rgba(255,255,255,0.2)]`} />
                <div>
                  <p className="text-base font-bold leading-tight">{item.name}</p>
                  <p className="text-[10px] text-blue-300 font-bold uppercase tracking-wider mt-0.5">
                    {item.time}
                  </p>
                  <p className="text-sm text-blue-100/80 italic mt-2">
                    "{item.action}"
                  </p>
                </div>
              </div>
            ))}
          </div>

          <button className="w-full mt-12 py-4 bg-white/10 hover:bg-white/20 rounded-2xl text-xs font-black uppercase tracking-widest transition-all border border-white/5">
            Lihat Semua Aktivitas
          </button>
        </div>
      </div>
    </div>
  );
}