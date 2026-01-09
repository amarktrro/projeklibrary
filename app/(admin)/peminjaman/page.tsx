"use client";

import React from "react";
import { Scan, Calendar } from "lucide-react";

export default function PeminjamanPage() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="bg-[#1e293b] rounded-[2.5rem] p-10 flex items-center justify-between text-white shadow-lg">
        <div>
          <h2 className="text-3xl font-black tracking-tight">Kelola Peminjaman</h2>
          <p className="text-slate-400 font-bold text-sm">Update status buku dan pengembalian</p>
        </div>
        <button className="bg-orange-500 hover:bg-orange-600 px-8 py-4 rounded-2xl font-black text-sm flex items-center gap-3 transition-all">
          <Scan size={20} />
          Scan Buku
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Form Section */}
        <div className="lg:col-span-1 bg-[#1e293b] rounded-[3rem] p-10 text-white">
          <h3 className="text-xl font-black mb-8">Input Peminjaman</h3>
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest">NIM Peminjam</label>
              <input type="text" placeholder="Masukkan NIM" className="w-full bg-white/10 border border-white/10 rounded-2xl px-6 py-4 focus:ring-2 focus:ring-orange-500 outline-none" />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest">ID Buku</label>
              <input type="text" placeholder="Masukkan ID Buku" className="w-full bg-white/10 border border-white/10 rounded-2xl px-6 py-4 focus:ring-2 focus:ring-orange-500 outline-none" />
            </div>
            <button className="w-full bg-orange-500 py-5 rounded-2xl font-black uppercase tracking-widest hover:bg-orange-600 transition-all">
              Submit Peminjaman
            </button>
          </div>
        </div>

        {/* List Section */}
        <div className="lg:col-span-2 bg-white rounded-[3rem] p-10 border border-slate-100 shadow-sm">
          <div className="flex items-center justify-between mb-8">
             <h3 className="text-xl font-black text-[#1e293b]">Daftar Pinjaman Aktif</h3>
             <Calendar className="text-slate-300" />
          </div>
          <div className="space-y-4">
             {[1, 2, 3].map((i) => (
               <div key={i} className="flex items-center justify-between p-6 bg-slate-50 rounded-[2rem] border border-slate-100">
                  <div className="flex gap-4 items-center">
                    <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-[#1e293b] shadow-sm font-black">#{i}</div>
                    <div>
                      <div className="font-black text-[#1e293b]">User #12</div>
                      <div className="text-[10px] font-bold text-slate-400">Jatuh Tempo: 15/01/2026</div>
                    </div>
                  </div>
                  <button className="text-xs font-black text-orange-500 uppercase px-4 py-2 bg-orange-50 rounded-lg hover:bg-orange-100">Kembalikan</button>
               </div>
             ))}
          </div>
        </div>
      </div>
    </div>
  );
}