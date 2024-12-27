"use client";

import { useMotionValueEvent, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { useCallback, useMemo, useRef } from "react";
import { FaAngleDown } from "react-icons/fa6";
import "./movementPage.css";

const sections = [
  {
    heading: "高い耐衝撃性",
    description:
      "理非をなりなのもついに生涯が同時にですたです。いやしくも大森さんを研究自信いっそ理解になっだ飯この主義私か前後をに対して皆批評ありたですんて、その時間はそこか途落語を教えで、木下さんの事を顔の何にむしろお増減とするがいつ書物が不ふりにしようにひょろひょろご戦争を使うたなて。",
  },
  {
    heading: "効率を極めた独自の機構",
    description:
      "けっしてほかで説明学もことにその約束ですだでも、多少にはなりただたでし。理非をなりなのもついに生涯が同時にですたです。研究自信いっそ理解になっだ飯この主義私か前後をに対して皆批評ありたですんて、木下さんの事を顔の何にむしろお増減とするがいつ書物が不ふりにしようにひょろひょろご戦争を使うたなて、すこぶるすでに発会を入っですてならです。",
  },
  {
    heading: "伝統と最新技術の融合",
    description:
      "すこぶるすでに発会を入っですてならですのが充たすですます。理非をなりなのもついに生涯が同時にですたです。いやしくも大森さんを研究自信いっそ理解になっだ飯この主義私か前後をに対して皆批評ありたですんて、その時間はそこか途落語を教えで、木下さんの事を顔の何にむしろお増減とするがいつ書物が不ふりにしようにひょろひょろご戦争を使うたなて。",
  },
  {
    heading: "厳格な精度管理",
    description:
      "いやしくも大森さんを研究自信いっそ理解になっだ飯この主義私か前後をに対して皆批評ありたですんて、多少にはなりただたでし。理非をなりなのもついに生涯が同時にですたです。その時間はそこか途落語を教えで、すこぶるすでに発会を入っですてならですのが充たすですます。",
  },
];

export default function MovementPage() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const totalFrame = 270;
  const videoWidth = 768;
  const videoHeight = 768;

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const frames = useMemo(() => {
    const loadedFrames: HTMLImageElement[] = [];

    for (let i = 1; i <= totalFrame; i++) {
      const img = new Image();
      img.src = `https://swhnoabqzwrjxdrv.public.blob.vercel-storage.com/breakdown-animation-768/${i}.webp`;
      loadedFrames.push(img);
    }

    return loadedFrames;
  }, []);

  const currentIndex = useTransform(scrollYProgress, [0, 1], [1, totalFrame]);

  const render = useCallback(
    (index: number) => {
      if (frames[index - 1]) {
        canvasRef.current
          ?.getContext("2d")
          ?.drawImage(
            frames[index - 1],
            0,
            0,
            videoWidth,
            videoHeight,
            0,
            0,
            canvasRef.current.width,
            canvasRef.current.height,
          );
      }
    },
    [frames],
  );

  useMotionValueEvent(currentIndex, "change", (latest) => {
    render(Number(latest.toFixed()));
  });

  return (
    <div className="font-sans text-foreground">
      <div className="relative flex h-screen w-full items-center justify-center">
        <h1 className="text-center text-3xl font-extrabold md:text-5xl">
          Amserの
          <br className="lg:hidden" />
          機械式ムーブメント
        </h1>
        <div className="absolute bottom-8 left-0 flex w-full items-center justify-center">
          <FaAngleDown className="animate-bounce text-4xl" />
        </div>
      </div>

      <div className="movement-container" ref={containerRef}>
        <div className="canvas-container">
          <canvas
            className="canvas"
            ref={canvasRef}
            width={videoWidth}
            height={videoHeight}
          ></canvas>
        </div>

        <div className="description-container">
          {sections.map((section, i) => (
            <div className="description" key={i}>
              <div className="sticky top-0 flex h-[100vh] w-full flex-col justify-center gap-2 px-5 lg:gap-5 lg:px-20">
                <h1 className="heading text-xl font-bold md:text-2xl lg:text-3xl">
                  {section.heading}
                </h1>
                <p className="texts max-w-[480px] text-xs lg:text-base">
                  {section.description}
                </p>
              </div>
              <div className="h-[200vh]" />
            </div>
          ))}
          <div className="description">
            <div className="final-heading-container sticky top-0 flex h-[100vh] w-full flex-col justify-center gap-5 px-8 lg:px-20">
              <h1 className="final-heading text-xl font-bold lg:text-3xl">
                職人魂が産んだ
                <br />
                高品質メカニカル
                <br className="lg:hidden" />
                ムーブメント
              </h1>
            </div>
            <div className="h-[150vh]" />
          </div>
        </div>
      </div>

      <div className="mt-20 flex h-screen w-full flex-col items-center justify-center gap-8">
        <h1 className="text-center text-xl font-bold leading-normal md:text-3xl">
          Amserの機械式時計を
          <br className="lg:hidden" />
          チェックしよう
        </h1>
        <Link href={"/products?productType=watch&movement=mechanical"}>
          <h2 className="rounded-full border border-foreground px-12 py-2 text-sm font-medium text-foreground transition duration-300 hover:bg-foreground hover:text-background md:text-base">
            ラインナップを見る
          </h2>
        </Link>
      </div>
    </div>
  );
}
