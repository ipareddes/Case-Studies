"use client";

import { ComponentLayout } from "@/components/layout/component-layout";
import { useState } from "react";
import { X, Sparkles, Code2, Copy, Check, Book, Heart, Gift } from "lucide-react";
import ReactDOM from "react-dom";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

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

// --- Tabs Variant Previews ---

function Tabs01() {
  return (
    <div className="w-full max-w-md">
      <Tabs defaultValue="explore" className="flex flex-col gap-2">
        <TabsList>
          <TabsTrigger value="explore">Explore</TabsTrigger>
          <TabsTrigger value="favorites">Favorites</TabsTrigger>
          <TabsTrigger value="surprise">Surprise Me</TabsTrigger>
        </TabsList>
        <TabsContent value="explore">
          <p className="text-sm text-muted-foreground p-4 text-center">Explore new content curated just for you.</p>
        </TabsContent>
        <TabsContent value="favorites">
          <p className="text-sm text-muted-foreground p-4 text-center">Your favorite items will appear here.</p>
        </TabsContent>
        <TabsContent value="surprise">
          <p className="text-sm text-muted-foreground p-4 text-center">Something unexpected awaits!</p>
        </TabsContent>
      </Tabs>
    </div>
  );
}

function Tabs02() {
  return (
    <div className="w-full max-w-md">
      <Tabs defaultValue="explore" className="flex flex-col gap-4">
        <TabsList className="bg-background gap-1 border p-1">
          <TabsTrigger value="explore" className="data-[state=active]:bg-primary dark:data-[state=active]:bg-primary data-[state=active]:text-primary-foreground dark:data-[state=active]:text-primary-foreground dark:data-[state=active]:border-transparent">Explore</TabsTrigger>
          <TabsTrigger value="favorites" className="data-[state=active]:bg-primary dark:data-[state=active]:bg-primary data-[state=active]:text-primary-foreground dark:data-[state=active]:text-primary-foreground dark:data-[state=active]:border-transparent">Favorites</TabsTrigger>
          <TabsTrigger value="surprise" className="data-[state=active]:bg-primary dark:data-[state=active]:bg-primary data-[state=active]:text-primary-foreground dark:data-[state=active]:text-primary-foreground dark:data-[state=active]:border-transparent">Surprise Me</TabsTrigger>
        </TabsList>
        <TabsContent value="explore">
          <p className="text-sm text-muted-foreground p-4 text-center">Explore new content curated just for you.</p>
        </TabsContent>
        <TabsContent value="favorites">
          <p className="text-sm text-muted-foreground p-4 text-center">Your favorite items will appear here.</p>
        </TabsContent>
        <TabsContent value="surprise">
          <p className="text-sm text-muted-foreground p-4 text-center">Something unexpected awaits!</p>
        </TabsContent>
      </Tabs>
    </div>
  );
}

function Tabs03() {
  return (
    <div className="w-full max-w-md">
      <Tabs defaultValue="explore" className="flex flex-col gap-4">
        <TabsList>
          <TabsTrigger value="explore" className="flex items-center gap-1 px-2.5 sm:px-3">
            <Book className="h-4 w-4" />Explore
          </TabsTrigger>
          <TabsTrigger value="favorites" className="flex items-center gap-1 px-2.5 sm:px-3">
            <Heart className="h-4 w-4" />Favorites
          </TabsTrigger>
          <TabsTrigger value="surprise" className="flex items-center gap-1 px-2.5 sm:px-3">
            <Gift className="h-4 w-4" />Surprise Me
          </TabsTrigger>
        </TabsList>
        <TabsContent value="explore">
          <p className="text-sm text-muted-foreground p-4 text-center">Explore new content curated just for you.</p>
        </TabsContent>
        <TabsContent value="favorites">
          <p className="text-sm text-muted-foreground p-4 text-center">Your favorite items will appear here.</p>
        </TabsContent>
        <TabsContent value="surprise">
          <p className="text-sm text-muted-foreground p-4 text-center">Something unexpected awaits!</p>
        </TabsContent>
      </Tabs>
    </div>
  );
}

function Tabs04() {
  return (
    <div className="w-full max-w-md">
      <Tabs defaultValue="explore" className="flex flex-col gap-4">
        <TabsList>
          <TabsTrigger value="explore" className="flex items-center gap-1 px-2.5 sm:px-3">
            Explore
            <Badge className="bg-primary text-primary-foreground border-transparent h-5 min-w-5 px-1 tabular-nums">8</Badge>
          </TabsTrigger>
          <TabsTrigger value="favorites" className="flex items-center gap-1 px-2.5 sm:px-3">
            Favorites
            <Badge className="bg-primary text-primary-foreground border-transparent h-5 min-w-5 px-1 tabular-nums">6</Badge>
          </TabsTrigger>
          <TabsTrigger value="surprise" className="flex items-center gap-1 px-2.5 sm:px-3">
            Surprise Me
            <Badge className="bg-primary text-primary-foreground border-transparent h-5 min-w-5 px-1 tabular-nums">3</Badge>
          </TabsTrigger>
        </TabsList>
        <TabsContent value="explore">
          <p className="text-sm text-muted-foreground p-4 text-center">Explore new content curated just for you.</p>
        </TabsContent>
        <TabsContent value="favorites">
          <p className="text-sm text-muted-foreground p-4 text-center">Your favorite items will appear here.</p>
        </TabsContent>
        <TabsContent value="surprise">
          <p className="text-sm text-muted-foreground p-4 text-center">Something unexpected awaits!</p>
        </TabsContent>
      </Tabs>
    </div>
  );
}

function Tabs05() {
  return (
    <div className="w-full max-w-md">
      <Tabs defaultValue="explore" className="flex flex-col gap-4">
        <TabsList className="h-full">
          <TabsTrigger value="explore" className="flex flex-col items-center gap-1 px-2.5 sm:px-3">
            <Book className="h-4 w-4" />Explore
          </TabsTrigger>
          <TabsTrigger value="favorites" className="flex flex-col items-center gap-1 px-2.5 sm:px-3">
            <Heart className="h-4 w-4" />Favorites
          </TabsTrigger>
          <TabsTrigger value="surprise" className="flex flex-col items-center gap-1 px-2.5 sm:px-3">
            <Gift className="h-4 w-4" />Surprise Me
          </TabsTrigger>
        </TabsList>
        <TabsContent value="explore">
          <p className="text-sm text-muted-foreground p-4 text-center">Explore new content curated just for you.</p>
        </TabsContent>
        <TabsContent value="favorites">
          <p className="text-sm text-muted-foreground p-4 text-center">Your favorite items will appear here.</p>
        </TabsContent>
        <TabsContent value="surprise">
          <p className="text-sm text-muted-foreground p-4 text-center">Something unexpected awaits!</p>
        </TabsContent>
      </Tabs>
    </div>
  );
}

function Tabs06() {
  return (
    <div className="w-full max-w-md">
      <Tabs defaultValue="explore" className="flex flex-col gap-4">
        <TabsList className="h-full">
          <TabsTrigger value="explore" className="flex flex-col items-center gap-1 px-2.5 sm:px-3">
            <Badge className="bg-primary text-primary-foreground border-transparent h-5 min-w-5 px-1 tabular-nums">8</Badge>
            Explore
          </TabsTrigger>
          <TabsTrigger value="favorites" className="flex flex-col items-center gap-1 px-2.5 sm:px-3">
            <Badge className="bg-primary text-primary-foreground border-transparent h-5 min-w-5 px-1 tabular-nums">6</Badge>
            Favorites
          </TabsTrigger>
          <TabsTrigger value="surprise" className="flex flex-col items-center gap-1 px-2.5 sm:px-3">
            <Badge className="bg-primary text-primary-foreground border-transparent h-5 min-w-5 px-1 tabular-nums">3</Badge>
            Surprise Me
          </TabsTrigger>
        </TabsList>
        <TabsContent value="explore">
          <p className="text-sm text-muted-foreground p-4 text-center">Explore new content curated just for you.</p>
        </TabsContent>
        <TabsContent value="favorites">
          <p className="text-sm text-muted-foreground p-4 text-center">Your favorite items will appear here.</p>
        </TabsContent>
        <TabsContent value="surprise">
          <p className="text-sm text-muted-foreground p-4 text-center">Something unexpected awaits!</p>
        </TabsContent>
      </Tabs>
    </div>
  );
}

function Tabs07() {
  return (
    <div className="w-full max-w-md">
      <Tabs defaultValue="explore" className="flex flex-col gap-4">
        <TabsList className="h-full">
          <TooltipProvider delayDuration={200}>
            <Tooltip>
              <TooltipTrigger asChild>
                <TabsTrigger value="explore" className="flex flex-col items-center gap-1 px-2.5 sm:px-3" aria-label="tab-trigger">
                  <Book className="h-4 w-4" />
                </TabsTrigger>
              </TooltipTrigger>
              <TooltipContent>Explore</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <TabsTrigger value="favorites" className="flex flex-col items-center gap-1 px-2.5 sm:px-3" aria-label="tab-trigger">
                  <Heart className="h-4 w-4" />
                </TabsTrigger>
              </TooltipTrigger>
              <TooltipContent>Favorites</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <TabsTrigger value="surprise" className="flex flex-col items-center gap-1 px-2.5 sm:px-3" aria-label="tab-trigger">
                  <Gift className="h-4 w-4" />
                </TabsTrigger>
              </TooltipTrigger>
              <TooltipContent>Surprise Me</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </TabsList>
        <TabsContent value="explore">
          <p className="text-sm text-muted-foreground p-4 text-center">Explore new content curated just for you.</p>
        </TabsContent>
        <TabsContent value="favorites">
          <p className="text-sm text-muted-foreground p-4 text-center">Your favorite items will appear here.</p>
        </TabsContent>
        <TabsContent value="surprise">
          <p className="text-sm text-muted-foreground p-4 text-center">Something unexpected awaits!</p>
        </TabsContent>
      </Tabs>
    </div>
  );
}

function Tabs08() {
  return (
    <div className="w-full max-w-md">
      <Tabs defaultValue="explore" className="flex flex-col gap-4">
        <TabsList className="bg-background">
          <TabsTrigger value="explore" className="data-[state=active]:bg-primary/20 data-[state=active]:text-primary dark:data-[state=active]:text-primary dark:data-[state=active]:bg-primary/20 data-[state=active]:shadow-none dark:data-[state=active]:border-transparent">Explore</TabsTrigger>
          <TabsTrigger value="favorites" className="data-[state=active]:bg-primary/20 data-[state=active]:text-primary dark:data-[state=active]:text-primary dark:data-[state=active]:bg-primary/20 data-[state=active]:shadow-none dark:data-[state=active]:border-transparent">Favorites</TabsTrigger>
          <TabsTrigger value="surprise" className="data-[state=active]:bg-primary/20 data-[state=active]:text-primary dark:data-[state=active]:text-primary dark:data-[state=active]:bg-primary/20 data-[state=active]:shadow-none dark:data-[state=active]:border-transparent">Surprise Me</TabsTrigger>
        </TabsList>
        <TabsContent value="explore">
          <p className="text-sm text-muted-foreground p-4 text-center">Explore new content curated just for you.</p>
        </TabsContent>
        <TabsContent value="favorites">
          <p className="text-sm text-muted-foreground p-4 text-center">Your favorite items will appear here.</p>
        </TabsContent>
        <TabsContent value="surprise">
          <p className="text-sm text-muted-foreground p-4 text-center">Something unexpected awaits!</p>
        </TabsContent>
      </Tabs>
    </div>
  );
}

function Tabs09() {
  return (
    <div className="w-full max-w-md">
      <Tabs defaultValue="explore" className="flex flex-col gap-4">
        <TabsList className="bg-background">
          <TabsTrigger value="explore" className="data-[state=active]:bg-primary dark:data-[state=active]:bg-primary data-[state=active]:text-primary-foreground dark:data-[state=active]:text-primary-foreground dark:data-[state=active]:border-transparent">Explore</TabsTrigger>
          <TabsTrigger value="favorites" className="data-[state=active]:bg-primary dark:data-[state=active]:bg-primary data-[state=active]:text-primary-foreground dark:data-[state=active]:text-primary-foreground dark:data-[state=active]:border-transparent">Favorites</TabsTrigger>
          <TabsTrigger value="surprise" className="data-[state=active]:bg-primary dark:data-[state=active]:bg-primary data-[state=active]:text-primary-foreground dark:data-[state=active]:text-primary-foreground dark:data-[state=active]:border-transparent">Surprise Me</TabsTrigger>
        </TabsList>
        <TabsContent value="explore">
          <p className="text-sm text-muted-foreground p-4 text-center">Explore new content curated just for you.</p>
        </TabsContent>
        <TabsContent value="favorites">
          <p className="text-sm text-muted-foreground p-4 text-center">Your favorite items will appear here.</p>
        </TabsContent>
        <TabsContent value="surprise">
          <p className="text-sm text-muted-foreground p-4 text-center">Something unexpected awaits!</p>
        </TabsContent>
      </Tabs>
    </div>
  );
}

function Tabs10() {
  return (
    <div className="w-full max-w-md">
      <Tabs defaultValue="explore" className="flex flex-col gap-4">
        <TabsList className="bg-background">
          <TabsTrigger value="explore" className="data-[state=active]:border-border data-[state=active]:shadow-none">Explore</TabsTrigger>
          <TabsTrigger value="favorites" className="data-[state=active]:border-border data-[state=active]:shadow-none">Favorites</TabsTrigger>
          <TabsTrigger value="surprise" className="data-[state=active]:border-border data-[state=active]:shadow-none">Surprise Me</TabsTrigger>
        </TabsList>
        <TabsContent value="explore">
          <p className="text-sm text-muted-foreground p-4 text-center">Explore new content curated just for you.</p>
        </TabsContent>
        <TabsContent value="favorites">
          <p className="text-sm text-muted-foreground p-4 text-center">Your favorite items will appear here.</p>
        </TabsContent>
        <TabsContent value="surprise">
          <p className="text-sm text-muted-foreground p-4 text-center">Something unexpected awaits!</p>
        </TabsContent>
      </Tabs>
    </div>
  );
}

function Tabs11() {
  return (
    <div className="w-full max-w-md">
      <Tabs defaultValue="explore" className="flex flex-col gap-4">
        <TabsList className="bg-background rounded-none border-b p-0">
          <TabsTrigger value="explore" className="bg-background data-[state=active]:border-primary dark:data-[state=active]:border-primary h-full rounded-none border-0 border-b-2 border-transparent data-[state=active]:shadow-none">Explore</TabsTrigger>
          <TabsTrigger value="favorites" className="bg-background data-[state=active]:border-primary dark:data-[state=active]:border-primary h-full rounded-none border-0 border-b-2 border-transparent data-[state=active]:shadow-none">Favorites</TabsTrigger>
          <TabsTrigger value="surprise" className="bg-background data-[state=active]:border-primary dark:data-[state=active]:border-primary h-full rounded-none border-0 border-b-2 border-transparent data-[state=active]:shadow-none">Surprise Me</TabsTrigger>
        </TabsList>
        <TabsContent value="explore">
          <p className="text-sm text-muted-foreground p-4 text-center">Explore new content curated just for you.</p>
        </TabsContent>
        <TabsContent value="favorites">
          <p className="text-sm text-muted-foreground p-4 text-center">Your favorite items will appear here.</p>
        </TabsContent>
        <TabsContent value="surprise">
          <p className="text-sm text-muted-foreground p-4 text-center">Something unexpected awaits!</p>
        </TabsContent>
      </Tabs>
    </div>
  );
}

function Tabs12() {
  return (
    <div className="w-full max-w-md">
      <Tabs defaultValue="explore" className="flex flex-col gap-4">
        <TabsList className="bg-background rounded-none border-b p-0">
          <TabsTrigger value="explore" className="bg-background data-[state=active]:border-primary dark:data-[state=active]:border-primary h-full rounded-none border-b-2 border-transparent data-[state=active]:shadow-none">Explore</TabsTrigger>
          <TabsTrigger value="favorites" className="bg-background data-[state=active]:border-primary dark:data-[state=active]:border-primary h-full rounded-none border-b-2 border-transparent data-[state=active]:shadow-none">Favorites</TabsTrigger>
          <TabsTrigger value="surprise" className="bg-background data-[state=active]:border-primary dark:data-[state=active]:border-primary h-full rounded-none border-b-2 border-transparent data-[state=active]:shadow-none">Surprise Me</TabsTrigger>
        </TabsList>
        <TabsContent value="explore">
          <p className="text-sm text-muted-foreground p-4 text-center">Explore new content curated just for you.</p>
        </TabsContent>
        <TabsContent value="favorites">
          <p className="text-sm text-muted-foreground p-4 text-center">Your favorite items will appear here.</p>
        </TabsContent>
        <TabsContent value="surprise">
          <p className="text-sm text-muted-foreground p-4 text-center">Something unexpected awaits!</p>
        </TabsContent>
      </Tabs>
    </div>
  );
}

function Tabs13() {
  return (
    <div>
      <Tabs defaultValue="explore" className="flex flex-col gap-4">
        <TabsList className="bg-background justify-start rounded-none border-b p-0">
          <TabsTrigger value="explore" className="bg-background dark:data-[state=active]:bg-background data-[state=active]:border-border data-[state=active]:border-b-background h-full rounded-none rounded-t border border-transparent data-[state=active]:-mb-0.5 data-[state=active]:shadow-none dark:border-b-0 dark:data-[state=active]:-mb-0.5">Explore</TabsTrigger>
          <TabsTrigger value="favorites" className="bg-background dark:data-[state=active]:bg-background data-[state=active]:border-border data-[state=active]:border-b-background h-full rounded-none rounded-t border border-transparent data-[state=active]:-mb-0.5 data-[state=active]:shadow-none dark:border-b-0 dark:data-[state=active]:-mb-0.5">Favorites</TabsTrigger>
          <TabsTrigger value="surprise" className="bg-background dark:data-[state=active]:bg-background data-[state=active]:border-border data-[state=active]:border-b-background h-full rounded-none rounded-t border border-transparent data-[state=active]:-mb-0.5 data-[state=active]:shadow-none dark:border-b-0 dark:data-[state=active]:-mb-0.5">Surprise Me</TabsTrigger>
        </TabsList>
        <TabsContent value="explore">
          <p className="text-sm text-muted-foreground p-4 text-center">Explore new content curated just for you.</p>
        </TabsContent>
        <TabsContent value="favorites">
          <p className="text-sm text-muted-foreground p-4 text-center">Your favorite items will appear here.</p>
        </TabsContent>
        <TabsContent value="surprise">
          <p className="text-sm text-muted-foreground p-4 text-center">Something unexpected awaits!</p>
        </TabsContent>
      </Tabs>
    </div>
  );
}

function Tabs14() {
  return (
    <div className="w-full max-w-md">
      <Tabs defaultValue="explore" className="flex flex-col gap-1">
        <ScrollArea className="w-full">
          <TabsList className="mb-3">
            <TabsTrigger value="explore">Explore</TabsTrigger>
            <TabsTrigger value="favorites">Favorites</TabsTrigger>
            <TabsTrigger value="surprise">Surprise Me</TabsTrigger>
            <TabsTrigger value="trending">Trending</TabsTrigger>
            <TabsTrigger value="recent">Recent</TabsTrigger>
          </TabsList>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
        <TabsContent value="explore">
          <p className="text-sm text-muted-foreground p-4 text-center">Explore new content curated just for you.</p>
        </TabsContent>
        <TabsContent value="favorites">
          <p className="text-sm text-muted-foreground p-4 text-center">Your favorite items will appear here.</p>
        </TabsContent>
        <TabsContent value="surprise">
          <p className="text-sm text-muted-foreground p-4 text-center">Something unexpected awaits!</p>
        </TabsContent>
        <TabsContent value="trending">
          <p className="text-sm text-muted-foreground p-4 text-center">See what&apos;s trending right now.</p>
        </TabsContent>
        <TabsContent value="recent">
          <p className="text-sm text-muted-foreground p-4 text-center">Your recently viewed items.</p>
        </TabsContent>
      </Tabs>
    </div>
  );
}

function Tabs15() {
  return (
    <div className="w-full max-w-md">
      <Tabs defaultValue="explore" className="flex gap-2 flex-row">
        <TabsList className="h-full flex-col">
          <TabsTrigger value="explore" className="w-full">Explore</TabsTrigger>
          <TabsTrigger value="favorites" className="w-full">Favorites</TabsTrigger>
          <TabsTrigger value="surprise" className="w-full">Surprise Me</TabsTrigger>
        </TabsList>
        <TabsContent value="explore" className="flex-1">
          <p className="text-sm text-muted-foreground p-4 text-center">Explore new content curated just for you.</p>
        </TabsContent>
        <TabsContent value="favorites" className="flex-1">
          <p className="text-sm text-muted-foreground p-4 text-center">Your favorite items will appear here.</p>
        </TabsContent>
        <TabsContent value="surprise" className="flex-1">
          <p className="text-sm text-muted-foreground p-4 text-center">Something unexpected awaits!</p>
        </TabsContent>
      </Tabs>
    </div>
  );
}

function Tabs16() {
  return (
    <div className="w-full max-w-md">
      <Tabs defaultValue="explore" className="flex gap-2 flex-row">
        <TabsList className="bg-background h-full flex-col rounded-none border-l p-0">
          <TabsTrigger value="explore" className="bg-background data-[state=active]:border-primary dark:data-[state=active]:border-primary h-full w-full justify-start rounded-none border-0 border-l-2 border-transparent data-[state=active]:shadow-none">Explore</TabsTrigger>
          <TabsTrigger value="favorites" className="bg-background data-[state=active]:border-primary dark:data-[state=active]:border-primary h-full w-full justify-start rounded-none border-0 border-l-2 border-transparent data-[state=active]:shadow-none">Favorites</TabsTrigger>
          <TabsTrigger value="surprise" className="bg-background data-[state=active]:border-primary dark:data-[state=active]:border-primary h-full w-full justify-start rounded-none border-0 border-l-2 border-transparent data-[state=active]:shadow-none">Surprise Me</TabsTrigger>
        </TabsList>
        <TabsContent value="explore" className="flex-1">
          <p className="text-sm text-muted-foreground p-4 text-center">Explore new content curated just for you.</p>
        </TabsContent>
        <TabsContent value="favorites" className="flex-1">
          <p className="text-sm text-muted-foreground p-4 text-center">Your favorite items will appear here.</p>
        </TabsContent>
        <TabsContent value="surprise" className="flex-1">
          <p className="text-sm text-muted-foreground p-4 text-center">Something unexpected awaits!</p>
        </TabsContent>
      </Tabs>
    </div>
  );
}

function Tabs17() {
  return (
    <div className="w-full max-w-md">
      <Tabs defaultValue="explore" className="flex gap-2 flex-row">
        <TabsList className="bg-background h-full flex-col">
          <TabsTrigger value="explore" className="data-[state=active]:bg-primary/20 data-[state=active]:text-primary dark:data-[state=active]:text-primary dark:data-[state=active]:bg-primary/20 w-full data-[state=active]:shadow-none dark:data-[state=active]:border-transparent">Explore</TabsTrigger>
          <TabsTrigger value="favorites" className="data-[state=active]:bg-primary/20 data-[state=active]:text-primary dark:data-[state=active]:text-primary dark:data-[state=active]:bg-primary/20 w-full data-[state=active]:shadow-none dark:data-[state=active]:border-transparent">Favorites</TabsTrigger>
          <TabsTrigger value="surprise" className="data-[state=active]:bg-primary/20 data-[state=active]:text-primary dark:data-[state=active]:text-primary dark:data-[state=active]:bg-primary/20 w-full data-[state=active]:shadow-none dark:data-[state=active]:border-transparent">Surprise Me</TabsTrigger>
        </TabsList>
        <TabsContent value="explore" className="flex-1">
          <p className="text-sm text-muted-foreground p-4 text-center">Explore new content curated just for you.</p>
        </TabsContent>
        <TabsContent value="favorites" className="flex-1">
          <p className="text-sm text-muted-foreground p-4 text-center">Your favorite items will appear here.</p>
        </TabsContent>
        <TabsContent value="surprise" className="flex-1">
          <p className="text-sm text-muted-foreground p-4 text-center">Something unexpected awaits!</p>
        </TabsContent>
      </Tabs>
    </div>
  );
}

function Tabs18() {
  return (
    <div className="w-full max-w-md">
      <Tabs defaultValue="explore" className="flex gap-2 flex-row">
        <TabsList className="bg-background h-full flex-col">
          <TabsTrigger value="explore" className="data-[state=active]:bg-primary dark:data-[state=active]:bg-primary data-[state=active]:text-primary-foreground dark:data-[state=active]:text-primary-foreground w-full dark:data-[state=active]:border-transparent">Explore</TabsTrigger>
          <TabsTrigger value="favorites" className="data-[state=active]:bg-primary dark:data-[state=active]:bg-primary data-[state=active]:text-primary-foreground dark:data-[state=active]:text-primary-foreground w-full dark:data-[state=active]:border-transparent">Favorites</TabsTrigger>
          <TabsTrigger value="surprise" className="data-[state=active]:bg-primary dark:data-[state=active]:bg-primary data-[state=active]:text-primary-foreground dark:data-[state=active]:text-primary-foreground w-full dark:data-[state=active]:border-transparent">Surprise Me</TabsTrigger>
        </TabsList>
        <TabsContent value="explore" className="flex-1">
          <p className="text-sm text-muted-foreground p-4 text-center">Explore new content curated just for you.</p>
        </TabsContent>
        <TabsContent value="favorites" className="flex-1">
          <p className="text-sm text-muted-foreground p-4 text-center">Your favorite items will appear here.</p>
        </TabsContent>
        <TabsContent value="surprise" className="flex-1">
          <p className="text-sm text-muted-foreground p-4 text-center">Something unexpected awaits!</p>
        </TabsContent>
      </Tabs>
    </div>
  );
}

function Tabs19() {
  return (
    <div className="w-full max-w-md">
      <Tabs defaultValue="explore" className="flex gap-2 flex-row">
        <TabsList className="bg-background h-full flex-col rounded-none border-l p-0">
          <TabsTrigger value="explore" className="bg-background data-[state=active]:border-primary dark:data-[state=active]:border-primary h-full w-full justify-start rounded-none border-l-3 border-transparent data-[state=active]:shadow-none">Explore</TabsTrigger>
          <TabsTrigger value="favorites" className="bg-background data-[state=active]:border-primary dark:data-[state=active]:border-primary h-full w-full justify-start rounded-none border-l-3 border-transparent data-[state=active]:shadow-none">Favorites</TabsTrigger>
          <TabsTrigger value="surprise" className="bg-background data-[state=active]:border-primary dark:data-[state=active]:border-primary h-full w-full justify-start rounded-none border-l-3 border-transparent data-[state=active]:shadow-none">Surprise Me</TabsTrigger>
        </TabsList>
        <TabsContent value="explore" className="flex-1">
          <p className="text-sm text-muted-foreground p-4 text-center">Explore new content curated just for you.</p>
        </TabsContent>
        <TabsContent value="favorites" className="flex-1">
          <p className="text-sm text-muted-foreground p-4 text-center">Your favorite items will appear here.</p>
        </TabsContent>
        <TabsContent value="surprise" className="flex-1">
          <p className="text-sm text-muted-foreground p-4 text-center">Something unexpected awaits!</p>
        </TabsContent>
      </Tabs>
    </div>
  );
}

function Tabs20() {
  return (
    <div className="w-full max-w-md">
      <Tabs defaultValue="explore" className="flex gap-2 flex-row">
        <TabsList className="bg-background h-full flex-col rounded-none p-0">
          <TabsTrigger value="explore" className="bg-background data-[state=active]:border-primary dark:data-[state=active]:border-primary h-full w-full justify-start rounded-none border-0 border-l-2 border-transparent data-[state=active]:shadow-none">Explore</TabsTrigger>
          <TabsTrigger value="favorites" className="bg-background data-[state=active]:border-primary dark:data-[state=active]:border-primary h-full w-full justify-start rounded-none border-0 border-l-2 border-transparent data-[state=active]:shadow-none">Favorites</TabsTrigger>
          <TabsTrigger value="surprise" className="bg-background data-[state=active]:border-primary dark:data-[state=active]:border-primary h-full w-full justify-start rounded-none border-0 border-l-2 border-transparent data-[state=active]:shadow-none">Surprise Me</TabsTrigger>
        </TabsList>
        <TabsContent value="explore" className="flex-1">
          <p className="text-sm text-muted-foreground p-4 text-center">Explore new content curated just for you.</p>
        </TabsContent>
        <TabsContent value="favorites" className="flex-1">
          <p className="text-sm text-muted-foreground p-4 text-center">Your favorite items will appear here.</p>
        </TabsContent>
        <TabsContent value="surprise" className="flex-1">
          <p className="text-sm text-muted-foreground p-4 text-center">Something unexpected awaits!</p>
        </TabsContent>
      </Tabs>
    </div>
  );
}

function Tabs21() {
  return (
    <div className="w-full max-w-md">
      <Tabs defaultValue="explore" className="flex flex-row gap-4">
        <TabsList className="h-full flex-col gap-2">
          <TooltipProvider delayDuration={200}>
            <Tooltip>
              <TooltipTrigger asChild>
                <TabsTrigger value="explore" className="flex w-full flex-col items-center gap-1" aria-label="tab-trigger">
                  <Book className="h-4 w-4" />
                </TabsTrigger>
              </TooltipTrigger>
              <TooltipContent side="right">Explore</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <TabsTrigger value="favorites" className="flex w-full flex-col items-center gap-1" aria-label="tab-trigger">
                  <Heart className="h-4 w-4" />
                </TabsTrigger>
              </TooltipTrigger>
              <TooltipContent side="right">Favorites</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <TabsTrigger value="surprise" className="flex w-full flex-col items-center gap-1" aria-label="tab-trigger">
                  <Gift className="h-4 w-4" />
                </TabsTrigger>
              </TooltipTrigger>
              <TooltipContent side="right">Surprise Me</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </TabsList>
        <TabsContent value="explore" className="flex-1">
          <p className="text-sm text-muted-foreground p-4 text-center">Explore new content curated just for you.</p>
        </TabsContent>
        <TabsContent value="favorites" className="flex-1">
          <p className="text-sm text-muted-foreground p-4 text-center">Your favorite items will appear here.</p>
        </TabsContent>
        <TabsContent value="surprise" className="flex-1">
          <p className="text-sm text-muted-foreground p-4 text-center">Something unexpected awaits!</p>
        </TabsContent>
      </Tabs>
    </div>
  );
}

function Tabs22() {
  return (
    <div className="w-full max-w-md">
      <Tabs defaultValue="explore" className="flex gap-2 flex-row">
        <TabsList className="h-full flex-col">
          <TabsTrigger value="explore" className="flex w-full items-center justify-start gap-1.5 px-2.5 sm:px-3">
            <Book className="h-4 w-4" />Explore
          </TabsTrigger>
          <TabsTrigger value="favorites" className="flex w-full items-center justify-start gap-1.5 px-2.5 sm:px-3">
            <Heart className="h-4 w-4" />Favorites
          </TabsTrigger>
          <TabsTrigger value="surprise" className="flex w-full items-center justify-start gap-1.5 px-2.5 sm:px-3">
            <Gift className="h-4 w-4" />Surprise Me
          </TabsTrigger>
        </TabsList>
        <TabsContent value="explore" className="flex-1">
          <p className="text-sm text-muted-foreground p-4 text-center">Explore new content curated just for you.</p>
        </TabsContent>
        <TabsContent value="favorites" className="flex-1">
          <p className="text-sm text-muted-foreground p-4 text-center">Your favorite items will appear here.</p>
        </TabsContent>
        <TabsContent value="surprise" className="flex-1">
          <p className="text-sm text-muted-foreground p-4 text-center">Something unexpected awaits!</p>
        </TabsContent>
      </Tabs>
    </div>
  );
}

function Tabs23() {
  return (
    <div className="w-full max-w-md">
      <Tabs defaultValue="explore" className="flex gap-2 flex-row">
        <TabsList className="h-full flex-col gap-1.5">
          <TabsTrigger value="explore" className="flex w-full items-center justify-start gap-1.5 px-2.5 sm:px-3">
            Explore
            <Badge className="bg-primary text-primary-foreground border-transparent h-5 min-w-5 px-1 tabular-nums">8</Badge>
          </TabsTrigger>
          <TabsTrigger value="favorites" className="flex w-full items-center justify-start gap-1.5 px-2.5 sm:px-3">
            Favorites
            <Badge className="bg-primary text-primary-foreground border-transparent h-5 min-w-5 px-1 tabular-nums">6</Badge>
          </TabsTrigger>
          <TabsTrigger value="surprise" className="flex w-full items-center justify-start gap-1.5 px-2.5 sm:px-3">
            Surprise Me
            <Badge className="bg-primary text-primary-foreground border-transparent h-5 min-w-5 px-1 tabular-nums">3</Badge>
          </TabsTrigger>
        </TabsList>
        <TabsContent value="explore" className="flex-1">
          <p className="text-sm text-muted-foreground p-4 text-center">Explore new content curated just for you.</p>
        </TabsContent>
        <TabsContent value="favorites" className="flex-1">
          <p className="text-sm text-muted-foreground p-4 text-center">Your favorite items will appear here.</p>
        </TabsContent>
        <TabsContent value="surprise" className="flex-1">
          <p className="text-sm text-muted-foreground p-4 text-center">Something unexpected awaits!</p>
        </TabsContent>
      </Tabs>
    </div>
  );
}

function Tabs24() {
  return (
    <div className="w-full max-w-md">
      <Tabs defaultValue="explore" className="flex gap-2 flex-row">
        <TabsList className="bg-background h-full flex-col">
          <TabsTrigger value="explore" className="data-[state=active]:border-border w-full data-[state=active]:shadow-none">Explore</TabsTrigger>
          <TabsTrigger value="favorites" className="data-[state=active]:border-border w-full data-[state=active]:shadow-none">Favorites</TabsTrigger>
          <TabsTrigger value="surprise" className="data-[state=active]:border-border w-full data-[state=active]:shadow-none">Surprise Me</TabsTrigger>
        </TabsList>
        <TabsContent value="explore" className="flex-1">
          <p className="text-sm text-muted-foreground p-4 text-center">Explore new content curated just for you.</p>
        </TabsContent>
        <TabsContent value="favorites" className="flex-1">
          <p className="text-sm text-muted-foreground p-4 text-center">Your favorite items will appear here.</p>
        </TabsContent>
        <TabsContent value="surprise" className="flex-1">
          <p className="text-sm text-muted-foreground p-4 text-center">Something unexpected awaits!</p>
        </TabsContent>
      </Tabs>
    </div>
  );
}

function Tabs25() {
  return (
    <div className="w-full max-w-md">
      <Tabs defaultValue="explore" className="flex flex-col gap-4">
        <TabsList className="bg-background gap-1">
          <TabsTrigger value="explore" className="data-[state=active]:bg-primary dark:data-[state=active]:bg-primary data-[state=active]:text-primary-foreground dark:data-[state=active]:text-primary-foreground text-muted-foreground hover:text-foreground hover:bg-muted transition-colors duration-300 hover:border dark:data-[state=active]:border-transparent">Explore</TabsTrigger>
          <TabsTrigger value="favorites" className="data-[state=active]:bg-primary dark:data-[state=active]:bg-primary data-[state=active]:text-primary-foreground dark:data-[state=active]:text-primary-foreground text-muted-foreground hover:text-foreground hover:bg-muted transition-colors duration-300 hover:border dark:data-[state=active]:border-transparent">Favorites</TabsTrigger>
          <TabsTrigger value="surprise" className="data-[state=active]:bg-primary dark:data-[state=active]:bg-primary data-[state=active]:text-primary-foreground dark:data-[state=active]:text-primary-foreground text-muted-foreground hover:text-foreground hover:bg-muted transition-colors duration-300 hover:border dark:data-[state=active]:border-transparent">Surprise Me</TabsTrigger>
        </TabsList>
        <TabsContent value="explore">
          <p className="text-sm text-muted-foreground p-4 text-center">Explore new content curated just for you.</p>
        </TabsContent>
        <TabsContent value="favorites">
          <p className="text-sm text-muted-foreground p-4 text-center">Your favorite items will appear here.</p>
        </TabsContent>
        <TabsContent value="surprise">
          <p className="text-sm text-muted-foreground p-4 text-center">Something unexpected awaits!</p>
        </TabsContent>
      </Tabs>
    </div>
  );
}

function Tabs26() {
  return (
    <div className="w-full max-w-md">
      <Tabs defaultValue="explore" className="flex flex-col gap-4">
        <TabsList className="bg-background rounded-none border-b p-0">
          <TabsTrigger value="explore" className="bg-background data-[state=active]:border-primary dark:data-[state=active]:border-primary data-[state=active]:text-foreground text-muted-foreground dark:text-muted-foreground hover:text-foreground dark:hover:text-foreground hover:border-muted-foreground/30 h-full rounded-none border-0 border-b-2 border-transparent data-[state=active]:shadow-none">Explore</TabsTrigger>
          <TabsTrigger value="favorites" className="bg-background data-[state=active]:border-primary dark:data-[state=active]:border-primary data-[state=active]:text-foreground text-muted-foreground dark:text-muted-foreground hover:text-foreground dark:hover:text-foreground hover:border-muted-foreground/30 h-full rounded-none border-0 border-b-2 border-transparent data-[state=active]:shadow-none">Favorites</TabsTrigger>
          <TabsTrigger value="surprise" className="bg-background data-[state=active]:border-primary dark:data-[state=active]:border-primary data-[state=active]:text-foreground text-muted-foreground dark:text-muted-foreground hover:text-foreground dark:hover:text-foreground hover:border-muted-foreground/30 h-full rounded-none border-0 border-b-2 border-transparent data-[state=active]:shadow-none">Surprise Me</TabsTrigger>
        </TabsList>
        <TabsContent value="explore">
          <p className="text-sm text-muted-foreground p-4 text-center">Explore new content curated just for you.</p>
        </TabsContent>
        <TabsContent value="favorites">
          <p className="text-sm text-muted-foreground p-4 text-center">Your favorite items will appear here.</p>
        </TabsContent>
        <TabsContent value="surprise">
          <p className="text-sm text-muted-foreground p-4 text-center">Something unexpected awaits!</p>
        </TabsContent>
      </Tabs>
    </div>
  );
}

function Tabs27() {
  return (
    <div className="w-full max-w-md">
      <Tabs defaultValue="explore" className="flex flex-col gap-4">
        <TabsList className="h-10 p-[4px]">
          <TabsTrigger value="explore">Explore</TabsTrigger>
          <TabsTrigger value="favorites">Favorites</TabsTrigger>
          <TabsTrigger value="surprise">Surprise Me</TabsTrigger>
        </TabsList>
        <TabsContent value="explore">
          <p className="text-sm text-muted-foreground p-4 text-center">Explore new content curated just for you.</p>
        </TabsContent>
        <TabsContent value="favorites">
          <p className="text-sm text-muted-foreground p-4 text-center">Your favorite items will appear here.</p>
        </TabsContent>
        <TabsContent value="surprise">
          <p className="text-sm text-muted-foreground p-4 text-center">Something unexpected awaits!</p>
        </TabsContent>
      </Tabs>
    </div>
  );
}

function Tabs28() {
  return (
    <div className="w-full max-w-md">
      <Tabs defaultValue="explore" className="flex flex-col gap-4">
        <TabsList className="h-auto gap-2 rounded-xl p-1">
          <TabsTrigger value="explore" className="flex h-8 w-full items-center justify-center gap-1.5">
            <Book className="aspect-square size-4 shrink-0" />
            <span className="font-medium max-sm:hidden">Explore</span>
          </TabsTrigger>
          <TabsTrigger value="favorites" className="flex h-8 w-full items-center justify-center gap-1.5">
            <Heart className="aspect-square size-4 shrink-0" />
            <span className="font-medium max-sm:hidden">Favorites</span>
          </TabsTrigger>
          <TabsTrigger value="surprise" className="flex h-8 w-full items-center justify-center gap-1.5">
            <Gift className="aspect-square size-4 shrink-0" />
            <span className="font-medium max-sm:hidden">Surprise Me</span>
          </TabsTrigger>
        </TabsList>
        <TabsContent value="explore">
          <p className="text-sm text-muted-foreground p-4 text-center">Explore new content curated just for you.</p>
        </TabsContent>
        <TabsContent value="favorites">
          <p className="text-sm text-muted-foreground p-4 text-center">Your favorite items will appear here.</p>
        </TabsContent>
        <TabsContent value="surprise">
          <p className="text-sm text-muted-foreground p-4 text-center">Something unexpected awaits!</p>
        </TabsContent>
      </Tabs>
    </div>
  );
}

function Tabs29() {
  return (
    <div className="w-full max-w-md">
      <Tabs defaultValue="explore" className="flex flex-col gap-4">
        <TabsList className="bg-background relative rounded-none border-b p-0">
          <TabsTrigger value="explore" className="bg-background dark:data-[state=active]:bg-background relative z-10 rounded-none border-0 data-[state=active]:shadow-none">Explore</TabsTrigger>
          <TabsTrigger value="favorites" className="bg-background dark:data-[state=active]:bg-background relative z-10 rounded-none border-0 data-[state=active]:shadow-none">Favorites</TabsTrigger>
          <TabsTrigger value="surprise" className="bg-background dark:data-[state=active]:bg-background relative z-10 rounded-none border-0 data-[state=active]:shadow-none">Surprise Me</TabsTrigger>
        </TabsList>
        <TabsContent value="explore">
          <p className="text-sm text-muted-foreground p-4 text-center">Explore new content curated just for you.</p>
        </TabsContent>
        <TabsContent value="favorites">
          <p className="text-sm text-muted-foreground p-4 text-center">Your favorite items will appear here.</p>
        </TabsContent>
        <TabsContent value="surprise">
          <p className="text-sm text-muted-foreground p-4 text-center">Something unexpected awaits!</p>
        </TabsContent>
      </Tabs>
    </div>
  );
}

// --- Code strings ---
const codes: Record<string, string> = {
  "tabs-01": `import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function Tabs01() {
  return (
    <Tabs defaultValue="explore" className="flex flex-col gap-2">
      <TabsList>
        <TabsTrigger value="explore">Explore</TabsTrigger>
        <TabsTrigger value="favorites">Favorites</TabsTrigger>
        <TabsTrigger value="surprise">Surprise Me</TabsTrigger>
      </TabsList>
      <TabsContent value="explore">
        <p className="text-sm text-muted-foreground p-4 text-center">Explore new content curated just for you.</p>
      </TabsContent>
      <TabsContent value="favorites">
        <p className="text-sm text-muted-foreground p-4 text-center">Your favorite items will appear here.</p>
      </TabsContent>
      <TabsContent value="surprise">
        <p className="text-sm text-muted-foreground p-4 text-center">Something unexpected awaits!</p>
      </TabsContent>
    </Tabs>
  )
}`,
  "tabs-02": `import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function Tabs02() {
  return (
    <Tabs defaultValue="explore" className="flex flex-col gap-4">
      <TabsList className="bg-background gap-1 border p-1">
        <TabsTrigger value="explore" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Explore</TabsTrigger>
        <TabsTrigger value="favorites" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Favorites</TabsTrigger>
        <TabsTrigger value="surprise" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Surprise Me</TabsTrigger>
      </TabsList>
      <TabsContent value="explore">
        <p className="text-sm text-muted-foreground p-4 text-center">Explore new content curated just for you.</p>
      </TabsContent>
    </Tabs>
  )
}`,
  "tabs-11": `import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function Tabs11() {
  return (
    <Tabs defaultValue="explore" className="flex flex-col gap-4">
      <TabsList className="bg-background rounded-none border-b p-0">
        <TabsTrigger value="explore" className="bg-background data-[state=active]:border-primary h-full rounded-none border-0 border-b-2 border-transparent data-[state=active]:shadow-none">Explore</TabsTrigger>
        <TabsTrigger value="favorites" className="bg-background data-[state=active]:border-primary h-full rounded-none border-0 border-b-2 border-transparent data-[state=active]:shadow-none">Favorites</TabsTrigger>
        <TabsTrigger value="surprise" className="bg-background data-[state=active]:border-primary h-full rounded-none border-0 border-b-2 border-transparent data-[state=active]:shadow-none">Surprise Me</TabsTrigger>
      </TabsList>
      <TabsContent value="explore">
        <p className="text-sm text-muted-foreground p-4 text-center">Explore new content curated just for you.</p>
      </TabsContent>
    </Tabs>
  )
}`,
  "tabs-15": `import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function Tabs15() {
  return (
    <Tabs defaultValue="explore" className="flex gap-2 flex-row">
      <TabsList className="h-full flex-col">
        <TabsTrigger value="explore" className="w-full">Explore</TabsTrigger>
        <TabsTrigger value="favorites" className="w-full">Favorites</TabsTrigger>
        <TabsTrigger value="surprise" className="w-full">Surprise Me</TabsTrigger>
      </TabsList>
      <TabsContent value="explore" className="flex-1">
        <p className="text-sm text-muted-foreground p-4 text-center">Explore new content curated just for you.</p>
      </TabsContent>
    </Tabs>
  )
}`,
  "tabs-22": `import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Book, Heart, Gift } from "lucide-react"

export default function Tabs22() {
  return (
    <Tabs defaultValue="explore" className="flex gap-2 flex-row">
      <TabsList className="h-full flex-col">
        <TabsTrigger value="explore" className="flex w-full items-center justify-start gap-1.5 px-2.5 sm:px-3">
          <Book className="h-4 w-4" />Explore
        </TabsTrigger>
        <TabsTrigger value="favorites" className="flex w-full items-center justify-start gap-1.5 px-2.5 sm:px-3">
          <Heart className="h-4 w-4" />Favorites
        </TabsTrigger>
        <TabsTrigger value="surprise" className="flex w-full items-center justify-start gap-1.5 px-2.5 sm:px-3">
          <Gift className="h-4 w-4" />Surprise Me
        </TabsTrigger>
      </TabsList>
      <TabsContent value="explore" className="flex-1">
        <p className="text-sm text-muted-foreground p-4 text-center">Explore new content curated just for you.</p>
      </TabsContent>
    </Tabs>
  )
}`,
  "tabs-28": `import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Book, Heart, Gift } from "lucide-react"

export default function Tabs28() {
  return (
    <Tabs defaultValue="explore" className="flex flex-col gap-4">
      <TabsList className="h-auto gap-2 rounded-xl p-1">
        <TabsTrigger value="explore" className="flex h-8 w-full items-center justify-center gap-1.5">
          <Book className="aspect-square size-4 shrink-0" />
          <span className="font-medium max-sm:hidden">Explore</span>
        </TabsTrigger>
        <TabsTrigger value="favorites" className="flex h-8 w-full items-center justify-center gap-1.5">
          <Heart className="aspect-square size-4 shrink-0" />
          <span className="font-medium max-sm:hidden">Favorites</span>
        </TabsTrigger>
        <TabsTrigger value="surprise" className="flex h-8 w-full items-center justify-center gap-1.5">
          <Gift className="aspect-square size-4 shrink-0" />
          <span className="font-medium max-sm:hidden">Surprise Me</span>
        </TabsTrigger>
      </TabsList>
      <TabsContent value="explore">
        <p className="text-sm text-muted-foreground p-4 text-center">Explore new content curated just for you.</p>
      </TabsContent>
    </Tabs>
  )
}`,
};

function getCode(id: string) {
  return codes[id] || codes["tabs-01"]!.replace("Tabs01", id.replace("tabs-", "Tabs"));
}

// --- Variants ---
const variants = [
  { id: "tabs-01", title: "Tabs 1", preview: <Tabs01 /> },
  { id: "tabs-02", title: "Tabs 2", preview: <Tabs02 /> },
  { id: "tabs-03", title: "Tabs 3", preview: <Tabs03 /> },
  { id: "tabs-04", title: "Tabs 4", preview: <Tabs04 /> },
  { id: "tabs-05", title: "Tabs 5", preview: <Tabs05 /> },
  { id: "tabs-06", title: "Tabs 6", preview: <Tabs06 /> },
  { id: "tabs-07", title: "Tabs 7", preview: <Tabs07 /> },
  { id: "tabs-08", title: "Tabs 8", preview: <Tabs08 /> },
  { id: "tabs-09", title: "Tabs 9", preview: <Tabs09 /> },
  { id: "tabs-10", title: "Tabs 10", preview: <Tabs10 /> },
  { id: "tabs-11", title: "Tabs 11", preview: <Tabs11 /> },
  { id: "tabs-12", title: "Tabs 12", preview: <Tabs12 /> },
  { id: "tabs-13", title: "Tabs 13", preview: <Tabs13 /> },
  { id: "tabs-14", title: "Tabs 14", preview: <Tabs14 /> },
  { id: "tabs-15", title: "Tabs 15", preview: <Tabs15 /> },
  { id: "tabs-16", title: "Tabs 16", preview: <Tabs16 /> },
  { id: "tabs-17", title: "Tabs 17", preview: <Tabs17 /> },
  { id: "tabs-18", title: "Tabs 18", preview: <Tabs18 /> },
  { id: "tabs-19", title: "Tabs 19", preview: <Tabs19 /> },
  { id: "tabs-20", title: "Tabs 20", preview: <Tabs20 /> },
  { id: "tabs-21", title: "Tabs 21", preview: <Tabs21 /> },
  { id: "tabs-22", title: "Tabs 22", preview: <Tabs22 /> },
  { id: "tabs-23", title: "Tabs 23", preview: <Tabs23 /> },
  { id: "tabs-24", title: "Tabs 24", preview: <Tabs24 /> },
  { id: "tabs-25", title: "Tabs 25", preview: <Tabs25 /> },
  { id: "tabs-26", title: "Tabs 26", preview: <Tabs26 /> },
  { id: "tabs-27", title: "Tabs 27", preview: <Tabs27 /> },
  { id: "tabs-28", title: "Tabs 28", preview: <Tabs28 /> },
  { id: "tabs-29", title: "Tabs 29", preview: <Tabs29 /> },
];

export default function TabsPage() {
  return (
    <ComponentLayout>
      {/* Page Header */}
      <div className="mb-4 flex gap-x-8 gap-y-4 max-md:flex-col">
        <div className="space-y-3">
          <h1 className="text-2xl font-bold sm:text-3xl">Shadcn Tabs</h1>
          <p className="text-muted-foreground">
            Explore the collection of awesome Shadcn Tabs Components, featuring {variants.length} tabs
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
          <p className="font-medium">Have any suggestions for Tabs variants?</p>
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
