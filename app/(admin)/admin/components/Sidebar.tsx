"use client";

import Image from "next/image";
import SidebarItems from "./SidebarItems";
import { FiMenu, FiX } from "react-icons/fi";
import { useState } from "react";
import Link from "next/link";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <nav
        className={`z-30 flex h-dvh w-[360px] flex-grow flex-col bg-background py-7 font-sans shadow-lg ${
          isOpen
            ? "absolute left-0 top-0 lg:sticky lg:block"
            : "hidden lg:sticky lg:left-0 lg:top-0 lg:block"
        }`}
      >
        <div className="flex h-full flex-grow flex-col">
          <Link className="flex w-full items-center justify-center" href={"/"}>
            <Image
              src={"/logo.svg"}
              alt="ロゴ"
              width={120}
              height={100}
              className="object-contain"
            />
          </Link>
          <SidebarItems setIsOpen={setIsOpen} />
        </div>
      </nav>
      <button
        className="absolute left-3 top-3 z-50 rounded-full bg-background p-2 shadow-lg lg:hidden"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        {isOpen ? <FiX size={22} /> : <FiMenu size={22} />}
      </button>
    </>
  );
};

export default Sidebar;
