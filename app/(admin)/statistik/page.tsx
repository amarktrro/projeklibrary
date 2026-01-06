export default function Statistik() {
  return (
    <div className="grid grid-cols-3 gap-6">
      <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 flex flex-col items-center">
        <h3 className="font-black text-slate-800 mb-8">Kategori Populer</h3>
        <div className="w-48 h-48 rounded-full border-[20px] border-orange-500 border-l-blue-900 flex items-center justify-center font-black text-2xl">45%</div>
        <p className="mt-8 text-xs font-bold text-blue-900 tracking-widest uppercase">Teknologi Teratas</p>
      </div>
      <div className="col-span-2 bg-white p-8 rounded-[2.5rem] border border-slate-100">
        <h3 className="font-black text-slate-800 mb-6">Peringkat Buku Mingguan</h3>
        <div className="space-y-4">
          {[1,2,3].map(i => (
            <div key={i} className="flex justify-between items-center p-4 bg-slate-50 rounded-2xl border border-slate-100">
              <span className="font-bold text-slate-500">#0{i} Judul Buku Contoh</span>
              <span className="text-orange-500 font-black">12x Pinjam</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}