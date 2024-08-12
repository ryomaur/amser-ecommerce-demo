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
    <div className="flex flex-col items-center justify-center gap-5">
      <CldUploadWidget
        signatureEndpoint={"/api/sign-image"}
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
              className="relative flex h-[150px] w-[150px] flex-col items-center justify-center gap-2 overflow-hidden rounded-lg border-2 border-foreground text-sm font-semibold text-foreground"
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
