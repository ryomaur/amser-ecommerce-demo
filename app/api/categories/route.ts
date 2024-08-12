import prisma from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(_req: Request) {
  try {
    const movements = await prisma.movement.findMany();
    const caseTypes = await prisma.caseType.findMany();
    const caseColors = await prisma.caseColor.findMany();
    const faceColors = await prisma.faceColor.findMany();
    const bandTypes = await prisma.bandType.findMany();

    return NextResponse.json({
      movements,
      caseTypes,
      caseColors,
      faceColors,
      bandTypes,
    });
  } catch (error) {
    return NextResponse.json(
      { message: "エラーが発生しました" },
      { status: 500 }
    );
  }
}
