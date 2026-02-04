"use client";

import { Toggle, ToggleGroup, ToggleGroupItem, Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@ipareddes/ui-components";

import { ComponentLayout } from "@/components/layout/component-layout";
import { useState } from "react";
import { X, Sparkles, Code2, Copy, Check, Bold, Italic, Underline, AlignLeft, AlignCenter, AlignRight, AlignJustify, List, ListOrdered, Grid, LayoutGrid, Moon, Sun, Wifi, WifiOff, Mic, MicOff, Video, VideoOff, Pin, Star, Heart, Bookmark } from "lucide-react";
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

// --- Toggle Variant Previews ---

function Toggle01() {
  return (
    <Toggle aria-label="Toggle bold">
      <Bold className="h-4 w-4" />
    </Toggle>
  );
}

function Toggle02() {
  return (
    <Toggle variant="outline" aria-label="Toggle italic">
      <Italic className="h-4 w-4" />
    </Toggle>
  );
}

function Toggle03() {
  return (
    <div className="flex gap-1">
      <Toggle aria-label="Toggle bold">
        <Bold className="h-4 w-4" />
      </Toggle>
      <Toggle aria-label="Toggle italic">
        <Italic className="h-4 w-4" />
      </Toggle>
      <Toggle aria-label="Toggle underline">
        <Underline className="h-4 w-4" />
      </Toggle>
    </div>
  );
}

function Toggle04() {
  return (
    <ToggleGroup type="single" defaultValue="center">
      <ToggleGroupItem value="left" aria-label="Align left">
        <AlignLeft className="h-4 w-4" />
      </ToggleGroupItem>
      <ToggleGroupItem value="center" aria-label="Align center">
        <AlignCenter className="h-4 w-4" />
      </ToggleGroupItem>
      <ToggleGroupItem value="right" aria-label="Align right">
        <AlignRight className="h-4 w-4" />
      </ToggleGroupItem>
      <ToggleGroupItem value="justify" aria-label="Align justify">
        <AlignJustify className="h-4 w-4" />
      </ToggleGroupItem>
    </ToggleGroup>
  );
}

function Toggle05() {
  return (
    <ToggleGroup type="multiple" defaultValue={["bold", "italic"]}>
      <ToggleGroupItem value="bold" aria-label="Toggle bold">
        <Bold className="h-4 w-4" />
      </ToggleGroupItem>
      <ToggleGroupItem value="italic" aria-label="Toggle italic">
        <Italic className="h-4 w-4" />
      </ToggleGroupItem>
      <ToggleGroupItem value="underline" aria-label="Toggle underline">
        <Underline className="h-4 w-4" />
      </ToggleGroupItem>
    </ToggleGroup>
  );
}

function Toggle06() {
  return (
    <ToggleGroup type="single" variant="outline" defaultValue="list">
      <ToggleGroupItem value="list" aria-label="List view">
        <List className="h-4 w-4" />
      </ToggleGroupItem>
      <ToggleGroupItem value="ordered" aria-label="Ordered list">
        <ListOrdered className="h-4 w-4" />
      </ToggleGroupItem>
    </ToggleGroup>
  );
}

function Toggle07() {
  return (
    <ToggleGroup type="single" defaultValue="grid" className="rounded-lg border p-1">
      <ToggleGroupItem value="grid" aria-label="Grid view" className="rounded-md">
        <Grid className="h-4 w-4" />
      </ToggleGroupItem>
      <ToggleGroupItem value="layout" aria-label="Layout view" className="rounded-md">
        <ToggleGroupItem value="layout" aria-label="Layout view" className="rounded-md">
          <LayoutGrid className="h-4 w-4" />
        </ToggleGroupItem>
      </ToggleGroupItem>
    </ToggleGroup>
  );
}

function Toggle08() {
  return (
    <Toggle size="sm" aria-label="Toggle pin">
      <Pin className="h-3 w-3" />
      <span className="ml-1 text-xs">Pin</span>
    </Toggle>
  );
}

function Toggle09() {
  return (
    <Toggle size="lg" aria-label="Toggle bookmark">
      <Bookmark className="h-5 w-5" />
      <span className="ml-2">Bookmark</span>
    </Toggle>
  );
}

function Toggle10() {
  const [pressed, setPressed] = useState(false);
  return (
    <Toggle
      pressed={pressed}
      onPressedChange={setPressed}
      aria-label="Toggle favorite"
      className="data-[state=on]:bg-red-100 data-[state=on]:text-red-600"
    >
      <Heart className={`h-4 w-4 ${pressed ? "fill-current" : ""}`} />
    </Toggle>
  );
}

function Toggle11() {
  const [pressed, setPressed] = useState(false);
  return (
    <Toggle
      pressed={pressed}
      onPressedChange={setPressed}
      aria-label="Toggle star"
      className="data-[state=on]:bg-yellow-100 data-[state=on]:text-yellow-600"
    >
      <Star className={`h-4 w-4 ${pressed ? "fill-current" : ""}`} />
    </Toggle>
  );
}

function Toggle12() {
  return (
    <div className="flex items-center gap-2">
      <Toggle aria-label="Toggle mic" defaultPressed>
        <Mic className="h-4 w-4" />
      </Toggle>
      <Toggle aria-label="Toggle video" defaultPressed>
        <Video className="h-4 w-4" />
      </Toggle>
    </div>
  );
}

function Toggle13() {
  return (
    <Toggle disabled aria-label="Toggle wifi (disabled)">
      <Wifi className="h-4 w-4" />
    </Toggle>
  );
}

function Toggle14() {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  return (
    <Toggle
      pressed={theme === "dark"}
      onPressedChange={(pressed) => setTheme(pressed ? "dark" : "light")}
      aria-label="Toggle theme"
      className="w-20"
    >
      {theme === "dark" ? <Moon className="h-4 w-4 mr-2" /> : <Sun className="h-4 w-4 mr-2" />}
      {theme === "dark" ? "Dark" : "Light"}
    </Toggle>
  );
}

function Toggle15() {
  return (
    <ToggleGroup type="single" defaultValue="monthly" className="bg-muted p-1 rounded-lg">
      <ToggleGroupItem value="monthly" className="rounded-md px-4 data-[state=on]:bg-background data-[state=on]:shadow-sm">
        Monthly
      </ToggleGroupItem>
      <ToggleGroupItem value="yearly" className="rounded-md px-4 data-[state=on]:bg-background data-[state=on]:shadow-sm">
        Yearly
      </ToggleGroupItem>
    </ToggleGroup>
  );
}

function Toggle16() {
  return (
    <ToggleGroup type="single" defaultValue="s" className="gap-2">
      {["XS", "S", "M", "L", "XL"].map((size) => (
        <ToggleGroupItem
          key={size}
          value={size.toLowerCase()}
          className="w-10 h-10 rounded-full border data-[state=on]:bg-primary data-[state=on]:text-primary-foreground"
        >
          {size}
        </ToggleGroupItem>
      ))}
    </ToggleGroup>
  );
}

// --- Code strings ---
const codes: Record<string, string> = {
  "toggle-01": `import { Bold } from "lucide-react"

export default function Toggle01() {
  return (
    <Toggle aria-label="Toggle bold">
      <Bold className="h-4 w-4" />
    </Toggle>
  )
}`,
  "toggle-04": `import { AlignLeft, AlignCenter, AlignRight, AlignJustify } from "lucide-react"

export default function Toggle04() {
  return (
    <ToggleGroup type="single" defaultValue="center">
      <ToggleGroupItem value="left" aria-label="Align left">
        <AlignLeft className="h-4 w-4" />
      </ToggleGroupItem>
      <ToggleGroupItem value="center" aria-label="Align center">
        <AlignCenter className="h-4 w-4" />
      </ToggleGroupItem>
      <ToggleGroupItem value="right" aria-label="Align right">
        <AlignRight className="h-4 w-4" />
      </ToggleGroupItem>
      <ToggleGroupItem value="justify" aria-label="Align justify">
        <AlignJustify className="h-4 w-4" />
      </ToggleGroupItem>
    </ToggleGroup>
  )
}`,
};

function getCode(id: string) {
  return codes[id] || codes["toggle-01"]!;
}

// --- Variants ---
const variants = [
  { id: "toggle-01", title: "Toggle 1 - Basic", preview: <Toggle01 /> },
  { id: "toggle-02", title: "Toggle 2 - Outline", preview: <Toggle02 /> },
  { id: "toggle-03", title: "Toggle 3 - Text Formatting", preview: <Toggle03 /> },
  { id: "toggle-04", title: "Toggle 4 - Alignment Group", preview: <Toggle04 /> },
  { id: "toggle-05", title: "Toggle 5 - Multiple Selection", preview: <Toggle05 /> },
  { id: "toggle-06", title: "Toggle 6 - List Type", preview: <Toggle06 /> },
  { id: "toggle-07", title: "Toggle 7 - View Switcher", preview: <Toggle07 /> },
  { id: "toggle-08", title: "Toggle 8 - Small with Text", preview: <Toggle08 /> },
  { id: "toggle-09", title: "Toggle 9 - Large with Text", preview: <Toggle09 /> },
  { id: "toggle-10", title: "Toggle 10 - Favorite", preview: <Toggle10 /> },
  { id: "toggle-11", title: "Toggle 11 - Star Rating", preview: <Toggle11 /> },
  { id: "toggle-12", title: "Toggle 12 - Media Controls", preview: <Toggle12 /> },
  { id: "toggle-13", title: "Toggle 13 - Disabled", preview: <Toggle13 /> },
  { id: "toggle-14", title: "Toggle 14 - Theme Switch", preview: <Toggle14 /> },
  { id: "toggle-15", title: "Toggle 15 - Pricing Toggle", preview: <Toggle15 /> },
  { id: "toggle-16", title: "Toggle 16 - Size Selector", preview: <Toggle16 /> },
];

export default function TogglePage() {
  return (
    <ComponentLayout>
      {/* Page Header */}
      <div className="mb-4 flex gap-x-8 gap-y-4 max-md:flex-col">
        <div className="space-y-3">
          <h1 className="text-2xl font-bold sm:text-3xl">Shadcn Toggle</h1>
          <p className="text-muted-foreground">
            Explore the collection of awesome Shadcn Toggle Components, featuring {variants.length} toggle
            variants designed for on/off states and option selection built with React and Tailwind CSS.
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
          <p className="font-medium">Have any suggestions for Toggle variants?</p>
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
