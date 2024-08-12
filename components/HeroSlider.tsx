"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";
import SwiperCore from "swiper";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";
import HeroSliderImage from "./HeroSliderImage";
import { useState } from "react";
import Link from "next/link";

const featuredProducts = [
  {
    name: "SN-02B",
    caseType: "MODERN",
    caseWidth: "38.5mm",
    weight: "83g",
    movement: "MECHANICAL",
    desktopImageSrc: "/assets/home/hero/SN-02B-promotion-wide.png.webp",
    mobileImageSrc: "/assets/home/hero/SN-02B-promotion-alt.png.webp",

    textColor: "xl:text-[#505050]",
    mobileTextColor: "text-[#dddddd]",

    bgColor: "xl:bg-[#505050]",
    mobileBgColor: "bg-[#dddddd]",

    borderColor: "xl:border-[#505050]",
    mobileBorderColor: "border-[#dddddd]",

    url: "/products/",
  },
  {
    name: "CG-02L",
    caseType: "CLASSIC",
    caseWidth: "39.5mm",
    weight: "102g",
    movement: "AUTOMATIC",
    desktopImageSrc: "/assets/home/hero/CG-02L-promotion-wide.png.webp",
    mobileImageSrc: "/assets/home/hero/CG-02L-promotion.png.webp",

    textColor: "xl:text-[#505050]",
    mobileTextColor: "text-[#505050]",

    bgColor: "xl:bg-[#505050]",
    mobileBgColor: "bg-[#505050]",

    borderColor: "xl:border-[#505050]",
    mobileBorderColor: "border-[#505050]",

    url: "/products/",
  },
  // {
  //   name: "CS-03B",
  //   caseType: "CLASSIC",
  //   caseWidth: "39.5mm",
  //   weight: "102g",
  //   movement: "AUTOMATIC",
  //   desktopImageSrc: "/assets/home/hero/CS-03B-promotion-wide.png.webp",
  //   mobileImageSrc: "/assets/home/hero/CS-03B-promotion.png.webp",

  //   textColor: "xl:text-foreground",
  //   mobileTextColor: "text-foreground",

  //   bgColor: "xl:bg-foreground",
  //   mobileBgColor: "bg-foreground",

  //   borderColor: "xl:border-foreground",
  //   mobileBorderColor: "border-foreground",

  //   url: "/products/",
  // },
  {
    name: "DS-01DB3",
    caseType: "DIVER",
    caseWidth: "38mm",
    weight: "152g",
    movement: "AUTOMATIC",
    desktopImageSrc: "/assets/home/hero/DS-01DB3-promotion-wide.png.webp",
    mobileImageSrc: "/assets/home/hero/DS-01DB3-promotion.png.webp",

    textColor: "xl:text-[#dddddd]",
    mobileTextColor: "text-[#dddddd]",

    bgColor: "xl:bg-[#dddddd]",
    mobileBgColor: "bg-[#dddddd]",

    borderColor: "xl:border-[#dddddd]",
    mobileBorderColor: "border-[#dddddd]",

    url: "/products/",
  },
  {
    name: "CN-02DG2",
    caseType: "CLASSIC",
    caseWidth: "39.5mm",
    weight: "102g",
    movement: "AUTOMATIC",
    desktopImageSrc: "/assets/home/hero/CN-02DG2-promotion-wide.png.webp",
    mobileImageSrc: "/assets/home/hero/CN-02DG2-promotion.png.webp",

    textColor: "xl:text-[#dddddd]",
    mobileTextColor: "text-[#dddddd]",

    bgColor: "xl:bg-[#dddddd]",
    mobileBgColor: "bg-[#dddddd]",

    borderColor: "xl:border-[#dddddd]",
    mobileBorderColor: "border-[#dddddd]",

    url: "/products/",
  },
  {
    name: "CS-05L5",
    caseType: "CLASSIC",
    caseWidth: "39.5mm",
    weight: "102g",
    movement: "AUTOMATIC",
    desktopImageSrc: "/assets/home/hero/CS-05L5-promotion-wide.png.webp",
    mobileImageSrc: "/assets/home/hero/CS-05L5-promotion.png.webp",

    textColor: "xl:text-[#dddddd]",
    mobileTextColor: "text-[#dddddd]",

    bgColor: "xl:bg-[#dddddd]",
    mobileBgColor: "bg-[#dddddd]",

    borderColor: "xl:border-[#dddddd]",
    mobileBorderColor: "border-[#dddddd]",

    url: "/products/",
  },
];

const HeroSlider = () => {
  const [swiperInstance, setSwiperInstance] = useState<SwiperCore>();

  return (
    <Swiper
      onSwiper={setSwiperInstance}
      effect={"fade"}
      modules={[EffectFade, Autoplay]}
      centeredSlides={true}
      autoplay={{
        delay: 3500,
      }}
      loop
      slidesPerView={1}
      className="w-full flex justify-center items-center"
    >
      {featuredProducts.map((featuredProduct, i) => (
        <SwiperSlide key={i}>
          <Link
            href={featuredProduct.url}
            className="w-full flex items-center justify-center relative max-h-[calc(100vh-56px)]"
          >
            <HeroSliderImage
              desktopImageSrc={featuredProduct.desktopImageSrc}
              mobileImageSrc={featuredProduct.mobileImageSrc}
            />
            <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
              <div className="w-full h-full flex justify-between max-w-[1920px] p-3 xs:p-5 md:p-16">
                <div className="w-full h-full hidden xs:flex">
                  <p
                    className={`
                        block 
                        text-[0.688rem] 
                        md:text-sm 
                        font-mono 
                        self-end 
                        ${featuredProduct.textColor} 
                        ${featuredProduct.mobileTextColor} 
                        leading-none
                      `}
                  >
                    NAME: {featuredProduct.name}
                    <br />
                    CASE TYPE: {featuredProduct.caseType}
                    <br />
                    CASE WIDTH: {featuredProduct.caseWidth}
                    <br />
                    WEIGHT: {featuredProduct.weight}
                    <br />
                    MOVEMENT: {featuredProduct.movement}
                  </p>
                </div>
                <div className="w-full h-full flex justify-end items-end">
                  <div
                    className={`
                      flex 
                      flex-col 
                      justify-end 
                      gap-3 
                      h-full 
                      `}
                  >
                    <div className="flex items-center gap-2 xs:gap-3 self-end">
                      {featuredProducts.map((_current, currentIndex) => (
                        <button
                          className={`
                            rounded-full  
                            w-2 
                            md:w-3 
                            h-2 
                            md:h-3 
                            border 
                            md:border-2
                            ${featuredProduct.borderColor}
                            ${featuredProduct.mobileBorderColor}
                            ${
                              currentIndex === i &&
                              featuredProduct.mobileBgColor
                            }
                            ${currentIndex === i && featuredProduct.bgColor}
                          `}
                          key={currentIndex}
                          onClick={() => {
                            swiperInstance?.slideToLoop(currentIndex);
                          }}
                        ></button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default HeroSlider;
