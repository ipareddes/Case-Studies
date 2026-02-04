"use client";

import { ComponentLayout } from "@/components/layout/component-layout";
import { useState } from "react";
import { X, Sparkles, Code2, Copy, Check, ChevronLeft, ChevronRight } from "lucide-react";
import ReactDOM from "react-dom";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

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

// --- Helper: Static Calendar Grid ---
const DAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
const JAN_2025 = [
  [0, 0, 0, 1, 2, 3, 4],
  [5, 6, 7, 8, 9, 10, 11],
  [12, 13, 14, 15, 16, 17, 18],
  [19, 20, 21, 22, 23, 24, 25],
  [26, 27, 28, 29, 30, 31, 0],
];
const FEB_2025 = [
  [0, 0, 0, 0, 0, 0, 1],
  [2, 3, 4, 5, 6, 7, 8],
  [9, 10, 11, 12, 13, 14, 15],
  [16, 17, 18, 19, 20, 21, 22],
  [23, 24, 25, 26, 27, 28, 0],
];

function MiniGrid({ weeks, selected, rangeStart, rangeEnd, month, year }: { weeks: number[][]; selected?: number; rangeStart?: number; rangeEnd?: number; month: string; year: number }) {
  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-3 px-1">
        <button className="size-7 inline-flex items-center justify-center rounded-md hover:bg-muted"><ChevronLeft className="h-4 w-4" /></button>
        <span className="text-sm font-medium">{month} {year}</span>
        <button className="size-7 inline-flex items-center justify-center rounded-md hover:bg-muted"><ChevronRight className="h-4 w-4" /></button>
      </div>
      <table className="w-full border-collapse text-center text-sm">
        <thead>
          <tr>
            {DAYS.map((d) => (
              <th key={d} className="py-1.5 text-xs font-medium text-muted-foreground">{d}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {weeks.map((week, wi) => (
            <tr key={wi}>
              {week.map((day, di) => {
                const isSelected = day === selected && day !== 0;
                const inRange = rangeStart && rangeEnd && day >= rangeStart && day <= rangeEnd && day !== 0;
                return (
                  <td key={di} className="p-0">
                    <div className={`mx-auto flex size-8 items-center justify-center rounded-md text-sm ${
                      day === 0 ? "text-transparent" :
                      isSelected ? "bg-primary text-primary-foreground font-medium" :
                      inRange ? "bg-primary/10 text-foreground" :
                      "hover:bg-muted text-foreground"
                    }`}>
                      {day === 0 ? "" : day}
                    </div>
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// --- Calendar Variant Previews ---

function Calendar01Preview() {
  return (
    <div className="flex justify-center">
      <div className="w-[260px]">
        <MiniGrid weeks={JAN_2025} selected={15} month="January" year={2025} />
      </div>
    </div>
  );
}

function Calendar02Preview() {
  return (
    <div className="flex justify-center gap-6 flex-wrap">
      <div className="w-[260px]">
        <MiniGrid weeks={JAN_2025} month="January" year={2025} />
      </div>
      <div className="w-[260px]">
        <MiniGrid weeks={FEB_2025} month="February" year={2025} />
      </div>
    </div>
  );
}

function Calendar03Preview() {
  return (
    <div className="flex justify-center">
      <div className="w-[260px]">
        <MiniGrid weeks={JAN_2025} rangeStart={8} rangeEnd={18} month="January" year={2025} />
      </div>
    </div>
  );
}

function Calendar04Preview() {
  return (
    <div className="flex justify-center gap-6 flex-wrap">
      <div className="w-[260px]">
        <MiniGrid weeks={JAN_2025} rangeStart={12} rangeEnd={31} month="January" year={2025} />
      </div>
      <div className="w-[260px]">
        <MiniGrid weeks={FEB_2025} rangeStart={1} rangeEnd={5} month="February" year={2025} />
      </div>
    </div>
  );
}

function Calendar05Preview() {
  return (
    <div className="flex justify-center">
      <div className="w-[260px]">
        <MiniGrid weeks={JAN_2025} selected={22} month="January" year={2025} />
        <div className="mt-3 flex items-center gap-2 border-t pt-3 px-1">
          <span className="text-xs text-muted-foreground">Selected:</span>
          <span className="text-xs font-medium">Jan 22, 2025</span>
        </div>
      </div>
    </div>
  );
}

function Calendar06Preview() {
  return (
    <div className="flex justify-center">
      <div className="w-[260px]">
        <div className="mb-3 flex items-center justify-between px-1">
          <span className="text-xs text-muted-foreground">Start</span>
          <span className="text-xs text-muted-foreground">End</span>
        </div>
        <div className="flex gap-2 mb-3">
          <div className="flex-1 rounded-md border px-3 py-1.5 text-xs">Jan 8</div>
          <div className="flex-1 rounded-md border px-3 py-1.5 text-xs">Jan 18</div>
        </div>
        <MiniGrid weeks={JAN_2025} rangeStart={8} rangeEnd={18} month="January" year={2025} />
      </div>
    </div>
  );
}

function Calendar07Preview() {
  return (
    <div className="flex justify-center">
      <div className="w-[260px]">
        <MiniGrid weeks={JAN_2025} selected={10} month="January" year={2025} />
        <div className="mt-2 space-y-1 px-1">
          <div className="flex items-center gap-2 text-xs">
            <div className="size-2 rounded-full bg-primary" />
            <span>Team standup</span>
            <span className="ml-auto text-muted-foreground">9:00</span>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <div className="size-2 rounded-full bg-blue-500" />
            <span>Design review</span>
            <span className="ml-auto text-muted-foreground">14:00</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function Calendar08Preview() {
  return (
    <div className="flex justify-center">
      <div className="rounded-xl border bg-card text-card-foreground p-4 w-[280px] shadow-sm">
        <MiniGrid weeks={JAN_2025} selected={20} month="January" year={2025} />
      </div>
    </div>
  );
}

function Calendar09Preview() {
  return (
    <div className="flex justify-center">
      <div className="w-[260px]">
        <MiniGrid weeks={JAN_2025} selected={15} month="January" year={2025} />
        <div className="mt-3 flex gap-2 px-1">
          <button className="flex-1 rounded-md border px-3 py-1.5 text-xs hover:bg-muted">Cancel</button>
          <button className="flex-1 rounded-md bg-primary text-primary-foreground px-3 py-1.5 text-xs">Apply</button>
        </div>
      </div>
    </div>
  );
}

function Calendar10Preview() {
  return (
    <div className="flex justify-center">
      <div className="w-[260px]">
        <div className="flex items-center justify-between mb-3 px-1">
          <select className="rounded-md border bg-transparent px-2 py-1 text-xs">
            <option>January</option>
          </select>
          <select className="rounded-md border bg-transparent px-2 py-1 text-xs">
            <option>2025</option>
          </select>
        </div>
        <table className="w-full border-collapse text-center text-sm">
          <thead>
            <tr>
              {DAYS.map((d) => (
                <th key={d} className="py-1.5 text-xs font-medium text-muted-foreground">{d}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {JAN_2025.map((week, wi) => (
              <tr key={wi}>
                {week.map((day, di) => (
                  <td key={di} className="p-0">
                    <div className={`mx-auto flex size-8 items-center justify-center rounded-md text-sm ${
                      day === 0 ? "text-transparent" : day === 15 ? "bg-primary text-primary-foreground" : "hover:bg-muted"
                    }`}>{day === 0 ? "" : day}</div>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function Calendar11Preview() {
  return (
    <div className="flex justify-center">
      <div className="rounded-xl border bg-card text-card-foreground p-4 w-[280px] shadow-sm">
        <MiniGrid weeks={JAN_2025} rangeStart={10} rangeEnd={17} month="January" year={2025} />
      </div>
    </div>
  );
}

function Calendar12Preview() {
  return (
    <div className="flex justify-center">
      <div className="w-[260px]">
        <MiniGrid weeks={JAN_2025} month="January" year={2025} />
        <div className="mt-3 border-t pt-3 px-1">
          <p className="text-xs text-muted-foreground mb-2">Quick select</p>
          <div className="flex flex-wrap gap-1.5">
            {["Today", "Tomorrow", "In 3 days", "In a week"].map((label) => (
              <button key={label} className="rounded-md border px-2 py-1 text-xs hover:bg-muted">{label}</button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function Calendar13Preview() {
  return (
    <div className="flex justify-center">
      <div className="flex gap-4 flex-wrap">
        <div className="w-[140px] space-y-1">
          <p className="text-xs font-medium text-muted-foreground mb-2">Presets</p>
          {["Today", "Yesterday", "Last 7 days", "Last 30 days", "This month", "Last month"].map((p) => (
            <button key={p} className="block w-full text-left rounded-md px-3 py-1.5 text-xs hover:bg-muted">{p}</button>
          ))}
        </div>
        <div className="w-[260px]">
          <MiniGrid weeks={JAN_2025} rangeStart={1} rangeEnd={7} month="January" year={2025} />
        </div>
      </div>
    </div>
  );
}

function Calendar14Preview() {
  return (
    <div className="flex justify-center">
      <div className="w-[260px]">
        <MiniGrid weeks={JAN_2025} selected={25} month="January" year={2025} />
        <div className="mt-3 flex items-center gap-2 border-t pt-3 px-1">
          <span className="text-xs text-muted-foreground">Time:</span>
          <input type="text" defaultValue="10:30 AM" className="rounded-md border bg-transparent px-2 py-1 text-xs w-24" readOnly />
        </div>
      </div>
    </div>
  );
}

function Calendar15Preview() {
  return (
    <div className="flex justify-center">
      <div className="w-[260px]">
        <div className="grid grid-cols-3 gap-2 mb-1">
          {["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"].map((m) => (
            <button key={m} className={`rounded-md px-2 py-2 text-xs ${m === "Jan" ? "bg-primary text-primary-foreground" : "hover:bg-muted"}`}>{m}</button>
          ))}
        </div>
      </div>
    </div>
  );
}

function Calendar16Preview() {
  return (
    <div className="flex justify-center">
      <div className="w-[260px]">
        <div className="flex items-center justify-between mb-3 px-1">
          <button className="size-7 inline-flex items-center justify-center rounded-md hover:bg-muted"><ChevronLeft className="h-4 w-4" /></button>
          <span className="text-sm font-medium">2025</span>
          <button className="size-7 inline-flex items-center justify-center rounded-md hover:bg-muted"><ChevronRight className="h-4 w-4" /></button>
        </div>
        <div className="grid grid-cols-3 gap-2">
          {["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"].map((m) => (
            <button key={m} className={`rounded-md px-2 py-2.5 text-xs ${m === "Jan" ? "bg-primary text-primary-foreground" : "hover:bg-muted"}`}>{m}</button>
          ))}
        </div>
      </div>
    </div>
  );
}

function Calendar17Preview() {
  return (
    <div className="flex justify-center">
      <div className="w-[260px]">
        <div className="flex items-center justify-between mb-3 px-1">
          <button className="size-7 inline-flex items-center justify-center rounded-md hover:bg-muted"><ChevronLeft className="h-4 w-4" /></button>
          <span className="text-sm font-medium">Select Year</span>
          <button className="size-7 inline-flex items-center justify-center rounded-md hover:bg-muted"><ChevronRight className="h-4 w-4" /></button>
        </div>
        <div className="grid grid-cols-3 gap-2">
          {[2020, 2021, 2022, 2023, 2024, 2025, 2026, 2027, 2028].map((y) => (
            <button key={y} className={`rounded-md px-2 py-2.5 text-xs ${y === 2025 ? "bg-primary text-primary-foreground" : "hover:bg-muted"}`}>{y}</button>
          ))}
        </div>
      </div>
    </div>
  );
}

function Calendar18Preview() {
  return (
    <div className="flex justify-center">
      <div className="rounded-xl border bg-card text-card-foreground p-5 w-[300px] shadow-sm">
        <p className="text-sm font-medium mb-1">Book an appointment</p>
        <p className="text-xs text-muted-foreground mb-4">Select a date for your visit</p>
        <MiniGrid weeks={JAN_2025} selected={18} month="January" year={2025} />
        <div className="mt-4 flex gap-2">
          {["9:00", "10:00", "11:00", "14:00", "15:00"].map((t) => (
            <button key={t} className={`flex-1 rounded-md border px-1 py-1.5 text-xs ${t === "10:00" ? "bg-primary text-primary-foreground border-primary" : "hover:bg-muted"}`}>{t}</button>
          ))}
        </div>
      </div>
    </div>
  );
}

function Calendar19Preview() {
  return (
    <div className="flex justify-center">
      <div className="rounded-xl border bg-card text-card-foreground p-5 w-[300px] shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <p className="text-sm font-medium">January 2025</p>
          <div className="flex items-center gap-1">
            <button className="size-7 inline-flex items-center justify-center rounded-md hover:bg-muted"><ChevronLeft className="h-4 w-4" /></button>
            <button className="size-7 inline-flex items-center justify-center rounded-md hover:bg-muted"><ChevronRight className="h-4 w-4" /></button>
          </div>
        </div>
        <table className="w-full border-collapse text-center text-sm">
          <thead>
            <tr>
              {DAYS.map((d) => (
                <th key={d} className="py-1.5 text-xs font-medium text-muted-foreground">{d}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {JAN_2025.map((week, wi) => (
              <tr key={wi}>
                {week.map((day, di) => {
                  const hasEvent = [5, 12, 20].includes(day);
                  return (
                    <td key={di} className="p-0 relative">
                      <div className={`mx-auto flex size-8 items-center justify-center rounded-md text-sm ${
                        day === 0 ? "text-transparent" : day === 12 ? "bg-primary text-primary-foreground" : "hover:bg-muted"
                      }`}>{day === 0 ? "" : day}</div>
                      {hasEvent && day !== 0 && <div className="absolute bottom-0 left-1/2 -translate-x-1/2 size-1 rounded-full bg-primary" />}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
        <div className="mt-3 border-t pt-3 space-y-1.5">
          <div className="flex items-center gap-2 text-xs">
            <div className="size-2 rounded-full bg-primary" />
            <span>Sprint planning</span>
            <span className="ml-auto text-muted-foreground">10:00</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function Calendar20Preview() {
  return (
    <div className="flex justify-center">
      <div className="rounded-xl border bg-card text-card-foreground p-5 w-[300px] shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <p className="text-sm font-medium">Schedule</p>
          <button className="rounded-md border px-2.5 py-1 text-xs hover:bg-muted">Today</button>
        </div>
        <MiniGrid weeks={JAN_2025} selected={15} month="January" year={2025} />
        <div className="mt-3 border-t pt-3 space-y-2">
          <div className="rounded-md border-l-2 border-blue-500 bg-blue-500/10 px-3 py-2">
            <p className="text-xs font-medium">Design sync</p>
            <p className="text-xs text-muted-foreground">10:00 - 11:00</p>
          </div>
          <div className="rounded-md border-l-2 border-green-500 bg-green-500/10 px-3 py-2">
            <p className="text-xs font-medium">Client call</p>
            <p className="text-xs text-muted-foreground">14:00 - 15:00</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Calendar21Preview() {
  return (
    <div className="flex justify-center">
      <div className="w-[260px]">
        <div className="flex items-center gap-2 mb-3 px-1">
          <div className="flex-1 rounded-md border px-3 py-1.5 text-xs text-muted-foreground">Pick a date</div>
        </div>
        <MiniGrid weeks={JAN_2025} month="January" year={2025} />
      </div>
    </div>
  );
}

function Calendar22Preview() {
  return (
    <div className="flex justify-center">
      <div className="rounded-xl border bg-card text-card-foreground p-4 w-[260px] shadow-sm">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-medium">January 2025</span>
          <div className="flex gap-1">
            <button className="size-6 inline-flex items-center justify-center rounded hover:bg-muted"><ChevronLeft className="h-3 w-3" /></button>
            <button className="size-6 inline-flex items-center justify-center rounded hover:bg-muted"><ChevronRight className="h-3 w-3" /></button>
          </div>
        </div>
        <table className="w-full border-collapse text-center">
          <thead>
            <tr>
              {DAYS.map((d) => (
                <th key={d} className="py-1 text-[10px] font-medium text-muted-foreground">{d}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {JAN_2025.map((week, wi) => (
              <tr key={wi}>
                {week.map((day, di) => (
                  <td key={di} className="p-0">
                    <div className={`mx-auto flex size-6 items-center justify-center rounded text-xs ${
                      day === 0 ? "text-transparent" : day === 10 ? "bg-primary text-primary-foreground" : "hover:bg-muted"
                    }`}>{day === 0 ? "" : day}</div>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function Calendar23Preview() {
  return (
    <div className="flex justify-center">
      <div className="rounded-xl border bg-card text-card-foreground p-4 w-[260px] shadow-sm">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-medium">January 2025</span>
          <div className="flex gap-1">
            <button className="size-6 inline-flex items-center justify-center rounded hover:bg-muted"><ChevronLeft className="h-3 w-3" /></button>
            <button className="size-6 inline-flex items-center justify-center rounded hover:bg-muted"><ChevronRight className="h-3 w-3" /></button>
          </div>
        </div>
        <table className="w-full border-collapse text-center">
          <thead>
            <tr>
              {DAYS.map((d) => (
                <th key={d} className="py-1 text-[10px] font-medium text-muted-foreground">{d}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {JAN_2025.map((week, wi) => (
              <tr key={wi}>
                {week.map((day, di) => (
                  <td key={di} className="p-0">
                    <div className={`mx-auto flex size-6 items-center justify-center rounded-full text-xs ${
                      day === 0 ? "text-transparent" : day === 15 ? "bg-primary text-primary-foreground" : "hover:bg-muted"
                    }`}>{day === 0 ? "" : day}</div>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function Calendar24Preview() {
  return (
    <div className="flex justify-center">
      <div className="rounded-xl border bg-card text-card-foreground w-[300px] shadow-sm overflow-hidden">
        <div className="bg-primary text-primary-foreground p-4">
          <p className="text-xs opacity-80">2025</p>
          <p className="text-lg font-semibold">Wed, Jan 15</p>
        </div>
        <div className="p-4">
          <MiniGrid weeks={JAN_2025} selected={15} month="January" year={2025} />
        </div>
        <div className="flex justify-end gap-2 border-t px-4 py-3">
          <button className="rounded-md px-3 py-1.5 text-xs hover:bg-muted">Cancel</button>
          <button className="rounded-md bg-primary text-primary-foreground px-3 py-1.5 text-xs">OK</button>
        </div>
      </div>
    </div>
  );
}

function Calendar25Preview() {
  return (
    <div className="flex justify-center">
      <div className="w-[260px]">
        <div className="mb-3 px-1">
          <p className="text-xs text-muted-foreground mb-1">Week starting Monday</p>
        </div>
        <div className="flex items-center justify-between mb-3 px-1">
          <button className="size-7 inline-flex items-center justify-center rounded-md hover:bg-muted"><ChevronLeft className="h-4 w-4" /></button>
          <span className="text-sm font-medium">January 2025</span>
          <button className="size-7 inline-flex items-center justify-center rounded-md hover:bg-muted"><ChevronRight className="h-4 w-4" /></button>
        </div>
        <table className="w-full border-collapse text-center text-sm">
          <thead>
            <tr>
              {["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"].map((d) => (
                <th key={d} className="py-1.5 text-xs font-medium text-muted-foreground">{d}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[
              [0, 0, 1, 2, 3, 4, 5],
              [6, 7, 8, 9, 10, 11, 12],
              [13, 14, 15, 16, 17, 18, 19],
              [20, 21, 22, 23, 24, 25, 26],
              [27, 28, 29, 30, 31, 0, 0],
            ].map((week, wi) => (
              <tr key={wi}>
                {week.map((day, di) => (
                  <td key={di} className="p-0">
                    <div className={`mx-auto flex size-8 items-center justify-center rounded-md text-sm ${
                      day === 0 ? "text-transparent" : day === 20 ? "bg-primary text-primary-foreground" : "hover:bg-muted"
                    }`}>{day === 0 ? "" : day}</div>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// --- Code strings ---
const codes: Record<string, string> = {
  "calendar-01": `import { Calendar } from "@/components/ui/calendar"
import { useState } from "react"

export default function Calendar01() {
  const [date, setDate] = useState<Date | undefined>(new Date())

  return (
    <Calendar
      mode="single"
      selected={date}
      onSelect={setDate}
      className="rounded-md border"
    />
  )
}`,
  "calendar-02": `import { Calendar } from "@/components/ui/calendar"

export default function Calendar02() {
  return (
    <Calendar
      numberOfMonths={2}
      className="rounded-md border"
    />
  )
}`,
  "calendar-03": `import { Calendar } from "@/components/ui/calendar"
import { useState } from "react"
import { DateRange } from "react-day-picker"

export default function Calendar03() {
  const [range, setRange] = useState<DateRange | undefined>({
    from: new Date(2025, 0, 8),
    to: new Date(2025, 0, 18),
  })

  return (
    <Calendar
      mode="range"
      selected={range}
      onSelect={setRange}
      className="rounded-md border"
    />
  )
}`,
  "calendar-08": `import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent } from "@/components/ui/card"
import { useState } from "react"

export default function Calendar08() {
  const [date, setDate] = useState<Date | undefined>(new Date())

  return (
    <Card>
      <CardContent className="p-4">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
        />
      </CardContent>
    </Card>
  )
}`,
  "calendar-13": `import { Calendar } from "@/components/ui/calendar"
import { useState } from "react"
import { DateRange } from "react-day-picker"
import { addDays } from "date-fns"

const presets = [
  { label: "Today", range: { from: new Date(), to: new Date() } },
  { label: "Yesterday", range: { from: addDays(new Date(), -1), to: addDays(new Date(), -1) } },
  { label: "Last 7 days", range: { from: addDays(new Date(), -7), to: new Date() } },
  { label: "Last 30 days", range: { from: addDays(new Date(), -30), to: new Date() } },
]

export default function Calendar13() {
  const [range, setRange] = useState<DateRange | undefined>(presets[0].range)

  return (
    <div className="flex gap-4">
      <div className="space-y-1">
        <p className="text-xs font-medium text-muted-foreground mb-2">Presets</p>
        {presets.map((p) => (
          <button
            key={p.label}
            onClick={() => setRange(p.range)}
            className="block w-full text-left rounded-md px-3 py-1.5 text-xs hover:bg-muted"
          >
            {p.label}
          </button>
        ))}
      </div>
      <Calendar
        mode="range"
        selected={range}
        onSelect={setRange}
        className="rounded-md border"
      />
    </div>
  )
}`,
  "calendar-18": `import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { useState } from "react"

export default function Calendar18() {
  const [date, setDate] = useState<Date | undefined>(new Date())

  return (
    <Card>
      <CardHeader>
        <CardTitle>Book an appointment</CardTitle>
        <CardDescription>Select a date for your visit</CardDescription>
      </CardHeader>
      <CardContent>
        <Calendar mode="single" selected={date} onSelect={setDate} />
        <div className="mt-4 flex gap-2">
          {["9:00", "10:00", "11:00", "14:00", "15:00"].map((t) => (
            <button key={t} className="flex-1 rounded-md border px-2 py-1.5 text-xs hover:bg-muted">
              {t}
            </button>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}`,
  "calendar-24": `import { Calendar } from "@/components/ui/calendar"
import { useState } from "react"
import { format } from "date-fns"

export default function Calendar24() {
  const [date, setDate] = useState<Date>(new Date(2025, 0, 15))

  return (
    <div className="rounded-xl border shadow-sm overflow-hidden">
      <div className="bg-primary text-primary-foreground p-4">
        <p className="text-xs opacity-80">{format(date, "yyyy")}</p>
        <p className="text-lg font-semibold">{format(date, "EEE, MMM d")}</p>
      </div>
      <div className="p-4">
        <Calendar mode="single" selected={date} onSelect={(d) => d && setDate(d)} />
      </div>
      <div className="flex justify-end gap-2 border-t px-4 py-3">
        <button className="rounded-md px-3 py-1.5 text-xs hover:bg-muted">Cancel</button>
        <button className="rounded-md bg-primary text-primary-foreground px-3 py-1.5 text-xs">OK</button>
      </div>
    </div>
  )
}`,
};

function getCode(id: string) {
  return codes[id] || codes["calendar-01"]!.replace("Calendar01", id.replace("calendar-", "Calendar"));
}

// --- Variants ---
const variants = [
  { id: "calendar-01", title: "Single Month", preview: <Calendar01Preview /> },
  { id: "calendar-02", title: "Double Month", preview: <Calendar02Preview /> },
  { id: "calendar-03", title: "Date Range", preview: <Calendar03Preview /> },
  { id: "calendar-04", title: "Double Month Range", preview: <Calendar04Preview /> },
  { id: "calendar-05", title: "With Selected Date", preview: <Calendar05Preview /> },
  { id: "calendar-06", title: "Range With Inputs", preview: <Calendar06Preview /> },
  { id: "calendar-07", title: "With Events", preview: <Calendar07Preview /> },
  { id: "calendar-08", title: "Card Calendar", preview: <Calendar08Preview /> },
  { id: "calendar-09", title: "With Actions", preview: <Calendar09Preview /> },
  { id: "calendar-10", title: "Month & Year Dropdowns", preview: <Calendar10Preview /> },
  { id: "calendar-11", title: "Card Range Select", preview: <Calendar11Preview /> },
  { id: "calendar-12", title: "Quick Select", preview: <Calendar12Preview /> },
  { id: "calendar-13", title: "Date Range With Presets", preview: <Calendar13Preview /> },
  { id: "calendar-14", title: "Date & Time Picker", preview: <Calendar14Preview /> },
  { id: "calendar-15", title: "Month Picker", preview: <Calendar15Preview /> },
  { id: "calendar-16", title: "Month Picker With Navigation", preview: <Calendar16Preview /> },
  { id: "calendar-17", title: "Year Picker", preview: <Calendar17Preview /> },
  { id: "calendar-18", title: "Booking Calendar", preview: <Calendar18Preview /> },
  { id: "calendar-19", title: "Event Calendar", preview: <Calendar19Preview /> },
  { id: "calendar-20", title: "Schedule View", preview: <Calendar20Preview /> },
  { id: "calendar-21", title: "Date Picker Input", preview: <Calendar21Preview /> },
  { id: "calendar-22", title: "Mini Calendar", preview: <Calendar22Preview /> },
  { id: "calendar-23", title: "Rounded Mini Calendar", preview: <Calendar23Preview /> },
  { id: "calendar-24", title: "Material Date Picker", preview: <Calendar24Preview /> },
  { id: "calendar-25", title: "Week Starts Monday", preview: <Calendar25Preview /> },
];

export default function CalendarPage() {
  return (
    <ComponentLayout>
      {/* Page Header */}
      <div className="mb-4 flex gap-x-8 gap-y-4 max-md:flex-col">
        <div className="space-y-3">
          <h1 className="text-2xl font-bold sm:text-3xl">Shadcn Calendar</h1>
          <p className="text-muted-foreground">
            Explore the collection of awesome Shadcn Calendar Components, featuring {variants.length} calendar
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
          <p className="font-medium">Have any suggestions for Calendar variants?</p>
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
