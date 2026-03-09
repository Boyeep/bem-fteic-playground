import { Metadata } from "next";
import Link from "next/link";
import { AlertTriangle } from "lucide-react";

export const metadata: Metadata = {
  title: "Error - Something went wrong",
};

export default function ErrorPage() {
  return (
    <main className="flex min-h-screen w-screen flex-col items-center justify-center bg-slate-50 p-4 text-center">
      <div className="flex max-w-md flex-col items-center rounded-2xl bg-white p-8 shadow-xl">
        <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-red-100 text-red-500">
          <AlertTriangle size={40} />
        </div>
        <h1 className="mb-2 text-3xl font-bold text-slate-800">
          Oops! Something went wrong.
        </h1>
        <p className="mb-8 text-slate-600">
          We encountered an unexpected error while processing your request.
          Please try again later or contact support if the problem persists.
        </p>
        <Link
          href="/"
          className="rounded-lg bg-blue-600 px-6 py-3 font-medium text-white transition-colors hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300"
        >
          Return to Home
        </Link>
      </div>
    </main>
  );
}
