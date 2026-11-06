import Link from "next/link";

export default function MenuTidakDitemukan() {
  return (
    <div className="py-16 text-center">
      <h1 className="text-3xl font-bold text-slate-800">404 - Menu Tidak Ditemukan</h1>
      <p className="mt-3 text-slate-600">
        Menu yang kamu cari tidak tersedia atau mungkin sudah dihapus dari daftar kantin.
      </p>
      <div className="mt-6">
        <Link
          href="/menu"
          className="rounded-lg bg-blue-600 px-5 py-2.5 font-medium text-white hover:bg-blue-700 transition"
        >
          Kembali ke Katalog Menu
        </Link>
      </div>
    </div>
  );
}

