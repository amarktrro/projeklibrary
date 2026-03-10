'use client';

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Navbar from '../../components/navbar';
import Sidebar from '../../components/sidebar';
import { FaBook, FaHistory, FaCheckCircle } from 'react-icons/fa';

export default function DashboardPage() {
  const [userData, setUserData] = useState<any>(null);
  const [borrowedBooks, setBorrowedBooks] = useState<any[]>([]);
  const [borrowHistory, setBorrowHistory] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // --- FUNGSI AMBIL DATA DARI API ---
  const fetchData = async () => {
    const token = localStorage.getItem('token');
    if (!token) return;

    try {
      // 1. Ambil Profil User
      const profileRes = await axios.get('http://127.0.0.1:8000/api/user-profile', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUserData(profileRes.data);

      // 2. Ambil Data Peminjaman Aktif & Riwayat (Endpoint Baru)
      const loanRes = await axios.get('http://127.0.0.1:8000/api/user/peminjaman', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setBorrowedBooks(loanRes.data.active);
      setBorrowHistory(loanRes.data.history);

    } catch (error) {
      console.error("Gagal mengambil data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.replace('/');
      return;
    }
    fetchData();
  }, [router]);

  // --- LOGIC: CEK TERLAMBAT ---
  const checkStatus = (dueDateStr: string) => {
    const today = new Date();
    const dueDate = new Date(dueDateStr);
    return today > dueDate ? { label: 'TERLAMBAT', isLate: true } : { label: 'AKTIF', isLate: false };
  };

  return (
    <div className="h-screen bg-white flex flex-col overflow-hidden text-gray-800">
      <Navbar />
      <div className="flex pt-16 h-full">
        <Sidebar />
        <main className="flex-1 md:ml-64 p-8 bg-white overflow-y-auto">
          
          {/* HEADER DASHBOARD */}
          <div className="flex justify-between items-end mb-8 mt-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-800">Dashboard Anggota</h2>
              <p className="text-sm text-gray-600 mt-1">
                Selamat datang, <span className="font-bold text-orange-600">{userData?.name || '...'}</span>!
              </p>
            </div>
            {userData?.nim && (
              <div className="hidden sm:block text-right">
                <span className="text-xs font-bold bg-[#172e5f] text-white px-3 py-1 rounded-full uppercase">
                  NIM: {userData.nim}
                </span>
              </div>
            )}
          </div>

          {/* --- STATS CARDS (UI ASLI KAMU) --- */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 flex items-center gap-5 hover:-translate-y-1 transition-transform">
              <div className="bg-[#1e293b] p-4 rounded-xl text-white text-2xl shadow-lg"><FaBook /></div>
              <div><h3 className="text-3xl font-bold text-gray-800">{borrowedBooks.length}</h3><p className="text-xs font-medium text-gray-500 uppercase">Sedang Dipinjam</p></div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 flex items-center gap-5 hover:-translate-y-1 transition-transform">
              <div className="bg-orange-500 p-4 rounded-lg text-white text-2xl shadow-lg"><FaHistory /></div>
              <div><h3 className="text-3xl font-bold text-gray-800">{borrowHistory.length}</h3><p className="text-xs font-medium text-gray-500 uppercase">Total Riwayat</p></div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 flex items-center gap-5 hover:-translate-y-1 transition-transform">
              <div className="bg-[#a3e635] p-4 rounded-lg text-white text-2xl shadow-lg"><FaCheckCircle /></div>
              <div>
                <h3 className="text-3xl font-bold text-gray-800">
                   {borrowedBooks.some(b => checkStatus(b.jatuh_tempo).isLate) ? '1' : '0'}
                </h3>
                <p className="text-xs font-medium text-gray-500 uppercase">Denda Terlambat</p>
              </div>
            </div>
          </div>

          {/* --- TABLE AKTIF (UI ASLI KAMU) --- */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mb-8">
            <div className="bg-[#172e5f] px-6 py-4 border-b-4 border-orange-500 flex items-center gap-2">
              <FaBook className="text-white" />
              <h3 className="text-white font-bold tracking-wide">Buku yang Sedang Dipinjam</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-gray-50 text-gray-800 text-sm font-bold border-b-2 border-orange-500">
                  <tr>
                    <th className="px-6 py-4">Judul Buku</th>
                    <th className="px-6 py-4">Tanggal Pinjam</th>
                    <th className="px-6 py-4">Jatuh Tempo</th>
                    <th className="px-6 py-4 text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  {borrowedBooks.map((item, i) => (
                    <tr key={i} className="border-b border-gray-200 hover:bg-gray-50">
                      <td className="px-6 py-4 font-medium">{item.buku?.judul}</td>
                      <td className="px-6 py-4">{item.tgl_pinjam}</td>
                      <td className="px-6 py-4">{item.jatuh_tempo}</td>
                      <td className="px-6 py-4 text-right">
                        <span className={`${checkStatus(item.jatuh_tempo).isLate ? 'bg-red-600' : 'bg-green-600'} text-white px-3 py-1 rounded-full text-[10px] font-extrabold uppercase`}>
                          {checkStatus(item.jatuh_tempo).label}
                        </span>
                      </td>
                    </tr>
                  ))}
                  {borrowedBooks.length === 0 && (
                    <tr><td colSpan={4} className="p-10 text-center text-gray-400">Tidak ada buku aktif</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* --- TABLE RIWAYAT (UI ASLI KAMU) --- */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mb-8">
            <div className="bg-[#172e5f] px-6 py-4 border-b-4 border-orange-500 flex items-center gap-2">
              <FaHistory className="text-white" />
              <h3 className="text-white font-bold tracking-wide">Riwayat Peminjaman</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-gray-50 text-gray-800 text-sm font-bold border-b-2 border-orange-500">
                  <tr>
                    <th className="px-6 py-4">Judul Buku</th>
                    <th className="px-6 py-4">Tgl Pinjam</th>
                    <th className="px-6 py-4">Tgl Kembali</th>
                    <th className="px-6 py-4 text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  {borrowHistory.map((item, i) => (
                    <tr key={i} className="border-b border-gray-200 hover:bg-gray-50">
                      <td className="px-6 py-4 font-medium">{item.buku?.judul}</td>
                      <td className="px-6 py-4">{item.tgl_pinjam}</td>
                      <td className="px-6 py-4">{item.tgl_kembali}</td>
                      <td className="px-6 py-4 text-right">
                        <span className="bg-gray-500 text-white px-3 py-1 rounded-full text-[10px] font-extrabold uppercase">Selesai</span>
                      </td>
                    </tr>
                  ))}
                  {borrowHistory.length === 0 && (
                    <tr><td colSpan={4} className="p-10 text-center text-gray-400">Belum ada riwayat</td></tr>
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