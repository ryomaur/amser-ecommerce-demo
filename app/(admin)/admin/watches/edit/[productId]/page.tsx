import React from "react";
import EditWatchForm from "./components/EditWatchForm";
import getProductById from "@/actions/getProductById";
import { redirect } from "next/navigation";

interface EditWatchPageProps {
  params: {
    productId: string;
  };
}

const EditWatchPage: React.FC<EditWatchPageProps> = async ({ params }) => {
  const product = await getProductById(params);

  if (!product) {
    return <div>NOT FOUND</div>;
  }

  if (product.productType === "strap") {
    redirect(`/admin/straps/edit/${params.productId}`);
  } else if (product.productType !== "watch") {
    return <div>ERROR</div>;
  }

  const res = await fetch("http://localhost:3000/api/categories", {
    cache: "no-store",
  });

  const data = await res.json();

  return (
    <div className="w-full">
      <div className="mx-auto max-w-[800px] rounded-lg bg-transparent px-20 py-8 shadow-none">
        <h1 className="text-center text-2xl font-bold text-foreground">
          時計を編集する
        </h1>
        <EditWatchForm product={product} categories={data} />
      </div>
    </div>
  );
};

export default EditWatchPage;
