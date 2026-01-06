"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, BookOpen, Users, 
  ClipboardList, Wallet, QrCode, 
  BarChart3, FileText, Info 
} from 'lucide-react';

const Sidebar = () => {
  const pathname = usePathname();

  const menuItems = [
    { name: 'Dashboard', icon: <LayoutDashboard size={18}/>, path: '/dashboard' },
    { name: 'Kelola Buku', icon: <BookOpen size={18}/>, path: '/buku' },
    { name: 'Kelola User', icon: <Users size={18}/>, path: '/users' },
    { name: 'Peminjaman', icon: <ClipboardList size={18}/>, path: '/peminjaman' },
    { name: 'Kelola Denda', icon: <Wallet size={18}/>, path: '/denda' },
    { name: 'Buku Tamu & Scan QR', icon: <QrCode size={18}/>, path: '/guest-book' },
    { name: 'Laporan Keuangan', icon: <BarChart3 size={18}/>, path: '/laporan-keuangan' },
    { name: 'Laporan Lainnya', icon: <FileText size={18}/>, path: '/laporan-lainnya' },
    { name: 'Informasi', icon: <Info size={18}/>, path: '/informasi' },
  ];

  return (
    <div className="flex flex-col h-full text-white py-6">
      <div className="px-6 mb-8 flex items-center gap-3">
        <div className="w-8 h-8 bg-white/10 rounded flex items-center justify-center">📚</div>
        <h1 className="text-lg font-black tracking-tight uppercase">Simpes Jtik</h1>
      </div>

      <nav className="flex-1 px-3 space-y-1">
        {menuItems.map((item) => {
          const isActive = pathname === item.path;
          return (
            <Link 
              key={item.name} 
              href={item.path} 
              className={`flex items-center gap-4 px-4 py-3 rounded-xl transition-all font-medium text-xs ${
                isActive 
                ? 'bg-[#2a3c6a] text-white border-l-4 border-orange-500' 
                : 'text-blue-200 hover:bg-white/5'
              }`}
            >
              {item.icon}
              {item.name}
            </Link>
          );
        })}
      </nav>
    </div>
  );
};

export default Sidebar;