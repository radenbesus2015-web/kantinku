import Link from "next/link";
import { notFound } from "next/navigation";
import { menu, rupiah } from "@/data/menu";

export default async function DetailMenu({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const item = menu.find((m) => m.id === Number(id));

  if (!item) {
    notFound();
  }

  const habis = item.stok === 0;

  return (
    <article className="max-w-xl rounded-xl border bg-white p-6 shadow-sm">
      <span className="rounded bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-700">
        {item.kategori}
      </span>
      <h1 className="mt-3 text-3xl font-bold text-slate-900">{item.nama}</h1>
      <p className="mt-2 text-2xl font-semibold text-slate-800">{rupiah(item.harga)}</p>
      
      <div className="mt-4 border-t pt-4">
        <p className={`text-base ${habis ? "font-semibold text-red-600" : "text-slate-600"}`}>
          Status: {habis ? "Habis" : `Tersedia (${item.stok} porsi)`}
        </p>
      </div>

      <div className="mt-6 flex items-center gap-4">
        <Link
          href="/menu"
          className="rounded border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 transition"
        >
          ← Kembali ke Menu
        </Link>
      </div>
    </article>
  );
}

