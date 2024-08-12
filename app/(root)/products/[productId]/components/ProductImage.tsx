"use client";

import ImageModal from "@/components/ImageModal";
import Image from "next/image";
import React, { useState } from "react";

interface ProductImageProps {
  src: string;
}

const ProductImage: React.FC<ProductImageProps> = ({ src }) => {
  const [isOpen, setIsOpen] = useState(false);

  const onOpen = () => {
    setIsOpen(true);
  };

  const onClose = () => {
    setIsOpen(false);
  };

  return (
    <>
      <div className="relative mx-auto aspect-square h-[80vw] cursor-pointer overflow-hidden rounded-2xl md:h-[22rem] xl:h-[26rem]">
        <Image
          src={src}
          alt="商品画像"
          fill
          className="object-cover"
          onClick={onOpen}
        />
      </div>
      <ImageModal src={src} isOpen={isOpen} onClose={onClose} />
    </>
  );
};

export default ProductImage;
