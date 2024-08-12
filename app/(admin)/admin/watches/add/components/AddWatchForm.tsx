"use client";

import ImageUploadWidget from "@/components/ImageUploadWidget";
import { Switch } from "@headlessui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { Fragment, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { BiSolidHide, BiSolidShow } from "react-icons/bi";
import { boolean, z } from "zod";
import { useRouter } from "next/navigation";
import { Categories } from "@/types";

const formSchema = z.object({
  name: z.string().min(1, { message: "商品名を入力してください" }),
  description: z.string().min(1, { message: "商品の概要を入力してください" }),
  mainImage: z
    .string()
    .trim()
    .url({ message: "メインになる画像をアップロードしてください" }),
  image: z
    .string()
    .trim()
    .url({ message: "詳細の商品画像をアップロードしてください" }),
  price: z.coerce.number().min(0, { message: "商品の値段を設定してください" }),
  stock: z.coerce.number().min(0, { message: "商品の在庫を入力してください" }),
  movement: z.string().min(1, {
    message: "ムーブメントを選択してください",
  }),
  movement_ja: z.string().min(1, {
    message: "ムーブメントを選択してください",
  }),
  caseType: z.string().min(1, {
    message: "ケースの種類を選択してください",
  }),
  caseType_ja: z.string().min(1, {
    message: "ケースの種類を選択してください",
  }),
  caseWidth: z.coerce.number().positive(),
  caseLength: z.coerce.number().positive(),
  caseThickness: z.coerce.number().positive(),
  waterResistance: z.coerce.number().positive(),
  weight: z.coerce.number().positive(),
  caseColor: z.string().min(1, { message: "ケースの色を選択してください" }),
  caseColor_ja: z.string().min(1, { message: "ケースの色を選択してください" }),
  faceColor: z.string().min(1, { message: "文字盤の色を選択してください" }),
  faceColor_ja: z.string().min(1, { message: "文字盤の色を選択してください" }),
  bandType: z.string().min(1, { message: "バンドの種類を選択してください" }),
  bandType_ja: z.string().min(1, { message: "バンドの種類を選択してください" }),
  isHidden: boolean(),
});

type InputType = z.infer<typeof formSchema>;

interface AddWatchFormProps {
  categories: Categories;
}

const AddWatchForm: React.FC<AddWatchFormProps> = ({ categories }) => {
  const router = useRouter();
  const { bandTypes, caseColors, caseTypes, faceColors, movements } =
    categories;

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
    watch,
  } = useForm<InputType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      mainImage: "",
      image: "",
      price: 0,
      stock: 10,
      movement: movements[0].value,
      movement_ja: movements[0].name_ja,
      caseType: caseTypes[0].value,
      caseType_ja: caseTypes[0].name_ja,
      caseWidth: caseTypes[0].caseWidth,
      caseLength: caseTypes[0].caseLength,
      caseThickness: caseTypes[0].caseThickness,
      waterResistance: caseTypes[0].waterResistance,
      weight: caseTypes[0].weight,
      caseColor: caseColors[0].value,
      caseColor_ja: caseColors[0].name_ja,
      faceColor: faceColors[0].value,
      faceColor_ja: faceColors[0].name_ja,
      bandType: bandTypes[0].value,
      bandType_ja: bandTypes[0].name_ja,
      isHidden: false,
    },
  });

  const [isLoading, setIsLoading] = useState(false);

  const mainImageUrl = watch("mainImage");
  const imageUrl = watch("image");
  const isHidden = watch("isHidden");

  const inputMovement = watch("movement");
  const inputCaseType = watch("caseType");
  const inputCaseColor = watch("caseColor");
  const inputFaceColor = watch("faceColor");
  const inputBandType = watch("bandType");

  useEffect(() => {
    const selectedCaseType = caseTypes.find(
      (data) => data.value === inputCaseType,
    );

    if (selectedCaseType) {
      setValue("caseType_ja", selectedCaseType.name_ja);
      setValue("caseWidth", selectedCaseType.caseWidth);
      setValue("caseLength", selectedCaseType.caseLength);
      setValue("caseThickness", selectedCaseType.caseLength);
      setValue("waterResistance", selectedCaseType.waterResistance);
      setValue("weight", selectedCaseType.weight);
    }
  }, [setValue, getValues, inputCaseType, caseTypes]);

  useEffect(() => {
    const selectedCaseColor = caseColors.find(
      (data) => data.value === inputCaseColor,
    );

    if (selectedCaseColor) {
      setValue("caseColor_ja", selectedCaseColor.name_ja);
    }
  }, [setValue, getValues, inputCaseColor, caseColors]);

  useEffect(() => {
    const selectedMovement = movements.find(
      (data) => data.value === inputMovement,
    );

    if (selectedMovement) {
      setValue("movement_ja", selectedMovement.name_ja);
    }
  }, [setValue, getValues, inputMovement, movements]);

  useEffect(() => {
    const selectedFaceColor = faceColors.find(
      (data) => data.value === inputFaceColor,
    );

    if (selectedFaceColor) {
      setValue("faceColor_ja", selectedFaceColor.name_ja);
    }
  }, [setValue, getValues, inputFaceColor, faceColors]);

  useEffect(() => {
    const selectedBandType = bandTypes.find(
      (data) => data.value === inputBandType,
    );

    if (selectedBandType) {
      setValue("bandType_ja", selectedBandType.name_ja);
    }
  }, [setValue, getValues, inputBandType, bandTypes]);

  const onSubmit = async (formValues: InputType) => {
    setIsLoading(true);

    axios
      .post("/api/watches", formValues)
      .then(() => {
        toast.success("商品を追加しました");
        router.push("/admin/watches");
        router.refresh();
      })
      .catch((error) => {
        toast.error("エラーが発生しました");
        if (error.response.data.message) {
          toast.error(error.response.data.message);
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <div className="mt-8 flex w-full justify-center text-foreground">
      <form
        className="mb-20 flex w-full flex-col items-center gap-8"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="w-full">
          <label className="px-2 font-semibold">商品名</label>
          <input
            id="name"
            required
            {...register("name")}
            disabled={isLoading}
            type="text"
            className="mt-3 w-full rounded-lg border-2 border-foreground bg-transparent px-4 py-3 text-sm outline-none transition disabled:cursor-not-allowed disabled:opacity-50"
          />
          {errors.name && (
            <div className="mt-2 text-center text-sm text-red">
              {errors.name.message}
            </div>
          )}
        </div>

        <div className="w-full">
          <label className="px-1 font-semibold">商品概要</label>
          <textarea
            id="description"
            required
            {...register("description")}
            disabled={isLoading}
            minLength={1}
            className="mt-3 min-h-32 w-full resize-none rounded-lg border-2 border-foreground bg-transparent px-4 py-3 text-sm outline-none transition disabled:cursor-not-allowed disabled:opacity-50"
          />
          {errors.description && (
            <div className="mt-2 text-center text-sm text-red">
              {errors.description.message}
            </div>
          )}
        </div>

        <div className="flex w-full justify-start gap-8">
          <div className="flex flex-col justify-center gap-3">
            <h2 className="font-semibold">メインの商品画像 （必須）</h2>
            <ImageUploadWidget
              onChange={(e) => {
                setValue("mainImage", e);
                router.refresh();
              }}
              imageSrc={mainImageUrl}
              disabled={false}
            />
          </div>
          <div className="flex flex-col justify-center gap-3">
            <h2 className="font-semibold">詳細の商品画像 （必須）</h2>
            <ImageUploadWidget
              onChange={(e) => {
                setValue("image", e);
                router.refresh();
              }}
              imageSrc={imageUrl}
              disabled={false}
            />
          </div>
        </div>

        <div className="grid w-full grid-cols-2 gap-x-8 gap-y-10">
          <div className="w-full">
            <label className="px-2 font-semibold">価格 ¥</label>
            <input
              id="price"
              required
              {...register("price")}
              disabled={isLoading}
              min={0}
              type="number"
              className="mt-3 w-full rounded-lg border-2 border-foreground bg-transparent px-4 py-3 text-sm outline-none transition disabled:cursor-not-allowed disabled:opacity-50"
            />
            {errors.price && (
              <div className="mt-2 text-center text-sm text-red">
                {errors.price.message}
              </div>
            )}
          </div>

          <div className="w-full">
            <label className="px-2 font-semibold">在庫</label>
            <input
              id="stock"
              required
              {...register("stock")}
              disabled={isLoading}
              min={0}
              type="number"
              className="mt-3 w-full rounded-lg border-2 border-foreground bg-transparent px-4 py-3 text-sm outline-none transition disabled:cursor-not-allowed disabled:opacity-50"
            />
            {errors.stock && (
              <div className="mt-2 text-center text-sm text-red">
                {errors.stock.message}
              </div>
            )}
          </div>

          <div className="w-full">
            <label className="px-2 font-semibold">ケースの種類</label>
            <select
              className="mt-3 w-full appearance-none rounded-lg border-2 border-foreground bg-transparent py-3 pl-4 pr-7 text-sm outline-none transition disabled:cursor-not-allowed disabled:opacity-50"
              id="caseType"
              disabled={isLoading}
              {...register("caseType")}
            >
              {caseTypes.map((data) => (
                <option key={data.value} value={data.value}>
                  {data.name_ja}
                </option>
              ))}
            </select>
            {errors.caseType && (
              <div className="mt-2 text-center text-sm text-red">
                {errors.caseType.message}
              </div>
            )}
          </div>

          <div className="w-full">
            <label className="px-2 font-semibold">ケースの色</label>

            <select
              className="mt-3 w-full appearance-none rounded-lg border-2 border-foreground bg-transparent py-3 pl-4 pr-7 text-sm outline-none transition disabled:cursor-not-allowed disabled:opacity-50"
              id="caseColor"
              disabled={isLoading}
              {...register("caseColor")}
            >
              {caseColors.map((data) => (
                <option key={data.value} value={data.value}>
                  {data.name_ja}
                </option>
              ))}
            </select>
            {errors.caseColor && (
              <div className="mt-2 text-center text-sm text-red">
                {errors.caseColor.message}
              </div>
            )}
          </div>

          <div className="w-full">
            <label className="px-2 font-semibold">
              ムーブメント（駆動方式）
            </label>
            <select
              className="mt-3 w-full appearance-none rounded-lg border-2 border-foreground bg-transparent py-3 pl-4 pr-7 text-sm outline-none transition disabled:cursor-not-allowed disabled:opacity-50"
              id="movement"
              disabled={isLoading}
              {...register("movement")}
            >
              {movements.map((data) => (
                <option key={data.value} value={data.value}>
                  {data.name_ja}
                </option>
              ))}
            </select>
            {errors.movement && (
              <div className="mt-2 text-center text-sm text-red">
                {errors.movement.message}
              </div>
            )}
          </div>

          <div className="w-full">
            <label className="px-2 font-semibold">文字盤の色</label>
            <select
              className="mt-3 w-full appearance-none rounded-lg border-2 border-foreground bg-transparent py-3 pl-4 pr-7 text-sm outline-none transition disabled:cursor-not-allowed disabled:opacity-50"
              id="faceColor"
              disabled={isLoading}
              {...register("faceColor")}
            >
              {faceColors.map((data) => (
                <option key={data.value} value={data.value}>
                  {data.name_ja}
                </option>
              ))}
            </select>
            {errors.faceColor && (
              <div className="mt-2 text-center text-sm text-red">
                {errors.faceColor.message}
              </div>
            )}
          </div>

          <div className="w-full">
            <label className="px-2 font-semibold">バンドの種類</label>
            <select
              className="mt-3 w-full appearance-none rounded-lg border-2 border-foreground bg-transparent py-3 pl-4 pr-7 text-sm outline-none transition disabled:cursor-not-allowed disabled:opacity-50"
              id="bandType"
              disabled={isLoading}
              {...register("bandType")}
            >
              {bandTypes.map((data) => (
                <option key={data.value} value={data.value}>
                  {data.name_ja}
                </option>
              ))}
            </select>
          </div>
          {errors.bandType && (
            <div className="mt-2 text-center text-sm text-red">
              {errors.bandType.message}
            </div>
          )}
        </div>

        <div className="mt-5 w-full">
          <label className="block px-2 text-center font-semibold">
            商品を非表示にする（商品ページに表示しない）
          </label>
          <div className="mt-3 flex items-center justify-center gap-3 rounded-lg border-2 border-foreground px-4 py-3">
            <span className="text-sm">表示する</span>
            <BiSolidShow size={25} />
            <Switch
              defaultChecked={isHidden}
              as={Fragment}
              onChange={(e) => setValue("isHidden", e)}
            >
              {({ checked }) => (
                <button
                  className={`${
                    checked ? "bg-red" : "bg-blue"
                  } relative inline-flex h-6 w-12 items-center rounded-full`}
                >
                  <span className="sr-only">
                    商品を非表示にする（商品ページに表示しない）
                  </span>
                  <span
                    className={`${
                      checked ? "translate-x-7" : "translate-x-1"
                    } inline-block h-4 w-4 transform rounded-full bg-bglighter transition`}
                  />
                </button>
              )}
            </Switch>
            <BiSolidHide size={25} />
            <span className="text-sm">非表示</span>
          </div>
        </div>

        {errors.mainImage && !mainImageUrl && (
          <div className="mt-5 text-center text-sm text-red">
            {errors.mainImage.message}
          </div>
        )}

        {errors.image && !imageUrl && (
          <div className="mt-5 text-center text-sm text-red">
            {errors.image.message}
          </div>
        )}

        <button
          disabled={isLoading}
          type="submit"
          className="mt-7 w-full rounded-lg bg-foreground py-3 font-semibold text-background hover:bg-foreground/85"
        >
          商品を追加する
        </button>
      </form>
    </div>
  );
};

export default AddWatchForm;
