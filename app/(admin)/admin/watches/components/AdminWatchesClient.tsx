"use client";

import { FiPlus } from "react-icons/fi";
import AdminWatchTable from "./AdminWatchTable";
import Link from "next/link";
import { Product } from "@prisma/client";

interface WatchesClientProps {
  watches: Product[];
}

const AdminWatchesClient: React.FC<WatchesClientProps> = ({ watches }) => {
  return (
    <section className="w-full">
      <div className="flex w-full justify-between">
        <h1 className="text-2xl font-bold">時計</h1>
        <Link
          href={"/admin/watches/add"}
          className="flex items-center gap-2 rounded-lg bg-black px-4 py-2 text-sm font-semibold text-background hover:bg-black/85"
        >
          <FiPlus size={18} />
          商品を追加する
        </Link>
      </div>
      <AdminWatchTable watches={watches} />
    </section>
  );
};

export default AdminWatchesClient;
