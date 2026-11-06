"use client";

import { useState } from "react";
import { rupiah } from "@/data/menu";

type Props = {
  subtotal: number;
  diskon: number;
  ongkir: number;
  total: number;
  caraAmbil: "Ambil sendiri" | "Diantar";
  onCaraAmbilChange: (val: "Ambil sendiri" | "Diantar") => void;
  onKirim: (nama: string, kelas: string) => void;
  onPakaiPromo: (kode: string) => string;
};

export default function FormCheckout({
  subtotal,
  diskon,
  ongkir,
  total,
  caraAmbil,
  onCaraAmbilChange,
  onKirim,
  onPakaiPromo,
}: Props) {
  const [kode, setKode] = useState("");
  const [pesanPromo, setPesanPromo] = useState("");
  const [nama, setNama] = useState("");
  const [kelas, setKelas] = useState("");
  const [galat, setGalat] = useState("");

  function submitPromo(e: React.FormEvent) {
    e.preventDefault();
    setPesanPromo(onPakaiPromo(kode));
  }

  function submitPesan(e: React.FormEvent) {
    e.preventDefault();
    if (nama.trim().length < 3) return setGalat("Nama pemesan minimal 3 huruf.");
    if (caraAmbil === "Diantar" && kelas.trim().length < 3)
      return setGalat("Kelas wajib minimal 3 karakter.");
    setGalat("");
    onKirim(nama.trim(), kelas.trim());
  }

  return (
    <div className="rounded-xl border bg-white p-4 text-sm shadow-sm">
      <div className="space-y-1 border-b pb-3">
        <p>Subtotal: {rupiah(subtotal)}</p>
        {diskon > 0 && <p className="text-green-600">Diskon: -{rupiah(diskon)}</p>}
        {caraAmbil === "Diantar" && <p>Ongkir: {rupiah(ongkir)}</p>}
        <p className="font-bold text-slate-900">Total: {rupiah(total)}</p>
      </div>

      <form onSubmit={submitPromo} className="my-3 border-b pb-3">
        <div className="flex gap-2">
          <input
            placeholder="Kode promo (HEMAT10)"
            value={kode}
            onChange={(e) => setKode(e.target.value)}
            className="w-full rounded border px-2 py-1 text-xs uppercase"
          />
          <button className="rounded bg-slate-800 px-3 py-1 text-xs text-white">Pakai</button>
        </div>
        {pesanPromo && (
          <p
            className={`mt-1 text-xs ${
              pesanPromo.startsWith("Promo HEMAT10 dipakai")
                ? "text-green-600"
                : "text-red-600"
            }`}
          >
            {pesanPromo}
          </p>
        )}
      </form>

      <form onSubmit={submitPesan} className="space-y-2">
        <div className="flex gap-3 text-xs">
          <label>
            <input
              type="radio"
              checked={caraAmbil === "Ambil sendiri"}
              onChange={() => onCaraAmbilChange("Ambil sendiri")}
            />{" "}
            Ambil sendiri
          </label>
          <label>
            <input
              type="radio"
              checked={caraAmbil === "Diantar"}
              onChange={() => onCaraAmbilChange("Diantar")}
            />{" "}
            Diantar (+2.000)
          </label>
        </div>

        <input
          placeholder="Nama pemesan"
          value={nama}
          onChange={(e) => setNama(e.target.value)}
          className="w-full rounded border px-2 py-1"
        />
        {caraAmbil === "Diantar" && (
          <input
            placeholder="Kelas (contoh: X PPLG 1)"
            value={kelas}
            onChange={(e) => setKelas(e.target.value)}
            className="w-full rounded border px-2 py-1"
          />
        )}
        {galat && <p className="text-xs text-red-600">{galat}</p>}
        <button className="w-full rounded bg-blue-600 py-1.5 font-medium text-white">
          Pesan sekarang
        </button>
      </form>
    </div>
  );
}

