import Link from "next/link";

export default function Beranda() {
  return (
    <div className="py-16 text-center">
      <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
        Selamat Datang di KantinKu
      </h1>
      <p className="mt-4 text-lg text-slate-600">
        Pesan makanan dan minuman favoritmu tanpa perlu antre di kantin sekolah!
      </p>
      <div className="mt-8">
        <Link
          href="/menu"
          className="inline-block rounded-lg bg-blue-600 px-6 py-3 font-medium text-white shadow-sm hover:bg-blue-700 transition"
        >
          Lihat Menu Sekarang
        </Link>
      </div>
    </div>
  );
}
