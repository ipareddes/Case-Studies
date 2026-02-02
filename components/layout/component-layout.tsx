"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { TopBanner } from "./top-banner";
import { SiteNavigation } from "./site-navigation";
import { X, ChevronRight } from "lucide-react";
import { useState } from "react";
import ReactDOM from "react-dom";

// Top-level icon links
const topLinks = [
  {
    name: "Components",
    href: "/components",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="3" y="14" width="7" height="7" /><rect x="14" y="14" width="7" height="7" />
      </svg>
    ),
  },
  {
    name: "Theme Generator",
    href: "/theme-generator",
    badge: "Hot",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="3" /><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
      </svg>
    ),
  },
  {
    name: "Blocks",
    href: "/blocks",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="8" rx="2" /><rect x="2" y="14" width="20" height="8" rx="2" />
      </svg>
    ),
  },
  {
    name: "Templates",
    href: "/templates",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2" /><path d="M3 9h18" /><path d="M9 21V9" />
      </svg>
    ),
  },
  {
    name: "Figma UI Kit",
    href: "/figma-ui-kit",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M5 5.5A3.5 3.5 0 0 1 8.5 2H12v7H8.5A3.5 3.5 0 0 1 5 5.5z" /><path d="M12 2h3.5a3.5 3.5 0 1 1 0 7H12V2z" /><path d="M12 12.5a3.5 3.5 0 1 1 7 0 3.5 3.5 0 1 1-7 0z" /><path d="M5 19.5A3.5 3.5 0 0 1 8.5 16H12v3.5a3.5 3.5 0 1 1-7 0z" /><path d="M5 12.5A3.5 3.5 0 0 1 8.5 9H12v7H8.5A3.5 3.5 0 0 1 5 12.5z" />
      </svg>
    ),
  },
  {
    name: "shadcn/studio MCP",
    href: "/mcp",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2L2 7l10 5 10-5-10-5z" /><path d="M2 17l10 5 10-5" /><path d="M2 12l10 5 10-5" />
      </svg>
    ),
  },
  {
    name: "Figma to Code (Figma Plugin)",
    href: "/figma-to-code",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M5 5.5A3.5 3.5 0 0 1 8.5 2H12v7H8.5A3.5 3.5 0 0 1 5 5.5z" /><path d="M12 2h3.5a3.5 3.5 0 1 1 0 7H12V2z" /><path d="M5 19.5A3.5 3.5 0 0 1 8.5 16H12v3.5a3.5 3.5 0 1 1-7 0z" />
      </svg>
    ),
  },
  {
    name: "IDE Extension",
    href: "/ide-extension",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2" /><path d="M8 21h8" /><path d="M12 17v4" />
      </svg>
    ),
  },
];

// Collapsible sections
const gettingStartedItems = [
  { name: "Introduction", href: "/docs/introduction" },
  { name: "Installation", href: "/docs/installation" },
  { name: "Theming", href: "/docs/theming" },
  { name: "CLI", href: "/docs/cli" },
];

const animatedComponentItems = [
  { name: "Animated Accordion", href: "/components/animated-accordion" },
  { name: "Animated Tabs", href: "/components/animated-tabs" },
  { name: "Animated Card", href: "/components/animated-card" },
];

const components = [
  { id: "accordion", name: "Accordion", href: "/components/accordion" },
  { id: "alert", name: "Alert", href: "/components/alert" },
  { id: "avatar", name: "Avatar", href: "/components/avatar" },
  { id: "badge", name: "Badge", href: "/components/badge" },
  { id: "breadcrumb", name: "Breadcrumb", href: "/components/breadcrumb" },
  { id: "button", name: "Button", href: "/components/button", badge: "+8 New" },
  { id: "button-group", name: "Button Group", href: "/components/button-group" },
  { id: "calendar", name: "Calendar", href: "/components/calendar" },
  { id: "card", name: "Card", href: "/components/card" },
  { id: "checkbox", name: "Checkbox", href: "/components/checkbox" },
  { id: "collapsible", name: "Collapsible", href: "/components/collapsible" },
  { id: "combobox", name: "Combobox", href: "/components/combobox" },
  { id: "data-table", name: "Data Table", href: "/components/data-table" },
  { id: "date-picker", name: "Date and Time Picker", href: "/components/date-picker" },
  { id: "dialog", name: "Dialog", href: "/components/dialog" },
  { id: "dropdown-menu", name: "Dropdown Menu", href: "/components/dropdown-menu" },
  { id: "form", name: "Form", href: "/components/form" },
  { id: "input", name: "Input", href: "/components/input" },
  { id: "input-mask", name: "Input Mask", href: "/components/input-mask" },
  { id: "input-otp", name: "Input OTP", href: "/components/input-otp" },
  { id: "pagination", name: "Pagination", href: "/components/pagination" },
  { id: "popover", name: "Popover", href: "/components/popover" },
  { id: "radio-group", name: "Radio Group", href: "/components/radio-group" },
  { id: "select", name: "Select", href: "/components/select" },
  { id: "sheet", name: "Sheet", href: "/components/sheet" },
  { id: "sonner", name: "Sonner", href: "/components/sonner" },
  { id: "switch", name: "Switch", href: "/components/switch" },
  { id: "table", name: "Table", href: "/components/table" },
  { id: "tabs", name: "Tabs", href: "/components/tabs" },
  { id: "textarea", name: "Textarea", href: "/components/textarea" },
  { id: "tooltip", name: "Tooltip", href: "/components/tooltip" },
];

interface CollapsibleSectionProps {
  title: string;
  items: { name: string; href: string; badge?: string }[];
  defaultOpen?: boolean;
  pathname: string;
  onNavigate?: () => void;
}

function CollapsibleSection({ title, items, defaultOpen = false, pathname, onNavigate }: CollapsibleSectionProps) {
  const hasActiveChild = items.some((item) => pathname === item.href);
  const [isOpen, setIsOpen] = useState(defaultOpen || hasActiveChild);

  return (
    <div>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between py-2 text-sm font-medium transition-colors hover:text-foreground text-foreground"
      >
        {title}
        <ChevronRight
          className={`h-4 w-4 text-muted-foreground transition-transform ${isOpen ? "rotate-90" : ""}`}
        />
      </button>
      {isOpen && (
        <ul className="relative ml-1 border-l border-border pl-3 space-y-0.5 pb-2">
          {items.map((item) => {
            const isActive = pathname === item.href;
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={onNavigate}
                  className={`
                    flex items-center gap-2 rounded-md px-2 py-1.5 text-sm transition-colors
                    ${
                      isActive
                        ? "text-foreground font-medium"
                        : "text-muted-foreground hover:text-foreground"
                    }
                  `}
                >
                  {isActive && (
                    <span className="absolute left-0 w-[2px] h-5 bg-foreground -translate-x-[0.5px] rounded-full" />
                  )}
                  {item.name}
                  {item.badge && (
                    <span className="text-[10px] font-medium text-emerald-600 dark:text-emerald-400">
                      {item.badge}
                    </span>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

interface ComponentLayoutProps {
  children: React.ReactNode;
}

export function ComponentLayout({ children }: ComponentLayoutProps) {
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const closeSidebar = () => setIsSidebarOpen(false);

  return (
    <>
      <TopBanner />
      <SiteNavigation onMenuClick={() => setIsSidebarOpen(true)} />

      <div className="mx-auto w-full max-w-[1400px] flex min-h-[calc(100vh-128px)] border-x border-dashed">
        {/* Sidebar */}
        <aside
          className={`
            fixed inset-y-0 left-0 z-[80] w-72 shrink-0 transform border-r border-dashed bg-background transition-transform duration-300 lg:relative lg:z-auto lg:w-64 lg:sticky lg:top-[128px] lg:h-[calc(100vh-128px)] lg:translate-x-0
            ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
          `}
        >
          <div className="flex h-full flex-col">
            {/* Sidebar Header (mobile) */}
            <div className="flex items-center justify-between border-b border-dashed px-4 py-3 lg:hidden">
              <div className="flex items-center gap-2.5">
                <svg width="28" height="28" viewBox="0 0 328 329" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect y="0.5" width="328" height="328" rx="164" fill="black" className="dark:fill-white" />
                  <path d="M165.018 72.3008V132.771C165.018 152.653 148.9 168.771 129.018 168.771H70.2288" stroke="white" strokeWidth="24" strokeLinecap="round" className="dark:stroke-black" />
                  <path d="M163 256.699V196.229C163 176.347 179.118 160.229 199 160.229H257.789" stroke="white" strokeWidth="24" strokeLinecap="round" className="dark:stroke-black" />
                </svg>
                <span className="text-base font-semibold">shadcn/studio</span>
              </div>
              <button
                onClick={closeSidebar}
                className="rounded-md p-1 hover:bg-muted"
                aria-label="Close sidebar"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Sidebar Navigation */}
            <nav className="flex-1 overflow-y-auto px-4 py-4 scrollbar-thin">
              {/* Top icon links */}
              <ul className="space-y-0.5">
                {topLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      onClick={closeSidebar}
                      className="flex items-center gap-3 rounded-md px-2 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground hover:bg-muted"
                    >
                      <span className="shrink-0">{link.icon}</span>
                      <span>{link.name}</span>
                      {link.badge && (
                        <span className="ml-auto inline-flex items-center gap-1 text-[10px] font-semibold text-rose-500">
                          <span className="inline-block h-1.5 w-1.5 rounded-full bg-rose-500" />
                          {link.badge}
                        </span>
                      )}
                    </Link>
                  </li>
                ))}
              </ul>

              {/* Divider */}
              <div className="my-4" />

              {/* Getting Started */}
              <CollapsibleSection
                title="Getting Started"
                items={gettingStartedItems}
                pathname={pathname}
                onNavigate={closeSidebar}
              />

              {/* Divider */}
              <div className="my-2" />

              {/* Animated Components */}
              <CollapsibleSection
                title="Animated Components"
                items={animatedComponentItems}
                pathname={pathname}
                onNavigate={closeSidebar}
              />

              {/* Divider */}
              <div className="my-2" />

              {/* Components */}
              <CollapsibleSection
                title="Components"
                items={components}
                defaultOpen
                pathname={pathname}
                onNavigate={closeSidebar}
              />
            </nav>
          </div>
        </aside>

        {/* Main Content */}
        <main className="min-w-0 flex-1">
          <div className="p-4 sm:p-6 lg:p-8">
            {children}
          </div>
        </main>
      </div>

      {/* Mobile Sidebar Overlay - rendered via portal to escape stacking contexts */}
      {isSidebarOpen && typeof document !== "undefined" &&
        ReactDOM.createPortal(
          <div
            className="fixed inset-0 z-[79] bg-black/50 lg:hidden"
            onClick={closeSidebar}
          />,
          document.body
        )
      }
    </>
  );
}
