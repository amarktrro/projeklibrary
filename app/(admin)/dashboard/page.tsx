"use client";

import React, { useState, useEffect } from "react";
import { Book, Users, ClipboardList, AlertCircle } from "lucide-react";

export default function DashboardPage() {
  // 1. States for real data
  const [totalBooks, setTotalBooks] = useState(0);
  const [totalUsers, setTotalUsers] = useState(0);

  // 2. Load both Books and Users from localStorage
  useEffect(() => {
    // Fetch Books
    const savedBooks = localStorage.getItem("simpes_inventory");
    if (savedBooks) {
      const booksArray = JSON.parse(savedBooks);
      setTotalBooks(booksArray.length);
    }

    // Fetch Users (Anggota)
    const savedUsers = localStorage.getItem("simpes_users");
    if (savedUsers) {
      const usersArray = JSON.parse(savedUsers);
      setTotalUsers(usersArray.length);
    }
  }, []);

  const stats = [
    { 
      label: "TOTAL BUKU", 
      value: totalBooks.toLocaleString(), 
      trend: "+12%", 
      icon: Book, 
      color: "bg-blue-500" 
    },
    { 
      label: "ANGGOTA", 
      value: totalUsers.toLocaleString(), // Real data from Kelola User
      trend: "+5%", 
      icon: Users, 
      color: "bg-orange-500" 
    },
    { label: "PEMINJAMAN", value: "89", trend: "+18%", icon: ClipboardList, color: "bg-emerald-500" },
    { label: "TERLAMBAT", value: "12", trend: "-2%", icon: AlertCircle, color: "bg-red-500" },
  ];

  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-black text-[#1e293b] tracking-tight">Dashboard Overview</h1>
          <p className="text-slate-400 font-bold mt-2">Monitoring data perpustakaan JTIK hari ini.</p>
        </div>
        <div className="bg-orange-50 text-orange-600 px-6 py-3 rounded-2xl border border-orange-100 flex items-center gap-2">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-orange-500"></span>
            </span>
            <span className="text-xs font-black uppercase tracking-widest">System Healthy</span>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-50 flex flex-col gap-4 hover:shadow-xl hover:shadow-slate-200/50 transition-all group">
            <div className={`${stat.color} w-12 h-12 rounded-2xl flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform`}>
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
             <div className="h-64 mt-8 bg-slate-50 rounded-[2rem] border-2 border-dashed border-slate-200 flex items-center justify-center text-slate-300 font-bold italic">
               Visualisasi data peminjaman bulanan
             </div>
        </div>

        {/* Aktivitas Terkini Section */}
        <div className="bg-[#1e293b] rounded-[3rem] p-10 text-white shadow-xl flex flex-col">
          <h3 className="text-2xl font-black mb-10 tracking-tight text-center">Aktivitas Terkini</h3>
          <div className="space-y-8 flex-1">
            {[
              { user: "Andi Saputra", time: "2 MENIT LALU", action: "Meminjam Buku UI/UX Design", color: "bg-orange-500" },
              { user: "Siti Aminah", time: "15 MENIT LALU", action: "Mengembalikan Buku Clean Code", color: "bg-emerald-500" },
              { user: "Fajar Pratama", time: "1 JAM LALU", action: "Pendaftaran Anggota Baru", color: "bg-blue-500" },
            ].map((act, i) => (
              <div key={i} className="flex gap-4 group cursor-default">
                <div className={`w-3 h-3 rounded-full mt-1.5 shrink-0 ${act.color} group-hover:scale-150 transition-transform`} />
                <div>
                  <div className="font-black text-sm uppercase tracking-tight">{act.user}</div>
                  <div className="text-[10px] font-bold text-slate-400 mb-1">{act.time}</div>
                  <div className="text-sm italic text-slate-300 leading-relaxed">"{act.action}"</div>
                </div>
              </div>
            ))}
          </div>
          <button className="w-full mt-10 py-5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl font-black text-xs uppercase tracking-widest transition-all">
            Lihat Semua Aktivitas
          </button>
        </div>
      </div>
    </div>
  );
}