"use client";

import { ComponentLayout } from "@/components/layout/component-layout";
import { useState } from "react";
import { X, Sparkles, Code2, Copy, Check, TriangleAlert, Star, Mail, Gift, Users, LogIn, UserPlus, KeyRound, ScrollText, Maximize, ArrowUp, ArrowRight, ArrowDown, ArrowLeft, ZoomIn } from "lucide-react";
import ReactDOM from "react-dom";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

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

// --- Dialog Variant Previews ---

function Dialog01() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="inline-flex items-center justify-center rounded-md border bg-background px-4 py-2 text-sm font-medium shadow-xs hover:bg-accent hover:text-accent-foreground">Alert Dialog</button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>This action cannot be undone. This will permanently delete your account and remove your data from our servers.</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <button className="inline-flex items-center justify-center rounded-md border px-4 py-2 text-sm font-medium hover:bg-accent">Cancel</button>
          <button className="inline-flex items-center justify-center rounded-md bg-primary text-primary-foreground px-4 py-2 text-sm font-medium hover:bg-primary/90">Continue</button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function Dialog02() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="inline-flex items-center justify-center rounded-md border bg-background px-4 py-2 text-sm font-medium shadow-xs hover:bg-accent hover:text-accent-foreground">Alert Dialog (With Icon)</button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-full bg-muted">
              <TriangleAlert className="size-5 text-muted-foreground" />
            </div>
            <div>
              <DialogTitle>Are you absolutely sure?</DialogTitle>
              <DialogDescription>This action cannot be undone.</DialogDescription>
            </div>
          </div>
        </DialogHeader>
        <DialogFooter>
          <button className="inline-flex items-center justify-center rounded-md border px-4 py-2 text-sm font-medium hover:bg-accent">Cancel</button>
          <button className="inline-flex items-center justify-center rounded-md bg-primary text-primary-foreground px-4 py-2 text-sm font-medium hover:bg-primary/90">Continue</button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function Dialog03() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="inline-flex items-center justify-center rounded-md border bg-background px-4 py-2 text-sm font-medium shadow-xs hover:bg-accent hover:text-accent-foreground">Alert Dialog Destructive</button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>This action cannot be undone. This will permanently delete your account and remove your data from our servers.</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <button className="inline-flex items-center justify-center rounded-md border px-4 py-2 text-sm font-medium hover:bg-accent">Cancel</button>
          <button className="inline-flex items-center justify-center rounded-md bg-destructive text-destructive-foreground px-4 py-2 text-sm font-medium hover:bg-destructive/90">Delete</button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function Dialog04() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="inline-flex items-center justify-center rounded-md border bg-background px-4 py-2 text-sm font-medium shadow-xs hover:bg-accent hover:text-accent-foreground">Scrollable Dialog</button>
      </DialogTrigger>
      <DialogContent className="max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Scrollable Content</DialogTitle>
          <DialogDescription>This dialog has scrollable content for long text.</DialogDescription>
        </DialogHeader>
        <div className="space-y-4 text-sm text-muted-foreground">
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.</p>
          <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident.</p>
          <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis.</p>
          <p>Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.</p>
          <p>Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.</p>
        </div>
        <DialogFooter>
          <button className="inline-flex items-center justify-center rounded-md border px-4 py-2 text-sm font-medium hover:bg-accent">Close</button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function Dialog05() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="inline-flex items-center justify-center rounded-md border bg-background px-4 py-2 text-sm font-medium shadow-xs hover:bg-accent hover:text-accent-foreground">Sticky Header Dialog</button>
      </DialogTrigger>
      <DialogContent className="max-h-[80vh] flex flex-col p-0">
        <div className="sticky top-0 z-10 border-b bg-background p-6">
          <DialogHeader>
            <DialogTitle>Sticky Header</DialogTitle>
            <DialogDescription>The header stays fixed while content scrolls.</DialogDescription>
          </DialogHeader>
        </div>
        <div className="flex-1 overflow-y-auto p-6 space-y-4 text-sm text-muted-foreground">
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
          <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
          <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
          <p>Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
          <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.</p>
        </div>
        <DialogFooter className="border-t p-6">
          <button className="inline-flex items-center justify-center rounded-md border px-4 py-2 text-sm font-medium hover:bg-accent">Close</button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function Dialog06() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="inline-flex items-center justify-center rounded-md border bg-background px-4 py-2 text-sm font-medium shadow-xs hover:bg-accent hover:text-accent-foreground">Sticky Footer Dialog</button>
      </DialogTrigger>
      <DialogContent className="max-h-[80vh] flex flex-col p-0">
        <div className="p-6">
          <DialogHeader>
            <DialogTitle>Sticky Footer</DialogTitle>
            <DialogDescription>The footer stays fixed while content scrolls.</DialogDescription>
          </DialogHeader>
        </div>
        <div className="flex-1 overflow-y-auto px-6 space-y-4 text-sm text-muted-foreground">
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
          <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
          <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
          <p>Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
          <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.</p>
        </div>
        <div className="sticky bottom-0 z-10 border-t bg-background p-6">
          <DialogFooter>
            <button className="inline-flex items-center justify-center rounded-md border px-4 py-2 text-sm font-medium hover:bg-accent">Cancel</button>
            <button className="inline-flex items-center justify-center rounded-md bg-primary text-primary-foreground px-4 py-2 text-sm font-medium hover:bg-primary/90">Save</button>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function Dialog07() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="inline-flex items-center justify-center rounded-md border bg-background px-4 py-2 text-sm font-medium shadow-xs hover:bg-accent hover:text-accent-foreground">Fullscreen Dialog</button>
      </DialogTrigger>
      <DialogContent className="max-w-full h-screen w-screen rounded-none">
        <DialogHeader>
          <DialogTitle>Fullscreen Dialog</DialogTitle>
          <DialogDescription>This dialog takes up the entire screen.</DialogDescription>
        </DialogHeader>
        <div className="flex-1 flex items-center justify-center text-muted-foreground">
          <Maximize className="size-12" />
        </div>
        <DialogFooter>
          <button className="inline-flex items-center justify-center rounded-md border px-4 py-2 text-sm font-medium hover:bg-accent">Close</button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function Dialog08() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="inline-flex items-center justify-center rounded-md border bg-background px-4 py-2 text-sm font-medium shadow-xs hover:bg-accent hover:text-accent-foreground">Terms &amp; Condition</button>
      </DialogTrigger>
      <DialogContent className="max-h-[80vh] flex flex-col p-0">
        <div className="sticky top-0 z-10 border-b bg-background p-6">
          <DialogHeader>
            <DialogTitle>Terms &amp; Conditions</DialogTitle>
            <DialogDescription>Please read and accept the terms to continue.</DialogDescription>
          </DialogHeader>
        </div>
        <div className="flex-1 overflow-y-auto p-6 space-y-4 text-sm text-muted-foreground">
          <p><strong>1. Acceptance of Terms</strong></p>
          <p>By accessing or using our services, you agree to be bound by these terms and conditions.</p>
          <p><strong>2. Use of Service</strong></p>
          <p>You may use our services only for lawful purposes and in accordance with these Terms.</p>
          <p><strong>3. Privacy Policy</strong></p>
          <p>Your use of our services is also governed by our Privacy Policy.</p>
          <p><strong>4. Modifications</strong></p>
          <p>We reserve the right to modify these terms at any time. Changes will be effective immediately upon posting.</p>
        </div>
        <div className="sticky bottom-0 z-10 border-t bg-background p-6">
          <DialogFooter>
            <button className="inline-flex items-center justify-center rounded-md border px-4 py-2 text-sm font-medium hover:bg-accent">Decline</button>
            <button className="inline-flex items-center justify-center rounded-md bg-primary text-primary-foreground px-4 py-2 text-sm font-medium hover:bg-primary/90">Accept</button>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function Dialog09() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="inline-flex items-center justify-center rounded-md border bg-background px-4 py-2 text-sm font-medium shadow-xs hover:bg-accent hover:text-accent-foreground">Subscribe</button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Subscribe to our newsletter</DialogTitle>
          <DialogDescription>Get the latest updates and news delivered to your inbox.</DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="email-09" className="text-sm font-medium">Email</label>
            <input id="email-09" type="email" placeholder="you@example.com" className="flex h-9 w-full rounded-md border bg-transparent px-3 py-1 text-sm shadow-xs placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring" />
          </div>
        </div>
        <DialogFooter>
          <button className="inline-flex items-center justify-center rounded-md bg-primary text-primary-foreground px-4 py-2 text-sm font-medium hover:bg-primary/90">Subscribe</button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function Dialog10() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="inline-flex items-center justify-center rounded-md border bg-background px-4 py-2 text-sm font-medium shadow-xs hover:bg-accent hover:text-accent-foreground">Refer &amp; Earn</button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-full bg-primary/10 text-primary">
              <Gift className="size-5" />
            </div>
            <div>
              <DialogTitle>Refer &amp; Earn</DialogTitle>
              <DialogDescription>Share your referral link and earn rewards.</DialogDescription>
            </div>
          </div>
        </DialogHeader>
        <div className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="referral-link" className="text-sm font-medium">Your referral link</label>
            <div className="flex items-center gap-2">
              <input id="referral-link" type="text" readOnly value="https://example.com/ref/abc123" className="flex h-9 w-full rounded-md border bg-muted px-3 py-1 text-sm" />
              <button className="inline-flex items-center justify-center rounded-md border px-3 py-2 text-sm font-medium hover:bg-accent">
                <Copy className="size-4" />
              </button>
            </div>
          </div>
        </div>
        <DialogFooter>
          <button className="inline-flex items-center justify-center rounded-md bg-primary text-primary-foreground px-4 py-2 text-sm font-medium hover:bg-primary/90">Share</button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function Dialog11() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="inline-flex items-center justify-center rounded-md border bg-background px-4 py-2 text-sm font-medium shadow-xs hover:bg-accent hover:text-accent-foreground">Rating</button>
      </DialogTrigger>
      <DialogContent className="text-center">
        <DialogHeader className="text-center sm:text-center">
          <DialogTitle>How was your experience?</DialogTitle>
          <DialogDescription>Rate us to help improve our service.</DialogDescription>
        </DialogHeader>
        <div className="flex items-center justify-center gap-2 py-4">
          {[1, 2, 3, 4, 5].map((i) => (
            <button key={i} className="text-muted-foreground hover:text-yellow-500 transition-colors">
              <Star className="size-8" />
            </button>
          ))}
        </div>
        <DialogFooter className="sm:justify-center">
          <button className="inline-flex items-center justify-center rounded-md bg-primary text-primary-foreground px-4 py-2 text-sm font-medium hover:bg-primary/90">Submit</button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function Dialog12() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="inline-flex items-center justify-center rounded-md border bg-background px-4 py-2 text-sm font-medium shadow-xs hover:bg-accent hover:text-accent-foreground">OTP code</button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-full bg-muted">
              <KeyRound className="size-5 text-muted-foreground" />
            </div>
            <div>
              <DialogTitle>Enter OTP</DialogTitle>
              <DialogDescription>We sent a code to your email.</DialogDescription>
            </div>
          </div>
        </DialogHeader>
        <div className="flex items-center justify-center gap-2 py-4">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <input key={i} type="text" maxLength={1} className="flex size-10 rounded-md border bg-transparent text-center text-sm shadow-xs focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring" />
          ))}
        </div>
        <DialogFooter>
          <button className="inline-flex w-full items-center justify-center rounded-md bg-primary text-primary-foreground px-4 py-2 text-sm font-medium hover:bg-primary/90">Verify</button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function Dialog13() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="inline-flex items-center justify-center rounded-md border bg-background px-4 py-2 text-sm font-medium shadow-xs hover:bg-accent hover:text-accent-foreground">Sign Up</button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create an account</DialogTitle>
          <DialogDescription>Enter your details to get started.</DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="name-13" className="text-sm font-medium">Name</label>
            <input id="name-13" type="text" placeholder="John Doe" className="flex h-9 w-full rounded-md border bg-transparent px-3 py-1 text-sm shadow-xs placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring" />
          </div>
          <div className="space-y-2">
            <label htmlFor="email-13" className="text-sm font-medium">Email</label>
            <input id="email-13" type="email" placeholder="you@example.com" className="flex h-9 w-full rounded-md border bg-transparent px-3 py-1 text-sm shadow-xs placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring" />
          </div>
          <div className="space-y-2">
            <label htmlFor="password-13" className="text-sm font-medium">Password</label>
            <input id="password-13" type="password" placeholder="********" className="flex h-9 w-full rounded-md border bg-transparent px-3 py-1 text-sm shadow-xs placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring" />
          </div>
        </div>
        <DialogFooter>
          <button className="inline-flex w-full items-center justify-center rounded-md bg-primary text-primary-foreground px-4 py-2 text-sm font-medium hover:bg-primary/90">
            <UserPlus className="mr-2 size-4" /> Sign Up
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function Dialog14() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="inline-flex items-center justify-center rounded-md border bg-background px-4 py-2 text-sm font-medium shadow-xs hover:bg-accent hover:text-accent-foreground">Sign In</button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Welcome back</DialogTitle>
          <DialogDescription>Sign in to your account to continue.</DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="email-14" className="text-sm font-medium">Email</label>
            <input id="email-14" type="email" placeholder="you@example.com" className="flex h-9 w-full rounded-md border bg-transparent px-3 py-1 text-sm shadow-xs placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring" />
          </div>
          <div className="space-y-2">
            <label htmlFor="password-14" className="text-sm font-medium">Password</label>
            <input id="password-14" type="password" placeholder="********" className="flex h-9 w-full rounded-md border bg-transparent px-3 py-1 text-sm shadow-xs placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring" />
          </div>
        </div>
        <DialogFooter>
          <button className="inline-flex w-full items-center justify-center rounded-md bg-primary text-primary-foreground px-4 py-2 text-sm font-medium hover:bg-primary/90">
            <LogIn className="mr-2 size-4" /> Sign In
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function Dialog15() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="inline-flex items-center justify-center rounded-md border bg-background px-4 py-2 text-sm font-medium shadow-xs hover:bg-accent hover:text-accent-foreground">Invite</button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Invite team members</DialogTitle>
          <DialogDescription>Add people to your team by email.</DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="email-15" className="text-sm font-medium">Email address</label>
            <div className="flex items-center gap-2">
              <input id="email-15" type="email" placeholder="colleague@example.com" className="flex h-9 w-full rounded-md border bg-transparent px-3 py-1 text-sm shadow-xs placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring" />
              <button className="inline-flex items-center justify-center rounded-md border px-3 py-2 text-sm font-medium hover:bg-accent">
                <Users className="size-4" />
              </button>
            </div>
          </div>
        </div>
        <DialogFooter>
          <button className="inline-flex items-center justify-center rounded-md border px-4 py-2 text-sm font-medium hover:bg-accent">Cancel</button>
          <button className="inline-flex items-center justify-center rounded-md bg-primary text-primary-foreground px-4 py-2 text-sm font-medium hover:bg-primary/90">Send Invite</button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function Dialog16() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="inline-flex items-center justify-center rounded-md border bg-background px-4 py-2 text-sm font-medium shadow-xs hover:bg-accent hover:text-accent-foreground">Top left align</button>
      </DialogTrigger>
      <DialogContent className="top-4 left-4 translate-x-0 translate-y-0">
        <DialogHeader>
          <DialogTitle>Top Left</DialogTitle>
          <DialogDescription>This dialog is aligned to the top left.</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <button className="inline-flex items-center justify-center rounded-md border px-4 py-2 text-sm font-medium hover:bg-accent">Close</button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function Dialog17() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="inline-flex items-center justify-center rounded-md border bg-background px-4 py-2 text-sm font-medium shadow-xs hover:bg-accent hover:text-accent-foreground">Top align</button>
      </DialogTrigger>
      <DialogContent className="top-4 translate-y-0">
        <DialogHeader>
          <DialogTitle>Top Center</DialogTitle>
          <DialogDescription>This dialog is aligned to the top center.</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <button className="inline-flex items-center justify-center rounded-md border px-4 py-2 text-sm font-medium hover:bg-accent">Close</button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function Dialog18() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="inline-flex items-center justify-center rounded-md border bg-background px-4 py-2 text-sm font-medium shadow-xs hover:bg-accent hover:text-accent-foreground">Top right align</button>
      </DialogTrigger>
      <DialogContent className="top-4 right-4 left-auto translate-x-0 translate-y-0">
        <DialogHeader>
          <DialogTitle>Top Right</DialogTitle>
          <DialogDescription>This dialog is aligned to the top right.</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <button className="inline-flex items-center justify-center rounded-md border px-4 py-2 text-sm font-medium hover:bg-accent">Close</button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function Dialog19() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="inline-flex items-center justify-center rounded-md border bg-background px-4 py-2 text-sm font-medium shadow-xs hover:bg-accent hover:text-accent-foreground">Middle left align</button>
      </DialogTrigger>
      <DialogContent className="left-4 translate-x-0">
        <DialogHeader>
          <DialogTitle>Middle Left</DialogTitle>
          <DialogDescription>This dialog is aligned to the middle left.</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <button className="inline-flex items-center justify-center rounded-md border px-4 py-2 text-sm font-medium hover:bg-accent">Close</button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function Dialog20() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="inline-flex items-center justify-center rounded-md border bg-background px-4 py-2 text-sm font-medium shadow-xs hover:bg-accent hover:text-accent-foreground">Middle right align</button>
      </DialogTrigger>
      <DialogContent className="right-4 left-auto translate-x-0">
        <DialogHeader>
          <DialogTitle>Middle Right</DialogTitle>
          <DialogDescription>This dialog is aligned to the middle right.</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <button className="inline-flex items-center justify-center rounded-md border px-4 py-2 text-sm font-medium hover:bg-accent">Close</button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function Dialog21() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="inline-flex items-center justify-center rounded-md border bg-background px-4 py-2 text-sm font-medium shadow-xs hover:bg-accent hover:text-accent-foreground">Bottom left align</button>
      </DialogTrigger>
      <DialogContent className="bottom-4 top-auto left-4 translate-x-0 translate-y-0">
        <DialogHeader>
          <DialogTitle>Bottom Left</DialogTitle>
          <DialogDescription>This dialog is aligned to the bottom left.</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <button className="inline-flex items-center justify-center rounded-md border px-4 py-2 text-sm font-medium hover:bg-accent">Close</button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function Dialog22() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="inline-flex items-center justify-center rounded-md border bg-background px-4 py-2 text-sm font-medium shadow-xs hover:bg-accent hover:text-accent-foreground">Bottom align</button>
      </DialogTrigger>
      <DialogContent className="bottom-4 top-auto translate-y-0">
        <DialogHeader>
          <DialogTitle>Bottom Center</DialogTitle>
          <DialogDescription>This dialog is aligned to the bottom center.</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <button className="inline-flex items-center justify-center rounded-md border px-4 py-2 text-sm font-medium hover:bg-accent">Close</button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function Dialog23() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="inline-flex items-center justify-center rounded-md border bg-background px-4 py-2 text-sm font-medium shadow-xs hover:bg-accent hover:text-accent-foreground">Bottom right align</button>
      </DialogTrigger>
      <DialogContent className="bottom-4 top-auto right-4 left-auto translate-x-0 translate-y-0">
        <DialogHeader>
          <DialogTitle>Bottom Right</DialogTitle>
          <DialogDescription>This dialog is aligned to the bottom right.</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <button className="inline-flex items-center justify-center rounded-md border px-4 py-2 text-sm font-medium hover:bg-accent">Close</button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function Dialog24() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="inline-flex items-center justify-center rounded-md border bg-background px-4 py-2 text-sm font-medium shadow-xs hover:bg-accent hover:text-accent-foreground">Slide to top</button>
      </DialogTrigger>
      <DialogContent className="top-4 translate-y-0 data-[state=open]:slide-in-from-bottom-full data-[state=closed]:slide-out-to-top-full">
        <DialogHeader>
          <DialogTitle>Slide to Top</DialogTitle>
          <DialogDescription>This dialog slides in from the bottom to the top.</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <button className="inline-flex items-center justify-center rounded-md border px-4 py-2 text-sm font-medium hover:bg-accent">Close</button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function Dialog25() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="inline-flex items-center justify-center rounded-md border bg-background px-4 py-2 text-sm font-medium shadow-xs hover:bg-accent hover:text-accent-foreground">Slide to right</button>
      </DialogTrigger>
      <DialogContent className="right-4 left-auto translate-x-0 data-[state=open]:slide-in-from-left-full data-[state=closed]:slide-out-to-right-full">
        <DialogHeader>
          <DialogTitle>Slide to Right</DialogTitle>
          <DialogDescription>This dialog slides in from the left to the right.</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <button className="inline-flex items-center justify-center rounded-md border px-4 py-2 text-sm font-medium hover:bg-accent">Close</button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function Dialog26() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="inline-flex items-center justify-center rounded-md border bg-background px-4 py-2 text-sm font-medium shadow-xs hover:bg-accent hover:text-accent-foreground">Zoom in</button>
      </DialogTrigger>
      <DialogContent className="data-[state=open]:animate-in data-[state=open]:zoom-in-50 data-[state=closed]:animate-out data-[state=closed]:zoom-out-50">
        <DialogHeader>
          <DialogTitle>Zoom In</DialogTitle>
          <DialogDescription>This dialog uses a zoom-in animation.</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <button className="inline-flex items-center justify-center rounded-md border px-4 py-2 text-sm font-medium hover:bg-accent">Close</button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

// --- Code strings ---
const codes: Record<string, string> = {
  "dialog-01": `import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

export default function Dialog01() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button>Alert Dialog</button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <button>Cancel</button>
          <button>Continue</button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}`,
  "dialog-03": `import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

export default function Dialog03() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button>Alert Dialog Destructive</button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <button>Cancel</button>
          <button className="bg-destructive text-destructive-foreground">Delete</button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}`,
  "dialog-09": `import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

export default function Dialog09() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button>Subscribe</button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Subscribe to our newsletter</DialogTitle>
          <DialogDescription>
            Get the latest updates and news delivered to your inbox.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <input type="email" placeholder="you@example.com" />
        </div>
        <DialogFooter>
          <button>Subscribe</button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}`,
  "dialog-13": `import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { UserPlus } from "lucide-react"

export default function Dialog13() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button>Sign Up</button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create an account</DialogTitle>
          <DialogDescription>Enter your details to get started.</DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <input type="text" placeholder="Name" />
          <input type="email" placeholder="Email" />
          <input type="password" placeholder="Password" />
        </div>
        <DialogFooter>
          <button><UserPlus className="mr-2 size-4" /> Sign Up</button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}`,
  "dialog-16": `import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

export default function Dialog16() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button>Top left align</button>
      </DialogTrigger>
      <DialogContent className="top-4 left-4 translate-x-0 translate-y-0">
        <DialogHeader>
          <DialogTitle>Top Left</DialogTitle>
          <DialogDescription>This dialog is aligned to the top left.</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <button>Close</button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}`,
  "dialog-26": `import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

export default function Dialog26() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button>Zoom in</button>
      </DialogTrigger>
      <DialogContent className="data-[state=open]:zoom-in-50 data-[state=closed]:zoom-out-50">
        <DialogHeader>
          <DialogTitle>Zoom In</DialogTitle>
          <DialogDescription>This dialog uses a zoom-in animation.</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <button>Close</button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}`,
};

function getCode(id: string) {
  return codes[id] || codes["dialog-01"]!.replace("Dialog01", id.replace("dialog-", "Dialog"));
}

// --- Variants ---
const variants = [
  { id: "dialog-01", title: "Dialog 1", preview: <Dialog01 /> },
  { id: "dialog-02", title: "Dialog 2", preview: <Dialog02 /> },
  { id: "dialog-03", title: "Dialog 3", preview: <Dialog03 /> },
  { id: "dialog-04", title: "Dialog 4", preview: <Dialog04 /> },
  { id: "dialog-05", title: "Dialog 5", preview: <Dialog05 /> },
  { id: "dialog-06", title: "Dialog 6", preview: <Dialog06 /> },
  { id: "dialog-07", title: "Dialog 7", preview: <Dialog07 /> },
  { id: "dialog-08", title: "Dialog 8", preview: <Dialog08 /> },
  { id: "dialog-09", title: "Dialog 9", preview: <Dialog09 /> },
  { id: "dialog-10", title: "Dialog 10", preview: <Dialog10 /> },
  { id: "dialog-11", title: "Dialog 11", preview: <Dialog11 /> },
  { id: "dialog-12", title: "Dialog 12", preview: <Dialog12 /> },
  { id: "dialog-13", title: "Dialog 13", preview: <Dialog13 /> },
  { id: "dialog-14", title: "Dialog 14", preview: <Dialog14 /> },
  { id: "dialog-15", title: "Dialog 15", preview: <Dialog15 /> },
  { id: "dialog-16", title: "Dialog 16", preview: <Dialog16 /> },
  { id: "dialog-17", title: "Dialog 17", preview: <Dialog17 /> },
  { id: "dialog-18", title: "Dialog 18", preview: <Dialog18 /> },
  { id: "dialog-19", title: "Dialog 19", preview: <Dialog19 /> },
  { id: "dialog-20", title: "Dialog 20", preview: <Dialog20 /> },
  { id: "dialog-21", title: "Dialog 21", preview: <Dialog21 /> },
  { id: "dialog-22", title: "Dialog 22", preview: <Dialog22 /> },
  { id: "dialog-23", title: "Dialog 23", preview: <Dialog23 /> },
  { id: "dialog-24", title: "Dialog 24", preview: <Dialog24 /> },
  { id: "dialog-25", title: "Dialog 25", preview: <Dialog25 /> },
  { id: "dialog-26", title: "Dialog 26", preview: <Dialog26 /> },
];

export default function DialogPage() {
  return (
    <ComponentLayout>
      {/* Page Header */}
      <div className="mb-4 flex gap-x-8 gap-y-4 max-md:flex-col">
        <div className="space-y-3">
          <h1 className="text-2xl font-bold sm:text-3xl">Shadcn Dialog</h1>
          <p className="text-muted-foreground">
            Explore the collection of awesome Shadcn Dialog Components, featuring {variants.length} dialog
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
          <p className="font-medium">Have any suggestions for Dialog variants?</p>
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
