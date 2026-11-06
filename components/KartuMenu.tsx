import Link from "next/link";
import { rupiah, type Menu } from "@/data/menu";

export default function KartuMenu({ item }: { item: Menu }) {
  const habis = item.stok === 0;

  return (
    <div className="flex flex-col justify-between rounded-xl border bg-white p-5 shadow-sm">
      <div>
        <span className="rounded bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-700">
          {item.kategori}
        </span>
        <h3 className="mt-3 text-lg font-semibold text-slate-800">{item.nama}</h3>
        <p className="mt-1 text-base font-bold text-slate-900">{rupiah(item.harga)}</p>
        <p className={`mt-1 text-sm ${habis ? "font-semibold text-red-600" : "text-slate-600"}`}>
          {habis ? "Habis" : `Stok: ${item.stok}`}
        </p>
      </div>
      <div className="mt-4">
        <Link
          href={`/menu/${item.id}`}
          className="inline-block rounded bg-blue-600 px-4 py-1.5 text-sm font-medium text-white hover:bg-blue-700 transition"
        >
          Lihat Detail
        </Link>
      </div>
    </div>
  );
}

