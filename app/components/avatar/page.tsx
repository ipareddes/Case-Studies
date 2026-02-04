"use client";

import { Avatar, AvatarFallback, AvatarImage, Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@ipareddes/ui-components";

import { ComponentLayout } from "@/components/layout/component-layout";
import { useState } from "react";
import { X, Sparkles, Code2, Copy, Check, House, Plus, CirclePlus, BadgeCheck } from "lucide-react";
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

// --- Avatar Variant Previews ---

function Avatar01() {
  return (
    <div className="flex items-center justify-center">
      <Avatar className="size-8">
        <AvatarImage src="https://github.com/shadcn.png" alt="Hallie Richards" />
        <AvatarFallback>HR</AvatarFallback>
      </Avatar>
    </div>
  );
}

function Avatar02() {
  return (
    <div className="flex items-center justify-center">
      <Avatar className="size-8 ring-ring ring-2">
        <AvatarImage src="https://github.com/shadcn.png" alt="Hallie Richards" />
        <AvatarFallback>HR</AvatarFallback>
      </Avatar>
    </div>
  );
}

function Avatar03() {
  return (
    <div className="flex items-center justify-center">
      <Avatar className="size-8 rounded-sm">
        <AvatarImage src="https://github.com/shadcn.png" alt="Hallie Richards" className="rounded-sm" />
        <AvatarFallback className="rounded-sm">HR</AvatarFallback>
      </Avatar>
    </div>
  );
}

function Avatar04() {
  return (
    <div className="flex items-center justify-center">
      <Avatar className="size-12">
        <AvatarImage src="https://github.com/shadcn.png" alt="Hallie Richards" />
        <AvatarFallback>HR</AvatarFallback>
      </Avatar>
    </div>
  );
}

function Avatar05() {
  return (
    <div className="flex items-center justify-center">
      <Avatar className="size-8">
        <AvatarFallback className="text-xs">HR</AvatarFallback>
      </Avatar>
    </div>
  );
}

function Avatar06() {
  return (
    <div className="flex items-center justify-center">
      <Avatar className="size-8">
        <AvatarFallback className="bg-indigo-500/10 text-indigo-500">
          <House className="size-4" />
        </AvatarFallback>
      </Avatar>
    </div>
  );
}

function Avatar07() {
  return (
    <div className="flex items-center justify-center">
      <div className="relative w-fit">
        <Avatar className="size-8">
          <AvatarImage src="https://github.com/shadcn.png" alt="Hallie Richards" />
          <AvatarFallback>HR</AvatarFallback>
        </Avatar>
        <span className="border-background bg-destructive absolute -right-0.5 -bottom-0.5 size-3 rounded-full border-2">
          <span className="sr-only">Busy</span>
        </span>
      </div>
    </div>
  );
}

function Avatar08() {
  return (
    <div className="flex items-center justify-center">
      <div className="relative w-fit">
        <Avatar className="size-8 ring-offset-background ring-2 ring-green-600 ring-offset-2 dark:ring-green-400">
          <AvatarImage src="https://github.com/shadcn.png" alt="Hallie Richards" />
          <AvatarFallback>HR</AvatarFallback>
        </Avatar>
        <span className="absolute -right-1.5 -bottom-1.5 inline-flex size-4 items-center justify-center rounded-full bg-green-600 dark:bg-green-400">
          <Check className="size-3 text-white" />
        </span>
      </div>
    </div>
  );
}

function Avatar09() {
  return (
    <div className="flex items-center justify-center">
      <div className="relative w-fit">
        <Avatar className="size-8 rounded-sm">
          <AvatarImage src="https://github.com/shadcn.png" alt="Hallie Richards" className="rounded-sm" />
          <AvatarFallback className="rounded-sm">HR</AvatarFallback>
        </Avatar>
        <span className="border-background absolute -top-1.5 -right-1.5 size-3 rounded-full border-2 bg-amber-600 dark:bg-amber-400">
          <span className="sr-only">Away</span>
        </span>
      </div>
    </div>
  );
}

function Avatar10() {
  return (
    <div className="flex items-center justify-center">
      <div className="relative w-fit">
        <Avatar className="size-10">
          <AvatarImage src="https://github.com/shadcn.png" alt="Hallie Richards" />
          <AvatarFallback>HR</AvatarFallback>
        </Avatar>
        <button className="focus-visible:ring-ring/50 absolute -right-1 -bottom-1 inline-flex cursor-pointer items-center justify-center rounded-full focus-visible:ring-[3px] focus-visible:outline-none">
          <CirclePlus className="text-background size-5 fill-slate-400" />
          <span className="sr-only">Add</span>
        </button>
      </div>
    </div>
  );
}

function Avatar11() {
  return (
    <div className="flex items-center justify-center">
      <div className="relative w-fit">
        <Avatar className="size-10 rounded-sm">
          <AvatarImage src="https://github.com/shadcn.png" alt="Hallie Richards" className="rounded-sm" />
          <AvatarFallback className="rounded-sm">HR</AvatarFallback>
        </Avatar>
        <span className="absolute -top-2.5 -right-2.5 inline-flex h-5 min-w-5 items-center justify-center rounded-full border border-transparent bg-indigo-500 px-1 text-xs font-medium text-primary-foreground tabular-nums">8</span>
      </div>
    </div>
  );
}

function Avatar12() {
  return (
    <div className="flex items-center justify-center">
      <div className="relative w-fit">
        <Avatar className="size-10">
          <AvatarImage src="https://github.com/shadcn.png" alt="Hallie Richards" />
          <AvatarFallback>HR</AvatarFallback>
        </Avatar>
        <span className="absolute -top-1.5 -right-1.5">
          <span className="sr-only">Verified</span>
          <BadgeCheck className="text-background size-5 fill-sky-500" />
        </span>
      </div>
    </div>
  );
}

function Avatar13() {
  return (
    <div className="flex items-center justify-center">
      <div className="flex -space-x-2">
        <Avatar className="size-8 ring-background ring-2">
          <AvatarImage src="https://github.com/shadcn.png" alt="Olivia Sparks" />
          <AvatarFallback>OS</AvatarFallback>
        </Avatar>
        <Avatar className="size-8 ring-background ring-2">
          <AvatarImage src="https://github.com/shadcn.png" alt="Howard Lloyd" />
          <AvatarFallback>HL</AvatarFallback>
        </Avatar>
        <Avatar className="size-8 ring-background ring-2">
          <AvatarImage src="https://github.com/shadcn.png" alt="Hallie Richards" />
          <AvatarFallback>HR</AvatarFallback>
        </Avatar>
        <Avatar className="size-8 ring-background ring-2">
          <AvatarImage src="https://github.com/shadcn.png" alt="Jenny Wilson" />
          <AvatarFallback>JW</AvatarFallback>
        </Avatar>
      </div>
    </div>
  );
}

function Avatar14() {
  return (
    <div className="flex items-center justify-center">
      <div className="flex -space-x-2">
        <Avatar className="size-8 ring-background ring-2">
          <AvatarImage src="https://github.com/shadcn.png" alt="Olivia Sparks" />
          <AvatarFallback>OS</AvatarFallback>
        </Avatar>
        <Avatar className="size-8 ring-background ring-2">
          <AvatarImage src="https://github.com/shadcn.png" alt="Howard Lloyd" />
          <AvatarFallback>HL</AvatarFallback>
        </Avatar>
        <Avatar className="size-8 ring-background ring-2">
          <AvatarImage src="https://github.com/shadcn.png" alt="Hallie Richards" />
          <AvatarFallback>HR</AvatarFallback>
        </Avatar>
        <Avatar className="size-8 ring-background ring-2">
          <AvatarFallback className="text-xs">+9</AvatarFallback>
        </Avatar>
      </div>
    </div>
  );
}

function Avatar15() {
  return (
    <div className="flex items-center justify-center">
      <div className="flex -space-x-2">
        <Avatar className="size-12 ring-background ring-2">
          <AvatarImage src="https://github.com/shadcn.png" alt="Olivia Sparks" />
          <AvatarFallback>OS</AvatarFallback>
        </Avatar>
        <Avatar className="size-12 ring-background ring-2">
          <AvatarImage src="https://github.com/shadcn.png" alt="Howard Lloyd" />
          <AvatarFallback>HL</AvatarFallback>
        </Avatar>
        <Avatar className="size-12 ring-background ring-2">
          <AvatarImage src="https://github.com/shadcn.png" alt="Hallie Richards" />
          <AvatarFallback>HR</AvatarFallback>
        </Avatar>
        <Avatar className="size-12 ring-background ring-2">
          <AvatarImage src="https://github.com/shadcn.png" alt="Jenny Wilson" />
          <AvatarFallback>JW</AvatarFallback>
        </Avatar>
      </div>
    </div>
  );
}

function Avatar16() {
  return (
    <div className="flex items-center justify-center">
      <div className="flex -space-x-2">
        <Avatar className="size-8 ring-background ring-2 transition-all duration-300 ease-in-out hover:z-[1] hover:-translate-y-1 hover:shadow-md">
          <AvatarImage src="https://github.com/shadcn.png" alt="Olivia Sparks" />
          <AvatarFallback>OS</AvatarFallback>
        </Avatar>
        <Avatar className="size-8 ring-background ring-2 transition-all duration-300 ease-in-out hover:z-[1] hover:-translate-y-1 hover:shadow-md">
          <AvatarImage src="https://github.com/shadcn.png" alt="Howard Lloyd" />
          <AvatarFallback>HL</AvatarFallback>
        </Avatar>
        <Avatar className="size-8 ring-background ring-2 transition-all duration-300 ease-in-out hover:z-[1] hover:-translate-y-1 hover:shadow-md">
          <AvatarImage src="https://github.com/shadcn.png" alt="Hallie Richards" />
          <AvatarFallback>HR</AvatarFallback>
        </Avatar>
        <Avatar className="size-8 ring-background ring-2 transition-all duration-300 ease-in-out hover:z-[1] hover:-translate-y-1 hover:shadow-md">
          <AvatarImage src="https://github.com/shadcn.png" alt="Jenny Wilson" />
          <AvatarFallback>JW</AvatarFallback>
        </Avatar>
      </div>
    </div>
  );
}

function Avatar17() {
  return (
    <div className="flex items-center justify-center">
      <div className="flex -space-x-2 hover:space-x-1">
        <Avatar className="size-8 ring-background ring-2 transition-all duration-300 ease-in-out">
          <AvatarImage src="https://github.com/shadcn.png" alt="Olivia Sparks" />
          <AvatarFallback>OS</AvatarFallback>
        </Avatar>
        <Avatar className="size-8 ring-background ring-2 transition-all duration-300 ease-in-out">
          <AvatarImage src="https://github.com/shadcn.png" alt="Howard Lloyd" />
          <AvatarFallback>HL</AvatarFallback>
        </Avatar>
        <Avatar className="size-8 ring-background ring-2 transition-all duration-300 ease-in-out">
          <AvatarImage src="https://github.com/shadcn.png" alt="Hallie Richards" />
          <AvatarFallback>HR</AvatarFallback>
        </Avatar>
        <Avatar className="size-8 ring-background ring-2 transition-all duration-300 ease-in-out">
          <AvatarImage src="https://github.com/shadcn.png" alt="Jenny Wilson" />
          <AvatarFallback>JW</AvatarFallback>
        </Avatar>
      </div>
    </div>
  );
}

function Avatar18() {
  return (
    <div className="flex items-center justify-center">
      <TooltipProvider delayDuration={0}>
        <div className="flex -space-x-2 hover:space-x-1">
          <Tooltip>
            <TooltipTrigger asChild>
              <Avatar className="size-8 ring-background ring-2 transition-all duration-300 ease-in-out">
                <AvatarImage src="https://github.com/shadcn.png" alt="Olivia Sparks" />
                <AvatarFallback>OS</AvatarFallback>
              </Avatar>
            </TooltipTrigger>
            <TooltipContent>Olivia Sparks</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Avatar className="size-8 ring-background ring-2 transition-all duration-300 ease-in-out">
                <AvatarImage src="https://github.com/shadcn.png" alt="Howard Lloyd" />
                <AvatarFallback>HL</AvatarFallback>
              </Avatar>
            </TooltipTrigger>
            <TooltipContent>Howard Lloyd</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Avatar className="size-8 ring-background ring-2 transition-all duration-300 ease-in-out">
                <AvatarImage src="https://github.com/shadcn.png" alt="Hallie Richards" />
                <AvatarFallback>HR</AvatarFallback>
              </Avatar>
            </TooltipTrigger>
            <TooltipContent>Hallie Richards</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Avatar className="size-8 ring-background ring-2 transition-all duration-300 ease-in-out">
                <AvatarImage src="https://github.com/shadcn.png" alt="Jenny Wilson" />
                <AvatarFallback>JW</AvatarFallback>
              </Avatar>
            </TooltipTrigger>
            <TooltipContent>Jenny Wilson</TooltipContent>
          </Tooltip>
        </div>
      </TooltipProvider>
    </div>
  );
}

function Avatar19() {
  return (
    <div className="flex items-center justify-center">
      <div className="flex -space-x-2">
        <Avatar className="size-8 ring-background ring-2">
          <AvatarImage src="https://github.com/shadcn.png" alt="Olivia Sparks" />
          <AvatarFallback>OS</AvatarFallback>
        </Avatar>
        <Avatar className="size-8 ring-background ring-2">
          <AvatarImage src="https://github.com/shadcn.png" alt="Howard Lloyd" />
          <AvatarFallback>HL</AvatarFallback>
        </Avatar>
        <Avatar className="size-8 ring-background ring-2">
          <AvatarImage src="https://github.com/shadcn.png" alt="Hallie Richards" />
          <AvatarFallback>HR</AvatarFallback>
        </Avatar>
        <button className="bg-muted ring-background flex size-8 shrink-0 cursor-pointer items-center justify-center rounded-full ring-2" type="button">
          <Plus className="size-4" />
          <span className="sr-only">Add</span>
        </button>
      </div>
    </div>
  );
}

function Avatar20() {
  return (
    <div className="flex items-center justify-center">
      <div className="bg-background flex items-center rounded-full border p-1 shadow-sm">
        <div className="flex -space-x-2">
          <Avatar className="size-8 ring-background ring-2">
            <AvatarImage src="https://github.com/shadcn.png" alt="Olivia Sparks" />
            <AvatarFallback>OS</AvatarFallback>
          </Avatar>
          <Avatar className="size-8 ring-background ring-2">
            <AvatarImage src="https://github.com/shadcn.png" alt="Howard Lloyd" />
            <AvatarFallback>HL</AvatarFallback>
          </Avatar>
          <Avatar className="size-8 ring-background ring-2">
            <AvatarImage src="https://github.com/shadcn.png" alt="Hallie Richards" />
            <AvatarFallback>HR</AvatarFallback>
          </Avatar>
          <Avatar className="size-8 ring-background ring-2">
            <AvatarImage src="https://github.com/shadcn.png" alt="Jenny Wilson" />
            <AvatarFallback>JW</AvatarFallback>
          </Avatar>
        </div>
        <span className="text-muted-foreground hover:text-foreground flex items-center justify-center rounded-full bg-transparent px-2 text-xs shadow-none hover:bg-transparent">+3</span>
      </div>
    </div>
  );
}

function Avatar21() {
  return (
    <div className="flex items-center justify-center">
      <div className="bg-background flex flex-wrap items-center justify-center rounded-full border p-1 shadow-sm">
        <div className="flex -space-x-1">
          <Avatar className="size-6 ring-background ring-2">
            <AvatarImage src="https://github.com/shadcn.png" alt="Olivia Sparks" />
            <AvatarFallback>OS</AvatarFallback>
          </Avatar>
          <Avatar className="size-6 ring-background ring-2">
            <AvatarImage src="https://github.com/shadcn.png" alt="Howard Lloyd" />
            <AvatarFallback>HL</AvatarFallback>
          </Avatar>
          <Avatar className="size-6 ring-background ring-2">
            <AvatarImage src="https://github.com/shadcn.png" alt="Hallie Richards" />
            <AvatarFallback>HR</AvatarFallback>
          </Avatar>
          <Avatar className="size-6 ring-background ring-2">
            <AvatarImage src="https://github.com/shadcn.png" alt="Jenny Wilson" />
            <AvatarFallback>JW</AvatarFallback>
          </Avatar>
        </div>
        <p className="text-muted-foreground px-2 text-xs">Loved by <strong className="text-foreground font-medium">10K+</strong> developers.</p>
      </div>
    </div>
  );
}

// --- Code strings ---
const codes: Record<string, string> = {
  "avatar-01": `
export default function Avatar01() {
  return (
    <Avatar className="size-8">
      <AvatarImage src="https://github.com/shadcn.png" alt="Hallie Richards" />
      <AvatarFallback>HR</AvatarFallback>
    </Avatar>
  )
}`,
  "avatar-05": `
export default function Avatar05() {
  return (
    <Avatar className="size-8">
      <AvatarFallback className="text-xs">HR</AvatarFallback>
    </Avatar>
  )
}`,
  "avatar-07": `
export default function Avatar07() {
  return (
    <div className="relative w-fit">
      <Avatar className="size-8">
        <AvatarImage src="https://github.com/shadcn.png" alt="Hallie Richards" />
        <AvatarFallback>HR</AvatarFallback>
      </Avatar>
      <span className="border-background bg-destructive absolute -right-0.5 -bottom-0.5 size-3 rounded-full border-2">
        <span className="sr-only">Busy</span>
      </span>
    </div>
  )
}`,
  "avatar-13": `
export default function Avatar13() {
  return (
    <div className="flex -space-x-2">
      <Avatar className="size-8 ring-background ring-2">
        <AvatarImage src="https://github.com/shadcn.png" alt="Olivia Sparks" />
        <AvatarFallback>OS</AvatarFallback>
      </Avatar>
      <Avatar className="size-8 ring-background ring-2">
        <AvatarImage src="https://github.com/shadcn.png" alt="Howard Lloyd" />
        <AvatarFallback>HL</AvatarFallback>
      </Avatar>
      <Avatar className="size-8 ring-background ring-2">
        <AvatarImage src="https://github.com/shadcn.png" alt="Hallie Richards" />
        <AvatarFallback>HR</AvatarFallback>
      </Avatar>
      <Avatar className="size-8 ring-background ring-2">
        <AvatarImage src="https://github.com/shadcn.png" alt="Jenny Wilson" />
        <AvatarFallback>JW</AvatarFallback>
      </Avatar>
    </div>
  )
}`,
  "avatar-17": `
export default function Avatar17() {
  return (
    <div className="flex -space-x-2 hover:space-x-1">
      <Avatar className="size-8 ring-background ring-2 transition-all duration-300 ease-in-out">
        <AvatarImage src="https://github.com/shadcn.png" alt="Olivia Sparks" />
        <AvatarFallback>OS</AvatarFallback>
      </Avatar>
      <Avatar className="size-8 ring-background ring-2 transition-all duration-300 ease-in-out">
        <AvatarImage src="https://github.com/shadcn.png" alt="Howard Lloyd" />
        <AvatarFallback>HL</AvatarFallback>
      </Avatar>
      <Avatar className="size-8 ring-background ring-2 transition-all duration-300 ease-in-out">
        <AvatarImage src="https://github.com/shadcn.png" alt="Hallie Richards" />
        <AvatarFallback>HR</AvatarFallback>
      </Avatar>
      <Avatar className="size-8 ring-background ring-2 transition-all duration-300 ease-in-out">
        <AvatarImage src="https://github.com/shadcn.png" alt="Jenny Wilson" />
        <AvatarFallback>JW</AvatarFallback>
      </Avatar>
    </div>
  )
}`,
  "avatar-21": `
export default function Avatar21() {
  return (
    <div className="bg-background flex flex-wrap items-center justify-center rounded-full border p-1 shadow-sm">
      <div className="flex -space-x-1">
        <Avatar className="size-6 ring-background ring-2">
          <AvatarImage src="https://github.com/shadcn.png" alt="Olivia Sparks" />
          <AvatarFallback>OS</AvatarFallback>
        </Avatar>
        <Avatar className="size-6 ring-background ring-2">
          <AvatarImage src="https://github.com/shadcn.png" alt="Howard Lloyd" />
          <AvatarFallback>HL</AvatarFallback>
        </Avatar>
        <Avatar className="size-6 ring-background ring-2">
          <AvatarImage src="https://github.com/shadcn.png" alt="Hallie Richards" />
          <AvatarFallback>HR</AvatarFallback>
        </Avatar>
        <Avatar className="size-6 ring-background ring-2">
          <AvatarImage src="https://github.com/shadcn.png" alt="Jenny Wilson" />
          <AvatarFallback>JW</AvatarFallback>
        </Avatar>
      </div>
      <p className="text-muted-foreground px-2 text-xs">
        Loved by <strong className="text-foreground font-medium">10K+</strong> developers.
      </p>
    </div>
  )
}`,
};

function getCode(id: string) {
  return codes[id] || codes["avatar-01"]!.replace("Avatar01", id.replace("avatar-", "Avatar"));
}

// --- Variants ---
const variants = [
  { id: "avatar-01", title: "Avatar 1", preview: <Avatar01 /> },
  { id: "avatar-02", title: "Avatar 2", preview: <Avatar02 /> },
  { id: "avatar-03", title: "Avatar 3", preview: <Avatar03 /> },
  { id: "avatar-04", title: "Avatar 4", preview: <Avatar04 /> },
  { id: "avatar-05", title: "Avatar 5", preview: <Avatar05 /> },
  { id: "avatar-06", title: "Avatar 6", preview: <Avatar06 /> },
  { id: "avatar-07", title: "Avatar 7", preview: <Avatar07 /> },
  { id: "avatar-08", title: "Avatar 8", preview: <Avatar08 /> },
  { id: "avatar-09", title: "Avatar 9", preview: <Avatar09 /> },
  { id: "avatar-10", title: "Avatar 10", preview: <Avatar10 /> },
  { id: "avatar-11", title: "Avatar 11", preview: <Avatar11 /> },
  { id: "avatar-12", title: "Avatar 12", preview: <Avatar12 /> },
  { id: "avatar-13", title: "Avatar 13", preview: <Avatar13 /> },
  { id: "avatar-14", title: "Avatar 14", preview: <Avatar14 /> },
  { id: "avatar-15", title: "Avatar 15", preview: <Avatar15 /> },
  { id: "avatar-16", title: "Avatar 16", preview: <Avatar16 /> },
  { id: "avatar-17", title: "Avatar 17", preview: <Avatar17 /> },
  { id: "avatar-18", title: "Avatar 18", preview: <Avatar18 /> },
  { id: "avatar-19", title: "Avatar 19", preview: <Avatar19 /> },
  { id: "avatar-20", title: "Avatar 20", preview: <Avatar20 /> },
  { id: "avatar-21", title: "Avatar 21", preview: <Avatar21 /> },
];

export default function AvatarPage() {
  return (
    <ComponentLayout>
      {/* Page Header */}
      <div className="mb-4 flex gap-x-8 gap-y-4 max-md:flex-col">
        <div className="space-y-3">
          <h1 className="text-2xl font-bold sm:text-3xl">Shadcn Avatar</h1>
          <p className="text-muted-foreground">
            Explore the collection of awesome Shadcn Avatar Components, featuring {variants.length} avatar
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
          <p className="font-medium">Have any suggestions for Avatar variants?</p>
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
