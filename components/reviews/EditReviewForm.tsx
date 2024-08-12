"use client";

import { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";
import { LuPenSquare } from "react-icons/lu";
import { RxStarFilled } from "react-icons/rx";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import axios from "axios";
import { Review } from "@prisma/client";

const formSchema = z.object({
  rating: z.coerce
    .number()
    .min(1, { message: "評価を設定してください" })
    .max(5, { message: "５段階評価で評価を設定してください" }),
  title: z
    .string()
    .min(2, { message: "タイトルを最低２文字以上で入力してください" }),
  content: z
    .string()
    .min(5, { message: "レビューを最低５文字以上入力する必要があります" }),
});

type InputType = z.infer<typeof formSchema>;

interface EditReviewFormProps {
  userReview: Review;
}

const EditReviewForm: React.FC<EditReviewFormProps> = ({ userReview }) => {
  const router = useRouter();
  const [showForm, setShowForm] = useState(false);
  const [userRating, setUserRating] = useState<number | null>(
    userReview.rating
  );
  const [hoveredStar, setHoveredStar] = useState<number | null>(0);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    clearErrors,
  } = useForm<InputType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      rating: userReview.rating,
      title: userReview.title,
      content: userReview.content,
    },
  });

  useEffect(() => {
    if (userRating) {
      setValue("rating", userRating);
      clearErrors("rating");
    }
  }, [userRating, setValue, clearErrors]);

  const onSubmit = async (formValues: InputType) => {
    setIsLoading(true);

    axios
      .patch(`/api/reviews/${userReview.id}`, formValues)
      .then(() => {
        toast.success("レビューを編集しました");
        location.reload();
      })
      .catch((error) => {
        toast.error("エラーが発生しました");
        toast.error(error);
        toast.error(JSON.stringify(error));
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <>
      <div className="main-container mt-8">
        <div className="w-full flex justify-end">
          <button
            className="font-semibold bg-foreground py-2 px-4 text-light rounded-md flex items-center gap-3 hover:opacity-85 text-sm md:text-base"
            onClick={() => {
              router.refresh();
              setShowForm((prev) => !prev);
            }}
          >
            {showForm ? (
              <IoClose className="text-base md:text-lg" />
            ) : (
              <LuPenSquare className="text-base md:text-lg" />
            )}
            レビューを編集する
          </button>
        </div>

        {showForm && (
          <div className="mb-32">
            <div className="">
              <h2 className="font-semibold px-2">評価：</h2>
              <div className="flex px-2 mt-3">
                <div
                  className="cursor-pointer px-[1px] py-[3px]"
                  onClick={() => setUserRating(1)}
                  onMouseEnter={() => setHoveredStar(1)}
                  onMouseLeave={() =>
                    setHoveredStar(userRating ? userRating : null)
                  }
                >
                  <RxStarFilled
                    size={26}
                    className={`
              ${
                userRating! >= 1 || hoveredStar! >= 1
                  ? "opacity-100"
                  : "opacity-25"
              }
            `}
                  />
                </div>
                <div
                  className="cursor-pointer px-[1px] py-[3px]"
                  onClick={() => setUserRating((prev) => (prev === 2 ? 1 : 2))}
                  onMouseEnter={() => setHoveredStar(2)}
                  onMouseLeave={() =>
                    setHoveredStar(userRating ? userRating : null)
                  }
                >
                  <RxStarFilled
                    size={26}
                    className={`
              ${
                userRating! >= 2 || hoveredStar! >= 2
                  ? "opacity-100"
                  : "opacity-25"
              }
            `}
                  />
                </div>
                <div
                  className="cursor-pointer px-[1px] py-[3px]"
                  onClick={() => setUserRating((prev) => (prev === 3 ? 2 : 3))}
                  onMouseEnter={() => setHoveredStar(3)}
                  onMouseLeave={() =>
                    setHoveredStar(userRating ? userRating : null)
                  }
                >
                  <RxStarFilled
                    size={26}
                    className={`
              ${
                userRating! >= 3 || hoveredStar! >= 3
                  ? "opacity-100"
                  : "opacity-25"
              }
            `}
                  />
                </div>
                <div
                  className="cursor-pointer px-[1px] py-[3px]"
                  onClick={() => setUserRating((prev) => (prev === 4 ? 3 : 4))}
                  onMouseEnter={() => setHoveredStar(4)}
                  onMouseLeave={() =>
                    setHoveredStar(userRating ? userRating : null)
                  }
                >
                  <RxStarFilled
                    size={26}
                    className={`
              ${
                userRating! >= 4 || hoveredStar! >= 4
                  ? "opacity-100"
                  : "opacity-25"
              }
            `}
                  />
                </div>
                <div
                  className="cursor-pointer px-[1px] py-[3px]"
                  onClick={() => setUserRating((prev) => (prev === 5 ? 4 : 5))}
                  onMouseEnter={() => setHoveredStar(5)}
                  onMouseLeave={() =>
                    setHoveredStar(userRating ? userRating : null)
                  }
                >
                  <RxStarFilled
                    size={26}
                    className={`
              ${
                userRating! === 5 || hoveredStar! === 5
                  ? "opacity-100"
                  : "opacity-25"
              }
            `}
                  />
                </div>
              </div>
              {errors.rating && (
                <div className="px-2 text-red text-sm mt-5">
                  {errors.rating.message}
                </div>
              )}
            </div>

            <form
              onSubmit={handleSubmit(onSubmit)}
              className="w-full flex flex-col gap-6 mt-6"
            >
              <div className="w-full">
                <label className="px-2 font-semibold">タイトル：</label>
                <input
                  required
                  {...register("title")}
                  disabled={isLoading}
                  type="text"
                  minLength={1}
                  maxLength={120}
                  className="mt-3 w-full bg-transparent border-2 border-foreground rounded-lg outline-none transition disabled:opacity-50 disabled:cursor-not-allowed py-4 px-6"
                />
                {errors.title && (
                  <div className="px-2 text-red text-sm mt-5">
                    {errors.title.message}
                  </div>
                )}
              </div>

              <div className="w-full">
                <label className="px-1 font-semibold">レビュー：</label>
                <textarea
                  {...register("content")}
                  required
                  disabled={isLoading}
                  minLength={1}
                  className="mt-3 w-full min-h-32 bg-transparent border-2 border-foreground rounded-lg outline-none transition disabled:opacity-50 disabled:cursor-not-allowed py-4 px-6 resize-none"
                />
                {errors.content && (
                  <div className="px-2 text-red text-sm mt-5">
                    {errors.content.message}
                  </div>
                )}
              </div>

              <button
                disabled={isLoading}
                type="submit"
                className="bg-foreground text-background font-bold rounded-lg w-full py-4 mt-5 disabled:cursor-not-allowed hover:opacity-85"
              >
                編集内容を適用する
              </button>
            </form>
          </div>
        )}
      </div>
    </>
  );
};

export default EditReviewForm;
