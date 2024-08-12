import { authOptions } from "@/lib/auth";
import prisma from "@/lib/db";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { z } from "zod";

const reviewSchema = z.object({
  rating: z.coerce.number().min(1).max(5),
  title: z.string().min(2),
  content: z.string().min(5),
});

export async function PATCH(
  req: Request,
  { params }: { params: { reviewId: string } }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json(
        { message: "ログインしてください" },
        { status: 401 }
      );
    }

    const review = await prisma.review.findUnique({
      where: { id: params.reviewId },
    });

    if (!review) {
      return NextResponse.json(
        { message: "レビューが見つかりませんでした" },
        { status: 404 }
      );
    }

    if (review.userId !== session.user.id) {
      return NextResponse.json(
        { message: "レビューの編集権限がありません" },
        { status: 403 }
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

    const updatedReview = await prisma.review.update({
      where: {
        id: params.reviewId,
      },
      data: {
        rating: result.data.rating,
        title: result.data.title,
        content: result.data.content,
        isEdited: true,
      },
    });

    return NextResponse.json(updatedReview, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "エラーが発生しました" },
      { status: 500 }
    );
  }
}
