"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { menu, rupiah } from "@/data/menu";
import {
  getKeranjang,
  saveKeranjang,
  saveRiwayat,
  type ItemKeranjang,
  type PesananRiwayat,
} from "@/data/keranjang";
import FormCheckout from "@/components/FormCheckout";
import StrukBelanja from "@/components/StrukBelanja";

export default function HalamanKeranjang() {
  const [items, setItems] = useState<ItemKeranjang[]>([]);
  const [promo, setPromo] = useState(false);
  const [caraAmbil, setCaraAmbil] = useState<"Ambil sendiri" | "Diantar">("Ambil sendiri");
  const [struk, setStruk] = useState<PesananRiwayat | null>(null);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setItems(getKeranjang());
  }, []);

  function ubahJumlah(id: number, delta: number) {
    const batas = menu.find((m) => m.id === id)?.stok ?? 0;
    const baru = items.map((it) => {
      if (it.id === id) {
        const jml = it.jumlah + delta;
        return jml >= 1 && jml <= batas ? { ...it, jumlah: jml } : it;
      }
      return it;
    });
    setItems(baru);
    saveKeranjang(baru);
  }

  function hapus(id: number) {
    const baru = items.filter((it) => it.id !== id);
    setItems(baru);
    saveKeranjang(baru);
  }

  const rincian = items
    .map((it) => {
      const m = menu.find((x) => x.id === it.id);
      return m ? { ...m, jumlah: it.jumlah, subtotal: m.harga * it.jumlah } : null;
    })
    .filter(Boolean) as (typeof menu[0] & { jumlah: number; subtotal: number })[];

  const subtotal = rincian.reduce((acc, it) => acc + it.subtotal, 0);
  const diskon = promo && subtotal >= 20000 ? Math.round(subtotal * 0.1) : 0;
  const ongkir = caraAmbil === "Diantar" ? 2000 : 0;
  const total = subtotal - diskon + ongkir;

  function handlePromo(kode: string) {
    if (kode.trim().toUpperCase() !== "HEMAT10") {
      setPromo(false);
      return "Kode promo tidak dikenal.";
    }
    if (subtotal < 20000) {
      setPromo(false);
      return "Promo HEMAT10 butuh belanja minimal Rp 20.000.";
    }
    setPromo(true);
    return "Promo HEMAT10 dipakai: diskon 10%.";
  }

  function handlePesan(nama: string, kelas: string) {
    const data: PesananRiwayat = {
      id: "ORD-" + Date.now(),
      tanggal: new Date().toLocaleDateString("id-ID"),
      nama,
      caraAmbil,
      kelas: caraAmbil === "Diantar" ? kelas : undefined,
      items: rincian.map((it) => ({ nama: it.nama, jumlah: it.jumlah, subtotal: it.subtotal })),
      subtotal,
      diskon,
      ongkir,
      total,
    };
    saveRiwayat(data);
    setStruk(data);
    setItems([]);
    saveKeranjang([]);
    setPromo(false);
  }

  if (struk) return <StrukBelanja struk={struk} onReset={() => setStruk(null)} />;
  if (items.length === 0)
    return (
      <div className="py-12 text-center">
        <p className="text-slate-500">Keranjang masih kosong.</p>
        <Link href="/menu" className="mt-3 inline-block text-blue-600 hover:underline">
          Lihat menu
        </Link>
      </div>
    );

  return (
    <div className="grid gap-6 md:grid-cols-3">
      <div className="space-y-3 md:col-span-2">
        <h1 className="text-xl font-bold">Keranjang</h1>
        {rincian.map((it) => (
          <div key={it.id} className="flex items-center justify-between rounded-xl border bg-white p-3">
            <div>
              <p className="font-semibold">{it.nama}</p>
              <p className="text-xs text-slate-500">{rupiah(it.harga)} x {it.jumlah} = {rupiah(it.subtotal)}</p>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={() => ubahJumlah(it.id, -1)} className="rounded border px-2 py-0.5 text-xs">-</button>
              <span className="text-xs">{it.jumlah}</span>
              <button onClick={() => ubahJumlah(it.id, 1)} className="rounded border px-2 py-0.5 text-xs">+</button>
              <button onClick={() => hapus(it.id)} className="ml-2 text-xs text-red-600">Hapus</button>
            </div>
          </div>
        ))}
      </div>
      <FormCheckout
        subtotal={subtotal}
        diskon={diskon}
        ongkir={ongkir}
        total={total}
        caraAmbil={caraAmbil}
        onCaraAmbilChange={setCaraAmbil}
        onKirim={handlePesan}
        onPakaiPromo={handlePromo}
      />
    </div>
  );
}
