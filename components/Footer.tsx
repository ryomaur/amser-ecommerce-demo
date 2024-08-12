import Image from "next/image";
import Link from "next/link";
import { IoArrowForwardOutline, IoArrowUpOutline } from "react-icons/io5";
import {
  RiInstagramFill,
  RiPinterestFill,
  RiTwitterXFill,
} from "react-icons/ri";

const Footer = () => {
  return (
    <div className="w-full font-sans bg-altdark pb-5">
      <div className="max-w-[1440px] mx-auto">
        <div className="w-full flex justify-center">
          <Link href={"/"} className="my-16">
            <div className="w-40 h-6 md:w-52 md:h-8 relative">
              <Image
                src={"/logo-white.svg"}
                fill
                className="object-contain"
                alt="ロゴ"
              />
            </div>
          </Link>
        </div>
        <div className="px-5 lg:px-16 flex flex-col lg:flex-row items-start justify-between">
          <div className="flex w-full justify-center lg:w-auto lg:flex-col gap-6 lg:pt-8">
            <Link
              href={"#"}
              className="rounded-full bg-light p-2 hover:bg-altlight"
            >
              <RiInstagramFill className="text-altdark text-2xl lg:text-[1.75rem]" />
            </Link>
            <Link
              href={"#"}
              className="rounded-full bg-light p-2 hover:bg-altlight"
            >
              <RiPinterestFill className="text-altdark text-2xl lg:text-[1.75rem]" />
            </Link>
            <Link
              href={"#"}
              className="rounded-full bg-light p-2 hover:bg-altlight"
            >
              <RiTwitterXFill className="text-altdark text-2xl lg:text-[1.75rem]" />
            </Link>
          </div>

          <div className="flex flex-col justify-center items-center mt-10 lg:mt-0 w-full md:w-auto md:mx-auto lg:mx-0">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full md:w-auto">
              <div className="flex flex-col border-t-2 border-light w-full md:w-40 gap-3 pt-5 px-2">
                <h2 className="font-normal text-light font-mono text-base md:text-lg">
                  PRODUCTS
                </h2>
                <div className="flex flex-col gap-2 text-xs md:text-sm">
                  <Link
                    href={"/products?productType=watch"}
                    className="text-light font-light"
                  >
                    時計
                  </Link>
                  <Link
                    href={"/products?productType=band"}
                    className="text-light font-light"
                  >
                    バンド
                  </Link>
                </div>
              </div>
              <div className="flex flex-col border-t-2 border-light w-full md:w-40 gap-3 pt-5 px-2">
                <h2 className="font-normal text-light font-mono text-base md:text-lg">
                  ABOUT
                </h2>
                <div className="flex flex-col gap-2 text-xs md:text-sm">
                  <Link href={"/about"} className="text-light font-light">
                    ブランド
                  </Link>
                  <Link
                    href={"/about#technology"}
                    className="text-light font-light"
                  >
                    テクノロジー
                  </Link>
                  <Link
                    href={"/about#history"}
                    className="text-light font-light"
                  >
                    ヒストリー
                  </Link>
                  <Link
                    href={"/about#questions"}
                    className="text-light font-light"
                  >
                    よくある質問
                  </Link>
                </div>
              </div>
              <div className="flex flex-col border-t-2 border-light w-full md:w-40 gap-3 pt-5 px-2">
                <h2 className="font-normal text-light font-mono text-base md:text-lg">
                  SUPPORT
                </h2>
                <div className="flex flex-col gap-2 text-xs md:text-sm">
                  <Link
                    href={"/support#shipment"}
                    className="text-light font-light"
                  >
                    発送
                  </Link>
                  <Link
                    href={"/support#payment"}
                    className="text-light font-light"
                  >
                    お支払い
                  </Link>
                  <Link
                    href={"/support#maintenance"}
                    className="text-light font-light"
                  >
                    メンテナンス
                  </Link>
                  <Link
                    href={"/support#repair"}
                    className="text-light font-light"
                  >
                    修理
                  </Link>
                </div>
              </div>
            </div>

            <div className="w-full mt-16">
              <div className="w-full flex items-center justify-center">
                <h2 className="text-light font-semibold whitespace-nowrap text-sm md:text-base">
                  ニュースレターに登録
                </h2>
                <div className="h-[1px] bg-light w-full ml-4" />
              </div>
              <form className="w-full flex items-center justify-center mt-4">
                <input
                  type="email"
                  placeholder="メールアドレス"
                  className="bg-transparent border border-light p-3 rounded-lg font-light w-full outline-none text-light text-xs md:text-sm"
                />
                <button
                  type="submit"
                  className="p-2 rounded-full border border-light ml-2 md:ml-4 hover:bg-light group"
                >
                  <IoArrowForwardOutline className="text-light group-hover:text-altdark text-2xl md:text-[1.625rem]" />
                </button>
              </form>
            </div>
          </div>

          <div className="lg:flex items-center justify-center pt-8 relative hidden">
            <Link href={"#"} className="group">
              <IoArrowUpOutline
                size={44}
                className="text-light group-hover:text-altlight"
              />
              <div className="font-bold whitespace-nowrap absolute top-32 -right-[25px] rotate-90 text-light group-hover:text-altlight">
                トップへ戻る
              </div>
            </Link>
          </div>
        </div>
      </div>

      <p className="text-center text-xs font-light text-light mt-20">
        &copy; Amser Watch 2024
      </p>
    </div>
  );
};

export default Footer;
