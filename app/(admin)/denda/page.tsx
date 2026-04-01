"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { 
  FaMoneyBillWave, 
  FaExclamationTriangle, 
  FaMoneyBill, 
  FaCheckCircle, 
  FaList, 
  FaCheck, 
  FaBell, 
  FaTimes,
  FaCog,
  FaCalculator,
  FaSync
} from "react-icons/fa";

export default function DendaPage() {
  const router = useRouter();
  const [filterStatus, setFilterStatus] = useState("all");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDenda, setSelectedDenda] = useState<any>(null);
  const [dendaData, setDendaData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Stats State
  const [stats, setStats] = useState({
    totalAktif: 0,
    totalBelumLunas: 0,
    totalLunasBulanIni: 0 // Ini bisa diisi manual atau ambil dari API lain nanti
  });

  // 1. Fungsi Mengambil Data dari Backend
  const fetchDenda = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/admin/denda");
      const data = response.data;
      setDendaData(data);
      
      // Hitung statistik dari data yang dikirim Laravel
      const totalBelumLunasCount = data.length;
      const totalUangDenda = data.reduce((acc: number, curr: any) => acc + curr.denda, 0);
      
      setStats(prev => ({
        ...prev,
        totalAktif: totalBelumLunasCount,
        totalBelumLunas: totalUangDenda,
      }));
    } catch (error) {
      console.error("Gagal mengambil data denda:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const adminToken = localStorage.getItem("admin_token");
  const role = localStorage.getItem("role");

  // LOOPHOLE FIX: If no token or not admin, redirect to login immediately
  if (!adminToken || role !== 'admin') {
    router.push('/admin-login');
    return;
  }
    fetchDenda();
  
  
  }, []);

  const formatCurrency = (amount: number) =>
    new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(amount);

  const handlePayClick = (item: any) => {
    setSelectedDenda(item);
    setIsModalOpen(true);
  };

  // 2. Fungsi Konfirmasi Bayar ke Backend (Sesuai Logic DendaController)
  const handleConfirmPayment = async () => {
    if (selectedDenda) {
      try {
        const response = await axios.post(`http://127.0.0.1:8000/api/admin/denda/${selectedDenda.id}/bayar`);
        
        if (response.data.status === 'success') {
          setIsModalOpen(false);
          setSelectedDenda(null);
          alert("Pembayaran Berhasil! Riwayat telah disimpan ke database.");
          fetchDenda(); // REFRESH DATA agar item yang lunas hilang dari list
        }
      } catch (error) {
        console.error("Gagal bayar:", error);
        alert("Gagal memproses pembayaran. Periksa koneksi server Laravel.");
      }
    }
  };

  // 3. Filter Data
  const filteredData = dendaData.filter(item => {
    if (filterStatus === "all") return true;
    return item.status.toLowerCase() === filterStatus.toLowerCase();
  });

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="max-w-[95rem] mx-auto">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
          <div className="flex items-center gap-4">
            <div className="bg-[#172e5f] p-4 rounded-2xl text-white shadow-xl">
              <FaMoneyBillWave size={28} />
            </div>
            <div>
              <h1 className="text-3xl font-black text-[#172e5f] uppercase tracking-tight">Kelola Denda</h1>
              <p className="text-xs text-gray-500 font-bold uppercase tracking-widest">Manajemen denda otomatis (Rp 1.000/hari)</p>
            </div>
          </div>
          <button
            onClick={fetchDenda}
            className="flex items-center gap-2 bg-white border border-gray-300 px-5 py-2.5 rounded-xl text-xs font-black text-black shadow-sm hover:bg-gray-100 transition-colors"
          >
            <FaSync /> REFRESH DATA
          </button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
          <div className="bg-white p-7 rounded-3xl shadow-sm border border-gray-200 flex items-center gap-6">
            <div className="bg-[#dc3545] p-5 rounded-2xl text-white shadow-lg"><FaExclamationTriangle size={30} /></div>
            <div>
              <p className="text-4xl font-black text-black">{stats.totalAktif}</p>
              <p className="text-[10px] text-gray-500 font-black uppercase tracking-widest">Total Denda Aktif</p>
            </div>
          </div>

          <div className="bg-white p-7 rounded-3xl shadow-sm border border-gray-200 flex items-center gap-6">
            <div className="bg-[#f59e0b] p-5 rounded-2xl text-white shadow-lg"><FaMoneyBill size={30} /></div>
            <div>
              <p className="text-4xl font-black text-black">{formatCurrency(stats.totalBelumLunas)}</p>
              <p className="text-[10px] text-orange-600 font-black uppercase tracking-widest">Total Denda Belum Lunas</p>
            </div>
          </div>

          <div className="bg-white p-7 rounded-3xl shadow-sm border border-gray-200 flex items-center gap-6">
            <div className="bg-[#16a34a] p-5 rounded-2xl text-white shadow-lg"><FaCheckCircle size={30} /></div>
            <div>
              <p className="text-4xl font-black text-black">{formatCurrency(stats.totalLunasBulanIni)}</p>
              <p className="text-[10px] text-green-600 font-black uppercase tracking-widest">Total Denda Lunas Bulan Ini</p>
            </div>
          </div>
        </div>

        {/* Denda Table */}
        <div className="bg-white rounded-3xl shadow-xl border border-gray-200 overflow-hidden">
          <div className="p-6 bg-white border-b border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-3 text-sm text-black font-black uppercase tracking-tight">
              <FaList /> DAFTAR DENDA MAHASISWA
            </div>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="bg-gray-50 border border-gray-300 rounded-xl px-4 py-2.5 text-sm font-bold text-black focus:outline-none"
            >
              <option value="all">Semua Status</option>
              <option value="Belum Lunas">Belum Lunas</option>
              <option value="Lunas">Lunas</option>
            </select>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#172e5f] text-white text-[14px] font-black uppercase tracking-tight">
                  <th className="py-5 px-4">No</th>
                  <th className="py-5 px-4">NIM</th>
                  <th className="py-5 px-4">Nama</th>
                  <th className="py-5 px-4">Judul Buku</th>
                  <th className="py-5 px-4">Pinjam</th>
                  <th className="py-5 px-4">Tempo</th>
                  <th className="py-5 px-4 text-center">Late</th>
                  <th className="py-5 px-4">Denda</th>
                  <th className="py-5 px-4 text-center">Status</th>
                  <th className="py-5 px-4 text-center">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {loading ? (
                  <tr><td colSpan={10} className="p-10 text-center text-gray-400 italic">Memuat data denda dari server...</td></tr>
                ) : filteredData.length === 0 ? (
                  <tr><td colSpan={10} className="p-10 text-center text-gray-400 italic">Tidak ada tagihan denda saat ini.</td></tr>
                ) : (
                  filteredData.map((denda, index) => (
                    <tr key={denda.id} className="hover:bg-blue-50/30 transition-colors">
                      <td className="py-5 px-4 text-sm font-black text-black">{index + 1}</td>
                      <td className="py-5 px-4 text-sm font-medium text-black">{denda.nim}</td>
                      <td className="py-5 px-4 text-sm font-black text-black">{denda.nama}</td>
                      <td className="py-5 px-4 text-sm font-bold text-black">{denda.buku}</td>
                      <td className="py-5 px-4 text-sm font-medium text-black">{denda.pinjam}</td>
                      <td className="py-5 px-4 text-sm font-medium text-black">{denda.tempo}</td>
                      <td className="py-5 px-4 text-center text-sm font-black text-red-600">{denda.late}</td>
                      <td className="py-5 px-4 text-sm font-black text-[#1a2942]">{formatCurrency(denda.denda)}</td>
                      <td className="py-5 px-4 text-center">
                        <span className={`${denda.status === "Belum Lunas" ? 'bg-yellow-500 text-black' : 'bg-green-600 text-white'} px-4 py-1.5 rounded-full text-[10px] font-black uppercase shadow-sm`}>
                          {denda.status}
                        </span>
                      </td>
                      <td className="py-5 px-4 text-center">
                        {denda.status === "Belum Lunas" ? (
                          <button
                            onClick={() => handlePayClick(denda)}
                            className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-xl text-xs font-black flex items-center gap-2 mx-auto transition-all active:scale-95 shadow-md uppercase tracking-wider"
                          >
                            <FaCheckCircle size={14} /> Bayar
                          </button>
                        ) : (
                          <span className="text-gray-400 italic text-xs">Sudah Lunas</span>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Modal Konfirmasi Pembayaran */}
        {isModalOpen && selectedDenda && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-3xl shadow-xl max-w-md w-full overflow-hidden">
              <div className="bg-[#172e5f] p-6 text-white flex justify-between items-center">
                <h3 className="text-sm font-black uppercase tracking-widest flex items-center gap-2"><FaMoneyBillWave /> Konfirmasi Pembayaran</h3>
                <button onClick={() => setIsModalOpen(false)} className="text-white/80 hover:text-white">
                  <FaTimes />
                </button>
              </div>
              <div className="p-6">
                <p className="text-sm text-gray-600 mb-4">
                  Apakah Anda yakin ingin memproses pembayaran denda untuk mahasiswa berikut?
                </p>
                <div className="bg-gray-50 p-4 rounded-3xl border border-gray-100 mb-6 text-sm">
                  <div className="flex justify-between py-1">
                    <span className="text-gray-500">Mahasiswa:</span>
                    <span className="font-semibold">{selectedDenda.nama}</span>
                  </div>
                  <div className="flex justify-between py-1 border-t border-gray-200 mt-2 pt-2 text-lg">
                    <span className="text-gray-500">Total Denda:</span>
                    <span className="font-bold text-[#dc3545]">{formatCurrency(selectedDenda.denda)}</span>
                  </div>
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-2xl text-sm hover:bg-gray-100 transition-all"
                  >
                    Batal
                  </button>
                  <button
                    onClick={handleConfirmPayment}
                    className="flex-1 px-4 py-2 bg-green-600 text-white rounded-2xl text-sm font-black hover:bg-green-700 transition-all shadow-md"
                  >
                    Konfirmasi Lunas
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}