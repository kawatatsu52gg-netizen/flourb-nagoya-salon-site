import { SectionShell } from "@/components/shared/section-shell";
import { faqItems } from "@/content/copy";

// LP理論: 購入直前の疑問解消はCVR改善に直結するため、FAQはCTA直前に配置する。
export function Faq() {
  return (
    <SectionShell id="faq" className="bg-rose-100/30">
      <p className="text-xs tracking-[0.2em] text-rose-700">FAQ</p>
      <h2 className="mt-3 font-serif text-3xl md:text-4xl">よくあるご質問。</h2>
      <div className="mt-8 space-y-3">
        {faqItems.map((item) => (
          <details key={item.q} className="glass-card group p-5 open:border-rose-500">
            <summary className="cursor-pointer list-none pr-6 font-medium text-foreground marker:hidden">
              <span className="inline-block">{item.q}</span>
            </summary>
            <p className="mt-3 text-sm leading-relaxed text-foreground/75">{item.a}</p>
          </details>
        ))}
      </div>
    </SectionShell>
  );
}
