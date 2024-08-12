import { getImageProps } from "next/image";

interface HeroSliderImageProps {
  desktopImageSrc: string;
  mobileImageSrc: string;
}

const HeroSliderImage: React.FC<HeroSliderImageProps> = ({
  desktopImageSrc,
  mobileImageSrc,
}) => {
  const {
    props: { srcSet: desktop },
  } = getImageProps({
    alt: "特集商品画像",
    fill: true,
    quality: 100,
    src: desktopImageSrc,
  });

  const {
    props: { srcSet: mobile, ...rest },
  } = getImageProps({
    alt: "特集商品画像",
    fill: true,
    quality: 100,
    src: mobileImageSrc,
    sizes: "(max-width: 1280px) 200vw, 200vw",
  });

  return (
    <picture className="aspect-[3/4] sm:aspect-square xl:aspect-[2/1]">
      <source media="(max-width: 1280px)" srcSet={mobile} />
      <source media="(min-width: 1280px)" srcSet={desktop} />
      <img
        {...rest}
        style={{
          width: "100%",
          height: "auto",
          maxHeight: "calc(100vh-56px)",
        }}
        className="object-cover aspect-[3/4] sm:aspect-square xl:aspect-[2/1]"
        alt="特集商品"
      />
    </picture>
  );
};

export default HeroSliderImage;
