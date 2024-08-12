"use client";

import { addToCart } from "@/actions/addToCart";
import { useTransition } from "react";
import toast from "react-hot-toast";
import { FiShoppingBag } from "react-icons/fi";
import { useRouter } from "next/navigation";

interface ShoppingBagButtonProps {
  productId: string;
  stock: number;
  size: number;
  mobileSize: number | string;
}

const ShoppingBagButton: React.FC<ShoppingBagButtonProps> = ({
  productId,
  stock,
  size,
  mobileSize,
}) => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleClick = async () => {
    startTransition(async () => {
      const result = await addToCart(productId);

      if (result?.error) {
        toast.error("カートに追加できませんでした");
        toast.error(result.error);
      } else {
        toast.success("カートに追加しました");
        router.refresh();
      }
    });
  };

  return (
    <button onClick={handleClick} disabled={isPending || stock <= 0}>
      {stock > 0 ? (
        <>
          <FiShoppingBag
            size={size}
            className="hidden md:block"
            strokeWidth={1.2}
          />
          <FiShoppingBag
            size={mobileSize}
            className="md:hidden"
            strokeWidth={1.6}
          />
        </>
      ) : (
        <div className="text-foreground/70 text-xs font-medium">在庫なし</div>
      )}
    </button>
  );
};

export default ShoppingBagButton;
