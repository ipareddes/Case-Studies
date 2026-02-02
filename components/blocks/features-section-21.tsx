import { LucideIcon } from "lucide-react";

interface Feature {
  icon: LucideIcon;
  title: string;
  description: string;
  link?: {
    text: string;
    href: string;
  };
}

interface FeatureCardProps extends Feature {
  rowSpan: 1 | 2;
  gridPosition: string;
}

interface FeatureSection21Props {
  badge?: string;
  heading: string;
  description: string;
  features: Feature[];
}

export function FeatureSection21({
  badge,
  heading,
  description,
  features,
}: FeatureSection21Props) {
  return (
    <div className="w-full py-8 sm:py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6">
          {/* Badge */}
          {badge && (
            <div className="inline-flex w-fit items-center rounded-full border px-3 py-1 text-sm font-medium">
              {badge}
            </div>
          )}

          {/* Heading */}
          <h2 className="text-2xl font-semibold tracking-tight lg:text-4xl">
            {heading}
          </h2>

          {/* Description */}
          <p className="text-lg text-muted-foreground max-w-3xl">
            {description}
          </p>

          {/* Features Bento Grid */}
          <div className="mt-8 grid gap-6 sm:grid-cols-2 sm:grid-rows-3 sm:auto-rows-fr">
            {features.map((feature, index) => {
              // Card 0: Left column, rows 1-2 (span 2)
              // Card 1: Left column, row 3
              // Card 2: Right column, row 1
              // Card 3: Right column, rows 2-3 (span 2)
              const gridPositions = [
                "sm:col-start-1 sm:row-start-1 sm:row-span-2",
                "sm:col-start-1 sm:row-start-3 sm:row-span-1",
                "sm:col-start-2 sm:row-start-1 sm:row-span-1",
                "sm:col-start-2 sm:row-start-2 sm:row-span-2",
              ];
              return (
                <FeatureCard
                  key={index}
                  {...feature}
                  rowSpan={index === 0 || index === 3 ? 2 : 1}
                  gridPosition={gridPositions[index] || ""}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

function FeatureCard({ icon: Icon, title, description, link, rowSpan, gridPosition }: FeatureCardProps) {
  return (
    <div
      data-slot="card"
      className={`rounded-3xl bg-muted/50 py-6 transition-colors hover:bg-muted flex flex-col gap-6 ${gridPosition}`}
    >
      <div data-slot="card-header" className="px-6 flex items-start gap-4">
        <div className="rounded-lg bg-background p-2">
          <Icon className="h-6 w-6" />
        </div>
        <div className="flex-1">
          <h3 className="text-xl font-semibold">{title}</h3>
        </div>
      </div>

      <div data-slot="card-content" className="px-6 flex-1">
        <p className="text-muted-foreground">{description}</p>
      </div>

      {link && (
        <div data-slot="card-footer" className="px-6 mt-auto">
          <a
            href={link.href}
            className="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            {link.text}
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
        </div>
      )}
    </div>
  );
}
