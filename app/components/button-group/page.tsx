"use client";

import { Button, Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@ipareddes/ui-components";

import { ComponentLayout } from "@/components/layout/component-layout";
import { useState } from "react";
import { X, Sparkles, Code2, Copy, Check, Download, Heart, MousePointer, Square, Type, SkipBack, Play, Pause, SkipForward, Twitch, Dribbble, Github, ZoomOut, ZoomIn, Minus, Plus, ExternalLink, SquarePen, CopyIcon, Trash2, FlipHorizontal, FlipVertical, ChevronDown, Settings, Box, LayoutGrid, Inbox, Archive, Send, ThumbsUp, ThumbsDown, ChevronLeft, ChevronRight, Upload as UploadIcon } from "lucide-react";
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

// --- Button Group Variant Previews ---

function ButtonGroup01() {
  return (
    <div className="inline-flex w-fit -space-x-px rounded-md shadow-xs rtl:space-x-reverse">
      <Button variant="outline" className="rounded-none rounded-l-md shadow-none focus-visible:z-10">
        <Download className="h-4 w-4" />
        Download
      </Button>
      <span className="bg-background dark:border-input dark:bg-input/30 flex items-center rounded-r-md border px-3 text-sm font-medium">15k</span>
    </div>
  );
}

function ButtonGroup02() {
  return (
    <div className="inline-flex w-fit -space-x-px rounded-md shadow-xs rtl:space-x-reverse">
      <Button variant="outline" className="rounded-none rounded-l-md shadow-none focus-visible:z-10">
        <Heart className="h-4 w-4 fill-destructive stroke-destructive" />
        Like
      </Button>
      <span className="bg-background dark:border-input dark:bg-input/30 flex items-center rounded-r-md border px-3 text-sm font-medium">46</span>
    </div>
  );
}

function ButtonGroup03() {
  return (
    <div className="inline-flex w-fit -space-x-px rounded-md shadow-xs rtl:space-x-reverse">
      <Button variant="outline" size="icon" className="rounded-none rounded-l-md shadow-none focus-visible:z-10">
        <MousePointer className="h-4 w-4" />
        <span className="sr-only">Select</span>
      </Button>
      <Button variant="outline" size="icon" className="rounded-none shadow-none focus-visible:z-10">
        <Square className="h-4 w-4" />
        <span className="sr-only">Shapes</span>
      </Button>
      <Button variant="outline" size="icon" className="rounded-none shadow-none focus-visible:z-10">
        <Type className="h-4 w-4" />
        <span className="sr-only">Text</span>
      </Button>
      <Button variant="outline" size="icon" className="rounded-none rounded-r-md shadow-none focus-visible:z-10">
        <LayoutGrid className="h-4 w-4" />
        <span className="sr-only">Grid</span>
      </Button>
    </div>
  );
}

function ButtonGroup04() {
  return (
    <div className="divide-primary-foreground/30 inline-flex w-fit divide-x rounded-full shadow-xs">
      <Button className="rounded-none rounded-l-full focus-visible:z-10" size="icon">
        <SkipBack className="h-4 w-4" />
        <span className="sr-only">Skip Back</span>
      </Button>
      <Button className="rounded-none focus-visible:z-10" size="icon">
        <Play className="h-4 w-4" />
        <span className="sr-only">Play</span>
      </Button>
      <Button className="rounded-none focus-visible:z-10" size="icon">
        <Pause className="h-4 w-4" />
        <span className="sr-only">Pause</span>
      </Button>
      <Button className="rounded-none rounded-r-full focus-visible:z-10" size="icon">
        <SkipForward className="h-4 w-4" />
        <span className="sr-only">Skip Forward</span>
      </Button>
    </div>
  );
}

function ButtonGroup05() {
  return (
    <div className="inline-flex w-fit -space-x-px rounded-md shadow-xs rtl:space-x-reverse">
      <Button variant="outline" size="icon" className="rounded-none rounded-l-md shadow-none hover:!bg-[#9146ff]/10 focus-visible:z-10" asChild>
        <a href="#" target="_blank" rel="noopener noreferrer">
          <Twitch className="h-4 w-4 stroke-[#9146ff]" />
          <span className="sr-only">Twitch</span>
        </a>
      </Button>
      <Button variant="outline" size="icon" className="rounded-none shadow-none hover:!bg-[#EA4C89]/10 focus-visible:z-10" asChild>
        <a href="#" target="_blank" rel="noopener noreferrer">
          <Dribbble className="h-4 w-4 stroke-[#EA4C89]" />
          <span className="sr-only">Dribbble</span>
        </a>
      </Button>
      <Button variant="outline" size="icon" className="rounded-none rounded-r-md shadow-none hover:!bg-foreground/10 focus-visible:z-10" asChild>
        <a href="#" target="_blank" rel="noopener noreferrer">
          <Github className="h-4 w-4" />
          <span className="sr-only">GitHub</span>
        </a>
      </Button>
    </div>
  );
}

function ButtonGroup06() {
  return (
    <div className="inline-flex w-fit -space-x-px rounded-md shadow-xs rtl:space-x-reverse">
      <Button variant="outline" size="icon" className="rounded-none rounded-l-md shadow-none focus-visible:z-10">
        <ZoomOut className="h-4 w-4" />
        <span className="sr-only">Zoom out</span>
      </Button>
      <span className="bg-background dark:border-input dark:bg-input/30 flex items-center border px-3 text-sm font-medium">95%</span>
      <Button variant="outline" size="icon" className="rounded-none rounded-r-md shadow-none focus-visible:z-10">
        <ZoomIn className="h-4 w-4" />
        <span className="sr-only">Zoom in</span>
      </Button>
    </div>
  );
}

function ButtonGroup07() {
  return (
    <div className="divide-primary-foreground/30 inline-flex w-fit divide-x rounded-md shadow-xs">
      <Button className="rounded-none rounded-l-full focus-visible:z-10" size="icon">
        <Minus className="h-4 w-4" />
        <span className="sr-only">Minus</span>
      </Button>
      <span className="bg-primary text-primary-foreground inline-flex items-center px-3 py-2 text-sm font-medium">216px</span>
      <Button className="rounded-none rounded-r-full focus-visible:z-10" size="icon">
        <Plus className="h-4 w-4" />
        <span className="sr-only">Plus</span>
      </Button>
    </div>
  );
}

function ButtonGroup08() {
  return (
    <div className="inline-flex w-fit -space-x-px rounded-md shadow-xs rtl:space-x-reverse">
      <Button variant="outline" className="rounded-none rounded-l-md shadow-none focus-visible:z-10" asChild>
        <a href="#">Live preview</a>
      </Button>
      <Button variant="outline" size="icon" className="rounded-none rounded-r-md shadow-none focus-visible:z-10" asChild>
        <a href="#" target="_blank" rel="noopener noreferrer">
          <ExternalLink className="h-4 w-4" />
          <span className="sr-only">External link</span>
        </a>
      </Button>
    </div>
  );
}

function ButtonGroup09() {
  return (
    <div className="inline-flex w-fit -space-x-px rounded-md shadow-xs rtl:space-x-reverse">
      <Button variant="outline" className="rounded-none rounded-l-md shadow-none focus-visible:z-10">
        <SquarePen className="h-4 w-4" />
        Edit
      </Button>
      <Button variant="outline" className="rounded-none shadow-none focus-visible:z-10">
        <CopyIcon className="h-4 w-4" />
        Duplicate
      </Button>
      <Button variant="outline" className="rounded-none rounded-r-md shadow-none focus-visible:z-10">
        <Trash2 className="h-4 w-4" />
        Delete
      </Button>
    </div>
  );
}

function ButtonGroup10() {
  return (
    <div className="divide-primary-foreground/30 inline-flex w-fit divide-x rounded-md shadow-xs">
      <Button className="rounded-none rounded-l-md focus-visible:z-10" size="icon">
        <FlipHorizontal className="h-4 w-4" />
        <span className="sr-only">Flip Horizontal</span>
      </Button>
      <Button className="rounded-none rounded-r-md focus-visible:z-10" size="icon">
        <FlipVertical className="h-4 w-4" />
        <span className="sr-only">Flip Vertical</span>
      </Button>
    </div>
  );
}

function ButtonGroup11() {
  return (
    <div className="divide-primary-foreground/30 inline-flex w-fit divide-x rounded-md shadow-xs">
      <Button className="rounded-none rounded-l-md focus-visible:z-10">
        Merge pull request
      </Button>
      <Button className="rounded-none rounded-r-md focus-visible:z-10" size="icon">
        <ChevronDown className="h-4 w-4" />
        <span className="sr-only">Select option</span>
      </Button>
    </div>
  );
}

function ButtonGroup12() {
  return (
    <div className="inline-flex w-fit rounded-md rtl:space-x-reverse">
      <Button variant="ghost" className="rounded-none rounded-l-md focus-visible:z-10">
        <Settings className="h-4 w-4" />
        Settings
      </Button>
      <Button variant="ghost" className="rounded-none focus-visible:z-10">
        <Box className="h-4 w-4" />
        Dashboard
      </Button>
      <Button variant="ghost" className="rounded-none rounded-r-md focus-visible:z-10">
        <LayoutGrid className="h-4 w-4" />
        Projects
      </Button>
    </div>
  );
}

function ButtonGroup13() {
  return (
    <div className="inline-flex w-fit -space-x-px rounded-md shadow-xs rtl:space-x-reverse">
      <Button variant="outline" className="rounded-none rounded-l-md shadow-none focus-visible:z-10">
        <Inbox className="h-4 w-4" />
        Inbox
      </Button>
      <Button variant="outline" className="rounded-none shadow-none focus-visible:z-10">
        <Archive className="h-4 w-4" />
        Archived
      </Button>
      <Button variant="outline" className="rounded-none rounded-r-md shadow-none focus-visible:z-10">
        <Send className="h-4 w-4" />
        Sent
      </Button>
    </div>
  );
}

function ButtonGroup14() {
  return (
    <div className="inline-flex w-fit -space-x-px rounded-md shadow-xs rtl:space-x-reverse">
      <Button variant="outline" className="group w-20 justify-start gap-3 overflow-hidden rounded-none rounded-l-md shadow-none transition-all duration-200 not-hover:w-10 hover:bg-sky-500/10 hover:text-sky-500 focus-visible:z-10 dark:hover:bg-sky-400/10 dark:hover:text-sky-400">
        <ThumbsUp className="h-4 w-4 shrink-0" />
        Like
      </Button>
      <Button variant="outline" className="group w-24 justify-end gap-3 overflow-hidden rounded-none rounded-r-md shadow-none transition-all duration-200 not-hover:w-10 hover:!bg-destructive/10 hover:text-destructive focus-visible:z-10">
        Dislike
        <ThumbsDown className="h-4 w-4 shrink-0" />
      </Button>
    </div>
  );
}

function ButtonGroup15() {
  return (
    <div className="divide-primary-foreground/30 inline-flex w-fit divide-x rounded-md shadow-xs">
      <Button className="rounded-none rounded-l-md transition-none focus-visible:z-10">
        <ChevronLeft className="h-4 w-4" />
        Previous
      </Button>
      <Button className="rounded-none rounded-r-md transition-none focus-visible:z-10">
        Next
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  );
}

function ButtonGroup16() {
  return (
    <div className="divide-primary-foreground/30 inline-flex w-fit divide-x rounded-md shadow-xs">
      <Button className="rounded-none rounded-l-md relative overflow-hidden before:absolute before:inset-0 before:rounded-[inherit] before:bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.35)_50%,transparent_75%,transparent_100%)] before:bg-[length:250%_250%,100%_100%] before:bg-[position:200%_0,0_0] before:bg-no-repeat before:transition-[background-position_0s_ease] before:duration-1000 hover:before:bg-[position:-100%_0,0_0] focus-visible:z-10 dark:before:bg-[linear-gradient(45deg,transparent_25%,rgba(0,0,0,0.2)_50%,transparent_75%,transparent_100%)]">
        Upload
      </Button>
      <Button className="rounded-none relative overflow-hidden before:absolute before:inset-0 before:rounded-[inherit] before:bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.35)_50%,transparent_75%,transparent_100%)] before:bg-[length:250%_250%,100%_100%] before:bg-[position:200%_0,0_0] before:bg-no-repeat before:transition-[background-position_0s_ease] before:duration-1000 hover:before:bg-[position:-100%_0,0_0] focus-visible:z-10 dark:before:bg-[linear-gradient(45deg,transparent_25%,rgba(0,0,0,0.2)_50%,transparent_75%,transparent_100%)]">
        Download
      </Button>
      <Button className="rounded-none rounded-r-md relative overflow-hidden before:absolute before:inset-0 before:rounded-[inherit] before:bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.35)_50%,transparent_75%,transparent_100%)] before:bg-[length:250%_250%,100%_100%] before:bg-[position:200%_0,0_0] before:bg-no-repeat before:transition-[background-position_0s_ease] before:duration-1000 hover:before:bg-[position:-100%_0,0_0] focus-visible:z-10 dark:before:bg-[linear-gradient(45deg,transparent_25%,rgba(0,0,0,0.2)_50%,transparent_75%,transparent_100%)]">
        Share
      </Button>
    </div>
  );
}

// --- Code strings ---
const codes: Record<string, string> = {
  "button-group-01": `import { Download } from "lucide-react"

export default function ButtonGroup01() {
  return (
    <div className="inline-flex w-fit -space-x-px rounded-md shadow-xs rtl:space-x-reverse">
      <Button variant="outline" className="rounded-none rounded-l-md shadow-none focus-visible:z-10">
        <Download className="h-4 w-4" />
        Download
      </Button>
      <span className="bg-background dark:border-input dark:bg-input/30 flex items-center rounded-r-md border px-3 text-sm font-medium">15k</span>
    </div>
  )
}`,
  "button-group-02": `import { Heart } from "lucide-react"

export default function ButtonGroup02() {
  return (
    <div className="inline-flex w-fit -space-x-px rounded-md shadow-xs rtl:space-x-reverse">
      <Button variant="outline" className="rounded-none rounded-l-md shadow-none focus-visible:z-10">
        <Heart className="h-4 w-4 fill-destructive stroke-destructive" />
        Like
      </Button>
      <span className="bg-background dark:border-input dark:bg-input/30 flex items-center rounded-r-md border px-3 text-sm font-medium">46</span>
    </div>
  )
}`,
  "button-group-05": `import { Twitch, Dribbble, Github } from "lucide-react"

export default function ButtonGroup05() {
  return (
    <div className="inline-flex w-fit -space-x-px rounded-md shadow-xs rtl:space-x-reverse">
      <Button variant="outline" size="icon" className="rounded-none rounded-l-md shadow-none hover:!bg-[#9146ff]/10 focus-visible:z-10" asChild>
        <a href="#" target="_blank" rel="noopener noreferrer">
          <Twitch className="h-4 w-4 stroke-[#9146ff]" />
          <span className="sr-only">Twitch</span>
        </a>
      </Button>
      <Button variant="outline" size="icon" className="rounded-none shadow-none hover:!bg-[#EA4C89]/10 focus-visible:z-10" asChild>
        <a href="#" target="_blank" rel="noopener noreferrer">
          <Dribbble className="h-4 w-4 stroke-[#EA4C89]" />
          <span className="sr-only">Dribbble</span>
        </a>
      </Button>
      <Button variant="outline" size="icon" className="rounded-none rounded-r-md shadow-none hover:!bg-foreground/10 focus-visible:z-10" asChild>
        <a href="#" target="_blank" rel="noopener noreferrer">
          <Github className="h-4 w-4" />
          <span className="sr-only">GitHub</span>
        </a>
      </Button>
    </div>
  )
}`,
  "button-group-11": `import { ChevronDown } from "lucide-react"

export default function ButtonGroup11() {
  return (
    <div className="divide-primary-foreground/30 inline-flex w-fit divide-x rounded-md shadow-xs">
      <Button className="rounded-none rounded-l-md focus-visible:z-10">
        Merge pull request
      </Button>
      <Button className="rounded-none rounded-r-md focus-visible:z-10" size="icon">
        <ChevronDown className="h-4 w-4" />
        <span className="sr-only">Select option</span>
      </Button>
    </div>
  )
}`,
  "button-group-15": `import { ChevronLeft, ChevronRight } from "lucide-react"

export default function ButtonGroup15() {
  return (
    <div className="divide-primary-foreground/30 inline-flex w-fit divide-x rounded-md shadow-xs">
      <Button className="rounded-none rounded-l-md transition-none focus-visible:z-10">
        <ChevronLeft className="h-4 w-4" />
        Previous
      </Button>
      <Button className="rounded-none rounded-r-md transition-none focus-visible:z-10">
        Next
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  )
}`,
};

function getCode(id: string) {
  return codes[id] || codes["button-group-01"]!.replace("ButtonGroup01", id.replace("button-group-", "ButtonGroup"));
}

// --- Variants ---
const variants = [
  { id: "button-group-01", title: "Button Group 1", preview: <ButtonGroup01 /> },
  { id: "button-group-02", title: "Button Group 2", preview: <ButtonGroup02 /> },
  { id: "button-group-03", title: "Button Group 3", preview: <ButtonGroup03 /> },
  { id: "button-group-04", title: "Button Group 4", preview: <ButtonGroup04 /> },
  { id: "button-group-05", title: "Button Group 5", preview: <ButtonGroup05 /> },
  { id: "button-group-06", title: "Button Group 6", preview: <ButtonGroup06 /> },
  { id: "button-group-07", title: "Button Group 7", preview: <ButtonGroup07 /> },
  { id: "button-group-08", title: "Button Group 8", preview: <ButtonGroup08 /> },
  { id: "button-group-09", title: "Button Group 9", preview: <ButtonGroup09 /> },
  { id: "button-group-10", title: "Button Group 10", preview: <ButtonGroup10 /> },
  { id: "button-group-11", title: "Button Group 11", preview: <ButtonGroup11 /> },
  { id: "button-group-12", title: "Button Group 12", preview: <ButtonGroup12 /> },
  { id: "button-group-13", title: "Button Group 13", preview: <ButtonGroup13 /> },
  { id: "button-group-14", title: "Button Group 14", preview: <ButtonGroup14 /> },
  { id: "button-group-15", title: "Button Group 15", preview: <ButtonGroup15 /> },
  { id: "button-group-16", title: "Button Group 16", preview: <ButtonGroup16 /> },
];

export default function ButtonGroupPage() {
  return (
    <ComponentLayout>
      {/* Page Header */}
      <div className="mb-4 flex gap-x-8 gap-y-4 max-md:flex-col">
        <div className="space-y-3">
          <h1 className="text-2xl font-bold sm:text-3xl">Shadcn Button Group</h1>
          <p className="text-muted-foreground">
            Explore the collection of awesome Shadcn Button Group Components, featuring {variants.length} button group
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
          <p className="font-medium">Have any suggestions for Button Group variants?</p>
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
