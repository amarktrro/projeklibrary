'use client';

import React from 'react';
import Link from 'next/link';
import { 
  FaBook, 
  FaHistory, 
  FaCheckCircle, 
  FaSignOutAlt, 
  FaUser, 
  FaSearch, 
  FaInfoCircle,
  FaHome,
  FaGraduationCap
} from 'react-icons/fa';

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      
      {/* --- TOP NAVBAR --- */}
      <nav className="bg-[#1e293b] text-white h-16 flex items-center justify-between px-6 shadow-md fixed w-full z-10">
        <div className="flex items-center gap-3">
          <FaGraduationCap className="text-3xl" />
          <h1 className="text-xl font-bold tracking-wide">SIMPES JTIK</h1>
        </div>

        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <FaUser className="text-sm" />
            <span className="font-medium text-sm">Ahmad Fajar</span>
          </div>
          <Link href="/">
            <button className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-1.5 rounded-md text-sm font-bold flex items-center gap-2 transition-colors">
              <FaSignOutAlt /> Logout
            </button>
          </Link>
        </div>
      </nav>

      {/* --- MAIN LAYOUT (Sidebar + Content) --- */}
      <div className="flex pt-16 min-h-screen">
        
        {/* --- SIDEBAR --- */}
        <aside className="w-64 bg-white shadow-lg fixed h-full hidden md:block">
          <div className="py-6">
            <ul className="space-y-1">
              {/* Dashboard Link (Active State) */}
              <li>
                <Link href="/dashboard" className="flex items-center gap-3 px-6 py-3 bg-[#1e293b] text-white border-l-4 border-orange-500">
                  <FaHome />
                  <span className="font-medium">Dashboard</span>
                </Link>
              </li>
              
              {/* Cari Buku Link */}
              <li>
                <Link href="/dashboard/cari-buku" className="flex items-center gap-3 px-6 py-3 text-gray-600 hover:bg-gray-50 hover:text-orange-500 transition-colors">
                  <FaSearch />
                  <span className="font-medium">Cari Buku</span>
                </Link>
              </li>

              {/* Informasi Link */}
              <li>
                <Link href="/dashboard/informasi" className="flex items-center gap-3 px-6 py-3 text-gray-600 hover:bg-gray-50 hover:text-orange-500 transition-colors">
                  <FaInfoCircle />
                  <span className="font-medium">Informasi</span>
                </Link>
              </li>
            </ul>
          </div>
        </aside>

        {/* --- CONTENT AREA --- */}
        <main className="flex-1 md:ml-64 p-8 bg-gray-50">
          
          <div className="flex justify-between items-end mb-8">
            <h2 className="text-2xl font-bold text-[#1e293b]">Dashboard Anggota</h2>
            <p className="text-sm text-gray-500">Selamat datang, Ahmad Fajar!</p>
          </div>

          {/* --- STATS CARDS --- */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {/* Sedang Dipinjam Card */}
            <div className="bg-white p-6 rounded-xl shadow-sm flex items-center gap-5 border border-gray-100">
              <div className="bg-[#1e293b] p-4 rounded-lg text-white text-2xl">
                <FaBook />
              </div>
              <div>
                <h3 className="text-3xl font-bold text-[#1e293b]">2</h3>
                <p className="text-sm text-gray-500">Sedang Dipinjam</p>
              </div>
            </div>
            
            {/* Total Peminjaman Card */}
            <div className="bg-white p-6 rounded-xl shadow-sm flex items-center gap-5 border border-gray-100">
              <div className="bg-orange-500 p-4 rounded-lg text-white text-2xl">
                <FaHistory />
              </div>
              <div>
                <h3 className="text-3xl font-bold text-[#1e293b]">15</h3>
                <p className="text-sm text-gray-500">Total Peminjaman</p>
              </div>
            </div>

            {/* Denda Aktif Card */}
            <div className="bg-white p-6 rounded-xl shadow-sm flex items-center gap-5 border border-gray-100">
              <div className="bg-[#a3e635] p-4 rounded-lg text-white text-2xl">
                <FaCheckCircle />
              </div>
              <div>
                <h3 className="text-3xl font-bold text-[#1e293b]">0</h3>
                <p className="text-sm text-gray-500">Denda Aktif</p>
              </div>
            </div>
          </div>

          {/* --- TABLE 1: ACTIVE LOANS --- */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mb-8">
            <div className="bg-[#1e293b] px-6 py-4 flex items-center gap-2">
              <FaBook className="text-white" />
              <h3 className="text-white font-semibold">Buku yang Sedang Dipinjam</h3>
            </div>
            <div className="p-6">
              <table className="w-full text-left">
                <thead>
                  <tr className="text-gray-600 text-sm font-semibold border-b border-gray-200">
                    <th className="pb-3">Judul Buku</th>
                    <th className="pb-3">Tanggal Pinjam</th>
                    <th className="pb-3">Jatuh Tempo</th>
                    <th className="pb-3 text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="text-sm text-gray-700">
                  <tr className="border-b border-gray-100 last:border-0">
                    <td className="py-4 font-medium">Pemrograman Web Lanjut</td>
                    <td className="py-4">10/01/2025</td>
                    <td className="py-4">15/01/2025</td>
                    <td className="py-4 text-right">
                      <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold uppercase">Aktif</span>
                    </td>
                  </tr>
                  <tr>
                    <td className="py-4 font-medium">Algoritma dan Struktur Data</td>
                    <td className="py-4">12/01/2025</td>
                    <td className="py-4">17/01/2025</td>
                    <td className="py-4 text-right">
                      <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold uppercase">Aktif</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* --- TABLE 2: HISTORY --- */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="bg-[#1e293b] px-6 py-4 flex items-center gap-2">
              <FaHistory className="text-white" />
              <h3 className="text-white font-semibold">Riwayat Peminjaman</h3>
            </div>
            <div className="p-6">
              <table className="w-full text-left">
                <thead>
                  <tr className="text-gray-600 text-sm font-semibold border-b border-gray-200">
                    <th className="pb-3">Judul Buku</th>
                    <th className="pb-3">Tgl Pinjam</th>
                    <th className="pb-3">Tgl Kembali</th>
                    <th className="pb-3 text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="text-sm text-gray-700">
                  <tr className="border-b border-gray-100">
                    <td className="py-4 font-medium">Jaringan Komputer</td>
                    <td className="py-4">01/12/2024</td>
                    <td className="py-4">06/12/2024</td>
                    <td className="py-4 text-right">
                      <span className="bg-gray-200 text-gray-600 px-3 py-1 rounded-full text-xs font-bold uppercase">Selesai</span>
                    </td>
                  </tr>
                  <tr>
                    <td className="py-4 font-medium">Sistem Operasi</td>
                    <td className="py-4">15/11/2024</td>
                    <td className="py-4">20/11/2024</td>
                    <td className="py-4 text-right">
                      <span className="bg-gray-200 text-gray-600 px-3 py-1 rounded-full text-xs font-bold uppercase">Selesai</span>
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