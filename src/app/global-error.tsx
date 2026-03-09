"use client";

import { useEffect } from "react";
import { AlertTriangle } from "lucide-react";

export default function GlobalError({
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
    <html>
      <body>
        <div className="flex min-h-screen w-screen flex-col items-center justify-center bg-slate-50 p-4 text-center">
          <div className="flex max-w-md flex-col items-center rounded-2xl bg-white p-8 shadow-xl ring-1 ring-slate-200">
            <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-red-100 text-red-500">
              <AlertTriangle size={40} />
            </div>
            <h2 className="mb-2 text-3xl font-bold text-slate-800">
              Critical Error
            </h2>
            <p className="mb-8 text-slate-600">
              A critical error occurred at the application root level.
            </p>
            <button
              onClick={() => reset()}
              className="rounded-lg bg-blue-600 px-6 py-3 font-medium text-white transition-colors hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300"
            >
              Try again
            </button>
          </div>
        </div>
      </body>
    </html>
  );
}
