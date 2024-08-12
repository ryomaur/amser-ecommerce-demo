"use client";
import { Product } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import { WishlistWithProducts } from "@/actions/wishlist";
import HeartButton from "./HeartButton";
import ShoppingBagButton from "./ShoppingBagButton";

interface ProductCardProps {
  product: Product;
  wishlist: WishlistWithProducts | null;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, wishlist }) => {
  let isWishlisted: boolean = false;
  if (wishlist) {
    isWishlisted = !!wishlist.wishlistItems.find(
      (item) => item.productId === product.id
    );
  }

  return (
    <div className="bg-background text-foreground xl:w-60 flex flex-col items-center p-4 md:p-6 rounded-2xl transition duration-500 font-sans group product-card-effect">
      <div className="w-full flex justify-between items-center duration-500 product-card-buttons">
        <ShoppingBagButton
          productId={product.id}
          stock={product.stock}
          size={28}
          mobileSize={22}
        />
        <HeartButton
          productId={product.id}
          isWishlisted={isWishlisted}
          size={30}
          mobileSize={24}
        />
      </div>
      <Link
        className="flex justify-center items-center relative aspect-[3/4] w-full h-auto overflow-hidden rounded-xl my-3 md:my-5"
        href={`/products/${product.id}`}
      >
        <Image
          src={product.mainImage}
          fill
          alt="商品画像"
          sizes="(max-width: 768px) 50vw, 50vw"
          className="object-cover aspect-[3/4]"
        />
      </Link>
      <Link
        className="flex flex-col items-center justify-center font-sans gap-[0.2rem]"
        href={`/products/${product.id}`}
      >
        <h3 className="text-xs md:text-sm font-mono">{product.name}</h3>
        <span className="text-xs md:text-sm font-mono text-foreground/80">
          ¥{product.price.toLocaleString()}
        </span>
      </Link>
    </div>
  );
};

export default ProductCard;
