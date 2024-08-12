"use client";

import ImageModal from "@/components/ImageModal";
import React, { useState } from "react";

interface MainProductImageZoomProps {
  src: string;
}

const MainProductImageZoom: React.FC<MainProductImageZoomProps> = ({ src }) => {
  const [isOpen, setIsOpen] = useState(false);

  const onClose = () => {
    setIsOpen(false);
  };

  return (
    <>
      <div
        className="absolute left-0 top-0 h-full w-full cursor-pointer"
        onClick={() => setIsOpen(true)}
      />
      <ImageModal src={src} isOpen={isOpen} onClose={onClose} />
    </>
  );
};
export default MainProductImageZoom;
