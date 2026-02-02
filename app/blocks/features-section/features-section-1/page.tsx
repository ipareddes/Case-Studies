import { FeatureSection21 } from "@/components/blocks/features-section-21";
import { BlockPreview } from "@/components/blocks/block-preview";
import { Palette, Layers, Zap, Sparkles } from "lucide-react";
import Link from "next/link";

const usageCode = `import { FeatureSection21 } from "@/components/blocks/features-section-21";
import { Palette, Layers, Zap, Sparkles } from "lucide-react";

export default function Example() {
  return (
    <FeatureSection21
      badge="Services"
      heading="Design services that make an impact. 🎨"
      description="We offer a range of design services to help you create beautiful and functional products that your users will love."
      features={[
        // First column, spans 2 rows
        {
          icon: Palette,
          title: "Brand Identity Design",
          description: "Create a cohesive visual identity that resonates with your audience and sets you apart from competitors.",
          link: { text: "Learn more", href: "#" },
        },
        // First column, spans 1 row
        {
          icon: Layers,
          title: "UI/UX Design",
          description: "Design intuitive and engaging user interfaces that provide exceptional user experiences across all devices.",
          link: { text: "Learn more", href: "#" },
        },
        // Second column, spans 1 row
        {
          icon: Zap,
          title: "Design Systems",
          description: "Build scalable design systems that ensure consistency and efficiency across your entire product ecosystem.",
          link: { text: "Learn more", href: "#" },
        },
        // Second column, spans 2 rows
        {
          icon: Sparkles,
          title: "Product Design",
          description: "Transform ideas into beautiful, functional products through our comprehensive product design process.",
          link: { text: "Learn more", href: "#" },
        },
      ]}
    />
  );
}`;

export default function FeaturesSectionPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        {/* Back link */}
        <Link
          href="/blocks/features-section"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-8"
        >
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
            <path d="m15 18-6-6 6-6" />
          </svg>
          Back to features sections
        </Link>

        {/* Header */}
        <div className="mb-8">
          <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold mb-4">
            Marketing
          </div>
          <h1 className="text-4xl font-bold tracking-tight mb-4">
            Features Section 1
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl">
            A responsive bento grid features section with asymmetric layout. The
            first and fourth cards span 2 rows, creating an engaging visual
            hierarchy. Perfect for showcasing services or product features.
          </p>
        </div>

        {/* Preview */}
        <BlockPreview
          preview={
            <FeatureSection21
              badge="Services"
              heading="Design services that make an impact. 🎨"
              description="We offer a range of design services to help you create beautiful and functional products that your users will love."
              features={[
                {
                  icon: Palette,
                  title: "Brand Identity Design",
                  description:
                    "Create a cohesive visual identity that resonates with your audience and sets you apart from competitors.",
                  link: {
                    text: "Learn more",
                    href: "#",
                  },
                },
                {
                  icon: Layers,
                  title: "UI/UX Design",
                  description:
                    "Design intuitive and engaging user interfaces that provide exceptional user experiences across all devices.",
                  link: {
                    text: "Learn more",
                    href: "#",
                  },
                },
                {
                  icon: Zap,
                  title: "Design Systems",
                  description:
                    "Build scalable design systems that ensure consistency and efficiency across your entire product ecosystem.",
                  link: {
                    text: "Learn more",
                    href: "#",
                  },
                },
                {
                  icon: Sparkles,
                  title: "Product Design",
                  description:
                    "Transform ideas into beautiful, functional products through our comprehensive product design process.",
                  link: {
                    text: "Learn more",
                    href: "#",
                  },
                },
              ]}
            />
          }
          code={usageCode}
          filename="example.tsx"
        />
      </div>
    </div>
  );
}
