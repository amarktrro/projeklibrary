'use client';

import React from 'react';
import Link from 'next/link';
import { 
  FaUser, 
  FaLock, 
  FaEnvelope, 
  FaGraduationCap, 
  FaUsers,
  FaPhone,
  FaIdCard,
  FaUserCheck
} from 'react-icons/fa';

export default function RegisterPage() {
  return (
    // Main Container with Navy to Orange Gradient
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-[#1a2e5a] via-[#1e293b] to-[#ff5733] p-4 font-sans">
      
      {/* Card Wrapper with Glassmorphism */}
      <div className="bg-[#1a2e5a]/90 backdrop-blur-md p-8 md:p-12 rounded-[3rem] shadow-2xl w-full max-w-4xl border border-white/10 text-white animate-in fade-in zoom-in duration-500">
        
        {/* Header Section */}
        <div className="flex flex-col items-center mb-10 text-center">
          <div className="w-20 h-20 bg-orange-500 rounded-3xl flex items-center justify-center text-white text-4xl shadow-lg mb-4 transform -rotate-6">
            <FaGraduationCap />
          </div>
          <h1 className="text-4xl font-black tracking-tight italic">SIMPES <span className="text-orange-500">JTIK</span></h1>
          <p className="text-xs text-blue-200 uppercase tracking-[0.2em] font-bold mt-2 opacity-70">Sistem Informasi Manajemen Perpustakaan</p>
        </div>

        {/* Form */}
        <form className="space-y-6">
          
          {/* Grid Layout for Inputs */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
            
            {/* Left Column */}
            <div className="space-y-6">
              {/* Nama Lengkap */}
              <div>
                <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest mb-2 text-blue-200 ml-1">
                  <FaUser className="text-orange-500" /> Nama Lengkap
                </label>
                <input 
                  type="text" 
                  placeholder="Masukkan nama sesuai KTM" 
                  className="w-full bg-white/5 border border-white/10 focus:border-orange-500 focus:bg-white/10 text-white placeholder-gray-500 rounded-2xl px-5 py-4 outline-none transition-all font-medium text-sm"
                />
              </div>

              {/* Program Studi */}
              <div>
                <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest mb-2 text-blue-200 ml-1">
                  <FaGraduationCap className="text-orange-500" /> Program Studi
                </label>
                <select className="w-full bg-white/5 border border-white/10 focus:border-orange-500 focus:bg-white/10 text-white placeholder-gray-500 rounded-2xl px-5 py-4 outline-none transition-all font-medium text-sm appearance-none">
                  <option className="bg-[#1a2e5a]">Pilih Program Studi</option>
                  <option className="bg-[#1a2e5a]">Pendidikan Teknik Informatika & Komputer</option>
                  <option className="bg-[#1a2e5a]">Teknik Komputer</option>
                  <option className="bg-[#1a2e5a]">Sains Data</option>
                </select>
              </div>

              {/* Email */}
              <div>
                <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest mb-2 text-blue-200 ml-1">
                  <FaEnvelope className="text-orange-500" /> Email Institusi
                </label>
                <input 
                  type="email" 
                  placeholder="nim@student.unm.ac.id" 
                  className="w-full bg-white/5 border border-white/10 focus:border-orange-500 focus:bg-white/10 text-white placeholder-gray-500 rounded-2xl px-5 py-4 outline-none transition-all font-medium text-sm"
                />
              </div>

              {/* Password */}
              <div>
                <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest mb-2 text-blue-200 ml-1">
                  <FaLock className="text-orange-500" /> Password
                </label>
                <input 
                  type="password" 
                  placeholder="Minimal 8 karakter" 
                  className="w-full bg-white/5 border border-white/10 focus:border-orange-500 focus:bg-white/10 text-white placeholder-gray-500 rounded-2xl px-5 py-4 outline-none transition-all font-medium text-sm"
                />
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              {/* NIM */}
              <div>
                <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest mb-2 text-blue-200 ml-1">
                  <FaIdCard className="text-orange-500" /> NIM
                </label>
                <input 
                  type="text" 
                  placeholder="Contoh: 21020950xxxx" 
                  className="w-full bg-white/5 border border-white/10 focus:border-orange-500 focus:bg-white/10 text-white placeholder-gray-500 rounded-2xl px-5 py-4 outline-none transition-all font-medium text-sm"
                />
              </div>

              {/* Kelas */}
              <div>
                <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest mb-2 text-blue-200 ml-1">
                  <FaUsers className="text-orange-500" /> Kelas / Angkatan
                </label>
                <input 
                  type="text" 
                  placeholder="Contoh: PTIK A 2021" 
                  className="w-full bg-white/5 border border-white/10 focus:border-orange-500 focus:bg-white/10 text-white placeholder-gray-500 rounded-2xl px-5 py-4 outline-none transition-all font-medium text-sm"
                />
              </div>

              {/* Nomor HP */}
              <div>
                <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest mb-2 text-blue-200 ml-1">
                  <FaPhone className="text-orange-500" /> Nomor WhatsApp
                </label>
                <input 
                  type="tel" 
                  placeholder="08xxxxxxxxxx" 
                  className="w-full bg-white/5 border border-white/10 focus:border-orange-500 focus:bg-white/10 text-white placeholder-gray-500 rounded-2xl px-5 py-4 outline-none transition-all font-medium text-sm"
                />
              </div>

              {/* Konfirmasi Password */}
              <div>
                <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest mb-2 text-blue-200 ml-1">
                  <FaLock className="text-orange-500" /> Konfirmasi Password
                </label>
                <input 
                  type="password" 
                  placeholder="Ulangi password anda" 
                  className="w-full bg-white/5 border border-white/10 focus:border-orange-500 focus:bg-white/10 text-white placeholder-gray-500 rounded-2xl px-5 py-4 outline-none transition-all font-medium text-sm"
                />
              </div>
            </div>

          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <button 
              type="submit" 
              className="w-full bg-[#ff5733] hover:bg-orange-600 text-white font-black py-5 rounded-[2rem] mt-4 flex items-center justify-center gap-3 transition-all shadow-xl shadow-orange-900/20 transform active:scale-[0.98] uppercase tracking-widest text-sm"
            >
              <FaUserCheck className="text-lg" /> Daftar Sekarang
            </button>
          </div>

        </form>

        {/* Footer Text */}
        <div className="mt-10 text-center text-xs font-bold text-blue-200/60 uppercase tracking-widest">
          Sudah memiliki akun? <Link href="/login" className="text-orange-500 hover:text-orange-400 font-black ml-1 transition-colors">Login Sekarang</Link>
        </div>
      </div>
    </div>
  );
}