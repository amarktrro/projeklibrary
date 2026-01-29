'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import axios from 'axios';
import { FaUser, FaSignOutAlt, FaGraduationCap } from 'react-icons/fa';

export default function Navbar() {
  const [name, setName] = useState('...');

  useEffect(() => {
    // Get the name from localStorage instantly
    const storedName = localStorage.getItem('user_name');
    if (storedName) {
      setName(storedName);
    }
  }, []);

  const handleLogout = async () => {
    const token = localStorage.getItem('token');
    
    // 1. Immediately Clear Local Storage
    // We do this BEFORE the API call so the user is "logged out" locally instantly
    localStorage.removeItem('token');
    localStorage.removeItem('user_name');

    try {
      if (token) {
        // 2. Tell Laravel to kill the session (Background task)
        await axios.post('http://127.0.0.1:8000/api/logout', {}, {
          headers: { 
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json'
          }
        });
      }
    } catch (error) {
      console.error("Server-side logout failed, but local session cleared.");
    } finally {
      // 3. THE HISTORY KILLER
      // window.location.href forces a full page reload and prevents 
      // the "Back" button from showing the cached Dashboard state.
      window.location.href = '/'; 
    }
  };

  return (
    <nav className="bg-[#1e293b] text-white h-16 flex items-center justify-between px-6 shadow-md fixed w-full z-20">
      <div className="flex items-center gap-3">
        <FaGraduationCap className="text-3xl text-orange-500" />
        <h1 className="text-xl font-bold tracking-wide">SIMPES JTIK</h1>
      </div>

      <div className="flex items-center gap-6">
        <Link 
          href="/user/dashboard/profile" 
          className="flex items-center gap-2 hover:text-orange-400 transition-colors cursor-pointer group"
        >
          <div className="bg-white/10 p-1.5 rounded-full group-hover:bg-white/20 transition-all">
            <FaUser className="text-sm" />
          </div>
          <span className="font-medium text-sm">{name}</span>
        </Link>

        <button 
          onClick={handleLogout}
          className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-1.5 rounded-md text-sm font-bold flex items-center gap-2 transition-all active:scale-95 shadow-lg shadow-orange-900/20"
        >
          <FaSignOutAlt /> Logout
        </button>
      </div>
    </nav>
  );
}