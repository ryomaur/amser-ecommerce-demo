import prisma from "@/lib/db";
import { NextResponse } from "next/server";
import { z } from "zod";
import bcrypt from "bcryptjs";

const registerSchema = z.object({
  email: z.string().email({ message: "メールアドレスの形式ではありません" }),
  username: z
    .string()
    .min(2, { message: "表示名は2文字以上入力する必要があります" }),
  password: z
    .string()
    .min(6, { message: "パスワードは最低6文字以上入力する必要があります" }),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const result = registerSchema.safeParse(body);
    let zodErrors = {};

    if (!result.success) {
      result.error.issues.forEach((issue) => {
        zodErrors = { ...zodErrors, [issue.path[0]]: issue.message };
      });

      return NextResponse.json({ errors: zodErrors }, { status: 422 });
    }

    const existingEmail = await prisma.user.findUnique({
      where: {
        email: result.data.email,
      },
    });

    if (existingEmail) {
      return NextResponse.json(
        { message: "このメールアドレスはすでに使用されています" },
        { status: 409 }
      );
    }

    const hashedPassword = await bcrypt.hash(result.data.password, 10);

    const user = await prisma.user.create({
      data: {
        email: result.data.email,
        username: result.data.username,
        hashedPassword,
      },
    });

    return NextResponse.json(user, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 });
  }
}
