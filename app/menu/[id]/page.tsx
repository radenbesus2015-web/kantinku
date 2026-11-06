import Link from "next/link";
import { notFound } from "next/navigation";
import { menu, rupiah } from "@/data/menu";
import FormPesan from "@/components/FormPesan";

export default async function DetailMenu({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const item = menu.find((m) => m.id === Number(id));

  if (!item) notFound();

  return (
    <article className="rounded-xl border bg-white p-6">
      <span className="rounded bg-blue-100 px-2 py-0.5 text-xs text-blue-700">
        {item.kategori}
      </span>
      <h1 className="mt-2 text-3xl font-bold text-slate-900">{item.nama}</h1>
      <p className="mt-4 text-xl font-semibold text-slate-900">{rupiah(item.harga)}</p>
      <p className="text-slate-600">
        {item.stok === 0 ? "Stok habis" : `Tersedia ${item.stok} porsi`}
      </p>

      <FormPesan menu={item} />

      <div className="mt-6 border-t pt-4">
        <Link href="/menu" className="text-blue-600 hover:underline">
          ← Kembali ke katalog
        </Link>
      </div>
    </article>
  );
}
