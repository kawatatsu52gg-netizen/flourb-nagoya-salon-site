import { NextRequest, NextResponse } from "next/server";

import { SQUARE_LOCATION_ID, serialize, square } from "@/lib/square";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const _serviceId = req.nextUrl.searchParams.get("serviceId");

  try {
    const list = await square.bookings.teamMemberProfiles.list({
      bookableOnly: true,
      locationId: SQUARE_LOCATION_ID,
      limit: 50
    });

    const teamMembers = list.data
      .filter((member) => member.teamMemberId)
      .map((member) => ({
        id: member.teamMemberId!,
        displayName: member.displayName ?? "スタッフ",
        isBookable: member.isBookable ?? false
      }))
      .sort((a, b) => a.displayName.localeCompare(b.displayName, "ja"));

    return NextResponse.json(serialize({ teamMembers }));
  } catch (error) {
    console.error("[team-members] failed to fetch team members", error);
    return NextResponse.json({ teamMembers: [] }, { status: 200 });
  }
}
