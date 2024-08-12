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
    desktopImageSrc:
      "https://res.cloudinary.com/dve4hcdfo/image/upload/v1723472692/Amser/Home/hero/lsuapzmdopkbp4mba1pa.webp",
    mobileImageSrc:
      "https://res.cloudinary.com/dve4hcdfo/image/upload/v1723472691/Amser/Home/hero/qcqil3zigiwln73e04jf.webp",

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
    desktopImageSrc:
      "https://res.cloudinary.com/dve4hcdfo/image/upload/v1723472690/Amser/Home/hero/lyrvyfrrys1iuyw8uoda.webp",
    mobileImageSrc:
      "https://res.cloudinary.com/dve4hcdfo/image/upload/v1723472690/Amser/Home/hero/lx31014h1v9rvauuttwl.webp",

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
  //   desktopImageSrc: "https://res.cloudinary.com/dve4hcdfo/image/upload/v1723472692/Amser/Home/hero/zwshtps1aidm6bsyv4ae.webp",
  //   mobileImageSrc: "https://res.cloudinary.com/dve4hcdfo/image/upload/v1723472692/Amser/Home/hero/uggq51wbmysxxiawfwsv.webp",

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
    desktopImageSrc:
      "https://res.cloudinary.com/dve4hcdfo/image/upload/v1723472690/Amser/Home/hero/og6r9jc5w0khpgv3drw0.webp",
    mobileImageSrc:
      "https://res.cloudinary.com/dve4hcdfo/image/upload/v1723472690/Amser/Home/hero/wfrwf25ceguymmr2rvo6.webp",

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
    desktopImageSrc:
      "https://res.cloudinary.com/dve4hcdfo/image/upload/v1723472690/Amser/Home/hero/yybgjac2tucb8gimnqhn.webp",
    mobileImageSrc:
      "https://res.cloudinary.com/dve4hcdfo/image/upload/v1723472692/Amser/Home/hero/swcn8iovuv9b0in3dyf3.webp",

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
    desktopImageSrc:
      "https://res.cloudinary.com/dve4hcdfo/image/upload/v1723472690/Amser/Home/hero/lkxth58bt4burzbrhmlh.webp",
    mobileImageSrc:
      "https://res.cloudinary.com/dve4hcdfo/image/upload/v1723472692/Amser/Home/hero/wdmuddmbyofl3amocsu8.webp",

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
      className="flex w-full items-center justify-center"
    >
      {featuredProducts.map((featuredProduct, i) => (
        <SwiperSlide key={i}>
          <Link
            href={featuredProduct.url}
            className="relative flex max-h-[calc(100vh-56px)] w-full items-center justify-center"
          >
            <HeroSliderImage
              desktopImageSrc={featuredProduct.desktopImageSrc}
              mobileImageSrc={featuredProduct.mobileImageSrc}
            />
            <div className="absolute left-0 top-0 flex h-full w-full items-center justify-center">
              <div className="flex h-full w-full max-w-[1920px] justify-between p-3 xs:p-5 md:p-16">
                <div className="hidden h-full w-full xs:flex">
                  <p
                    className={`block self-end font-mono text-[0.688rem] md:text-sm ${featuredProduct.textColor} ${featuredProduct.mobileTextColor} leading-none`}
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
                <div className="flex h-full w-full items-end justify-end">
                  <div className={`flex h-full flex-col justify-end gap-3`}>
                    <div className="flex items-center gap-2 self-end xs:gap-3">
                      {featuredProducts.map((_current, currentIndex) => (
                        <button
                          className={`h-2 w-2 rounded-full border md:h-3 md:w-3 md:border-2 ${featuredProduct.borderColor} ${featuredProduct.mobileBorderColor} ${
                            currentIndex === i && featuredProduct.mobileBgColor
                          } ${currentIndex === i && featuredProduct.bgColor} `}
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
