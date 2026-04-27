import { NextResponse } from "next/server";

import { BookingService, prioritizePrimaryService } from "@/lib/booking";
import { serialize, square } from "@/lib/square";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function toDurationMinutes(serviceDurationMs?: bigint | number | string): number {
  if (!serviceDurationMs) return 0;
  const raw = Number(serviceDurationMs);
  if (!Number.isFinite(raw) || raw <= 0) return 0;
  return Math.round(raw / 60000);
}

export async function GET() {
  try {
    const response = await square.catalog.searchItems({
      productTypes: ["APPOINTMENTS_SERVICE"],
      archivedState: "ARCHIVED_STATE_NOT_ARCHIVED"
    });

    const services: BookingService[] = [];
    for (const item of response.items ?? []) {
      if (item.type !== "ITEM") continue;
      const variations = (item as { itemData?: { variations?: Array<any> } }).itemData?.variations ?? [];
      for (const variation of variations) {
        const data = variation.itemVariationData;
        const priceYen = Number(data?.priceMoney?.amount ?? 0);
        services.push({
          id: variation.id ?? "",
          name: variation.itemVariationData?.name ?? variation.itemVariationData?.itemId ?? "未設定メニュー",
          durationMinutes: toDurationMinutes(data?.serviceDuration),
          priceYen: Number.isFinite(priceYen) ? priceYen : 0,
          version: variation.version ? String(variation.version) : undefined
        });
      }
    }

    const sorted = prioritizePrimaryService(services.filter((service) => service.id.length > 0));

    return NextResponse.json(
      serialize({ services: sorted }),
      {
        headers: {
          "Cache-Control": "public, s-maxage=300"
        }
      }
    );
  } catch (error) {
    console.error("[services] failed to fetch services", error);
    return NextResponse.json({ services: [] }, { status: 200 });
  }
}
