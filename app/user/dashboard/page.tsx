'use client';

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Navbar from '../../components/navbar';
import Sidebar from '../../components/sidebar';
import { FaBook, FaHistory, FaCheckCircle } from 'react-icons/fa';

export default function DashboardPage() {
  const [userData, setUserData] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    
    // 1. INSTANT REDIRECT (Prevents "Back" button access)
    if (!token) {
      router.replace('/'); // replace avoids adding this page to history
      return;
    }

    const fetchProfile = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/user-profile', {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json'
          }
        });
        setUserData(response.data);
      } catch (error) {
        localStorage.removeItem('token');
        router.replace('/');
      }
    };

    fetchProfile();
  }, [router]);

  return (
    <div className="h-screen bg-gray-50 flex flex-col font-sans overflow-hidden">
      <Navbar />
      
      {/* Changed min-h-screen to h-full to fill the remaining space below the navbar */}
      <div className="flex pt-16 h-full">
        <Sidebar />

        {/* FIXED: Changed p-8 to pt-2 px-8 pb-8 to remove the top gap */}
        <main className="flex-1 md:ml-64 pt-2 px-8 pb-8 bg-gray-50 overflow-y-auto">
          
          <div className="flex justify-between items-end mb-8">
            <div>
              <h2 className="text-2xl font-bold text-[#1e293b]">Dashboard Anggota</h2>
              <p className="text-sm text-gray-500 mt-1">
                {/* We use optional chaining ?. so it stays blank until loaded without crashing */}
                Selamat datang, <span className="font-bold text-orange-600">{userData?.name || '...'}</span>!
              </p>
            </div>
            
            <div className="text-right hidden sm:block">
              {userData?.nim && (
                <span className="text-xs font-bold bg-[#1e293b] text-white px-3 py-1 rounded-full">
                  {userData.nim}
                </span>
              )}
            </div>
          </div>

          {/* --- STATS CARDS --- */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white p-6 rounded-xl shadow-sm flex items-center gap-5 border border-gray-100 transition-transform hover:-translate-y-1 duration-300">
              <div className="bg-[#1e293b] p-4 rounded-lg text-white text-2xl shadow-lg shadow-gray-200">
                <FaBook />
              </div>
              <div>
                <h3 className="text-3xl font-bold text-[#1e293b]">2</h3>
                <p className="text-xs font-medium text-gray-400 uppercase tracking-wide">Sedang Dipinjam</p>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm flex items-center gap-5 border border-gray-100 transition-transform hover:-translate-y-1 duration-300">
              <div className="bg-orange-500 p-4 rounded-lg text-white text-2xl shadow-lg shadow-orange-100">
                <FaHistory />
              </div>
              <div>
                <h3 className="text-3xl font-bold text-[#1e293b]">15</h3>
                <p className="text-xs font-medium text-gray-400 uppercase tracking-wide">Total Peminjaman</p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm flex items-center gap-5 border border-gray-100 transition-transform hover:-translate-y-1 duration-300">
              <div className="bg-[#a3e635] p-4 rounded-lg text-white text-2xl shadow-lg shadow-lime-100">
                <FaCheckCircle />
              </div>
              <div>
                <h3 className="text-3xl font-bold text-[#1e293b]">0</h3>
                <p className="text-xs font-medium text-gray-400 uppercase tracking-wide">Denda Aktif</p>
              </div>
            </div>
          </div>

          {/* --- TABLES (Keep your design exactly as is) --- */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mb-8">
            <div className="bg-[#1e293b] px-6 py-4 flex items-center gap-2 border-b border-gray-200">
              <FaBook className="text-orange-500" />
              <h3 className="text-white font-bold tracking-wide text-sm uppercase">Buku yang Sedang Dipinjam</h3>
            </div>
            <div className="p-0">
              <table className="w-full text-left">
                <thead className="bg-gray-50">
                  <tr className="text-gray-500 text-xs font-bold uppercase tracking-wider border-b border-gray-200">
                    <th className="px-6 py-4">Judul Bukues</th>
                    <th className="px-6 py-4">Tanggal Pinjam</th>
                    <th className="px-6 py-4">Jatuh Tempo</th>
                    <th className="px-6 py-4 text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="text-sm text-gray-700 divide-y divide-gray-100">
                  <tr className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 font-bold text-[#1e293b]">Pemrograman Web Lanjut</td>
                    <td className="px-6 py-4">10/01/2025</td>
                    <td className="px-6 py-4 text-red-500 font-medium">15/01/2025</td>
                    <td className="px-6 py-4 text-right">
                      <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide border border-green-200">Aktif</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>



        </main>
      </div>
    </div>
  );
}