'use client';

import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import Fuse from 'fuse.js';
import Navbar from '../../../components/navbar';
import Sidebar from '../../../components/sidebar';
import { 
  FaSearch, FaBook, FaUser, FaTag, 
  FaBookmark, FaHandHolding, FaBan
} from 'react-icons/fa';

export default function CariBukuPage() {
  const [books, setBooks] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Semua Kategori");
  const [selectedBook, setSelectedBook] = useState<any | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [borrowDate, setBorrowDate] = useState(() => new Date().toISOString().slice(0, 10));
  const [notification, setNotification] = useState<{ show: boolean; bookCode: string; borrowDate: string }>({ show: false, bookCode: '', borrowDate: '' });
  const [notificationFading, setNotificationFading] = useState(false);
  
  // State untuk error handling
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const API_URL = "http://127.0.0.1:8000/api/buku";

  // --- FETCH DATA DENGAN PESAN ERROR BARU ---
  const fetchBooks = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(API_URL);
      // Mendukung response array langsung atau di dalam object 'data'
      const rawData = Array.isArray(response.data) ? response.data : response.data.data || [];
      
      const mappedData = rawData.map((b: any) => ({
        id_db: b.id,         // Primary Key DB
        id: b.kode_buku,     // Tampilan 'Kode'
        title: b.judul,
        author: b.penulis,
        category: b.kategori,
        publisher: b.penerbit,
        year: b.tahun_terbit,
        stock: b.stok,
        available: b.tersedia // Tampilan 'Tersedia'
      }));
      setBooks(mappedData);
    } catch (err: any) {
      console.error("Error fetching books:", err);
      // PERUBAHAN TEKS ERROR DISINI
      setError("Gagal mengambil data buku, coba menghubungi admin.");
      setBooks([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const formatDisplayDate = (iso: string) => {
    try {
      const d = new Date(iso);
      const dd = String(d.getDate()).padStart(2, '0');
      const mm = String(d.getMonth() + 1).padStart(2, '0');
      const yyyy = d.getFullYear();
      return `${dd} / ${mm} / ${yyyy}`;
    } catch {
      return iso;
    }
  }

  const openBorrowModal = (book: any) => {
    setSelectedBook(book);
    setBorrowDate(new Date().toISOString().slice(0, 10));
    setIsModalOpen(true);
  };

  const handleConfirmBorrow = async () => {
    if (!selectedBook) return;

    try {
      const updatedAvailable = Math.max(0, (selectedBook.available || 0) - 1);
      
      await axios.put(`${API_URL}/${selectedBook.id_db}`, {
        kode_buku: selectedBook.id,
        judul: selectedBook.title,
        penulis: selectedBook.author,
        kategori: selectedBook.category,
        penerbit: selectedBook.publisher,
        tahun_terbit: selectedBook.year,
        stok: selectedBook.stock,
        tersedia: updatedAvailable 
      });

      fetchBooks();
      
      const borrowedBooksData = JSON.parse(localStorage.getItem('borrowed_books') || '{"active": [], "history": []}');
      const newBorrow = {
        title: selectedBook.title,
        borrow_date: borrowDate,
        due_date: new Date(new Date(borrowDate).getTime() + 5 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10)
      };
      borrowedBooksData.active.push(newBorrow);
      localStorage.setItem('borrowed_books', JSON.stringify(borrowedBooksData));
      
      setNotification({
        show: true,
        bookCode: selectedBook.id,
        borrowDate: borrowDate
      });
      setNotificationFading(false);
      
      setTimeout(() => setNotificationFading(true), 4500);
      setTimeout(() => {
        setNotification({ ...notification, show: false });
        setNotificationFading(false);
      }, 5000);
      
      setIsModalOpen(false);
      setSelectedBook(null);
    } catch (error) {
      alert("Gagal memproses peminjaman. Silakan cek koneksi ke server.");
    }
  };

  const filteredBooks = useMemo(() => {
    let listToSearch = books;
    if (selectedCategory !== "Semua Kategori") {
      listToSearch = books.filter(book => book.category === selectedCategory);
    }
    if (!searchQuery.trim()) return listToSearch;

    const fuse = new Fuse(listToSearch, {
      keys: ["title", "author", "id"],
      threshold: 0.4,
      distance: 100,
    });
    return fuse.search(searchQuery).map(result => result.item);
  }, [searchQuery, selectedCategory, books]);

  const categories = useMemo(() => {
    const rawCategories = books.map(b => b.category).filter(Boolean);
    return ["Semua Kategori", ...Array.from(new Set(rawCategories))];
  }, [books]);

  return (
    <div className="h-screen bg-white flex flex-col font-sans overflow-hidden">
      <style>{`
        @keyframes slideInFromRight { from { transform: translateX(100%); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
        @keyframes fadeOut { from { opacity: 1; } to { opacity: 0; } }
      `}</style>
      <Navbar />

      {notification.show && (
        <div className="fixed top-4 right-4 z-50" style={{
          animation: notificationFading ? 'fadeOut 0.5s ease-out forwards' : 'slideInFromRight 0.5s ease-out forwards'
        }}>
          <div className="bg-white rounded-lg shadow-lg border-l-4 border-[#17a2b8] py-2 px-4">
            <div className="flex items-center gap-4">
              <div className="bg-[#17a2b8]/10 rounded-full p-2 flex-shrink-0">
                <div className="text-[#17a2b8] text-lg font-bold flex items-center justify-center w-5 h-5">i</div>
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-800">
                  Peminjaman berhasil! Kode Buku: <span className="font-bold">{notification.bookCode}</span> Tanggal Pinjam: <span className="font-bold">{new Date(notification.borrowDate).toLocaleDateString('id-ID', { year: 'numeric', month: '2-digit', day: '2-digit' })}</span> Silakan tunjukkan QR code Anda ke petugas perpustakaan.
                </p>
              </div>
              <button onClick={() => setNotification({ ...notification, show: false })} className="text-gray-400 hover:text-gray-600 text-lg flex-shrink-0">✕</button>
            </div>
          </div>
        </div>
      )}

      <div className="flex pt-16 h-full">
        <Sidebar />
        <main className="flex-1 md:ml-64 p-8 bg-white overflow-y-auto">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-3">
              <div className="bg-orange-500 p-2 rounded text-white"><FaBook /></div>
              <h2 className="text-2xl font-bold text-gray-800">Daftar Buku</h2>
            </div>
            <p className="text-sm text-gray-600">Total {filteredBooks.length} buku ditemukan</p>
          </div>

          <div className="flex flex-col md:flex-row gap-4 mb-8 bg-gray-100 p-4 rounded-xl border border-gray-300">
            <div className="flex-1 relative">
              <input type="text" placeholder="Cari judul buku, penulis, atau kode..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full pl-4 pr-12 py-2.5 rounded-lg border border-gray-300 bg-white focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none text-gray-800 font-medium placeholder:text-gray-500" />
              <div className="absolute right-4 top-3 text-gray-500"><FaSearch /></div>
            </div>
            <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)} className="bg-white border border-gray-300 rounded-lg px-4 py-2.5 outline-none focus:ring-2 focus:ring-orange-500 min-w-[200px] font-medium text-gray-800">
              {categories.map((cat, index) => (<option key={`${cat}-${index}`} value={cat as string}>{cat as string}</option>))}
            </select>
          </div>

          {/* MENAMPILKAN PESAN ERROR DI UI */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 text-red-700 rounded-lg border border-red-200 text-center font-medium">
              {error}
            </div>
          )}

          {loading && !error ? (
             <div className="flex justify-center items-center py-20">
                <p className="text-gray-500 animate-pulse">Memuat data buku...</p>
             </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredBooks.map((book) => (
                <div key={book.id_db} className="bg-white rounded-2xl border border-gray-200 shadow-sm transform transition duration-200 hover:-translate-y-1 hover:shadow-lg overflow-hidden flex flex-col">
                  <div className="bg-[#c1d095] h-48 flex items-center justify-center m-4 rounded-xl">
                    <FaBook className="text-6xl text-[#172e5f]" />
                  </div>
                  <div className="px-6 pb-6 flex-1 flex flex-col">
                    <h3 className="font-bold text-gray-800 text-lg mb-3 line-clamp-2">{book.title}</h3>
                    <div className="space-y-2 mb-4 text-sm text-gray-600">
                      <div className="flex items-center gap-2"><FaUser className="text-xs text-gray-500" /> {book.author}</div>
                      <div className="flex items-center gap-2"><FaTag className="text-xs text-gray-500" /> {book.category || 'Umum'}</div>
                      <div className="flex items-center gap-2"><FaBookmark className="text-xs text-gray-500" /> Kode: {book.id}</div>
                    </div>
                    <div className="mb-4">
                      <span className={`${book.available > 0 ? 'bg-green-600' : 'bg-red-600'} text-white text-xs px-3 py-1 rounded-full font-bold`}>
                        {book.available > 0 ? `Tersedia: ${book.available}` : 'Stok Habis'}
                      </span>
                    </div>
                    {book.available > 0 ? (
                      <button onClick={() => openBorrowModal(book)} className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2.5 rounded-lg flex items-center justify-center gap-2 font-bold transition-colors mt-auto">
                        <FaHandHolding /> Pinjam Buku
                      </button>
                    ) : (
                      <button disabled className="w-full bg-gray-600 text-white py-2.5 rounded-lg flex items-center justify-center gap-2 font-bold cursor-not-allowed mt-auto">
                        <FaBan /> Tidak Tersedia
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          {isModalOpen && selectedBook && (
            <div className="fixed inset-0 z-50 flex items-center justify-center">
              <div className="absolute inset-0 bg-black/40" onClick={() => setIsModalOpen(false)} />
              <div className="bg-white rounded-lg shadow-lg w-full max-w-xl mx-4 z-10 overflow-hidden">
                <div className="flex items-center justify-between px-6 py-3 border-b">
                  <div className="flex items-center gap-2 text-gray-700 font-bold"><FaBook /> <span>Pinjam Buku</span></div>
                  <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600">✕</button>
                </div>
                <div className="p-6 space-y-4">
                  <div><label className="block text-xs text-gray-600 mb-1">Judul Buku</label><input readOnly value={selectedBook.title} className="w-full px-4 py-2 border rounded-lg bg-gray-50 outline-none" /></div>
                  <div><label className="block text-xs text-gray-600 mb-1">Kategori</label><input readOnly value={selectedBook.category || 'Umum'} className="w-full px-4 py-2 border rounded-lg bg-gray-50 outline-none" /></div>
                  <div><label className="block text-xs text-gray-600 mb-1">Kode Buku</label><input readOnly value={selectedBook.id} className="w-full px-4 py-2 border rounded-lg bg-gray-50 outline-none" /></div>
                  <div>
                    <label className="block text-xs text-gray-600 mb-1">Tanggal Pinjam</label>
                    <div className="flex items-center gap-2">
                      <input type="date" value={borrowDate} onChange={(e) => setBorrowDate(e.target.value)} className="px-4 py-2 border rounded-lg outline-none" />
                      <div className="text-sm text-gray-500">{formatDisplayDate(borrowDate)}</div>
                    </div>
                  </div>
                  <div className="p-4 bg-teal-50 border-l-4 border-teal-400 rounded">
                    <p className="text-sm text-teal-900 font-semibold">Batas peminjaman: <span className="font-bold">5 hari kerja</span></p>
                    <p className="text-sm text-teal-900">Denda keterlambatan: <span className="font-bold">Rp 1.000/hari</span></p>
                  </div>
                </div>
                <div className="px-6 py-4 border-t flex justify-end gap-3">
                  <button onClick={() => { setIsModalOpen(false); setSelectedBook(null); }} className="px-4 py-2 rounded-md bg-gray-500 text-white">Batal</button>
                  <button onClick={handleConfirmBorrow} className="px-4 py-2 rounded-md bg-orange-500 text-white font-bold">✓ Konfirmasi Peminjaman</button>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}