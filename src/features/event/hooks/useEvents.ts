"use client";

import { keepPreviousData, useQuery } from "@tanstack/react-query";

import { getEvents } from "@/features/event/api/get-events";

interface UseEventsOptions {
  page: number;
  limit?: number;
  startDate?: string;
  endDate?: string;
}

export function useEvents({
  page,
  limit = 8,
  startDate,
  endDate,
}: UseEventsOptions) {
  return useQuery({
    queryKey: ["events", page, limit, startDate, endDate],
    queryFn: () => getEvents({ page, limit, startDate, endDate }),
    placeholderData: keepPreviousData,
    staleTime: 1000 * 60,
  });
}
