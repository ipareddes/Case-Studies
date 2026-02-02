"use client";

import { X } from "lucide-react";
import { useState } from "react";
import Link from "next/link";

export function TopBanner() {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="relative w-full bg-black text-white">
      <div className="mx-auto flex items-center justify-between gap-4 px-4 py-2 sm:px-6 lg:px-8">
        {/* Left side - Icon + Message */}
        <div className="flex items-center gap-2 text-sm">
          <span className="text-yellow-500">✨</span>
          <span className="hidden sm:inline">
            <strong>Update:</strong> Simpler pricing with, 6 New Templates (Next.js & Astro), 50+ new Figma blocks, Figma plugin video tutorials.
          </span>
          <span className="sm:hidden">
            <strong>Update:</strong> 6 New Templates, 50+ Figma blocks
          </span>
        </div>

        {/* Right side - CTA + Close */}
        <div className="flex items-center gap-2">
          <Link
            href="#"
            className="flex items-center gap-2 rounded-md bg-white/10 px-3 py-1.5 text-sm font-medium transition-colors hover:bg-white/20"
          >
            Visit changelog
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
          </Link>
          <button
            onClick={() => setIsVisible(false)}
            className="rounded-md p-1 transition-colors hover:bg-white/10"
            aria-label="Close banner"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
