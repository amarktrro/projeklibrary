import { QrCode } from "lucide-react";
export default function GuestBook() {
  return (
    <div className="grid grid-cols-2 gap-8">
      <div className="bg-white p-10 rounded-[2.5rem] border border-slate-100 flex flex-col items-center">
        <h3 className="font-bold mb-8">Scan Kartu Anggota</h3>
        <div className="w-64 h-64 border-4 border-dashed border-orange-500 rounded-[2rem] flex items-center justify-center"><QrCode size={100} className="text-slate-200" /></div>
      </div>
      <div className="bg-[#1a2e5a] p-10 rounded-[2.5rem] text-white">
        <h3 className="font-bold mb-6 text-xl">Input Kehadiran Manual</h3>
        <input type="text" placeholder="NIM / NIDN" className="w-full bg-white/10 border border-white/20 rounded-2xl p-4 mb-4 outline-none" />
        <button className="w-full bg-orange-500 py-4 rounded-2xl font-bold">SUBMIT</button>
      </div>
    </div>
  );
}