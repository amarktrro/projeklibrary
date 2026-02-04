"use client";

import React, { useState } from "react";
import { Wallet, Calculator } from "lucide-react";

export default function KelolaDendaPage() {
  // Using string state to better manage manual typing of decimals
  const [days, setDays] = useState<string>("");

  // Calculation Logic: 1 day = 1,000 Rp. 
  const fineAmount = days ? parseFloat(days) * 1000 : 0;

  // Currency Formatter for Indonesian Rupiah
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(value).replace("IDR", "Rp");
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;

    // 1. Remove any character that is not a digit (0-9) or a decimal point (.)
    // This prevents letters, symbols, and negative signs (-)
    value = value.replace(/[^0-9.]/g, '');

    // 2. Prevent multiple decimal points (only allow the first one)
    const parts = value.split('.');
    if (parts.length > 2) {
      value = parts[0] + '.' + parts.slice(1).join('');
    }

    setDays(value);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Header Stat Card */}
      <div className="bg-white rounded-[2.5rem] p-10 flex items-center justify-between text-gray-800 shadow-lg border border-gray-300">
        <div>
          <h2 className="text-3xl font-black tracking-tight">Kelola Denda & Keuangan</h2>
          <p className="text-gray-600 font-bold text-sm">Monitoring kas denda keterlambatan buku</p>
        </div>
        <div className="bg-gray-50 px-6 py-4 rounded-2xl border border-gray-300 flex items-center gap-4">
          <Wallet className="text-orange-500" />
          <div>
            <p className="text-[8px] font-black text-gray-600 uppercase">Total Dana Kas</p>
            <p className="text-lg font-black text-gray-800">Rp 2.450.000</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* --- Restricted Fine Calculator --- */}
        <div className="bg-white rounded-[3rem] p-10 text-gray-800 border border-gray-300 shadow-xl">
          <div className="flex items-center gap-4 mb-8">
            <Calculator className="text-orange-500" />
            <h3 className="text-xl font-black">Kalkulator Denda</h3>
          </div>
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-gray-600 uppercase tracking-widest ml-1">
                Masukkan Jumlah Hari
              </label>
              <input 
                type="text" 
                inputMode="decimal"
                value={days}
                onChange={handleInputChange}
                placeholder=""
                className="w-full bg-gray-50 border border-gray-300 rounded-2xl px-6 py-4 outline-none focus:ring-2 focus:ring-orange-500 transition-all text-gray-800 font-bold text-lg" 
              />
            </div>
            
            <div className="pt-6 border-t border-gray-300">
              <p className="text-[10px] font-black text-gray-600 uppercase tracking-widest mb-2">Total Tagihan:</p>
              <p className="text-6xl font-black text-orange-500 transition-all">
                {formatCurrency(fineAmount)}
              </p>
            </div>
          </div>
        </div>

        {/* --- Latest Transactions Table (Empty State) --- */}
        <div className="bg-white rounded-[3rem] overflow-hidden border border-gray-300 shadow-sm flex flex-col min-h-[400px]">
          <div className="bg-gray-50 p-6 text-gray-800 font-black text-sm uppercase tracking-widest">
            Riwayat Transaksi
          </div>
          <div className="p-8 flex-1 flex flex-col items-center justify-center text-center space-y-2">
            <div className="bg-gray-100 p-4 rounded-full border border-gray-300">
               <Wallet className="text-gray-400" size={32} />
            </div>
            <p className="text-gray-600 font-bold text-sm">Belum ada riwayat transaksi</p>
          </div>
        </div>
      </div>
    </div>
  );
}


