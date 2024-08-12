import { authOptions } from "@/lib/auth";
import prisma from "@/lib/db";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { boolean, z } from "zod";

const watchSchema = z.object({
  name: z.string().min(1, { message: "商品名を入力してください" }),
  description: z.string().min(1, { message: "商品の概要を入力してください" }),
  mainImage: z
    .string()
    .trim()
    .url({ message: "メインになる画像をアップロードしてください" }),
  image: z
    .string()
    .trim()
    .url({ message: "詳細の商品画像をアップロードしてください" }),
  price: z.coerce.number().min(0, { message: "商品の値段を設定してください" }),
  stock: z.coerce.number().min(0, { message: "商品の在庫を入力してください" }),
  movement: z.string().min(1, {
    message: "ムーブメントを選択してください",
  }),
  movement_ja: z.string().min(1, {
    message: "ムーブメントを選択してください",
  }),
  caseType: z.string().min(1, {
    message: "ケースの種類を選択してください",
  }),
  caseType_ja: z.string().min(1, {
    message: "ケースの種類を選択してください",
  }),
  caseWidth: z.coerce.number().positive(),
  caseLength: z.coerce.number().positive(),
  caseThickness: z.coerce.number().positive(),
  waterResistance: z.coerce.number().positive(),
  weight: z.coerce.number().positive(),
  caseColor: z.string().min(1, { message: "ケースの色を選択してください" }),
  caseColor_ja: z.string().min(1, { message: "ケースの色を選択してください" }),
  faceColor: z.string().min(1, { message: "文字盤の色を選択してください" }),
  faceColor_ja: z.string().min(1, { message: "文字盤の色を選択してください" }),
  bandType: z.string().min(1, { message: "バンドの種類を選択してください" }),
  bandType_ja: z.string().min(1, { message: "バンドの種類を選択してください" }),
  isHidden: boolean(),
});

export async function PATCH(
  req: Request,
  { params }: { params: { productId: string } }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json(
        { message: "認証されていません" },
        { status: 401 }
      );
    }

    const currentUser = await prisma.user.findUnique({
      where: {
        id: session.user.id,
      },
    });

    if (!currentUser) {
      return NextResponse.json(
        { message: "認証されていません" },
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
    const result = watchSchema.safeParse(body);
    let zodErrors = {};

    if (!result.success) {
      result.error.issues.forEach((issue) => {
        zodErrors = { ...zodErrors, [issue.path[0]]: issue.message };
      });

      return NextResponse.json({ errors: zodErrors }, { status: 422 });
    }

    const updatedProduct = await prisma.product.update({
      where: {
        id: params.productId,
      },
      data: {
        name: result.data.name,
        description: result.data.description,
        productType: "watch",
        mainImage: result.data.mainImage,
        image: result.data.image,
        price: result.data.price,
        stock: result.data.stock,
        movement: result.data.movement,
        movement_ja: result.data.movement_ja,
        caseType: result.data.caseType,
        caseType_ja: result.data.caseType_ja,
        caseColor: result.data.caseColor,
        caseColor_ja: result.data.caseColor_ja,
        caseWidth: result.data.caseWidth,
        caseLength: result.data.caseLength,
        caseThickness: result.data.caseThickness,
        waterResistance: result.data.waterResistance,
        faceColor: result.data.faceColor,
        faceColor_ja: result.data.faceColor_ja,
        bandType: result.data.bandType,
        bandType_ja: result.data.bandType_ja,
        weight: result.data.weight,
        isHidden: result.data.isHidden,
      },
    });

    return NextResponse.json(updatedProduct, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "エラーが発生しました" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  _req: Request,
  { params }: { params: { productId: string } }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json(
        { message: "認証されていません" },
        { status: 401 }
      );
    }

    const currentUser = await prisma.user.findUnique({
      where: {
        id: session.user.id,
      },
    });

    if (!currentUser) {
      return NextResponse.json(
        { message: "認証されていません" },
        { status: 401 }
      );
    }

    if (!currentUser.isAdmin) {
      return NextResponse.json(
        { message: "管理者権限がありません" },
        { status: 403 }
      );
    }

    const product = await prisma.product.deleteMany({
      where: {
        id: params.productId,
      },
    });

    return NextResponse.json(product, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "エラーが発生しました" },
      { status: 500 }
    );
  }
}
