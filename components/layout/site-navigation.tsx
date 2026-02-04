"use client";

import Link from "next/link";
import { Menu, Search, Moon, Sun, LogIn, Palette } from "lucide-react";
import { GlobalSearch, useGlobalSearch } from "./global-search";
import { useTheme } from "@/components/theme-provider";
import { useThemeCustomizer } from "@/components/theme-customizer";

interface SiteNavigationProps {
  onMenuClick?: () => void;
}

export function SiteNavigation({ onMenuClick }: SiteNavigationProps) {
  const { open: searchOpen, setOpen: setSearchOpen } = useGlobalSearch();
  const { mode, resolvedMode, setMode } = useTheme();
  const themeCustomizer = useThemeCustomizer();
  const toggleThemeCustomizer = themeCustomizer?.toggle ?? (() => {});

  const navLinks = [
    { href: "/components", label: "Components" },
    { href: "/blocks", label: "Blocks" },
    { href: "/templates", label: "Templates" },
    { href: "/theme-generator", label: "Theme Generator" },
  ];

  return (
    <header className="sticky top-0 z-50 flex min-h-[64px] w-full shrink-0 items-center justify-center border-b border-dashed backdrop-blur-[8px] bg-background/60">
      <div className="mx-auto flex h-full w-full max-w-[1400px] items-center border-dashed">
        <div className="flex w-full items-center justify-between px-4 gap-4 sm:px-6 lg:px-8">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 shrink-0">
            <svg
              width="34"
              height="34"
              viewBox="0 0 328 329"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="size-8.5"
            >
              <rect
                y="0.5"
                width="328"
                height="328"
                rx="164"
                fill="black"
                className="dark:fill-white"
              />
              <path
                d="M165.018 72.3008V132.771C165.018 152.653 148.9 168.771 129.018 168.771H70.2288"
                stroke="white"
                strokeWidth="24"
                strokeLinecap="round"
                className="dark:stroke-black"
              />
              <path
                d="M163 256.699V196.229C163 176.347 179.118 160.229 199 160.229H257.789"
                stroke="white"
                strokeWidth="24"
                strokeLinecap="round"
                className="dark:stroke-black"
              />
            </svg>
            <span className="text-lg font-semibold max-[550px]:hidden">
              shadcn/studio
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right side actions */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            {/* Hamburger menu - mobile only */}
            {onMenuClick && (
              <button
                onClick={onMenuClick}
                className="lg:hidden flex h-9 w-9 items-center justify-center rounded-md border transition-colors hover:bg-muted"
                aria-label="Toggle menu"
              >
                <Menu className="h-5 w-5" />
              </button>
            )}

            {/* Search */}
            <button
              onClick={() => setSearchOpen(true)}
              className="flex h-9 w-9 items-center justify-center rounded-md border transition-colors hover:bg-muted"
              aria-label="Search"
            >
              <Search className="h-4 w-4" />
            </button>
            <GlobalSearch open={searchOpen} onOpenChange={setSearchOpen} />

            {/* Theme Generator */}
            <button
              onClick={toggleThemeCustomizer}
              className="flex h-9 w-9 items-center justify-center rounded-md border transition-colors hover:bg-muted"
              aria-label="Theme Generator"
              title="Theme Generator"
            >
              <Palette className="h-4 w-4" />
            </button>

            {/* Theme toggle */}
            <button
              onClick={() => setMode(resolvedMode === "dark" ? "light" : "dark")}
              className="flex h-9 w-9 items-center justify-center rounded-md border transition-colors hover:bg-muted"
              aria-label="Toggle theme"
            >
              {resolvedMode === "dark" ? (
                <Sun className="h-4 w-4" />
              ) : (
                <Moon className="h-4 w-4" />
              )}
            </button>

            {/* Discord */}
            <Link
              href="https://discord.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-9 w-9 items-center justify-center rounded-md bg-primary text-primary-foreground transition-colors hover:bg-primary/90"
              aria-label="Discord"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03z" />
              </svg>
            </Link>

            {/* Sign in - icon on mobile, button on desktop */}
            <Link
              href="/auth/login"
              className="flex h-9 w-9 items-center justify-center rounded-md border transition-colors hover:bg-muted lg:w-auto lg:px-4 lg:gap-2"
              aria-label="Sign in"
            >
              <LogIn className="h-4 w-4 lg:hidden" />
              <span className="hidden lg:inline text-sm font-medium">Sign in</span>
            </Link>

            {/* Get all access button */}
            <Link
              href="/pricing"
              className="flex h-9 w-9 items-center justify-center rounded-md bg-foreground text-background transition-colors hover:bg-foreground/90 lg:w-auto lg:px-4 lg:gap-2"
              aria-label="Get all access"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 328 329"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="lg:order-2"
              >
                <rect
                  y="0.5"
                  width="328"
                  height="328"
                  rx="164"
                  fill="currentColor"
                />
              </svg>
              <span className="hidden lg:inline text-sm font-medium">Get all access</span>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
