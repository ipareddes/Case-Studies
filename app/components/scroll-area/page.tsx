"use client";

import { ScrollArea, ScrollBar, Separator, Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@ipareddes/ui-components";

import { ComponentLayout } from "@/components/layout/component-layout";
import { useState } from "react";
import { X, Sparkles, Code2, Copy, Check, User, Bell, Mail, Settings, FileText, Image, Music, Video, Star, Heart, Bookmark, Clock, Calendar, MessageSquare } from "lucide-react";
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
      <div className="group/item relative flex h-full min-h-[300px] items-center justify-center px-8 py-12 max-sm:px-4" data-slot={variantId}>
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

// --- Scroll Area Variant Previews ---

const tags = Array.from({ length: 50 }).map((_, i, a) => `v1.2.0-beta.${a.length - i}`);

function ScrollArea01() {
  return (
    <ScrollArea className="h-72 w-48 rounded-md border">
      <div className="p-4">
        <h4 className="mb-4 text-sm font-medium leading-none">Tags</h4>
        {tags.map((tag) => (
          <div key={tag}>
            <div className="text-sm">{tag}</div>
            <Separator className="my-2" />
          </div>
        ))}
      </div>
    </ScrollArea>
  );
}

function ScrollArea02() {
  const notifications = [
    { id: 1, title: "New message", desc: "You have a new message from John", time: "2 min ago", icon: Mail },
    { id: 2, title: "Meeting reminder", desc: "Team standup in 15 minutes", time: "15 min ago", icon: Calendar },
    { id: 3, title: "New follower", desc: "Sarah started following you", time: "1 hour ago", icon: User },
    { id: 4, title: "Comment reply", desc: "Jane replied to your comment", time: "2 hours ago", icon: MessageSquare },
    { id: 5, title: "Task completed", desc: "Project review is done", time: "3 hours ago", icon: Check },
    { id: 6, title: "System update", desc: "New version available", time: "5 hours ago", icon: Settings },
    { id: 7, title: "New like", desc: "Mike liked your post", time: "1 day ago", icon: Heart },
    { id: 8, title: "Reminder", desc: "Submit weekly report", time: "1 day ago", icon: Clock },
  ];

  return (
    <ScrollArea className="h-72 w-80 rounded-md border">
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-sm font-medium">Notifications</h4>
          <span className="text-xs text-muted-foreground">Mark all read</span>
        </div>
        <div className="space-y-3">
          {notifications.map((notif) => (
            <div key={notif.id} className="flex gap-3 p-2 rounded-lg hover:bg-muted/50 cursor-pointer">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted">
                <notif.icon className="h-4 w-4" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{notif.title}</p>
                <p className="text-xs text-muted-foreground truncate">{notif.desc}</p>
              </div>
              <span className="text-xs text-muted-foreground whitespace-nowrap">{notif.time}</span>
            </div>
          ))}
        </div>
      </div>
    </ScrollArea>
  );
}

function ScrollArea03() {
  const works = [
    { id: 1, title: "Sunset Beach", artist: "Nature Collection", img: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=300&h=300&fit=crop" },
    { id: 2, title: "Mountain Peak", artist: "Landscape Series", img: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=300&h=300&fit=crop" },
    { id: 3, title: "City Lights", artist: "Urban Photography", img: "https://images.unsplash.com/photo-1514565131-fce0801e5785?w=300&h=300&fit=crop" },
    { id: 4, title: "Forest Path", artist: "Nature Collection", img: "https://images.unsplash.com/photo-1448375240586-882707db888b?w=300&h=300&fit=crop" },
    { id: 5, title: "Ocean Waves", artist: "Seascape Series", img: "https://images.unsplash.com/photo-1505118380757-91f5f5632de0?w=300&h=300&fit=crop" },
  ];

  return (
    <ScrollArea className="w-96 whitespace-nowrap rounded-md border">
      <div className="flex w-max space-x-4 p-4">
        {works.map((work) => (
          <figure key={work.id} className="shrink-0">
            <div className="overflow-hidden rounded-md">
              <img
                src={work.img}
                alt={work.title}
                className="aspect-[3/4] h-48 w-36 object-cover"
              />
            </div>
            <figcaption className="pt-2 text-xs text-muted-foreground">
              <span className="font-semibold text-foreground">{work.title}</span>
              <br />
              {work.artist}
            </figcaption>
          </figure>
        ))}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
}

function ScrollArea04() {
  const files = [
    { name: "document.pdf", size: "2.4 MB", icon: FileText },
    { name: "photo.jpg", size: "1.8 MB", icon: Image },
    { name: "music.mp3", size: "5.2 MB", icon: Music },
    { name: "video.mp4", size: "124 MB", icon: Video },
    { name: "report.docx", size: "856 KB", icon: FileText },
    { name: "presentation.pptx", size: "12.3 MB", icon: FileText },
    { name: "spreadsheet.xlsx", size: "1.1 MB", icon: FileText },
    { name: "archive.zip", size: "45.6 MB", icon: FileText },
  ];

  return (
    <ScrollArea className="h-72 w-64 rounded-md border">
      <div className="p-4">
        <h4 className="mb-4 text-sm font-medium">Recent Files</h4>
        <div className="space-y-2">
          {files.map((file, i) => (
            <div key={i} className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50 cursor-pointer">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
                <file.icon className="h-5 w-5 text-muted-foreground" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{file.name}</p>
                <p className="text-xs text-muted-foreground">{file.size}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </ScrollArea>
  );
}

function ScrollArea05() {
  const conversations = [
    { name: "John Doe", message: "Hey, are you free for a call?", time: "2m", unread: 3, online: true },
    { name: "Sarah Smith", message: "The meeting is confirmed", time: "15m", unread: 0, online: true },
    { name: "Mike Johnson", message: "Thanks for your help!", time: "1h", unread: 0, online: false },
    { name: "Emily Davis", message: "Can you review the PR?", time: "2h", unread: 1, online: true },
    { name: "Alex Wilson", message: "See you tomorrow!", time: "3h", unread: 0, online: false },
    { name: "Lisa Brown", message: "Great work on the project", time: "5h", unread: 0, online: false },
    { name: "Tom Anderson", message: "Let's sync up next week", time: "1d", unread: 0, online: false },
  ];

  return (
    <ScrollArea className="h-80 w-72 rounded-md border">
      <div className="p-2">
        {conversations.map((conv, i) => (
          <div key={i} className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50 cursor-pointer">
            <div className="relative">
              <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-500" />
              {conv.online && (
                <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-background" />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium truncate">{conv.name}</p>
                <span className="text-xs text-muted-foreground">{conv.time}</span>
              </div>
              <p className="text-xs text-muted-foreground truncate">{conv.message}</p>
            </div>
            {conv.unread > 0 && (
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
                {conv.unread}
              </span>
            )}
          </div>
        ))}
      </div>
    </ScrollArea>
  );
}

function ScrollArea06() {
  const menuItems = [
    { label: "Profile", icon: User },
    { label: "Notifications", icon: Bell, badge: 3 },
    { label: "Messages", icon: Mail },
    { label: "Bookmarks", icon: Bookmark },
    { label: "Favorites", icon: Star },
    { label: "Settings", icon: Settings },
  ];

  return (
    <ScrollArea className="h-64 w-56 rounded-md border">
      <div className="p-2">
        <div className="mb-4 p-3">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-full bg-gradient-to-br from-orange-500 to-pink-500" />
            <div>
              <p className="font-medium">John Doe</p>
              <p className="text-xs text-muted-foreground">@johndoe</p>
            </div>
          </div>
        </div>
        <Separator className="mb-2" />
        <div className="space-y-1">
          {menuItems.map((item, i) => (
            <div
              key={i}
              className="flex items-center justify-between p-2 rounded-lg hover:bg-muted cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <item.icon className="h-4 w-4" />
                <span className="text-sm">{item.label}</span>
              </div>
              {item.badge && (
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white">
                  {item.badge}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </ScrollArea>
  );
}

function ScrollArea07() {
  const items = Array.from({ length: 20 }).map((_, i) => ({
    id: i + 1,
    title: `Item ${i + 1}`,
    description: `Description for item ${i + 1}`,
  }));

  return (
    <ScrollArea className="h-72 w-64 rounded-md border">
      <div className="p-4">
        <h4 className="mb-4 text-sm font-medium">Minimal List</h4>
        <div className="space-y-2">
          {items.map((item) => (
            <div key={item.id} className="text-sm">
              <p className="font-medium">{item.title}</p>
              <p className="text-xs text-muted-foreground">{item.description}</p>
              <Separator className="mt-2" />
            </div>
          ))}
        </div>
      </div>
    </ScrollArea>
  );
}

function ScrollArea08() {
  const categories = [
    "Electronics", "Clothing", "Home & Garden", "Sports", "Books",
    "Toys", "Beauty", "Automotive", "Health", "Food & Grocery",
    "Pet Supplies", "Office", "Music", "Movies", "Video Games"
  ];

  return (
    <ScrollArea className="w-80 whitespace-nowrap rounded-md border">
      <div className="flex w-max gap-2 p-4">
        {categories.map((cat) => (
          <button
            key={cat}
            className="inline-flex items-center rounded-full border px-3 py-1.5 text-sm font-medium hover:bg-muted transition-colors"
          >
            {cat}
          </button>
        ))}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
}

function ScrollArea09() {
  const colors = [
    "#ef4444", "#f97316", "#eab308", "#22c55e", "#14b8a6",
    "#06b6d4", "#3b82f6", "#6366f1", "#8b5cf6", "#a855f7",
    "#d946ef", "#ec4899", "#f43f5e"
  ];

  return (
    <ScrollArea className="w-64 whitespace-nowrap rounded-md border">
      <div className="flex w-max gap-3 p-4">
        {colors.map((color) => (
          <button
            key={color}
            className="h-10 w-10 rounded-full border-2 border-transparent hover:border-foreground transition-colors shrink-0"
            style={{ backgroundColor: color }}
          />
        ))}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
}

function ScrollArea10() {
  const timeline = [
    { time: "09:00", event: "Morning standup", type: "meeting" },
    { time: "10:00", event: "Code review", type: "task" },
    { time: "11:30", event: "Client call", type: "meeting" },
    { time: "12:00", event: "Lunch break", type: "break" },
    { time: "13:00", event: "Design review", type: "meeting" },
    { time: "14:30", event: "Sprint planning", type: "meeting" },
    { time: "16:00", event: "Deploy to staging", type: "task" },
    { time: "17:00", event: "Team retrospective", type: "meeting" },
  ];

  const typeColors: Record<string, string> = {
    meeting: "bg-blue-500",
    task: "bg-green-500",
    break: "bg-yellow-500",
  };

  return (
    <ScrollArea className="h-72 w-72 rounded-md border">
      <div className="p-4">
        <h4 className="mb-4 text-sm font-medium">Today&apos;s Schedule</h4>
        <div className="space-y-4">
          {timeline.map((item, i) => (
            <div key={i} className="flex gap-4">
              <span className="w-12 text-xs text-muted-foreground">{item.time}</span>
              <div className="flex items-center gap-2">
                <span className={`h-2 w-2 rounded-full ${typeColors[item.type]}`} />
                <span className="text-sm">{item.event}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </ScrollArea>
  );
}

// --- Code strings ---
const codes: Record<string, string> = {
  "scroll-area-01": `
const tags = Array.from({ length: 50 }).map((_, i, a) => \`v1.2.0-beta.\${a.length - i}\`)

export default function ScrollArea01() {
  return (
    <ScrollArea className="h-72 w-48 rounded-md border">
      <div className="p-4">
        <h4 className="mb-4 text-sm font-medium leading-none">Tags</h4>
        {tags.map((tag) => (
          <div key={tag}>
            <div className="text-sm">{tag}</div>
            <Separator className="my-2" />
          </div>
        ))}
      </div>
    </ScrollArea>
  )
}`,
};

function getCode(id: string) {
  return codes[id] || codes["scroll-area-01"]!;
}

// --- Variants ---
const variants = [
  { id: "scroll-area-01", title: "Scroll Area 1 - Tags List", preview: <ScrollArea01 /> },
  { id: "scroll-area-02", title: "Scroll Area 2 - Notifications", preview: <ScrollArea02 /> },
  { id: "scroll-area-03", title: "Scroll Area 3 - Horizontal Gallery", preview: <ScrollArea03 /> },
  { id: "scroll-area-04", title: "Scroll Area 4 - File List", preview: <ScrollArea04 /> },
  { id: "scroll-area-05", title: "Scroll Area 5 - Chat List", preview: <ScrollArea05 /> },
  { id: "scroll-area-06", title: "Scroll Area 6 - User Menu", preview: <ScrollArea06 /> },
  { id: "scroll-area-07", title: "Scroll Area 7 - Minimal List", preview: <ScrollArea07 /> },
  { id: "scroll-area-08", title: "Scroll Area 8 - Category Pills", preview: <ScrollArea08 /> },
  { id: "scroll-area-09", title: "Scroll Area 9 - Color Picker", preview: <ScrollArea09 /> },
  { id: "scroll-area-10", title: "Scroll Area 10 - Timeline", preview: <ScrollArea10 /> },
];

export default function ScrollAreaPage() {
  return (
    <ComponentLayout>
      {/* Page Header */}
      <div className="mb-4 flex gap-x-8 gap-y-4 max-md:flex-col">
        <div className="space-y-3">
          <h1 className="text-2xl font-bold sm:text-3xl">Shadcn Scroll Area</h1>
          <p className="text-muted-foreground">
            Explore the collection of awesome Shadcn Scroll Area Components, featuring {variants.length} scroll area
            variants designed for custom scrollable containers built with React and Tailwind CSS.
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
          <p className="font-medium">Have any suggestions for Scroll Area variants?</p>
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
