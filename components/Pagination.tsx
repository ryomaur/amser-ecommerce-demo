"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import {
  LuArrowLeft,
  LuArrowRight,
  LuChevronFirst,
  LuChevronLast,
} from "react-icons/lu";

interface PaginationProps {
  totalPages: number;
}

const Pagination: React.FC<PaginationProps> = ({ totalPages }) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentPage = Number(searchParams.get("page")) || 1;
  const maxPage = Math.min(totalPages, Math.max(currentPage + 2, 5));
  const minPage = Math.max(1, Math.min(currentPage - 2, maxPage - 3));
  const numberedPageItems: JSX.Element[] = [];

  for (let pageNumber = minPage; pageNumber <= maxPage; pageNumber++) {
    numberedPageItems.push(
      <button
        key={pageNumber}
        aria-label={`Page ${pageNumber}`}
        className={`
                h-8 w-8
                rounded-full
                flex
                items-center
                justify-center
                shadow-md
                ${
                  currentPage === pageNumber
                    ? "bg-foreground text-background"
                    : "bg-bglighter"
                }
              `}
        onClick={() => handleClick(pageNumber.toString())}
      >
        {pageNumber}
      </button>
    );
  }

  const handleClick = (pageNumber: string) => {
    const newSearchParams = new URLSearchParams(searchParams.toString());

    newSearchParams.set("page", pageNumber);

    router.push(
      `${pathname}?${decodeURIComponent(newSearchParams.toString())}`
    );
  };

  return (
    <div className="flex items-center justify-center gap-4 mt-10 md:mt-20">
      <button
        className="h-10 md:h-8 w-10 md:w-8 flex items-center justify-center disabled:opacity-30 bg-bglighter md:bg-transparent rounded-full shadow-md md:shadow-none"
        onClick={() => {
          const newSearchParams = new URLSearchParams(searchParams.toString());

          newSearchParams.set("page", "1");
          router.push(
            `${pathname}?${decodeURIComponent(newSearchParams.toString())}`
          );
        }}
        disabled={currentPage === 1}
      >
        <LuChevronFirst className="text-xl md:text-3xl" strokeWidth={2.3} />
      </button>
      <button
        className="h-10 md:h-8 w-10 md:w-8 flex items-center justify-center mr-5 disabled:opacity-30 bg-bglighter md:bg-transparent rounded-full shadow-md md:shadow-none"
        onClick={() => {
          if (currentPage !== 1) {
            const newSearchParams = new URLSearchParams(
              searchParams.toString()
            );

            newSearchParams.set("page", String(currentPage - 1));

            router.push(
              `${pathname}?${decodeURIComponent(newSearchParams.toString())}`
            );
          }
        }}
        disabled={currentPage === 1}
      >
        <LuArrowLeft className="text-xl md:text-3xl" strokeWidth={2.3} />
      </button>

      {/* モバイル用 */}
      <div className="md:hidden font-mono text-lg flex justify-center items-center">
        {currentPage}/{totalPages}
      </div>

      <div className="hidden md:flex items-center justify-center gap-4">
        {numberedPageItems}
      </div>

      <button
        className="h-10 w-10 md:h-8 md:w-8 flex items-center justify-center ml-5 disabled:opacity-30 bg-bglighter md:bg-transparent rounded-full shadow-md md:shadow-none"
        onClick={() => {
          if (currentPage !== totalPages) {
            const newSearchParams = new URLSearchParams(
              searchParams.toString()
            );

            newSearchParams.set("page", String(currentPage + 1));

            router.push(
              `${pathname}?${decodeURIComponent(newSearchParams.toString())}`
            );
          }
        }}
        disabled={currentPage === totalPages}
      >
        <LuArrowRight className="text-xl md:text-3xl" strokeWidth={2.3} />
      </button>
      <button
        className="h-10 md:h-8 w-10 md:w-8 flex items-center justify-center disabled:opacity-30 bg-bglighter md:bg-transparent rounded-full shadow-md md:shadow-none"
        onClick={() => {
          if (currentPage !== totalPages) {
            const newSearchParams = new URLSearchParams(
              searchParams.toString()
            );

            newSearchParams.set("page", String(totalPages));

            router.push(
              `${pathname}?${decodeURIComponent(newSearchParams.toString())}`
            );
          }
        }}
        disabled={currentPage === totalPages}
      >
        <LuChevronLast className="text-xl md:text-3xl" strokeWidth={2.3} />
      </button>
    </div>
  );
};

export default Pagination;
