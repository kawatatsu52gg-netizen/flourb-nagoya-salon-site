import Link from "next/link";
import Image from "next/image";

import { heroCopy, reservationLinks } from "@/content/copy";
import { AnimateIn } from "@/components/shared/animate-in";
import { Button } from "@/components/ui/button";

// LP理論: ファーストビュー5秒で未来像と行動導線を提示すると離脱が下がる。
// LP理論: 主CTAと探索CTAの二段構えで、検討層と即決層を同時に拾う。
export function Hero() {
  return (
    <section id="top" className="relative min-h-[92vh] overflow-hidden">
      <Image
        src="/placeholders/hero-visual.jpg"
        alt="Flourbの施術イメージ"
        fill
        priority
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/45 via-black/35 to-background/95" />
      <div className="section-shell relative z-10 flex min-h-[92vh] items-end py-14 md:items-center md:py-20">
        <div className="max-w-3xl text-white">
          <AnimateIn>
            <p className="mb-4 text-sm tracking-[0.2em] text-gold-300">NAGOYA FUSHIMI / FLOURB</p>
            <h1 className="font-serif font-medium tracking-[0.06em] leading-[1.45] text-[clamp(1.75rem,5vw,2.75rem)] md:text-[clamp(2.25rem,4.5vw,3.75rem)]">
              {heroCopy.titleLines.map((line, i) => (
                <span key={line} className={`block w-fit max-w-full ${i === 1 ? "mt-1 md:mt-1.5" : ""}`}>
                  {line}
                </span>
              ))}
            </h1>
          </AnimateIn>
          <AnimateIn delay={0.1}>
            <p className="mt-6 max-w-2xl text-sm leading-relaxed text-white/90 md:text-lg">{heroCopy.subtitle}</p>
          </AnimateIn>
          <AnimateIn delay={0.2}>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href={reservationLinks.square}>
                <Button size="lg">{heroCopy.primaryCta}</Button>
              </Link>
              <Link href="#concept">
                <Button size="lg" variant="secondary" className="border-white/70 text-white hover:bg-white/20">
                  {heroCopy.secondaryCta}
                </Button>
              </Link>
            </div>
          </AnimateIn>
        </div>
      </div>
      <div className="fixed inset-x-4 bottom-4 z-50 md:hidden">
        <div className="glass-card grid grid-cols-2 gap-2 p-2">
          <Link href={reservationLinks.line} target="_blank" rel="noopener noreferrer">
            <Button variant="secondary" className="w-full">LINE相談</Button>
          </Link>
          <Link href={reservationLinks.square}>
            <Button className="w-full">予約</Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
