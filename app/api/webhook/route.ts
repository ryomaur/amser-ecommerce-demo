import Stripe from "stripe";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

import { stripe } from "@/lib/stripe";
import prisma from "@/lib/db";

export async function POST(req: Request) {
  const body = await req.text();
  const signature = headers().get("Stripe-Signature") as string;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (error: any) {
    return NextResponse.json(
      { message: `Webhook Error: ${error.message}` },
      { status: 400 }
    );
  }

  const session = event.data.object as Stripe.Checkout.Session;

  if (event.type === "checkout.session.completed") {
    await prisma.order.update({
      where: {
        id: session?.metadata?.orderId,
      },
      data: {
        status: "支払い済み",
      },
    });

    return NextResponse.json({ status: 200 });
  } else if (event.type === "checkout.session.expired") {
    const order = await prisma.order.update({
      where: {
        id: session?.metadata?.orderId,
      },
      data: {
        status: "キャンセル",
      },
      include: {
        orderItems: true,
      },
    });

    order.orderItems.forEach(async (item) => {
      await prisma.product.update({
        where: {
          id: item.productId,
        },
        data: {
          stock: {
            increment: item.quantity,
          },
        },
      });
    });

    return NextResponse.json({ status: 200 });
  }
}
