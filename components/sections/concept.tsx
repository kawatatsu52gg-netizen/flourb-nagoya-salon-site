import { SectionShell } from "@/components/shared/section-shell";
import { AnimateIn } from "@/components/shared/animate-in";
import { conceptCopy } from "@/content/copy";

// LP理論: 競合との違いは「思想→論理→独自手法」の順に提示すると納得転換が起こる。
export function Concept() {
  return (
    <SectionShell id="concept">
      <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr]">
        <AnimateIn>
          <p className="text-xs tracking-[0.2em] text-rose-700">THE TURNING POINT</p>
          <h2 className="mt-3 font-serif text-3xl leading-tight md:text-4xl">{conceptCopy.heading}</h2>
          <div className="copy-prose mt-7 space-y-5">
            {conceptCopy.body.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </AnimateIn>
        <AnimateIn delay={0.1}>
          <div className="glass-card p-7">
            <p className="text-xs tracking-[0.18em] text-rose-700">STRUCTURE MAP</p>
            <div className="mt-5 space-y-4 text-sm">
              <div className="rounded-xl border border-rose-300/40 bg-rose-100/50 p-4">
                <p className="font-semibold">Layer 1｜肌</p>
                <p className="mt-1 text-foreground/70">ターンオーバーとバリア機能の再設計</p>
              </div>
              <div className="rounded-xl border border-rose-300/40 bg-rose-100/50 p-4">
                <p className="font-semibold">Layer 2｜筋膜・循環</p>
                <p className="mt-1 text-foreground/70">むくみと緊張の滞留を解放</p>
              </div>
              <div className="rounded-xl border border-rose-300/40 bg-rose-100/50 p-4">
                <p className="font-semibold">Layer 3｜骨格・神経</p>
                <p className="mt-1 text-foreground/70">輪郭の土台を安定させる</p>
              </div>
            </div>
          </div>
        </AnimateIn>
      </div>
    </SectionShell>
  );
}
