"use client";

import { ComponentLayout } from "@/components/layout/component-layout";
import { useState } from "react";
import { X, Sparkles, Code2, Copy, Check } from "lucide-react";
import ReactDOM from "react-dom";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

const items = [
  { q: "How do I track my order?", a: "You can track your order by logging into your account and visiting the \"Orders\" section. You'll receive tracking information via email once your order ships. For real-time updates, you can also use the tracking number provided in your shipping confirmation email." },
  { q: "What is your return policy?", a: "We offer a 30-day return policy for most items. Products must be unused and in original packaging." },
  { q: "How can I contact customer support?", a: "You can reach our support team via email, live chat, or phone during business hours." },
];

// --- Chevron ---
function Chevron({ className = "" }: { className?: string }) {
  return (
    <svg className={`h-4 w-4 shrink-0 transition-transform group-open:rotate-180 ${className}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
    </svg>
  );
}

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
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold">CLI Command</h2>
          <button onClick={onClose} className="rounded-md p-1 hover:bg-muted" aria-label="Close">
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Package manager tabs */}
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

        {/* CLI command */}
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

        {/* Manual Code */}
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
        {/* Accordion preview */}
        <div className="w-full">{children}</div>

        {/* Hover action buttons */}
        <TooltipProvider delayDuration={200}>
          <div className="absolute top-2 right-2 flex items-center gap-2">
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  className="inline-flex size-9 shrink-0 items-center justify-center rounded-md text-muted-foreground hover:text-foreground cursor-pointer opacity-0 transition-none group-hover/item:opacity-100"
                  aria-label="Copy prompt"
                >
                  <Sparkles className="h-4 w-4" />
                </button>
              </TooltipTrigger>
              <TooltipContent>Copy prompt</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  className="inline-flex size-9 shrink-0 items-center justify-center rounded-md text-muted-foreground hover:text-foreground cursor-pointer opacity-0 transition-none group-hover/item:opacity-100"
                  aria-label="Open in v0"
                >
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 4h6v6H4zM14 4h6v6h-6zM4 14h6v6H4zM14 14h6v6h-6z" />
                  </svg>
                </button>
              </TooltipTrigger>
              <TooltipContent>Open in v0</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  onClick={() => setShowCode(true)}
                  className="inline-flex size-9 shrink-0 items-center justify-center rounded-md text-muted-foreground hover:text-foreground cursor-pointer opacity-0 transition-none group-hover/item:opacity-100"
                  aria-label="View code"
                >
                  <Code2 className="h-4 w-4" />
                </button>
              </TooltipTrigger>
              <TooltipContent>View code</TooltipContent>
            </Tooltip>
          </div>
        </TooltipProvider>

        {/* Hover title label */}
        <div className="text-muted-foreground absolute top-3 left-4 hidden text-sm group-hover/item:block">
          {title}
        </div>
      </div>

      {showCode && <CodeModal code={code} onClose={() => setShowCode(false)} variantId={variantId} />}
    </div>
  );
}

// --- Variant Previews ---

function Accordion1() {
  return (
    <div className="divide-y">
      {items.map((item, i) => (
        <details key={i} className="group" open={i === 0}>
          <summary className="flex cursor-pointer items-center justify-between py-4 font-medium">
            <Chevron className="mr-3 group-open:rotate-180" />
            <span className="flex-1">{item.q}</span>
            <Chevron className="opacity-0" />
          </summary>
          <div className="pb-4 text-sm text-muted-foreground">{item.a}</div>
        </details>
      ))}
    </div>
  );
}

function Accordion2() {
  return (
    <div className="space-y-2">
      {items.map((item, i) => (
        <details key={i} className="group rounded-md border bg-card shadow-md open:shadow-lg" open={i === 0}>
          <summary className="flex cursor-pointer items-center justify-between p-4 font-medium">
            <span>{item.q}</span>
            <span className="text-lg leading-none group-open:hidden">+</span>
            <span className="text-lg leading-none hidden group-open:inline">&minus;</span>
          </summary>
          <div className="px-4 pb-4 text-sm text-muted-foreground">{item.a}</div>
        </details>
      ))}
    </div>
  );
}

function Accordion3() {
  return (
    <div className="divide-y">
      {items.map((item, i) => (
        <details key={i} className="group" open={i === 0}>
          <summary className="flex cursor-pointer items-center justify-between py-4 font-medium hover:text-primary">
            <Chevron className="mr-3 group-open:rotate-180" />
            <span className="flex-1">{item.q}</span>
            <Chevron />
          </summary>
          <div className="pb-4 text-sm text-muted-foreground">{item.a}</div>
        </details>
      ))}
    </div>
  );
}

function Accordion4() {
  return (
    <div className="divide-y">
      {items.map((item, i) => (
        <details key={i} className="group" open={i === 0}>
          <summary className="flex cursor-pointer items-center justify-between py-4 font-medium">
            <span>{item.q}</span>
            <Chevron />
          </summary>
          <div className="pb-4 text-sm text-muted-foreground">{item.a}</div>
        </details>
      ))}
    </div>
  );
}

function Accordion5() {
  return (
    <div className="rounded-lg border overflow-hidden">
      {items.map((item, i) => (
        <details key={i} className="group border-b last:border-b-0" open={i === 0}>
          <summary className="flex cursor-pointer items-center justify-between bg-background p-4 font-medium hover:bg-muted transition-colors">
            <span>{item.q}</span>
            <Chevron />
          </summary>
          <div className="bg-muted/30 p-4 text-sm text-muted-foreground">{item.a}</div>
        </details>
      ))}
    </div>
  );
}

function Accordion6() {
  return (
    <div className="space-y-2">
      {items.map((item, i) => (
        <details key={i} className="group rounded-lg" open={i === 0}>
          <summary className="flex cursor-pointer items-center justify-between rounded-lg p-4 font-medium transition-colors hover:bg-muted group-open:bg-primary/10 group-open:text-primary">
            <span>{item.q}</span>
            <Chevron />
          </summary>
          <div className="px-4 pb-4 text-sm text-muted-foreground">{item.a}</div>
        </details>
      ))}
    </div>
  );
}

function Accordion7() {
  return (
    <div className="divide-y border-y">
      {items.map((item, i) => (
        <details key={i} className="group" open={i === 0}>
          <summary className="flex cursor-pointer items-center justify-between py-3 text-sm font-medium hover:text-primary transition-colors">
            <span>{item.q}</span>
            <Chevron />
          </summary>
          <div className="pb-3 text-sm text-muted-foreground">{item.a}</div>
        </details>
      ))}
    </div>
  );
}

function Accordion8() {
  const descs = ["Learn about returns and refunds", "Track packages and deliveries", "International shipping details"];
  return (
    <div className="space-y-3">
      {items.map((item, i) => (
        <details key={i} className="group rounded-lg border" open={i === 0}>
          <summary className="flex cursor-pointer items-center justify-between p-4 hover:bg-muted transition-colors">
            <div>
              <div className="font-medium">{item.q}</div>
              <div className="text-xs text-muted-foreground mt-1">{descs[i]}</div>
            </div>
            <Chevron />
          </summary>
          <div className="border-t p-4 text-sm text-muted-foreground">{item.a}</div>
        </details>
      ))}
    </div>
  );
}

// --- Code strings ---
const codes: Record<string, string> = {
  "accordion-01": `import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@components/ui/accordion'

const items = [
  { title: 'How do I track my order?', content: 'You can track your order by logging into your account...' },
  { title: 'What is your return policy?', content: 'We offer a 30-day return policy...' },
  { title: 'How can I contact customer support?', content: 'You can reach our support team...' },
]

export default function Accordion1() {
  return (
    <Accordion type="single" collapsible defaultValue="item-0">
      {items.map((item, i) => (
        <AccordionItem key={i} value={\`item-\${i}\`}>
          <AccordionTrigger>{item.title}</AccordionTrigger>
          <AccordionContent>{item.content}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  )
}`,
  "accordion-02": `import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@components/ui/accordion'

const items = [
  { title: 'How do I track my order?', content: 'You can track your order by logging into your account...' },
  { title: 'What is your return policy?', content: 'We offer a 30-day return policy...' },
  { title: 'How can I contact customer support?', content: 'You can reach our support team...' },
]

export default function Accordion2() {
  return (
    <Accordion type="single" collapsible defaultValue="item-0" className="space-y-2">
      {items.map((item, i) => (
        <AccordionItem key={i} value={\`item-\${i}\`} className="bg-card rounded-md border-b-0 shadow-md data-[state=open]:shadow-lg">
          <AccordionTrigger className="px-4">{item.title}</AccordionTrigger>
          <AccordionContent className="px-4">{item.content}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  )
}`,
};

// Default code for variants without specific code
function getCode(id: string) {
  return codes[id] || codes["accordion-01"]!.replace("Accordion1", id.replace("accordion-", "Accordion"));
}

// --- Variants ---
const variants = [
  { id: "accordion-01", title: "Accordion 1", preview: <Accordion1 /> },
  { id: "accordion-02", title: "Accordion 2", preview: <Accordion2 /> },
  { id: "accordion-03", title: "Accordion 3", preview: <Accordion3 /> },
  { id: "accordion-04", title: "Accordion 4", preview: <Accordion4 /> },
  { id: "accordion-05", title: "Accordion 5", preview: <Accordion5 /> },
  { id: "accordion-06", title: "Accordion 6", preview: <Accordion6 /> },
  { id: "accordion-07", title: "Accordion 7", preview: <Accordion7 /> },
  { id: "accordion-08", title: "Accordion 8", preview: <Accordion8 /> },
];

export default function AccordionPage() {
  return (
    <ComponentLayout>
      {/* Page Header */}
      <div className="mb-4 flex gap-x-8 gap-y-4 max-md:flex-col">
        <div className="space-y-3">
          <h1 className="text-2xl font-bold sm:text-3xl">Shadcn Accordion</h1>
          <p className="text-muted-foreground">
            Explore the collection of awesome Shadcn Accordion Components, featuring {variants.length} accordion
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
          <p className="font-medium">Have any suggestions for Accordion variants?</p>
          <p className="text-muted-foreground">Join our Discord community and share your ideas to help us improve and expand our component variants!</p>
        </div>
      </div>

      {/* Variants Grid */}
      <div
        className="group/grid grid grid-cols-1 divide-y divide-dashed md:grid-cols-2 md:divide-x"
      >
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
