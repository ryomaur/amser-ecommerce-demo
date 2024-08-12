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
  price: z.coerce.number().min(0, { message: "商品の値段を設定してください" }),
  stock: z.coerce.number().min(0, { message: "商品の在庫を入力してください" }),
  bandType: z.string().min(1, { message: "バンドの種類を選択してください" }),
  bandType_ja: z.string().min(1),
  isHidden: boolean(),
});

type InputType = z.infer<typeof formSchema>;

interface AddBandFormProps {
  categories: Categories;
}

const AddBandForm: React.FC<AddBandFormProps> = ({ categories }) => {
  const { bandTypes } = categories;
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
      price: 0,
      stock: 10,
      bandType: bandTypes[0].value,
      bandType_ja: bandTypes[0].name_ja,
      isHidden: false,
    },
  });

  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const mainImageUrl = watch("mainImage");
  const isHidden = watch("isHidden");
  const inputBandType = watch("bandType");

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
      .post("/api/bands", formValues)
      .then(() => {
        toast.success("商品を追加しました");
        router.push("/admin/bands");
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
            required
            {...register("name")}
            disabled={isLoading}
            type="text"
            className="mt-3 w-full rounded-lg border-2 border-foreground bg-transparent px-4 py-3 text-sm outline-none transition disabled:cursor-not-allowed disabled:opacity-50"
          />
        </div>

        <div className="w-full">
          <label className="px-1 font-semibold">商品概要</label>
          <textarea
            required
            {...register("description")}
            disabled={isLoading}
            minLength={1}
            className="mt-3 min-h-32 w-full resize-none rounded-lg border-2 border-foreground bg-transparent px-4 py-3 text-sm outline-none transition disabled:cursor-not-allowed disabled:opacity-50"
          />
        </div>

        <div className="flex w-full justify-start gap-8">
          <div className="flex flex-col justify-center gap-3">
            <h2 className="font-semibold">商品画像</h2>
            <ImageUploadWidget
              onChange={(e) => {
                setValue("mainImage", e);
              }}
              imageSrc={mainImageUrl}
              disabled={false}
            />
          </div>
        </div>

        <div className="grid w-full grid-cols-2 gap-x-8 gap-y-10">
          <div className="w-full">
            <label className="px-2 font-semibold">価格 ¥</label>
            <input
              required
              {...register("price")}
              disabled={isLoading}
              type="number"
              className="mt-3 w-full rounded-lg border-2 border-foreground bg-transparent px-4 py-3 text-sm outline-none transition disabled:cursor-not-allowed disabled:opacity-50"
            />
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
            <label className="px-2 font-semibold">バンドの種類</label>
            <select
              id="bandType"
              disabled={isLoading}
              {...register("bandType")}
              className="mt-3 w-full appearance-none rounded-lg border-2 border-foreground bg-transparent py-3 pl-4 pr-7 text-sm outline-none transition disabled:cursor-not-allowed disabled:opacity-50"
            >
              {bandTypes.map((data) => (
                <option key={data.value} value={data.value}>
                  {data.name_ja}
                </option>
              ))}
            </select>
          </div>
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

        <button
          disabled={isLoading}
          className="mt-7 w-full rounded-lg bg-foreground py-3 font-semibold text-background hover:bg-foreground/85"
        >
          商品を追加する
        </button>
      </form>
    </div>
  );
};

export default AddBandForm;
