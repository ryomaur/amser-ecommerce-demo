"use client";

import { togglePublic } from "@/actions/togglePublic";
import { Switch } from "@headlessui/react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { BsGlobeAsiaAustralia } from "react-icons/bs";
import { FaLock } from "react-icons/fa6";
import { FiCopy } from "react-icons/fi";

interface UserWishlistTogglePublicButtonProps {
  isPublic: boolean;
}

const UserWishlistTogglePublicButton: React.FC<
  UserWishlistTogglePublicButtonProps
> = ({ isPublic: initialIsPublic }) => {
  const [isPublic, setIsPublic] = useState(initialIsPublic);

  const handleClick = async () => {
    await navigator.clipboard.writeText(window.location.href);
    alert("text copied");
  };

  useEffect(() => {
    const setPublicStatus = async () => {
      const result = await togglePublic(isPublic);
      if (result?.error) {
        toast.error("エラーが発生しました");
        setIsPublic(!isPublic);
      }
    };
    setPublicStatus();
  }, [isPublic]);

  return (
    <div className="mt-3 flex flex-col items-end">
      <p>
        リストの公開：{" "}
        <span className="font-semibold">{isPublic ? "ON" : "OFF"}</span>
      </p>

      <div className="mt-2 flex items-center gap-4">
        <div className="flex items-center gap-2">
          <FaLock size={16} />
        </div>
        <Switch
          checked={isPublic}
          onChange={setIsPublic}
          className={`${
            isPublic ? "bg-blue" : "bg-gray-400"
          } relative inline-flex h-6 w-12 items-center rounded-full`}
        >
          <span className="sr-only">ウィッシュリストを公開する</span>
          <span
            className={`${
              isPublic ? "translate-x-7" : "translate-x-1"
            } inline-block h-4 w-4 transform rounded-full bg-white transition`}
          />
        </Switch>
        <div className="flex items-center gap-2">
          <BsGlobeAsiaAustralia size={16} />
        </div>
      </div>

      {isPublic && (
        <button
          className="mt-5 flex items-center rounded-lg border-2 border-transparent bg-bglighter px-5 py-2 font-medium shadow-sm hover:border-gray-300"
          onClick={handleClick}
        >
          リンクをコピー
          <FiCopy size={16} className="ml-2" />
        </button>
      )}
    </div>
  );
};

export default UserWishlistTogglePublicButton;
