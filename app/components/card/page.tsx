"use client";

import { Avatar, AvatarImage, Badge, Button, Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, Input, Label, Separator, Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@ipareddes/ui-components";

import { ComponentLayout } from "@/components/layout/component-layout";
import { useState } from "react";
import { X, Sparkles, Code2, Copy, Check, CircleFadingPlus, BadgeCheck, UserPlus, Heart, Star, TrendingUp, TrendingDown, Quote, ArrowRight, ChevronUp, ChevronDown, MoreHorizontal, ShoppingCart, DollarSign, CreditCard, Mail, MailOpen, MousePointerClick, BellRing, TriangleAlert, CircleOff, CircleDollarSign, TicketCheck } from "lucide-react";
import ReactDOM from "react-dom";
import { cn } from "@/lib";

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
  fullWidth,
}: {
  title: string;
  variantId: string;
  code: string;
  children: React.ReactNode;
  isLastCol: boolean;
  fullWidth?: boolean;
}) {
  const [showCode, setShowCode] = useState(false);

  return (
    <div className={`${isLastCol ? "border-r-0" : ""} ${fullWidth ? "md:col-span-2 md:border-r-0" : ""}`}>
      <div className="group/item relative flex h-full min-h-[210px] items-center justify-center px-8 py-12 max-sm:px-4" data-slot={variantId}>
        <div className={fullWidth ? "w-full" : "flex w-full justify-center"}>{children}</div>
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

// --- Card Variant Previews ---

function Card01() {
  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Login to your account</CardTitle>
        <CardDescription>Enter your email below to login to your account</CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="email-01">Email</Label>
              <Input type="email" id="email-01" placeholder="m@example.com" />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password-01">Password</Label>
                <a href="#" className="ml-auto inline-block text-sm underline-offset-4 hover:underline">Forgot your password?</a>
              </div>
              <Input type="password" id="password-01" />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex-col gap-2">
        <Button className="w-full">Login</Button>
        <Button variant="outline" className="w-full">Login with Google</Button>
      </CardFooter>
    </Card>
  );
}

function Card02() {
  return (
    <Card className="max-w-md">
      <CardHeader>
        <CardTitle>Meeting Notes</CardTitle>
        <CardDescription>Transcript from the meeting with the client.</CardDescription>
      </CardHeader>
      <CardContent className="text-sm">
        <p>Client requested dashboard redesign with focus on mobile responsiveness.</p>
        <ol className="mt-4 flex list-decimal flex-col gap-2 pl-6">
          <li>New analytics widgets for daily/weekly metrics</li>
          <li>Simplified navigation menu</li>
          <li>Dark mode support</li>
          <li>Timeline: 6 weeks</li>
          <li>Follow-up meeting scheduled for next Tuesday</li>
        </ol>
      </CardContent>
      <CardFooter>
        <div className="flex -space-x-2 hover:space-x-1">
          <Avatar className="size-8 ring-background ring-2 transition-all duration-300 ease-in-out">
            <AvatarImage src="https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-3.png" alt="Olivia Sparks" />
          </Avatar>
          <Avatar className="size-8 ring-background ring-2 transition-all duration-300 ease-in-out">
            <AvatarImage src="https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-6.png" alt="Howard Lloyd" />
          </Avatar>
          <Avatar className="size-8 ring-background ring-2 transition-all duration-300 ease-in-out">
            <AvatarImage src="https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-5.png" alt="Hallie Richards" />
          </Avatar>
          <Avatar className="size-8 ring-background ring-2 transition-all duration-300 ease-in-out">
            <AvatarImage src="https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-16.png" alt="Jenny Wilson" />
          </Avatar>
        </div>
      </CardFooter>
    </Card>
  );
}

function Card03() {
  return (
    <Card className="w-full max-w-lg">
      <CardHeader>
        <CardTitle>Meeting Notes</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4 sm:grid-cols-2">
        <div className="flex items-center gap-4">
          <CircleFadingPlus className="size-6" />
          <span className="text-sm font-semibold">Invite Member</span>
        </div>
        <div className="flex items-center gap-4">
          <Avatar className="size-8">
            <AvatarImage src="https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-5.png" alt="Jimmy Androson" />
          </Avatar>
          <div className="flex flex-col">
            <span className="text-sm font-semibold">Jimmy Androson</span>
            <span className="text-muted-foreground text-sm">UI Designer</span>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Avatar className="size-8">
            <AvatarImage src="https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-2.png" alt="Dean Ambrose" />
          </Avatar>
          <div className="flex flex-col">
            <span className="text-sm font-semibold">Dean Ambrose</span>
            <span className="text-muted-foreground text-sm">UX Designer</span>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Avatar className="size-8">
            <AvatarImage src="https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-3.png" alt="Anita John" />
          </Avatar>
          <div className="flex flex-col">
            <span className="text-sm font-semibold">Anita John</span>
            <span className="text-muted-foreground text-sm">Branding</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function Card04() {
  return (
    <Card className="max-w-md pb-0">
      <CardHeader>
        <CardTitle>Fluid Gradient Flow</CardTitle>
        <CardDescription>A vibrant and abstract background with smooth gradient curves.</CardDescription>
      </CardHeader>
      <CardContent className="px-0">
        <img src="https://cdn.shadcnstudio.com/ss-assets/components/card/image-1.png?height=280&format=auto" alt="Banner" className="aspect-video h-70 rounded-b-xl object-cover" />
      </CardContent>
    </Card>
  );
}

function Card05() {
  return (
    <Card className="max-w-md pt-0">
      <CardContent className="px-0">
        <img src="https://cdn.shadcnstudio.com/ss-assets/components/card/image-2.png?height=280&format=auto" alt="Banner" className="aspect-video h-70 rounded-t-xl object-cover" />
      </CardContent>
      <CardHeader>
        <CardTitle>Ethereal Swirl Gradient</CardTitle>
        <CardDescription>Smooth, flowing gradients blending rich reds and blues in an abstract swirl.</CardDescription>
      </CardHeader>
      <CardFooter className="gap-3 max-sm:flex-col max-sm:items-stretch">
        <Button>Explore More</Button>
        <Button variant="outline">Download Now</Button>
      </CardFooter>
    </Card>
  );
}

function Card06() {
  return (
    <Card className="max-w-lg py-0 sm:flex-row sm:gap-0">
      <CardContent className="grow-1 px-0">
        <img src="https://cdn.shadcnstudio.com/ss-assets/components/card/image-3.png" alt="Banner" className="size-full rounded-l-xl" />
      </CardContent>
      <div className="sm:min-w-54">
        <CardHeader className="pt-6">
          <CardTitle>Dreamy Colorwave Gradient</CardTitle>
          <CardDescription>A smooth blend of vibrant pinks, purples, and blues for a magical touch.</CardDescription>
        </CardHeader>
        <CardFooter className="gap-3 py-6">
          <Button className="bg-gradient-to-br from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600">Explore More</Button>
        </CardFooter>
      </div>
    </Card>
  );
}

function Card07() {
  return (
    <Card className="relative max-w-md py-0 before:bg-primary/70 before:absolute before:size-full before:rounded-xl">
      <CardContent className="px-0">
        <img src="https://cdn.shadcnstudio.com/ss-assets/components/card/image-8.png?widht=448&height=280&format=auto" alt="Banner" className="h-70 w-112 rounded-xl" />
      </CardContent>
      <div className="absolute">
        <CardHeader className="text-primary-foreground w-full pt-6">
          <CardTitle>Creative Catalyst</CardTitle>
        </CardHeader>
        <CardContent className="text-primary-foreground/80">
          Step into a world where imagination takes the lead and every pixel tells a story. This is a space designed to unleash your creative potential without boundaries or time constraints.
        </CardContent>
      </div>
    </Card>
  );
}

function Card08() {
  return (
    <Card className="bg-primary/20 max-w-md gap-0">
      <CardHeader>
        <CardTitle>Design Throwdown</CardTitle>
      </CardHeader>
      <CardContent>
        Where passion, pressure, and pixels collide -- push your creativity to the edge and show what you are made of.
      </CardContent>
    </Card>
  );
}

function Card09() {
  return (
    <Card className="border-primary max-w-md gap-0 bg-transparent shadow-none">
      <CardHeader>
        <CardTitle>Creative Clash</CardTitle>
      </CardHeader>
      <CardContent>
        Step into a space where design skills are tested, ideas come alive, and only the boldest concepts win the spotlight.
      </CardContent>
    </Card>
  );
}

function Card10() {
  return (
    <Card className="w-max">
      <CardContent>
        <div className="flex flex-col gap-2 w-full max-w-sm">
          <div className="inline-flex h-9 items-center bg-background w-full justify-start rounded-none border-b p-0">
            <button className="inline-flex flex-1 items-center justify-center px-2 py-1 text-sm font-medium border-b-2 border-primary h-full rounded-none">Home</button>
            <button className="inline-flex flex-1 items-center justify-center px-2 py-1 text-sm font-medium border-b-2 border-transparent text-muted-foreground h-full rounded-none">Profile</button>
            <button className="inline-flex flex-1 items-center justify-center px-2 py-1 text-sm font-medium border-b-2 border-transparent text-muted-foreground h-full rounded-none">Messages</button>
          </div>
          <div className="mt-2 text-sm">
            <p className="font-semibold">Welcome back!</p>
            <p className="text-muted-foreground mt-1">Here is an overview of your recent activity and updates.</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function Card11() {
  return (
    <Card className="max-w-md">
      <CardHeader className="flex items-center justify-between gap-3 flex-row">
        <div className="flex items-center gap-3">
          <Avatar className="size-8 ring-ring ring-2">
            <AvatarImage src="https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-5.png" alt="Philip George" />
          </Avatar>
          <div className="flex flex-col gap-0.5">
            <CardTitle className="flex items-center gap-1 text-sm">
              Philip George <BadgeCheck className="size-4 fill-sky-600 stroke-white dark:fill-sky-400" />
            </CardTitle>
            <CardDescription>@philip20</CardDescription>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <UserPlus className="size-4" />
            Follow
          </Button>
        </div>
      </CardHeader>
      <CardContent className="text-sm">
        <p>Full Stack Developer. Building modern web experiences with React, TypeScript, and Node.js.</p>
      </CardContent>
      <CardFooter className="gap-4 text-sm">
        <div><span className="font-semibold">256</span> <span className="text-muted-foreground">Following</span></div>
        <div><span className="font-semibold">1.2k</span> <span className="text-muted-foreground">Followers</span></div>
      </CardFooter>
    </Card>
  );
}

function Card12() {
  return (
    <div className="relative max-w-md rounded-xl bg-gradient-to-r from-neutral-600 to-violet-300 pt-0 shadow-lg">
      <div className="flex h-60 items-center justify-center">
        <img src="https://cdn.shadcnstudio.com/ss-assets/components/card/image-11.png?width=300&format=auto" alt="Shoes" className="w-75" />
      </div>
      <Button variant="ghost" size="icon" className="bg-primary/10 hover:bg-primary/20 absolute top-4 right-4 rounded-full">
        <Heart className="stroke-white" />
        <span className="sr-only">Like</span>
      </Button>
      <Card className="border-none">
        <CardHeader>
          <CardTitle>Nike Jordan Air Rev</CardTitle>
          <CardDescription className="flex items-center gap-2">
            <Badge variant="outline" className="rounded-sm">EU38</Badge>
            <Badge variant="outline" className="rounded-sm">Black and White</Badge>
          </CardDescription>
        </CardHeader>
        <CardContent className="text-sm">
          <p>Crossing hardwood comfort with off-court flair.</p>
        </CardContent>
        <CardFooter className="justify-between">
          <span className="text-lg font-bold">$199.99</span>
          <Button>Add to Cart</Button>
        </CardFooter>
      </Card>
    </div>
  );
}

function Card13() {
  return (
    <Card className="max-w-md border-none">
      <CardContent>
        <p>Incredible time-saver! shadcn/studio has made UI development a breeze. The pre build components are not only <span className="bg-primary/10">visually appealing but also highly customizable</span>, fitting seamlessly into my projects. With a wide array of options to choose from, I can easily match.</p>
      </CardContent>
      <CardFooter className="justify-between gap-3 max-sm:flex-col max-sm:items-stretch">
        <div className="flex items-center gap-3">
          <Avatar className="size-8 ring-ring ring-2">
            <AvatarImage src="https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-5.png" alt="Sam Green" />
          </Avatar>
          <div className="flex flex-col gap-0.5">
            <CardTitle className="flex items-center gap-1 text-sm">Sam Green</CardTitle>
            <CardDescription>@SamG11</CardDescription>
          </div>
        </div>
        <div className="flex items-center gap-1">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="size-5 fill-amber-500 stroke-amber-500 dark:fill-amber-400 dark:stroke-amber-400" />
          ))}
        </div>
      </CardFooter>
    </Card>
  );
}

function Card14() {
  return (
    <Card className="relative max-w-lg shadow-none">
      <Button variant="ghost" size="icon" className="absolute top-2 right-2 rounded-full">
        <X />
        <span className="sr-only">Close</span>
      </Button>
      <CardHeader>
        <CardTitle className="text-center">Have a project in mind</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4 text-center">
        <p>Let&apos;s discuss! Our Assistant team is excited to hear about your projects, ideas and questions.</p>
        <Button>Contact Our Team</Button>
      </CardContent>
    </Card>
  );
}

function Card15() {
  return (
    <div className="flex w-full overflow-hidden rounded-xl border shadow-sm max-lg:flex-col">
      {/* Left section */}
      <div className="flex flex-1 flex-col gap-6 pb-6 max-lg:border-b lg:border-r">
        <img src="https://cdn.shadcnstudio.com/ss-assets/components/card/image-7.png?width=368&format=auto" alt="Banner" className="aspect-video w-full object-cover" />
        <div className="flex flex-col gap-1.5 px-6">
          <div className="text-2xl font-semibold leading-none tracking-tight">Mystical Blue Swirl</div>
          <p className="text-sm text-muted-foreground">Dive into the depths of an enchanting swirl where vibrant blues and soft pinks merge seamlessly, creating a mesmerizing flow of colors.</p>
        </div>
        <div className="flex items-center gap-3 px-6 max-sm:flex-col max-sm:items-stretch">
          <Button>Explore More</Button>
          <Button variant="outline">Download Now</Button>
        </div>
      </div>
      {/* Middle section */}
      <div className="flex flex-1 flex-col gap-6 pb-6 max-lg:border-b lg:border-r">
        <img src="https://cdn.shadcnstudio.com/ss-assets/components/card/image-4.png?width=368&format=auto" alt="Banner" className="aspect-video w-full object-cover" />
        <div className="flex flex-col gap-1.5 px-6">
          <div className="text-2xl font-semibold leading-none tracking-tight">Fiery Sunset Gradient</div>
          <p className="text-sm text-muted-foreground">Experience the warmth of a radiant sunset with flowing gradients of red, orange, and yellow blending effortlessly in an abstract glow.</p>
        </div>
        <div className="flex items-center gap-3 px-6 max-sm:flex-col max-sm:items-stretch">
          <Button>Explore More</Button>
          <Button variant="outline">Download Now</Button>
        </div>
      </div>
      {/* Right section */}
      <div className="flex flex-1 flex-col gap-6 pb-6">
        <img src="https://cdn.shadcnstudio.com/ss-assets/components/card/image-5.png?width=368&format=auto" alt="Banner" className="aspect-video w-full object-cover" />
        <div className="flex flex-col gap-1.5 px-6">
          <div className="text-2xl font-semibold leading-none tracking-tight">Cosmic Blue Waves</div>
          <p className="text-sm text-muted-foreground">Explore the mysteries of the cosmos with deep, swirling waves of blue and purple, evoking a sense of depth and infinite space.</p>
        </div>
        <div className="flex items-center gap-3 px-6 max-sm:flex-col max-sm:items-stretch">
          <Button>Explore More</Button>
          <Button variant="outline">Download Now</Button>
        </div>
      </div>
    </div>
  );
}

function Card16() {
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const blob = card.querySelector('.blob') as HTMLElement;
    const fakeBlob = card.querySelector('.fake-blob') as HTMLElement;

    if (blob && fakeBlob) {
      blob.style.left = `${x - 40}px`;
      blob.style.top = `${y - 40}px`;
      fakeBlob.style.left = `${x - 40}px`;
      fakeBlob.style.top = `${y - 40}px`;
    }
  };

  return (
    <div className="h-max w-max">
      <div
        className="spotlight-card group bg-border relative overflow-hidden rounded-xl p-px transition-all duration-300 ease-in-out"
        onMouseMove={handleMouseMove}
      >
        <Card className="group-hover:bg-card/90 max-w-80 border-none transition-all duration-300 ease-in-out group-hover:backdrop-blur-[20px]">
          <CardHeader>
            <CardTitle>Hover for the Glow-Up</CardTitle>
          </CardHeader>
          <CardContent>
            Glide your cursor here and watch magic unfold -- an experience designed just for you.
          </CardContent>
        </Card>
        <div className="blob absolute top-0 left-0 size-20 rounded-full bg-sky-600/60 opacity-0 blur-2xl transition-all duration-300 ease-in-out dark:bg-sky-400/60" />
        <div className="fake-blob absolute top-0 left-0 size-20 rounded-full" />
      </div>
    </div>
  );
}

function Card17() {
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -10;
    const rotateY = ((x - centerX) / centerX) * 10;

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
  };

  return (
    <Card
      className="max-w-md transition-transform duration-300 ease-out"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transformStyle: 'preserve-3d' }}
    >
      <CardHeader>
        <CardTitle>Dynamic 3D Hover Card</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6 text-sm">
        <img src="https://cdn.shadcnstudio.com/ss-assets/components/card/image-10.png?width=350&format=auto" alt="Banner" className="aspect-video w-full rounded-md object-cover" width={500} height={500} />
        <p>Experience interactive depth and motion with this sleek 3D hover effect. Move your cursor to see it come alive!</p>
      </CardContent>
    </Card>
  );
}

// --- Case Study Card Variants ---

function Card18() {
  return (
    <div className="grid grid-cols-2 gap-4 w-full max-w-md">
      <div className="rounded-lg border bg-card p-6 shadow-sm transition-all hover:shadow-md">
        <div className="text-3xl font-bold tracking-tight text-foreground mb-2">72%</div>
        <div className="text-sm text-muted-foreground">Faster transactions</div>
      </div>
      <div className="rounded-lg border bg-card p-6 shadow-sm transition-all hover:shadow-md">
        <div className="text-3xl font-bold tracking-tight text-foreground mb-2">$2B+</div>
        <div className="text-sm text-muted-foreground">Annual processing</div>
      </div>
      <div className="rounded-lg border bg-card p-6 shadow-sm transition-all hover:shadow-md">
        <div className="text-3xl font-bold tracking-tight text-foreground mb-2">100K+</div>
        <div className="text-sm text-muted-foreground">Active merchants</div>
      </div>
      <div className="rounded-lg border bg-card p-6 shadow-sm transition-all hover:shadow-md">
        <div className="text-3xl font-bold tracking-tight text-foreground mb-2">18 mo</div>
        <div className="text-sm text-muted-foreground">Project duration</div>
      </div>
    </div>
  );
}

function Card19() {
  return (
    <Card className="max-w-sm">
      <CardHeader>
        <CardDescription>Average transaction time</CardDescription>
        <div className="flex items-baseline gap-3">
          <CardTitle>0.9 min</CardTitle>
          <span className="text-sm font-semibold text-green-600 flex items-center gap-1">
            <TrendingDown className="size-4" />
            -72%
          </span>
        </div>
        <p className="text-xs text-muted-foreground">From: 3.2 minutes</p>
      </CardHeader>
      <CardContent className="pt-3 border-t">
        <p className="text-sm text-muted-foreground">
          <span className="font-semibold text-foreground">Business Value:</span>{' '}
          Merchants can serve 40% more customers during rush hours.
        </p>
      </CardContent>
    </Card>
  );
}

function Card20() {
  return (
    <div className="max-w-md border-l-4 border-primary bg-muted/50 p-6 rounded-r-lg">
      <Quote className="size-8 text-muted-foreground/50 mb-3" />
      <p className="text-lg italic text-foreground mb-4">
        &ldquo;I lose customers every day because they don&apos;t have time to wait. Every second at checkout is money out of my pocket.&rdquo;
      </p>
      <div className="text-sm font-medium text-muted-foreground">
        <strong className="text-foreground">Carlos Mendoza</strong>, Coffee Shop Owner
      </div>
    </div>
  );
}

function Card21() {
  const timeline = [
    { phase: 'Research & Discovery', duration: '2 months', milestone: 'Identified platform opportunity through contextual shadowing' },
    { phase: 'Vision & Strategy', duration: '1 month', milestone: 'Secured leadership buy-in for platform pivot' },
    { phase: 'MVP Development', duration: '6 months', milestone: 'Launched inventory-powered checkout with 3 core modes' },
    { phase: 'Platform Expansion', duration: '9 months', milestone: 'Added employee management and insights dashboard' },
  ];

  return (
    <div className="max-w-md space-y-0">
      {timeline.map((item, index) => (
        <div key={index} className="relative pl-8 pb-6 border-l-2 border-gray-200 last:pb-0 last:border-l-transparent">
          <div className="absolute left-0 top-0 w-4 h-4 -ml-[9px] rounded-full bg-primary border-4 border-background" />
          <div>
            <div className="flex items-baseline gap-3 mb-1">
              <h4 className="font-semibold text-foreground">{item.phase}</h4>
              <span className="text-xs text-muted-foreground">{item.duration}</span>
            </div>
            <p className="text-sm text-muted-foreground">{item.milestone}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

function Card22() {
  return (
    <Card className="max-w-sm">
      <CardHeader>
        <CardTitle className="text-lg">Jobs to Be Done (JTBD)</CardTitle>
        <CardDescription>Understanding the functional and emotional jobs merchants are hiring a POS to accomplish</CardDescription>
      </CardHeader>
      <CardContent className="pt-3 border-t">
        <p className="text-xs font-semibold text-foreground mb-1">How we used it</p>
        <p className="text-sm text-muted-foreground">Structured research around merchant goals rather than feature requests.</p>
      </CardContent>
    </Card>
  );
}

function Card23() {
  return (
    <Card className="max-w-sm">
      <CardHeader>
        <Badge className="w-fit mb-2">Long-term Impact</Badge>
        <CardTitle className="text-lg">Market Position Transformation</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground mb-4">
          Clip shifted from competing on price in a commoditized payment market to commanding premium positioning as a business platform.
        </p>
        <div className="pt-3 border-t">
          <p className="text-xs font-semibold text-foreground mb-1">Sustainability</p>
          <p className="text-xs text-muted-foreground">
            Platform architecture enables continuous expansion into adjacent merchant needs.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}

function Card24() {
  return (
    <Card className="max-w-md">
      <CardHeader>
        <CardDescription>Automation Workflow</CardDescription>
        <CardTitle className="text-lg">Rush Hour Checkout</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <div className="text-sm font-medium text-muted-foreground mb-1">Trigger</div>
          <div className="text-sm text-foreground">Customer orders during rush hour</div>
        </div>
        <div>
          <div className="text-sm font-medium text-muted-foreground mb-1">Conditions</div>
          <ul className="space-y-1">
            {['Product catalog pre-loaded', 'Visual grid enabled', 'One-tap modifiers configured'].map((item, i) => (
              <li key={i} className="text-sm text-foreground flex items-start gap-2">
                <Check className="size-4 text-green-600 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <div className="text-sm font-medium text-muted-foreground mb-1">Actions</div>
          <ul className="space-y-1">
            {['Tap products from visual menu', 'Auto-calculate total', 'Send digital receipt'].map((item, i) => (
              <li key={i} className="text-sm text-foreground flex items-start gap-2">
                <ArrowRight className="size-4 text-primary mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-green-50 dark:bg-green-950/30 rounded-lg p-3 border border-green-200 dark:border-green-900">
          <p className="text-sm font-semibold text-green-800 dark:text-green-200">
            Result: Transaction time reduced 72% (3.2min → 0.9min)
          </p>
        </div>
      </CardContent>
    </Card>
  );
}

function Card25() {
  return (
    <div className="max-w-lg grid md:grid-cols-2 gap-4">
      <Card className="border-red-200 dark:border-red-900 bg-red-50/50 dark:bg-red-950/20">
        <CardHeader>
          <Badge variant="outline" className="w-fit border-red-300 text-red-700 dark:border-red-800 dark:text-red-300">Before</Badge>
          <CardTitle className="text-base">Manual Transaction Flow</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li className="flex items-start gap-2"><X className="size-4 text-red-500 mt-0.5 flex-shrink-0" />Calculate on calculator</li>
            <li className="flex items-start gap-2"><X className="size-4 text-red-500 mt-0.5 flex-shrink-0" />Handwrite receipt</li>
            <li className="flex items-start gap-2"><X className="size-4 text-red-500 mt-0.5 flex-shrink-0" />Manual inventory update</li>
          </ul>
          <p className="mt-3 text-sm font-medium text-red-700 dark:text-red-300">3.2 min per transaction</p>
        </CardContent>
      </Card>
      <Card className="border-green-200 dark:border-green-900 bg-green-50/50 dark:bg-green-950/20">
        <CardHeader>
          <Badge variant="outline" className="w-fit border-green-300 text-green-700 dark:border-green-800 dark:text-green-300">After</Badge>
          <CardTitle className="text-base">Automated Platform Flow</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li className="flex items-start gap-2"><Check className="size-4 text-green-500 mt-0.5 flex-shrink-0" />Tap products from menu</li>
            <li className="flex items-start gap-2"><Check className="size-4 text-green-500 mt-0.5 flex-shrink-0" />Digital receipt auto-sent</li>
            <li className="flex items-start gap-2"><Check className="size-4 text-green-500 mt-0.5 flex-shrink-0" />Inventory auto-updates</li>
          </ul>
          <p className="mt-3 text-sm font-medium text-green-700 dark:text-green-300">0.9 min per transaction</p>
        </CardContent>
      </Card>
    </div>
  );
}

// --- Dashboard Card Variants ---

function Card26() {
  return (
    <Card className="max-w-xs">
      <CardContent className="pt-6">
        <div className="flex items-center justify-between mb-4">
          <span className="flex items-center justify-center size-10 rounded-lg bg-chart-1/10 text-chart-1">
            <TicketCheck className="size-5" />
          </span>
          <p className="flex items-center gap-1 text-sm font-medium">
            +38%
            <ChevronUp className="size-4" />
          </p>
        </div>
        <div className="space-y-1">
          <span className="text-2xl font-bold">$13.4k</span>
          <p className="text-sm text-muted-foreground">Total Sales</p>
        </div>
        <Badge variant="outline" className="mt-4 rounded-full px-2 py-0.5 text-xs font-medium">
          Last 6 months
        </Badge>
      </CardContent>
    </Card>
  );
}

function Card27() {
  return (
    <Card className="max-w-md">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-base">Total Income</CardTitle>
            <CardDescription>Weekly report overview</CardDescription>
          </div>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex">
          <div className="flex flex-col justify-between text-[10px] text-muted-foreground pr-2 h-32">
            {["$6k", "$5k", "$4k", "$3k", "$2k", "$1k"].map((label) => (
              <span key={label}>{label}</span>
            ))}
          </div>
          <div className="flex-1 relative h-32">
            <div className="absolute inset-0 flex flex-col justify-between pointer-events-none">
              {[0, 1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="border-t border-dashed border-muted-foreground/30" />
              ))}
            </div>
            <svg viewBox="0 0 200 100" className="w-full h-full relative z-10" preserveAspectRatio="none">
              <defs>
                <linearGradient id="areaGradient26" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" className="text-chart-1" stopColor="currentColor" stopOpacity="0.4" />
                  <stop offset="100%" className="text-chart-1" stopColor="currentColor" stopOpacity="0.05" />
                </linearGradient>
              </defs>
              <path d="M0 60 L15 60 L25 65 L40 20 L70 20 L100 20 L120 30 L150 40 L170 40 L185 15 L200 0 L200 100 L0 100 Z" fill="url(#areaGradient26)" />
              <path d="M0 60 L15 60 L25 65 L40 20 L70 20 L100 20 L120 30 L150 40 L170 40 L185 15 L200 0" className="stroke-chart-1" strokeWidth="2" fill="none" />
            </svg>
          </div>
        </div>
        <div className="flex justify-between text-[10px] text-muted-foreground mt-2 pl-8">
          {["MO", "TU", "WE", "TH", "FR", "SA", "SU"].map((day) => (
            <span key={day}>{day}</span>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

function Card28() {
  return (
    <Card className="max-w-xs">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-base">Report</CardTitle>
            <CardDescription>Weekly activity</CardDescription>
          </div>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        {[
          { label: "Income", value: "$5,550", change: "+2.34K", icon: CreditCard, color: "text-chart-2 bg-chart-2/10" },
          { label: "Expense", value: "$3,520", change: "-1.4K", icon: CreditCard, color: "text-chart-1 bg-chart-1/10" },
          { label: "Profit", value: "$2,350", change: "+3.22K", icon: CircleDollarSign, color: "text-chart-4 bg-chart-4/10" },
        ].map((item) => (
          <div key={item.label} className="flex items-center gap-3 p-3 bg-muted/50 rounded-xl">
            <div className={cn("w-10 h-10 rounded-full flex items-center justify-center", item.color)}>
              <item.icon className="w-5 h-5" />
            </div>
            <div className="flex-1">
              <div className="text-sm text-muted-foreground">{item.label}</div>
              <div className="font-semibold">{item.value}</div>
            </div>
            <div className={cn("text-sm font-medium", item.change.startsWith("+") ? "text-chart-2" : "text-muted-foreground")}>
              {item.change}
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

function Card29() {
  return (
    <Card className="max-w-sm">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-base">Monthly campaign state</CardTitle>
            <CardDescription>7.58k Social Visitors</CardDescription>
          </div>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-1">
        {[
          { label: "Emails", value: "14,250", change: "0.3%", icon: Mail, color: "text-chart-3 bg-chart-3/15" },
          { label: "Opened", value: "4,523", change: "3.1%", icon: MailOpen, color: "text-chart-2 bg-chart-2/15" },
          { label: "Clicked", value: "1,250", change: "1.3%", icon: MousePointerClick, color: "text-chart-3 bg-chart-3/15" },
          { label: "Subscribed", value: "750", change: "9.8%", icon: BellRing, color: "text-chart-1 bg-chart-1/15" },
          { label: "Errors", value: "20", change: "1.5%", icon: TriangleAlert, color: "text-chart-4 bg-chart-4/15" },
          { label: "Unsubscribed", value: "86", change: "0.6%", icon: CircleOff, color: "text-muted-foreground bg-muted" },
        ].map((stat) => (
          <div key={stat.label} className="flex items-center justify-between py-2">
            <div className="flex items-center gap-3">
              <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center", stat.color)}>
                <stat.icon className="w-4 h-4" />
              </div>
              <span className="text-sm font-medium">{stat.label}</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="font-semibold">{stat.value}</span>
              <span className="text-xs text-muted-foreground w-10 text-right">{stat.change}</span>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

function Card30() {
  return (
    <Card className="max-w-xs">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base">Total earning</CardTitle>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-baseline gap-2 mb-3">
          <span className="text-3xl font-bold">87%</span>
          <span className="text-sm flex items-center text-chart-2">
            <TrendingUp className="w-3 h-3 mr-1" />+38%
          </span>
        </div>
        <div className="flex items-end gap-2 h-24 mb-3">
          {[45, 70, 55, 85, 60, 75, 50, 90, 65].map((h, i) => (
            <div
              key={i}
              className="flex-1 rounded-full bg-chart-1"
              style={{ height: `${h}%` }}
            />
          ))}
        </div>
        <Separator className="my-3" />
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
              <CircleDollarSign className="w-4 h-4 text-muted-foreground" />
            </div>
            <div className="flex-1">
              <div className="text-sm font-medium">Total revenue</div>
              <div className="text-xs text-muted-foreground">Successful payments</div>
            </div>
            <span className="text-sm font-semibold">+$250</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
              <ShoppingCart className="w-4 h-4 text-muted-foreground" />
            </div>
            <div className="flex-1">
              <div className="text-sm font-medium">Total sales</div>
              <div className="text-xs text-muted-foreground">Refund</div>
            </div>
            <span className="text-sm font-semibold">+$80</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function Card31() {
  return (
    <Card className="max-w-sm">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base">For Business Shark</CardTitle>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground mb-4">
          Here, I focus on a range of items and features that we use in life without them
        </p>
        <div className="text-sm font-semibold mb-3">Choose a plan to get started</div>
        <div className="space-y-2 mb-4">
          {[
            { name: "Branding", price: "$60", selected: false },
            { name: "Marketing", price: "$120", selected: true },
            { name: "Web Development", price: "$250", selected: false },
            { name: "App Development", price: "$320", selected: false },
          ].map((plan) => (
            <div
              key={plan.name}
              className={cn(
                "flex items-center justify-between p-3 rounded-xl border cursor-pointer transition-colors",
                plan.selected ? "border-primary bg-primary/5" : "hover:bg-muted"
              )}
            >
              <div className="flex items-center gap-3">
                <div className={cn(
                  "w-5 h-5 rounded border-2 flex items-center justify-center",
                  plan.selected ? "border-primary bg-primary" : "border-muted-foreground"
                )}>
                  {plan.selected && <Check className="w-3 h-3 text-primary-foreground" />}
                </div>
                <span className="text-sm">{plan.name}</span>
              </div>
              <Badge variant={plan.selected ? "default" : "outline"} className={cn("text-xs", !plan.selected && "text-primary border-primary/30")}>
                {plan.price}
              </Badge>
            </div>
          ))}
        </div>
        <div className="flex justify-between text-sm mb-2">
          <span className="text-muted-foreground">Taxes</span>
          <span>$32</span>
        </div>
        <div className="flex justify-between text-sm font-semibold mb-4">
          <span>Total amount</span>
          <span>$152</span>
        </div>
        <Button className="w-full rounded-xl">Pay now</Button>
      </CardContent>
    </Card>
  );
}

function Card32() {
  return (
    <Card className="max-w-sm">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base">Vehicles Condition</CardTitle>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-1">
        {[
          { label: "Excellent", value: "55%", sub: "12% increase", change: "+25%" },
          { label: "Good", value: "20%", sub: "24 vehicles", change: "+30%" },
          { label: "Average", value: "12%", sub: "182 Tasks", change: "-15%" },
          { label: "Bad", value: "7%", sub: "9 vehicles", change: "+35%" },
          { label: "Not Working", value: "4%", sub: "3 vehicles", change: "-2%" },
          { label: "Scraped", value: "2%", sub: "2 vehicles", change: "+1%" },
        ].map((item) => (
          <div key={item.label} className="flex items-center gap-3">
            <div className="relative w-12 h-12">
              <svg viewBox="0 0 36 36" className="w-12 h-12 -rotate-90">
                <circle cx="18" cy="18" r="14" fill="none" className="stroke-muted" strokeWidth="3" />
                <circle
                  cx="18"
                  cy="18"
                  r="14"
                  fill="none"
                  className="stroke-chart-1"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeDasharray={`${parseFloat(item.value) * 0.88} 88`}
                />
              </svg>
              <span className="absolute inset-0 flex items-center justify-center text-[10px] font-medium">
                {item.value}
              </span>
            </div>
            <div className="flex-1">
              <div className="text-sm font-medium">{item.label}</div>
              <div className="text-xs text-muted-foreground">{item.sub}</div>
            </div>
            <span className={cn(
              "text-xs font-medium",
              item.change.startsWith("+") ? "text-primary" : "text-destructive"
            )}>
              {item.change}
            </span>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

// --- Code strings ---
const codes: Record<string, string> = {
  "card-01": `
export default function Card01() {
  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Login to your account</CardTitle>
        <CardDescription>Enter your email below to login to your account</CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input type="email" id="email" placeholder="m@example.com" />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                <a href="#" className="ml-auto inline-block text-sm underline-offset-4 hover:underline">Forgot your password?</a>
              </div>
              <Input type="password" id="password" />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex-col gap-2">
        <Button className="w-full">Login</Button>
        <Button variant="outline" className="w-full">Login with Google</Button>
      </CardFooter>
    </Card>
  )
}`,
  "card-04": `
export default function Card04() {
  return (
    <Card className="max-w-md pb-0">
      <CardHeader>
        <CardTitle>Fluid Gradient Flow</CardTitle>
        <CardDescription>A vibrant and abstract background with smooth gradient curves.</CardDescription>
      </CardHeader>
      <CardContent className="px-0">
        <img src="https://cdn.shadcnstudio.com/ss-assets/components/card/image-1.png?height=280&format=auto" alt="Banner" className="aspect-video h-70 rounded-b-xl object-cover" />
      </CardContent>
    </Card>
  )
}`,
  "card-08": `
export default function Card08() {
  return (
    <Card className="bg-primary/20 max-w-md gap-0">
      <CardHeader>
        <CardTitle>Design Throwdown</CardTitle>
      </CardHeader>
      <CardContent>
        Where passion, pressure, and pixels collide -- push your creativity to the edge and show what you are made of.
      </CardContent>
    </Card>
  )
}`,
  "card-13": `import { Star } from "lucide-react"

export default function Card13() {
  return (
    <Card className="max-w-md border-none">
      <CardContent>
        <p>Incredible time-saver! shadcn/studio has made UI development a breeze.</p>
      </CardContent>
      <CardFooter className="justify-between gap-3">
        <div className="flex items-center gap-3">
          <Avatar className="size-8 ring-ring ring-2">
            <AvatarImage src="https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-5.png" alt="Sam Green" />
          </Avatar>
          <div className="flex flex-col gap-0.5">
            <CardTitle className="text-sm">Sam Green</CardTitle>
            <CardDescription>@SamG11</CardDescription>
          </div>
        </div>
        <div className="flex items-center gap-1">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="size-5 fill-amber-500 stroke-amber-500" />
          ))}
        </div>
      </CardFooter>
    </Card>
  )
}`,
  "card-14": `import { X } from "lucide-react"

export default function Card14() {
  return (
    <Card className="relative max-w-lg shadow-none">
      <Button variant="ghost" size="icon" className="absolute top-2 right-2 rounded-full">
        <X />
        <span className="sr-only">Close</span>
      </Button>
      <CardHeader>
        <CardTitle className="text-center">Have a project in mind</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4 text-center">
        <p>Let's discuss! Our Assistant team is excited to hear about your projects, ideas and questions.</p>
        <Button>Contact Our Team</Button>
      </CardContent>
    </Card>
  )
}`,
  "card-17": `
export default function Card17() {
  return (
    <Card className="max-w-md">
      <CardHeader>
        <CardTitle>Dynamic 3D Hover Card</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6 text-sm">
        <img src="https://cdn.shadcnstudio.com/ss-assets/components/card/image-10.png?width=350&format=auto" alt="Banner" className="aspect-video w-full rounded-md object-cover" />
        <p>Experience interactive depth and motion with this sleek 3D hover effect.</p>
      </CardContent>
    </Card>
  )
}`,
  "card-26": `import { TicketCheck, ChevronUp } from "lucide-react"

export default function Card26() {
  return (
    <Card className="max-w-xs">
      <CardContent className="pt-6">
        <div className="flex items-center justify-between mb-4">
          <span className="flex items-center justify-center size-10 rounded-lg bg-chart-1/10 text-chart-1">
            <TicketCheck className="size-5" />
          </span>
          <p className="flex items-center gap-1 text-sm font-medium">
            +38%
            <ChevronUp className="size-4" />
          </p>
        </div>
        <div className="space-y-1">
          <span className="text-2xl font-bold">$13.4k</span>
          <p className="text-sm text-muted-foreground">Total Sales</p>
        </div>
        <Badge variant="outline" className="mt-4 rounded-full px-2 py-0.5 text-xs font-medium">
          Last 6 months
        </Badge>
      </CardContent>
    </Card>
  )
}`,
  "card-27": `import { MoreHorizontal } from "lucide-react"

export default function Card27() {
  return (
    <Card className="max-w-md">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-base">Total Income</CardTitle>
            <CardDescription>Weekly report overview</CardDescription>
          </div>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex">
          <div className="flex flex-col justify-between text-[10px] text-muted-foreground pr-2 h-32">
            {["$6k", "$5k", "$4k", "$3k", "$2k", "$1k"].map((label) => (
              <span key={label}>{label}</span>
            ))}
          </div>
          <div className="flex-1 relative h-32">
            <svg viewBox="0 0 200 100" className="w-full h-full" preserveAspectRatio="none">
              <defs>
                <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" className="text-chart-1" stopColor="currentColor" stopOpacity="0.4" />
                  <stop offset="100%" className="text-chart-1" stopColor="currentColor" stopOpacity="0.05" />
                </linearGradient>
              </defs>
              <path d="M0 60 L40 20 L100 20 L150 40 L200 0 L200 100 L0 100 Z" fill="url(#areaGradient)" />
              <path d="M0 60 L40 20 L100 20 L150 40 L200 0" className="stroke-chart-1" strokeWidth="2" fill="none" />
            </svg>
          </div>
        </div>
        <div className="flex justify-between text-[10px] text-muted-foreground mt-2 pl-8">
          {["MO", "TU", "WE", "TH", "FR", "SA", "SU"].map((day) => (
            <span key={day}>{day}</span>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}`,
  "card-28": `import { MoreHorizontal, CreditCard, CircleDollarSign } from "lucide-react"
import { cn } from "@/lib"

export default function Card28() {
  const items = [
    { label: "Income", value: "$5,550", change: "+2.34K", icon: CreditCard, color: "text-chart-2 bg-chart-2/10" },
    { label: "Expense", value: "$3,520", change: "-1.4K", icon: CreditCard, color: "text-chart-1 bg-chart-1/10" },
    { label: "Profit", value: "$2,350", change: "+3.22K", icon: CircleDollarSign, color: "text-chart-4 bg-chart-4/10" },
  ]

  return (
    <Card className="max-w-xs">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-base">Report</CardTitle>
            <CardDescription>Weekly activity</CardDescription>
          </div>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        {items.map((item) => (
          <div key={item.label} className="flex items-center gap-3 p-3 bg-muted/50 rounded-xl">
            <div className={cn("w-10 h-10 rounded-full flex items-center justify-center", item.color)}>
              <item.icon className="w-5 h-5" />
            </div>
            <div className="flex-1">
              <div className="text-sm text-muted-foreground">{item.label}</div>
              <div className="font-semibold">{item.value}</div>
            </div>
            <div className={cn("text-sm font-medium", item.change.startsWith("+") ? "text-chart-2" : "text-muted-foreground")}>
              {item.change}
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}`,
  "card-29": `import { MoreHorizontal, Mail, MailOpen, MousePointerClick, BellRing, TriangleAlert, CircleOff } from "lucide-react"
import { cn } from "@/lib"

export default function Card29() {
  const stats = [
    { label: "Emails", value: "14,250", change: "0.3%", icon: Mail, color: "text-chart-3 bg-chart-3/15" },
    { label: "Opened", value: "4,523", change: "3.1%", icon: MailOpen, color: "text-chart-2 bg-chart-2/15" },
    { label: "Clicked", value: "1,250", change: "1.3%", icon: MousePointerClick, color: "text-chart-3 bg-chart-3/15" },
    { label: "Subscribed", value: "750", change: "9.8%", icon: BellRing, color: "text-chart-1 bg-chart-1/15" },
    { label: "Errors", value: "20", change: "1.5%", icon: TriangleAlert, color: "text-chart-4 bg-chart-4/15" },
    { label: "Unsubscribed", value: "86", change: "0.6%", icon: CircleOff, color: "text-muted-foreground bg-muted" },
  ]

  return (
    <Card className="max-w-sm">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-base">Monthly campaign state</CardTitle>
            <CardDescription>7.58k Social Visitors</CardDescription>
          </div>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-1">
        {stats.map((stat) => (
          <div key={stat.label} className="flex items-center justify-between py-2">
            <div className="flex items-center gap-3">
              <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center", stat.color)}>
                <stat.icon className="w-4 h-4" />
              </div>
              <span className="text-sm font-medium">{stat.label}</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="font-semibold">{stat.value}</span>
              <span className="text-xs text-muted-foreground w-10 text-right">{stat.change}</span>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}`,
  "card-30": `import { MoreHorizontal, TrendingUp, CircleDollarSign, ShoppingCart } from "lucide-react"

export default function Card30() {
  return (
    <Card className="max-w-xs">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base">Total earning</CardTitle>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-baseline gap-2 mb-3">
          <span className="text-3xl font-bold">87%</span>
          <span className="text-sm flex items-center text-chart-2">
            <TrendingUp className="w-3 h-3 mr-1" />+38%
          </span>
        </div>
        <div className="flex items-end gap-2 h-24 mb-3">
          {[45, 70, 55, 85, 60, 75, 50, 90, 65].map((h, i) => (
            <div key={i} className="flex-1 rounded-full bg-chart-1" style={{ height: h + "%" }} />
          ))}
        </div>
        <Separator className="my-3" />
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
              <CircleDollarSign className="w-4 h-4 text-muted-foreground" />
            </div>
            <div className="flex-1">
              <div className="text-sm font-medium">Total revenue</div>
              <div className="text-xs text-muted-foreground">Successful payments</div>
            </div>
            <span className="text-sm font-semibold">+$250</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
              <ShoppingCart className="w-4 h-4 text-muted-foreground" />
            </div>
            <div className="flex-1">
              <div className="text-sm font-medium">Total sales</div>
              <div className="text-xs text-muted-foreground">Refund</div>
            </div>
            <span className="text-sm font-semibold">+$80</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}`,
  "card-31": `import { MoreHorizontal, Check } from "lucide-react"
import { cn } from "@/lib"

export default function Card31() {
  const plans = [
    { name: "Branding", price: "$60", selected: false },
    { name: "Marketing", price: "$120", selected: true },
    { name: "Web Development", price: "$250", selected: false },
    { name: "App Development", price: "$320", selected: false },
  ]

  return (
    <Card className="max-w-sm">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base">For Business Shark</CardTitle>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground mb-4">
          Here, I focus on a range of items and features that we use in life without them
        </p>
        <div className="text-sm font-semibold mb-3">Choose a plan to get started</div>
        <div className="space-y-2 mb-4">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={cn(
                "flex items-center justify-between p-3 rounded-xl border cursor-pointer transition-colors",
                plan.selected ? "border-primary bg-primary/5" : "hover:bg-muted"
              )}
            >
              <div className="flex items-center gap-3">
                <div className={cn(
                  "w-5 h-5 rounded border-2 flex items-center justify-center",
                  plan.selected ? "border-primary bg-primary" : "border-muted-foreground"
                )}>
                  {plan.selected && <Check className="w-3 h-3 text-primary-foreground" />}
                </div>
                <span className="text-sm">{plan.name}</span>
              </div>
              <Badge variant={plan.selected ? "default" : "outline"} className={cn("text-xs", !plan.selected && "text-primary border-primary/30")}>
                {plan.price}
              </Badge>
            </div>
          ))}
        </div>
        <div className="flex justify-between text-sm mb-2">
          <span className="text-muted-foreground">Taxes</span>
          <span>$32</span>
        </div>
        <div className="flex justify-between text-sm font-semibold mb-4">
          <span>Total amount</span>
          <span>$152</span>
        </div>
        <Button className="w-full rounded-xl">Pay now</Button>
      </CardContent>
    </Card>
  )
}`,
  "card-32": `import { MoreHorizontal } from "lucide-react"
import { cn } from "@/lib"

export default function Card32() {
  const items = [
    { label: "Excellent", value: "55%", sub: "12% increase", change: "+25%" },
    { label: "Good", value: "20%", sub: "24 vehicles", change: "+30%" },
    { label: "Average", value: "12%", sub: "182 Tasks", change: "-15%" },
    { label: "Bad", value: "7%", sub: "9 vehicles", change: "+35%" },
    { label: "Not Working", value: "4%", sub: "3 vehicles", change: "-2%" },
    { label: "Scraped", value: "2%", sub: "2 vehicles", change: "+1%" },
  ]

  return (
    <Card className="max-w-sm">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base">Vehicles Condition</CardTitle>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-1">
        {items.map((item) => (
          <div key={item.label} className="flex items-center gap-3">
            <div className="relative w-12 h-12">
              <svg viewBox="0 0 36 36" className="w-12 h-12 -rotate-90">
                <circle cx="18" cy="18" r="14" fill="none" className="stroke-muted" strokeWidth="3" />
                <circle
                  cx="18" cy="18" r="14" fill="none"
                  className="stroke-chart-1"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeDasharray={parseFloat(item.value) * 0.88 + " 88"}
                />
              </svg>
              <span className="absolute inset-0 flex items-center justify-center text-[10px] font-medium">
                {item.value}
              </span>
            </div>
            <div className="flex-1">
              <div className="text-sm font-medium">{item.label}</div>
              <div className="text-xs text-muted-foreground">{item.sub}</div>
            </div>
            <span className={cn(
              "text-xs font-medium",
              item.change.startsWith("+") ? "text-primary" : "text-destructive"
            )}>
              {item.change}
            </span>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}`,
};

function getCode(id: string) {
  return codes[id] || codes["card-01"]!.replace("Card01", id.replace("card-", "Card"));
}

// --- Variants ---
const variants = [
  { id: "card-01", title: "Card 1", preview: <Card01 /> },
  { id: "card-02", title: "Card 2", preview: <Card02 /> },
  { id: "card-03", title: "Card 3", preview: <Card03 /> },
  { id: "card-04", title: "Card 4", preview: <Card04 /> },
  { id: "card-05", title: "Card 5", preview: <Card05 /> },
  { id: "card-06", title: "Card 6", preview: <Card06 /> },
  { id: "card-07", title: "Card 7", preview: <Card07 /> },
  { id: "card-08", title: "Card 8", preview: <Card08 /> },
  { id: "card-09", title: "Card 9", preview: <Card09 /> },
  { id: "card-10", title: "Card 10", preview: <Card10 /> },
  { id: "card-11", title: "Card 11", preview: <Card11 /> },
  { id: "card-12", title: "Card 12", preview: <Card12 /> },
  { id: "card-13", title: "Card 13", preview: <Card13 /> },
  { id: "card-14", title: "Card 14", preview: <Card14 /> },
  { id: "card-15", title: "Card 15", preview: <Card15 />, fullWidth: true },
  { id: "card-16", title: "Card 16", preview: <Card16 /> },
  { id: "card-17", title: "Card 17", preview: <Card17 /> },
  { id: "card-18", title: "Card 18 - Stats Grid", preview: <Card18 /> },
  { id: "card-19", title: "Card 19 - Metric", preview: <Card19 /> },
  { id: "card-20", title: "Card 20 - Quote", preview: <Card20 /> },
  { id: "card-21", title: "Card 21 - Timeline", preview: <Card21 /> },
  { id: "card-22", title: "Card 22 - Framework", preview: <Card22 /> },
  { id: "card-23", title: "Card 23 - Impact", preview: <Card23 /> },
  { id: "card-24", title: "Card 24 - Workflow", preview: <Card24 /> },
  { id: "card-25", title: "Card 25 - Before/After", preview: <Card25 />, fullWidth: true },
  { id: "card-26", title: "Card 26 - Stat Card", preview: <Card26 /> },
  { id: "card-27", title: "Card 27 - Area Chart", preview: <Card27 /> },
  { id: "card-28", title: "Card 28 - Report List", preview: <Card28 /> },
  { id: "card-29", title: "Card 29 - Campaign Stats", preview: <Card29 /> },
  { id: "card-30", title: "Card 30 - Bar Chart Earnings", preview: <Card30 /> },
  { id: "card-31", title: "Card 31 - Pricing Plan", preview: <Card31 /> },
  { id: "card-32", title: "Card 32 - Progress Indicators", preview: <Card32 /> },
];

export default function CardPage() {
  return (
    <ComponentLayout>
      {/* Page Header */}
      <div className="mb-4 flex gap-x-8 gap-y-4 max-md:flex-col">
        <div className="space-y-3">
          <h1 className="text-2xl font-bold sm:text-3xl">Shadcn Card</h1>
          <p className="text-muted-foreground">
            Explore the collection of awesome Shadcn Card Components, featuring {variants.length} card
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
          <p className="font-medium">Have any suggestions for Card variants?</p>
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
            fullWidth={'fullWidth' in variant && variant.fullWidth}
          >
            {variant.preview}
          </VariantCell>
        ))}
      </div>
    </ComponentLayout>
  );
}
