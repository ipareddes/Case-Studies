"use client";

import { X } from "lucide-react";
import { useState } from "react";
import Link from "next/link";

export function TopBanner() {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="relative w-full bg-black text-white">
      <div className="mx-auto flex items-center justify-between gap-3 px-4 py-2.5 sm:px-6 lg:px-8">
        {/* Left side - Icon + Message + CTA */}
        <div className="flex items-center gap-2 text-sm min-w-0">
          <span className="shrink-0">🥳</span>
          <span className="hidden sm:inline truncate">
            <strong>Update:</strong> Simpler pricing with, 6 New Templates (Next.js & Astro), 50+ new Figma blocks, Figma plugin video tutorials.
          </span>
          <span className="sm:hidden font-semibold shrink-0">Update:</span>
          <Link
            href="#"
            className="shrink-0 inline-flex items-center gap-1.5 rounded-full border border-white/30 bg-transparent px-3 py-1 text-sm font-medium transition-colors hover:bg-white/10"
          >
            Visit changelog
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
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
        </div>

        {/* Close button */}
        <button
          onClick={() => setIsVisible(false)}
          className="shrink-0 rounded-md p-1 transition-colors hover:bg-white/10"
          aria-label="Close banner"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
