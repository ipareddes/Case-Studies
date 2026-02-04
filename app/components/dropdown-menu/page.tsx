"use client";

import { ComponentLayout } from "@/components/layout/component-layout";
import { useState } from "react";
import { X, Sparkles, Code2, Copy, Check, Pencil, User, Settings, LogOut, CreditCard, Keyboard, Mail, MessageSquare, Plus, UserPlus, Cloud, LifeBuoy, Github, ChevronDown, Calendar, Smile, Bold, Italic, Underline } from "lucide-react";
import ReactDOM from "react-dom";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuGroup,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuRadioGroup,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

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

// --- Static Menu Preview Components (non-interactive for showcase) ---
const MenuContent = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <div className={`w-56 rounded-md border bg-popover p-1 text-popover-foreground shadow-md ${className}`}>{children}</div>
);
const MenuLabel = ({ children }: { children: React.ReactNode }) => (
  <div className="px-2 py-1.5 text-sm font-semibold">{children}</div>
);
const MenuSeparator = () => <div className="-mx-1 my-1 h-px bg-muted" />;
const MenuItem = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <div className={`relative flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none hover:bg-accent hover:text-accent-foreground ${className}`}>{children}</div>
);
const MenuShortcut = ({ children }: { children: React.ReactNode }) => (
  <span className="ml-auto text-xs tracking-widest text-muted-foreground">{children}</span>
);

// --- Dropdown Menu Variant Previews (Static) ---

function DropdownMenu01() {
  return (
    <div className="flex flex-col items-center gap-2">
      <Button variant="outline">Basic</Button>
      <MenuContent>
        <MenuLabel>My Account</MenuLabel>
        <MenuSeparator />
        <MenuItem><User className="mr-2 h-4 w-4" /><span>Profile</span><MenuShortcut>Shift+P</MenuShortcut></MenuItem>
        <MenuItem><CreditCard className="mr-2 h-4 w-4" /><span>Billing</span><MenuShortcut>Ctrl+B</MenuShortcut></MenuItem>
        <MenuItem><Settings className="mr-2 h-4 w-4" /><span>Settings</span><MenuShortcut>Ctrl+S</MenuShortcut></MenuItem>
        <MenuItem><Keyboard className="mr-2 h-4 w-4" /><span>Keyboard shortcuts</span><MenuShortcut>Ctrl+K</MenuShortcut></MenuItem>
        <MenuSeparator />
        <MenuItem><LogOut className="mr-2 h-4 w-4" /><span>Log out</span><MenuShortcut>Shift+Q</MenuShortcut></MenuItem>
      </MenuContent>
    </div>
  );
}

function DropdownMenu02() {
  return (
    <div className="flex flex-col items-center gap-2">
      <button className="bg-secondary flex items-center gap-2 rounded-lg px-3 py-2.5">
        <Avatar className="size-8">
          <AvatarImage src="https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-1.png" alt="Phillip George" />
          <AvatarFallback>PG</AvatarFallback>
        </Avatar>
        <div className="flex flex-col gap-1 text-start leading-none">
          <span className="max-w-[17ch] truncate text-sm leading-none font-semibold">Phillip George</span>
          <span className="text-muted-foreground max-w-[20ch] truncate text-xs">phillip12@gmail.com</span>
        </div>
      </button>
      <MenuContent>
        <MenuLabel>My Account</MenuLabel>
        <MenuSeparator />
        <MenuItem><User className="mr-2 h-4 w-4" /><span>Profile</span></MenuItem>
        <MenuItem><Settings className="mr-2 h-4 w-4" /><span>Settings</span></MenuItem>
        <MenuItem><CreditCard className="mr-2 h-4 w-4" /><span>Billing</span></MenuItem>
        <MenuSeparator />
        <MenuItem><LogOut className="mr-2 h-4 w-4" /><span>Log out</span></MenuItem>
      </MenuContent>
    </div>
  );
}

function DropdownMenu03() {
  return (
    <div className="flex flex-col items-center gap-2">
      <Button variant="outline">Menu item with avatar</Button>
      <MenuContent>
        <MenuLabel>Team Members</MenuLabel>
        <MenuSeparator />
        <MenuItem><Avatar className="mr-2 size-6"><AvatarImage src="https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-1.png" alt="Alice" /><AvatarFallback>AL</AvatarFallback></Avatar><span>Alice Johnson</span></MenuItem>
        <MenuItem><Avatar className="mr-2 size-6"><AvatarImage src="https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-2.png" alt="Bob" /><AvatarFallback>BO</AvatarFallback></Avatar><span>Bob Smith</span></MenuItem>
        <MenuItem><Avatar className="mr-2 size-6"><AvatarImage src="https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-3.png" alt="Carol" /><AvatarFallback>CA</AvatarFallback></Avatar><span>Carol Williams</span></MenuItem>
      </MenuContent>
    </div>
  );
}

function DropdownMenu04() {
  return (
    <div className="flex flex-col items-center gap-2">
      <Button variant="outline">Menu item with action</Button>
      <MenuContent>
        <MenuLabel>Actions</MenuLabel>
        <MenuSeparator />
        <MenuItem><Mail className="mr-2 h-4 w-4" /><span>Email</span><MenuShortcut>Ctrl+E</MenuShortcut></MenuItem>
        <MenuItem><MessageSquare className="mr-2 h-4 w-4" /><span>Message</span><MenuShortcut>Ctrl+M</MenuShortcut></MenuItem>
        <MenuSeparator />
        <MenuItem><Plus className="mr-2 h-4 w-4" /><span>More...</span></MenuItem>
      </MenuContent>
    </div>
  );
}

function DropdownMenu05() {
  return (
    <div className="flex flex-col items-center gap-2">
      <Button variant="outline">Meetings Schedule</Button>
      <MenuContent>
        <MenuLabel>Upcoming Meetings</MenuLabel>
        <MenuSeparator />
        <MenuItem><Calendar className="mr-2 h-4 w-4" /><span>Daily Standup</span><MenuShortcut>9:00</MenuShortcut></MenuItem>
        <MenuItem><Calendar className="mr-2 h-4 w-4" /><span>Design Review</span><MenuShortcut>11:00</MenuShortcut></MenuItem>
        <MenuItem><Calendar className="mr-2 h-4 w-4" /><span>Sprint Planning</span><MenuShortcut>14:00</MenuShortcut></MenuItem>
        <MenuSeparator />
        <MenuItem><Plus className="mr-2 h-4 w-4" /><span>New Meeting</span></MenuItem>
      </MenuContent>
    </div>
  );
}

function DropdownMenu06() {
  return (
    <div className="flex flex-col items-center gap-2">
      <Button variant="ghost" size="icon" className="rounded-full">
        <Pencil className="h-4 w-4" />
      </Button>
      <MenuContent className="w-48">
        <MenuItem><Bold className="mr-2 h-4 w-4" /><span>Bold</span></MenuItem>
        <MenuItem><Italic className="mr-2 h-4 w-4" /><span>Italic</span></MenuItem>
        <MenuItem><Underline className="mr-2 h-4 w-4" /><span>Underline</span></MenuItem>
      </MenuContent>
    </div>
  );
}

function DropdownMenu07() {
  return (
    <div className="flex flex-col items-center gap-2">
      <Button variant="secondary" size="icon" className="overflow-hidden rounded-full">
        <img src="https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-5.png" alt="Hallie Richards" className="size-full object-cover" />
      </Button>
      <MenuContent>
        <div className="px-2 py-1.5">
          <p className="text-sm font-medium leading-none">Hallie Richards</p>
          <p className="text-xs leading-none text-muted-foreground">hallie@example.com</p>
        </div>
        <MenuSeparator />
        <MenuItem><User className="mr-2 h-4 w-4" /><span>Profile</span></MenuItem>
        <MenuItem><Settings className="mr-2 h-4 w-4" /><span>Settings</span></MenuItem>
        <MenuSeparator />
        <MenuItem><LogOut className="mr-2 h-4 w-4" /><span>Log out</span></MenuItem>
      </MenuContent>
    </div>
  );
}

function DropdownMenu08() {
  return (
    <div className="flex flex-col items-center gap-2">
      <Button variant="outline">User Profile</Button>
      <MenuContent>
        <div className="flex items-center gap-3 px-2 py-1.5">
          <Avatar className="size-10">
            <AvatarImage src="https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-2.png" alt="User" />
            <AvatarFallback>UN</AvatarFallback>
          </Avatar>
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">John Doe</p>
            <p className="text-xs leading-none text-muted-foreground">john@example.com</p>
          </div>
        </div>
        <MenuSeparator />
        <MenuItem><User className="mr-2 h-4 w-4" /><span>Profile</span></MenuItem>
        <MenuItem><CreditCard className="mr-2 h-4 w-4" /><span>Billing</span></MenuItem>
        <MenuItem><Settings className="mr-2 h-4 w-4" /><span>Settings</span></MenuItem>
        <MenuSeparator />
        <MenuItem><LogOut className="mr-2 h-4 w-4" /><span>Log out</span></MenuItem>
      </MenuContent>
    </div>
  );
}

function DropdownMenu09() {
  return (
    <div className="flex flex-col items-center gap-2">
      <Button variant="outline">Align Start</Button>
      <MenuContent className="w-48">
        <MenuItem><span>Option One</span></MenuItem>
        <MenuItem><span>Option Two</span></MenuItem>
        <MenuItem><span>Option Three</span></MenuItem>
      </MenuContent>
    </div>
  );
}

function DropdownMenu10() {
  return (
    <div className="flex flex-col items-center gap-2">
      <Button variant="outline">Align End</Button>
      <MenuContent className="w-48">
        <MenuItem><span>Option One</span></MenuItem>
        <MenuItem><span>Option Two</span></MenuItem>
        <MenuItem><span>Option Three</span></MenuItem>
      </MenuContent>
    </div>
  );
}

function DropdownMenu11() {
  return (
    <div className="flex flex-col items-center gap-2">
      <Button variant="outline">Bordered Menu</Button>
      <MenuContent className="border-2">
        <MenuLabel>Navigation</MenuLabel>
        <MenuSeparator />
        <MenuItem><span>Home</span></MenuItem>
        <MenuItem><span>About</span></MenuItem>
        <MenuItem><span>Services</span></MenuItem>
        <MenuSeparator />
        <MenuItem><span>Contact</span></MenuItem>
      </MenuContent>
    </div>
  );
}

function DropdownMenu12() {
  return (
    <div className="flex flex-col items-center gap-2">
      <Button variant="outline">Menu item with icon</Button>
      <MenuContent>
        <MenuItem><User className="mr-2 h-4 w-4" /><span>Profile</span></MenuItem>
        <MenuItem><Mail className="mr-2 h-4 w-4" /><span>Mail</span></MenuItem>
        <MenuItem><MessageSquare className="mr-2 h-4 w-4" /><span>Messages</span></MenuItem>
        <MenuSeparator />
        <MenuItem><UserPlus className="mr-2 h-4 w-4" /><span>Invite users</span></MenuItem>
        <MenuSeparator />
        <MenuItem><Github className="mr-2 h-4 w-4" /><span>GitHub</span></MenuItem>
        <MenuItem><LifeBuoy className="mr-2 h-4 w-4" /><span>Support</span></MenuItem>
        <MenuItem><Cloud className="mr-2 h-4 w-4" /><span>API</span></MenuItem>
      </MenuContent>
    </div>
  );
}

function DropdownMenu13() {
  return (
    <div className="flex flex-col items-center gap-2">
      <Button variant="outline">With checkbox</Button>
      <MenuContent>
        <MenuLabel>Appearance</MenuLabel>
        <MenuSeparator />
        <MenuItem><Check className="mr-2 h-4 w-4" /><span>Status Bar</span></MenuItem>
        <MenuItem className="text-muted-foreground"><span className="ml-6">Activity Bar</span></MenuItem>
        <MenuItem className="text-muted-foreground"><span className="ml-6">Panel</span></MenuItem>
      </MenuContent>
    </div>
  );
}

function DropdownMenu14() {
  return (
    <div className="flex flex-col items-center gap-2">
      <Button variant="outline">With radio</Button>
      <MenuContent>
        <MenuLabel>Panel Position</MenuLabel>
        <MenuSeparator />
        <MenuItem className="text-muted-foreground"><span className="ml-6">Top</span></MenuItem>
        <MenuItem><span className="mr-2 h-4 w-4 flex items-center justify-center">●</span><span>Bottom</span></MenuItem>
        <MenuItem className="text-muted-foreground"><span className="ml-6">Right</span></MenuItem>
      </MenuContent>
    </div>
  );
}

function DropdownMenu15() {
  return (
    <div className="flex flex-col items-center gap-2">
      <Button variant="outline">Slide Left Animation</Button>
      <MenuContent>
        <MenuLabel>Actions</MenuLabel>
        <MenuSeparator />
        <MenuItem><span>Edit</span></MenuItem>
        <MenuItem><span>Duplicate</span></MenuItem>
        <MenuItem><span>Archive</span></MenuItem>
        <MenuSeparator />
        <MenuItem className="text-destructive"><span>Delete</span></MenuItem>
      </MenuContent>
    </div>
  );
}

function DropdownMenu16() {
  return (
    <div className="flex flex-col items-center gap-2">
      <Button variant="outline">Slide Up Animation</Button>
      <MenuContent>
        <MenuLabel>Quick Actions</MenuLabel>
        <MenuSeparator />
        <MenuItem><Smile className="mr-2 h-4 w-4" /><span>Add Reaction</span></MenuItem>
        <MenuItem><MessageSquare className="mr-2 h-4 w-4" /><span>Reply</span></MenuItem>
        <MenuItem><Mail className="mr-2 h-4 w-4" /><span>Forward</span></MenuItem>
        <MenuSeparator />
        <MenuItem className="text-destructive"><span>Delete message</span></MenuItem>
      </MenuContent>
    </div>
  );
}

// --- Code strings ---
const codes: Record<string, string> = {
  "dropdown-menu-01": `import { Button } from "@/components/ui/button"
import {
  DropdownMenu, DropdownMenuTrigger, DropdownMenuContent,
  DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator,
  DropdownMenuShortcut, DropdownMenuGroup,
} from "@/components/ui/dropdown-menu"
import { User, CreditCard, Settings, Keyboard, LogOut } from "lucide-react"

export default function DropdownMenu01() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">Basic</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <User className="mr-2 h-4 w-4" />
            <span>Profile</span>
            <DropdownMenuShortcut>Shift+P</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <CreditCard className="mr-2 h-4 w-4" />
            <span>Billing</span>
            <DropdownMenuShortcut>Ctrl+B</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Settings className="mr-2 h-4 w-4" />
            <span>Settings</span>
            <DropdownMenuShortcut>Ctrl+S</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Keyboard className="mr-2 h-4 w-4" />
            <span>Keyboard shortcuts</span>
            <DropdownMenuShortcut>Ctrl+K</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
          <DropdownMenuShortcut>Shift+Q</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}`,
  "dropdown-menu-02": `import { Button } from "@/components/ui/button"
import {
  DropdownMenu, DropdownMenuTrigger, DropdownMenuContent,
  DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator,
  DropdownMenuGroup,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { User, Settings, CreditCard, LogOut } from "lucide-react"

export default function DropdownMenu02() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="bg-secondary flex items-center gap-2 rounded-lg px-3 py-2.5">
          <Avatar className="size-8">
            <AvatarImage src="https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-1.png" alt="Phillip George" />
            <AvatarFallback>PG</AvatarFallback>
          </Avatar>
          <div className="flex flex-col gap-1 text-start leading-none">
            <span className="max-w-[17ch] truncate text-sm leading-none font-semibold">Phillip George</span>
            <span className="text-muted-foreground max-w-[20ch] truncate text-xs">phillip12@gmail.com</span>
          </div>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem><User className="mr-2 h-4 w-4" /><span>Profile</span></DropdownMenuItem>
          <DropdownMenuItem><Settings className="mr-2 h-4 w-4" /><span>Settings</span></DropdownMenuItem>
          <DropdownMenuItem><CreditCard className="mr-2 h-4 w-4" /><span>Billing</span></DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem><LogOut className="mr-2 h-4 w-4" /><span>Log out</span></DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}`,
  "dropdown-menu-13": `"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu, DropdownMenuTrigger, DropdownMenuContent,
  DropdownMenuCheckboxItem, DropdownMenuLabel, DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"

export default function DropdownMenu13() {
  const [showStatusBar, setShowStatusBar] = useState(true)
  const [showActivityBar, setShowActivityBar] = useState(false)
  const [showPanel, setShowPanel] = useState(false)

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">With checkbox</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Appearance</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuCheckboxItem checked={showStatusBar} onCheckedChange={setShowStatusBar}>
          Status Bar
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem checked={showActivityBar} onCheckedChange={setShowActivityBar}>
          Activity Bar
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem checked={showPanel} onCheckedChange={setShowPanel}>
          Panel
        </DropdownMenuCheckboxItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}`,
  "dropdown-menu-14": `"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu, DropdownMenuTrigger, DropdownMenuContent,
  DropdownMenuRadioItem, DropdownMenuLabel, DropdownMenuSeparator,
  DropdownMenuRadioGroup,
} from "@/components/ui/dropdown-menu"

export default function DropdownMenu14() {
  const [position, setPosition] = useState("bottom")

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">With radio</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Panel Position</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup value={position} onValueChange={setPosition}>
          <DropdownMenuRadioItem value="top">Top</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="bottom">Bottom</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="right">Right</DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}`,
};

function getCode(id: string) {
  return codes[id] || codes["dropdown-menu-01"]!.replace("DropdownMenu01", id.replace("dropdown-menu-", "DropdownMenu"));
}

// --- Variants ---
const variants = [
  { id: "dropdown-menu-01", title: "Dropdown Menu 1", preview: <DropdownMenu01 /> },
  { id: "dropdown-menu-02", title: "Dropdown Menu 2", preview: <DropdownMenu02 /> },
  { id: "dropdown-menu-03", title: "Dropdown Menu 3", preview: <DropdownMenu03 /> },
  { id: "dropdown-menu-04", title: "Dropdown Menu 4", preview: <DropdownMenu04 /> },
  { id: "dropdown-menu-05", title: "Dropdown Menu 5", preview: <DropdownMenu05 /> },
  { id: "dropdown-menu-06", title: "Dropdown Menu 6", preview: <DropdownMenu06 /> },
  { id: "dropdown-menu-07", title: "Dropdown Menu 7", preview: <DropdownMenu07 /> },
  { id: "dropdown-menu-08", title: "Dropdown Menu 8", preview: <DropdownMenu08 /> },
  { id: "dropdown-menu-09", title: "Dropdown Menu 9", preview: <DropdownMenu09 /> },
  { id: "dropdown-menu-10", title: "Dropdown Menu 10", preview: <DropdownMenu10 /> },
  { id: "dropdown-menu-11", title: "Dropdown Menu 11", preview: <DropdownMenu11 /> },
  { id: "dropdown-menu-12", title: "Dropdown Menu 12", preview: <DropdownMenu12 /> },
  { id: "dropdown-menu-13", title: "Dropdown Menu 13", preview: <DropdownMenu13 /> },
  { id: "dropdown-menu-14", title: "Dropdown Menu 14", preview: <DropdownMenu14 /> },
  { id: "dropdown-menu-15", title: "Dropdown Menu 15", preview: <DropdownMenu15 /> },
  { id: "dropdown-menu-16", title: "Dropdown Menu 16", preview: <DropdownMenu16 /> },
];

export default function DropdownMenuPage() {
  return (
    <ComponentLayout>
      {/* Page Header */}
      <div className="mb-4 flex gap-x-8 gap-y-4 max-md:flex-col">
        <div className="space-y-3">
          <h1 className="text-2xl font-bold sm:text-3xl">Shadcn Dropdown Menu</h1>
          <p className="text-muted-foreground">
            Explore the collection of awesome Shadcn Dropdown Menu Components, featuring {variants.length} dropdown menu
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
          <p className="font-medium">Have any suggestions for Dropdown Menu variants?</p>
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
