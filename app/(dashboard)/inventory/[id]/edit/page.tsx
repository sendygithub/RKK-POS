import { prisma } from "@/lib/prisma";
import EditForm from "@/app/(dashboard)/inventory/[id]/edit/editForm";

export default async function Page({ params }: { params: { id: string } }) {
  const product = await prisma.product.findUnique({
    where: { id: Number(params.id) },
  });

  if (!product) {
    return <div>Product tidak ditemukan</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Edit Product</h1>
      <EditForm product={product} />
    </div>
  );
}
