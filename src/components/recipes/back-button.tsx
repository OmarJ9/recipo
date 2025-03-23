"use client";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function BackButton({
  title,
  href,
}: {
  title: string;
  href?: string;
}) {
  const router = useRouter();
  return (
    <div className="mb-8">
      <button
        className="flex items-center w-fit hover:text-amber-600 cursor-pointer"
        onClick={() => {
          if (href) {
            router.push(href);
          } else {
            router.back();
          }
        }}
      >
        <ArrowLeft className="h-4 w-4 mr-1" />
        <span className="text-sm font-medium">Back to {title}</span>
      </button>
    </div>
  );
}
