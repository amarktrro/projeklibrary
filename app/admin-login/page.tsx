"use client";

import { User, Lock, Info, LogIn, Mail, Instagram } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function AdminLoginPage() {
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    router.push('/dashboard');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#7c2d12] flex items-center justify-center p-4 font-sans">
      
      <div className="flex flex-col md:flex-row gap-8 items-center max-w-5xl w-full">
        
        {/* --- Login Card --- */}
        <div className="bg-[#1e293b]/60 backdrop-blur-md p-10 rounded-2xl w-full max-w-md shadow-2xl border border-white/5">
          <div className="text-center mb-8">
            {/* Logo matching the Graduation Cap/Book icon */}
            <div className="flex justify-center mb-4">
              <div className="relative w-16 h-16">
                 <svg viewBox="0 0 24 24" className="fill-white" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 3L1 9L12 15L21 10.09V17H23V9M5 13.18V17.18L12 21L19 17.18V13.18L12 17L5 13.18Z" />
                 </svg>
                 <div className="absolute -top-1 -right-1 w-4 h-4 bg-orange-500 rounded-full border-2 border-[#1e293b]"></div>
              </div>
            </div>
            <h1 className="text-white text-3xl font-bold tracking-wider">SIMPES</h1>
            <p className="text-gray-300 text-[10px] mt-1">Jurusan Teknik Informatika dan Komputer</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            {/* NIM Field */}
            <div className="space-y-1.5">
              <label className="text-white text-xs font-medium flex items-center gap-2">
                <User size={14} /> NIM
              </label>
              <input 
                required 
                type="text" 
                placeholder="Masukkan NIM" 
                className="w-full bg-[#334155]/80 border border-white/10 rounded-lg py-3 px-4 text-sm text-white placeholder:text-gray-400 focus:ring-2 focus:ring-orange-500 outline-none transition-all" 
              />
            </div>
            
            {/* Password Field */}
            <div className="space-y-1.5">
              <label className="text-white text-xs font-medium flex items-center gap-2">
                <Lock size={14} /> Password
              </label>
              <input 
                required 
                type="password" 
                placeholder="Masukkan Password" 
                className="w-full bg-[#334155]/80 border border-white/10 rounded-lg py-3 px-4 text-sm text-white placeholder:text-gray-400 focus:ring-2 focus:ring-orange-500 outline-none transition-all" 
              />
            </div>

            {/* Role Select */}
            <div className="space-y-1.5">
              <label className="text-white text-xs font-medium flex items-center gap-2">
                <User size={14} /> Login Sebagai
              </label>
              <select className="w-full bg-[#334155]/80 border border-white/10 rounded-lg py-3 px-4 text-sm text-white outline-none focus:ring-2 focus:ring-orange-500">
                <option className="bg-[#1e293b]">Admin/Petugas</option>
                <option className="bg-[#1e293b]">Anggota/Mahasiswa</option>
              </select>
            </div>

            <button 
              type="submit" 
              className="w-full bg-[#ff4d2d] hover:bg-[#e63e1f] text-white py-3.5 rounded-lg font-bold text-sm shadow-lg transition-colors flex items-center justify-center gap-2"
            >
              <LogIn size={18} /> Login
            </button>
          </form>

          <p className="text-center text-white text-xs mt-8">
            Belum punya akun? <span className="text-orange-400 cursor-pointer font-semibold hover:underline" onClick={() => router.push('/register')}>Daftar Sekarang</span>
          </p>
        </div>

        {/* --- Info Card (Right Side) --- */}
        <div className="bg-[#ffffff]/10 backdrop-blur-md border border-white/10 p-10 rounded-2xl w-full max-w-sm text-white hidden md:block">
          <div className="text-center mb-6">
            <div className="bg-white rounded-full w-10 h-10 flex items-center justify-center mx-auto mb-4">
              <Info size={24} className="text-[#1e293b]" />
            </div>
            <h2 className="text-xl font-bold">Informasi Perpustakaan</h2>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-center gap-3 text-sm">
              <Mail size={16} className="text-orange-500" />
              <span className="text-gray-200">perpustakaanjtikunm@gmail.com</span>
            </div>
            <div className="flex items-center justify-center gap-3 text-sm">
              <Instagram size={16} className="text-orange-500" />
              <span className="text-gray-200">@pustaka_jtik</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}