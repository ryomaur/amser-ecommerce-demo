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
    message: "ケースの色のデータ上の名前を入力してください",
  }),
  name_ja: z.string().min(1, {
    message: "ケースの色の日本語の表示名を入力してください",
  }),
  hexValue: z.string().regex(/^#[0-9a-fA-F]{3}$|^#[0-9a-fA-F]{6}$/, {
    message: "16進数カラーコードを入力してください",
  }),
});

type InputType = z.infer<typeof formSchema>;

const AddCaseColorPage = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<InputType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      value: "",
      name_ja: "",
      hexValue: "",
    },
  });
  const [isLoading, setIsLoading] = useState(false);

  const inputColor = watch("hexValue");
  const reg = /^#[0-9a-fA-F]{3}$|^#[0-9a-fA-F]{6}$/;

  const onSubmit = async (formValues: InputType) => {
    setIsLoading(true);

    axios
      .post("/api/categories/caseColors", formValues)
      .then(() => {
        toast.success("ケースの色を追加しました");
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
      <h1 className="text-2xl font-bold">ケースの色を追加する</h1>
      <form
        className="mb-20 mt-12 flex w-full flex-col items-center gap-8"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="w-full">
          <label className="px-2 font-semibold">
            データ上の値　（例：silver）
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
            日本語の表記　（例：シルバー）
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

        <div className="w-full">
          <label className="px-2 font-semibold">
            16進数カラーコード　（例：#d1d5db）
          </label>

          <div className="flex items-center justify-center">
            {inputColor !== "" && reg.test(inputColor) && (
              <div
                className="mx-3 mt-3 h-8 w-8 rounded-full border-2 border-foreground"
                style={{ backgroundColor: inputColor }}
              />
            )}
            <input
              id="hexValue"
              required
              {...register("hexValue")}
              disabled={isLoading}
              type="text"
              className="mt-3 w-full rounded-lg border-2 border-foreground bg-transparent px-4 py-3 text-sm outline-none transition disabled:cursor-not-allowed disabled:opacity-50"
            />
          </div>
          {errors.hexValue && (
            <div className="mt-2 text-center text-sm text-red">
              {errors.hexValue.message}
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

export default AddCaseColorPage;
