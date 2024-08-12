import prisma from "@/lib/db";

export default async function getAllBands() {
  const bands = await prisma.product.findMany({
    where: {
      productType: "band",
    },
  });
  return bands;
}
