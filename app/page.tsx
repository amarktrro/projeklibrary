'use client';

import React from 'react';
import Link from 'next/link';
import { 
  FaUser, 
  FaLock, 
  FaSignInAlt, 
  FaInfoCircle, 
  FaEnvelope, 
  FaInstagram, 
  FaGraduationCap, 
  FaUsers 
} from 'react-icons/fa';

export default function LoginPage() {
  return (
    // Main Container with Gradient Background
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#ea580c] p-4 font-sans">
      
      {/* Centered Wrapper for both cards */}
      <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16 max-w-5xl w-full justify-center">

        {/* --- LEFT CARD: LOGIN FORM --- */}
        <div className="bg-[#1e293b]/90 backdrop-blur-sm p-8 rounded-3xl shadow-2xl w-full max-w-md border border-white/5 text-white">
          
          {/* Header / Logo */}
          <div className="flex flex-col items-center mb-8">
            <div className="text-5xl text-white mb-2">
              <FaGraduationCap /> {/* Placeholder for the custom book logo */}
            </div>
            <h1 className="text-3xl font-bold tracking-wider">SIMPES</h1>
            <p className="text-sm text-gray-400 mt-1">Jurusan Teknik Informatika dan Komputer</p>
          </div>

          {/* Form */}
          <form className="space-y-5">
            
            {/* NIM Input */}
            <div>
              <label className="flex items-center gap-2 text-sm font-medium mb-2 text-gray-200">
                <FaUser className="text-xs" /> NIM
              </label>
              <input 
                type="text" 
                placeholder="Masukkan NIM" 
                className="w-full bg-[#334155] border border-transparent focus:border-orange-500 focus:ring-0 text-white placeholder-gray-400 rounded-lg px-4 py-3 outline-none transition-all"
              />
            </div>

            {/* Password Input */}
            <div>
              <label className="flex items-center gap-2 text-sm font-medium mb-2 text-gray-200">
                <FaLock className="text-xs" /> Password
              </label>
              <input 
                type="password" 
                placeholder="Masukkan Password" 
                className="w-full bg-[#334155] border border-transparent focus:border-orange-500 focus:ring-0 text-white placeholder-gray-400 rounded-lg px-4 py-3 outline-none transition-all"
              />
            </div>

            {/* Login As Dropdown */}
            <div>
              <label className="flex items-center gap-2 text-sm font-medium mb-2 text-gray-200">
                <FaUsers className="text-xs" /> Login Sebagai
              </label>
              <div className="relative">
                <select className="w-full bg-[#334155] border border-transparent focus:border-orange-500 text-white rounded-lg px-4 py-3 outline-none appearance-none cursor-pointer">
                  <option value="" disabled selected>Anggota/Mahasiswa</option>
                  <option value="mahasiswa">Mahasiswa</option>
                  <option value="dosen">Dosen</option>
                  <option value="admin">Admin</option>
                </select>
                {/* Custom arrow for dropdown */}
                <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none text-gray-400">
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"/></svg>
                </div>
              </div>
            </div>

            {/* --- UPDATED BUTTON SECTION START --- */}
            {/* Wrapped in Link to redirect to Dashboard */}
            <Link href="/dashboard" className="w-full block mt-6">
              <button 
                type="button" 
                className="w-full bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white font-bold py-3 rounded-lg flex items-center justify-center gap-2 transition-all shadow-lg transform active:scale-95"
              >
                <FaSignInAlt /> Login
              </button>
            </Link>
            {/* --- UPDATED BUTTON SECTION END --- */}

          </form>

          {/* Footer Text */}
          <div className="mt-6 text-center text-sm text-gray-400">
            Belum punya akun? <Link href="/register" className="text-orange-400 hover:text-orange-300 font-medium">Daftar Sekarang</Link>
          </div>
        </div>


        {/* --- RIGHT CARD: LIBRARY INFO --- */}
        <div className="bg-white/10 backdrop-blur-md p-8 rounded-3xl w-full max-w-sm border border-white/20 shadow-xl text-center flex flex-col items-center justify-center h-fit">
          <div className="bg-white/20 p-3 rounded-full mb-4">
            <FaInfoCircle className="text-3xl text-white" />
          </div>
          
          <h2 className="text-xl font-bold text-white mb-6">Informasi Perpustakaan</h2>
          
          <div className="space-y-4 text-gray-200">
            <div className="flex items-center gap-3 justify-center">
              <FaEnvelope className="text-orange-400" />
              <span className="text-sm">perpustakaanjtikunm@gmail.com</span>
            </div>
            
            <div className="flex items-center gap-3 justify-center">
              <FaInstagram className="text-orange-400" />
              <span className="text-sm">@pustaka_jtik</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}