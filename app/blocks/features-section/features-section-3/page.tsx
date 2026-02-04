"use client";

import { FeatureSection3 } from "@/components/blocks/features-section-3";
import { BlockPreview } from "@/components/blocks/block-preview";
import { ComponentLayout } from "@/components/layout/component-layout";

const usageCode = `import { FeatureSection3 } from "@/components/blocks/features-section-3";
import { FileText, Link2, CheckCircle } from "lucide-react";

export default function Example() {
  return (
    <FeatureSection3
      badge="How it works"
      heading="Build AI agents in three simple steps"
      description="Create intelligent automation workflows."
      actions={{
        primary: { text: "Start Building", href: "#" },
        secondary: { text: "View Examples", href: "#" },
      }}
      features={[
        {
          icon: FileText,
          title: "Describe your workflow",
          description: "Inform the agent about what you wish to automate...",
        },
        {
          icon: Link2,
          title: "Connect your tools",
          description: "Link Gmail, Slack, Notion, or any app...",
        },
        {
          icon: CheckCircle,
          title: "Review and refine",
          description: "Test your workflow, adjust parameters...",
        },
      ]}
      visualDemos={[
        {
          title: "Start workflow",
          content: "input",
          chatMessage: "Summarize daily team updates",
          model: "GPT-5-mini",
        },
        {
          title: "Connecting tools",
          content: "processing",
          model: "GPT-5-mini",
          steps: ["Checking Content", "Working on insights", ...],
          logos: [{ src: "...", alt: "Notion" }, ...],
        },
        {
          title: "Execution Summary",
          content: "success",
          model: "GPT-5-mini",
          successMessage: "Workflow completed successfully",
        },
      ]}
      autoPlayInterval={5000}
    />
  );
}`;

export default function FeaturesSection3Page() {
  return (
    <ComponentLayout>
      <BlockPreview
          preview={
            <FeatureSection3
              badge="How it works"
              heading="Build AI agents in three simple steps"
              description="Create intelligent automation workflows that connect your tools and streamline your processes."
              actions={{
                primary: { text: "Start Building", href: "#" },
                secondary: { text: "View Examples", href: "#" },
              }}
              features={[
                {
                  icon: "FileText",
                  title: "Describe your workflow",
                  description:
                    "Inform the agent about what you wish to automate, ranging from daily team summaries to lead follow-ups, ensuring clarity in your request.",
                },
                {
                  icon: "Link2",
                  title: "Connect your tools",
                  description:
                    "Link Gmail, Slack, Notion, or any app your team already uses. The agent syncs data between them and builds context automatically.",
                },
                {
                  icon: "CheckCircle",
                  title: "Review and refine",
                  description:
                    "Test your workflow, adjust parameters, and let the agent learn from feedback to improve its performance over time.",
                },
              ]}
              visualDemos={[
                {
                  title: "Start workflow",
                  content: "input",
                  chatMessage: "Summarize daily team updates from Slack and email",
                  model: "GPT-5-mini",
                },
                {
                  title: "Connecting tools",
                  content: "processing",
                  model: "GPT-5-mini",
                  steps: [
                    "Checking Content",
                    "Working on insights",
                    "Checking permissions and updates",
                    "Checking connections",
                  ],
                  logos: [
                    {
                      src: "https://cdn.shadcnstudio.com/ss-assets/brand-logo/notion-icon.png",
                      alt: "Notion",
                    },
                    {
                      src: "https://cdn.shadcnstudio.com/ss-assets/brand-logo/gmail-icon.png",
                      alt: "Gmail",
                    },
                    {
                      src: "https://cdn.shadcnstudio.com/ss-assets/brand-logo/slack-icon.png",
                      alt: "Slack",
                    },
                    {
                      src: "https://cdn.shadcnstudio.com/ss-assets/brand-logo/google-icon.png",
                      alt: "Google",
                    },
                  ],
                },
                {
                  title: "Execution Summary",
                  content: "success",
                  model: "GPT-5-mini",
                  successMessage: "Workflow completed successfully",
                },
              ]}
              autoPlayInterval={5000}
            />
          }
          code={usageCode}
          filename="features-section-3.tsx"
          installCommand="npx shadcn add features-section-3"
        />
    </ComponentLayout>
  );
}
