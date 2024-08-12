import { authOptions } from "@/lib/auth";
import prisma from "@/lib/db";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { z } from "zod";

const reviewSchema = z.object({
  productId: z.string(),
  rating: z.coerce.number().min(1).max(5),
  title: z.string().min(2),
  content: z.string().min(5),
});

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json(
        { message: "ログインしてください" },
        { status: 401 }
      );
    }

    const body = await req.json();
    const result = reviewSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { message: "入力データが不十分です" },
        { status: 422 }
      );
    }

    const oldReview = await prisma.review.findFirst({
      where: {
        userId: session.user.id,
        productId: result.data.productId,
      },
    });

    if (oldReview) {
      return NextResponse.json(
        { message: "レビューは一つの商品につき一つ投稿できます" },
        { status: 409 }
      );
    }

    const review = await prisma.review.create({
      data: {
        userId: session.user.id,
        productId: result.data.productId,
        rating: result.data.rating,
        title: result.data.title,
        content: result.data.content,
      },
    });

    return NextResponse.json(review, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "エラーが発生しました" },
      { status: 500 }
    );
  }
}
