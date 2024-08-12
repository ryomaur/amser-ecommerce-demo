import Image from "next/image";
import { Metadata } from "next";
import React, { cache } from "react";
import ProductImage from "./components/ProductImage";
import Reviews from "@/components/reviews/Reviews";
import prisma from "@/lib/db";
import { notFound } from "next/navigation";
import AddToCartButton from "./components/AddToCartButton";
import WishlistButton from "./components/WishlistButton";
import { checkWishlisted } from "@/actions/checkWishlisted";
import getReviews from "@/actions/getReviews";
import HeartButton from "@/components/HeartButton";
import MainProductImageZoom from "./components/MainProductImageZoom";

interface ProductPageProps {
  params: {
    productId: string;
  };
  searchParams: {
    page: string;
  };
}

//　商品データをメタデータとページで２度取得してしまうのを防ぐためにキャッシュする
const getProduct = cache(async (productId: string) => {
  const product = await prisma.product.findUnique({
    where: {
      id: productId,
    },
  });

  if (!product) notFound();

  return product;
});

export async function generateMetadata({
  params: { productId },
}: ProductPageProps): Promise<Metadata> {
  const product = await getProduct(productId);

  return {
    title: product.name + " | Amser",
    description: product.name + "の詳細ページ",
    openGraph: {
      title: product.name + " | Amser",
      images: [{ url: product.mainImage }],
    },
  };
}

const ProductPage: React.FC<ProductPageProps> = async ({
  params: { productId },
  searchParams: { page = "1" },
}) => {
  const product = await getProduct(productId);
  const isWishlisted = await checkWishlisted(productId);

  const currentPage = parseInt(page);
  const pageSize = 5;
  const reviewData = await getReviews(productId, currentPage, pageSize);
  const totalPages = Math.ceil(reviewData.totalCount / pageSize);

  return (
    <div className="mt-14 pb-40 font-sans text-foreground lg:mt-32 2xl:mt-40">
      <div className="mx-auto flex max-w-[1920px] flex-col items-center justify-center lg:flex-row lg:gap-14 xl:gap-52">
        <div className="flex w-full items-center justify-center px-8 pt-8 lg:w-auto xl:pt-0">
          <div className="relative aspect-[2/3] h-[calc(50vh-2.2rem)] min-h-[20rem] w-auto overflow-hidden rounded-3xl bg-transparent lg:h-[38rem] lg:w-full xl:h-[70vh] xl:max-h-[720px]">
            <Image
              src={product.mainImage}
              alt="商品画像"
              sizes="(max-width: 768px) 90vw, 50vw"
              fill
              className="aspect-[2/3] object-cover"
              quality={100}
            />
            <MainProductImageZoom src={product.mainImage} />
          </div>
        </div>
        <div className="flex w-full flex-col p-8 md:p-12 lg:mr-12 lg:mt-8 lg:w-[23rem] lg:p-4 xl:w-[25rem]">
          <div className="flex items-center justify-between border-b-2 border-[gray] pb-[0.188rem]">
            <h1 className="text-4xl font-semibold md:text-5xl">
              {product.name}
            </h1>
            <div className="px-1 md:hidden">
              <HeartButton
                isWishlisted={isWishlisted}
                productId={productId}
                size={32}
                mobileSize={32}
              />
            </div>
          </div>

          <div className="mt-5">
            <p className="text-sm">{product.description}</p>
          </div>

          <div className="mt-4 flex items-center justify-between px-2 md:mt-7">
            <span className="ml-2 font-mono text-2xl md:text-[1.75rem]">
              ¥{product.price.toLocaleString()}
            </span>
            <span className="mr-5 font-mono text-sm md:text-base">
              {product.stock > 0 ? <>在庫： {product.stock}</> : <>在庫なし</>}
            </span>
          </div>

          <div className="mt-4 flex flex-col gap-[16px] md:mt-6">
            <AddToCartButton productId={productId} stock={product.stock} />
            <div className="hidden md:block">
              <WishlistButton
                productId={productId}
                isWishlisted={isWishlisted}
              />
            </div>
          </div>
        </div>
      </div>

      {product.productType === "watch" && (
        <div className="mt-20 w-full rounded-2xl bg-bglighter py-16 md:rounded-none md:py-28 lg:mt-36">
          <div className="main-container flex flex-col items-center justify-between gap-0 lg:flex-row lg:justify-center lg:gap-12 xl:justify-between xl:gap-0">
            <div className="mx-auto mb-16 px-5 md:mb-28 lg:mx-0 lg:mb-0 lg:px-7">
              {product.image && <ProductImage src={product.image} />}
            </div>
            <div className="mt-11 w-full px-4 md:mt-0 md:w-auto md:px-0">
              <h2 className="text-center text-xl font-bold">製品仕様</h2>
              <div className="mt-11 flex w-full flex-col lg:w-[25rem] xl:w-[30rem]">
                <div className="flex items-center border-b border-altlight py-3">
                  <div className="ml-6 w-[180px] font-semibold">駆動方式</div>
                  <div className="font-mono text-sm">{product.movement_ja}</div>
                </div>

                <div className="flex items-center border-b border-altlight py-3">
                  <div className="ml-6 w-[180px] text-sm font-semibold">
                    ケース
                  </div>
                  <div className="font-mono text-sm">{product.caseType_ja}</div>
                </div>

                <div className="flex items-center border-b border-altlight py-3">
                  <div className="ml-6 w-[180px] text-sm font-semibold">
                    ケースの色
                  </div>
                  <div className="font-mono text-sm">
                    {product.caseColor_ja}
                  </div>
                </div>

                <div className="flex items-center border-b border-altlight py-3">
                  <div className="ml-6 w-[180px] text-sm font-semibold">
                    文字盤の色
                  </div>
                  <div className="font-mono text-sm">
                    {product.faceColor_ja}
                  </div>
                </div>

                <div className="flex items-center border-b border-altlight py-3">
                  <div className="ml-6 w-[180px] text-sm font-semibold">
                    縦径
                  </div>
                  <div className="font-mono text-sm">
                    {product.caseLength}mm
                  </div>
                </div>

                <div className="flex items-center border-b border-altlight py-3">
                  <div className="ml-6 w-[180px] text-sm font-semibold">
                    横径
                  </div>
                  <div className="font-mono text-sm">{product.caseWidth}mm</div>
                </div>

                <div className="flex items-center border-b border-altlight py-3">
                  <div className="ml-6 w-[180px] text-sm font-semibold">
                    厚さ
                  </div>
                  <div className="font-mono text-sm">
                    {product.caseThickness}mm
                  </div>
                </div>

                <div className="flex items-center border-b border-altlight py-3">
                  <div className="ml-6 w-[180px] text-sm font-semibold">
                    バンド
                  </div>
                  <div className="font-mono text-sm">{product.bandType_ja}</div>
                </div>

                <div className="flex items-center border-b border-altlight py-3">
                  <div className="ml-6 w-[180px] text-sm font-semibold">
                    重さ
                  </div>
                  <div className="font-mono text-sm">{product.weight}g</div>
                </div>

                <div className="flex items-center border-b border-altlight py-3">
                  <div className="ml-6 w-[180px] text-sm font-semibold">
                    防水
                  </div>
                  <div className="font-mono text-sm">
                    {product.waterResistance}m
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div>
        <Reviews
          productId={productId}
          totalPages={totalPages}
          reviews={reviewData.reviews}
          totalCount={reviewData.totalCount}
        />
      </div>
    </div>
  );
};

export default ProductPage;
