"use client";

import { Toaster } from "react-hot-toast";

const ToasterProvider = () => {
  return (
    <Toaster
      toastOptions={{
        position: "top-right",
        className: "font-sans text-sm border-2 border-foreground bg-bglighter",
      }}
      containerStyle={{
        top: 70,
      }}
    />
  );
};

export default ToasterProvider;
