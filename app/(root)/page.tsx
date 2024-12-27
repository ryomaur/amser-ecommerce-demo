import { getWishlist } from "@/actions/wishlist";
import HeroSlider from "@/components/HeroSlider";
import ProductCard from "@/components/ProductCard";
import prisma from "@/lib/db";
import Image from "next/image";
import Link from "next/link";

const getNewProducts = async () => {
  const products = await prisma.product.findMany({
    where: {
      productType: "watch",
    },
    orderBy: {
      createdAt: "desc",
    },
    take: 8,
  });

  return products;
};

export default async function Home() {
  const newProducts = await getNewProducts();
  const wishlist = await getWishlist();

  return (
    <main className="home-background mx-auto w-full bg-bglighter pt-[3.25rem] font-sans text-foreground sm:pt-14 xl:bg-background">
      <section className="w-full">
        <HeroSlider />
      </section>

      <section className="w-full py-16 md:py-32">
        <h1 className="text-center text-xl font-bold md:text-3xl">
          新作ウォッチ
        </h1>
        <div className="mx-auto flex max-w-[1920px] flex-col items-center justify-center">
          <div className="mx-auto my-10 grid w-full grid-cols-2 items-center justify-center gap-x-3 gap-y-3 px-3 md:my-16 md:grid-cols-3 md:gap-x-5 md:gap-y-5 md:px-20 lg:grid-cols-4 xl:w-auto xl:gap-x-10 xl:gap-y-10 xl:px-3">
            {newProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                wishlist={wishlist}
              />
            ))}
          </div>
        </div>
        <div className="mb-4 mt-3 flex w-full items-center justify-center md:mb-8 md:mt-5">
          <Link href={"/products?productType=watch"}>
            <h2 className="rounded-full border border-foreground px-12 py-2 font-medium text-foreground transition duration-300 hover:bg-foreground hover:text-background">
              すべてのラインナップ
            </h2>
          </Link>
        </div>
      </section>

      <section className="h-max w-full bg-[#121212] py-20 lg:py-16 xl:mt-20">
        <div className="mx-auto h-max max-w-[1920px] md:px-20">
          <div className="flex flex-col items-center justify-center gap-6 lg:flex-row lg:gap-24">
            <div className="flex h-auto w-[90%] items-center justify-center md:w-[70%] lg:w-[28%]">
              <Image
                src={
                  "https://swhnoabqzwrjxdrv.public.blob.vercel-storage.com/movement-OksH5bAMwLtjPa6YqJNGoMuK4pVLej.webp"
                }
                alt="ムーブメント画像"
                sizes="(max-width: 768px) 90vw, 50vw"
                className="object-cover"
                height={702}
                width={920}
                quality={90}
              />
            </div>
            <div className="flex flex-col items-center justify-center gap-5">
              <h2 className="text-xl font-bold text-background">
                Amserの自社製ムーブメント
              </h2>
              <Link href={"/movement"}>
                <h2 className="rounded-full border border-background px-10 py-2 text-sm font-medium text-background transition duration-300 hover:bg-background hover:text-foreground">
                  特設ページを見る
                </h2>
              </Link>
            </div>
          </div>
        </div>
      </section>
      <section className="w-full bg-bglighter py-32">
        <div className="mx-auto w-full max-w-[1600px] px-12">
          <div className="flex flex-col items-center justify-center gap-8">
            <h1 className="text-center font-sans text-3xl font-bold">
              Amserについて
            </h1>
            <p className="max-w-3xl text-center text-sm">
              1999年に誕生したAmserは、時代を超越したミニマルなデザインを追求し、高い精度を持った時計を優れた品質と価格で提供することに挑戦し続けています。
            </p>
            <Link href={"/about"}>
              <h2 className="rounded-full border border-foreground px-10 py-2 text-sm font-medium text-foreground transition duration-300 hover:bg-foreground hover:text-background">
                詳しく知る
              </h2>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
