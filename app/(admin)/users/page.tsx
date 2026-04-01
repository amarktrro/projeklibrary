"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";

import { useRouter } from "next/navigation";
import { 
  FaUsers, 
  FaUserPlus, 
  FaSearch, 
  FaEdit, 
  FaTrash, 
  FaListUl,
  FaTimes,
  FaEye,
  FaSave,
  FaInfo
} from "react-icons/fa";

interface User {
  id: number;
  nim: string;
  nama: string;
  prodi: string;
  kelas: string;
  email: string;
  noHp: string;
  status: "Aktif" | "Nonaktif";
}

interface Notification {
  id: number;
  nim: string;
  visible: boolean;
}

export default function KelolaUserPage() {
const router = useRouter();

  const [users, setUsers] = useState<User[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProdi, setSelectedProdi] = useState("Semua Prodi");
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);

  const [formData, setFormData] = useState({
    nim: "",
    nama: "",
    prodi: "",
    kelas: "",
    email: "",
    noHp: "",
    status: "Aktif" as "Aktif" | "Nonaktif"
  });

  // Ensure this matches your Laravel local URL
  const API_URL = "http://127.0.0.1:8000/api/users";

  // --- 1. FETCH ACTUAL DATA FROM DATABASE ---
  const fetchUsers = async () => {
    try {
      const response = await axios.get(API_URL);
      
      // We map the DB fields (name, no_hp) to your UI fields (nama, noHp)
      const mappedData: User[] = response.data.map((u: any) => ({
        id: u.id,
        nim: u.nim || "",
        nama: u.name || u.nama || "", // Fallback if DB uses 'name'
        prodi: u.prodi || "",
        kelas: u.kelas || "",
        email: u.email || "",
        noHp: u.no_hp || u.noHp || "", // Fallback if DB uses 'no_hp'
        status: u.status || "Aktif"
      }));
      
      setUsers(mappedData);
    } catch (error) {
      console.error("Gagal mengambil data dari server:", error);
    }
  };

  useEffect(() => {
    
    const adminToken = localStorage.getItem("admin_token");
  const role = localStorage.getItem("role");

  // LOOPHOLE FIX: If no token or not admin, redirect to login immediately
  if (!adminToken || role !== 'admin') {
    router.push('/admin-login');
    return;
  }
    fetchUsers();
  }, []);

  // --- 2. NOTIFICATION LOGIC ---
  const showNimNotification = (nim: string) => {
    const id = Date.now();
    setNotifications(prev => [...prev, { id, nim, visible: false }]);
    setTimeout(() => {
      setNotifications(prev => prev.map(n => n.id === id ? { ...n, visible: true } : n));
    }, 10);
    setTimeout(() => {
      setNotifications(prev => prev.map(n => n.id === id ? { ...n, visible: false } : n));
      setTimeout(() => {
        setNotifications(prev => prev.filter(n => n.id !== id));
      }, 500);
    }, 3000);
  };

  // --- 3. DELETE LOGIC ---
  const handleDelete = async (id: number) => {
    if (confirm("Apakah Anda yakin ingin menghapus anggota ini?")) {
      try {
        await axios.delete(`${API_URL}/${id}`);
        fetchUsers(); 
      } catch (error) {
        alert("Gagal menghapus data dari server.");
      }
    }
  };

  // --- 4. SAVE / UPDATE LOGIC ---
  const handleSaveUser = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const payload = {
      nim: formData.nim,
      name: formData.nama,   // Sending 'name' to Laravel
      prodi: formData.prodi,
      kelas: formData.kelas,
      email: formData.email,
      no_hp: formData.noHp,  // Sending 'no_hp' to Laravel
      status: formData.status
    };

    try {
      if (editingUser) {
        await axios.put(`${API_URL}/${editingUser.id}`, payload);
      } else {
        // Use your specific create or register endpoint
        await axios.post(API_URL, payload);
      }
      fetchUsers();
      closeModal();
    } catch (error) {
      alert("Gagal menyimpan data. Pastikan NIM atau Email belum digunakan.");
    }
  };

  const openAddModal = () => {
    setEditingUser(null);
    setFormData({ nim: "", nama: "", prodi: "", kelas: "", email: "", noHp: "", status: "Aktif" });
    setIsModalOpen(true);
  };

  const openEditModal = (user: User) => {
    setEditingUser(user);
    setFormData({ ...user });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingUser(null);
  };

  const filteredUsers = users.filter((user) => {
    const query = searchQuery.toLowerCase();
    const matchesSearch = user.nama.toLowerCase().includes(query) || user.nim.toLowerCase().includes(query);
    const matchesProdi = selectedProdi === "Semua Prodi" || user.prodi === selectedProdi;
    return matchesSearch && matchesProdi;
  });

  // Get unique prodi list for the filter dropdown
  const dynamicProdiOptions = Array.from(new Set(users.map(u => u.prodi))).filter(p => p);

  return (
    <div className="relative space-y-6 p-2">
      
      {/* NOTIFICATION STACK */}
      <div className="fixed top-6 right-6 z-[100] flex flex-col gap-3 pointer-events-none items-end">
        {notifications.map((notif) => (
          <div key={notif.id} className={`flex items-center gap-3 bg-white shadow-xl rounded-md py-3 px-5 border-l-[5px] border-[#12a0b8] transition-all duration-500 ease-out pointer-events-auto w-fit ${notif.visible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}`}>
            <div className="bg-[#12a0b8] w-6 h-6 rounded-sm flex items-center justify-center text-white shrink-0"><FaInfo size={10} /></div>
            <span className="text-[#1e293b] font-medium text-[14px] whitespace-nowrap">Melihat detail user: <span className="font-bold">{notif.nim}</span></span>
          </div>
        ))}
      </div>

      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <FaUsers className="text-[#172e5f] text-3xl" />
          <h1 className="text-2xl font-semibold text-[#172e5f]">Kelola User</h1>
        </div>
        <button onClick={openAddModal} className="bg-[#f97316] hover:bg-orange-600 text-white px-5 py-2.5 rounded-xl font-medium flex items-center gap-2 shadow-md transition-all">
          <FaUserPlus size={16} /> Tambah User
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="bg-[#172e5f] text-white p-4 flex items-center gap-3">
          <FaListUl className="text-lg" />
          <h3 className="text-md font-semibold">Daftar Anggota</h3>
        </div>

        <div className="p-5 border-b border-gray-100 flex flex-col md:flex-row gap-4 bg-white">
          <div className="relative flex-1">
            <input type="text" placeholder="Cari anggota..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full bg-white border border-gray-200 rounded-xl py-2.5 pl-5 pr-12 outline-none text-gray-700 focus:border-orange-500 transition-colors" />
            <FaSearch className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-300" />
          </div>
          <select value={selectedProdi} onChange={(e) => setSelectedProdi(e.target.value)} className="bg-white border border-gray-200 rounded-xl py-2.5 px-5 outline-none font-medium text-gray-600 min-w-[180px] focus:border-orange-500">
            <option>Semua Prodi</option>
            {dynamicProdiOptions.map((p) => <option key={p} value={p}>{p}</option>)}
          </select>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-[#f97316]">
                <th className="px-6 py-4 text-xs font-bold text-[#172e5f] uppercase tracking-wider">NIM</th>
                <th className="px-6 py-4 text-xs font-bold text-[#172e5f] uppercase tracking-wider">Nama</th>
                <th className="px-6 py-4 text-xs font-bold text-[#172e5f] uppercase tracking-wider">Prodi</th>
                <th className="px-6 py-4 text-xs font-bold text-[#172e5f] uppercase tracking-wider text-center">Kelas</th>
                <th className="px-6 py-4 text-xs font-bold text-[#172e5f] uppercase tracking-wider">Email</th>
                <th className="px-6 py-4 text-xs font-bold text-[#172e5f] uppercase tracking-wider">No. HP</th>
                <th className="px-6 py-4 text-xs font-bold text-[#172e5f] uppercase tracking-wider text-center">Status</th>
                <th className="px-6 py-4 text-xs font-bold text-[#172e5f] uppercase tracking-wider text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan={8} className="text-center py-10 text-gray-400 text-sm">Tidak ada data ditemukan.</td>
                </tr>
              ) : (
                filteredUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 text-[13px] text-gray-600">{user.nim}</td>
                    <td className="px-6 py-4 text-[13px] font-medium text-gray-800">{user.nama}</td>
                    <td className="px-6 py-4 text-[13px] text-gray-600">{user.prodi}</td>
                    <td className="px-6 py-4 text-[13px] text-gray-600 text-center">{user.kelas}</td>
                    <td className="px-6 py-4 text-[13px] text-gray-600">{user.email}</td>
                    <td className="px-6 py-4 text-[13px] text-gray-600">{user.noHp}</td>
                    <td className="px-6 py-4 text-center">
                      <span className={`px-3 py-1 rounded-full text-[11px] font-bold ${user.status === 'Aktif' ? 'bg-[#10b981] text-white' : 'bg-gray-400 text-white'}`}>
                        {user.status.toUpperCase()}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <div className="flex justify-center gap-2">
                        <button onClick={() => showNimNotification(user.nim)} className="p-2 bg-[#06b6d4] text-white rounded-lg hover:bg-cyan-600 transition-colors"><FaEye size={14} /></button>
                        <button onClick={() => openEditModal(user)} className="p-2 bg-[#fbbf24] text-white rounded-lg hover:bg-amber-500 transition-colors"><FaEdit size={14} /></button>
                        <button onClick={() => handleDelete(user.id)} className="p-2 bg-[#f43f5e] text-white rounded-lg hover:bg-rose-600 transition-colors"><FaTrash size={14} /></button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL (Add/Edit) */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-2xl overflow-hidden shadow-2xl">
            <div className="bg-[#172e5f] p-5 text-white flex justify-between items-center">
              <h2 className="text-lg font-semibold uppercase">{editingUser ? "Edit Data Anggota" : "Tambah Anggota Baru"}</h2>
              <button onClick={closeModal}><FaTimes size={18} /></button>
            </div>
            <form onSubmit={handleSaveUser} className="p-6 space-y-5">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-400 uppercase">NIM / ID User</label>
                  <input required value={formData.nim} onChange={(e) => setFormData({...formData, nim: e.target.value})} className="w-full border-b border-gray-200 py-1.5 outline-none focus:border-orange-500 font-medium" />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-400 uppercase">Nama Lengkap</label>
                  <input required value={formData.nama} onChange={(e) => setFormData({...formData, nama: e.target.value})} className="w-full border-b border-gray-200 py-1.5 outline-none focus:border-orange-500 font-medium" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-400 uppercase">Program Studi</label>
                  {/* FREE TEXT INPUT */}
                  <input required value={formData.prodi} onChange={(e) => setFormData({...formData, prodi: e.target.value})} className="w-full border-b border-gray-200 py-1.5 outline-none focus:border-orange-500 font-medium" />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-400 uppercase">Kelas</label>
                  {/* FREE TEXT INPUT */}
                  <input required value={formData.kelas} onChange={(e) => setFormData({...formData, kelas: e.target.value})} className="w-full border-b border-gray-200 py-1.5 outline-none focus:border-orange-500 font-medium" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-400 uppercase">Email</label>
                  <input type="email" required value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className="w-full border-b border-gray-200 py-1.5 outline-none focus:border-orange-500 font-medium" />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-400 uppercase">No. HP</label>
                  <input required value={formData.noHp} onChange={(e) => setFormData({...formData, noHp: e.target.value})} className="w-full border-b border-gray-200 py-1.5 outline-none focus:border-orange-500 font-medium" />
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-400 uppercase">Status Keanggotaan</label>
                <select value={formData.status} onChange={(e) => setFormData({...formData, status: e.target.value as any})} className="w-full border-b border-gray-100 py-1.5 outline-none focus:border-orange-500 font-medium bg-white">
                  <option value="Aktif">Aktif</option>
                  <option value="Nonaktif">Nonaktif</option>
                </select>
              </div>
              <div className="flex justify-end gap-3 pt-4">
                <button type="button" onClick={closeModal} className="px-6 py-2 bg-gray-100 text-gray-500 rounded-xl font-semibold uppercase tracking-wider text-xs">Batal</button>
                <button type="submit" className="px-6 py-2 bg-[#f97316] text-white rounded-xl font-semibold uppercase tracking-wider text-xs flex items-center gap-2 shadow-md">
                  <FaSave /> Simpan User
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}