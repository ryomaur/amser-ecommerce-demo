import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Noto_Sans_JP } from "next/font/google";
import { Share_Tech_Mono } from "next/font/google";
import "../globals.css";
import Footer from "@/components/Footer";
import Navbar from "@/components/navbar/Navbar";
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
  // metadataBase: new URL(""),
  title: "Amser 腕時計 | Amser 公式webサイト",
  description: "Amserウォッチの公式ウェブサイトです。",
  openGraph: {
    images: [{ url: "/opengraph.png" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${inter.variable} ${notoSansJP.variable} ${shareTechMono.variable} bg-background font-sans`}
      >
        <ToasterProvider />
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
