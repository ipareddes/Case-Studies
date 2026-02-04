"use client";

import { ComponentLayout } from "@/components/layout/component-layout";
import { useState } from "react";
import { X, Sparkles, Code2, Copy, Check, Star, ArrowRight, ArrowLeft, Undo2, Redo2, Trash, Trash2, Download, LoaderCircle, Share, Zap, Heart, Mail, Plus, Settings, LogIn, LogOut, ExternalLink, ChevronRight, ShoppingCart, Bell, Send, Eye, Bookmark, Github, AlertTriangle, MessageSquare, ThumbsUp, ThumbsDown, UserCircle } from "lucide-react";
import ReactDOM from "react-dom";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";

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

// --- Button Variant Previews ---

function Button01() {
  return <Button>Button</Button>;
}

function Button02() {
  return <Button disabled>Verify Email</Button>;
}

function Button03() {
  return (
    <Button className="rounded-full">
      <Star className="h-4 w-4" />
      Star
    </Button>
  );
}

function Button04() {
  return (
    <Button className="group">
      Get In Touch
      <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
    </Button>
  );
}

function Button05() {
  return (
    <div className="flex flex-wrap items-center gap-4">
      <Button variant="outline">
        <Undo2 className="h-4 w-4" />
        Undo
      </Button>
      <Button variant="outline">
        Redo
        <Redo2 className="h-4 w-4" />
      </Button>
    </div>
  );
}

function Button06() {
  return (
    <div className="flex flex-wrap items-center gap-4">
      <Button variant="secondary">Cancel</Button>
      <Button>Save Changes</Button>
    </div>
  );
}

function Button07() {
  return <Button className="h-10 rounded-md px-6">Large</Button>;
}

function Button08() {
  return <Button size="sm">Small</Button>;
}

function Button09() {
  return <Button className="h-7 px-2 py-1 text-xs rounded-md">Extra Small</Button>;
}

function Button10() {
  return (
    <Button className="bg-gradient-to-r from-destructive via-destructive/60 to-destructive [background-size:200%_auto] text-white hover:bg-[99%_center] border-none">
      <Trash className="h-4 w-4" />
      Delete
    </Button>
  );
}

function Button11() {
  return (
    <Button className="from-primary via-primary/60 to-primary bg-gradient-to-r [background-size:200%_auto] hover:bg-[99%_center] text-primary-foreground border-none">
      Get Started
    </Button>
  );
}

function Button12() {
  return (
    <Button className="bg-gradient-to-r from-amber-600 via-amber-600/60 to-amber-600 [background-size:200%_auto] text-white hover:bg-[99%_center] border-none dark:from-amber-400 dark:via-amber-400/60 dark:to-amber-400">
      Upgrade <Zap className="h-4 w-4" />
    </Button>
  );
}

function Button13() {
  return (
    <Button variant="outline" className="border-sky-600 text-sky-600 hover:bg-sky-600/10 dark:border-sky-400 dark:text-sky-400 dark:hover:bg-sky-400/10">
      <Copy className="h-4 w-4" />
      Duplicate
    </Button>
  );
}

function Button14() {
  return (
    <Button variant="outline" className="border-primary border-dashed shadow-none">
      <Download className="h-4 w-4" />
      Download
    </Button>
  );
}

function Button15() {
  return (
    <Button variant="outline" className="hover:bg-destructive/10 text-destructive border-destructive">
      <Trash2 className="h-4 w-4" />
      Discard
    </Button>
  );
}

function Button16() {
  return (
    <Button variant="ghost" className="group">
      <ArrowLeft className="h-4 w-4 transition-transform duration-200 group-hover:-translate-x-0.5" />
      Go to settings
    </Button>
  );
}

function Button17() {
  return (
    <Button disabled>
      <LoaderCircle className="h-4 w-4 animate-spin" />
      Loading
    </Button>
  );
}

function Button18() {
  return (
    <Button variant="link" asChild className="relative !no-underline after:bg-primary after:absolute after:bottom-2 after:h-px after:w-2/3 after:origin-bottom-right after:scale-x-0 after:transition-transform after:duration-300 after:ease-in-out hover:after:origin-bottom-left hover:after:scale-x-100">
      <a href="#">Contact Us</a>
    </Button>
  );
}

function Button19() {
  return (
    <Button variant="outline" className="h-12 rounded-full px-2.5">
      <span className="bg-primary text-primary-foreground flex size-7 items-center justify-center rounded-full">
        <Share className="h-4 w-4" />
      </span>
      Publish
    </Button>
  );
}

function Button20() {
  return (
    <Button variant="destructive">
      <Trash className="h-4 w-4" />
      Delete Account
    </Button>
  );
}

function Button21() {
  return (
    <Button variant="outline" className="rounded-full">
      <Heart className="h-4 w-4" />
      Like
    </Button>
  );
}

function Button22() {
  return (
    <Button variant="secondary">
      <Mail className="h-4 w-4" />
      Subscribe
    </Button>
  );
}

function Button23() {
  return (
    <Button size="icon">
      <Plus className="h-4 w-4" />
    </Button>
  );
}

function Button24() {
  return (
    <Button size="icon" variant="outline" className="rounded-full">
      <Settings className="h-4 w-4" />
    </Button>
  );
}

function Button25() {
  return (
    <Button size="icon" variant="ghost">
      <Bell className="h-4 w-4" />
    </Button>
  );
}

function Button26() {
  return (
    <div className="flex flex-wrap items-center gap-4">
      <Button variant="outline">
        <LogIn className="h-4 w-4" />
        Sign In
      </Button>
      <Button>
        Sign Up
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  );
}

function Button27() {
  return (
    <Button className="w-full">
      <ShoppingCart className="h-4 w-4" />
      Add to Cart
    </Button>
  );
}

function Button28() {
  return (
    <Button variant="link">
      Learn More
      <ExternalLink className="h-4 w-4" />
    </Button>
  );
}

function Button29() {
  return (
    <Button variant="outline" className="group">
      <Send className="h-4 w-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
      Send Message
    </Button>
  );
}

function Button30() {
  return (
    <div className="flex flex-wrap items-center gap-4">
      <Button variant="outline" size="sm">
        <Eye className="h-4 w-4" />
        Preview
      </Button>
      <Button size="sm">
        <Send className="h-4 w-4" />
        Publish
      </Button>
    </div>
  );
}

function Button31() {
  return (
    <Button variant="ghost" className="text-destructive hover:text-destructive hover:bg-destructive/10">
      <LogOut className="h-4 w-4" />
      Sign Out
    </Button>
  );
}

function Button32() {
  return (
    <Button className="rounded-none">
      <Bookmark className="h-4 w-4" />
      Save for Later
    </Button>
  );
}

function Button33() {
  return (
    <Button variant="outline" className="bg-zinc-900 text-white border-zinc-700 hover:bg-zinc-800 hover:text-white dark:bg-white dark:text-zinc-900 dark:border-zinc-300 dark:hover:bg-zinc-100 dark:hover:text-zinc-900">
      <Github className="h-4 w-4" />
      Continue with GitHub
    </Button>
  );
}

function Button34() {
  return (
    <div className="flex items-center rounded-md border overflow-hidden">
      <Button variant="ghost" className="rounded-none border-r">
        <Heart className="h-4 w-4" />
        Like
      </Button>
      <Button variant="ghost" className="rounded-none border-r">
        <Share className="h-4 w-4" />
        Share
      </Button>
      <Button variant="ghost" className="rounded-none">
        <Bookmark className="h-4 w-4" />
        Save
      </Button>
    </div>
  );
}

function Button35() {
  return (
    <Button className="bg-gradient-to-r from-violet-600 to-indigo-600 text-white border-none hover:from-violet-700 hover:to-indigo-700">
      <Sparkles className="h-4 w-4" />
      Generate with AI
    </Button>
  );
}

// Social Login Buttons
function Button36() {
  return (
    <Button variant="outline" className="w-full">
      <svg className="h-4 w-4" viewBox="0 0 24 24">
        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
      </svg>
      Continue with Google
    </Button>
  );
}

function Button37() {
  return (
    <Button variant="outline" className="w-full bg-black text-white border-black hover:bg-black/90 hover:text-white dark:bg-white dark:text-black dark:border-white dark:hover:bg-white/90 dark:hover:text-black">
      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
      </svg>
      Continue with X
    </Button>
  );
}

function Button38() {
  return (
    <Button variant="outline" className="w-full bg-[#1877F2] text-white border-[#1877F2] hover:bg-[#1877F2]/90 hover:text-white">
      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
      </svg>
      Continue with Facebook
    </Button>
  );
}

// Badge Integration Buttons
function Button39() {
  return (
    <Button variant="outline" className="relative">
      <MessageSquare className="h-4 w-4" />
      Messages
      <span className="ml-2 inline-flex items-center justify-center rounded-full bg-primary px-2 py-0.5 text-xs font-medium text-primary-foreground">
        99+
      </span>
    </Button>
  );
}

function Button40() {
  return (
    <Button variant="outline" className="relative">
      <AlertTriangle className="h-4 w-4 text-amber-500" />
      Caution
      <span className="ml-2 inline-flex items-center justify-center rounded-full bg-amber-500 px-2 py-0.5 text-xs font-medium text-white">
        3
      </span>
    </Button>
  );
}

function Button41() {
  return (
    <Button variant="secondary" className="relative">
      <Bell className="h-4 w-4" />
      Notifications
      <span className="absolute -top-1.5 -right-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-destructive text-xs font-medium text-destructive-foreground">
        8
      </span>
    </Button>
  );
}

// Approval Workflow Buttons
function Button42() {
  return (
    <div className="flex flex-wrap items-center gap-4">
      <Button variant="outline" className="border-destructive text-destructive hover:bg-destructive/10">
        <ThumbsDown className="h-4 w-4" />
        Reject
      </Button>
      <Button className="bg-emerald-600 hover:bg-emerald-700 text-white">
        <ThumbsUp className="h-4 w-4" />
        Approve
      </Button>
    </div>
  );
}

// User-Associated Button
function Button43() {
  return (
    <Button variant="outline" className="pl-2">
      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs font-medium text-primary-foreground">
        HR
      </span>
      @hallierichards
    </Button>
  );
}

// Copy with State Feedback
function Button44() {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText("npm install @shadcn/ui");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Button variant="outline" onClick={handleCopy} className="min-w-[120px]">
      {copied ? (
        <>
          <Check className="h-4 w-4 text-emerald-500" />
          Copied!
        </>
      ) : (
        <>
          <Copy className="h-4 w-4" />
          Copy
        </>
      )}
    </Button>
  );
}

// Animated Variants

// Ripple Effect Button
function Button45() {
  const [ripples, setRipples] = useState<Array<{ x: number; y: number; id: number }>>([]);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const id = Date.now();
    setRipples((prev) => [...prev, { x, y, id }]);
    setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== id));
    }, 600);
  };

  return (
    <Button onClick={handleClick} className="relative overflow-hidden">
      {ripples.map((ripple) => (
        <span
          key={ripple.id}
          className="absolute rounded-full bg-white/30 animate-[ripple_0.6s_ease-out]"
          style={{
            left: ripple.x - 50,
            top: ripple.y - 50,
            width: 100,
            height: 100,
          }}
        />
      ))}
      Ripple Effect
    </Button>
  );
}

// Ring Hover Button
function Button46() {
  return (
    <Button className="relative overflow-hidden transition-all duration-300 hover:ring-2 hover:ring-primary hover:ring-offset-2 hover:ring-offset-background">
      Ring Hover
    </Button>
  );
}

// Shine Hover Button
function Button47() {
  return (
    <Button className="relative overflow-hidden group">
      <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:translate-x-full transition-transform duration-700" />
      Shine Hover
    </Button>
  );
}

// Tap Animation Button
function Button48() {
  return (
    <Button className="transition-transform duration-150 active:scale-95">
      Tap Animation
    </Button>
  );
}

// Shimmer Button
function Button49() {
  return (
    <Button className="relative overflow-hidden bg-gradient-to-r from-primary via-primary/80 to-primary bg-[length:200%_100%] animate-[shimmer_2s_linear_infinite]">
      Shimmer Button
    </Button>
  );
}

// Bounce Button
function Button50() {
  return (
    <Button className="transition-transform duration-300 hover:animate-bounce">
      Bounce Button
    </Button>
  );
}

// Heartbeat Effect Button
function Button51() {
  return (
    <Button className="animate-[heartbeat_1.5s_ease-in-out_infinite]">
      <Heart className="h-4 w-4 fill-current" />
      Heartbeat
    </Button>
  );
}

// Glass Button
function Button52() {
  return (
    <Button className="bg-white/10 backdrop-blur-md border border-white/20 text-foreground hover:bg-white/20 shadow-lg">
      Glass Button
    </Button>
  );
}

// Grow Button
function Button53() {
  return (
    <Button className="transition-transform duration-300 hover:scale-110">
      Grow Button
    </Button>
  );
}

// Glow Button
function Button54() {
  return (
    <Button className="shadow-[0_0_15px_rgba(var(--primary),0.5)] hover:shadow-[0_0_25px_rgba(var(--primary),0.7)] transition-shadow duration-300">
      Glow Button
    </Button>
  );
}

// Slide Background Button
function Button55() {
  return (
    <Button variant="outline" className="relative overflow-hidden group">
      <span className="absolute inset-0 bg-primary -translate-x-full group-hover:translate-x-0 transition-transform duration-300" />
      <span className="relative group-hover:text-primary-foreground transition-colors duration-300">Slide Background</span>
    </Button>
  );
}

// --- Code strings ---
const codes: Record<string, string> = {
  "button-01": `import { Button } from "@/components/ui/button"

export default function Button01() {
  return <Button>Button</Button>
}`,
  "button-02": `import { Button } from "@/components/ui/button"

export default function Button02() {
  return <Button disabled>Verify Email</Button>
}`,
  "button-03": `import { Button } from "@/components/ui/button"
import { Star } from "lucide-react"

export default function Button03() {
  return (
    <Button className="rounded-full">
      <Star className="h-4 w-4" />
      Star
    </Button>
  )
}`,
  "button-04": `import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export default function Button04() {
  return (
    <Button className="group">
      Get In Touch
      <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
    </Button>
  )
}`,
  "button-10": `import { Button } from "@/components/ui/button"
import { Trash } from "lucide-react"

export default function Button10() {
  return (
    <Button className="bg-gradient-to-r from-destructive via-destructive/60 to-destructive [background-size:200%_auto] text-white hover:bg-[99%_center] border-none">
      <Trash className="h-4 w-4" />
      Delete
    </Button>
  )
}`,
  "button-17": `import { Button } from "@/components/ui/button"
import { LoaderCircle } from "lucide-react"

export default function Button17() {
  return (
    <Button disabled>
      <LoaderCircle className="h-4 w-4 animate-spin" />
      Loading
    </Button>
  )
}`,
  "button-23": `import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"

export default function Button23() {
  return (
    <Button size="icon">
      <Plus className="h-4 w-4" />
    </Button>
  )
}`,
  "button-27": `import { Button } from "@/components/ui/button"
import { ShoppingCart } from "lucide-react"

export default function Button27() {
  return (
    <Button className="w-full">
      <ShoppingCart className="h-4 w-4" />
      Add to Cart
    </Button>
  )
}`,
  "button-33": `import { Button } from "@/components/ui/button"
import { Github } from "lucide-react"

export default function Button33() {
  return (
    <Button variant="outline" className="bg-zinc-900 text-white border-zinc-700 hover:bg-zinc-800 hover:text-white dark:bg-white dark:text-zinc-900 dark:border-zinc-300 dark:hover:bg-zinc-100 dark:hover:text-zinc-900">
      <Github className="h-4 w-4" />
      Continue with GitHub
    </Button>
  )
}`,
  "button-35": `import { Button } from "@/components/ui/button"
import { Sparkles } from "lucide-react"

export default function Button35() {
  return (
    <Button className="bg-gradient-to-r from-violet-600 to-indigo-600 text-white border-none hover:from-violet-700 hover:to-indigo-700">
      <Sparkles className="h-4 w-4" />
      Generate with AI
    </Button>
  )
}`,
  "button-36": `import { Button } from "@/components/ui/button"

export default function Button36() {
  return (
    <Button variant="outline" className="w-full">
      <svg className="h-4 w-4" viewBox="0 0 24 24">
        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
      </svg>
      Continue with Google
    </Button>
  )
}`,
  "button-37": `import { Button } from "@/components/ui/button"

export default function Button37() {
  return (
    <Button variant="outline" className="w-full bg-black text-white border-black hover:bg-black/90 hover:text-white dark:bg-white dark:text-black dark:border-white dark:hover:bg-white/90 dark:hover:text-black">
      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
      </svg>
      Continue with X
    </Button>
  )
}`,
  "button-38": `import { Button } from "@/components/ui/button"

export default function Button38() {
  return (
    <Button variant="outline" className="w-full bg-[#1877F2] text-white border-[#1877F2] hover:bg-[#1877F2]/90 hover:text-white">
      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
      </svg>
      Continue with Facebook
    </Button>
  )
}`,
  "button-39": `import { Button } from "@/components/ui/button"
import { MessageSquare } from "lucide-react"

export default function Button39() {
  return (
    <Button variant="outline" className="relative">
      <MessageSquare className="h-4 w-4" />
      Messages
      <span className="ml-2 inline-flex items-center justify-center rounded-full bg-primary px-2 py-0.5 text-xs font-medium text-primary-foreground">
        99+
      </span>
    </Button>
  )
}`,
  "button-40": `import { Button } from "@/components/ui/button"
import { AlertTriangle } from "lucide-react"

export default function Button40() {
  return (
    <Button variant="outline" className="relative">
      <AlertTriangle className="h-4 w-4 text-amber-500" />
      Caution
      <span className="ml-2 inline-flex items-center justify-center rounded-full bg-amber-500 px-2 py-0.5 text-xs font-medium text-white">
        3
      </span>
    </Button>
  )
}`,
  "button-41": `import { Button } from "@/components/ui/button"
import { Bell } from "lucide-react"

export default function Button41() {
  return (
    <Button variant="secondary" className="relative">
      <Bell className="h-4 w-4" />
      Notifications
      <span className="absolute -top-1.5 -right-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-destructive text-xs font-medium text-destructive-foreground">
        8
      </span>
    </Button>
  )
}`,
  "button-42": `import { Button } from "@/components/ui/button"
import { ThumbsDown, ThumbsUp } from "lucide-react"

export default function Button42() {
  return (
    <div className="flex flex-wrap items-center gap-4">
      <Button variant="outline" className="border-destructive text-destructive hover:bg-destructive/10">
        <ThumbsDown className="h-4 w-4" />
        Reject
      </Button>
      <Button className="bg-emerald-600 hover:bg-emerald-700 text-white">
        <ThumbsUp className="h-4 w-4" />
        Approve
      </Button>
    </div>
  )
}`,
  "button-43": `import { Button } from "@/components/ui/button"

export default function Button43() {
  return (
    <Button variant="outline" className="pl-2">
      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs font-medium text-primary-foreground">
        HR
      </span>
      @hallierichards
    </Button>
  )
}`,
  "button-44": `import { Button } from "@/components/ui/button"
import { Copy, Check } from "lucide-react"
import { useState } from "react"

export default function Button44() {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText("npm install @shadcn/ui")
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <Button variant="outline" onClick={handleCopy} className="min-w-[120px]">
      {copied ? (
        <>
          <Check className="h-4 w-4 text-emerald-500" />
          Copied!
        </>
      ) : (
        <>
          <Copy className="h-4 w-4" />
          Copy
        </>
      )}
    </Button>
  )
}`,
  "button-45": `import { Button } from "@/components/ui/button"
import { useState } from "react"

export default function Button45() {
  const [ripples, setRipples] = useState<Array<{ x: number; y: number; id: number }>>([])

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const id = Date.now()
    setRipples((prev) => [...prev, { x, y, id }])
    setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== id))
    }, 600)
  }

  return (
    <Button onClick={handleClick} className="relative overflow-hidden">
      {ripples.map((ripple) => (
        <span
          key={ripple.id}
          className="absolute rounded-full bg-white/30 animate-[ripple_0.6s_ease-out]"
          style={{
            left: ripple.x - 50,
            top: ripple.y - 50,
            width: 100,
            height: 100,
          }}
        />
      ))}
      Ripple Effect
    </Button>
  )
}`,
  "button-46": `import { Button } from "@/components/ui/button"

export default function Button46() {
  return (
    <Button className="relative overflow-hidden transition-all duration-300 hover:ring-2 hover:ring-primary hover:ring-offset-2 hover:ring-offset-background">
      Ring Hover
    </Button>
  )
}`,
  "button-47": `import { Button } from "@/components/ui/button"

export default function Button47() {
  return (
    <Button className="relative overflow-hidden group">
      <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:translate-x-full transition-transform duration-700" />
      Shine Hover
    </Button>
  )
}`,
  "button-48": `import { Button } from "@/components/ui/button"

export default function Button48() {
  return (
    <Button className="transition-transform duration-150 active:scale-95">
      Tap Animation
    </Button>
  )
}`,
  "button-49": `import { Button } from "@/components/ui/button"

export default function Button49() {
  return (
    <Button className="relative overflow-hidden bg-gradient-to-r from-primary via-primary/80 to-primary bg-[length:200%_100%] animate-[shimmer_2s_linear_infinite]">
      Shimmer Button
    </Button>
  )
}`,
  "button-50": `import { Button } from "@/components/ui/button"

export default function Button50() {
  return (
    <Button className="transition-transform duration-300 hover:animate-bounce">
      Bounce Button
    </Button>
  )
}`,
  "button-51": `import { Button } from "@/components/ui/button"
import { Heart } from "lucide-react"

export default function Button51() {
  return (
    <Button className="animate-[heartbeat_1.5s_ease-in-out_infinite]">
      <Heart className="h-4 w-4 fill-current" />
      Heartbeat
    </Button>
  )
}`,
  "button-52": `import { Button } from "@/components/ui/button"

export default function Button52() {
  return (
    <Button className="bg-white/10 backdrop-blur-md border border-white/20 text-foreground hover:bg-white/20 shadow-lg">
      Glass Button
    </Button>
  )
}`,
  "button-53": `import { Button } from "@/components/ui/button"

export default function Button53() {
  return (
    <Button className="transition-transform duration-300 hover:scale-110">
      Grow Button
    </Button>
  )
}`,
  "button-54": `import { Button } from "@/components/ui/button"

export default function Button54() {
  return (
    <Button className="shadow-[0_0_15px_rgba(var(--primary),0.5)] hover:shadow-[0_0_25px_rgba(var(--primary),0.7)] transition-shadow duration-300">
      Glow Button
    </Button>
  )
}`,
  "button-55": `import { Button } from "@/components/ui/button"

export default function Button55() {
  return (
    <Button variant="outline" className="relative overflow-hidden group">
      <span className="absolute inset-0 bg-primary -translate-x-full group-hover:translate-x-0 transition-transform duration-300" />
      <span className="relative group-hover:text-primary-foreground transition-colors duration-300">Slide Background</span>
    </Button>
  )
}`,
};

function getCode(id: string) {
  return codes[id] || codes["button-01"]!.replace("Button01", id.replace("button-", "Button"));
}

// --- Variants ---
const variants = [
  { id: "button-01", title: "Button 1", preview: <Button01 /> },
  { id: "button-02", title: "Button 2", preview: <Button02 /> },
  { id: "button-03", title: "Button 3", preview: <Button03 /> },
  { id: "button-04", title: "Button 4", preview: <Button04 /> },
  { id: "button-05", title: "Button 5", preview: <Button05 /> },
  { id: "button-06", title: "Button 6", preview: <Button06 /> },
  { id: "button-07", title: "Button 7", preview: <Button07 /> },
  { id: "button-08", title: "Button 8", preview: <Button08 /> },
  { id: "button-09", title: "Button 9", preview: <Button09 /> },
  { id: "button-10", title: "Button 10", preview: <Button10 /> },
  { id: "button-11", title: "Button 11", preview: <Button11 /> },
  { id: "button-12", title: "Button 12", preview: <Button12 /> },
  { id: "button-13", title: "Button 13", preview: <Button13 /> },
  { id: "button-14", title: "Button 14", preview: <Button14 /> },
  { id: "button-15", title: "Button 15", preview: <Button15 /> },
  { id: "button-16", title: "Button 16", preview: <Button16 /> },
  { id: "button-17", title: "Button 17", preview: <Button17 /> },
  { id: "button-18", title: "Button 18", preview: <Button18 /> },
  { id: "button-19", title: "Button 19", preview: <Button19 /> },
  { id: "button-20", title: "Button 20", preview: <Button20 /> },
  { id: "button-21", title: "Button 21", preview: <Button21 /> },
  { id: "button-22", title: "Button 22", preview: <Button22 /> },
  { id: "button-23", title: "Button 23", preview: <Button23 /> },
  { id: "button-24", title: "Button 24", preview: <Button24 /> },
  { id: "button-25", title: "Button 25", preview: <Button25 /> },
  { id: "button-26", title: "Button 26", preview: <Button26 /> },
  { id: "button-27", title: "Button 27", preview: <Button27 /> },
  { id: "button-28", title: "Button 28", preview: <Button28 /> },
  { id: "button-29", title: "Button 29", preview: <Button29 /> },
  { id: "button-30", title: "Button 30", preview: <Button30 /> },
  { id: "button-31", title: "Button 31", preview: <Button31 /> },
  { id: "button-32", title: "Button 32", preview: <Button32 /> },
  { id: "button-33", title: "Button 33", preview: <Button33 /> },
  { id: "button-34", title: "Button 34", preview: <Button34 /> },
  { id: "button-35", title: "Button 35", preview: <Button35 /> },
  { id: "button-36", title: "Button 36", preview: <Button36 /> },
  { id: "button-37", title: "Button 37", preview: <Button37 /> },
  { id: "button-38", title: "Button 38", preview: <Button38 /> },
  { id: "button-39", title: "Button 39", preview: <Button39 /> },
  { id: "button-40", title: "Button 40", preview: <Button40 /> },
  { id: "button-41", title: "Button 41", preview: <Button41 /> },
  { id: "button-42", title: "Button 42", preview: <Button42 /> },
  { id: "button-43", title: "Button 43", preview: <Button43 /> },
  { id: "button-44", title: "Button 44", preview: <Button44 /> },
  { id: "button-45", title: "Button 45", preview: <Button45 /> },
  { id: "button-46", title: "Button 46", preview: <Button46 /> },
  { id: "button-47", title: "Button 47", preview: <Button47 /> },
  { id: "button-48", title: "Button 48", preview: <Button48 /> },
  { id: "button-49", title: "Button 49", preview: <Button49 /> },
  { id: "button-50", title: "Button 50", preview: <Button50 /> },
  { id: "button-51", title: "Button 51", preview: <Button51 /> },
  { id: "button-52", title: "Button 52", preview: <Button52 /> },
  { id: "button-53", title: "Button 53", preview: <Button53 /> },
  { id: "button-54", title: "Button 54", preview: <Button54 /> },
  { id: "button-55", title: "Button 55", preview: <Button55 /> },
];

export default function ButtonPage() {
  return (
    <ComponentLayout>
      {/* Page Header */}
      <div className="mb-4 flex gap-x-8 gap-y-4 max-md:flex-col">
        <div className="space-y-3">
          <h1 className="text-2xl font-bold sm:text-3xl">Shadcn Button</h1>
          <p className="text-muted-foreground">
            Explore the collection of awesome Shadcn Button Components, featuring {variants.length} button
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
          <p className="font-medium">Have any suggestions for Button variants?</p>
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
