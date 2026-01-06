"use client";

import { LogOut, User } from 'lucide-react';
import { useRouter } from 'next/navigation';

const TopNav = () => {
  const router = useRouter();

  return (
    <header className="h-16 bg-[#1a2e5a] text-white sticky top-0 z-30 flex items-center justify-between px-8 shadow-md">
      <div className="text-xs font-bold opacity-70 italic">Library Management System</div>

      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2">
            <User size={16} />
            <span className="text-xs font-bold uppercase tracking-tighter">Admin</span>
        </div>
        
        <button 
          onClick={() => router.push('/admin-login')}
          className="bg-[#ff5733] hover:bg-[#ff451a] text-white px-4 py-2 rounded-lg text-[10px] font-black flex items-center gap-2 transition-all"
        >
          <LogOut size={14} /> LOGOUT
        </button>
      </div>
    </header>
  );
};

export default TopNav;