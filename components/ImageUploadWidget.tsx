"use client";

import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
import { useEffect, useState } from "react";
import { LuImagePlus } from "react-icons/lu";

interface ImageUploadWidgetProps {
  disabled?: boolean;
  onChange: (value: string) => void;
  imageSrc: string | null | undefined;
}

const ImageUploadWidget: React.FC<ImageUploadWidgetProps> = ({
  disabled,
  onChange,
  imageSrc,
}) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, [isMounted]);

  const onSuccess = (result: any) => {
    onChange(result.info.secure_url);
  };

  if (!isMounted) {
    return null;
  }

  return (
    <div className="flex flex-col justify-center items-center gap-5">
      <CldUploadWidget
        uploadPreset="voviurq0"
        onSuccess={onSuccess}
        options={{ multiple: false }}
      >
        {({ open }) => {
          return (
            <button
              onClick={(e: React.FormEvent) => {
                e.preventDefault();
                setTimeout(() => {
                  open();
                }, 1000);
              }}
              disabled={disabled}
              className="relative w-[150px] h-[150px] rounded-lg overflow-hidden flex flex-col gap-2 items-center justify-center border-2 border-foreground text-foreground text-sm font-semibold"
            >
              {imageSrc === "" || !imageSrc ? (
                <>
                  <LuImagePlus size={32} />
                  アップロード
                </>
              ) : (
                <Image
                  src={imageSrc}
                  alt="プレビュー画像"
                  fill
                  className="object-cover"
                />
              )}
            </button>
          );
        }}
      </CldUploadWidget>
    </div>
  );
};

export default ImageUploadWidget;
