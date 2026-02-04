'use client';

import React, { useState } from 'react';
import Navbar from '../../../components/navbar';
import Sidebar from '../../../components/sidebar';
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
} from 'react-icons/fa';

export default function InformasiPage() {
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
    /* LOCK VIEWPORT: h-screen and overflow-hidden ensures the browser scrollbar stays hidden */
    <div className="h-screen bg-white flex flex-col font-sans overflow-hidden">
      
      {/* Shared Navbar component */}
      <Navbar />

      {/* FILL HEIGHT: h-full ensures the container takes the space below the navbar */}
      <div className="flex pt-16 h-full">
        
        {/* Shared Sidebar component */}
        <Sidebar />

        {/* FIXED: Changed p-8 to pt-2 px-8 pb-8 to remove the top gap */}
        <main className="flex-1 md:ml-64 pt-2 px-8 pb-8 bg-white overflow-y-auto">
          
          {/* Header Section */}
          <div className="flex justify-between items-center mb-6 mt-8">
            <div className="flex items-center gap-3">
              <div className="bg-orange-500 p-2 rounded text-white">
                <FaInfoCircle />
              </div>
              <h2 className="text-2xl font-bold text-gray-800">Informasi Perpustakaan</h2>
            </div>
            <p className="text-sm text-gray-600">Tata tertib dan Informasi lengkap perpustakaan JTIK</p>
          </div>

          {/* Banner */}
          <div className="bg-[#172e5f] text-white p-6 rounded-xl mb-8 text-center">
            <p className="text-sm opacity-80 flex items-center justify-center gap-2 mb-1">
               Perpustakaan JTIK
            </p>
            <h3 className="text-xl font-bold">Jurusan Teknik Informatika dan Komputer</h3>
            <p className="text-sm opacity-80">Universitas Negeri Makassar</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* LEFT COLUMN: Rules & Hours */}
            <div className="lg:col-span-2 space-y-8">
              
              {/* Rules Section */}
              <div className="border border-gray-200 rounded-xl overflow-hidden shadow-sm bg-white">
                <div className="bg-[#172e5f] text-white px-6 py-3 font-bold flex items-center gap-2">
                   Tata Tertib Perpustakaan
                </div>
                <div className="p-6 space-y-6">
                  {[
                    { id: 1, title: 'KETENANGAN AND KETERTIBAN', desc: 'Mohon untuk tidak berisik agar lingkungan perpustakaan tetap tenang dan kondusif untuk belajar.' },
                    { id: 2, title: 'PENYIMPANAN BARANG', desc: 'Harap menaruh tas and sepatu di tempat yang telah disediakan untuk menjaga kebersihan and ketertiban.' },
                    { id: 3, title: 'PENGEMBALIAN BUKU', desc: 'Pastikan untuk mengembalikan buku and skripsi ke tempatnya setelah selesai digunakan.' },
                    { id: 4, title: 'KEBERSIHAN', desc: 'Dilarang membawa makanan and minuman ke dalam perpustakaan untuk menjaga kebersihan.' }
                  ].map((rule) => (
                    <div key={rule.id} className="flex gap-4 p-4 bg-gray-50 rounded-lg border-l-4 border-orange-500">
                      <div className="bg-orange-500 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold shrink-0">
                        {rule.id}
                      </div>
                      <div>
                        <h4 className="font-bold text-sm text-gray-800 mb-1">{rule.title}</h4>
                        <p className="text-xs text-gray-600 leading-relaxed">{rule.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Operating Hours */}
              <div className="border border-gray-200 rounded-xl overflow-hidden shadow-sm">
                <div className="bg-[#172e5f] text-white px-6 py-3 font-bold flex items-center gap-2">
                  <FaClock /> Jam Operasional
                </div>
                <div className="p-6 space-y-4">
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="font-bold text-gray-700">Senin - Jumat</span>
                    <span className="text-orange-600 font-bold">08:00 - 16:00 WITA</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="font-bold text-gray-700">Sabtu</span>
                    <span className="text-orange-600 font-bold">08:00 - 12:00 WITA</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="font-bold text-gray-700">Minggu & Hari Libur</span>
                    <span className="text-red-500 font-bold">Tutup</span>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: Contact & Loan Policy */}
            <div className="space-y-8">
              
              {/* Contact Us */}
              <div className="border border-gray-200 rounded-xl overflow-hidden shadow-sm bg-white">
                <div className="bg-[#172e5f] text-white px-6 py-3 font-bold flex items-center gap-2">
                  <FaPhoneAlt className="text-xs" /> Kontak Kami
                </div>
                <div className="p-4 space-y-4">
                  <div className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="bg-orange-100 p-2 rounded text-orange-600"><FaEnvelope /></div>
                    <div>
                      <p className="text-[10px] text-gray-500 font-bold uppercase">Email</p>
                      <p className="text-xs font-medium text-gray-700">perpustakaanjtikunm@gmail.com</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="bg-pink-100 p-2 rounded text-pink-600"><FaInstagram /></div>
                    <div>
                      <p className="text-[10px] text-gray-500 font-bold uppercase">Instagram</p>
                      <p className="text-xs font-medium text-gray-700">@pustaka_jtik</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="bg-blue-100 p-2 rounded text-blue-600"><FaMapMarkerAlt /></div>
                    <div>
                      <p className="text-[10px] text-gray-500 font-bold uppercase">Lokasi</p>
                      <p className="text-xs font-medium text-gray-700">Gedung JTIK, Universitas Negeri Makassar</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Loan Policy */}
              <div className="border border-gray-200 rounded-xl overflow-hidden shadow-sm">
                <div className="bg-[#172e5f] text-white px-6 py-3 font-bold flex items-center gap-2">
                  <FaInfoCircle className="text-xs" /> Ketentuan Peminjaman
                </div>
                <div className="p-4 space-y-4">
                  <div className="flex items-start gap-3 p-2">
                    <FaClock className="text-orange-500 mt-1" />
                    <div>
                      <p className="text-xs font-bold">Batas Peminjaman</p>
                      <p className="text-[10px] text-gray-500">5 hari kerja</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-2">
                    <FaExclamationTriangle className="text-orange-500 mt-1" />
                    <div>
                      <p className="text-xs font-bold">Denda Keterlambatan</p>
                      <p className="text-[10px] text-gray-500">Rp 1.000/hari (Sabtu & Minggu tidak dihitung)</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-2">
                    <FaExclamationTriangle className="text-red-500 mt-1" />
                    <div>
                      <p className="text-xs font-bold">Buku Hilang</p>
                      <p className="text-[10px] text-gray-500">Denda akumulasi + Buku diganti yang baru + Surat pernyataan</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* FAQ Section */}
              <div className="border border-gray-200 rounded-xl overflow-hidden shadow-sm bg-white">
                <div className="bg-[#172e5f] text-white px-6 py-3 font-bold flex items-center gap-2">
                  <FaQuestionCircle className="text-xs" /> FAQ
                </div>
                <div className="p-2 space-y-2">
                  {faqItems.map((faq, index) => (
                    <div key={index}>
                      <button 
                        onClick={() => setExpandedFaq(expandedFaq === index ? -1 : index)}
                        className={`w-full flex justify-between items-center p-3 rounded-lg text-xs font-bold border transition-all ${
                          expandedFaq === index 
                            ? 'bg-[#cfe2ff] text-gray-900 border-[#b6d4ff]' 
                            : 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100'
                        }`}
                      >
                        {faq.question}
                        <FaChevronDown className={`transition-transform duration-300 ${expandedFaq === index ? 'rotate-180' : ''}`} />
                      </button>
                      {expandedFaq === index && (
                        <div className="p-3 text-sm font-semibold text-gray-700 bg-gray-50 border border-gray-200 border-t-0 rounded-b-lg animate-in fade-in slide-in-from-top-2 duration-300">
                          {faq.answer}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
