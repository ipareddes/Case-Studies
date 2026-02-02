import { FeatureSection4 } from "@/components/blocks/features-section-4";
import { BlockPreview } from "@/components/blocks/block-preview";
import Link from "next/link";

const usageCode = `import { FeatureSection4 } from "@/components/blocks/features-section-4";

export default function Example() {
  return (
    <FeatureSection4
      badge="Our Best Features 🔥"
      heading="Unleash the full financial potential with our best features"
      description="Using technology to make finance simpler, smarter and more rewarding."
      features={[
        {
          icon: "Monitor",
          title: "Customizable Dashboard",
        },
        {
          icon: "DollarSign",
          title: "Financial Goal Tracking",
        },
        {
          icon: "Settings",
          title: "Cash Flow Management",
        },
      ]}
      ctaText="View all Features"
      ctaHref="#"
      imageSrc="https://cdn.shadcnstudio.com/ss-assets/blocks/marketing/features/image-38.png"
      imageAlt="Dashboard mockup"
    />
  );
}`;

export default function FeaturesSection4Page() {
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
            Features Section 4
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl">
            A 2-column layout with content on the left and a large dashboard mockup on the right.
            Features three compact feature cards in a grid, perfect for showcasing key product capabilities.
          </p>
        </div>

        {/* Preview */}
        <BlockPreview
          preview={
            <FeatureSection4
              badge="Our Best Features 🔥"
              heading="Unleash the full financial potential with our best features"
              description="Using technology to make finance simpler, smarter and more rewarding."
              features={[
                {
                  icon: "Monitor",
                  title: "Customizable Dashboard",
                },
                {
                  icon: "DollarSign",
                  title: "Financial Goal Tracking",
                },
                {
                  icon: "Settings",
                  title: "Cash Flow Management",
                },
              ]}
              ctaText="View all Features"
              ctaHref="#"
              imageSrc="https://cdn.shadcnstudio.com/ss-assets/blocks/marketing/features/image-38.png"
              imageAlt="Dashboard mockup"
            />
          }
          code={usageCode}
          filename="example.tsx"
        />
      </div>
    </div>
  );
}
