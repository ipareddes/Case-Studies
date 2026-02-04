"use client";

import { Label, Slider, Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@ipareddes/ui-components";

import { ComponentLayout } from "@/components/layout/component-layout";
import { useState } from "react";
import { X, Sparkles, Code2, Copy, Check, Volume2, VolumeX, Sun, Moon } from "lucide-react";
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
      <div className="group/item relative flex h-full min-h-[210px] items-center justify-center px-8 py-12 max-sm:px-4" data-slot={variantId}>
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

// --- Slider Variant Previews ---

function Slider01() {
  return (
    <div className="w-full max-w-sm">
      <Slider defaultValue={[50]} max={100} step={1} />
    </div>
  );
}

function Slider02() {
  const [value, setValue] = useState([50]);
  return (
    <div className="w-full max-w-sm space-y-2">
      <div className="flex justify-between">
        <Label>Volume</Label>
        <span className="text-sm text-muted-foreground">{value}%</span>
      </div>
      <Slider value={value} onValueChange={setValue} max={100} step={1} />
    </div>
  );
}

function Slider03() {
  const [value, setValue] = useState([25, 75]);
  return (
    <div className="w-full max-w-sm space-y-2">
      <div className="flex justify-between">
        <Label>Price Range</Label>
        <span className="text-sm text-muted-foreground">${value[0]} - ${value[1]}</span>
      </div>
      <Slider value={value} onValueChange={setValue} max={100} step={1} />
    </div>
  );
}

function Slider04() {
  const [value, setValue] = useState([50]);
  return (
    <div className="w-full max-w-sm space-y-2">
      <Slider value={value} onValueChange={setValue} max={100} step={1} />
      <div className="flex justify-between text-xs text-muted-foreground">
        <span>0</span>
        <span>25</span>
        <span>50</span>
        <span>75</span>
        <span>100</span>
      </div>
    </div>
  );
}

function Slider05() {
  const [value, setValue] = useState([50]);
  return (
    <div className="w-full max-w-sm flex items-center gap-4">
      {value[0] === 0 ? <VolumeX className="h-5 w-5 text-muted-foreground" /> : <Volume2 className="h-5 w-5" />}
      <Slider value={value} onValueChange={setValue} max={100} step={1} className="flex-1" />
      <span className="text-sm w-10 text-right">{value}%</span>
    </div>
  );
}

function Slider06() {
  const [value, setValue] = useState([50]);
  return (
    <div className="w-full max-w-sm flex items-center gap-4">
      <Moon className="h-4 w-4 text-muted-foreground" />
      <Slider value={value} onValueChange={setValue} max={100} step={1} className="flex-1" />
      <Sun className="h-4 w-4 text-yellow-500" />
    </div>
  );
}

function Slider07() {
  const [value, setValue] = useState([50]);
  return (
    <div className="w-full max-w-sm space-y-4">
      <Label>Opacity</Label>
      <div className="flex items-center gap-4">
        <Slider value={value} onValueChange={setValue} max={100} step={1} className="flex-1" />
        <div
          className="h-10 w-10 rounded-md border"
          style={{ backgroundColor: `rgba(0, 0, 0, ${value[0] / 100})` }}
        />
      </div>
    </div>
  );
}

function Slider08() {
  const steps = ["S", "M", "L", "XL", "2XL"];
  const [value, setValue] = useState([2]);
  return (
    <div className="w-full max-w-sm space-y-4">
      <div className="flex justify-between">
        <Label>Size</Label>
        <span className="text-sm font-medium">{steps[value[0]]}</span>
      </div>
      <Slider value={value} onValueChange={setValue} max={4} step={1} />
      <div className="flex justify-between text-xs text-muted-foreground">
        {steps.map((step) => (
          <span key={step}>{step}</span>
        ))}
      </div>
    </div>
  );
}

function Slider09() {
  return (
    <div className="w-full max-w-sm">
      <Slider defaultValue={[50]} max={100} step={1} disabled className="opacity-50" />
    </div>
  );
}

function Slider10() {
  const [value, setValue] = useState([3]);
  const ratings = ["Poor", "Fair", "Good", "Very Good", "Excellent"];
  return (
    <div className="w-full max-w-sm space-y-4">
      <div className="flex justify-between">
        <Label>Rating</Label>
        <span className="text-sm font-medium text-primary">{ratings[value[0] - 1]}</span>
      </div>
      <Slider value={value} onValueChange={setValue} min={1} max={5} step={1} />
    </div>
  );
}

function Slider11() {
  const [value, setValue] = useState([50]);
  return (
    <div className="w-full max-w-xs">
      <Slider
        value={value}
        onValueChange={setValue}
        max={100}
        step={1}
        orientation="vertical"
        className="h-40"
      />
    </div>
  );
}

function Slider12() {
  const [value, setValue] = useState([30, 50, 80]);
  return (
    <div className="w-full max-w-sm space-y-2">
      <Label>Multi-point Slider</Label>
      <Slider value={value} onValueChange={setValue} max={100} step={1} />
      <div className="flex justify-between text-xs text-muted-foreground">
        {value.map((v, i) => (
          <span key={i}>Point {i + 1}: {v}</span>
        ))}
      </div>
    </div>
  );
}

// --- Code strings ---
const codes: Record<string, string> = {
  "slider-01": `
export default function Slider01() {
  return <Slider defaultValue={[50]} max={100} step={1} />
}`,
  "slider-02": `import { useState } from "react"

export default function Slider02() {
  const [value, setValue] = useState([50])
  return (
    <div className="space-y-2">
      <div className="flex justify-between">
        <Label>Volume</Label>
        <span className="text-sm text-muted-foreground">{value}%</span>
      </div>
      <Slider value={value} onValueChange={setValue} max={100} step={1} />
    </div>
  )
}`,
};

function getCode(id: string) {
  return codes[id] || codes["slider-01"]!;
}

// --- Variants ---
const variants = [
  { id: "slider-01", title: "Slider 1 - Basic", preview: <Slider01 /> },
  { id: "slider-02", title: "Slider 2 - With Label & Value", preview: <Slider02 /> },
  { id: "slider-03", title: "Slider 3 - Range", preview: <Slider03 /> },
  { id: "slider-04", title: "Slider 4 - With Ticks", preview: <Slider04 /> },
  { id: "slider-05", title: "Slider 5 - Volume Control", preview: <Slider05 /> },
  { id: "slider-06", title: "Slider 6 - Brightness", preview: <Slider06 /> },
  { id: "slider-07", title: "Slider 7 - Opacity Preview", preview: <Slider07 /> },
  { id: "slider-08", title: "Slider 8 - Size Selector", preview: <Slider08 /> },
  { id: "slider-09", title: "Slider 9 - Disabled", preview: <Slider09 /> },
  { id: "slider-10", title: "Slider 10 - Rating", preview: <Slider10 /> },
  { id: "slider-11", title: "Slider 11 - Vertical", preview: <Slider11 /> },
  { id: "slider-12", title: "Slider 12 - Multi-point", preview: <Slider12 /> },
];

export default function SliderPage() {
  return (
    <ComponentLayout>
      {/* Page Header */}
      <div className="mb-4 flex gap-x-8 gap-y-4 max-md:flex-col">
        <div className="space-y-3">
          <h1 className="text-2xl font-bold sm:text-3xl">Shadcn Slider</h1>
          <p className="text-muted-foreground">
            Explore the collection of awesome Shadcn Slider Components, featuring {variants.length} slider
            variants designed for customizable range inputs built with React and Tailwind CSS.
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
          <p className="font-medium">Have any suggestions for Slider variants?</p>
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
