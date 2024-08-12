"use client";

import React, { useState, useTransition } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { IoAddCircleOutline, IoRemoveCircleOutline } from "react-icons/io5";
import { useRouter } from "next/navigation";
import { removeFromWishlist } from "@/actions/removeFromWishlist";
import { addToWishlist } from "@/actions/addToWishlist";
import toast from "react-hot-toast";

interface WishlistButtonProps {
  productId: string;
  isWishlisted: boolean;
}

const WishlistButton: React.FC<WishlistButtonProps> = ({
  productId,
  isWishlisted,
}) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [hasWishlisted, setHasWishlisted] = useState(isWishlisted);

  const handleClick = async () => {
    startTransition(async () => {
      if (hasWishlisted) {
        const result = await removeFromWishlist(productId);

        if (result?.error) {
          toast.error(result.error);
          return setHasWishlisted(true);
        }
        setHasWishlisted(false);
        toast("ウィッシュリストから削除しました");
        return router.refresh();
      } else {
        const result = await addToWishlist(productId);

        if (result?.error) {
          toast.error(result.error);
          return setHasWishlisted(false);
        }

        toast.success("ウィッシュリストに追加しました");
        setHasWishlisted(true);
        return router.refresh();
      }
    });
  };

  return (
    <button
      className="flex w-full items-center justify-center rounded-full border-2 border-foreground py-[10px] text-sm font-semibold hover:opacity-70"
      onClick={handleClick}
      disabled={isPending}
    >
      {!isPending && !hasWishlisted && (
        <>
          ウィッシュリストに追加
          <IoAddCircleOutline className="ml-2 text-2xl" />
        </>
      )}
      {!isPending && hasWishlisted && (
        <>
          ウィッシュリストから削除
          <IoRemoveCircleOutline className="ml-2 text-2xl" />
        </>
      )}

      {isPending && (
        <>
          <AiOutlineLoading3Quarters className="animate-spin" size={24} />
        </>
      )}
    </button>
  );
};

export default WishlistButton;
