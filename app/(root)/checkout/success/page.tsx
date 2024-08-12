import React from "react";
import { FaRegFaceSmileWink } from "react-icons/fa6";
import Link from "next/link";

export const metadata = {
  title: "チェックアウト完了 | Amser",
  description: "お買い上げありがとうございます。",
};

const SuccessPage = () => {
  return (
    <section className="h-[80vh] w-full md:h-full">
      <div className="flex h-full w-full flex-col items-center justify-center gap-5 p-8 text-foreground md:p-0">
        <h1 className="text-center text-xl font-semibold md:text-3xl">
          お買い上げ
          <br className="md:hidden" />
          ありがとうございます
          <FaRegFaceSmileWink className="ml-5 inline-block text-2xl md:text-4xl" />
        </h1>
        <p className="text-center text-sm md:text-base">
          注文履歴は
          <Link href={"/user"} className="font-bold underline">
            マイアカウントページ
          </Link>
          <br className="md:hidden" />
          から確認できます。
        </p>
      </div>
    </section>
  );
};

export default SuccessPage;
