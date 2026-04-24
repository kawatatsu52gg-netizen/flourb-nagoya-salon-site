import Link from "next/link";

import { SectionShell } from "@/components/shared/section-shell";
import { AnimateIn } from "@/components/shared/animate-in";
import { Button } from "@/components/ui/button";
import { pricingPlans, reservationLinks } from "@/content/copy";

// LP理論: 価格は比較しやすい並列カードで提示し、推奨プランを中央強調すると意思決定が速くなる。
export function Pricing() {
  return (
    <SectionShell id="pricing">
      <AnimateIn>
        <p className="text-xs tracking-[0.2em] text-rose-700">PRICING</p>
        <h2 className="mt-3 font-serif text-3xl md:text-4xl">透明性で信頼を築く、料金設計。</h2>
      </AnimateIn>
      <div className="mt-9 grid gap-5 md:grid-cols-3">
        {pricingPlans.map((plan) => {
          const featured = plan.badge.length > 0;
          return (
            <article
              key={plan.title}
              className={featured ? "glass-card relative border-rose-700 p-6" : "glass-card p-6"}
            >
              {featured && (
                <span className="absolute -top-3 right-6 rounded-full bg-gold-500 px-3 py-1 text-[11px] font-medium text-white">
                  {plan.badge}
                </span>
              )}
              <h3 className="font-serif text-xl">{plan.title}</h3>
              <p className="mt-2 text-3xl font-serif text-rose-700">{plan.price}</p>
              <p className="mt-3 text-sm text-foreground/70">{plan.description}</p>
            </article>
          );
        })}
      </div>
      <div className="mt-8 rounded-2xl border border-rose-300/50 bg-white p-6">
        <h3 className="font-serif text-xl">回数券プラン（5回コース）</h3>
        {/* 回数券の適用対象（小顔単体/コンビ）は現状表記を曖昧化。運用確定時に達也さんへ最終確認。 */}
        <p className="mt-2 whitespace-pre-line text-sm text-foreground/80">
          5回コース ¥45,000（1回あたり¥9,000）{"\n"}
          細胞の再生サイクルに合わせた間隔で通うことを前提に設計。{"\n"}
          短期的な割引目的ではなく、好循環の定着を無理なく続けるための仕組みです。
        </p>
        <p className="mt-3 text-sm text-foreground/65">初回限定カウンセリング無料（運用確定後に最終表記更新）</p>
      </div>
      <div className="mt-8 flex flex-wrap gap-3">
        <Link href={reservationLinks.square} target="_blank" rel="noopener noreferrer">
          <Button size="lg">初回限定カウンセリングを予約する</Button>
        </Link>
        <Link href={reservationLinks.line} target="_blank" rel="noopener noreferrer">
          <Button size="lg" variant="secondary">LINEで相談する</Button>
        </Link>
      </div>
    </SectionShell>
  );
}
