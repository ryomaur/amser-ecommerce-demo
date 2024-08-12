"use client";

import Image from "next/image";
import React, { useCallback, useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";

interface ModalProps {
  isOpen?: boolean;
  onClose: () => void;
  src: string;
}

const ImageModal: React.FC<ModalProps> = ({ isOpen, onClose, src }) => {
  const [showModal, setShowModal] = useState(isOpen);

  useEffect(() => {
    setShowModal(isOpen);
  }, [isOpen]);

  const handleClose = useCallback(() => {
    setShowModal(false);
    onClose();
  }, [onClose]);

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex justify-center items-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none bg-neutral-800/80 backdrop-blur"
          onClick={handleClose}
        >
          <div className="my-6 mx-auto h-full lg:h-auto md:h-auto">
            <div
              className={`
            h-full
          duration-300
          transition
          flex
          items-center
          justify-center
          ${showModal ? "opacity-100" : "opacity-0"}
          `}
            >
              <div className="h-max w-max border-0 rounded-lg shadow-lg bg-white outline-none focus:outline-none overflow-hidden relative">
                <button
                  className="absolute transition hover:opacity-70 top-[5%] right-[5%] rounded-full bg-bgtransparent backdrop-blur-xl p-1"
                  onClick={handleClose}
                >
                  <IoClose size={32} />
                </button>
                <div className="max-w-[90vw] max-h-[90vh] md:max-w-[85vw] md:max-h-[85vh]">
                  <Image
                    src={src}
                    alt="拡大商品画像"
                    height={0}
                    width={0}
                    sizes="90vh"
                    className="w-full h-auto max-h-[85vh] max-w-[85vw] object-contain"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ImageModal;
