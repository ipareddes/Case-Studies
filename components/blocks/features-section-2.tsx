import { LucideIcon } from "lucide-react";

type CardType = "simple" | "network" | "chart" | "social-grid" | "integrations" | "analytics-slider" | "earnings";

interface AnalyticsMetric {
  title: string;
  badge: string;
  value: string;
  change: string;
  isPositive: boolean;
}

interface EarningsMetricRow {
  label: string;
  sublabel: string;
  value: string;
  percentage: string;
  isPositive: boolean;
  iconBg: string;
  icon: string; // Can be extended to support actual icon components
}

interface Feature {
  icon?: LucideIcon;
  title: string;
  description: string;
  type?: CardType;
  metric?: {
    value: string;
    label: string;
  };
  analyticsData?: AnalyticsMetric[];
  earningsData?: {
    subtitle: string;
    metrics: EarningsMetricRow[];
    bottomSection?: {
      title: string;
      description: string;
      icon?: LucideIcon;
    };
  };
}

interface FeatureSection2Props {
  badge?: string;
  heading: string;
  description: string;
  actions?: {
    primary?: {
      text: string;
      href: string;
    };
    secondary?: {
      text: string;
      href: string;
    };
  };
  features: Feature[];
}

export function FeatureSection2({
  badge,
  heading,
  description,
  actions,
  features,
}: FeatureSection2Props) {
  return (
    <div className="w-full py-8 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-6">
          {/* Badge */}
          {badge && (
            <div className="inline-flex items-center rounded-full border px-3 py-1 text-sm font-medium">
              {badge}
            </div>
          )}

          {/* Heading */}
          <h2 className="text-2xl font-semibold tracking-tight lg:text-4xl max-w-4xl text-center">
            {heading}
          </h2>

          {/* Description */}
          <p className="text-lg text-muted-foreground max-w-3xl text-center">
            {description}
          </p>

          {/* Action Buttons */}
          {actions && (
            <div className="flex flex-wrap items-center justify-center gap-4 mt-2">
              {actions.primary && (
                <a
                  href={actions.primary.href}
                  className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  {actions.primary.text}
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
                    <path d="M12 2L2 7l10 5 10-5-10-5z" />
                    <path d="m2 17 10 5 10-5" />
                    <path d="m2 12 10 5 10-5" />
                  </svg>
                </a>
              )}
              {actions.secondary && (
                <a
                  href={actions.secondary.href}
                  className="inline-flex items-center gap-2 rounded-lg border bg-background px-6 py-3 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  {actions.secondary.text}
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
                </a>
              )}
            </div>
          )}

          {/* Features Grid */}
          <div className="mt-8 w-full grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {/* Column 1: First 2 cards */}
            <div className="flex flex-col gap-6">
              {features.slice(0, 2).map((feature, index) => (
                <FeatureCard key={index} {...feature} />
              ))}
            </div>

            {/* Column 2: Tall combined card (Earning Report + Customizable Dashboards) */}
            {features[2] && <FeatureCard key={2} {...features[2]} />}

            {/* Column 3: Cards 4-5 with responsive behavior */}
            <div className="flex flex-col gap-6 sm:max-xl:col-span-full sm:max-xl:grid sm:max-xl:grid-cols-2">
              {features.slice(3, 6).map((feature, index) => (
                <FeatureCard key={index + 3} {...feature} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function FeatureCard({ icon: Icon, title, description, metric, type = "simple", analyticsData, earningsData }: Feature) {
  // For earnings card, render completely different structure
  if (type === "earnings" && earningsData) {
    return (
      <EarningsCard
        title={title}
        subtitle={earningsData.subtitle}
        metrics={earningsData.metrics}
        bottomSection={earningsData.bottomSection}
      />
    );
  }

  return (
    <div
      data-slot="card"
      className="group rounded-2xl border bg-card p-6 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:border-primary/20 overflow-hidden"
    >
      <div className="flex flex-col gap-4">
        {/* Card Visual */}
        {type === "network" && <NetworkGraphic />}
        {type === "chart" && <ChartGraphic />}
        {type === "social-grid" && <SocialGridGraphic />}
        {type === "integrations" && <IntegrationsGraphic />}
        {type === "analytics-slider" && analyticsData && <AnalyticsSliderGraphic data={analyticsData} />}

        {/* Simple Icon */}
        {type === "simple" && Icon && (
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 transition-transform group-hover:scale-110">
            <Icon className="h-6 w-6 text-primary" />
          </div>
        )}

        {/* Title */}
        <h3 className="text-xl font-semibold">{title}</h3>

        {/* Description */}
        <p className="text-sm text-muted-foreground leading-relaxed">
          {description}
        </p>

        {/* Optional Metric */}
        {metric && (
          <div className="mt-2 pt-4 border-t">
            <div className="text-2xl font-bold">{metric.value}</div>
            <div className="text-xs text-muted-foreground mt-1">
              {metric.label}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// SVG Graphics Components
function NetworkGraphic() {
  return (
    <div className="relative mx-auto flex h-45 w-fit justify-center mb-4">
      {/* Concentric circles */}
      <svg
        width="1em"
        height="1em"
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="pointer-events-none select-none size-45"
      >
        <circle
          strokeOpacity="0.3"
          cx="100"
          cy="100"
          r="94"
          fill="hsl(var(--card))"
          stroke="hsl(var(--border))"
          strokeWidth="1.485"
          style={{ transform: 'scale(0.92716)', transformOrigin: '50% 50%' }}
        />
        <circle
          strokeOpacity="0.6"
          cx="100"
          cy="100"
          r="76"
          fill="hsl(var(--card))"
          stroke="hsl(var(--border))"
          strokeWidth="1.485"
          style={{ transform: 'scale(0.914089)', transformOrigin: '50% 50%' }}
        />
        <circle
          strokeOpacity="0.9"
          cx="100"
          cy="100"
          r="53"
          fill="hsl(var(--card))"
          stroke="hsl(var(--border))"
          strokeWidth="1.485"
          style={{ transform: 'scale(0.9)', transformOrigin: '50% 50%' }}
        />
      </svg>

      {/* Center avatar */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="relative flex size-16 shrink-0 overflow-hidden rounded-full border shadow-lg bg-background">
          <div className="flex size-full items-center justify-center text-foreground">
            <svg
              width="32"
              height="32"
              viewBox="0 0 328 329"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect y="0.5" width="328" height="328" rx="164" fill="currentColor" />
              <path
                d="M165.018 72.3008V132.771C165.018 152.653 148.9 168.771 129.018 168.771H70.2288"
                stroke="hsl(var(--background))"
                strokeWidth="20"
              />
              <path
                d="M166.627 265.241L166.627 204.771C166.627 184.889 182.744 168.771 202.627 168.771L261.416 168.771"
                stroke="hsl(var(--background))"
                strokeWidth="20"
              />
              <line
                x1="238.136"
                y1="98.8184"
                x2="196.76"
                y2="139.707"
                stroke="hsl(var(--background))"
                strokeWidth="20"
              />
              <line
                x1="135.688"
                y1="200.957"
                x2="94.3128"
                y2="241.845"
                stroke="hsl(var(--background))"
                strokeWidth="20"
              />
              <line
                x1="133.689"
                y1="137.524"
                x2="92.5566"
                y2="96.3914"
                stroke="hsl(var(--background))"
                strokeWidth="20"
              />
              <line
                x1="237.679"
                y1="241.803"
                x2="196.547"
                y2="200.671"
                stroke="hsl(var(--background))"
                strokeWidth="20"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* Floating badges */}
      <div className="absolute top-7 -left-3 -rotate-5">
        <span className="inline-flex items-center rounded-full border bg-background px-3 py-1.5 text-xs font-normal shadow-sm transition-shadow duration-200 hover:shadow-sm">
          Marketing
        </span>
      </div>
      <div className="absolute bottom-15 -left-9 rotate-5">
        <span className="inline-flex items-center rounded-full border bg-background px-3 py-1.5 text-xs font-normal shadow-sm transition-shadow duration-200 hover:shadow-sm">
          Search
        </span>
      </div>
      <div className="absolute bottom-3 -left-3 -rotate-2">
        <span className="inline-flex items-center rounded-full border bg-background px-3 py-1.5 text-xs font-normal shadow-sm transition-shadow duration-200 hover:shadow-sm">
          Google
        </span>
      </div>
      <div className="absolute top-3 -right-5 -rotate-10">
        <span className="inline-flex items-center rounded-full border bg-background px-3 py-1.5 text-xs font-normal shadow-sm transition-shadow duration-200 hover:shadow-sm">
          Keywords
        </span>
      </div>
      <div className="absolute -right-12 bottom-15 rotate-10">
        <span className="inline-flex items-center rounded-full border bg-background px-3 py-1.5 text-xs font-normal shadow-sm transition-shadow duration-200 hover:shadow-sm">
          Analytics
        </span>
      </div>
      <div className="absolute right-0 bottom-3 -rotate-10">
        <span className="inline-flex items-center rounded-full border bg-background px-3 py-1.5 text-xs font-normal shadow-sm transition-shadow duration-200 hover:shadow-sm">
          Ranking
        </span>
      </div>
    </div>
  );
}

function ChartGraphic() {
  return (
    <div className="relative h-48 mb-4 bg-muted/30 rounded-xl p-4">
      {/* Bar chart */}
      <div className="flex items-end justify-between h-full gap-2">
        <div className="flex flex-col items-center justify-end flex-1 h-full">
          <div className="w-full bg-gray-300 rounded-t-md" style={{ height: '40%' }}></div>
          <span className="text-xs mt-2 text-muted-foreground">MO</span>
        </div>
        <div className="flex flex-col items-center justify-end flex-1 h-full">
          <div className="w-full bg-gray-300 rounded-t-md" style={{ height: '55%' }}></div>
          <span className="text-xs mt-2 text-muted-foreground">TU</span>
        </div>
        <div className="flex flex-col items-center justify-end flex-1 h-full">
          <div className="w-full bg-gray-300 rounded-t-md" style={{ height: '65%' }}></div>
          <span className="text-xs mt-2 text-muted-foreground">WE</span>
        </div>
        <div className="flex flex-col items-center justify-end flex-1 h-full">
          <div className="w-full bg-foreground rounded-t-md" style={{ height: '95%' }}></div>
          <span className="text-xs mt-2 text-muted-foreground">TH</span>
        </div>
        <div className="flex flex-col items-center justify-end flex-1 h-full">
          <div className="w-full bg-gray-300 rounded-t-md" style={{ height: '50%' }}></div>
          <span className="text-xs mt-2 text-muted-foreground">FR</span>
        </div>
        <div className="flex flex-col items-center justify-end flex-1 h-full">
          <div className="w-full bg-gray-300 rounded-t-md" style={{ height: '45%' }}></div>
          <span className="text-xs mt-2 text-muted-foreground">SA</span>
        </div>
        <div className="flex flex-col items-center justify-end flex-1 h-full">
          <div className="w-full bg-gray-300 rounded-t-md" style={{ height: '70%' }}></div>
          <span className="text-xs mt-2 text-muted-foreground">SU</span>
        </div>
      </div>
    </div>
  );
}

function SocialGridGraphic() {
  const socialPlatforms = [
    { name: "Instagram", icon: "https://cdn.shadcnstudio.com/ss-assets/brand-logo/instagram-icon.png" },
    { name: "Twitter", icon: "https://cdn.shadcnstudio.com/ss-assets/brand-logo/twitter-icon.png" },
    { name: "Facebook", icon: "https://cdn.shadcnstudio.com/ss-assets/brand-logo/facebook-icon.png" },
    { name: "Github", icon: "https://cdn.shadcnstudio.com/ss-assets/brand-logo/github-icon.png" },
    { name: "Google", icon: "https://cdn.shadcnstudio.com/ss-assets/brand-logo/google-icon.png" },
    { name: "LinkedIn", icon: "https://cdn.shadcnstudio.com/ss-assets/brand-logo/linkedin-icon.png" },
  ];

  return (
    <div className="flex flex-1 items-center mb-4 px-6">
      <div className="relative z-1 flex w-full flex-col gap-5 px-1">
        {/* Center Avatar */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="relative flex size-16 shrink-0 overflow-hidden rounded-xl shadow-lg bg-background">
            <div className="flex size-full items-center justify-center text-foreground">
              <svg
                width="1em"
                height="1em"
                viewBox="0 0 328 329"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="size-8"
              >
                <rect y="0.5" width="328" height="328" rx="164" fill="black" className="dark:fill-white" />
                <path
                  d="M165.018 72.3008V132.771C165.018 152.653 148.9 168.771 129.018 168.771H70.2288"
                  stroke="white"
                  strokeWidth="20"
                  className="dark:stroke-black"
                />
                <path
                  d="M166.627 265.241L166.627 204.771C166.627 184.889 182.744 168.771 202.627 168.771L261.416 168.771"
                  stroke="white"
                  strokeWidth="20"
                  className="dark:stroke-black"
                />
                <line
                  x1="238.136"
                  y1="98.8184"
                  x2="196.76"
                  y2="139.707"
                  stroke="white"
                  strokeWidth="20"
                  className="dark:stroke-black"
                />
                <line
                  x1="135.688"
                  y1="200.957"
                  x2="94.3128"
                  y2="241.845"
                  stroke="white"
                  strokeWidth="20"
                  className="dark:stroke-black"
                />
                <line
                  x1="133.689"
                  y1="137.524"
                  x2="92.5566"
                  y2="96.3914"
                  stroke="white"
                  strokeWidth="20"
                  className="dark:stroke-black"
                />
                <line
                  x1="237.679"
                  y1="241.803"
                  x2="196.547"
                  y2="200.671"
                  stroke="white"
                  strokeWidth="20"
                  className="dark:stroke-black"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Row 1 */}
        <div className="flex items-center justify-between gap-4">
          <SocialIconBox platform={socialPlatforms[0]} />
          <span className="flex gap-20">
            <span className="size-0.5 bg-border rounded-full"></span>
            <span className="size-0.5 bg-border rounded-full"></span>
          </span>
          <SocialIconBox platform={socialPlatforms[1]} />
        </div>

        {/* Row 2 */}
        <div className="flex items-center justify-between gap-4">
          <SocialIconBox platform={socialPlatforms[2]} />
          <span className="size-0.5 bg-border rounded-full"></span>
          <SocialIconBox platform={socialPlatforms[3]} />
        </div>

        {/* Row 3 */}
        <div className="flex items-center justify-between gap-4">
          <SocialIconBox platform={socialPlatforms[4]} />
          <span className="flex gap-20">
            <span className="size-0.5 bg-border rounded-full"></span>
            <span className="size-0.5 bg-border rounded-full"></span>
          </span>
          <SocialIconBox platform={socialPlatforms[5]} />
        </div>

        {/* Connection SVG Lines */}
        <svg
          className="pointer-events-none absolute inset-0 w-full h-full -z-1"
          viewBox="0 0 308 142"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Lines from left icons to center */}
          <path d="M 21,17 Q 87.5,71 154,71" stroke="currentColor" strokeWidth="1" strokeOpacity="0.2" />
          <path d="M 21,71 Q 87.5,71 154,71" stroke="currentColor" strokeWidth="1" strokeOpacity="0.2" />
          <path d="M 21,125 Q 87.5,71 154,71" stroke="currentColor" strokeWidth="1" strokeOpacity="0.2" />

          {/* Lines from right icons to center */}
          <path d="M 287,17 Q 220.5,71 154,71" stroke="currentColor" strokeWidth="1" strokeOpacity="0.2" />
          <path d="M 287,71 Q 220.5,71 154,71" stroke="currentColor" strokeWidth="1" strokeOpacity="0.2" />
          <path d="M 287,125 Q 220.5,71 154,71" stroke="currentColor" strokeWidth="1" strokeOpacity="0.2" />
        </svg>
      </div>
    </div>
  );
}

function SocialIconBox({ platform }: { platform: { name: string; icon: string } }) {
  return (
    <span className="bg-card flex size-8.5 items-center justify-center rounded-md border">
      <img src={platform.icon} alt={platform.name} className="size-5.5" />
    </span>
  );
}

function IntegrationsGraphic() {
  const platforms = [
    { name: "Facebook", icon: "f" },
    { name: "Twitter", icon: "𝕏" },
    { name: "Instagram", icon: "IG" },
    { name: "LinkedIn", icon: "in" },
    { name: "Github", icon: "GH" },
  ];

  return (
    <div className="flex flex-1 flex-col justify-center gap-4 mb-4">
      {/* First row - scrolls left to right */}
      <div
        style={{
          "--marquee-duration": "22s",
          "--marquee-delay": "0s",
          "--marquee-gap": "1.5rem",
        } as React.CSSProperties}
        className="group flex gap-6 overflow-hidden p-3 py-0"
      >
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="flex shrink-0 justify-around gap-6 animate-marquee-horizontal group-hover:[animation-play-state:paused]"
          >
            {platforms.map((platform, idx) => (
              <span
                key={idx}
                className="inline-flex items-center gap-1 rounded-full border bg-background px-3 py-1.5 text-xs font-normal transition-shadow"
              >
                <span className="size-5.5 flex items-center justify-center rounded-full bg-foreground text-background font-bold text-[10px]">
                  {platform.icon}
                </span>
                {platform.name}
              </span>
            ))}
          </div>
        ))}
      </div>

      {/* Second row - scrolls right to left (reverse) */}
      <div
        style={{
          "--marquee-duration": "22s",
          "--marquee-delay": "0s",
          "--marquee-gap": "1.5rem",
        } as React.CSSProperties}
        className="group flex gap-6 overflow-hidden p-3 py-0"
      >
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="flex shrink-0 justify-around gap-6 animate-marquee-horizontal group-hover:[animation-play-state:paused] [animation-direction:reverse]"
          >
            {platforms.map((platform, idx) => (
              <span
                key={idx}
                className="inline-flex items-center gap-1 rounded-full border bg-background px-3 py-1.5 text-xs font-normal transition-shadow"
              >
                <span className="size-5.5 flex items-center justify-center rounded-full bg-foreground text-background font-bold text-[10px]">
                  {platform.icon}
                </span>
                {platform.name}
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

function AnalyticsSliderGraphic({ data }: { data: AnalyticsMetric[] }) {
  return (
    <div
      style={{
        "--marquee-duration": "30s",
        "--marquee-delay": "0s",
        "--marquee-gap": "1.5rem",
      } as React.CSSProperties}
      className="group flex gap-6 overflow-hidden p-3 py-0 mb-4 -mx-6"
    >
      {/* Duplicate the data array multiple times for seamless looping */}
      {[...Array(3)].map((_, setIndex) => (
        <div
          key={setIndex}
          className="flex shrink-0 justify-around gap-6 animate-marquee-horizontal group-hover:[animation-play-state:paused]"
        >
          {data.map((metric, idx) => (
            <div
              key={`${setIndex}-${idx}`}
              data-slot="card"
              className="bg-card text-card-foreground flex flex-col rounded-xl border py-6 relative justify-between gap-6 w-67.5 shadow-none"
            >
              {/* Card Header */}
              <div className="flex flex-col gap-3 px-6">
                <span className="font-medium">{metric.title}</span>
                <span className="inline-flex w-fit items-center rounded-full border border-transparent bg-primary/10 text-primary px-2 py-0.5 text-xs font-medium">
                  {metric.badge}
                </span>
              </div>

              {/* Card Content - Metric */}
              <div className="px-6 flex items-center gap-2">
                <span className="text-2xl font-semibold">{metric.value}</span>
                <span className={`text-sm ${metric.isPositive ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                  {metric.isPositive ? '+' : ''}{metric.change}%
                </span>
              </div>

              {/* Decorative SVG graphic (placeholder - you can customize this) */}
              <div className="absolute right-0.5 bottom-0 opacity-20">
                <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="40" cy="40" r="30" fill="currentColor" opacity="0.1" />
                  <path d="M20 50 L30 40 L40 45 L50 30 L60 35" stroke="currentColor" strokeWidth="2" fill="none" />
                </svg>
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

function EarningsCard({
  title,
  subtitle,
  metrics,
  bottomSection
}: {
  title: string;
  subtitle: string;
  metrics: EarningsMetricRow[];
  bottomSection?: {
    title: string;
    description: string;
    icon?: LucideIcon;
  };
}) {
  return (
    <div
      data-slot="card"
      className="group rounded-2xl border bg-card p-6 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:border-primary/20 overflow-hidden flex flex-col gap-6"
    >
      {/* Inner Earnings Card */}
      <div
        data-slot="card"
        className="flex flex-col gap-6 rounded-xl border py-6 bg-muted w-full shadow-none"
      >
        {/* Card Header */}
        <div className="flex justify-between items-start gap-2 px-6">
          <div className="flex flex-col gap-1">
            <span className="text-lg font-semibold">{title}</span>
            <span className="text-muted-foreground text-sm">{subtitle}</span>
          </div>
          {/* Menu Button */}
          <button className="size-6 rounded-full hover:bg-accent flex items-center justify-center text-muted-foreground">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="1" />
              <circle cx="12" cy="5" r="1" />
              <circle cx="12" cy="19" r="1" />
            </svg>
          </button>
        </div>

        {/* Metrics Rows */}
        <div className="px-6 flex flex-1 flex-col justify-between gap-6">
          {metrics.map((metricRow, index) => (
            <div key={index} className="flex items-center justify-between gap-2">
              {/* Left: Icon + Labels */}
              <div className="flex items-center gap-2">
                <div className={`flex size-10 shrink-0 overflow-hidden rounded-sm items-center justify-center ${metricRow.iconBg}`}>
                  <span className="text-xl">{metricRow.icon}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-medium">{metricRow.label}</span>
                  <span className="text-xs text-muted-foreground">{metricRow.sublabel}</span>
                </div>
              </div>

              {/* Right: Value + Percentage */}
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold">{metricRow.value}</span>
                <span className={`text-xs flex items-center gap-0.5 ${metricRow.isPositive ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className={metricRow.isPositive ? '' : 'rotate-180'}
                  >
                    <path d="m18 15-6-6-6 6" />
                  </svg>
                  {metricRow.percentage}%
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Bar Chart */}
        <ChartGraphic />
      </div>

      {/* Bottom Section (Customizable Dashboards) */}
      {bottomSection && (
        <div className="flex flex-col gap-4">
          {/* Icon */}
          {bottomSection.icon && (
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
              <bottomSection.icon className="h-6 w-6 text-primary" />
            </div>
          )}

          {/* Title */}
          <h3 className="text-xl font-semibold">{bottomSection.title}</h3>

          {/* Description */}
          <p className="text-sm text-muted-foreground leading-relaxed">
            {bottomSection.description}
          </p>
        </div>
      )}
    </div>
  );
}

