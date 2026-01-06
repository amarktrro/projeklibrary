export default function KelolaUser() {
  return (
    <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden">
      <div className="p-8 border-b flex justify-between items-center">
        <h2 className="text-xl font-black">Manajemen User</h2>
        <button className="bg-orange-500 text-white px-6 py-2 rounded-xl font-bold">+ Tambah User</button>
      </div>
      <table className="w-full">
        <thead className="bg-slate-50 text-[10px] font-black uppercase text-slate-400"><tr><th className="p-6 text-left">Nama</th><th className="p-6 text-left">NIM / NIDN</th><th className="p-6 text-left">Role</th><th className="p-6 text-center">Aksi</th></tr></thead>
        <tbody>
          <tr><td className="p-6 font-bold text-slate-700">Andi Mallarangeng</td><td className="p-6 text-slate-500">2102095011</td><td className="p-6 text-slate-500">Mahasiswa</td><td className="p-6 flex justify-center gap-2"><button className="bg-yellow-400 p-2 rounded text-white text-xs">Edit</button><button className="bg-red-500 p-2 rounded text-white text-xs">Hapus</button></td></tr>
        </tbody>
      </table>
    </div>
  );
}