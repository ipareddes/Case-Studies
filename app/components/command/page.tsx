"use client";

import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator, CommandShortcut, Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@ipareddes/ui-components";

import { ComponentLayout } from "@/components/layout/component-layout";
import { useState } from "react";
import { X, Sparkles, Code2, Copy, Check, Calculator, Calendar, Smile, CreditCard, Settings, User, Mail, MessageSquare, PlusCircle, Search, File, FileText, Music, Image, Video, Sun, Moon, Laptop, Command as CommandIcon, ArrowRight } from "lucide-react";
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
      <div className="group/item relative flex h-full min-h-[350px] items-center justify-center px-8 py-12 max-sm:px-4" data-slot={variantId}>
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

// --- Command Variant Previews ---

function Command01() {
  return (
    <Command className="rounded-lg border shadow-md w-full max-w-md">
      <CommandInput placeholder="Type a command or search..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Suggestions">
          <CommandItem>
            <Calendar className="mr-2 h-4 w-4" />
            <span>Calendar</span>
          </CommandItem>
          <CommandItem>
            <Smile className="mr-2 h-4 w-4" />
            <span>Search Emoji</span>
          </CommandItem>
          <CommandItem>
            <Calculator className="mr-2 h-4 w-4" />
            <span>Calculator</span>
          </CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Settings">
          <CommandItem>
            <User className="mr-2 h-4 w-4" />
            <span>Profile</span>
            <CommandShortcut>⌘P</CommandShortcut>
          </CommandItem>
          <CommandItem>
            <CreditCard className="mr-2 h-4 w-4" />
            <span>Billing</span>
            <CommandShortcut>⌘B</CommandShortcut>
          </CommandItem>
          <CommandItem>
            <Settings className="mr-2 h-4 w-4" />
            <span>Settings</span>
            <CommandShortcut>⌘S</CommandShortcut>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </Command>
  );
}

function Command02() {
  return (
    <Command className="rounded-lg border shadow-md w-full max-w-md">
      <CommandInput placeholder="Search files..." />
      <CommandList>
        <CommandEmpty>No files found.</CommandEmpty>
        <CommandGroup heading="Recent Files">
          <CommandItem>
            <FileText className="mr-2 h-4 w-4" />
            <span>document.pdf</span>
            <span className="ml-auto text-xs text-muted-foreground">2 days ago</span>
          </CommandItem>
          <CommandItem>
            <Image className="mr-2 h-4 w-4" />
            <span>screenshot.png</span>
            <span className="ml-auto text-xs text-muted-foreground">5 days ago</span>
          </CommandItem>
          <CommandItem>
            <Music className="mr-2 h-4 w-4" />
            <span>podcast.mp3</span>
            <span className="ml-auto text-xs text-muted-foreground">1 week ago</span>
          </CommandItem>
          <CommandItem>
            <Video className="mr-2 h-4 w-4" />
            <span>video.mp4</span>
            <span className="ml-auto text-xs text-muted-foreground">2 weeks ago</span>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </Command>
  );
}

function Command03() {
  return (
    <Command className="rounded-lg border shadow-md w-full max-w-md">
      <CommandInput placeholder="Search actions..." />
      <CommandList>
        <CommandEmpty>No actions found.</CommandEmpty>
        <CommandGroup heading="Actions">
          <CommandItem>
            <PlusCircle className="mr-2 h-4 w-4" />
            <span>Create new project</span>
            <CommandShortcut>⌘N</CommandShortcut>
          </CommandItem>
          <CommandItem>
            <Mail className="mr-2 h-4 w-4" />
            <span>Send email</span>
            <CommandShortcut>⌘E</CommandShortcut>
          </CommandItem>
          <CommandItem>
            <MessageSquare className="mr-2 h-4 w-4" />
            <span>New message</span>
            <CommandShortcut>⌘M</CommandShortcut>
          </CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Navigation">
          <CommandItem>
            <ArrowRight className="mr-2 h-4 w-4" />
            <span>Go to dashboard</span>
          </CommandItem>
          <CommandItem>
            <ArrowRight className="mr-2 h-4 w-4" />
            <span>Go to settings</span>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </Command>
  );
}

function Command04() {
  return (
    <Command className="rounded-lg border shadow-md w-full max-w-md">
      <CommandInput placeholder="Change theme..." />
      <CommandList>
        <CommandEmpty>No theme found.</CommandEmpty>
        <CommandGroup heading="Theme">
          <CommandItem>
            <Sun className="mr-2 h-4 w-4" />
            <span>Light</span>
          </CommandItem>
          <CommandItem>
            <Moon className="mr-2 h-4 w-4" />
            <span>Dark</span>
          </CommandItem>
          <CommandItem>
            <Laptop className="mr-2 h-4 w-4" />
            <span>System</span>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </Command>
  );
}

function Command05() {
  return (
    <Command className="rounded-lg border shadow-md w-full max-w-md">
      <CommandInput placeholder="Search users..." />
      <CommandList>
        <CommandEmpty>No users found.</CommandEmpty>
        <CommandGroup heading="Team Members">
          <CommandItem className="gap-3">
            <div className="h-8 w-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-500" />
            <div className="flex flex-col">
              <span className="font-medium">John Doe</span>
              <span className="text-xs text-muted-foreground">john@example.com</span>
            </div>
          </CommandItem>
          <CommandItem className="gap-3">
            <div className="h-8 w-8 rounded-full bg-gradient-to-br from-green-500 to-teal-500" />
            <div className="flex flex-col">
              <span className="font-medium">Jane Smith</span>
              <span className="text-xs text-muted-foreground">jane@example.com</span>
            </div>
          </CommandItem>
          <CommandItem className="gap-3">
            <div className="h-8 w-8 rounded-full bg-gradient-to-br from-orange-500 to-red-500" />
            <div className="flex flex-col">
              <span className="font-medium">Bob Wilson</span>
              <span className="text-xs text-muted-foreground">bob@example.com</span>
            </div>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </Command>
  );
}

function Command06() {
  return (
    <Command className="rounded-lg border shadow-md w-full max-w-md">
      <CommandInput placeholder="Quick search..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Quick Links">
          <CommandItem className="justify-between">
            <div className="flex items-center">
              <File className="mr-2 h-4 w-4" />
              <span>Documentation</span>
            </div>
            <span className="rounded bg-muted px-1.5 py-0.5 text-xs">docs</span>
          </CommandItem>
          <CommandItem className="justify-between">
            <div className="flex items-center">
              <CommandIcon className="mr-2 h-4 w-4" />
              <span>Components</span>
            </div>
            <span className="rounded bg-muted px-1.5 py-0.5 text-xs">ui</span>
          </CommandItem>
          <CommandItem className="justify-between">
            <div className="flex items-center">
              <Settings className="mr-2 h-4 w-4" />
              <span>API Reference</span>
            </div>
            <span className="rounded bg-muted px-1.5 py-0.5 text-xs">api</span>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </Command>
  );
}

function Command07() {
  return (
    <div className="relative w-full max-w-md">
      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
      <input
        type="text"
        placeholder="Search..."
        className="h-10 w-full rounded-lg border bg-background pl-10 pr-4 text-sm outline-none focus:ring-2 focus:ring-ring"
      />
      <kbd className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
        <span className="text-xs">⌘</span>K
      </kbd>
    </div>
  );
}

function Command08() {
  return (
    <Command className="rounded-lg border shadow-md w-full max-w-md">
      <CommandInput placeholder="Search with categories..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="People">
          <CommandItem>
            <User className="mr-2 h-4 w-4 text-blue-500" />
            <span>John Doe</span>
            <span className="ml-auto text-xs rounded-full bg-blue-100 px-2 py-0.5 text-blue-700">User</span>
          </CommandItem>
          <CommandItem>
            <User className="mr-2 h-4 w-4 text-purple-500" />
            <span>Jane Smith</span>
            <span className="ml-auto text-xs rounded-full bg-purple-100 px-2 py-0.5 text-purple-700">Admin</span>
          </CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Documents">
          <CommandItem>
            <FileText className="mr-2 h-4 w-4 text-green-500" />
            <span>Project Brief</span>
            <span className="ml-auto text-xs rounded-full bg-green-100 px-2 py-0.5 text-green-700">Doc</span>
          </CommandItem>
          <CommandItem>
            <FileText className="mr-2 h-4 w-4 text-orange-500" />
            <span>Meeting Notes</span>
            <span className="ml-auto text-xs rounded-full bg-orange-100 px-2 py-0.5 text-orange-700">Note</span>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </Command>
  );
}

function Command09() {
  return (
    <Command className="rounded-lg border-0 shadow-none w-full max-w-md bg-muted/50">
      <CommandInput placeholder="Filter items..." className="border-0" />
      <CommandList className="max-h-[200px]">
        <CommandEmpty>No items found.</CommandEmpty>
        <CommandGroup>
          <CommandItem className="rounded-md">
            <span className="h-2 w-2 rounded-full bg-green-500 mr-2" />
            <span>Active</span>
            <span className="ml-auto text-xs text-muted-foreground">24</span>
          </CommandItem>
          <CommandItem className="rounded-md">
            <span className="h-2 w-2 rounded-full bg-yellow-500 mr-2" />
            <span>Pending</span>
            <span className="ml-auto text-xs text-muted-foreground">12</span>
          </CommandItem>
          <CommandItem className="rounded-md">
            <span className="h-2 w-2 rounded-full bg-red-500 mr-2" />
            <span>Overdue</span>
            <span className="ml-auto text-xs text-muted-foreground">3</span>
          </CommandItem>
          <CommandItem className="rounded-md">
            <span className="h-2 w-2 rounded-full bg-gray-500 mr-2" />
            <span>Completed</span>
            <span className="ml-auto text-xs text-muted-foreground">156</span>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </Command>
  );
}

function Command10() {
  return (
    <Command className="rounded-lg border shadow-md w-full max-w-md">
      <div className="flex items-center border-b px-3">
        <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
        <input
          className="flex h-11 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground"
          placeholder="Search everywhere..."
        />
        <div className="flex items-center gap-1">
          <kbd className="rounded border bg-muted px-1.5 py-0.5 text-[10px] font-mono">Tab</kbd>
          <span className="text-xs text-muted-foreground">to navigate</span>
        </div>
      </div>
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Recent Searches">
          <CommandItem>
            <Search className="mr-2 h-4 w-4 text-muted-foreground" />
            <span>dashboard components</span>
          </CommandItem>
          <CommandItem>
            <Search className="mr-2 h-4 w-4 text-muted-foreground" />
            <span>user authentication</span>
          </CommandItem>
          <CommandItem>
            <Search className="mr-2 h-4 w-4 text-muted-foreground" />
            <span>api endpoints</span>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </Command>
  );
}

// --- Code strings ---
const codes: Record<string, string> = {
  "command-01": `import { Calendar, Calculator, CreditCard, Settings, Smile, User } from "lucide-react"

export default function Command01() {
  return (
    <Command className="rounded-lg border shadow-md">
      <CommandInput placeholder="Type a command or search..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Suggestions">
          <CommandItem>
            <Calendar className="mr-2 h-4 w-4" />
            <span>Calendar</span>
          </CommandItem>
          <CommandItem>
            <Smile className="mr-2 h-4 w-4" />
            <span>Search Emoji</span>
          </CommandItem>
          <CommandItem>
            <Calculator className="mr-2 h-4 w-4" />
            <span>Calculator</span>
          </CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Settings">
          <CommandItem>
            <User className="mr-2 h-4 w-4" />
            <span>Profile</span>
            <CommandShortcut>⌘P</CommandShortcut>
          </CommandItem>
          <CommandItem>
            <CreditCard className="mr-2 h-4 w-4" />
            <span>Billing</span>
            <CommandShortcut>⌘B</CommandShortcut>
          </CommandItem>
          <CommandItem>
            <Settings className="mr-2 h-4 w-4" />
            <span>Settings</span>
            <CommandShortcut>⌘S</CommandShortcut>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </Command>
  )
}`,
};

function getCode(id: string) {
  return codes[id] || codes["command-01"]!;
}

// --- Variants ---
const variants = [
  { id: "command-01", title: "Command 1 - Basic", preview: <Command01 /> },
  { id: "command-02", title: "Command 2 - File Search", preview: <Command02 /> },
  { id: "command-03", title: "Command 3 - Actions", preview: <Command03 /> },
  { id: "command-04", title: "Command 4 - Theme Switcher", preview: <Command04 /> },
  { id: "command-05", title: "Command 5 - User Search", preview: <Command05 /> },
  { id: "command-06", title: "Command 6 - Quick Links", preview: <Command06 /> },
  { id: "command-07", title: "Command 7 - Search Input", preview: <Command07 /> },
  { id: "command-08", title: "Command 8 - With Categories", preview: <Command08 /> },
  { id: "command-09", title: "Command 9 - Filter List", preview: <Command09 /> },
  { id: "command-10", title: "Command 10 - Recent Searches", preview: <Command10 /> },
];

export default function CommandPage() {
  return (
    <ComponentLayout>
      {/* Page Header */}
      <div className="mb-4 flex gap-x-8 gap-y-4 max-md:flex-col">
        <div className="space-y-3">
          <h1 className="text-2xl font-bold sm:text-3xl">Shadcn Command</h1>
          <p className="text-muted-foreground">
            Explore the collection of awesome Shadcn Command Components, featuring {variants.length} command
            variants designed for search and command palettes built with React and Tailwind CSS.
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
          <p className="font-medium">Have any suggestions for Command variants?</p>
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
