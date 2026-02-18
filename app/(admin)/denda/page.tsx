"use client";
import React, { useState, useEffect, useCallback } from "react";
import {
  FaMoneyBillWave, FaSearch, FaCheckCircle,
  FaExclamationTriangle, FaSync, FaHistory,
  FaFilter, FaChevronDown, FaReceipt
} from "react-icons/fa";

export default function KelolaDenda() {
  const [finesData, setFinesData] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("Semua Status");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFineIndex, setSelectedFineIndex] = useState<number | null>(null);

  const loadFines = useCallback(() => {
    const storedData = localStorage.getItem('borrowed_books');
    if (storedData) {
      const parsed = JSON.parse(storedData);
      // Fines typically come from history entries where denda != "-"
      const history = parsed.history || [];
      const finesOnly = history.filter((item: any) => item.denda_display && item.denda_display !== "-");
      setFinesData(finesOnly);
    }
  }, []);

  useEffect(() => {
    loadFines();
    window.addEventListener("storage", loadFines);
    return () => window.removeEventListener("storage", loadFines);
  }, [loadFines]);

  const handlePaymentConfirm = () => {
    if (selectedFineIndex === null) return;
    
    const storedData = localStorage.getItem('borrowed_books');
    if (storedData) {
      const parsed = JSON.parse(storedData);
      const targetItem = finesData[selectedFineIndex];
      
      // Update the status in the main history storage
      const updatedHistory = parsed.history.map((item: any) => {
        if (item.id === targetItem.id || (item.name === targetItem.name && item.tgl_kembali === targetItem.tgl_kembali)) {
          return { ...item, payment_status: "LUNAS" };
        }
        return item;
      });

      localStorage.setItem('borrowed_books', JSON.stringify({
        ...parsed,
        history: updatedHistory
      }));
      
      loadFines();
      setIsModalOpen(false);
      setSelectedFineIndex(null);
    }
  };

  const filteredFines = finesData.filter(item => {
    const name = (item.name || item.user_name || "").toLowerCase();
    const title = (item.title || item.book_title || "").toLowerCase();
    const status = item.payment_status || "BELUM BAYAR";
    
    const matchesSearch = name.includes(searchTerm.toLowerCase()) || title.includes(searchTerm.toLowerCase());
    const matchesFilter = statusFilter === "Semua Status" || status === statusFilter;
    
    return matchesSearch && matchesFilter;
  });

  const totalDenda = finesData.reduce((acc, curr) => {
    if (curr.payment_status === "LUNAS") return acc;
    const val = parseInt(curr.denda_display.replace(/[^0-9]/g, "")) || 0;
    return acc + val;
  }, 0);

  return (
    <div className="p-4 md:p-8 bg-[#f0f2f5] min-h-screen">
      <div className="w-full mx-auto">

        {/* Header Cards Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
            <div className="bg-[#172e5f] p-4 rounded-xl text-white shadow-lg">
              <FaMoneyBillWave size={24} />
            </div>
            <div>
                <p className="text-[10px] text-gray-400 font-black uppercase">Total Denda Tertunda</p>
                <h3 className="text-[#172e5f] font-bold text-lg leading-tight">Rp {totalDenda.toLocaleString('id-ID')}</h3>
            </div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
            <div className="bg-red-50 p-4 rounded-xl text-red-600">
              <FaExclamationTriangle size={24} />
            </div>
            <div>
                <p className="text-[10px] text-gray-400 font-black uppercase">Belum Lunas</p>
                <h3 className="text-[#172e5f] font-bold text-lg leading-tight">{finesData.filter(f => f.payment_status !== "LUNAS").length} Transaksi</h3>
            </div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
            <div className="bg-green-50 p-4 rounded-xl text-green-600">
              <FaCheckCircle size={24} />
            </div>
            <div>
                <p className="text-[10px] text-gray-400 font-black uppercase">Berhasil Dibayar</p>
                <h3 className="text-[#172e5f] font-bold text-lg leading-tight">{finesData.filter(f => f.payment_status === "LUNAS").length} Selesai</h3>
            </div>
          </div>
        </div>

        {/* --- MAIN TABLE SECTION --- */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
          
          {/* Navy Blue Header Block */}
          <div className="bg-[#172e5f] p-6">
            <div className="flex items-center gap-2 text-white font-bold mb-6 text-sm">
              <FaFilter className="text-white/60" size={12}/>
              <span className="uppercase tracking-wider">Kelola Pembayaran Denda</span>
              <div className="ml-auto flex items-center gap-1 font-normal text-gray-400 cursor-pointer">
                Filter <FaChevronDown size={10} />
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-4 items-center">
              <div className="flex items-center gap-3 text-white font-bold">
                <div className="bg-white/10 p-2 rounded-lg">
                  <FaReceipt size={20} />
                </div>
                <span className="text-xl whitespace-nowrap">Daftar Denda</span>
              </div>

              <div className="relative flex-grow max-w-2xl">
                <FaSearch className="absolute left-4 top-4 text-gray-400" size={16} />
                <input
                  type="text"
                  placeholder="Cari Nama Peminjam..."
                  className="w-full bg-[#253966] border-none rounded-xl px-4 py-3.5 pl-12 text-white text-sm focus:ring-2 focus:ring-orange-500 transition-all placeholder:text-gray-400"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              <select 
                className="bg-white text-[#172e5f] px-6 py-3.5 rounded-xl text-sm font-black min-w-[180px] focus:outline-none"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="Semua Status">Semua Status</option>
                <option value="BELUM BAYAR">Belum Bayar</option>
                <option value="LUNAS">Lunas</option>
              </select>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse table-auto">
              <thead>
                <tr className="border-b-4 border-orange-500 text-gray-800 text-[13px] font-black uppercase tracking-tight bg-white">
                  <th className="py-5 px-6 whitespace-nowrap">Tgl Kembali</th>
                  <th className="py-5 px-6 whitespace-nowrap">Nama Peminjam</th>
                  <th className="py-5 px-6 w-full">Buku Terlambat</th>
                  <th className="py-5 px-6 whitespace-nowrap text-center">Jumlah Denda</th>
                  <th className="py-5 px-6 text-center">Status</th>
                  <th className="py-5 px-6 text-center">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredFines.length > 0 ? (
                  filteredFines.map((item, index) => {
                    const isPaid = item.payment_status === "LUNAS";
                    return (
                      <tr key={index} className="bg-white hover:bg-gray-50 transition-colors">
                        <td className="py-5 px-6 text-sm font-medium text-gray-500 whitespace-nowrap">
                          {item.tgl_kembali}
                        </td>
                        <td className="py-5 px-6 text-sm font-black text-[#172e5f] whitespace-nowrap">
                          {item.name || item.user_name}
                        </td>
                        <td className="py-5 px-6 text-sm text-blue-900 italic font-semibold">
                          {item.title || item.book_title}
                        </td>
                        <td className="py-5 px-6 text-center text-sm font-black text-red-600 whitespace-nowrap">
                          {item.denda_display}
                        </td>
                        <td className="py-5 px-6 text-center">
                          <span className={`inline-flex items-center justify-center min-w-[110px] px-4 py-2 rounded-lg text-[10px] font-black text-white uppercase tracking-wider ${isPaid ? 'bg-[#2e7d32]' : 'bg-[#d32f2f]'}`}>
                            {isPaid ? 'LUNAS' : 'BELUM BAYAR'}
                          </span>
                        </td>
                        <td className="py-5 px-6 text-center">
                          {!isPaid ? (
                            <button
                              onClick={() => {
                                setSelectedFineIndex(index);
                                setIsModalOpen(true);
                              }}
                              className="bg-[#1b5e20] hover:bg-[#113d15] text-white px-6 py-2.5 rounded-lg text-[10px] font-black uppercase tracking-widest flex items-center gap-2 mx-auto shadow-md transition-all active:scale-95"
                            >
                              <FaReceipt size={12} /> BAYAR SEKARANG
                            </button>
                          ) : (
                            <span className="text-gray-400 text-[10px] font-bold uppercase italic">Selesai</span>
                          )}
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan={6} className="px-8 py-20 text-center text-gray-400 font-bold uppercase text-sm tracking-widest italic">
                      Tidak ada data denda ditemukan.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Payment Confirmation Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-[#172e5f]/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-[2rem] w-full max-w-md overflow-hidden shadow-2xl">
            <div className="bg-[#1b5e20] p-8 text-center text-white">
              <FaReceipt size={40} className="mx-auto mb-4 opacity-50" />
              <h3 className="text-2xl font-black uppercase tracking-tight">Konfirmasi Pembayaran</h3>
            </div>
            <div className="p-8 text-center">
              <p className="text-gray-600 mb-2 font-medium text-sm">Menerima pembayaran denda sebesar:</p>
              <p className="text-3xl font-black text-red-600 mb-8">{filteredFines[selectedFineIndex!]?.denda_display}</p>
              
              <div className="flex gap-4">
                <button onClick={() => setIsModalOpen(false)} className="flex-1 py-3.5 text-xs font-black uppercase text-gray-500 bg-gray-100 rounded-xl">Batal</button>
                <button onClick={handlePaymentConfirm} className="flex-1 py-3.5 text-xs font-black uppercase text-white bg-[#1b5e20] rounded-xl shadow-lg">Konfirmasi Lunas</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}