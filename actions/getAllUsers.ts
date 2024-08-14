import prisma from "@/lib/db";
import { revalidatePath } from "next/cache";

export default async function getAllUsers() {
  const users = await prisma.user.findMany();

  revalidatePath("/admin/users");
  return users;
}
