export default function FinancialReport() {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-[2.5rem] shadow-sm border border-slate-100 overflow-hidden">
        <table className="w-full">
          <thead className="bg-[#1a2e5a] text-white">
            <tr>
              <th className="p-6 text-left">Tanggal</th>
              <th className="p-6 text-left">Keterangan</th>
              <th className="p-6 text-right">Debit</th>
              <th className="p-6 text-right">Kredit</th>
              <th className="p-6 text-right">Saldo</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
             <tr className="text-sm">
               <td className="p-6">05/01/2024</td>
               <td className="p-6 font-bold">Denda Keterlambatan - User #12</td>
               <td className="p-6 text-right text-green-600 font-black">Rp 5.000</td>
               <td className="p-6 text-right text-slate-300">-</td>
               <td className="p-6 text-right font-bold">Rp 2.450.000</td>
             </tr>
          </tbody>
          <tfoot className="bg-slate-50">
            <tr>
              <td colSpan={4} className="p-6 text-right font-black text-slate-400 uppercase text-xs">Total Dana Kas</td>
              <td className="p-6 text-right text-2xl font-black text-[#1a2e5a]">Rp 2.450.000</td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
}