import React from "react";
import EditBandForm from "./components/EditBandForm";
import getProductById from "@/actions/getProductById";
import { redirect } from "next/navigation";

interface EditBandPageProps {
  params: {
    productId: string;
  };
}

const EditBandPage: React.FC<EditBandPageProps> = async ({ params }) => {
  const product = await getProductById(params);
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/categories`, {
    cache: "no-store",
  });

  const data = await res.json();

  if (!product) {
    return <div>NOT FOUND</div>;
  }

  if (product.productType === "watch") {
    redirect(`/admin/watches/edit/${params.productId}`);
  } else if (product.productType !== "band") {
    return <div>ERROR</div>;
  }

  return (
    <div className="w-full">
      <div className="mx-auto max-w-[800px] rounded-lg bg-transparent px-20 py-8 shadow-none">
        <h1 className="text-center text-2xl font-bold text-foreground">
          バンドを編集する
        </h1>
        <EditBandForm product={product} categories={data} />
      </div>
    </div>
  );
};

export default EditBandPage;
