"use client";

import { useState } from "react";
import type { Menu } from "@/data/menu";
import KartuMenu from "@/components/KartuMenu";

const daftarKategori = ["Semua", "Makanan", "Minuman", "Camilan"];

export default function KatalogMenu({ dataMenu }: { dataMenu: Menu[] }) {
  const [cari, setCari] = useState("");
  const [kategori, setKategori] = useState("Semua");
  const [urutan, setUrutan] = useState("awal");

  const hasilFilter = dataMenu.filter((item) => {
    const cocokCari = item.nama.toLowerCase().includes(cari.toLowerCase());
    const cocokKategori = kategori === "Semua" || item.kategori === kategori;
    return cocokCari && cocokKategori;
  });

  const hasilUrut = [...hasilFilter].sort((a, b) => {
    if (urutan === "termurah") return a.harga - b.harga;
    if (urutan === "termahal") return b.harga - a.harga;
    if (urutan === "nama") return a.nama.localeCompare(b.nama);
    return a.id - b.id; 
  });

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-900 mb-6">Katalog Menu</h1>

    
      <div className="mb-8 grid gap-4 sm:grid-cols-3">
        <input
          type="text"
          value={cari}
          onChange={(e) => setCari(e.target.value)}
          placeholder="Cari menu makanan/minuman..."
          className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2 text-slate-800 placeholder-slate-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
        />

        <select
          value={kategori}
          onChange={(e) => setKategori(e.target.value)}
          aria-label="Pilih Kategori"
          className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2 text-slate-800 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
        >
          {daftarKategori.map((kat) => (
            <option key={kat} value={kat}>
              {kat === "Semua" ? "Semua Kategori" : kat}
            </option>
          ))}
        </select>

        <select
          value={urutan}
          onChange={(e) => setUrutan(e.target.value)}
          aria-label="Pilih Urutan"
          className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2 text-slate-800 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
        >
          <option value="awal">Urutan awal</option>
          <option value="termurah">Harga termurah</option>
          <option value="termahal">Harga termahal</option>
          <option value="nama">Nama A–Z</option>
        </select>
      </div>

     
      {hasilUrut.length === 0 ? (
        <div className="py-12 text-center">
          <p className="text-lg font-medium text-slate-500">Menu tidak ditemukan.</p>
        </div>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {hasilUrut.map((item) => (
            <KartuMenu key={item.id} item={item} />
          ))}
        </div>
      )}
    </div>
  );
}

