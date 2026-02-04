"use client";

import { FeatureSection4 } from "@/components/blocks/features-section-4";
import { BlockPreview } from "@/components/blocks/block-preview";
import { ComponentLayout } from "@/components/layout/component-layout";

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
    <ComponentLayout>
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
          filename="features-section-4.tsx"
          installCommand="npx shadcn add features-section-4"
        />
    </ComponentLayout>
  );
}
