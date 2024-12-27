import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Noto_Sans_JP } from "next/font/google";
import { Share_Tech_Mono } from "next/font/google";
import "../globals.css";
import Link from "next/link";
import Image from "next/image";
import Footer from "@/components/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--inter",

  weight: ["100", "200", "300", "400", "500", "600", "700"],
});
const notoSansJP = Noto_Sans_JP({
  subsets: ["latin"],
  variable: "--noto-sans",
  weight: ["100", "200", "300", "400", "500", "600", "700"],
});

const shareTechMono = Share_Tech_Mono({
  subsets: ["latin"],
  variable: "--share-tech-mono",
  weight: "400",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL as string),
  title: "Amser | ムーブメント",
  description: "Amserの高品質な自社製ムーブメント",
  openGraph: {
    images: [{ url: "/opengraph.png" }],
  },
};

export default function MovementPageLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth bg-[#e9e9e9]">
      <body
        className={`${inter.variable} ${notoSansJP.variable} ${shareTechMono.variable}bg-[#e9e9e9] relative font-sans`}
      >
        <nav className="fixed left-0 top-0 z-50 hidden w-full lg:block">
          <div className="flex h-auto w-full justify-end px-16 py-8 pb-12">
            <Link href={"/"} className="hover:opacity-70">
              <Image
                src={"/logo.svg"}
                alt="ロゴ"
                height={12}
                width={120}
                className="object-contain"
              />
            </Link>
          </div>
        </nav>
        <main className="mx-auto h-full w-full max-w-[1440px] bg-[#e9e9e9]">
          {children}
        </main>
      </body>
    </html>
  );
}
