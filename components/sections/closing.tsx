import Link from "next/link";
import Image from "next/image";

import { SectionShell } from "@/components/shared/section-shell";
import { AnimateIn } from "@/components/shared/animate-in";
import { Button } from "@/components/ui/button";
import { closingCopy, profileCopy, reservationLinks, topTherapistCopy } from "@/content/copy";

// LP理論: 終盤は未来想起コピーと予約手順の可視化を組み合わせると最後の離脱を抑制できる。
export function Closing() {
  return (
    <SectionShell id="reserve">
      <AnimateIn>
        <div className="rounded-3xl bg-rose-700 px-6 py-12 text-white md:px-10">
          <p className="text-xs tracking-[0.2em] text-gold-300">FINAL INVITATION</p>
          <h2 className="mt-3 font-serif text-3xl leading-tight md:text-5xl">{closingCopy.heading}</h2>
          <p className="mt-5 max-w-3xl text-sm leading-relaxed text-white/90 md:text-base">{closingCopy.body}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href={reservationLinks.square}>
              <Button size="lg" className="bg-white text-rose-700 hover:bg-rose-100">初回カウンセリングを予約する</Button>
            </Link>
            <Link href={reservationLinks.line} target="_blank" rel="noopener noreferrer">
              <Button size="lg" variant="secondary" className="border-white text-white hover:bg-white/15">LINEで相談</Button>
            </Link>
          </div>
          <div className="mt-10 grid gap-3 text-sm md:grid-cols-3">
            <p>1. 予約リンクから日時選択</p>
            <p>2. カウンセリング（約15分）</p>
            <p>3. 施術開始（所要45〜90分）</p>
          </div>
        </div>
      </AnimateIn>
      <AnimateIn delay={0.1}>
        <div className="mt-8 rounded-2xl border border-rose-300/40 bg-white p-6">
          <p className="text-xs tracking-[0.2em] text-rose-700">PROFILE</p>
          <div className="mt-5 grid gap-8 md:grid-cols-2">
            <article>
              <div className="relative h-[360px] overflow-hidden rounded-2xl bg-rose-100/20 md:h-[420px] lg:h-[520px]">
                <Image src={profileCopy.image} alt={profileCopy.imageAlt} fill className="object-cover object-top" sizes="(max-width: 768px) 100vw, 50vw" />
              </div>
              <h3 className="mt-6 font-serif text-2xl font-medium tracking-[0.12em] text-gold-600 md:text-3xl">{profileCopy.nameEn}</h3>
              <p className="mt-1 text-sm text-foreground/55">{profileCopy.nameJa}</p>
              <p className="mt-2 text-sm font-medium text-foreground/70">{profileCopy.role}</p>
              <p className="mt-1 text-sm font-medium text-rose-800/90">{profileCopy.credential}</p>
              <p className="mt-5 whitespace-pre-line text-sm leading-[1.8] text-foreground/80">{profileCopy.bio}</p>
            </article>
            <article>
              <div className="relative h-[360px] overflow-hidden rounded-2xl bg-rose-100/20 md:h-[420px] lg:h-[520px]">
                <Image src={topTherapistCopy.image} alt={topTherapistCopy.imageAlt} fill className="object-cover object-top" sizes="(max-width: 768px) 100vw, 50vw" />
              </div>
              <h3 className="mt-6 font-serif text-2xl font-medium tracking-[0.12em] text-gold-600 md:text-3xl">{topTherapistCopy.nameEn}</h3>
              <p className="mt-1 text-sm text-foreground/55">{topTherapistCopy.nameJa}</p>
              <p className="mt-2 text-sm font-medium text-foreground/70">{topTherapistCopy.role}</p>
              <p className="mt-5 whitespace-pre-line text-sm leading-[1.8] text-foreground/80">{topTherapistCopy.bio}</p>
            </article>
          </div>
        </div>
      </AnimateIn>
    </SectionShell>
  );
}
