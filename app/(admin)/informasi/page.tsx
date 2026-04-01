"use client";

import React, { useState } from "react";
import {
  FaInfoCircle,
  FaClock,
  FaPhoneAlt,
  FaInstagram,
  FaEnvelope,
  FaMapMarkerAlt,
  FaExclamationTriangle,
  FaChevronDown,
  FaQuestionCircle
} from "react-icons/fa";

export default function Informasi() {
  const [expandedFaq, setExpandedFaq] = useState(0);

  const faqItems = [
    {
      question: 'Bagaimana cara menjadi anggota?',
      answer: 'Mahasiswa JTIK dapat mendaftar melalui halaman registrasi dengan mengisi form dan melengkapi data diri.'
    },
    {
      question: 'Berapa maksimal buku yang bisa dipinjam?',
      answer: 'Setiap anggota dapat meminjam maksimal 3 buku dalam satu waktu.'
    },
    {
      question: 'Bagaimana cara perpanjangan peminjaman?',
      answer: 'Perpanjangan dapat dilakukan dengan menghubungi admin perpustakaan sebelum jatuh tempo.'
    }
  ];

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="mb-8">
        <div className="flex items-center gap-4 mb-3">
          <div className="bg-[#172e5f] text-white p-3 rounded-2xl shadow-lg">
            <FaInfoCircle />
          </div>
          <div>
            <h1 className="text-3xl font-black text-[#172e5f]">Informasi Perpustakaan</h1>
            <p className="text-sm text-gray-600">Tata tertib dan informasi lengkap perpustakaan JTIK</p>
          </div>
        </div>
      </div>

      <div className="bg-[#172e5f] text-white rounded-3xl p-8 mb-8 shadow-xl">
        <p className="text-xs uppercase tracking-[0.3em] opacity-80 mb-2">Perpustakaan JTIK</p>
        <h2 className="text-2xl md:text-3xl font-black">Jurusan Teknik Informatika dan Komputer</h2>
        <p className="text-sm opacity-80 mt-2">Universitas Negeri Makassar</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white border border-gray-200 rounded-3xl overflow-hidden shadow-sm">
            <div className="bg-[#172e5f] text-white px-6 py-4 font-bold flex items-center gap-2">
              <FaInfoCircle className="text-xs" /> Tata Tertib Perpustakaan
            </div>
            <div className="p-6 space-y-4">
              {[
                {
                  id: 1,
                  title: 'KETENANGAN DAN KETERTIBAN',
                  desc: 'Mohon untuk tidak berisik agar lingkungan perpustakaan tetap tenang dan kondusif untuk belajar.'
                },
                {
                  id: 2,
                  title: 'PENYIMPANAN BARANG',
                  desc: 'Harap menaruh tas dan sepatu di tempat yang telah disediakan untuk menjaga kebersihan dan ketertiban.'
                },
                {
                  id: 3,
                  title: 'PENGEMBALIAN BUKU',
                  desc: 'Pastikan untuk mengembalikan buku dan skripsi ke tempatnya setelah selesai digunakan.'
                },
                {
                  id: 4,
                  title: 'KEBERSIHAN',
                  desc: 'Dilarang membawa makanan dan minuman ke dalam perpustakaan untuk menjaga kebersihan.'
                }
              ].map((rule) => (
                <div key={rule.id} className="flex gap-4 p-4 bg-gray-50 rounded-xl border-l-4 border-orange-500">
                  <div className="bg-orange-500 text-white w-9 h-9 rounded-full flex items-center justify-center font-bold">
                    {rule.id}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-gray-800 mb-1">{rule.title}</h4>
                    <p className="text-xs text-gray-600 leading-relaxed">{rule.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-3xl overflow-hidden shadow-sm">
            <div className="bg-[#172e5f] text-white px-6 py-4 font-bold flex items-center gap-2">
              <FaClock className="text-xs" /> Jam Operasional
            </div>
            <div className="p-6 space-y-3">
              <div className="flex justify-between items-center py-3 border-b border-gray-100">
                <span className="font-bold text-gray-700">Senin - Jumat</span>
                <span className="text-orange-600 font-bold">08:00 - 16:00 WITA</span>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-gray-100">
                <span className="font-bold text-gray-700">Sabtu</span>
                <span className="text-orange-600 font-bold">08:00 - 12:00 WITA</span>
              </div>
              <div className="flex justify-between items-center py-3">
                <span className="font-bold text-gray-700">Minggu & Hari Libur</span>
                <span className="text-red-500 font-bold">Tutup</span>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <div className="bg-white border border-gray-200 rounded-3xl overflow-hidden shadow-sm">
            <div className="bg-[#172e5f] text-white px-6 py-4 font-bold flex items-center gap-2">
              <FaPhoneAlt className="text-xs" /> Kontak Kami
            </div>
            <div className="p-5 space-y-4">
              <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-2xl border border-gray-200">
                <div className="bg-orange-100 p-3 rounded-xl text-orange-600">
                  <FaEnvelope />
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-[0.2em] text-gray-500 font-bold">Email</p>
                  <p className="text-sm font-medium text-gray-700">perpustakaanjtikunm@gmail.com</p>
                </div>
              </div>
              <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-2xl border border-gray-200">
                <div className="bg-pink-100 p-3 rounded-xl text-pink-600">
                  <FaInstagram />
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-[0.2em] text-gray-500 font-bold">Instagram</p>
                  <p className="text-sm font-medium text-gray-700">@pustaka_jtik</p>
                </div>
              </div>
              <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-2xl border border-gray-200">
                <div className="bg-blue-100 p-3 rounded-xl text-blue-600">
                  <FaMapMarkerAlt />
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-[0.2em] text-gray-500 font-bold">Lokasi</p>
                  <p className="text-sm font-medium text-gray-700">Gedung JTIK, Universitas Negeri Makassar</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-3xl overflow-hidden shadow-sm">
            <div className="bg-[#172e5f] text-white px-6 py-4 font-bold flex items-center gap-2">
              <FaInfoCircle className="text-xs" /> Ketentuan Peminjaman
            </div>
            <div className="p-5 space-y-4">
              <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-2xl border border-gray-200">
                <FaClock className="text-orange-500 mt-1" />
                <div>
                  <p className="text-xs font-bold text-gray-700">Batas Peminjaman</p>
                  <p className="text-[10px] text-gray-500">5 hari kerja</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-2xl border border-gray-200">
                <FaExclamationTriangle className="text-orange-500 mt-1" />
                <div>
                  <p className="text-xs font-bold text-gray-700">Denda Keterlambatan</p>
                  <p className="text-[10px] text-gray-500">Rp 1.000/hari (Sabtu & Minggu tidak dihitung)</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-2xl border border-gray-200">
                <FaExclamationTriangle className="text-red-500 mt-1" />
                <div>
                  <p className="text-xs font-bold text-gray-700">Buku Hilang</p>
                  <p className="text-[10px] text-gray-500">Denda akumulasi + Buku diganti yang baru + Surat pernyataan</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-3xl overflow-hidden shadow-sm">
            <div className="bg-[#172e5f] text-white px-6 py-4 font-bold flex items-center gap-2">
              <FaQuestionCircle className="text-xs" /> FAQ
            </div>
            <div className="p-4 space-y-3">
              {faqItems.map((faq, index) => (
                <div key={index}>
                  <button
                    onClick={() => setExpandedFaq(expandedFaq === index ? -1 : index)}
                    className={`w-full flex justify-between items-center p-4 rounded-2xl text-sm font-bold border transition-all ${expandedFaq === index ? 'bg-[#e7f3ff] text-gray-900 border-[#a5c8ff]' : 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100'}`} 
                  >
                    <span>{faq.question}</span>
                    <FaChevronDown className={`transition-transform duration-300 ${expandedFaq === index ? 'rotate-180' : ''}`} />
                  </button>
                  {expandedFaq === index && (
                    <div className="mt-2 p-4 bg-gray-50 rounded-2xl text-sm text-gray-700 border border-gray-200">
                      {faq.answer}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
