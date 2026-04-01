"use client";

import React from "react";
import { QrCode, Camera, Calendar, User, Phone, List } from "lucide-react";

export default function GuestBook() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div className="flex items-center gap-3 text-xl font-black text-[#172e5f]">
          <div className="bg-[#172e5f] text-white rounded-2xl p-3">
            <List size={20} />
          </div>
          <div>
            <h1 className="text-2xl lg:text-3xl font-black">Buku Tamu Perpustakaan</h1>
            <p className="text-sm text-gray-500">Isi data pengunjung dan scan QR untuk anggota</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-[1.2fr_0.8fr] gap-8">
        <div className="bg-white rounded-3xl shadow-xl border border-gray-200 overflow-hidden">
          <div className="bg-[#172e5f] text-white px-6 py-5 flex items-center justify-between">
            <div className="flex items-center gap-3 font-bold uppercase tracking-[0.2em] text-sm">
              <Camera size={18} />
              Scanner QR Code Member
            </div>
          </div>
          <div className="p-8">
            <div className="bg-gray-100 rounded-3xl p-10 text-center">
              <div className="mx-auto mb-8 w-64 h-64 bg-[#f8fafc] rounded-[2.25rem] shadow-inner border border-dashed border-gray-300 flex items-center justify-center">
                <div className="w-40 h-40 bg-white rounded-3xl shadow-sm flex items-center justify-center">
                  <QrCode size={120} className="text-[#172e5f]" />
                </div>
              </div>
              <button className="bg-[#16a34a] hover:bg-[#15803d] text-white px-8 py-3 rounded-xl font-semibold transition-colors shadow-lg">
                Mulai Scan
              </button>
            </div>
            <div className="mt-8 rounded-3xl bg-[#eff6ff] border border-[#bfdbfe] px-6 py-5 text-sm text-[#1e3a8a]">
              <p className="font-semibold">Arahkan kamera ke kode QR pada kartu anggota.</p>
              <p className="mt-2 text-gray-600">Data akan otomatis dicatat di Buku Tamu.</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-3xl shadow-xl border border-gray-200 overflow-hidden">
          <div className="bg-[#172e5f] text-white px-6 py-5 flex items-center justify-between">
            <div className="flex items-center gap-3 font-bold uppercase tracking-[0.2em] text-sm">
              <QrCode size={18} />
              Form Buku Tamu
            </div>
          </div>
          <div className="p-8 space-y-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-gray-500 font-bold">
                <Calendar size={16} />
                Tanggal
              </div>
              <input
                type="text"
                value="04/01/2026"
                readOnly
                className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-5 py-4 text-sm text-gray-800"
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-gray-500 font-bold">
                <User size={16} />
                Nama Lengkap
              </div>
              <input
                type="text"
                placeholder="Nama lengkap Anda"
                className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-5 py-4 text-sm text-gray-800"
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-gray-500 font-bold">
                <Phone size={16} />
                Nomor HP
              </div>
              <input
                type="text"
                placeholder="08xxxxxxxxxx"
                className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-5 py-4 text-sm text-gray-800"
              />
            </div>
            <button className="w-full bg-[#f97316] hover:bg-[#ea580c] text-white rounded-2xl py-4 font-bold transition-colors shadow-md">
              Simpan Data
            </button>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-3xl shadow-xl border border-gray-200 overflow-hidden">
        <div className="bg-[#172e5f] text-white px-6 py-5 flex items-center gap-3 font-bold uppercase tracking-[0.2em] text-sm">
          <List size={18} />
          Daftar Pengunjung Hari Ini
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm text-gray-700">
            <thead>
              <tr className="bg-[#172e5f] text-white text-xs uppercase tracking-[0.2em]">
                <th className="px-6 py-4">Tanggal & waktu</th>
                <th className="px-6 py-4">Nama</th>
                <th className="px-6 py-4">NIM</th>
                <th className="px-6 py-4">Prodi</th>
                <th className="px-6 py-4">No. HP</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 bg-white">
              {[
                { time: '7 November 2025 08:15', name: 'Ahmad Fajar', nim: '2021001', prodi: 'PTIK', phone: '081234567890' },
                { time: '7 November 2025 09:30', name: 'Siti Nurhaliza', nim: '2021002', prodi: 'TEKOM', phone: '081234567891' },
                { time: '7 November 2025 10:45', name: 'Dewi Sartika', nim: '2021003', prodi: 'TI', phone: '081234567892' }
              ].map((row, idx) => (
                <tr key={idx} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 text-xs text-gray-500">{row.time}</td>
                  <td className="px-6 py-4 font-semibold text-gray-800">{row.name}</td>
                  <td className="px-6 py-4 text-gray-600">{row.nim}</td>
                  <td className="px-6 py-4 text-gray-600">{row.prodi}</td>
                  <td className="px-6 py-4 text-gray-600">{row.phone}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
