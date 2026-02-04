"use client";

import { ComponentLayout } from "@/components/layout/component-layout";
import { useState } from "react";
import { X, Sparkles, Code2, Copy, Check } from "lucide-react";
import ReactDOM from "react-dom";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Separator } from "@/components/ui/separator";

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
        <div className="w-full flex items-center justify-center">{children}</div>
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

// --- Separator Variant Previews ---

function Separator01() {
  return (
    <div className="w-full max-w-sm">
      <div className="space-y-1">
        <h4 className="text-sm font-medium leading-none">Radix Primitives</h4>
        <p className="text-sm text-muted-foreground">An open-source UI component library.</p>
      </div>
      <Separator className="my-4" />
      <div className="flex h-5 items-center space-x-4 text-sm">
        <div>Blog</div>
        <Separator orientation="vertical" />
        <div>Docs</div>
        <Separator orientation="vertical" />
        <div>Source</div>
      </div>
    </div>
  );
}

function Separator02() {
  return (
    <div className="w-full max-w-sm space-y-4">
      <div className="text-center text-sm font-medium">Section A</div>
      <Separator />
      <div className="text-center text-sm font-medium">Section B</div>
      <Separator />
      <div className="text-center text-sm font-medium">Section C</div>
    </div>
  );
}

function Separator03() {
  return (
    <div className="flex h-24 items-center space-x-4">
      <div className="text-center">
        <p className="text-2xl font-bold">250</p>
        <p className="text-xs text-muted-foreground">Posts</p>
      </div>
      <Separator orientation="vertical" />
      <div className="text-center">
        <p className="text-2xl font-bold">1.2K</p>
        <p className="text-xs text-muted-foreground">Followers</p>
      </div>
      <Separator orientation="vertical" />
      <div className="text-center">
        <p className="text-2xl font-bold">890</p>
        <p className="text-xs text-muted-foreground">Following</p>
      </div>
    </div>
  );
}

function Separator04() {
  return (
    <div className="w-full max-w-sm">
      <div className="flex items-center gap-4">
        <Separator className="flex-1" />
        <span className="text-sm text-muted-foreground">OR</span>
        <Separator className="flex-1" />
      </div>
    </div>
  );
}

function Separator05() {
  return (
    <div className="w-full max-w-sm">
      <div className="flex items-center gap-4">
        <Separator className="flex-1" />
        <span className="text-xs text-muted-foreground uppercase tracking-wider">Continue with</span>
        <Separator className="flex-1" />
      </div>
    </div>
  );
}

function Separator06() {
  return (
    <div className="w-full max-w-sm rounded-lg border p-4">
      <h4 className="font-semibold">Account Settings</h4>
      <Separator className="my-3" />
      <nav className="space-y-2 text-sm">
        <a href="#" className="block hover:text-primary">Profile</a>
        <a href="#" className="block hover:text-primary">Security</a>
        <a href="#" className="block hover:text-primary">Notifications</a>
        <Separator className="my-2" />
        <a href="#" className="block text-red-500 hover:text-red-600">Delete Account</a>
      </nav>
    </div>
  );
}

function Separator07() {
  return (
    <div className="w-full max-w-sm">
      <Separator className="bg-gradient-to-r from-transparent via-border to-transparent" />
    </div>
  );
}

function Separator08() {
  return (
    <div className="w-full max-w-sm">
      <Separator className="h-[2px] bg-primary" />
    </div>
  );
}

function Separator09() {
  return (
    <div className="w-full max-w-sm">
      <div className="border-t-2 border-dashed border-border" />
    </div>
  );
}

function Separator10() {
  return (
    <div className="w-full max-w-sm">
      <div className="border-t-2 border-dotted border-border" />
    </div>
  );
}

function Separator11() {
  return (
    <div className="w-full max-w-sm rounded-lg border overflow-hidden">
      <div className="p-4">
        <h4 className="font-medium">Item 1</h4>
        <p className="text-sm text-muted-foreground">Description for item 1</p>
      </div>
      <Separator />
      <div className="p-4">
        <h4 className="font-medium">Item 2</h4>
        <p className="text-sm text-muted-foreground">Description for item 2</p>
      </div>
      <Separator />
      <div className="p-4">
        <h4 className="font-medium">Item 3</h4>
        <p className="text-sm text-muted-foreground">Description for item 3</p>
      </div>
    </div>
  );
}

function Separator12() {
  return (
    <div className="w-full max-w-sm flex items-center gap-2 text-sm">
      <span>Home</span>
      <Separator orientation="vertical" className="h-4" />
      <span>Products</span>
      <Separator orientation="vertical" className="h-4" />
      <span>Electronics</span>
      <Separator orientation="vertical" className="h-4" />
      <span className="text-muted-foreground">Phones</span>
    </div>
  );
}

// --- Code strings ---
const codes: Record<string, string> = {
  "separator-01": `import { Separator } from "@/components/ui/separator"

export default function Separator01() {
  return (
    <div>
      <div className="space-y-1">
        <h4 className="text-sm font-medium leading-none">Radix Primitives</h4>
        <p className="text-sm text-muted-foreground">An open-source UI component library.</p>
      </div>
      <Separator className="my-4" />
      <div className="flex h-5 items-center space-x-4 text-sm">
        <div>Blog</div>
        <Separator orientation="vertical" />
        <div>Docs</div>
        <Separator orientation="vertical" />
        <div>Source</div>
      </div>
    </div>
  )
}`,
};

function getCode(id: string) {
  return codes[id] || codes["separator-01"]!;
}

// --- Variants ---
const variants = [
  { id: "separator-01", title: "Separator 1 - Basic", preview: <Separator01 /> },
  { id: "separator-02", title: "Separator 2 - Sections", preview: <Separator02 /> },
  { id: "separator-03", title: "Separator 3 - Stats", preview: <Separator03 /> },
  { id: "separator-04", title: "Separator 4 - With Text (OR)", preview: <Separator04 /> },
  { id: "separator-05", title: "Separator 5 - Continue With", preview: <Separator05 /> },
  { id: "separator-06", title: "Separator 6 - Navigation", preview: <Separator06 /> },
  { id: "separator-07", title: "Separator 7 - Gradient Fade", preview: <Separator07 /> },
  { id: "separator-08", title: "Separator 8 - Primary Color", preview: <Separator08 /> },
  { id: "separator-09", title: "Separator 9 - Dashed", preview: <Separator09 /> },
  { id: "separator-10", title: "Separator 10 - Dotted", preview: <Separator10 /> },
  { id: "separator-11", title: "Separator 11 - List Items", preview: <Separator11 /> },
  { id: "separator-12", title: "Separator 12 - Breadcrumb", preview: <Separator12 /> },
];

export default function SeparatorPage() {
  return (
    <ComponentLayout>
      {/* Page Header */}
      <div className="mb-4 flex gap-x-8 gap-y-4 max-md:flex-col">
        <div className="space-y-3">
          <h1 className="text-2xl font-bold sm:text-3xl">Shadcn Separator</h1>
          <p className="text-muted-foreground">
            Explore the collection of awesome Shadcn Separator Components, featuring {variants.length} separator
            variants designed for dividing content built with React and Tailwind CSS.
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
          <p className="font-medium">Have any suggestions for Separator variants?</p>
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
