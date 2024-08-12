"use client";

import { z } from "zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { useState } from "react";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";

const formSchema = z.object({
  value: z.string().min(1, {
    message: "ムーブメントの種類のデータ上の名前を入力してください",
  }),
  name_ja: z.string().min(1, {
    message: "ムーブメントの種類の日本語の表示名を入力してください",
  }),
});

type InputType = z.infer<typeof formSchema>;

const AddMovementTypePage = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<InputType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      value: "",
      name_ja: "",
    },
  });
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (formValues: InputType) => {
    setIsLoading(true);

    axios
      .post("/api/categories/movements", formValues)
      .then(() => {
        toast.success("ムーブメントの種類を追加しました");
        router.push("/admin/categories");
        router.refresh();
      })
      .catch((error) => {
        if (error.response.data.message) {
          toast.error(error.response.data.message);
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <section className="mt-8 text-foreground">
      <h1 className="text-2xl font-bold">ムーブメントの種類を追加する</h1>
      <form
        className="mb-20 mt-12 flex w-full flex-col items-center gap-8"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="w-full">
          <label className="px-2 font-semibold">
            データ上の値　（例：quartz）
          </label>
          <input
            id="value"
            required
            {...register("value")}
            disabled={isLoading}
            type="text"
            className="mt-3 w-full rounded-lg border-2 border-foreground bg-transparent px-4 py-3 text-sm outline-none transition disabled:cursor-not-allowed disabled:opacity-50"
          />
          {errors.value && (
            <div className="mt-2 text-center text-sm text-red">
              {errors.value.message}
            </div>
          )}
        </div>

        <div className="w-full">
          <label className="px-2 font-semibold">
            日本語の表記　（例：クォーツ式）
          </label>
          <input
            id="name_ja"
            required
            {...register("name_ja")}
            disabled={isLoading}
            type="text"
            className="mt-3 w-full rounded-lg border-2 border-foreground bg-transparent px-4 py-3 text-sm outline-none transition disabled:cursor-not-allowed disabled:opacity-50"
          />
          {errors.name_ja && (
            <div className="mt-2 text-center text-sm text-red">
              {errors.name_ja.message}
            </div>
          )}
        </div>

        <button
          disabled={isLoading}
          type="submit"
          className="mt-7 w-full rounded-lg bg-foreground py-3 font-semibold text-background hover:bg-foreground/85"
        >
          追加する
        </button>
      </form>
    </section>
  );
};

export default AddMovementTypePage;
