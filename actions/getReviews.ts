import prisma from "@/lib/db";
import { Prisma } from "@prisma/client";

export type ReviewWithUsername = Prisma.ReviewGetPayload<{
  include: {
    user: {
      select: {
        username: true;
      };
    };
  };
}>;

export default async function getReviews(
  productId: string,
  currentPage: number,
  pageSize: number
) {
  const result = await prisma.$transaction([
    prisma.review.count({
      where: {
        productId,
      },
    }),
    prisma.review.findMany({
      where: {
        productId,
      },
      include: {
        user: {
          select: {
            username: true,
          },
        },
      },
      orderBy: { updatedAt: "desc" },
      skip: (currentPage - 1) * pageSize,
      take: pageSize,
    }),
  ]);

  const totalCount = result[0];
  const reviews = result[1];

  return {
    totalCount,
    reviews,
  };
}
