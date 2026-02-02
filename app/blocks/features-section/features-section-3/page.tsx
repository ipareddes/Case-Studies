import { FeatureSection3 } from "@/components/blocks/features-section-3";
import { BlockPreview } from "@/components/blocks/block-preview";
import Link from "next/link";

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
            Features Section 3
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl">
            A 2-column split layout featuring an interactive workflow showcase with auto-cycling
            animations. Features on the left highlight different steps, while the right side
            displays corresponding visual states (input, processing, success) with smooth transitions.
          </p>
        </div>

        {/* Preview */}
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
          filename="example.tsx"
        />
      </div>
    </div>
  );
}
