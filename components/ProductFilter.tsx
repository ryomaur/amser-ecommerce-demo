"use client";

import { Tab } from "@headlessui/react";
import { useEffect, useState } from "react";
import { BiFilterAlt } from "react-icons/bi";
import { FiX } from "react-icons/fi";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useMemo } from "react";
import { Categories } from "@/types";
import { IoClose } from "react-icons/io5";
import { LuChevronUp } from "react-icons/lu";

interface ProductFilterProps {
  categories: Categories;
}

const ProductFilter: React.FC<ProductFilterProps> = ({ categories }) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const params = useMemo(
    () => new URLSearchParams(searchParams),
    [searchParams]
  );

  const { caseTypes, caseColors, faceColors, movements, bandTypes } =
    categories;

  const [openFilter, setOpenFilter] = useState(false);
  const [movementOpen, setMovementOpen] = useState(false);
  const [caseTypeOpen, setCaseTypeOpen] = useState(false);
  const [caseColorOpen, setCaseColorOpen] = useState(false);
  const [faceColorOpen, setFaceColorOpen] = useState(false);
  const [bandTypeOpen, setBandTypeOpen] = useState(false);
  const [stockOpen, setStockOpen] = useState(false);

  const [movement, setMovement] = useState<string[]>(
    params.get("movement")?.toString().split(",") ?? []
  );
  const [caseType, setCaseType] = useState<string[]>(
    params.get("caseType")?.toString().split(",") ?? []
  );
  const [caseColor, setCaseColor] = useState<string[]>(
    params.get("caseColor")?.toString().split(",") ?? []
  );
  const [faceColor, setFaceColor] = useState<string[]>(
    params.get("faceColor")?.toString().split(",") ?? []
  );
  const [bandType, setBandType] = useState<string[]>(
    params.get("bandType")?.toString().split(",") ?? []
  );

  const [instock, setInstock] = useState<boolean>(
    params.get("instock") ? true : false
  );

  const sort = params.get("sort");
  const productType = params.get("productType");

  const [filterCount, setFilterCount] = useState<number>(0);

  useEffect(() => {
    setFilterCount(
      movement.length +
        caseType.length +
        caseColor.length +
        faceColor.length +
        bandType.length +
        (instock ? 1 : 0)
    );

    if (movement.length > 0) {
      params.set("movement", movement.toString());
    } else {
      params.delete("movement");
    }

    if (caseType.length > 0) {
      params.set("caseType", caseType.toString());
    } else {
      params.delete("caseType");
    }

    if (caseColor.length > 0) {
      params.set("caseColor", caseColor.toString());
    } else {
      params.delete("caseColor");
    }

    if (faceColor.length > 0) {
      params.set("faceColor", faceColor.toString());
    } else {
      params.delete("faceColor");
    }

    if (bandType.length > 0) {
      params.set("bandType", bandType.toString());
    } else {
      params.delete("bandType");
    }

    if (instock) {
      params.set("instock", instock.toString());
    } else {
      params.delete("instock");
    }
  }, [
    movement,
    caseType,
    caseColor,
    faceColor,
    bandType,
    instock,
    filterCount,
    params,
  ]);

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
    setMovement([]);
    setCaseType([]);
    setCaseColor([]);
    setFaceColor([]);
    setBandType([]);
    setInstock(false);
  };

  const onApply = () => {
    setOpenFilter(false);
    params.delete("page");
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
      <div className="main-container mx-auto flex md:justify-between md:items-center flex-col md:flex-row items-end px-4 md:px-5 xl:px-0 gap-3 md:gap-0">
        <button
          onClick={() => setOpenFilter((prev) => !prev)}
          className={
            openFilter
              ? `py-2 px-5 rounded-lg font-medium flex items-center gap-2 bg-[#d9d9d9] relative text-sm md:text-base`
              : `py-2 px-5 rounded-lg font-medium flex items-center gap-2 hover:bg-[#d9d9d9] relative text-sm md:text-base`
          }
        >
          絞り込み{" "}
          {openFilter ? (
            <FiX className="text-lg md:text-xl" />
          ) : (
            <BiFilterAlt className="text-lg md:text-xl" />
          )}
          {filterCount > 0 && (
            <div className="bg-red w-[1.125rem] h-[1.125rem] md:w-5 md:h-5 rounded-full absolute right-0 top-0  md:right-1 md:top-1 flex items-center justify-center text-center text-background text-[0.625rem] md:text-xs">
              {filterCount}
            </div>
          )}
        </button>
        <div>
          <label
            htmlFor="sort"
            className="font-medium mr-7 text-sm md:text-base"
          >
            並び替え
          </label>
          <select
            name="sort"
            id="sort"
            className="bg-transparent focus:outline-none outline-none text-sm md:text-base"
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
        <div className="hidden xl:block w-full bg-bglighter mt-8">
          <div className="main-container py-8">
            <Tab.Group>
              <Tab.List className="flex justify-center gap-16">
                {productType === "watch" && (
                  <>
                    <Tab className="border-b-[3px] border-transparent ui-selected:border-b-[3px] ui-selected:border-foreground p-2 font-medium relative">
                      ムーブメント
                      {movement.length > 0 && (
                        <div className="w-5 h-5 rounded-full bg-red text-xs font-semibold text-background flex items-center justify-center text-center absolute top-0 right-[-0.875rem]">
                          {movement.length}
                        </div>
                      )}
                    </Tab>

                    <Tab className="border-b-[3px] border-transparent ui-selected:border-b-[3px] ui-selected:border-foreground p-2 font-medium relative">
                      ケースの種類
                      {caseType.length > 0 && (
                        <div className="w-5 h-5 rounded-full bg-red text-xs font-semibold text-background flex items-center justify-center text-center absolute top-0 right-[-0.875rem]">
                          {caseType.length}
                        </div>
                      )}
                    </Tab>

                    <Tab className="border-b-[3px] border-transparent ui-selected:border-b-[3px] ui-selected:border-foreground p-2 font-medium relative">
                      ケースの色
                      {caseColor.length > 0 && (
                        <div className="w-5 h-5 rounded-full bg-red text-xs font-semibold text-background flex items-center justify-center text-center absolute top-0 right-[-0.875rem]">
                          {caseColor.length}
                        </div>
                      )}
                    </Tab>

                    <Tab className="border-b-[3px] border-transparent ui-selected:border-b-[3px] ui-selected:border-foreground p-2 font-medium relative">
                      文字盤の色
                      {faceColor.length > 0 && (
                        <div className="w-5 h-5 rounded-full bg-red text-xs font-semibold text-background flex items-center justify-center text-center absolute top-0 right-[-0.875rem]">
                          {faceColor.length}
                        </div>
                      )}
                    </Tab>
                  </>
                )}

                {productType === "watch" || productType === "band" ? (
                  <Tab className="border-b-[3px] border-transparent ui-selected:border-b-[3px] ui-selected:border-foreground p-2 font-medium relative">
                    {bandType.length > 0 && (
                      <div className="w-5 h-5 rounded-full bg-red text-xs font-semibold text-background flex items-center justify-center text-center absolute top-0 right-[-0.875rem]">
                        {bandType.length}
                      </div>
                    )}
                    バンドの種類
                  </Tab>
                ) : null}

                <Tab className="border-b-[3px] border-transparent ui-selected:border-b-[3px] ui-selected:border-foreground p-2 font-medium relative">
                  在庫状況
                  {instock && (
                    <div className="w-5 h-5 rounded-full bg-red text-xs font-semibold text-background flex items-center justify-center text-center absolute top-0 right-[-0.875rem]">
                      1
                    </div>
                  )}
                </Tab>
              </Tab.List>
              <Tab.Panels className="mt-12">
                {productType === "watch" && (
                  <>
                    <Tab.Panel>
                      <div className="flex items-center justify-center gap-8">
                        {movements.map((data) => (
                          <button
                            key={data.value}
                            className={`
                        text-sm py-5 px-12 shadow-sm rounded-lg
                      ${
                        movement.includes(data.value)
                          ? "bg-foreground text-background"
                          : "bg-background text-foreground"
                      }`}
                            onClick={() =>
                              handleSelect(setMovement, movement, data.value)
                            }
                          >
                            {data.name_ja}
                          </button>
                        ))}
                      </div>
                    </Tab.Panel>

                    <Tab.Panel>
                      <div className="flex items-center justify-center gap-8">
                        {caseTypes.map((data) => (
                          <button
                            key={data.value}
                            className={`
                        text-sm py-5 px-12 shadow-sm rounded-lg
                      ${
                        caseType.includes(data.value)
                          ? "bg-foreground text-background"
                          : "bg-background text-foreground"
                      }`}
                            onClick={() =>
                              handleSelect(setCaseType, caseType, data.value)
                            }
                          >
                            {data.name_ja}
                          </button>
                        ))}
                      </div>
                    </Tab.Panel>

                    <Tab.Panel>
                      <div className="flex items-center justify-center gap-8">
                        {caseColors.map((data) => (
                          <button
                            key={data.value}
                            className={`
                        text-sm py-5 px-12 shadow-sm rounded-lg flex justify-center items-center gap-4
                      ${
                        caseColor.includes(data.value)
                          ? "bg-foreground text-background"
                          : "bg-background text-foreground"
                      }`}
                            onClick={() =>
                              handleSelect(setCaseColor, caseColor, data.value)
                            }
                          >
                            {data.name_ja}
                            <div
                              className={`
                                  w-6
                                  h-6
                                  rounded-full
                                  border-2
                                  ${
                                    caseColor.includes(data.value)
                                      ? "border-background"
                                      : "border-foreground"
                                  }
                                `}
                              style={{ backgroundColor: data.hexValue }}
                            />
                          </button>
                        ))}
                      </div>
                    </Tab.Panel>

                    <Tab.Panel>
                      <div className="flex items-center justify-center gap-8 flex-wrap">
                        {faceColors.map((data) => (
                          <button
                            key={data.value}
                            className={`
                        text-sm py-5 px-12 shadow-sm rounded-lg flex justify-center items-center gap-4
                      ${
                        faceColor.includes(data.value)
                          ? "bg-foreground text-background"
                          : "bg-background text-foreground"
                      }`}
                            onClick={() =>
                              handleSelect(setFaceColor, faceColor, data.value)
                            }
                          >
                            {data.name_ja}
                            <div
                              className={`
                                  w-6
                                  h-6
                                  rounded-full
                                  border-2
                                  ${
                                    faceColor.includes(data.value)
                                      ? "border-background"
                                      : "border-foreground"
                                  }
                                `}
                              style={{ backgroundColor: data.hexValue }}
                            />
                          </button>
                        ))}
                      </div>
                    </Tab.Panel>
                  </>
                )}

                {productType === "watch" || productType === "band" ? (
                  <Tab.Panel>
                    <div className="flex items-center justify-center gap-8">
                      {bandTypes.map((data) => (
                        <button
                          key={data.value}
                          className={`
                        text-sm py-5 px-12 shadow-sm rounded-lg
                      ${
                        bandType.includes(data.value)
                          ? "bg-foreground text-background"
                          : "bg-background text-foreground"
                      }`}
                          onClick={() =>
                            handleSelect(setBandType, bandType, data.value)
                          }
                        >
                          {data.name_ja}
                        </button>
                      ))}
                    </div>
                  </Tab.Panel>
                ) : null}

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
                className="font-semibold border-2 border-foreground px-10 py-2 rounded-full bg-foreground text-bglighter "
                onClick={() => onApply()}
              >
                絞り込む
              </button>
            </div>
          </div>
        </div>
      )}
      <div
        className={
          openFilter
            ? `fixed top-0 right-0 w-full h-screen bg-bglight z-50 xl:hidden ease-in duration-300 overflow-y-scroll md:p-8`
            : `fixed top-[-100%] right-0 w-full h-screen bg-bglight z-50 xl:hidden ease-in duration-300 overflow-y-scroll md:p-8`
        }
      >
        <div className="w-full p-6 flex justify-end">
          <button onClick={() => setOpenFilter(false)}>
            <IoClose size={32} />
          </button>
        </div>

        <div className="w-full px-6 pb-32">
          {productType === "watch" && (
            <>
              <div>
                <button
                  className="flex items-center gap-7 px-1"
                  onClick={() => setMovementOpen((prev) => !prev)}
                >
                  <h2 className="font-bold relative">
                    ムーブメント
                    {movement.length > 0 && (
                      <div className="w-5 h-5 rounded-full bg-red text-xs font-semibold text-background flex items-center justify-center text-center absolute top-[-0.875rem] right-[-0.875rem]">
                        {movement.length}
                      </div>
                    )}
                  </h2>
                  <LuChevronUp
                    size={30}
                    className={
                      !movementOpen
                        ? `rotate-180 ease-in duration-200`
                        : `rotate-0 ease-in duration-200`
                    }
                  />
                </button>
                <div
                  className={
                    movementOpen
                      ? `h-max ease-in duration-200 grid grid-cols-2 md:grid-cols-3 gap-3 mt-8 opacity-100`
                      : "h-0 ease-in duration-200 grid grid-cols-2 md:grid-cols-3 gap-3 mt-0 opacity-0 overflow-hidden"
                  }
                >
                  {movements.map((data) => (
                    <button
                      key={data.value}
                      className={`
                        text-sm py-4 shadow-sm rounded-lg border border-foreground
                      ${
                        movement.includes(data.value)
                          ? "bg-foreground text-background"
                          : "bg-transparent text-foreground"
                      }`}
                      onClick={() =>
                        handleSelect(setMovement, movement, data.value)
                      }
                    >
                      {data.name_ja}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mt-8">
                <button
                  className="flex items-center gap-7 px-1"
                  onClick={() => setCaseTypeOpen((prev) => !prev)}
                >
                  <h2 className="font-bold relative">
                    ケースの種類
                    {caseType.length > 0 && (
                      <div className="w-5 h-5 rounded-full bg-red text-xs font-semibold text-background flex items-center justify-center text-center absolute top-[-0.875rem] right-[-0.875rem]">
                        {caseType.length}
                      </div>
                    )}
                  </h2>
                  <LuChevronUp
                    size={30}
                    className={
                      !caseTypeOpen
                        ? `rotate-180 ease-in duration-200`
                        : `rotate-0 ease-in duration-200`
                    }
                  />
                </button>
                <div
                  className={
                    caseTypeOpen
                      ? `h-max ease-in duration-200 grid grid-cols-2 md:grid-cols-3 gap-3 mt-8 opacity-100`
                      : "h-0 ease-in duration-200 grid grid-cols-2 md:grid-cols-3 gap-3 mt-0 opacity-0 overflow-hidden"
                  }
                >
                  {caseTypes.map((data) => (
                    <button
                      key={data.value}
                      className={`
                        text-sm py-4 shadow-sm rounded-lg border border-foreground
                      ${
                        caseType.includes(data.value)
                          ? "bg-foreground text-background"
                          : "bg-transparent text-foreground"
                      }`}
                      onClick={() =>
                        handleSelect(setCaseType, caseType, data.value)
                      }
                    >
                      {data.name_ja}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mt-8">
                <button
                  className="flex items-center gap-7 px-1"
                  onClick={() => setCaseColorOpen((prev) => !prev)}
                >
                  <h2 className="font-bold relative">
                    ケースの色
                    {caseColor.length > 0 && (
                      <div className="w-5 h-5 rounded-full bg-red text-xs font-semibold text-background flex items-center justify-center text-center absolute top-[-0.875rem] right-[-0.875rem]">
                        {caseColor.length}
                      </div>
                    )}
                  </h2>
                  <LuChevronUp
                    size={30}
                    className={
                      !caseColorOpen
                        ? `rotate-180 ease-in duration-200`
                        : `rotate-0 ease-in duration-200`
                    }
                  />
                </button>
                <div
                  className={
                    caseColorOpen
                      ? `h-max ease-in duration-200 grid grid-cols-2 md:grid-cols-3 gap-3 mt-8 opacity-100`
                      : "h-0 ease-in duration-200 grid grid-cols-2 md:grid-cols-3 gap-3 mt-0 opacity-0 overflow-hidden"
                  }
                >
                  {caseColors.map((data) => (
                    <button
                      key={data.value}
                      className={`
                        text-sm py-4 shadow-sm rounded-lg border border-foreground flex justify-center items-center gap-4
                      ${
                        caseColor.includes(data.value)
                          ? "bg-foreground text-background"
                          : "bg-transparent text-foreground"
                      }`}
                      onClick={() =>
                        handleSelect(setCaseColor, caseColor, data.value)
                      }
                    >
                      {data.name_ja}
                      <div
                        className={`
                        w-6
                        h-6
                        rounded-full
                        border-2
                        ${
                          caseColor.includes(data.value)
                            ? "border-background"
                            : "border-foreground"
                        }
                      `}
                        style={{ backgroundColor: data.hexValue }}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div className="mt-8">
                <button
                  className="flex items-center gap-7 px-1"
                  onClick={() => setFaceColorOpen((prev) => !prev)}
                >
                  <h2 className="font-bold relative">
                    文字盤の色
                    {faceColor.length > 0 && (
                      <div className="w-5 h-5 rounded-full bg-red text-xs font-semibold text-background flex items-center justify-center text-center absolute top-[-0.875rem] right-[-0.875rem]">
                        {faceColor.length}
                      </div>
                    )}
                  </h2>
                  <LuChevronUp
                    size={30}
                    className={
                      !faceColorOpen
                        ? `rotate-180 ease-in duration-200`
                        : `rotate-0 ease-in duration-200`
                    }
                  />
                </button>
                <div
                  className={
                    faceColorOpen
                      ? `h-max ease-in duration-200 grid grid-cols-2 md:grid-cols-3 gap-3 mt-8 opacity-100`
                      : "h-0 ease-in duration-200 grid grid-cols-2 md:grid-cols-3 gap-3 mt-0 opacity-0 overflow-hidden"
                  }
                >
                  {faceColors.map((data) => (
                    <button
                      key={data.value}
                      className={`
                        text-sm py-4 shadow-sm rounded-lg border border-foreground flex justify-center items-center gap-4
                      ${
                        faceColor.includes(data.value)
                          ? "bg-foreground text-background"
                          : "bg-transparent text-foreground"
                      }`}
                      onClick={() =>
                        handleSelect(setFaceColor, faceColor, data.value)
                      }
                    >
                      {data.name_ja}
                      <div
                        className={`
                        w-6
                        h-6
                        rounded-full
                        border-2
                        ${
                          faceColor.includes(data.value)
                            ? "border-background"
                            : "border-foreground"
                        }
                      `}
                        style={{ backgroundColor: data.hexValue }}
                      />
                    </button>
                  ))}
                </div>
              </div>
            </>
          )}

          {productType === "watch" ||
            (productType === "band" && (
              <div className="mt-8">
                <button
                  className="flex items-center gap-7 px-1"
                  onClick={() => setBandTypeOpen((prev) => !prev)}
                >
                  <h2 className="font-bold relative">
                    バンドの種類
                    {bandType.length > 0 && (
                      <div className="w-5 h-5 rounded-full bg-red text-xs font-semibold text-background flex items-center justify-center text-center absolute top-[-0.875rem] right-[-0.875rem]">
                        {bandType.length}
                      </div>
                    )}
                  </h2>
                  <LuChevronUp
                    size={30}
                    className={
                      !bandTypeOpen
                        ? `rotate-180 ease-in duration-200`
                        : `rotate-0 ease-in duration-200`
                    }
                  />
                </button>
                <div
                  className={
                    bandTypeOpen
                      ? `h-max ease-in duration-200 grid grid-cols-2 md:grid-cols-3 gap-3 mt-8 opacity-100`
                      : "h-0 ease-in duration-200 grid grid-cols-2 md:grid-cols-3 gap-3 mt-0 opacity-0 overflow-hidden"
                  }
                >
                  {bandTypes.map((data) => (
                    <button
                      key={data.value}
                      className={`
                        text-sm py-4 shadow-sm rounded-lg border border-foreground
                      ${
                        bandType.includes(data.value)
                          ? "bg-foreground text-background"
                          : "bg-transparent text-foreground"
                      }`}
                      onClick={() =>
                        handleSelect(setBandType, bandType, data.value)
                      }
                    >
                      {data.name_ja}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          <div className="mt-8">
            <button
              className="flex items-center gap-7 px-1"
              onClick={() => setStockOpen((prev) => !prev)}
            >
              <h2 className="font-bold relative">
                在庫状況
                {instock && (
                  <div className="w-5 h-5 rounded-full bg-red text-xs font-semibold text-background flex items-center justify-center text-center absolute top-[-0.875rem] right-[-0.875rem]">
                    1
                  </div>
                )}
              </h2>
              <LuChevronUp
                size={30}
                className={
                  !stockOpen
                    ? `rotate-180 ease-in duration-200`
                    : `rotate-0 ease-in duration-200`
                }
              />
            </button>
            <div
              className={
                stockOpen
                  ? `h-max ease-in duration-200 grid grid-cols-2 md:grid-cols-3 gap-3 mt-8 opacity-100`
                  : "h-0 ease-in duration-200 grid grid-cols-2 md:grid-cols-3 gap-3 mt-0 opacity-0 overflow-hidden"
              }
            >
              <button
                className={`
                        text-sm py-4 shadow-sm rounded-lg border border-foreground
                      ${
                        instock
                          ? "bg-foreground text-background"
                          : "bg-transparent text-foreground"
                      }`}
                onClick={() => setInstock((prev) => !prev)}
              >
                在庫ありのみ表示
              </button>
            </div>
          </div>
        </div>

        <div
          className={
            openFilter
              ? `fixed bottom-0 right-0 w-screen h-20 bg-bglighter z-[51] xl:hidden ease-out duration-500 shadow-[0px_0px_30px_rgba(0,0,0,0.1)]`
              : `fixed bottom-[-100%] right-0 w-screen h-20 bg-bglighter z-[51] xl:hidden ease-out duration-500`
          }
        >
          <div className="w-full h-full flex justify-center gap-6 items-center">
            <button
              className="font-semibold border-2 border-red px-10 py-3 rounded-full text-red text-sm relative"
              onClick={() => onReset()}
            >
              リセット
              {filterCount > 0 && (
                <div className="bg-red w-5 h-5 rounded-full absolute right-[-0.313rem] top-[-0.313rem] flex items-center justify-center text-center text-background text-xs">
                  {filterCount}
                </div>
              )}
            </button>
            <button
              className="font-semibold border-2 border-foreground px-10 py-3 rounded-full bg-foreground text-bglighter text-sm"
              onClick={() => onApply()}
            >
              絞り込む
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductFilter;
