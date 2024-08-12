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
    message: "ケースの種類のデータ上の名前を入力してください",
  }),
  name_ja: z
    .string()
    .min(1, { message: "ケースの種類の日本語の表示名を入力してください" }),
  caseWidth: z.coerce
    .number()
    .min(1, { message: "ケースの幅を入力してください" }),
  caseLength: z.coerce
    .number()
    .min(1, { message: "ケースの長さを入力してください" }),
  caseThickness: z.coerce
    .number()
    .min(1, { message: "ケースの厚さを入力してください" }),
  waterResistance: z.coerce
    .number()
    .min(1, { message: "推進何メートルまで防水性のがあるか入力してください" }),
  weight: z.coerce
    .number()
    .min(1, { message: "ケースの重さを入力してください" }),
});

type InputType = z.infer<typeof formSchema>;

const AddCaseTypePage = () => {
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
      caseWidth: 0,
      caseLength: 0,
      caseThickness: 0,
      waterResistance: 0,
      weight: 0,
    },
  });
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (formValues: InputType) => {
    setIsLoading(true);

    axios
      .post("/api/categories/caseTypes", formValues)
      .then(() => {
        toast.success("ケースの種類を追加しました");
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
      <h1 className="text-2xl font-bold">ケースの種類を追加する</h1>
      <form
        className="mb-20 mt-12 flex w-full flex-col items-center gap-8"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="w-full">
          <label className="px-2 font-semibold">
            データ上の値　（例：classic）
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
            日本語の表記　（例：クラシック）
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

        <div className="grid w-full grid-cols-2 gap-x-8 gap-y-10">
          <div className="w-full">
            <label className="px-2 font-semibold">
              ケースの幅　（単位：mm）
            </label>
            <input
              id="caseWidth"
              required
              {...register("caseWidth")}
              disabled={isLoading}
              min={0}
              type="number"
              step={0.1}
              className="mt-3 w-full rounded-lg border-2 border-foreground bg-transparent px-4 py-3 text-sm outline-none transition disabled:cursor-not-allowed disabled:opacity-50"
            />
            {errors.caseWidth && (
              <div className="mt-2 text-center text-sm text-red">
                {errors.caseWidth.message}
              </div>
            )}
          </div>

          <div className="w-full">
            <label className="px-2 font-semibold">
              ケースの長さ　（単位：mm）
            </label>
            <input
              id="caseLength"
              required
              {...register("caseLength")}
              disabled={isLoading}
              min={0}
              type="number"
              step={0.1}
              className="mt-3 w-full rounded-lg border-2 border-foreground bg-transparent px-4 py-3 text-sm outline-none transition disabled:cursor-not-allowed disabled:opacity-50"
            />
            {errors.caseLength && (
              <div className="mt-2 text-center text-sm text-red">
                {errors.caseLength.message}
              </div>
            )}
          </div>

          <div className="w-full">
            <label className="px-2 font-semibold">
              ケースの厚さ　（単位：mm）
            </label>
            <input
              id="caseThickness"
              required
              {...register("caseThickness")}
              disabled={isLoading}
              min={0}
              type="number"
              step={0.1}
              className="mt-3 w-full rounded-lg border-2 border-foreground bg-transparent px-4 py-3 text-sm outline-none transition disabled:cursor-not-allowed disabled:opacity-50"
            />
            {errors.caseThickness && (
              <div className="mt-2 text-center text-sm text-red">
                {errors.caseThickness.message}
              </div>
            )}
          </div>

          <div className="w-full">
            <label className="px-2 font-semibold">
              防水対応の水深　（単位：m）
            </label>
            <input
              id="waterResistance"
              required
              {...register("waterResistance")}
              disabled={isLoading}
              min={0}
              type="number"
              className="mt-3 w-full rounded-lg border-2 border-foreground bg-transparent px-4 py-3 text-sm outline-none transition disabled:cursor-not-allowed disabled:opacity-50"
            />
            {errors.waterResistance && (
              <div className="mt-2 text-center text-sm text-red">
                {errors.waterResistance.message}
              </div>
            )}
          </div>

          <div className="w-full">
            <label className="px-2 font-semibold">重さ　（単位：g）</label>
            <input
              id="weight"
              required
              {...register("weight")}
              disabled={isLoading}
              min={0}
              type="number"
              className="mt-3 w-full rounded-lg border-2 border-foreground bg-transparent px-4 py-3 text-sm outline-none transition disabled:cursor-not-allowed disabled:opacity-50"
            />
            {errors.weight && (
              <div className="mt-2 text-center text-sm text-red">
                {errors.weight.message}
              </div>
            )}
          </div>
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

export default AddCaseTypePage;
