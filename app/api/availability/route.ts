import { addDays, setHours, setMinutes } from "date-fns";
import { NextRequest, NextResponse } from "next/server";

import { getDateRange, toSlot, type Slot } from "@/lib/booking";
import { SQUARE_LOCATION_ID, USE_MOCK_DATA, serialize, square } from "@/lib/square";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function createMockSlots(teamMemberId = "any"): Slot[] {
  const now = new Date();
  const baseDays = [1, 3, 6];
  const mockHours = [10, 14];
  const slots: Slot[] = [];

  for (const dayOffset of baseDays) {
    for (const hour of mockHours) {
      const date = setMinutes(setHours(addDays(now, dayOffset), hour), 0);
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
  const days = Number(req.nextUrl.searchParams.get("days") ?? "14");

  if (!serviceId) {
    return NextResponse.json({ error: "serviceId is required" }, { status: 400 });
  }

  try {
    const { startAt, endAt } = getDateRange(days);

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

    const response = await square.bookings.searchAvailability({
      query: {
        filter: {
          startAtRange: {
            startAt,
            endAt
          },
          locationId: SQUARE_LOCATION_ID,
          segmentFilters: [segmentFilter]
        }
      }
    });

    const slots = (response.availabilities ?? [])
      .map((availability) => {
        const segment = availability.appointmentSegments?.[0];
        const memberId = segment?.teamMemberId ?? teamMemberId ?? "any";
        return toSlot({
          startAt: availability.startAt ?? "",
          teamMemberId: memberId,
          teamMemberName: teamMembers.get(memberId) ?? "指名なし（おまかせ）"
        });
      })
      .filter((slot) => slot.startAt.length > 0);

    if (slots.length === 0 && USE_MOCK_DATA) {
      return NextResponse.json(serialize({ slots: createMockSlots(teamMemberId ?? "any") }));
    }

    return NextResponse.json(serialize({ slots }));
  } catch (error) {
    console.error("[availability] failed", error);
    if (USE_MOCK_DATA) {
      return NextResponse.json(serialize({ slots: createMockSlots(teamMemberId ?? "any") }), { status: 200 });
    }
    return NextResponse.json({ slots: [] }, { status: 200 });
  }
}
