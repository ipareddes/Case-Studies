"use client";

import { FeatureSection21 } from "@/components/blocks/features-section-21";
import { BlockPreview } from "@/components/blocks/block-preview";
import { ComponentLayout } from "@/components/layout/component-layout";
import { Palette, Layers, Zap, Sparkles } from "lucide-react";

const usageCode = `import { FeatureSection21 } from "@/components/blocks/features-section-21";
import { Palette, Layers, Zap, Sparkles } from "lucide-react";

export default function Example() {
  return (
    <FeatureSection21
      badge="Services"
      heading="Design services that make an impact. 🎨"
      description="We offer a range of design services to help you create beautiful and functional products that your users will love."
      features={[
        {
          icon: Palette,
          title: "Brand Identity Design",
          description: "Create a cohesive visual identity that resonates with your audience and sets you apart from competitors.",
          link: { text: "Learn more", href: "#" },
        },
        {
          icon: Layers,
          title: "UI/UX Design",
          description: "Design intuitive and engaging user interfaces that provide exceptional user experiences across all devices.",
          link: { text: "Learn more", href: "#" },
        },
        {
          icon: Zap,
          title: "Design Systems",
          description: "Build scalable design systems that ensure consistency and efficiency across your entire product ecosystem.",
          link: { text: "Learn more", href: "#" },
        },
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
    <ComponentLayout>
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
                link: { text: "Learn more", href: "#" },
              },
              {
                icon: Layers,
                title: "UI/UX Design",
                description:
                  "Design intuitive and engaging user interfaces that provide exceptional user experiences across all devices.",
                link: { text: "Learn more", href: "#" },
              },
              {
                icon: Zap,
                title: "Design Systems",
                description:
                  "Build scalable design systems that ensure consistency and efficiency across your entire product ecosystem.",
                link: { text: "Learn more", href: "#" },
              },
              {
                icon: Sparkles,
                title: "Product Design",
                description:
                  "Transform ideas into beautiful, functional products through our comprehensive product design process.",
                link: { text: "Learn more", href: "#" },
              },
            ]}
          />
        }
        code={usageCode}
        filename="features-section-1.tsx"
        installCommand="npx shadcn add features-section-1"
      />
    </ComponentLayout>
  );
}
