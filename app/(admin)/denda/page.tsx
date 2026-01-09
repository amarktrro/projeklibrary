"use client";

import React from "react";
import { Wallet, Calculator } from "lucide-react";

export default function KelolaDendaPage() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="bg-[#1e293b] rounded-[2.5rem] p-10 flex items-center justify-between text-white shadow-lg">
        <div>
          <h2 className="text-3xl font-black tracking-tight">Kelola Denda & Keuangan</h2>
          <p className="text-slate-400 font-bold text-sm">Monitoring kas denda keterlambatan buku</p>
        </div>
        <div className="bg-white/10 px-6 py-4 rounded-2xl border border-white/10 flex items-center gap-4">
          <Wallet className="text-orange-500" />
          <div>
            <p className="text-[8px] font-black text-slate-400 uppercase">Total Dana Kas</p>
            <p className="text-lg font-black text-white">Rp 2.450.000</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Fine Calculator - Slate Navy */}
        <div className="bg-[#1e293b] rounded-[3rem] p-10 text-white">
          <div className="flex items-center gap-4 mb-8">
            <Calculator className="text-orange-500" />
            <h3 className="text-xl font-black">Kalkulator Denda</h3>
          </div>
          <div className="space-y-6">
            <input type="number" placeholder="Hari terlambat" className="w-full bg-white/10 border border-white/10 rounded-2xl px-6 py-4 outline-none focus:ring-2 focus:ring-orange-500" />
            <div className="pt-6 border-t border-white/10">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Total Tagihan:</p>
              <p className="text-6xl font-black text-orange-500">Rp 0</p>
            </div>
          </div>
        </div>

        {/* Latest Transactions Table */}
        <div className="bg-white rounded-[3rem] overflow-hidden border border-slate-100 shadow-sm flex flex-col">
          <div className="bg-[#1e293b] p-6 text-white font-black text-sm uppercase tracking-widest">Riwayat Transaksi</div>
          <div className="p-8 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-50 pb-4">
              <span className="text-xs text-slate-400 font-bold">05/01/2026</span>
              <span className="font-black text-[#1e293b]">Denda User #12</span>
              <span className="font-black text-emerald-500">+Rp 5.000</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}