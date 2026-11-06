import { rupiah } from "@/data/menu";
import type { PesananRiwayat } from "@/data/keranjang";
import Link from "next/link";

export default function StrukBelanja({
  struk,
  onReset,
}: {
  struk: PesananRiwayat;
  onReset: () => void;
}) {
  return (
    <div className="max-w-md rounded-xl border bg-white p-5 text-sm shadow-sm">
      <h2 className="text-xl font-bold text-slate-800">
        Terima kasih, {struk.nama}!
      </h2>
      <div className="my-3 space-y-1 border-y py-2">
        {struk.items.map((it, idx) => (
          <p key={idx} className="text-slate-700">
            {it.nama} x{it.jumlah} = {rupiah(it.subtotal)}
          </p>
        ))}
      </div>
      <div className="space-y-1 text-slate-600">
        <p>Subtotal: {rupiah(struk.subtotal)}</p>
        {struk.diskon > 0 && <p className="text-green-600">Diskon: -{rupiah(struk.diskon)}</p>}
        <p>
          {struk.caraAmbil === "Diantar"
            ? `Ongkir antar ke ${struk.kelas}: ${rupiah(struk.ongkir)}`
            : "Diambil sendiri di kantin"}
        </p>
        <p className="font-bold text-slate-900">Total bayar: {rupiah(struk.total)}</p>
      </div>
      <div className="mt-4 flex gap-2">
        <button
          onClick={onReset}
          className="rounded bg-blue-600 px-3 py-1.5 text-white hover:bg-blue-700"
        >
          Pesan lagi
        </button>
        <Link
          href="/riwayat"
          className="rounded border border-slate-300 px-3 py-1.5 text-slate-700"
        >
          Riwayat
        </Link>
      </div>
    </div>
  );
}

