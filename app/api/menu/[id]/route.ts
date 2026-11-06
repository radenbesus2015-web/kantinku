import { menu } from "@/data/menu";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const item = menu.find((m) => m.id === Number(id));

  if (!item) {
    return Response.json({ pesan: "Menu tidak ditemukan" }, { status: 404 });
  }

  return Response.json(item);
}

