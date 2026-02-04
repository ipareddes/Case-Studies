"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import {
  FileText,
  Layers,
  LayoutTemplate,
  Search,
  X,
  Grid2X2,
  Palette,
  Figma,
  Circle
} from "lucide-react";
import { Command as CommandPrimitive } from "cmdk";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { cn } from "@/lib";

// Searchable items with icons - matching reference UI
const suggestions = [
  { name: "Introduction", href: "/docs/introduction", icon: FileText },
  { name: "Components", href: "/components", icon: Grid2X2 },
  { name: "Blocks", href: "/blocks", icon: Layers },
  { name: "Templates", href: "/templates", icon: LayoutTemplate },
  { name: "Theme Generator", href: "/theme-generator", icon: Palette },
  { name: "Figma UI Kit", href: "/figma-ui-kit", icon: Figma },
];

const components = [
  { name: "Accordion", href: "/components/accordion" },
  { name: "Alert", href: "/components/alert" },
  { name: "Avatar", href: "/components/avatar" },
  { name: "Badge", href: "/components/badge" },
  { name: "Breadcrumb", href: "/components/breadcrumb" },
  { name: "Button", href: "/components/button" },
  { name: "Button Group", href: "/components/button-group" },
  { name: "Calendar", href: "/components/calendar" },
  { name: "Card", href: "/components/card" },
  { name: "Carousel", href: "/components/carousel" },
  { name: "Checkbox", href: "/components/checkbox" },
  { name: "Collapsible", href: "/components/collapsible" },
  { name: "Combobox", href: "/components/combobox" },
  { name: "Command", href: "/components/command" },
  { name: "Data Table", href: "/components/data-table" },
  { name: "Date and Time Picker", href: "/components/date-picker" },
  { name: "Dialog", href: "/components/dialog" },
  { name: "Dropdown Menu", href: "/components/dropdown-menu" },
  { name: "Form", href: "/components/form" },
  { name: "Hover Card", href: "/components/hover-card" },
  { name: "Input", href: "/components/input" },
  { name: "Input Mask", href: "/components/input-mask" },
  { name: "Input OTP", href: "/components/input-otp" },
  { name: "Pagination", href: "/components/pagination" },
  { name: "Popover", href: "/components/popover" },
  { name: "Radio Group", href: "/components/radio-group" },
  { name: "Scroll Area", href: "/components/scroll-area" },
  { name: "Select", href: "/components/select" },
  { name: "Separator", href: "/components/separator" },
  { name: "Sheet", href: "/components/sheet" },
  { name: "Skeleton", href: "/components/skeleton" },
  { name: "Slider", href: "/components/slider" },
  { name: "Sonner", href: "/components/sonner" },
  { name: "Switch", href: "/components/switch" },
  { name: "Table", href: "/components/table" },
  { name: "Tabs", href: "/components/tabs" },
  { name: "Textarea", href: "/components/textarea" },
  { name: "Toggle", href: "/components/toggle" },
  { name: "Tooltip", href: "/components/tooltip" },
];

const blocks = [
  { name: "Features Section", href: "/blocks/features-section" },
  { name: "Hero", href: "/blocks/hero" },
  { name: "Pricing", href: "/blocks/pricing" },
  { name: "Testimonials", href: "/blocks/testimonials" },
  { name: "Call to Action", href: "/blocks/cta" },
  { name: "Footer", href: "/blocks/footer" },
  { name: "Navbar", href: "/blocks/navbar" },
  { name: "FAQ", href: "/blocks/faq" },
  { name: "Stats", href: "/blocks/stats" },
  { name: "Team", href: "/blocks/team" },
  { name: "Login", href: "/blocks/login" },
  { name: "Sign Up", href: "/blocks/signup" },
  { name: "Contact", href: "/blocks/contact" },
  { name: "Blog", href: "/blocks/blog" },
  { name: "Sidebar", href: "/blocks/sidebar" },
  { name: "Error Page", href: "/blocks/error" },
];

interface GlobalSearchProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function GlobalSearch({ open, onOpenChange }: GlobalSearchProps) {
  const router = useRouter();
  const [query, setQuery] = React.useState("");

  const runCommand = React.useCallback((command: () => void) => {
    onOpenChange(false);
    setQuery("");
    command();
  }, [onOpenChange]);

  // Filter items based on query
  const filteredComponents = query
    ? components.filter(item => item.name.toLowerCase().includes(query.toLowerCase()))
    : [];

  const filteredBlocks = query
    ? blocks.filter(item => item.name.toLowerCase().includes(query.toLowerCase()))
    : [];

  const filteredSuggestions = query
    ? suggestions.filter(item => item.name.toLowerCase().includes(query.toLowerCase()))
    : suggestions;

  const hasResults = filteredSuggestions.length > 0 || filteredComponents.length > 0 || filteredBlocks.length > 0;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="overflow-hidden p-0 shadow-2xl rounded-xl max-w-[540px] gap-0 [&>button]:hidden">
        <CommandPrimitive
          className="flex h-full w-full flex-col overflow-hidden bg-popover text-popover-foreground"
          shouldFilter={false}
        >
          {/* Search Input */}
          <div className="flex items-center border-b px-4">
            <Search className="mr-3 h-4 w-4 shrink-0 text-muted-foreground" />
            <CommandPrimitive.Input
              value={query}
              onValueChange={setQuery}
              placeholder="Type a command or search..."
              className="flex h-12 w-full bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
            />
            <button
              onClick={() => onOpenChange(false)}
              className="ml-2 rounded-md p-1 text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Results */}
          <CommandPrimitive.List className="max-h-[400px] overflow-y-auto overflow-x-hidden p-2">
            <CommandPrimitive.Empty className="py-6 text-center text-sm text-muted-foreground">
              No results found.
            </CommandPrimitive.Empty>

            {/* Suggestions Section - Show when no query or filtered results */}
            {(filteredSuggestions.length > 0) && (
              <CommandPrimitive.Group>
                <div className="px-2 py-1.5 text-xs font-medium text-muted-foreground">
                  Suggestions
                </div>
                {filteredSuggestions.map((item) => (
                  <CommandPrimitive.Item
                    key={item.href}
                    value={item.name}
                    onSelect={() => runCommand(() => router.push(item.href))}
                    className={cn(
                      "relative flex cursor-pointer select-none items-center gap-3 rounded-lg px-3 py-2.5 text-sm outline-none",
                      "data-[selected=true]:bg-stone-100 dark:data-[selected=true]:bg-stone-800",
                      "hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
                    )}
                  >
                    <item.icon className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">{item.name}</span>
                  </CommandPrimitive.Item>
                ))}
              </CommandPrimitive.Group>
            )}

            {/* Components Section - Show only when searching */}
            {filteredComponents.length > 0 && (
              <CommandPrimitive.Group>
                <div className="px-2 py-1.5 text-xs font-medium text-muted-foreground mt-2">
                  Components
                </div>
                {filteredComponents.map((item) => (
                  <CommandPrimitive.Item
                    key={item.href}
                    value={item.name}
                    onSelect={() => runCommand(() => router.push(item.href))}
                    className={cn(
                      "relative flex cursor-pointer select-none items-center gap-3 rounded-lg px-3 py-2.5 text-sm outline-none",
                      "data-[selected=true]:bg-stone-100 dark:data-[selected=true]:bg-stone-800",
                      "hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
                    )}
                  >
                    <Circle className="h-3 w-3 text-muted-foreground" />
                    <span className="font-medium">{item.name}</span>
                  </CommandPrimitive.Item>
                ))}
              </CommandPrimitive.Group>
            )}

            {/* Blocks Section - Show only when searching */}
            {filteredBlocks.length > 0 && (
              <CommandPrimitive.Group>
                <div className="px-2 py-1.5 text-xs font-medium text-muted-foreground mt-2">
                  Blocks
                </div>
                {filteredBlocks.map((item) => (
                  <CommandPrimitive.Item
                    key={item.href}
                    value={item.name}
                    onSelect={() => runCommand(() => router.push(item.href))}
                    className={cn(
                      "relative flex cursor-pointer select-none items-center gap-3 rounded-lg px-3 py-2.5 text-sm outline-none",
                      "data-[selected=true]:bg-stone-100 dark:data-[selected=true]:bg-stone-800",
                      "hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
                    )}
                  >
                    <Layers className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">{item.name}</span>
                  </CommandPrimitive.Item>
                ))}
              </CommandPrimitive.Group>
            )}
          </CommandPrimitive.List>
        </CommandPrimitive>
      </DialogContent>
    </Dialog>
  );
}

// Hook to use global search with keyboard shortcut
export function useGlobalSearch() {
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  return { open, setOpen };
}
