import React from "react";
import CartItem from "./components/CartItem";
import { getCart } from "@/actions/cart";
import { TbMoodEmpty } from "react-icons/tb";
import Link from "next/link";
import CheckoutButton from "./components/CheckoutButton";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export const metadata = {
  title: "ショッピングカート | Amser",
  description: "ショッピングカートページ",
};

const CartPage = async () => {
  const cart = await getCart();
  const session = await getServerSession(authOptions);

  if (!cart || !cart.items.length) {
    return (
      <div className="main-container flex h-screen w-full flex-col items-center justify-center gap-5 text-center font-sans text-base text-foreground md:text-xl">
        <div className="flex items-center justify-center gap-5 text-center text-3xl">
          <TbMoodEmpty className="text-5xl text-foreground md:text-8xl" />
          <p className="font-semibold">カートは空です</p>
        </div>
        <Link
          className="rounded border-2 px-5 py-3 font-semibold text-foreground"
          href={"/products?productType=watch"}
        >
          <h2 className="hover:underline">商品を探す→</h2>
        </Link>
      </div>
    );
  }

  const warning = !!cart.items.find(
    (item) => item.product.stock < item.quantity,
  );

  return (
    <div className="w-full bg-transparent pb-40 pt-16 font-sans text-foreground">
      <div className="main-container mt-14 md:px-[10vw] xl:px-0">
        <h1 className="text-center text-xl font-bold md:text-2xl lg:text-3xl">
          ショッピングカート
        </h1>
        <div className="relative mt-16 flex flex-col justify-center gap-12 lg:gap-6 xl:flex-row">
          <div className="flex w-full flex-col items-stretch px-3 xl:w-[62%]">
            {cart &&
              cart.items.map((item) => <CartItem key={item.id} item={item} />)}
          </div>
          <div className="sticky right-0 top-0 flex w-full flex-col justify-center gap-8 px-6 md:px-[10vw] xl:h-[80vh] xl:w-[38%] xl:px-0">
            <div className="flex flex-col gap-5 px-4">
              {warning && (
                <div className="mx-auto mb-5 mt-5 rounded-lg border-2 border-red/50 p-5 text-center text-sm font-medium text-red/90">
                  在庫数以上の商品が入っているか、もしくは在庫のない商品がカートに入っています。商品の数を減らすか商品を削除してください。
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-base lg:text-lg">送料：</span>
                <span className="text-base lg:text-lg">無料</span>
              </div>
              <div className="flex justify-between">
                <span className="text-lg font-bold lg:text-[1.375rem]">
                  合計：
                </span>
                <span className="font-mono text-lg font-bold lg:text-[1.375rem]">
                  ¥{cart?.subtotal?.toLocaleString()}
                </span>
              </div>
            </div>
            <div className="flex flex-col gap-3 md:gap-5">
              {!warning && <CheckoutButton cart={cart} session={session} />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
