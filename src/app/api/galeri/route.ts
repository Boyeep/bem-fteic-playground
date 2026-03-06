import { NextRequest, NextResponse } from "next/server";

import { galeriService } from "@/features/galeri/services/galeriService";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const page = Number(searchParams.get("page") ?? "1");
    const limit = Number(searchParams.get("limit") ?? "12");
    const sortBy = searchParams.get("sortBy") ?? undefined;

    const response = await galeriService.getPublicGaleri(page, limit, {
      sortBy:
        sortBy === "oldest" ||
        sortBy === "title_asc" ||
        sortBy === "title_desc" ||
        sortBy === "latest"
          ? sortBy
          : undefined,
    });
    return NextResponse.json(response);
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unable to fetch galeri.";
    return NextResponse.json({ message }, { status: 500 });
  }
}
