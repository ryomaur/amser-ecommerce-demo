"use client";

import { addToCart } from "@/actions/addToCart";
import { useTransition } from "react";
import toast from "react-hot-toast";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useRouter } from "next/navigation";

interface WishlistAddToCartButtonProps {
  productId: string;
}

const WishlistAddToCartButton: React.FC<WishlistAddToCartButtonProps> = ({
  productId,
}) => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  return (
    <button
      className="flex items-center justify-center rounded-full bg-foreground px-4 py-2 text-xs font-semibold text-background hover:bg-foreground/95 disabled:cursor-not-allowed disabled:opacity-30 xl:mt-3 xl:w-48 xl:px-8 xl:text-sm"
      onClick={() => {
        startTransition(async () => {
          const result = await addToCart(productId);
          if (result?.error) {
            toast.error(result.error);
          } else {
            toast.success("追加しました");
            router.refresh();
          }
        });
      }}
      disabled={isPending}
    >
      {isPending ? (
        <AiOutlineLoading3Quarters className="animate-spin" size={20} />
      ) : (
        "カートに入れる"
      )}
    </button>
  );
};

export default WishlistAddToCartButton;
