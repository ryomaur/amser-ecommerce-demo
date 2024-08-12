import React from "react";
import { RxStarFilled } from "react-icons/rx";

interface StarsProps {
  rating: number;
}

const Stars: React.FC<StarsProps> = ({ rating }) => {
  return (
    <div>
      <div className="flex">
        <div className="px-[1px] py-[3px]">
          <RxStarFilled
            size={20}
            className={`
              ${rating! >= 1 ? "opacity-100" : "opacity-25"}
            `}
          />
        </div>
        <div className="px-[1px] py-[3px]">
          <RxStarFilled
            size={20}
            className={`
              ${rating! >= 2 ? "opacity-100" : "opacity-25"}
            `}
          />
        </div>
        <div className="px-[1px] py-[3px]">
          <RxStarFilled
            size={20}
            className={`
              ${rating! >= 3 ? "opacity-100" : "opacity-25"}
            `}
          />
        </div>
        <div className="px-[1px] py-[3px]">
          <RxStarFilled
            size={20}
            className={`
              ${rating! >= 4 ? "opacity-100" : "opacity-25"}
            `}
          />
        </div>
        <div className="px-[1px] py-[3px]">
          <RxStarFilled
            size={20}
            className={`
              ${rating! >= 5 ? "opacity-100" : "opacity-25"}
            `}
          />
        </div>
      </div>
    </div>
  );
};

export default Stars;
