"use client";

import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { ShoppingCart } from "@/actions/cart";
import { Session } from "next-auth";
import axios from "axios";
import { useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

interface CheckoutButtonProps {
  cart: ShoppingCart;
  session: Session | null;
}

const CheckoutButton: React.FC<CheckoutButtonProps> = ({ cart, session }) => {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);

  const handleCheckout = async () => {
    setIsLoading(true);
    if (!session) {
      toast.error("注文を確定するにはログインしてください");
      router.push("/login");
    }

    await axios
      .post(`${process.env.NEXT_PUBLIC_API_URL}/checkout`, cart)
      .then((res) => {
        window.location = res.data.url;
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <button
      className="flex w-full items-center justify-center rounded-full border-2 bg-foreground py-3 text-sm font-semibold text-background md:text-base"
      onClick={handleCheckout}
      disabled={isLoading}
    >
      {false ? (
        <AiOutlineLoading3Quarters className="animate-spin text-xl md:text-2xl" />
      ) : (
        "注文する"
      )}
    </button>
  );
};

export default CheckoutButton;
