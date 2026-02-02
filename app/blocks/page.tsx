"use client";

import Link from "next/link";
import { TopBanner } from "@/components/layout/top-banner";
import { SiteNavigation } from "@/components/layout/site-navigation";

interface Block {
  id: string;
  title: string;
  description: string;
  category: string;
  preview: string;
}

const blocks: Block[] = [
  {
    id: "features-section",
    title: "Features Sections",
    description:
      "A collection of features section variants designed to showcase product features, services, or capabilities. Includes bento grids, card layouts, and more.",
    category: "Marketing",
    preview: "/blocks/features-section",
  },
];

export default function BlocksPage() {
  return (
    <>
      <TopBanner />
      <SiteNavigation />

      <div className="min-h-screen bg-background">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold tracking-tight mb-4">
            Block Library
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl">
            A collection of beautiful, reusable blocks built with Next.js and
            Tailwind CSS. Copy the code and customize to your needs.
          </p>
        </div>

        {/* Blocks Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {blocks.map((block) => (
            <Link
              key={block.id}
              href={block.preview}
              className="group relative overflow-hidden rounded-xl border bg-card transition-all hover:shadow-lg"
            >
              {/* Preview Image Placeholder */}
              <div className="aspect-video w-full bg-muted/50 flex items-center justify-center border-b">
                <div className="text-muted-foreground text-sm">
                  Preview Available
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                {/* Category Badge */}
                <div className="mb-3 inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold">
                  {block.category}
                </div>

                <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                  {block.title}
                </h3>

                <p className="text-sm text-muted-foreground">
                  {block.description}
                </p>

                {/* Hover indicator */}
                <div className="mt-4 flex items-center gap-2 text-sm font-medium text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                  View block
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
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Empty State for Future Blocks */}
        {blocks.length === 1 && (
          <div className="mt-12 rounded-xl border border-dashed p-12 text-center">
            <p className="text-muted-foreground">
              More blocks coming soon! This library will grow with additional
              components.
            </p>
          </div>
        )}
      </div>
    </div>
    </>
  );
}
