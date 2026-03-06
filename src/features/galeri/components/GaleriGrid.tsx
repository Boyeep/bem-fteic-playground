"use client";

import { useEffect, useMemo, useState } from "react";
import { MoveUpRight } from "lucide-react";
import Link from "next/link";

import { GaleriItem, GaleriOrientation } from "@/features/galeri/types";

interface GaleriGridProps {
  items: GaleriItem[];
  orientation: GaleriOrientation;
}

type DetectedOrientation = Exclude<GaleriOrientation, "all">;

function detectOrientation(width: number, height: number): DetectedOrientation {
  if (width === height) return "square";
  return width > height ? "landscape" : "portrait";
}

export default function GaleriGrid({ items, orientation }: GaleriGridProps) {
  const [orientationById, setOrientationById] = useState<
    Record<string, DetectedOrientation>
  >({});

  useEffect(() => {
    items.forEach((item) => {
      if (orientationById[item.id]) return;

      const image = new window.Image();
      image.onload = () => {
        const nextOrientation = detectOrientation(
          image.naturalWidth,
          image.naturalHeight,
        );
        setOrientationById((previous) => {
          if (previous[item.id]) return previous;
          return { ...previous, [item.id]: nextOrientation };
        });
      };
      image.src = item.imageUrl;
    });
  }, [items, orientationById]);

  const visibleItems = useMemo(() => {
    if (orientation === "all") return items;
    return items.filter((item) => orientationById[item.id] === orientation);
  }, [items, orientation, orientationById]);

  return (
    <div className="mt-8 grid grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-3 lg:grid-cols-4">
      {visibleItems.map((item) => (
        <article key={item.id}>
          <div className="relative h-56 w-full overflow-hidden bg-white">
            <img
              src={item.imageUrl}
              alt={item.title}
              className="h-full w-full object-cover"
            />
          </div>
          <p className="mt-3 text-xs font-medium text-[#1D4ED8]">
            {new Date(item.takenAt).toLocaleDateString("en-US")}
          </p>
          <div className="mt-2 flex items-start justify-between gap-2">
            <h2 className="line-clamp-2 text-3xl font-medium leading-tight text-black">
              {item.title}
            </h2>
            <Link href={item.link} target="_blank" rel="noreferrer">
              <MoveUpRight size={17} className="mt-1 shrink-0 text-black" />
            </Link>
          </div>
        </article>
      ))}
    </div>
  );
}
