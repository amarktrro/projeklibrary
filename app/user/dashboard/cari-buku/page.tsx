'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Fuse from 'fuse.js';
import Navbar from '../../../components/navbar';
import Sidebar from '../../../components/sidebar';
import { 
  FaSearch, 
  FaBook, 
  FaUser, 
  FaTag, 
  FaBookmark, 
  FaHandHolding,
  FaBan
} from 'react-icons/fa';

export default function CariBukuPage() {
  // --- SYNC WITH ADMIN DATA ---
  const [books, setBooks] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Semua Kategori");

  useEffect(() => {
    const savedBooks = localStorage.getItem("simpes_inventory");
    if (savedBooks) {
      setBooks(JSON.parse(savedBooks));
    }
  }, []);

  // --- FUZZY SEARCH LOGIC ---
  const filteredBooks = useMemo(() => {
    // 1. Start with the full book list or category-filtered list
    let listToSearch = books;

    // Apply Category Filter first (Hard Filter)
    if (selectedCategory !== "Semua Kategori") {
      listToSearch = books.filter(book => book.category === selectedCategory);
    }

    // 2. If there is no search query, return the list as is
    if (!searchQuery.trim()) return listToSearch;

    // 3. Setup Fuse.js for fuzzy matching
    const fuse = new Fuse(listToSearch, {
      keys: ["title", "author", "id"], // Searchable fields from your original logic
      threshold: 0.4,                  // 0.4 allows for "similar enough" results
      distance: 100,
    });

    // 4. Return the fuzzy results
    return fuse.search(searchQuery).map(result => result.item);
  }, [searchQuery, selectedCategory, books]);

  // Get unique categories for the dropdown
  const categories = ["Semua Kategori", ...new Set(books.map(b => b.category))];

  return (
    <div className="h-screen bg-gray-50 flex flex-col font-sans overflow-hidden">
      <Navbar />

      <div className="flex pt-16 h-full">
        <Sidebar />

        <main className="flex-1 md:ml-64 p-8 bg-white overflow-y-auto">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-3">
              <div className="bg-[#1e293b] p-2 rounded text-white">
                <FaBook />
              </div>
              <h2 className="text-2xl font-bold text-[#1e293b]">Daftar Buku</h2>
            </div>
            <p className="text-sm text-gray-500">Total {filteredBooks.length} buku ditemukan</p>
          </div>

          {/* --- SEARCH & FILTER BAR --- */}
          <div className="flex flex-col md:flex-row gap-4 mb-8 bg-gray-50 p-4 rounded-xl border border-gray-200">
            <div className="flex-1 relative">
              <input 
                type="text" 
                placeholder="Cari judul buku, penulis, atau kode..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-4 pr-12 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none text-[#1e293b] font-medium"
              />
              <div className="absolute right-4 top-3 text-gray-400">
                <FaSearch />
              </div>
            </div>
            <select 
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="bg-white border border-gray-300 rounded-lg px-4 py-2.5 outline-none focus:ring-2 focus:ring-orange-500 min-w-[200px] font-medium text-[#1e293b]"
            >
              {categories.map(cat => (
                <option key={cat as string} value={cat as string}>{cat as string}</option>
              ))}
            </select>
          </div>

          {/* --- BOOK GRID --- */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredBooks.length > 0 ? (
              filteredBooks.map((book) => (
                <div key={book.id} className="bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow overflow-hidden flex flex-col">
                  <div className="bg-[#c1d095] h-48 flex items-center justify-center m-4 rounded-xl">
                    <FaBook className="text-6xl text-[#1e293b]" />
                  </div>
                  
                  <div className="px-6 pb-6 flex-1 flex flex-col">
                    <h3 className="font-bold text-[#1e293b] text-lg mb-3 line-clamp-2">{book.title}</h3>
                    
                    <div className="space-y-2 mb-4 text-sm text-gray-600">
                      <div className="flex items-center gap-2">
                        <FaUser className="text-xs text-gray-400" /> {book.author}
                      </div>
                      <div className="flex items-center gap-2">
                        <FaTag className="text-xs text-gray-400" /> {book.category || 'Umum'}
                      </div>
                      <div className="flex items-center gap-2">
                        <FaBookmark className="text-xs text-gray-400" /> Kode: {book.id}
                      </div>
                    </div>

                    <div className="mb-4">
                      <span className={`${book.stock > 0 ? 'bg-green-600' : 'bg-red-600'} text-white text-xs px-3 py-1 rounded-full font-bold`}>
                        {book.stock > 0 ? `Tersedia: ${book.stock}` : 'Stok Habis'}
                      </span>
                    </div>

                    {book.stock > 0 ? (
                      <button className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2.5 rounded-lg flex items-center justify-center gap-2 font-bold transition-colors mt-auto">
                        <FaHandHolding /> Pinjam Buku
                      </button>
                    ) : (
                      <button disabled className="w-full bg-slate-400 text-white py-2.5 rounded-lg flex items-center justify-center gap-2 font-bold cursor-not-allowed mt-auto">
                        <FaBan /> Tidak Tersedia
                      </button>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full py-20 text-center text-gray-400 font-bold">
                Tidak ada buku yang sesuai dengan pencarian Anda.
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}