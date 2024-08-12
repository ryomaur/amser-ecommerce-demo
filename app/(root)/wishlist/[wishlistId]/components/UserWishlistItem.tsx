import { Product } from "@prisma/client";
import Image from "next/image";
import WishlistAddToCartButton from "../../components/WishlistAddToCartButton";
import Link from "next/link";
import WishlistRemoveButton from "../../components/WishlistRemoveButton";

interface UserWishlistItemProps {
  product: Product;
  isAuthor: boolean;
}

const UserWishlistItem: React.FC<UserWishlistItemProps> = ({
  product,
  isAuthor,
}) => {
  return (
    <div className="flex w-full items-center justify-center gap-7 rounded-2xl px-4 py-5 shadow-cardSmall lg:gap-10 xl:min-h-80 xl:gap-12 xl:px-7 xl:py-7">
      <div className="flex items-center justify-center py-5">
        <Link
          className="relative aspect-[3/4] h-auto w-28 overflow-hidden rounded-lg md:w-36 xl:w-40"
          href={`/products/${product.id}`}
        >
          <Image
            alt="商品画像"
            src={product.mainImage}
            sizes="(max-width: 768px) 50vw, 30vw"
            fill
            className="aspect-[3/4] object-cover"
          />
        </Link>
      </div>
      <div className="flex items-center justify-center xl:w-1/2">
        <div className="flex flex-col gap-2">
          <Link href={`/products/${product.id}`}>
            <h2 className="text-center text-base font-bold xl:text-xl">
              {product.name}
            </h2>
          </Link>
          {product.stock > 0 ? (
            <p className="text-center text-xs text-foreground/70 xl:text-sm">
              在庫： {product.stock}
            </p>
          ) : (
            <p className="text-center text-xs text-red/80 xl:text-sm">
              在庫なし
            </p>
          )}
          <p className="text-center text-sm xl:text-lg">
            ¥{product.price.toLocaleString()}
          </p>
          {isAuthor && (
            <>
              {product.stock > 0 && (
                <WishlistAddToCartButton productId={product.id} />
              )}
              <WishlistRemoveButton productId={product.id} />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserWishlistItem;
