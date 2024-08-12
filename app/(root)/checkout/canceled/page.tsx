import React from "react";
import { FaRegFaceSmileWink } from "react-icons/fa6";
import Link from "next/link";
import { TbMoodEmpty } from "react-icons/tb";

export const metadata = {
  title: "ご注文のキャンセル | Amser",
  description: "ご注文がキャンセルされました。",
};

const SuccessPage = () => {
  return (
    <section className="h-[80vh] w-full md:h-full">
      <div className="flex h-full w-full flex-col items-center justify-center gap-5 p-8 text-foreground md:p-0">
        <h1 className="text-center text-xl font-semibold md:text-3xl">
          ご注文が
          <br className="md:hidden" />
          キャンセルされました。
          <TbMoodEmpty className="ml-5 inline-block text-2xl md:text-4xl" />
        </h1>
      </div>
    </section>
  );
};

export default SuccessPage;
