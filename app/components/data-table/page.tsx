"use client";

import { Checkbox, Table, TableBody, TableCell, TableHead, TableHeader, TableRow, Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@ipareddes/ui-components";

import { ComponentLayout } from "@/components/layout/component-layout";
import { useState } from "react";
import { X, Sparkles, Code2, Copy, Check, ChevronDown, ChevronUp, Search, Columns3, GripVertical, Ellipsis, Download } from "lucide-react";
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

// --- Sample Data ---
const sampleRows = [
  { name: "Olivia Martin", status: "Active", email: "olivia@example.com", amount: "$1,999.00" },
  { name: "Jackson Lee", status: "Active", email: "jackson@example.com", amount: "$39.00" },
  { name: "Isabella Nguyen", status: "Inactive", email: "isabella@example.com", amount: "$299.00" },
  { name: "William Kim", status: "Active", email: "will@example.com", amount: "$99.00" },
  { name: "Sofia Davis", status: "Inactive", email: "sofia@example.com", amount: "$450.00" },
];

const productRows = [
  { name: "Wireless Mouse", price: "$29.99", availability: "In Stock" },
  { name: "Mechanical Keyboard", price: "$89.99", availability: "In Stock" },
  { name: "USB-C Hub", price: "$49.99", availability: "Out of Stock" },
  { name: "Monitor Stand", price: "$34.99", availability: "In Stock" },
  { name: "Webcam HD", price: "$59.99", availability: "Low Stock" },
];

const teamRows = [
  { team: "Alpha Squad", department: "Engineering", location: "San Francisco", milestone: "Q2 Launch", budget: "$120,000" },
  { team: "Beta Force", department: "Design", location: "New York", milestone: "Rebrand", budget: "$85,000" },
  { team: "Gamma Unit", department: "Marketing", location: "London", milestone: "Campaign", budget: "$60,000" },
  { team: "Delta Ops", department: "Sales", location: "Tokyo", milestone: "Q3 Target", budget: "$95,000" },
];

const personRows = [
  { first: "Alice", last: "Johnson", email: "alice@example.com", status: "Active", progress: 75 },
  { first: "Bob", last: "Smith", email: "bob@example.com", status: "Inactive", progress: 40 },
  { first: "Charlie", last: "Brown", email: "charlie@example.com", status: "Active", progress: 90 },
  { first: "Diana", last: "Prince", email: "diana@example.com", status: "Active", progress: 60 },
];

// --- Data Table Variant Previews ---

function DataTable01() {
  return (
    <div className="w-full">
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[40px]"><Checkbox aria-label="Select all" /></TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Email</TableHead>
              <TableHead><div className="text-right">Amount</div></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sampleRows.map((row) => (
              <TableRow key={row.email}>
                <TableCell><Checkbox aria-label="Select row" /></TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.status}</TableCell>
                <TableCell>{row.email}</TableCell>
                <TableCell className="text-right">{row.amount}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

function DataTable02() {
  return (
    <div className="w-full">
      <div className="py-4">
        <button className="flex items-center justify-between gap-2 rounded-md border bg-transparent px-3 py-2 text-sm shadow-xs w-full max-w-[200px]">
          <span>Density</span>
          <ChevronDown className="size-4 opacity-50" />
        </button>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[40px]"><Checkbox aria-label="Select all" /></TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Email</TableHead>
              <TableHead><div className="text-right">Amount</div></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sampleRows.map((row) => (
              <TableRow key={row.email}>
                <TableCell><Checkbox aria-label="Select row" /></TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.status}</TableCell>
                <TableCell>{row.email}</TableCell>
                <TableCell className="text-right">{row.amount}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

function DataTable03() {
  return (
    <div className="w-full">
      <div className="py-4">
        <button className="flex items-center justify-between gap-2 rounded-md border bg-background px-4 py-2 text-sm font-medium shadow-xs w-full max-w-[200px] hover:bg-accent hover:text-accent-foreground">
          <span className="flex items-center gap-2">
            <Columns3 className="size-4" />
            Columns
          </span>
          <ChevronDown className="size-4 ml-3" />
        </button>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[40px]"><Checkbox aria-label="Select all" /></TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Email</TableHead>
              <TableHead><div className="text-right">Amount</div></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sampleRows.map((row) => (
              <TableRow key={row.email}>
                <TableCell><Checkbox aria-label="Select row" /></TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.status}</TableCell>
                <TableCell>{row.email}</TableCell>
                <TableCell className="text-right">{row.amount}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

function DataTable04() {
  return (
    <div className="w-full">
      <div className="rounded-md border">
        <div className="flex flex-wrap gap-3 px-2 py-6">
          <div className="w-44">
            <label className="text-sm font-medium">Product</label>
            <div className="relative mt-2">
              <input type="text" className="h-9 w-full rounded-md border bg-transparent px-3 py-1 text-sm shadow-xs pl-9" placeholder="Search product" />
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-muted-foreground/80">
                <Search className="size-4" />
              </div>
            </div>
          </div>
          <div className="w-36">
            <label className="text-sm font-medium">Price</label>
            <div className="flex mt-2">
              <input type="number" className="h-9 w-full rounded-l-md border bg-transparent px-3 py-1 text-sm shadow-xs" placeholder="Min" />
              <input type="number" className="h-9 w-full rounded-r-md border border-l-0 bg-transparent px-3 py-1 text-sm shadow-xs" placeholder="Max" />
            </div>
          </div>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Product</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Availability</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {productRows.map((row) => (
              <TableRow key={row.name}>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.price}</TableCell>
                <TableCell>{row.availability}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

function DataTable05() {
  return (
    <div className="w-full">
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[40px]"><Checkbox aria-label="Select all" /></TableHead>
              <TableHead>
                <div className="flex h-full cursor-pointer items-center justify-between gap-2 select-none" tabIndex={0}>
                  <span className="truncate">Name</span>
                </div>
              </TableHead>
              <TableHead>
                <div className="flex h-full cursor-pointer items-center justify-between gap-2 select-none" tabIndex={0}>
                  <span className="truncate">Status</span>
                </div>
              </TableHead>
              <TableHead>
                <div className="flex h-full cursor-pointer items-center justify-between gap-2 select-none" tabIndex={0}>
                  <span className="truncate">Email</span>
                </div>
              </TableHead>
              <TableHead>
                <div className="flex h-full cursor-pointer items-center justify-between gap-2 select-none" tabIndex={0}>
                  <span className="truncate">Amount</span>
                </div>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sampleRows.map((row) => (
              <TableRow key={row.email}>
                <TableCell><Checkbox aria-label="Select row" /></TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.status}</TableCell>
                <TableCell>{row.email}</TableCell>
                <TableCell>{row.amount}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

function DataTable06() {
  return (
    <div className="max-w-3xl max-md:max-w-full">
      <div className="rounded-md border">
        <Table className="table-fixed" style={{ width: "750px" }}>
          <TableHeader>
            <TableRow>
              <TableHead className="group/head relative h-10 select-none" style={{ width: "150px" }}>
                <div className="truncate">Name</div>
                <div className="group-last/head:hidden absolute top-0 h-full w-4 cursor-col-resize -right-2 z-10 flex justify-center before:absolute before:w-px before:inset-y-0 before:bg-border before:translate-x-px" />
              </TableHead>
              <TableHead className="group/head relative h-10 select-none" style={{ width: "150px" }}>
                <div className="truncate">Status</div>
                <div className="group-last/head:hidden absolute top-0 h-full w-4 cursor-col-resize -right-2 z-10 flex justify-center before:absolute before:w-px before:inset-y-0 before:bg-border before:translate-x-px" />
              </TableHead>
              <TableHead className="group/head relative h-10 select-none" style={{ width: "150px" }}>
                <div className="truncate">Email</div>
                <div className="group-last/head:hidden absolute top-0 h-full w-4 cursor-col-resize -right-2 z-10 flex justify-center before:absolute before:w-px before:inset-y-0 before:bg-border before:translate-x-px" />
              </TableHead>
              <TableHead className="group/head relative h-10 select-none" style={{ width: "150px" }}>
                <div className="truncate">Amount</div>
                <div className="group-last/head:hidden absolute top-0 h-full w-4 cursor-col-resize -right-2 z-10 flex justify-center before:absolute before:w-px before:inset-y-0 before:bg-border before:translate-x-px" />
              </TableHead>
              <TableHead className="group/head relative h-10 select-none" style={{ width: "150px" }}>
                <div className="truncate">Actions</div>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sampleRows.map((row) => (
              <TableRow key={row.email}>
                <TableCell className="truncate">{row.name}</TableCell>
                <TableCell className="truncate">{row.status}</TableCell>
                <TableCell className="truncate">{row.email}</TableCell>
                <TableCell className="truncate">{row.amount}</TableCell>
                <TableCell className="truncate">-</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

function DataTable07() {
  return (
    <div className="w-full">
      <div className="rounded-md border">
        <Table className="[&_td]:border-border [&_th]:border-border border-separate border-spacing-0 [&_tfoot_td]:border-t [&_th]:border-b [&_tr]:border-none [&_tr:not(:last-child)_td]:border-b">
          <TableHeader>
            <TableRow>
              <TableHead>
                <div className="flex items-center justify-between gap-2">
                  <span className="truncate">Product Name</span>
                  <button className="hover:bg-accent hover:text-accent-foreground -mr-1 size-7 inline-flex items-center justify-center rounded-md">
                    <Ellipsis className="opacity-60" />
                  </button>
                </div>
              </TableHead>
              <TableHead>
                <div className="flex items-center justify-between gap-2">
                  <span className="truncate">Price</span>
                  <button className="hover:bg-accent hover:text-accent-foreground -mr-1 size-7 inline-flex items-center justify-center rounded-md">
                    <Ellipsis className="opacity-60" />
                  </button>
                </div>
              </TableHead>
              <TableHead>
                <div className="flex items-center justify-between gap-2">
                  <span className="truncate">Availability</span>
                  <button className="hover:bg-accent hover:text-accent-foreground -mr-1 size-7 inline-flex items-center justify-center rounded-md">
                    <Ellipsis className="opacity-60" />
                  </button>
                </div>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {productRows.map((row) => (
              <TableRow key={row.name}>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.price}</TableCell>
                <TableCell>{row.availability}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

function DataTable08() {
  return (
    <div className="w-full">
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
              <TableHead style={{ width: "150px" }}>
                <div className="flex items-center justify-start gap-0.5">
                  <button className="hover:bg-accent hover:text-accent-foreground -ml-2 size-7 inline-flex items-center justify-center rounded-md">
                    <GripVertical className="opacity-60" />
                  </button>
                  <span className="grow truncate">First Name</span>
                  <button className="hover:bg-accent hover:text-accent-foreground -mr-1 size-7 inline-flex items-center justify-center rounded-md group">
                    <ChevronUp className="shrink-0 opacity-0 group-hover:opacity-60" size={16} />
                  </button>
                </div>
              </TableHead>
              <TableHead style={{ width: "150px" }}>
                <div className="flex items-center justify-start gap-0.5">
                  <button className="hover:bg-accent hover:text-accent-foreground -ml-2 size-7 inline-flex items-center justify-center rounded-md">
                    <GripVertical className="opacity-60" />
                  </button>
                  <span className="grow truncate">Last Name</span>
                  <button className="hover:bg-accent hover:text-accent-foreground -mr-1 size-7 inline-flex items-center justify-center rounded-md group">
                    <ChevronUp className="shrink-0 opacity-0 group-hover:opacity-60" size={16} />
                  </button>
                </div>
              </TableHead>
              <TableHead style={{ width: "150px" }}>
                <div className="flex items-center justify-start gap-0.5">
                  <button className="hover:bg-accent hover:text-accent-foreground -ml-2 size-7 inline-flex items-center justify-center rounded-md">
                    <GripVertical className="opacity-60" />
                  </button>
                  <span className="grow truncate">Email</span>
                  <button className="hover:bg-accent hover:text-accent-foreground -mr-1 size-7 inline-flex items-center justify-center rounded-md group">
                    <ChevronUp className="shrink-0 opacity-0 group-hover:opacity-60" size={16} />
                  </button>
                </div>
              </TableHead>
              <TableHead style={{ width: "150px" }}>
                <div className="flex items-center justify-start gap-0.5">
                  <button className="hover:bg-accent hover:text-accent-foreground -ml-2 size-7 inline-flex items-center justify-center rounded-md">
                    <GripVertical className="opacity-60" />
                  </button>
                  <span className="grow truncate">Status</span>
                  <button className="hover:bg-accent hover:text-accent-foreground -mr-1 size-7 inline-flex items-center justify-center rounded-md group">
                    <ChevronUp className="shrink-0 opacity-0 group-hover:opacity-60" size={16} />
                  </button>
                </div>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {personRows.map((row) => (
              <TableRow key={row.email}>
                <TableCell>{row.first}</TableCell>
                <TableCell>{row.last}</TableCell>
                <TableCell>{row.email}</TableCell>
                <TableCell>{row.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

function DataTable09() {
  return (
    <div className="w-full">
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead className="w-[40px]"></TableHead>
              <TableHead><Checkbox aria-label="Select all" /></TableHead>
              <TableHead>Team Name</TableHead>
              <TableHead>Department</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Next Milestone</TableHead>
              <TableHead><div>Budget</div></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {teamRows.map((row) => (
              <TableRow key={row.team}>
                <TableCell>
                  <button className="hover:bg-accent hover:text-accent-foreground size-7 inline-flex items-center justify-center rounded-md">
                    <ChevronDown className="size-4" />
                  </button>
                </TableCell>
                <TableCell><Checkbox aria-label="Select row" /></TableCell>
                <TableCell>{row.team}</TableCell>
                <TableCell>{row.department}</TableCell>
                <TableCell>{row.location}</TableCell>
                <TableCell>{row.milestone}</TableCell>
                <TableCell>{row.budget}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

function DataTable10() {
  return (
    <div className="space-y-4 md:w-full">
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead className="h-11" style={{ width: "28px" }}><Checkbox aria-label="Select all" /></TableHead>
              <TableHead className="h-11" style={{ width: "150px" }}>
                <div className="flex h-full cursor-pointer items-center justify-between gap-2 select-none" tabIndex={0}>
                  Product Name
                  <ChevronUp className="shrink-0 opacity-60" size={16} />
                </div>
              </TableHead>
              <TableHead className="h-11" style={{ width: "150px" }}>
                <div className="flex h-full cursor-pointer items-center justify-between gap-2 select-none" tabIndex={0}>Price</div>
              </TableHead>
              <TableHead className="h-11" style={{ width: "150px" }}>
                <div className="flex h-full cursor-pointer items-center justify-between gap-2 select-none" tabIndex={0}>Availability</div>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {productRows.map((row) => (
              <TableRow key={row.name}>
                <TableCell><Checkbox aria-label="Select row" /></TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.price}</TableCell>
                <TableCell>{row.availability}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

function DataTable11() {
  return (
    <div className="w-full space-y-4">
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead className="h-11" style={{ width: "28px" }}><Checkbox aria-label="Select all" /></TableHead>
              <TableHead className="h-11" style={{ width: "150px" }}>
                <div className="flex h-full cursor-pointer items-center justify-between gap-2 select-none" tabIndex={0}>
                  Product Name
                  <ChevronUp className="shrink-0 opacity-60" size={16} />
                </div>
              </TableHead>
              <TableHead className="h-11" style={{ width: "150px" }}>
                <div className="flex h-full cursor-pointer items-center justify-between gap-2 select-none" tabIndex={0}>Price</div>
              </TableHead>
              <TableHead className="h-11" style={{ width: "150px" }}>
                <div className="flex h-full cursor-pointer items-center justify-between gap-2 select-none" tabIndex={0}>Availability</div>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {productRows.map((row) => (
              <TableRow key={row.name}>
                <TableCell><Checkbox aria-label="Select row" /></TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.price}</TableCell>
                <TableCell>{row.availability}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

function DataTable12() {
  return (
    <div className="w-full">
      <div className="flex justify-between gap-2 pb-4 max-sm:flex-col sm:items-center">
        <div className="flex items-center space-x-2">
          <input className="h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-sm shadow-xs max-w-sm" placeholder="Search all columns..." />
        </div>
        <div className="flex items-center space-x-2">
          <button className="inline-flex shrink-0 items-center justify-center text-sm font-medium rounded-md border bg-background px-3 h-8 gap-1.5 shadow-xs hover:bg-accent hover:text-accent-foreground">
            <Download className="mr-2 size-4" />
            Export
          </button>
        </div>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[40px]"><Checkbox aria-label="Select all" /></TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Email</TableHead>
              <TableHead><div className="text-right">Amount</div></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sampleRows.map((row) => (
              <TableRow key={row.email}>
                <TableCell><Checkbox aria-label="Select row" /></TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.status}</TableCell>
                <TableCell>{row.email}</TableCell>
                <TableCell className="text-right">{row.amount}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

function DataTable13() {
  return (
    <div className="w-full space-y-4">
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead><Checkbox aria-label="Select all" /></TableHead>
              <TableHead>First Name</TableHead>
              <TableHead>Last Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Progress</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {personRows.map((row) => (
              <TableRow key={row.email}>
                <TableCell><Checkbox aria-label="Select row" /></TableCell>
                <TableCell>{row.first}</TableCell>
                <TableCell>{row.last}</TableCell>
                <TableCell>{row.email}</TableCell>
                <TableCell>{row.status}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-16 rounded-full bg-muted overflow-hidden">
                      <div className="h-full rounded-full bg-primary" style={{ width: `${row.progress}%` }} />
                    </div>
                    <span className="text-xs text-muted-foreground">{row.progress}%</span>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

// --- Code strings ---
const codes: Record<string, string> = {
  "data-table-01": `
const data = [
  { name: "Olivia Martin", status: "Active", email: "olivia@example.com", amount: "$1,999.00" },
  { name: "Jackson Lee", status: "Active", email: "jackson@example.com", amount: "$39.00" },
  { name: "Isabella Nguyen", status: "Inactive", email: "isabella@example.com", amount: "$299.00" },
]

export default function DataTable01() {
  return (
    <div className="w-full">
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[40px]"><Checkbox aria-label="Select all" /></TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Email</TableHead>
              <TableHead><div className="text-right">Amount</div></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((row) => (
              <TableRow key={row.email}>
                <TableCell><Checkbox aria-label="Select row" /></TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.status}</TableCell>
                <TableCell>{row.email}</TableCell>
                <TableCell className="text-right">{row.amount}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}`,
  "data-table-05": `
const data = [
  { name: "Olivia Martin", status: "Active", email: "olivia@example.com", amount: "$1,999.00" },
  { name: "Jackson Lee", status: "Active", email: "jackson@example.com", amount: "$39.00" },
  { name: "Isabella Nguyen", status: "Inactive", email: "isabella@example.com", amount: "$299.00" },
]

export default function DataTable05() {
  return (
    <div className="w-full">
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[40px]"><Checkbox aria-label="Select all" /></TableHead>
              <TableHead>
                <div className="flex h-full cursor-pointer items-center justify-between gap-2 select-none">
                  <span className="truncate">Name</span>
                </div>
              </TableHead>
              <TableHead>
                <div className="flex h-full cursor-pointer items-center justify-between gap-2 select-none">
                  <span className="truncate">Status</span>
                </div>
              </TableHead>
              <TableHead>
                <div className="flex h-full cursor-pointer items-center justify-between gap-2 select-none">
                  <span className="truncate">Email</span>
                </div>
              </TableHead>
              <TableHead>
                <div className="flex h-full cursor-pointer items-center justify-between gap-2 select-none">
                  <span className="truncate">Amount</span>
                </div>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((row) => (
              <TableRow key={row.email}>
                <TableCell><Checkbox aria-label="Select row" /></TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.status}</TableCell>
                <TableCell>{row.email}</TableCell>
                <TableCell>{row.amount}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}`,
  "data-table-09": `import { ChevronDown } from "lucide-react"

const data = [
  { team: "Alpha Squad", department: "Engineering", location: "San Francisco", milestone: "Q2 Launch", budget: "$120,000" },
  { team: "Beta Force", department: "Design", location: "New York", milestone: "Rebrand", budget: "$85,000" },
]

export default function DataTable09() {
  return (
    <div className="w-full">
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead className="w-[40px]"></TableHead>
              <TableHead><Checkbox aria-label="Select all" /></TableHead>
              <TableHead>Team Name</TableHead>
              <TableHead>Department</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Next Milestone</TableHead>
              <TableHead><div>Budget</div></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((row) => (
              <TableRow key={row.team}>
                <TableCell>
                  <button className="hover:bg-accent size-7 inline-flex items-center justify-center rounded-md">
                    <ChevronDown className="size-4" />
                  </button>
                </TableCell>
                <TableCell><Checkbox aria-label="Select row" /></TableCell>
                <TableCell>{row.team}</TableCell>
                <TableCell>{row.department}</TableCell>
                <TableCell>{row.location}</TableCell>
                <TableCell>{row.milestone}</TableCell>
                <TableCell>{row.budget}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}`,
  "data-table-13": `
const data = [
  { first: "Alice", last: "Johnson", email: "alice@example.com", status: "Active", progress: 75 },
  { first: "Bob", last: "Smith", email: "bob@example.com", status: "Inactive", progress: 40 },
]

export default function DataTable13() {
  return (
    <div className="w-full space-y-4">
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead><Checkbox aria-label="Select all" /></TableHead>
              <TableHead>First Name</TableHead>
              <TableHead>Last Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Progress</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((row) => (
              <TableRow key={row.email}>
                <TableCell><Checkbox aria-label="Select row" /></TableCell>
                <TableCell>{row.first}</TableCell>
                <TableCell>{row.last}</TableCell>
                <TableCell>{row.email}</TableCell>
                <TableCell>{row.status}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-16 rounded-full bg-muted overflow-hidden">
                      <div className="h-full rounded-full bg-primary" style={{ width: \`\${row.progress}%\` }} />
                    </div>
                    <span className="text-xs text-muted-foreground">{row.progress}%</span>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}`,
};

function getCode(id: string) {
  return codes[id] || codes["data-table-01"]!.replace("DataTable01", id.replace("data-table-", "DataTable"));
}

// --- Variants ---
const variants = [
  { id: "data-table-01", title: "Data Table 1", preview: <DataTable01 /> },
  { id: "data-table-02", title: "Data Table 2", preview: <DataTable02 /> },
  { id: "data-table-03", title: "Data Table 3", preview: <DataTable03 /> },
  { id: "data-table-04", title: "Data Table 4", preview: <DataTable04 /> },
  { id: "data-table-05", title: "Data Table 5", preview: <DataTable05 /> },
  { id: "data-table-06", title: "Data Table 6", preview: <DataTable06 /> },
  { id: "data-table-07", title: "Data Table 7", preview: <DataTable07 /> },
  { id: "data-table-08", title: "Data Table 8", preview: <DataTable08 /> },
  { id: "data-table-09", title: "Data Table 9", preview: <DataTable09 /> },
  { id: "data-table-10", title: "Data Table 10", preview: <DataTable10 /> },
  { id: "data-table-11", title: "Data Table 11", preview: <DataTable11 /> },
  { id: "data-table-12", title: "Data Table 12", preview: <DataTable12 /> },
  { id: "data-table-13", title: "Data Table 13", preview: <DataTable13 /> },
];

export default function DataTablePage() {
  return (
    <ComponentLayout>
      {/* Page Header */}
      <div className="mb-4 flex gap-x-8 gap-y-4 max-md:flex-col">
        <div className="space-y-3">
          <h1 className="text-2xl font-bold sm:text-3xl">Shadcn Data Table</h1>
          <p className="text-muted-foreground">
            Explore the collection of awesome Shadcn Data Table Components, featuring {variants.length} data table
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
          <p className="font-medium">Have any suggestions for Data Table variants?</p>
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
