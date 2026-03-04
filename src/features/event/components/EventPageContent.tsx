"use client";

import { useState } from "react";

import EventCardGrid from "@/features/event/components/EventCardGrid";
import EventFilters from "@/features/event/components/EventFilters";
import EventHeader from "@/features/event/components/EventHeader";
import EventPagination from "@/features/event/components/EventPagination";
import { useEvents } from "@/features/event/hooks/useEvents";

export default function EventPageContent() {
  const [page, setPage] = useState(1);
  const { data, isPending, isError, error } = useEvents({ page, limit: 10 });

  return (
    <main className="min-h-screen bg-[#F3F3F3] px-6 py-16">
      <section className="mx-auto w-full max-w-6xl">
        <EventHeader />
        <EventFilters />
        {isPending ? (
          <div className="mt-8 grid grid-cols-1 gap-x-10 gap-y-5 md:grid-cols-2">
            {Array.from({ length: 6 }).map((_, idx) => (
              <article
                key={`event-skeleton-${idx}`}
                className="grid grid-cols-[180px_1fr] gap-4"
              >
                <div className="h-48 w-full animate-pulse bg-slate-200" />
                <div>
                  <div className="h-4 w-24 animate-pulse bg-slate-200" />
                  <div className="mt-3 h-10 w-4/5 animate-pulse bg-slate-200" />
                  <div className="mt-3 h-5 w-full animate-pulse bg-slate-200" />
                  <div className="mt-2 h-5 w-3/4 animate-pulse bg-slate-200" />
                </div>
              </article>
            ))}
          </div>
        ) : null}
        {isError ? (
          <p className="mt-8 text-sm text-red-600">{error.message}</p>
        ) : null}
        {!isPending && !isError ? (
          <EventCardGrid items={data?.items || []} />
        ) : null}
        {data ? (
          <EventPagination
            currentPage={data.pagination.page}
            totalPages={data.pagination.totalPages}
            onPageChange={(nextPage) => setPage(nextPage)}
          />
        ) : null}
      </section>
    </main>
  );
}
