import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/db";

export default async function getCurrentUser() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return null;
  }

  const currentUser = await prisma.user.findUnique({
    where: {
      id: session.user.id,
    },
    select: {
      id: true,
      email: true,
      username: true,
      isAdmin: true,
    },
  });

  if (!currentUser) {
    return null;
  }

  return currentUser;
}
