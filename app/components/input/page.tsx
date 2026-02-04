"use client";

import { Button, Input, Label, Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@ipareddes/ui-components";

import { ComponentLayout } from "@/components/layout/component-layout";
import { useState } from "react";
import { X, Sparkles, Code2, Copy, Check, User, Mail, Eye, EyeOff, Search, SendHorizontal, Download } from "lucide-react";
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

// --- Input Variant Previews ---

function Input01() {
  return (
    <Input type="email" placeholder="Email address" className="max-w-xs" />
  );
}

function Input02() {
  return (
    <div className="w-full max-w-xs space-y-2">
      <Label htmlFor="input-02">Input with label</Label>
      <Input id="input-02" type="email" placeholder="Email address" />
    </div>
  );
}

function Input03() {
  return (
    <div className="w-full max-w-xs space-y-2">
      <Label htmlFor="input-03" className="gap-1">
        Required input <span className="text-destructive">*</span>
      </Label>
      <Input id="input-03" type="email" placeholder="Email address" required />
    </div>
  );
}

function Input04() {
  return (
    <div className="w-full max-w-xs space-y-2">
      <Label htmlFor="input-04">Disabled input</Label>
      <Input id="input-04" type="email" placeholder="Email address" disabled />
    </div>
  );
}

function Input05() {
  return (
    <div className="w-full max-w-xs space-y-2">
      <Label htmlFor="input-05">Read-only input</Label>
      <Input id="input-05" type="email" placeholder="Email address" readOnly defaultValue="example@xyz.com" className="read-only:bg-muted" />
    </div>
  );
}

function Input06() {
  return (
    <div className="w-full max-w-xs space-y-2">
      <Input type="text" placeholder="Small input" className="h-8" />
      <Input type="text" placeholder="Medium input" />
      <Input type="text" placeholder="Large input" className="h-12" />
    </div>
  );
}

function Input07() {
  return (
    <div className="w-full max-w-xs space-y-2">
      <Label htmlFor="input-07">Input with default value</Label>
      <Input id="input-07" type="email" placeholder="Email address" defaultValue="example@email.com" />
    </div>
  );
}

function Input08() {
  return (
    <div className="w-full max-w-xs space-y-2">
      <Label htmlFor="input-08">Rounded input</Label>
      <Input id="input-08" type="email" placeholder="Email address" className="rounded-full" />
    </div>
  );
}

function Input09() {
  return (
    <div className="w-full max-w-xs space-y-2">
      <Label htmlFor="input-09">Input with helper text</Label>
      <Input id="input-09" type="email" placeholder="Email address" />
      <p className="text-muted-foreground text-xs">We&apos;ll never share your email with anyone else.</p>
    </div>
  );
}

function Input10() {
  return (
    <div className="w-full max-w-xs space-y-2">
      <Label htmlFor="input-10">Input with end helper text</Label>
      <Input id="input-10" type="email" placeholder="Email address" />
      <p className="text-muted-foreground text-end text-xs">We&apos;ll never share your email with anyone else.</p>
    </div>
  );
}

function Input11() {
  return (
    <div className="w-full max-w-xs space-y-2">
      <div className="flex items-center justify-between gap-1">
        <Label htmlFor="input-11">Input with hint text</Label>
        <span className="text-muted-foreground text-xs">Optional field</span>
      </div>
      <Input id="input-11" type="email" placeholder="Email address" />
    </div>
  );
}

function Input12() {
  return (
    <div className="w-full max-w-xs space-y-2">
      <Label htmlFor="input-12">Input with error</Label>
      <Input id="input-12" type="email" placeholder="Email address" aria-invalid="true" defaultValue="invalid@email.com" className="peer" />
      <p className="text-muted-foreground peer-aria-invalid:text-destructive text-xs">This email is invalid.</p>
    </div>
  );
}

function Input13() {
  return (
    <div className="w-full max-w-xs space-y-2">
      <Label htmlFor="input-13">Input with colored ring</Label>
      <Input id="input-13" type="email" placeholder="Email address" className="focus-visible:border-indigo-500 focus-visible:ring-indigo-500/20 dark:focus-visible:ring-indigo-500/40" />
    </div>
  );
}

function Input14() {
  return (
    <div className="w-full max-w-xs space-y-2">
      <Label htmlFor="input-14">Input with start icon</Label>
      <div className="relative">
        <div className="text-muted-foreground pointer-events-none absolute inset-y-0 left-0 flex items-center justify-center pl-3">
          <User className="size-4" />
        </div>
        <Input id="input-14" type="text" placeholder="Username" className="pl-9" />
      </div>
    </div>
  );
}

function Input15() {
  return (
    <div className="w-full max-w-xs space-y-2">
      <Label htmlFor="input-15">Input with end icon</Label>
      <div className="relative">
        <Input id="input-15" type="email" placeholder="Email address" className="pr-9" />
        <div className="text-muted-foreground pointer-events-none absolute inset-y-0 right-0 flex items-center justify-center pr-3">
          <Mail className="size-4" />
        </div>
      </div>
    </div>
  );
}

function Input16() {
  return (
    <div className="w-full max-w-xs space-y-2">
      <Label htmlFor="input-16">Input with start text add-on</Label>
      <div className="relative">
        <Input id="input-16" type="text" placeholder="shadcnstudio.com" className="pl-[4.25rem]" />
        <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center justify-center pl-3 text-sm text-muted-foreground">https://</span>
      </div>
    </div>
  );
}

function Input17() {
  return (
    <div className="w-full max-w-xs space-y-2">
      <Label htmlFor="input-17">Input with end text add-on</Label>
      <div className="relative">
        <Input id="input-17" type="text" placeholder="shadcnstudio" className="pr-12" />
        <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center justify-center pr-3 text-sm text-muted-foreground">.com</span>
      </div>
    </div>
  );
}

function Input18() {
  return (
    <div className="w-full max-w-xs space-y-2">
      <Label htmlFor="input-18">Input with text add-ons</Label>
      <div className="relative">
        <Input id="input-18" type="text" placeholder="shadcnstudio" className="pl-[4.25rem] pr-12" />
        <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center justify-center pl-3 text-sm text-muted-foreground">https://</span>
        <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center justify-center pr-3 text-sm text-muted-foreground">.com</span>
      </div>
    </div>
  );
}

function Input19() {
  return (
    <div className="w-full max-w-xs space-y-2">
      <Label htmlFor="input-19">Input with start add-on</Label>
      <div className="flex rounded-md shadow-xs">
        <span className="border-input bg-background text-muted-foreground -z-[1] inline-flex items-center rounded-l-md border px-3 text-sm">https://</span>
        <Input id="input-19" type="text" placeholder="shadcnstudio.com" className="-ms-px rounded-l-none shadow-none" />
      </div>
    </div>
  );
}

function Input20() {
  return (
    <div className="w-full max-w-xs space-y-2">
      <Label htmlFor="input-20">Input with end add-on</Label>
      <div className="flex rounded-md shadow-xs">
        <Input id="input-20" type="text" placeholder="shadcnstudio" className="-me-px rounded-r-none shadow-none" />
        <span className="border-input bg-background text-muted-foreground -z-[1] inline-flex items-center rounded-r-md border px-3 text-sm">.com</span>
      </div>
    </div>
  );
}

function Input21() {
  return (
    <div className="w-full max-w-xs space-y-2">
      <Label htmlFor="input-21">Input with add-ons</Label>
      <div className="flex rounded-md shadow-xs">
        <span className="border-input bg-background text-muted-foreground -z-[1] inline-flex items-center rounded-l-md border px-3 text-sm">https://</span>
        <Input id="input-21" type="text" placeholder="shadcnstudio" className="-mx-px rounded-none shadow-none" />
        <span className="border-input bg-background text-muted-foreground -z-[1] inline-flex items-center rounded-r-md border px-3 text-sm">.com</span>
      </div>
    </div>
  );
}

function Input22() {
  return (
    <div className="w-full max-w-xs space-y-2">
      <Label htmlFor="input-22">Filled input</Label>
      <Input id="input-22" type="email" placeholder="Email address" className="bg-muted border-transparent shadow-none" />
    </div>
  );
}

function Input23() {
  return (
    <div className="group relative w-full max-w-xs">
      <label htmlFor="input-23" className="bg-background text-foreground absolute top-0 left-2 z-[1] block -translate-y-1/2 px-1 text-xs font-medium">
        Input with overlapping label
      </label>
      <Input id="input-23" type="email" placeholder="Email address" className="h-10" />
    </div>
  );
}

function Input24() {
  return (
    <div className="group relative w-full max-w-xs">
      <label
        htmlFor="input-24"
        className="origin-start text-muted-foreground group-focus-within:text-foreground has-[+input:not(:placeholder-shown)]:text-foreground absolute top-1/2 block -translate-y-1/2 cursor-text px-2 text-sm transition-all group-focus-within:pointer-events-none group-focus-within:top-0 group-focus-within:cursor-default group-focus-within:text-xs group-focus-within:font-medium has-[+input:not(:placeholder-shown)]:pointer-events-none has-[+input:not(:placeholder-shown)]:top-0 has-[+input:not(:placeholder-shown)]:cursor-default has-[+input:not(:placeholder-shown)]:text-xs has-[+input:not(:placeholder-shown)]:font-medium"
      >
        <span className="bg-background inline-flex px-1">Input with floating label</span>
      </label>
      <Input id="input-24" type="email" placeholder=" " />
    </div>
  );
}

function Input25() {
  return (
    <div className="border-input bg-background focus-within:border-ring focus-within:ring-ring/50 relative w-full max-w-xs rounded-md border shadow-xs transition-[color,box-shadow] outline-none focus-within:ring-[3px]">
      <label htmlFor="input-25" className="text-foreground block px-3 pt-1 text-xs font-medium">
        Input with inset label
      </label>
      <input
        id="input-25"
        type="email"
        placeholder="Email address"
        className="text-foreground placeholder:text-muted-foreground flex h-9 w-full bg-transparent px-3 pb-1 text-sm focus-visible:outline-none"
      />
    </div>
  );
}

function Input26() {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className="w-full max-w-xs space-y-2">
      <Label htmlFor="input-26">Password input</Label>
      <div className="relative">
        <Input id="input-26" type={showPassword ? "text" : "password"} placeholder="Password" className="pr-9" />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute inset-y-0 right-0 flex items-center justify-center pr-3 text-muted-foreground hover:text-foreground"
        >
          {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
          <span className="sr-only">{showPassword ? "Hide password" : "Show password"}</span>
        </button>
      </div>
    </div>
  );
}

function Input27() {
  return (
    <div className="w-full max-w-xs space-y-2">
      <Label htmlFor="input-27">File input</Label>
      <Input
        id="input-27"
        type="file"
        className="text-muted-foreground file:border-input file:text-foreground p-0 pr-3 italic file:mr-3 file:h-full file:border-0 file:border-r file:border-solid file:bg-transparent file:px-3 file:text-sm file:font-medium file:not-italic"
      />
    </div>
  );
}

function Input28() {
  return (
    <div className="w-full max-w-xs space-y-2">
      <Label htmlFor="input-28">Input with start select</Label>
      <div className="flex rounded-md shadow-xs">
        <select className="border-input bg-background text-muted-foreground rounded-l-md border px-3 text-sm outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]">
          <option>https://</option>
          <option>http://</option>
        </select>
        <Input id="input-28" type="text" placeholder="shadcnstudio.com" className="-ms-px rounded-l-none shadow-none" />
      </div>
    </div>
  );
}

function Input29() {
  return (
    <div className="w-full max-w-xs space-y-2">
      <Label htmlFor="input-29">Input with end select</Label>
      <div className="flex rounded-md shadow-xs">
        <Input id="input-29" type="text" placeholder="shadcnstudio" className="-me-px rounded-r-none shadow-none" />
        <select className="border-input bg-background text-muted-foreground rounded-r-md border px-3 text-sm outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]">
          <option>.com</option>
          <option>.org</option>
          <option>.net</option>
        </select>
      </div>
    </div>
  );
}

function Input30() {
  return (
    <div className="w-full max-w-xs space-y-2">
      <Label htmlFor="input-30">Input with button</Label>
      <div className="flex gap-2">
        <Input id="input-30" type="email" placeholder="Email address" />
        <Button type="submit">Subscribe</Button>
      </div>
    </div>
  );
}

function Input31() {
  return (
    <div className="w-full max-w-xs space-y-2">
      <Label htmlFor="input-31">Input with end inline button</Label>
      <div className="relative">
        <Input id="input-31" type="email" placeholder="Email address" className="pr-9" />
        <button className="absolute inset-y-0 right-0 flex items-center justify-center px-3 text-muted-foreground hover:text-foreground">
          <SendHorizontal className="size-4" />
          <span className="sr-only">Subscribe</span>
        </button>
      </div>
    </div>
  );
}

function Input32() {
  return (
    <div className="w-full max-w-xs space-y-2">
      <Label htmlFor="input-32">Input with icon button</Label>
      <div className="flex rounded-md shadow-xs">
        <Input id="input-32" type="email" placeholder="Email address" className="-me-px rounded-r-none shadow-none focus-visible:z-[1]" />
        <Button variant="outline" size="icon" className="rounded-l-none">
          <Download className="size-4" />
          <span className="sr-only">Download</span>
        </Button>
      </div>
    </div>
  );
}

function Input33() {
  return (
    <div className="w-full max-w-xs space-y-2">
      <Label htmlFor="input-33">Input with end button</Label>
      <div className="flex rounded-md shadow-xs">
        <Input id="input-33" type="email" placeholder="Email address" className="-me-px rounded-r-none shadow-none focus-visible:z-[1]" />
        <Button className="rounded-l-none">Subscribe</Button>
      </div>
    </div>
  );
}

function Input34() {
  const [value, setValue] = useState("");
  const maxLength = 50;
  return (
    <div className="w-full max-w-xs space-y-2">
      <Label htmlFor="input-34">Input with character limit</Label>
      <div className="relative">
        <Input
          id="input-34"
          type="text"
          placeholder="Username"
          maxLength={maxLength}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="pr-14"
        />
        <span className="text-muted-foreground pointer-events-none absolute inset-y-0 right-0 flex items-center justify-center pr-3 text-xs tabular-nums">
          {value.length}/{maxLength}
        </span>
      </div>
    </div>
  );
}

function Input35() {
  const [value, setValue] = useState("");
  const maxLength = 12;
  return (
    <div className="w-full max-w-xs space-y-2">
      <Label htmlFor="input-35">Input with characters left</Label>
      <Input
        id="input-35"
        type="text"
        placeholder="Username"
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

function Input36() {
  return (
    <div className="w-full max-w-xs space-y-2">
      <Label htmlFor="input-36">Search input</Label>
      <div className="relative">
        <div className="text-muted-foreground pointer-events-none absolute inset-y-0 left-0 flex items-center justify-center pl-3">
          <Search className="size-4" />
        </div>
        <Input id="input-36" type="search" placeholder="Search..." className="pl-9" />
      </div>
    </div>
  );
}

function Input37() {
  return (
    <div className="w-full max-w-xs space-y-2">
      <Label htmlFor="input-37">Underlined input</Label>
      <Input
        id="input-37"
        type="email"
        placeholder="Email address"
        className="rounded-none border-0 border-b shadow-none focus-visible:ring-0 focus-visible:border-primary"
      />
    </div>
  );
}

function Input38() {
  return (
    <div className="w-full max-w-xs space-y-2">
      <Label htmlFor="input-38">Ghost input</Label>
      <Input
        id="input-38"
        type="email"
        placeholder="Email address"
        className="border-transparent shadow-none hover:border-input focus-visible:border-input"
      />
    </div>
  );
}

function Input39() {
  return (
    <div className="w-full max-w-xs space-y-2">
      <Label htmlFor="input-39">Input with start icon and button</Label>
      <div className="relative">
        <div className="text-muted-foreground pointer-events-none absolute inset-y-0 left-0 flex items-center justify-center pl-3">
          <Mail className="size-4" />
        </div>
        <Input id="input-39" type="email" placeholder="Email address" className="pl-9 pr-24" />
        <Button size="sm" className="absolute inset-y-1 right-1 h-auto px-3">
          Subscribe
        </Button>
      </div>
    </div>
  );
}

function Input40() {
  return (
    <div className="w-full max-w-xs space-y-2">
      <Label htmlFor="input-40">Number input</Label>
      <Input id="input-40" type="number" placeholder="0" min={0} max={100} className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" />
    </div>
  );
}

// --- Code strings ---
const codes: Record<string, string> = {
  "input-01": `
export default function Input01() {
  return (
    <Input type="email" placeholder="Email address" className="max-w-xs" />
  )
}`,
  "input-02": `
export default function Input02() {
  return (
    <div className="w-full max-w-xs space-y-2">
      <Label htmlFor="input-02">Input with label</Label>
      <Input id="input-02" type="email" placeholder="Email address" />
    </div>
  )
}`,
  "input-03": `
export default function Input03() {
  return (
    <div className="w-full max-w-xs space-y-2">
      <Label htmlFor="input-03" className="gap-1">
        Required input <span className="text-destructive">*</span>
      </Label>
      <Input id="input-03" type="email" placeholder="Email address" required />
    </div>
  )
}`,
  "input-12": `
export default function Input12() {
  return (
    <div className="w-full max-w-xs space-y-2">
      <Label htmlFor="input-12">Input with error</Label>
      <Input id="input-12" type="email" placeholder="Email address" aria-invalid="true" defaultValue="invalid@email.com" className="peer" />
      <p className="text-muted-foreground peer-aria-invalid:text-destructive text-xs">This email is invalid.</p>
    </div>
  )
}`,
  "input-14": `import { User } from "lucide-react"

export default function Input14() {
  return (
    <div className="w-full max-w-xs space-y-2">
      <Label htmlFor="input-14">Input with start icon</Label>
      <div className="relative">
        <div className="text-muted-foreground pointer-events-none absolute inset-y-0 left-0 flex items-center justify-center pl-3">
          <User className="size-4" />
        </div>
        <Input id="input-14" type="text" placeholder="Username" className="pl-9" />
      </div>
    </div>
  )
}`,
  "input-19": `
export default function Input19() {
  return (
    <div className="w-full max-w-xs space-y-2">
      <Label htmlFor="input-19">Input with start add-on</Label>
      <div className="flex rounded-md shadow-xs">
        <span className="border-input bg-background text-muted-foreground -z-[1] inline-flex items-center rounded-l-md border px-3 text-sm">https://</span>
        <Input id="input-19" type="text" placeholder="shadcnstudio.com" className="-ms-px rounded-l-none shadow-none" />
      </div>
    </div>
  )
}`,
  "input-26": `"use client"

import { Eye, EyeOff } from "lucide-react"
import { useState } from "react"

export default function Input26() {
  const [showPassword, setShowPassword] = useState(false)
  return (
    <div className="w-full max-w-xs space-y-2">
      <Label htmlFor="input-26">Password input</Label>
      <div className="relative">
        <Input id="input-26" type={showPassword ? "text" : "password"} placeholder="Password" className="pr-9" />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute inset-y-0 right-0 flex items-center justify-center pr-3 text-muted-foreground hover:text-foreground"
        >
          {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
        </button>
      </div>
    </div>
  )
}`,
  "input-30": `
export default function Input30() {
  return (
    <div className="w-full max-w-xs space-y-2">
      <Label htmlFor="input-30">Input with button</Label>
      <div className="flex gap-2">
        <Input id="input-30" type="email" placeholder="Email address" />
        <Button type="submit">Subscribe</Button>
      </div>
    </div>
  )
}`,
  "input-33": `
export default function Input33() {
  return (
    <div className="w-full max-w-xs space-y-2">
      <Label htmlFor="input-33">Input with end button</Label>
      <div className="flex rounded-md shadow-xs">
        <Input id="input-33" type="email" placeholder="Email address" className="-me-px rounded-r-none shadow-none focus-visible:z-[1]" />
        <Button className="rounded-l-none">Subscribe</Button>
      </div>
    </div>
  )
}`,
  "input-34": `"use client"

import { useState } from "react"

export default function Input34() {
  const [value, setValue] = useState("")
  const maxLength = 50
  return (
    <div className="w-full max-w-xs space-y-2">
      <Label htmlFor="input-34">Input with character limit</Label>
      <div className="relative">
        <Input
          id="input-34"
          type="text"
          placeholder="Username"
          maxLength={maxLength}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="pr-14"
        />
        <span className="text-muted-foreground pointer-events-none absolute inset-y-0 right-0 flex items-center justify-center pr-3 text-xs tabular-nums">
          {value.length}/{maxLength}
        </span>
      </div>
    </div>
  )
}`,
};

function getCode(id: string) {
  return codes[id] || codes["input-01"]!.replace("Input01", id.replace("input-", "Input"));
}

// --- Variants ---
const variants = [
  { id: "input-01", title: "Input 1", preview: <Input01 /> },
  { id: "input-02", title: "Input 2", preview: <Input02 /> },
  { id: "input-03", title: "Input 3", preview: <Input03 /> },
  { id: "input-04", title: "Input 4", preview: <Input04 /> },
  { id: "input-05", title: "Input 5", preview: <Input05 /> },
  { id: "input-06", title: "Input 6", preview: <Input06 /> },
  { id: "input-07", title: "Input 7", preview: <Input07 /> },
  { id: "input-08", title: "Input 8", preview: <Input08 /> },
  { id: "input-09", title: "Input 9", preview: <Input09 /> },
  { id: "input-10", title: "Input 10", preview: <Input10 /> },
  { id: "input-11", title: "Input 11", preview: <Input11 /> },
  { id: "input-12", title: "Input 12", preview: <Input12 /> },
  { id: "input-13", title: "Input 13", preview: <Input13 /> },
  { id: "input-14", title: "Input 14", preview: <Input14 /> },
  { id: "input-15", title: "Input 15", preview: <Input15 /> },
  { id: "input-16", title: "Input 16", preview: <Input16 /> },
  { id: "input-17", title: "Input 17", preview: <Input17 /> },
  { id: "input-18", title: "Input 18", preview: <Input18 /> },
  { id: "input-19", title: "Input 19", preview: <Input19 /> },
  { id: "input-20", title: "Input 20", preview: <Input20 /> },
  { id: "input-21", title: "Input 21", preview: <Input21 /> },
  { id: "input-22", title: "Input 22", preview: <Input22 /> },
  { id: "input-23", title: "Input 23", preview: <Input23 /> },
  { id: "input-24", title: "Input 24", preview: <Input24 /> },
  { id: "input-25", title: "Input 25", preview: <Input25 /> },
  { id: "input-26", title: "Input 26", preview: <Input26 /> },
  { id: "input-27", title: "Input 27", preview: <Input27 /> },
  { id: "input-28", title: "Input 28", preview: <Input28 /> },
  { id: "input-29", title: "Input 29", preview: <Input29 /> },
  { id: "input-30", title: "Input 30", preview: <Input30 /> },
  { id: "input-31", title: "Input 31", preview: <Input31 /> },
  { id: "input-32", title: "Input 32", preview: <Input32 /> },
  { id: "input-33", title: "Input 33", preview: <Input33 /> },
  { id: "input-34", title: "Input 34", preview: <Input34 /> },
  { id: "input-35", title: "Input 35", preview: <Input35 /> },
  { id: "input-36", title: "Input 36", preview: <Input36 /> },
  { id: "input-37", title: "Input 37", preview: <Input37 /> },
  { id: "input-38", title: "Input 38", preview: <Input38 /> },
  { id: "input-39", title: "Input 39", preview: <Input39 /> },
  { id: "input-40", title: "Input 40", preview: <Input40 /> },
];

export default function InputPage() {
  return (
    <ComponentLayout>
      {/* Page Header */}
      <div className="mb-4 flex gap-x-8 gap-y-4 max-md:flex-col">
        <div className="space-y-3">
          <h1 className="text-2xl font-bold sm:text-3xl">Shadcn Input</h1>
          <p className="text-muted-foreground">
            Explore the collection of awesome Shadcn Input Components, featuring {variants.length} input
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
          <p className="font-medium">Have any suggestions for Input variants?</p>
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
