"use client";

import React, { useState } from "react";

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
  const [filterStatus, setFilterStatus] = useState("all");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDenda, setSelectedDenda] = useState<any>(null);

  const [dendaData, setDendaData] = useState([
    { id: 1, nim: "2021001", nama: "Ahmad Fajar", buku: "Pemrograman Web", pinjam: "05/01/2025", tempo: "10/01/2025", late: "3 hari", denda: 3000, status: "Belum Lunas" },
    { id: 2, nim: "2021002", nama: "Siti Nurhaliza", buku: "Basis Data", pinjam: "07/01/2025", tempo: "12/01/2025", late: "1 hari", denda: 1000, status: "Belum Lunas" },
    { id: 3, nim: "2021003", nama: "Budi Santoso", buku: "Algoritma", pinjam: "02/01/2025", tempo: "07/01/2025", late: "6 hari", denda: 6000, status: "Lunas" },
    { id: 4, nim: "2021004", nama: "Dewi Anggraini", buku: "Jaringan Komputer", pinjam: "08/01/2025", tempo: "13/01/2025", late: "2 hari", denda: 2000, status: "Belum Lunas" },
  ]);

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

  const handleConfirmPayment = () => {
    if (selectedDenda) {
      setDendaData(prevData =>
        prevData.map(item =>
          item.id === selectedDenda.id ? { ...item, status: "Lunas" } : item
        )
      );
      setIsModalOpen(false);
      setSelectedDenda(null);
    }
  };

  return (
    <div className="p-6 md:p-8 bg-[#f4f6f9] min-h-screen text-[#333] w-full font-sans font-normal">
      
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 px-1">
        <div>
          <h1 className="text-2xl font-normal text-[#1a2942] flex items-center gap-3 m-0">
            <FaMoneyBillWave /> Kelola Denda
          </h1>
          <p className="text-sm text-gray-500 mt-1 font-normal">Manajemen denda keterlambatan pengembalian buku</p>
        </div>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-[8px] shadow-sm border border-gray-200 p-6 flex items-center gap-5">
          <div className="w-14 h-14 rounded-[8px] flex items-center justify-center text-white text-xl bg-[#dc3545]">
            <FaExclamationTriangle />
          </div>
          <div>
            <h3 className="text-2xl font-normal text-[#1a2942] m-0">12</h3>
            <p className="text-gray-500 text-[11px] font-normal uppercase m-0">Total Denda Aktif</p>
          </div>
        </div>
        <div className="bg-white rounded-[8px] shadow-sm border border-gray-200 p-6 flex items-center gap-5">
          <div className="w-14 h-14 rounded-[8px] flex items-center justify-center text-white text-xl bg-[#f39c12]">
            <FaMoneyBill />
          </div>
          <div>
            <h3 className="text-2xl font-normal text-[#1a2942] m-0">Rp 45.000</h3>
            <p className="text-gray-500 text-[11px] font-normal uppercase m-0">Total Belum Lunas</p>
          </div>
        </div>
        <div className="bg-white rounded-[8px] shadow-sm border border-gray-200 p-6 flex items-center gap-5">
          <div className="w-14 h-14 rounded-[8px] flex items-center justify-center text-white text-xl bg-[#28a745]">
            <FaCheckCircle />
          </div>
          <div>
            <h3 className="text-2xl font-normal text-[#1a2942] m-0">Rp 120.000</h3>
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
            className="px-3 py-1.5 rounded-[8px] border border-gray-400 text-gray-700 bg-white outline-none text-xs font-normal"
          >
            <option value="all">Semua Status</option>
            <option value="belum lunas">Belum Lunas</option>
            <option value="lunas">Lunas</option>
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
              {dendaData.map((denda, index) => (
                <tr key={denda.id} className="border-b border-gray-100 hover:bg-gray-50/50 transition-colors">
                  <td className="p-4 text-gray-400 font-normal">{index + 1}</td>
                  <td className="p-4 font-mono text-[13px] text-gray-600 font-normal">{denda.nim}</td>
                  <td className="p-4 font-normal text-gray-800">{denda.nama}</td>
                  <td className="p-4 text-gray-600 font-normal">{denda.buku}</td>
                  <td className="p-4 text-gray-500 text-xs font-normal">{denda.pinjam}</td>
                  <td className="p-4 text-gray-500 text-xs font-normal">{denda.tempo}</td>
                  <td className="p-4 text-center">
                    {/* Padding p-1 (4px) untuk badge Late */}
                    <span className="bg-[#dc3545] text-white p-1 rounded-[11px] text-[10px] font-normal whitespace-nowrap inline-block min-w-[60px]">
                      {denda.late}
                    </span>
                  </td>
                  <td className="p-4 font-normal text-[#1a2942]">{formatCurrency(denda.denda)}</td>
                  <td className="p-4 text-center font-normal">
                    {/* Padding p-1 (4px) untuk badge Status */}
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
                            className="bg-[#28a745] text-white px-3 py-1.5 rounded-[8px] text-xs font-normal flex items-center gap-1.5 hover:bg-[#218838] transition-all"
                          >
                            <FaCheck size={10} /> Bayar
                          </button>
                          <button className="bg-[#17a2b8] text-white p-2 rounded-[8px] hover:bg-[#138496] transition-all">
                            <FaBell size={10} />
                          </button>
                        </>
                      ) : (
                        <button 
                          disabled
                          className="bg-[#6c757d] text-white px-3 py-1.5 rounded-[8px] text-xs font-normal flex items-center gap-1.5 opacity-80 cursor-default"
                        >
                          <FaCheck size={10} /> Lunas
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Footer Info & Tools */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-[8px] shadow-sm border border-gray-200 p-5 font-normal">
          <h3 className="text-[11px] font-normal text-gray-400 mb-4 flex items-center gap-2 uppercase tracking-[2px]">
            <FaCog /> KETENTUAN PERPUSTAKAAN
          </h3>
          <div className="bg-[#e7f3f5] text-[#0c5460] p-4 rounded-[8px] text-sm border border-[#bee5eb]">
            <ul className="list-disc pl-5 space-y-1 font-normal">
              <li>Maksimal pinjam: <span className="font-normal">5 hari kerja</span>.</li>
              <li>Denda keterlambatan: <span className="font-normal">Rp 1.000 / hari</span>.</li>
            </ul>
          </div>
        </div>
        <div className="bg-white rounded-[8px] shadow-sm border border-gray-200 p-5 font-normal">
          <h3 className="text-[11px] font-normal text-gray-400 mb-4 flex items-center gap-2 uppercase tracking-[2px]">
            <FaCalculator /> SIMULASI HITUNG DENDA
          </h3>
          <div className="flex gap-3 items-end">
            <div className="flex-1 font-normal">
              <label className="text-[10px] block mb-1.5 font-normal text-gray-400 uppercase">Tgl Pinjam</label>
              <input type="date" className="w-full border border-gray-200 p-2 rounded-[8px] text-xs outline-none focus:border-[#0d6efd] text-gray-600 font-normal" />
            </div>
            <div className="flex-1 font-normal">
              <label className="text-[10px] block mb-1.5 font-normal text-gray-400 uppercase">Tgl Kembali</label>
              <input type="date" className="w-full border border-gray-200 p-2 rounded-[8px] text-xs outline-none focus:border-[#0d6efd] text-gray-600 font-normal" />
            </div>
            <button className="bg-[#0d6efd] text-white px-5 py-2 rounded-[8px] text-xs font-normal hover:bg-blue-600 transition-all uppercase shadow-sm">HITUNG</button>
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-[8px] shadow-2xl w-full max-w-md overflow-hidden mx-4 border border-gray-200">
            <div className="bg-[#1a2942] text-white px-4 py-3 flex justify-between items-center border-b-[3px] border-[#e67e22]">
              <h3 className="text-sm font-normal flex items-center gap-2 uppercase tracking-widest">
                <FaMoneyBillWave /> Konfirmasi Bayar
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="hover:text-gray-300">
                <FaTimes />
              </button>
            </div>
            <div className="p-8">
              <p className="text-gray-600 mb-6 text-sm text-center font-normal">Pastikan Anda telah menerima uang tunai sebesar:</p>
              <div className="bg-gray-50 rounded-[8px] p-5 border border-gray-200 space-y-3 mb-8">
                <div className="flex justify-between items-center border-b border-gray-100 pb-2">
                  <span className="text-gray-400 text-[10px] font-normal uppercase">Nama</span>
                  <span className="text-gray-800 font-normal text-sm">{selectedDenda?.nama}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400 text-[10px] font-normal uppercase">Total Tagihan</span>
                  <span className="text-[#28a745] font-normal text-2xl">{formatCurrency(selectedDenda?.denda)}</span>
                </div>
              </div>
              <div className="flex gap-3">
                <button onClick={() => setIsModalOpen(false)} className="flex-1 border-2 py-2.5 rounded-[8px] text-xs font-normal uppercase text-gray-400 hover:bg-gray-50">Batal</button>
                <button onClick={handleConfirmPayment} className="flex-1 bg-[#28a745] text-white font-normal py-2.5 rounded-[8px] text-xs uppercase flex items-center justify-center gap-2 shadow-md hover:bg-[#218838]">
                  <FaCheck /> Konfirmasi
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      
    </div>
  );
}