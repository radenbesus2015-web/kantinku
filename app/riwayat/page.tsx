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
    return <p className="py-12 text-center text-slate-500">Memuat riwayat...</p>;
  }

  if (riwayat.length === 0) {
    return (
      <div className="py-16 text-center">
        <h1 className="text-2xl font-bold text-slate-800">Riwayat Pesanan</h1>
        <p className="mt-3 text-slate-500">Belum ada riwayat pesanan.</p>
        <Link
          href="/menu"
          className="mt-6 inline-block rounded-lg bg-blue-600 px-5 py-2.5 font-medium text-white hover:bg-blue-700"
        >
          Pesan Menu Sekarang
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-2xl">
      <h1 className="mb-6 text-2xl font-bold text-slate-900">Riwayat Pesanan</h1>
      <div className="space-y-4">
        {riwayat.map((p) => (
          <div key={p.id} className="rounded-xl border bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between border-b pb-3">
              <div>
                <p className="font-semibold text-slate-800">{p.nama}</p>
                <p className="text-xs text-slate-500">{p.tanggal} · {p.id}</p>
              </div>
              <span className="rounded bg-blue-50 px-2.5 py-1 text-xs font-medium text-blue-700">
                {p.caraAmbil === "Diantar" ? `Diantar (${p.kelas})` : "Ambil Sendiri"}
              </span>
            </div>

            <div className="mt-3 space-y-1 text-sm text-slate-600">
              {p.items.map((it, idx) => (
                <div key={idx} className="flex justify-between">
                  <span>{it.nama} x{it.jumlah}</span>
                  <span className="font-medium text-slate-800">{rupiah(it.subtotal)}</span>
                </div>
              ))}
            </div>

            <div className="mt-3 border-t pt-2 text-xs text-slate-500 space-y-1">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>{rupiah(p.subtotal)}</span>
              </div>
              {p.diskon > 0 && (
                <div className="flex justify-between text-green-600">
                  <span>Diskon</span>
                  <span>- {rupiah(p.diskon)}</span>
                </div>
              )}
              {p.ongkir > 0 && (
                <div className="flex justify-between">
                  <span>Ongkir</span>
                  <span>{rupiah(p.ongkir)}</span>
                </div>
              )}
            </div>

            <div className="mt-3 flex justify-between border-t pt-2 font-bold text-slate-900">
              <span>Total Bayar</span>
              <span className="text-blue-600">{rupiah(p.total)}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

