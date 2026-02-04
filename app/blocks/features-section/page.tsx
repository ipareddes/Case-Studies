"use client";

import Link from "next/link";
import { ComponentLayout } from "@/components/layout/component-layout";

interface FeatureSectionVariant {
  id: string;
  title: string;
  description: string;
  preview: string;
}

function VariantIllustration({ variantId }: { variantId: string }) {
  const fg = "hsl(var(--card-foreground))";
  const card = "hsl(var(--card))";
  const primary = "hsl(var(--primary))";
  const muted = "hsl(var(--muted-foreground))";

  switch (variantId) {
    // Bento grid: 1st and 4th cards span 2 rows, asymmetric layout
    case "features-section-1":
      return (
        <svg width="280" height="160" viewBox="0 0 280 160" fill="none" className="transition-all duration-300 group-hover:scale-105">
          {/* Row of cards — bento asymmetric: tall-left, 2 small right */}
          {/* Tall card left (spans 2 rows) */}
          <rect x="10" y="10" width="86" height="140" rx="6" fill={card} stroke={muted} strokeOpacity="0.2" />
          <circle cx="53" cy="40" r="10" fill={primary} fillOpacity="0.2" />
          <rect x="28" y="58" width="50" height="5" rx="2.5" fill={fg} fillOpacity="0.3" />
          <rect x="22" y="68" width="62" height="4" rx="2" fill={fg} fillOpacity="0.12" />
          <rect x="26" y="76" width="54" height="4" rx="2" fill={fg} fillOpacity="0.12" />

          {/* Top-right card */}
          <rect x="102" y="10" width="82" height="66" rx="6" fill={card} stroke={muted} strokeOpacity="0.2" />
          <circle cx="143" cy="30" r="8" fill={primary} fillOpacity="0.2" />
          <rect x="120" y="44" width="46" height="4" rx="2" fill={fg} fillOpacity="0.3" />
          <rect x="116" y="52" width="54" height="3" rx="1.5" fill={fg} fillOpacity="0.12" />
          <rect x="118" y="59" width="50" height="3" rx="1.5" fill={fg} fillOpacity="0.12" />

          {/* Bottom-right card */}
          <rect x="102" y="82" width="82" height="68" rx="6" fill={card} stroke={muted} strokeOpacity="0.2" />
          <circle cx="143" cy="102" r="8" fill={primary} fillOpacity="0.2" />
          <rect x="120" y="116" width="46" height="4" rx="2" fill={fg} fillOpacity="0.3" />
          <rect x="118" y="124" width="50" height="3" rx="1.5" fill={fg} fillOpacity="0.12" />

          {/* Tall card right (spans 2 rows) */}
          <rect x="190" y="10" width="80" height="140" rx="6" fill={card} stroke={muted} strokeOpacity="0.2" />
          <circle cx="230" cy="40" r="10" fill={primary} fillOpacity="0.2" />
          <rect x="207" y="58" width="46" height="5" rx="2.5" fill={fg} fillOpacity="0.3" />
          <rect x="201" y="68" width="58" height="4" rx="2" fill={fg} fillOpacity="0.12" />
          <rect x="205" y="76" width="50" height="4" rx="2" fill={fg} fillOpacity="0.12" />
        </svg>
      );

    // 3-column grid with SVG graphics, charts, icons — centered header with CTA
    case "features-section-2":
      return (
        <svg width="280" height="160" viewBox="0 0 280 160" fill="none" className="transition-all duration-300 group-hover:scale-105">
          {/* Centered header */}
          <rect x="90" y="8" width="100" height="6" rx="3" fill={fg} fillOpacity="0.35" />
          <rect x="105" y="18" width="70" height="4" rx="2" fill={fg} fillOpacity="0.12" />
          {/* CTA buttons */}
          <rect x="100" y="28" width="36" height="10" rx="5" fill={primary} />
          <rect x="142" y="28" width="36" height="10" rx="5" fill={card} stroke={muted} strokeOpacity="0.3" />

          {/* 3 feature cards */}
          <rect x="10" y="46" width="82" height="104" rx="6" fill={card} stroke={muted} strokeOpacity="0.2" />
          <rect x="99" y="46" width="82" height="104" rx="6" fill={card} stroke={muted} strokeOpacity="0.2" />
          <rect x="188" y="46" width="82" height="104" rx="6" fill={card} stroke={muted} strokeOpacity="0.2" />

          {/* Card 1: chart graphic */}
          <rect x="18" y="54" width="66" height="40" rx="4" fill={fg} fillOpacity="0.04" />
          <rect x="26" y="78" width="8" height="12" rx="2" fill={primary} fillOpacity="0.3" />
          <rect x="38" y="72" width="8" height="18" rx="2" fill={primary} fillOpacity="0.4" />
          <rect x="50" y="66" width="8" height="24" rx="2" fill={primary} fillOpacity="0.5" />
          <rect x="62" y="60" width="8" height="30" rx="2" fill={primary} fillOpacity="0.3" />
          <rect x="22" y="102" width="48" height="4" rx="2" fill={fg} fillOpacity="0.3" />
          <rect x="22" y="110" width="58" height="3" rx="1.5" fill={fg} fillOpacity="0.12" />
          <rect x="22" y="117" width="50" height="3" rx="1.5" fill={fg} fillOpacity="0.12" />

          {/* Card 2: network diagram */}
          <rect x="107" y="54" width="66" height="40" rx="4" fill={fg} fillOpacity="0.04" />
          <circle cx="125" cy="68" r="5" fill={primary} fillOpacity="0.3" />
          <circle cx="155" cy="68" r="5" fill={primary} fillOpacity="0.3" />
          <circle cx="140" cy="82" r="5" fill={primary} fillOpacity="0.4" />
          <line x1="130" y1="68" x2="150" y2="68" stroke={primary} strokeOpacity="0.3" strokeWidth="1" />
          <line x1="125" y1="73" x2="140" y2="77" stroke={primary} strokeOpacity="0.3" strokeWidth="1" />
          <line x1="155" y1="73" x2="140" y2="77" stroke={primary} strokeOpacity="0.3" strokeWidth="1" />
          <rect x="111" y="102" width="48" height="4" rx="2" fill={fg} fillOpacity="0.3" />
          <rect x="111" y="110" width="58" height="3" rx="1.5" fill={fg} fillOpacity="0.12" />
          <rect x="111" y="117" width="50" height="3" rx="1.5" fill={fg} fillOpacity="0.12" />

          {/* Card 3: icon grid */}
          <rect x="196" y="54" width="66" height="40" rx="4" fill={fg} fillOpacity="0.04" />
          <rect x="204" y="60" width="10" height="10" rx="2" fill={primary} fillOpacity="0.2" />
          <rect x="218" y="60" width="10" height="10" rx="2" fill={primary} fillOpacity="0.2" />
          <rect x="232" y="60" width="10" height="10" rx="2" fill={primary} fillOpacity="0.2" />
          <rect x="246" y="60" width="10" height="10" rx="2" fill={primary} fillOpacity="0.2" />
          <rect x="204" y="74" width="10" height="10" rx="2" fill={primary} fillOpacity="0.2" />
          <rect x="218" y="74" width="10" height="10" rx="2" fill={primary} fillOpacity="0.2" />
          <rect x="232" y="74" width="10" height="10" rx="2" fill={primary} fillOpacity="0.2" />
          <rect x="246" y="74" width="10" height="10" rx="2" fill={primary} fillOpacity="0.2" />
          <rect x="200" y="102" width="48" height="4" rx="2" fill={fg} fillOpacity="0.3" />
          <rect x="200" y="110" width="58" height="3" rx="1.5" fill={fg} fillOpacity="0.12" />
          <rect x="200" y="117" width="50" height="3" rx="1.5" fill={fg} fillOpacity="0.12" />
        </svg>
      );

    // 2-column split: feature steps left, visual states right with transitions
    case "features-section-3":
      return (
        <svg width="280" height="160" viewBox="0 0 280 160" fill="none" className="transition-all duration-300 group-hover:scale-105">
          {/* Left column: feature steps */}
          <rect x="10" y="10" width="120" height="140" rx="6" fill={card} stroke={muted} strokeOpacity="0.15" />

          {/* Step 1 (active) */}
          <rect x="18" y="18" width="104" height="36" rx="5" fill={primary} fillOpacity="0.08" stroke={primary} strokeOpacity="0.3" />
          <circle cx="32" cy="36" r="6" fill={primary} fillOpacity="0.4" />
          <rect x="44" y="28" width="50" height="5" rx="2.5" fill={fg} fillOpacity="0.35" />
          <rect x="44" y="37" width="68" height="3" rx="1.5" fill={fg} fillOpacity="0.12" />
          <rect x="44" y="44" width="56" height="3" rx="1.5" fill={fg} fillOpacity="0.12" />

          {/* Step 2 */}
          <rect x="18" y="60" width="104" height="36" rx="5" fill="transparent" />
          <circle cx="32" cy="78" r="6" fill={fg} fillOpacity="0.1" />
          <rect x="44" y="70" width="50" height="5" rx="2.5" fill={fg} fillOpacity="0.2" />
          <rect x="44" y="79" width="62" height="3" rx="1.5" fill={fg} fillOpacity="0.08" />
          <rect x="44" y="86" width="50" height="3" rx="1.5" fill={fg} fillOpacity="0.08" />

          {/* Step 3 */}
          <rect x="18" y="102" width="104" height="36" rx="5" fill="transparent" />
          <circle cx="32" cy="120" r="6" fill={fg} fillOpacity="0.1" />
          <rect x="44" y="112" width="50" height="5" rx="2.5" fill={fg} fillOpacity="0.2" />
          <rect x="44" y="121" width="58" height="3" rx="1.5" fill={fg} fillOpacity="0.08" />
          <rect x="44" y="128" width="46" height="3" rx="1.5" fill={fg} fillOpacity="0.08" />

          {/* Right column: visual state preview */}
          <rect x="140" y="10" width="130" height="140" rx="6" fill={card} stroke={muted} strokeOpacity="0.2" />
          {/* Dashboard mockup */}
          <rect x="150" y="22" width="110" height="14" rx="3" fill={fg} fillOpacity="0.06" />
          <rect x="156" y="26" width="20" height="6" rx="2" fill={fg} fillOpacity="0.15" />
          <rect x="150" y="42" width="52" height="50" rx="4" fill={primary} fillOpacity="0.06" stroke={primary} strokeOpacity="0.15" />
          <rect x="208" y="42" width="52" height="50" rx="4" fill={fg} fillOpacity="0.04" stroke={muted} strokeOpacity="0.1" />
          {/* Chart in left panel */}
          <rect x="158" y="54" width="6" height="20" rx="2" fill={primary} fillOpacity="0.3" />
          <rect x="168" y="48" width="6" height="26" rx="2" fill={primary} fillOpacity="0.4" />
          <rect x="178" y="58" width="6" height="16" rx="2" fill={primary} fillOpacity="0.25" />
          <rect x="188" y="52" width="6" height="22" rx="2" fill={primary} fillOpacity="0.35" />
          {/* Transition arrow */}
          <rect x="150" y="100" width="110" height="40" rx="4" fill={fg} fillOpacity="0.03" stroke={muted} strokeOpacity="0.1" strokeDasharray="3 3" />
          <rect x="164" y="112" width="80" height="5" rx="2.5" fill={fg} fillOpacity="0.1" />
          <rect x="174" y="122" width="60" height="4" rx="2" fill={fg} fillOpacity="0.06" />
        </svg>
      );

    // 2-column: content left with 3 feature cards, large dashboard right
    case "features-section-4":
      return (
        <svg width="280" height="160" viewBox="0 0 280 160" fill="none" className="transition-all duration-300 group-hover:scale-105">
          {/* Left column: heading + 3 compact cards */}
          <rect x="14" y="14" width="80" height="7" rx="3.5" fill={fg} fillOpacity="0.35" />
          <rect x="14" y="26" width="100" height="4" rx="2" fill={fg} fillOpacity="0.12" />
          <rect x="14" y="34" width="90" height="4" rx="2" fill={fg} fillOpacity="0.12" />

          {/* Feature card 1 */}
          <rect x="14" y="48" width="110" height="30" rx="5" fill={card} stroke={muted} strokeOpacity="0.2" />
          <circle cx="30" cy="63" r="7" fill={primary} fillOpacity="0.25" />
          <rect x="44" y="56" width="50" height="4" rx="2" fill={fg} fillOpacity="0.3" />
          <rect x="44" y="64" width="68" height="3" rx="1.5" fill={fg} fillOpacity="0.1" />

          {/* Feature card 2 */}
          <rect x="14" y="84" width="110" height="30" rx="5" fill={card} stroke={muted} strokeOpacity="0.2" />
          <circle cx="30" cy="99" r="7" fill={primary} fillOpacity="0.25" />
          <rect x="44" y="92" width="46" height="4" rx="2" fill={fg} fillOpacity="0.3" />
          <rect x="44" y="100" width="64" height="3" rx="1.5" fill={fg} fillOpacity="0.1" />

          {/* Feature card 3 */}
          <rect x="14" y="120" width="110" height="30" rx="5" fill={card} stroke={muted} strokeOpacity="0.2" />
          <circle cx="30" cy="135" r="7" fill={primary} fillOpacity="0.25" />
          <rect x="44" y="128" width="52" height="4" rx="2" fill={fg} fillOpacity="0.3" />
          <rect x="44" y="136" width="60" height="3" rx="1.5" fill={fg} fillOpacity="0.1" />

          {/* Right: large dashboard mockup */}
          <rect x="136" y="14" width="134" height="136" rx="6" fill={card} stroke={muted} strokeOpacity="0.2" />
          {/* Top bar */}
          <rect x="144" y="22" width="118" height="12" rx="3" fill={fg} fillOpacity="0.05" />
          <rect x="150" y="26" width="18" height="4" rx="2" fill={fg} fillOpacity="0.15" />
          <rect x="172" y="26" width="18" height="4" rx="2" fill={fg} fillOpacity="0.08" />
          <rect x="194" y="26" width="18" height="4" rx="2" fill={fg} fillOpacity="0.08" />
          {/* Metric cards */}
          <rect x="144" y="40" width="36" height="24" rx="4" fill={primary} fillOpacity="0.06" stroke={primary} strokeOpacity="0.12" />
          <rect x="184" y="40" width="36" height="24" rx="4" fill={fg} fillOpacity="0.04" stroke={muted} strokeOpacity="0.1" />
          <rect x="224" y="40" width="38" height="24" rx="4" fill={fg} fillOpacity="0.04" stroke={muted} strokeOpacity="0.1" />
          <rect x="150" y="47" width="20" height="5" rx="2.5" fill={primary} fillOpacity="0.4" />
          <rect x="150" y="55" width="16" height="3" rx="1.5" fill={fg} fillOpacity="0.1" />
          <rect x="190" y="47" width="20" height="5" rx="2.5" fill={fg} fillOpacity="0.2" />
          <rect x="230" y="47" width="20" height="5" rx="2.5" fill={fg} fillOpacity="0.2" />
          {/* Chart area */}
          <rect x="144" y="70" width="118" height="70" rx="4" fill={fg} fillOpacity="0.03" stroke={muted} strokeOpacity="0.08" />
          <polyline points="154,120 170,105 186,112 202,95 218,100 234,85 250,90" stroke={primary} strokeOpacity="0.4" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          <rect x="152" y="78" width="30" height="4" rx="2" fill={fg} fillOpacity="0.1" />
        </svg>
      );

    default:
      return (
        <svg width="280" height="160" viewBox="0 0 280 160" fill="none" className="transition-all duration-300 group-hover:scale-105">
          <rect x="30" y="20" width="220" height="120" rx="8" fill={card} stroke={muted} strokeOpacity="0.2" />
          <rect x="90" y="70" width="100" height="6" rx="3" fill={fg} fillOpacity="0.2" />
          <rect x="105" y="82" width="70" height="4" rx="2" fill={fg} fillOpacity="0.1" />
        </svg>
      );
  }
}

export default function FeatureSectionsPage() {
  const featureSections: FeatureSectionVariant[] = [
    {
      id: "features-section-1",
      title: "Features Section 1",
      description:
        "A responsive bento grid features section with asymmetric layout. The first and fourth cards span 2 rows, creating an engaging visual hierarchy.",
      preview: "/blocks/features-section/features-section-1",
    },
    {
      id: "features-section-2",
      title: "Features Section 2",
      description:
        "A 3-column grid with rich visual cards featuring custom SVG graphics, charts, network diagrams, and icon grids. Includes centered header with CTA buttons.",
      preview: "/blocks/features-section/features-section-2",
    },
    {
      id: "features-section-3",
      title: "Features Section 3",
      description:
        "A 2-column split layout featuring an interactive workflow showcase with auto-cycling animations. Features on the left highlight different steps, while the right side displays corresponding visual states with smooth transitions.",
      preview: "/blocks/features-section/features-section-3",
    },
    {
      id: "features-section-4",
      title: "Features Section 4",
      description:
        "A 2-column layout with content on the left and a large dashboard mockup on the right. Features three compact feature cards in a grid, perfect for showcasing key product capabilities.",
      preview: "/blocks/features-section/features-section-4",
    },
  ];

  return (
    <ComponentLayout>
      {/* Header */}
      <div className="mb-12">
        <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold mb-4">
          Marketing
        </div>
        <h1 className="text-4xl font-bold tracking-tight mb-4">
          Features Sections
        </h1>
        <p className="text-lg text-muted-foreground max-w-3xl">
          A collection of features section variants designed to showcase
          product features, services, or capabilities. Each variant offers a
          unique layout and visual style.
        </p>
      </div>

      {/* Variants Grid */}
      <div className="grid gap-8 md:grid-cols-2">
        {featureSections.map((variant) => (
          <Link
            key={variant.id}
            href={variant.preview}
            className="group relative overflow-hidden rounded-xl border bg-card transition-all hover:shadow-lg"
          >
            {/* SVG Illustration */}
            <div className="bg-primary/[0.045] relative flex h-52 items-center justify-center border-b dark:bg-transparent overflow-hidden">
              <VariantIllustration variantId={variant.id} />
            </div>

            {/* Content */}
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                {variant.title}
              </h3>

              <p className="text-sm text-muted-foreground">
                {variant.description}
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
    </ComponentLayout>
  );
}
