"use client";

import { Button, Card, CardTitle, Collapsible, CollapsibleContent, CollapsibleTrigger, Separator, Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@ipareddes/ui-components";

import { ComponentLayout } from "@/components/layout/component-layout";
import { useState } from "react";
import { X, Sparkles, Code2, Copy, Check, ChevronsUpDown, ChevronRight, ChevronDown, ChevronUp, Folder, FolderOpen, File, MapPin, Truck, CreditCard } from "lucide-react";
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

// --- Collapsible Variant Previews ---

function Collapsible01Preview() {
  const [open, setOpen] = useState(false);

  return (
    <Collapsible open={open} onOpenChange={setOpen} className="flex w-full max-w-[350px] flex-col gap-2">
      <div className="flex items-center justify-between gap-4 px-4">
        <div className="text-sm font-semibold">@peduarte starred 3 repositories</div>
        <Button variant="ghost" size="icon" className="size-8" onClick={() => setOpen(!open)}>
          <ChevronsUpDown className="h-4 w-4" />
          <span className="sr-only">Toggle</span>
        </Button>
      </div>
      <div className="rounded-md border px-4 py-2 font-mono text-sm">@radix-ui/primitives</div>
      <CollapsibleContent className="flex flex-col gap-2">
        <div className="rounded-md border px-4 py-2 font-mono text-sm">@radix-ui/colors</div>
        <div className="rounded-md border px-4 py-2 font-mono text-sm">@stitches/react</div>
      </CollapsibleContent>
    </Collapsible>
  );
}

function Collapsible02Preview() {
  const [openComponents, setOpenComponents] = useState(false);
  const [openLib, setOpenLib] = useState(false);

  return (
    <div className="flex w-full max-w-48 flex-col gap-2">
      <Collapsible open={openComponents} onOpenChange={setOpenComponents} className="flex flex-col gap-1.5">
        <CollapsibleTrigger className="flex items-center gap-2 rounded-md p-1">
          <ChevronRight className={`size-4 shrink-0 transition-transform ${openComponents ? "rotate-90" : ""}`} />
          {openComponents ? <FolderOpen className="size-4 shrink-0" /> : <Folder className="size-4 shrink-0" />}
          <span className="text-sm">components</span>
        </CollapsibleTrigger>
        <CollapsibleContent className="flex flex-col gap-1.5" style={{ paddingLeft: "1.5rem" }}>
          <div className="flex items-center gap-2 p-1">
            <File className="size-4 shrink-0 text-muted-foreground" />
            <span className="text-sm">button.tsx</span>
          </div>
          <div className="flex items-center gap-2 p-1">
            <File className="size-4 shrink-0 text-muted-foreground" />
            <span className="text-sm">card.tsx</span>
          </div>
        </CollapsibleContent>
      </Collapsible>
      <Collapsible open={openLib} onOpenChange={setOpenLib} className="flex flex-col gap-1.5">
        <CollapsibleTrigger className="flex items-center gap-2 rounded-md p-1">
          <ChevronRight className={`size-4 shrink-0 transition-transform ${openLib ? "rotate-90" : ""}`} />
          {openLib ? <FolderOpen className="size-4 shrink-0" /> : <Folder className="size-4 shrink-0" />}
          <span className="text-sm">lib</span>
        </CollapsibleTrigger>
        <CollapsibleContent className="flex flex-col gap-1.5" style={{ paddingLeft: "1.5rem" }}>
          <div className="flex items-center gap-2 p-1">
            <File className="size-4 shrink-0 text-muted-foreground" />
            <span className="text-sm">utils.ts</span>
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
}

function Collapsible03Preview() {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex w-full max-w-[350px] flex-col items-start gap-4">
      <div className="font-medium">Today&apos;s task completion</div>
      <ul className="flex w-full flex-col gap-2">
        <li className="flex items-start gap-4">
          <span className="relative flex size-8 shrink-0 overflow-hidden rounded-full bg-muted items-center justify-center text-xs font-bold">HL</span>
          <div className="flex flex-1 flex-col">
            <div className="text-sm font-medium">Howard Lloyd</div>
            <p className="text-muted-foreground text-xs">Product Manager</p>
          </div>
          <span className="text-muted-foreground text-sm">90%</span>
        </li>
        <li className="flex items-start gap-4">
          <span className="relative flex size-8 shrink-0 overflow-hidden rounded-full bg-muted items-center justify-center text-xs font-bold">OS</span>
          <div className="flex flex-1 flex-col">
            <div className="text-sm font-medium">Olivia Sparks</div>
            <p className="text-muted-foreground text-xs">Software Engineer</p>
          </div>
          <span className="text-muted-foreground text-sm">60%</span>
        </li>
        {open && (
          <>
            <li className="flex items-start gap-4">
              <span className="relative flex size-8 shrink-0 overflow-hidden rounded-full bg-muted items-center justify-center text-xs font-bold">HR</span>
              <div className="flex flex-1 flex-col">
                <div className="text-sm font-medium">Hallie Richards</div>
                <p className="text-muted-foreground text-xs">Designer</p>
              </div>
              <span className="text-muted-foreground text-sm">45%</span>
            </li>
            <li className="flex items-start gap-4">
              <span className="relative flex size-8 shrink-0 overflow-hidden rounded-full bg-muted items-center justify-center text-xs font-bold">JM</span>
              <div className="flex flex-1 flex-col">
                <div className="text-sm font-medium">James Miller</div>
                <p className="text-muted-foreground text-xs">Developer</p>
              </div>
              <span className="text-muted-foreground text-sm">75%</span>
            </li>
          </>
        )}
      </ul>
      <Button variant="outline" size="sm" onClick={() => setOpen(!open)}>
        {open ? "Show less" : "Show more"}
        <ChevronUp className={`ml-1 h-4 w-4 ${!open ? "rotate-180" : ""}`} />
      </Button>
    </div>
  );
}

function Collapsible04Preview() {
  const [openId, setOpenId] = useState<string | null>(null);
  const people = [
    { name: "Howard Lloyd", initials: "HL" },
    { name: "Olivia Sparks", initials: "OS" },
    { name: "Hallie Richards", initials: "HR" },
  ];

  return (
    <ul className="flex w-full max-w-[350px] flex-col gap-4">
      {people.map((p) => (
        <li key={p.name} className="flex flex-col gap-2">
          <button
            onClick={() => setOpenId(openId === p.name ? null : p.name)}
            className="flex w-full items-center justify-between gap-4"
          >
            <div className="flex items-center gap-2">
              <span className="relative flex size-8 shrink-0 overflow-hidden rounded-full bg-muted items-center justify-center text-xs font-bold">{p.initials}</span>
              <span className="font-medium">{p.name}</span>
            </div>
            <ChevronRight className={`size-4 transition-transform ${openId === p.name ? "rotate-90" : ""}`} />
          </button>
          {openId === p.name && (
            <div className="ml-10 text-sm text-muted-foreground">
              <p>Role: Team Member</p>
              <p>Status: Active</p>
            </div>
          )}
        </li>
      ))}
    </ul>
  );
}

function Collapsible05Preview() {
  const [openPrice, setOpenPrice] = useState(false);
  const [openRating, setOpenRating] = useState(false);
  const [openBrand, setOpenBrand] = useState(false);

  return (
    <div className="w-full max-w-[350px] space-y-3">
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between gap-4 px-4">
          <div className="text-sm font-semibold">Price Range</div>
          <Button variant="ghost" size="icon" className="size-8 group" onClick={() => setOpenPrice(!openPrice)}>
            <ChevronDown className={`text-muted-foreground transition-transform ${openPrice ? "rotate-180" : ""}`} />
            <span className="sr-only">Toggle</span>
          </Button>
        </div>
        {openPrice && (
          <div className="flex flex-col gap-2 px-4">
            <label className="flex items-center gap-2 text-sm"><input type="checkbox" className="rounded" /> Under $25</label>
            <label className="flex items-center gap-2 text-sm"><input type="checkbox" className="rounded" /> $25 - $50</label>
            <label className="flex items-center gap-2 text-sm"><input type="checkbox" className="rounded" /> $50 - $100</label>
          </div>
        )}
      </div>
      <Separator />
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between gap-4 px-4">
          <div className="text-sm font-semibold">Customer Ratings</div>
          <Button variant="ghost" size="icon" className="size-8 group" onClick={() => setOpenRating(!openRating)}>
            <ChevronDown className={`text-muted-foreground transition-transform ${openRating ? "rotate-180" : ""}`} />
            <span className="sr-only">Toggle</span>
          </Button>
        </div>
        {openRating && (
          <div className="flex flex-col gap-2 px-4">
            <label className="flex items-center gap-2 text-sm"><input type="checkbox" className="rounded" /> 4 stars & up</label>
            <label className="flex items-center gap-2 text-sm"><input type="checkbox" className="rounded" /> 3 stars & up</label>
          </div>
        )}
      </div>
      <Separator />
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between gap-4 px-4">
          <div className="text-sm font-semibold">Brand</div>
          <Button variant="ghost" size="icon" className="size-8 group" onClick={() => setOpenBrand(!openBrand)}>
            <ChevronDown className={`text-muted-foreground transition-transform ${openBrand ? "rotate-180" : ""}`} />
            <span className="sr-only">Toggle</span>
          </Button>
        </div>
        {openBrand && (
          <div className="flex flex-col gap-2 px-4">
            <label className="flex items-center gap-2 text-sm"><input type="checkbox" className="rounded" /> Acme</label>
            <label className="flex items-center gap-2 text-sm"><input type="checkbox" className="rounded" /> Globex</label>
          </div>
        )}
      </div>
    </div>
  );
}

function Collapsible06Preview() {
  const [openFaq1, setOpenFaq1] = useState(true);
  const [openFaq2, setOpenFaq2] = useState(false);

  return (
    <div className="w-full space-y-4">
      <div className="space-y-2">
        <p className="font-medium">How can I track my order?</p>
        <div className="space-y-2">
          {openFaq1 && (
            <p className="text-sm">To track your order, simply log in to your account and navigate to the order history section. You&apos;ll find detailed information about your order status and tracking number there.</p>
          )}
          <button onClick={() => setOpenFaq1(!openFaq1)}>
            <span className="text-muted-foreground text-sm underline">{openFaq1 ? "Hide answer" : "Show answer"}</span>
          </button>
        </div>
      </div>
      <div className="space-y-2">
        <p className="font-medium">Can I cancel my order?</p>
        <div className="space-y-2">
          {openFaq2 && (
            <p className="text-sm">Yes, you can cancel your order within 24 hours of placing it. Go to your order history and click the cancel button next to the relevant order.</p>
          )}
          <button onClick={() => setOpenFaq2(!openFaq2)}>
            <span className="text-muted-foreground text-sm underline">{openFaq2 ? "Hide answer" : "Show answer"}</span>
          </button>
        </div>
      </div>
    </div>
  );
}

function Collapsible07Preview() {
  const [open, setOpen] = useState(false);

  return (
    <div className="bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm w-full max-w-md pb-0">
      <div className="flex items-center justify-between px-6 pb-6">
        <div className="leading-none font-semibold">How do I track my order?</div>
        <Button variant="outline" size="sm" onClick={() => setOpen(!open)}>
          {open ? "Hide" : "Show"}
          <ChevronUp className={`ml-1 h-4 w-4 ${!open ? "rotate-180" : ""}`} />
        </Button>
      </div>
      {open && (
        <div className="border-t px-6 py-4 text-sm text-muted-foreground">
          Log in to your account and go to the order history section. You&apos;ll find tracking information and status updates for all your orders.
        </div>
      )}
    </div>
  );
}

function Collapsible08Preview() {
  const [open, setOpen] = useState(false);

  return (
    <div className="w-full max-w-[300px]">
      <Button variant="outline" onClick={() => setOpen(!open)}>
        Dropdown with collapsible
      </Button>
      {open && (
        <div className="mt-2 w-56 rounded-md border bg-popover p-1 text-popover-foreground shadow-md">
          <div className="px-2 py-1.5 text-sm font-semibold">My Account</div>
          <Separator className="my-1" />
          <button className="w-full rounded-sm px-2 py-1.5 text-sm hover:bg-accent text-left">Profile</button>
          <button className="w-full rounded-sm px-2 py-1.5 text-sm hover:bg-accent text-left">Settings</button>
          <Separator className="my-1" />
          <button className="w-full rounded-sm px-2 py-1.5 text-sm hover:bg-accent text-left flex items-center justify-between" onClick={(e) => e.stopPropagation()}>
            Team
            <ChevronRight className="size-4" />
          </button>
          <button className="w-full rounded-sm px-2 py-1.5 text-sm hover:bg-accent text-left">Logout</button>
        </div>
      )}
    </div>
  );
}

function Collapsible09Preview() {
  const [openAddress, setOpenAddress] = useState(false);
  const [openOptions, setOpenOptions] = useState(false);
  const [openPayment, setOpenPayment] = useState(false);

  return (
    <div className="w-full max-w-md space-y-3 rounded-md border py-4">
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between gap-4 px-4">
          <div className="text-sm font-semibold flex items-center gap-2">
            <MapPin className="size-4 text-muted-foreground" />
            Delivery Address
          </div>
          <Button variant="ghost" size="icon" className="size-8 group" onClick={() => setOpenAddress(!openAddress)}>
            <ChevronDown className={`text-muted-foreground transition-transform ${openAddress ? "rotate-180" : ""}`} />
            <span className="sr-only">Toggle</span>
          </Button>
        </div>
        {openAddress && (
          <div className="flex flex-col gap-3 px-4 pt-3 text-sm text-muted-foreground">
            <p>123 Main Street, Apt 4B</p>
            <p>New York, NY 10001</p>
          </div>
        )}
      </div>
      <Separator />
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between gap-4 px-4">
          <div className="text-sm font-semibold flex items-center gap-2">
            <Truck className="size-4 text-muted-foreground" />
            Delivery Options
          </div>
          <Button variant="ghost" size="icon" className="size-8 group" onClick={() => setOpenOptions(!openOptions)}>
            <ChevronDown className={`text-muted-foreground transition-transform ${openOptions ? "rotate-180" : ""}`} />
            <span className="sr-only">Toggle</span>
          </Button>
        </div>
        {openOptions && (
          <div className="flex flex-col gap-2 px-4 pt-3 text-sm">
            <label className="flex items-center gap-2"><input type="radio" name="delivery" defaultChecked /> Standard (5-7 days)</label>
            <label className="flex items-center gap-2"><input type="radio" name="delivery" /> Express (2-3 days)</label>
          </div>
        )}
      </div>
      <Separator />
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between gap-4 px-4">
          <div className="text-sm font-semibold flex items-center gap-2">
            <CreditCard className="size-4 text-muted-foreground" />
            Payment Method
          </div>
          <Button variant="ghost" size="icon" className="size-8 group" onClick={() => setOpenPayment(!openPayment)}>
            <ChevronDown className={`text-muted-foreground transition-transform ${openPayment ? "rotate-180" : ""}`} />
            <span className="sr-only">Toggle</span>
          </Button>
        </div>
        {openPayment && (
          <div className="flex flex-col gap-2 px-4 pt-3 text-sm text-muted-foreground">
            <p>Visa ending in 4242</p>
          </div>
        )}
      </div>
    </div>
  );
}

function Collapsible10Preview() {
  const [open, setOpen] = useState(false);

  return (
    <Collapsible open={open} onOpenChange={setOpen} className="flex w-full max-w-[350px] flex-col gap-2">
      <div className="flex items-center justify-between gap-4 px-4">
        <div className="text-sm font-semibold">@peduarte starred 3 repositories</div>
        <Button variant="ghost" size="icon" className="size-8" onClick={() => setOpen(!open)}>
          <ChevronsUpDown className="h-4 w-4" />
          <span className="sr-only">Toggle</span>
        </Button>
      </div>
      <div className="rounded-md border px-4 py-2 font-mono text-sm">@radix-ui/primitives</div>
      <CollapsibleContent className="data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down flex flex-col gap-2 overflow-hidden transition-all duration-300">
        <div className="rounded-md border px-4 py-2 font-mono text-sm">@radix-ui/colors</div>
        <div className="rounded-md border px-4 py-2 font-mono text-sm">@stitches/react</div>
      </CollapsibleContent>
    </Collapsible>
  );
}

// --- Code strings ---
const codes: Record<string, string> = {
  "collapsible-01": `import { ChevronsUpDown } from "lucide-react"
import { useState } from "react"

export default function Collapsible01() {
  const [open, setOpen] = useState(false)

  return (
    <Collapsible open={open} onOpenChange={setOpen} className="flex w-full max-w-[350px] flex-col gap-2">
      <div className="flex items-center justify-between gap-4 px-4">
        <div className="text-sm font-semibold">@peduarte starred 3 repositories</div>
        <Button variant="ghost" size="icon" className="size-8" onClick={() => setOpen(!open)}>
          <ChevronsUpDown className="h-4 w-4" />
          <span className="sr-only">Toggle</span>
        </Button>
      </div>
      <div className="rounded-md border px-4 py-2 font-mono text-sm">@radix-ui/primitives</div>
      <CollapsibleContent className="flex flex-col gap-2">
        <div className="rounded-md border px-4 py-2 font-mono text-sm">@radix-ui/colors</div>
        <div className="rounded-md border px-4 py-2 font-mono text-sm">@stitches/react</div>
      </CollapsibleContent>
    </Collapsible>
  )
}`,
  "collapsible-02": `import { ChevronRight, Folder, FolderOpen, File } from "lucide-react"
import { useState } from "react"

export default function Collapsible02() {
  const [openComponents, setOpenComponents] = useState(false)
  const [openLib, setOpenLib] = useState(false)

  return (
    <div className="flex w-full max-w-48 flex-col gap-2">
      <Collapsible open={openComponents} onOpenChange={setOpenComponents} className="flex flex-col gap-1.5">
        <CollapsibleTrigger className="flex items-center gap-2 rounded-md p-1">
          <ChevronRight className={\`size-4 shrink-0 transition-transform \${openComponents ? "rotate-90" : ""}\`} />
          {openComponents ? <FolderOpen className="size-4 shrink-0" /> : <Folder className="size-4 shrink-0" />}
          <span className="text-sm">components</span>
        </CollapsibleTrigger>
        <CollapsibleContent className="flex flex-col gap-1.5" style={{ paddingLeft: "1.5rem" }}>
          <div className="flex items-center gap-2 p-1">
            <File className="size-4 shrink-0 text-muted-foreground" />
            <span className="text-sm">button.tsx</span>
          </div>
          <div className="flex items-center gap-2 p-1">
            <File className="size-4 shrink-0 text-muted-foreground" />
            <span className="text-sm">card.tsx</span>
          </div>
        </CollapsibleContent>
      </Collapsible>
      <Collapsible open={openLib} onOpenChange={setOpenLib} className="flex flex-col gap-1.5">
        <CollapsibleTrigger className="flex items-center gap-2 rounded-md p-1">
          <ChevronRight className={\`size-4 shrink-0 transition-transform \${openLib ? "rotate-90" : ""}\`} />
          {openLib ? <FolderOpen className="size-4 shrink-0" /> : <Folder className="size-4 shrink-0" />}
          <span className="text-sm">lib</span>
        </CollapsibleTrigger>
        <CollapsibleContent className="flex flex-col gap-1.5" style={{ paddingLeft: "1.5rem" }}>
          <div className="flex items-center gap-2 p-1">
            <File className="size-4 shrink-0 text-muted-foreground" />
            <span className="text-sm">utils.ts</span>
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  )
}`,
  "collapsible-03": `import { ChevronUp } from "lucide-react"
import { useState } from "react"

export default function Collapsible03() {
  const [open, setOpen] = useState(false)

  const people = [
    { name: "Howard Lloyd", role: "Product Manager", initials: "HL", progress: "90%" },
    { name: "Olivia Sparks", role: "Software Engineer", initials: "OS", progress: "60%" },
  ]
  const extra = [
    { name: "Hallie Richards", role: "Designer", initials: "HR", progress: "45%" },
    { name: "James Miller", role: "Developer", initials: "JM", progress: "75%" },
  ]

  return (
    <div className="flex w-full max-w-[350px] flex-col items-start gap-4">
      <div className="font-medium">Today's task completion</div>
      <ul className="flex w-full flex-col gap-2">
        {[...people, ...(open ? extra : [])].map((p) => (
          <li key={p.name} className="flex items-start gap-4">
            <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-muted text-xs font-bold">{p.initials}</span>
            <div className="flex flex-1 flex-col">
              <div className="text-sm font-medium">{p.name}</div>
              <p className="text-muted-foreground text-xs">{p.role}</p>
            </div>
            <span className="text-muted-foreground text-sm">{p.progress}</span>
          </li>
        ))}
      </ul>
      <Button variant="outline" size="sm" onClick={() => setOpen(!open)}>
        {open ? "Show less" : "Show more"}
        <ChevronUp className={\`ml-1 h-4 w-4 \${!open ? "rotate-180" : ""}\`} />
      </Button>
    </div>
  )
}`,
  "collapsible-05": `import { ChevronDown } from "lucide-react"
import { useState } from "react"

export default function Collapsible05() {
  const [openPrice, setOpenPrice] = useState(false)
  const [openRating, setOpenRating] = useState(false)

  return (
    <div className="w-full max-w-[350px] space-y-3">
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between gap-4 px-4">
          <div className="text-sm font-semibold">Price Range</div>
          <Button variant="ghost" size="icon" className="size-8" onClick={() => setOpenPrice(!openPrice)}>
            <ChevronDown className={\`text-muted-foreground transition-transform \${openPrice ? "rotate-180" : ""}\`} />
          </Button>
        </div>
        {openPrice && (
          <div className="flex flex-col gap-2 px-4">
            <label className="flex items-center gap-2 text-sm"><input type="checkbox" /> Under $25</label>
            <label className="flex items-center gap-2 text-sm"><input type="checkbox" /> $25 - $50</label>
          </div>
        )}
      </div>
      <Separator />
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between gap-4 px-4">
          <div className="text-sm font-semibold">Customer Ratings</div>
          <Button variant="ghost" size="icon" className="size-8" onClick={() => setOpenRating(!openRating)}>
            <ChevronDown className={\`text-muted-foreground transition-transform \${openRating ? "rotate-180" : ""}\`} />
          </Button>
        </div>
        {openRating && (
          <div className="flex flex-col gap-2 px-4">
            <label className="flex items-center gap-2 text-sm"><input type="checkbox" /> 4 stars & up</label>
            <label className="flex items-center gap-2 text-sm"><input type="checkbox" /> 3 stars & up</label>
          </div>
        )}
      </div>
    </div>
  )
}`,
  "collapsible-06": `import { useState } from "react"

export default function Collapsible06() {
  const [openFaq1, setOpenFaq1] = useState(true)
  const [openFaq2, setOpenFaq2] = useState(false)

  return (
    <div className="w-full space-y-4">
      <div className="space-y-2">
        <p className="font-medium">How can I track my order?</p>
        {openFaq1 && (
          <p className="text-sm">To track your order, log in to your account and navigate to the order history section.</p>
        )}
        <button onClick={() => setOpenFaq1(!openFaq1)}>
          <span className="text-muted-foreground text-sm underline">{openFaq1 ? "Hide answer" : "Show answer"}</span>
        </button>
      </div>
      <div className="space-y-2">
        <p className="font-medium">Can I cancel my order?</p>
        {openFaq2 && (
          <p className="text-sm">Yes, you can cancel within 24 hours of placing it.</p>
        )}
        <button onClick={() => setOpenFaq2(!openFaq2)}>
          <span className="text-muted-foreground text-sm underline">{openFaq2 ? "Hide answer" : "Show answer"}</span>
        </button>
      </div>
    </div>
  )
}`,
  "collapsible-07": `import { ChevronUp } from "lucide-react"
import { useState } from "react"

export default function Collapsible07() {
  const [open, setOpen] = useState(false)

  return (
    <div className="bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm w-full max-w-md pb-0">
      <div className="flex items-center justify-between px-6 pb-6">
        <div className="leading-none font-semibold">How do I track my order?</div>
        <Button variant="outline" size="sm" onClick={() => setOpen(!open)}>
          {open ? "Hide" : "Show"}
          <ChevronUp className={\`ml-1 h-4 w-4 \${!open ? "rotate-180" : ""}\`} />
        </Button>
      </div>
      {open && (
        <div className="border-t px-6 py-4 text-sm text-muted-foreground">
          Log in to your account and go to the order history section.
        </div>
      )}
    </div>
  )
}`,
  "collapsible-09": `import { ChevronDown, MapPin, Truck, CreditCard } from "lucide-react"
import { useState } from "react"

export default function Collapsible09() {
  const [openAddress, setOpenAddress] = useState(false)
  const [openOptions, setOpenOptions] = useState(false)
  const [openPayment, setOpenPayment] = useState(false)

  return (
    <div className="w-full max-w-md space-y-3 rounded-md border py-4">
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between gap-4 px-4">
          <div className="text-sm font-semibold flex items-center gap-2">
            <MapPin className="size-4 text-muted-foreground" /> Delivery Address
          </div>
          <Button variant="ghost" size="icon" className="size-8" onClick={() => setOpenAddress(!openAddress)}>
            <ChevronDown className={\`text-muted-foreground transition-transform \${openAddress ? "rotate-180" : ""}\`} />
          </Button>
        </div>
        {openAddress && (
          <div className="px-4 pt-3 text-sm text-muted-foreground">
            <p>123 Main Street, Apt 4B</p>
            <p>New York, NY 10001</p>
          </div>
        )}
      </div>
      <Separator />
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between gap-4 px-4">
          <div className="text-sm font-semibold flex items-center gap-2">
            <Truck className="size-4 text-muted-foreground" /> Delivery Options
          </div>
          <Button variant="ghost" size="icon" className="size-8" onClick={() => setOpenOptions(!openOptions)}>
            <ChevronDown className={\`text-muted-foreground transition-transform \${openOptions ? "rotate-180" : ""}\`} />
          </Button>
        </div>
        {openOptions && (
          <div className="flex flex-col gap-2 px-4 pt-3 text-sm">
            <label className="flex items-center gap-2"><input type="radio" name="delivery" defaultChecked /> Standard</label>
            <label className="flex items-center gap-2"><input type="radio" name="delivery" /> Express</label>
          </div>
        )}
      </div>
      <Separator />
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between gap-4 px-4">
          <div className="text-sm font-semibold flex items-center gap-2">
            <CreditCard className="size-4 text-muted-foreground" /> Payment Method
          </div>
          <Button variant="ghost" size="icon" className="size-8" onClick={() => setOpenPayment(!openPayment)}>
            <ChevronDown className={\`text-muted-foreground transition-transform \${openPayment ? "rotate-180" : ""}\`} />
          </Button>
        </div>
        {openPayment && (
          <div className="px-4 pt-3 text-sm text-muted-foreground">Visa ending in 4242</div>
        )}
      </div>
    </div>
  )
}`,
};

function getCode(id: string) {
  return codes[id] || codes["collapsible-01"]!.replace("Collapsible01", id.replace("collapsible-", "Collapsible"));
}

// --- Variants ---
const variants = [
  { id: "collapsible-01", title: "Basic Collapsible", preview: <Collapsible01Preview /> },
  { id: "collapsible-02", title: "File Tree", preview: <Collapsible02Preview /> },
  { id: "collapsible-03", title: "Team Members", preview: <Collapsible03Preview /> },
  { id: "collapsible-04", title: "User Profiles", preview: <Collapsible04Preview /> },
  { id: "collapsible-05", title: "Filter Sections", preview: <Collapsible05Preview /> },
  { id: "collapsible-06", title: "FAQ Inline", preview: <Collapsible06Preview /> },
  { id: "collapsible-07", title: "FAQ Card", preview: <Collapsible07Preview /> },
  { id: "collapsible-08", title: "Dropdown with Collapsible", preview: <Collapsible08Preview /> },
  { id: "collapsible-09", title: "Checkout Sections", preview: <Collapsible09Preview /> },
  { id: "collapsible-10", title: "Animated Collapsible", preview: <Collapsible10Preview /> },
];

export default function CollapsiblePage() {
  return (
    <ComponentLayout>
      {/* Page Header */}
      <div className="mb-4 flex gap-x-8 gap-y-4 max-md:flex-col">
        <div className="space-y-3">
          <h1 className="text-2xl font-bold sm:text-3xl">Shadcn Collapsible</h1>
          <p className="text-muted-foreground">
            Explore the collection of awesome Shadcn Collapsible Components, featuring {variants.length} collapsible
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
          <p className="font-medium">Have any suggestions for Collapsible variants?</p>
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
