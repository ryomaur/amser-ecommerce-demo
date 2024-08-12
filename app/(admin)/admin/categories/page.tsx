import { Categories } from "@/types";
import Link from "next/link";
import { FiPlus } from "react-icons/fi";

const AdminCategoriesPage = async () => {
  const res = await fetch("http://localhost:3000/api/categories", {
    cache: "no-store",
  });

  const data: Categories = await res.json();

  return (
    <main className="text-foreground">
      <section className="w-full">
        <h1 className="text-2xl font-bold">時計</h1>

        <div className="mt-8 grid grid-cols-2 gap-12">
          <div className="flex-col items-center justify-center">
            <div className="flex items-center gap-5">
              <h2 className="text-lg font-semibold">ムーブメント</h2>
              <Link
                href={"/admin/categories/add/movement"}
                className="flex items-center gap-1 rounded-md bg-foreground px-2 py-2 text-sm font-semibold text-background hover:bg-foreground/90"
              >
                <FiPlus size={18} />
              </Link>
            </div>
            <div className="mt-5 flex flex-wrap items-center gap-2">
              {data.movements.map((item) => (
                <div
                  className="text-nowrap rounded-lg bg-bglighter px-8 py-4 text-sm font-medium shadow-sm"
                  key={item.value}
                >
                  {item.name_ja}
                </div>
              ))}
            </div>
          </div>

          <div className="flex-col items-center justify-center">
            <div className="flex items-center gap-5">
              <h2 className="text-lg font-semibold">ケースの種類</h2>
              <Link
                href={"/admin/categories/add/caseType"}
                className="flex items-center gap-1 rounded-md bg-foreground px-2 py-2 text-sm font-semibold text-background hover:bg-foreground/90"
              >
                <FiPlus size={18} />
              </Link>
            </div>
            <div className="mt-5 flex flex-wrap items-center gap-2">
              {data.caseTypes.map((item) => (
                <div
                  className="text-nowrap rounded-lg bg-bglighter px-8 py-4 text-sm font-medium shadow-sm"
                  key={item.value}
                >
                  {item.name_ja}
                </div>
              ))}
            </div>
          </div>

          <div className="flex-col items-center justify-center">
            <div className="flex items-center gap-5">
              <h2 className="text-lg font-semibold">ケースの色</h2>
              <Link
                href={"/admin/categories/add/caseColor"}
                className="flex items-center gap-1 rounded-md bg-foreground px-2 py-2 text-sm font-semibold text-background hover:bg-foreground/90"
              >
                <FiPlus size={18} />
              </Link>
            </div>
            <div className="mt-5 flex flex-wrap items-center gap-2">
              {data.caseColors.map((item) => (
                <div
                  className="flex items-center justify-center gap-3 text-nowrap rounded-lg bg-bglighter px-8 py-4 text-sm font-medium shadow-sm"
                  key={item.value}
                >
                  {item.name_ja}
                  <div
                    className="h-4 w-4 rounded-full border border-foreground"
                    style={{ backgroundColor: item.hexValue }}
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="flex-col items-center justify-center">
            <div className="flex items-center gap-5">
              <h2 className="text-lg font-semibold">文字盤の色</h2>
              <Link
                href={"/admin/categories/add/faceColor"}
                className="flex items-center gap-1 rounded-md bg-foreground px-2 py-2 text-sm font-semibold text-background hover:bg-foreground/90"
              >
                <FiPlus size={18} />
              </Link>
            </div>
            <div className="mt-5 flex flex-wrap items-center gap-2">
              {data.faceColors.map((item) => (
                <div
                  className="flex items-center justify-center gap-3 text-nowrap rounded-lg bg-bglighter px-8 py-4 text-sm font-medium shadow-sm"
                  key={item.value}
                >
                  {item.name_ja}
                  <div
                    className="h-4 w-4 rounded-full border border-foreground"
                    style={{ backgroundColor: item.hexValue }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      <section className="mt-14 w-full">
        <h1 className="text-2xl font-bold">バンド</h1>

        <div className="mt-8 grid grid-cols-2 gap-12">
          <div className="flex-col items-center justify-center">
            <div className="flex items-center gap-5">
              <h2 className="text-lg font-semibold">バンドの種類</h2>
              <Link
                href={"/admin/categories/add/bandType"}
                className="flex items-center gap-1 rounded-md bg-foreground px-2 py-2 text-sm font-semibold text-background hover:bg-foreground/90"
              >
                <FiPlus size={18} />
              </Link>
            </div>
            <div className="mt-5 flex flex-wrap items-center gap-2">
              {data.bandTypes.map((item) => (
                <div
                  className="text-nowrap rounded-lg bg-bglighter px-8 py-4 text-sm font-medium shadow-sm"
                  key={item.value}
                >
                  {item.name_ja}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default AdminCategoriesPage;
