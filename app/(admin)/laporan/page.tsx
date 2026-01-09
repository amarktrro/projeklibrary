"use client";

import React from "react";
import { Download } from "lucide-react";

export default function LaporanKeuangan() {
  return (
    <div className="space-y-8">
      <div className="bg-[#1e293b] rounded-[2.5rem] p-10 flex items-center justify-between text-white">
        <h2 className="text-3xl font-black tracking-tight">Laporan Keuangan</h2>
        <button className="bg-white/10 hover:bg-white/20 px-6 py-3 rounded-xl font-bold text-xs uppercase flex items-center gap-2 transition-all">
          <Download size={18} /> Export Laporan
        </button>
      </div>

      <div className="bg-white rounded-[3rem] overflow-hidden border border-slate-100 shadow-sm">
        <table className="w-full text-left">
          <thead className="bg-[#1e293b] text-white">
            <tr>
              <th className="px-10 py-6 font-black uppercase text-[10px] tracking-[0.2em]">Tanggal</th>
              <th className="px-10 py-6 font-black uppercase text-[10px] tracking-[0.2em]">Keterangan</th>
              <th className="px-10 py-6 font-black uppercase text-[10px] tracking-[0.2em]">Debit</th>
              <th className="px-10 py-6 font-black uppercase text-[10px] tracking-[0.2em] text-right">Saldo</th>
            </tr>
          </thead>
          <tbody className="text-sm font-bold text-slate-600">
            <tr className="border-b border-slate-50">
              <td className="px-10 py-8">05/01/2024</td>
              <td className="px-10 py-8 font-black text-[#1e293b]">Denda Keterlambatan - User #12</td>
              <td className="px-10 py-8 text-emerald-500">Rp 5.000</td>
              <td className="px-10 py-8 text-right font-black text-[#1e293b]">Rp 2.450.000</td>
            </tr>
          </tbody>
          <tfoot>
            <tr className="bg-slate-50/50">
              <td colSpan={3} className="px-10 py-10 text-right font-black text-slate-400 uppercase text-xs tracking-widest">Total Dana Kas</td>
              <td className="px-10 py-10 text-right text-4xl font-black text-[#1e293b]">Rp 2.450.000</td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
}