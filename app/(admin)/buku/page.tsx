"use client";

import React from "react";
import { Plus, Search, Edit, Trash2 } from "lucide-react";

export default function KelolaBukuPage() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Header Banner - Slate Navy */}
      <div className="bg-[#1e293b] rounded-[2.5rem] p-10 flex flex-col md:flex-row items-center justify-between text-white shadow-lg gap-6">
        <div>
          <h2 className="text-3xl font-black tracking-tight">Kelola Koleksi Buku</h2>
          <p className="text-slate-400 font-bold text-sm">Total 1.234 judul buku tersedia</p>
        </div>
        <div className="flex gap-4 w-full md:w-auto">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Cari Judul / ISBN..." 
              className="bg-white/10 border border-white/10 rounded-2xl pl-12 pr-4 py-4 w-full md:w-64 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all"
            />
          </div>
          <button className="bg-orange-500 hover:bg-orange-600 px-8 py-4 rounded-2xl font-black text-sm flex items-center gap-3 transition-all shadow-lg shadow-orange-900/20">
            <Plus size={20} />
            Tambah Buku
          </button>
        </div>
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-[2.5rem] overflow-hidden border border-slate-100 shadow-sm">
        <table className="w-full text-left">
          <thead className="bg-[#1e293b] text-white">
            <tr>
              <th className="px-8 py-5 font-black uppercase text-xs tracking-widest">Judul & Pengarang</th>
              <th className="px-8 py-5 font-black uppercase text-xs tracking-widest">Kategori</th>
              <th className="px-8 py-5 font-black uppercase text-xs tracking-widest text-center">Stok</th>
              <th className="px-8 py-5 font-black uppercase text-xs tracking-widest text-right">Aksi</th>
            </tr>
          </thead>
          <tbody className="text-sm font-bold text-slate-600">
            {[1, 2, 3, 4, 5].map((i) => (
              <tr key={i} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors">
                <td className="px-8 py-6">
                  <div className="font-black text-[#1e293b]">Belajar Next.js Modern</div>
                  <div className="text-xs text-slate-400 font-bold uppercase">John Doe • 2024</div>
                </td>
                <td className="px-8 py-6">
                  <span className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-[10px] uppercase font-black">Teknologi</span>
                </td>
                <td className="px-8 py-6 text-center">15</td>
                <td className="px-8 py-6">
                  <div className="flex justify-end gap-2">
                    <button className="p-2 text-slate-400 hover:text-[#1e293b] hover:bg-slate-100 rounded-xl transition-all"><Edit size={18} /></button>
                    <button className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"><Trash2 size={18} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}