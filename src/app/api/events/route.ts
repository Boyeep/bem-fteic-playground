import { NextRequest, NextResponse } from "next/server";

import { eventService } from "@/features/event/services/eventService";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const page = Number(searchParams.get("page") ?? "1");
    const limit = Number(searchParams.get("limit") ?? "8");
    const startDate = searchParams.get("startDate") ?? undefined;
    const endDate = searchParams.get("endDate") ?? undefined;

    const response = await eventService.getPublicEvents(page, limit, {
      startDate,
      endDate,
    });
    return NextResponse.json(response);
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unable to fetch events.";
    return NextResponse.json({ message }, { status: 500 });
  }
}
