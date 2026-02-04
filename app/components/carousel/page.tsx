"use client";

import { Card, CardContent, Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@ipareddes/ui-components";

import { ComponentLayout } from "@/components/layout/component-layout";
import { useState } from "react";
import { X, Sparkles, Code2, Copy, Check } from "lucide-react";
import ReactDOM from "react-dom";

// --- Code Modal ---
function CodeModal({ code, onClose, variantId }: { code: string; onClose: () => void; variantId: string }) {
  const [copied, setCopied] = useState(false);
  const [pkgManager, setPkgManager] = useState<"pnpm" | "npm" | "yarn" | "bun">("pnpm");

  const cliCommands: Record<string, string> = {
    pnpm: `pnpm dlx shadcn@latest add @ss-components/${variantId}`,
    npm: `npx shadcn@latest add @ss-components/${variantId}`,
    yarn: `npx shadcn@latest add @ss-components/${variantId}`,
    bun: `bunx --bun shadcn@latest add @ss-components/${variantId}`,
  };

  const copyCode = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (typeof document === "undefined") return null;

  return ReactDOM.createPortal(
    <>
      <div className="fixed inset-0 z-[100] bg-black/50" onClick={onClose} />
      <div className="fixed left-1/2 top-1/2 z-[101] w-full max-w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-lg border bg-background p-6 shadow-lg max-h-[85vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold">CLI Command</h2>
          <button onClick={onClose} className="rounded-md p-1 hover:bg-muted" aria-label="Close">
            <X className="h-4 w-4" />
          </button>
        </div>
        <div className="flex items-center gap-4 border-b mb-4">
          {(["pnpm", "npm", "yarn", "bun"] as const).map((pm) => (
            <button
              key={pm}
              onClick={() => setPkgManager(pm)}
              className={`pb-2 text-sm font-medium border-b-2 transition-colors ${
                pkgManager === pm
                  ? "border-foreground text-foreground"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              {pm}
            </button>
          ))}
          <span className="ml-auto text-xs text-muted-foreground">CLI v3</span>
        </div>
        <div className="relative mb-8">
          <pre className="rounded-lg bg-zinc-950 p-4 text-sm text-zinc-50 overflow-x-auto">
            <code>{cliCommands[pkgManager]}</code>
          </pre>
          <button
            onClick={() => { navigator.clipboard.writeText(cliCommands[pkgManager]); }}
            className="absolute top-3 right-3 rounded-md p-1.5 text-zinc-400 hover:text-zinc-50 transition-colors"
            aria-label="Copy CLI command"
          >
            <Copy className="h-4 w-4" />
          </button>
        </div>
        <h3 className="text-base font-semibold mb-4">Manual Code</h3>
        <div className="relative">
          <pre className="rounded-lg bg-zinc-950 p-4 text-sm text-zinc-50 overflow-x-auto max-h-[400px] overflow-y-auto">
            <code>{code}</code>
          </pre>
          <button
            onClick={copyCode}
            className="absolute top-3 right-3 rounded-md p-1.5 text-zinc-400 hover:text-zinc-50 transition-colors"
            aria-label="Copy code"
          >
            {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
          </button>
        </div>
      </div>
    </>,
    document.body
  );
}

// --- Variant Cell ---
function VariantCell({
  title,
  variantId,
  code,
  children,
  isLastCol,
}: {
  title: string;
  variantId: string;
  code: string;
  children: React.ReactNode;
  isLastCol: boolean;
}) {
  const [showCode, setShowCode] = useState(false);

  return (
    <div className={isLastCol ? "border-r-0" : ""}>
      <div className="group/item relative flex h-full min-h-[280px] items-center justify-center px-8 py-12 max-sm:px-4" data-slot={variantId}>
        <div className="w-full flex items-center justify-center">{children}</div>
        <TooltipProvider delayDuration={200}>
          <div className="absolute top-2 right-2 flex items-center gap-2">
            <Tooltip>
              <TooltipTrigger asChild>
                <button className="inline-flex size-9 shrink-0 items-center justify-center rounded-md text-muted-foreground hover:text-foreground cursor-pointer opacity-0 transition-none group-hover/item:opacity-100" aria-label="Copy prompt">
                  <Sparkles className="h-4 w-4" />
                </button>
              </TooltipTrigger>
              <TooltipContent>Copy prompt</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <button className="inline-flex size-9 shrink-0 items-center justify-center rounded-md text-muted-foreground hover:text-foreground cursor-pointer opacity-0 transition-none group-hover/item:opacity-100" aria-label="Open in v0">
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 4h6v6H4zM14 4h6v6h-6zM4 14h6v6H4zM14 14h6v6h-6z" />
                  </svg>
                </button>
              </TooltipTrigger>
              <TooltipContent>Open in v0</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <button onClick={() => setShowCode(true)} className="inline-flex size-9 shrink-0 items-center justify-center rounded-md text-muted-foreground hover:text-foreground cursor-pointer opacity-0 transition-none group-hover/item:opacity-100" aria-label="View code">
                  <Code2 className="h-4 w-4" />
                </button>
              </TooltipTrigger>
              <TooltipContent>View code</TooltipContent>
            </Tooltip>
          </div>
        </TooltipProvider>
        <div className="text-muted-foreground absolute top-3 left-4 hidden text-sm group-hover/item:block">
          {title}
        </div>
      </div>
      {showCode && <CodeModal code={code} onClose={() => setShowCode(false)} variantId={variantId} />}
    </div>
  );
}

// --- Carousel Variant Previews ---

function Carousel01() {
  return (
    <Carousel className="w-full max-w-xs">
      <CarouselContent>
        {Array.from({ length: 5 }).map((_, index) => (
          <CarouselItem key={index}>
            <Card>
              <CardContent className="flex aspect-square items-center justify-center p-6">
                <span className="text-4xl font-semibold">{index + 1}</span>
              </CardContent>
            </Card>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}

function Carousel02() {
  return (
    <Carousel className="w-full max-w-sm">
      <CarouselContent className="-ml-2 md:-ml-4">
        {Array.from({ length: 5 }).map((_, index) => (
          <CarouselItem key={index} className="pl-2 md:pl-4 md:basis-1/2">
            <Card>
              <CardContent className="flex aspect-square items-center justify-center p-6">
                <span className="text-3xl font-semibold">{index + 1}</span>
              </CardContent>
            </Card>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}

function Carousel03() {
  return (
    <Carousel className="w-full max-w-md">
      <CarouselContent className="-ml-2 md:-ml-4">
        {Array.from({ length: 6 }).map((_, index) => (
          <CarouselItem key={index} className="pl-2 md:pl-4 basis-1/3">
            <Card>
              <CardContent className="flex aspect-square items-center justify-center p-4">
                <span className="text-2xl font-semibold">{index + 1}</span>
              </CardContent>
            </Card>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}

function Carousel04() {
  return (
    <Carousel opts={{ loop: true }} className="w-full max-w-xs">
      <CarouselContent>
        {Array.from({ length: 5 }).map((_, index) => (
          <CarouselItem key={index}>
            <Card className="bg-gradient-to-br from-purple-500 to-pink-500">
              <CardContent className="flex aspect-square items-center justify-center p-6">
                <span className="text-4xl font-semibold text-white">{index + 1}</span>
              </CardContent>
            </Card>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}

function Carousel05() {
  const images = [
    "https://cdn.shadcnstudio.com/ss-assets/components/card/image-7.png",
    "https://cdn.shadcnstudio.com/ss-assets/components/card/image-4.png",
    "https://cdn.shadcnstudio.com/ss-assets/components/card/image-5.png",
  ];
  return (
    <Carousel className="w-full max-w-xs">
      <CarouselContent>
        {images.map((src, index) => (
          <CarouselItem key={index}>
            <div className="overflow-hidden rounded-lg">
              <img src={src} alt={`Slide ${index + 1}`} className="aspect-video w-full object-cover" />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}

function Carousel06() {
  return (
    <Carousel orientation="vertical" className="w-full max-w-xs">
      <CarouselContent className="-mt-4 h-[200px]">
        {Array.from({ length: 5 }).map((_, index) => (
          <CarouselItem key={index} className="pt-4 basis-1/2">
            <Card>
              <CardContent className="flex items-center justify-center p-6">
                <span className="text-2xl font-semibold">{index + 1}</span>
              </CardContent>
            </Card>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}

function Carousel07() {
  const testimonials = [
    { name: "John Doe", role: "CEO", quote: "This product changed our workflow completely." },
    { name: "Jane Smith", role: "Designer", quote: "Beautiful and intuitive design system." },
    { name: "Mike Johnson", role: "Developer", quote: "Easy to integrate and customize." },
  ];
  return (
    <Carousel className="w-full max-w-sm">
      <CarouselContent>
        {testimonials.map((t, index) => (
          <CarouselItem key={index}>
            <Card>
              <CardContent className="p-6 text-center">
                <p className="text-muted-foreground italic mb-4">&ldquo;{t.quote}&rdquo;</p>
                <p className="font-semibold">{t.name}</p>
                <p className="text-sm text-muted-foreground">{t.role}</p>
              </CardContent>
            </Card>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}

function Carousel08() {
  const products = [
    { name: "Product A", price: "$29.99" },
    { name: "Product B", price: "$39.99" },
    { name: "Product C", price: "$49.99" },
    { name: "Product D", price: "$59.99" },
  ];
  return (
    <Carousel className="w-full max-w-md">
      <CarouselContent className="-ml-2">
        {products.map((p, index) => (
          <CarouselItem key={index} className="pl-2 basis-1/2 md:basis-1/3">
            <Card>
              <CardContent className="p-4">
                <div className="aspect-square bg-muted rounded-md mb-2" />
                <p className="font-medium text-sm">{p.name}</p>
                <p className="text-sm text-muted-foreground">{p.price}</p>
              </CardContent>
            </Card>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}

// --- Code strings ---
const codes: Record<string, string> = {
  "carousel-01": `
export default function Carousel01() {
  return (
    <Carousel className="w-full max-w-xs">
      <CarouselContent>
        {Array.from({ length: 5 }).map((_, index) => (
          <CarouselItem key={index}>
            <Card>
              <CardContent className="flex aspect-square items-center justify-center p-6">
                <span className="text-4xl font-semibold">{index + 1}</span>
              </CardContent>
            </Card>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  )
}`,
};

function getCode(id: string) {
  return codes[id] || codes["carousel-01"]!;
}

// --- Variants ---
const variants = [
  { id: "carousel-01", title: "Carousel 1 - Basic", preview: <Carousel01 /> },
  { id: "carousel-02", title: "Carousel 2 - Two Items", preview: <Carousel02 /> },
  { id: "carousel-03", title: "Carousel 3 - Three Items", preview: <Carousel03 /> },
  { id: "carousel-04", title: "Carousel 4 - Loop & Gradient", preview: <Carousel04 /> },
  { id: "carousel-05", title: "Carousel 5 - Image Gallery", preview: <Carousel05 /> },
  { id: "carousel-06", title: "Carousel 6 - Vertical", preview: <Carousel06 /> },
  { id: "carousel-07", title: "Carousel 7 - Testimonials", preview: <Carousel07 /> },
  { id: "carousel-08", title: "Carousel 8 - Products", preview: <Carousel08 /> },
];

export default function CarouselPage() {
  return (
    <ComponentLayout>
      {/* Page Header */}
      <div className="mb-4 flex gap-x-8 gap-y-4 max-md:flex-col">
        <div className="space-y-3">
          <h1 className="text-2xl font-bold sm:text-3xl">Shadcn Carousel</h1>
          <p className="text-muted-foreground">
            Explore the collection of awesome Shadcn Carousel Components, featuring {variants.length} carousel
            variants designed for showcasing content built with React, Embla Carousel, and Tailwind CSS.
          </p>
        </div>
      </div>

      {/* Suggestion banner */}
      <div className="mb-8 flex items-start gap-3 rounded-lg border bg-muted/30 p-4">
        <svg className="mt-0.5 h-5 w-5 shrink-0 text-muted-foreground" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <circle cx="12" cy="12" r="10" />
          <path d="M12 16v-4M12 8h.01" />
        </svg>
        <div className="text-sm">
          <p className="font-medium">Have any suggestions for Carousel variants?</p>
          <p className="text-muted-foreground">Join our Discord community and share your ideas to help us improve and expand our component variants!</p>
        </div>
      </div>

      {/* Variants Grid */}
      <div className="group/grid grid grid-cols-1 divide-y divide-dashed md:grid-cols-2 md:divide-x">
        {variants.map((variant, i) => (
          <VariantCell
            key={variant.id}
            title={variant.title}
            variantId={variant.id}
            code={getCode(variant.id)}
            isLastCol={(i + 1) % 2 === 0}
          >
            {variant.preview}
          </VariantCell>
        ))}
      </div>
    </ComponentLayout>
  );
}
