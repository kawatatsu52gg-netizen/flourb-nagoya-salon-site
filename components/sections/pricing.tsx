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
              {"footnote" in plan && plan.footnote ? (
                <>
                  <p className="mt-3 text-sm text-neutral-700 leading-relaxed">{plan.description}</p>
                  <p className="mt-2 text-xs text-neutral-500 leading-relaxed">{plan.footnote}</p>
                </>
              ) : (
                <p className="mt-3 text-sm text-foreground/70">{plan.description}</p>
              )}
            </article>
          );
        })}
      </div>
      <div className="mt-12 flex flex-wrap gap-3">
        <Link href={reservationLinks.square}>
          <Button size="lg">初回限定カウンセリングを予約する</Button>
        </Link>
        <Link href={reservationLinks.line} target="_blank" rel="noopener noreferrer">
          <Button size="lg" variant="secondary">LINEで相談する</Button>
        </Link>
      </div>
      <section className="mt-20 rounded-3xl border border-rose-300/30 bg-rose-100/35 px-6 py-12 md:px-10 md:py-16">
        <p className="text-xs tracking-[0.3em] text-gold-700">DIAGNOSIS</p>
        <h3 className="mt-6 font-serif text-3xl font-medium leading-[1.6] tracking-wide md:text-5xl">
          あなたの状態、悩みに合わせた
          <br />
          アプローチを提案します。
        </h3>
        <p className="mt-8 max-w-3xl text-base leading-[2] text-foreground/75 md:text-lg">
          肌の状態、骨格の癖、ライフスタイル、そして「今いちばん変えたいこと」。10問の質問にお答えいただくと、ハーブピーリング・小顔矯正・ホームケアの中から、あなたにもっとも合う道筋をご提案します。
        </p>

        <div className="mt-10 grid gap-8 md:grid-cols-3">
          <div>
            <p className="mb-3 text-sm tracking-widest text-gold-700">01</p>
            <p className="mb-2 font-medium">約3分で完了</p>
            <p className="text-sm leading-relaxed text-foreground/65">10問の質問に答えるだけ。所要時間は約3分です。</p>
          </div>
          <div>
            <p className="mb-3 text-sm tracking-widest text-gold-700">02</p>
            <p className="mb-2 font-medium">あなた専用の診断文</p>
            <p className="text-sm leading-relaxed text-foreground/65">
              あなたの回答を一つひとつ読み解き、一人ひとり違う言葉で結果をお伝えします。
            </p>
          </div>
          <div>
            <p className="mb-3 text-sm tracking-widest text-gold-700">03</p>
            <p className="mb-2 font-medium">最適な一歩をご提案</p>
            <p className="text-sm leading-relaxed text-foreground/65">
              施術・ホームケア、あなたに合う道筋を明確にします。
            </p>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 sm:flex-row">
          <Link href="/diagnosis">
            <Button size="lg" className="w-full sm:w-auto">
              無料診断をはじめる
            </Button>
          </Link>
          <Link href="/booking">
            <Button size="lg" variant="secondary" className="w-full sm:w-auto">
              先にカウンセリングを予約する
            </Button>
          </Link>
        </div>

        <p className="mt-6 text-xs text-foreground/55">
          ※ 診断結果はあくまで目安です。最終的な施術内容はカウンセリングで決定します。
        </p>
      </section>
    </SectionShell>
  );
}
