"use client";

import { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa6";

interface QuestionProps {
  question: string;
  answer: string;
}

const Question: React.FC<QuestionProps> = ({ question, answer }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className={open ? "rounded-2xl bg-[#dfdfdf]" : ""}>
      <button
        className="flex h-16 w-full items-center justify-between p-6 md:p-8"
        onClick={() => setOpen((prev) => !prev)}
      >
        <h2 className="text-sm font-bold md:text-base">{question}</h2>
        {open ? (
          <FaChevronUp className="text-xl md:text-[1.75rem]" />
        ) : (
          <FaChevronDown className="text-xl md:text-[1.75rem]" />
        )}
      </button>

      {open && (
        <div className="px-7 pb-7 pt-1 md:px-16 md:pb-16 md:pt-8">
          <p className="text-xs md:text-base">{answer}</p>
        </div>
      )}
    </div>
  );
};

export default Question;
