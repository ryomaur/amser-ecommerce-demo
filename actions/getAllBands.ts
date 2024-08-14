import prisma from "@/lib/db";
import { revalidatePath } from "next/cache";

export default async function getAllBands() {
  const bands = await prisma.product.findMany({
    where: {
      productType: "band",
    },
  });

  revalidatePath("/admin/bands");
  return bands;
}
