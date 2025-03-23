"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Error({
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
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col items-center justify-center text-center p-4">
      <div className="max-w-md mx-auto">
        <h1 className="text-4xl font-bold mb-4">Something went wrong!</h1>
        <p className="text-gray-600 dark:text-gray-400 mb-8">
          We&apos;re sorry, but there was an error loading this page.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            variant="default"
            className="bg-amber-600 hover:bg-amber-700"
            onClick={() => reset()}
          >
            Try again
          </Button>
          <Button asChild variant="outline">
            <Link href="/recipes">Browse All Recipes</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
