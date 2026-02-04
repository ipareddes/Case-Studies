"use client";

import * as React from "react";
import { themes, type Theme } from "@/lib/themes";

type ThemeMode = "light" | "dark" | "system";

interface ThemeProviderProps {
  children: React.ReactNode;
  defaultTheme?: string;
  defaultMode?: ThemeMode;
  storageKey?: string;
}

interface ThemeProviderState {
  theme: string;
  mode: ThemeMode;
  resolvedMode: "light" | "dark";
  setTheme: (theme: string) => void;
  setMode: (mode: ThemeMode) => void;
  themes: Record<string, Theme>;
}

const ThemeProviderContext = React.createContext<ThemeProviderState | undefined>(
  undefined
);

export function ThemeProvider({
  children,
  defaultTheme = "neutral",
  defaultMode = "light",
  storageKey = "ui-theme",
}: ThemeProviderProps) {
  const [theme, setThemeState] = React.useState<string>(defaultTheme);
  const [mode, setModeState] = React.useState<ThemeMode>(defaultMode);
  const [mounted, setMounted] = React.useState(false);

  // Get system preference
  const getSystemMode = React.useCallback((): "light" | "dark" => {
    if (typeof window === "undefined") return "light";
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  }, []);

  // Resolve the actual mode (light/dark) from the current mode setting
  const resolveMode = React.useCallback(
    (currentMode: ThemeMode): "light" | "dark" => {
      if (currentMode === "system") {
        return getSystemMode();
      }
      return currentMode;
    },
    [getSystemMode]
  );

  const resolvedMode = resolveMode(mode);

  // Initialize from localStorage and mark as mounted
  React.useEffect(() => {
    const stored = localStorage.getItem(storageKey);
    if (stored) {
      try {
        const { theme: storedTheme, mode: storedMode } = JSON.parse(stored);
        if (storedTheme && themes[storedTheme]) {
          setThemeState(storedTheme);
        }
        if (storedMode && ["light", "dark", "system"].includes(storedMode)) {
          setModeState(storedMode);
        }
      } catch {
        // Invalid stored value, use defaults
      }
    }
    setMounted(true);
  }, [storageKey]);

  // Apply dark class when mode changes (only after mount)
  React.useEffect(() => {
    if (!mounted) return;

    const resolved = resolveMode(mode);
    const root = document.documentElement;

    if (resolved === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [mode, mounted, resolveMode]);

  // Listen for system theme changes
  React.useEffect(() => {
    if (!mounted || mode !== "system") return;

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = () => {
      const resolved = getSystemMode();
      const root = document.documentElement;
      if (resolved === "dark") {
        root.classList.add("dark");
      } else {
        root.classList.remove("dark");
      }
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, [mode, mounted, getSystemMode]);

  // Set theme and persist
  const setTheme = React.useCallback(
    (newTheme: string) => {
      if (!themes[newTheme]) return;
      setThemeState(newTheme);
      localStorage.setItem(
        storageKey,
        JSON.stringify({ theme: newTheme, mode })
      );
    },
    [mode, storageKey]
  );

  // Set mode and persist
  const setMode = React.useCallback(
    (newMode: ThemeMode) => {
      setModeState(newMode);
      localStorage.setItem(
        storageKey,
        JSON.stringify({ theme, mode: newMode })
      );
    },
    [theme, storageKey]
  );

  const value = React.useMemo(
    () => ({
      theme,
      mode,
      resolvedMode,
      setTheme,
      setMode,
      themes,
    }),
    [theme, mode, resolvedMode, setTheme, setMode]
  );

  return (
    <ThemeProviderContext.Provider value={value}>
      {children}
    </ThemeProviderContext.Provider>
  );
}

export function useTheme() {
  const context = React.useContext(ThemeProviderContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
