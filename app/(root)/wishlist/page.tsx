import { getWishlist } from "@/actions/wishlist";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React from "react";
import WishlistItem from "./components/WishlistItem";
import { TbMoodEmpty } from "react-icons/tb";
import Link from "next/link";

export const metadata = {
  title: "ウィッシュリスト | Amser",
  description: "ウィッシュリストページ",
};

const WishlistPage = async () => {
  const session = await getServerSession(authOptions);
  const wishlist = await getWishlist();

  if (session) {
    if (wishlist?.userId === session.user.id) {
      redirect(`/wishlist/${wishlist.id}`);
    }
  }

  if (!wishlist) {
    return (
      <div className="main-container flex h-screen w-full flex-col items-center justify-center gap-5 text-center font-sans text-foreground">
        <div className="flex flex-col items-center justify-center gap-5 px-8 text-center text-xl md:flex-row md:text-3xl">
          <TbMoodEmpty className="text-8xl text-foreground" />
          <p className="font-semibold">
            ウィッシュリストに
            <br className="md:hidden" />
            商品がありません
          </p>
        </div>
        <Link
          className="rounded border-2 px-5 py-3 text-base font-semibold text-foreground md:text-xl"
          href={"/products?productType=watch"}
        >
          商品を探す→
        </Link>
      </div>
    );
  }

  return (
    <div className="main-container mb-36 mt-14 px-4 font-sans text-foreground md:min-h-[50vh] md:px-8 xl:px-0">
      <div className="w-full pt-8 md:pt-16">
        <h1 className="text-center text-xl font-bold md:text-2xl xl:text-3xl">
          ウィッシュリスト
        </h1>
        <div className="mt-12 grid grid-cols-1 gap-8 md:mt-16 md:grid-cols-2 xl:gap-12">
          {wishlist.wishlistItems.map((item) => (
            <WishlistItem key={item.id} product={item.product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default WishlistPage;
