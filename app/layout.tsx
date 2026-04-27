import type { Metadata } from "next";
import { Noto_Sans_JP, Noto_Serif_JP, Playfair_Display } from "next/font/google";

import "./globals.css";

const notoSans = Noto_Sans_JP({
  variable: "--font-noto-sans-jp",
  subsets: ["latin"],
  weight: ["400", "500", "700"]
});

const notoSerif = Noto_Serif_JP({
  variable: "--font-noto-serif-jp",
  subsets: ["latin"],
  weight: ["400", "500", "700"]
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["500", "600", "700"]
});

export const metadata: Metadata = {
  metadataBase: new URL("https://flourb.com"),
  title: "Flourb名古屋｜肌と輪郭から、本質のわたしへ",
  description:
    "名古屋・伏見の小顔矯正＆ハーブピーリング。骨格×細胞の統合アプローチで、本質的な美しさへ。",
  alternates: {
    canonical: "https://flourb.com"
  },
  openGraph: {
    title: "Flourb名古屋｜肌と輪郭から、本質のわたしへ",
    description:
      "名古屋・伏見の小顔矯正＆ハーブピーリング。骨格×細胞の統合アプローチで、本質的な美しさへ。",
    url: "https://flourb.com",
    siteName: "Flourb Nagoya",
    locale: "ja_JP",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Flourb名古屋｜肌と輪郭から、本質のわたしへ",
    description:
      "名古屋・伏見の小顔矯正＆ハーブピーリング。骨格×細胞の統合アプローチで、本質的な美しさへ。"
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <body className={`${notoSans.variable} ${notoSerif.variable} ${playfair.variable}`}>
        {children}
      </body>
    </html>
  );
}
