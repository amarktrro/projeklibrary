export default function ManageBooks() {
  return (
    <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden">
      <div className="p-8 border-b flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-black text-slate-800 tracking-tight">Koleksi Buku</h2>
          <p className="text-slate-400 text-sm">Total 1.234 judul buku terdaftar</p>
        </div>
        <button className="bg-orange-500 text-white px-8 py-3 rounded-2xl font-black shadow-lg shadow-orange-100">+ TAMBAH BUKU</button>
      </div>
      
      <table className="w-full text-left">
        <thead className="bg-slate-50 text-slate-400 text-[10px] uppercase font-black">
          <tr>
            <th className="px-8 py-4">Informasi Buku</th>
            <th className="px-8 py-4">Kategori</th>
            <th className="px-8 py-4">Status</th>
            <th className="px-8 py-4 text-center">Aksi</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          <tr className="hover:bg-slate-50/50 transition-colors">
            <td className="px-8 py-6">
              <p className="font-bold text-slate-800">Clean Code</p>
              <p className="text-xs text-slate-400 italic">Robert C. Martin</p>
            </td>
            <td className="px-8 py-6 text-sm text-slate-500">Teknologi</td>
            <td className="px-8 py-6">
              <span className="bg-green-100 text-green-600 px-3 py-1 rounded-lg text-[10px] font-black uppercase">Tersedia</span>
            </td>
            <td className="px-8 py-6 flex justify-center gap-3">
              <button className="px-4 py-2 bg-yellow-400 text-white rounded-xl text-xs font-bold">Edit</button>
              <button className="px-4 py-2 bg-red-500 text-white rounded-xl text-xs font-bold">Hapus</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}