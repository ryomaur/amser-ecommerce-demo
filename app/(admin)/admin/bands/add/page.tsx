import React from "react";
import AddBandForm from "./components/AddBandForm";

const AddBandPage = async () => {
  const res = await fetch("http://localhost:3000/api/categories", {
    cache: "no-store",
  });

  const data = await res.json();

  return (
    <div className="w-full">
      <div className="mx-auto max-w-[800px] rounded-lg bg-transparent px-20 py-8 shadow-none">
        <h1 className="text-center text-2xl font-bold text-foreground">
          バンドを追加する
        </h1>
        <AddBandForm categories={data} />
      </div>
    </div>
  );
};

export default AddBandPage;
