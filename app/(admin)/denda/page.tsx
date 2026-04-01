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
  FaCalculator
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
    <div className="p-6 md:p-8 bg-[#f4f6f9] min-h-screen text-[#333] w-full font-sans font-normal">
      
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 px-1">
        <div>
          <h1 className="text-2xl font-normal text-[#1a2942] flex items-center gap-3 m-0">
            <FaMoneyBillWave /> Kelola Denda
          </h1>
          <p className="text-sm text-gray-500 mt-1 font-normal">Manajemen denda otomatis (Rp 1.000/hari)</p>
        </div>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-[8px] shadow-sm border border-gray-200 p-6 flex items-center gap-5">
          <div className="w-14 h-14 rounded-[8px] flex items-center justify-center text-white text-xl bg-[#dc3545]">
            <FaExclamationTriangle />
          </div>
          <div>
            <h3 className="text-2xl font-normal text-[#1a2942] m-0">{stats.totalAktif}</h3>
            <p className="text-gray-500 text-[11px] font-normal uppercase m-0">Total Denda Aktif</p>
          </div>
        </div>
        <div className="bg-white rounded-[8px] shadow-sm border border-gray-200 p-6 flex items-center gap-5">
          <div className="w-14 h-14 rounded-[8px] flex items-center justify-center text-white text-xl bg-[#f39c12]">
            <FaMoneyBill />
          </div>
          <div>
            <h3 className="text-2xl font-normal text-[#1a2942] m-0">{formatCurrency(stats.totalBelumLunas)}</h3>
            <p className="text-gray-500 text-[11px] font-normal uppercase m-0">Total Belum Lunas</p>
          </div>
        </div>
        <div className="bg-white rounded-[8px] shadow-sm border border-gray-200 p-6 flex items-center gap-5">
          <div className="w-14 h-14 rounded-[8px] flex items-center justify-center text-white text-xl bg-[#28a745]">
            <FaCheckCircle />
          </div>
          <div>
            <h3 className="text-2xl font-normal text-[#1a2942] m-0">{formatCurrency(stats.totalLunasBulanIni)}</h3>
            <p className="text-gray-500 text-[11px] font-normal uppercase m-0">Lunas Bulan Ini</p>
          </div>
        </div>
      </div>

      {/* Main Table Content */}
      <div className="bg-white rounded-[8px] shadow-sm border border-gray-200 mb-8 overflow-hidden w-full font-normal">
        <div className="bg-[#1a2942] text-white px-6 py-4 flex justify-between items-center border-b-[3px] border-[#e67e22]">
          <h3 className="text-sm font-normal m-0 flex items-center gap-3 tracking-wider">
            <FaList /> DAFTAR DENDA MAHASISWA
          </h3>
          <select 
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-3 py-1.5 rounded-[8px] border border-gray-400 text-gray-700 bg-white outline-none text-xs font-normal cursor-pointer"
          >
            <option value="all">Semua Status</option>
            <option value="Belum Lunas">Belum Lunas</option>
            <option value="Lunas">Lunas</option>
          </select>
        </div>
        
        <div className="overflow-x-auto p-2 font-normal">
          <table className="w-full text-left border-collapse min-w-[1100px]">
            <thead>
              <tr className="text-[#212529] font-normal text-[11px] uppercase bg-gray-50 border-b border-gray-200">
                <th className="p-4 font-normal">No</th>
                <th className="p-4 font-normal">NIM</th>
                <th className="p-4 font-normal">Nama Mahasiswa</th>
                <th className="p-4 font-normal">Judul Buku</th>
                <th className="p-4 font-normal">Pinjam</th>
                <th className="p-4 font-normal">Tempo</th>
                <th className="p-4 font-normal text-center">Late</th>
                <th className="p-4 font-normal">Denda</th>
                <th className="p-4 font-normal text-center">Status</th>
                <th className="p-4 font-normal">Aksi</th>
              </tr>
            </thead>
            <tbody className="text-sm font-normal">
              {loading ? (
                <tr><td colSpan={10} className="p-10 text-center text-gray-400 italic">Memuat data denda dari server...</td></tr>
              ) : filteredData.length === 0 ? (
                <tr><td colSpan={10} className="p-10 text-center text-gray-400 italic">Tidak ada tagihan denda saat ini.</td></tr>
              ) : (
                filteredData.map((denda, index) => (
                  <tr key={denda.id} className="border-b border-gray-100 hover:bg-gray-50/50 transition-colors">
                    <td className="p-4 text-gray-400 font-normal">{index + 1}</td>
                    <td className="p-4 font-mono text-[13px] text-gray-600 font-normal">{denda.nim}</td>
                    <td className="p-4 font-normal text-gray-800">{denda.nama}</td>
                    <td className="p-4 text-gray-600 font-normal">{denda.buku}</td>
                    <td className="p-4 text-gray-500 text-xs font-normal">{denda.pinjam}</td>
                    <td className="p-4 text-gray-500 text-xs font-normal">{denda.tempo}</td>
                    <td className="p-4 text-center">
                      <span className="bg-[#dc3545] text-white p-1 px-2 rounded-[11px] text-[10px] font-normal whitespace-nowrap inline-block">
                        {denda.late}
                      </span>
                    </td>
                    <td className="p-4 font-normal text-[#1a2942] font-semibold">{formatCurrency(denda.denda)}</td>
                    <td className="p-4 text-center font-normal">
                      <span className={`${denda.status === "Belum Lunas" ? "bg-[#ffc107] text-black" : "bg-[#28a745] text-white"} p-1 rounded-[11px] text-[10px] font-normal uppercase whitespace-nowrap inline-block min-w-[80px]`}>
                        {denda.status}
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="flex justify-start items-center gap-2">
                        {denda.status === "Belum Lunas" ? (
                          <>
                            <button 
                              onClick={() => handlePayClick(denda)}
                              className="bg-[#28a745] text-white px-3 py-1.5 rounded-[8px] text-xs font-normal flex items-center gap-1.5 hover:bg-[#218838] shadow-sm transition-all"
                            >
                              <FaCheck size={10} /> Konfirmasi Bayar
                            </button>
                          </>
                        ) : (
                          <span className="text-gray-400 italic text-xs">Sudah Lunas</span>
                        )}
                      </div>
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
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-[12px] shadow-xl max-w-md w-full overflow-hidden">
            <div className="bg-[#1a2942] p-4 text-white flex justify-between items-center">
              <h3 className="m-0 text-sm font-normal flex items-center gap-2">
                <FaMoneyBillWave /> Konfirmasi Pembayaran
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-white/80 hover:text-white">
                <FaTimes />
              </button>
            </div>
            <div className="p-6">
              <p className="text-sm text-gray-600 mb-4">
                Apakah Anda yakin ingin memproses pembayaran denda untuk mahasiswa berikut?
              </p>
              <div className="bg-gray-50 p-4 rounded-[8px] border border-gray-100 mb-6 text-sm">
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
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-[8px] text-sm hover:bg-gray-50 transition-all"
                >
                  Batal
                </button>
                <button 
                  onClick={handleConfirmPayment}
                  className="flex-1 px-4 py-2 bg-[#28a745] text-white rounded-[8px] text-sm font-semibold hover:bg-[#218838] transition-all shadow-md"
                >
                  Konfirmasi Lunas
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}