"use client";

import React from "react";
// Import modular components using your established paths
import Navbar from "../../../components/navbar";
import Sidebar from "../../../components/sidebar"; // Adjusted relative path based on your folder structure
import { 
  FaUser, FaLock, FaHistory
} from "react-icons/fa";
import { 
  Mail, Phone, Hash, BookOpen, School, Download, Eye, Edit3 
} from "lucide-react";

export default function ProfilAnggotaPage() {
  return (
    /* h-screen + overflow-hidden prevents the double scrollbar seen in your screenshots */
    <div className="h-screen bg-gray-50 flex flex-col font-sans overflow-hidden">
      
      {/* --- TOP NAVBAR COMPONENT --- */}
      <Navbar />

      <div className="flex pt-16 h-full">
        
        {/* --- MODULAR SIDEBAR COMPONENT --- */}
        <Sidebar />

        {/* --- MAIN CONTENT AREA --- */}
        {/* Added overflow-y-auto so ONLY this section scrolls, matching your Dashboard behavior */}
        <main className="flex-1 md:ml-64 p-8 overflow-y-auto no-scrollbar bg-gray-50">
          
          {/* Page Header */}
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold text-[#1e293b] flex items-center gap-3">
              <FaUser className="text-[#1e293b]" /> Profil Anggota
            </h2>
            <p className="text-sm text-gray-500">Informasi dan pengaturan akun Anda</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pb-10">
            
            {/* LEFT COLUMN: Data Anggota & Keamanan */}
            <div className="space-y-8">
              {/* Data Anggota */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="bg-[#1e293b] p-4 flex items-center gap-3 text-white">
                  <FaUser size={14} />
                  <span className="font-bold text-xs uppercase">Data Anggota</span>
                </div>
                <div className="p-8 flex flex-col items-center">
                  <div className="w-24 h-24 bg-yellow-400 rounded-full border-4 border-orange-500 flex items-center justify-center mb-4 shadow-inner">
                    <FaUser size={40} className="text-[#1e293b]" />
                  </div>
                  <h3 className="text-lg font-bold text-[#1e293b]">Ahmad Fajar</h3>
                  <p className="text-xs text-gray-400 font-medium mb-6">Anggota Aktif | NIM: 2021001</p>

                  <div className="w-full space-y-3 text-sm">
                    <div className="flex justify-between py-2 border-b border-gray-50">
                      <span className="text-gray-500 font-bold flex items-center gap-2"><Hash size={14}/> NIM</span>
                      <span className="font-bold text-[#1e293b]">2021001</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-gray-50">
                      <span className="text-gray-500 font-bold flex items-center gap-2"><School size={14}/> Program Studi</span>
                      <span className="font-bold text-[#1e293b]">PTIK</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-gray-50">
                      <span className="text-gray-500 font-bold flex items-center gap-2"><BookOpen size={14}/> Kelas</span>
                      <span className="font-bold text-[#1e293b]">A</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-gray-50">
                      <span className="text-gray-500 font-bold flex items-center gap-2"><Mail size={14}/> Email</span>
                      <span className="font-bold text-[#1e293b]">ahmad@email.com</span>
                    </div>
                    <div className="flex justify-between py-2">
                      <span className="text-gray-500 font-bold flex items-center gap-2"><Phone size={14}/> No. HP</span>
                      <span className="font-bold text-[#1e293b]">081234567890</span>
                    </div>
                  </div>
                  <button className="mt-6 bg-yellow-400 hover:bg-yellow-500 text-[#1e293b] font-bold px-5 py-2 rounded-lg text-sm flex items-center gap-2 transition-all shadow-sm">
                    <Edit3 size={14} /> Edit Profil
                  </button>
                </div>
              </div>

              {/* Pengaturan Keamanan */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="bg-[#1e293b] p-4 flex items-center gap-3 text-white">
                  <FaLock size={14} />
                  <span className="font-bold text-xs uppercase">Pengaturan Keamanan</span>
                </div>
                <div className="p-8 space-y-4">
                  <div>
                    <label className="text-[10px] font-bold text-gray-400 uppercase">Password Lama</label>
                    <input type="password" placeholder="••••••••" className="w-full p-3 bg-gray-50 border border-gray-100 rounded-lg outline-none focus:ring-1 focus:ring-orange-500 text-sm" />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-gray-400 uppercase">Password Baru</label>
                    <input type="password" placeholder="••••••••" className="w-full p-3 bg-gray-50 border border-gray-100 rounded-lg outline-none focus:ring-1 focus:ring-orange-500 text-sm" />
                  </div>
                  <button className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 rounded-lg text-sm flex items-center justify-center gap-2 mt-2 transition-colors">
                    <FaLock size={12} /> Ubah Password
                  </button>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: Kartu Anggota & Log */}
            <div className="space-y-8">
              {/* Kartu Anggota */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="bg-[#1e293b] p-4 flex items-center gap-3 text-white">
                  <Hash size={14} />
                  <span className="font-bold text-xs uppercase">Kartu Anggota</span>
                </div>
                <div className="p-8 flex flex-col items-center">
                  {/* Visual ID Card */}
                  <div className="w-full max-w-[260px] aspect-[3/4.2] bg-[#1e293b] rounded-xl relative overflow-hidden p-6 flex flex-col items-center border-b-8 border-yellow-400 shadow-xl">
                    <div className="text-white text-[8px] font-bold tracking-widest uppercase mb-4 opacity-40">Kartu Anggota Perpustakaan</div>
                    <div className="w-40 h-40 bg-white rounded-lg p-2 mb-4 shadow-inner flex items-center justify-center">
                      <div className="text-[10px] text-gray-300 font-bold border-2 border-dashed border-gray-100 p-4 text-center">QR CODE SPACE</div>
                    </div>
                    <div className="text-center text-white">
                      <h4 className="font-bold text-md uppercase tracking-tight">Ahmad Fajar</h4>
                      <p className="text-[#38bdf8] text-[10px] font-bold mt-1">2021001</p>
                      <p className="text-[#38bdf8] text-[10px] font-bold uppercase">PTIK A</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3 w-full mt-6">
                    <button className="bg-[#0ea5e9] hover:bg-blue-600 text-white py-2.5 rounded-lg text-xs font-bold flex items-center justify-center gap-2 transition-colors"><Eye size={14}/> Lihat</button>
                    <button className="bg-orange-500 hover:bg-orange-600 text-white py-2.5 rounded-lg text-xs font-bold flex items-center justify-center gap-2 transition-colors"><Download size={14}/> Cetak</button>
                  </div>
                </div>
              </div>

              {/* Log Aktivitas */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="bg-[#1e293b] p-4 flex items-center gap-3 text-white">
                  <FaHistory size={14} />
                  <span className="font-bold text-xs uppercase">Log Aktivitas Akun</span>
                </div>
                <div className="p-6 space-y-6">
                  <ActivityItem icon={<FaLock />} title="Password Diperbarui" date="2025-11-05 14:30 WITA" color="text-orange-500" bgColor="bg-orange-50" />
                  <ActivityItem icon={<FaHistory />} title="Login Berhasil" date="2025-11-07 10:00 WITA" color="text-blue-500" bgColor="bg-blue-50" />
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

// Helper component for clean Activity Logs
function ActivityItem({ icon, title, date, color, bgColor }: any) {
  return (
    <div className="flex gap-4 items-start">
      <div className={`p-2 ${bgColor} rounded-lg ${color}`}>{icon}</div>
      <div>
        <p className="text-sm font-bold text-[#1e293b]">{title}</p>
        <p className="text-[10px] text-gray-400 font-bold mt-1">{date}</p>
      </div>
    </div>
  );
}