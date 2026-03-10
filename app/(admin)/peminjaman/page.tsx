"use client";
import React, { useState, useEffect, useCallback } from "react";
import {
  FaUndo, FaSearch, FaBook, FaCheckCircle,
  FaExclamationTriangle, FaHandshake, FaSync, FaHistory
} from "react-icons/fa";
import axios from "axios";

export default function AdminPeminjaman() {
  const [activeBorrows, setActiveBorrows] = useState<any[]>([]);
  const [borrowHistory, setBorrowHistory] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("Semua Status");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const API_URL = "http://localhost:8000/api/admin/peminjaman";

  const loadData = useCallback(async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(API_URL, {
        headers: { Authorization: `Bearer ${token}` }
      });

      const active = response.data.active.map((item: any) => ({
        id: item.id,
        buku_id: item.buku_id,
        nim: item.user?.nim || "-",
        nama: item.user?.name || "Siswa",
        judul_buku: item.buku?.judul || "Judul tidak ada",
        kelas: item.user?.kelas || "-",
        tgl_pinjam: item.tgl_pinjam,
        jatuh_tempo: item.jatuh_tempo,
        no_hp: item.user?.no_hp || "-",
      }));

      const history = response.data.history.map((item: any) => ({
        id: item.id,
        tgl_kembali: item.tgl_kembali,
        nim: item.user?.nim || "-",
        nama: item.user?.name || "-",
        judul_buku: item.buku?.judul || "-",
        denda_display: item.denda > 0 ? `Rp ${item.denda.toLocaleString('id-ID')}` : "-",
        history_status: item.status || "Tepat Waktu",
        is_late_return: item.denda > 0
      }));

      setActiveBorrows(active);
      setBorrowHistory(history);
    } catch (error) {
      console.error("Gagal mengambil data:", error);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const handleReturnConfirm = async () => {
    if (selectedId === null) return;
    try {
      const token = localStorage.getItem("token");
      await axios.post(`${API_URL}/${selectedId}/kembali`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setIsModalOpen(false);
      setSelectedId(null);
      loadData();
    } catch (error) {
      alert("Gagal memproses pengembalian.");
    }
  };

  const getStatusDisplay = (dueDateStr: string) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const dueDate = new Date(dueDateStr);
    return today > dueDate ? "Terlambat" : "Aktif";
  };

  const filteredData = activeBorrows.filter(item => {
    const title = item.judul_buku || "";
    const name = item.nama || "";
    const status = getStatusDisplay(item.jatuh_tempo);
    const matchesSearch = title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = statusFilter === "Semua Status" || status === statusFilter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="max-w-[95rem] mx-auto">

        {/* Header */}
        <div className="flex justify-between items-center mb-10">
          <div className="flex items-center gap-4">
            <div className="bg-[#172e5f] p-4 rounded-2xl text-white shadow-xl">
              <FaHandshake size={28} />
            </div>
            <div>
              <h1 className="text-3xl font-black text-[#172e5f] uppercase tracking-tight">Admin Peminjaman</h1>
              <p className="text-xs text-gray-500 font-bold uppercase tracking-widest">Database Server: Cloud Sync Active</p>
            </div>
          </div>
          <button onClick={loadData} className="flex items-center gap-2 bg-white border border-gray-300 px-5 py-2.5 rounded-xl text-xs font-black text-black shadow-sm hover:bg-gray-100 transition-colors">
            <FaSync /> REFRESH DATABASE
          </button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
          <div className="bg-white p-7 rounded-3xl shadow-sm border border-gray-200 flex items-center gap-6">
            <div className="bg-[#1e293b] p-5 rounded-2xl text-white shadow-lg"><FaBook size={30} /></div>
            <div>
              <p className="text-4xl font-black text-black">{activeBorrows.length}</p>
              <p className="text-[10px] text-gray-500 font-black uppercase tracking-widest">Sedang Dipinjam</p>
            </div>
          </div>

          <div className="bg-white p-7 rounded-3xl shadow-sm border border-gray-200 flex items-center gap-6">
            <div className="bg-red-700 p-5 rounded-2xl text-white shadow-lg"><FaExclamationTriangle size={30} /></div>
            <div>
              <p className="text-4xl font-black text-black">
                {activeBorrows.filter(b => getStatusDisplay(b.jatuh_tempo) === "Terlambat").length}
              </p>
              <p className="text-[10px] text-red-600 font-black uppercase tracking-widest">Terlambat</p>
            </div>
          </div>

          <div className="bg-white p-7 rounded-3xl shadow-sm border border-gray-200 flex items-center gap-6">
            <div className="bg-green-700 p-5 rounded-2xl text-white shadow-lg"><FaCheckCircle size={30} /></div>
            <div>
              <p className="text-4xl font-black text-black">{borrowHistory.length}</p>
              <p className="text-[10px] text-green-600 font-black uppercase tracking-widest">Total Selesai</p>
            </div>
          </div>
        </div>

        {/* Table Active */}
        <div className="bg-white rounded-3xl shadow-xl border border-gray-200 overflow-hidden mb-12">
          <div className="p-6 bg-white border-b border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="relative flex-1 md:max-w-md">
              <input 
                type="text" placeholder="Cari Nama atau Judul..." 
                className="w-full bg-gray-50 border border-gray-300 rounded-xl px-4 py-2.5 pl-10 text-black text-sm focus:outline-none focus:ring-2 focus:ring-[#172e5f]/50 placeholder:text-gray-400" 
                value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} 
              />
              <FaSearch className="absolute left-3 top-3.5 text-gray-400" size={16} />
            </div>
            <select 
              className="bg-gray-50 border border-gray-300 rounded-xl px-4 py-2.5 text-sm font-bold text-black focus:outline-none"
              value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option>Semua Status</option>
              <option>Aktif</option>
              <option>Terlambat</option>
            </select>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b-2 border-orange-500 text-black text-[14px] font-black uppercase tracking-tight">
                  <th className="py-5 px-4 bg-gray-50/50">Buku ID</th>
                  <th className="py-5 px-4 bg-gray-50/50">NIM</th>
                  <th className="py-5 px-4 bg-gray-50/50">Nama</th>
                  <th className="py-5 px-4 bg-gray-50/50">Judul Buku</th>
                  <th className="py-5 px-4 text-center bg-gray-50/50">Kelas</th>
                  <th className="py-5 px-4 bg-gray-50/50">Tgl Pinjam</th>
                  <th className="py-5 px-4 bg-gray-50/50">Jatuh Tempo</th>
                  <th className="py-5 px-4 text-center bg-gray-50/50">Status</th>
                  <th className="py-5 px-4 text-center bg-gray-50/50">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredData.map((item) => {
                  const status = getStatusDisplay(item.jatuh_tempo);
                  const isLate = status === "Terlambat";
                  return (
                    <tr key={item.id} className="hover:bg-blue-50/30 transition-colors">
                      <td className="py-5 px-4 text-sm font-black text-black">{item.buku_id}</td>
                      <td className="py-5 px-4 text-sm font-medium text-black">{item.nim}</td>
                      <td className="py-5 px-4 text-sm font-black text-black">{item.nama}</td>
                      <td className="py-5 px-4 text-sm font-bold text-black">{item.judul_buku}</td>
                      <td className="py-5 px-4 text-sm text-center font-black text-black">{item.kelas}</td>
                      <td className="py-5 px-4 text-sm font-medium text-black">{item.tgl_pinjam}</td>
                      <td className="py-5 px-4 text-sm font-black text-red-600">{item.jatuh_tempo}</td>
                      <td className="py-5 px-4 text-center">
                        <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase text-white shadow-sm ${isLate ? 'bg-red-600' : 'bg-green-600'}`}>
                          {status}
                        </span>
                      </td>
                      <td className="py-5 px-4 text-center">
                        <button 
                          onClick={() => { setSelectedId(item.id); setIsModalOpen(true); }}
                          className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-xl text-xs font-black flex items-center gap-2 mx-auto transition-all active:scale-95 shadow-md uppercase tracking-wider"
                        >
                          <FaUndo /> Kembali
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* History Table */}
        <div className="bg-white rounded-3xl shadow-xl border border-gray-200 overflow-hidden">
          <div className="bg-[#172e5f] p-6 border-b-4 border-orange-500">
            <h3 className="text-white font-black text-sm uppercase tracking-widest flex items-center gap-3"><FaHistory /> Riwayat Pengembalian</h3>
          </div>
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50 text-[11px] font-black uppercase text-black border-b">
                <th className="p-5">Tanggal Kembali</th>
                <th className="p-5">NIM</th>
                <th className="p-5">Nama</th>
                <th className="p-5">Judul Buku</th>
                <th className="p-5 text-center">Denda</th>
                <th className="p-5 text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {borrowHistory.map((item) => (
                <tr key={item.id} className="text-sm hover:bg-gray-50/50 transition-colors">
                  <td className="p-5 font-bold text-black">{item.tgl_kembali}</td>
                  <td className="p-5 text-black font-medium">{item.nim}</td>
                  <td className="p-5 font-black text-black">{item.nama}</td>
                  <td className="p-5 text-black italic font-bold">{item.judul_buku}</td>
                  <td className="p-5 text-center font-black text-red-600">{item.denda_display}</td>
                  <td className="p-5 text-center">
                    <span className={`${item.is_late_return ? 'bg-yellow-500' : 'bg-green-600'} text-white px-3 py-1 rounded-full text-[10px] font-black uppercase shadow-sm`}>
                      {item.history_status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-[2.5rem] w-full max-w-sm overflow-hidden shadow-2xl scale-in-center">
            <div className="bg-green-600 p-10 text-center text-white">
              <FaUndo size={40} className="mx-auto mb-4" />
              <h3 className="text-2xl font-black uppercase tracking-tighter">Konfirmasi</h3>
              <p className="text-green-100 text-xs font-bold mt-2">Buku akan ditandai sebagai dikembalikan.</p>
            </div>
            <div className="p-8 text-center">
              <p className="text-black mb-8 font-bold">Proses pengembalian buku ini?</p>
              <div className="flex gap-4">
                <button onClick={() => setIsModalOpen(false)} className="flex-1 py-4 bg-gray-100 rounded-2xl font-black text-xs text-gray-500 uppercase transition-all hover:bg-gray-200">Batal</button>
                <button onClick={handleReturnConfirm} className="flex-1 py-4 bg-green-600 text-white rounded-2xl font-black text-xs uppercase shadow-lg shadow-green-100 transition-all hover:bg-green-700 active:scale-95">Ya, Selesai</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}