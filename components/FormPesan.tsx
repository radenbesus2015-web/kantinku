"use client";

import { useState } from "react";
import { rupiah, type Menu } from "@/data/menu";
import { getKeranjang, saveKeranjang } from "@/data/keranjang";

export default function FormPesan({ menu }: { menu: Menu }) {
  const [jumlah, setJumlah] = useState(1);
  const [pesan, setPesan] = useState("");
  const [berhasil, setBerhasil] = useState(false);

  if (menu.stok === 0) {
    return <p className="mt-6 font-medium text-red-600">Menu ini habis.</p>;
  }

  function kirim(e: React.FormEvent) {
    e.preventDefault();
    setBerhasil(false);

    if (jumlah < 1) return setPesan("Jumlah minimal 1.");

    const keranjang = getKeranjang();
    const itemAda = keranjang.find((k) => k.id === menu.id);
    const sudahDiKeranjang = itemAda ? itemAda.jumlah : 0;

    if (sudahDiKeranjang + jumlah > menu.stok) {
      return setPesan(`Jumlah melebihi stok (sisa ${menu.stok - sudahDiKeranjang}).`);
    }

    if (itemAda) {
      itemAda.jumlah += jumlah;
    } else {
      keranjang.push({ id: menu.id, jumlah });
    }

    saveKeranjang(keranjang);
    setPesan("");
    setBerhasil(true);
  }

  return (
    <form onSubmit={kirim} className="mt-6 space-y-3 border-t pt-4">
      <h2 className="text-lg font-semibold text-slate-800">Tambah ke keranjang</h2>
      <input
        type="number"
        value={jumlah}
        onChange={(e) => {
          setJumlah(Number(e.target.value));
          setBerhasil(false);
          setPesan("");
        }}
        className="block w-32 rounded border border-slate-300 bg-white px-3 py-2 text-slate-800"
      />
      <p className="text-slate-800">
        Total: <b>{rupiah(menu.harga * (jumlah > 0 ? jumlah : 0))}</b>
      </p>
      {pesan && <p className="text-red-600">{pesan}</p>}
      {berhasil && <p className="text-green-700">Ditambahkan ke keranjang.</p>}
      <button className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">
        Tambah ke keranjang
      </button>
    </form>
  );
}

