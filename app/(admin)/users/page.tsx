"use client";

import React, { useState, useEffect } from "react";
import { Plus, Search, Edit, Trash2, X } from "lucide-react";

export default function KelolaUser() {
  const [users, setUsers] = useState<any[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<any>(null);

  // Form State
  const [formData, setFormData] = useState({ id: "", name: "", role: "Mahasiswa" });

  // Load Data
  useEffect(() => {
    const savedUsers = localStorage.getItem("simpes_users");
    if (savedUsers) {
      setUsers(JSON.parse(savedUsers));
    } else {
      const defaultData = [
        { id: "2102095011", name: "Andi Mallarangeng", role: "Mahasiswa" },
      ];
      setUsers(defaultData);
    }
    setIsLoaded(true);
  }, []);

  // Save Data
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("simpes_users", JSON.stringify(users));
    }
  }, [users, isLoaded]);

  const handleOpenAddModal = () => {
    setEditingUser(null);
    setFormData({ id: "", name: "", role: "Mahasiswa" });
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (user: any) => {
    setEditingUser(user);
    setFormData(user);
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingUser) {
      setUsers(users.map(u => u.id === editingUser.id ? formData : u));
    } else {
      setUsers([...users, formData]);
    }
    setIsModalOpen(false);
  };

  const handleDelete = (id: string) => {
    if (confirm("Hapus user ini?")) {
      setUsers(users.filter(u => u.id !== id));
    }
  };

  const filteredUsers = users.filter(u => 
    u.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    u.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (!isLoaded) return null;

  return (
    <div className="space-y-6">
      {/* Search and Add Action */}
      <div className="flex justify-between items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="text" 
            placeholder="Cari Nama / NIM..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
           className="w-full pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-2xl focus:ring-2 focus:ring-orange-500 outline-none font-black text-[#1e293b] placeholder:text-[#1e293b]/50"
          />
        </div>
        <button 
          onClick={handleOpenAddModal}
          className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-2xl font-black text-sm flex items-center gap-2 transition-all shadow-lg shadow-orange-900/10"
        >
          <Plus size={18} /> Tambah User
        </button>
      </div>

      {/* Table Container */}
      <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden">
        <div className="p-8 border-b">
          <h2 className="text-xl font-black text-[#1e293b]">Manajemen User</h2>
        </div>
        <table className="w-full">
          <thead className="bg-slate-50 text-[10px] font-black uppercase text-slate-400">
            <tr>
              <th className="p-6 text-left">NIM / NIDN</th>
              <th className="p-6 text-left">Nama Lengkap</th>
              <th className="p-6 text-left">Role</th>
              <th className="p-6 text-center">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {filteredUsers.map((user) => (
              <tr key={user.id} className="hover:bg-slate-50/50 transition-colors">
                <td className="p-6 text-slate-500 font-medium">{user.id}</td>
                <td className="p-6 font-bold text-[#1e293b]">{user.name}</td>
                <td className="p-6">
                  <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase ${
                    user.role === 'Dosen' ? 'bg-purple-100 text-purple-600' : 'bg-blue-100 text-blue-600'
                  }`}>
                    {user.role}
                  </span>
                </td>
                <td className="p-6">
                  <div className="flex justify-center gap-2">
                    <button 
                      onClick={() => handleOpenEditModal(user)}
                      className="bg-yellow-400 hover:bg-yellow-500 p-2.5 rounded-xl text-white transition-all"
                    >
                      <Edit size={16} />
                    </button>
                    <button 
                      onClick={() => handleDelete(user.id)}
                      className="bg-red-500 hover:bg-red-600 p-2.5 rounded-xl text-white transition-all"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-[#1e293b]/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <div className="bg-white rounded-[2.5rem] w-full max-w-md p-10 shadow-2xl">
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-2xl font-black text-[#1e293b]">{editingUser ? "Edit User" : "User Baru"}</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X size={24} />
              </button>
            </div>
            <form onSubmit={handleSave} className="space-y-4">
              <input 
                required 
                placeholder="NIM / NIDN (ID)" 
                value={formData.id} 
                onChange={e => setFormData({...formData, id: e.target.value})} 
                disabled={!!editingUser}
                className={`w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-orange-500 outline-none font-bold text-[#1e293b] ${editingUser ? 'opacity-50 cursor-not-allowed' : ''}`} 
              />
              <input 
                required 
                placeholder="Nama Lengkap" 
                value={formData.name} 
                onChange={e => setFormData({...formData, name: e.target.value})} 
                className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-orange-500 outline-none font-bold text-[#1e293b]" 
              />
              <select 
                value={formData.role} 
                onChange={e => setFormData({...formData, role: e.target.value})}
                className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-orange-500 outline-none font-bold text-[#1e293b]"
              >
                <option value="Mahasiswa">Mahasiswa</option>
                <option value="Dosen">Dosen</option>
                <option value="Staf">Staf</option>
              </select>
              
              <button type="submit" className="w-full bg-orange-500 py-4 text-white font-black rounded-2xl hover:bg-orange-600 transition-all shadow-lg mt-4">
                Simpan User
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}