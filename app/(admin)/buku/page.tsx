"use client";

import React, { useState, useEffect } from "react";
import { Plus, Search, Edit, Trash2, X } from "lucide-react";

export default function KelolaBukuPage() {
  const [books, setBooks] = useState<any[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const savedBooks = localStorage.getItem("simpes_inventory");
    if (savedBooks) {
      setBooks(JSON.parse(savedBooks));
    } else {
      const defaultData = [
        { id: "PWL-001", title: "Pemrograman Web Lanjut", author: "Dr. Ahmad Subagyo", category: "Pemrograman", stock: 5 },
      ];
      setBooks(defaultData);
    }
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("simpes_inventory", JSON.stringify(books));
    }
  }, [books, isLoaded]);

  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBook, setEditingBook] = useState<any>(null);
  const [formData, setFormData] = useState({ id: "", title: "", author: "", category: "", stock: 0 });

  const handleOpenAddModal = () => {
    setEditingBook(null);
    setFormData({ id: "", title: "", author: "", category: "", stock: 0 });
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (book: any) => {
    setEditingBook(book);
    setFormData(book);
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingBook) {
      setBooks(books.map(b => b.id === editingBook.id ? formData : b));
    } else {
      setBooks([...books, formData]);
    }
    setIsModalOpen(false);
  };

  const handleDelete = (id: string) => {
    if (confirm("Hapus buku ini?")) {
      setBooks(books.filter(b => b.id !== id));
    }
  };

  const filteredBooks = books.filter(b => 
    b.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    b.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (!isLoaded) return null;

  return (
    <div className="p-6 bg-[#f8fafc] min-h-screen">
      {/* Header Banner - Matches Image_f21564 */}
      <div className="bg-[#1e293b] rounded-[2rem] p-8 flex items-center justify-between text-white shadow-lg mb-8">
        <div>
          <h2 className="text-2xl font-bold">Kelola Koleksi Buku</h2>
          <p className="text-slate-400 text-sm">Total {books.length} judul buku tersedia</p>
        </div>
        <div className="flex gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input 
              type="text" 
              placeholder="Cari Judul / ID..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-[#2d3748] border-none rounded-xl pl-10 pr-4 py-3 w-64 focus:ring-2 focus:ring-orange-500 text-sm text-white outline-none"
            />
          </div>
          <button 
            onClick={handleOpenAddModal}
            className="bg-[#f97316] hover:bg-orange-600 px-6 py-3 rounded-xl font-bold text-sm flex items-center gap-2 transition-all shadow-md"
          >
            <Plus size={18} /> Tambah Buku Baru
          </button>
        </div>
      </div>

      {/* Table Section - Matches Screenshot 134349 */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="bg-[#1e293b] px-6 py-4 flex items-center gap-2">
            <div className="h-1 w-full bg-orange-500 absolute top-0 left-0"></div>
            <h3 className="text-white font-bold flex items-center gap-2">
                <span className="opacity-70">☰</span> Daftar Buku
            </h3>
        </div>
        
        <table className="w-full text-left">
          <thead className="bg-white border-b border-slate-100">
            <tr className="text-[#1e293b] text-xs font-black uppercase tracking-wider">
              <th className="px-6 py-4">Kode</th>
              <th className="px-6 py-4">Judul</th>
              <th className="px-6 py-4">Penulis</th>
              <th className="px-6 py-4 text-center">Kategori</th>
              <th className="px-6 py-4 text-center">Stok</th>
              <th className="px-6 py-4 text-right">Aksi</th>
            </tr>
          </thead>
          <tbody className="text-sm text-slate-600">
            {filteredBooks.map((book) => (
              <tr key={book.id} className="border-b border-slate-50 hover:bg-slate-50 transition-colors">
                <td className="px-6 py-4 font-medium">{book.id}</td>
                <td className="px-6 py-4 font-bold text-[#1e293b]">{book.title}</td>
                <td className="px-6 py-4">{book.author}</td>
                <td className="px-6 py-4 text-center">
                  <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-[10px] font-bold">
                    {book.category || "Umum"}
                  </span>
                </td>
                <td className="px-6 py-4 text-center font-bold">{book.stock}</td>
                <td className="px-6 py-4">
                  <div className="flex justify-end gap-2">
                    <button onClick={() => handleOpenEditModal(book)} className="p-2 bg-yellow-400 hover:bg-yellow-500 text-white rounded-lg transition-all">
                      <Edit size={14} />
                    </button>
                    <button onClick={() => handleDelete(book.id)} className="p-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-all">
                      <Trash2 size={14} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal - Matches image_e5e243 */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <div className="bg-white rounded-[2rem] w-full max-w-md p-8 shadow-2xl relative overflow-hidden">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-[#1e293b]">{editingBook ? "Edit Buku" : "Tambah Buku Baru"}</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600"><X size={20} /></button>
            </div>
            <form onSubmit={handleSave} className="space-y-4">
              <input required placeholder="Kode Buku / ID" value={formData.id} onChange={e => setFormData({...formData, id: e.target.value})} className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-orange-500 outline-none text-[#1e293b]" />
              <input required placeholder="Judul Buku" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-orange-500 outline-none text-[#1e293b]" />
              <input required placeholder="Pengarang" value={formData.author} onChange={e => setFormData({...formData, author: e.target.value})} className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-orange-500 outline-none text-[#1e293b]" />
              <input required placeholder="Kategori" value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-orange-500 outline-none text-[#1e293b]" />
              <input required type="number" placeholder="Stok" value={formData.stock} onChange={e => setFormData({...formData, stock: parseInt(e.target.value) || 0})} className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-orange-500 outline-none text-[#1e293b]" />
              
              <button type="submit" className="w-full bg-[#f97316] py-4 text-white font-bold rounded-2xl hover:bg-orange-600 transition-all shadow-lg mt-2">
                Simpan Data
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}