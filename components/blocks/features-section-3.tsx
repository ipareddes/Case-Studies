"use client";

import { FileText, Link2, CheckCircle, type LucideIcon } from "lucide-react";
import { useState, useEffect } from "react";

const ICON_MAP: Record<string, LucideIcon> = {
  FileText,
  Link2,
  CheckCircle,
};

interface FeatureItem {
  icon: string;
  title: string;
  description: string;
}

interface VisualDemoState {
  title: string;
  content: "input" | "processing" | "success";
  chatMessage?: string;
  model?: string;
  steps?: string[];
  logos?: Array<{ src: string; alt: string }>;
  successMessage?: string;
}

interface FeatureSection3Props {
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
  features: FeatureItem[];
  visualDemos: VisualDemoState[];
  autoPlayInterval?: number;
}

export function FeatureSection3({
  badge,
  heading,
  description,
  actions,
  features,
  visualDemos,
  autoPlayInterval = 5000,
}: FeatureSection3Props) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Auto-cycle through features
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setActiveIndex((current) => (current + 1) % features.length);
    }, autoPlayInterval);

    return () => clearInterval(interval);
  }, [isPaused, features.length, autoPlayInterval]);

  const handleFeatureClick = (index: number) => {
    setActiveIndex(index);
    setIsPaused(true);
    // Resume auto-play after 10 seconds of manual selection
    setTimeout(() => setIsPaused(false), 10000);
  };

  return (
    <div className="w-full py-8 sm:py-16 lg:py-24">
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
                  className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90"
                >
                  {actions.primary.text}
                </a>
              )}
              {actions.secondary && (
                <a
                  href={actions.secondary.href}
                  className="inline-flex items-center gap-2 rounded-lg border bg-background px-6 py-3 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
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

          {/* Main 2-Column Grid */}
          <div className="mt-8 w-full grid border-x rounded-2xl overflow-hidden max-lg:divide-y lg:grid-cols-2 lg:divide-x">
            {/* Left Section: Features Grid */}
            <div className="grid h-full grid-rows-3 divide-y max-lg:order-2">
              {features.map((feature, index) => (
                <FeatureRow
                  key={index}
                  {...feature}
                  isActive={index === activeIndex}
                  onClick={() => handleFeatureClick(index)}
                />
              ))}
            </div>

            {/* Right Section: Visual Demo */}
            {visualDemos[activeIndex] && (
              <div className="relative flex items-center justify-center overflow-hidden px-4 py-12 lg:py-0 max-lg:h-96 max-lg:order-1 bg-muted/30">
                <VisualDemo demo={visualDemos[activeIndex]} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function FeatureRow({
  icon: iconName,
  title,
  description,
  isActive,
  onClick,
}: FeatureItem & { isActive: boolean; onClick: () => void }) {
  const Icon = ICON_MAP[iconName];

  return (
    <div
      onClick={onClick}
      className={`flex items-start gap-4 p-6 lg:p-8 cursor-pointer transition-all duration-300 relative ${
        isActive ? "bg-muted/50" : "hover:bg-muted/20"
      }`}
    >
      {/* Active Indicator */}
      {isActive && (
        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-foreground transition-all duration-300" />
      )}

      {/* Icon */}
      <div
        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg transition-colors duration-300 ${
          isActive ? "bg-primary/20" : "bg-primary/10"
        }`}
      >
        {Icon && <Icon className={`h-5 w-5 transition-colors duration-300 ${isActive ? "text-primary" : "text-primary"}`} />}
      </div>

      {/* Content */}
      <div className="flex flex-col gap-2">
        <h3 className={`text-lg font-semibold transition-colors duration-300 ${isActive ? "text-foreground" : ""}`}>
          {title}
        </h3>
        <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
      </div>
    </div>
  );
}

function VisualDemo({ demo }: { demo: VisualDemoState }) {
  return (
    <div className="relative w-full max-w-md">
      {/* Chat Interface Mockup */}
      <div className="relative rounded-xl border bg-background shadow-2xl overflow-hidden transition-all duration-500">
        {/* Header with status color */}
        <div
          className={`flex items-center justify-between border-b px-4 py-3 transition-colors duration-500 ${
            demo.content === "success"
              ? "bg-green-500/10"
              : demo.content === "processing"
              ? "bg-blue-500/10"
              : ""
          }`}
        >
          <span className="text-sm font-medium">{demo.title}</span>
          <div className="flex gap-1.5">
            <div className="h-3 w-3 rounded-full bg-muted"></div>
            <div className="h-3 w-3 rounded-full bg-muted"></div>
            <div className="h-3 w-3 rounded-full bg-muted"></div>
          </div>
        </div>

        {/* Content based on state */}
        <div className="p-4 space-y-4 min-h-[200px]">
          {/* Input State */}
          {demo.content === "input" && demo.chatMessage && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="rounded-lg bg-muted p-3">
                <p className="text-sm">{demo.chatMessage}</p>
              </div>

              {/* Model Indicator */}
              {demo.model && (
                <div className="flex items-center justify-between mt-4">
                  <div className="flex items-center gap-2">
                    <div className="h-5 w-5 rounded-full bg-green-500 flex items-center justify-center">
                      <svg className="h-3 w-3 text-white" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
                      </svg>
                    </div>
                    <span className="text-xs text-muted-foreground">{demo.model}</span>
                  </div>
                  <div className="flex gap-2">
                    <button className="text-xs text-muted-foreground hover:text-foreground transition-colors">
                      Attach a file
                    </button>
                    <button className="text-xs font-medium text-foreground bg-foreground/10 hover:bg-foreground/20 rounded px-2 py-1 transition-colors flex items-center gap-1">
                      Send to LLM
                      <svg className="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Processing State */}
          {demo.content === "processing" && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-4">
              {/* Model Indicator */}
              {demo.model && (
                <div className="flex items-center gap-2">
                  <div className="h-5 w-5 rounded-full bg-green-500 flex items-center justify-center">
                    <svg className="h-3 w-3 text-white" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
                    </svg>
                  </div>
                  <span className="text-xs text-muted-foreground">{demo.model}</span>
                  <button className="ml-auto text-xs text-muted-foreground hover:text-foreground">Attach a file</button>
                  <button className="text-xs text-foreground">Send to LLM</button>
                </div>
              )}

              {/* Progress Steps */}
              {demo.steps && (
                <div className="space-y-2">
                  {demo.steps.map((step, index) => (
                    <div key={index} className="flex items-center gap-3 animate-in fade-in slide-in-from-left duration-300" style={{ animationDelay: `${index * 100}ms` }}>
                      {demo.logos && demo.logos[index] ? (
                        <div className="h-6 w-6 rounded-md border bg-background flex items-center justify-center shrink-0">
                          <img src={demo.logos[index].src} alt={demo.logos[index].alt} className="h-4 w-4 object-contain" />
                        </div>
                      ) : (
                        <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-medium text-primary">
                          {index + 1}
                        </div>
                      )}
                      <span className="text-sm text-muted-foreground">{step}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Success State */}
          {demo.content === "success" && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-4">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-green-500 flex items-center justify-center">
                  <svg className="h-6 w-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold">{demo.successMessage || "Completed successfully"}</h4>
                </div>
              </div>

              {demo.model && (
                <div className="flex items-center gap-2">
                  <div className="h-5 w-5 rounded-full bg-green-500 flex items-center justify-center">
                    <svg className="h-3 w-3 text-white" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
                    </svg>
                  </div>
                  <span className="text-xs text-muted-foreground">{demo.model}</span>
                  <button className="ml-auto text-xs text-muted-foreground hover:text-foreground">Attach a file</button>
                  <button className="text-xs text-foreground">Send to LLM</button>
                </div>
              )}

              <button className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-2 transition-colors">
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v11a2 2 0 01-2 2z" />
                  <polyline points="17 21 17 13 7 13 7 21" />
                  <polyline points="7 3 7 8 15 8" />
                </svg>
                Save
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute -top-4 -right-4 h-24 w-24 rounded-full bg-primary/5 blur-2xl"></div>
      <div className="absolute -bottom-4 -left-4 h-32 w-32 rounded-full bg-primary/5 blur-2xl"></div>
    </div>
  );
}
