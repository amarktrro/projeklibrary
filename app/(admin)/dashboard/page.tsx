"use client";

import React, { useState, useEffect } from "react";
import { 
  FaBook, 
  FaUsers, 
  FaHandshake, 
  FaExclamationTriangle,
  FaChartLine,
  FaHistory,
  FaTachometerAlt,
  FaSyncAlt,
  FaUserPlus
} from "react-icons/fa";

// --- NEW: Interface for Late Loan Data ---
interface LateLoan {
  nim: string;
  name: string;
  title: string;
  borrow_date: string;
  due_date: string;
  late_days: number;
  fine: number;
}

interface DashboardStats {
  totalBooks: number;
  totalUsers: number;
  totalTransactions: number;
  activeLoans: number;
}

export default function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats>({
    totalBooks: 0,
    totalUsers: 0,
    totalTransactions: 0,
    activeLoans: 0,
  });
  // --- NEW: State for Late Loans ---
  const [lateLoans, setLateLoans] = useState<LateLoan[]>([]);
  const [loading, setLoading] = useState(true);

  // Helper to parse dates in DD/MM/YYYY or YYYY-MM-DD format
  const parseDate = (dateStr: string) => {
    if (!dateStr) return new Date();
    if (dateStr.includes('/')) {
      const [day, month, year] = dateStr.split('/');
      return new Date(Number(year), Number(month) - 1, Number(day));
    }
    return new Date(dateStr);
  };

  useEffect(() => {
    const loadDashboardData = () => {
      setLoading(true);
      try {
        const savedInventory = JSON.parse(localStorage.getItem("simpes_inventory") || "[]");
        const savedUsers = JSON.parse(localStorage.getItem("simpes_users") || "[]");
        const loanData = JSON.parse(localStorage.getItem("borrowed_books") || '{"active": [], "history": []}');
        
        // Simulation Date: 2026-02-12
        const today = new Date("2026-02-12");
        const activeList = loanData.active || [];
        
        // --- NEW: Logic to process late loans ---
        const processedLateLoans: LateLoan[] = [];
        activeList.forEach((loan: any) => {
          const dueDateStr = loan.due_date || loan.jatuh_tempo;
          if (!dueDateStr) return;
          
          const dueDate = parseDate(dueDateStr);

          if (today > dueDate) {
            const timeDiff = today.getTime() - dueDate.getTime();
            const lateDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
            const fine = lateDays * 1000; // Assumption: Rp 1.000 per day

            processedLateLoans.push({
              nim: loan.nim || loan.user_id || "-",
              name: loan.name || loan.user_name || "Anggota",
              title: loan.title || loan.book_title || loan.judul_buku || "-",
              borrow_date: loan.borrow_date || loan.tgl_pinjam || "-",
              due_date: dueDateStr,
              late_days: lateDays,
              fine: fine
            });
          }
        });

        setLateLoans(processedLateLoans);

        setStats({
          totalBooks: savedInventory.length,
          totalUsers: savedUsers.length || 124,
          totalTransactions: activeList.length,
          activeLoans: processedLateLoans.length, // Use the count of processed late loans
        });
      } catch (err) {
        console.error("Error loading local data:", err);
      } finally {
        setLoading(false);
      }
    };

    loadDashboardData();
    window.addEventListener("storage", loadDashboardData);
    return () => window.removeEventListener("storage", loadDashboardData);
  }, []);

  const statCards = [
    { title: "Total Buku", value: stats.totalBooks.toLocaleString(), icon: <FaBook />, color: "bg-[#1e293b]" },
    { title: "Total Anggota", value: stats.totalUsers.toLocaleString(), icon: <FaUsers />, color: "bg-[#f97316]" },
    { title: "Sedang Dipinjam", value: stats.totalTransactions, icon: <FaHandshake />, color: "bg-[#a3b18a]" },
    { title: "Terlambat", value: stats.activeLoans, icon: <FaExclamationTriangle />, color: "bg-[#c1121f]" },
  ];

  return (
    <div className="p-8 space-y-8 bg-[#f8fafc] min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-end">
        <div className="flex items-center gap-3">
          <div className="bg-[#172e5f] p-2 rounded-full text-white">
            <FaTachometerAlt size={20} />
          </div>
          <h1 className="text-3xl font-bold text-[#172e5f] tracking-tight">Dashboard Admin</h1>
        </div>
        <p className="text-gray-400 text-sm font-medium">Selamat datang di sistem informasi perpustakaan JTIK</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((card, idx) => (
          <div key={idx} className="bg-white p-6 rounded-2xl shadow-sm flex items-center gap-6 border border-gray-100 hover:shadow-md transition-shadow">
            <div className={`${card.color} p-5 rounded-2xl text-white text-3xl shadow-lg shadow-gray-200`}>
              {card.icon}
            </div>
            <div>
              <h3 className="text-3xl font-bold text-[#172e5f]">{loading ? "..." : card.value}</h3>
              <p className="text-sm text-gray-400 font-bold uppercase tracking-tight">{card.title}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Section: Statistik Peminjaman */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="bg-[#172e5f] p-4 text-white font-bold flex items-center gap-3">
            <FaChartLine />
            <span className="text-sm uppercase tracking-wider">Statistik Peminjaman</span>
          </div>
          <div className="p-10 flex flex-col items-center justify-center min-h-[350px]">
            <div className="w-full h-full relative flex items-end justify-between gap-2 px-4 border-b border-l border-gray-100">
               <div className="w-full h-48 bg-gray-50 rounded-xl border-2 border-dashed border-gray-200 flex flex-col items-center justify-center text-gray-300">
                 <FaChartLine size={48} className="mb-2 opacity-20" />
                 <p className="text-xs font-bold uppercase tracking-widest">Chart Visualization Area</p>
               </div>
            </div>
          </div>
        </div>

        {/* Right Section: Aktivitas Terbaru */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="bg-[#172e5f] p-4 text-white font-bold flex items-center gap-3">
            <FaHistory />
            <span className="text-sm uppercase tracking-wider">Aktivitas Terbaru</span>
          </div>
          <div className="p-6 divide-y divide-gray-50">
            <div className="py-4 first:pt-0 flex items-center gap-5">
              <div className="p-3 bg-orange-50 text-[#f97316] rounded-xl text-xl"><FaBook /></div>
              <div>
                <p className="text-sm font-bold text-[#172e5f]">Buku Dipinjam</p>
                <p className="text-[11px] text-gray-400 font-medium">Admin • Baru Saja</p>
              </div>
            </div>
            <div className="py-4 flex items-center gap-5">
              <div className="p-3 bg-orange-50 text-[#f97316] rounded-xl text-xl"><FaSyncAlt /></div>
              <div>
                <p className="text-sm font-bold text-[#172e5f]">Buku Dikembalikan</p>
                <p className="text-[11px] text-gray-400 font-medium">Siswa • 10 menit lalu</p>
              </div>
            </div>
            <div className="py-4 last:pb-0 flex items-center gap-5">
              <div className="p-3 bg-orange-50 text-[#f97316] rounded-xl text-xl"><FaUserPlus /></div>
              <div>
                <p className="text-sm font-bold text-[#172e5f]">Anggota Baru</p>
                <p className="text-[11px] text-gray-400 font-medium">User • 1 jam lalu</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section: Peminjaman Terlambat (UPDATED) */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden mb-8">
        <div className="bg-[#172e5f] p-4 text-white font-bold flex items-center gap-3 border-b-4 border-orange-500">
          <FaExclamationTriangle />
          <span className="text-sm uppercase tracking-wider">Peminjaman Terlambat</span>
        </div>
        
        {/* --- NEW: Table for Late Loans --- */}
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-orange-500 text-[#172e5f]">
                <th className="px-6 py-4 text-sm font-bold uppercase tracking-wider">NIM</th>
                <th className="px-6 py-4 text-sm font-bold uppercase tracking-wider">Nama</th>
                <th className="px-6 py-4 text-sm font-bold uppercase tracking-wider">Judul Buku</th>
                <th className="px-6 py-4 text-sm font-bold uppercase tracking-wider">Tgl Pinjam</th>
                <th className="px-6 py-4 text-sm font-bold uppercase tracking-wider">Jatuh Tempo</th>
                <th className="px-6 py-4 text-sm font-bold uppercase tracking-wider text-center">Terlambat</th>
                <th className="px-6 py-4 text-sm font-bold uppercase tracking-wider text-right">Denda</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {lateLoans.length > 0 ? (
                lateLoans.map((loan, index) => (
                  <tr key={index} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 text-sm font-medium text-gray-600">{loan.nim}</td>
                    <td className="px-6 py-4 text-sm font-bold text-gray-800">{loan.name}</td>
                    <td className="px-6 py-4 text-sm font-medium text-blue-900 italic">{loan.title}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{loan.borrow_date}</td>
                    <td className="px-6 py-4 text-sm text-red-600 font-bold">{loan.due_date}</td>
                    <td className="px-6 py-4 text-center">
                      <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-red-600 text-white">
                        {loan.late_days} hari
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm font-bold text-gray-800 text-right">
                      Rp {loan.fine.toLocaleString('id-ID')}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="px-6 py-8 text-center text-gray-400 italic font-medium">
                    Tidak ada data peminjaman terlambat untuk saat ini.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}