import { authOptions } from "@/lib/auth";
import prisma from "@/lib/db";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { z } from "zod";

const faceColorSchema = z.object({
  value: z.string().min(1, {
    message: "文字盤の色のデータ上の名前を入力してください",
  }),
  name_ja: z.string().min(1, {
    message: "文字盤の色の日本語の表示名を入力してください",
  }),
  hexValue: z.string().regex(/^#[0-9a-fA-F]{3}$|^#[0-9a-fA-F]{6}$/, {
    message: "16進数カラーコードを入力してください",
  }),
});

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json(
        { message: "認証されていません" },
        { status: 401 }
      );
    }

    const currentUser = await prisma.user.findFirst({
      where: {
        id: session.user.id,
      },
    });

    if (!currentUser) {
      return NextResponse.json(
        {
          message: "認証されていません。ログインしてください",
        },
        { status: 401 }
      );
    }

    if (!currentUser.isAdmin) {
      return NextResponse.json(
        { message: "管理者権限がありません" },
        { status: 403 }
      );
    }

    const body = await req.json();
    const result = faceColorSchema.safeParse(body);
    let zodErrors = {};

    if (!result.success) {
      result.error.issues.forEach((issue) => {
        zodErrors = { ...zodErrors, [issue.path[0]]: issue.message };
      });

      return NextResponse.json({ errors: zodErrors }, { status: 422 });
    }

    const existingFaceColor = await prisma.faceColor.findFirst({
      where: {
        OR: [
          { value: result.data.value },
          { name_ja: result.data.name_ja },
          { hexValue: result.data.hexValue },
        ],
      },
    });

    if (existingFaceColor) {
      return NextResponse.json(
        { message: "すでにこの文字盤の色は存在しています" },
        { status: 409 }
      );
    }

    const faceColor = await prisma.faceColor.create({
      data: {
        value: result.data.value,
        name_ja: result.data.name_ja,
        hexValue: result.data.hexValue,
      },
    });

    return NextResponse.json(faceColor, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "エラーが発生しました" },
      { status: 500 }
    );
  }
}
