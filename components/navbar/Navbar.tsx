import Image from "next/image";
import Link from "next/link";
import NavbarButtons from "./NavbarButtons";
import getCurrentUser from "@/actions/getCurrentUser";
import { getCart } from "@/actions/cart";

const Navbar = async () => {
  const user = await getCurrentUser();
  const cart = await getCart();

  return (
    <>
      <header className="fixed top-0 z-50 hidden w-full bg-bglighter font-sans lg:block lg:px-6 xl:px-20">
        <div className="mx-auto flex h-14 max-w-[1920px] items-center justify-between text-foreground">
          <nav>
            <ul className="flex list-none font-mono text-sm font-normal uppercase">
              <li>
                <Link
                  href={"/products?productType=watch"}
                  className="group relative flex items-center p-3 hover:opacity-70"
                >
                  <div>Watches</div>
                </Link>
              </li>
              <li>
                <Link
                  href={"/products?productType=band"}
                  className="group relative flex items-center p-3 hover:opacity-70"
                >
                  <div>Bands</div>
                </Link>
              </li>
              <li>
                <Link
                  href={"/about"}
                  className="group relative flex items-center p-3 hover:opacity-70"
                >
                  <div>About</div>
                </Link>
              </li>
              <li>
                <Link
                  href={"/support"}
                  className="group relative flex items-center p-3 hover:opacity-70"
                >
                  <div>Support</div>
                </Link>
              </li>
            </ul>
          </nav>

          <Link href={"/"} className="hover:opacity-70">
            <Image
              src={"/logo.svg"}
              alt="ロゴ"
              height={12}
              width={120}
              className="object-contain"
            />
          </Link>

          <NavbarButtons user={user} cart={cart} />
        </div>
      </header>

      <header className="fixed top-0 z-50 h-[3.25rem] w-full bg-[rgba(0,0,0,0.75)] px-5 font-sans backdrop-blur-lg sm:h-14 sm:px-6 lg:hidden">
        <div className="flex h-full w-full items-center justify-between">
          <Link href={"/"} className="hover:opacity-70">
            <Image
              src={"/logo-white.svg"}
              alt="ロゴ"
              width={100}
              height={20}
              className="object-contain"
            />
          </Link>

          <div className="flex items-center">
            <NavbarButtons user={user} cart={cart} />
          </div>
        </div>
      </header>
    </>
  );
};

export default Navbar;
