"use client";

import React from "react";
import { QrCode } from "lucide-react";

export default function GuestBook() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
      {/* Manual Entry Card */}
      <div className="bg-white rounded-[3.5rem] p-12 text-gray-800 shadow-2xl border border-gray-300">
        <h3 className="text-3xl font-black mb-10 tracking-tight">Input Kehadiran Manual</h3>
        <div className="space-y-8">
          <div className="space-y-3">
            <label className="text-[10px] font-black uppercase text-gray-600 tracking-widest ml-2">Identitas Pengunjung</label>
            <input 
              type="text" 
              placeholder="NIM / NIDN" 
              className="w-full bg-gray-50 border border-gray-300 rounded-2xl px-8 py-5 text-gray-800 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all" 
            />
          </div>
          <button className="w-full bg-orange-500 hover:bg-orange-600 py-6 rounded-2xl font-black text-xl uppercase tracking-[0.2em] transition-all shadow-xl">
            SUBMIT
          </button>
        </div>
      </div>

      {/* QR Visualization Card */}
      <div className="bg-white rounded-[3.5rem] p-12 border border-gray-300 flex flex-col items-center justify-center text-center shadow-sm">
        <div className="w-72 h-72 bg-gray-50 rounded-[3rem] border-2 border-dashed border-gray-300 flex items-center justify-center mb-10">
          <QrCode size={140} className="text-gray-400" />
        </div>
        <h3 className="text-2xl font-black text-gray-800">Scan QR Code Kehadiran</h3>
        <p className="text-gray-600 font-bold mt-3">Tunjukkan KTM Anda ke arah scanner</p>
      </div>
    </div>
  );
}
