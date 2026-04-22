import Image from "next/image";

import { SectionShell } from "@/components/shared/section-shell";
import { AnimateIn } from "@/components/shared/animate-in";
import { beforeAfterCards, proofStats } from "@/content/copy";

// LP理論: Before/After + 数字ファクトの組み合わせは、主観と客観を同時に補強してCVを押し上げる。
export function Proof() {
  return (
    <SectionShell id="proof">
      <AnimateIn>
        <p className="text-xs tracking-[0.2em] text-rose-700">PROOF</p>
        <h2 className="mt-3 font-serif text-3xl md:text-4xl">実際の変化。</h2>
      </AnimateIn>
      <div className="mt-9 grid gap-5 md:grid-cols-3">
        {beforeAfterCards.map((card, index) => (
          <AnimateIn key={card.title} delay={0.08 * index}>
            <article className="glass-card overflow-hidden">
              <div className="relative aspect-[4/3]">
                <Image src={card.image} alt={card.title} fill className="object-cover" sizes="(max-width:768px)100vw,33vw" />
              </div>
              <div className="space-y-2 p-5">
                <p className="text-xs uppercase tracking-[0.2em] text-rose-700">{card.title}</p>
                <p className="text-sm font-medium text-foreground/80">{card.meta}</p>
                <p className="text-sm leading-relaxed text-foreground/75">{card.comment}</p>
              </div>
            </article>
          </AnimateIn>
        ))}
      </div>
      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {proofStats.map((stat) => (
          <div key={stat.label} className="rounded-2xl border border-rose-300/40 bg-white px-5 py-4">
            <p className="text-xs tracking-[0.15em] text-foreground/55">{stat.label}</p>
            <p className="mt-2 text-3xl font-serif text-rose-700">{stat.value}</p>
            <p className="mt-1 text-xs text-foreground/50">{stat.note}</p>
          </div>
        ))}
      </div>
    </SectionShell>
  );
}
