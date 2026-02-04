"use client";

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@ipareddes/ui-components";

import { ComponentLayout } from "@/components/layout/component-layout";
import { useState } from "react";
import { X, Sparkles, Code2, Copy, Check } from "lucide-react";
import ReactDOM from "react-dom";
import { toast, Toaster } from "sonner";

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

// --- Sonner Variant Previews ---

function Sonner01() {
  return (
    <button
      className="inline-flex items-center justify-center gap-2 rounded-md border bg-background px-4 py-2 text-sm font-medium shadow-xs hover:bg-accent hover:text-accent-foreground"
      onClick={() => toast("Event has been created")}
    >
      Default Toast
    </button>
  );
}

function Sonner02() {
  return (
    <button
      className="inline-flex items-center justify-center gap-2 rounded-md border bg-background px-4 py-2 text-sm font-medium shadow-xs hover:bg-accent hover:text-accent-foreground"
      onClick={() =>
        toast("Event has been created", {
          description: "Sunday, December 03, 2023 at 9:00 AM",
        })
      }
    >
      Toast with description
    </button>
  );
}

function Sonner03() {
  return (
    <button
      className="inline-flex items-center justify-center gap-2 rounded-md border bg-background px-4 py-2 text-sm font-medium shadow-xs hover:bg-accent hover:text-accent-foreground"
      onClick={() =>
        toast("Event has been created", {
          description: "Sunday, December 03, 2023 at 9:00 AM",
          icon: "📅",
        })
      }
    >
      Toast with icon
    </button>
  );
}

function Sonner04() {
  return (
    <button
      className="inline-flex items-center justify-center gap-2 rounded-md border bg-background px-4 py-2 text-sm font-medium shadow-xs hover:bg-accent hover:text-accent-foreground"
      onClick={() =>
        toast("John Doe", {
          description: "Sent you a message",
          icon: (
            <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-muted text-[10px] font-bold">
              JD
            </span>
          ),
        })
      }
    >
      Toast with avatar
    </button>
  );
}

function Sonner05() {
  return (
    <button
      className="inline-flex items-center justify-center gap-2 rounded-md border bg-background px-4 py-2 text-sm font-medium shadow-xs hover:bg-accent hover:text-accent-foreground"
      onClick={() =>
        toast("Event has been created", {
          description: "Sunday, December 03, 2023 at 9:00 AM",
          cancel: {
            label: "Close",
            onClick: () => {},
          },
        })
      }
    >
      Closable Toast
    </button>
  );
}

function Sonner06() {
  return (
    <button
      className="inline-flex items-center justify-center gap-2 rounded-md border bg-background px-4 py-2 text-sm font-medium shadow-xs hover:bg-accent hover:text-accent-foreground"
      onClick={() =>
        toast("Event has been created", {
          description: "Sunday, December 03, 2023 at 9:00 AM",
          action: {
            label: "Undo",
            onClick: () => {},
          },
        })
      }
    >
      Toast with action
    </button>
  );
}

function Sonner07() {
  return (
    <button
      className="inline-flex items-center justify-center gap-2 rounded-md border bg-background px-4 py-2 text-sm font-medium shadow-xs hover:bg-accent hover:text-accent-foreground"
      onClick={() => {
        toast.promise(
          new Promise((resolve) => setTimeout(resolve, 2000)),
          {
            loading: "Loading...",
            success: "Successfully loaded!",
            error: "Error loading data",
          }
        );
      }}
    >
      Toast with promise
    </button>
  );
}

function Sonner08() {
  return (
    <div className="grid grid-cols-2 gap-2">
      {(
        [
          ["top-left", "Top Left"],
          ["top-center", "Top Center"],
          ["top-right", "Top Right"],
          ["bottom-left", "Bottom Left"],
          ["bottom-center", "Bottom Center"],
          ["bottom-right", "Bottom Right"],
        ] as const
      ).map(([position, label]) => (
        <button
          key={position}
          className="inline-flex items-center justify-center gap-2 rounded-md border bg-background px-4 py-2 text-sm font-medium shadow-xs hover:bg-accent hover:text-accent-foreground"
          onClick={() =>
            toast("Event has been created", {
              description: `Position: ${label}`,
              position,
            })
          }
        >
          {label}
        </button>
      ))}
    </div>
  );
}

function Sonner09() {
  return (
    <button
      className="inline-flex items-center justify-center gap-2 rounded-md border bg-background px-4 py-2 text-sm font-medium shadow-xs hover:bg-accent hover:text-accent-foreground"
      onClick={() => toast.info("This is an informational message.")}
    >
      Soft Info Toast
    </button>
  );
}

function Sonner10() {
  return (
    <button
      className="inline-flex items-center justify-center gap-2 rounded-md border bg-background px-4 py-2 text-sm font-medium shadow-xs hover:bg-accent hover:text-accent-foreground"
      onClick={() => toast.success("Operation completed successfully!")}
    >
      Soft Success Toast
    </button>
  );
}

function Sonner11() {
  return (
    <button
      className="inline-flex items-center justify-center gap-2 rounded-md border bg-background px-4 py-2 text-sm font-medium shadow-xs hover:bg-accent hover:text-accent-foreground"
      onClick={() => toast.warning("Please review before proceeding.")}
    >
      Soft Warning Toast
    </button>
  );
}

function Sonner12() {
  return (
    <button
      className="inline-flex items-center justify-center gap-2 rounded-md border bg-background px-4 py-2 text-sm font-medium shadow-xs hover:bg-accent hover:text-accent-foreground"
      onClick={() => toast.error("Something went wrong!")}
    >
      Soft Destructive Toast
    </button>
  );
}

function Sonner13() {
  return (
    <button
      className="inline-flex items-center justify-center gap-2 rounded-md border bg-background px-4 py-2 text-sm font-medium shadow-xs hover:bg-accent hover:text-accent-foreground"
      onClick={() =>
        toast.info("This is an informational message.", {
          style: {
            border: "1px solid hsl(var(--ring))",
            background: "transparent",
          },
        })
      }
    >
      Outline Info Toast
    </button>
  );
}

function Sonner14() {
  return (
    <button
      className="inline-flex items-center justify-center gap-2 rounded-md border bg-background px-4 py-2 text-sm font-medium shadow-xs hover:bg-accent hover:text-accent-foreground"
      onClick={() =>
        toast.success("Operation completed successfully!", {
          style: {
            border: "1px solid hsl(142.1 76.2% 36.3%)",
            background: "transparent",
            color: "hsl(142.1 76.2% 36.3%)",
          },
        })
      }
    >
      Outline Success Toast
    </button>
  );
}

function Sonner15() {
  return (
    <button
      className="inline-flex items-center justify-center gap-2 rounded-md border bg-background px-4 py-2 text-sm font-medium shadow-xs hover:bg-accent hover:text-accent-foreground"
      onClick={() =>
        toast.warning("Please review before proceeding.", {
          style: {
            border: "1px solid hsl(37.7 92.1% 50.2%)",
            background: "transparent",
            color: "hsl(37.7 92.1% 50.2%)",
          },
        })
      }
    >
      Outline Warning Toast
    </button>
  );
}

function Sonner16() {
  return (
    <button
      className="inline-flex items-center justify-center gap-2 rounded-md border bg-background px-4 py-2 text-sm font-medium shadow-xs hover:bg-accent hover:text-accent-foreground"
      onClick={() =>
        toast.error("Something went wrong!", {
          style: {
            border: "1px solid hsl(var(--destructive))",
            background: "transparent",
            color: "hsl(var(--destructive))",
          },
        })
      }
    >
      Outline Destructive Toast
    </button>
  );
}

function Sonner17() {
  return (
    <button
      className="inline-flex items-center justify-center gap-2 rounded-md border bg-background px-4 py-2 text-sm font-medium shadow-xs hover:bg-accent hover:text-accent-foreground"
      onClick={() =>
        toast.info("This is an informational message.", {
          style: {
            background: "hsl(217.2 91.2% 59.8%)",
            color: "white",
            border: "none",
          },
        })
      }
    >
      Solid Info Toast
    </button>
  );
}

function Sonner18() {
  return (
    <button
      className="inline-flex items-center justify-center gap-2 rounded-md border bg-background px-4 py-2 text-sm font-medium shadow-xs hover:bg-accent hover:text-accent-foreground"
      onClick={() =>
        toast.success("Operation completed successfully!", {
          style: {
            background: "hsl(142.1 76.2% 36.3%)",
            color: "white",
            border: "none",
          },
        })
      }
    >
      Solid Success Toast
    </button>
  );
}

function Sonner19() {
  return (
    <button
      className="inline-flex items-center justify-center gap-2 rounded-md border bg-background px-4 py-2 text-sm font-medium shadow-xs hover:bg-accent hover:text-accent-foreground"
      onClick={() =>
        toast.warning("Please review before proceeding.", {
          style: {
            background: "hsl(37.7 92.1% 50.2%)",
            color: "white",
            border: "none",
          },
        })
      }
    >
      Solid Warning Toast
    </button>
  );
}

function Sonner20() {
  return (
    <button
      className="inline-flex items-center justify-center gap-2 rounded-md border bg-background px-4 py-2 text-sm font-medium shadow-xs hover:bg-accent hover:text-accent-foreground"
      onClick={() =>
        toast.error("Something went wrong!", {
          style: {
            background: "hsl(var(--destructive))",
            color: "white",
            border: "none",
          },
        })
      }
    >
      Solid Destructive Toast
    </button>
  );
}

// --- Code strings ---
const codes: Record<string, string> = {
  "sonner-01": `import { toast } from "sonner"

export default function Sonner01() {
  return (
    <button onClick={() => toast("Event has been created")}>
      Default Toast
    </button>
  )
}`,
  "sonner-02": `import { toast } from "sonner"

export default function Sonner02() {
  return (
    <button
      onClick={() =>
        toast("Event has been created", {
          description: "Sunday, December 03, 2023 at 9:00 AM",
        })
      }
    >
      Toast with description
    </button>
  )
}`,
  "sonner-07": `import { toast } from "sonner"

export default function Sonner07() {
  return (
    <button
      onClick={() => {
        toast.promise(
          new Promise((resolve) => setTimeout(resolve, 2000)),
          {
            loading: "Loading...",
            success: "Successfully loaded!",
            error: "Error loading data",
          }
        )
      }}
    >
      Toast with promise
    </button>
  )
}`,
  "sonner-09": `import { toast } from "sonner"

export default function Sonner09() {
  return (
    <button onClick={() => toast.info("This is an informational message.")}>
      Soft Info Toast
    </button>
  )
}`,
  "sonner-17": `import { toast } from "sonner"

export default function Sonner17() {
  return (
    <button
      onClick={() =>
        toast.info("This is an informational message.", {
          style: {
            background: "hsl(217.2 91.2% 59.8%)",
            color: "white",
            border: "none",
          },
        })
      }
    >
      Solid Info Toast
    </button>
  )
}`,
  "sonner-20": `import { toast } from "sonner"

export default function Sonner20() {
  return (
    <button
      onClick={() =>
        toast.error("Something went wrong!", {
          style: {
            background: "hsl(var(--destructive))",
            color: "white",
            border: "none",
          },
        })
      }
    >
      Solid Destructive Toast
    </button>
  )
}`,
};

function getCode(id: string) {
  return codes[id] || codes["sonner-01"]!.replace("Sonner01", id.replace("sonner-", "Sonner"));
}

// --- Variants ---
const variants = [
  { id: "sonner-01", title: "Sonner 1", preview: <Sonner01 /> },
  { id: "sonner-02", title: "Sonner 2", preview: <Sonner02 /> },
  { id: "sonner-03", title: "Sonner 3", preview: <Sonner03 /> },
  { id: "sonner-04", title: "Sonner 4", preview: <Sonner04 /> },
  { id: "sonner-05", title: "Sonner 5", preview: <Sonner05 /> },
  { id: "sonner-06", title: "Sonner 6", preview: <Sonner06 /> },
  { id: "sonner-07", title: "Sonner 7", preview: <Sonner07 /> },
  { id: "sonner-08", title: "Sonner 8", preview: <Sonner08 /> },
  { id: "sonner-09", title: "Sonner 9", preview: <Sonner09 /> },
  { id: "sonner-10", title: "Sonner 10", preview: <Sonner10 /> },
  { id: "sonner-11", title: "Sonner 11", preview: <Sonner11 /> },
  { id: "sonner-12", title: "Sonner 12", preview: <Sonner12 /> },
  { id: "sonner-13", title: "Sonner 13", preview: <Sonner13 /> },
  { id: "sonner-14", title: "Sonner 14", preview: <Sonner14 /> },
  { id: "sonner-15", title: "Sonner 15", preview: <Sonner15 /> },
  { id: "sonner-16", title: "Sonner 16", preview: <Sonner16 /> },
  { id: "sonner-17", title: "Sonner 17", preview: <Sonner17 /> },
  { id: "sonner-18", title: "Sonner 18", preview: <Sonner18 /> },
  { id: "sonner-19", title: "Sonner 19", preview: <Sonner19 /> },
  { id: "sonner-20", title: "Sonner 20", preview: <Sonner20 /> },
];

export default function SonnerPage() {
  return (
    <ComponentLayout>
      <Toaster richColors />

      {/* Page Header */}
      <div className="mb-4 flex gap-x-8 gap-y-4 max-md:flex-col">
        <div className="space-y-3">
          <h1 className="text-2xl font-bold sm:text-3xl">Shadcn Sonner</h1>
          <p className="text-muted-foreground">
            Explore the collection of awesome Shadcn Sonner Components, featuring {variants.length} sonner
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
          <p className="font-medium">Have any suggestions for Sonner variants?</p>
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
