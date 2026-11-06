"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { rupiah } from "@/data/menu";
import { getRiwayat, type PesananRiwayat } from "@/data/keranjang";

export default function HalamanRiwayat() {
  const [riwayat, setRiwayat] = useState<PesananRiwayat[]>([]);
  const [sudahLoad, setSudahLoad] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setRiwayat(getRiwayat());
    setSudahLoad(true);
  }, []);

  if (!sudahLoad) {
    return <p className="py-6 text-slate-500">Memuat...</p>;
  }

  if (riwayat.length === 0) {
    return <p className="py-6 text-slate-500">Belum ada pesanan.</p>;
  }

  const totalBelanja = riwayat.reduce((acc, p) => acc + p.total, 0);

  return (
    <div className="max-w-2xl">
      <h1 className="mb-2 text-2xl font-bold">Riwayat Pesanan</h1>
      <p className="mb-4 text-sm text-slate-600">
        Ringkasan {riwayat.length} pesanan, total belanja {rupiah(totalBelanja)}
      </p>

      <div className="space-y-3">
        {riwayat.map((p) => {
          const totalPorsi = p.items.reduce((acc, it) => acc + it.jumlah, 0);
          return (
            <div key={p.id} className="rounded-xl border bg-white p-4 shadow-sm">
              <div className="flex justify-between font-semibold text-slate-800">
                <span>{p.nama}</span>
                <span className="text-xs text-slate-500">{p.tanggal}</span>
              </div>
              <p className="mt-1 text-sm text-slate-600">
                {totalPorsi} menu ({p.items.map((it) => `${it.nama} x${it.jumlah}`).join(", ")})
              </p>
              <div className="mt-2 flex justify-between border-t pt-2 text-sm">
                <span className="text-slate-500">
                  {p.caraAmbil === "Diantar" ? `Diantar (${p.kelas})` : "Ambil sendiri"}
                </span>
                <span className="font-bold text-slate-900">{rupiah(p.total)}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
