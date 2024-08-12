"use client";

import { Tab } from "@headlessui/react";
import { useEffect, useState } from "react";
import { BiFilterAlt } from "react-icons/bi";
import { FiX } from "react-icons/fi";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useMemo } from "react";

const Sort = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const params = useMemo(
    () => new URLSearchParams(searchParams),
    [searchParams]
  );

  const [openFilter, setOpenFilter] = useState(false);

  const [instock, setInstock] = useState<boolean>(
    params.get("instock") ? true : false
  );

  const [sort] = useState<string | null>(params.get("sort"));

  const [filterCount, setFilterCount] = useState<number>(0);

  useEffect(() => {
    setFilterCount(instock ? 1 : 0);

    if (instock) {
      params.set("instock", instock.toString());
    } else {
      params.delete("instock");
    }
  }, [instock, filterCount, params]);

  const handleSelect = (
    setState: (newArray: string[]) => void,
    state: string[],
    newValue: string
  ) => {
    if (state.includes(newValue)) {
      const newArray = state.filter((value) => value !== newValue);
      setState(newArray);
    } else {
      setState([...state, newValue]);
    }
  };

  const onReset = () => {
    setInstock(false);
  };

  const onApply = () => {
    setOpenFilter(false);
    const url = decodeURIComponent(pathname + "?" + params.toString());
    router.push(url);
    router.refresh();
  };

  const onSort = (value: string) => {
    params.set("sort", value);
    params.delete("page");
    const url = decodeURIComponent(pathname + "?" + params.toString());
    router.push(url);
    router.refresh();
  };

  return (
    <>
      <div className="main-container mx-auto flex justify-between items-center">
        <button
          onClick={() => setOpenFilter((prev) => !prev)}
          className={
            openFilter
              ? `py-2 px-5 rounded-lg font-semibold flex items-center gap-2 bg-[#d9d9d9] relative`
              : `py-2 px-5 rounded-lg font-semibold flex items-center gap-2 hover:bg-[#d9d9d9] relative`
          }
        >
          絞り込み {openFilter ? <FiX size={20} /> : <BiFilterAlt size={20} />}
          {filterCount > 0 && (
            <div className="bg-blue w-5 h-5 rounded-full absolute right-1 top-1 flex items-center justify-center text-center text-background text-xs">
              {filterCount}
            </div>
          )}
        </button>
        <div>
          <label htmlFor="sort" className="font-semibold mr-7">
            並び替え
          </label>
          <select
            name="sort"
            id="sort"
            className="bg-transparent focus:outline-none outline-none"
            onChange={(e) => onSort(e.target.value)}
            defaultValue={sort || "newest"}
          >
            <option value="newest">新着</option>
            <option value="oldest">古い順</option>
            <option value="price-low-high">価格が安い順</option>
            <option value="price-high-low">価格が高い順</option>
          </select>
        </div>
      </div>

      {openFilter && (
        <div className="w-full bg-[#d9d9d9] mt-8">
          <div className="main-container py-8">
            <Tab.Group>
              <Tab.List className="flex justify-center gap-16">
                <Tab className="border-b-[3px] border-transparent ui-selected:border-b-[3px] ui-selected:border-foreground p-2 font-medium relative">
                  在庫状況
                  {instock && (
                    <div className="w-5 h-5 rounded-full bg-blue text-xs font-semibold text-background flex items-center justify-center text-center absolute top-0 right-[-0.875rem]">
                      1
                    </div>
                  )}
                </Tab>
              </Tab.List>
              <Tab.Panels className="mt-12">
                <Tab.Panel>
                  <div className="flex items-center justify-center gap-8">
                    <button
                      className={`
                        text-sm py-5 px-12 shadow-sm rounded-lg
                      ${
                        instock
                          ? "bg-foreground text-background"
                          : "bg-background text-foreground"
                      }`}
                      onClick={() => setInstock((prev) => !prev)}
                    >
                      在庫ありのみ表示
                    </button>
                  </div>
                </Tab.Panel>
              </Tab.Panels>
            </Tab.Group>
            <div className="flex justify-center mt-12 gap-16">
              <button
                className="font-semibold border-2 border-red px-10 py-2 rounded-full text-red"
                onClick={() => onReset()}
              >
                リセット
              </button>
              <button
                className="font-semibold border-2 border-dark px-10 py-2 rounded-full bg-dark text-light "
                onClick={() => onApply()}
              >
                絞り込む
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Sort;
