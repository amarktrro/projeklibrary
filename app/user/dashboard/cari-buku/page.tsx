'use client';

import React from 'react';
import Link from 'next/link';
import { 
  FaSearch, 
  FaBook, 
  FaUser, 
  FaTag, 
  FaBookmark, 
  FaHandHolding,
  FaBan,
  FaHome,
  FaInfoCircle,
  FaGraduationCap,
  FaSignOutAlt
} from 'react-icons/fa';

// Mock data for the books shown in the image
const books = [
  { id: 'PWL-001', title: 'Pemrograman Web Lanjut', author: 'Dr. Ahmad Subagyo', category: 'Pemrograman', stock: 3, available: true },
  { id: 'ASD-002', title: 'Algoritma dan Struktur Data', author: 'Prof. Siti Rahmawati', category: 'Pemrograman', stock: 5, available: true },
  { id: 'JK-003', title: 'Jaringan Komputer', author: 'Dr. Budi Hartono', category: 'Jaringan', stock: 0, available: false },
  { id: 'SBD-004', title: 'Sistem Basis Data', author: 'Dr. Dewi Kusuma', category: 'Database', stock: 2, available: true },
  { id: 'SO-005', title: 'Sistem Operasi Modern', author: 'Prof. Andi Wijaya', category: 'Sistem Operasi', stock: 4, available: true },
  { id: 'MM-006', title: 'Multimedia Interaktif', author: 'Dr. Rina Putri', category: 'Multimedia', stock: 6, available: true },
];

export default function CariBukuPage() {
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

      <div className="flex pt-16 min-h-screen">
        
        {/* --- SIDEBAR --- */}
        <aside className="w-64 bg-white shadow-lg fixed h-full hidden md:block border-r border-blue-100">
          <div className="py-6">
            <ul className="space-y-1">
              <li>
                <Link href="/dashboard" className="flex items-center gap-3 px-6 py-3 text-gray-600 hover:bg-gray-50 hover:text-orange-500 transition-colors">
                  <FaHome />
                  <span className="font-medium">Dashboard</span>
                </Link>
              </li>
              <li>
                <Link href="/dashboard/cari-buku" className="flex items-center gap-3 px-6 py-3 bg-[#1e293b] text-white border-l-4 border-orange-500">
                  <FaSearch />
                  <span className="font-medium">Cari Buku</span>
                </Link>
              </li>
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
        <main className="flex-1 md:ml-64 p-8 bg-white">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-3">
              <div className="bg-[#1e293b] p-2 rounded text-white">
                <FaBook />
              </div>
              <h2 className="text-2xl font-bold text-[#1e293b]">Daftar Buku</h2>
            </div>
            <p className="text-sm text-gray-500">Cari dan pinjam buku yang tersedia</p>
          </div>

          {/* --- SEARCH & FILTER BAR --- */}
          <div className="flex flex-col md:flex-row gap-4 mb-8 bg-gray-50 p-4 rounded-xl border border-gray-200">
            <div className="flex-1 relative">
              <input 
                type="text" 
                placeholder="Cari judul buku, penulis, atau kategori..." 
                className="w-full pl-4 pr-12 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none"
              />
              <button className="absolute right-2 top-1.5 bg-orange-500 text-white px-4 py-1 rounded-md flex items-center gap-2 hover:bg-orange-600 transition-colors">
                <FaSearch className="text-sm" /> Cari
              </button>
            </div>
            <select className="bg-white border border-gray-300 rounded-lg px-4 py-2.5 outline-none focus:ring-2 focus:ring-orange-500 min-w-[200px]">
              <option>Semua Kategori</option>
              <option>Pemrograman</option>
              <option>Jaringan</option>
              <option>Database</option>
            </select>
          </div>

          {/* --- BOOK GRID --- */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {books.map((book) => (
              <div key={book.id} className="bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow overflow-hidden flex flex-col">
                {/* Book Cover Placeholder */}
                <div className="bg-[#c1d095] h-48 flex items-center justify-center m-4 rounded-xl">
                  <FaBook className="text-6xl text-[#1e293b]" />
                </div>
                
                {/* Book Details */}
                <div className="px-6 pb-6 flex-1 flex flex-col">
                  <h3 className="font-bold text-[#1e293b] text-lg mb-3">{book.title}</h3>
                  
                  <div className="space-y-2 mb-4 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <FaUser className="text-xs text-gray-400" /> {book.author}
                    </div>
                    <div className="flex items-center gap-2">
                      <FaTag className="text-xs text-gray-400" /> {book.category}
                    </div>
                    <div className="flex items-center gap-2">
                      <FaBookmark className="text-xs text-gray-400" /> Kode: {book.id}
                    </div>
                  </div>

                  {/* Stock Status */}
                  <div className="mb-4">
                    <span className={`${book.available ? 'bg-green-600' : 'bg-red-600'} text-white text-xs px-3 py-1 rounded-full font-bold`}>
                      Tersedia: {book.stock}
                    </span>
                  </div>

                  {/* Action Button */}
                  {book.available ? (
                    <button className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2.5 rounded-lg flex items-center justify-center gap-2 font-bold transition-colors mt-auto">
                      <FaHandHolding /> Pinjam Buku
                    </button>
                  ) : (
                    <button disabled className="w-full bg-slate-400 text-white py-2.5 rounded-lg flex items-center justify-center gap-2 font-bold cursor-not-allowed mt-auto">
                      <FaBan /> Tidak Tersedia
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}