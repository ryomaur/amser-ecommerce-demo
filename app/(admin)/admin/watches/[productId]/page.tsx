import prisma from "@/lib/db";
import React from "react";
import { notFound, redirect } from "next/navigation";

interface AdminWatchDetailPageProps {
  params: {
    productId: string;
  };
}

const AdminWatchDetailPage: React.FC<AdminWatchDetailPageProps> = async ({
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

  if (product.productType === "band") {
    redirect(`/admin/bands/${product.id}`);
  }

  return (
    <div className="w-full">
      <div className="w-full">
        <div className="mx-auto w-full rounded-lg bg-transparent px-20 py-12 shadow-none">
          <h1 className="text-xl font-bold text-foreground">時計の詳細</h1>
          <div className="my-7 flex flex-col gap-2 font-medium text-foreground/90">
            <div className="flex items-center gap-5 text-sm">
              <div className="text-sm">商品ID：</div>
              <div>{product.id}</div>
            </div>
            <div className="flex items-center gap-5 text-sm">
              <div className="text-sm">商品名：</div>
              <div>{product.name}</div>
            </div>
            <div className="flex gap-5 text-sm">
              <div className="text-nowrap text-sm">商品概要：</div>
              <div>{product.description}</div>
            </div>
            <div className="flex items-center gap-5 text-sm">
              <div className="text-sm">価格：</div>
              <div>{product.price}</div>
            </div>
            <div className="flex items-center gap-5 text-sm">
              <div className="text-sm">ムーブメント：</div>
              <div>{product.movement_ja}</div>
            </div>
            <div className="flex items-center gap-5 text-sm">
              <div className="text-sm">ケース：</div>
              <div>{product.caseType_ja}</div>
            </div>
            <div className="flex items-center gap-5 text-sm">
              <div className="text-sm">ケースの色：</div>
              <div>{product.caseColor_ja}</div>
            </div>
            <div className="flex items-center gap-5 text-sm">
              <div className="text-sm">ケース幅：</div>
              <div>{product.caseWidth}mm</div>
            </div>
            <div className="flex items-center gap-5 text-sm">
              <div className="text-sm">ケース長さ：</div>
              <div>{product.caseLength}mm</div>
            </div>
            <div className="flex items-center gap-5 text-sm">
              <div className="text-sm">ケースの厚さ：</div>
              <div>{product.caseThickness}mm</div>
            </div>
            <div className="flex items-center gap-5 text-sm">
              <div className="text-sm">防水対応水深：</div>
              <div>{product.waterResistance}m</div>
            </div>
            <div className="flex items-center gap-5 text-sm">
              <div className="text-sm">重さ：</div>
              <div>{product.weight}g</div>
            </div>
            <div className="flex items-center gap-5 text-sm">
              <div className="text-sm">文字盤の色：</div>
              <div>{product.faceColor_ja}</div>
            </div>
            <div className="flex items-center gap-5 text-sm">
              <div className="text-sm">バンド：</div>
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

export default AdminWatchDetailPage;
