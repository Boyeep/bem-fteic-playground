import { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";
import { GaleriSortBy } from "@/features/galeri/types";

interface GaleriFiltersProps {
  onSortChange: (sortBy: GaleriSortBy) => void;
}

export default function GaleriFilters({ onSortChange }: GaleriFiltersProps) {
  const [sortBy, setSortBy] = useState<GaleriSortBy>("latest");

  useEffect(() => {
    onSortChange(sortBy);
  }, [sortBy, onSortChange]);

  return (
    <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
      <div className="flex flex-col gap-3 sm:gap-2 md:flex-row md:items-center md:gap-3">
        <span className="text-xs font-semibold uppercase text-black/70">
          FILTER BY
        </span>
        <div className="flex w-full flex-col gap-3 sm:flex-row sm:gap-2 md:w-auto md:gap-3">
          <button
            type="button"
            className="flex w-full items-center justify-between border border-black/15 bg-white px-4 py-2 text-sm text-black sm:min-w-44 md:w-auto"
          >
            Department
            <ChevronDown size={16} />
          </button>
          <button
            type="button"
            className="flex w-full items-center justify-between border border-black/15 bg-white px-4 py-2 text-sm text-black sm:min-w-36 md:w-auto"
          >
            Orientation
            <ChevronDown size={16} />
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-3 sm:gap-2 md:flex-row md:items-center md:gap-3">
        <span className="text-xs font-semibold uppercase text-black/70">
          SORT BY
        </span>
        <label className="relative inline-flex w-full sm:max-w-[280px] md:w-auto">
          <select
            value={sortBy}
            onChange={(event) => setSortBy(event.target.value as GaleriSortBy)}
            className="w-full appearance-none border border-black/15 bg-white px-4 py-2 pr-9 text-sm text-black sm:min-w-[260px] md:w-auto"
          >
            <option value="latest">Latest</option>
            <option value="oldest">Oldest</option>
            <option value="title_asc">Alphabetical (A-Z)</option>
            <option value="title_desc">Alphabetical (Z-A)</option>
          </select>
          <ChevronDown
            size={16}
            className="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2"
          />
        </label>
      </div>
    </div>
  );
}
