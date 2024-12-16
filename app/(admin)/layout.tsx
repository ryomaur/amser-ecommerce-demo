import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Noto_Sans_JP } from "next/font/google";
import { Share_Tech_Mono } from "next/font/google";
import "../globals.css";
import Sidebar from "./admin/components/Sidebar";
import ToasterProvider from "@/providers/ToasterProvider";

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
  title: "Amser 管理者ページ",
  description: "Amser公式サイトの管理者ページ",
  openGraph: {
    images: [{ url: "/opengraph.png" }],
  },
};

export default function AdminPageLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${inter.variable} ${notoSansJP.variable} ${shareTechMono.variable} h-dvh bg-background font-sans`}
      >
        <ToasterProvider />
        <div className="relative h-full w-full lg:flex">
          <Sidebar />
          <main className="h-full w-full overflow-x-hidden overflow-y-scroll px-5 py-20 font-sans sm:px-10 lg:px-20 lg:py-12">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
