"use client";

import { LuHeart, LuShoppingBag } from "react-icons/lu";
import UserButton from "./UserButton";
import Link from "next/link";
import { ShoppingCart } from "@/actions/cart";
import { CgMenuRight, CgShoppingBag } from "react-icons/cg";
import { useState } from "react";
import { IoClose } from "react-icons/io5";
import { signOut } from "next-auth/react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

interface NavbarButtonsProps {
  user: {
    id: string;
    username: string | null;
    email: string | null;
    isAdmin: boolean;
  } | null;
  cart: ShoppingCart | null;
}

const NavbarButtons: React.FC<NavbarButtonsProps> = ({ user, cart }) => {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);

  const cartSize = cart?.size ?? 0;
  return (
    <>
      <div className="w-[17.313rem] lg:flex justify-end items-center gap-7 hidden">
        <Link href={"/cart"} className="relative">
          <LuShoppingBag
            size={22}
            strokeWidth={1.5}
            className="hover:opacity-70 cursor-pointer text-foreground"
          />
          {cartSize > 0 && (
            <div className="h-[1.125rem] w-[1.125rem] absolute top-[-10px] right-[-10px] bg-red rounded-full text-background flex items-center justify-center text-[11px] font-bold font-mono">
              {cart?.size}
            </div>
          )}
        </Link>
        <Link href={"/wishlist"}>
          <LuHeart
            strokeWidth={1.5}
            size={22}
            className="hover:opacity-70 cursor-pointer text-foreground"
          />
        </Link>
        <UserButton user={user} />
      </div>

      <div className="flex justify-end items-center gap-4 lg:hidden">
        <Link href={"/cart"} className="relative">
          <CgShoppingBag
            size={22}
            className="hover:opacity-70 cursor-pointer text-background"
          />
          {cartSize > 0 && (
            <div className="h-[0.938rem] w-[0.938rem] absolute top-[-0.438rem] right-[-0.438rem] bg-red rounded-full text-background flex items-center justify-center text-[0.625rem] font-bold font-mono">
              {cart?.size}
            </div>
          )}
        </Link>

        <button
          onClick={() => setMenuOpen(true)}
          className="flex justify-center items-center"
        >
          <CgMenuRight size={25} className="text-background" />
        </button>
      </div>

      <div
        className={
          menuOpen
            ? "fixed top-0 left-0 w-full h-screen bg-bglighter z-[99] ease-in duration-300 text-foreground p-6 md:p-8 overflow-y-scroll "
            : "fixed top-0 left-[-100%] w-full h-screen bg-bglighter z-[99] ease-in duration-300 text-foreground p-6 md:p-8"
        }
      >
        <div className="w-full flex justify-end items-center">
          <button onClick={() => setMenuOpen(false)}>
            <IoClose size={32} />
          </button>
        </div>

        <div className="w-full mt-5">
          <nav>
            <ul className="flex flex-col font-bold gap-2 sm:gap-3 md:gap-5 text-lg sm:text-xl md:text-2xl px-5 py-5">
              <li>
                <Link
                  href={"/products?productType=watch"}
                  onClick={() => setMenuOpen((prev) => !prev)}
                >
                  ウォッチ
                </Link>
              </li>
              <li>
                <Link
                  href={"/products?productType=band"}
                  onClick={() => setMenuOpen((prev) => !prev)}
                >
                  バンド
                </Link>
              </li>
              <li>
                <Link
                  href={"/about"}
                  onClick={() => setMenuOpen((prev) => !prev)}
                >
                  ブランドについて
                </Link>
              </li>
              <li>
                <Link
                  href={"/support"}
                  onClick={() => setMenuOpen((prev) => !prev)}
                >
                  サポート
                </Link>
              </li>
            </ul>
          </nav>

          <div className="p-5">
            <div className="mt-5 md:mt-8 flex flex-col gap-2 sm:gap-3 md:gap-5 text-foreground text-base sm:text-lg md:text-xl font-bold">
              {user ? (
                <>
                  <Link
                    href={"/wishlist"}
                    onClick={() => setMenuOpen((prev) => !prev)}
                  >
                    <h2>ウィッシュリスト</h2>
                  </Link>
                  {user.isAdmin && (
                    <Link
                      href={"/admin"}
                      onClick={() => setMenuOpen((prev) => !prev)}
                    >
                      <h2>管理者ページ</h2>
                    </Link>
                  )}
                  <Link
                    href={"/user"}
                    onClick={() => setMenuOpen((prev) => !prev)}
                  >
                    <h2>マイアカウント</h2>
                  </Link>
                  <div>
                    <button
                      onClick={() => {
                        signOut();
                        router.push("/");
                        router.refresh();
                        setMenuOpen((prev) => !prev);
                        toast.success("ログアウトしました");
                      }}
                    >
                      <h2>ログアウト</h2>
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <Link
                    href={"/wishlist"}
                    onClick={() => setMenuOpen((prev) => !prev)}
                  >
                    <h2>ウィッシュリスト</h2>
                  </Link>
                  <Link
                    href={"/login"}
                    onClick={() => setMenuOpen((prev) => !prev)}
                  >
                    <h2>ログイン</h2>
                  </Link>
                  <Link
                    href={"/register"}
                    onClick={() => setMenuOpen((prev) => !prev)}
                  >
                    <h2>新規登録</h2>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NavbarButtons;
