"use client";

import { Label, Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectSeparator, SelectTrigger, SelectValue, Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@ipareddes/ui-components";

import { ComponentLayout } from "@/components/layout/component-layout";
import { useState } from "react";
import { X, Sparkles, Code2, Copy, Check, ChevronDown, Film, Globe, MapPin, User, Briefcase, Clock, Languages, Palette, Heart, Music, BookOpen, Zap, Star } from "lucide-react";
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

// --- Select Variant Previews ---

function Select01() {
  return (
    <div className="w-full max-w-xs space-y-2">
      <Label>Native select default</Label>
      <div className="relative flex">
        <select className="peer border-input text-foreground focus-visible:border-ring focus-visible:ring-ring/50 inline-flex w-full cursor-pointer appearance-none items-center rounded-md border bg-transparent text-sm shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 h-9 pr-8 pl-3">
          <option value="1">Male</option>
          <option value="2">Female</option>
          <option value="3">Other</option>
        </select>
        <span className="text-muted-foreground/80 pointer-events-none absolute inset-y-0 right-0 flex h-full w-9 items-center justify-center">
          <ChevronDown className="size-4" />
        </span>
      </div>
    </div>
  );
}

function Select02() {
  return (
    <div className="w-full max-w-xs space-y-2">
      <Label>Native select with placeholder</Label>
      <div className="relative flex">
        <select defaultValue="" className="peer border-input text-foreground focus-visible:border-ring focus-visible:ring-ring/50 has-[option[disabled]:checked]:text-muted-foreground inline-flex w-full cursor-pointer appearance-none items-center rounded-md border bg-transparent text-sm shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 h-9 pr-8 pl-3">
          <option value="" disabled>Please select a gender</option>
          <option value="1">Male</option>
          <option value="2">Female</option>
          <option value="3">Other</option>
        </select>
        <span className="text-muted-foreground/80 pointer-events-none absolute inset-y-0 right-0 flex h-full w-9 items-center justify-center">
          <ChevronDown className="size-4" />
        </span>
      </div>
    </div>
  );
}

function Select03() {
  return (
    <div className="w-full max-w-xs space-y-2">
      <Label>Native select with icon</Label>
      <div className="group relative">
        <div className="relative flex">
          <select defaultValue="" className="peer border-input text-foreground focus-visible:border-ring focus-visible:ring-ring/50 has-[option[disabled]:checked]:text-muted-foreground inline-flex w-full cursor-pointer appearance-none items-center rounded-md border bg-transparent text-sm shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 h-9 pr-8 pl-9">
            <option value="" disabled>Pick your favorite movie</option>
            <option value="1">Godfather</option>
            <option value="2">A Working Man</option>
            <option value="3">The Dark Knight</option>
            <option value="4">Inception</option>
          </select>
          <span className="text-muted-foreground/80 pointer-events-none absolute inset-y-0 right-0 flex h-full w-9 items-center justify-center">
            <ChevronDown className="size-4" />
          </span>
        </div>
        <div className="text-muted-foreground/80 pointer-events-none absolute inset-y-0 left-0 flex items-center justify-center pl-3">
          <Film className="size-4" />
        </div>
      </div>
    </div>
  );
}

function Select04() {
  return (
    <div className="w-full max-w-xs space-y-2">
      <Label>Native select with helper text</Label>
      <div className="relative flex">
        <select className="peer border-input text-foreground focus-visible:border-ring focus-visible:ring-ring/50 inline-flex w-full cursor-pointer appearance-none items-center rounded-md border bg-transparent text-sm shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 h-9 pr-8 pl-3">
          <option value="1">Florida</option>
          <option value="2">California</option>
          <option value="3">San Francisco</option>
          <option value="4">Alabama</option>
        </select>
        <span className="text-muted-foreground/80 pointer-events-none absolute inset-y-0 right-0 flex h-full w-9 items-center justify-center">
          <ChevronDown className="size-4" />
        </span>
      </div>
      <p className="text-muted-foreground text-xs">Could you share which city you&apos;re based in?</p>
    </div>
  );
}

function Select05() {
  return (
    <div className="w-full max-w-xs space-y-2">
      <Label>Native select with error</Label>
      <div className="relative flex">
        <select aria-invalid="true" className="peer border-input text-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 aria-invalid:border-destructive inline-flex w-full cursor-pointer appearance-none items-center rounded-md border bg-transparent text-sm shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 h-9 pr-8 pl-3">
          <option value="1">IST (Indian Standard Time)</option>
          <option value="2">EST (Eastern Standard Time)</option>
          <option value="3">PST (Pacific Standard Time)</option>
          <option value="4">GMT (Greenwich Mean Time)</option>
        </select>
        <span className="text-muted-foreground/80 peer-aria-invalid:text-destructive/80 pointer-events-none absolute inset-y-0 right-0 flex h-full w-9 items-center justify-center">
          <ChevronDown className="size-4" />
        </span>
      </div>
      <p className="text-destructive text-xs" role="alert">Selected option is invalid</p>
    </div>
  );
}

function Select06() {
  return (
    <div className="w-full max-w-xs space-y-2">
      <Label>
        Required native select <span className="text-destructive">*</span>
      </Label>
      <div className="relative flex">
        <select required className="peer border-input text-foreground focus-visible:border-ring focus-visible:ring-ring/50 inline-flex w-full cursor-pointer appearance-none items-center rounded-md border bg-transparent text-sm shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 h-9 pr-8 pl-3">
          <option value="1">Action</option>
          <option value="2">Comedy</option>
          <option value="3">Romance</option>
          <option value="4">Thriller</option>
        </select>
        <span className="text-muted-foreground/80 pointer-events-none absolute inset-y-0 right-0 flex h-full w-9 items-center justify-center">
          <ChevronDown className="size-4" />
        </span>
      </div>
    </div>
  );
}

function Select07() {
  return (
    <div className="w-full max-w-xs space-y-2">
      <Label>Native select with option groups</Label>
      <div className="relative flex">
        <select className="peer border-input text-foreground focus-visible:border-ring focus-visible:ring-ring/50 inline-flex w-full cursor-pointer appearance-none items-center rounded-md border bg-transparent text-sm shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 h-9 pr-8 pl-3">
          <optgroup label="Frontend Technologies">
            <option value="1">HTML</option>
            <option value="2">CSS</option>
            <option value="3">JavaScript</option>
          </optgroup>
          <optgroup label="Backend Technologies">
            <option value="4">Node.js</option>
            <option value="5">Python</option>
            <option value="6">Java</option>
          </optgroup>
        </select>
        <span className="text-muted-foreground/80 pointer-events-none absolute inset-y-0 right-0 flex h-full w-9 items-center justify-center">
          <ChevronDown className="size-4" />
        </span>
      </div>
    </div>
  );
}

function Select08() {
  return (
    <div className="group relative w-full max-w-xs">
      <label className="bg-background text-foreground absolute top-0 left-2 z-10 block -translate-y-1/2 px-1 text-xs font-medium">
        Native select with overlapping label
      </label>
      <div className="relative flex">
        <select className="peer border-input text-foreground focus-visible:border-ring focus-visible:ring-ring/50 inline-flex w-full cursor-pointer appearance-none items-center rounded-md border bg-transparent text-sm shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 h-9 pr-8 pl-3">
          <option value="1">Developer</option>
          <option value="2">Designer</option>
          <option value="3">Manager</option>
          <option value="4">QA Engineer</option>
        </select>
        <span className="text-muted-foreground/80 pointer-events-none absolute inset-y-0 right-0 flex h-full w-9 items-center justify-center">
          <ChevronDown className="size-4" />
        </span>
      </div>
    </div>
  );
}

function Select09() {
  return (
    <div className="border-input bg-background focus-within:border-ring focus-within:ring-ring/50 relative w-full max-w-xs rounded-md border shadow-xs transition-[color,box-shadow] outline-none focus-within:ring-[3px]">
      <label className="text-foreground block px-3 pt-1 text-xs font-medium">
        Native select with inset label
      </label>
      <div className="relative flex">
        <select defaultValue="" className="peer border-input text-foreground inline-flex w-full cursor-pointer appearance-none items-center rounded-md border bg-transparent text-sm transition-[color,box-shadow] outline-none disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 h-9 pr-8 pl-3 border-none shadow-none focus-visible:ring-0 focus-visible:ring-offset-0">
          <option value="" disabled>Pick your favorite movie</option>
          <option value="1">Interstellar</option>
          <option value="2">Dune</option>
          <option value="3">The Matrix</option>
          <option value="4">Catch Me If You Can</option>
        </select>
        <span className="text-muted-foreground/80 pointer-events-none absolute inset-y-0 right-0 flex h-full w-9 items-center justify-center">
          <ChevronDown className="size-4" />
        </span>
      </div>
    </div>
  );
}

function Select10() {
  return (
    <div className="w-full max-w-xs space-y-2">
      <Label>Default select</Label>
      <Select defaultValue="apple">
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select a fruit" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="apple">Apple</SelectItem>
          <SelectItem value="banana">Banana</SelectItem>
          <SelectItem value="blueberry">Blueberry</SelectItem>
          <SelectItem value="grapes">Grapes</SelectItem>
          <SelectItem value="pineapple">Pineapple</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}

function Select11() {
  return (
    <div className="w-full max-w-xs space-y-2">
      <Label>Select with placeholder</Label>
      <Select>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select a fruit" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="apple">Apple</SelectItem>
          <SelectItem value="banana">Banana</SelectItem>
          <SelectItem value="blueberry">Blueberry</SelectItem>
          <SelectItem value="grapes">Grapes</SelectItem>
          <SelectItem value="pineapple">Pineapple</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}

function Select12() {
  return (
    <div className="w-full max-w-xs space-y-2">
      <Label>Select with icon</Label>
      <Select defaultValue="godofwars">
        <SelectTrigger className="relative w-full pl-9">
          <div className="text-muted-foreground/80 pointer-events-none absolute inset-y-0 left-0 flex items-center justify-center pl-3">
            <Film className="size-4" />
          </div>
          <SelectValue placeholder="Pick a game" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="godofwars">God of Wars</SelectItem>
          <SelectItem value="reddead">Red Dead Redemption</SelectItem>
          <SelectItem value="lastofus">The Last of Us</SelectItem>
          <SelectItem value="uncharted">Uncharted</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}

function Select13() {
  return (
    <div className="w-full max-w-xs space-y-2">
      <Label>Select with helper text</Label>
      <Select defaultValue="california">
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select a state" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="florida">Florida</SelectItem>
          <SelectItem value="california">California</SelectItem>
          <SelectItem value="sanfrancisco">San Francisco</SelectItem>
          <SelectItem value="alabama">Alabama</SelectItem>
        </SelectContent>
      </Select>
      <p className="text-muted-foreground text-xs">Could you share which city you&apos;re based in?</p>
    </div>
  );
}

function Select14() {
  return (
    <div className="w-full max-w-xs space-y-2">
      <Label>Select with error</Label>
      <Select defaultValue="tesla">
        <SelectTrigger className="w-full" aria-invalid="true">
          <SelectValue placeholder="Select a brand" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="tesla">Tesla</SelectItem>
          <SelectItem value="ford">Ford</SelectItem>
          <SelectItem value="toyota">Toyota</SelectItem>
          <SelectItem value="bmw">BMW</SelectItem>
        </SelectContent>
      </Select>
      <p className="text-destructive text-xs" role="alert">Selected option is invalid</p>
    </div>
  );
}

function Select15() {
  return (
    <div className="w-full max-w-xs space-y-3">
      <Select>
        <SelectTrigger className="w-full h-8 text-sm">
          <SelectValue placeholder="Small select" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="sm1">Option 1</SelectItem>
          <SelectItem value="sm2">Option 2</SelectItem>
        </SelectContent>
      </Select>
      <Select>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Default select" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="md1">Option 1</SelectItem>
          <SelectItem value="md2">Option 2</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}

function Select16() {
  return (
    <div className="w-full max-w-xs space-y-2">
      <Label>Select with colored border and ring</Label>
      <Select defaultValue="electronics">
        <SelectTrigger className="w-full focus:border-indigo-500 focus:ring-indigo-500/20">
          <SelectValue placeholder="Select category" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="electronics">Electronics</SelectItem>
          <SelectItem value="clothing">Clothing</SelectItem>
          <SelectItem value="books">Books</SelectItem>
          <SelectItem value="home">Home & Garden</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}

function Select17() {
  return (
    <div className="w-full max-w-xs space-y-2">
      <Label>Select with background color</Label>
      <Select defaultValue="hindi">
        <SelectTrigger className="w-full border-sky-600 bg-sky-600/10 text-sky-600 shadow-none focus:border-sky-600 focus:ring-sky-600/20 dark:bg-sky-400/10 dark:text-sky-400 [&_svg]:!text-sky-600 dark:[&_svg]:!text-sky-400">
          <SelectValue placeholder="Select language" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="hindi">Hindi</SelectItem>
          <SelectItem value="english">English</SelectItem>
          <SelectItem value="spanish">Spanish</SelectItem>
          <SelectItem value="french">French</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}

function Select18() {
  return (
    <div className="w-full max-w-xs space-y-2">
      <Label>Ghost Select</Label>
      <Select defaultValue="apple">
        <SelectTrigger className="hover:bg-accent w-full border-none shadow-none">
          <SelectValue placeholder="Select a fruit" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="apple">Apple</SelectItem>
          <SelectItem value="banana">Banana</SelectItem>
          <SelectItem value="blueberry">Blueberry</SelectItem>
          <SelectItem value="grapes">Grapes</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}

function Select19() {
  return (
    <div className="w-full max-w-xs space-y-2">
      <Label>Disabled select</Label>
      <Select defaultValue="apple" disabled>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select a fruit" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="apple">Apple</SelectItem>
          <SelectItem value="banana">Banana</SelectItem>
          <SelectItem value="blueberry">Blueberry</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}

function Select20() {
  return (
    <div className="w-full max-w-xs space-y-2">
      <Label>
        Required select <span className="text-destructive">*</span>
      </Label>
      <Select>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select a timezone" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="ist">IST (Indian Standard Time)</SelectItem>
          <SelectItem value="est">EST (Eastern Standard Time)</SelectItem>
          <SelectItem value="pst">PST (Pacific Standard Time)</SelectItem>
          <SelectItem value="gmt">GMT (Greenwich Mean Time)</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}

function Select21() {
  return (
    <div className="w-full max-w-xs space-y-2">
      <Label>Select with groups</Label>
      <Select defaultValue="react">
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select a framework" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Frontend</SelectLabel>
            <SelectItem value="react">React</SelectItem>
            <SelectItem value="vue">Vue</SelectItem>
            <SelectItem value="angular">Angular</SelectItem>
          </SelectGroup>
          <SelectSeparator />
          <SelectGroup>
            <SelectLabel>Backend</SelectLabel>
            <SelectItem value="express">Express</SelectItem>
            <SelectItem value="django">Django</SelectItem>
            <SelectItem value="rails">Rails</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}

function Select22() {
  return (
    <div className="group relative w-full max-w-xs">
      <label className="bg-background text-foreground absolute top-0 left-2 z-10 block -translate-y-1/2 px-1 text-xs font-medium">
        Select with overlapping label
      </label>
      <Select defaultValue="developer">
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select role" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="developer">Developer</SelectItem>
          <SelectItem value="designer">Designer</SelectItem>
          <SelectItem value="manager">Manager</SelectItem>
          <SelectItem value="qa">QA Engineer</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}

function Select23() {
  return (
    <div className="border-input bg-background focus-within:border-ring focus-within:ring-ring/50 relative w-full max-w-xs rounded-md border shadow-xs transition-[color,box-shadow] outline-none focus-within:ring-[3px]">
      <label className="text-foreground block px-3 pt-1 text-xs font-medium">
        Select with inset label
      </label>
      <Select defaultValue="interstellar">
        <SelectTrigger className="w-full border-none shadow-none focus:ring-0 focus:ring-offset-0 h-9">
          <SelectValue placeholder="Pick your favorite movie" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="interstellar">Interstellar</SelectItem>
          <SelectItem value="dune">Dune</SelectItem>
          <SelectItem value="matrix">The Matrix</SelectItem>
          <SelectItem value="catchme">Catch Me If You Can</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}

function Select24() {
  return (
    <div className="w-full max-w-xs space-y-2">
      <Label>Select with disabled items</Label>
      <Select>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select a plan" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="free">Free</SelectItem>
          <SelectItem value="basic">Basic</SelectItem>
          <SelectItem value="pro" disabled>Pro (Coming soon)</SelectItem>
          <SelectItem value="enterprise" disabled>Enterprise (Coming soon)</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}

function Select25() {
  return (
    <div className="w-full max-w-xs space-y-2">
      <Label>Select with border-green success</Label>
      <Select defaultValue="confirmed">
        <SelectTrigger className="w-full border-green-600 text-green-600 focus:border-green-600 focus:ring-green-600/20 dark:border-green-400 dark:text-green-400 [&_svg]:!text-green-600 dark:[&_svg]:!text-green-400">
          <SelectValue placeholder="Select status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="confirmed">Confirmed</SelectItem>
          <SelectItem value="pending">Pending</SelectItem>
          <SelectItem value="cancelled">Cancelled</SelectItem>
        </SelectContent>
      </Select>
      <p className="text-green-600 dark:text-green-400 text-xs">Your selection has been confirmed.</p>
    </div>
  );
}

// --- Code strings ---
const codes: Record<string, string> = {
  "select-01": `import { ChevronDown } from "lucide-react"

export default function Select01() {
  return (
    <div className="w-full max-w-xs space-y-2">
      <Label>Native select default</Label>
      <div className="relative flex">
        <select className="peer border-input text-foreground focus-visible:border-ring focus-visible:ring-ring/50 inline-flex w-full cursor-pointer appearance-none items-center rounded-md border bg-transparent text-sm shadow-xs outline-none focus-visible:ring-[3px] h-9 pr-8 pl-3">
          <option value="1">Male</option>
          <option value="2">Female</option>
          <option value="3">Other</option>
        </select>
        <span className="text-muted-foreground/80 pointer-events-none absolute inset-y-0 right-0 flex h-full w-9 items-center justify-center">
          <ChevronDown className="size-4" />
        </span>
      </div>
    </div>
  )
}`,
  "select-10": `
export default function Select10() {
  return (
    <div className="w-full max-w-xs space-y-2">
      <Label>Default select</Label>
      <Select defaultValue="apple">
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select a fruit" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="apple">Apple</SelectItem>
          <SelectItem value="banana">Banana</SelectItem>
          <SelectItem value="blueberry">Blueberry</SelectItem>
          <SelectItem value="grapes">Grapes</SelectItem>
          <SelectItem value="pineapple">Pineapple</SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}`,
  "select-17": `
export default function Select17() {
  return (
    <div className="w-full max-w-xs space-y-2">
      <Label>Select with background color</Label>
      <Select defaultValue="hindi">
        <SelectTrigger className="w-full border-sky-600 bg-sky-600/10 text-sky-600 shadow-none focus:border-sky-600 focus:ring-sky-600/20 dark:bg-sky-400/10 dark:text-sky-400 [&_svg]:!text-sky-600 dark:[&_svg]:!text-sky-400">
          <SelectValue placeholder="Select language" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="hindi">Hindi</SelectItem>
          <SelectItem value="english">English</SelectItem>
          <SelectItem value="spanish">Spanish</SelectItem>
          <SelectItem value="french">French</SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}`,
  "select-21": `
export default function Select21() {
  return (
    <div className="w-full max-w-xs space-y-2">
      <Label>Select with groups</Label>
      <Select defaultValue="react">
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select a framework" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Frontend</SelectLabel>
            <SelectItem value="react">React</SelectItem>
            <SelectItem value="vue">Vue</SelectItem>
            <SelectItem value="angular">Angular</SelectItem>
          </SelectGroup>
          <SelectSeparator />
          <SelectGroup>
            <SelectLabel>Backend</SelectLabel>
            <SelectItem value="express">Express</SelectItem>
            <SelectItem value="django">Django</SelectItem>
            <SelectItem value="rails">Rails</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  )
}`,
  "select-25": `
export default function Select25() {
  return (
    <div className="w-full max-w-xs space-y-2">
      <Label>Select with border-green success</Label>
      <Select defaultValue="confirmed">
        <SelectTrigger className="w-full border-green-600 text-green-600 focus:border-green-600 focus:ring-green-600/20 dark:border-green-400 dark:text-green-400 [&_svg]:!text-green-600 dark:[&_svg]:!text-green-400">
          <SelectValue placeholder="Select status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="confirmed">Confirmed</SelectItem>
          <SelectItem value="pending">Pending</SelectItem>
          <SelectItem value="cancelled">Cancelled</SelectItem>
        </SelectContent>
      </Select>
      <p className="text-green-600 dark:text-green-400 text-xs">Your selection has been confirmed.</p>
    </div>
  )
}`,
};

function getCode(id: string) {
  return codes[id] || codes["select-01"]!.replace("Select01", id.replace("select-", "Select"));
}

// --- Variants ---
const variants = [
  { id: "select-01", title: "Select 1", preview: <Select01 /> },
  { id: "select-02", title: "Select 2", preview: <Select02 /> },
  { id: "select-03", title: "Select 3", preview: <Select03 /> },
  { id: "select-04", title: "Select 4", preview: <Select04 /> },
  { id: "select-05", title: "Select 5", preview: <Select05 /> },
  { id: "select-06", title: "Select 6", preview: <Select06 /> },
  { id: "select-07", title: "Select 7", preview: <Select07 /> },
  { id: "select-08", title: "Select 8", preview: <Select08 /> },
  { id: "select-09", title: "Select 9", preview: <Select09 /> },
  { id: "select-10", title: "Select 10", preview: <Select10 /> },
  { id: "select-11", title: "Select 11", preview: <Select11 /> },
  { id: "select-12", title: "Select 12", preview: <Select12 /> },
  { id: "select-13", title: "Select 13", preview: <Select13 /> },
  { id: "select-14", title: "Select 14", preview: <Select14 /> },
  { id: "select-15", title: "Select 15", preview: <Select15 /> },
  { id: "select-16", title: "Select 16", preview: <Select16 /> },
  { id: "select-17", title: "Select 17", preview: <Select17 /> },
  { id: "select-18", title: "Select 18", preview: <Select18 /> },
  { id: "select-19", title: "Select 19", preview: <Select19 /> },
  { id: "select-20", title: "Select 20", preview: <Select20 /> },
  { id: "select-21", title: "Select 21", preview: <Select21 /> },
  { id: "select-22", title: "Select 22", preview: <Select22 /> },
  { id: "select-23", title: "Select 23", preview: <Select23 /> },
  { id: "select-24", title: "Select 24", preview: <Select24 /> },
  { id: "select-25", title: "Select 25", preview: <Select25 /> },
];

export default function SelectPage() {
  return (
    <ComponentLayout>
      {/* Page Header */}
      <div className="mb-4 flex gap-x-8 gap-y-4 max-md:flex-col">
        <div className="space-y-3">
          <h1 className="text-2xl font-bold sm:text-3xl">Shadcn Select</h1>
          <p className="text-muted-foreground">
            Explore the collection of awesome Shadcn Select Components, featuring {variants.length} select
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
          <p className="font-medium">Have any suggestions for Select variants?</p>
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
