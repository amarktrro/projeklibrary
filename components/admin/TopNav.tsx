"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import axios from "axios";
import { FaUser, FaSignOutAlt, FaGraduationCap } from "react-icons/fa";
import { useRouter } from "next/navigation";

export default function TopNav() {
  const router = useRouter();
  const [name, setName] = useState('...');

  useEffect(() => {
    // Get the name from localStorage instantly; if missing, try fetching profile
    const storedName = localStorage.getItem('admin_name');
    if (storedName) {
      setName(storedName);
      return;
    }

    const token = localStorage.getItem('admin_token');
    if (!token) return;

    // If localStorage doesn't have the name but we have a token, fetch profile
    (async () => {
      try {
        const resp = await axios.get('http://127.0.0.1:8000/api/admin-profile', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const fetchedName = resp.data?.name || resp.data?.user?.name;
        if (fetchedName) {
          setName(fetchedName);
          localStorage.setItem('admin_name', fetchedName);
        }
      } catch (e) {
        // silent fail — keep placeholder
      }
    })();
  }, []);

  const handleLogout = async () => {
    const token = localStorage.getItem('admin_token');
    
    // 1. Immediately Clear Local Storage
    // We do this BEFORE the API call so the user is "logged out" locally instantly
    localStorage.removeItem('admin_token');
    localStorage.removeItem('admin_name');

    try {
      if (token) {
        // 2. Tell Laravel to kill the session (Background task)
        await axios.post('http://127.0.0.1:8000/api/admin-logout', {}, {
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
      window.location.href = '/admin-login'; 
    }
  };

  return (
    <nav className="bg-[#172e5f] text-white h-16 flex items-center justify-between px-6 shadow-md fixed w-full z-20">
      <div className="flex items-center gap-3">
        <FaGraduationCap className="text-3xl text-orange-500" />
        <h1 className="text-xl font-bold tracking-wide">SIMPES JTIK</h1>
      </div>

      <div className="flex items-center gap-6">
        <Link
          href="/dashboard"
          className="flex items-center gap-2 hover:text-orange-400 cursor-pointer"
        >
          <div className="bg-white/10 p-1.5 rounded-full">
            <FaUser className="text-sm" />
          </div>
          <span className="font-medium text-sm">{name}</span>
        </Link>

        <button 
          onClick={handleLogout}
          className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-1.5 rounded-md text-sm font-bold flex items-center gap-2 shadow-lg shadow-orange-900/20"
        >
          <FaSignOutAlt /> Logout
        </button>
      </div>
    </nav>
  );
}
