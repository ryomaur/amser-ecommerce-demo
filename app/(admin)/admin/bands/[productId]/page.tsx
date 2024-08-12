import prisma from "@/lib/db";
import React from "react";
import { notFound, redirect } from "next/navigation";

interface AdminBandDetailPageProps {
  params: {
    productId: string;
  };
}

const AdminBandDetailPage: React.FC<AdminBandDetailPageProps> = async ({
  params,
}) => {
  const product = await prisma.product.findUnique({
    where: {
      id: params.productId,
    },
  });

  if (!product) {
    notFound();
  }

  if (product.productType === "watch") {
    redirect(`/admin/watches/${product.id}`);
  }

  return (
    <div className="w-full">
      <div className="w-full">
        <div className="mx-auto w-full rounded-lg bg-transparent px-20 py-12 shadow-none">
          <h1 className="text-xl font-bold text-foreground">バンドの詳細</h1>
          <div className="my-7 flex flex-col gap-2 font-medium text-foreground/90">
            <div className="flex items-center gap-5 text-sm">
              <div className="text-sm">商品ID：</div>
              <div>{product.id}</div>
            </div>
            <div className="flex items-center gap-5 text-sm">
              <div className="text-sm">商品名：</div>
              <div>{product.name}</div>
            </div>
            <div className="flex items-center gap-5 text-sm">
              <div className="text-sm">商品概要：</div>
              <div>{product.description}</div>
            </div>
            <div className="flex items-center gap-5 text-sm">
              <div className="text-sm">バンドの種類：</div>
              <div>{product.bandType_ja}</div>
            </div>
            <div className="flex items-center gap-5 text-sm">
              <div className="text-sm">登録日時：</div>
              <div>{product.createdAt.toLocaleString("ja-JP")}</div>
            </div>
            <div className="flex items-center gap-5 text-sm">
              <div className="text-sm">更新日時：</div>
              <div>{product.updatedAt.toLocaleString("ja-JP")}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminBandDetailPage;
