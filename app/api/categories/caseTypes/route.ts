import { authOptions } from "@/lib/auth";
import prisma from "@/lib/db";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { z } from "zod";

const caseTypeSchema = z.object({
  value: z.string().min(1, {
    message: "ケースの種類のデータ上の名前を入力してください",
  }),
  name_ja: z
    .string()
    .min(1, { message: "ケースの種類の日本語の表示名を入力してください" }),
  caseWidth: z.coerce
    .number()
    .min(1, { message: "ケースの幅を入力してください" }),
  caseLength: z.coerce
    .number()
    .min(1, { message: "ケースの長さを入力してください" }),
  caseThickness: z.coerce
    .number()
    .min(1, { message: "ケースの厚さを入力してください" }),
  waterResistance: z.coerce
    .number()
    .min(1, { message: "推進何メートルまで防水性のがあるか入力してください" }),
  weight: z.coerce
    .number()
    .min(1, { message: "ケースの重さを入力してください" }),
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
    const result = caseTypeSchema.safeParse(body);
    let zodErrors = {};

    if (!result.success) {
      result.error.issues.forEach((issue) => {
        zodErrors = { ...zodErrors, [issue.path[0]]: issue.message };
      });

      return NextResponse.json({ errors: zodErrors }, { status: 422 });
    }

    const existingCaseType = await prisma.caseType.findFirst({
      where: {
        OR: [{ value: result.data.value }, { name_ja: result.data.name_ja }],
      },
    });

    if (existingCaseType) {
      return NextResponse.json(
        { message: "すでにこのケースの種類は存在しています" },
        { status: 409 }
      );
    }

    const caseType = await prisma.caseType.create({
      data: {
        value: result.data.value,
        name_ja: result.data.name_ja,
        caseWidth: result.data.caseWidth,
        caseLength: result.data.caseLength,
        caseThickness: result.data.caseThickness,
        waterResistance: result.data.waterResistance,
        weight: result.data.weight,
      },
    });

    return NextResponse.json(caseType, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "エラーが発生しました" },
      { status: 500 }
    );
  }
}
