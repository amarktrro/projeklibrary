"use client";

import React from "react";
import { FileText, Download } from "lucide-react";

export default function LaporanLainnyaPage() {
  const reports = [
    { name: "Laporan Kunjungan Bulanan", date: "Januari 2026", size: "1.2 MB" },
    { name: "Laporan Buku Rusak", date: "Desember 2025", size: "850 KB" },
    { name: "Laporan Pengadaan Buku Baru", date: "November 2025", size: "2.1 MB" },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-black text-[#1a2e5a] tracking-tight">Laporan Lainnya</h1>
        <p className="text-slate-400 font-bold mt-2">Daftar laporan arsip dan operasional perpustakaan.</p>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {reports.map((report, index) => (
          <div key={index} className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm flex items-center justify-between hover:shadow-md transition-shadow">
            <div className="flex items-center gap-5">
              <div className="bg-orange-100 text-orange-600 p-4 rounded-2xl">
                <FileText size={24} />
              </div>
              <div>
                <h3 className="font-black text-slate-800 uppercase tracking-tight">{report.name}</h3>
                <p className="text-xs text-slate-400 font-bold">{report.date} • {report.size}</p>
              </div>
            </div>
            <button className="bg-[#1a2e5a] text-white p-4 rounded-2xl hover:bg-opacity-90 transition-all shadow-lg shadow-blue-900/10">
              <Download size={20} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}