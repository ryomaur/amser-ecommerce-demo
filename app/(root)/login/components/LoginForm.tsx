"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useState } from "react";
import Link from "next/link";
import { LuLoader2 } from "react-icons/lu";
import toast from "react-hot-toast";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

const schema = z.object({
  email: z.string().email({ message: "メールアドレスの形式ではありません" }),
  password: z
    .string()
    .min(6, { message: "パスワードは最低6文字以上入力する必要があります" }),
});

export type InputType = z.infer<typeof schema>;

const LoginForm = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<InputType>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = (formValues: InputType) => {
    setIsLoading(true);
    signIn("credentials", {
      email: formValues.email,
      password: formValues.password,
      redirect: false,
    }).then((callback) => {
      setIsLoading(false);

      if (callback?.ok) {
        toast.success("ログインに成功しました");
        router.push("/");
        router.refresh();
      }

      if (callback?.error) {
        toast.error(callback.error);
      }
    });
  };

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
            <div className="mt-2 text-center text-sm text-red">
              {errors.email.message}
            </div>
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
            <div className="mt-2 text-center text-sm text-red">
              {errors.password.message}
            </div>
          )}
        </div>

        <button
          disabled={isLoading}
          type="submit"
          className="mt-5 w-full rounded-full bg-foreground py-3 font-bold text-background disabled:cursor-not-allowed disabled:bg-foreground/85"
        >
          {isLoading ? (
            <LuLoader2 className="mx-auto animate-spin text-2xl" />
          ) : (
            "ログイン"
          )}
        </button>
      </form>
      <Link
        href={"/register"}
        className="mt-10 flex items-center justify-center py-4 font-semibold text-lightblue hover:underline"
      >
        アカウントの作成はこちらから
      </Link>
    </div>
  );
};

export default LoginForm;
