"use client";

import TechnologyModal from "./TechnologyModal";
import { useState } from "react";
import { IoArrowForwardOutline } from "react-icons/io5";

interface TechnologyButtonProps {
  subject: "material" | "affordability" | "movement";
}

const TechnologyButton: React.FC<TechnologyButtonProps> = ({ subject }) => {
  const [isOpen, setIsOpen] = useState(false);

  const onOpen = () => {
    setIsOpen(true);
  };

  const onClose = () => {
    setIsOpen(false);
  };

  return (
    <>
      <button
        className="absolute bottom-8 right-16 flex items-center justify-center gap-1 font-medium text-lightblue"
        onClick={onOpen}
      >
        さらに詳しく
        <IoArrowForwardOutline size={16} />
      </button>
      <TechnologyModal subject={subject} isOpen={isOpen} onClose={onClose} />
    </>
  );
};

export default TechnologyButton;
