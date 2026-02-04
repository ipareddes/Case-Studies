"use client";

import { Label, Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious, Select, SelectContent, SelectItem, SelectTrigger, SelectValue, Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@ipareddes/ui-components";

import { ComponentLayout } from "@/components/layout/component-layout";
import { useState } from "react";
import { X, Sparkles, Code2, Copy, Check, ChevronLeft, ChevronRight, ChevronFirst, ChevronLast } from "lucide-react";
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

// --- Pagination Variant Previews ---

function Pagination01() {
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious href="#" />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">1</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#" isActive>2</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">3</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationNext href="#" />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}

function Pagination02() {
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationLink href="#" aria-label="Go to previous page">
            <ChevronLeft className="size-4" />
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">1</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#" isActive>2</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">3</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#" aria-label="Go to next page">
            <ChevronRight className="size-4" />
          </PaginationLink>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}

function Pagination03() {
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious href="#" />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">1</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#" isActive className="bg-primary text-primary-foreground hover:bg-primary/90 hover:!text-primary-foreground dark:bg-primary dark:text-primary-foreground dark:hover:text-primary-foreground dark:hover:bg-primary/90 !shadow-none dark:border-transparent">
            2
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">3</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationNext href="#" />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}

function Pagination04() {
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious href="#" />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">1</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#" isActive className="bg-secondary text-secondary-foreground hover:bg-secondary/80 hover:!text-secondary-foreground !border-none !shadow-none">
            2
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">3</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationNext href="#" />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}

function Pagination05() {
  return (
    <Pagination>
      <PaginationContent className="gap-0 divide-x overflow-hidden rounded-lg border">
        <PaginationItem>
          <PaginationPrevious href="#" className="rounded-none" />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#" className="rounded-none border-none">1</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#" isActive className="rounded-none border-none bg-primary text-primary-foreground hover:bg-primary/90 hover:!text-primary-foreground dark:bg-primary dark:text-primary-foreground dark:hover:text-primary-foreground dark:hover:bg-primary/90 dark:border-transparent">
            2
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#" className="rounded-none border-none">3</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationNext href="#" className="rounded-none" />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}

function Pagination06() {
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious href="#" className="rounded-full" />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#" className="rounded-full">1</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#" isActive className="rounded-full">2</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#" className="rounded-full">3</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationNext href="#" className="rounded-full" />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}

function Pagination07() {
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationLink href="#" className="rounded-full" aria-label="Go to first page">
            <ChevronFirst className="size-4" />
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#" className="rounded-full" aria-label="Go to previous page">
            <ChevronLeft className="size-4" />
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#" className="rounded-full">1</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#" isActive className="rounded-full">2</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#" className="rounded-full">3</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#" className="rounded-full" aria-label="Go to next page">
            <ChevronRight className="size-4" />
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#" className="rounded-full" aria-label="Go to last page">
            <ChevronLast className="size-4" />
          </PaginationLink>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}

function Pagination08() {
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious href="#" />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">1</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#" isActive>2</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">9</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">10</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationNext href="#" />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}

function Pagination09() {
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious href="#" className="rounded-none" />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#" isActive className="rounded-none border-0 border-b-2 border-primary! bg-transparent! !shadow-none">
            1
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#" className="rounded-none">2</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#" className="rounded-none">3</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationNext href="#" className="rounded-none" />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}

function Pagination10() {
  return (
    <Pagination>
      <PaginationContent className="rounded-md border p-1 shadow-xs">
        <PaginationItem>
          <PaginationPrevious href="#" />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">1</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#" isActive>2</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">3</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationNext href="#" />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}

function Pagination11() {
  return (
    <Pagination>
      <PaginationContent className="w-full justify-between">
        <PaginationItem>
          <PaginationPrevious href="#" className="border" />
        </PaginationItem>
        <PaginationItem>
          <PaginationNext href="#" className="border" />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}

function Pagination12() {
  return (
    <Pagination>
      <PaginationContent className="w-full justify-between">
        <PaginationItem>
          <PaginationPrevious href="#" className="border" />
        </PaginationItem>
        <PaginationItem>
          <p className="text-muted-foreground text-sm" aria-live="polite">
            Page <span className="text-foreground">2</span> of <span className="text-foreground">5</span>
          </p>
        </PaginationItem>
        <PaginationItem>
          <PaginationNext href="#" className="border" />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}

function Pagination13() {
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationLink href="#" aria-label="Go to previous page">
            <ChevronLeft className="size-4" />
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <p className="text-muted-foreground text-sm" aria-live="polite">
            Page <span className="text-foreground">2</span> of <span className="text-foreground">5</span>
          </p>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#" aria-label="Go to next page">
            <ChevronRight className="size-4" />
          </PaginationLink>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}

function Pagination14() {
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationLink href="#" className="rounded-full" aria-label="Go to first page">
            <ChevronFirst className="size-4" />
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#" className="rounded-full" aria-label="Go to previous page">
            <ChevronLeft className="size-4" />
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <Select defaultValue="2">
            <SelectTrigger className="w-fit whitespace-nowrap">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">1</SelectItem>
              <SelectItem value="2">2</SelectItem>
              <SelectItem value="3">3</SelectItem>
              <SelectItem value="4">4</SelectItem>
              <SelectItem value="5">5</SelectItem>
            </SelectContent>
          </Select>
        </PaginationItem>
        <PaginationItem>
          <p className="text-muted-foreground text-sm whitespace-nowrap" aria-live="polite">
            of <span className="text-foreground">5</span> pages
          </p>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#" className="rounded-full" aria-label="Go to next page">
            <ChevronRight className="size-4" />
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#" className="rounded-full" aria-label="Go to last page">
            <ChevronLast className="size-4" />
          </PaginationLink>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}

function Pagination15() {
  return (
    <div className="flex w-full flex-wrap items-center justify-between gap-6 max-sm:justify-center">
      <div className="flex shrink-0 items-center gap-3">
        <Label>Rows per page</Label>
        <Select defaultValue="10">
          <SelectTrigger className="w-fit whitespace-nowrap">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="5">5</SelectItem>
            <SelectItem value="10">10</SelectItem>
            <SelectItem value="25">25</SelectItem>
            <SelectItem value="50">50</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="text-muted-foreground flex grow items-center justify-end whitespace-nowrap max-sm:justify-center">
        <p className="text-muted-foreground text-sm whitespace-nowrap" aria-live="polite">
          Showing <span className="text-foreground">1</span> to <span className="text-foreground">10</span> of{" "}
          <span className="text-foreground">100</span> products
        </p>
      </div>
      <Pagination className="w-fit max-sm:mx-0">
        <PaginationContent>
          <PaginationItem>
            <PaginationLink href="#" className="rounded-full" aria-label="Go to first page">
              <ChevronFirst className="size-4" />
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#" className="rounded-full" aria-label="Go to previous page">
              <ChevronLeft className="size-4" />
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#" className="rounded-full">1</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#" isActive className="rounded-full">2</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#" className="rounded-full">3</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#" className="rounded-full" aria-label="Go to next page">
              <ChevronRight className="size-4" />
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#" className="rounded-full" aria-label="Go to last page">
              <ChevronLast className="size-4" />
            </PaginationLink>
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}

// --- Code strings ---
const codes: Record<string, string> = {
  "pagination-01": `
export default function Pagination01() {
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious href="#" />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">1</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#" isActive>2</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">3</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationNext href="#" />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}`,
  "pagination-05": `
export default function Pagination05() {
  return (
    <Pagination>
      <PaginationContent className="gap-0 divide-x overflow-hidden rounded-lg border">
        <PaginationItem>
          <PaginationPrevious href="#" className="rounded-none" />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#" className="rounded-none border-none">1</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#" isActive className="rounded-none border-none bg-primary text-primary-foreground hover:bg-primary/90">
            2
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#" className="rounded-none border-none">3</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationNext href="#" className="rounded-none" />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}`,
  "pagination-08": `
export default function Pagination08() {
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious href="#" />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">1</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#" isActive>2</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">9</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">10</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationNext href="#" />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}`,
  "pagination-12": `
export default function Pagination12() {
  return (
    <Pagination>
      <PaginationContent className="w-full justify-between">
        <PaginationItem>
          <PaginationPrevious href="#" className="border" />
        </PaginationItem>
        <PaginationItem>
          <p className="text-muted-foreground text-sm">
            Page <span className="text-foreground">2</span> of <span className="text-foreground">5</span>
          </p>
        </PaginationItem>
        <PaginationItem>
          <PaginationNext href="#" className="border" />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}`,
  "pagination-15": `import { ChevronFirst, ChevronLeft, ChevronRight, ChevronLast } from "lucide-react"

export default function Pagination15() {
  return (
    <div className="flex w-full flex-wrap items-center justify-between gap-6 max-sm:justify-center">
      <div className="flex shrink-0 items-center gap-3">
        <Label>Rows per page</Label>
        <Select defaultValue="10">
          <SelectTrigger className="w-fit whitespace-nowrap">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="5">5</SelectItem>
            <SelectItem value="10">10</SelectItem>
            <SelectItem value="25">25</SelectItem>
            <SelectItem value="50">50</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="text-muted-foreground flex grow items-center justify-end whitespace-nowrap max-sm:justify-center">
        <p className="text-muted-foreground text-sm whitespace-nowrap">
          Showing <span className="text-foreground">1</span> to <span className="text-foreground">10</span> of{" "}
          <span className="text-foreground">100</span> products
        </p>
      </div>
      <Pagination className="w-fit max-sm:mx-0">
        <PaginationContent>
          <PaginationItem>
            <PaginationLink href="#" className="rounded-full" aria-label="Go to first page">
              <ChevronFirst className="size-4" />
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#" className="rounded-full" aria-label="Go to previous page">
              <ChevronLeft className="size-4" />
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#" className="rounded-full">1</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#" isActive className="rounded-full">2</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#" className="rounded-full">3</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#" className="rounded-full" aria-label="Go to next page">
              <ChevronRight className="size-4" />
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#" className="rounded-full" aria-label="Go to last page">
              <ChevronLast className="size-4" />
            </PaginationLink>
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  )
}`,
};

function getCode(id: string) {
  return codes[id] || codes["pagination-01"]!.replace("Pagination01", id.replace("pagination-", "Pagination"));
}

// --- Variants ---
const variants = [
  { id: "pagination-01", title: "Pagination 1", preview: <Pagination01 /> },
  { id: "pagination-02", title: "Pagination 2", preview: <Pagination02 /> },
  { id: "pagination-03", title: "Pagination 3", preview: <Pagination03 /> },
  { id: "pagination-04", title: "Pagination 4", preview: <Pagination04 /> },
  { id: "pagination-05", title: "Pagination 5", preview: <Pagination05 /> },
  { id: "pagination-06", title: "Pagination 6", preview: <Pagination06 /> },
  { id: "pagination-07", title: "Pagination 7", preview: <Pagination07 /> },
  { id: "pagination-08", title: "Pagination 8", preview: <Pagination08 /> },
  { id: "pagination-09", title: "Pagination 9", preview: <Pagination09 /> },
  { id: "pagination-10", title: "Pagination 10", preview: <Pagination10 /> },
  { id: "pagination-11", title: "Pagination 11", preview: <Pagination11 /> },
  { id: "pagination-12", title: "Pagination 12", preview: <Pagination12 /> },
  { id: "pagination-13", title: "Pagination 13", preview: <Pagination13 /> },
  { id: "pagination-14", title: "Pagination 14", preview: <Pagination14 /> },
  { id: "pagination-15", title: "Pagination 15", preview: <Pagination15 /> },
];

export default function PaginationPage() {
  return (
    <ComponentLayout>
      {/* Page Header */}
      <div className="mb-4 flex gap-x-8 gap-y-4 max-md:flex-col">
        <div className="space-y-3">
          <h1 className="text-2xl font-bold sm:text-3xl">Shadcn Pagination</h1>
          <p className="text-muted-foreground">
            Explore the collection of awesome Shadcn Pagination Components, featuring {variants.length} pagination
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
          <p className="font-medium">Have any suggestions for Pagination variants?</p>
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
