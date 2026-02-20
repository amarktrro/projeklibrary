"use client";

import React, { useState, useEffect } from "react";
import axios from "axios"; // Added axios
import { 
  FaPlus, FaSearch, FaEdit, FaTrash, FaBook, 
  FaList, FaTimes, FaSave
} from "react-icons/fa";

// Updated Interface to match Database + UI
interface Book {
  id_db?: number;    // Primary Key for Laravel
  id: string;        // This is 'kode_buku' in DB
  title: string;     // This is 'judul' in DB
  author: string;    // This is 'penulis' in DB
  category: string;  // This is 'kategori' in DB
  publisher: string; // This is 'penerbit' in DB
  year: string | number; // This is 'tahun_terbit' in DB
  stock: number;
  available: number; // This is 'tersedia' in DB
}

const categoryPrefixes: Record<string, string> = {
  "Pemrograman": "PWL",
  "Jaringan": "JK",
  "Database": "DB",
  "Multimedia": "MM",
  "Sistem Operasi": "SO",
};

export default function BukuPage() {
  const [books, setBooks] = useState<Book[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState("Semua Kategori");
  const [manualCategory, setManualCategory] = useState("");
  
  const API_URL = "http://127.0.0.1:8000/api/buku";

  const [currentBook, setCurrentBook] = useState<Partial<Book>>({
    id: "", title: "", author: "", category: "", 
    publisher: "", year: 2024, stock: 0, available: 0
  });

  // --- FETCH DATA FROM BACKEND ---
  const fetchBooks = async () => {
    try {
      const response = await axios.get(API_URL);
      // Map Laravel data (Indonesian) to Frontend (English interface)
      const mappedData = response.data.map((b: any) => ({
        id_db: b.id,
        id: b.kode_buku,
        title: b.judul,
        author: b.penulis,
        category: b.kategori,
        publisher: b.penerbit,
        year: b.tahun_terbit,
        stock: b.stok,
        available: b.tersedia
      }));
      setBooks(mappedData);
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const handleCategoryChange = (cat: string) => {
    if (cat === "Lainnya (Input Manual)") {
      setCurrentBook({ ...currentBook, category: cat, id: "" });
      return;
    }
    const prefix = categoryPrefixes[cat] || "BOOK";
    const sameCategoryBooks = books.filter(b => String(b.id).startsWith(prefix));
    let nextNumber = 1;
    if (sameCategoryBooks.length > 0) {
      const ids = sameCategoryBooks.map(b => {
        const parts = String(b.id).split("-");
        return parts.length > 1 ? parseInt(parts[1]) : 0;
      });
      nextNumber = Math.max(...ids) + 1;
    }
    const generatedId = `${prefix}-${String(nextNumber).padStart(3, '0')}`;
    setCurrentBook({ ...currentBook, category: cat, id: generatedId });
  };

  // --- ADD & EDIT LOGIC ---
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const finalCategory = currentBook.category === "Lainnya (Input Manual)" 
      ? manualCategory 
      : currentBook.category;

    // Map Frontend to Laravel expectations
    const payload = {
      kode_buku: currentBook.id,
      judul: currentBook.title,
      penulis: currentBook.author,
      kategori: finalCategory,
      penerbit: currentBook.publisher,
      tahun_terbit: currentBook.year,
      stok: Number(currentBook.stock),
      tersedia: Number(currentBook.available)
    };

    try {
      if (currentBook.id_db) {
        // UPDATE
        await axios.put(`${API_URL}/${currentBook.id_db}`, payload);
      } else {
        // CREATE
        await axios.post(API_URL, payload);
      }
      fetchBooks(); // Refresh table
      closeModal();
    } catch (error) {
      alert("Gagal menyimpan data ke server.");
    }
  };

  // --- DELETE LOGIC ---
  const handleDelete = async (db_id: number | undefined) => {
    if (!db_id) return;
    if (confirm("Hapus buku ini dari database?")) {
      try {
        await axios.delete(`${API_URL}/${db_id}`);
        fetchBooks();
      } catch (error) {
        alert("Gagal menghapus data.");
      }
    }
  };

  const openModal = (book?: Book) => {
    if (book) {
      setCurrentBook(book);
      const isStandard = Object.keys(categoryPrefixes).includes(book.category);
      if (!isStandard) {
        setManualCategory(book.category);
        setCurrentBook(prev => ({ ...prev, category: "Lainnya (Input Manual)" }));
      }
    } else {
      setCurrentBook({ id: "", title: "", author: "", category: "", publisher: "", year: 2024, stock: 0, available: 0 });
      setManualCategory("");
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setManualCategory("");
  };

  const filteredBooks = books.filter(b => {
    const matchesSearch = String(b.title || "").toLowerCase().includes(searchTerm.toLowerCase()) || 
                          String(b.id || "").toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCat = selectedCategoryFilter === "Semua Kategori" || b.category === selectedCategoryFilter;
    return matchesSearch && matchesCat;
  });

  return (
    <div className="p-8 bg-[#f4f7fe] min-h-screen font-sans text-slate-800">
      {/* UI Remains Exactly the Same */}
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center gap-3">
          <div className="text-[#1e3a8a] text-3xl"><FaBook /></div>
          <h1 className="text-4xl font-bold text-[#1e3a8a]">Kelola Buku</h1>
        </div>
        <button onClick={() => openModal()} className="bg-[#f97316] hover:bg-orange-600 text-white px-6 py-2.5 rounded-xl font-bold flex items-center gap-2 shadow-lg transition-all">
          <FaPlus /> Tambah Buku Baru
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
        <div className="bg-[#1e293b] p-5 flex items-center gap-3 text-white">
          <FaList className="text-xl" />
          <h2 className="text-xl font-semibold">Daftar Buku</h2>
        </div>

        <div className="p-6 border-b border-gray-100 flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <input type="text" placeholder="Cari buku..." className="w-full px-4 py-2.5 border border-gray-200 rounded-lg outline-none focus:ring-1 focus:ring-blue-400" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
          </div>
          <select className="border border-gray-200 rounded-lg px-4 py-2.5 outline-none focus:ring-1 focus:ring-blue-400 min-w-[200px]" value={selectedCategoryFilter} onChange={(e) => setSelectedCategoryFilter(e.target.value)}>
            <option value="Semua Kategori">Semua Kategori</option>
            {Object.keys(categoryPrefixes).map(cat => (<option key={cat} value={cat}>{cat}</option>))}
          </select>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b-2 border-orange-500">
                <th className="px-6 py-4 font-bold text-gray-700">Kode</th>
                <th className="px-6 py-4 font-bold text-gray-700">Judul</th>
                <th className="px-6 py-4 font-bold text-gray-700">Penulis</th>
                <th className="px-6 py-4 font-bold text-gray-700">Kategori</th>
                <th className="px-6 py-4 font-bold text-gray-700 text-center">Stok</th>
                <th className="px-6 py-4 font-bold text-gray-700 text-center text-blue-600">Tersedia</th>
                <th className="px-6 py-4 font-bold text-gray-700 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredBooks.map((book) => (
                <tr key={book.id_db} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 text-sm font-medium text-gray-600">{book.id}</td>
                  <td className="px-6 py-4 text-sm font-semibold text-gray-800">{book.title}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{book.author}</td>
                  <td className="px-6 py-4">
                    <span className="bg-blue-600 text-white text-[10px] px-3 py-1 rounded-full font-bold uppercase tracking-wider">{book.category}</span>
                  </td>
                  <td className="px-6 py-4 text-center text-sm font-bold text-gray-400">{book.stock}</td>
                  <td className="px-6 py-4 text-center text-sm font-bold text-blue-600">{book.available}</td>
                  <td className="px-6 py-4 text-center">
                    <div className="flex justify-center gap-2">
                      <button onClick={() => openModal(book)} className="bg-amber-400 hover:bg-amber-500 text-white p-2 rounded-lg"><FaEdit /></button>
                      <button onClick={() => handleDelete(book.id_db)} className="bg-rose-500 hover:bg-rose-600 text-white p-2 rounded-lg"><FaTrash /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-3xl shadow-2xl overflow-hidden border border-gray-200">
            <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-slate-50">
              <h3 className="text-lg font-bold text-slate-700 flex items-center gap-2">
                <FaEdit size={14} /> {currentBook.id_db ? "Edit Buku" : "Tambah Buku Baru"}
              </h3>
              <button onClick={closeModal} className="text-gray-400 hover:text-gray-600"><FaTimes size={24} /></button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-8 space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-semibold text-gray-700">Kode Buku</label>
                  <input readOnly={currentBook.category !== "Lainnya (Input Manual)"} placeholder="Auto-generated" className="w-full px-4 py-2 border border-gray-200 rounded-md bg-gray-50 outline-none" value={currentBook.id} onChange={(e) => setCurrentBook({...currentBook, id: e.target.value})} />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-semibold text-gray-700">Kategori</label>
                  <select required className="w-full px-4 py-2 border border-gray-200 rounded-md outline-none focus:ring-1 focus:ring-blue-400" value={currentBook.category} onChange={(e) => handleCategoryChange(e.target.value)}>
                    <option value="" disabled>Pilih Kategori</option>
                    {Object.keys(categoryPrefixes).map(cat => (<option key={cat} value={cat}>{cat}</option>))}
                    <option value="Lainnya (Input Manual)">Lainnya (Input Manual)</option>
                  </select>
                  {currentBook.category === "Lainnya (Input Manual)" && (
                    <input placeholder="Masukkan Nama Kategori Baru" className="mt-2 w-full px-4 py-2 border border-gray-200 rounded-md outline-none focus:ring-1 focus:ring-blue-400" value={manualCategory} onChange={(e) => setManualCategory(e.target.value)} />
                  )}
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-gray-700">Judul Buku</label>
                <input required className="w-full px-4 py-2 border border-gray-200 rounded-md outline-none" value={currentBook.title} onChange={(e) => setCurrentBook({...currentBook, title: e.target.value})} />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-gray-700">Penulis</label>
                <input required className="w-full px-4 py-2 border border-gray-200 rounded-md outline-none" value={currentBook.author} onChange={(e) => setCurrentBook({...currentBook, author: e.target.value})} />
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-semibold text-gray-700">Penerbit</label>
                  <input required className="w-full px-4 py-2 border border-gray-200 rounded-md outline-none" value={currentBook.publisher} onChange={(e) => setCurrentBook({...currentBook, publisher: e.target.value})} />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-semibold text-gray-700">Tahun Terbit</label>
                  <input type="number" required className="w-full px-4 py-2 border border-gray-200 rounded-md outline-none" value={currentBook.year} onChange={(e) => setCurrentBook({...currentBook, year: e.target.value})} />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-semibold text-gray-700">Stok (Limit Maksimal)</label>
                  <input type="number" required className="w-full px-4 py-2 border border-gray-200 rounded-md outline-none focus:ring-1 focus:ring-blue-400" value={currentBook.stock} onChange={(e) => setCurrentBook({...currentBook, stock: parseInt(e.target.value) || 0})} />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-semibold text-blue-600">Tersedia (Sisa di Rak)</label>
                  <input type="number" required className="w-full px-4 py-2 border border-blue-200 rounded-md outline-none focus:ring-2 focus:ring-blue-400" value={currentBook.available} onChange={(e) => setCurrentBook({...currentBook, available: parseInt(e.target.value) || 0})} />
                </div>
              </div>

              <div className="pt-4 flex justify-end gap-3">
                <button type="button" onClick={closeModal} className="px-8 py-2.5 bg-slate-500 text-white rounded-md font-bold">Batal</button>
                <button type="submit" className="px-8 py-2.5 bg-[#f97316] hover:bg-orange-600 text-white rounded-md font-bold flex items-center gap-2 shadow-lg transition-all">
                  <FaSave /> Simpan Buku
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}