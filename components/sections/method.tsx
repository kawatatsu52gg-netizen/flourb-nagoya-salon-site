import Image from "next/image";

import { SectionShell } from "@/components/shared/section-shell";
import { AnimateIn } from "@/components/shared/animate-in";
import { methodSection, methodSteps } from "@/content/copy";

// Step3 タイトルは「続ける｜好循環の定着」を採用（好循環の継続がコピーと直結）。「保つ｜整った状態を、日常へ」も候補だった。
export function Method() {
  const [pillarA, pillarB, continuity] = methodSteps;

  return (
    <SectionShell id="method" className="bg-rose-100/30">
      <AnimateIn>
        <p className="text-xs tracking-[0.2em] text-rose-700">HOW IT WORKS</p>
        <h2 className="mt-3 font-serif text-3xl leading-tight md:text-4xl">{methodSection.heading}</h2>
        <div className="copy-prose mt-4 max-w-3xl space-y-1 text-foreground/85">
          {methodSection.lead.map((line) => (
            <p key={line}>{line}</p>
          ))}
        </div>
      </AnimateIn>
      <div className="mt-10 grid gap-6 md:grid-cols-2">
        {[pillarA, pillarB].map((step, index) => (
          <AnimateIn key={step.title} delay={index * 0.08}>
            <article className="glass-card h-full overflow-hidden">
              <div className="relative aspect-[4/3]">
                <Image src={step.image} alt={step.title} fill className="object-cover" sizes="(max-width:768px)100vw,50vw" />
              </div>
              <div className="p-5">
                <p className="text-xs tracking-[0.16em] text-rose-700">独立メニュー</p>
                <h3 className="mt-1 font-serif text-xl">{step.title}</h3>
                <p className="mt-3 whitespace-pre-line text-sm leading-relaxed text-foreground/80">{step.description}</p>
              </div>
            </article>
          </AnimateIn>
        ))}
        <AnimateIn className="md:col-span-2" delay={0.16}>
          <article className="glass-card overflow-hidden bg-gradient-to-br from-white/95 to-rose-50/60 shadow-sm ring-1 ring-gold-400/35">
            <div className="grid gap-0 md:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] md:items-stretch">
              <div className="relative aspect-[4/3] md:aspect-auto md:min-h-[220px]">
                <Image
                  src={continuity.image}
                  alt={continuity.title}
                  fill
                  className="object-cover"
                  sizes="(max-width:768px)100vw,100vw"
                />
              </div>
              <div className="p-5 md:p-6">
                <p className="text-xs tracking-[0.16em] text-gold-700">Flourb アフター</p>
                <h3 className="mt-1 font-serif text-xl">{continuity.title}</h3>
                <p className="mt-3 whitespace-pre-line text-sm leading-relaxed text-foreground/80">{continuity.description}</p>
              </div>
            </div>
          </article>
        </AnimateIn>
      </div>
    </SectionShell>
  );
}
