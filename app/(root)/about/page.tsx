import Image from "next/image";
import React from "react";
import TechnologyButton from "./components/TechnologyButton";
import Questions from "./components/Questions";

export const metadata = {
  title: "Amserについて | Amser",
  description:
    "1999年に誕生したAmserは、時代を超越したミニマルなデザインを追求し、高い精度を持った時計を優れた品質と価格で提供することに挑戦し続けています。",
};

const BrandPage = () => {
  return (
    <div className="main-container mb-36 mt-14 min-h-[50vh] font-sans text-foreground md:mb-64">
      <section className="px-4 lg:px-0">
        <div className="mx-auto flex h-[70vh] flex-col items-center justify-center md:h-auto">
          <div className="mt-16 py-16 md:mt-0 lg:py-32">
            <h1 className="text-center text-3xl font-bold md:text-4xl lg:text-5xl">
              About us
            </h1>
          </div>

          <div className="mx-auto max-w-[928px] overflow-x-visible rounded-xl bg-foreground p-8 shadow-md md:rounded-[1.875rem] md:p-24">
            <div className="flex justify-center">
              <Image
                src={
                  "https://res.cloudinary.com/dve4hcdfo/image/upload/v1723473002/Amser/About/gdxwartzfdbugxx1lcti.webp"
                }
                alt="オフィス画像"
                width={736}
                height={300}
                quality={100}
                sizes="60vw"
                className="rounded-lg object-contain"
              />
            </div>

            <p className="mt-8 text-base font-medium text-background md:mt-24 md:text-2xl">
              1999年に誕生したAmserは、時代を超越したミニマルなデザインを追求し、高い精度を持った時計を優れた品質と価格で提供することに挑戦し続けています。
            </p>
          </div>
        </div>

        <div className="mx-auto mt-32 w-full max-w-[1600px] overflow-x-visible px-4 md:px-12">
          <div className="flex w-full flex-col-reverse items-center justify-center gap-5 md:gap-20 lg:flex-row">
            <div className="flex max-w-96 flex-col justify-center gap-5">
              <h2 className="text-center text-xl font-bold md:text-left md:text-4xl">
                洗練された
                <br />
                タイムレスなデザイン
              </h2>
              <p className="text-sm md:text-base">
                Amserはヴィンテージウォッチとコンテンポラリーウォッチ、両方の良い面を併せ持った、ミニマルなデザインを追求しています。
              </p>
            </div>

            <Image
              src={
                "https://res.cloudinary.com/dve4hcdfo/image/upload/v1723473002/Amser/About/mwecrvwwy4qrhrzivjei.webp"
              }
              alt="デザイン"
              width={384}
              height={720}
              quality={100}
              sizes="(max-width: 768px) 90vw, 50vw"
              className="slide-left-animation"
            />
          </div>

          <div className="mt-32 flex w-full flex-col items-center justify-center gap-8 md:gap-20 lg:flex-row">
            <Image
              src={
                "https://res.cloudinary.com/dve4hcdfo/image/upload/v1723473002/Amser/About/qupldgdiez7xj6tfasqz.webp"
              }
              alt="ムーブメント"
              width={480}
              height={720}
              quality={100}
              sizes="(max-width: 768px) 90vw, 50vw"
              className="slide-right-animation"
            />
            <div className="flex max-w-96 flex-col gap-5">
              <h2 className="text-center text-xl font-bold md:text-left md:text-4xl">
                品質と価格
              </h2>
              <p className="text-sm md:text-base">
                伝統的な職人技と最新の技術を融合し、自社製ムーブメントを用いた高品質な時計をリーズナブルな価格で提供しています。
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-52" id="technology">
        <h2 className="text-center text-2xl font-bold md:text-4xl">
          テクノロジー
        </h2>
        <div className="mt-12 grid grid-cols-1 justify-center gap-8 px-4 md:mt-24 md:grid-cols-3 md:px-8">
          <div className="relative mx-auto h-64 w-full rounded-2xl bg-bglighter px-12 shadow-sm transition duration-300 hover:shadow-lg md:h-80 md:px-8 xl:h-64 xl:w-[352px] xl:px-16">
            <h3 className="mt-12 text-center text-lg font-bold lg:text-xl xl:mt-14">
              高品質な
              <br className="hidden md:block xl:hidden" />
              ムーブメント
            </h3>
            <p className="mt-6 text-sm">
              高い精度と信頼性のあるクオーツと機械式ムーブメントを製造しています。
            </p>
            <TechnologyButton subject="movement" />
          </div>

          <div className="relative mx-auto h-64 w-full rounded-2xl bg-bglighter px-12 shadow-sm transition duration-300 hover:shadow-lg md:h-80 md:px-8 xl:h-64 xl:w-[352px] xl:px-16">
            <h3 className="mt-12 text-center text-lg font-bold lg:text-xl xl:mt-14">
              耐久性
            </h3>
            <p className="mt-6 text-sm">
              当社では、時計の耐久性や耐傷性を確保するため、高品質な素材のみを使用しています。
            </p>
            <TechnologyButton subject="material" />
          </div>

          <div className="relative mx-auto h-64 w-full rounded-2xl bg-bglighter px-12 shadow-sm transition duration-300 hover:shadow-lg md:h-80 md:px-8 xl:h-64 xl:w-[352px] xl:px-16">
            <h3 className="mt-12 text-center text-lg font-bold lg:text-xl xl:mt-14">
              お求めやすさ
            </h3>
            <p className="mt-6 text-sm">
              最適化された製造方法や自動化によってコストの削減を可能にしています。
            </p>
            <TechnologyButton subject="affordability" />
          </div>
        </div>
      </section>

      <section className="mt-36 px-8 md:mt-52" id="history">
        <h2 className="text-center text-2xl font-bold md:text-4xl">歴史</h2>
        <div className="mx-auto mt-16 max-w-xl border-l-2 border-foreground md:mt-24">
          <div className="relative">
            <div className="absolute -left-[13px] top-0 h-6 w-6 rounded-full bg-foreground" />
            <div className="flex flex-col items-start gap-5 md:flex-row md:gap-7">
              <h3 className="ml-8 font-mono text-xl font-light md:ml-10">
                1999
              </h3>
              <div className="ml-10 flex flex-col gap-4 pb-12 md:ml-0 md:gap-6 md:pb-16">
                <h3 className="text-lg font-semibold md:text-xl">
                  Amserが創業開始
                </h3>
                <p className="text-sm font-light md:text-base">
                  1999年に親友であり時計愛好家の二人、山田太郎とジョン・ドウによって、手頃な価格のミニマルで洗練された時計を作ることを目標に創業されました。
                </p>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -left-3 top-0 h-6 w-6 rounded-full bg-foreground" />
            <div className="flex flex-col items-start gap-5 md:flex-row md:gap-7">
              <h3 className="ml-8 font-mono text-xl font-light md:ml-10">
                2000
              </h3>
              <div className="ml-10 flex flex-col gap-4 pb-12 md:ml-0 md:gap-6 md:pb-16">
                <h3 className="text-lg font-semibold md:text-xl">
                  Amser初の腕時計の製造を開始
                </h3>
                <p className="text-sm font-light md:text-base">
                  2000年、Amserは最初の腕時計シリーズの販売を開始しました。Amserのシンプルですっきりとしたデザインは高く評価され、ファッションに敏感な人の間で人気を博しました。
                  翌年、山田太郎とジョン・ドウは初の小売店を火星のコロンビア・ヒルズにオープンし、すぐに地球と火星の各主要都市にも店舗を拡大していきました。
                </p>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -left-3 top-0 h-6 w-6 rounded-full bg-foreground" />
            <div className="flex flex-col items-start gap-5 md:flex-row md:gap-7">
              <h3 className="ml-8 font-mono text-xl font-light md:ml-10">
                2008
              </h3>
              <div className="ml-10 flex flex-col gap-4 pb-12 md:ml-0 md:gap-6 md:pb-16">
                <h3 className="text-lg font-semibold md:text-xl">
                  自社製ムーブメントを開発
                </h3>
                <p className="text-sm font-light md:text-base">
                  事業が拡大しても、Amserのデザインへのこだわりに変わりはありませんでした。
                  2008年、初の自社製ムーブメントを開発し、重要なマイルストーンを達成しました。
                </p>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -left-3 top-0 h-6 w-6 rounded-full bg-foreground" />
            <div className="flex flex-col items-start gap-5 md:flex-row md:gap-7">
              <h3 className="ml-8 font-mono text-xl font-light md:ml-10">
                2012
              </h3>
              <div className="ml-10 flex flex-col gap-4 pb-12 md:ml-0 md:gap-6 md:pb-16">
                <h3 className="text-lg font-semibold md:text-xl">
                  Amser初の自動巻き取り式腕時計の販売を開始
                </h3>
                <p className="text-sm font-light md:text-base">
                  2012年、初の自動巻き取り式腕時計がお披露目されました。新たな時計は瞬く間にコレクターや愛好家の間でヒットし、ベストセラーとなりました。
                </p>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -left-3 top-0 h-6 w-6 rounded-full bg-foreground" />
            <div className="flex flex-col items-start gap-5 md:flex-row md:gap-7">
              <h3 className="ml-8 font-mono text-xl font-light md:ml-10">
                2017
              </h3>
              <div className="ml-10 flex flex-col gap-4 pb-8 md:ml-0 md:gap-6 md:pb-16">
                <h3 className="text-lg font-semibold md:text-xl">
                  ダイバーズウォッチを発表
                </h3>
                <p className="text-sm font-light md:text-base">
                  初の自動巻き取り式時計の販売開始から5年後の2017年、Amserは初のダイバーズウォッチを発売し製品ラインナップを更に拡大しました。
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-52" id="questions">
        <h2 className="text-center text-2xl font-bold md:text-4xl">
          よくある質問
        </h2>
        <div className="mx-auto mt-24 max-w-2xl px-4 md:px-0">
          <Questions />
        </div>
      </section>
    </div>
  );
};

export default BrandPage;
