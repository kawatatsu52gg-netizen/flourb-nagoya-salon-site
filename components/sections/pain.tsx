import Image from "next/image";

import { SectionShell } from "@/components/shared/section-shell";
import { AnimateIn } from "@/components/shared/animate-in";
import { painPoints } from "@/content/copy";

// LP理論: ユーザーの未解決痛点を言語化すると「自分向け」認知が高まり読了率が上がる。
export function Pain() {
  return (
    <SectionShell id="pain" className="bg-rose-100/40">
      <div className="grid gap-10 md:grid-cols-[1.1fr_0.9fr] md:items-start">
        <AnimateIn>
          <p className="text-xs tracking-[0.2em] text-rose-700">PAIN</p>
          <h2 className="mt-3 font-serif text-3xl leading-tight md:text-4xl">鏡の前で感じていた、あの違和感。</h2>
          <ul className="mt-8 space-y-4">
            {painPoints.map((point) => (
              <li key={point} className="rounded-2xl border border-rose-300/50 bg-white/70 px-5 py-4 text-sm md:text-base">
                {point}
              </li>
            ))}
          </ul>
        </AnimateIn>
        <AnimateIn delay={0.1}>
          <div className="relative aspect-[4/5] overflow-hidden rounded-3xl shadow-luxury">
            <Image
              src="/placeholders/pain-mood.jpg"
              alt="鏡の前で輪郭を確かめる女性"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 40vw"
            />
          </div>
        </AnimateIn>
      </div>
    </SectionShell>
  );
}
