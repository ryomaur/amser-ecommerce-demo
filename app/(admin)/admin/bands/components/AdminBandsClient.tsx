"use client";

import { FiPlus } from "react-icons/fi";
import Link from "next/link";
import AdminBandTable from "./AdminBandTable";
import { Product } from "@prisma/client";

interface AdminBandsClientProps {
  bands: Product[];
}

const AdminBandsClient: React.FC<AdminBandsClientProps> = ({ bands }) => {
  return (
    <section className="w-full">
      <div className="flex w-full justify-between">
        <h1 className="text-2xl font-bold">バンド</h1>
        <Link
          href={"/admin/bands/add"}
          className="flex items-center gap-2 rounded-lg bg-black px-4 py-2 text-sm font-semibold text-background hover:bg-black/85"
        >
          <FiPlus size={18} />
          商品を追加する
        </Link>
      </div>

      <AdminBandTable bands={bands} />
    </section>
  );
};

export default AdminBandsClient;
