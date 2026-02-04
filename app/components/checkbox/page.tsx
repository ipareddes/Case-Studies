"use client";

import { Badge, Checkbox, Label, Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@ipareddes/ui-components";

import { ComponentLayout } from "@/components/layout/component-layout";
import { useState } from "react";
import { X, Sparkles, Code2, Copy, Check, Minus, Heart, Star, ThumbsUp, Code, ChartPie, Paintbrush, Apple, Cherry, Citrus } from "lucide-react";
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

// --- Checkbox Variant Previews ---

function Checkbox01() {
  return (
    <div className="flex items-center gap-2">
      <Checkbox id="checkbox-01" />
      <Label htmlFor="checkbox-01">Accept terms and conditions</Label>
    </div>
  );
}

function Checkbox02() {
  const [checked, setChecked] = useState<boolean | "indeterminate">("indeterminate");
  return (
    <div className="flex items-center gap-2">
      <Checkbox id="checkbox-02" checked={checked} onCheckedChange={setChecked} />
      <Label htmlFor="checkbox-02">Indeterminate checkbox</Label>
    </div>
  );
}

function Checkbox03() {
  return (
    <div className="flex items-center gap-2">
      <Checkbox id="checkbox-03" className="border-primary border-dashed" />
      <Label htmlFor="checkbox-03">Accept terms and conditions</Label>
    </div>
  );
}

function Checkbox04() {
  const [checked, setChecked] = useState(true);
  return (
    <div className="flex items-center gap-2">
      <Checkbox id="checkbox-04" checked={checked} onCheckedChange={(v: boolean | "indeterminate") => setChecked(v === true)} />
      <Label htmlFor="checkbox-04" className={checked ? "line-through" : ""}>Simple todo list item</Label>
    </div>
  );
}

function Checkbox05() {
  return (
    <div className="flex items-center gap-2">
      <Checkbox defaultChecked aria-label="Size default" />
      <Checkbox defaultChecked className="h-5 w-5" aria-label="Size medium" />
      <Checkbox defaultChecked className="h-6 w-6" aria-label="Size large" />
    </div>
  );
}

function Checkbox06() {
  const items = ["Burger", "Pizza", "Fries"];
  return (
    <div className="flex items-center gap-2">
      {items.map((item) => (
        <Badge key={item} variant="secondary" className="relative gap-2 rounded-sm px-3 py-1.5">
          <Checkbox id={`cb06-${item}`} defaultChecked className="data-[state=unchecked]:hidden" />
          <label htmlFor={`cb06-${item}`} className="cursor-pointer select-none after:absolute after:inset-0">{item}</label>
        </Badge>
      ))}
    </div>
  );
}

function Checkbox07() {
  return (
    <div className="flex items-start gap-2">
      <Checkbox id="checkbox-07" defaultChecked />
      <div className="grid gap-2">
        <Label htmlFor="checkbox-07" className="leading-4">Accept terms and conditions</Label>
        <p className="text-muted-foreground text-xs">By clicking this checkbox, you agree to the terms and conditions.</p>
      </div>
    </div>
  );
}

function Checkbox08() {
  const techs = ["React", "Next.js", "Remix", "Astro"];
  return (
    <div className="space-y-4">
      <Label className="font-semibold">Technologies</Label>
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
        {techs.map((tech) => (
          <div key={tech} className="flex items-center gap-2">
            <Checkbox id={`cb08-${tech}`} />
            <Label htmlFor={`cb08-${tech}`}>{tech}</Label>
          </div>
        ))}
      </div>
    </div>
  );
}

function Checkbox09() {
  const fruits = [
    { name: "Apple", icon: <Apple className="size-4" /> },
    { name: "Cherry", icon: <Cherry className="size-4" /> },
    { name: "Citrus", icon: <Citrus className="size-4" /> },
  ];
  return (
    <div className="space-y-4">
      <Label className="font-semibold">Favorite Fruits</Label>
      <div className="flex flex-col gap-4">
        {fruits.map((fruit) => (
          <div key={fruit.name} className="flex items-center gap-2">
            <Checkbox id={`cb09-${fruit.name}`} />
            <Label htmlFor={`cb09-${fruit.name}`} className="flex items-center gap-2">{fruit.icon}{fruit.name}</Label>
          </div>
        ))}
      </div>
    </div>
  );
}

function Checkbox10() {
  return (
    <div className="flex items-center gap-2">
      <Checkbox defaultChecked className="data-[state=checked]:bg-destructive! data-[state=checked]:border-destructive" aria-label="Color destructive" />
      <Checkbox defaultChecked className="data-[state=checked]:border-sky-600 data-[state=checked]:bg-sky-600" aria-label="Color info" />
      <Checkbox defaultChecked className="data-[state=checked]:border-green-600 data-[state=checked]:bg-green-600" aria-label="Color success" />
      <Checkbox defaultChecked className="data-[state=checked]:border-amber-600 data-[state=checked]:bg-amber-600" aria-label="Color warning" />
    </div>
  );
}

function Checkbox11() {
  const [heart, setHeart] = useState(true);
  const [star, setStar] = useState(true);
  const [thumb, setThumb] = useState(true);
  return (
    <div className="flex items-center gap-2">
      <button onClick={() => setHeart(!heart)} className="rounded-sm outline-none focus-visible:ring-2 focus-visible:ring-ring/50">
        <Heart className={`size-6 stroke-1 ${heart ? "fill-destructive stroke-destructive" : ""}`} />
      </button>
      <button onClick={() => setStar(!star)} className="rounded-sm outline-none focus-visible:ring-2 focus-visible:ring-ring/50">
        <Star className={`size-6 stroke-1 ${star ? "fill-amber-500 stroke-amber-500" : ""}`} />
      </button>
      <button onClick={() => setThumb(!thumb)} className="rounded-sm outline-none focus-visible:ring-2 focus-visible:ring-ring/50">
        <ThumbsUp className={`size-6 stroke-1 ${thumb ? "fill-sky-500 stroke-sky-500" : ""}`} />
      </button>
    </div>
  );
}

function Checkbox12() {
  return (
    <div className="flex items-center gap-2">
      <Checkbox defaultChecked className="size-7 rounded-full bg-destructive data-[state=checked]:bg-destructive data-[state=checked]:text-destructive border-none" aria-label="Color destructive" />
      <Checkbox defaultChecked className="size-7 rounded-full bg-sky-600 data-[state=checked]:bg-sky-600 data-[state=checked]:text-sky-600 border-none" aria-label="Color info" />
      <Checkbox defaultChecked className="size-7 rounded-full bg-green-600 data-[state=checked]:bg-green-600 data-[state=checked]:text-green-600 border-none" aria-label="Color success" />
    </div>
  );
}

function Checkbox13() {
  const [autoStart, setAutoStart] = useState(true);
  const [autoUpdate, setAutoUpdate] = useState(false);
  return (
    <div className="space-y-2">
      <label className={`flex items-start gap-2 rounded-lg border p-3 cursor-pointer hover:bg-accent/50 ${autoStart ? "border-blue-600 bg-blue-50 dark:border-blue-900 dark:bg-blue-950" : ""}`}>
        <Checkbox checked={autoStart} onCheckedChange={(v: boolean | "indeterminate") => setAutoStart(v === true)} className="data-[state=checked]:border-blue-600 data-[state=checked]:bg-blue-600 data-[state=checked]:text-white" />
        <div className="grid gap-1.5">
          <p className="text-sm leading-none font-medium">Auto Start</p>
          <p className="text-muted-foreground text-sm">Starting with your OS.</p>
        </div>
      </label>
      <label className={`flex items-start gap-2 rounded-lg border p-3 cursor-pointer hover:bg-accent/50 ${autoUpdate ? "border-blue-600 bg-blue-50 dark:border-blue-900 dark:bg-blue-950" : ""}`}>
        <Checkbox checked={autoUpdate} onCheckedChange={(v: boolean | "indeterminate") => setAutoUpdate(v === true)} className="data-[state=checked]:border-blue-600 data-[state=checked]:bg-blue-600 data-[state=checked]:text-white" />
        <div className="grid gap-1.5">
          <p className="text-sm leading-none font-medium">Auto Update</p>
          <p className="text-muted-foreground text-sm">Download and install updates automatically.</p>
        </div>
      </label>
    </div>
  );
}

function Checkbox14() {
  const items = [
    { name: "Web Development", icon: <Code className="size-4" /> },
    { name: "Data Analysis", icon: <ChartPie className="size-4" /> },
    { name: "UI Design", icon: <Paintbrush className="size-4" /> },
  ];
  return (
    <ul className="flex w-full flex-col divide-y rounded-md border">
      {items.map((item) => (
        <li key={item.name}>
          <label className="flex items-center justify-between gap-2 px-5 py-3 text-sm font-medium cursor-pointer">
            <span className="flex items-center gap-2">{item.icon}{item.name}</span>
            <Checkbox id={`cb14-${item.name}`} />
          </label>
        </li>
      ))}
    </ul>
  );
}

function Checkbox15() {
  const [children, setChildren] = useState([true, false]);
  const allChecked = children.every(Boolean);
  const noneChecked = children.every((c) => !c);
  const parentState: boolean | "indeterminate" = allChecked ? true : noneChecked ? false : "indeterminate";

  const handleParent = () => {
    const next = !allChecked;
    setChildren([next, next]);
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <Checkbox id="cb15-parent" checked={parentState} onCheckedChange={handleParent} />
        <Label htmlFor="cb15-parent">Parent</Label>
      </div>
      <div className="flex flex-col gap-2 pl-6">
        {["Child 1", "Child 2"].map((child, i) => (
          <div key={child} className="flex items-center gap-2">
            <Checkbox
              id={`cb15-${child}`}
              checked={children[i]}
              onCheckedChange={(v: boolean | "indeterminate") => {
                const next = [...children];
                next[i] = v === true;
                setChildren(next);
              }}
            />
            <Label htmlFor={`cb15-${child}`}>{child}</Label>
          </div>
        ))}
      </div>
    </div>
  );
}

function Checkbox16() {
  return (
    <div className="flex items-start gap-2">
      <Checkbox id="checkbox-16" defaultChecked />
      <div className="grid gap-2">
        <Label htmlFor="checkbox-16" className="leading-4">Accept terms and conditions</Label>
        <p className="text-muted-foreground text-xs">By clicking this checkbox, you agree to the terms and conditions.</p>
        <div className="flex flex-wrap gap-2">
          <button className="inline-flex items-center justify-center rounded-md border px-3 py-1 text-sm font-medium hover:bg-muted transition-colors h-8">Reset</button>
          <button className="inline-flex items-center justify-center rounded-md bg-primary text-primary-foreground px-3 py-1 text-sm font-medium hover:bg-primary/90 transition-colors h-8">Submit</button>
        </div>
      </div>
    </div>
  );
}

function Checkbox17() {
  const [checked, setChecked] = useState(true);
  return (
    <div className="flex items-center gap-2">
      <Checkbox id="checkbox-17" checked={checked} onCheckedChange={(v: boolean | "indeterminate") => setChecked(v === true)} className="transition-colors duration-500" />
      <Label htmlFor="checkbox-17">Animated checkbox</Label>
    </div>
  );
}

function Checkbox18() {
  const [checked, setChecked] = useState(true);
  return (
    <div className="flex items-center gap-2">
      <Checkbox
        id="checkbox-18"
        checked={checked}
        onCheckedChange={(v: boolean | "indeterminate") => setChecked(v === true)}
        className="rounded-full data-[state=checked]:border-blue-500 data-[state=checked]:bg-blue-500 transition-colors duration-500"
      />
      <Label htmlFor="checkbox-18" className="relative">
        <span className={checked ? "text-primary line-through" : ""}>Animated todo list item</span>
      </Label>
    </div>
  );
}

function Checkbox19() {
  const [checked, setChecked] = useState(false);
  return (
    <div className="relative flex items-center gap-2">
      <Checkbox id="checkbox-19" checked={checked} onCheckedChange={(v: boolean | "indeterminate") => setChecked(v === true)} />
      <Label htmlFor="checkbox-19">Check to see magic</Label>
      {checked && <span className="ml-2 text-sm text-muted-foreground animate-in fade-in">tada!</span>}
    </div>
  );
}

// --- Code strings ---
const codes: Record<string, string> = {
  "checkbox-01": `
export default function Checkbox01() {
  return (
    <div className="flex items-center gap-2">
      <Checkbox id="checkbox-01" />
      <Label htmlFor="checkbox-01">Accept terms and conditions</Label>
    </div>
  )
}`,
  "checkbox-04": `import { useState } from "react"

export default function Checkbox04() {
  const [checked, setChecked] = useState(true)
  return (
    <div className="flex items-center gap-2">
      <Checkbox id="checkbox-04" checked={checked} onCheckedChange={(v: boolean | "indeterminate") => setChecked(v === true)} />
      <Label htmlFor="checkbox-04" className={checked ? "line-through" : ""}>
        Simple todo list item
      </Label>
    </div>
  )
}`,
  "checkbox-07": `
export default function Checkbox07() {
  return (
    <div className="flex items-start gap-2">
      <Checkbox id="checkbox-07" defaultChecked />
      <div className="grid gap-2">
        <Label htmlFor="checkbox-07" className="leading-4">Accept terms and conditions</Label>
        <p className="text-muted-foreground text-xs">
          By clicking this checkbox, you agree to the terms and conditions.
        </p>
      </div>
    </div>
  )
}`,
  "checkbox-10": `
export default function Checkbox10() {
  return (
    <div className="flex items-center gap-2">
      <Checkbox defaultChecked className="data-[state=checked]:bg-destructive! data-[state=checked]:border-destructive" aria-label="Destructive" />
      <Checkbox defaultChecked className="data-[state=checked]:border-sky-600 data-[state=checked]:bg-sky-600" aria-label="Info" />
      <Checkbox defaultChecked className="data-[state=checked]:border-green-600 data-[state=checked]:bg-green-600" aria-label="Success" />
      <Checkbox defaultChecked className="data-[state=checked]:border-amber-600 data-[state=checked]:bg-amber-600" aria-label="Warning" />
    </div>
  )
}`,
  "checkbox-13": `import { useState } from "react"

export default function Checkbox13() {
  const [autoStart, setAutoStart] = useState(true)
  return (
    <div className="space-y-2">
      <label className={\`flex items-start gap-2 rounded-lg border p-3 cursor-pointer hover:bg-accent/50 \${autoStart ? "border-blue-600 bg-blue-50 dark:border-blue-900 dark:bg-blue-950" : ""}\`}>
        <Checkbox checked={autoStart} onCheckedChange={(v: boolean | "indeterminate") => setAutoStart(v === true)}
          className="data-[state=checked]:border-blue-600 data-[state=checked]:bg-blue-600 data-[state=checked]:text-white" />
        <div className="grid gap-1.5">
          <p className="text-sm leading-none font-medium">Auto Start</p>
          <p className="text-muted-foreground text-sm">Starting with your OS.</p>
        </div>
      </label>
    </div>
  )
}`,
  "checkbox-15": `import { useState } from "react"

export default function Checkbox15() {
  const [children, setChildren] = useState([true, false])
  const allChecked = children.every(Boolean)
  const noneChecked = children.every((c) => !c)
  const parentState = allChecked ? true : noneChecked ? false : "indeterminate"

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <Checkbox checked={parentState} onCheckedChange={() => setChildren([!allChecked, !allChecked])} />
        <Label>Parent</Label>
      </div>
      <div className="flex flex-col gap-2 pl-6">
        {["Child 1", "Child 2"].map((child, i) => (
          <div key={child} className="flex items-center gap-2">
            <Checkbox checked={children[i]}
              onCheckedChange={(v: boolean | "indeterminate") => { const next = [...children]; next[i] = v === true; setChildren(next); }} />
            <Label>{child}</Label>
          </div>
        ))}
      </div>
    </div>
  )
}`,
};

function getCode(id: string) {
  return codes[id] || codes["checkbox-01"]!.replace("Checkbox01", id.replace("checkbox-", "Checkbox"));
}

// --- Variants ---
const variants = [
  { id: "checkbox-01", title: "Checkbox 1", preview: <Checkbox01 /> },
  { id: "checkbox-02", title: "Checkbox 2", preview: <Checkbox02 /> },
  { id: "checkbox-03", title: "Checkbox 3", preview: <Checkbox03 /> },
  { id: "checkbox-04", title: "Checkbox 4", preview: <Checkbox04 /> },
  { id: "checkbox-05", title: "Checkbox 5", preview: <Checkbox05 /> },
  { id: "checkbox-06", title: "Checkbox 6", preview: <Checkbox06 /> },
  { id: "checkbox-07", title: "Checkbox 7", preview: <Checkbox07 /> },
  { id: "checkbox-08", title: "Checkbox 8", preview: <Checkbox08 /> },
  { id: "checkbox-09", title: "Checkbox 9", preview: <Checkbox09 /> },
  { id: "checkbox-10", title: "Checkbox 10", preview: <Checkbox10 /> },
  { id: "checkbox-11", title: "Checkbox 11", preview: <Checkbox11 /> },
  { id: "checkbox-12", title: "Checkbox 12", preview: <Checkbox12 /> },
  { id: "checkbox-13", title: "Checkbox 13", preview: <Checkbox13 /> },
  { id: "checkbox-14", title: "Checkbox 14", preview: <Checkbox14 /> },
  { id: "checkbox-15", title: "Checkbox 15", preview: <Checkbox15 /> },
  { id: "checkbox-16", title: "Checkbox 16", preview: <Checkbox16 /> },
  { id: "checkbox-17", title: "Checkbox 17", preview: <Checkbox17 /> },
  { id: "checkbox-18", title: "Checkbox 18", preview: <Checkbox18 /> },
  { id: "checkbox-19", title: "Checkbox 19", preview: <Checkbox19 /> },
];

export default function CheckboxPage() {
  return (
    <ComponentLayout>
      {/* Page Header */}
      <div className="mb-4 flex gap-x-8 gap-y-4 max-md:flex-col">
        <div className="space-y-3">
          <h1 className="text-2xl font-bold sm:text-3xl">Shadcn Checkbox</h1>
          <p className="text-muted-foreground">
            Explore the collection of awesome Shadcn Checkbox Components, featuring {variants.length} checkbox
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
          <p className="font-medium">Have any suggestions for Checkbox variants?</p>
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
