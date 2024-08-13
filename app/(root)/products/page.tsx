import getProducts, { IProductsParams } from "@/actions/getProducts";
import { getWishlist } from "@/actions/wishlist";
import Pagination from "@/components/Pagination";
import ProductCard from "@/components/ProductCard";
import ProductFilter from "@/components/ProductFilter";
import { Categories } from "@/types";
import { TbMoodEmpty } from "react-icons/tb";

export const metadata = {
  title: "商品一覧 | Amser",
};

interface ProductsPageProps {
  searchParams: IProductsParams;
}

const ProductsPage = async ({ searchParams }: ProductsPageProps) => {
  const pageSize = 12;

  const productsData = await getProducts(searchParams, pageSize);
  const categoriesResponse = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/categories`,
    {
      cache: "no-store",
    },
  );
  const categoriesData: Categories = await categoriesResponse.json();
  const wishlist = await getWishlist();

  const totalPages = Math.ceil(productsData.totalCount / pageSize);

  return (
    <div className="mt-20 w-full font-sans text-foreground md:mt-32 md:pb-40">
      <ProductFilter categories={categoriesData} />
      <div className="products-background mx-auto flex max-w-[1920px] flex-col items-center justify-center">
        <div className="mx-auto mt-8 grid w-full grid-cols-2 gap-x-3 gap-y-3 bg-bglighter px-4 pb-8 pt-8 md:mt-16 md:grid-cols-3 md:gap-x-5 md:gap-y-10 md:px-5 lg:grid-cols-4 xl:w-auto xl:gap-x-10 xl:bg-transparent xl:px-0 xl:pb-0 xl:pt-0">
          {productsData.products.map((product) => {
            return (
              <ProductCard
                key={product.id}
                product={product}
                wishlist={wishlist}
              />
            );
          })}

          {productsData.products.length === 0 && (
            <div className="col-span-full flex h-[30vh] w-full items-center justify-center">
              <div className="flex w-full items-center justify-center gap-5 text-center text-sm xs:text-base md:text-xl">
                <p className="font-semibold">商品が見つかりませんでした</p>
                <TbMoodEmpty className="text-5xl text-foreground" />
              </div>
            </div>
          )}
        </div>
        <div className="w-full pb-10 md:pb-20">
          {totalPages > 1 && <Pagination totalPages={totalPages} />}
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;
