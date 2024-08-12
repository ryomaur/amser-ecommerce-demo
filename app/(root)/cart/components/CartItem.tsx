"use client";

import { CartItemWithProduct } from "@/actions/cart";
import { removeFromCart } from "@/actions/removeFromCart";
import { setCartItemQuantity } from "@/actions/setCartItemQuantity";
import { useDebounce } from "@/hooks/useDebounce";
import Image from "next/image";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { CiCircleRemove } from "react-icons/ci";
import { FaMinus, FaPlus } from "react-icons/fa6";

interface CartItemProps {
  item: CartItemWithProduct;
}

const CartItem: React.FC<CartItemProps> = ({
  item: { product, quantity: initialQuantity },
}) => {
  const [quantity, setQuantity] = useState(initialQuantity);
  const debouncedQuantity = useDebounce(quantity);

  useEffect(() => {
    const updateCartItemQuantity = async () => {
      const result = await setCartItemQuantity(product.id, debouncedQuantity);
      if (result?.error) {
        toast.error("エラーが発生しました");
      }
    };

    updateCartItemQuantity();
  }, [debouncedQuantity, product.id]);

  return (
    <div className="mx-auto w-full border-b border-foreground/30 px-3 py-5 md:w-[90%] md:px-7 md:py-7">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4 md:gap-6">
          <div className="relative flex h-24 w-16 items-center justify-center overflow-hidden rounded-lg md:h-40 md:w-28">
            <Image
              src={product.mainImage}
              alt="商品画像"
              sizes="(max-width: 768px) 20vw, 20vw"
              fill
              className="object-cover"
            />
          </div>
          <div className="flex flex-col justify-center gap-2 pr-2 md:ml-2 md:gap-[0.625rem]">
            <div className="text-sm font-semibold md:w-32 md:text-base">
              {product.name}
            </div>
            <div className="font-mono text-xs font-light md:text-sm">
              ¥{product.price.toLocaleString()}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 md:gap-7">
          <div className="font-mono text-base font-light md:text-lg">
            ¥{(product.price * quantity).toLocaleString()}
          </div>
          <div className="flex flex-col items-center justify-center gap-2 rounded-full border-2 border-foreground/50 md:gap-[0.625rem]">
            <button
              className="p-2 md:p-3"
              onClick={() => setQuantity((prev) => prev + 1)}
            >
              <FaPlus className="text-xs md:text-sm" />
            </button>
            <div className="font-mono">{quantity}</div>
            <button
              className="p-2 md:p-3"
              onClick={() => setQuantity((prev) => (prev !== 1 ? prev - 1 : 1))}
            >
              <FaMinus className="text-xs md:text-sm" />
            </button>
          </div>
          <div className="flex flex-col items-center justify-center gap-6">
            <button
              className="text-red"
              onClick={() => removeFromCart(product.id)}
            >
              <CiCircleRemove
                className="text-xl md:text-[26px]"
                strokeWidth={0.5}
              />
            </button>
          </div>
        </div>
      </div>

      {product.stock === 0 ? (
        <div className="w-full text-center text-sm text-red">
          商品を削除してください
        </div>
      ) : (
        <>
          {product.stock < quantity && (
            <div className="w-full text-center text-sm text-red">
              数量を減らしてください。
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default CartItem;
