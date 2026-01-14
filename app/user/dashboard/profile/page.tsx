"use client";

import React from "react";
import { 
  User, 
  Mail, 
  Phone, 
  Hash, 
  BookOpen, 
  School, 
  Lock, 
  History, 
  Download, 
  Eye, 
  Edit3 
} from "lucide-react";

export default function ProfilAnggotaPage() {
  return (
    <div className="p-8 bg-[#f8fafc] min-h-screen">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-black text-[#1e293b] flex items-center gap-3">
          <User className="text-[#1e293b]" size={32} /> Profil Anggota
        </h1>
        <p className="text-slate-400 font-medium">Informasi dan pengaturan akun Anda</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* LEFT COLUMN */}
        <div className="space-y-8">
          
          {/* Section: Data Anggota */}
          <div className="bg-white rounded-[2rem] border border-slate-100 shadow-sm overflow-hidden">
            <div className="bg-[#1e293b] p-4 flex items-center gap-3 text-white">
              <User size={20} />
              <span className="font-bold text-sm uppercase tracking-wider">Data Anggota</span>
            </div>
            <div className="p-8 flex flex-col items-center">
              {/* Profile Image Circle */}
              <div className="w-32 h-32 bg-yellow-400 rounded-full border-4 border-orange-500 flex items-center justify-center mb-4 overflow-hidden">
                <User size={64} className="text-[#1e293b]" />
              </div>
              <h2 className="text-xl font-black text-[#1e293b]">Ahmad Fajar</h2>
              <p className="text-slate-400 text-sm mb-8 font-bold">Anggota Aktif | NIM: 2021001</p>

              {/* Info Table */}
              <div className="w-full space-y-4 text-sm">
                <div className="flex justify-between items-center py-2 border-b border-slate-50">
                  <span className="flex items-center gap-2 text-slate-500 font-bold"><Hash size={16}/> NIM</span>
                  <span className="font-black text-[#1e293b]">2021001</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-slate-50">
                  <span className="flex items-center gap-2 text-slate-500 font-bold"><School size={16}/> Program Studi</span>
                  <span className="font-black text-[#1e293b]">PTIK</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-slate-50">
                  <span className="flex items-center gap-2 text-slate-500 font-bold"><BookOpen size={16}/> Kelas</span>
                  <span className="font-black text-[#1e293b]">A</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-slate-50">
                  <span className="flex items-center gap-2 text-slate-500 font-bold"><Mail size={16}/> Email</span>
                  <span className="font-black text-[#1e293b]">ahmad@email.com</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-slate-50">
                  <span className="flex items-center gap-2 text-slate-500 font-bold"><Phone size={16}/> No. HP</span>
                  <span className="font-black text-[#1e293b]">081234567890</span>
                </div>
              </div>

              <button className="mt-8 flex items-center gap-2 bg-yellow-400 hover:bg-yellow-500 text-[#1e293b] font-black px-6 py-2.5 rounded-xl transition-all shadow-md">
                <Edit3 size={16} /> Edit Profil
              </button>
            </div>
          </div>

          {/* Section: Pengaturan Keamanan */}
          <div className="bg-white rounded-[2rem] border border-slate-100 shadow-sm overflow-hidden">
            <div className="bg-[#1e293b] p-4 flex items-center gap-3 text-white">
              <Lock size={20} />
              <span className="font-bold text-sm uppercase tracking-wider">Pengaturan Keamanan</span>
            </div>
            <form className="p-8 space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-black text-slate-400 uppercase ml-2">Password Lama</label>
                <input type="password" placeholder="••••••••" className="w-full p-4 bg-slate-50 border border-slate-100 rounded-xl outline-none focus:ring-2 focus:ring-orange-500" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-black text-slate-400 uppercase ml-2">Password Baru</label>
                <input type="password" placeholder="••••••••" className="w-full p-4 bg-slate-50 border border-slate-100 rounded-xl outline-none focus:ring-2 focus:ring-orange-500" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-black text-slate-400 uppercase ml-2">Konfirmasi Password Baru</label>
                <input type="password" placeholder="••••••••" className="w-full p-4 bg-slate-50 border border-slate-100 rounded-xl outline-none focus:ring-2 focus:ring-orange-500" />
              </div>
              <button className="w-full mt-4 flex items-center justify-center gap-2 bg-[#f97316] hover:bg-orange-600 text-white font-black py-4 rounded-xl transition-all shadow-lg">
                <Lock size={18} /> Ubah Password
              </button>
            </form>
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div className="space-y-8">
          
          {/* Section: Kartu Anggota */}
          <div className="bg-white rounded-[2rem] border border-slate-100 shadow-sm overflow-hidden">
            <div className="bg-[#1e293b] p-4 flex items-center gap-3 text-white">
              <Hash size={20} />
              <span className="font-bold text-sm uppercase tracking-wider">Kartu Anggota</span>
            </div>
            <div className="p-8">
              {/* Card Visualization */}
              <div className="w-full aspect-[3/4] max-w-[320px] mx-auto bg-[#1e293b] rounded-2xl relative overflow-hidden shadow-2xl p-6 flex flex-col items-center border-b-[12px] border-yellow-400">
                <div className="text-white text-[10px] font-bold tracking-widest uppercase mb-4 opacity-50">Kartu Anggota Perpustakaan</div>
                
                {/* QR Code Placeholder */}
                <div className="w-48 h-48 bg-white rounded-xl p-4 mb-4">
                  <div className="w-full h-full border-2 border-dashed border-slate-200 flex items-center justify-center text-slate-300 font-bold">QR SCAN</div>
                </div>

                <div className="text-center">
                  <h3 className="text-white font-black text-lg tracking-tight uppercase">Ahmad Fajar</h3>
                  <p className="text-blue-400 text-xs font-bold mt-1">2021001</p>
                  <p className="text-blue-400 text-xs font-bold uppercase">PTIK A</p>
                </div>
                
                {/* Decorative Elements */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-orange-500/10 rounded-full -mr-12 -mt-12"></div>
              </div>

              <div className="grid grid-cols-2 gap-4 mt-8">
                <button className="flex items-center justify-center gap-2 bg-[#0ea5e9] hover:bg-blue-600 text-white font-black py-3 rounded-xl transition-all">
                  <Eye size={18} /> Lihat Kartu
                </button>
                <button className="flex items-center justify-center gap-2 bg-[#f97316] hover:bg-orange-600 text-white font-black py-3 rounded-xl transition-all">
                  <Download size={18} /> Download
                </button>
              </div>
            </div>
          </div>

          {/* Section: Log Aktivitas Akun */}
          <div className="bg-white rounded-[2rem] border border-slate-100 shadow-sm overflow-hidden">
            <div className="bg-[#1e293b] p-4 flex items-center gap-3 text-white">
              <History size={20} />
              <span className="font-bold text-sm uppercase tracking-wider">Log Aktivitas Akun</span>
            </div>
            <div className="p-8 space-y-8">
              {[
                { label: "Password Diperbarui", time: "2025-11-05 14:30 WITA", icon: Lock, color: "text-orange-500", bg: "bg-orange-50" },
                { label: "Login Berhasil", time: "2025-11-07 10:00 WITA", icon: History, color: "text-blue-500", bg: "bg-blue-50" },
                { label: "Data Profil Diperbarui", time: "2025-10-20 09:15 WITA", icon: User, color: "text-orange-500", bg: "bg-orange-50" },
              ].map((log, i) => (
                <div key={i} className="flex gap-4 items-start group">
                  <div className={`p-3 rounded-xl ${log.bg} ${log.color} transition-transform group-hover:scale-110`}>
                    <log.icon size={20} />
                  </div>
                  <div>
                    <div className="font-black text-[#1e293b] text-sm">{log.label}</div>
                    <div className="text-xs text-slate-400 font-bold mt-1">{log.time}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}