import { authOptions } from "@/lib/auth";
import prisma from "@/lib/db";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { boolean, z } from "zod";

const bandSchema = z.object({
  name: z.string().min(1, { message: "商品名を入力してください" }),
  description: z.string().min(1, { message: "商品の概要を入力してください" }),
  mainImage: z
    .string()
    .trim()
    .url({ message: "メインになる画像をアップロードしてください" }),
  price: z.coerce.number().min(0, { message: "商品の値段を設定してください" }),
  stock: z.coerce.number().min(0, { message: "商品の在庫を入力してください" }),
  bandType: z.string().min(1, { message: "バンドの種類を選択してください" }),
  bandType_ja: z.string().min(1),
  isHidden: boolean(),
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

    const result = bandSchema.safeParse(body);
    let zodErrors = {};

    if (!result.success) {
      result.error.issues.forEach((issue) => {
        zodErrors = { ...zodErrors, [issue.path[0]]: issue.message };
      });

      return NextResponse.json({ errors: zodErrors }, { status: 422 });
    }

    const product = await prisma.product.create({
      data: {
        name: result.data.name,
        description: result.data.description,
        productType: "band",
        mainImage: result.data.mainImage,
        price: result.data.price,
        stock: result.data.stock,
        bandType: result.data.bandType,
        bandType_ja: result.data.bandType_ja,
        isHidden: result.data.isHidden,
      },
    });

    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "エラーが発生しました" },
      { status: 500 }
    );
  }
}
