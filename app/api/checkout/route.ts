import Stripe from "stripe";
import { NextResponse } from "next/server";

import { stripe } from "@/lib/stripe";
import prisma from "@/lib/db";
import { CartItemWithProduct } from "@/actions/cart";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json(
        { message: "認証されていません" },
        { status: 401 },
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
        { status: 401 },
      );
    }

    const body = await req.json();

    const items: CartItemWithProduct[] = body.items;

    if (!items || items.length === 0) {
      return new NextResponse("購入する商品が必要です", { status: 400 });
    }

    const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] = [];

    items.forEach(async (item) => {
      const product = await prisma.product.findUnique({
        where: {
          id: item.productId,
        },
      });

      if (!product) {
        return NextResponse.json(
          { message: "商品が見つかりません" },
          { status: 404 },
        );
      }

      if (product.stock < item.quantity) {
        return NextResponse.json(
          { message: "商品の在庫がありません" },
          { status: 400 },
        );
      }

      line_items.push({
        quantity: item.quantity,
        price_data: {
          currency: "JPY",
          product_data: {
            name: product.name,
          },
          unit_amount: product.price,
        },
      });
    });

    items.forEach(async (item) => {
      await prisma.product.update({
        where: {
          id: item.productId,
        },
        data: {
          stock: {
            decrement: item.quantity,
          },
        },
      });
    });

    const totalPrice = items.reduce(
      (acc, item) => acc + item.product.price * item.quantity,
      0,
    );

    const order = await prisma.order.create({
      data: {
        userId: currentUser.id,
        status: "保留中",
        orderItems: {
          create: items.map((item) => ({
            productId: item.product.id,
            price: item.product.price,
            quantity: item.quantity,
          })),
        },
        totalPrice,
      },
    });

    const stripeSession = await stripe.checkout.sessions.create({
      line_items,
      mode: "payment",
      expires_at: Math.floor(Date.now() / 1000) + 1800,
      billing_address_collection: "required",
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/checkout/success`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/checkout/canceled`,
      metadata: {
        orderId: order.id,
      },
    });

    await prisma.cart.delete({
      where: {
        id: body.id,
      },
    });

    return NextResponse.json({
      url: stripeSession.url,
    });
  } catch (error) {
    return NextResponse.json(
      { message: "エラーが発生しました" },
      { status: 500 },
    );
  }
}
