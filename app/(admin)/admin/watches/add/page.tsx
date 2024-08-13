import React from "react";
import AddWatchForm from "./components/AddWatchForm";

const AddWatchPage = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/categories`, {
    cache: "no-store",
  });

  const data = await res.json();

  return (
    <div className="w-full">
      <div className="mx-auto max-w-[800px] rounded-lg bg-transparent px-20 py-8 shadow-none">
        <h1 className="text-center text-2xl font-bold text-foreground">
          時計を追加する
        </h1>
        <AddWatchForm categories={data} />
      </div>
    </div>
  );
};

export default AddWatchPage;
