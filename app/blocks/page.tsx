"use client";

import Link from "next/link";
import { TopBanner } from "@/components/layout/top-banner";
import { SiteNavigation } from "@/components/layout/site-navigation";

interface Block {
  id: string;
  name: string;
  count: number;
  href: string;
}

export default function BlocksPage() {
  const blocks: Block[] = [
    { id: "features-section", name: "Features Section", count: 12, href: "/blocks/features-section" },
    { id: "hero", name: "Hero", count: 16, href: "/blocks/hero" },
    { id: "pricing", name: "Pricing", count: 10, href: "/blocks/pricing" },
    { id: "testimonials", name: "Testimonials", count: 8, href: "/blocks/testimonials" },
    { id: "cta", name: "Call to Action", count: 9, href: "/blocks/cta" },
    { id: "footer", name: "Footer", count: 11, href: "/blocks/footer" },
    { id: "navbar", name: "Navbar", count: 14, href: "/blocks/navbar" },
    { id: "faq", name: "FAQ", count: 7, href: "/blocks/faq" },
    { id: "stats", name: "Stats", count: 6, href: "/blocks/stats" },
    { id: "team", name: "Team", count: 8, href: "/blocks/team" },
    { id: "login", name: "Login", count: 10, href: "/blocks/login" },
    { id: "signup", name: "Sign Up", count: 8, href: "/blocks/signup" },
    { id: "contact", name: "Contact", count: 6, href: "/blocks/contact" },
    { id: "blog", name: "Blog", count: 9, href: "/blocks/blog" },
    { id: "sidebar", name: "Sidebar", count: 7, href: "/blocks/sidebar" },
    { id: "error", name: "Error Page", count: 5, href: "/blocks/error" },
  ];

  return (
    <>
      <TopBanner />
      <SiteNavigation />

      <div className="min-h-screen bg-background">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-12">
            <h1 className="text-4xl font-bold tracking-tight mb-4">
              Blocks
            </h1>
            <p className="text-lg text-muted-foreground max-w-3xl">
              Ready-to-use page sections built with Radix UI and Tailwind CSS.
              Copy and paste into your apps.
            </p>
          </div>

          {/* Blocks Grid */}
          <div className="grid w-full gap-4 sm:grid-cols-2 sm:gap-6 md:grid-cols-3 xl:grid-cols-4">
            {blocks.map((block) => (
              <Link
                key={block.id}
                href={block.href}
                className="group rounded-xl border bg-card overflow-hidden transition-all hover:shadow-md hover:border-primary/50"
              >
                {/* SVG Illustration */}
                <div className="bg-primary/[0.045] relative flex h-52 items-center justify-center border-b dark:bg-transparent overflow-hidden">
                  <div className="flex items-center justify-center w-full h-full">
                    <BlockIllustration blockId={block.id} />
                  </div>
                </div>

                {/* Block Info */}
                <div className="flex flex-col gap-0.5 p-4">
                  <h2 className="text-lg font-medium group-hover:text-primary transition-colors">
                    {block.name}
                  </h2>
                  <p className="text-muted-foreground text-sm">
                    {block.count} {block.count === 1 ? "Block" : "Blocks"}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

function BlockIllustration({ blockId }: { blockId: string }) {
  const fg = "hsl(var(--card-foreground))";
  const card = "hsl(var(--card))";
  const primary = "hsl(var(--primary))";
  const muted = "hsl(var(--muted-foreground))";

  switch (blockId) {
    case "features-section":
      return (
        <svg width="200" height="140" viewBox="0 0 200 140" fill="none" className="transition-all duration-300 group-hover:scale-110">
          {/* 2x3 card grid */}
          <rect x="10" y="10" width="56" height="56" rx="6" fill={card} stroke={muted} strokeOpacity="0.2" />
          <rect x="72" y="10" width="56" height="56" rx="6" fill={card} stroke={muted} strokeOpacity="0.2" />
          <rect x="134" y="10" width="56" height="56" rx="6" fill={card} stroke={muted} strokeOpacity="0.2" />
          <rect x="10" y="74" width="56" height="56" rx="6" fill={card} stroke={muted} strokeOpacity="0.2" />
          <rect x="72" y="74" width="56" height="56" rx="6" fill={card} stroke={muted} strokeOpacity="0.2" />
          <rect x="134" y="74" width="56" height="56" rx="6" fill={card} stroke={muted} strokeOpacity="0.2" />
          {/* Icons in cards */}
          <circle cx="38" cy="30" r="6" fill={primary} fillOpacity="0.3" />
          <circle cx="100" cy="30" r="6" fill={primary} fillOpacity="0.3" />
          <circle cx="162" cy="30" r="6" fill={primary} fillOpacity="0.3" />
          {/* Text lines */}
          <rect x="22" y="42" width="32" height="4" rx="2" fill={fg} fillOpacity="0.3" />
          <rect x="22" y="50" width="24" height="3" rx="1.5" fill={fg} fillOpacity="0.15" />
          <rect x="84" y="42" width="32" height="4" rx="2" fill={fg} fillOpacity="0.3" />
          <rect x="84" y="50" width="24" height="3" rx="1.5" fill={fg} fillOpacity="0.15" />
          <rect x="146" y="42" width="32" height="4" rx="2" fill={fg} fillOpacity="0.3" />
          <rect x="146" y="50" width="24" height="3" rx="1.5" fill={fg} fillOpacity="0.15" />
        </svg>
      );

    case "hero":
      return (
        <svg width="200" height="140" viewBox="0 0 200 140" fill="none" className="transition-all duration-300 group-hover:scale-110">
          {/* Centered heading */}
          <rect x="50" y="25" width="100" height="8" rx="4" fill={fg} fillOpacity="0.4" />
          <rect x="60" y="38" width="80" height="5" rx="2.5" fill={fg} fillOpacity="0.15" />
          <rect x="65" y="47" width="70" height="5" rx="2.5" fill={fg} fillOpacity="0.15" />
          {/* CTA buttons */}
          <rect x="55" y="62" width="40" height="14" rx="7" fill={primary} />
          <rect x="102" y="62" width="44" height="14" rx="7" fill={card} stroke={muted} strokeOpacity="0.3" />
          {/* Illustration area */}
          <rect x="30" y="88" width="140" height="40" rx="6" fill={fg} fillOpacity="0.05" stroke={muted} strokeOpacity="0.15" strokeDasharray="3 3" />
          <rect x="85" y="103" width="30" height="10" rx="3" fill={fg} fillOpacity="0.1" />
        </svg>
      );

    case "pricing":
      return (
        <svg width="200" height="140" viewBox="0 0 200 140" fill="none" className="transition-all duration-300 group-hover:scale-110">
          {/* 3 pricing cards */}
          <rect x="8" y="10" width="56" height="120" rx="6" fill={card} stroke={muted} strokeOpacity="0.2" />
          <rect x="72" y="5" width="56" height="130" rx="6" fill={card} stroke={primary} strokeOpacity="0.5" />
          <rect x="136" y="10" width="56" height="120" rx="6" fill={card} stroke={muted} strokeOpacity="0.2" />
          {/* Labels */}
          <rect x="20" y="22" width="32" height="5" rx="2.5" fill={fg} fillOpacity="0.3" />
          <rect x="84" y="17" width="32" height="5" rx="2.5" fill={primary} fillOpacity="0.6" />
          <rect x="148" y="22" width="32" height="5" rx="2.5" fill={fg} fillOpacity="0.3" />
          {/* Prices */}
          <rect x="18" y="34" width="24" height="8" rx="4" fill={fg} fillOpacity="0.4" />
          <rect x="82" y="29" width="24" height="8" rx="4" fill={fg} fillOpacity="0.4" />
          <rect x="146" y="34" width="24" height="8" rx="4" fill={fg} fillOpacity="0.4" />
          {/* Feature lines */}
          <rect x="18" y="52" width="36" height="3" rx="1.5" fill={fg} fillOpacity="0.12" />
          <rect x="18" y="59" width="30" height="3" rx="1.5" fill={fg} fillOpacity="0.12" />
          <rect x="18" y="66" width="34" height="3" rx="1.5" fill={fg} fillOpacity="0.12" />
          <rect x="82" y="47" width="36" height="3" rx="1.5" fill={fg} fillOpacity="0.12" />
          <rect x="82" y="54" width="30" height="3" rx="1.5" fill={fg} fillOpacity="0.12" />
          <rect x="82" y="61" width="34" height="3" rx="1.5" fill={fg} fillOpacity="0.12" />
          <rect x="82" y="68" width="28" height="3" rx="1.5" fill={fg} fillOpacity="0.12" />
          <rect x="146" y="52" width="36" height="3" rx="1.5" fill={fg} fillOpacity="0.12" />
          <rect x="146" y="59" width="30" height="3" rx="1.5" fill={fg} fillOpacity="0.12" />
          {/* CTA buttons */}
          <rect x="16" y="100" width="40" height="12" rx="6" fill={fg} fillOpacity="0.1" />
          <rect x="80" y="100" width="40" height="12" rx="6" fill={primary} />
          <rect x="144" y="100" width="40" height="12" rx="6" fill={fg} fillOpacity="0.1" />
        </svg>
      );

    case "testimonials":
      return (
        <svg width="200" height="140" viewBox="0 0 200 140" fill="none" className="transition-all duration-300 group-hover:scale-110">
          {/* Quote card */}
          <rect x="25" y="15" width="150" height="80" rx="8" fill={card} stroke={muted} strokeOpacity="0.2" />
          {/* Quote mark */}
          <text x="40" y="42" fontSize="24" fill={primary} fillOpacity="0.4" fontFamily="serif">&quot;</text>
          {/* Text lines */}
          <rect x="40" y="48" width="120" height="4" rx="2" fill={fg} fillOpacity="0.2" />
          <rect x="40" y="56" width="100" height="4" rx="2" fill={fg} fillOpacity="0.2" />
          <rect x="40" y="64" width="80" height="4" rx="2" fill={fg} fillOpacity="0.2" />
          {/* Avatar + name */}
          <circle cx="50" cy="82" r="6" fill={primary} fillOpacity="0.3" />
          <rect x="60" y="79" width="40" height="4" rx="2" fill={fg} fillOpacity="0.3" />
          {/* Dots indicator */}
          <circle cx="92" cy="112" r="3" fill={primary} fillOpacity="0.6" />
          <circle cx="102" cy="112" r="3" fill={fg} fillOpacity="0.15" />
          <circle cx="112" cy="112" r="3" fill={fg} fillOpacity="0.15" />
        </svg>
      );

    case "cta":
      return (
        <svg width="200" height="140" viewBox="0 0 200 140" fill="none" className="transition-all duration-300 group-hover:scale-110">
          {/* CTA banner */}
          <rect x="15" y="25" width="170" height="90" rx="8" fill={primary} fillOpacity="0.08" stroke={primary} strokeOpacity="0.2" />
          {/* Heading */}
          <rect x="50" y="45" width="100" height="8" rx="4" fill={fg} fillOpacity="0.4" />
          <rect x="60" y="58" width="80" height="4" rx="2" fill={fg} fillOpacity="0.15" />
          {/* Buttons */}
          <rect x="55" y="75" width="42" height="14" rx="7" fill={primary} />
          <rect x="103" y="75" width="42" height="14" rx="7" fill={card} stroke={muted} strokeOpacity="0.3" />
        </svg>
      );

    case "footer":
      return (
        <svg width="200" height="140" viewBox="0 0 200 140" fill="none" className="transition-all duration-300 group-hover:scale-110">
          {/* Top divider */}
          <line x1="15" y1="20" x2="185" y2="20" stroke={muted} strokeOpacity="0.2" />
          {/* Logo */}
          <rect x="15" y="30" width="24" height="8" rx="4" fill={fg} fillOpacity="0.4" />
          {/* Column 1 */}
          <rect x="70" y="30" width="24" height="4" rx="2" fill={fg} fillOpacity="0.3" />
          <rect x="70" y="40" width="30" height="3" rx="1.5" fill={fg} fillOpacity="0.12" />
          <rect x="70" y="47" width="26" height="3" rx="1.5" fill={fg} fillOpacity="0.12" />
          <rect x="70" y="54" width="28" height="3" rx="1.5" fill={fg} fillOpacity="0.12" />
          {/* Column 2 */}
          <rect x="115" y="30" width="24" height="4" rx="2" fill={fg} fillOpacity="0.3" />
          <rect x="115" y="40" width="30" height="3" rx="1.5" fill={fg} fillOpacity="0.12" />
          <rect x="115" y="47" width="26" height="3" rx="1.5" fill={fg} fillOpacity="0.12" />
          <rect x="115" y="54" width="28" height="3" rx="1.5" fill={fg} fillOpacity="0.12" />
          {/* Column 3 */}
          <rect x="160" y="30" width="24" height="4" rx="2" fill={fg} fillOpacity="0.3" />
          <rect x="160" y="40" width="25" height="3" rx="1.5" fill={fg} fillOpacity="0.12" />
          <rect x="160" y="47" width="22" height="3" rx="1.5" fill={fg} fillOpacity="0.12" />
          {/* Description */}
          <rect x="15" y="44" width="40" height="3" rx="1.5" fill={fg} fillOpacity="0.12" />
          <rect x="15" y="51" width="36" height="3" rx="1.5" fill={fg} fillOpacity="0.12" />
          {/* Bottom bar */}
          <line x1="15" y1="100" x2="185" y2="100" stroke={muted} strokeOpacity="0.2" />
          <rect x="15" y="110" width="60" height="3" rx="1.5" fill={fg} fillOpacity="0.12" />
          {/* Social icons */}
          <circle cx="160" cy="112" r="5" fill={fg} fillOpacity="0.1" />
          <circle cx="175" cy="112" r="5" fill={fg} fillOpacity="0.1" />
        </svg>
      );

    case "navbar":
      return (
        <svg width="200" height="140" viewBox="0 0 200 140" fill="none" className="transition-all duration-300 group-hover:scale-110">
          {/* Nav bar */}
          <rect x="10" y="30" width="180" height="28" rx="6" fill={card} stroke={muted} strokeOpacity="0.2" />
          {/* Logo */}
          <rect x="20" y="40" width="20" height="8" rx="4" fill={fg} fillOpacity="0.4" />
          {/* Nav links */}
          <rect x="55" y="42" width="18" height="4" rx="2" fill={fg} fillOpacity="0.2" />
          <rect x="80" y="42" width="18" height="4" rx="2" fill={fg} fillOpacity="0.2" />
          <rect x="105" y="42" width="18" height="4" rx="2" fill={fg} fillOpacity="0.2" />
          {/* CTA button */}
          <rect x="148" y="38" width="32" height="12" rx="6" fill={primary} />
          {/* Page content below */}
          <rect x="10" y="70" width="180" height="50" rx="6" fill={fg} fillOpacity="0.03" stroke={muted} strokeOpacity="0.1" strokeDasharray="3 3" />
          <rect x="60" y="85" width="80" height="6" rx="3" fill={fg} fillOpacity="0.1" />
          <rect x="70" y="96" width="60" height="4" rx="2" fill={fg} fillOpacity="0.06" />
        </svg>
      );

    case "faq":
      return (
        <svg width="200" height="140" viewBox="0 0 200 140" fill="none" className="transition-all duration-300 group-hover:scale-110">
          {/* Title */}
          <rect x="70" y="10" width="60" height="7" rx="3.5" fill={fg} fillOpacity="0.3" />
          {/* FAQ items */}
          <rect x="25" y="28" width="150" height="22" rx="5" fill={card} stroke={muted} strokeOpacity="0.2" />
          <rect x="35" y="36" width="70" height="4" rx="2" fill={fg} fillOpacity="0.25" />
          <path d="M160 36L165 41L170 36" stroke={fg} strokeOpacity="0.3" strokeWidth="1.5" strokeLinecap="round" />

          <rect x="25" y="54" width="150" height="36" rx="5" fill={card} stroke={primary} strokeOpacity="0.3" />
          <rect x="35" y="62" width="60" height="4" rx="2" fill={primary} fillOpacity="0.5" />
          <rect x="35" y="72" width="120" height="3" rx="1.5" fill={fg} fillOpacity="0.12" />
          <rect x="35" y="79" width="100" height="3" rx="1.5" fill={fg} fillOpacity="0.12" />
          <path d="M165 62L160 67L155 62" stroke={fg} strokeOpacity="0.3" strokeWidth="1.5" strokeLinecap="round" />

          <rect x="25" y="94" width="150" height="22" rx="5" fill={card} stroke={muted} strokeOpacity="0.2" />
          <rect x="35" y="102" width="80" height="4" rx="2" fill={fg} fillOpacity="0.25" />
          <path d="M160 102L165 107L170 102" stroke={fg} strokeOpacity="0.3" strokeWidth="1.5" strokeLinecap="round" />

          <rect x="25" y="120" width="150" height="14" rx="5" fill={card} stroke={muted} strokeOpacity="0.2" />
          <rect x="35" y="124" width="65" height="4" rx="2" fill={fg} fillOpacity="0.25" />
        </svg>
      );

    case "stats":
      return (
        <svg width="200" height="140" viewBox="0 0 200 140" fill="none" className="transition-all duration-300 group-hover:scale-110">
          {/* 4 stat boxes */}
          <rect x="10" y="35" width="40" height="55" rx="6" fill={card} stroke={muted} strokeOpacity="0.2" />
          <rect x="56" y="35" width="40" height="55" rx="6" fill={card} stroke={muted} strokeOpacity="0.2" />
          <rect x="102" y="35" width="40" height="55" rx="6" fill={card} stroke={muted} strokeOpacity="0.2" />
          <rect x="148" y="35" width="40" height="55" rx="6" fill={card} stroke={muted} strokeOpacity="0.2" />
          {/* Numbers */}
          <rect x="18" y="48" width="24" height="8" rx="4" fill={primary} fillOpacity="0.5" />
          <rect x="64" y="48" width="24" height="8" rx="4" fill={primary} fillOpacity="0.5" />
          <rect x="110" y="48" width="24" height="8" rx="4" fill={primary} fillOpacity="0.5" />
          <rect x="156" y="48" width="24" height="8" rx="4" fill={primary} fillOpacity="0.5" />
          {/* Labels */}
          <rect x="18" y="62" width="20" height="3" rx="1.5" fill={fg} fillOpacity="0.15" />
          <rect x="64" y="62" width="18" height="3" rx="1.5" fill={fg} fillOpacity="0.15" />
          <rect x="110" y="62" width="22" height="3" rx="1.5" fill={fg} fillOpacity="0.15" />
          <rect x="156" y="62" width="20" height="3" rx="1.5" fill={fg} fillOpacity="0.15" />
          {/* Desc */}
          <rect x="18" y="72" width="24" height="3" rx="1.5" fill={fg} fillOpacity="0.08" />
          <rect x="64" y="72" width="22" height="3" rx="1.5" fill={fg} fillOpacity="0.08" />
          <rect x="110" y="72" width="26" height="3" rx="1.5" fill={fg} fillOpacity="0.08" />
          <rect x="156" y="72" width="24" height="3" rx="1.5" fill={fg} fillOpacity="0.08" />
        </svg>
      );

    case "team":
      return (
        <svg width="200" height="140" viewBox="0 0 200 140" fill="none" className="transition-all duration-300 group-hover:scale-110">
          {/* Title */}
          <rect x="65" y="8" width="70" height="7" rx="3.5" fill={fg} fillOpacity="0.3" />
          {/* 4 team member cards */}
          <rect x="10" y="28" width="40" height="100" rx="6" fill={card} stroke={muted} strokeOpacity="0.2" />
          <rect x="56" y="28" width="40" height="100" rx="6" fill={card} stroke={muted} strokeOpacity="0.2" />
          <rect x="102" y="28" width="40" height="100" rx="6" fill={card} stroke={muted} strokeOpacity="0.2" />
          <rect x="148" y="28" width="40" height="100" rx="6" fill={card} stroke={muted} strokeOpacity="0.2" />
          {/* Avatars */}
          <circle cx="30" cy="55" r="12" fill={primary} fillOpacity="0.15" />
          <circle cx="76" cy="55" r="12" fill={primary} fillOpacity="0.15" />
          <circle cx="122" cy="55" r="12" fill={primary} fillOpacity="0.15" />
          <circle cx="168" cy="55" r="12" fill={primary} fillOpacity="0.15" />
          {/* Names */}
          <rect x="17" y="74" width="26" height="4" rx="2" fill={fg} fillOpacity="0.3" />
          <rect x="63" y="74" width="26" height="4" rx="2" fill={fg} fillOpacity="0.3" />
          <rect x="109" y="74" width="26" height="4" rx="2" fill={fg} fillOpacity="0.3" />
          <rect x="155" y="74" width="26" height="4" rx="2" fill={fg} fillOpacity="0.3" />
          {/* Roles */}
          <rect x="19" y="82" width="22" height="3" rx="1.5" fill={fg} fillOpacity="0.12" />
          <rect x="65" y="82" width="22" height="3" rx="1.5" fill={fg} fillOpacity="0.12" />
          <rect x="111" y="82" width="22" height="3" rx="1.5" fill={fg} fillOpacity="0.12" />
          <rect x="157" y="82" width="22" height="3" rx="1.5" fill={fg} fillOpacity="0.12" />
        </svg>
      );

    case "login":
      return (
        <svg width="200" height="140" viewBox="0 0 200 140" fill="none" className="transition-all duration-300 group-hover:scale-110">
          {/* Form card */}
          <rect x="40" y="10" width="120" height="120" rx="8" fill={card} stroke={muted} strokeOpacity="0.2" />
          {/* Title */}
          <rect x="72" y="24" width="56" height="7" rx="3.5" fill={fg} fillOpacity="0.4" />
          {/* Email input */}
          <rect x="55" y="42" width="90" height="16" rx="4" fill="transparent" stroke={muted} strokeOpacity="0.3" />
          <rect x="62" y="48" width="30" height="4" rx="2" fill={fg} fillOpacity="0.12" />
          {/* Password input */}
          <rect x="55" y="64" width="90" height="16" rx="4" fill="transparent" stroke={muted} strokeOpacity="0.3" />
          <rect x="62" y="70" width="24" height="4" rx="2" fill={fg} fillOpacity="0.12" />
          {/* Submit button */}
          <rect x="55" y="90" width="90" height="16" rx="8" fill={primary} />
          {/* Divider + social */}
          <line x1="55" y1="116" x2="93" y2="116" stroke={muted} strokeOpacity="0.2" />
          <rect x="93" y="112" width="14" height="8" rx="2" fill={fg} fillOpacity="0.06" />
          <line x1="107" y1="116" x2="145" y2="116" stroke={muted} strokeOpacity="0.2" />
        </svg>
      );

    case "signup":
      return (
        <svg width="200" height="140" viewBox="0 0 200 140" fill="none" className="transition-all duration-300 group-hover:scale-110">
          {/* Split layout */}
          <rect x="10" y="10" width="85" height="120" rx="8" fill={primary} fillOpacity="0.06" />
          <rect x="105" y="10" width="85" height="120" rx="8" fill={card} stroke={muted} strokeOpacity="0.2" />
          {/* Left side content */}
          <rect x="25" y="40" width="55" height="6" rx="3" fill={fg} fillOpacity="0.2" />
          <rect x="25" y="52" width="45" height="4" rx="2" fill={fg} fillOpacity="0.1" />
          <rect x="25" y="60" width="50" height="4" rx="2" fill={fg} fillOpacity="0.1" />
          {/* Right side form */}
          <rect x="120" y="22" width="55" height="6" rx="3" fill={fg} fillOpacity="0.35" />
          <rect x="115" y="38" width="65" height="12" rx="3" fill="transparent" stroke={muted} strokeOpacity="0.3" />
          <rect x="115" y="55" width="65" height="12" rx="3" fill="transparent" stroke={muted} strokeOpacity="0.3" />
          <rect x="115" y="72" width="65" height="12" rx="3" fill="transparent" stroke={muted} strokeOpacity="0.3" />
          <rect x="115" y="92" width="65" height="14" rx="7" fill={primary} />
          <rect x="128" y="112" width="40" height="3" rx="1.5" fill={fg} fillOpacity="0.12" />
        </svg>
      );

    case "contact":
      return (
        <svg width="200" height="140" viewBox="0 0 200 140" fill="none" className="transition-all duration-300 group-hover:scale-110">
          {/* Title */}
          <rect x="60" y="10" width="80" height="7" rx="3.5" fill={fg} fillOpacity="0.3" />
          {/* Form */}
          <rect x="30" y="28" width="65" height="14" rx="4" fill="transparent" stroke={muted} strokeOpacity="0.25" />
          <rect x="105" y="28" width="65" height="14" rx="4" fill="transparent" stroke={muted} strokeOpacity="0.25" />
          <rect x="30" y="48" width="140" height="14" rx="4" fill="transparent" stroke={muted} strokeOpacity="0.25" />
          <rect x="30" y="68" width="140" height="36" rx="4" fill="transparent" stroke={muted} strokeOpacity="0.25" />
          {/* Labels */}
          <rect x="37" y="33" width="24" height="4" rx="2" fill={fg} fillOpacity="0.12" />
          <rect x="112" y="33" width="24" height="4" rx="2" fill={fg} fillOpacity="0.12" />
          <rect x="37" y="53" width="30" height="4" rx="2" fill={fg} fillOpacity="0.12" />
          <rect x="37" y="75" width="20" height="4" rx="2" fill={fg} fillOpacity="0.12" />
          {/* Submit */}
          <rect x="30" y="114" width="50" height="14" rx="7" fill={primary} />
        </svg>
      );

    case "blog":
      return (
        <svg width="200" height="140" viewBox="0 0 200 140" fill="none" className="transition-all duration-300 group-hover:scale-110">
          {/* 3 blog cards */}
          <rect x="8" y="10" width="56" height="120" rx="6" fill={card} stroke={muted} strokeOpacity="0.2" />
          <rect x="72" y="10" width="56" height="120" rx="6" fill={card} stroke={muted} strokeOpacity="0.2" />
          <rect x="136" y="10" width="56" height="120" rx="6" fill={card} stroke={muted} strokeOpacity="0.2" />
          {/* Images */}
          <rect x="8" y="10" width="56" height="40" rx="6" fill={fg} fillOpacity="0.06" />
          <rect x="72" y="10" width="56" height="40" rx="6" fill={fg} fillOpacity="0.06" />
          <rect x="136" y="10" width="56" height="40" rx="6" fill={fg} fillOpacity="0.06" />
          {/* Category */}
          <rect x="14" y="58" width="24" height="5" rx="2.5" fill={primary} fillOpacity="0.2" />
          <rect x="78" y="58" width="24" height="5" rx="2.5" fill={primary} fillOpacity="0.2" />
          <rect x="142" y="58" width="24" height="5" rx="2.5" fill={primary} fillOpacity="0.2" />
          {/* Title */}
          <rect x="14" y="68" width="44" height="5" rx="2.5" fill={fg} fillOpacity="0.3" />
          <rect x="78" y="68" width="40" height="5" rx="2.5" fill={fg} fillOpacity="0.3" />
          <rect x="142" y="68" width="42" height="5" rx="2.5" fill={fg} fillOpacity="0.3" />
          {/* Desc */}
          <rect x="14" y="78" width="44" height="3" rx="1.5" fill={fg} fillOpacity="0.1" />
          <rect x="14" y="84" width="38" height="3" rx="1.5" fill={fg} fillOpacity="0.1" />
          <rect x="78" y="78" width="44" height="3" rx="1.5" fill={fg} fillOpacity="0.1" />
          <rect x="78" y="84" width="38" height="3" rx="1.5" fill={fg} fillOpacity="0.1" />
          <rect x="142" y="78" width="44" height="3" rx="1.5" fill={fg} fillOpacity="0.1" />
          <rect x="142" y="84" width="38" height="3" rx="1.5" fill={fg} fillOpacity="0.1" />
          {/* Author + date */}
          <circle cx="19" cy="110" r="5" fill={fg} fillOpacity="0.1" />
          <rect x="28" y="108" width="28" height="3" rx="1.5" fill={fg} fillOpacity="0.12" />
          <circle cx="83" cy="110" r="5" fill={fg} fillOpacity="0.1" />
          <rect x="92" y="108" width="28" height="3" rx="1.5" fill={fg} fillOpacity="0.12" />
          <circle cx="147" cy="110" r="5" fill={fg} fillOpacity="0.1" />
          <rect x="156" y="108" width="28" height="3" rx="1.5" fill={fg} fillOpacity="0.12" />
        </svg>
      );

    case "sidebar":
      return (
        <svg width="200" height="140" viewBox="0 0 200 140" fill="none" className="transition-all duration-300 group-hover:scale-110">
          {/* Sidebar */}
          <rect x="10" y="10" width="50" height="120" rx="6" fill={card} stroke={muted} strokeOpacity="0.2" />
          {/* Main content */}
          <rect x="66" y="10" width="124" height="120" rx="6" fill={card} stroke={muted} strokeOpacity="0.2" />
          {/* Sidebar logo */}
          <rect x="18" y="20" width="16" height="6" rx="3" fill={fg} fillOpacity="0.4" />
          {/* Sidebar items */}
          <rect x="18" y="36" width="34" height="5" rx="2.5" fill={primary} fillOpacity="0.2" />
          <rect x="18" y="46" width="30" height="5" rx="2.5" fill={fg} fillOpacity="0.1" />
          <rect x="18" y="56" width="32" height="5" rx="2.5" fill={fg} fillOpacity="0.1" />
          <rect x="18" y="66" width="28" height="5" rx="2.5" fill={fg} fillOpacity="0.1" />
          <rect x="18" y="76" width="34" height="5" rx="2.5" fill={fg} fillOpacity="0.1" />
          {/* Main content lines */}
          <rect x="78" y="22" width="80" height="7" rx="3.5" fill={fg} fillOpacity="0.2" />
          <rect x="78" y="38" width="100" height="4" rx="2" fill={fg} fillOpacity="0.08" />
          <rect x="78" y="46" width="90" height="4" rx="2" fill={fg} fillOpacity="0.08" />
          <rect x="78" y="54" width="95" height="4" rx="2" fill={fg} fillOpacity="0.08" />
          {/* Cards in main */}
          <rect x="78" y="68" width="48" height="30" rx="4" fill={fg} fillOpacity="0.04" stroke={muted} strokeOpacity="0.1" />
          <rect x="132" y="68" width="48" height="30" rx="4" fill={fg} fillOpacity="0.04" stroke={muted} strokeOpacity="0.1" />
        </svg>
      );

    case "error":
      return (
        <svg width="200" height="140" viewBox="0 0 200 140" fill="none" className="transition-all duration-300 group-hover:scale-110">
          {/* Big 404 */}
          <rect x="55" y="25" width="90" height="30" rx="6" fill={fg} fillOpacity="0.06" />
          <rect x="75" y="34" width="50" height="12" rx="6" fill={fg} fillOpacity="0.2" />
          {/* Message */}
          <rect x="50" y="68" width="100" height="6" rx="3" fill={fg} fillOpacity="0.25" />
          <rect x="60" y="80" width="80" height="4" rx="2" fill={fg} fillOpacity="0.1" />
          {/* Back button */}
          <rect x="70" y="96" width="60" height="14" rx="7" fill={primary} />
        </svg>
      );

    default:
      return (
        <svg width="200" height="140" viewBox="0 0 200 140" fill="none" className="transition-all duration-300 group-hover:scale-110">
          <rect x="30" y="20" width="140" height="100" rx="8" fill={card} stroke={muted} strokeOpacity="0.2" />
          <rect x="70" y="60" width="60" height="6" rx="3" fill={fg} fillOpacity="0.2" />
          <rect x="80" y="72" width="40" height="4" rx="2" fill={fg} fillOpacity="0.1" />
        </svg>
      );
  }
}
