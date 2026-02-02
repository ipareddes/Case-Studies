import { FeatureSection2 } from "@/components/blocks/features-section-2";
import { BlockPreview } from "@/components/blocks/block-preview";
import { LineChart, BarChart3 } from "lucide-react";
import Link from "next/link";

const usageCode = `import { FeatureSection2 } from "@/components/blocks/features-section-2";
import { LineChart, Zap } from "lucide-react";

export default function Example() {
  return (
    <FeatureSection2
      badge="Features"
      heading="Turn your marketing data into actionable insights"
      description="See what drives growth with real-time analytics and easy-to-understand dashboards."
      actions={{
        primary: { text: "Get Started - Free", href: "#" },
        secondary: { text: "View Pricing", href: "#" },
      }}
      features={[
        {
          type: "network",
          title: "SEO",
          description: "Optimize your website and content for better visibility, higher traffic, and improved search rankings.",
        },
        {
          type: "earnings",
          title: "Earning Report",
          description: "Weekly earning overview with detailed metrics on net profit, total income, and expenses.",
          earningsData: {
            subtitle: "Weekly Earning overview",
            metrics: [
              {
                label: "Net profit",
                sublabel: "Sales",
                value: "$1,623",
                percentage: "20.3",
                isPositive: true,
                iconBg: "bg-primary/10 text-primary",
                icon: "💰",
              },
              {
                label: "Total income",
                sublabel: "Sales, Affiliation",
                value: "$5,600",
                percentage: "16.2",
                isPositive: true,
                iconBg: "bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400",
                icon: "📈",
              },
              {
                label: "Total expense",
                sublabel: "ADVT, Marketing",
                value: "$3,200",
                percentage: "10.5",
                isPositive: false,
                iconBg: "bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400",
                icon: "💸",
              },
            ],
          },
        },
        {
          type: "integrations",
          title: "Cross-Platform Integration",
          description: "Seamlessly connect all your marketing channels and data sources in one unified dashboard.",
        },
        {
          type: "social-grid",
          title: "Social Media Marketing",
          description: "Track and optimize your social media campaigns with detailed insights across all platforms.",
        },
        {
          icon: LineChart,
          title: "Customizable Dashboards",
          description: "Tailor your dashboard to display the metrics that matter most, giving you actionable insights at a glance.",
        },
        {
          type: "analytics-slider",
          title: "Real-Time Analytics",
          description: "Monitor your marketing performance in real-time with live dashboards and instant notifications.",
          analyticsData: [
            {
              title: "Ratings",
              badge: "Last 6 months",
              value: "8.14k",
              change: "18.2",
              isPositive: true,
            },
            {
              title: "Sessions",
              badge: "Last month",
              value: "12.2k",
              change: "25.5",
              isPositive: false,
            },
            {
              title: "Revenue",
              badge: "This quarter",
              value: "$42.8k",
              change: "32.1",
              isPositive: true,
            },
            {
              title: "Conversions",
              badge: "Last week",
              value: "1.2k",
              change: "8.7",
              isPositive: true,
            },
          ],
        },
      ]}
    />
  );
}`;

export default function FeaturesSection2Page() {
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
            Features Section 2
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl">
            A 3-column grid layout featuring rich visual cards with custom SVG graphics,
            charts, network diagrams, and icon grids. Includes centered header with CTA buttons.
            Perfect for marketing pages showcasing analytics, integrations, and platform features.
          </p>
        </div>

        {/* Preview */}
        <BlockPreview
          preview={
            <FeatureSection2
              badge="Features"
              heading="Turn your marketing data into actionable insights"
              description="See what drives growth with real-time analytics and easy-to-understand dashboards."
              actions={{
                primary: { text: "Get Started - Free", href: "#" },
                secondary: { text: "View Pricing", href: "#" },
              }}
              features={[
                // Column 1
                {
                  type: "network",
                  title: "SEO",
                  description:
                    "Optimize your website and content for better visibility, higher traffic, and improved search rankings.",
                },
                {
                  type: "social-grid",
                  title: "Social Media Marketing",
                  description:
                    "Track and optimize your social media campaigns with detailed insights across all platforms.",
                },
                // Column 2 - Tall combined card
                {
                  type: "earnings",
                  title: "Earning Report",
                  description:
                    "Weekly earning overview with detailed metrics on net profit, total income, and expenses.",
                  earningsData: {
                    subtitle: "Weekly Earning overview",
                    metrics: [
                      {
                        label: "Net profit",
                        sublabel: "Sales",
                        value: "$1,623",
                        percentage: "20.3",
                        isPositive: true,
                        iconBg: "bg-primary/10 text-primary",
                        icon: "💰",
                      },
                      {
                        label: "Total income",
                        sublabel: "Sales, Affiliation",
                        value: "$5,600",
                        percentage: "16.2",
                        isPositive: true,
                        iconBg: "bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400",
                        icon: "📈",
                      },
                      {
                        label: "Total expense",
                        sublabel: "ADVT, Marketing",
                        value: "$3,200",
                        percentage: "10.5",
                        isPositive: false,
                        iconBg: "bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400",
                        icon: "💸",
                      },
                    ],
                    bottomSection: {
                      title: "Customizable Dashboards",
                      description:
                        "Tailor your dashboard to display the metrics that matter most, giving you actionable insights at a glance.",
                      icon: BarChart3,
                    },
                  },
                },
                // Column 3
                {
                  type: "integrations",
                  title: "Cross-Platform Integration",
                  description:
                    "Seamlessly connect all your marketing channels and data sources in one unified dashboard.",
                },
                {
                  type: "analytics-slider",
                  title: "Real-Time Analytics",
                  description:
                    "Monitor your marketing performance in real-time with live dashboards and instant notifications.",
                  analyticsData: [
                    {
                      title: "Ratings",
                      badge: "Last 6 months",
                      value: "8.14k",
                      change: "18.2",
                      isPositive: true,
                    },
                    {
                      title: "Sessions",
                      badge: "Last month",
                      value: "12.2k",
                      change: "25.5",
                      isPositive: false,
                    },
                    {
                      title: "Revenue",
                      badge: "This quarter",
                      value: "$42.8k",
                      change: "32.1",
                      isPositive: true,
                    },
                    {
                      title: "Conversions",
                      badge: "Last week",
                      value: "1.2k",
                      change: "8.7",
                      isPositive: true,
                    },
                  ],
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
