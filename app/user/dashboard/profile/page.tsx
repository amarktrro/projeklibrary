'use client';

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Navbar from '../../../components/navbar';
import Sidebar from '../../../components/sidebar';
import { 
  FaUser, FaIdCard, FaGraduationCap, FaUsers, 
  FaEnvelope, FaPhone, FaQrcode, FaEdit, FaSave, FaTimes 
} from 'react-icons/fa';

interface UserData {
  name: string;
  nim: string;
  prodi: string;
  kelas: string;
  email: string;
  no_hp: string;
}

interface ProfileRowProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  isEditing: boolean;
  onChange: (val: string) => void;
}

export default function UserProfilePage() {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<UserData>({
    name: '', nim: '', prodi: '', kelas: '', email: '', no_hp: ''
  });
  const [message, setMessage] = useState({ type: '', text: '' });

  if (typeof window !== 'undefined' && !localStorage.getItem('token')) {
    window.location.href = '/';
    return null;
  }

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/user-profile', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      setUserData(response.data);
      setFormData(response.data);
    } catch (error) {
      localStorage.removeItem('token');
      window.location.href = '/';
    }
  };

  const handleUpdate = async () => {
    const token = localStorage.getItem('token');
    setMessage({ type: '', text: '' });
    try {
      const response = await axios.put('http://127.0.0.1:8000/api/user-update', formData, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      setUserData(response.data.user);
      localStorage.setItem('user_name', response.data.user.name);
      setIsEditing(false);
      setMessage({ type: 'success', text: 'Profil berhasil diperbarui!' });
      setTimeout(() => setMessage({ type: '', text: '' }), 3000);
    } catch (error) {
      setMessage({ type: 'error', text: 'Gagal memperbarui profil. Periksa koneksi atau backend Laravel Anda.' });
    }
  };

  return (
    <div className="h-screen bg-gray-50 flex flex-col font-sans overflow-hidden">
      <Navbar />
      <div className="flex pt-16 h-full">
        <Sidebar />
        <main className="flex-1 md:ml-64 p-8 bg-white overflow-y-auto scroll-smooth">
          
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-[#1e293b]">Profil Anggota</h2>
            <p className="text-sm text-gray-500">Informasi dan pengaturan akun Anda</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            
            {/* LEFT: DATA ANGGOTA */}
            <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
              <div className="bg-[#1e293b] p-4 text-white text-xs font-bold flex items-center gap-2">
                <FaIdCard /> DATA ANGGOTA
              </div>
              
              <div className="p-10">
                <div className="flex flex-col items-center mb-10">
                  <div className="w-24 h-24 bg-orange-500 rounded-full flex items-center justify-center mb-4 border-4 border-orange-100 shadow-md text-white text-4xl font-bold">
                    {userData?.name?.charAt(0) || '?'}
                  </div>
                  <h2 className="text-xl font-bold text-[#1e293b] uppercase tracking-tight">{userData?.name}</h2>
                </div>

                <div className="space-y-1 mb-10">
                  <ProfileRow icon={<FaUser />} label="Nama Lengkap" value={isEditing ? formData.name : userData?.name || ''} isEditing={isEditing} onChange={(val) => setFormData({...formData, name: val})} />
                  <ProfileRow icon={<FaIdCard />} label="NIM" value={isEditing ? formData.nim : userData?.nim || ''} isEditing={isEditing} onChange={(val) => setFormData({...formData, nim: val})} />
                  <ProfileRow icon={<FaGraduationCap />} label="Program Studi" value={isEditing ? formData.prodi : userData?.prodi || ''} isEditing={isEditing} onChange={(val) => setFormData({...formData, prodi: val})} />
                  <ProfileRow icon={<FaUsers />} label="Kelas" value={isEditing ? formData.kelas : userData?.kelas || ''} isEditing={isEditing} onChange={(val) => setFormData({...formData, kelas: val})} />
                  <ProfileRow icon={<FaEnvelope />} label="Email" value={isEditing ? formData.email : userData?.email || ''} isEditing={isEditing} onChange={(val) => setFormData({...formData, email: val})} />
                  <ProfileRow icon={<FaPhone />} label="Nomor HP" value={isEditing ? formData.no_hp : userData?.no_hp || ''} isEditing={isEditing} onChange={(val) => setFormData({...formData, no_hp: val})} />
                </div>

                {/* EDIT BUTTON MOVED TO BOTTOM */}
                <div className="flex justify-center pt-6 border-t border-gray-100">
                  {!isEditing ? (
                    <button onClick={() => setIsEditing(true)} className="bg-orange-500 hover:bg-orange-600 text-white px-10 py-3 rounded-xl font-bold flex items-center gap-2 transition-all shadow-lg shadow-orange-100 active:scale-95">
                      <FaEdit /> Edit Profil
                    </button>
                  ) : (
                    <div className="flex gap-4 w-full">
                      <button onClick={() => { setIsEditing(false); setFormData(userData!); }} className="flex-1 bg-gray-100 text-gray-600 py-3 rounded-xl font-bold flex items-center justify-center gap-2">
                        <FaTimes /> Batal
                      </button>
                      <button onClick={handleUpdate} className="flex-1 bg-green-600 text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-green-100">
                        <FaSave /> Simpan Perubahan
                      </button>
                    </div>
                  )}
                </div>
                {message.text && <p className={`mt-4 text-center text-sm font-bold ${message.type === 'success' ? 'text-green-600' : 'text-red-500'}`}>{message.text}</p>}
              </div>
            </div>

            {/* RIGHT: KARTU ANGGOTA (STICKY) */}
            <div className="sticky top-8"> 
              <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden transition-all duration-300">
                <div className="bg-[#1e293b] p-4 text-white text-xs font-bold flex items-center gap-2">
                  <FaQrcode /> KARTU ANGGOTA
                </div>
                <div className="p-6">
                  <div className="bg-[#1e293b] rounded-2xl p-6 text-center text-white aspect-[3/4] flex flex-col justify-between border-b-[10px] border-orange-500 shadow-xl relative overflow-hidden">
                      <div className="bg-white w-32 h-32 mx-auto rounded-xl flex items-center justify-center border-4 border-white/10 shadow-inner">
                          <FaQrcode size={80} className="text-[#1e293b]" />
                      </div>
                      <div className="relative z-10">
                          <h3 className="font-bold uppercase tracking-wider text-sm truncate">{userData?.name}</h3>
                          <p className="text-orange-400 text-xs font-mono font-bold">{userData?.nim}</p>
                          <p className="text-gray-300 text-[10px] uppercase mt-1">{userData?.prodi} - {userData?.kelas}</p>
                      </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </main>
      </div>
    </div>
  );
}

function ProfileRow({ icon, label, value, isEditing, onChange }: ProfileRowProps) {
  return (
    <div className="flex justify-between items-center py-4 border-b border-gray-50 hover:bg-gray-50 px-2 rounded-lg gap-4">
      <span className="text-gray-400 text-sm flex items-center gap-3 shrink-0">
        <span className="text-orange-500">{icon}</span> {label}
      </span>
      {isEditing ? (
        <input type="text" value={value} onChange={(e) => onChange(e.target.value)} className="bg-white border border-orange-200 rounded-md px-3 py-1 text-sm font-bold text-[#1e293b] focus:ring-2 focus:ring-orange-500 outline-none w-full max-w-[200px]" />
      ) : (
        <span className="font-bold text-[#1e293b] text-sm uppercase truncate">{value || '-'}</span>
      )}
    </div>
  );
}