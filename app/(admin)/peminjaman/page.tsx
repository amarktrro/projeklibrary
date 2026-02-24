"use client";
import React, { useState, useEffect, useCallback } from "react";
import {
  FaUndo, FaSearch, FaBook, FaCheckCircle,
  FaExclamationTriangle, FaHandshake, FaSync, FaHistory
} from "react-icons/fa";

export default function AdminPeminjaman() {
  const [activeBorrows, setActiveBorrows] = useState<any[]>([]);
  const [borrowHistory, setBorrowHistory] = useState<any[]>([]);
  const [inventory, setInventory] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("Semua Status");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const CURRENT_DATE_STR = "2026-02-12";

  const loadData = useCallback(() => {
    const savedInv = localStorage.getItem("simpes_inventory");
    if (savedInv) setInventory(JSON.parse(savedInv));

    const storedData = localStorage.getItem('borrowed_books');
    if (storedData) {
      const parsed = JSON.parse(storedData);
      const cleanedActive = (parsed.active || []).map((item: any) => ({
        ...item,
        book_id: item.book_id || '-',
        kelas: item.kelas || '-',
        no_hp: item.no_hp || '-'
      }));
      setActiveBorrows(cleanedActive);
      setBorrowHistory(parsed.history || []);
    }
  }, []);

  useEffect(() => {
    loadData();
    window.addEventListener("storage", loadData);
    return () => window.removeEventListener("storage", loadData);
  }, [loadData]);

  const parseCustomDate = (dateStr: string) => {
    if (!dateStr) return new Date();
    if (dateStr.includes('/')) {
      const [day, month, year] = dateStr.split('/');
      return new Date(Number(year), Number(month) - 1, Number(day), 23, 59, 59);
    }
    return new Date(dateStr);
  };

  const getBusinessDaysCount = (startDate: Date, endDate: Date) => {
    let count = 0;
    let curDate = new Date(startDate);
    curDate.setDate(curDate.getDate() + 1);
    while (curDate <= endDate) {
      const dayOfWeek = curDate.getDay();
      if (dayOfWeek !== 0 && dayOfWeek !== 6) count++;
      curDate.setDate(curDate.getDate() + 1);
    }
    return count;
  };

  const getStatus = (dueDateStr: string) => {
    const today = new Date(CURRENT_DATE_STR);
    const dueDate = parseCustomDate(dueDateStr);
    return today > dueDate ? "Terlambat" : "Aktif";
  };

  const handleReturnConfirm = () => {
    if (selectedIndex === null) return;
    const bookToReturn = activeBorrows[selectedIndex];
    const dueDate = parseCustomDate(bookToReturn.due_date || bookToReturn.jatuh_tempo);
    const returnDate = new Date(CURRENT_DATE_STR);

    let denda = "-";
    let statusText = "Tepat Waktu";
    let isLate = false;

    if (returnDate > dueDate) {
      const lateDays = getBusinessDaysCount(dueDate, returnDate);
      if (lateDays > 0) {
        denda = `Rp ${(lateDays * 1000).toLocaleString('id-ID')}`;
        statusText = `Terlambat ${lateDays} hari`;
        isLate = true;
      }
    }

    const updatedInventory = inventory.map(item => {
      if (item.id === bookToReturn.book_id || item.title === (bookToReturn.title || bookToReturn.book_title)) {
        return { ...item, available: (item.available || 0) + 1 };
      }
      return item;
    });
    localStorage.setItem('simpes_inventory', JSON.stringify(updatedInventory));

    const updatedActive = activeBorrows.filter((_, i) => i !== selectedIndex);
    const newHistoryEntry = {
      ...bookToReturn,
      return_date: CURRENT_DATE_STR,
      tgl_kembali: CURRENT_DATE_STR,
      denda_display: denda,
      history_status: statusText,
      is_late_return: isLate
    };
    const updatedHistory = [newHistoryEntry, ...borrowHistory];

    localStorage.setItem('borrowed_books', JSON.stringify({
      active: updatedActive,
      history: updatedHistory
    }));
    loadData();
    setIsModalOpen(false);
    setSelectedIndex(null);
  };

  const filteredData = activeBorrows.filter(item => {
    const title = item.title || item.book_title || item.judul_buku || "";
    const name = item.name || item.user_name || "Siswa";
    const status = getStatus(item.due_date || item.jatuh_tempo);
    const matchesSearch = title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = statusFilter === "Semua Status" || status === statusFilter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="max-w-[95rem] mx-auto">

        {/* Header Section */}
        <div className="flex justify-between items-center mb-10">
          <div className="flex items-center gap-4">
            <div className="bg-[#172e5f] p-4 rounded-2xl text-white shadow-xl">
              <FaHandshake size={28} />
            </div>
            <div>
              <h1 className="text-3xl font-black text-[#172e5f] uppercase tracking-tight">Admin Peminjaman</h1>
              <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">Sistem Manajemen Pengembalian & Denda</p>
            </div>
          </div>
          <button onClick={loadData} className="flex items-center gap-2 bg-white border px-5 py-2.5 rounded-xl text-xs font-black text-gray-500 shadow-sm hover:bg-gray-50 transition-colors">
            <FaSync /> REFRESH DATA
          </button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
          {/* SEDANG DIPINJAM - DARK NAVY */}
          <div className="bg-white p-7 rounded-3xl shadow-sm border border-gray-200 flex items-center gap-6">
            <div className="bg-[#1e293b] p-5 rounded-2xl text-white shadow-lg">
              <FaBook size={30} />
            </div>
            <div>
              <p className="text-4xl font-black text-gray-800">{activeBorrows.length}</p>
              <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest">Sedang Dipinjam</p>
            </div>
          </div>

          {/* TERLAMBAT - DARK RED */}
          <div className="bg-white p-7 rounded-3xl shadow-sm border border-gray-200 flex items-center gap-6">
            <div className="bg-red-700 p-5 rounded-2xl text-white shadow-lg">
              <FaExclamationTriangle size={30} />
            </div>
            <div>
              <p className="text-4xl font-black text-gray-800">
                {activeBorrows.filter(b => getStatus(b.due_date || b.jatuh_tempo) === "Terlambat").length}
              </p>
              <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest">Terlambat</p>
            </div>
          </div>

          {/* TOTAL SELESAI - DARK GREEN */}
          <div className="bg-white p-7 rounded-3xl shadow-sm border border-gray-200 flex items-center gap-6">
            <div className="bg-green-700 p-5 rounded-2xl text-white shadow-lg">
              <FaCheckCircle size={30} />
            </div>
            <div>
              <p className="text-4xl font-black text-gray-800">{borrowHistory.length}</p>
              <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest">Total Selesai</p>
            </div>
          </div>
        </div>

        {/* --- TABLE 1: DAFTAR PEMINJAMAN AKTIF --- */}
        <div className="bg-white rounded-3xl shadow-xl border border-gray-200 overflow-hidden mb-12">
          <div className="p-6 bg-white border-b border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="relative flex-1 md:max-w-md">
              <input
                type="text"
                placeholder="Cari Nama atau Judul..."
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 pl-10 text-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <FaSearch className="absolute left-3 top-3.5 text-gray-400" size={16} />
            </div>
            <select
              className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm font-bold text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all cursor-pointer"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option>Semua Status</option>
              <option>Aktif</option>
              <option>Terlambat</option>
            </select>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b-2 border-orange-500 text-gray-800 text-[14px] font-bold bg-white">
                  <th className="py-5 px-4 whitespace-nowrap">No. Buku</th>
                  <th className="py-5 px-4 whitespace-nowrap">NIM</th>
                  <th className="py-5 px-4 whitespace-nowrap">Nama</th>
                  <th className="py-5 px-4 whitespace-nowrap">Judul Buku</th>
                  <th className="py-5 px-4 whitespace-nowrap text-center">Kelas</th>
                  <th className="py-5 px-4 whitespace-nowrap">Tgl Pinjam</th>
                  <th className="py-5 px-4 whitespace-nowrap">Jatuh Tempo</th>
                  <th className="py-5 px-4 whitespace-nowrap">No. Telp</th>
                  <th className="py-5 px-4 whitespace-nowrap text-center">Status</th>
                  <th className="py-5 px-4 whitespace-nowrap text-center">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredData.length > 0 ? (
                  filteredData.map((item, index) => {
                    const status = getStatus(item.due_date || item.jatuh_tempo);
                    const isLate = status === "Terlambat";
                    return (
                      <tr key={index} className="bg-white hover:bg-gray-50 transition-colors">
                        <td className="py-5 px-4 text-sm font-bold text-gray-700">{item.book_id}</td>
                        <td className="py-5 px-4 text-sm font-medium text-gray-600">{item.nim || item.user_id}</td>
                        <td className="py-5 px-4 text-sm font-bold text-gray-800">{item.name || item.user_name}</td>
                        <td className="py-5 px-4 text-sm text-gray-700">{item.title || item.book_title || item.judul_buku}</td>
                        <td className="py-5 px-4 text-sm text-gray-600 text-center">{item.kelas}</td>
                        <td className="py-5 px-4 text-sm text-gray-600">{item.borrow_date || item.tgl_pinjam}</td>
                        <td className="py-5 px-4 text-sm font-bold text-gray-700">{item.due_date || item.jatuh_tempo}</td>
                        <td className="py-5 px-4 text-sm text-gray-600">{item.no_hp}</td>
                        <td className="py-5 px-4 text-center">
                          <span className={`inline-block px-4 py-1.5 rounded-full text-xs font-bold text-white ${isLate ? 'bg-[#dc3545]' : 'bg-[#198754]'}`}>
                            {status}
                          </span>
                        </td>
                        <td className="py-5 px-4 text-center">
                          <button
                            onClick={() => { setSelectedIndex(index); setIsModalOpen(true); }}
                            className="bg-[#198754] hover:bg-[#157347] text-white px-5 py-2.5 rounded-lg text-sm font-bold flex items-center gap-2 mx-auto shadow-sm active:scale-95 transition-all"
                          >
                            <FaUndo /> Dikembalikan
                          </button>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan={10} className="px-8 py-12 text-center text-gray-400 font-bold uppercase text-sm tracking-widest italic">
                      Tidak ada data peminjaman aktif yang sesuai.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* --- TABLE 2: RIWAYAT PENGEMBALIAN TERBARU --- */}
        <div className="bg-white rounded-3xl shadow-xl border border-gray-200 overflow-hidden">
          <div className="bg-[#172e5f] p-6 border-b-4 border-orange-500">
            <h3 className="text-white font-bold flex items-center gap-3 tracking-wider text-base">
              <FaHistory className="text-white" size={20} /> Riwayat Pengembalian Terbaru
            </h3>
          </div>
          <div className="p-0 overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b-2 border-orange-500 text-gray-800 text-[13px] font-bold bg-gray-50">
                  <th className="py-4 px-4">Tanggal Kembali</th>
                  <th className="py-4 px-4">NIM</th>
                  <th className="py-4 px-4">Nama</th>
                  <th className="py-4 px-4">Judul Buku</th>
                  <th className="py-4 px-4 text-center">Denda</th>
                  <th className="py-4 px-4 text-center">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {borrowHistory.length > 0 ? (
                  borrowHistory.map((item, index) => (
                    <tr key={index} className="bg-white hover:bg-gray-50 transition-colors">
                      <td className="py-4 px-4 text-[13px] font-medium text-gray-600">{item.tgl_kembali || item.return_date}</td>
                      <td className="py-4 px-4 text-[13px] font-medium text-gray-500">{item.nim || item.user_id || "N/A"}</td>
                      <td className="py-4 px-4 text-[13px] font-bold text-gray-800">{item.name || item.user_name || "Anggota"}</td>
                      <td className="py-4 px-4 text-[13px] italic text-blue-900 font-medium">{item.title || item.book_title || item.judul_buku}</td>
                      <td className="py-4 px-4 text-center text-[13px] font-bold text-gray-700">{item.denda_display || "-"}</td>
                      <td className="py-4 px-4 text-center">
                        <span className={`${item.is_late_return ? 'bg-[#fbbf24] text-gray-900' : 'bg-[#198754] text-white'} px-4 py-1.5 rounded-full text-[11px] font-bold`}>
                          {item.history_status || "Tepat Waktu"}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="px-8 py-10 text-center text-gray-400 font-bold uppercase text-xs tracking-widest">
                      Belum ada riwayat pengembalian
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-[#172e5f]/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-[2rem] w-full max-w-md overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-200">
            <div className="bg-[#198754] p-8 text-center text-white">
              <div className="bg-white/20 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 border-4 border-white/30 shadow-inner">
                <FaUndo size={32} />
              </div>
              <h3 className="text-2xl font-black uppercase tracking-tight">Konfirmasi Pengembalian</h3>
            </div>
            <div className="p-8 text-center">
              <p className="text-gray-600 mb-8 font-medium text-sm leading-relaxed">
                Apakah Anda yakin ingin memproses pengembalian buku <br />
                <b className="text-gray-800">{activeBorrows[selectedIndex!]?.title || activeBorrows[selectedIndex!]?.book_title}</b>
                <br /> oleh <b className="text-gray-800">{activeBorrows[selectedIndex!]?.name || activeBorrows[selectedIndex!]?.user_name}</b>?
              </p>
              <div className="flex gap-4">
                <button onClick={() => setIsModalOpen(false)} className="flex-1 py-3.5 text-xs font-black uppercase text-gray-500 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors">Batal</button>
                <button onClick={handleReturnConfirm} className="flex-1 py-3.5 text-xs font-black uppercase text-white bg-[#198754] rounded-xl shadow-lg hover:bg-[#157347] transition-all">Ya, Kembalikan</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}