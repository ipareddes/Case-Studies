"use client";

import { useState, useCallback } from "react";
import { CodeBlock } from "./code-block";
import {
  Eye,
  Code,
  Sparkles,
  Download,
  MoonStar,
  Palette,
  Monitor,
  Tablet,
  Smartphone,
  ExternalLink,
  Terminal,
  Check,
  Copy,
  ChevronDown,
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type ViewMode = "preview" | "code";
type DeviceSize = "desktop" | "tablet" | "mobile";

interface BlockPreviewProps {
  preview: React.ReactNode;
  code: string;
  filename?: string;
  installCommand?: string;
}

export function BlockPreview({
  preview,
  code,
  filename,
  installCommand,
}: BlockPreviewProps) {
  const [activeTab, setActiveTab] = useState<ViewMode>("preview");
  const [deviceSize, setDeviceSize] = useState<DeviceSize>("desktop");
  const [promptCopied, setPromptCopied] = useState(false);
  const [showInstallDropdown, setShowInstallDropdown] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  const componentName = filename?.replace(".tsx", "") || "component";
  const defaultInstallCommand = installCommand || `npx shadcn add ${componentName}`;

  const handleCopyPrompt = useCallback(async () => {
    await navigator.clipboard.writeText(code);
    setPromptCopied(true);
    setTimeout(() => setPromptCopied(false), 2000);
  }, [code]);

  const handleCopyInstall = useCallback(async () => {
    await navigator.clipboard.writeText(defaultInstallCommand);
  }, [defaultInstallCommand]);

  const deviceWidths: Record<DeviceSize, string> = {
    desktop: "100%",
    tablet: "768px",
    mobile: "375px",
  };

  // Shared button base classes matching the reference
  const iconBtnClass =
    "inline-flex shrink-0 items-center justify-center gap-2 rounded-md text-sm font-medium whitespace-nowrap transition-all outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 bg-background hover:bg-accent hover:text-accent-foreground border shadow-xs size-9";

  return (
    <TooltipProvider delayDuration={200}>
      <div className="flex flex-col overflow-hidden rounded-lg border">
        {/* Toolbar */}
        <div className="flex items-center justify-between gap-2 overflow-x-auto border-b px-3 py-3 scrollbar-thin sm:gap-3 sm:px-4 lg:px-5 lg:py-4">
          {/* Left group: Tabs + Copy Prompt + Download */}
          <div className="flex shrink-0 items-center gap-2">
            {/* Preview / Code tabs */}
            <div
              role="tablist"
              className="bg-muted text-muted-foreground inline-flex h-9 w-fit items-center justify-center rounded-lg p-[3px]"
            >
              {/* Preview tab - desktop shows text, mobile icon only */}
              <button
                role="tab"
                aria-selected={activeTab === "preview"}
                data-state={activeTab === "preview" ? "active" : "inactive"}
                onClick={() => setActiveTab("preview")}
                className="data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm text-muted-foreground h-[calc(100%-1px)] inline-flex flex-1 items-center justify-center gap-1.5 rounded-md border border-transparent px-2 py-1 text-sm font-medium whitespace-nowrap transition-[color,box-shadow] [&_svg]:pointer-events-none [&_svg]:shrink-0"
              >
                <Eye className="size-4 shrink-0" />
                <span className="hidden md:inline">Preview</span>
              </button>

              {/* Code tab */}
              <button
                role="tab"
                aria-selected={activeTab === "code"}
                data-state={activeTab === "code" ? "active" : "inactive"}
                onClick={() => setActiveTab("code")}
                className="data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm text-muted-foreground h-[calc(100%-1px)] inline-flex flex-1 items-center justify-center gap-1.5 rounded-md border border-transparent px-2 py-1 text-sm font-medium whitespace-nowrap transition-[color,box-shadow] [&_svg]:pointer-events-none [&_svg]:shrink-0"
              >
                <Code className="size-4 shrink-0" />
                <span className="hidden md:inline">Code</span>
              </button>
            </div>

            {/* Copy Prompt - text on xl, icon only on sm-xl */}
            <button
              onClick={handleCopyPrompt}
              className={`${iconBtnClass} h-9 px-4 py-2 has-[>svg]:px-3 hidden 2xl:inline-flex`}
            >
              {promptCopied ? (
                <Check className="size-4" />
              ) : (
                <Sparkles className="size-4" />
              )}
              {promptCopied ? "Copied!" : "Copy Prompt"}
            </button>
            <button
              onClick={handleCopyPrompt}
              className={`${iconBtnClass} hidden sm:inline-flex 2xl:hidden`}
            >
              {promptCopied ? (
                <Check className="size-4" />
              ) : (
                <Sparkles className="size-4" />
              )}
              <span className="sr-only">Copy Prompt</span>
            </button>

            {/* Download */}
            <button className={`${iconBtnClass} hidden sm:inline-flex`}>
              <Download className="size-4" />
              <span className="sr-only">Download</span>
            </button>
          </div>

          {/* Center group: Dark mode + Palette */}
          <div className="hidden items-center gap-2 xl:flex">
            <Tooltip>
              <TooltipTrigger asChild>
                <button className={`${iconBtnClass} cursor-pointer`}>
                  <MoonStar className="size-4" />
                  <span className="sr-only">Toggle Theme</span>
                </button>
              </TooltipTrigger>
              <TooltipContent side="bottom">Toggle Theme</TooltipContent>
            </Tooltip>

            <div className="hidden items-center sm:inline-flex">
              <Tooltip>
                <TooltipTrigger asChild>
                  <button className={`${iconBtnClass} rounded-r-none`}>
                    <Palette className="size-4" />
                    <span className="sr-only">Theme Generator</span>
                  </button>
                </TooltipTrigger>
                <TooltipContent side="bottom">Theme Generator</TooltipContent>
              </Tooltip>
              <button className={`${iconBtnClass} rounded-l-none border-l-0`}>
                <ChevronDown className="size-4" />
              </button>
            </div>
          </div>

          {/* Right group: Device sizes + CLI command + v0 */}
          <div className="flex items-center gap-2">
            {/* Device toggle group */}
            <div className="flex items-center">
              <div className="flex items-center">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button
                      onClick={() => setDeviceSize("desktop")}
                      data-state={deviceSize === "desktop" ? "on" : "off"}
                      className={`${iconBtnClass} rounded-none rounded-l-md shadow-none px-2 data-[state=on]:bg-accent data-[state=on]:text-accent-foreground`}
                    >
                      <Monitor className="size-4" />
                      <span className="sr-only">Desktop</span>
                    </button>
                  </TooltipTrigger>
                  <TooltipContent side="bottom">Desktop</TooltipContent>
                </Tooltip>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button
                      onClick={() => setDeviceSize("tablet")}
                      data-state={deviceSize === "tablet" ? "on" : "off"}
                      className={`${iconBtnClass} rounded-none shadow-none border-l-0 px-2 data-[state=on]:bg-accent data-[state=on]:text-accent-foreground`}
                    >
                      <Tablet className="size-4" />
                      <span className="sr-only">Tablet</span>
                    </button>
                  </TooltipTrigger>
                  <TooltipContent side="bottom">Tablet</TooltipContent>
                </Tooltip>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button
                      onClick={() => setDeviceSize("mobile")}
                      data-state={deviceSize === "mobile" ? "on" : "off"}
                      className={`${iconBtnClass} rounded-none shadow-none border-l-0 px-2 data-[state=on]:bg-accent data-[state=on]:text-accent-foreground`}
                    >
                      <Smartphone className="size-4" />
                      <span className="sr-only">Mobile</span>
                    </button>
                  </TooltipTrigger>
                  <TooltipContent side="bottom">Mobile</TooltipContent>
                </Tooltip>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button className={`${iconBtnClass} rounded-none rounded-r-md shadow-none border-l-0 px-2`}>
                      <ExternalLink className="size-4" />
                      <span className="sr-only">Open in New Tab</span>
                    </button>
                  </TooltipTrigger>
                  <TooltipContent side="bottom">Open in New Tab</TooltipContent>
                </Tooltip>
              </div>
            </div>

            {/* Install command */}
            <div className="hidden items-center sm:inline-flex">
              <button
                onClick={handleCopyInstall}
                className={`${iconBtnClass} h-9 px-4 py-2 has-[>svg]:px-3 hidden rounded-r-none focus-visible:z-10 2xl:inline-flex`}
              >
                <Terminal className="size-4" />
                <span>{defaultInstallCommand}</span>
              </button>
              <button
                onClick={handleCopyInstall}
                className={`${iconBtnClass} hidden rounded-r-none focus-visible:z-10 sm:inline-flex 2xl:hidden`}
              >
                <Terminal className="size-4" />
                <span className="sr-only">{defaultInstallCommand}</span>
              </button>
              <div className="relative">
                <button
                  onClick={() => setShowInstallDropdown(!showInstallDropdown)}
                  className={`${iconBtnClass} rounded-l-none border-l-0`}
                >
                  <ChevronDown className="size-4" />
                </button>
                {showInstallDropdown && (
                  <>
                    <div
                      className="fixed inset-0 z-10"
                      onClick={() => setShowInstallDropdown(false)}
                    />
                    <div className="absolute right-0 top-full z-20 mt-1 w-72 rounded-md border bg-popover p-1 shadow-md">
                      {[
                        { label: "pnpm", cmd: `pnpm dlx shadcn add ${componentName}` },
                        { label: "npm", cmd: `npx shadcn add ${componentName}` },
                        { label: "yarn", cmd: `npx shadcn add ${componentName}` },
                        { label: "bun", cmd: `bunx shadcn add ${componentName}` },
                      ].map((item) => (
                        <button
                          key={item.label}
                          onClick={async () => {
                            await navigator.clipboard.writeText(item.cmd);
                            setShowInstallDropdown(false);
                          }}
                          className="flex w-full items-center gap-2 rounded-sm px-2 py-1.5 text-xs font-mono text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                        >
                          <Copy className="h-3 w-3 shrink-0" />
                          <span className="truncate">{item.cmd}</span>
                        </button>
                      ))}
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* v0 button */}
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  className={`${iconBtnClass} hidden sm:inline-flex`}
                  aria-label="Open in v0"
                >
                  <svg
                    width="1em"
                    height="1em"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clipPath="url(#v0clip)">
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M11.879 6.875H16.5665C16.6404 6.875 16.713 6.88013 16.7841 6.89004L11.8905 11.7836C11.8803 11.7114 11.875 11.6376 11.875 11.5625V6.875H10V11.5625C10 13.461 11.539 15 13.4375 15H18.125V13.125H13.4375C13.3624 13.125 13.2886 13.1198 13.2164 13.1095L18.113 8.21285C18.1235 8.28621 18.129 8.36121 18.129 8.4375V13.125H20.004V8.4375C20.004 6.53903 18.465 5 16.5665 5H11.879V6.875ZM0 6.25V6.25506L6.40656 14.4134C7.17649 15.3939 8.75132 14.8494 8.75132 13.6028V6.25H6.87633V11.9757L2.38005 6.25H0Z"
                        fill="currentColor"
                      />
                    </g>
                    <defs>
                      <clipPath id="v0clip">
                        <rect width="20" height="20" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                  <span className="sr-only">Open in v0</span>
                </button>
              </TooltipTrigger>
              <TooltipContent side="bottom">Open in v0</TooltipContent>
            </Tooltip>
          </div>
        </div>

        {/* Content area */}
        <div className="relative overflow-hidden">
          {activeTab === "preview" ? (
            <div
              className="relative overflow-hidden before:absolute before:inset-0 before:z-[-1] before:bg-[radial-gradient(circle,_hsl(var(--muted-foreground)/0.15)_1px,_transparent_1px)] before:bg-[length:16px_16px] before:opacity-40"
            >
              <div
                key={refreshKey}
                className="mx-auto transition-all duration-300 ease-in-out"
                style={{ maxWidth: deviceWidths[deviceSize] }}
              >
                <div className="w-full transition-all duration-300 ease-in-out overflow-hidden">
                  {preview}
                </div>
              </div>
            </div>
          ) : (
            <div className="p-4">
              <CodeBlock code={code} filename={filename} />
            </div>
          )}
        </div>
      </div>
    </TooltipProvider>
  );
}
