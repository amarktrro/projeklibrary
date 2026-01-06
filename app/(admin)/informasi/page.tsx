export default function Informasi() {
  return (
    <div className="max-w-2xl bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-sm">
      <h2 className="text-2xl font-black mb-8 text-slate-800 italic">Informasi JTIK Library</h2>
      <div className="space-y-6">
        <div className="p-6 bg-slate-50 rounded-2xl"><p className="text-xs font-black text-slate-400 uppercase mb-2">Jam Buka</p><p className="font-bold">Senin - Jumat (08:00 - 16:00)</p></div>
        <div className="p-6 bg-slate-50 rounded-2xl"><p className="text-xs font-black text-slate-400 uppercase mb-2">Lokasi</p><p className="font-bold italic">Gedung JTIK Lt. 2, UNM Makassar</p></div>
        <div className="p-6 bg-[#1a2e5a] text-white rounded-2xl"><p className="text-xs font-black text-blue-300 uppercase mb-2">Email Layanan</p><p className="font-bold underline">perpustakaanjtikunm@gmail.com</p></div>
      </div>
    </div>
  );
}