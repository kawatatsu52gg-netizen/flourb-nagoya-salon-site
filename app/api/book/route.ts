import { randomUUID } from "crypto";

import { NextResponse } from "next/server";
import { z } from "zod";

import { SQUARE_LOCATION_ID, serialize, square } from "@/lib/square";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const bookingSchema = z.object({
  serviceId: z.string().min(1),
  teamMemberId: z.string().min(1),
  startAt: z.string().datetime(),
  customer: z.object({
    givenName: z.string().min(1),
    familyName: z.string().min(1),
    emailAddress: z.string().email(),
    phoneNumber: z.string().min(8),
    note: z.string().optional()
  })
});

function normalizePhone(phone: string) {
  const trimmed = phone.replace(/[^\d+]/g, "");
  if (trimmed.startsWith("+")) return trimmed;
  if (trimmed.startsWith("0")) return `+81${trimmed.slice(1)}`;
  return `+81${trimmed}`;
}

async function resolveTeamMemberId(teamMemberId: string) {
  if (teamMemberId !== "any") return teamMemberId;
  const list = await square.bookings.teamMemberProfiles.list({
    locationId: SQUARE_LOCATION_ID,
    bookableOnly: true,
    limit: 50
  });
  const first = list.data.find((member) => member.teamMemberId);
  if (!first?.teamMemberId) throw new Error("No bookable team member found");
  return first.teamMemberId;
}

async function resolveServiceVersion(serviceId: string) {
  const object = await square.catalog.object.get({
    objectId: serviceId
  });
  if (!object.object?.version) return undefined;
  return BigInt(object.object.version.toString());
}

export async function POST(req: Request) {
  try {
    const body = bookingSchema.parse(await req.json());
    const phoneNumber = normalizePhone(body.customer.phoneNumber);

    const searchCustomers = await square.customers.search({
      query: {
        filter: {
          phoneNumber: {
            exact: phoneNumber
          }
        }
      },
      limit: BigInt(1)
    });

    let customerId = searchCustomers.customers?.[0]?.id;
    if (!customerId) {
      const created = await square.customers.create({
        givenName: body.customer.givenName,
        familyName: body.customer.familyName,
        emailAddress: body.customer.emailAddress,
        phoneNumber
      });
      customerId = created.customer?.id;
    }

    if (!customerId) {
      return NextResponse.json({ error: "customer_resolution_failed" }, { status: 422 });
    }

    const resolvedTeamMemberId = await resolveTeamMemberId(body.teamMemberId);
    const serviceVariationVersion = await resolveServiceVersion(body.serviceId);

    const booking = await square.bookings.create({
      idempotencyKey: randomUUID(),
      booking: {
        startAt: body.startAt,
        locationId: SQUARE_LOCATION_ID,
        customerId,
        customerNote: body.customer.note,
        appointmentSegments: [
          {
            serviceVariationId: body.serviceId,
            teamMemberId: resolvedTeamMemberId,
            anyTeamMember: body.teamMemberId === "any",
            serviceVariationVersion
          }
        ]
      }
    });

    return NextResponse.json(
      serialize({
        bookingId: booking.booking?.id,
        startAt: booking.booking?.startAt,
        status: booking.booking?.status
      })
    );
  } catch (error) {
    console.error("[book] booking create failed", error);
    const message = error instanceof Error ? error.message : "booking_failed";
    return NextResponse.json({ error: "booking_failed", message }, { status: 500 });
  }
}
