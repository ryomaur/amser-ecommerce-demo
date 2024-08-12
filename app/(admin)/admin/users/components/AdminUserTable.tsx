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
import { Menu, Transition } from "@headlessui/react";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { User } from "@prisma/client";
import { BiDetail } from "react-icons/bi";

const columnHelper = createColumnHelper<User>();

interface AdminUserTableProps {
  users: User[];
}

const AdminUserTable: React.FC<AdminUserTableProps> = ({ users }) => {
  const data: User[] = useMemo(() => users, [users]);

  const [sorting, setSorting] = useState<SortingState>([]);
  const [filtering, setFiltering] = useState("");

  const columns = [
    columnHelper.accessor((row) => row.id, {
      id: "id",
      cell: (info) => info.getValue(),
      header: () => <span>ID</span>,
    }),
    columnHelper.accessor((row) => row.username, {
      id: "username",
      cell: (info) => info.getValue(),
      header: () => <span>ユーザーネーム</span>,
    }),
    columnHelper.accessor((row) => row.email, {
      id: "email",
      cell: (info) => <span>{info.getValue()}</span>,
      header: () => <span>メールアドレス</span>,
    }),
    columnHelper.accessor((row) => row.isAdmin, {
      id: "isAdmin",
      cell: (info) => (
        <span className="text-nowrap">
          {info.getValue() ? <span>管理者</span> : <span>管理者ではない</span>}
        </span>
      ),
      header: () => <span>管理者</span>,
    }),
    columnHelper.accessor((row) => row.createdAt, {
      id: "createdAt",
      cell: (info) => (
        <span className="text-xs">{info.getValue().toLocaleDateString()}</span>
      ),
      header: () => <span>登録日</span>,
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
                  href={`/admin/users/${info.getValue()}`}
                  className="flex items-center gap-3 px-3 py-3 text-xs"
                >
                  <BiDetail size={16} />
                  ユーザーの詳細を見る
                </Link>
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

export default AdminUserTable;
