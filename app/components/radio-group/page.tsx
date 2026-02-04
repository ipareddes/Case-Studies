"use client";

import { Label, RadioGroup, RadioGroupItem, Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@ipareddes/ui-components";

import { ComponentLayout } from "@/components/layout/component-layout";
import { useState } from "react";
import { X, Sparkles, Code2, Copy, Check, User, Users } from "lucide-react";
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

// --- Radio Group Variant Previews ---

function RadioGroup01() {
  return (
    <RadioGroup defaultValue="higher-secondary" className="grid gap-3">
      <div className="flex items-center gap-2">
        <RadioGroupItem value="higher-secondary" id="higher-secondary" />
        <Label htmlFor="higher-secondary">Higher Secondary</Label>
      </div>
      <div className="flex items-center gap-2">
        <RadioGroupItem value="graduation" id="graduation" />
        <Label htmlFor="graduation">Graduation</Label>
      </div>
      <div className="flex items-center gap-2">
        <RadioGroupItem value="post-graduation" id="post-graduation" />
        <Label htmlFor="post-graduation">Post Graduation</Label>
      </div>
    </RadioGroup>
  );
}

function RadioGroup02() {
  return (
    <RadioGroup defaultValue="beginner" className="flex items-center gap-4">
      <div className="flex items-center gap-2">
        <RadioGroupItem value="beginner" id="beginner" />
        <Label htmlFor="beginner">Beginner</Label>
      </div>
      <div className="flex items-center gap-2">
        <RadioGroupItem value="intermediate" id="intermediate" />
        <Label htmlFor="intermediate">Intermediate</Label>
      </div>
      <div className="flex items-center gap-2">
        <RadioGroupItem value="advanced" id="advanced" />
        <Label htmlFor="advanced">Advanced</Label>
      </div>
    </RadioGroup>
  );
}

function RadioGroup03() {
  return (
    <RadioGroup defaultValue="destructive" className="flex items-center gap-4">
      <div className="flex items-center gap-2">
        <RadioGroupItem
          value="destructive"
          id="color-destructive"
          className="border-destructive text-destructive [&_svg]:fill-destructive focus-visible:ring-destructive/20 focus-visible:border-destructive"
        />
        <Label htmlFor="color-destructive">Destructive</Label>
      </div>
      <div className="flex items-center gap-2">
        <RadioGroupItem
          value="success"
          id="color-success"
          className="border-green-600 text-green-600 focus-visible:border-green-600 focus-visible:ring-green-600/20 dark:border-green-400 dark:text-green-400 [&_svg]:fill-green-600 dark:[&_svg]:fill-green-400"
        />
        <Label htmlFor="color-success">Success</Label>
      </div>
      <div className="flex items-center gap-2">
        <RadioGroupItem
          value="info"
          id="color-info"
          className="border-sky-600 text-sky-600 focus-visible:border-sky-600 focus-visible:ring-sky-600/20 dark:border-sky-400 dark:text-sky-400 [&_svg]:fill-sky-600 dark:[&_svg]:fill-sky-400"
        />
        <Label htmlFor="color-info">Info</Label>
      </div>
    </RadioGroup>
  );
}

function RadioGroup04() {
  return (
    <RadioGroup defaultValue="default" className="flex items-center gap-4">
      <div className="flex items-center gap-2">
        <RadioGroupItem value="default" id="size-default" />
        <Label htmlFor="size-default">Default</Label>
      </div>
      <div className="flex items-center gap-2">
        <RadioGroupItem value="medium" id="size-medium" className="h-5 w-5 [&_svg]:h-3 [&_svg]:w-3" />
        <Label htmlFor="size-medium">Medium</Label>
      </div>
      <div className="flex items-center gap-2">
        <RadioGroupItem value="large" id="size-large" className="h-6 w-6 [&_svg]:h-3.5 [&_svg]:w-3.5" />
        <Label htmlFor="size-large">Large</Label>
      </div>
    </RadioGroup>
  );
}

function RadioGroup05() {
  return (
    <RadioGroup defaultValue="standard" className="grid gap-3">
      <div className="flex items-center gap-2">
        <RadioGroupItem value="standard" id="standard" className="border-dashed border-primary focus-visible:border-primary" />
        <Label htmlFor="standard">Standard Shipping</Label>
      </div>
      <div className="flex items-center gap-2">
        <RadioGroupItem value="express" id="express" className="border-dashed border-primary focus-visible:border-primary" />
        <Label htmlFor="express">Express Delivery</Label>
      </div>
      <div className="flex items-center gap-2">
        <RadioGroupItem value="overnight" id="overnight" className="border-dashed border-primary focus-visible:border-primary" />
        <Label htmlFor="overnight">Overnight Shipping</Label>
      </div>
    </RadioGroup>
  );
}

function RadioGroup06() {
  return (
    <RadioGroup defaultValue="light" className="grid gap-3">
      <div className="flex items-center gap-2">
        <RadioGroupItem
          value="light"
          id="theme-light"
          className="text-primary-foreground data-[state=checked]:bg-primary data-[state=checked]:border-primary data-[state=checked]:[&_svg]:fill-primary-foreground"
        />
        <Label htmlFor="theme-light">Light Theme</Label>
      </div>
      <div className="flex items-center gap-2">
        <RadioGroupItem
          value="dark"
          id="theme-dark"
          className="text-primary-foreground data-[state=checked]:bg-primary data-[state=checked]:border-primary data-[state=checked]:[&_svg]:fill-primary-foreground"
        />
        <Label htmlFor="theme-dark">Dark Theme</Label>
      </div>
      <div className="flex items-center gap-2">
        <RadioGroupItem
          value="system"
          id="theme-system"
          className="text-primary-foreground data-[state=checked]:bg-primary data-[state=checked]:border-primary data-[state=checked]:[&_svg]:fill-primary-foreground"
        />
        <Label htmlFor="theme-system">System Default</Label>
      </div>
    </RadioGroup>
  );
}

function RadioGroup07() {
  return (
    <RadioGroup defaultValue="basic" className="grid gap-3">
      <div className="flex gap-2">
        <RadioGroupItem value="basic" id="plan-basic" />
        <div className="grid flex-1 space-y-2">
          <Label htmlFor="plan-basic">Basic Plan</Label>
          <p className="text-muted-foreground text-xs">Perfect for individuals just getting started</p>
        </div>
      </div>
      <div className="flex gap-2">
        <RadioGroupItem value="pro" id="plan-pro" />
        <div className="grid flex-1 space-y-2">
          <Label htmlFor="plan-pro">Pro Plan</Label>
          <p className="text-muted-foreground text-xs">Advanced features for power users and small teams</p>
        </div>
      </div>
      <div className="flex gap-2">
        <RadioGroupItem value="enterprise" id="plan-enterprise" />
        <div className="grid flex-1 space-y-2">
          <Label htmlFor="plan-enterprise">Enterprise Plan</Label>
          <p className="text-muted-foreground text-xs">Custom solutions for large organizations</p>
        </div>
      </div>
    </RadioGroup>
  );
}

function RadioGroup08() {
  return (
    <fieldset className="w-full max-w-96 space-y-4">
      <legend className="text-foreground text-sm leading-none font-medium">Select Shoe Size: </legend>
      <RadioGroup defaultValue="1" className="grid grid-cols-3 gap-2">
        {[
          { value: "1", label: "Size: 6 (UK)" },
          { value: "2", label: "Size: 7 (UK)", disabled: true },
          { value: "3", label: "Size: 8 (UK)" },
          { value: "4", label: "Size: 9 (UK)" },
          { value: "5", label: "Size: 10 (UK)", disabled: true },
          { value: "6", label: "Size: 11 (UK)" },
        ].map((item) => (
          <label
            key={item.value}
            className="border-input has-data-[state=checked]:border-primary/80 has-focus-visible:border-ring has-focus-visible:ring-ring/50 relative flex flex-col items-center gap-3 rounded-md border px-2 py-3 text-center shadow-xs outline-none has-focus-visible:ring-[3px] has-data-disabled:cursor-not-allowed has-data-disabled:opacity-50"
          >
            <RadioGroupItem
              value={item.value}
              className="sr-only after:absolute after:inset-0"
              disabled={item.disabled}
            />
            <p className="text-foreground text-sm leading-none font-medium">{item.label}</p>
          </label>
        ))}
      </RadioGroup>
    </fieldset>
  );
}

function RadioGroup09() {
  return (
    <RadioGroup defaultValue="2" className="grid w-full max-w-96 gap-0 -space-y-px rounded-md shadow-xs">
      {[
        { value: "1", label: "Pro", price: "$39/mo" },
        { value: "2", label: "Team", price: "$89/mo" },
        { value: "3", label: "Enterprise", price: "$149/mo" },
      ].map((item) => (
        <div
          key={item.value}
          className="border-input has-data-[state=checked]:border-primary/50 has-data-[state=checked]:bg-accent relative flex flex-col gap-4 border p-4 outline-none first:rounded-t-md last:rounded-b-md has-data-[state=checked]:z-10"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <RadioGroupItem value={item.value} className="after:absolute after:inset-0" />
              <Label className="inline-flex items-center">{item.label}</Label>
            </div>
            <div className="text-muted-foreground text-xs">{item.price}</div>
          </div>
        </div>
      ))}
    </RadioGroup>
  );
}

function RadioGroup10() {
  return (
    <RadioGroup defaultValue="2" className="grid w-full max-w-96 gap-0 space-y-2 rounded-md *:rounded-full">
      {[
        { value: "1", label: "Pro", price: "$39/mo" },
        { value: "2", label: "Team", price: "$89/mo" },
        { value: "3", label: "Enterprise", price: "$149/mo" },
      ].map((item) => (
        <div
          key={item.value}
          className="border-input has-data-[state=checked]:bg-primary has-data-[state=checked]:text-primary-foreground relative flex flex-col gap-4 border p-4 outline-none has-data-[state=checked]:z-10"
        >
          <div className="group flex items-center justify-between">
            <div className="flex items-center gap-2">
              <RadioGroupItem
                value={item.value}
                className="text-primary bg-accent data-[state=checked]:bg-primary-foreground data-[state=checked]:border-primary-foreground data-[state=checked]:[&_svg]:fill-primary after:absolute after:inset-0"
              />
              <Label className="inline-flex items-center">{item.label}</Label>
            </div>
            <div className="group-has-[:checked]:text-primary-foreground text-xs">{item.price}</div>
          </div>
        </div>
      ))}
    </RadioGroup>
  );
}

function RadioGroup11() {
  return (
    <RadioGroup defaultValue="1" className="grid w-full max-w-96 gap-2">
      {[
        { value: "1", label: "Basic", price: "Free", desc: "Get 1 project with 1 teams members." },
        { value: "2", label: "Premium", price: "$19/mo", desc: "Get 5 projects with 5 team members." },
        { value: "3", label: "Business", price: "$49/mo", desc: "Unlimited projects and team members." },
      ].map((item) => (
        <div
          key={item.value}
          className="border-input has-data-[state=checked]:border-primary/50 relative flex w-full items-center gap-2 rounded-md border p-4 shadow-xs outline-none"
        >
          <RadioGroupItem
            value={item.value}
            className="h-5 w-5 after:absolute after:inset-0 [&_svg]:h-3 [&_svg]:w-3"
          />
          <div className="grid grow gap-2">
            <Label className="flex items-center justify-between">
              {item.label}
              <span className="text-muted-foreground text-xs font-normal">{item.price}</span>
            </Label>
            <p className="text-muted-foreground text-xs">{item.desc}</p>
          </div>
        </div>
      ))}
    </RadioGroup>
  );
}

function RadioGroup12() {
  return (
    <RadioGroup defaultValue="1" className="grid w-full max-w-96 gap-2">
      {[
        { value: "1", label: "Basic", price: "Free", desc: "Get 1 project with 1 teams members." },
        { value: "2", label: "Premium", price: "$19/mo", desc: "Get 5 projects with 5 team members." },
        { value: "3", label: "Business", price: "$49/mo", desc: "Unlimited projects and team members." },
      ].map((item) => (
        <div
          key={item.value}
          className="border-input has-data-[state=checked]:border-primary/50 has-focus-visible:border-ring has-focus-visible:ring-ring/50 relative w-full rounded-md border p-3 shadow-xs transition-[color,box-shadow] outline-none has-focus-visible:ring-[3px]"
        >
          <RadioGroupItem value={item.value} className="sr-only" />
          <label className="text-foreground flex flex-col items-start after:absolute after:inset-0 cursor-pointer">
            <div className="flex w-full items-center justify-between">
              <span className="text-sm font-medium">{item.label}</span>
              <span className="text-muted-foreground text-xs font-normal">{item.price}</span>
            </div>
            <p className="text-muted-foreground text-xs">{item.desc}</p>
          </label>
        </div>
      ))}
    </RadioGroup>
  );
}

function RadioGroup13() {
  return (
    <RadioGroup defaultValue="1" className="grid gap-3 w-full max-w-96 justify-items-center sm:grid-cols-2">
      {[
        { value: "1", label: "Basic", desc: "Get 1 project with 1 teams members.", icon: <User className="h-6 w-6" /> },
        { value: "2", label: "Premium", desc: "Get 5 projects with 5 team members.", icon: <Users className="h-6 w-6" /> },
      ].map((item) => (
        <div
          key={item.value}
          className="border-input has-data-[state=checked]:border-primary/50 relative flex w-full max-w-50 flex-col items-center gap-3 rounded-md border p-4 shadow-xs outline-none"
        >
          <RadioGroupItem
            value={item.value}
            className="order-1 h-5 w-5 after:absolute after:inset-0 [&_svg]:h-3 [&_svg]:w-3"
          />
          <div className="grid grow justify-items-center gap-2">
            {item.icon}
            <Label className="flex items-center justify-center">{item.label}</Label>
            <p className="text-muted-foreground text-center text-xs">{item.desc}</p>
          </div>
        </div>
      ))}
    </RadioGroup>
  );
}

function RadioGroup14() {
  return (
    <RadioGroup defaultValue="realtime" className="grid gap-3">
      <div className="flex items-center gap-2">
        <RadioGroupItem value="realtime" id="notifications-realtime" className="h-5 w-5 [&_svg]:h-3 [&_svg]:w-3" />
        <Label htmlFor="notifications-realtime">Real-time</Label>
      </div>
      <div className="flex items-center gap-2">
        <RadioGroupItem value="daily" id="notifications-daily" className="h-5 w-5 [&_svg]:h-3 [&_svg]:w-3" />
        <Label htmlFor="notifications-daily">Daily Digest</Label>
      </div>
      <div className="flex items-center gap-2">
        <RadioGroupItem value="weekly" id="notifications-weekly" className="h-5 w-5 [&_svg]:h-3 [&_svg]:w-3" />
        <Label htmlFor="notifications-weekly">Weekly Summary</Label>
      </div>
    </RadioGroup>
  );
}

function RadioGroup15() {
  return (
    <RadioGroup defaultValue="english" className="grid gap-3">
      <div className="flex items-center gap-2">
        <RadioGroupItem
          value="english"
          id="lang-english"
          className="data-[state=checked]:bg-primary data-[state=checked]:border-primary data-[state=checked]:[&_svg]:fill-primary-foreground text-primary-foreground"
        />
        <Label htmlFor="lang-english">English</Label>
      </div>
      <div className="flex items-center gap-2">
        <RadioGroupItem
          value="spanish"
          id="lang-spanish"
          className="data-[state=checked]:bg-primary data-[state=checked]:border-primary data-[state=checked]:[&_svg]:fill-primary-foreground text-primary-foreground"
        />
        <Label htmlFor="lang-spanish">Espanol</Label>
      </div>
      <div className="flex items-center gap-2">
        <RadioGroupItem
          value="french"
          id="lang-french"
          className="data-[state=checked]:bg-primary data-[state=checked]:border-primary data-[state=checked]:[&_svg]:fill-primary-foreground text-primary-foreground"
        />
        <Label htmlFor="lang-french">Francais</Label>
      </div>
    </RadioGroup>
  );
}

// --- Code strings ---
const codes: Record<string, string> = {
  "radio-group-01": `
export default function RadioGroup01() {
  return (
    <RadioGroup defaultValue="higher-secondary" className="grid gap-3">
      <div className="flex items-center gap-2">
        <RadioGroupItem value="higher-secondary" id="higher-secondary" />
        <Label htmlFor="higher-secondary">Higher Secondary</Label>
      </div>
      <div className="flex items-center gap-2">
        <RadioGroupItem value="graduation" id="graduation" />
        <Label htmlFor="graduation">Graduation</Label>
      </div>
      <div className="flex items-center gap-2">
        <RadioGroupItem value="post-graduation" id="post-graduation" />
        <Label htmlFor="post-graduation">Post Graduation</Label>
      </div>
    </RadioGroup>
  )
}`,
  "radio-group-02": `
export default function RadioGroup02() {
  return (
    <RadioGroup defaultValue="beginner" className="flex items-center gap-4">
      <div className="flex items-center gap-2">
        <RadioGroupItem value="beginner" id="beginner" />
        <Label htmlFor="beginner">Beginner</Label>
      </div>
      <div className="flex items-center gap-2">
        <RadioGroupItem value="intermediate" id="intermediate" />
        <Label htmlFor="intermediate">Intermediate</Label>
      </div>
      <div className="flex items-center gap-2">
        <RadioGroupItem value="advanced" id="advanced" />
        <Label htmlFor="advanced">Advanced</Label>
      </div>
    </RadioGroup>
  )
}`,
  "radio-group-03": `
export default function RadioGroup03() {
  return (
    <RadioGroup defaultValue="destructive" className="flex items-center gap-4">
      <div className="flex items-center gap-2">
        <RadioGroupItem
          value="destructive"
          id="color-destructive"
          className="border-destructive text-destructive [&_svg]:fill-destructive focus-visible:ring-destructive/20 focus-visible:border-destructive"
        />
        <Label htmlFor="color-destructive">Destructive</Label>
      </div>
      <div className="flex items-center gap-2">
        <RadioGroupItem
          value="success"
          id="color-success"
          className="border-green-600 text-green-600 focus-visible:border-green-600 focus-visible:ring-green-600/20 dark:border-green-400 dark:text-green-400 [&_svg]:fill-green-600 dark:[&_svg]:fill-green-400"
        />
        <Label htmlFor="color-success">Success</Label>
      </div>
      <div className="flex items-center gap-2">
        <RadioGroupItem
          value="info"
          id="color-info"
          className="border-sky-600 text-sky-600 focus-visible:border-sky-600 focus-visible:ring-sky-600/20 dark:border-sky-400 dark:text-sky-400 [&_svg]:fill-sky-600 dark:[&_svg]:fill-sky-400"
        />
        <Label htmlFor="color-info">Info</Label>
      </div>
    </RadioGroup>
  )
}`,
  "radio-group-07": `
export default function RadioGroup07() {
  return (
    <RadioGroup defaultValue="basic" className="grid gap-3">
      <div className="flex gap-2">
        <RadioGroupItem value="basic" id="plan-basic" />
        <div className="grid flex-1 space-y-2">
          <Label htmlFor="plan-basic">Basic Plan</Label>
          <p className="text-muted-foreground text-xs">Perfect for individuals just getting started</p>
        </div>
      </div>
      <div className="flex gap-2">
        <RadioGroupItem value="pro" id="plan-pro" />
        <div className="grid flex-1 space-y-2">
          <Label htmlFor="plan-pro">Pro Plan</Label>
          <p className="text-muted-foreground text-xs">Advanced features for power users and small teams</p>
        </div>
      </div>
      <div className="flex gap-2">
        <RadioGroupItem value="enterprise" id="plan-enterprise" />
        <div className="grid flex-1 space-y-2">
          <Label htmlFor="plan-enterprise">Enterprise Plan</Label>
          <p className="text-muted-foreground text-xs">Custom solutions for large organizations</p>
        </div>
      </div>
    </RadioGroup>
  )
}`,
  "radio-group-09": `
export default function RadioGroup09() {
  return (
    <RadioGroup defaultValue="2" className="grid w-full max-w-96 gap-0 -space-y-px rounded-md shadow-xs">
      {[
        { value: "1", label: "Pro", price: "$39/mo" },
        { value: "2", label: "Team", price: "$89/mo" },
        { value: "3", label: "Enterprise", price: "$149/mo" },
      ].map((item) => (
        <div
          key={item.value}
          className="border-input has-data-[state=checked]:border-primary/50 has-data-[state=checked]:bg-accent relative flex flex-col gap-4 border p-4 outline-none first:rounded-t-md last:rounded-b-md has-data-[state=checked]:z-10"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <RadioGroupItem value={item.value} className="after:absolute after:inset-0" />
              <Label>{item.label}</Label>
            </div>
            <div className="text-muted-foreground text-xs">{item.price}</div>
          </div>
        </div>
      ))}
    </RadioGroup>
  )
}`,
  "radio-group-11": `
export default function RadioGroup11() {
  return (
    <RadioGroup defaultValue="1" className="grid w-full max-w-96 gap-2">
      {[
        { value: "1", label: "Basic", price: "Free", desc: "Get 1 project with 1 teams members." },
        { value: "2", label: "Premium", price: "$19/mo", desc: "Get 5 projects with 5 team members." },
        { value: "3", label: "Business", price: "$49/mo", desc: "Unlimited projects and team members." },
      ].map((item) => (
        <div
          key={item.value}
          className="border-input has-data-[state=checked]:border-primary/50 relative flex w-full items-center gap-2 rounded-md border p-4 shadow-xs outline-none"
        >
          <RadioGroupItem
            value={item.value}
            className="h-5 w-5 after:absolute after:inset-0 [&_svg]:h-3 [&_svg]:w-3"
          />
          <div className="grid grow gap-2">
            <Label className="flex items-center justify-between">
              {item.label}
              <span className="text-muted-foreground text-xs font-normal">{item.price}</span>
            </Label>
            <p className="text-muted-foreground text-xs">{item.desc}</p>
          </div>
        </div>
      ))}
    </RadioGroup>
  )
}`,
};

function getCode(id: string) {
  return codes[id] || codes["radio-group-01"]!.replace("RadioGroup01", id.replace("radio-group-", "RadioGroup"));
}

// --- Variants ---
const variants = [
  { id: "radio-group-01", title: "Radio Group 1", preview: <RadioGroup01 /> },
  { id: "radio-group-02", title: "Radio Group 2", preview: <RadioGroup02 /> },
  { id: "radio-group-03", title: "Radio Group 3", preview: <RadioGroup03 /> },
  { id: "radio-group-04", title: "Radio Group 4", preview: <RadioGroup04 /> },
  { id: "radio-group-05", title: "Radio Group 5", preview: <RadioGroup05 /> },
  { id: "radio-group-06", title: "Radio Group 6", preview: <RadioGroup06 /> },
  { id: "radio-group-07", title: "Radio Group 7", preview: <RadioGroup07 /> },
  { id: "radio-group-08", title: "Radio Group 8", preview: <RadioGroup08 /> },
  { id: "radio-group-09", title: "Radio Group 9", preview: <RadioGroup09 /> },
  { id: "radio-group-10", title: "Radio Group 10", preview: <RadioGroup10 /> },
  { id: "radio-group-11", title: "Radio Group 11", preview: <RadioGroup11 /> },
  { id: "radio-group-12", title: "Radio Group 12", preview: <RadioGroup12 /> },
  { id: "radio-group-13", title: "Radio Group 13", preview: <RadioGroup13 /> },
  { id: "radio-group-14", title: "Radio Group 14", preview: <RadioGroup14 /> },
  { id: "radio-group-15", title: "Radio Group 15", preview: <RadioGroup15 /> },
];

export default function RadioGroupPage() {
  return (
    <ComponentLayout>
      {/* Page Header */}
      <div className="mb-4 flex gap-x-8 gap-y-4 max-md:flex-col">
        <div className="space-y-3">
          <h1 className="text-2xl font-bold sm:text-3xl">Shadcn Radio Group</h1>
          <p className="text-muted-foreground">
            Explore the collection of awesome Shadcn Radio Group Components, featuring {variants.length} radio group
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
          <p className="font-medium">Have any suggestions for Radio Group variants?</p>
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
