'use client';

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Navbar from '../../components/navbar';
import Sidebar from '../../components/sidebar';
import { FaBook, FaHistory, FaCheckCircle, FaUndo, FaExclamationTriangle } from 'react-icons/fa';

export default function DashboardPage() {
  const [userData, setUserData] = useState<any>(null);
  const [borrowedBooks, setBorrowedBooks] = useState<any[]>([]);
  const [borrowHistory, setBorrowHistory] = useState<any[]>([]);
  
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.replace('/');
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
        // Fallback for simulation/dev
        setUserData({ name: "User", nim: "2026xxxx" });
      }
    };

    const fetchBorrowedBooks = () => {
      // Logic sync: Pull from the master context key 'borrowed_books'
      // This allows admin returns to reflect here automatically
      const storedData = JSON.parse(localStorage.getItem('borrowed_books') || '{"active": [], "history": []}');
      setBorrowedBooks(storedData.active || []);
      setBorrowHistory(storedData.history || []);
    };

    fetchProfile();
    fetchBorrowedBooks();

    // Sync if storage changes in other tabs
    window.addEventListener('storage', fetchBorrowedBooks);
    return () => window.removeEventListener('storage', fetchBorrowedBooks);
  }, [router]);

  // --- LOGIC: CHECK IF LATE (Based on Project Context Feb 12, 2026) ---
  const checkStatus = (dueDateStr: string) => {
    if (!dueDateStr) return { label: 'AKTIF', isLate: false };
    
    const today = new Date('2026-02-12'); 
    const dueDate = new Date(dueDateStr);

    if (today > dueDate) {
      return { label: 'TERLAMBAT', isLate: true };
    }
    return { label: 'AKTIF', isLate: false };
  };

  return (
    <div className="h-screen bg-white flex flex-col overflow-hidden">
      <Navbar />
      
      <div className="flex pt-16 h-full">
        <Sidebar />

        <main className="flex-1 md:ml-64 pt-2 px-8 pb-8 bg-white overflow-y-auto">
          
          <div className="flex justify-between items-end mb-8 mt-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-800">Dashboard Anggota</h2>
              <p className="text-sm text-gray-600 mt-1">
                Selamat datang, <span className="font-bold text-orange-600">{userData?.name || '...'}</span>!
              </p>
            </div>
            
            <div className="text-right hidden sm:block">
              {userData?.nim && (
                <span className="text-xs font-bold bg-[#172e5f] text-white px-3 py-1 rounded-full">
                  {userData.nim}
                </span>
              )}
            </div>
          </div>

          {/* --- STATS CARDS --- */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white p-6 rounded-xl shadow-sm flex items-center gap-5 border border-gray-200 transition-transform hover:-translate-y-1 duration-300">
              <div className="bg-blue-100 p-4 rounded-lg text-blue-600 text-2xl shadow-lg">
                <FaBook />
              </div>
              <div>
                <h3 className="text-3xl font-bold text-gray-800">{borrowedBooks.length}</h3>
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Sedang Dipinjam</p>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm flex items-center gap-5 border border-gray-200 transition-transform hover:-translate-y-1 duration-300">
              <div className="bg-orange-500 p-4 rounded-lg text-white text-2xl shadow-lg">
                <FaHistory />
              </div>
              <div>
                <h3 className="text-3xl font-bold text-gray-800">{borrowHistory.length}</h3>
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Total Riwayat</p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm flex items-center gap-5 border border-gray-200 transition-transform hover:-translate-y-1 duration-300">
              <div className="bg-[#a3e635] p-4 rounded-lg text-white text-2xl shadow-lg">
                <FaCheckCircle />
              </div>
              <div>
                <h3 className="text-3xl font-bold text-gray-800">
                  {borrowedBooks.some(b => checkStatus(b.due_date || b.jatuh_tempo).isLate) ? 'Terdeteksi' : '0'}
                </h3>
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Denda Terlambat</p>
              </div>
            </div>
          </div>

          {/* --- ACTIVE BORROWINGS TABLE --- */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mb-8">
            <div className="bg-[#172e5f] px-6 py-4 flex items-center gap-2 border-b-4 border-orange-500">
              <FaBook className="text-white" />
              <h3 className="text-white font-bold tracking-wide text-base">Buku yang Sedang Dipinjam</h3>
            </div>
            <div className="p-0 overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="text-gray-800 text-sm font-bold border-b-2 border-orange-500">
                    <th className="px-6 py-4">Judul Buku</th>
                    <th className="px-6 py-4">Tanggal Pinjam</th>
                    <th className="px-6 py-4">Jatuh Tempo</th>
                    <th className="px-6 py-4 text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="text-sm text-gray-800">
                  {borrowedBooks.length > 0 ? (
                    borrowedBooks.map((book: any, index: number) => {
                      const status = checkStatus(book.due_date || book.jatuh_tempo);
                      return (
                        <tr 
                          key={index} 
                          className="border-b border-gray-200 hover:bg-gray-100 transition-colors"
                        >
                          <td className="px-6 py-4 font-medium">
                            {book.book_title || book.title || book.judul_buku || '-'}
                          </td>
                          <td className="px-6 py-4">{book.borrow_date || book.tgl_pinjam || '-'}</td>
                          <td className="px-6 py-4">{book.due_date || book.jatuh_tempo || '-'}</td>
                          <td className="px-6 py-4 text-right">
                            <span className={`${status.isLate ? 'bg-red-600' : 'bg-green-600'} text-white px-3 py-1 rounded-full text-[10px] font-extrabold uppercase`}>
                              {status.label}
                            </span>
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr className="border-b border-gray-200">
                      <td colSpan={4} className="px-6 py-4 text-center text-gray-500">Tidak ada buku yang sedang dipinjam</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* --- HISTORY TABLE --- */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mb-8">
            <div className="bg-[#172e5f] px-6 py-4 flex items-center gap-2 border-b-4 border-orange-500">
              <FaHistory className="text-white text-lg" />
              <h3 className="text-white font-bold tracking-wide text-base">Riwayat Peminjaman</h3>
            </div>
            <div className="p-0 overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="text-gray-800 text-sm font-bold border-b-2 border-orange-500">
                    <th className="px-6 py-4">Judul Buku</th>
                    <th className="px-6 py-4">Tgl Pinjam</th>
                    <th className="px-6 py-4">Tgl Kembali</th>
                    <th className="px-6 py-4 text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="text-sm text-gray-800">
                  {borrowHistory.length > 0 ? (
                    borrowHistory.map((book: any, index: number) => (
                      <tr key={index} className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 font-medium">{book.book_title || book.title || book.judul_buku || '-'}</td>
                        <td className="px-6 py-4">{book.borrow_date || book.tgl_pinjam || '-'}</td>
                        <td className="px-6 py-4">{book.return_date || book.tgl_kembali || '-'}</td>
                        <td className="px-6 py-4 text-right">
                          <span className="bg-gray-500 text-white px-3 py-1 rounded-full text-[10px] font-extrabold uppercase">
                            Selesai
                          </span>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr className="border-b border-gray-200">
                      <td colSpan={4} className="px-6 py-4 text-center text-gray-500">Tidak ada riwayat peminjaman</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

        </main>
      </div>
    </div>
  );
}