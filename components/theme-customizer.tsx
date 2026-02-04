"use client";

import { useState, useEffect, createContext, useContext, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { themes, themeNames } from "@/lib/themes";
import {
  Palette,
  Copy,
  Check,
  Shuffle,
  Download,
  Sun,
  Moon,
  Settings2,
  X,
  ChevronDown,
  Type,
  SlidersHorizontal,
  RotateCcw,
} from "lucide-react";
import { cn } from "@/lib";

// Context for global theme customizer state
interface ThemeCustomizerContextType {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  toggle: () => void;
}

const ThemeCustomizerContext = createContext<ThemeCustomizerContextType | null>(null);

export function useThemeCustomizer() {
  const context = useContext(ThemeCustomizerContext);
  if (!context) {
    return {
      isOpen: false,
      setIsOpen: () => {},
      toggle: () => {},
    };
  }
  return context;
}

// Helper functions
function hslToHex(hsl: string): string {
  try {
    const parts = hsl.split(" ");
    const h = parseFloat(parts[0]) || 0;
    const s = (parseFloat(parts[1]?.replace("%", "")) || 0) / 100;
    const l = (parseFloat(parts[2]?.replace("%", "")) || 0) / 100;

    const a = s * Math.min(l, 1 - l);
    const f = (n: number) => {
      const k = (n + h / 30) % 12;
      const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
      return Math.round(255 * color).toString(16).padStart(2, "0");
    };
    return `#${f(0)}${f(8)}${f(4)}`;
  } catch {
    return "#000000";
  }
}

function hexToHsl(hex: string): string {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) return "0 0% 0%";

  const r = parseInt(result[1], 16) / 255;
  const g = parseInt(result[2], 16) / 255;
  const b = parseInt(result[3], 16) / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0, s = 0;
  const l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
      case g: h = ((b - r) / d + 2) / 6; break;
      case b: h = ((r - g) / d + 4) / 6; break;
    }
  }

  return `${Math.round(h * 360)} ${Math.round(s * 100)}% ${Math.round(l * 100)}%`;
}

interface ColorConfig {
  background: string;
  foreground: string;
  card: string;
  cardForeground: string;
  popover: string;
  popoverForeground: string;
  primary: string;
  primaryForeground: string;
  secondary: string;
  secondaryForeground: string;
  muted: string;
  mutedForeground: string;
  accent: string;
  accentForeground: string;
  destructive: string;
  destructiveForeground: string;
  border: string;
  input: string;
  ring: string;
}

const defaultLightColors: ColorConfig = {
  background: "0 0% 100%",
  foreground: "0 0% 3.9%",
  card: "0 0% 100%",
  cardForeground: "0 0% 3.9%",
  popover: "0 0% 100%",
  popoverForeground: "0 0% 3.9%",
  primary: "0 0% 9%",
  primaryForeground: "0 0% 98%",
  secondary: "0 0% 96.1%",
  secondaryForeground: "0 0% 9%",
  muted: "0 0% 96.1%",
  mutedForeground: "0 0% 45.1%",
  accent: "0 0% 96.1%",
  accentForeground: "0 0% 9%",
  destructive: "0 84.2% 60.2%",
  destructiveForeground: "0 0% 98%",
  border: "0 0% 89.8%",
  input: "0 0% 89.8%",
  ring: "0 0% 3.9%",
};

// CSS variables that we control
const CSS_VARS = [
  "--background", "--foreground", "--card", "--card-foreground",
  "--popover", "--popover-foreground", "--primary", "--primary-foreground",
  "--secondary", "--secondary-foreground", "--muted", "--muted-foreground",
  "--accent", "--accent-foreground", "--destructive", "--destructive-foreground",
  "--border", "--input", "--ring", "--radius"
];

export function ThemeCustomizerProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const toggle = () => setIsOpen(prev => !prev);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <ThemeCustomizerContext.Provider value={{ isOpen, setIsOpen, toggle }}>
      {children}
      {mounted && <ThemeCustomizerDrawer />}
    </ThemeCustomizerContext.Provider>
  );
}

function ThemeCustomizerDrawer() {
  const context = useContext(ThemeCustomizerContext);
  const isOpen = context?.isOpen ?? false;
  const setIsOpen = context?.setIsOpen ?? (() => {});
  const [selectedTheme, setSelectedTheme] = useState<string>("neutral");
  const [mode, setMode] = useState<"light" | "dark">("light");
  const [colors, setColors] = useState<ColorConfig>(defaultLightColors);
  const [copied, setCopied] = useState(false);
  const [copiedColor, setCopiedColor] = useState<string | null>(null);
  const [radius, setRadius] = useState(0.5);
  const [livePreview, setLivePreview] = useState(false);

  // Clear all inline CSS variables to restore defaults
  const resetToDefaults = useCallback(() => {
    const root = document.documentElement;
    CSS_VARS.forEach(varName => {
      root.style.removeProperty(varName);
    });
    root.classList.remove("dark");
    setLivePreview(false);
    localStorage.removeItem("theme-customizer-preview");
  }, []);

  // Apply colors to document root (only when live preview is enabled)
  const applyColors = useCallback(() => {
    const root = document.documentElement;
    root.style.setProperty("--background", colors.background);
    root.style.setProperty("--foreground", colors.foreground);
    root.style.setProperty("--card", colors.card);
    root.style.setProperty("--card-foreground", colors.cardForeground);
    root.style.setProperty("--popover", colors.popover);
    root.style.setProperty("--popover-foreground", colors.popoverForeground);
    root.style.setProperty("--primary", colors.primary);
    root.style.setProperty("--primary-foreground", colors.primaryForeground);
    root.style.setProperty("--secondary", colors.secondary);
    root.style.setProperty("--secondary-foreground", colors.secondaryForeground);
    root.style.setProperty("--muted", colors.muted);
    root.style.setProperty("--muted-foreground", colors.mutedForeground);
    root.style.setProperty("--accent", colors.accent);
    root.style.setProperty("--accent-foreground", colors.accentForeground);
    root.style.setProperty("--destructive", colors.destructive);
    root.style.setProperty("--destructive-foreground", colors.destructiveForeground);
    root.style.setProperty("--border", colors.border);
    root.style.setProperty("--input", colors.input);
    root.style.setProperty("--ring", colors.ring);
    root.style.setProperty("--radius", `${radius}rem`);

    if (mode === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [colors, mode, radius]);

  // Load theme colors when theme changes
  useEffect(() => {
    const theme = themes[selectedTheme];
    if (theme) {
      const themeColors = mode === "light" ? theme.light : theme.dark;
      setColors({
        background: themeColors.background,
        foreground: themeColors.foreground,
        card: themeColors.card,
        cardForeground: themeColors.cardForeground,
        popover: themeColors.popover,
        popoverForeground: themeColors.popoverForeground,
        primary: themeColors.primary,
        primaryForeground: themeColors.primaryForeground,
        secondary: themeColors.secondary,
        secondaryForeground: themeColors.secondaryForeground,
        muted: themeColors.muted,
        mutedForeground: themeColors.mutedForeground,
        accent: themeColors.accent,
        accentForeground: themeColors.accentForeground,
        destructive: themeColors.destructive,
        destructiveForeground: themeColors.destructiveForeground,
        border: themeColors.border,
        input: themeColors.input,
        ring: themeColors.ring,
      });
    }
  }, [selectedTheme, mode]);

  // Only reset when drawer closes (don't auto-apply on color changes)
  useEffect(() => {
    if (!isOpen && livePreview) {
      resetToDefaults();
    }
  }, [isOpen, livePreview, resetToDefaults]);

  const updateColor = (key: keyof ColorConfig, value: string) => {
    setColors(prev => ({ ...prev, [key]: value }));
  };

  const randomizeColors = () => {
    const randomTheme = themeNames[Math.floor(Math.random() * themeNames.length)];
    setSelectedTheme(randomTheme);
  };

  const copyColorValue = (colorKey: string, value: string) => {
    navigator.clipboard.writeText(value);
    setCopiedColor(colorKey);
    setTimeout(() => setCopiedColor(null), 1500);
  };

  const copyCSS = () => {
    const css = `@layer base {
  :root {
    --background: ${colors.background};
    --foreground: ${colors.foreground};
    --card: ${colors.card};
    --card-foreground: ${colors.cardForeground};
    --popover: ${colors.popover};
    --popover-foreground: ${colors.popoverForeground};
    --primary: ${colors.primary};
    --primary-foreground: ${colors.primaryForeground};
    --secondary: ${colors.secondary};
    --secondary-foreground: ${colors.secondaryForeground};
    --muted: ${colors.muted};
    --muted-foreground: ${colors.mutedForeground};
    --accent: ${colors.accent};
    --accent-foreground: ${colors.accentForeground};
    --destructive: ${colors.destructive};
    --destructive-foreground: ${colors.destructiveForeground};
    --border: ${colors.border};
    --input: ${colors.input};
    --ring: ${colors.ring};
    --radius: ${radius}rem;
  }
}`;
    navigator.clipboard.writeText(css);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Color input component
  const ColorInput = ({ label, colorKey }: { label: string; colorKey: keyof ColorConfig }) => {
    const value = colors[colorKey];
    const hexValue = hslToHex(value);

    return (
      <div className="flex items-center gap-3 py-1.5">
        <span className="text-sm text-muted-foreground w-28 shrink-0">{label}</span>
        <div
          className="w-9 h-9 rounded-md border cursor-pointer shrink-0 relative overflow-hidden"
          style={{ backgroundColor: `hsl(${value})` }}
        >
          <input
            type="color"
            value={hexValue}
            onChange={(e) => updateColor(colorKey, hexToHsl(e.target.value))}
            className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
          />
        </div>
        <Input
          value={value}
          onChange={(e) => updateColor(colorKey, e.target.value)}
          className="h-9 text-xs font-mono flex-1"
        />
        <button
          onClick={() => copyColorValue(colorKey, value)}
          className="p-1.5 hover:bg-muted rounded-md transition-colors"
          title="Copy HSL value"
        >
          {copiedColor === colorKey ? (
            <Check className="w-3.5 h-3.5 text-green-500" />
          ) : (
            <Copy className="w-3.5 h-3.5 text-muted-foreground" />
          )}
        </button>
      </div>
    );
  };

  // Collapsible section
  const ColorSection = ({
    title,
    children,
    defaultOpen = false
  }: {
    title: string;
    children: React.ReactNode;
    defaultOpen?: boolean;
  }) => {
    const [sectionOpen, setSectionOpen] = useState(defaultOpen);
    return (
      <Collapsible open={sectionOpen} onOpenChange={setSectionOpen} className="border rounded-lg">
        <CollapsibleTrigger className="flex w-full items-center justify-between p-3 hover:bg-muted/50 transition-colors">
          <span className="text-sm font-medium">{title}</span>
          <ChevronDown className={cn("h-4 w-4 transition-transform", sectionOpen && "rotate-180")} />
        </CollapsibleTrigger>
        <CollapsibleContent className="px-3 pb-3">
          {children}
        </CollapsibleContent>
      </Collapsible>
    );
  };

  if (!isOpen) return null;

  return (
    <aside className="fixed top-[64px] right-0 h-[calc(100vh-64px)] w-[380px] border-l bg-background z-50 flex flex-col shadow-xl">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center gap-2">
          <Settings2 className="w-5 h-5" />
          <span className="font-semibold">Theme Generator</span>
        </div>
        <button
          onClick={() => setIsOpen(false)}
          className="p-1.5 hover:bg-muted rounded-md transition-colors"
          aria-label="Close theme generator"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {/* Apply Theme Button */}
        <div className="space-y-2">
          <Button
            onClick={() => {
              setLivePreview(true);
              applyColors();
            }}
            className="w-full gap-2"
            size="lg"
          >
            <Palette className="w-4 h-4" />
            Apply Theme
          </Button>
          {livePreview && (
            <Button variant="outline" onClick={resetToDefaults} className="w-full gap-2" size="sm">
              <RotateCcw className="w-4 h-4" />
              Reset to Default
            </Button>
          )}
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <Label className="text-xs text-muted-foreground uppercase tracking-wider">Themes</Label>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={randomizeColors} className="gap-1.5 flex-1">
              <Shuffle className="w-4 h-4" />
              Random
            </Button>
          </div>

          {/* Theme Selector */}
          <Popover>
            <PopoverTrigger asChild>
              <button className="flex h-11 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                <div className="flex items-center gap-2">
                  <div
                    className="w-4 h-4 rounded-full border"
                    style={{ backgroundColor: `hsl(${themes[selectedTheme]?.light.primary || "0 0% 9%"})` }}
                  />
                  {themes[selectedTheme]?.label || "Select theme"}
                </div>
                <ChevronDown className="h-4 w-4 opacity-50" />
              </button>
            </PopoverTrigger>
            <PopoverContent className="w-[calc(380px-2rem)] p-1" align="start" sideOffset={4}>
              <div className="max-h-[300px] overflow-y-auto">
                {themeNames.map((name) => (
                  <button
                    key={name}
                    onClick={() => setSelectedTheme(name)}
                    className={cn(
                      "flex w-full items-center gap-2 rounded-sm px-2 py-1.5 text-sm hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:bg-accent",
                      selectedTheme === name && "bg-accent"
                    )}
                  >
                    <div
                      className="w-4 h-4 rounded-full border"
                      style={{ backgroundColor: `hsl(${themes[name].light.primary})` }}
                    />
                    {themes[name].label}
                  </button>
                ))}
              </div>
            </PopoverContent>
          </Popover>
        </div>

        {/* Mode Toggle */}
        <div className="flex items-center justify-between">
          <Label>Mode</Label>
          <div className="flex items-center gap-1 p-1 bg-muted rounded-lg">
            <button
              onClick={() => setMode("light")}
              className={cn(
                "p-2 rounded-md transition-colors",
                mode === "light" ? "bg-background shadow-sm" : "hover:bg-background/50"
              )}
              title="Light mode"
            >
              <Sun className="w-4 h-4" />
            </button>
            <button
              onClick={() => setMode("dark")}
              className={cn(
                "p-2 rounded-md transition-colors",
                mode === "dark" ? "bg-background shadow-sm" : "hover:bg-background/50"
              )}
              title="Dark mode"
            >
              <Moon className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Border Radius */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label>Border Radius</Label>
            <span className="text-sm text-muted-foreground font-mono">{radius}rem</span>
          </div>
          <Slider
            value={[radius]}
            onValueChange={([v]) => setRadius(v)}
            min={0}
            max={1}
            step={0.1}
            className="py-2"
          />
        </div>

        {/* Tabs */}
        <Tabs defaultValue="colors" className="w-full">
          <TabsList className="w-full grid grid-cols-3">
            <TabsTrigger value="colors" className="gap-1.5 text-xs">
              <Palette className="w-3.5 h-3.5" />
              Colors
            </TabsTrigger>
            <TabsTrigger value="typography" className="gap-1.5 text-xs">
              <Type className="w-3.5 h-3.5" />
              Type
            </TabsTrigger>
            <TabsTrigger value="other" className="gap-1.5 text-xs">
              <SlidersHorizontal className="w-3.5 h-3.5" />
              Other
            </TabsTrigger>
          </TabsList>

          <TabsContent value="colors" className="mt-4 space-y-3">
            <ColorSection title="Brand Colors" defaultOpen>
              <ColorInput label="Primary" colorKey="primary" />
              <ColorInput label="Primary FG" colorKey="primaryForeground" />
              <ColorInput label="Secondary" colorKey="secondary" />
              <ColorInput label="Secondary FG" colorKey="secondaryForeground" />
            </ColorSection>
            <ColorSection title="Base Colors">
              <ColorInput label="Background" colorKey="background" />
              <ColorInput label="Foreground" colorKey="foreground" />
              <ColorInput label="Card" colorKey="card" />
              <ColorInput label="Card FG" colorKey="cardForeground" />
            </ColorSection>
            <ColorSection title="UI Colors">
              <ColorInput label="Muted" colorKey="muted" />
              <ColorInput label="Muted FG" colorKey="mutedForeground" />
              <ColorInput label="Accent" colorKey="accent" />
              <ColorInput label="Accent FG" colorKey="accentForeground" />
              <ColorInput label="Border" colorKey="border" />
              <ColorInput label="Input" colorKey="input" />
              <ColorInput label="Ring" colorKey="ring" />
            </ColorSection>
            <ColorSection title="Status Colors">
              <ColorInput label="Destructive" colorKey="destructive" />
              <ColorInput label="Destructive FG" colorKey="destructiveForeground" />
            </ColorSection>
          </TabsContent>

          <TabsContent value="typography" className="mt-4">
            <div className="text-center py-8 text-muted-foreground">
              <Type className="w-8 h-8 mx-auto mb-3 opacity-50" />
              <p className="text-sm">Typography customization</p>
              <p className="text-xs mt-1">Coming soon</p>
            </div>
          </TabsContent>

          <TabsContent value="other" className="mt-4">
            <div className="text-center py-8 text-muted-foreground">
              <SlidersHorizontal className="w-8 h-8 mx-auto mb-3 opacity-50" />
              <p className="text-sm">Additional settings</p>
              <p className="text-xs mt-1">Coming soon</p>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Footer */}
      <div className="p-4 border-t space-y-2">
        <Button onClick={copyCSS} className="w-full gap-2">
          {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
          {copied ? "Copied!" : "Copy Theme CSS"}
        </Button>
        <p className="text-xs text-center text-muted-foreground">
          Copy and paste into your globals.css
        </p>
      </div>
    </aside>
  );
}

// Button to toggle the customizer - can be used anywhere
export function ThemeCustomizerTrigger({ className }: { className?: string }) {
  const { toggle } = useThemeCustomizer();

  return (
    <button
      onClick={toggle}
      className={cn(
        "flex h-9 w-9 items-center justify-center rounded-md border transition-colors hover:bg-muted",
        className
      )}
      title="Theme Generator"
    >
      <Palette className="h-4 w-4" />
    </button>
  );
}
