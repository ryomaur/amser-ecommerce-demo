import prisma from "@/lib/db";
import { revalidatePath } from "next/cache";

export default async function getAllWatches() {
  const watches = await prisma.product.findMany({
    where: {
      productType: "watch",
    },
  });

  revalidatePath("/admin/watches");
  return watches;
}
