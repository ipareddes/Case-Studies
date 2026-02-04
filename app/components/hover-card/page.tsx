"use client";

import { Avatar, AvatarFallback, AvatarImage, Badge, Button, HoverCard, HoverCardContent, HoverCardTrigger, Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@ipareddes/ui-components";

import { ComponentLayout } from "@/components/layout/component-layout";
import { useState } from "react";
import { X, Sparkles, Code2, Copy, Check, CalendarDays, MapPin, Link as LinkIcon, Mail, Phone, Github, Twitter } from "lucide-react";
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

// --- HoverCard Variant Previews ---

function HoverCard01() {
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Button variant="link">@nextjs</Button>
      </HoverCardTrigger>
      <HoverCardContent className="w-80">
        <div className="flex justify-between space-x-4">
          <Avatar>
            <AvatarImage src="https://github.com/vercel.png" />
            <AvatarFallback>VC</AvatarFallback>
          </Avatar>
          <div className="space-y-1">
            <h4 className="text-sm font-semibold">@nextjs</h4>
            <p className="text-sm">
              The React Framework – created and maintained by @vercel.
            </p>
            <div className="flex items-center pt-2">
              <CalendarDays className="mr-2 h-4 w-4 opacity-70" />
              <span className="text-xs text-muted-foreground">
                Joined December 2021
              </span>
            </div>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}

function HoverCard02() {
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <span className="text-primary underline underline-offset-4 cursor-pointer">Hover for details</span>
      </HoverCardTrigger>
      <HoverCardContent>
        <div className="space-y-2">
          <h4 className="text-sm font-semibold">Quick Info</h4>
          <p className="text-sm text-muted-foreground">
            This is a simple hover card with basic content.
          </p>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}

function HoverCard03() {
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Avatar className="cursor-pointer">
          <AvatarImage src="https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-5.png" />
          <AvatarFallback>JD</AvatarFallback>
        </Avatar>
      </HoverCardTrigger>
      <HoverCardContent className="w-80">
        <div className="flex gap-4">
          <Avatar className="h-12 w-12">
            <AvatarImage src="https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-5.png" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          <div className="space-y-1">
            <h4 className="text-sm font-semibold">John Doe</h4>
            <p className="text-sm text-muted-foreground">Senior Developer</p>
            <div className="flex gap-2 pt-2">
              <Badge variant="secondary">React</Badge>
              <Badge variant="secondary">TypeScript</Badge>
            </div>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}

function HoverCard04() {
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Button variant="outline" size="sm">View Contact</Button>
      </HoverCardTrigger>
      <HoverCardContent className="w-72">
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Mail className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">john@example.com</span>
          </div>
          <div className="flex items-center gap-2">
            <Phone className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">+1 234 567 890</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">San Francisco, CA</span>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}

function HoverCard05() {
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <span className="inline-flex items-center gap-1 text-primary cursor-pointer">
          <LinkIcon className="h-4 w-4" />
          example.com
        </span>
      </HoverCardTrigger>
      <HoverCardContent className="w-80">
        <div className="space-y-2">
          <div className="h-24 bg-gradient-to-br from-blue-500 to-purple-500 rounded-md" />
          <h4 className="text-sm font-semibold">Example Website</h4>
          <p className="text-xs text-muted-foreground">
            A brief description of the website and what it offers to visitors.
          </p>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}

function HoverCard06() {
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Badge className="cursor-pointer">Pro Plan</Badge>
      </HoverCardTrigger>
      <HoverCardContent className="w-72">
        <div className="space-y-2">
          <h4 className="text-sm font-semibold">Pro Plan Features</h4>
          <ul className="text-sm text-muted-foreground space-y-1">
            <li>• Unlimited projects</li>
            <li>• Priority support</li>
            <li>• Advanced analytics</li>
            <li>• Custom integrations</li>
          </ul>
          <Button size="sm" className="w-full mt-2">Upgrade Now</Button>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}

function HoverCard07() {
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <div className="flex items-center gap-2 cursor-pointer">
          <Github className="h-5 w-5" />
          <span className="text-sm font-medium">shadcn/ui</span>
        </div>
      </HoverCardTrigger>
      <HoverCardContent className="w-80">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Github className="h-5 w-5" />
              <span className="font-semibold">shadcn/ui</span>
            </div>
            <Button size="sm" variant="outline">Star</Button>
          </div>
          <p className="text-sm text-muted-foreground">
            Beautifully designed components built with Radix UI and Tailwind CSS.
          </p>
          <div className="flex gap-4 text-sm text-muted-foreground">
            <span>⭐ 45.2k</span>
            <span>🍴 2.3k</span>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}

function HoverCard08() {
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <span className="text-sm text-primary cursor-pointer">Dec 15, 2024</span>
      </HoverCardTrigger>
      <HoverCardContent className="w-72">
        <div className="space-y-2">
          <h4 className="text-sm font-semibold">Team Meeting</h4>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <CalendarDays className="h-4 w-4" />
            <span>December 15, 2024</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <MapPin className="h-4 w-4" />
            <span>Conference Room A</span>
          </div>
          <p className="text-xs text-muted-foreground pt-2">
            Weekly sync with the product team to discuss Q1 roadmap.
          </p>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}

function HoverCard09() {
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <div className="inline-flex items-center gap-1 cursor-pointer">
          <Twitter className="h-4 w-4 text-sky-500" />
          <span className="text-sm">@shadcn</span>
        </div>
      </HoverCardTrigger>
      <HoverCardContent className="w-80">
        <div className="flex gap-4">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>SC</AvatarFallback>
          </Avatar>
          <div className="space-y-1 flex-1">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-semibold">shadcn</h4>
              <Button size="sm" variant="outline">Follow</Button>
            </div>
            <p className="text-sm text-muted-foreground">
              Building @shadcn/ui. Previously @vercel.
            </p>
            <div className="flex gap-4 text-xs text-muted-foreground pt-1">
              <span><strong>1.2K</strong> Following</span>
              <span><strong>89K</strong> Followers</span>
            </div>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}

function HoverCard10() {
  return (
    <HoverCard openDelay={0} closeDelay={0}>
      <HoverCardTrigger asChild>
        <Button variant="ghost">Instant Hover</Button>
      </HoverCardTrigger>
      <HoverCardContent>
        <p className="text-sm">This hover card appears instantly with no delay!</p>
      </HoverCardContent>
    </HoverCard>
  );
}

// --- Code strings ---
const codes: Record<string, string> = {
  "hovercard-01": `import { CalendarDays } from "lucide-react"

export default function HoverCard01() {
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Button variant="link">@nextjs</Button>
      </HoverCardTrigger>
      <HoverCardContent className="w-80">
        <div className="flex justify-between space-x-4">
          <Avatar>
            <AvatarImage src="https://github.com/vercel.png" />
            <AvatarFallback>VC</AvatarFallback>
          </Avatar>
          <div className="space-y-1">
            <h4 className="text-sm font-semibold">@nextjs</h4>
            <p className="text-sm">The React Framework – created and maintained by @vercel.</p>
            <div className="flex items-center pt-2">
              <CalendarDays className="mr-2 h-4 w-4 opacity-70" />
              <span className="text-xs text-muted-foreground">Joined December 2021</span>
            </div>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  )
}`,
};

function getCode(id: string) {
  return codes[id] || codes["hovercard-01"]!;
}

// --- Variants ---
const variants = [
  { id: "hovercard-01", title: "HoverCard 1 - User Profile", preview: <HoverCard01 /> },
  { id: "hovercard-02", title: "HoverCard 2 - Simple", preview: <HoverCard02 /> },
  { id: "hovercard-03", title: "HoverCard 3 - Avatar Trigger", preview: <HoverCard03 /> },
  { id: "hovercard-04", title: "HoverCard 4 - Contact Info", preview: <HoverCard04 /> },
  { id: "hovercard-05", title: "HoverCard 5 - Link Preview", preview: <HoverCard05 /> },
  { id: "hovercard-06", title: "HoverCard 6 - Plan Details", preview: <HoverCard06 /> },
  { id: "hovercard-07", title: "HoverCard 7 - GitHub Repo", preview: <HoverCard07 /> },
  { id: "hovercard-08", title: "HoverCard 8 - Event Details", preview: <HoverCard08 /> },
  { id: "hovercard-09", title: "HoverCard 9 - Twitter Profile", preview: <HoverCard09 /> },
  { id: "hovercard-10", title: "HoverCard 10 - Instant", preview: <HoverCard10 /> },
];

export default function HoverCardPage() {
  return (
    <ComponentLayout>
      {/* Page Header */}
      <div className="mb-4 flex gap-x-8 gap-y-4 max-md:flex-col">
        <div className="space-y-3">
          <h1 className="text-2xl font-bold sm:text-3xl">Shadcn Hover Card</h1>
          <p className="text-muted-foreground">
            Explore the collection of awesome Shadcn Hover Card Components, featuring {variants.length} hover card
            variants for displaying content on hover built with React and Tailwind CSS.
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
          <p className="font-medium">Have any suggestions for Hover Card variants?</p>
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
