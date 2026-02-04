"use client";

import { ComponentLayout } from "@/components/layout/component-layout";
import { useState } from "react";
import { X, Sparkles, Code2, Copy, Check, Plus, Home, Settings, User, Mail, Bell, LogOut, Search } from "lucide-react";
import ReactDOM from "react-dom";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
  SheetClose,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

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

// --- Sheet Variant Previews ---

function Sheet01() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">Default</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Edit profile</SheetTitle>
          <SheetDescription>
            Make changes to your profile here. Click save when you&apos;re done.
          </SheetDescription>
        </SheetHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">Name</Label>
            <Input id="name" defaultValue="Pedro Duarte" className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">Username</Label>
            <Input id="username" defaultValue="@peduarte" className="col-span-3" />
          </div>
        </div>
        <SheetFooter>
          <SheetClose asChild>
            <Button type="submit">Save changes</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

function Sheet02() {
  return (
    <div className="flex flex-wrap gap-2">
      {(["top", "right", "bottom", "left"] as const).map((side) => (
        <Sheet key={side}>
          <SheetTrigger asChild>
            <Button variant="outline">{side.charAt(0).toUpperCase() + side.slice(1)}</Button>
          </SheetTrigger>
          <SheetContent side={side}>
            <SheetHeader>
              <SheetTitle>{side.charAt(0).toUpperCase() + side.slice(1)} Sheet</SheetTitle>
              <SheetDescription>
                This sheet slides in from the {side}.
              </SheetDescription>
            </SheetHeader>
          </SheetContent>
        </Sheet>
      ))}
    </div>
  );
}

function Sheet03() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">No Overlay</Button>
      </SheetTrigger>
      <SheetContent className="sm:max-w-md">
        <SheetHeader>
          <SheetTitle>Sheet without overlay</SheetTitle>
          <SheetDescription>
            This sheet opens without a dimmed background overlay.
          </SheetDescription>
        </SheetHeader>
        <div className="py-4">
          <p className="text-sm text-muted-foreground">
            You can still interact with the content behind this sheet.
          </p>
        </div>
      </SheetContent>
    </Sheet>
  );
}

function Sheet04() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">Scrollable Content</Button>
      </SheetTrigger>
      <SheetContent className="overflow-y-auto">
        <SheetHeader>
          <SheetTitle>Scrollable Sheet</SheetTitle>
          <SheetDescription>
            This sheet contains a lot of content that scrolls.
          </SheetDescription>
        </SheetHeader>
        <div className="grid gap-4 py-4">
          {Array.from({ length: 20 }).map((_, i) => (
            <div key={i} className="rounded-lg border p-4">
              <h4 className="text-sm font-medium">Item {i + 1}</h4>
              <p className="text-sm text-muted-foreground">
                This is a scrollable content item to demonstrate overflow behavior in the sheet component.
              </p>
            </div>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
}

function Sheet05() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">Sign Up</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Create an account</SheetTitle>
          <SheetDescription>
            Enter your details below to create your account.
          </SheetDescription>
        </SheetHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="signup-name">Full Name</Label>
            <Input id="signup-name" placeholder="John Doe" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="signup-email">Email</Label>
            <Input id="signup-email" type="email" placeholder="john@example.com" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="signup-password">Password</Label>
            <Input id="signup-password" type="password" placeholder="Enter password" />
          </div>
        </div>
        <SheetFooter>
          <SheetClose asChild>
            <Button variant="outline">Cancel</Button>
          </SheetClose>
          <Button type="submit">Create Account</Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

function Sheet06() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">Navigation Menu</Button>
      </SheetTrigger>
      <SheetContent side="left">
        <SheetHeader>
          <SheetTitle>Navigation</SheetTitle>
          <SheetDescription>Browse through the app sections.</SheetDescription>
        </SheetHeader>
        <nav className="grid gap-1 py-4">
          {[
            { icon: Home, label: "Home" },
            { icon: User, label: "Profile" },
            { icon: Mail, label: "Messages" },
            { icon: Bell, label: "Notifications" },
            { icon: Settings, label: "Settings" },
          ].map((item) => (
            <a
              key={item.label}
              href="#"
              className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground transition-colors"
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </a>
          ))}
        </nav>
        <div className="mt-auto border-t pt-4">
          <a
            href="#"
            className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-destructive hover:bg-destructive/10 transition-colors"
          >
            <LogOut className="h-4 w-4" />
            Log out
          </a>
        </div>
      </SheetContent>
    </Sheet>
  );
}

function Sheet07() {
  return (
    <div className="w-full">
      <div className="flex justify-between gap-2 py-4 max-sm:flex-col sm:items-center">
        <Input placeholder="Search all columns..." className="max-w-2xs" />
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline">
              <Plus className="h-4 w-4" />
              Add Users
            </Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Add New User</SheetTitle>
              <SheetDescription>
                Fill in the details to add a new user to the table.
              </SheetDescription>
            </SheetHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="user-name">Name</Label>
                <Input id="user-name" placeholder="Enter name" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="user-email">Email</Label>
                <Input id="user-email" type="email" placeholder="Enter email" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="user-role">Role</Label>
                <Input id="user-role" placeholder="Enter role" />
              </div>
            </div>
            <SheetFooter>
              <SheetClose asChild>
                <Button variant="outline">Cancel</Button>
              </SheetClose>
              <Button type="submit">Add User</Button>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </div>
      <div className="rounded-md border">
        <table className="w-full caption-bottom text-sm">
          <thead className="[&_tr]:border-b">
            <tr className="border-b transition-colors hover:bg-muted/50">
              <th className="h-10 w-10 px-4 text-left align-middle"><Checkbox /></th>
              <th className="h-10 px-4 text-left align-middle font-medium text-foreground">Name</th>
              <th className="h-10 px-4 text-left align-middle font-medium text-foreground">Status</th>
              <th className="h-10 px-4 text-left align-middle font-medium text-foreground">Email</th>
              <th className="h-10 px-4 text-right align-middle font-medium text-foreground">Amount</th>
            </tr>
          </thead>
          <tbody className="[&_tr:last-child]:border-0">
            {[
              { name: "Shang Chain", status: "Success", email: "shang07@yahoo.com", amount: "$699.00" },
              { name: "Kevin Lincoln", status: "Success", email: "kevinli09@gmail.com", amount: "$242.00" },
              { name: "Milton Rose", status: "Processing", email: "rose96@gmail.com", amount: "$655.00" },
              { name: "Silas Ryan", status: "Success", email: "silas22@gmail.com", amount: "$874.00" },
              { name: "Ben Tenison", status: "Failed", email: "bent@hotmail.com", amount: "$541.00" },
            ].map((user) => (
              <tr key={user.email} className="border-b transition-colors hover:bg-muted/50">
                <td className="p-4 align-middle"><Checkbox /></td>
                <td className="p-4 align-middle font-medium">{user.name}</td>
                <td className="p-4 align-middle">{user.status}</td>
                <td className="p-4 align-middle">{user.email}</td>
                <td className="p-4 align-middle text-right">{user.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="text-center text-sm text-muted-foreground py-4">Add new user with sheet</p>
    </div>
  );
}

// --- Code strings ---
const codes: Record<string, string> = {
  "sheet-01": `import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Sheet, SheetClose, SheetContent, SheetDescription,
  SheetFooter, SheetHeader, SheetTitle, SheetTrigger,
} from "@/components/ui/sheet"

export default function Sheet01() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">Default</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Edit profile</SheetTitle>
          <SheetDescription>
            Make changes to your profile here. Click save when you're done.
          </SheetDescription>
        </SheetHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">Name</Label>
            <Input id="name" defaultValue="Pedro Duarte" className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">Username</Label>
            <Input id="username" defaultValue="@peduarte" className="col-span-3" />
          </div>
        </div>
        <SheetFooter>
          <SheetClose asChild>
            <Button type="submit">Save changes</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}`,
  "sheet-02": `import { Button } from "@/components/ui/button"
import {
  Sheet, SheetContent, SheetDescription,
  SheetHeader, SheetTitle, SheetTrigger,
} from "@/components/ui/sheet"

export default function Sheet02() {
  return (
    <div className="flex flex-wrap gap-2">
      {(["top", "right", "bottom", "left"] as const).map((side) => (
        <Sheet key={side}>
          <SheetTrigger asChild>
            <Button variant="outline">
              {side.charAt(0).toUpperCase() + side.slice(1)}
            </Button>
          </SheetTrigger>
          <SheetContent side={side}>
            <SheetHeader>
              <SheetTitle>{side} Sheet</SheetTitle>
              <SheetDescription>
                This sheet slides in from the {side}.
              </SheetDescription>
            </SheetHeader>
          </SheetContent>
        </Sheet>
      ))}
    </div>
  )
}`,
  "sheet-05": `import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Sheet, SheetClose, SheetContent, SheetDescription,
  SheetFooter, SheetHeader, SheetTitle, SheetTrigger,
} from "@/components/ui/sheet"

export default function Sheet05() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">Sign Up</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Create an account</SheetTitle>
          <SheetDescription>
            Enter your details below to create your account.
          </SheetDescription>
        </SheetHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="signup-name">Full Name</Label>
            <Input id="signup-name" placeholder="John Doe" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="signup-email">Email</Label>
            <Input id="signup-email" type="email" placeholder="john@example.com" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="signup-password">Password</Label>
            <Input id="signup-password" type="password" placeholder="Enter password" />
          </div>
        </div>
        <SheetFooter>
          <SheetClose asChild>
            <Button variant="outline">Cancel</Button>
          </SheetClose>
          <Button type="submit">Create Account</Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}`,
  "sheet-06": `import { Button } from "@/components/ui/button"
import { Home, User, Mail, Bell, Settings, LogOut } from "lucide-react"
import {
  Sheet, SheetContent, SheetDescription,
  SheetHeader, SheetTitle, SheetTrigger,
} from "@/components/ui/sheet"

export default function Sheet06() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">Navigation Menu</Button>
      </SheetTrigger>
      <SheetContent side="left">
        <SheetHeader>
          <SheetTitle>Navigation</SheetTitle>
          <SheetDescription>Browse through the app sections.</SheetDescription>
        </SheetHeader>
        <nav className="grid gap-1 py-4">
          {[
            { icon: Home, label: "Home" },
            { icon: User, label: "Profile" },
            { icon: Mail, label: "Messages" },
            { icon: Bell, label: "Notifications" },
            { icon: Settings, label: "Settings" },
          ].map((item) => (
            <a
              key={item.label}
              href="#"
              className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground transition-colors"
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </a>
          ))}
        </nav>
        <div className="mt-auto border-t pt-4">
          <a href="#" className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-destructive hover:bg-destructive/10 transition-colors">
            <LogOut className="h-4 w-4" />
            Log out
          </a>
        </div>
      </SheetContent>
    </Sheet>
  )
}`,
  "sheet-07": `import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Plus } from "lucide-react"
import {
  Sheet, SheetClose, SheetContent, SheetDescription,
  SheetFooter, SheetHeader, SheetTitle, SheetTrigger,
} from "@/components/ui/sheet"

export default function Sheet07() {
  return (
    <div className="w-full">
      <div className="flex justify-between gap-2 py-4 max-sm:flex-col sm:items-center">
        <Input placeholder="Search all columns..." className="max-w-2xs" />
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline">
              <Plus className="h-4 w-4" />
              Add Users
            </Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Add New User</SheetTitle>
              <SheetDescription>
                Fill in the details to add a new user to the table.
              </SheetDescription>
            </SheetHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="user-name">Name</Label>
                <Input id="user-name" placeholder="Enter name" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="user-email">Email</Label>
                <Input id="user-email" type="email" placeholder="Enter email" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="user-role">Role</Label>
                <Input id="user-role" placeholder="Enter role" />
              </div>
            </div>
            <SheetFooter>
              <SheetClose asChild>
                <Button variant="outline">Cancel</Button>
              </SheetClose>
              <Button type="submit">Add User</Button>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  )
}`,
};

function getCode(id: string) {
  return codes[id] || codes["sheet-01"]!.replace("Sheet01", id.replace("sheet-", "Sheet"));
}

// --- Variants ---
const variants = [
  { id: "sheet-01", title: "Sheet 1", preview: <Sheet01 /> },
  { id: "sheet-02", title: "Sheet 2", preview: <Sheet02 /> },
  { id: "sheet-03", title: "Sheet 3", preview: <Sheet03 /> },
  { id: "sheet-04", title: "Sheet 4", preview: <Sheet04 /> },
  { id: "sheet-05", title: "Sheet 5", preview: <Sheet05 /> },
  { id: "sheet-06", title: "Sheet 6", preview: <Sheet06 /> },
];

export default function SheetPage() {
  return (
    <ComponentLayout>
      {/* Page Header */}
      <div className="mb-4 flex gap-x-8 gap-y-4 max-md:flex-col">
        <div className="space-y-3">
          <h1 className="text-2xl font-bold sm:text-3xl">Shadcn Sheet</h1>
          <p className="text-muted-foreground">
            Explore the collection of awesome Shadcn Sheet Components, featuring {variants.length + 1} sheet
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
          <p className="font-medium">Have any suggestions for Sheet variants?</p>
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

      {/* Full-width Sheet07 variant */}
      <VariantCell
        title="Sheet 7"
        variantId="sheet-07"
        code={getCode("sheet-07")}
        isLastCol={true}
      >
        <Sheet07 />
      </VariantCell>
    </ComponentLayout>
  );
}
