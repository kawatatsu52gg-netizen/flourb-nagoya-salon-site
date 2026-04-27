import { addDays, setHours, setMinutes } from "date-fns";
import { NextRequest, NextResponse } from "next/server";

import { getDateRange, recommendSlots, toSlot, type Slot } from "@/lib/booking";
import { SQUARE_LOCATION_ID, USE_MOCK_DATA, serialize, square } from "@/lib/square";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function createMockSlots(teamMemberId = "any"): Slot[] {
  const now = new Date();
  const dayOffsets = [1, 2, 5, 7];
  const hours = [10, 14, 16];
  const slots: Slot[] = [];
  for (const offset of dayOffsets) {
    for (const hour of hours) {
      const date = setMinutes(setHours(addDays(now, offset), hour), 0);
      slots.push(
        toSlot({
          startAt: date.toISOString(),
          teamMemberId: teamMemberId === "any" ? "auto" : teamMemberId,
          teamMemberName: teamMemberId === "any" ? "指名なし（おまかせ）" : "ご指名スタッフ"
        })
      );
    }
  }
  return slots;
}

export async function GET(req: NextRequest) {
  const serviceId = req.nextUrl.searchParams.get("serviceId");
  const teamMemberId = req.nextUrl.searchParams.get("teamMemberId");

  if (!serviceId) {
    return NextResponse.json({ error: "serviceId is required" }, { status: 400 });
  }

  try {
    const { startAt, endAt } = getDateRange(14);
    const teamMembersPage = await square.bookings.teamMemberProfiles.list({
      locationId: SQUARE_LOCATION_ID,
      bookableOnly: true,
      limit: 50
    });
    const teamMembers = new Map(teamMembersPage.data.map((m) => [m.teamMemberId ?? "", m.displayName ?? "スタッフ"]));

    const segmentFilter: {
      serviceVariationId: string;
      teamMemberIdFilter?: {
        any: string[];
      };
    } = {
      serviceVariationId: serviceId
    };

    if (teamMemberId && teamMemberId !== "any") {
      segmentFilter.teamMemberIdFilter = {
        any: [teamMemberId]
      };
    }

    const availability = await square.bookings.searchAvailability({
      query: {
        filter: {
          startAtRange: { startAt, endAt },
          locationId: SQUARE_LOCATION_ID,
          segmentFilters: [segmentFilter]
        }
      }
    });

    let slots = (availability.availabilities ?? [])
      .map((a) => {
        const segment = a.appointmentSegments?.[0];
        const memberId = segment?.teamMemberId ?? teamMemberId ?? "any";
        return toSlot({
          startAt: a.startAt ?? "",
          teamMemberId: memberId,
          teamMemberName: teamMembers.get(memberId) ?? "指名なし（おまかせ）"
        });
      })
      .filter((slot) => slot.startAt.length > 0);

    if (slots.length === 0 && USE_MOCK_DATA) {
      slots = createMockSlots(teamMemberId ?? "any");
    }

    return NextResponse.json(serialize(recommendSlots(slots)));
  } catch (error) {
    console.error("[recommended-slots] failed", error);
    if (USE_MOCK_DATA) {
      return NextResponse.json(serialize(recommendSlots(createMockSlots(teamMemberId ?? "any"))));
    }
    return NextResponse.json({ recommendations: [], totalAvailableDays: 0 }, { status: 200 });
  }
}
