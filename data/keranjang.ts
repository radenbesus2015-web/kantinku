export type ItemKeranjang = {
  id: number;
  jumlah: number;
};

export function getKeranjang(): ItemKeranjang[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem("keranjang") ?? "[]");
  } catch {
    return [];
  }
}

export function saveKeranjang(items: ItemKeranjang[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem("keranjang", JSON.stringify(items));
  window.dispatchEvent(new Event("keranjang-berubah"));
}

export type ItemPesananRingkas = {
  nama: string;
  jumlah: number;
  subtotal: number;
};

export type PesananRiwayat = {
  id: string;
  tanggal: string;
  nama: string;
  caraAmbil: "Ambil sendiri" | "Diantar";
  kelas?: string;
  items: ItemPesananRingkas[];
  subtotal: number;
  diskon: number;
  ongkir: number;
  total: number;
};

export function getRiwayat(): PesananRiwayat[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem("riwayat") ?? "[]");
  } catch {
    return [];
  }
}

export function saveRiwayat(pesananBaru: PesananRiwayat) {
  if (typeof window === "undefined") return;
  const daftar = getRiwayat();
  daftar.unshift(pesananBaru);
  localStorage.setItem("riwayat", JSON.stringify(daftar));
}

