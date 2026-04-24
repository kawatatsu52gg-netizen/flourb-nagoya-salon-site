import type { Metadata } from "next";

import { DiagnosisFlow } from "@/app/diagnosis/components/DiagnosisFlow";

export const metadata: Metadata = {
  title: "AI診断｜あなたに必要なケアを、AIが一緒に探します - Flourb名古屋",
  description:
    "10問の質問であなたに最適な美容アプローチを診断。ハーブピーリング・小顔矯正・ホームケアから、あなただけの道筋をご提案します。",
  openGraph: {
    title: "AI診断｜あなたに必要なケアを、AIが一緒に探します - Flourb名古屋",
    description:
      "10問の質問であなたに最適な美容アプローチを診断。ハーブピーリング・小顔矯正・ホームケアから、あなただけの道筋をご提案します。",
    url: "https://flourb.com/diagnosis",
    siteName: "Flourb Nagoya",
    locale: "ja_JP",
    type: "website",
    images: [{ url: "https://flourb.com/placeholders/hero-visual.jpg" }]
  }
};

export default function DiagnosisPage() {
  return <DiagnosisFlow />;
}
