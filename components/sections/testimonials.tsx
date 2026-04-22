import { SectionShell } from "@/components/shared/section-shell";
import { AnimateIn } from "@/components/shared/animate-in";
import { testimonials } from "@/content/copy";

// LP理論: 異なる属性の声を並列提示すると「自分に近い事例」の発見率が上がる。
export function Testimonials() {
  return (
    <SectionShell id="testimonials" className="bg-rose-100/30">
      <AnimateIn>
        <p className="text-xs tracking-[0.2em] text-rose-700">TESTIMONIAL</p>
        <h2 className="mt-3 font-serif text-3xl md:text-4xl">お客様の声。</h2>
      </AnimateIn>
      <div className="mt-8 grid gap-5 md:grid-cols-3">
        {testimonials.map((item, index) => (
          <AnimateIn key={item.name} delay={0.08 * index}>
            <article className="glass-card h-full p-6">
              <p className="text-sm leading-relaxed text-foreground/80">“{item.text}”</p>
              <p className="mt-6 font-semibold text-rose-700">{item.name}</p>
              <p className="text-xs text-foreground/60">{item.profile}</p>
            </article>
          </AnimateIn>
        ))}
      </div>
    </SectionShell>
  );
}
