"use client";

import { keepPreviousData, useQuery } from "@tanstack/react-query";

import { getGaleri } from "@/features/galeri/api/get-galeri";
import { GaleriSortBy } from "@/features/galeri/types";

interface UseGaleriOptions {
  page: number;
  limit?: number;
  sortBy?: GaleriSortBy;
}

export function useGaleri({
  page,
  limit = 12,
  sortBy = "latest",
}: UseGaleriOptions) {
  return useQuery({
    queryKey: ["galeri", page, limit, sortBy],
    queryFn: () => getGaleri({ page, limit, sortBy }),
    placeholderData: keepPreviousData,
    staleTime: 1000 * 60,
  });
}
