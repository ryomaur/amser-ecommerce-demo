"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState, useTransition } from "react";
import { TbHeart, TbHeartFilled } from "react-icons/tb";
import { removeFromWishlist } from "@/actions/removeFromWishlist";
import { addToWishlist } from "@/actions/addToWishlist";
import toast from "react-hot-toast";

interface HeartButtonProps {
  productId: string;
  isWishlisted: boolean;
  size: number;
  mobileSize: number | string;
}

const HeartButton: React.FC<HeartButtonProps> = ({
  productId,
  isWishlisted,
  size,
  mobileSize,
}) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const [hasWishlisted, setHasWishlisted] = useState(!!isWishlisted);

  useEffect(() => {
    setHasWishlisted(!!isWishlisted);
  }, [isWishlisted]);

  const handleClick = async () => {
    startTransition(async () => {
      if (hasWishlisted) {
        setHasWishlisted(false);
        const result = await removeFromWishlist(productId);

        if (result?.error) {
          toast.error(result.error);
          return setHasWishlisted(true);
        }

        toast("ウィッシュリストから削除しました");
        return router.refresh();
      } else {
        setHasWishlisted(true);
        const result = await addToWishlist(productId);

        if (result?.error) {
          toast.error(result.error);
          return setHasWishlisted(false);
        }

        setHasWishlisted(true);
        toast.success("ウィッシュリストに追加しました");
        return router.refresh();
      }
    });
  };

  return (
    <button
      onClick={handleClick}
      disabled={isPending}
      className="flex items-center justify-center"
    >
      {isWishlisted ? (
        <TbHeartFilled
          size={size}
          strokeWidth={1.2}
          className="text-red hidden md:block"
        />
      ) : (
        <TbHeart
          size={size}
          strokeWidth={1.2}
          className="text-foreground hover:text-red hidden md:block"
        />
      )}
      {isWishlisted ? (
        <TbHeartFilled
          size={mobileSize}
          strokeWidth={1.6}
          className="text-red md:hidden"
        />
      ) : (
        <TbHeart
          size={mobileSize}
          strokeWidth={1.6}
          className="text-foreground hover:text-red md:hidden"
        />
      )}
    </button>
  );
};

export default HeartButton;
