import prisma from "@/lib/db";

export default async function getAllWatches() {
  const watches = await prisma.product.findMany({
    where: {
      productType: "watch",
    },
  });
  return watches;
}
