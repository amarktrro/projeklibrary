export default function KelolaDenda() {
  return (
    <div className="grid grid-cols-3 gap-6">
      <div className="col-span-2 bg-white rounded-3xl p-8 border border-slate-100 shadow-sm">
        <h3 className="font-bold mb-6">User Belum Lunas Denda</h3>
        <table className="w-full text-sm">
          <thead className="text-slate-400 font-bold border-b"><tr><th className="py-4 text-left">Nama</th><th className="py-4 text-right">Denda</th><th className="py-4 text-center">Aksi</th></tr></thead>
          <tbody><tr><td className="py-4 font-bold">Andi M.</td><td className="py-4 text-right text-red-600 font-black">Rp 15.000</td><td className="py-4 text-center"><button className="bg-orange-100 text-orange-600 px-4 py-1 rounded-lg text-xs font-black">LUNASKAN</button></td></tr></tbody>
        </table>
      </div>
      <div className="bg-[#1a2e5a] rounded-3xl p-8 text-white">
        <h3 className="font-bold mb-4">Kalkulator Denda</h3>
        <input type="number" placeholder="Hari terlambat" className="w-full bg-white/10 border border-white/20 rounded-xl p-4 mb-4 outline-none text-white" />
        <div className="border-t border-white/10 pt-4"><p className="text-xs text-blue-300">Total Tagihan:</p><p className="text-3xl font-black text-orange-400 mt-1">Rp 0</p></div>
      </div>
    </div>
  );
}