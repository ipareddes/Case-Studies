"use client";

import { ComponentLayout } from "@/components/layout/component-layout";
import { useState } from "react";
import { X, Sparkles, Code2, Copy, Check, Star, ArrowRight, Ban, CircleAlert, CircleCheckBig, ShoppingCart } from "lucide-react";
import ReactDOM from "react-dom";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";

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

// --- Badge Variant Previews ---

function Badge01() {
  return (
    <div className="flex items-center justify-center">
      <Badge>Default</Badge>
    </div>
  );
}

function Badge02() {
  return (
    <div className="flex items-center justify-center">
      <Badge variant="secondary">Secondary</Badge>
    </div>
  );
}

function Badge03() {
  return (
    <div className="flex items-center justify-center">
      <Badge variant="destructive">Destructive</Badge>
    </div>
  );
}

function Badge04() {
  return (
    <div className="flex items-center justify-center">
      <Badge variant="outline">Outline</Badge>
    </div>
  );
}

function Badge05() {
  return (
    <div className="flex items-center justify-center">
      <span className="inline-flex w-fit shrink-0 items-center justify-center gap-1 px-2 py-0.5 text-xs font-medium whitespace-nowrap">
        <span className="bg-primary size-2 rounded-full" aria-hidden="true" />
        Dot Badge
      </span>
    </div>
  );
}

function Badge06() {
  return (
    <div className="flex items-center justify-center">
      <Badge className="rounded-sm">Rounded</Badge>
    </div>
  );
}

function Badge07() {
  return (
    <div className="flex items-center justify-center">
      <Badge className="h-5 min-w-5 px-1 tabular-nums">8</Badge>
    </div>
  );
}

function Badge08() {
  return (
    <div className="flex items-center justify-center">
      <Badge className="px-3 py-1">Large</Badge>
    </div>
  );
}

function Badge09() {
  return (
    <div className="flex items-center justify-center">
      <Badge className="px-1.5 py-px">Small</Badge>
    </div>
  );
}

function Badge10() {
  return (
    <div className="flex items-center justify-center">
      <Badge>
        <Star className="size-3" />
        With Icon
      </Badge>
    </div>
  );
}

function Badge11() {
  return (
    <div className="flex items-center justify-center">
      <a href="#" className="inline-flex w-fit shrink-0 items-center justify-center gap-1 overflow-hidden rounded-full border border-transparent bg-primary text-primary-foreground px-2 py-0.5 text-xs font-medium whitespace-nowrap hover:bg-primary/90">
        Link <ArrowRight className="size-3" />
      </a>
    </div>
  );
}

function Badge12() {
  return (
    <div className="flex items-center justify-center">
      <Badge>
        Closable
        <button className="text-primary-foreground/60 hover:text-primary-foreground -my-px -ms-px -me-1.5 inline-flex size-4 shrink-0 cursor-pointer items-center justify-center rounded-[inherit] p-0 transition-[color,box-shadow] outline-none" aria-label="Close">
          <X className="size-3" />
        </button>
      </Badge>
    </div>
  );
}

function Badge13() {
  const [selected, setSelected] = useState(false);
  return (
    <div className="flex items-center justify-center">
      <span
        onClick={() => setSelected(!selected)}
        className={`inline-flex w-fit shrink-0 items-center justify-center gap-1 overflow-hidden border px-2 py-0.5 text-xs font-medium whitespace-nowrap rounded-sm cursor-pointer text-foreground ${selected ? "bg-accent" : ""}`}
      >
        {selected && <CircleCheckBig className="size-3 text-green-600 dark:text-green-400" />}
        Selectable
      </span>
    </div>
  );
}

function Badge14() {
  return (
    <div className="flex items-center justify-center">
      <Badge className="rounded-sm border-transparent bg-gradient-to-r from-indigo-500 to-pink-500 [background-size:105%] bg-center text-white">
        Gradient
      </Badge>
    </div>
  );
}

function Badge15() {
  return (
    <div className="flex items-center justify-center">
      <div className="flex items-center justify-center rounded-full bg-gradient-to-r from-indigo-500 to-pink-500 p-0.5">
        <Badge className="border-transparent bg-background hover:bg-background text-foreground border-none">
          Gradient Outline
        </Badge>
      </div>
    </div>
  );
}

function Badge16() {
  return (
    <div className="flex items-center justify-center">
      <Badge className="border-none bg-amber-600/10 text-amber-600 dark:bg-amber-400/10 dark:text-amber-400">
        <span className="size-1.5 rounded-full bg-amber-600 dark:bg-amber-400" aria-hidden="true" />
        In Progress
      </Badge>
    </div>
  );
}

function Badge17() {
  return (
    <div className="flex items-center justify-center">
      <Badge variant="destructive" className="border-none bg-destructive/10 text-destructive dark:bg-destructive/10">
        <span className="bg-destructive size-1.5 rounded-full" aria-hidden="true" />
        Blocked
      </Badge>
    </div>
  );
}

function Badge18() {
  return (
    <div className="flex items-center justify-center">
      <Badge className="border-none bg-green-600/10 text-green-600 dark:bg-green-400/10 dark:text-green-400">
        <span className="size-1.5 rounded-full bg-green-600 dark:bg-green-400" aria-hidden="true" />
        Completed
      </Badge>
    </div>
  );
}

function Badge19() {
  return (
    <div className="flex items-center justify-center">
      <Badge variant="outline" className="rounded-sm border-amber-600 text-amber-600 dark:border-amber-400 dark:text-amber-400">
        <CircleAlert className="size-3" />
        Pending
      </Badge>
    </div>
  );
}

function Badge20() {
  return (
    <div className="flex items-center justify-center">
      <Badge variant="outline" className="rounded-sm border-destructive text-destructive">
        <Ban className="size-3" />
        Failed
      </Badge>
    </div>
  );
}

function Badge21() {
  return (
    <div className="flex items-center justify-center">
      <Badge variant="outline" className="rounded-sm border-green-600 text-green-600 dark:border-green-400 dark:text-green-400">
        <CircleCheckBig className="size-3" />
        Successful
      </Badge>
    </div>
  );
}

function Badge22() {
  return (
    <div className="flex items-center justify-center">
      <Badge variant="outline" className="p-1 pr-2">
        <img src="https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-5.png" alt="Hallie Richards" className="size-6 rounded-full" />
        Avatar
      </Badge>
    </div>
  );
}

function Badge23() {
  return (
    <div className="flex items-center justify-center">
      <div className="relative w-fit">
        <span className="relative flex shrink-0 overflow-hidden size-9 rounded-sm">
          <span className="bg-muted flex size-full items-center justify-center rounded-sm">
            <ShoppingCart className="size-5" />
          </span>
        </span>
        <Badge className="absolute -top-2.5 -right-2.5 h-5 min-w-5 px-1 tabular-nums">
          8
        </Badge>
      </div>
    </div>
  );
}

function Badge24() {
  return (
    <div className="flex items-center justify-center">
      <div className="relative w-fit">
        <span className="relative flex shrink-0 overflow-hidden rounded-full size-10">
          <img className="aspect-square size-full" alt="Hallie Richards" src="https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-5.png" />
        </span>
        <span className="border-background absolute -right-0.5 -bottom-0.5 size-3 rounded-full border-2 bg-green-600 dark:bg-green-400">
          <span className="sr-only">Online</span>
        </span>
      </div>
    </div>
  );
}

// --- Code strings ---
const codes: Record<string, string> = {
  "badge-01": `import { Badge } from "@/components/ui/badge"

export default function Badge01() {
  return <Badge>Default</Badge>
}`,
  "badge-02": `import { Badge } from "@/components/ui/badge"

export default function Badge02() {
  return <Badge variant="secondary">Secondary</Badge>
}`,
  "badge-03": `import { Badge } from "@/components/ui/badge"

export default function Badge03() {
  return <Badge variant="destructive">Destructive</Badge>
}`,
  "badge-04": `import { Badge } from "@/components/ui/badge"

export default function Badge04() {
  return <Badge variant="outline">Outline</Badge>
}`,
  "badge-05": `export default function Badge05() {
  return (
    <span className="inline-flex w-fit shrink-0 items-center justify-center gap-1 px-2 py-0.5 text-xs font-medium whitespace-nowrap">
      <span className="bg-primary size-2 rounded-full" aria-hidden="true" />
      Dot Badge
    </span>
  )
}`,
  "badge-06": `import { Badge } from "@/components/ui/badge"

export default function Badge06() {
  return <Badge className="rounded-sm">Rounded</Badge>
}`,
  "badge-07": `import { Badge } from "@/components/ui/badge"

export default function Badge07() {
  return <Badge className="h-5 min-w-5 px-1 tabular-nums">8</Badge>
}`,
  "badge-08": `import { Badge } from "@/components/ui/badge"

export default function Badge08() {
  return <Badge className="px-3 py-1">Large</Badge>
}`,
  "badge-09": `import { Badge } from "@/components/ui/badge"

export default function Badge09() {
  return <Badge className="px-1.5 py-px">Small</Badge>
}`,
  "badge-10": `import { Badge } from "@/components/ui/badge"
import { Star } from "lucide-react"

export default function Badge10() {
  return (
    <Badge>
      <Star className="size-3" />
      With Icon
    </Badge>
  )
}`,
  "badge-11": `import { ArrowRight } from "lucide-react"

export default function Badge11() {
  return (
    <a href="#" className="inline-flex w-fit shrink-0 items-center justify-center gap-1 overflow-hidden rounded-full border border-transparent bg-primary text-primary-foreground px-2 py-0.5 text-xs font-medium whitespace-nowrap hover:bg-primary/90">
      Link <ArrowRight className="size-3" />
    </a>
  )
}`,
  "badge-12": `import { Badge } from "@/components/ui/badge"
import { X } from "lucide-react"

export default function Badge12() {
  return (
    <Badge>
      Closable
      <button
        className="text-primary-foreground/60 hover:text-primary-foreground -my-px -ms-px -me-1.5 inline-flex size-4 shrink-0 cursor-pointer items-center justify-center rounded-[inherit] p-0 transition-[color,box-shadow] outline-none"
        aria-label="Close"
      >
        <X className="size-3" />
      </button>
    </Badge>
  )
}`,
  "badge-13": `"use client"

import { useState } from "react"
import { CircleCheckBig } from "lucide-react"

export default function Badge13() {
  const [selected, setSelected] = useState(false)
  return (
    <span
      onClick={() => setSelected(!selected)}
      className={\`inline-flex w-fit shrink-0 items-center justify-center gap-1 overflow-hidden border px-2 py-0.5 text-xs font-medium whitespace-nowrap rounded-sm cursor-pointer text-foreground \${selected ? "bg-accent" : ""}\`}
    >
      {selected && <CircleCheckBig className="size-3 text-green-600 dark:text-green-400" />}
      Selectable
    </span>
  )
}`,
  "badge-14": `import { Badge } from "@/components/ui/badge"

export default function Badge14() {
  return (
    <Badge className="rounded-sm border-transparent bg-gradient-to-r from-indigo-500 to-pink-500 [background-size:105%] bg-center text-white">
      Gradient
    </Badge>
  )
}`,
  "badge-15": `import { Badge } from "@/components/ui/badge"

export default function Badge15() {
  return (
    <div className="flex items-center justify-center rounded-full bg-gradient-to-r from-indigo-500 to-pink-500 p-0.5">
      <Badge className="border-transparent bg-background hover:bg-background text-foreground border-none">
        Gradient Outline
      </Badge>
    </div>
  )
}`,
  "badge-16": `import { Badge } from "@/components/ui/badge"

export default function Badge16() {
  return (
    <Badge className="border-none bg-amber-600/10 text-amber-600 dark:bg-amber-400/10 dark:text-amber-400">
      <span className="size-1.5 rounded-full bg-amber-600 dark:bg-amber-400" aria-hidden="true" />
      In Progress
    </Badge>
  )
}`,
  "badge-17": `import { Badge } from "@/components/ui/badge"

export default function Badge17() {
  return (
    <Badge variant="destructive" className="border-none bg-destructive/10 text-destructive dark:bg-destructive/10">
      <span className="bg-destructive size-1.5 rounded-full" aria-hidden="true" />
      Blocked
    </Badge>
  )
}`,
  "badge-18": `import { Badge } from "@/components/ui/badge"

export default function Badge18() {
  return (
    <Badge className="border-none bg-green-600/10 text-green-600 dark:bg-green-400/10 dark:text-green-400">
      <span className="size-1.5 rounded-full bg-green-600 dark:bg-green-400" aria-hidden="true" />
      Completed
    </Badge>
  )
}`,
  "badge-19": `import { Badge } from "@/components/ui/badge"
import { CircleAlert } from "lucide-react"

export default function Badge19() {
  return (
    <Badge variant="outline" className="rounded-sm border-amber-600 text-amber-600 dark:border-amber-400 dark:text-amber-400">
      <CircleAlert className="size-3" />
      Pending
    </Badge>
  )
}`,
  "badge-20": `import { Badge } from "@/components/ui/badge"
import { Ban } from "lucide-react"

export default function Badge20() {
  return (
    <Badge variant="outline" className="rounded-sm border-destructive text-destructive">
      <Ban className="size-3" />
      Failed
    </Badge>
  )
}`,
  "badge-21": `import { Badge } from "@/components/ui/badge"
import { CircleCheckBig } from "lucide-react"

export default function Badge21() {
  return (
    <Badge variant="outline" className="rounded-sm border-green-600 text-green-600 dark:border-green-400 dark:text-green-400">
      <CircleCheckBig className="size-3" />
      Successful
    </Badge>
  )
}`,
  "badge-22": `import { Badge } from "@/components/ui/badge"

export default function Badge22() {
  return (
    <Badge variant="outline" className="p-1 pr-2">
      <img src="https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-5.png" alt="Hallie Richards" className="size-6 rounded-full" />
      Avatar
    </Badge>
  )
}`,
  "badge-23": `import { Badge } from "@/components/ui/badge"
import { ShoppingCart } from "lucide-react"

export default function Badge23() {
  return (
    <div className="relative w-fit">
      <span className="relative flex shrink-0 overflow-hidden size-9 rounded-sm">
        <span className="bg-muted flex size-full items-center justify-center rounded-sm">
          <ShoppingCart className="size-5" />
        </span>
      </span>
      <Badge className="absolute -top-2.5 -right-2.5 h-5 min-w-5 px-1 tabular-nums">
        8
      </Badge>
    </div>
  )
}`,
  "badge-24": `export default function Badge24() {
  return (
    <div className="relative w-fit">
      <span className="relative flex shrink-0 overflow-hidden rounded-full size-10">
        <img className="aspect-square size-full" alt="Hallie Richards" src="https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-5.png" />
      </span>
      <span className="border-background absolute -right-0.5 -bottom-0.5 size-3 rounded-full border-2 bg-green-600 dark:bg-green-400">
        <span className="sr-only">Online</span>
      </span>
    </div>
  )
}`,
};

function getCode(id: string) {
  return codes[id] || codes["badge-01"]!.replace("Badge01", id.replace("badge-", "Badge"));
}

// --- Variants ---
const variants = [
  { id: "badge-01", title: "Badge 1", preview: <Badge01 /> },
  { id: "badge-02", title: "Badge 2", preview: <Badge02 /> },
  { id: "badge-03", title: "Badge 3", preview: <Badge03 /> },
  { id: "badge-04", title: "Badge 4", preview: <Badge04 /> },
  { id: "badge-05", title: "Badge 5", preview: <Badge05 /> },
  { id: "badge-06", title: "Badge 6", preview: <Badge06 /> },
  { id: "badge-07", title: "Badge 7", preview: <Badge07 /> },
  { id: "badge-08", title: "Badge 8", preview: <Badge08 /> },
  { id: "badge-09", title: "Badge 9", preview: <Badge09 /> },
  { id: "badge-10", title: "Badge 10", preview: <Badge10 /> },
  { id: "badge-11", title: "Badge 11", preview: <Badge11 /> },
  { id: "badge-12", title: "Badge 12", preview: <Badge12 /> },
  { id: "badge-13", title: "Badge 13", preview: <Badge13 /> },
  { id: "badge-14", title: "Badge 14", preview: <Badge14 /> },
  { id: "badge-15", title: "Badge 15", preview: <Badge15 /> },
  { id: "badge-16", title: "Badge 16", preview: <Badge16 /> },
  { id: "badge-17", title: "Badge 17", preview: <Badge17 /> },
  { id: "badge-18", title: "Badge 18", preview: <Badge18 /> },
  { id: "badge-19", title: "Badge 19", preview: <Badge19 /> },
  { id: "badge-20", title: "Badge 20", preview: <Badge20 /> },
  { id: "badge-21", title: "Badge 21", preview: <Badge21 /> },
  { id: "badge-22", title: "Badge 22", preview: <Badge22 /> },
  { id: "badge-23", title: "Badge 23", preview: <Badge23 /> },
  { id: "badge-24", title: "Badge 24", preview: <Badge24 /> },
];

export default function BadgePage() {
  return (
    <ComponentLayout>
      {/* Page Header */}
      <div className="mb-4 flex gap-x-8 gap-y-4 max-md:flex-col">
        <div className="space-y-3">
          <h1 className="text-2xl font-bold sm:text-3xl">Shadcn Badge</h1>
          <p className="text-muted-foreground">
            Explore the collection of awesome Shadcn Badge Components, featuring {variants.length} badge
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
          <p className="font-medium">Have any suggestions for Badge variants?</p>
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
