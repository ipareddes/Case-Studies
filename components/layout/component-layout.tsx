"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { TopBanner } from "./top-banner";
import { SiteNavigation } from "./site-navigation";
import { Menu, X } from "lucide-react";
import { useState } from "react";

interface ComponentLink {
  id: string;
  name: string;
  href: string;
}

const components: ComponentLink[] = [
  { id: "accordion", name: "Accordion", href: "/components/accordion" },
  { id: "alert", name: "Alert", href: "/components/alert" },
  { id: "avatar", name: "Avatar", href: "/components/avatar" },
  { id: "badge", name: "Badge", href: "/components/badge" },
  { id: "breadcrumb", name: "Breadcrumb", href: "/components/breadcrumb" },
  { id: "button", name: "Button", href: "/components/button" },
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

interface ComponentLayoutProps {
  children: React.ReactNode;
}

export function ComponentLayout({ children }: ComponentLayoutProps) {
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <>
      <TopBanner />
      <SiteNavigation />

      <div className="flex min-h-[calc(100vh-128px)] w-full">
        {/* Sidebar */}
        <aside
          className={`
            fixed inset-y-0 left-0 z-40 w-64 transform border-r border-dashed bg-background pt-[128px] transition-transform duration-300 lg:sticky lg:top-[128px] lg:h-[calc(100vh-128px)] lg:translate-x-0
            ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
          `}
        >
          <div className="flex h-full flex-col">
            {/* Sidebar Header */}
            <div className="flex items-center justify-between border-b border-dashed p-4 lg:hidden">
              <h2 className="text-lg font-semibold">Components</h2>
              <button
                onClick={() => setIsSidebarOpen(false)}
                className="rounded-md p-1 hover:bg-muted"
                aria-label="Close sidebar"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Sidebar Navigation */}
            <nav className="flex-1 overflow-y-auto p-4">
              <div className="mb-4">
                <h3 className="mb-2 px-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Components
                </h3>
                <ul className="space-y-1">
                  {components.map((component) => {
                    const isActive = pathname === component.href;
                    return (
                      <li key={component.id}>
                        <Link
                          href={component.href}
                          onClick={() => setIsSidebarOpen(false)}
                          className={`
                            block rounded-md px-3 py-2 text-sm transition-colors
                            ${
                              isActive
                                ? "bg-primary/10 text-primary font-medium"
                                : "text-muted-foreground hover:bg-muted hover:text-foreground"
                            }
                          `}
                        >
                          {component.name}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </nav>
          </div>
        </aside>

        {/* Mobile Sidebar Overlay */}
        {isSidebarOpen && (
          <div
            className="fixed inset-0 z-30 bg-background/80 backdrop-blur-sm lg:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        {/* Main Content */}
        <main className="flex min-w-0 flex-1 flex-col">
          {/* Mobile Menu Button */}
          <div className="sticky top-[128px] z-20 flex items-center gap-2 border-b border-dashed bg-background/95 p-4 backdrop-blur-sm lg:hidden">
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="rounded-md border p-2 hover:bg-muted"
              aria-label="Open sidebar"
            >
              <Menu className="h-5 w-5" />
            </button>
            <span className="text-sm font-medium text-muted-foreground">
              Components Menu
            </span>
          </div>

          {/* Scrollable Content */}
          <div className="flex-1 overflow-y-auto">
            <div className="mx-auto max-w-4xl p-4 sm:p-6 lg:p-8">
              {children}
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
