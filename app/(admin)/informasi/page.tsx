"use client";

import React from "react";
import { Mail } from "lucide-react";

export default function Informasi() {
  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-4xl font-black text-gray-800 tracking-tight">Informasi Layanan</h1>
        <p className="text-gray-600 font-bold mt-2">Kontak resmi bantuan teknis perpustakaan JTIK.</p>
      </div>

      <div className="bg-white rounded-[3rem] p-12 text-gray-800 shadow-xl inline-block border border-gray-300">
        <div className="flex items-center gap-4 mb-6">
          <Mail className="text-orange-500" size={24} />
          <span className="text-[10px] font-black text-gray-600 uppercase tracking-[0.2em]">Email Layanan</span>
        </div>
        <p className="text-3xl font-black underline decoration-gray-300 underline-offset-[12px] cursor-pointer hover:text-orange-500 transition-colors">
          perpustakaanjtikunm@gmail.com
        </p>
      </div>
    </div>
  );
}
