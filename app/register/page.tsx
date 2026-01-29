'use client';

import React, { useState } from 'react'; // Added useState
import Link from 'next/link';
import { useRouter } from 'next/navigation'; // Added for redirecting
import axios from 'axios'; // Import axios
import { 
  FaUser, FaLock, FaEnvelope, FaGraduationCap, 
  FaUsers, FaPhone, FaIdCard, FaUserCheck 
} from 'react-icons/fa';

export default function RegisterPage() {
  const router = useRouter();
  
  // 1. Setup State to hold form data
  const [formData, setFormData] = useState({
    name: '',
    nim: '',
    prodi: '',
    kelas: '',
    email: '',
    no_hp: '',
    password: '',
    password_confirmation: '', // Laravel needs this exact name
  });

  // 2. Handle Input Changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 3. Submit to Laravel API
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Make sure your Laravel server is running at this URL!
      const response = await axios.post('http://127.0.0.1:8000/api/register', formData);
      
      alert('Registrasi Berhasil!');
      router.push('/'); // Redirect to login page after success
    } catch (error: any) {
      // Shows error if NIM/Email is already taken or validation fails
      alert('Error: ' + JSON.stringify(error.response?.data?.errors || "Server Error"));
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#ea580c] p-4 font-sans">
      <div className="bg-[#1e293b]/90 backdrop-blur-sm p-8 rounded-3xl shadow-2xl w-full max-w-4xl border border-white/5 text-white">
        
        <div className="flex flex-col items-center mb-8">
          <div className="text-5xl text-white mb-2">
            <FaGraduationCap />
          </div>
          <h1 className="text-3xl font-bold tracking-wider">SIMPES</h1>
          <p className="text-sm text-gray-400 mt-1">Jurusan Teknik Informatika dan Komputer</p>
        </div>

        {/* 4. Add onSubmit handler */}
        <form className="space-y-5" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Left Column */}
            <div className="space-y-5">
              <div>
                <label className="flex items-center gap-2 text-sm font-medium mb-2 text-gray-200">
                  <FaUser className="text-xs" /> Nama Lengkap
                </label>
                <input 
                  name="name" // Match Laravel field
                  onChange={handleChange}
                  type="text" 
                  placeholder="Nama Lengkap" 
                  className="w-full bg-[#334155] border border-transparent focus:border-orange-500 focus:ring-0 text-white placeholder-gray-400 rounded-lg px-4 py-3 outline-none transition-all"
                  required
                />
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm font-medium mb-2 text-gray-200">
                  <FaGraduationCap className="text-xs" /> Program Studi
                </label>
                <input 
                  name="prodi"
                  onChange={handleChange}
                  type="text" 
                  placeholder="Pilih Prodi" 
                  className="w-full bg-[#334155] border border-transparent focus:border-orange-500 focus:ring-0 text-white placeholder-gray-400 rounded-lg px-4 py-3 outline-none transition-all"
                  required
                />
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm font-medium mb-2 text-gray-200">
                  <FaEnvelope className="text-xs" /> Email
                </label>
                <input 
                  name="email"
                  onChange={handleChange}
                  type="email" 
                  placeholder="email@example.com" 
                  className="w-full bg-[#334155] border border-transparent focus:border-orange-500 focus:ring-0 text-white placeholder-gray-400 rounded-lg px-4 py-3 outline-none transition-all"
                  required
                />
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm font-medium mb-2 text-gray-200">
                  <FaLock className="text-xs" /> Password
                </label>
                <input 
                  name="password"
                  onChange={handleChange}
                  type="password" 
                  placeholder="Minimal 6 karakter" 
                  className="w-full bg-[#334155] border border-transparent focus:border-orange-500 focus:ring-0 text-white placeholder-gray-400 rounded-lg px-4 py-3 outline-none transition-all"
                  required
                />
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-5">
              <div>
                <label className="flex items-center gap-2 text-sm font-medium mb-2 text-gray-200">
                  <FaIdCard className="text-xs" /> NIM
                </label>
                <input 
                  name="nim"
                  onChange={handleChange}
                  type="text" 
                  placeholder="NIM" 
                  className="w-full bg-[#334155] border border-transparent focus:border-orange-500 focus:ring-0 text-white placeholder-gray-400 rounded-lg px-4 py-3 outline-none transition-all"
                  required
                />
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm font-medium mb-2 text-gray-200">
                  <FaUsers className="text-xs" /> Kelas
                </label>
                <input 
                  name="kelas"
                  onChange={handleChange}
                  type="text" 
                  placeholder="Contoh: A" 
                  className="w-full bg-[#334155] border border-transparent focus:border-orange-500 focus:ring-0 text-white placeholder-gray-400 rounded-lg px-4 py-3 outline-none transition-all"
                  required
                />
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm font-medium mb-2 text-gray-200">
                  <FaPhone className="text-xs" /> Nomor HP
                </label>
                <input 
                  name="no_hp"
                  onChange={handleChange}
                  type="tel" 
                  placeholder="08xxxxxxxxxx" 
                  className="w-full bg-[#334155] border border-transparent focus:border-orange-500 focus:ring-0 text-white placeholder-gray-400 rounded-lg px-4 py-3 outline-none transition-all"
                  required
                />
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm font-medium mb-2 text-gray-200">
                  <FaLock className="text-xs" /> Konfirmasi Password
                </label>
                <input 
                  name="password_confirmation"
                  onChange={handleChange}
                  type="password" 
                  placeholder="Ulangi Password" 
                  className="w-full bg-[#334155] border border-transparent focus:border-orange-500 focus:ring-0 text-white placeholder-gray-400 rounded-lg px-4 py-3 outline-none transition-all"
                  required
                />
              </div>
            </div>
          </div>

          <button 
            type="submit" 
            className="w-full bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white font-bold py-3 rounded-lg mt-8 flex items-center justify-center gap-2 transition-all shadow-lg transform active:scale-95"
          >
            <FaUserCheck /> Daftar Sekarang
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-400">
          Sudah punya akun? <Link href="/" className="text-orange-400 hover:text-orange-300 font-medium">Login Sekarang</Link>
        </div>
      </div>
    </div>
  );
}