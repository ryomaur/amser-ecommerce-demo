"use client";

import { addToCart } from "@/actions/addToCart";
import { useState, useTransition } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

interface AddToCartButtonProps {
  productId: string;
  stock: number;
}

const AddToCartButton: React.FC<AddToCartButtonProps> = ({
  productId,
  stock,
}) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [success, setSuccess] = useState(false);

  return (
    <>
      {stock > 0 && (
        <button
          className="flex w-full items-center justify-center rounded-full border-2 border-foreground bg-foreground py-3 text-sm font-semibold text-background hover:opacity-85 disabled:cursor-not-allowed"
          onClick={() => {
            setSuccess(false);
            startTransition(async () => {
              const result = await addToCart(productId);

              if (result?.error) {
                toast.error(result.error);
              } else {
                setSuccess(true);
                router.refresh();
                toast.success("カートに追加しました");
              }
            });
          }}
          disabled={isPending || stock <= 0}
        >
          {!isPending && success ? (
            "カートに追加しました"
          ) : isPending && !success ? (
            <AiOutlineLoading3Quarters className="animate-spin" size={20} />
          ) : (
            "カートに入れる"
          )}
        </button>
      )}
    </>
  );
};

export default AddToCartButton;
