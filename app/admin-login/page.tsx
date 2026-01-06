"use client";

import { User, Lock, Info, LogIn } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function AdminLoginPage() {
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Move to dashboard instantly
    router.push('/dashboard');
  };

  return (
    <div className="min-h-screen bg-[#1a2e5a] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Glow matching your UI */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-orange-500/10 blur-[120px] rounded-full -mr-48 -mt-48"></div>
      
      <div className="flex flex-col md:flex-row gap-12 items-center max-w-5xl w-full relative z-10">
        {/* Login Box */}
        <div className="bg-[#2a3c6a]/80 backdrop-blur-xl p-10 rounded-[2rem] w-full max-w-md shadow-2xl border border-white/10">
          <div className="text-center mb-10">
            <div className="bg-white p-3 rounded-2xl inline-block mb-4">
              <div className="w-12 h-12 bg-[#1a2e5a] rounded-lg flex items-center justify-center text-white font-bold italic">S</div>
            </div>
            <h1 className="text-white text-3xl font-black tracking-tighter">SIMPES</h1>
            <p className="text-blue-200 text-[10px] mt-1 uppercase font-bold tracking-widest">Jurusan Teknik Informatika dan Komputer</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-300" size={18} />
              <input required type="text" placeholder="Masukkan NIM" className="w-full bg-[#3a4c7a] border border-white/10 rounded-xl py-4 pl-12 text-white outline-none focus:ring-2 focus:ring-orange-500 transition-all" />
            </div>
            
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-300" size={18} />
              <input required type="password" placeholder="Masukkan Password" className="w-full bg-[#3a4c7a] border border-white/10 rounded-xl py-4 pl-12 text-white outline-none focus:ring-2 focus:ring-orange-500 transition-all" />
            </div>

            <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-300" size={18} />
                <select className="w-full bg-[#3a4c7a] border border-white/10 rounded-xl py-4 pl-12 text-white appearance-none outline-none">
                    <option>Admin/Petugas</option>
                    <option>Mahasiswa</option>
                </select>
            </div>

            <button type="submit" className="w-full bg-[#ff5733] hover:bg-[#ff451a] text-white py-4 rounded-xl font-black text-sm uppercase tracking-widest shadow-lg shadow-orange-900/40 transition-all flex items-center justify-center gap-2 mt-4">
              <LogIn size={18} /> Login
            </button>
          </form>

          <p className="text-center text-blue-200 text-xs mt-8">
            Belum punya akun? <span className="text-orange-400 cursor-pointer font-bold">Daftar Sekarang</span>
          </p>
        </div>

        {/* Info Box matching your UI */}
        <div className="bg-white/5 backdrop-blur-md border border-white/10 p-8 rounded-[2rem] max-w-sm text-white hidden md:block">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-white/10 p-2 rounded-xl"><Info size={20} className="text-orange-400" /></div>
            <h2 className="text-xl font-bold">Informasi Perpustakaan</h2>
          </div>
          <div className="space-y-4 text-sm text-blue-100">
            <p className="flex items-center gap-3"><span>✉</span> perpustakaanjtikunm@gmail.com</p>
            <p className="flex items-center gap-3"><span></span> @pustaka_jtik</p>
          </div>
        </div>
      </div>
    </div>
  );
}