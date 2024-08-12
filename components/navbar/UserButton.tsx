"use client";

import { Menu, Transition } from "@headlessui/react";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { Fragment } from "react";
import toast from "react-hot-toast";
import {
  LuLogIn,
  LuLogOut,
  LuPenSquare,
  LuUser,
  LuUserCog,
} from "react-icons/lu";
import { MdAdminPanelSettings } from "react-icons/md";
import { useRouter } from "next/navigation";

interface UserButtonProps {
  user: {
    id: string;
    email: string | null;
    username: string | null;
    isAdmin: boolean;
  } | null;
}

const UserButton: React.FC<UserButtonProps> = ({ user }) => {
  const router = useRouter();
  return (
    <Menu as={"div"} className={"relative"}>
      <Menu.Button className={"flex items-center justify-center"}>
        <LuUser
          strokeWidth={1.5}
          size={22}
          className="hover:opacity-70 cursor-pointer text-foreground"
        />
      </Menu.Button>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-200"
        enterFrom="transform opacity-0 scale-75"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="tranform opacity-100 scale-100"
        leaveTo="tranform opacity-0 scale-75"
      >
        <Menu.Items
          className={
            "absolute right-0 origin-top-right w-52 mt-5 scale divide-y ring-2 ring-black/5 py-1 px-1 flex flex-col bg-bglighter font-medium shadow-md rounded-md"
          }
        >
          {user?.isAdmin && (
            <Menu.Item>
              <Link
                href={"/admin"}
                className="px-3 py-3 text-sm flex items-center gap-4"
              >
                <MdAdminPanelSettings size={20} />
                管理者ページ
              </Link>
            </Menu.Item>
          )}
          {user ? (
            <>
              <Menu.Item>
                <Link
                  href={"/user"}
                  className="px-3 py-3 text-sm flex items-center gap-4"
                >
                  <LuUserCog size={20} />
                  マイアカウント
                </Link>
              </Menu.Item>
              <Menu.Item>
                <button
                  className="px-3 py-3 text-sm flex items-center gap-4"
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
              </Menu.Item>
            </>
          ) : (
            <>
              <Menu.Item>
                <Link
                  href={"/login"}
                  className="px-3 py-3 text-sm flex items-center gap-4"
                >
                  <LuLogIn size={20} />
                  ログイン
                </Link>
              </Menu.Item>
              <Menu.Item>
                <Link
                  href={"/register"}
                  className="px-3 py-3 text-sm flex items-center gap-4"
                >
                  <LuPenSquare size={20} />
                  新規登録
                </Link>
              </Menu.Item>
            </>
          )}
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default UserButton;
