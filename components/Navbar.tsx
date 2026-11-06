"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { getKeranjang } from "@/data/keranjang";

const daftarMenu = [
  { href: "/", teks: "Beranda" },
  { href: "/menu", teks: "Menu" },
  { href: "/favorit", teks: "Favorit" },
  { href: "/keranjang", teks: "Keranjang" },
  { href: "/riwayat", teks: "Riwayat" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [jumlahKeranjang, setJumlahKeranjang] = useState(0);

  useEffect(() => {
    function hitung() {
      const items = getKeranjang();
      const total = items.reduce((acc, item) => acc + item.jumlah, 0);
      setJumlahKeranjang(total);
    }

    hitung();
    window.addEventListener("keranjang-berubah", hitung);
    return () => {
      window.removeEventListener("keranjang-berubah", hitung);
    };
  }, []);

  return (
    <nav className="flex items-center gap-6 border-b bg-white px-6 py-3">
      <Link href="/" className="text-lg font-bold text-blue-600">
        KantinKu
      </Link>
      <div className="flex gap-4">
        {daftarMenu.map((m) => {
          const aktif = pathname === m.href;
          const label =
            m.href === "/keranjang" && jumlahKeranjang > 0
              ? `Keranjang (${jumlahKeranjang})`
              : m.teks;

          return (
            <Link
              key={m.href}
              href={m.href}
              className={
                aktif
                  ? "font-semibold text-blue-600"
                  : "text-slate-600 hover:text-blue-600"
              }
            >
              {label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
