"use client";

import { firstTimeOffer } from "@/content/copy";

type RecommendedMenu = "small-face" | "herb-peeling" | "set";

interface FirstTimeOfferBoxProps {
  recommendedMenu: RecommendedMenu;
}

export function FirstTimeOfferBox({ recommendedMenu }: FirstTimeOfferBoxProps) {
  const isSet = recommendedMenu === "set";
  const regularPricing = recommendedMenu === "small-face" ? firstTimeOffer.pricing.smallFace : firstTimeOffer.pricing.herbPeeling;

  return (
    <section className="my-6 rounded-2xl border border-rose-200/40 bg-rose-50/40 p-5">
      <p className="text-sm text-rose-700">{firstTimeOffer.badge}</p>
      <p className="mt-2 text-base font-medium text-foreground/90">{firstTimeOffer.title}</p>

      {isSet ? (
        <p className="mt-2 text-lg font-semibold text-foreground/90">
          {firstTimeOffer.pricing.set.lead} {firstTimeOffer.pricing.set.to}
        </p>
      ) : (
        <p className="mt-2 flex items-baseline gap-2">
          <span className="text-sm text-stone-400 line-through">{regularPricing.from}</span>
          <span className="text-stone-500">→</span>
          <span className="text-xl font-semibold text-foreground/90">{regularPricing.to}</span>
        </p>
      )}

      {isSet && <p className="mt-2 text-xs leading-relaxed text-stone-500">{firstTimeOffer.setNote}</p>}
      <p className="mt-1 text-xs leading-relaxed text-stone-500">{firstTimeOffer.duration}</p>
    </section>
  );
}
