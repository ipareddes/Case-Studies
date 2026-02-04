"use client";

import { Label, Switch, Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@ipareddes/ui-components";

import { ComponentLayout } from "@/components/layout/component-layout";
import { useState } from "react";
import { X, Sparkles, Code2, Copy, Check, Moon, Sun, Database, Code, ChartPie, Cpu } from "lucide-react";
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

// --- Switch Variant Previews ---

function Switch01() {
  return (
    <div className="flex items-center space-x-2">
      <Switch id="airplane-mode" />
      <Label htmlFor="airplane-mode">Airplane Mode</Label>
    </div>
  );
}

function Switch02() {
  return (
    <Switch
      className="rounded-sm [&_span]:rounded-sm"
      aria-label="Square switch"
    />
  );
}

function Switch03() {
  return (
    <Switch
      className="h-3 w-8 border-none [&_span]:size-[18px] [&_span]:border [&_span]:border-input"
      aria-label="Mini switch"
    />
  );
}

function Switch04() {
  return (
    <div className="flex items-center gap-3">
      <Switch
        defaultChecked
        className="data-[state=checked]:bg-destructive focus-visible:border-destructive focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40"
        aria-label="Destructive Switch"
      />
      <Switch
        defaultChecked
        className="data-[state=checked]:bg-green-600 dark:data-[state=checked]:bg-green-400 focus-visible:border-green-600 focus-visible:ring-green-600/20 dark:focus-visible:border-green-400 dark:focus-visible:ring-green-400/40"
        aria-label="Success Switch"
      />
      <Switch
        defaultChecked
        className="data-[state=checked]:bg-sky-600 dark:data-[state=checked]:bg-sky-400 focus-visible:border-sky-600 focus-visible:ring-sky-600/20 dark:focus-visible:border-sky-400 dark:focus-visible:ring-sky-400/40"
        aria-label="Info Switch"
      />
      <Switch
        defaultChecked
        className="data-[state=checked]:bg-amber-600 dark:data-[state=checked]:bg-amber-400 focus-visible:border-amber-600 focus-visible:ring-amber-600/20 dark:focus-visible:border-amber-400 dark:focus-visible:ring-amber-400/40"
        aria-label="Warning Switch"
      />
    </div>
  );
}

function Switch05() {
  return (
    <div className="flex items-center gap-3">
      <Switch aria-label="Small switch" />
      <Switch
        className="h-6 w-10 [&_span]:size-5 data-[state=checked]:[&_span]:translate-x-[18px]"
        aria-label="Medium switch"
      />
      <Switch
        className="h-7 w-12 [&_span]:size-6 data-[state=checked]:[&_span]:translate-x-[22px]"
        aria-label="Large switch"
      />
    </div>
  );
}

function Switch06() {
  return (
    <div className="flex items-center gap-3">
      <Switch
        defaultChecked
        className="data-[state=checked]:bg-transparent data-[state=checked]:border-primary data-[state=checked]:[&_span]:bg-primary [&_span]:border focus-visible:border-primary"
        aria-label="Default outline Switch"
      />
      <Switch
        defaultChecked
        className="data-[state=checked]:bg-transparent data-[state=checked]:border-destructive data-[state=checked]:[&_span]:bg-destructive [&_span]:border focus-visible:border-destructive focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40"
        aria-label="Destructive outline Switch"
      />
      <Switch
        defaultChecked
        className="data-[state=checked]:bg-transparent data-[state=checked]:border-green-600 dark:data-[state=checked]:border-green-400 data-[state=checked]:[&_span]:bg-green-600 dark:data-[state=checked]:[&_span]:bg-green-400 [&_span]:border focus-visible:border-green-600 focus-visible:ring-green-600/20 dark:focus-visible:border-green-400 dark:focus-visible:ring-green-400/40"
        aria-label="Success outline Switch"
      />
    </div>
  );
}

function Switch07() {
  return (
    <Switch
      className="h-6 w-10 border-none bg-gradient-to-r from-amber-500 to-destructive/60 data-[state=checked]:from-sky-400 data-[state=checked]:to-indigo-700 [&_span]:size-5 [&_span]:translate-x-0.5 data-[state=checked]:[&_span]:translate-x-[19px]"
      aria-label="Gradient Switch"
    />
  );
}

function Switch08() {
  const [checked, setChecked] = useState(true);
  return (
    <div className="inline-flex items-center gap-2">
      <Switch id="toggle-label" checked={checked} onCheckedChange={setChecked} aria-label="Toggle switch label" />
      <Label htmlFor="toggle-label" className="text-sm font-medium">{checked ? "Yes" : "No"}</Label>
    </div>
  );
}

function Switch09() {
  const [checked, setChecked] = useState(false);
  return (
    <div className="inline-flex items-center gap-2" data-state={checked ? "checked" : "unchecked"}>
      <span className={`cursor-pointer text-sm font-medium ${!checked ? "text-muted-foreground/70" : ""}`} onClick={() => setChecked(true)}>Yes</span>
      <Switch checked={checked} onCheckedChange={setChecked} aria-label="Yes/No toggle" />
      <span className={`cursor-pointer text-sm font-medium ${checked ? "text-muted-foreground/70" : ""}`} onClick={() => setChecked(false)}>No</span>
    </div>
  );
}

function Switch10() {
  const [checked, setChecked] = useState(true);
  return (
    <div className="inline-flex items-center gap-2">
      <Switch id="icon-label" checked={checked} onCheckedChange={setChecked} aria-label="Toggle switch" />
      <Label htmlFor="icon-label">
        <span className="sr-only">Toggle switch</span>
        <Moon className="size-4" />
      </Label>
    </div>
  );
}

function Switch11() {
  const [checked, setChecked] = useState(true);
  return (
    <div className="inline-flex items-center gap-2">
      <span className={`cursor-pointer ${checked ? "text-muted-foreground/70" : ""}`} onClick={() => setChecked(false)}>
        <Sun className="size-4" />
      </span>
      <Switch checked={checked} onCheckedChange={setChecked} aria-label="Toggle between dark and light mode" />
      <span className={`cursor-pointer ${!checked ? "text-muted-foreground/70" : ""}`} onClick={() => setChecked(true)}>
        <Moon className="size-4" />
      </span>
    </div>
  );
}

function Switch12() {
  const [checked, setChecked] = useState(true);
  return (
    <div className="relative inline-grid h-7 grid-cols-[1fr_1fr] items-center text-sm font-medium">
      <Switch
        checked={checked}
        onCheckedChange={setChecked}
        className="absolute inset-0 h-[inherit] w-14 data-[state=checked]:bg-input/50 data-[state=unchecked]:bg-input/50 [&_span]:!bg-background [&_span]:size-[26px] [&_span]:data-[state=checked]:translate-x-7"
        aria-label="Switch with icon indicators"
      />
      <span className={`pointer-events-none relative ml-[7px] flex min-w-7 items-center text-center ${checked ? "text-muted-foreground/70" : ""}`}>
        <Check className="size-4" />
      </span>
      <span className={`pointer-events-none relative flex min-w-7 items-center text-center ${!checked ? "text-muted-foreground/70" : ""}`}>
        <X className="size-4" />
      </span>
    </div>
  );
}

function Switch13() {
  const [checked, setChecked] = useState(true);
  return (
    <div className="relative inline-grid h-7 grid-cols-[1fr_1fr] items-center text-sm font-medium">
      <Switch
        checked={checked}
        onCheckedChange={setChecked}
        className="absolute inset-0 h-[inherit] w-14 data-[state=checked]:bg-primary data-[state=unchecked]:bg-input/50 [&_span]:z-10 [&_span]:size-[26px] [&_span]:data-[state=checked]:translate-x-7"
        aria-label="Switch with permanent icon indicators"
      />
      <span className={`pointer-events-none relative ml-0.5 flex min-w-8 items-center justify-center text-center ${checked ? "invisible" : ""}`}>
        <X className="size-4" />
      </span>
      <span className={`pointer-events-none relative flex min-w-8 items-center justify-center text-center ${checked ? "text-background -translate-x-full" : "invisible"}`}>
        <Check className="size-4" />
      </span>
    </div>
  );
}

function Switch14() {
  const [checked, setChecked] = useState(true);
  return (
    <div className="relative inline-grid h-8 grid-cols-[1fr_1fr] items-center text-sm font-medium">
      <Switch
        checked={checked}
        onCheckedChange={setChecked}
        className="absolute inset-0 h-[inherit] w-auto rounded-md data-[state=checked]:bg-primary data-[state=unchecked]:bg-input/50 [&_span]:z-10 [&_span]:h-full [&_span]:w-1/2 [&_span]:rounded-sm [&_span]:data-[state=checked]:translate-x-[35px]"
        aria-label="Square switch with text indicators"
      />
      <span className={`pointer-events-none relative ml-0.5 flex items-center justify-center px-2 text-center text-[10px] font-medium uppercase ${checked ? "invisible" : ""}`}>No</span>
      <span className={`pointer-events-none relative mr-0.5 flex items-center justify-center px-2 text-center text-[10px] font-medium uppercase ${checked ? "text-background -translate-x-full" : "invisible"}`}>Yes</span>
    </div>
  );
}

function Switch15() {
  return (
    <div className="border-input has-[[data-state=checked]]:border-primary/50 relative flex w-full items-start gap-2 rounded-md border p-4 shadow-xs outline-none">
      <Switch
        className="order-1 h-4 w-6 after:absolute after:inset-0 [&_span]:size-3 data-[state=checked]:[&_span]:translate-x-2.5"
        id="switch-backup"
        aria-describedby="switch-backup-description"
      />
      <div className="flex grow items-center gap-3">
        <Database className="size-5 shrink-0" />
        <div className="grid grow gap-2">
          <Label htmlFor="switch-backup">Backup</Label>
          <p id="switch-backup-description" className="text-muted-foreground text-xs">Backup every file from your project.</p>
        </div>
      </div>
    </div>
  );
}

function Switch16() {
  return (
    <div className="border-input has-[[data-state=checked]]:border-primary/50 relative flex w-full items-start gap-2 rounded-md border p-4 shadow-xs outline-none">
      <Switch
        className="order-1 h-4 w-6 after:absolute after:inset-0 [&_span]:size-3 data-[state=checked]:[&_span]:translate-x-2.5"
        id="switch-google"
        aria-describedby="switch-google-description"
      />
      <div className="flex grow gap-3">
        <div className="flex size-5 items-center justify-center rounded-sm bg-muted text-xs font-bold shrink-0">G</div>
        <div className="grid grow gap-2">
          <Label htmlFor="switch-google">Google Cloud Backup</Label>
          <p id="switch-google-description" className="text-muted-foreground text-xs">Backup every picture, video and PDFs.</p>
        </div>
      </div>
    </div>
  );
}

function Switch17() {
  return (
    <div className="border-input has-[[data-state=checked]]:border-primary/50 relative flex w-full items-start gap-2 rounded-md border p-4 shadow-xs outline-none">
      <Switch
        className="order-1 h-4 w-6 after:absolute after:inset-0 [&_span]:size-3 data-[state=checked]:[&_span]:translate-x-2.5"
        id="switch-github"
        aria-describedby="switch-github-description"
      />
      <div className="flex grow items-center gap-3">
        <div className="flex size-5 items-center justify-center rounded-sm bg-foreground text-background text-xs font-bold shrink-0">
          <svg className="size-3.5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
        </div>
        <div className="grid grow gap-2">
          <Label htmlFor="switch-github">Connect with GitHub</Label>
          <p id="switch-github-description" className="text-muted-foreground text-xs">Access your projects direct from GitHub.</p>
        </div>
      </div>
    </div>
  );
}

function Switch18() {
  return (
    <fieldset className="w-full max-w-96 space-y-4">
      <legend className="text-foreground text-sm leading-none font-medium">Switch to your preferred field:</legend>
      <ul className="flex w-full flex-col divide-y rounded-md border">
        {[
          { label: "Web Development", icon: <Code className="size-4" /> },
          { label: "Data Analysis", icon: <ChartPie className="size-4" /> },
          { label: "Machine Learning", icon: <Cpu className="size-4" /> },
        ].map((item) => (
          <li key={item.label}>
            <label className="flex items-center justify-between gap-2 px-5 py-3 text-sm leading-none font-medium cursor-pointer">
              <span className="flex items-center gap-2">
                {item.icon} {item.label}
              </span>
              <Switch id={item.label} />
            </label>
          </li>
        ))}
      </ul>
    </fieldset>
  );
}

function Switch19() {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center space-x-2">
        <Switch aria-label="Small switch" />
        <Label>Small switch</Label>
      </div>
      <div className="flex items-center space-x-2">
        <Switch className="h-6 w-10 [&_span]:size-5 data-[state=checked]:[&_span]:translate-x-[18px]" aria-label="Medium switch" />
        <Label>Medium switch</Label>
      </div>
      <div className="flex items-center space-x-2">
        <Switch className="h-7 w-12 [&_span]:size-6 data-[state=checked]:[&_span]:translate-x-[22px]" aria-label="Large switch" />
        <Label>Large switch</Label>
      </div>
    </div>
  );
}

function Switch20() {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center space-x-2">
        <Switch className="border-none bg-gradient-to-r from-amber-500 to-destructive/60 data-[state=checked]:from-sky-400 data-[state=checked]:to-indigo-700" aria-label="Gradient small switch" />
        <Label>Small switch</Label>
      </div>
      <div className="flex items-center space-x-2">
        <Switch className="h-6 w-10 border-none bg-gradient-to-r from-amber-500 to-destructive/60 data-[state=checked]:from-sky-400 data-[state=checked]:to-indigo-700 [&_span]:size-5 data-[state=checked]:[&_span]:translate-x-[18px]" aria-label="Gradient medium switch" />
        <Label>Medium switch</Label>
      </div>
      <div className="flex items-center space-x-2">
        <Switch className="h-7 w-12 border-none bg-gradient-to-r from-amber-500 to-destructive/60 data-[state=checked]:from-sky-400 data-[state=checked]:to-indigo-700 [&_span]:size-6 data-[state=checked]:[&_span]:translate-x-[22px]" aria-label="Gradient large switch" />
        <Label>Large switch</Label>
      </div>
    </div>
  );
}

// --- Code strings ---
const codes: Record<string, string> = {
  "switch-01": `
export default function Switch01() {
  return (
    <div className="flex items-center space-x-2">
      <Switch id="airplane-mode" />
      <Label htmlFor="airplane-mode">Airplane Mode</Label>
    </div>
  )
}`,
  "switch-02": `
export default function Switch02() {
  return (
    <Switch
      className="rounded-sm [&_span]:rounded-sm"
      aria-label="Square switch"
    />
  )
}`,
  "switch-03": `
export default function Switch03() {
  return (
    <Switch
      className="h-3 w-8 border-none [&_span]:size-[18px] [&_span]:border [&_span]:border-input"
      aria-label="Mini switch"
    />
  )
}`,
  "switch-04": `
export default function Switch04() {
  return (
    <div className="flex items-center gap-3">
      <Switch
        defaultChecked
        className="data-[state=checked]:bg-destructive focus-visible:border-destructive focus-visible:ring-destructive/20"
        aria-label="Destructive Switch"
      />
      <Switch
        defaultChecked
        className="data-[state=checked]:bg-green-600 dark:data-[state=checked]:bg-green-400"
        aria-label="Success Switch"
      />
      <Switch
        defaultChecked
        className="data-[state=checked]:bg-sky-600 dark:data-[state=checked]:bg-sky-400"
        aria-label="Info Switch"
      />
      <Switch
        defaultChecked
        className="data-[state=checked]:bg-amber-600 dark:data-[state=checked]:bg-amber-400"
        aria-label="Warning Switch"
      />
    </div>
  )
}`,
  "switch-05": `
export default function Switch05() {
  return (
    <div className="flex items-center gap-3">
      <Switch aria-label="Small switch" />
      <Switch
        className="h-6 w-10 [&_span]:size-5 data-[state=checked]:[&_span]:translate-x-[18px]"
        aria-label="Medium switch"
      />
      <Switch
        className="h-7 w-12 [&_span]:size-6 data-[state=checked]:[&_span]:translate-x-[22px]"
        aria-label="Large switch"
      />
    </div>
  )
}`,
  "switch-06": `
export default function Switch06() {
  return (
    <div className="flex items-center gap-3">
      <Switch
        defaultChecked
        className="data-[state=checked]:bg-transparent data-[state=checked]:border-primary data-[state=checked]:[&_span]:bg-primary [&_span]:border"
        aria-label="Default outline Switch"
      />
      <Switch
        defaultChecked
        className="data-[state=checked]:bg-transparent data-[state=checked]:border-destructive data-[state=checked]:[&_span]:bg-destructive [&_span]:border"
        aria-label="Destructive outline Switch"
      />
      <Switch
        defaultChecked
        className="data-[state=checked]:bg-transparent data-[state=checked]:border-green-600 data-[state=checked]:[&_span]:bg-green-600 [&_span]:border"
        aria-label="Success outline Switch"
      />
    </div>
  )
}`,
  "switch-07": `
export default function Switch07() {
  return (
    <Switch
      className="h-6 w-10 border-none bg-gradient-to-r from-amber-500 to-destructive/60 data-[state=checked]:from-sky-400 data-[state=checked]:to-indigo-700 [&_span]:size-5"
      aria-label="Gradient Switch"
    />
  )
}`,
  "switch-08": `"use client"
import { useState } from "react"

export default function Switch08() {
  const [checked, setChecked] = useState(true)
  return (
    <div className="inline-flex items-center gap-2">
      <Switch id="toggle-label" checked={checked} onCheckedChange={setChecked} />
      <Label htmlFor="toggle-label">{checked ? "Yes" : "No"}</Label>
    </div>
  )
}`,
  "switch-09": `"use client"
import { useState } from "react"

export default function Switch09() {
  const [checked, setChecked] = useState(false)
  return (
    <div className="inline-flex items-center gap-2">
      <span className={\`cursor-pointer text-sm font-medium \${!checked ? "text-muted-foreground/70" : ""}\`} onClick={() => setChecked(true)}>Yes</span>
      <Switch checked={checked} onCheckedChange={setChecked} />
      <span className={\`cursor-pointer text-sm font-medium \${checked ? "text-muted-foreground/70" : ""}\`} onClick={() => setChecked(false)}>No</span>
    </div>
  )
}`,
  "switch-15": `import { Database } from "lucide-react"

export default function Switch15() {
  return (
    <div className="border-input has-[[data-state=checked]]:border-primary/50 relative flex w-full items-start gap-2 rounded-md border p-4 shadow-xs">
      <Switch
        className="order-1 h-4 w-6 after:absolute after:inset-0 [&_span]:size-3 data-[state=checked]:[&_span]:translate-x-2.5"
        id="switch-backup"
        aria-describedby="switch-backup-description"
      />
      <div className="flex grow items-center gap-3">
        <Database className="size-5 shrink-0" />
        <div className="grid grow gap-2">
          <Label htmlFor="switch-backup">Backup</Label>
          <p id="switch-backup-description" className="text-muted-foreground text-xs">Backup every file from your project.</p>
        </div>
      </div>
    </div>
  )
}`,
  "switch-18": `import { Code, ChartPie, Cpu } from "lucide-react"

export default function Switch18() {
  return (
    <fieldset className="w-full max-w-96 space-y-4">
      <legend className="text-foreground text-sm leading-none font-medium">Switch to your preferred field:</legend>
      <ul className="flex w-full flex-col divide-y rounded-md border">
        {[
          { label: "Web Development", icon: <Code className="size-4" /> },
          { label: "Data Analysis", icon: <ChartPie className="size-4" /> },
          { label: "Machine Learning", icon: <Cpu className="size-4" /> },
        ].map((item) => (
          <li key={item.label}>
            <label className="flex items-center justify-between gap-2 px-5 py-3 text-sm leading-none font-medium cursor-pointer">
              <span className="flex items-center gap-2">{item.icon} {item.label}</span>
              <Switch id={item.label} />
            </label>
          </li>
        ))}
      </ul>
    </fieldset>
  )
}`,
};

function getCode(id: string) {
  return codes[id] || codes["switch-01"]!.replace("Switch01", id.replace("switch-", "Switch"));
}

// --- Variants ---
const variants = [
  { id: "switch-01", title: "Switch 1", preview: <Switch01 /> },
  { id: "switch-02", title: "Switch 2", preview: <Switch02 /> },
  { id: "switch-03", title: "Switch 3", preview: <Switch03 /> },
  { id: "switch-04", title: "Switch 4", preview: <Switch04 /> },
  { id: "switch-05", title: "Switch 5", preview: <Switch05 /> },
  { id: "switch-06", title: "Switch 6", preview: <Switch06 /> },
  { id: "switch-07", title: "Switch 7", preview: <Switch07 /> },
  { id: "switch-08", title: "Switch 8", preview: <Switch08 /> },
  { id: "switch-09", title: "Switch 9", preview: <Switch09 /> },
  { id: "switch-10", title: "Switch 10", preview: <Switch10 /> },
  { id: "switch-11", title: "Switch 11", preview: <Switch11 /> },
  { id: "switch-12", title: "Switch 12", preview: <Switch12 /> },
  { id: "switch-13", title: "Switch 13", preview: <Switch13 /> },
  { id: "switch-14", title: "Switch 14", preview: <Switch14 /> },
  { id: "switch-15", title: "Switch 15", preview: <Switch15 /> },
  { id: "switch-16", title: "Switch 16", preview: <Switch16 /> },
  { id: "switch-17", title: "Switch 17", preview: <Switch17 /> },
  { id: "switch-18", title: "Switch 18", preview: <Switch18 /> },
  { id: "switch-19", title: "Switch 19", preview: <Switch19 /> },
  { id: "switch-20", title: "Switch 20", preview: <Switch20 /> },
];

export default function SwitchPage() {
  return (
    <ComponentLayout>
      {/* Page Header */}
      <div className="mb-4 flex gap-x-8 gap-y-4 max-md:flex-col">
        <div className="space-y-3">
          <h1 className="text-2xl font-bold sm:text-3xl">Shadcn Switch</h1>
          <p className="text-muted-foreground">
            Explore the collection of awesome Shadcn Switch Components, featuring {variants.length} switch
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
          <p className="font-medium">Have any suggestions for Switch variants?</p>
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
