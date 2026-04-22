import Image from "next/image";

import { SectionShell } from "@/components/shared/section-shell";
import { AnimateIn } from "@/components/shared/animate-in";
import { methodSteps } from "@/content/copy";

// LP理論: 抽象メッセージの直後に「3ステップ」を提示すると理解負荷が下がり離脱を防げる。
export function Method() {
  return (
    <SectionShell id="method" className="bg-rose-100/30">
      <AnimateIn>
        <p className="text-xs tracking-[0.2em] text-rose-700">HOW IT WORKS</p>
        <h2 className="mt-3 font-serif text-3xl leading-tight md:text-4xl">施術が体に起こす、3つの変化。</h2>
        <p className="copy-prose mt-4 max-w-3xl">
          HALII ACADEMYでの学びとハワイ解剖学研修で培った視点をもとに、順序設計された3ステップで変化を積み上げます。
        </p>
      </AnimateIn>
      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {methodSteps.map((step, index) => (
          <AnimateIn key={step.title} delay={index * 0.08}>
            <article className="glass-card overflow-hidden">
              <div className="relative aspect-[4/3]">
                <Image src={step.image} alt={step.title} fill className="object-cover" sizes="(max-width:768px)100vw,33vw" />
              </div>
              <div className="p-5">
                <p className="text-xs tracking-[0.16em] text-rose-700">STEP {index + 1}</p>
                <h3 className="mt-1 font-serif text-xl">{step.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-foreground/80">{step.description}</p>
              </div>
            </article>
          </AnimateIn>
        ))}
      </div>
    </SectionShell>
  );
}
