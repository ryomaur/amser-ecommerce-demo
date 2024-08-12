"use client";

import Image from "next/image";
import SidebarItems from "./SidebarItems";
import { FiMenu, FiX } from "react-icons/fi";
import { useState } from "react";
import Link from "next/link";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <>
      <nav
        className={`relative flex h-screen w-[360px] flex-col bg-background py-7 font-sans shadow-lg ${
          isOpen ? "block" : "hidden"
        }`}
      >
        <Link className="flex w-full items-center justify-center" href={"/"}>
          <Image
            src={"/logo.svg"}
            alt="ロゴ"
            width={120}
            height={100}
            className="object-contain"
          />
        </Link>
        <SidebarItems />
      </nav>
      <button
        className="absolute left-5 top-6"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
      </button>
    </>
  );
};

export default Sidebar;
