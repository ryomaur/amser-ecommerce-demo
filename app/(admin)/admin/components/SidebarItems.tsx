"use client";

import { signOut } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import toast from "react-hot-toast";
import { LuLogOut } from "react-icons/lu";
import { MdSpaceDashboard } from "react-icons/md";
import { useRouter } from "next/navigation";
import React, { Dispatch, SetStateAction } from "react";

interface SidebarItemsProps {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

const SidebarItems: React.FC<SidebarItemsProps> = ({ setIsOpen }) => {
  const pathname = usePathname();
  const router = useRouter();

  const routes = [
    {
      href: "/admin/watches",
      label: "時計",
      active: pathname.includes("/admin/watches"),
    },
    {
      href: "/admin/bands",
      label: "バンド",
      active: pathname.includes("/admin/bands"),
    },
    {
      href: "/admin/categories",
      label: "カテゴリー",
      active: pathname.includes("/admin/categories"),
    },
    {
      href: "/admin/users",
      label: "ユーザー",
      active: pathname.includes("/admin/users"),
    },
    {
      href: "/admin/orders",
      label: "注文",
      active: pathname.includes("/admin/orders"),
    },
  ];

  return (
    <div className="mt-10 flex h-full flex-col px-8">
      <div className="border-b-2 border-neutral-300 py-3">
        <button
          onClick={() => {
            setIsOpen(false);
            router.push("/admin");
            router.refresh();
          }}
          className={` ${
            pathname === "/admin"
              ? "flex items-center gap-5 rounded-lg bg-foreground/5 px-3 py-2 text-sm font-bold"
              : "flex items-center gap-5 rounded-lg px-3 py-2 text-sm font-medium text-foreground hover:bg-foreground/10"
          } `}
        >
          <MdSpaceDashboard size={16} />
          ダッシュボード
        </button>
      </div>

      <div className="mt-7 flex h-full flex-grow flex-col justify-between">
        <div className="mt-5 flex flex-col gap-3">
          {routes.map((route) => (
            <button
              onClick={() => {
                setIsOpen(false);
                router.push(route.href);
                router.refresh();
              }}
              className={`text-left ${
                route.active
                  ? "rounded-lg bg-foreground/5 px-5 py-2 text-sm font-bold"
                  : "rounded-lg px-5 py-2 text-sm font-medium text-foreground hover:bg-foreground/10"
              } `}
              key={route.href}
            >
              {route.label}
            </button>
          ))}
        </div>

        <div className="w-full">
          <button
            className="mb-3 flex w-full items-center justify-center gap-3 rounded-lg px-3 py-2 text-sm font-semibold text-foreground hover:bg-foreground/10"
            onClick={() => {
              signOut();
              router.push("/");
              router.refresh();
              toast.success("ログアウトしました");
            }}
          >
            <LuLogOut size={20} />
            ログアウト
          </button>
        </div>
      </div>
    </div>
  );
};

export default SidebarItems;
