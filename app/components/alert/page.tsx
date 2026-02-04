"use client";

import { ComponentLayout } from "@/components/layout/component-layout";
import { useState } from "react";
import { X, Sparkles, Code2, Copy, Check, CircleAlert, TriangleAlert, FileWarning, UserCheck, UserRoundX, Upload, CheckCheck } from "lucide-react";
import ReactDOM from "react-dom";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";

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

// --- Alert Variant Previews ---

function Alert01() {
  return (
    <Alert className="bg-card text-card-foreground">
      <CircleAlert className="h-4 w-4" />
      <AlertTitle>New message!</AlertTitle>
    </Alert>
  );
}

function Alert02() {
  return (
    <div role="alert" className="relative w-full rounded-lg border bg-card text-card-foreground px-4 py-3 text-sm flex items-center justify-between">
      <span className="relative flex size-8 shrink-0 overflow-hidden rounded-sm">
        <span className="flex size-full items-center justify-center bg-muted rounded-sm text-xs font-bold">HR</span>
      </span>
      <div className="flex-1 flex-col justify-center gap-1 ml-3">
        <div className="line-clamp-1 min-h-4 font-medium tracking-tight flex-1">Sara has replied on the uploaded image.</div>
        <div className="text-muted-foreground text-sm">12 unread messages. Tap to see.</div>
      </div>
      <CircleAlert className="h-4 w-4 shrink-0 ml-3" />
    </div>
  );
}

function Alert03() {
  return (
    <div role="alert" className="relative w-full rounded-lg border bg-card text-card-foreground px-4 py-3 text-sm flex justify-between items-start">
      <CircleAlert className="h-4 w-4 mt-0.5 shrink-0" />
      <div className="flex-1 flex-col justify-center gap-1 ml-3">
        <div className="line-clamp-1 min-h-4 font-medium tracking-tight">New message!</div>
        <div className="text-muted-foreground text-sm">12 unread messages. Tap to see.</div>
      </div>
      <button className="cursor-pointer shrink-0 ml-3">
        <X className="size-5" />
        <span className="sr-only">Close</span>
      </button>
    </div>
  );
}

function Alert04() {
  return (
    <div role="alert" className="relative w-full rounded-lg border border-sky-600 dark:border-sky-400 bg-card text-sky-600 dark:text-sky-400 px-4 py-3 text-sm flex items-center justify-between">
      <CircleAlert className="h-4 w-4 shrink-0" />
      <div className="line-clamp-1 min-h-4 font-medium tracking-tight flex-1 ml-3">New message!</div>
      <a href="#" className="inline-flex shrink-0 items-center justify-center gap-2 text-sm font-medium rounded-md border border-sky-600/30 dark:border-sky-400/30 px-3 py-1 hover:bg-sky-600/10">Link</a>
    </div>
  );
}

function Alert05() {
  return (
    <div role="alert" className="relative w-full rounded-lg border bg-card text-card-foreground text-sm flex items-stretch p-0 overflow-hidden">
      <div className="bg-destructive/10 text-destructive flex items-center border-r p-2 rounded-l-lg">
        <FileWarning className="size-4" />
      </div>
      <div className="line-clamp-1 min-h-4 font-medium tracking-tight p-3">This file contains virus!</div>
    </div>
  );
}

function Alert06() {
  return (
    <div role="alert" className="relative w-full rounded-lg border bg-card text-card-foreground px-4 py-3 text-sm flex items-center gap-3">
      <span className="relative flex size-8 shrink-0 overflow-hidden rounded-md">
        <span className="flex size-full items-center justify-center bg-destructive dark:bg-destructive/60 rounded-md text-white">
          <FileWarning className="size-4" />
        </span>
      </span>
      <div className="line-clamp-1 min-h-4 font-medium tracking-tight">This file contains virus!</div>
    </div>
  );
}

function Alert07() {
  return (
    <div role="alert" className="relative w-full rounded-lg border bg-card text-card-foreground px-4 py-3 text-sm flex justify-between items-start">
      <Upload className="h-4 w-4 mt-0.5 shrink-0" />
      <div className="flex flex-1 flex-col gap-4 ml-3">
        <div className="flex-1 flex-col justify-center gap-1">
          <div className="line-clamp-1 min-h-4 font-medium tracking-tight">Uploading your &apos;Img-234.png&apos;</div>
          <div className="text-muted-foreground text-sm">Please wait while we upload your image.</div>
        </div>
        <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
          <div className="h-full w-3/5 rounded-full bg-primary" />
        </div>
        <div className="flex items-center gap-2">
          <button className="inline-flex items-center justify-center rounded-md border px-3 py-1 text-sm font-medium hover:bg-muted transition-colors">Cancel</button>
          <button className="inline-flex items-center justify-center rounded-md border px-3 py-1 text-sm font-medium hover:bg-muted transition-colors">Upload another</button>
        </div>
      </div>
    </div>
  );
}

function Alert08() {
  return (
    <div role="alert" className="relative w-full rounded-lg bg-primary text-primary-foreground px-4 py-3 text-sm flex justify-between items-start border-none">
      <CircleAlert className="h-4 w-4 mt-0.5 shrink-0" />
      <div className="flex flex-1 flex-col gap-4 ml-3">
        <div className="flex-1 flex-col justify-center gap-1">
          <div className="line-clamp-1 min-h-4 font-medium tracking-tight">A new update is available</div>
          <div className="text-primary-foreground/80 text-sm">Includes the new dashboard view. Pages and exports will now load faster.</div>
        </div>
        <div className="flex items-center gap-2">
          <button className="inline-flex items-center justify-center rounded-md border border-primary-foreground/20 px-3 py-1 text-sm font-medium hover:bg-primary-foreground/10 transition-colors">Skip this update</button>
          <button className="inline-flex items-center justify-center rounded-md bg-primary-foreground text-primary px-3 py-1 text-sm font-medium hover:bg-primary-foreground/90 transition-colors">Install now</button>
        </div>
      </div>
      <button className="cursor-pointer shrink-0 ml-3">
        <X className="size-5" />
        <span className="sr-only">Close</span>
      </button>
    </div>
  );
}

function Alert09() {
  return (
    <div role="alert" className="relative w-full rounded-lg border bg-card text-card-foreground px-4 py-3 text-sm flex gap-3 items-start">
      <span className="relative flex size-8 shrink-0 overflow-hidden rounded-sm">
        <span className="flex size-full items-center justify-center bg-muted rounded-sm text-xs font-bold">RK</span>
      </span>
      <div className="flex flex-1 flex-col gap-2">
        <div className="flex-1 flex-col justify-center gap-1">
          <div className="line-clamp-1 min-h-4 font-medium tracking-tight">@Rocky</div>
          <div className="text-muted-foreground text-sm">this projects task is remaining, deadline is near.</div>
        </div>
        <div className="h-1.5 w-full rounded-full bg-muted overflow-hidden">
          <div className="h-full w-2/3 rounded-full bg-primary animate-pulse" />
        </div>
      </div>
    </div>
  );
}

function Alert10() {
  return (
    <div role="alert" className="relative w-full rounded-lg border border-accent-foreground/20 bg-gradient-to-b from-accent to-transparent to-60% text-accent-foreground px-4 py-3 text-sm flex justify-between items-start">
      <CircleAlert className="h-4 w-4 mt-0.5 shrink-0" />
      <div className="flex flex-1 flex-col gap-1 ml-3">
        <div className="line-clamp-1 min-h-4 font-medium tracking-tight">Verify your email to activate your account</div>
        <div className="text-accent-foreground/60 text-sm">We&apos;ve sent a confirmation link to your inbox. Check your email to complete the sign-up.</div>
      </div>
      <button className="cursor-pointer shrink-0 ml-3">
        <X className="size-5" />
        <span className="sr-only">Close</span>
      </button>
    </div>
  );
}

function Alert11() {
  return (
    <Alert className="rounded-md border-l-[6px] border-green-600 bg-green-600/10 text-green-600 dark:border-green-400 dark:bg-green-400/10 dark:text-green-400">
      <UserCheck className="h-4 w-4" />
      <AlertTitle>Your request to join the team is approved.</AlertTitle>
    </Alert>
  );
}

function Alert12() {
  return (
    <Alert className="rounded-none border-0 border-l-[6px] border-destructive bg-destructive/10 text-destructive">
      <UserRoundX className="h-4 w-4" />
      <AlertTitle>Your request to join the team is denied.</AlertTitle>
    </Alert>
  );
}

function Alert13() {
  return (
    <div role="alert" className="relative w-full rounded-lg border bg-card text-card-foreground px-4 py-3 text-sm flex items-center justify-between">
      <CircleAlert className="h-4 w-4 shrink-0" />
      <div className="line-clamp-1 min-h-4 font-medium tracking-tight flex-1 ml-3">New message!</div>
      <button className="inline-flex shrink-0 items-center justify-center gap-2 text-sm font-medium rounded-md border px-3 py-1 hover:bg-muted transition-colors">Open</button>
    </div>
  );
}

function Alert14() {
  return (
    <Alert className="text-destructive bg-card *:data-[slot=alert-description]:text-destructive/90 [&>svg]:text-current">
      <TriangleAlert className="h-4 w-4" />
      <AlertTitle>Something went wrong!</AlertTitle>
    </Alert>
  );
}

function Alert15() {
  return (
    <Alert className="text-destructive bg-card border-destructive *:data-[slot=alert-description]:text-destructive/90 [&>svg]:text-current">
      <TriangleAlert className="h-4 w-4" />
      <AlertTitle>Unable to process your payment.</AlertTitle>
    </Alert>
  );
}

function Alert16() {
  return (
    <Alert className="bg-card text-card-foreground">
      <AlertTitle>New message!</AlertTitle>
    </Alert>
  );
}

function Alert17() {
  return (
    <Alert className="bg-card text-card-foreground">
      <CircleAlert className="h-4 w-4" />
      <AlertTitle>Creating your account</AlertTitle>
      <AlertDescription>Fill in your details to get started.</AlertDescription>
    </Alert>
  );
}

function Alert18() {
  return (
    <Alert className="bg-card border-sky-600 text-sky-600 dark:border-sky-400 dark:text-sky-400 [&>svg]:text-current">
      <CircleAlert className="h-4 w-4" />
      <AlertTitle>Verify your email to activate your account</AlertTitle>
      <AlertDescription className="text-sky-600/80 dark:text-sky-400/80">We&apos;ve sent a confirmation link to your inbox. Check your email to complete the sign-up.</AlertDescription>
    </Alert>
  );
}

function Alert19() {
  return (
    <Alert className="bg-card border-green-600 text-green-600 dark:border-green-400 dark:text-green-400 [&>svg]:text-current">
      <CheckCheck className="h-4 w-4" />
      <AlertTitle>Account created successfully</AlertTitle>
      <AlertDescription className="text-green-600/80 dark:text-green-400/80">You are all set! You can now log in and start exploring your dashboard.</AlertDescription>
    </Alert>
  );
}

function Alert20() {
  return (
    <Alert className="bg-card border-amber-600 text-amber-600 dark:border-amber-400 dark:text-amber-400 [&>svg]:text-current">
      <CircleAlert className="h-4 w-4" />
      <AlertTitle>Your password is too weak</AlertTitle>
      <AlertDescription className="text-amber-600/80 dark:text-amber-400/80">Try using a mix of uppercase letters, numbers, and symbols for better security.</AlertDescription>
    </Alert>
  );
}

function Alert21() {
  return (
    <Alert className="text-card-foreground bg-primary/10 border-none [&>svg]:text-current">
      <CircleAlert className="h-4 w-4" />
      <AlertTitle>File should be PDF, DOCX, JPG, or PNG.</AlertTitle>
      <AlertDescription>If the file type is not one of this than we can&apos;t get your files</AlertDescription>
    </Alert>
  );
}

function Alert22() {
  return (
    <Alert className="border-none bg-sky-600/10 text-sky-600 dark:bg-sky-400/10 dark:text-sky-400 [&>svg]:text-current">
      <CircleAlert className="h-4 w-4" />
      <AlertTitle>Only certain file types are allowed</AlertTitle>
      <AlertDescription className="text-sky-600/80 dark:text-sky-400/80">You can upload PDF, DOCX, JPG, or PNG files up to 20MB.</AlertDescription>
    </Alert>
  );
}

function Alert23() {
  return (
    <Alert className="border-none bg-green-600/10 text-green-600 dark:bg-green-400/10 dark:text-green-400 [&>svg]:text-current">
      <CheckCheck className="h-4 w-4" />
      <AlertTitle>File uploaded successfully</AlertTitle>
      <AlertDescription className="text-green-600/80 dark:text-green-400/80">Your document has been saved and is now available in your files.</AlertDescription>
    </Alert>
  );
}

function Alert24() {
  return (
    <Alert className="border-none bg-amber-600/10 text-amber-600 dark:bg-amber-400/10 dark:text-amber-400 [&>svg]:text-current">
      <CircleAlert className="h-4 w-4" />
      <AlertTitle>This file might be too large</AlertTitle>
      <AlertDescription className="text-amber-600/80 dark:text-amber-400/80">Uploading large files may take longer or fail. Consider compressing it first.</AlertDescription>
    </Alert>
  );
}

function Alert25() {
  return (
    <Alert className="bg-destructive/10 text-destructive border-none [&>svg]:text-current">
      <TriangleAlert className="h-4 w-4" />
      <AlertTitle>Upload failed</AlertTitle>
      <AlertDescription className="text-destructive/80">Something went wrong. Please try again or use a different file format.</AlertDescription>
    </Alert>
  );
}

function Alert26() {
  return (
    <Alert className="bg-primary text-primary-foreground border-none [&>svg]:text-current">
      <CircleAlert className="h-4 w-4" />
      <AlertTitle>Editing your profile</AlertTitle>
      <AlertDescription className="text-primary-foreground/80">Changes won&apos;t be saved until you click &ldquo;Update.&rdquo;</AlertDescription>
    </Alert>
  );
}

function Alert27() {
  return (
    <Alert className="border-none bg-green-600 text-white dark:bg-green-400 [&>svg]:text-current">
      <CheckCheck className="h-4 w-4" />
      <AlertTitle>Profile updated</AlertTitle>
      <AlertDescription className="text-white/80">Your changes have been saved successfully.</AlertDescription>
    </Alert>
  );
}

function Alert28() {
  return (
    <Alert className="border-none bg-amber-600 text-white dark:bg-amber-400 [&>svg]:text-current">
      <CircleAlert className="h-4 w-4" />
      <AlertTitle>Some details are missing</AlertTitle>
      <AlertDescription className="text-white/80">Complete your profile to get the best experience.</AlertDescription>
    </Alert>
  );
}

function Alert29() {
  return (
    <Alert className="border-none bg-sky-600 text-white dark:bg-sky-400 [&>svg]:text-current">
      <CircleAlert className="h-4 w-4" />
      <AlertTitle>Your profile is visible</AlertTitle>
      <AlertDescription className="text-white/80">Anyone can view your basic information.</AlertDescription>
    </Alert>
  );
}

function Alert30() {
  return (
    <Alert className="bg-destructive dark:bg-destructive/60 border-none text-white [&>svg]:text-current">
      <TriangleAlert className="h-4 w-4" />
      <AlertTitle>Couldn&apos;t save changes</AlertTitle>
      <AlertDescription className="text-white/80">Please try again or reload the page.</AlertDescription>
    </Alert>
  );
}

// --- Code strings ---
const codes: Record<string, string> = {
  "alert-01": `import { Alert, AlertTitle } from "@/components/ui/alert"
import { CircleAlert } from "lucide-react"

export default function Alert01() {
  return (
    <Alert className="bg-card text-card-foreground">
      <CircleAlert className="h-4 w-4" />
      <AlertTitle>New message!</AlertTitle>
    </Alert>
  )
}`,
  "alert-11": `import { Alert, AlertTitle } from "@/components/ui/alert"
import { UserCheck } from "lucide-react"

export default function Alert11() {
  return (
    <Alert className="rounded-md border-l-[6px] border-green-600 bg-green-600/10 text-green-600 dark:border-green-400 dark:bg-green-400/10 dark:text-green-400">
      <UserCheck className="h-4 w-4" />
      <AlertTitle>Your request to join the team is approved.</AlertTitle>
    </Alert>
  )
}`,
  "alert-17": `import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert"
import { CircleAlert } from "lucide-react"

export default function Alert17() {
  return (
    <Alert className="bg-card text-card-foreground">
      <CircleAlert className="h-4 w-4" />
      <AlertTitle>Creating your account</AlertTitle>
      <AlertDescription>Fill in your details to get started.</AlertDescription>
    </Alert>
  )
}`,
  "alert-19": `import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert"
import { CheckCheck } from "lucide-react"

export default function Alert19() {
  return (
    <Alert className="bg-card border-green-600 text-green-600 dark:border-green-400 dark:text-green-400 [&>svg]:text-current">
      <CheckCheck className="h-4 w-4" />
      <AlertTitle>Account created successfully</AlertTitle>
      <AlertDescription className="text-green-600/80 dark:text-green-400/80">
        You are all set! You can now log in and start exploring your dashboard.
      </AlertDescription>
    </Alert>
  )
}`,
  "alert-26": `import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert"
import { CircleAlert } from "lucide-react"

export default function Alert26() {
  return (
    <Alert className="bg-primary text-primary-foreground border-none [&>svg]:text-current">
      <CircleAlert className="h-4 w-4" />
      <AlertTitle>Editing your profile</AlertTitle>
      <AlertDescription className="text-primary-foreground/80">
        Changes won't be saved until you click "Update."
      </AlertDescription>
    </Alert>
  )
}`,
  "alert-30": `import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert"
import { TriangleAlert } from "lucide-react"

export default function Alert30() {
  return (
    <Alert className="bg-destructive dark:bg-destructive/60 border-none text-white [&>svg]:text-current">
      <TriangleAlert className="h-4 w-4" />
      <AlertTitle>Couldn't save changes</AlertTitle>
      <AlertDescription className="text-white/80">
        Please try again or reload the page.
      </AlertDescription>
    </Alert>
  )
}`,
};

function getCode(id: string) {
  return codes[id] || codes["alert-01"]!.replace("Alert01", id.replace("alert-", "Alert"));
}

// --- Variants ---
const variants = [
  { id: "alert-01", title: "Alert 1", preview: <Alert01 /> },
  { id: "alert-02", title: "Alert 2", preview: <Alert02 /> },
  { id: "alert-03", title: "Alert 3", preview: <Alert03 /> },
  { id: "alert-04", title: "Alert 4", preview: <Alert04 /> },
  { id: "alert-05", title: "Alert 5", preview: <Alert05 /> },
  { id: "alert-06", title: "Alert 6", preview: <Alert06 /> },
  { id: "alert-07", title: "Alert 7", preview: <Alert07 /> },
  { id: "alert-08", title: "Alert 8", preview: <Alert08 /> },
  { id: "alert-09", title: "Alert 9", preview: <Alert09 /> },
  { id: "alert-10", title: "Alert 10", preview: <Alert10 /> },
  { id: "alert-11", title: "Alert 11", preview: <Alert11 /> },
  { id: "alert-12", title: "Alert 12", preview: <Alert12 /> },
  { id: "alert-13", title: "Alert 13", preview: <Alert13 /> },
  { id: "alert-14", title: "Alert 14", preview: <Alert14 /> },
  { id: "alert-15", title: "Alert 15", preview: <Alert15 /> },
  { id: "alert-16", title: "Alert 16", preview: <Alert16 /> },
  { id: "alert-17", title: "Alert 17", preview: <Alert17 /> },
  { id: "alert-18", title: "Alert 18", preview: <Alert18 /> },
  { id: "alert-19", title: "Alert 19", preview: <Alert19 /> },
  { id: "alert-20", title: "Alert 20", preview: <Alert20 /> },
  { id: "alert-21", title: "Alert 21", preview: <Alert21 /> },
  { id: "alert-22", title: "Alert 22", preview: <Alert22 /> },
  { id: "alert-23", title: "Alert 23", preview: <Alert23 /> },
  { id: "alert-24", title: "Alert 24", preview: <Alert24 /> },
  { id: "alert-25", title: "Alert 25", preview: <Alert25 /> },
  { id: "alert-26", title: "Alert 26", preview: <Alert26 /> },
  { id: "alert-27", title: "Alert 27", preview: <Alert27 /> },
  { id: "alert-28", title: "Alert 28", preview: <Alert28 /> },
  { id: "alert-29", title: "Alert 29", preview: <Alert29 /> },
  { id: "alert-30", title: "Alert 30", preview: <Alert30 /> },
];

export default function AlertPage() {
  return (
    <ComponentLayout>
      {/* Page Header */}
      <div className="mb-4 flex gap-x-8 gap-y-4 max-md:flex-col">
        <div className="space-y-3">
          <h1 className="text-2xl font-bold sm:text-3xl">Shadcn Alert</h1>
          <p className="text-muted-foreground">
            Explore the collection of awesome Shadcn Alert Components, featuring {variants.length} alert
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
          <p className="font-medium">Have any suggestions for Alert variants?</p>
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
