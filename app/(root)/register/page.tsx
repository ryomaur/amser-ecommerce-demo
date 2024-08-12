import React from "react";
import RegisterForm from "./components/RegisterForm";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";

export const metadata = {
  title: "新規登録 | Amser",
  description: "新規登録ページ",
};

const RegisterPage = async () => {
  if (await getServerSession(authOptions)) {
    redirect("/user");
  }

  return (
    <div className="mb-14 mt-16 font-sans text-foreground md:mb-28">
      <div className="w-full pt-14 md:pt-20">
        <h1 className="text-center text-xl font-bold md:text-2xl">
          アカウントを作成する
        </h1>
        <RegisterForm />
      </div>
    </div>
  );
};

export default RegisterPage;
