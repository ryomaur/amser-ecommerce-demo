"use client";

import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  getPaginationRowModel,
  SortingState,
  getSortedRowModel,
  getFilteredRowModel,
  createColumnHelper,
} from "@tanstack/react-table";

import { useRouter } from "next/navigation";

import { Fragment, useMemo, useState } from "react";
import { TbSortAscending, TbSortDescending } from "react-icons/tb";
import { IoSearch } from "react-icons/io5";
import {
  LuChevronFirst,
  LuChevronLast,
  LuChevronLeft,
  LuChevronRight,
} from "react-icons/lu";
import Link from "next/link";
import Image from "next/image";
import { FiEdit, FiTrash } from "react-icons/fi";
import { Menu, Transition } from "@headlessui/react";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { Product } from "@prisma/client";
import { BiDetail, BiSolidHide, BiSolidShow } from "react-icons/bi";
import axios from "axios";
import toast from "react-hot-toast";

const columnHelper = createColumnHelper<Product>();

interface AdminBandsTableProps {
  bands: Product[];
}

const AdminBandTable: React.FC<AdminBandsTableProps> = ({ bands }) => {
  const router = useRouter();

  const data: Product[] = useMemo(() => bands, [bands]);

  const [sorting, setSorting] = useState<SortingState>([]);
  const [filtering, setFiltering] = useState("");

  const handleDelete = async (productId: string) => {
    if (confirm("本当に削除しますか？") === true) {
      axios
        .delete(`/api/watches/${productId}`)
        .then(() => {
          toast.success("商品を削除しました");
          router.refresh();
        })
        .catch((error) => {
          toast.error("エラーが発生しました");
        });
    }
  };

  const columns = [
    columnHelper.accessor((row) => row.name, {
      id: "name",
      cell: (info) => info.getValue(),
      header: () => <span>商品名</span>,
    }),
    columnHelper.accessor((row) => row.mainImage, {
      id: "mainImage",
      cell: (info) => (
        <div className="relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-md">
          <Image
            src={info.getValue()}
            alt="商品画像"
            fill
            sizes="5vh"
            className="object-cover"
          />
        </div>
      ),
      header: "",
      enableSorting: false,
    }),
    columnHelper.accessor((row) => row.bandType_ja, {
      id: "bandType_ja",
      cell: (info) => <span>{info.getValue()}</span>,
      header: () => <span>タイプ</span>,
    }),
    columnHelper.accessor((row) => row.price, {
      id: "price",
      cell: (info) => (
        <span className="text-nowrap">
          ¥ {info.getValue().toLocaleString()}
        </span>
      ),
      header: () => <span>価格</span>,
    }),
    columnHelper.accessor((row) => row.stock, {
      id: "stock",
      cell: (info) => <span>{info.getValue()}</span>,
      header: () => <span>在庫</span>,
    }),
    columnHelper.accessor((row) => row.isHidden, {
      id: "isHidden",
      cell: (info) =>
        info.getValue() === true ? (
          <div className="">
            <BiSolidHide size={22} className="text-foreground/50" />
          </div>
        ) : (
          <div className="">
            <BiSolidShow size={22} />
          </div>
        ),
      header: "表示",
    }),
    columnHelper.accessor((row) => row.updatedAt, {
      id: "updatedAt",
      cell: (info) => (
        <span className="text-xs">{info.getValue().toLocaleDateString()}</span>
      ),
      header: () => <span>更新日</span>,
    }),
    columnHelper.accessor((row) => row.id, {
      id: "id",
      cell: (info) => (
        <Menu as={"div"} className={""}>
          <Menu.Button className={"flex items-center justify-center"}>
            <HiOutlineDotsHorizontal
              size={22}
              className="cursor-pointer text-foreground hover:opacity-70"
            />
          </Menu.Button>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-200"
            enterFrom="transform opacity-0 scale-75"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="tranform opacity-100 scale-100"
            leaveTo="tranform opacity-0 scale-75"
          >
            <Menu.Items
              className={
                "scale absolute right-0 z-20 mt-2 flex w-max origin-top-right flex-col divide-y rounded-md bg-bglighter px-1 py-1 font-medium shadow-md ring-2 ring-black/5"
              }
            >
              <Menu.Item>
                <Link
                  href={`/admin/bands/${info.getValue()}`}
                  className="flex items-center gap-3 px-3 py-3 text-xs"
                >
                  <BiDetail size={16} />
                  バンドの詳細を見る
                </Link>
              </Menu.Item>
              <Menu.Item>
                <Link
                  href={`/admin/bands/edit/${info.getValue()}`}
                  className="flex items-center gap-3 px-3 py-3 text-xs"
                >
                  <FiEdit size={16} />
                  編集
                </Link>
              </Menu.Item>
              <Menu.Item>
                <button
                  className="flex items-center gap-3 px-3 py-3 text-xs"
                  onClick={() => handleDelete(info.getValue())}
                >
                  <FiTrash size={16} className="text-red" />
                  商品を削除する
                </button>
              </Menu.Item>
            </Menu.Items>
          </Transition>
        </Menu>
      ),
      header: () => "",
      enableSorting: false,
    }),
  ];

  const table = useReactTable({
    data: data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting: sorting,
      globalFilter: filtering,
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setFiltering,
  });

  const headers = table.getFlatHeaders();
  const rows = table.getRowModel().rows;

  return (
    <div className="relative">
      <div className="mt-8 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={filtering}
            onChange={(e) => setFiltering(e.target.value)}
            className="rounded-lg border border-foreground bg-transparent px-4 py-2 text-sm outline-none focus:outline-none"
          />
          <IoSearch size={20} className="text-foreground" />
        </div>
        <div className="flex items-center gap-3 px-5 text-sm text-foreground">
          表示：
          <select
            value={table.getState().pagination.pageSize}
            onChange={(e) => {
              table.setPageSize(Number(e.target.value));
            }}
          >
            {[10, 20, 30, 40, 50, 60, 70, 80, 90, 100].map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                {pageSize}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="mt-5 overflow-x-scroll rounded-lg border border-foreground">
        <table className="box-border w-full border-collapse rounded-lg text-left">
          <thead>
            <tr>
              {headers.map((header) => {
                const direction = header.column.getIsSorted();
                const arrow: any = {
                  asc: <TbSortAscending size={16} />,
                  desc: <TbSortDescending size={16} />,
                };
                const sortIcon = direction && arrow[direction];

                return (
                  <th
                    key={header.id}
                    className="sticky top-0 z-10 border-collapse bg-foreground py-3 pl-6 pr-4 text-[0.813rem] font-medium text-background first:left-0 first:z-20"
                    onClick={header.column.getToggleSortingHandler()}
                  >
                    {header.isPlaceholder ? null : (
                      <div className="flex w-max cursor-pointer flex-nowrap items-center gap-5">
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                        {direction && <span>{sortIcon}</span>}
                      </div>
                    )}
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.id} className="hover:bg-neutral-300/35">
                {row.getVisibleCells().map((cell, index) => {
                  return index === 0 ? (
                    <th
                      key={cell.id}
                      className="box-border border-collapse bg-background py-3 pl-6 pr-4 text-[0.813rem] text-foreground/85 shadow-[inset_0_-1px_0_lightgray] first:sticky first:left-0 first:z-10 first:font-medium first:shadow-[inset_-1px_-1px_0_lightgray]"
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </th>
                  ) : (
                    <td
                      key={cell.id}
                      className="box-border border-collapse bg-background py-3 pl-6 pr-4 text-[0.813rem] text-foreground/85 shadow-[inset_0_-1px_0_lightgray] first:sticky first:left-0 first:z-10 first:shadow-[inset_-1px_-1px_0_lightgray]"
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="my-2 flex w-full justify-center">
        <div className="flex items-center gap-2 text-foreground">
          <button
            className="p-2 disabled:cursor-default disabled:opacity-30"
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
          >
            <LuChevronFirst size={32} />
          </button>
          <button
            className="p-2 disabled:cursor-default disabled:opacity-30"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <LuChevronLeft size={32} />
          </button>
          <div className="font-mono text-sm">
            {table.getState().pagination.pageIndex + 1}/{table.getPageCount()}
          </div>
          <button
            className="p-2 disabled:cursor-default disabled:opacity-30"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <LuChevronRight size={32} />
          </button>
          <button
            className="p-2 disabled:cursor-default disabled:opacity-30"
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
          >
            <LuChevronLast size={32} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminBandTable;
