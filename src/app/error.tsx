"use client";

import { useEffect } from "react";
import { AlertTriangle } from "lucide-react";

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-[400px] w-full flex-col items-center justify-center p-4 text-center">
      <div className="flex max-w-md flex-col items-center rounded-2xl bg-white p-8 shadow-sm ring-1 ring-slate-200">
        <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-red-100 text-red-500">
          <AlertTriangle size={32} />
        </div>
        <h2 className="mb-2 text-2xl font-bold text-slate-800">
          Something went wrong!
        </h2>
        <p className="mb-6 text-slate-600">
          A rendering error occurred in this section of the application.
        </p>
        <button
          onClick={
            // Attempt to recover by trying to re-render the segment
            () => reset()
          }
          className="rounded-lg bg-blue-600 px-6 py-2.5 font-medium text-white transition-colors hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300"
        >
          Try again
        </button>
      </div>
    </div>
  );
}
