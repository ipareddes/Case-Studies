"use client";

import { ComponentLayout } from "@/components/layout/component-layout";
import { useState } from "react";
import { X, Sparkles, Code2, Copy, Check, Calendar, ChevronDown, ChevronsUpDown } from "lucide-react";
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

// --- Form Variant Previews ---

function Form01Preview() {
  return (
    <form className="w-full max-w-xs space-y-6">
      <div className="grid gap-2 space-y-3">
        <label className="text-sm font-medium">Manage data sharing preferences</label>
        <div className="grid gap-3">
          <div className="flex items-center space-x-2">
            <span className="aspect-square size-4 shrink-0 rounded-full border border-input shadow-xs" />
            <label className="text-sm font-normal">Share Data for Personalized Experience</label>
          </div>
          <div className="flex items-center space-x-2">
            <span className="aspect-square size-4 shrink-0 rounded-full border border-input shadow-xs" />
            <label className="text-sm font-normal">Do Not Share My Data</label>
          </div>
          <div className="flex items-center space-x-2">
            <span className="aspect-square size-4 shrink-0 rounded-full border border-input shadow-xs" />
            <label className="text-sm font-normal">Share Only Anonymous Analytics</label>
          </div>
        </div>
      </div>
      <button type="submit" className="inline-flex items-center justify-center rounded-md bg-primary text-primary-foreground hover:bg-primary/90 h-9 px-4 py-2 text-sm font-medium">Submit</button>
    </form>
  );
}

function Form02Preview() {
  return (
    <form className="w-full max-w-xs space-y-6">
      <div className="grid gap-2">
        <div className="flex items-center space-x-2">
          <span className="size-4 shrink-0 rounded-[4px] border border-input shadow-xs" />
          <label className="text-sm font-medium">Agree to Join the Community</label>
        </div>
        <p className="text-muted-foreground text-sm">By clicking &apos;Join Now&apos;, you accept our Community Guidelines and Privacy Policy. We&apos;re excited to have you on board!</p>
      </div>
      <button type="submit" className="inline-flex items-center justify-center rounded-md bg-primary text-primary-foreground hover:bg-primary/90 h-9 px-4 py-2 text-sm font-medium">Join Now</button>
    </form>
  );
}

function Form03Preview() {
  return (
    <form className="w-full max-w-xs space-y-6">
      <div className="grid gap-2">
        <div className="flex items-center space-x-2">
          <span className="inline-flex h-[1.15rem] w-8 shrink-0 items-center rounded-full border bg-input shadow-xs">
            <span className="block size-4 rounded-full bg-background ring-0 dark:bg-foreground" />
          </span>
          <label className="text-sm font-medium">Enable Daily Step Tracker</label>
        </div>
        <p className="text-muted-foreground text-sm">Track your daily steps to help you reach your fitness goals.</p>
      </div>
      <button type="submit" className="inline-flex items-center justify-center rounded-md bg-primary text-primary-foreground hover:bg-primary/90 h-9 px-4 py-2 text-sm font-medium">Activate</button>
    </form>
  );
}

function Form04Preview() {
  return (
    <form className="w-full max-w-xs space-y-6">
      <div className="grid gap-2">
        <label className="text-sm font-medium">Reset Your Password:</label>
        <input
          className="border-input h-9 w-full rounded-md border bg-transparent px-3 py-1 text-sm shadow-xs placeholder:text-muted-foreground outline-none"
          placeholder="Email address"
          readOnly
        />
        <p className="text-muted-foreground text-sm">Enter your email address to receive a reset link.</p>
      </div>
      <button type="submit" className="inline-flex items-center justify-center rounded-md bg-primary text-primary-foreground hover:bg-primary/90 h-9 px-4 py-2 text-sm font-medium">Send Link</button>
    </form>
  );
}

function Form05Preview() {
  return (
    <form className="w-full max-w-xs space-y-6">
      <div className="grid gap-2">
        <label className="text-sm font-medium">One-Time Password</label>
        <div className="flex items-center gap-2">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="flex h-9 w-9 items-center justify-center rounded-md border border-input text-sm shadow-xs" />
          ))}
        </div>
        <p className="text-muted-foreground text-sm">Please enter the one-time password sent to your phone.</p>
      </div>
      <button type="submit" className="inline-flex items-center justify-center rounded-md bg-primary text-primary-foreground hover:bg-primary/90 h-9 px-4 py-2 text-sm font-medium">Verify</button>
    </form>
  );
}

function Form06Preview() {
  return (
    <form className="w-full max-w-xs space-y-6">
      <div className="grid gap-2">
        <label className="text-sm font-medium">Tell Us About Yourself</label>
        <textarea
          className="border-input min-h-16 w-full rounded-md border bg-transparent px-3 py-2 text-sm shadow-xs placeholder:text-muted-foreground outline-none"
          placeholder="Why do you think you're the perfect fit for this position?"
          readOnly
        />
        <p className="text-muted-foreground text-sm">Please include your qualifications, skills, and experiences that make you stand out.</p>
      </div>
      <button type="submit" className="inline-flex items-center justify-center rounded-md bg-primary text-primary-foreground hover:bg-primary/90 h-9 px-4 py-2 text-sm font-medium">Submit</button>
    </form>
  );
}

function Form07Preview() {
  return (
    <form className="w-full max-w-xs space-y-6">
      <div className="grid gap-2">
        <label className="text-sm font-medium">Email</label>
        <button type="button" className="flex items-center justify-between gap-2 rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-xs h-9 w-full">
          <span className="text-muted-foreground">Enter your registered email</span>
          <ChevronDown className="size-4 opacity-50" />
        </button>
        <p className="text-muted-foreground text-sm">Recover Your Account</p>
      </div>
      <button type="submit" className="inline-flex items-center justify-center rounded-md bg-primary text-primary-foreground hover:bg-primary/90 h-9 px-4 py-2 text-sm font-medium">Submit</button>
    </form>
  );
}

function Form08Preview() {
  return (
    <form className="w-full max-w-md space-y-6">
      <div className="grid gap-2">
        <label className="text-sm font-medium">Select your payment method</label>
        <button type="button" className="flex items-center justify-between gap-2 rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-xs h-9 w-full max-w-xs">
          <span className="text-muted-foreground">Select a payment method...</span>
          <ChevronsUpDown className="size-4 opacity-50" />
        </button>
        <p className="text-muted-foreground text-sm">Select your preferred payment method.</p>
      </div>
      <button type="submit" className="inline-flex items-center justify-center rounded-md bg-primary text-primary-foreground hover:bg-primary/90 h-9 px-4 py-2 text-sm font-medium">Continue</button>
    </form>
  );
}

function Form09Preview() {
  return (
    <form className="w-full max-w-xs space-y-6">
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium">Timeless Trends for You</label>
        <button type="button" className="flex items-center justify-between gap-2 rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-xs h-9 w-full text-left font-normal text-muted-foreground">
          <span>Pick a date</span>
          <Calendar className="ml-auto size-4 opacity-50" />
        </button>
        <p className="text-muted-foreground text-sm">Enter your birth date to reveal styles and outfits tailored to your fashion journey.</p>
      </div>
      <button type="submit" className="inline-flex items-center justify-center rounded-md bg-primary text-primary-foreground hover:bg-primary/90 h-9 px-4 py-2 text-sm font-medium">Submit</button>
    </form>
  );
}

function Form10Preview() {
  return (
    <div className="bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 w-full max-w-sm shadow-none">
      <div className="grid auto-rows-min items-start gap-2 px-6">
        <div className="leading-none font-semibold">Report Issue</div>
        <div className="text-muted-foreground text-sm">Describe the issue you&apos;re facing; our team will help you.</div>
      </div>
      <div className="px-6">
        <form className="w-full max-w-xs space-y-4">
          <div className="grid gap-2">
            <label className="text-sm font-medium">Email</label>
            <input className="border-input h-9 w-full rounded-md border bg-transparent px-3 py-1 text-sm shadow-xs placeholder:text-muted-foreground outline-none" placeholder="Email address" readOnly />
          </div>
          <div className="grid gap-2">
            <label className="text-sm font-medium">Issue</label>
            <button type="button" className="flex items-center justify-between gap-2 rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-xs h-9 w-full">
              <span className="text-muted-foreground">Select an issue</span>
              <ChevronDown className="size-4 opacity-50" />
            </button>
          </div>
          <div className="grid gap-2">
            <label className="text-sm font-medium">Subject</label>
            <input className="border-input h-9 w-full rounded-md border bg-transparent px-3 py-1 text-sm shadow-xs placeholder:text-muted-foreground outline-none" placeholder="I need help with..." readOnly />
          </div>
          <div className="grid gap-2">
            <label className="text-sm font-medium">Description</label>
            <textarea className="border-input min-h-16 w-full rounded-md border bg-transparent px-3 py-2 text-sm shadow-xs placeholder:text-muted-foreground outline-none" placeholder="Please include all information relevant to your issue." readOnly />
          </div>
          <div className="flex justify-between gap-2">
            <button type="button" className="inline-flex items-center justify-center rounded-md border border-input bg-background hover:bg-accent h-9 px-4 py-2 text-sm font-medium">Cancel</button>
            <button type="submit" className="inline-flex items-center justify-center rounded-md bg-primary text-primary-foreground hover:bg-primary/90 h-9 px-4 py-2 text-sm font-medium">Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
}

// --- Code strings ---
const codes: Record<string, string> = {
  "form-01": `"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

const FormSchema = z.object({
  dataSharingPreference: z.enum(["share data", "do not share", "anonymous only"], {
    required_error: "Please select a data sharing preference.",
  }),
})

export default function Form01() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  })

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log(data)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full max-w-xs space-y-6">
        <FormField
          control={form.control}
          name="dataSharingPreference"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>Manage data sharing preferences</FormLabel>
              <FormControl>
                <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="grid gap-3">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="share data" id="share-option" />
                    <FormLabel htmlFor="share-option" className="font-normal">Share Data for Personalized Experience</FormLabel>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="do not share" id="no-share-option" />
                    <FormLabel htmlFor="no-share-option" className="font-normal">Do Not Share My Data</FormLabel>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="anonymous only" id="anon-option" />
                    <FormLabel htmlFor="anon-option" className="font-normal">Share Only Anonymous Analytics</FormLabel>
                  </div>
                </RadioGroup>
              </FormControl>
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}`,
  "form-02": `"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from "@/components/ui/form"

const FormSchema = z.object({
  agreeToJoin: z.boolean().default(false).refine((val) => val === true, {
    message: "You must agree to join the community.",
  }),
})

export default function Form02() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: { agreeToJoin: false },
  })

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log(data)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full max-w-xs space-y-6">
        <FormField
          control={form.control}
          name="agreeToJoin"
          render={({ field }) => (
            <FormItem>
              <div className="flex items-center space-x-2">
                <FormControl>
                  <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                </FormControl>
                <FormLabel>Agree to Join the Community</FormLabel>
              </div>
              <FormDescription>
                By clicking 'Join Now', you accept our Community Guidelines and Privacy Policy.
              </FormDescription>
            </FormItem>
          )}
        />
        <Button type="submit">Join Now</Button>
      </form>
    </Form>
  )
}`,
  "form-03": `"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from "@/components/ui/form"

const FormSchema = z.object({
  stepTracker: z.boolean().default(false),
})

export default function Form03() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: { stepTracker: false },
  })

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log(data)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full max-w-xs space-y-6">
        <FormField
          control={form.control}
          name="stepTracker"
          render={({ field }) => (
            <FormItem>
              <div className="flex items-center space-x-2">
                <FormControl>
                  <Switch checked={field.value} onCheckedChange={field.onChange} />
                </FormControl>
                <FormLabel>Enable Daily Step Tracker</FormLabel>
              </div>
              <FormDescription>Track your daily steps to help you reach your fitness goals.</FormDescription>
            </FormItem>
          )}
        />
        <Button type="submit">Activate</Button>
      </form>
    </Form>
  )
}`,
  "form-04": `"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from "@/components/ui/form"

const FormSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address." }),
})

export default function Form04() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: { email: "" },
  })

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log(data)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full max-w-xs space-y-6">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Reset Your Password:</FormLabel>
              <FormControl>
                <Input placeholder="Email address" {...field} />
              </FormControl>
              <FormDescription>Enter your email address to receive a reset link.</FormDescription>
            </FormItem>
          )}
        />
        <Button type="submit">Send Link</Button>
      </form>
    </Form>
  )
}`,
  "form-05": `"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from "@/components/ui/form"

const FormSchema = z.object({
  pin: z.string().min(6, { message: "Your one-time password must be 6 characters." }),
})

export default function Form05() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: { pin: "" },
  })

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log(data)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full max-w-xs space-y-6">
        <FormField
          control={form.control}
          name="pin"
          render={({ field }) => (
            <FormItem>
              <FormLabel>One-Time Password</FormLabel>
              <FormControl>
                <InputOTP maxLength={6} {...field}>
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                  </InputOTPGroup>
                </InputOTP>
              </FormControl>
              <FormDescription>Please enter the one-time password sent to your phone.</FormDescription>
            </FormItem>
          )}
        />
        <Button type="submit">Verify</Button>
      </form>
    </Form>
  )
}`,
  "form-06": `"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from "@/components/ui/form"

const FormSchema = z.object({
  message: z.string().min(10, { message: "Message must be at least 10 characters." }).max(500),
})

export default function Form06() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: { message: "" },
  })

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log(data)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full max-w-xs space-y-6">
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tell Us About Yourself</FormLabel>
              <FormControl>
                <Textarea placeholder="Why do you think you're the perfect fit for this position?" {...field} />
              </FormControl>
              <FormDescription>Please include your qualifications, skills, and experiences that make you stand out.</FormDescription>
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}`,
  "form-07": `"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from "@/components/ui/form"

const FormSchema = z.object({
  email: z.string({ required_error: "Please select an email to display." }),
})

export default function Form07() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  })

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log(data)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full max-w-xs space-y-6">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Enter your registered email" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="m@example.com">user1@gmail.com</SelectItem>
                  <SelectItem value="m@google.com">user007@gmail.com</SelectItem>
                  <SelectItem value="m@support.com">user69@outlook.com</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>Recover Your Account</FormDescription>
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}`,
  "form-08": `"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from "@/components/ui/form"
import { ChevronsUpDown, Check } from "lucide-react"
import { cn } from "@/lib/utils"

const paymentMethods = [
  { label: "Credit Card", value: "credit-card" },
  { label: "Debit Card", value: "debit-card" },
  { label: "PayPal", value: "paypal" },
  { label: "Apple Pay", value: "apple-pay" },
  { label: "Google Pay", value: "google-pay" },
] as const

const FormSchema = z.object({
  paymentMethod: z.string({ required_error: "Please select a payment method." }),
})

export default function Form08() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  })

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log(data)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full max-w-md space-y-6">
        <FormField
          control={form.control}
          name="paymentMethod"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Select your payment method</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button variant="outline" role="combobox" className="w-full max-w-xs justify-between">
                      {field.value
                        ? paymentMethods.find((m) => m.value === field.value)?.label
                        : "Select a payment method..."}
                      <ChevronsUpDown className="opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0">
                  <Command>
                    <CommandInput placeholder="Search..." />
                    <CommandList>
                      <CommandEmpty>No method found.</CommandEmpty>
                      <CommandGroup>
                        {paymentMethods.map((method) => (
                          <CommandItem key={method.value} value={method.label} onSelect={() => form.setValue("paymentMethod", method.value)}>
                            {method.label}
                            <Check className={cn("ml-auto", field.value === method.value ? "opacity-100" : "opacity-0")} />
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
              <FormDescription>Select your preferred payment method.</FormDescription>
            </FormItem>
          )}
        />
        <Button type="submit">Continue</Button>
      </form>
    </Form>
  )
}`,
  "form-09": `"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from "@/components/ui/form"
import { cn } from "@/lib/utils"

const FormSchema = z.object({
  dob: z.date({ required_error: "A date of birth is required." }),
})

export default function Form09() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  })

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log(data)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full max-w-xs space-y-6">
        <FormField
          control={form.control}
          name="dob"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Timeless Trends for You</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button variant="outline" className={cn("pl-3 text-left font-normal", !field.value && "text-muted-foreground")}>
                      {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar mode="single" selected={field.value} onSelect={field.onChange} disabled={(date) => date > new Date()} initialFocus />
                </PopoverContent>
              </Popover>
              <FormDescription>Enter your birth date to reveal styles and outfits tailored to your fashion journey.</FormDescription>
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}`,
  "form-10": `"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form"

const FormSchema = z.object({
  email: z.string().email({ message: "Invalid email address." }),
  issue: z.string({ required_error: "Please select an issue." }),
  subject: z.string().min(2, { message: "Subject must be at least 2 characters." }),
  description: z.string().min(10, { message: "Description must be at least 10 characters." }),
})

export default function Form10() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: { email: "", subject: "", description: "" },
  })

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log(data)
  }

  return (
    <Card className="w-full max-w-sm shadow-none">
      <CardHeader>
        <CardTitle>Report Issue</CardTitle>
        <CardDescription>Describe the issue you're facing; our team will help you.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="w-full max-w-xs space-y-6">
            <FormField control={form.control} name="email" render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl><Input placeholder="Email address" {...field} /></FormControl>
              </FormItem>
            )} />
            <FormField control={form.control} name="issue" render={({ field }) => (
              <FormItem>
                <FormLabel>Issue</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger><SelectValue placeholder="Select an issue" /></SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="bug">Bug Report</SelectItem>
                    <SelectItem value="feature">Feature Request</SelectItem>
                    <SelectItem value="support">General Support</SelectItem>
                  </SelectContent>
                </Select>
              </FormItem>
            )} />
            <FormField control={form.control} name="subject" render={({ field }) => (
              <FormItem>
                <FormLabel>Subject</FormLabel>
                <FormControl><Input placeholder="I need help with..." {...field} /></FormControl>
              </FormItem>
            )} />
            <FormField control={form.control} name="description" render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl><Textarea placeholder="Please include all information relevant to your issue." {...field} /></FormControl>
              </FormItem>
            )} />
            <div className="flex justify-between gap-2">
              <Button type="button" variant="outline">Cancel</Button>
              <Button type="submit">Submit</Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}`,
};

function getCode(id: string) {
  return codes[id] || codes["form-01"]!.replace("Form01", id.replace("form-", "Form"));
}

// --- Variants ---
const variants = [
  { id: "form-01", title: "Radio Group Form", preview: <Form01Preview /> },
  { id: "form-02", title: "Checkbox Agreement", preview: <Form02Preview /> },
  { id: "form-03", title: "Switch Toggle", preview: <Form03Preview /> },
  { id: "form-04", title: "Email Input", preview: <Form04Preview /> },
  { id: "form-05", title: "OTP Verification", preview: <Form05Preview /> },
  { id: "form-06", title: "Textarea Feedback", preview: <Form06Preview /> },
  { id: "form-07", title: "Select Dropdown", preview: <Form07Preview /> },
  { id: "form-08", title: "Combobox", preview: <Form08Preview /> },
  { id: "form-09", title: "Date Picker", preview: <Form09Preview /> },
  { id: "form-10", title: "Multi-field Report", preview: <Form10Preview /> },
];

export default function FormPage() {
  return (
    <ComponentLayout>
      {/* Page Header */}
      <div className="mb-4 flex gap-x-8 gap-y-4 max-md:flex-col">
        <div className="space-y-3">
          <h1 className="text-2xl font-bold sm:text-3xl">Shadcn Form</h1>
          <p className="text-muted-foreground">
            Explore the collection of awesome Shadcn Form Components, featuring {variants.length} form
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
          <p className="font-medium">Have any suggestions for Form variants?</p>
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
