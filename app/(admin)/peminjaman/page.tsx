export default function Peminjaman() {
  return (
    <div className="space-y-6">
      <div className="bg-[#1a2e5a] text-white p-8 rounded-[2.5rem] flex justify-between items-center">
        <div><h2 className="text-2xl font-bold">Kelola Peminjaman</h2><p className="opacity-60 text-sm">Update status buku dan pengembalian</p></div>
        <button className="bg-orange-500 px-6 py-3 rounded-2xl font-bold text-sm">+ Input Pinjam Baru</button>
      </div>
      <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-50 text-[10px] font-black uppercase text-slate-400"><tr className="border-b"><th className="p-6">Peminjam</th><th className="p-6">Buku</th><th className="p-6">Status</th><th className="p-6 text-center">Aksi</th></tr></thead>
          <tbody><tr className="border-b"><td className="p-6 font-bold">Dani Ramadhan</td><td className="p-6 italic">Clean Code</td><td className="p-6"><span className="bg-red-50 text-red-500 px-3 py-1 rounded-lg text-[10px] font-bold">Terlambat</span></td><td className="p-6 text-center"><button className="bg-green-500 text-white px-4 py-2 rounded-lg text-[10px] font-bold">KEMBALIKAN</button></td></tr></tbody>
        </table>
      </div>
    </div>
  );
}