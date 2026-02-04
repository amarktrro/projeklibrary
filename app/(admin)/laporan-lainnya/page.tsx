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
        <h1 className="text-4xl font-black text-gray-800 tracking-tight">Laporan Lainnya</h1>
        <p className="text-gray-600 font-bold mt-2">Daftar laporan arsip dan operasional perpustakaan.</p>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {reports.map((report, index) => (
          <div key={index} className="bg-white p-6 rounded-[2rem] border border-gray-300 shadow-sm flex items-center justify-between hover:shadow-md transition-shadow">
            <div className="flex items-center gap-5">
              <div className="bg-orange-100 text-orange-600 p-4 rounded-2xl border border-orange-200">
                <FileText size={24} />
              </div>
              <div>
                <h3 className="font-black text-gray-800 uppercase tracking-tight">{report.name}</h3>
                <p className="text-xs text-gray-600 font-bold">{report.date} • {report.size}</p>
              </div>
            </div>
            <button className="bg-orange-500 text-white p-4 rounded-2xl hover:bg-orange-600 transition-all shadow-lg">
              <Download size={20} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
