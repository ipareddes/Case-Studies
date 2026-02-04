"use client";

import { ComponentLayout } from "@/components/layout/component-layout";
import { useState } from "react";
import { X, Sparkles, Code2, Copy, Check, ChevronsUpDown, ChevronDown, Plus, Globe, Building2, Briefcase, HeartPulse, GraduationCap, Landmark, Clock, User } from "lucide-react";
import ReactDOM from "react-dom";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator } from "@/components/ui/command";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/cn";

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

// --- Data ---
const frameworks = [
  { value: "next.js", label: "Next.js" },
  { value: "sveltekit", label: "SvelteKit" },
  { value: "nuxt.js", label: "Nuxt.js" },
  { value: "remix", label: "Remix" },
  { value: "astro", label: "Astro" },
  { value: "gatsby", label: "Gatsby" },
];

const groupedItems = [
  {
    group: "Frontend",
    items: [
      { value: "react", label: "React" },
      { value: "vue", label: "Vue" },
      { value: "angular", label: "Angular" },
    ],
  },
  {
    group: "Backend",
    items: [
      { value: "node", label: "Node.js" },
      { value: "django", label: "Django" },
      { value: "rails", label: "Rails" },
    ],
  },
];

const industries = [
  { value: "technology", label: "Technology", icon: Globe },
  { value: "healthcare", label: "Healthcare", icon: HeartPulse },
  { value: "finance", label: "Finance", icon: Landmark },
  { value: "education", label: "Education", icon: GraduationCap },
  { value: "real-estate", label: "Real Estate", icon: Building2 },
  { value: "consulting", label: "Consulting", icon: Briefcase },
];

const universities = [
  { value: "harvard", label: "Harvard University" },
  { value: "mit", label: "MIT" },
  { value: "stanford", label: "Stanford University" },
  { value: "yale", label: "Yale University" },
  { value: "princeton", label: "Princeton University" },
];

const timezones = [
  { value: "gmt-8", label: "(GMT-8:00) Pacific/US" },
  { value: "gmt-5", label: "(GMT-5:00) Eastern/US" },
  { value: "gmt+0", label: "(GMT+0:00) London" },
  { value: "gmt+1", label: "(GMT+1:00) Paris" },
  { value: "gmt+5.5", label: "(GMT+5:30) India/Kolkata" },
  { value: "gmt+6.5", label: "(GMT+6:30) Indian/Cocos" },
  { value: "gmt+8", label: "(GMT+8:00) Asia/Shanghai" },
  { value: "gmt+9", label: "(GMT+9:00) Asia/Tokyo" },
];

const users = [
  { value: "alice", label: "Alice Johnson", email: "alice@example.com" },
  { value: "bob", label: "Bob Smith", email: "bob@example.com" },
  { value: "charlie", label: "Charlie Brown", email: "charlie@example.com" },
  { value: "diana", label: "Diana Prince", email: "diana@example.com" },
];

const countries = [
  { value: "us", label: "United States", flag: "\uD83C\uDDFA\uD83C\uDDF8" },
  { value: "gb", label: "United Kingdom", flag: "\uD83C\uDDEC\uD83C\uDDE7" },
  { value: "fr", label: "France", flag: "\uD83C\uDDEB\uD83C\uDDF7" },
  { value: "de", label: "Germany", flag: "\uD83C\uDDE9\uD83C\uDDEA" },
  { value: "jp", label: "Japan", flag: "\uD83C\uDDEF\uD83C\uDDF5" },
  { value: "in", label: "India", flag: "\uD83C\uDDEE\uD83C\uDDF3" },
  { value: "br", label: "Brazil", flag: "\uD83C\uDDE7\uD83C\uDDF7" },
];

// --- Combobox Variant Previews ---

function Combobox01() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          aria-label="Framework combobox"
          className="w-full max-w-xs justify-between"
        >
          {value ? frameworks.find((f) => f.value === value)?.label : "Select framework..."}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0">
        <Command>
          <CommandInput placeholder="Search framework..." />
          <CommandList>
            <CommandEmpty>No framework found.</CommandEmpty>
            <CommandGroup>
              {frameworks.map((f) => (
                <CommandItem
                  key={f.value}
                  value={f.value}
                  onSelect={(v) => { setValue(v === value ? "" : v); setOpen(false); }}
                >
                  {f.label}
                  <Check className={cn("ml-auto h-4 w-4", value === f.value ? "opacity-100" : "opacity-0")} />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

function Combobox02() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");

  return (
    <div className="w-full max-w-xs space-y-2">
      <Label>Combobox option group</Label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between px-3 font-normal"
          >
            <span className={cn(!value && "text-muted-foreground")}>
              {value ? groupedItems.flatMap((g) => g.items).find((i) => i.value === value)?.label : "Select item"}
            </span>
            <ChevronsUpDown className="text-muted-foreground/80 shrink-0" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0">
          <Command>
            <CommandInput placeholder="Search..." />
            <CommandList>
              <CommandEmpty>No item found.</CommandEmpty>
              {groupedItems.map((g) => (
                <CommandGroup key={g.group} heading={g.group}>
                  {g.items.map((item) => (
                    <CommandItem
                      key={item.value}
                      value={item.value}
                      onSelect={(v) => { setValue(v === value ? "" : v); setOpen(false); }}
                    >
                      {item.label}
                      <Check className={cn("ml-auto h-4 w-4", value === item.value ? "opacity-100" : "opacity-0")} />
                    </CommandItem>
                  ))}
                </CommandGroup>
              ))}
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}

function Combobox03() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");

  const items = [
    { value: "react", label: "React", disabled: false },
    { value: "vue", label: "Vue", disabled: true },
    { value: "angular", label: "Angular", disabled: false },
    { value: "svelte", label: "Svelte", disabled: true },
    { value: "solid", label: "Solid", disabled: false },
  ];

  return (
    <div className="w-full max-w-xs space-y-2">
      <Label>Combobox disabled option</Label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between px-3 font-normal"
          >
            <span className={cn(!value && "text-muted-foreground")}>
              {value ? items.find((i) => i.value === value)?.label : "Select item"}
            </span>
            <ChevronsUpDown className="text-muted-foreground/80 shrink-0" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0">
          <Command>
            <CommandInput placeholder="Search..." />
            <CommandList>
              <CommandEmpty>No item found.</CommandEmpty>
              <CommandGroup>
                {items.map((item) => (
                  <CommandItem
                    key={item.value}
                    value={item.value}
                    disabled={item.disabled}
                    onSelect={(v) => { setValue(v === value ? "" : v); setOpen(false); }}
                  >
                    {item.label}
                    {item.disabled && <span className="ml-auto text-xs text-muted-foreground">Disabled</span>}
                    {!item.disabled && <Check className={cn("ml-auto h-4 w-4", value === item.value ? "opacity-100" : "opacity-0")} />}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}

function Combobox04() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");

  return (
    <div className="w-full max-w-xs space-y-2">
      <Label>Combobox option with icon</Label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between px-3 font-normal"
          >
            <span className={cn(!value && "text-muted-foreground")}>
              {value ? (
                <span className="flex items-center gap-2">
                  {(() => { const ind = industries.find((i) => i.value === value); if (ind) { const Icon = ind.icon; return <Icon className="h-4 w-4" />; } return null; })()}
                  {industries.find((i) => i.value === value)?.label}
                </span>
              ) : "Select industry category"}
            </span>
            <ChevronsUpDown className="text-muted-foreground/80 shrink-0" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0">
          <Command>
            <CommandInput placeholder="Search industry..." />
            <CommandList>
              <CommandEmpty>No industry found.</CommandEmpty>
              <CommandGroup>
                {industries.map((ind) => {
                  const Icon = ind.icon;
                  return (
                    <CommandItem
                      key={ind.value}
                      value={ind.value}
                      onSelect={(v) => { setValue(v === value ? "" : v); setOpen(false); }}
                    >
                      <Icon className="mr-2 h-4 w-4" />
                      {ind.label}
                      <Check className={cn("ml-auto h-4 w-4", value === ind.value ? "opacity-100" : "opacity-0")} />
                    </CommandItem>
                  );
                })}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}

function Combobox05() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");

  return (
    <div className="w-full max-w-xs space-y-2">
      <Label>Combobox with custom check icon</Label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full max-w-xs justify-between"
          >
            <span className={cn(!value && "text-muted-foreground")}>
              {value ? industries.find((i) => i.value === value)?.label : "Select industry category"}
            </span>
            <ChevronsUpDown className="opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0">
          <Command>
            <CommandInput placeholder="Search industry..." />
            <CommandList>
              <CommandEmpty>No industry found.</CommandEmpty>
              <CommandGroup>
                {industries.map((ind) => {
                  const Icon = ind.icon;
                  return (
                    <CommandItem
                      key={ind.value}
                      value={ind.value}
                      onSelect={(v) => { setValue(v === value ? "" : v); setOpen(false); }}
                    >
                      <Icon className="mr-2 h-4 w-4" />
                      {ind.label}
                      <div className={cn("ml-auto h-4 w-4 rounded-full border", value === ind.value ? "bg-primary border-primary" : "border-muted-foreground/30")}>
                        {value === ind.value && <Check className="h-4 w-4 text-primary-foreground" />}
                      </div>
                    </CommandItem>
                  );
                })}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}

function Combobox06() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("harvard");

  return (
    <div className="w-full max-w-xs space-y-2">
      <Label>Combobox with search and add button</Label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between px-3 font-normal"
          >
            <span className="truncate">
              {value ? universities.find((u) => u.value === value)?.label : "Select university"}
            </span>
            <ChevronsUpDown className="text-muted-foreground/80 shrink-0" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0">
          <Command>
            <CommandInput placeholder="Search university..." />
            <CommandList>
              <CommandEmpty>No university found.</CommandEmpty>
              <CommandGroup>
                {universities.map((u) => (
                  <CommandItem
                    key={u.value}
                    value={u.value}
                    onSelect={(v) => { setValue(v === value ? "" : v); setOpen(false); }}
                  >
                    {u.label}
                    <Check className={cn("ml-auto h-4 w-4", value === u.value ? "opacity-100" : "opacity-0")} />
                  </CommandItem>
                ))}
              </CommandGroup>
              <CommandSeparator />
              <CommandGroup>
                <CommandItem className="justify-center text-sm" onSelect={() => setOpen(false)}>
                  <Plus className="mr-2 h-4 w-4" />
                  Add new university
                </CommandItem>
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}

function Combobox07() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("gmt+6.5");

  return (
    <div className="w-full max-w-xs space-y-2">
      <Label>Timezone combobox</Label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between"
          >
            <span className="truncate">
              {value ? timezones.find((t) => t.value === value)?.label : "Select timezone"}
            </span>
            <ChevronsUpDown className="text-muted-foreground/80 shrink-0" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0">
          <Command>
            <CommandInput placeholder="Search timezone..." />
            <CommandList>
              <CommandEmpty>No timezone found.</CommandEmpty>
              <CommandGroup>
                {timezones.map((tz) => (
                  <CommandItem
                    key={tz.value}
                    value={tz.value}
                    onSelect={(v) => { setValue(v === value ? "" : v); setOpen(false); }}
                  >
                    <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                    {tz.label}
                    <Check className={cn("ml-auto h-4 w-4", value === tz.value ? "opacity-100" : "opacity-0")} />
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}

function Combobox08() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");

  return (
    <div className="w-full max-w-xs space-y-2">
      <Label>User combobox</Label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between"
          >
            <span className={cn(!value && "text-muted-foreground")}>
              {value ? users.find((u) => u.value === value)?.label : "Select user"}
            </span>
            <ChevronsUpDown className="text-muted-foreground/80 shrink-0" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0">
          <Command>
            <CommandInput placeholder="Search user..." />
            <CommandList>
              <CommandEmpty>No user found.</CommandEmpty>
              <CommandGroup>
                {users.map((u) => (
                  <CommandItem
                    key={u.value}
                    value={u.value}
                    onSelect={(v) => { setValue(v === value ? "" : v); setOpen(false); }}
                  >
                    <div className="flex items-center gap-2">
                      <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-muted text-xs font-bold">
                        {u.label.split(" ").map((n) => n[0]).join("")}
                      </span>
                      <div className="flex flex-col">
                        <span className="text-sm">{u.label}</span>
                        <span className="text-xs text-muted-foreground">{u.email}</span>
                      </div>
                    </div>
                    <Check className={cn("ml-auto h-4 w-4", value === u.value ? "opacity-100" : "opacity-0")} />
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}

function Combobox09() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");

  return (
    <div className="w-full max-w-xs space-y-2">
      <Label>Options with flag and search</Label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between px-3 font-normal"
          >
            <span className={cn(!value && "text-muted-foreground")}>
              {value ? (
                <span className="flex items-center gap-2">
                  <span>{countries.find((c) => c.value === value)?.flag}</span>
                  {countries.find((c) => c.value === value)?.label}
                </span>
              ) : "Select country"}
            </span>
            <ChevronDown className="text-muted-foreground/80 shrink-0" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0">
          <Command>
            <CommandInput placeholder="Search country..." />
            <CommandList>
              <CommandEmpty>No country found.</CommandEmpty>
              <CommandGroup>
                {countries.map((c) => (
                  <CommandItem
                    key={c.value}
                    value={c.value}
                    onSelect={(v) => { setValue(v === value ? "" : v); setOpen(false); }}
                  >
                    <span className="mr-2">{c.flag}</span>
                    {c.label}
                    <Check className={cn("ml-auto h-4 w-4", value === c.value ? "opacity-100" : "opacity-0")} />
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}

function Combobox10() {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<string[]>(["react"]);

  const allItems = [
    { value: "react", label: "React" },
    { value: "vue", label: "Vue" },
    { value: "angular", label: "Angular" },
    { value: "svelte", label: "Svelte" },
    { value: "solid", label: "Solid" },
    { value: "next", label: "Next.js" },
  ];

  const toggleItem = (val: string) => {
    setSelected((prev) => prev.includes(val) ? prev.filter((v) => v !== val) : [...prev, val]);
  };

  return (
    <div className="w-full max-w-xs space-y-2">
      <Label>Multiple combobox</Label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="h-auto min-h-8 w-full justify-between hover:bg-transparent"
          >
            <div className="flex flex-wrap items-center gap-1 pr-2.5">
              {selected.length > 0 ? selected.map((val) => (
                <Badge key={val} variant="outline" className="rounded-sm">
                  {allItems.find((i) => i.value === val)?.label}
                  <button
                    className="ml-1 hover:text-foreground"
                    onClick={(e) => { e.stopPropagation(); setSelected((prev) => prev.filter((v) => v !== val)); }}
                  >
                    <X className="size-3" />
                  </button>
                </Badge>
              )) : <span className="text-muted-foreground">Select frameworks</span>}
            </div>
            <ChevronsUpDown className="text-muted-foreground/80 shrink-0" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0">
          <Command>
            <CommandInput placeholder="Search..." />
            <CommandList>
              <CommandEmpty>No item found.</CommandEmpty>
              <CommandGroup>
                {allItems.map((item) => (
                  <CommandItem key={item.value} value={item.value} onSelect={toggleItem}>
                    {item.label}
                    <Check className={cn("ml-auto h-4 w-4", selected.includes(item.value) ? "opacity-100" : "opacity-0")} />
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}

function Combobox11() {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<string[]>(["react", "vue", "angular"]);

  const allItems = [
    { value: "react", label: "React" },
    { value: "vue", label: "Vue" },
    { value: "angular", label: "Angular" },
    { value: "svelte", label: "Svelte" },
    { value: "solid", label: "Solid" },
    { value: "next", label: "Next.js" },
  ];

  const toggleItem = (val: string) => {
    setSelected((prev) => prev.includes(val) ? prev.filter((v) => v !== val) : [...prev, val]);
  };

  const [expanded, setExpanded] = useState(false);
  const visibleItems = expanded ? selected : selected.slice(0, 2);
  const hiddenCount = selected.length - 2;

  return (
    <div className="w-full max-w-xs space-y-2">
      <Label>Multiple combobox expandable</Label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="h-auto min-h-8 w-full justify-between hover:bg-transparent"
          >
            <div className="flex flex-wrap items-center gap-1 pr-2.5">
              {visibleItems.map((val) => (
                <Badge key={val} variant="outline" className="rounded-sm">
                  {allItems.find((i) => i.value === val)?.label}
                  <button
                    className="ml-1 hover:text-foreground"
                    onClick={(e) => { e.stopPropagation(); setSelected((prev) => prev.filter((v) => v !== val)); }}
                  >
                    <X className="size-3" />
                  </button>
                </Badge>
              ))}
              {!expanded && hiddenCount > 0 && (
                <Badge
                  variant="outline"
                  className="rounded-sm cursor-pointer"
                  onClick={(e) => { e.stopPropagation(); setExpanded(true); }}
                >
                  +{hiddenCount}
                </Badge>
              )}
              {expanded && hiddenCount > 0 && (
                <Badge
                  variant="outline"
                  className="rounded-sm cursor-pointer"
                  onClick={(e) => { e.stopPropagation(); setExpanded(false); }}
                >
                  Show less
                </Badge>
              )}
            </div>
            <ChevronsUpDown className="text-muted-foreground/80 shrink-0" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0">
          <Command>
            <CommandInput placeholder="Search..." />
            <CommandList>
              <CommandEmpty>No item found.</CommandEmpty>
              <CommandGroup>
                {allItems.map((item) => (
                  <CommandItem key={item.value} value={item.value} onSelect={toggleItem}>
                    {item.label}
                    <Check className={cn("ml-auto h-4 w-4", selected.includes(item.value) ? "opacity-100" : "opacity-0")} />
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}

function Combobox12() {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<string[]>(["react", "vue", "angular", "svelte", "solid", "next"]);

  const allItems = [
    { value: "react", label: "React" },
    { value: "vue", label: "Vue" },
    { value: "angular", label: "Angular" },
    { value: "svelte", label: "Svelte" },
    { value: "solid", label: "Solid" },
    { value: "next", label: "Next.js" },
  ];

  const toggleItem = (val: string) => {
    setSelected((prev) => prev.includes(val) ? prev.filter((v) => v !== val) : [...prev, val]);
  };

  return (
    <div className="w-full max-w-xs space-y-2">
      <Label>Multiple Count badge</Label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="h-auto min-h-8 w-full justify-between hover:bg-transparent"
          >
            <span>
              <Badge variant="outline" className="rounded-sm mr-1.5">{selected.length}</Badge>
              frameworks selected
            </span>
            <ChevronsUpDown className="text-muted-foreground/80 shrink-0" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0">
          <Command>
            <CommandInput placeholder="Search..." />
            <CommandList>
              <CommandEmpty>No item found.</CommandEmpty>
              <CommandGroup>
                {allItems.map((item) => (
                  <CommandItem key={item.value} value={item.value} onSelect={toggleItem}>
                    {item.label}
                    <Check className={cn("ml-auto h-4 w-4", selected.includes(item.value) ? "opacity-100" : "opacity-0")} />
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}

function Combobox13() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");

  return (
    <div className="w-full max-w-xs space-y-2">
      <Label>Combobox menu slide-in from bottom</Label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full max-w-xs justify-between"
          >
            {value ? frameworks.find((f) => f.value === value)?.label : "Select framework..."}
            <ChevronsUpDown className="opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0 animate-in slide-in-from-bottom-2 duration-200">
          <Command>
            <CommandInput placeholder="Search framework..." />
            <CommandList>
              <CommandEmpty>No framework found.</CommandEmpty>
              <CommandGroup>
                {frameworks.map((f) => (
                  <CommandItem
                    key={f.value}
                    value={f.value}
                    onSelect={(v) => { setValue(v === value ? "" : v); setOpen(false); }}
                  >
                    {f.label}
                    <Check className={cn("ml-auto h-4 w-4", value === f.value ? "opacity-100" : "opacity-0")} />
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}

function Combobox14() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");

  return (
    <div className="w-full max-w-xs space-y-2">
      <Label>Combobox menu zoom-in</Label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full max-w-xs justify-between"
          >
            {value ? frameworks.find((f) => f.value === value)?.label : "Select framework..."}
            <ChevronsUpDown className="opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0 animate-in zoom-in-95 duration-200">
          <Command>
            <CommandInput placeholder="Search framework..." />
            <CommandList>
              <CommandEmpty>No framework found.</CommandEmpty>
              <CommandGroup>
                {frameworks.map((f) => (
                  <CommandItem
                    key={f.value}
                    value={f.value}
                    onSelect={(v) => { setValue(v === value ? "" : v); setOpen(false); }}
                  >
                    {f.label}
                    <Check className={cn("ml-auto h-4 w-4", value === f.value ? "opacity-100" : "opacity-0")} />
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}

// --- Code strings ---
const codes: Record<string, string> = {
  "combobox-01": `"use client"

import { useState } from "react"
import { Check, ChevronsUpDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

const frameworks = [
  { value: "next.js", label: "Next.js" },
  { value: "sveltekit", label: "SvelteKit" },
  { value: "nuxt.js", label: "Nuxt.js" },
  { value: "remix", label: "Remix" },
  { value: "astro", label: "Astro" },
]

export default function Combobox01() {
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState("")

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" role="combobox" aria-expanded={open} className="w-full max-w-xs justify-between">
          {value ? frameworks.find((f) => f.value === value)?.label : "Select framework..."}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0">
        <Command>
          <CommandInput placeholder="Search framework..." />
          <CommandList>
            <CommandEmpty>No framework found.</CommandEmpty>
            <CommandGroup>
              {frameworks.map((f) => (
                <CommandItem key={f.value} value={f.value} onSelect={(v) => { setValue(v === value ? "" : v); setOpen(false) }}>
                  {f.label}
                  <Check className={cn("ml-auto h-4 w-4", value === f.value ? "opacity-100" : "opacity-0")} />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}`,
  "combobox-02": `"use client"

import { useState } from "react"
import { Check, ChevronsUpDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Label } from "@/components/ui/label"

const groupedItems = [
  { group: "Frontend", items: [{ value: "react", label: "React" }, { value: "vue", label: "Vue" }, { value: "angular", label: "Angular" }] },
  { group: "Backend", items: [{ value: "node", label: "Node.js" }, { value: "django", label: "Django" }, { value: "rails", label: "Rails" }] },
]

export default function Combobox02() {
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState("")

  return (
    <div className="w-full max-w-xs space-y-2">
      <Label>Combobox option group</Label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" role="combobox" aria-expanded={open} className="w-full justify-between px-3 font-normal">
            <span className={cn(!value && "text-muted-foreground")}>
              {value ? groupedItems.flatMap((g) => g.items).find((i) => i.value === value)?.label : "Select item"}
            </span>
            <ChevronsUpDown className="text-muted-foreground/80 shrink-0" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0">
          <Command>
            <CommandInput placeholder="Search..." />
            <CommandList>
              <CommandEmpty>No item found.</CommandEmpty>
              {groupedItems.map((g) => (
                <CommandGroup key={g.group} heading={g.group}>
                  {g.items.map((item) => (
                    <CommandItem key={item.value} value={item.value} onSelect={(v) => { setValue(v === value ? "" : v); setOpen(false) }}>
                      {item.label}
                      <Check className={cn("ml-auto h-4 w-4", value === item.value ? "opacity-100" : "opacity-0")} />
                    </CommandItem>
                  ))}
                </CommandGroup>
              ))}
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  )
}`,
  "combobox-10": `"use client"

import { useState } from "react"
import { Check, ChevronsUpDown, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Label } from "@/components/ui/label"

const allItems = [
  { value: "react", label: "React" },
  { value: "vue", label: "Vue" },
  { value: "angular", label: "Angular" },
  { value: "svelte", label: "Svelte" },
  { value: "solid", label: "Solid" },
  { value: "next", label: "Next.js" },
]

export default function Combobox10() {
  const [open, setOpen] = useState(false)
  const [selected, setSelected] = useState<string[]>(["react"])

  const toggleItem = (val: string) => {
    setSelected((prev) => prev.includes(val) ? prev.filter((v) => v !== val) : [...prev, val])
  }

  return (
    <div className="w-full max-w-xs space-y-2">
      <Label>Multiple combobox</Label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" role="combobox" aria-expanded={open} className="h-auto min-h-8 w-full justify-between hover:bg-transparent">
            <div className="flex flex-wrap items-center gap-1 pr-2.5">
              {selected.map((val) => (
                <Badge key={val} variant="outline" className="rounded-sm">
                  {allItems.find((i) => i.value === val)?.label}
                  <button className="ml-1" onClick={(e) => { e.stopPropagation(); setSelected((prev) => prev.filter((v) => v !== val)) }}>
                    <X className="size-3" />
                  </button>
                </Badge>
              ))}
            </div>
            <ChevronsUpDown className="text-muted-foreground/80 shrink-0" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0">
          <Command>
            <CommandInput placeholder="Search..." />
            <CommandList>
              <CommandEmpty>No item found.</CommandEmpty>
              <CommandGroup>
                {allItems.map((item) => (
                  <CommandItem key={item.value} value={item.value} onSelect={toggleItem}>
                    {item.label}
                    <Check className={cn("ml-auto h-4 w-4", selected.includes(item.value) ? "opacity-100" : "opacity-0")} />
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  )
}`,
};

function getCode(id: string) {
  return codes[id] || codes["combobox-01"]!.replace("Combobox01", id.replace("combobox-", "Combobox"));
}

// --- Variants ---
const variants = [
  { id: "combobox-01", title: "Combobox 1", preview: <Combobox01 /> },
  { id: "combobox-02", title: "Combobox 2", preview: <Combobox02 /> },
  { id: "combobox-03", title: "Combobox 3", preview: <Combobox03 /> },
  { id: "combobox-04", title: "Combobox 4", preview: <Combobox04 /> },
  { id: "combobox-05", title: "Combobox 5", preview: <Combobox05 /> },
  { id: "combobox-06", title: "Combobox 6", preview: <Combobox06 /> },
  { id: "combobox-07", title: "Combobox 7", preview: <Combobox07 /> },
  { id: "combobox-08", title: "Combobox 8", preview: <Combobox08 /> },
  { id: "combobox-09", title: "Combobox 9", preview: <Combobox09 /> },
  { id: "combobox-10", title: "Combobox 10", preview: <Combobox10 /> },
  { id: "combobox-11", title: "Combobox 11", preview: <Combobox11 /> },
  { id: "combobox-12", title: "Combobox 12", preview: <Combobox12 /> },
  { id: "combobox-13", title: "Combobox 13", preview: <Combobox13 /> },
  { id: "combobox-14", title: "Combobox 14", preview: <Combobox14 /> },
];

export default function ComboboxPage() {
  return (
    <ComponentLayout>
      {/* Page Header */}
      <div className="mb-4 flex gap-x-8 gap-y-4 max-md:flex-col">
        <div className="space-y-3">
          <h1 className="text-2xl font-bold sm:text-3xl">Shadcn Combobox</h1>
          <p className="text-muted-foreground">
            Explore the collection of awesome Shadcn Combobox Components, featuring {variants.length} combobox
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
          <p className="font-medium">Have any suggestions for Combobox variants?</p>
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
