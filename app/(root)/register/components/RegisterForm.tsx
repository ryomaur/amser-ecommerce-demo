"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { LuLoader2 } from "react-icons/lu";
import axios from "axios";

const formSchema = z
  .object({
    email: z.string().email({ message: "メールアドレスの形式ではありません" }),
    username: z
      .string()
      .min(2, { message: "表示名は2文字以上入力する必要があります" }),
    password: z
      .string()
      .min(6, { message: "パスワードは最低6文字以上入力する必要があります" }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "確認用パスワードが一致しません",
    path: ["confirmPassword"],
  });

type InputType = z.infer<typeof formSchema>;

const RegisterForm = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<InputType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (formValues: InputType) => {
    setIsLoading(true);

    axios
      .post("/api/register", formValues)
      .then(() => {
        toast.success("アカウントを作成しました");
        router.push("/login");
      })
      .catch((error) => {
        error.response.data.message && toast.error(error.response.data.message);
        error.response.data.errors?.password &&
          toast.error(error.response.data.errors.password);
        error.response.data.errors?.username &&
          toast.error(error.response.data.errors.username);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className="mx-auto mt-16 max-w-[380px] px-5 md:px-0">
      <form
        className="flex w-full flex-col gap-5 md:gap-10"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="relative w-full">
          <input
            id="email"
            type="email"
            {...register("email")}
            disabled={isLoading}
            placeholder=" " //アニメーション用にスペースを設定
            className={`peer w-full rounded-full border-2 border-foreground bg-transparent px-7 py-3 outline-none transition disabled:cursor-not-allowed disabled:opacity-50`}
          />
          <label
            className={`absolute left-5 top-[16px] z-10 origin-[0] -translate-y-[25px] scale-[.8] transform bg-background px-1 text-sm font-semibold duration-200 peer-placeholder-shown:-z-10 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-placeholder-shown:text-neutral-500 peer-focus:z-10 peer-focus:-translate-y-[25px] peer-focus:scale-[.8] peer-focus:text-foreground`}
          >
            メールアドレス
          </label>
          {errors.email && (
            <div className="mt-2 text-center text-sm text-red">{`${errors.email.message}`}</div>
          )}
        </div>

        <div className="relative w-full">
          <input
            id="username"
            type="text"
            {...register("username")}
            disabled={isLoading}
            placeholder=" " //アニメーション用にスペースを設定
            className={`peer w-full rounded-full border-2 border-foreground bg-transparent px-7 py-3 outline-none transition disabled:cursor-not-allowed disabled:opacity-50`}
          />
          <label
            className={`absolute left-5 top-[16px] z-10 origin-[0] -translate-y-[25px] scale-[.8] transform bg-background px-1 text-sm font-semibold duration-200 peer-placeholder-shown:-z-10 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-placeholder-shown:text-neutral-500 peer-focus:z-10 peer-focus:-translate-y-[25px] peer-focus:scale-[.8] peer-focus:text-foreground`}
          >
            表示名
          </label>
          {errors.username && (
            <div className="mt-2 text-center text-sm text-red">{`${errors.username.message}`}</div>
          )}
        </div>

        <div className="relative w-full">
          <input
            id="password"
            type="password"
            {...register("password")}
            disabled={isLoading}
            placeholder=" " //アニメーション用にスペースを設定
            className={`peer w-full rounded-full border-2 border-foreground bg-transparent px-7 py-3 outline-none transition disabled:cursor-not-allowed disabled:opacity-50`}
          />
          <label
            className={`absolute left-5 top-[16px] z-10 origin-[0] -translate-y-[25px] scale-[.8] transform bg-background px-1 text-sm font-semibold duration-200 peer-placeholder-shown:-z-10 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-placeholder-shown:text-neutral-500 peer-focus:z-10 peer-focus:-translate-y-[25px] peer-focus:scale-[.8] peer-focus:text-foreground`}
          >
            パスワード
          </label>
          {errors.password && (
            <div className="mt-2 text-center text-sm text-red">{`${errors.password.message}`}</div>
          )}
        </div>

        <div className="relative w-full">
          <input
            id="confirmPassword"
            type="password"
            {...register("confirmPassword")}
            disabled={isLoading}
            placeholder=" " //アニメーション用にスペースを設定
            className={`peer w-full rounded-full border-2 border-foreground bg-transparent px-7 py-3 outline-none transition disabled:cursor-not-allowed disabled:opacity-50`}
          />
          <label
            className={`absolute left-5 top-[16px] z-10 origin-[0] -translate-y-[25px] scale-[.8] transform bg-background px-1 text-sm font-semibold duration-200 peer-placeholder-shown:-z-10 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-placeholder-shown:text-neutral-500 peer-focus:z-10 peer-focus:-translate-y-[25px] peer-focus:scale-[.8] peer-focus:text-foreground`}
          >
            パスワードの確認入力
          </label>
          {errors.confirmPassword && (
            <div className="mt-2 text-center text-sm text-red">{`${errors.confirmPassword.message}`}</div>
          )}
        </div>

        <button
          disabled={isLoading}
          type="submit"
          className={`mt-5 w-full rounded-full bg-foreground py-3 font-bold text-background disabled:cursor-not-allowed disabled:bg-foreground/85`}
        >
          {isLoading ? (
            <LuLoader2 className="mx-auto animate-spin text-2xl" />
          ) : (
            "アカウントの作成"
          )}
        </button>
      </form>
      <Link
        href={"/login"}
        className="mt-10 flex items-center justify-center font-semibold text-lightblue hover:underline"
      >
        すでにアカウントをお持ちの方はこちら
      </Link>
    </div>
  );
};

export default RegisterForm;
