"use client";

import { ComponentLayout } from "@/components/layout/component-layout";
import { useState } from "react";
import { X, Sparkles, Code2, Copy, Check, CircleAlert, TriangleAlert, Info, Settings, Bold, Italic, Underline, Star, Heart, MapPin, Calendar, CheckCircle2, Clock, Users, FolderOpen, ListTodo } from "lucide-react";
import ReactDOM from "react-dom";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";

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

// --- Tooltip Variant Previews ---

function Tooltip01() {
  return (
    <div className="flex items-center justify-center">
      <TooltipProvider>
        <Tooltip defaultOpen>
          <TooltipTrigger asChild>
            <Button variant="outline" size="sm">Default</Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Add to library</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
}

function Tooltip02() {
  return (
    <div className="flex items-center justify-center">
      <TooltipProvider>
        <Tooltip defaultOpen>
          <TooltipTrigger asChild>
            <Button variant="outline" size="sm">Light</Button>
          </TooltipTrigger>
          <TooltipContent className="bg-background text-foreground border shadow-md">
            <p>Add to library</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
}

function Tooltip03() {
  return (
    <div className="flex items-center justify-center">
      <TooltipProvider>
        <Tooltip defaultOpen>
          <TooltipTrigger asChild>
            <Button variant="outline" size="sm">No arrow</Button>
          </TooltipTrigger>
          <TooltipContent className="rounded-md">
            <p>Add to library</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
}

function Tooltip04() {
  return (
    <div className="flex items-center justify-center">
      <TooltipProvider>
        <Tooltip defaultOpen>
          <TooltipTrigger asChild>
            <Button variant="outline" size="sm">Error</Button>
          </TooltipTrigger>
          <TooltipContent className="bg-destructive text-destructive-foreground border-destructive">
            <p>This field is required</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
}

function Tooltip05() {
  return (
    <div className="flex items-center justify-center">
      <TooltipProvider>
        <Tooltip defaultOpen>
          <TooltipTrigger asChild>
            <Button variant="outline" size="sm">Icon</Button>
          </TooltipTrigger>
          <TooltipContent className="flex items-center gap-2">
            <Info className="h-3.5 w-3.5" />
            <p>More information</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
}

function Tooltip06() {
  return (
    <div className="flex items-center justify-center">
      <TooltipProvider>
        <Tooltip defaultOpen>
          <TooltipTrigger asChild>
            <Button variant="outline" size="sm">Rounded</Button>
          </TooltipTrigger>
          <TooltipContent className="rounded-full px-4">
            <p>Add to library</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
}

function Tooltip07() {
  return (
    <div className="flex items-center justify-center">
      <TooltipProvider>
        <Tooltip defaultOpen>
          <TooltipTrigger asChild>
            <Button variant="outline" size="sm">Content</Button>
          </TooltipTrigger>
          <TooltipContent className="max-w-[220px] p-3">
            <p className="font-semibold text-sm">Keyboard Shortcuts</p>
            <p className="text-xs text-muted-foreground mt-1">Press &apos;?&apos; to see all available shortcuts.</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
}

function Tooltip08() {
  return (
    <div className="flex items-center justify-center">
      <TooltipProvider>
        <Tooltip defaultOpen>
          <TooltipTrigger asChild>
            <Button variant="outline" size="sm">Avatar</Button>
          </TooltipTrigger>
          <TooltipContent className="flex items-center gap-2 p-2">
            <Avatar className="h-6 w-6">
              <AvatarImage src="https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-3.png" alt="User" />
              <AvatarFallback>HL</AvatarFallback>
            </Avatar>
            <p className="text-sm">Howard Lloyd</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
}

function Tooltip09() {
  return (
    <div className="flex items-center justify-center">
      <TooltipProvider>
        <Tooltip defaultOpen>
          <TooltipTrigger asChild>
            <Button variant="outline" size="sm">Badge</Button>
          </TooltipTrigger>
          <TooltipContent className="flex items-center gap-2 p-2">
            <p className="text-sm">Status</p>
            <Badge variant="secondary" className="text-xs">New</Badge>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
}

function Tooltip10() {
  return (
    <div className="flex flex-wrap gap-2 justify-center">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="outline" size="sm">Left</Button>
          </TooltipTrigger>
          <TooltipContent side="left">
            <p>Left tooltip</p>
          </TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="outline" size="sm">Top</Button>
          </TooltipTrigger>
          <TooltipContent side="top">
            <p>Top tooltip</p>
          </TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="outline" size="sm">Bottom</Button>
          </TooltipTrigger>
          <TooltipContent side="bottom">
            <p>Bottom tooltip</p>
          </TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="outline" size="sm">Right</Button>
          </TooltipTrigger>
          <TooltipContent side="right">
            <p>Right tooltip</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
}

function Tooltip11() {
  return (
    <div className="flex items-center justify-center">
      <HoverCard>
        <HoverCardTrigger asChild>
          <Button variant="link">Hover Card Media</Button>
        </HoverCardTrigger>
        <HoverCardContent className="w-80">
          <div className="overflow-hidden rounded-md mb-3">
            <img
              src="https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-3.png"
              alt="Media preview"
              className="h-32 w-full object-cover"
            />
          </div>
          <div className="space-y-1">
            <h4 className="text-sm font-semibold">Beautiful Landscape</h4>
            <p className="text-sm text-muted-foreground">A stunning view of mountains during sunset.</p>
          </div>
        </HoverCardContent>
      </HoverCard>
    </div>
  );
}

function Tooltip12() {
  return (
    <div className="flex items-center justify-center">
      <HoverCard>
        <HoverCardTrigger asChild>
          <Button variant="link">Hover Card Stats</Button>
        </HoverCardTrigger>
        <HoverCardContent className="w-72">
          <div className="space-y-3">
            <h4 className="text-sm font-semibold">Project Statistics</h4>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground">Downloads</p>
                <p className="text-lg font-bold">12.4k</p>
              </div>
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground">Stars</p>
                <p className="text-lg font-bold">3.2k</p>
              </div>
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground">Forks</p>
                <p className="text-lg font-bold">842</p>
              </div>
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground">Issues</p>
                <p className="text-lg font-bold">23</p>
              </div>
            </div>
          </div>
        </HoverCardContent>
      </HoverCard>
    </div>
  );
}

function Tooltip13() {
  return (
    <div className="flex items-center justify-center">
      <HoverCard>
        <HoverCardTrigger asChild>
          <Button variant="link">Hover Card Project</Button>
        </HoverCardTrigger>
        <HoverCardContent className="w-80">
          <div className="flex gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-primary/10">
              <FolderOpen className="h-5 w-5 text-primary" />
            </div>
            <div className="space-y-1">
              <h4 className="text-sm font-semibold">Design System</h4>
              <p className="text-sm text-muted-foreground">A collection of reusable components and guidelines for building consistent UIs.</p>
              <div className="flex items-center gap-2 pt-1">
                <Calendar className="h-3 w-3 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">Updated Dec 2024</span>
              </div>
            </div>
          </div>
        </HoverCardContent>
      </HoverCard>
    </div>
  );
}

function Tooltip14() {
  return (
    <div className="flex items-center justify-center">
      <HoverCard>
        <HoverCardTrigger asChild>
          <Button variant="link">Hover Card Alert</Button>
        </HoverCardTrigger>
        <HoverCardContent className="w-80">
          <div className="flex gap-3">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-amber-500/10">
              <TriangleAlert className="h-4 w-4 text-amber-500" />
            </div>
            <div className="space-y-1">
              <h4 className="text-sm font-semibold text-amber-600 dark:text-amber-400">Warning</h4>
              <p className="text-sm text-muted-foreground">This action cannot be undone. Please review before proceeding.</p>
            </div>
          </div>
        </HoverCardContent>
      </HoverCard>
    </div>
  );
}

function Tooltip15() {
  return (
    <div className="flex items-center justify-center">
      <HoverCard>
        <HoverCardTrigger asChild>
          <Button variant="link">Hover Card Tasks</Button>
        </HoverCardTrigger>
        <HoverCardContent className="w-72">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <ListTodo className="h-4 w-4 text-primary" />
              <h4 className="text-sm font-semibold">Sprint Tasks</h4>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <CheckCircle2 className="h-3.5 w-3.5 text-green-500" />
                <span className="line-through text-muted-foreground">Setup project structure</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <CheckCircle2 className="h-3.5 w-3.5 text-green-500" />
                <span className="line-through text-muted-foreground">Design component API</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Clock className="h-3.5 w-3.5 text-amber-500" />
                <span>Write documentation</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Clock className="h-3.5 w-3.5 text-muted-foreground" />
                <span>Add unit tests</span>
              </div>
            </div>
            <div className="h-1.5 w-full rounded-full bg-muted overflow-hidden">
              <div className="h-full w-1/2 rounded-full bg-primary" />
            </div>
            <p className="text-xs text-muted-foreground">2 of 4 tasks completed</p>
          </div>
        </HoverCardContent>
      </HoverCard>
    </div>
  );
}

function Tooltip16() {
  return (
    <div className="space-y-4">
      <div className="flex w-full flex-row items-center justify-center">
        {[
          { name: "Howard Lloyd", src: "https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-3.png", initials: "HL" },
          { name: "Olivia Sparks", src: "https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-6.png", initials: "OS" },
          { name: "Hallie Richards", src: "https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-5.png", initials: "HR" },
          { name: "Jenny Wilson", src: "https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-16.png", initials: "JW" },
        ].map((person) => (
          <div key={person.name} className="relative -me-2.5">
            <Avatar className="size-10 ring-2 ring-background transition-all duration-300 ease-in-out hover:z-10 hover:scale-105">
              <AvatarImage src={person.src} alt={person.name} />
              <AvatarFallback>{person.initials}</AvatarFallback>
            </Avatar>
          </div>
        ))}
      </div>
      <p className="text-muted-foreground text-xs">Inspired by{" "}<a className="hover:text-foreground underline" href="https://ui.aceternity.com/components/animated-tooltip" target="_blank" rel="noopener noreferrer">Aceternity UI</a></p>
    </div>
  );
}

function Tooltip17() {
  return (
    <div className="space-y-4">
      <TooltipProvider>
        <div className="flex -space-x-2 justify-center">
          {[
            { name: "Howard Lloyd", src: "https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-3.png", initials: "HL" },
            { name: "Olivia Sparks", src: "https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-6.png", initials: "OS" },
            { name: "Hallie Richards", src: "https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-5.png", initials: "HR" },
            { name: "Jenny Wilson", src: "https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-16.png", initials: "JW" },
          ].map((person) => (
            <Tooltip key={person.name}>
              <TooltipTrigger asChild>
                <Avatar className="size-10 ring-2 ring-background transition-all duration-300 ease-in-out hover:z-10 hover:scale-105 cursor-pointer">
                  <AvatarImage src={person.src} alt={person.name} />
                  <AvatarFallback>{person.initials}</AvatarFallback>
                </Avatar>
              </TooltipTrigger>
              <TooltipContent side="top">
                <p>{person.name}</p>
              </TooltipContent>
            </Tooltip>
          ))}
        </div>
      </TooltipProvider>
      <p className="text-muted-foreground text-xs">Inspired by{" "}<a className="hover:text-foreground underline" href="https://animate-ui.com/docs/components/tooltip" target="_blank" rel="noopener noreferrer">Animate UI</a></p>
    </div>
  );
}

// --- Code strings ---
const codes: Record<string, string> = {
  "tooltip-01": `import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Button } from "@/components/ui/button"

export default function Tooltip01() {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline" size="sm">Default</Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Add to library</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}`,
  "tooltip-02": `import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Button } from "@/components/ui/button"

export default function Tooltip02() {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline" size="sm">Light</Button>
        </TooltipTrigger>
        <TooltipContent className="bg-background text-foreground border shadow-md">
          <p>Add to library</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}`,
  "tooltip-04": `import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Button } from "@/components/ui/button"

export default function Tooltip04() {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline" size="sm">Error</Button>
        </TooltipTrigger>
        <TooltipContent className="bg-destructive text-destructive-foreground border-destructive">
          <p>This field is required</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}`,
  "tooltip-07": `import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Button } from "@/components/ui/button"

export default function Tooltip07() {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline" size="sm">Content</Button>
        </TooltipTrigger>
        <TooltipContent className="max-w-[220px] p-3">
          <p className="font-semibold text-sm">Keyboard Shortcuts</p>
          <p className="text-xs text-muted-foreground mt-1">Press '?' to see all available shortcuts.</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}`,
  "tooltip-10": `import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Button } from "@/components/ui/button"

export default function Tooltip10() {
  return (
    <TooltipProvider>
      <div className="flex flex-wrap gap-2">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="outline" size="sm">Left</Button>
          </TooltipTrigger>
          <TooltipContent side="left">Left tooltip</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="outline" size="sm">Top</Button>
          </TooltipTrigger>
          <TooltipContent side="top">Top tooltip</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="outline" size="sm">Bottom</Button>
          </TooltipTrigger>
          <TooltipContent side="bottom">Bottom tooltip</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="outline" size="sm">Right</Button>
          </TooltipTrigger>
          <TooltipContent side="right">Right tooltip</TooltipContent>
        </Tooltip>
      </div>
    </TooltipProvider>
  )
}`,
  "tooltip-17": `import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"

const people = [
  { name: "Howard Lloyd", src: "https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-3.png", initials: "HL" },
  { name: "Olivia Sparks", src: "https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-6.png", initials: "OS" },
  { name: "Hallie Richards", src: "https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-5.png", initials: "HR" },
  { name: "Jenny Wilson", src: "https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-16.png", initials: "JW" },
]

export default function Tooltip17() {
  return (
    <TooltipProvider>
      <div className="flex -space-x-2">
        {people.map((person) => (
          <Tooltip key={person.name}>
            <TooltipTrigger asChild>
              <Avatar className="size-10 ring-2 ring-background hover:z-10 hover:scale-105 transition-all cursor-pointer">
                <AvatarImage src={person.src} alt={person.name} />
                <AvatarFallback>{person.initials}</AvatarFallback>
              </Avatar>
            </TooltipTrigger>
            <TooltipContent side="top">{person.name}</TooltipContent>
          </Tooltip>
        ))}
      </div>
    </TooltipProvider>
  )
}`,
};

function getCode(id: string) {
  return codes[id] || codes["tooltip-01"]!.replace("Tooltip01", id.replace("tooltip-", "Tooltip"));
}

// --- Variants ---
const variants = [
  { id: "tooltip-01", title: "Tooltip 1", preview: <Tooltip01 /> },
  { id: "tooltip-02", title: "Tooltip 2", preview: <Tooltip02 /> },
  { id: "tooltip-03", title: "Tooltip 3", preview: <Tooltip03 /> },
  { id: "tooltip-04", title: "Tooltip 4", preview: <Tooltip04 /> },
  { id: "tooltip-05", title: "Tooltip 5", preview: <Tooltip05 /> },
  { id: "tooltip-06", title: "Tooltip 6", preview: <Tooltip06 /> },
  { id: "tooltip-07", title: "Tooltip 7", preview: <Tooltip07 /> },
  { id: "tooltip-08", title: "Tooltip 8", preview: <Tooltip08 /> },
  { id: "tooltip-09", title: "Tooltip 9", preview: <Tooltip09 /> },
  { id: "tooltip-10", title: "Tooltip 10", preview: <Tooltip10 /> },
  { id: "tooltip-11", title: "Tooltip 11", preview: <Tooltip11 /> },
  { id: "tooltip-12", title: "Tooltip 12", preview: <Tooltip12 /> },
  { id: "tooltip-13", title: "Tooltip 13", preview: <Tooltip13 /> },
  { id: "tooltip-14", title: "Tooltip 14", preview: <Tooltip14 /> },
  { id: "tooltip-15", title: "Tooltip 15", preview: <Tooltip15 /> },
  { id: "tooltip-16", title: "Tooltip 16", preview: <Tooltip16 /> },
  { id: "tooltip-17", title: "Tooltip 17", preview: <Tooltip17 /> },
];

export default function TooltipPage() {
  return (
    <ComponentLayout>
      {/* Page Header */}
      <div className="mb-4 flex gap-x-8 gap-y-4 max-md:flex-col">
        <div className="space-y-3">
          <h1 className="text-2xl font-bold sm:text-3xl">Shadcn Tooltip</h1>
          <p className="text-muted-foreground">
            Explore the collection of awesome Shadcn Tooltip Components, featuring {variants.length} tooltip
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
          <p className="font-medium">Have any suggestions for Tooltip variants?</p>
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
