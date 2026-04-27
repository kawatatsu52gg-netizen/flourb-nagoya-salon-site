"use client";

import Link from "next/link";

import { type DiagnosisType } from "@/app/diagnosis/lib/scoring";
import { Button } from "@/components/ui/button";

export const resultTemplates = {
  herb: {
    typeLabel: "HERB PEELING TYPE",
    typeName: "肌細胞リセット型",
    icon: "🌿",
    subtitle: "あなたに必要なのは、肌の深部からの再生です",
    menu: {
      name: "ハーブピーリング",
      price: "¥13,500",
      duration: "60分",
      description: "表皮から真皮層の深部まで届く、肌細胞アプローチ",
      bookingHref: "/#reserve"
    }
  },
  kogao: {
    typeLabel: "STRUCTURE REBALANCE TYPE",
    typeName: "骨格リバランス型",
    icon: "🦴",
    subtitle: "あなたに必要なのは、構造からの整えです",
    menu: {
      name: "小顔矯正",
      price: "¥12,000",
      duration: "60分",
      description: "骨格・血流・筋肉の滞りへ、土台から整えるアプローチ",
      bookingHref: "/#reserve"
    }
  },
  both: {
    typeLabel: "INTEGRATED REGENERATION TYPE",
    typeName: "統合リジェネレーション型",
    icon: "✨",
    subtitle: "あなたに必要なのは、構造と細胞、両方からのアプローチです",
    menu: {
      name: "ハーブピーリング × 小顔セット",
      price: "¥22,000",
      duration: "90分",
      description: "身体の土台と肌細胞に、同時に働きかける統合メニュー",
      bookingHref: "/#reserve"
    },
    isRecommended: true
  },
  homecare: {
    typeLabel: "HOMECARE FIRST TYPE",
    typeName: "ホームケアファースト型",
    icon: "🏠",
    subtitle: "まずは、毎日のケアから土台を整えましょう",
    menu: {
      name: "RIMAN スキンケア（公式モール経由）",
      price: "",
      duration: "",
      description: "敏感肌にも配慮された、日々のセルフケアから始めるアプローチ。将来的なサロンケアの土台作りに。",
      bookingHref: "https://mall.riman.com/rmnsocial/home?country=JP&lang=ja-JP",
      externalLink: true
    }
  }
} as const;

interface ResultCardProps {
  type: DiagnosisType;
  personalMessage: string;
  reasons: string[];
}

export function ResultCard({ type, personalMessage, reasons }: ResultCardProps) {
  const template = resultTemplates[type];
  const isExternalMenu = "externalLink" in template.menu && template.menu.externalLink;
  const encodedText =
    "Flourb名古屋の診断を試しました。10問で自分に合うケアの方向性が見えて、予約前の不安が減りました。";
  const shareUrl = "https://flourb.com/diagnosis";
  const xShareHref = `https://x.com/intent/tweet?text=${encodeURIComponent(encodedText)}&url=${encodeURIComponent(shareUrl)}`;
  const lineShareHref = `https://social-plugins.line.me/lineit/share?url=${encodeURIComponent(shareUrl)}`;

  return (
    <section className="space-y-8">
      <article className="glass-card p-6 md:p-10">
        <p className="text-xs tracking-[0.2em] text-rose-700">{template.typeLabel}</p>
        <div className="mt-4 flex items-center gap-3">
          <span className="text-3xl">{template.icon}</span>
          <h2 className="font-serif text-3xl md:text-4xl">{template.typeName}</h2>
        </div>
        <p className="mt-4 text-base text-foreground/75 md:text-lg">{template.subtitle}</p>

        <div className="mt-8 rounded-2xl bg-rose-50/60 p-5 md:p-6">
          <p className="whitespace-pre-line text-sm leading-[2] text-foreground/80 md:text-base">{personalMessage}</p>
        </div>

        <div className="mt-8">
          <p className="text-sm tracking-[0.14em] text-rose-700">なぜこの提案なのか</p>
          <ul className="mt-4 space-y-3">
            {reasons.slice(0, 3).map((reason) => (
              <li key={reason} className="rounded-xl border border-rose-200/70 bg-white px-4 py-3 text-sm text-foreground/80">
                {reason}
              </li>
            ))}
          </ul>
        </div>
      </article>

      <article className="glass-card p-6 md:p-8">
        {"isRecommended" in template && template.isRecommended && (
          <p className="inline-flex rounded-full bg-gold-500 px-3 py-1 text-xs text-white">最も選ばれています</p>
        )}
        <h3 className="mt-3 font-serif text-2xl">{template.menu.name}</h3>
        {(template.menu.price || template.menu.duration) && (
          <p className="mt-2 text-xl text-rose-700">
            {[template.menu.price, template.menu.duration].filter(Boolean).join("｜")}
          </p>
        )}
        <p className="mt-3 text-sm leading-relaxed text-foreground/75">{template.menu.description}</p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href={template.menu.bookingHref}
            target={isExternalMenu ? "_blank" : undefined}
            rel={isExternalMenu ? "noopener noreferrer" : undefined}
          >
            <Button size="lg">{isExternalMenu ? "公式モールを見る" : "このメニューを予約する"}</Button>
          </Link>
          <Link href="/#reserve">
            <Button size="lg" variant="secondary">
              まずカウンセリングで相談する
            </Button>
          </Link>
        </div>
      </article>

      <div className="flex flex-wrap items-center gap-5 text-sm">
        <button type="button" onClick={() => window.location.reload()} className="text-rose-700 underline underline-offset-4">
          他のタイプも見る
        </button>
        <a href={xShareHref} target="_blank" rel="noopener noreferrer" className="text-foreground/70 underline underline-offset-4">
          Xでシェア
        </a>
        <a
          href={lineShareHref}
          target="_blank"
          rel="noopener noreferrer"
          className="text-foreground/70 underline underline-offset-4"
        >
          LINEでシェア
        </a>
      </div>
    </section>
  );
}
