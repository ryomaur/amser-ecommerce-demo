"use client";

import { removeFromWishlist } from "@/actions/removeFromWishlist";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import toast from "react-hot-toast";

interface WishlistRemoveButtonProps {
  productId: string;
}

const WishlistRemoveButton: React.FC<WishlistRemoveButtonProps> = ({
  productId,
}) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleClick = async () => {
    startTransition(async () => {
      const result = await removeFromWishlist(productId);

      if (result?.error) {
        toast.error("エラーが発生しました");
      } else {
        return router.refresh();
      }
    });
  };

  return (
    <button
      className="px-2 py-2 text-sm font-medium text-red"
      onClick={handleClick}
      disabled={isPending}
    >
      削除
    </button>
  );
};

export default WishlistRemoveButton;
