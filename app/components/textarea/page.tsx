"use client";

import { Button, Label, Textarea, Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@ipareddes/ui-components";

import { ComponentLayout } from "@/components/layout/component-layout";
import { useState } from "react";
import { X, Sparkles, Code2, Copy, Check, House } from "lucide-react";
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

// --- Textarea Variant Previews ---

function Textarea01() {
  return (
    <Textarea className="w-full max-w-xs" placeholder="Type your message here." />
  );
}

function Textarea02() {
  return (
    <div className="w-full max-w-xs space-y-2">
      <Label htmlFor="textarea-02">Textarea with label</Label>
      <Textarea id="textarea-02" placeholder="Type your feedback here" />
    </div>
  );
}

function Textarea03() {
  return (
    <div className="w-full max-w-xs space-y-2">
      <Label htmlFor="textarea-03">Textarea with helper text</Label>
      <Textarea id="textarea-03" placeholder="Type your feedback here" />
      <p className="text-muted-foreground text-xs">Your feedback is useful for us.</p>
    </div>
  );
}

function Textarea04() {
  return (
    <div className="w-full max-w-xs space-y-2">
      <Label htmlFor="textarea-04">Textarea with right helper text</Label>
      <Textarea id="textarea-04" placeholder="Type your feedback here" />
      <p className="text-muted-foreground text-end text-xs">Your feedback is useful for us.</p>
    </div>
  );
}

function Textarea05() {
  return (
    <div className="w-full max-w-xs space-y-2">
      <Label htmlFor="textarea-05">Invalid Textarea</Label>
      <Textarea id="textarea-05" aria-invalid="true" placeholder="Type your feedback here" />
      <p className="text-destructive text-xs">Your feedback is useful for us.</p>
    </div>
  );
}

function Textarea06() {
  return (
    <div className="w-full max-w-xs space-y-2">
      <div className="flex items-center justify-between gap-1">
        <Label htmlFor="textarea-06">Input with hint text</Label>
        <span className="text-muted-foreground text-xs">Optional field</span>
      </div>
      <Textarea id="textarea-06" placeholder="Type your feedback here" />
    </div>
  );
}

function Textarea07() {
  return (
    <div className="w-full max-w-xs space-y-2">
      <Label htmlFor="textarea-07">
        Required textarea <span className="text-destructive">*</span>
      </Label>
      <Textarea id="textarea-07" placeholder="Type your feedback here" required />
    </div>
  );
}

function Textarea08() {
  return (
    <div className="w-full max-w-xs space-y-2">
      <Label htmlFor="textarea-08">Textarea with colored border and ring</Label>
      <Textarea
        id="textarea-08"
        className="focus-visible:border-indigo-500 focus-visible:ring-indigo-500/20 dark:focus-visible:ring-indigo-500/40"
        placeholder="Type your feedback here"
      />
    </div>
  );
}

function Textarea09() {
  return (
    <div className="w-full max-w-xs space-y-2">
      <Label htmlFor="textarea-09">Filled Textarea</Label>
      <Textarea
        id="textarea-09"
        className="bg-muted border-transparent shadow-none"
        placeholder="Type your feedback here"
      />
    </div>
  );
}

function Textarea10() {
  return (
    <div className="w-full max-w-xs space-y-2">
      <Textarea className="min-h-10 py-1.5" placeholder="Small Textarea" />
      <Textarea placeholder="Default(Medium) Textarea" />
      <Textarea className="min-h-20 py-2.5" placeholder="Large Textarea" />
    </div>
  );
}

function Textarea11() {
  return (
    <div className="w-full max-w-xs space-y-2">
      <Label htmlFor="textarea-11">Textarea with start icon</Label>
      <div className="relative">
        <div className="text-muted-foreground pointer-events-none absolute top-2.5 left-0 flex items-center justify-center pl-3">
          <House className="size-4" />
          <span className="sr-only">Address</span>
        </div>
        <Textarea id="textarea-11" className="pl-9" placeholder="Address" />
      </div>
    </div>
  );
}

function Textarea12() {
  return (
    <div className="w-full max-w-xs space-y-2">
      <Label htmlFor="textarea-12">Textarea with end icon</Label>
      <div className="relative">
        <div className="text-muted-foreground pointer-events-none absolute top-2.5 right-0 flex items-center justify-center pr-3">
          <House className="size-4" />
          <span className="sr-only">Address</span>
        </div>
        <Textarea id="textarea-12" className="pr-9" placeholder="Address" />
      </div>
    </div>
  );
}

function Textarea13() {
  return (
    <div className="relative w-full max-w-xs space-y-2">
      <label
        htmlFor="textarea-13"
        className="bg-background text-foreground absolute top-0 left-2 z-10 block -translate-y-1/2 px-1 text-xs font-medium"
      >
        Textarea with overlapping label
      </label>
      <Textarea id="textarea-13" className="!bg-background" />
    </div>
  );
}

function Textarea14() {
  return (
    <div className="group relative w-full max-w-xs space-y-2">
      <label
        htmlFor="textarea-14"
        className="origin-start text-muted-foreground/70 group-focus-within:text-foreground has-[+textarea:not(:placeholder-shown)]:text-foreground absolute top-0 block translate-y-2 cursor-text px-2 text-sm transition-all group-focus-within:pointer-events-none group-focus-within:-translate-y-1/2 group-focus-within:cursor-default group-focus-within:text-xs group-focus-within:font-medium has-[+textarea:not(:placeholder-shown)]:pointer-events-none has-[+textarea:not(:placeholder-shown)]:-translate-y-1/2 has-[+textarea:not(:placeholder-shown)]:cursor-default has-[+textarea:not(:placeholder-shown)]:text-xs has-[+textarea:not(:placeholder-shown)]:font-medium"
      >
        <span className="bg-background inline-flex px-1">Textarea with floating label</span>
      </label>
      <Textarea id="textarea-14" className="!bg-background" placeholder=" " />
    </div>
  );
}

function Textarea15() {
  return (
    <div className="border-input bg-background focus-within:border-ring focus-within:ring-ring/50 relative w-full max-w-xs rounded-md border shadow-xs transition-[color,box-shadow] outline-none focus-within:ring-[3px]">
      <label htmlFor="textarea-15" className="text-foreground block px-3 pt-1 text-xs font-medium">
        Textarea with inset label
      </label>
      <textarea
        id="textarea-15"
        className="text-foreground placeholder:text-muted-foreground/70 flex min-h-14 w-full px-3 pb-2 text-sm focus-visible:outline-none"
      />
    </div>
  );
}

function Textarea16() {
  return (
    <div className="w-full max-w-xs space-y-2">
      <Label htmlFor="textarea-16">Textarea with button</Label>
      <Textarea id="textarea-16" placeholder="Type your feedback here" />
      <Button size="sm">Submit Feedback</Button>
    </div>
  );
}

function Textarea17() {
  return (
    <div className="w-full max-w-xs space-y-2">
      <Label htmlFor="textarea-17">Auto growing textarea</Label>
      <Textarea
        id="textarea-17"
        className="field-sizing-content max-h-30 min-h-0 resize-none py-1.75"
        placeholder="Type your feedback here"
      />
    </div>
  );
}

function Textarea18() {
  return (
    <div className="w-full max-w-xs space-y-2">
      <Label htmlFor="textarea-18">No resize textarea</Label>
      <Textarea
        id="textarea-18"
        className="[resize:none]"
        placeholder="Type your feedback here"
      />
    </div>
  );
}

function Textarea19() {
  const [value, setValue] = useState("");
  const maxLength = 200;

  return (
    <div className="w-full max-w-xs space-y-2">
      <Label htmlFor="textarea-19">Textarea with characters left</Label>
      <Textarea
        id="textarea-19"
        placeholder="Type your feedback here"
        maxLength={maxLength}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <p className="text-muted-foreground text-xs">
        <span className="tabular-nums">{maxLength - value.length}</span> characters left
      </p>
    </div>
  );
}

function Textarea20() {
  return (
    <div className="w-full max-w-xs space-y-2">
      <Label htmlFor="textarea-20">Read only textarea</Label>
      <Textarea
        id="textarea-20"
        className="read-only:bg-muted"
        placeholder="Type your feedback here"
        readOnly
        defaultValue="Read only text"
      />
    </div>
  );
}

function Textarea21() {
  return (
    <div className="w-full max-w-xs space-y-2">
      <Label htmlFor="textarea-21">Disabled textarea</Label>
      <Textarea id="textarea-21" placeholder="Type your feedback here" disabled />
    </div>
  );
}

// --- Code strings ---
const codes: Record<string, string> = {
  "textarea-01": `
export default function Textarea01() {
  return (
    <Textarea className="w-full max-w-xs" placeholder="Type your message here." />
  )
}`,
  "textarea-02": `
export default function Textarea02() {
  return (
    <div className="w-full max-w-xs space-y-2">
      <Label htmlFor="textarea-02">Textarea with label</Label>
      <Textarea id="textarea-02" placeholder="Type your feedback here" />
    </div>
  )
}`,
  "textarea-03": `
export default function Textarea03() {
  return (
    <div className="w-full max-w-xs space-y-2">
      <Label htmlFor="textarea-03">Textarea with helper text</Label>
      <Textarea id="textarea-03" placeholder="Type your feedback here" />
      <p className="text-muted-foreground text-xs">Your feedback is useful for us.</p>
    </div>
  )
}`,
  "textarea-05": `
export default function Textarea05() {
  return (
    <div className="w-full max-w-xs space-y-2">
      <Label htmlFor="textarea-05">Invalid Textarea</Label>
      <Textarea id="textarea-05" aria-invalid="true" placeholder="Type your feedback here" />
      <p className="text-destructive text-xs">Your feedback is useful for us.</p>
    </div>
  )
}`,
  "textarea-09": `
export default function Textarea09() {
  return (
    <div className="w-full max-w-xs space-y-2">
      <Label htmlFor="textarea-09">Filled Textarea</Label>
      <Textarea
        id="textarea-09"
        className="bg-muted border-transparent shadow-none"
        placeholder="Type your feedback here"
      />
    </div>
  )
}`,
  "textarea-16": `
export default function Textarea16() {
  return (
    <div className="w-full max-w-xs space-y-2">
      <Label htmlFor="textarea-16">Textarea with button</Label>
      <Textarea id="textarea-16" placeholder="Type your feedback here" />
      <Button size="sm">Submit Feedback</Button>
    </div>
  )
}`,
  "textarea-19": `"use client"

import { useState } from "react"

export default function Textarea19() {
  const [value, setValue] = useState("")
  const maxLength = 200

  return (
    <div className="w-full max-w-xs space-y-2">
      <Label htmlFor="textarea-19">Textarea with characters left</Label>
      <Textarea
        id="textarea-19"
        placeholder="Type your feedback here"
        maxLength={maxLength}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <p className="text-muted-foreground text-xs">
        <span className="tabular-nums">{maxLength - value.length}</span> characters left
      </p>
    </div>
  )
}`,
  "textarea-21": `
export default function Textarea21() {
  return (
    <div className="w-full max-w-xs space-y-2">
      <Label htmlFor="textarea-21">Disabled textarea</Label>
      <Textarea id="textarea-21" placeholder="Type your feedback here" disabled />
    </div>
  )
}`,
};

function getCode(id: string) {
  return codes[id] || codes["textarea-01"]!.replace("Textarea01", id.replace("textarea-", "Textarea"));
}

// --- Variants ---
const variants = [
  { id: "textarea-01", title: "Textarea 1", preview: <Textarea01 /> },
  { id: "textarea-02", title: "Textarea 2", preview: <Textarea02 /> },
  { id: "textarea-03", title: "Textarea 3", preview: <Textarea03 /> },
  { id: "textarea-04", title: "Textarea 4", preview: <Textarea04 /> },
  { id: "textarea-05", title: "Textarea 5", preview: <Textarea05 /> },
  { id: "textarea-06", title: "Textarea 6", preview: <Textarea06 /> },
  { id: "textarea-07", title: "Textarea 7", preview: <Textarea07 /> },
  { id: "textarea-08", title: "Textarea 8", preview: <Textarea08 /> },
  { id: "textarea-09", title: "Textarea 9", preview: <Textarea09 /> },
  { id: "textarea-10", title: "Textarea 10", preview: <Textarea10 /> },
  { id: "textarea-11", title: "Textarea 11", preview: <Textarea11 /> },
  { id: "textarea-12", title: "Textarea 12", preview: <Textarea12 /> },
  { id: "textarea-13", title: "Textarea 13", preview: <Textarea13 /> },
  { id: "textarea-14", title: "Textarea 14", preview: <Textarea14 /> },
  { id: "textarea-15", title: "Textarea 15", preview: <Textarea15 /> },
  { id: "textarea-16", title: "Textarea 16", preview: <Textarea16 /> },
  { id: "textarea-17", title: "Textarea 17", preview: <Textarea17 /> },
  { id: "textarea-18", title: "Textarea 18", preview: <Textarea18 /> },
  { id: "textarea-19", title: "Textarea 19", preview: <Textarea19 /> },
  { id: "textarea-20", title: "Textarea 20", preview: <Textarea20 /> },
  { id: "textarea-21", title: "Textarea 21", preview: <Textarea21 /> },
];

export default function TextareaPage() {
  return (
    <ComponentLayout>
      {/* Page Header */}
      <div className="mb-4 flex gap-x-8 gap-y-4 max-md:flex-col">
        <div className="space-y-3">
          <h1 className="text-2xl font-bold sm:text-3xl">Shadcn Textarea</h1>
          <p className="text-muted-foreground">
            Explore the collection of awesome Shadcn Textarea Components, featuring {variants.length} textarea
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
          <p className="font-medium">Have any suggestions for Textarea variants?</p>
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
