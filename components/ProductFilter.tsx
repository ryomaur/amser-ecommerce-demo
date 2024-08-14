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
    [searchParams],
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
    params.get("movement")?.toString().split(",") ?? [],
  );
  const [caseType, setCaseType] = useState<string[]>(
    params.get("caseType")?.toString().split(",") ?? [],
  );
  const [caseColor, setCaseColor] = useState<string[]>(
    params.get("caseColor")?.toString().split(",") ?? [],
  );
  const [faceColor, setFaceColor] = useState<string[]>(
    params.get("faceColor")?.toString().split(",") ?? [],
  );
  const [bandType, setBandType] = useState<string[]>(
    params.get("bandType")?.toString().split(",") ?? [],
  );

  const [instock, setInstock] = useState<boolean>(
    params.get("instock") ? true : false,
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
        (instock ? 1 : 0),
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
    newValue: string,
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
      <div className="main-container mx-auto flex flex-col items-end gap-3 px-4 md:flex-row md:items-center md:justify-between md:gap-0 md:px-5 xl:px-0">
        <button
          onClick={() => setOpenFilter((prev) => !prev)}
          className={
            openFilter
              ? `relative flex items-center gap-2 rounded-lg bg-[#d9d9d9] px-5 py-2 text-sm font-medium md:text-base`
              : `relative flex items-center gap-2 rounded-lg px-5 py-2 text-sm font-medium hover:bg-[#d9d9d9] md:text-base`
          }
        >
          絞り込み{" "}
          {openFilter ? (
            <FiX className="text-lg md:text-xl" />
          ) : (
            <BiFilterAlt className="text-lg md:text-xl" />
          )}
          {filterCount > 0 && (
            <div className="absolute right-0 top-0 flex h-[1.125rem] w-[1.125rem] items-center justify-center rounded-full bg-red text-center text-[0.625rem] text-background md:right-1 md:top-1 md:h-5 md:w-5 md:text-xs">
              {filterCount}
            </div>
          )}
        </button>
        <div>
          <label
            htmlFor="sort"
            className="mr-7 text-sm font-medium md:text-base"
          >
            並び替え
          </label>
          <select
            name="sort"
            id="sort"
            className="bg-transparent text-sm outline-none focus:outline-none md:text-base"
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
        <div className="mt-8 hidden w-full bg-bglighter xl:block">
          <div className="main-container py-8">
            <Tab.Group>
              <Tab.List className="flex justify-center gap-16">
                {productType === "watch" && (
                  <>
                    <Tab className="relative border-b-[3px] border-transparent p-2 font-medium ui-selected:border-b-[3px] ui-selected:border-foreground">
                      ムーブメント
                      {movement.length > 0 && (
                        <div className="absolute right-[-0.875rem] top-0 flex h-5 w-5 items-center justify-center rounded-full bg-red text-center text-xs font-semibold text-background">
                          {movement.length}
                        </div>
                      )}
                    </Tab>

                    <Tab className="relative border-b-[3px] border-transparent p-2 font-medium ui-selected:border-b-[3px] ui-selected:border-foreground">
                      ケースの種類
                      {caseType.length > 0 && (
                        <div className="absolute right-[-0.875rem] top-0 flex h-5 w-5 items-center justify-center rounded-full bg-red text-center text-xs font-semibold text-background">
                          {caseType.length}
                        </div>
                      )}
                    </Tab>

                    <Tab className="relative border-b-[3px] border-transparent p-2 font-medium ui-selected:border-b-[3px] ui-selected:border-foreground">
                      ケースの色
                      {caseColor.length > 0 && (
                        <div className="absolute right-[-0.875rem] top-0 flex h-5 w-5 items-center justify-center rounded-full bg-red text-center text-xs font-semibold text-background">
                          {caseColor.length}
                        </div>
                      )}
                    </Tab>

                    <Tab className="relative border-b-[3px] border-transparent p-2 font-medium ui-selected:border-b-[3px] ui-selected:border-foreground">
                      文字盤の色
                      {faceColor.length > 0 && (
                        <div className="absolute right-[-0.875rem] top-0 flex h-5 w-5 items-center justify-center rounded-full bg-red text-center text-xs font-semibold text-background">
                          {faceColor.length}
                        </div>
                      )}
                    </Tab>
                  </>
                )}

                {productType === "watch" || productType === "band" ? (
                  <Tab className="relative border-b-[3px] border-transparent p-2 font-medium ui-selected:border-b-[3px] ui-selected:border-foreground">
                    {bandType.length > 0 && (
                      <div className="absolute right-[-0.875rem] top-0 flex h-5 w-5 items-center justify-center rounded-full bg-red text-center text-xs font-semibold text-background">
                        {bandType.length}
                      </div>
                    )}
                    バンドの種類
                  </Tab>
                ) : null}

                <Tab className="relative border-b-[3px] border-transparent p-2 font-medium ui-selected:border-b-[3px] ui-selected:border-foreground">
                  在庫状況
                  {instock && (
                    <div className="absolute right-[-0.875rem] top-0 flex h-5 w-5 items-center justify-center rounded-full bg-red text-center text-xs font-semibold text-background">
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
                            className={`rounded-lg px-12 py-5 text-sm shadow-sm ${
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
                            className={`rounded-lg px-12 py-5 text-sm shadow-sm ${
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
                            className={`flex items-center justify-center gap-4 rounded-lg px-12 py-5 text-sm shadow-sm ${
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
                              className={`h-6 w-6 rounded-full border-2 ${
                                caseColor.includes(data.value)
                                  ? "border-background"
                                  : "border-foreground"
                              } `}
                              style={{ backgroundColor: data.hexValue }}
                            />
                          </button>
                        ))}
                      </div>
                    </Tab.Panel>

                    <Tab.Panel>
                      <div className="flex flex-wrap items-center justify-center gap-8">
                        {faceColors.map((data) => (
                          <button
                            key={data.value}
                            className={`flex items-center justify-center gap-4 rounded-lg px-12 py-5 text-sm shadow-sm ${
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
                              className={`h-6 w-6 rounded-full border-2 ${
                                faceColor.includes(data.value)
                                  ? "border-background"
                                  : "border-foreground"
                              } `}
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
                          className={`rounded-lg px-12 py-5 text-sm shadow-sm ${
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
                      className={`rounded-lg px-12 py-5 text-sm shadow-sm ${
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

            <div className="mt-12 flex justify-center gap-16">
              <button
                className="rounded-full border-2 border-red px-10 py-2 font-semibold text-red"
                onClick={() => onReset()}
              >
                リセット
              </button>
              <button
                className="rounded-full border-2 border-foreground bg-foreground px-10 py-2 font-semibold text-bglighter"
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
            ? `fixed right-0 top-0 z-50 h-screen w-full overflow-y-scroll bg-bglight duration-300 ease-in md:p-8 xl:hidden`
            : `fixed right-0 top-[-100%] -z-50 h-screen w-full overflow-y-scroll bg-bglight duration-300 ease-in md:p-8 xl:hidden`
        }
      >
        <div className="flex w-full justify-end p-6">
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
                  <h2 className="relative font-bold">
                    ムーブメント
                    {movement.length > 0 && (
                      <div className="absolute right-[-0.875rem] top-[-0.875rem] flex h-5 w-5 items-center justify-center rounded-full bg-red text-center text-xs font-semibold text-background">
                        {movement.length}
                      </div>
                    )}
                  </h2>
                  <LuChevronUp
                    size={30}
                    className={
                      !movementOpen
                        ? `rotate-180 duration-200 ease-in`
                        : `rotate-0 duration-200 ease-in`
                    }
                  />
                </button>
                <div
                  className={
                    movementOpen
                      ? `mt-8 grid h-max grid-cols-2 gap-3 opacity-100 duration-200 ease-in md:grid-cols-3`
                      : "mt-0 grid h-0 grid-cols-2 gap-3 overflow-hidden opacity-0 duration-200 ease-in md:grid-cols-3"
                  }
                >
                  {movements.map((data) => (
                    <button
                      key={data.value}
                      className={`rounded-lg border border-foreground py-4 text-sm shadow-sm ${
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
                  <h2 className="relative font-bold">
                    ケースの種類
                    {caseType.length > 0 && (
                      <div className="absolute right-[-0.875rem] top-[-0.875rem] flex h-5 w-5 items-center justify-center rounded-full bg-red text-center text-xs font-semibold text-background">
                        {caseType.length}
                      </div>
                    )}
                  </h2>
                  <LuChevronUp
                    size={30}
                    className={
                      !caseTypeOpen
                        ? `rotate-180 duration-200 ease-in`
                        : `rotate-0 duration-200 ease-in`
                    }
                  />
                </button>
                <div
                  className={
                    caseTypeOpen
                      ? `mt-8 grid h-max grid-cols-2 gap-3 opacity-100 duration-200 ease-in md:grid-cols-3`
                      : "mt-0 grid h-0 grid-cols-2 gap-3 overflow-hidden opacity-0 duration-200 ease-in md:grid-cols-3"
                  }
                >
                  {caseTypes.map((data) => (
                    <button
                      key={data.value}
                      className={`rounded-lg border border-foreground py-4 text-sm shadow-sm ${
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
                  <h2 className="relative font-bold">
                    ケースの色
                    {caseColor.length > 0 && (
                      <div className="absolute right-[-0.875rem] top-[-0.875rem] flex h-5 w-5 items-center justify-center rounded-full bg-red text-center text-xs font-semibold text-background">
                        {caseColor.length}
                      </div>
                    )}
                  </h2>
                  <LuChevronUp
                    size={30}
                    className={
                      !caseColorOpen
                        ? `rotate-180 duration-200 ease-in`
                        : `rotate-0 duration-200 ease-in`
                    }
                  />
                </button>
                <div
                  className={
                    caseColorOpen
                      ? `mt-8 grid h-max grid-cols-2 gap-3 opacity-100 duration-200 ease-in md:grid-cols-3`
                      : "mt-0 grid h-0 grid-cols-2 gap-3 overflow-hidden opacity-0 duration-200 ease-in md:grid-cols-3"
                  }
                >
                  {caseColors.map((data) => (
                    <button
                      key={data.value}
                      className={`flex items-center justify-center gap-4 rounded-lg border border-foreground py-4 text-sm shadow-sm ${
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
                        className={`h-6 w-6 rounded-full border-2 ${
                          caseColor.includes(data.value)
                            ? "border-background"
                            : "border-foreground"
                        } `}
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
                  <h2 className="relative font-bold">
                    文字盤の色
                    {faceColor.length > 0 && (
                      <div className="absolute right-[-0.875rem] top-[-0.875rem] flex h-5 w-5 items-center justify-center rounded-full bg-red text-center text-xs font-semibold text-background">
                        {faceColor.length}
                      </div>
                    )}
                  </h2>
                  <LuChevronUp
                    size={30}
                    className={
                      !faceColorOpen
                        ? `rotate-180 duration-200 ease-in`
                        : `rotate-0 duration-200 ease-in`
                    }
                  />
                </button>
                <div
                  className={
                    faceColorOpen
                      ? `mt-8 grid h-max grid-cols-2 gap-3 opacity-100 duration-200 ease-in md:grid-cols-3`
                      : "mt-0 grid h-0 grid-cols-2 gap-3 overflow-hidden opacity-0 duration-200 ease-in md:grid-cols-3"
                  }
                >
                  {faceColors.map((data) => (
                    <button
                      key={data.value}
                      className={`flex items-center justify-center gap-4 rounded-lg border border-foreground py-4 text-sm shadow-sm ${
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
                        className={`h-6 w-6 rounded-full border-2 ${
                          faceColor.includes(data.value)
                            ? "border-background"
                            : "border-foreground"
                        } `}
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
                  <h2 className="relative font-bold">
                    バンドの種類
                    {bandType.length > 0 && (
                      <div className="absolute right-[-0.875rem] top-[-0.875rem] flex h-5 w-5 items-center justify-center rounded-full bg-red text-center text-xs font-semibold text-background">
                        {bandType.length}
                      </div>
                    )}
                  </h2>
                  <LuChevronUp
                    size={30}
                    className={
                      !bandTypeOpen
                        ? `rotate-180 duration-200 ease-in`
                        : `rotate-0 duration-200 ease-in`
                    }
                  />
                </button>
                <div
                  className={
                    bandTypeOpen
                      ? `mt-8 grid h-max grid-cols-2 gap-3 opacity-100 duration-200 ease-in md:grid-cols-3`
                      : "mt-0 grid h-0 grid-cols-2 gap-3 overflow-hidden opacity-0 duration-200 ease-in md:grid-cols-3"
                  }
                >
                  {bandTypes.map((data) => (
                    <button
                      key={data.value}
                      className={`rounded-lg border border-foreground py-4 text-sm shadow-sm ${
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
              <h2 className="relative font-bold">
                在庫状況
                {instock && (
                  <div className="absolute right-[-0.875rem] top-[-0.875rem] flex h-5 w-5 items-center justify-center rounded-full bg-red text-center text-xs font-semibold text-background">
                    1
                  </div>
                )}
              </h2>
              <LuChevronUp
                size={30}
                className={
                  !stockOpen
                    ? `rotate-180 duration-200 ease-in`
                    : `rotate-0 duration-200 ease-in`
                }
              />
            </button>
            <div
              className={
                stockOpen
                  ? `mt-8 grid h-max grid-cols-2 gap-3 opacity-100 duration-200 ease-in md:grid-cols-3`
                  : "mt-0 grid h-0 grid-cols-2 gap-3 overflow-hidden opacity-0 duration-200 ease-in md:grid-cols-3"
              }
            >
              <button
                className={`rounded-lg border border-foreground py-4 text-sm shadow-sm ${
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
              ? `fixed bottom-0 right-0 z-[51] h-20 w-screen bg-bglighter shadow-[0px_0px_30px_rgba(0,0,0,0.1)] duration-500 ease-out xl:hidden`
              : `fixed bottom-[-100%] right-0 -z-[51] h-20 w-screen bg-bglighter duration-500 ease-out xl:hidden`
          }
        >
          <div className="flex h-full w-full items-center justify-center gap-6">
            <button
              className="relative rounded-full border-2 border-red px-10 py-3 text-sm font-semibold text-red"
              onClick={() => onReset()}
            >
              リセット
              {filterCount > 0 && (
                <div className="absolute right-[-0.313rem] top-[-0.313rem] flex h-5 w-5 items-center justify-center rounded-full bg-red text-center text-xs text-background">
                  {filterCount}
                </div>
              )}
            </button>
            <button
              className="rounded-full border-2 border-foreground bg-foreground px-10 py-3 text-sm font-semibold text-bglighter"
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
