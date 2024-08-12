"use client";

import { Tab } from "@headlessui/react";
import { LuPackage, LuUser } from "react-icons/lu";
import OrderHistoryCard from "./OrderHistoryCard";
import { OrderWithProducts } from "@/actions/getUserOrders";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

interface UserDetailProps {
  user: {
    id: string;
    username: string | null;
    email: string | null;
  };
  orders: OrderWithProducts[] | null;
}

const UserInfo: React.FC<UserDetailProps> = ({ user, orders }) => {
  const router = useRouter();
  return (
    <section className="pb-28 pt-10 font-sans text-foreground md:px-8 xl:px-0 xl:pb-40 xl:pt-16">
      <h1 className="text-center text-xl font-bold md:text-2xl xl:text-left xl:text-3xl">
        マイアカウント
      </h1>
      <div className="mt-10 flex flex-col gap-8 xl:flex-row xl:gap-14">
        <Tab.Group>
          <Tab.List className="flex flex-row justify-center gap-3 px-4 text-sm md:px-0 md:text-base xl:flex-col xl:justify-start xl:pt-5">
            <Tab
              className={
                "flex w-52 items-center justify-center gap-3 rounded-lg px-5 py-3 outline-none ui-selected:bg-foreground ui-selected:text-background md:justify-start md:gap-5"
              }
            >
              <LuUser className="text-lg md:text-2xl" />
              <h3 className="font-medium">プロフィール</h3>
            </Tab>
            <Tab
              className={
                "flex w-52 items-center justify-center gap-3 rounded-lg px-5 py-3 outline-none ui-selected:bg-foreground ui-selected:text-background md:justify-start md:gap-5"
              }
            >
              <LuPackage className="text-lg md:text-2xl" />
              <h3 className="font-medium">注文履歴</h3>
            </Tab>
          </Tab.List>
          <Tab.Panels className="mx-auto w-full max-w-lg rounded-lg bg-bglighter py-16 md:max-w-none md:p-8 md:py-12 lg:p-16 xl:mx-0">
            <Tab.Panel>
              <div className="mx-auto w-full px-8 md:px-0">
                <h2 className="text-base font-bold md:text-lg xl:text-xl">
                  プロフィール
                </h2>
                <div className="mt-3 h-[1px] w-full bg-altlight md:mt-5" />
              </div>

              <div className="mt-6 flex flex-col gap-4 px-8 pb-8 pt-6 md:mt-10 md:gap-5 md:px-0 md:pb-0 md:pt-0">
                <div className="flex items-center gap-8 text-sm md:text-base">
                  <h3 className="font-semibold">ユーザーネーム</h3>
                  <p>{user.username}</p>
                </div>
                <div className="flex items-center gap-8 text-sm md:text-base">
                  <h3 className="font-semibold">メールアドレス</h3>
                  <p>{user.email}</p>
                </div>
                <div className="mt-8">
                  <button
                    className="font-semibold text-lightblue underline"
                    onClick={() => {
                      signOut();
                      router.push("/");
                      router.refresh();
                      toast.success("ログアウトしました");
                    }}
                  >
                    ログアウト
                  </button>
                </div>
              </div>
            </Tab.Panel>

            <Tab.Panel>
              <div className="mx-auto w-full px-8 md:px-0">
                <h2 className="text-base font-bold md:text-lg xl:text-xl">
                  注文履歴
                </h2>
                <div className="mt-3 h-[1px] w-full bg-altlight md:mt-5" />
              </div>
              <div className="px-4 pb-8 md:px-0 md:pb-0">
                {orders && orders.length ? (
                  orders.map((order) => (
                    <OrderHistoryCard order={order} key={order.id} />
                  ))
                ) : (
                  <div className="my-20 flex items-center justify-center">
                    注文が見つかりませんでした
                  </div>
                )}
              </div>
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </div>
    </section>
  );
};

export default UserInfo;
