"use client";

import { Popover, PopoverContent, PopoverTrigger, Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@ipareddes/ui-components";

import { ComponentLayout } from "@/components/layout/component-layout";
import { useState } from "react";
import { X, Sparkles, Code2, Copy, Check, Star, PencilRuler, DollarSign, Volume2, Info, Download, FileWarning, MessageCircle, FunnelPlus, Search, Bell, MapPin } from "lucide-react";
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
        <div className="w-full">{children}</div>
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

// --- Popover Variant Previews ---

function Popover01() {
  return (
    <div className="flex items-center justify-center">
      <Popover>
        <PopoverTrigger asChild>
          <button className="inline-flex shrink-0 items-center justify-center gap-2 rounded-md border bg-background hover:bg-accent hover:text-accent-foreground shadow-xs size-9">
            <Star className="h-4 w-4" />
            <span className="sr-only">Ratings &amp; reviews</span>
          </button>
        </PopoverTrigger>
        <PopoverContent className="w-80">
          <div className="grid gap-4">
            <div className="space-y-2">
              <h4 className="font-medium leading-none">Ratings &amp; Reviews</h4>
              <p className="text-sm text-muted-foreground">Rate your experience with this product.</p>
            </div>
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star key={star} className="h-5 w-5 cursor-pointer text-muted-foreground hover:text-yellow-500 transition-colors" />
              ))}
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}

function Popover02() {
  return (
    <div className="flex items-center justify-center">
      <Popover>
        <PopoverTrigger asChild>
          <button className="inline-flex shrink-0 items-center justify-center gap-2 rounded-md border bg-background hover:bg-accent hover:text-accent-foreground shadow-xs size-9">
            <PencilRuler className="h-4 w-4" />
            <span className="sr-only">Dimensions</span>
          </button>
        </PopoverTrigger>
        <PopoverContent className="w-80">
          <div className="grid gap-4">
            <div className="space-y-2">
              <h4 className="font-medium leading-none">Dimensions</h4>
              <p className="text-sm text-muted-foreground">Set the dimensions for the layer.</p>
            </div>
            <div className="grid gap-2">
              <div className="grid grid-cols-3 items-center gap-4">
                <label className="text-sm" htmlFor="width">Width</label>
                <input id="width" defaultValue="100%" className="col-span-2 h-8 rounded-md border bg-transparent px-3 text-sm" />
              </div>
              <div className="grid grid-cols-3 items-center gap-4">
                <label className="text-sm" htmlFor="maxWidth">Max. width</label>
                <input id="maxWidth" defaultValue="300px" className="col-span-2 h-8 rounded-md border bg-transparent px-3 text-sm" />
              </div>
              <div className="grid grid-cols-3 items-center gap-4">
                <label className="text-sm" htmlFor="height">Height</label>
                <input id="height" defaultValue="25px" className="col-span-2 h-8 rounded-md border bg-transparent px-3 text-sm" />
              </div>
              <div className="grid grid-cols-3 items-center gap-4">
                <label className="text-sm" htmlFor="maxHeight">Max. height</label>
                <input id="maxHeight" defaultValue="none" className="col-span-2 h-8 rounded-md border bg-transparent px-3 text-sm" />
              </div>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}

function Popover03() {
  return (
    <div className="flex items-center justify-center">
      <Popover>
        <PopoverTrigger asChild>
          <button className="inline-flex shrink-0 items-center justify-center gap-2 rounded-md border bg-background hover:bg-accent hover:text-accent-foreground shadow-xs size-9">
            <DollarSign className="h-4 w-4" />
            <span className="sr-only">Pricing details</span>
          </button>
        </PopoverTrigger>
        <PopoverContent className="w-80">
          <div className="grid gap-4">
            <div className="space-y-2">
              <h4 className="font-medium leading-none">Pricing Details</h4>
              <p className="text-sm text-muted-foreground">View and configure pricing options.</p>
            </div>
            <div className="grid gap-2">
              <div className="flex items-center justify-between">
                <span className="text-sm">Subtotal</span>
                <span className="text-sm font-medium">$49.00</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Tax</span>
                <span className="text-sm font-medium">$4.90</span>
              </div>
              <div className="border-t pt-2 flex items-center justify-between">
                <span className="text-sm font-medium">Total</span>
                <span className="text-sm font-bold">$53.90</span>
              </div>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}

function Popover04() {
  return (
    <div className="flex items-center justify-center">
      <Popover>
        <PopoverTrigger asChild>
          <button className="inline-flex shrink-0 items-center justify-center gap-2 rounded-md border bg-background hover:bg-accent hover:text-accent-foreground shadow-xs size-9">
            <Volume2 className="h-4 w-4" />
            <span className="sr-only">Volume control</span>
          </button>
        </PopoverTrigger>
        <PopoverContent className="w-64">
          <div className="grid gap-4">
            <div className="space-y-2">
              <h4 className="font-medium leading-none">Volume</h4>
              <p className="text-sm text-muted-foreground">Adjust the volume level.</p>
            </div>
            <input type="range" min="0" max="100" defaultValue="75" className="w-full accent-primary" />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>0%</span>
              <span>75%</span>
              <span>100%</span>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}

function Popover05() {
  return (
    <div className="flex items-center justify-center">
      <Popover>
        <PopoverTrigger asChild>
          <button className="inline-flex shrink-0 items-center justify-center gap-2 rounded-md border bg-background hover:bg-accent hover:text-accent-foreground shadow-xs size-9">
            <Info className="h-4 w-4" />
            <span className="sr-only">About Shadcn Studio</span>
          </button>
        </PopoverTrigger>
        <PopoverContent className="w-80">
          <div className="grid gap-4">
            <div className="space-y-2">
              <h4 className="font-medium leading-none">Shadcn Studio</h4>
              <p className="text-sm text-muted-foreground">A collection of beautifully crafted components built with Radix UI and Tailwind CSS.</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold">v1.0</span>
              <span className="text-xs text-muted-foreground">MIT License</span>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}

function Popover06() {
  return (
    <div className="flex items-center justify-center">
      <Popover>
        <PopoverTrigger asChild>
          <button className="inline-flex shrink-0 items-center justify-center gap-2 rounded-md border bg-background hover:bg-accent hover:text-accent-foreground shadow-xs size-9">
            <Download className="h-4 w-4" />
            <span className="sr-only">Download File</span>
          </button>
        </PopoverTrigger>
        <PopoverContent className="w-72">
          <div className="grid gap-4">
            <div className="space-y-2">
              <h4 className="font-medium leading-none">Download File</h4>
              <p className="text-sm text-muted-foreground">Choose your preferred format.</p>
            </div>
            <div className="grid gap-2">
              <button className="flex items-center justify-between rounded-md border px-3 py-2 text-sm hover:bg-muted transition-colors">
                <span>PDF</span>
                <span className="text-muted-foreground text-xs">2.4 MB</span>
              </button>
              <button className="flex items-center justify-between rounded-md border px-3 py-2 text-sm hover:bg-muted transition-colors">
                <span>CSV</span>
                <span className="text-muted-foreground text-xs">1.1 MB</span>
              </button>
              <button className="flex items-center justify-between rounded-md border px-3 py-2 text-sm hover:bg-muted transition-colors">
                <span>JSON</span>
                <span className="text-muted-foreground text-xs">0.8 MB</span>
              </button>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}

function Popover07() {
  return (
    <div className="flex items-center justify-center">
      <Popover>
        <PopoverTrigger asChild>
          <button className="inline-flex shrink-0 items-center justify-center gap-2 rounded-md border bg-background hover:bg-accent hover:text-accent-foreground shadow-xs size-9">
            <FileWarning className="h-4 w-4" />
            <span className="sr-only">Delete File</span>
          </button>
        </PopoverTrigger>
        <PopoverContent className="w-72">
          <div className="grid gap-4">
            <div className="space-y-2">
              <h4 className="font-medium leading-none text-destructive">Delete File</h4>
              <p className="text-sm text-muted-foreground">Are you sure you want to delete this file? This action cannot be undone.</p>
            </div>
            <div className="flex items-center gap-2">
              <button className="inline-flex flex-1 items-center justify-center rounded-md border px-3 py-1.5 text-sm font-medium hover:bg-muted transition-colors">Cancel</button>
              <button className="inline-flex flex-1 items-center justify-center rounded-md bg-destructive text-white px-3 py-1.5 text-sm font-medium hover:bg-destructive/90 transition-colors">Delete</button>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}

function Popover08() {
  return (
    <div className="flex items-center justify-center">
      <Popover>
        <PopoverTrigger asChild>
          <button className="inline-flex shrink-0 items-center justify-center gap-2 rounded-md border bg-background hover:bg-accent hover:text-accent-foreground shadow-xs size-9">
            <MessageCircle className="h-4 w-4" />
            <span className="sr-only">Feedback</span>
          </button>
        </PopoverTrigger>
        <PopoverContent className="w-80">
          <div className="grid gap-4">
            <div className="space-y-2">
              <h4 className="font-medium leading-none">Send Feedback</h4>
              <p className="text-sm text-muted-foreground">We&apos;d love to hear your thoughts.</p>
            </div>
            <textarea className="min-h-[80px] w-full rounded-md border bg-transparent px-3 py-2 text-sm placeholder:text-muted-foreground" placeholder="Tell us what you think..." />
            <button className="inline-flex items-center justify-center rounded-md bg-primary text-primary-foreground px-3 py-1.5 text-sm font-medium hover:bg-primary/90 transition-colors">Submit</button>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}

function Popover09() {
  return (
    <div className="flex items-center justify-center">
      <Popover>
        <PopoverTrigger asChild>
          <button className="inline-flex shrink-0 items-center justify-center gap-2 rounded-md border bg-background hover:bg-accent hover:text-accent-foreground shadow-xs size-9">
            <FunnelPlus className="h-4 w-4" />
            <span className="sr-only">Filter</span>
          </button>
        </PopoverTrigger>
        <PopoverContent className="w-72">
          <div className="grid gap-4">
            <div className="space-y-2">
              <h4 className="font-medium leading-none">Filters</h4>
              <p className="text-sm text-muted-foreground">Narrow down your results.</p>
            </div>
            <div className="grid gap-3">
              <div className="flex items-center gap-2">
                <input type="checkbox" id="filter-active" className="rounded border" defaultChecked />
                <label htmlFor="filter-active" className="text-sm">Active</label>
              </div>
              <div className="flex items-center gap-2">
                <input type="checkbox" id="filter-draft" className="rounded border" />
                <label htmlFor="filter-draft" className="text-sm">Draft</label>
              </div>
              <div className="flex items-center gap-2">
                <input type="checkbox" id="filter-archived" className="rounded border" />
                <label htmlFor="filter-archived" className="text-sm">Archived</label>
              </div>
            </div>
            <button className="inline-flex items-center justify-center rounded-md bg-primary text-primary-foreground px-3 py-1.5 text-sm font-medium hover:bg-primary/90 transition-colors">Apply Filters</button>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}

function Popover10() {
  return (
    <div className="flex items-center justify-center">
      <Popover>
        <PopoverTrigger asChild>
          <button className="inline-flex shrink-0 items-center justify-center gap-2 rounded-md border bg-background hover:bg-accent hover:text-accent-foreground shadow-xs size-9">
            <Search className="h-4 w-4" />
            <span className="sr-only">Search users</span>
          </button>
        </PopoverTrigger>
        <PopoverContent className="w-72">
          <div className="grid gap-3">
            <input type="text" className="h-9 w-full rounded-md border bg-transparent px-3 text-sm placeholder:text-muted-foreground" placeholder="Search users..." />
            <div className="grid gap-1">
              {["Alice Johnson", "Bob Smith", "Charlie Brown"].map((name) => (
                <button key={name} className="flex items-center gap-2 rounded-md px-2 py-1.5 text-sm hover:bg-muted transition-colors">
                  <span className="flex size-6 items-center justify-center rounded-full bg-muted text-xs font-bold">{name[0]}</span>
                  <span>{name}</span>
                </button>
              ))}
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}

function Popover11() {
  return (
    <div className="flex items-center justify-center">
      <Popover>
        <PopoverTrigger asChild>
          <button className="inline-flex shrink-0 items-center justify-center gap-2 rounded-md border bg-background hover:bg-accent hover:text-accent-foreground shadow-xs size-9 relative">
            <Bell className="h-4 w-4" />
            <span className="absolute -top-1 -right-1 flex size-4 items-center justify-center rounded-full bg-destructive text-[10px] font-bold text-white">3</span>
            <span className="sr-only">Notifications</span>
          </button>
        </PopoverTrigger>
        <PopoverContent className="w-80">
          <div className="grid gap-4">
            <div className="flex items-center justify-between">
              <h4 className="font-medium leading-none">Notifications</h4>
              <button className="text-xs text-muted-foreground hover:text-foreground">Mark all read</button>
            </div>
            <div className="grid gap-2">
              {[
                { title: "New comment", desc: "Sarah commented on your post", time: "2m ago" },
                { title: "New follower", desc: "John started following you", time: "1h ago" },
                { title: "Mention", desc: "You were mentioned in #general", time: "3h ago" },
              ].map((n) => (
                <div key={n.title} className="flex items-start gap-3 rounded-md p-2 hover:bg-muted transition-colors cursor-pointer">
                  <span className="mt-0.5 flex size-2 rounded-full bg-primary shrink-0" />
                  <div className="grid gap-0.5">
                    <span className="text-sm font-medium">{n.title}</span>
                    <span className="text-xs text-muted-foreground">{n.desc}</span>
                    <span className="text-xs text-muted-foreground">{n.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}

function Popover12() {
  return (
    <div className="flex items-center justify-center">
      <Popover>
        <PopoverTrigger asChild>
          <button className="inline-flex shrink-0 items-center justify-center gap-2 rounded-md border bg-background hover:bg-accent hover:text-accent-foreground shadow-xs size-9">
            <MapPin className="h-4 w-4" />
            <span className="sr-only">About Himalayas</span>
          </button>
        </PopoverTrigger>
        <PopoverContent className="w-80">
          <div className="grid gap-4">
            <div className="space-y-2">
              <h4 className="font-medium leading-none">Himalayas</h4>
              <p className="text-sm text-muted-foreground">The Himalayas are a mountain range in Asia, separating the plains of the Indian subcontinent from the Tibetan Plateau.</p>
            </div>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div>
                <span className="text-muted-foreground">Highest peak</span>
                <p className="font-medium">Mt. Everest</p>
              </div>
              <div>
                <span className="text-muted-foreground">Elevation</span>
                <p className="font-medium">8,849 m</p>
              </div>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}

function Popover13() {
  return (
    <div className="flex items-center justify-center">
      <Popover>
        <PopoverTrigger asChild>
          <button className="inline-flex items-center justify-center gap-2 rounded-md border bg-background hover:bg-accent hover:text-accent-foreground shadow-xs h-9 px-4 py-2 text-sm font-medium">
            Slide-in from left
          </button>
        </PopoverTrigger>
        <PopoverContent side="left" className="w-64">
          <div className="grid gap-2">
            <h4 className="font-medium leading-none">Left Panel</h4>
            <p className="text-sm text-muted-foreground">This popover slides in from the left side.</p>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}

function Popover14() {
  return (
    <div className="flex items-center justify-center">
      <Popover>
        <PopoverTrigger asChild>
          <button className="inline-flex items-center justify-center gap-2 rounded-md border bg-background hover:bg-accent hover:text-accent-foreground shadow-xs h-9 px-4 py-2 text-sm font-medium">
            Slide-in from bottom
          </button>
        </PopoverTrigger>
        <PopoverContent side="bottom" className="w-64">
          <div className="grid gap-2">
            <h4 className="font-medium leading-none">Bottom Panel</h4>
            <p className="text-sm text-muted-foreground">This popover slides in from the bottom.</p>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}

function Popover15() {
  return (
    <div className="flex items-center justify-center">
      <Popover>
        <PopoverTrigger asChild>
          <button className="inline-flex items-center justify-center gap-2 rounded-md border bg-background hover:bg-accent hover:text-accent-foreground shadow-xs h-9 px-4 py-2 text-sm font-medium">
            Zoom in
          </button>
        </PopoverTrigger>
        <PopoverContent className="w-64">
          <div className="grid gap-2">
            <h4 className="font-medium leading-none">Zoom Effect</h4>
            <p className="text-sm text-muted-foreground">This popover appears with a zoom-in animation effect.</p>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}

// --- Code strings ---
const codes: Record<string, string> = {
  "popover-01": `import { Star } from "lucide-react"

export default function Popover01() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <button className="inline-flex shrink-0 items-center justify-center gap-2 rounded-md border bg-background hover:bg-accent hover:text-accent-foreground shadow-xs size-9">
          <Star className="h-4 w-4" />
          <span className="sr-only">Ratings & reviews</span>
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="font-medium leading-none">Ratings & Reviews</h4>
            <p className="text-sm text-muted-foreground">Rate your experience with this product.</p>
          </div>
          <div className="flex items-center gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star key={star} className="h-5 w-5 cursor-pointer text-muted-foreground hover:text-yellow-500 transition-colors" />
            ))}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}`,
  "popover-02": `import { PencilRuler } from "lucide-react"

export default function Popover02() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <button className="inline-flex shrink-0 items-center justify-center gap-2 rounded-md border bg-background hover:bg-accent hover:text-accent-foreground shadow-xs size-9">
          <PencilRuler className="h-4 w-4" />
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="font-medium leading-none">Dimensions</h4>
            <p className="text-sm text-muted-foreground">Set the dimensions for the layer.</p>
          </div>
          <div className="grid gap-2">
            <div className="grid grid-cols-3 items-center gap-4">
              <label className="text-sm">Width</label>
              <input defaultValue="100%" className="col-span-2 h-8 rounded-md border bg-transparent px-3 text-sm" />
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              <label className="text-sm">Max. width</label>
              <input defaultValue="300px" className="col-span-2 h-8 rounded-md border bg-transparent px-3 text-sm" />
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}`,
  "popover-07": `import { FileWarning } from "lucide-react"

export default function Popover07() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <button className="inline-flex shrink-0 items-center justify-center gap-2 rounded-md border bg-background hover:bg-accent hover:text-accent-foreground shadow-xs size-9">
          <FileWarning className="h-4 w-4" />
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-72">
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="font-medium leading-none text-destructive">Delete File</h4>
            <p className="text-sm text-muted-foreground">Are you sure you want to delete this file? This action cannot be undone.</p>
          </div>
          <div className="flex items-center gap-2">
            <button className="inline-flex flex-1 items-center justify-center rounded-md border px-3 py-1.5 text-sm font-medium hover:bg-muted transition-colors">Cancel</button>
            <button className="inline-flex flex-1 items-center justify-center rounded-md bg-destructive text-white px-3 py-1.5 text-sm font-medium hover:bg-destructive/90 transition-colors">Delete</button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}`,
  "popover-11": `import { Bell } from "lucide-react"

export default function Popover11() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <button className="inline-flex shrink-0 items-center justify-center gap-2 rounded-md border bg-background hover:bg-accent hover:text-accent-foreground shadow-xs size-9 relative">
          <Bell className="h-4 w-4" />
          <span className="absolute -top-1 -right-1 flex size-4 items-center justify-center rounded-full bg-destructive text-[10px] font-bold text-white">3</span>
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="grid gap-4">
          <div className="flex items-center justify-between">
            <h4 className="font-medium leading-none">Notifications</h4>
            <button className="text-xs text-muted-foreground hover:text-foreground">Mark all read</button>
          </div>
          <div className="grid gap-2">
            <div className="flex items-start gap-3 rounded-md p-2 hover:bg-muted transition-colors cursor-pointer">
              <span className="mt-0.5 flex size-2 rounded-full bg-primary shrink-0" />
              <div className="grid gap-0.5">
                <span className="text-sm font-medium">New comment</span>
                <span className="text-xs text-muted-foreground">Sarah commented on your post</span>
              </div>
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}`,
  "popover-13": `
export default function Popover13() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <button className="inline-flex items-center justify-center gap-2 rounded-md border bg-background hover:bg-accent hover:text-accent-foreground shadow-xs h-9 px-4 py-2 text-sm font-medium">
          Slide-in from left
        </button>
      </PopoverTrigger>
      <PopoverContent side="left" className="w-64">
        <div className="grid gap-2">
          <h4 className="font-medium leading-none">Left Panel</h4>
          <p className="text-sm text-muted-foreground">This popover slides in from the left side.</p>
        </div>
      </PopoverContent>
    </Popover>
  )
}`,
};

function getCode(id: string) {
  return codes[id] || codes["popover-01"]!.replace("Popover01", id.replace("popover-", "Popover"));
}

// --- Variants ---
const variants = [
  { id: "popover-01", title: "Popover 1", preview: <Popover01 /> },
  { id: "popover-02", title: "Popover 2", preview: <Popover02 /> },
  { id: "popover-03", title: "Popover 3", preview: <Popover03 /> },
  { id: "popover-04", title: "Popover 4", preview: <Popover04 /> },
  { id: "popover-05", title: "Popover 5", preview: <Popover05 /> },
  { id: "popover-06", title: "Popover 6", preview: <Popover06 /> },
  { id: "popover-07", title: "Popover 7", preview: <Popover07 /> },
  { id: "popover-08", title: "Popover 8", preview: <Popover08 /> },
  { id: "popover-09", title: "Popover 9", preview: <Popover09 /> },
  { id: "popover-10", title: "Popover 10", preview: <Popover10 /> },
  { id: "popover-11", title: "Popover 11", preview: <Popover11 /> },
  { id: "popover-12", title: "Popover 12", preview: <Popover12 /> },
  { id: "popover-13", title: "Popover 13", preview: <Popover13 /> },
  { id: "popover-14", title: "Popover 14", preview: <Popover14 /> },
  { id: "popover-15", title: "Popover 15", preview: <Popover15 /> },
];

export default function PopoverPage() {
  return (
    <ComponentLayout>
      {/* Page Header */}
      <div className="mb-4 flex gap-x-8 gap-y-4 max-md:flex-col">
        <div className="space-y-3">
          <h1 className="text-2xl font-bold sm:text-3xl">Shadcn Popover</h1>
          <p className="text-muted-foreground">
            Explore the collection of awesome Shadcn Popover Components, featuring {variants.length} popover
            variants designed for customizable, and interactive UI elements built with React and Tailwind CSS.
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
          <p className="font-medium">Have any suggestions for Popover variants?</p>
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
