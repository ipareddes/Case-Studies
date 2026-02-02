import { Monitor, DollarSign, Settings, type LucideIcon } from "lucide-react";
import Image from "next/image";

const ICON_MAP: Record<string, LucideIcon> = {
  Monitor,
  DollarSign,
  Settings,
};

interface FeatureCard {
  icon: string;
  title: string;
}

interface FeatureSection4Props {
  badge?: string;
  heading: string;
  description: string;
  features: FeatureCard[];
  ctaText?: string;
  ctaHref?: string;
  imageSrc: string;
  imageAlt: string;
}

export function FeatureSection4({
  badge,
  heading,
  description,
  features,
  ctaText,
  ctaHref,
  imageSrc,
  imageAlt,
}: FeatureSection4Props) {
  return (
    <div className="w-full py-8 sm:py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2 xl:gap-16">
          {/* Left Column: Content */}
          <div className="flex flex-col gap-6 lg:gap-8">
            {/* Badge */}
            {badge && (
              <div className="inline-flex items-center gap-2 self-start">
                <span className="text-sm font-medium">{badge}</span>
              </div>
            )}

            {/* Heading */}
            <h2 className="text-3xl font-semibold tracking-tight lg:text-5xl">
              {heading}
            </h2>

            {/* Description */}
            <p className="text-lg text-muted-foreground">{description}</p>

            {/* Feature Cards Grid */}
            <div className="grid gap-4 grid-cols-1 md:grid-cols-3">
              {features.map((feature, index) => (
                <FeatureCard key={index} {...feature} />
              ))}
            </div>

            {/* CTA Button */}
            {ctaText && ctaHref && (
              <div>
                <a
                  href={ctaHref}
                  className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90"
                >
                  {ctaText}
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

          {/* Right Column: Dashboard Image */}
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border bg-muted/30 shadow-2xl lg:order-2 max-lg:order-first">
            <Image
              src={imageSrc}
              alt={imageAlt}
              fill
              className="object-cover object-center"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function FeatureCard({ icon: iconName, title }: FeatureCard) {
  const Icon = ICON_MAP[iconName];

  return (
    <div className="flex flex-col items-start gap-4 rounded-xl border bg-card p-6 transition-colors hover:bg-muted/30">
      {/* Icon */}
      {Icon && (
        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-muted">
          <Icon className="h-6 w-6" />
        </div>
      )}

      {/* Title */}
      <h3 className="text-base font-semibold leading-tight">{title}</h3>
    </div>
  );
}
