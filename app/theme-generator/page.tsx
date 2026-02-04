"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { SiteNavigation } from "@/components/layout/site-navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Palette,
  Copy,
  Check,
  Shuffle,
  Sun,
  Moon,
  ChevronDown,
  ChevronRight,
  ChevronUp,
  Type,
  SlidersHorizontal,
  Sparkles,
  RotateCcw,
  Upload,
  Menu,
  MoreHorizontal,
  Search,
  TrendingUp,
  TrendingDown,
  ArrowUpRight,
  Mail,
  Users,
  CreditCard,
  Activity,
  X,
  Undo2,
  Redo2,
  Lock,
  Hand,
  Circle,
  Contrast,
} from "lucide-react";
import { cn } from "@/lib";

// Theme presets matching shadcnstudio.com
const themePresets = {
  corporate: {
    name: "Corporate",
    light: {
      background: "0 0% 100%",
      foreground: "222 47% 11%",
      card: "0 0% 100%",
      cardForeground: "222 47% 11%",
      popover: "0 0% 100%",
      popoverForeground: "222 47% 11%",
      primary: "221 83% 53%",
      primaryForeground: "0 0% 100%",
      secondary: "210 40% 96%",
      secondaryForeground: "222 47% 11%",
      muted: "210 40% 96%",
      mutedForeground: "215 16% 47%",
      accent: "210 40% 96%",
      accentForeground: "222 47% 11%",
      destructive: "0 84% 60%",
      destructiveForeground: "0 0% 100%",
      border: "214 32% 91%",
      input: "214 32% 91%",
      ring: "221 83% 53%",
      chart1: "221 83% 53%",
      chart2: "160 60% 45%",
      chart3: "30 80% 55%",
      chart4: "280 65% 60%",
      chart5: "340 75% 55%",
    },
    dark: {
      background: "222 47% 4%",
      foreground: "210 40% 98%",
      card: "222 47% 6%",
      cardForeground: "210 40% 98%",
      popover: "222 47% 6%",
      popoverForeground: "210 40% 98%",
      primary: "217 91% 60%",
      primaryForeground: "0 0% 100%",
      secondary: "217 33% 17%",
      secondaryForeground: "210 40% 98%",
      muted: "217 33% 17%",
      mutedForeground: "215 20% 65%",
      accent: "217 33% 17%",
      accentForeground: "210 40% 98%",
      destructive: "0 62% 30%",
      destructiveForeground: "210 40% 98%",
      border: "217 33% 17%",
      input: "217 33% 17%",
      ring: "217 91% 60%",
      chart1: "217 91% 60%",
      chart2: "160 60% 45%",
      chart3: "30 80% 55%",
      chart4: "280 65% 60%",
      chart5: "340 75% 55%",
    },
  },
  elegantLuxury: {
    name: "Elegant Luxury",
    light: {
      background: "30 20% 98%",
      foreground: "30 10% 10%",
      card: "30 15% 99%",
      cardForeground: "30 10% 10%",
      popover: "30 15% 99%",
      popoverForeground: "30 10% 10%",
      primary: "30 50% 35%",
      primaryForeground: "30 20% 98%",
      secondary: "30 15% 94%",
      secondaryForeground: "30 10% 15%",
      muted: "30 15% 94%",
      mutedForeground: "30 10% 45%",
      accent: "30 20% 92%",
      accentForeground: "30 10% 10%",
      destructive: "0 75% 55%",
      destructiveForeground: "0 0% 100%",
      border: "30 15% 88%",
      input: "30 15% 88%",
      ring: "30 50% 35%",
      chart1: "30 50% 35%",
      chart2: "200 50% 45%",
      chart3: "160 45% 40%",
      chart4: "280 45% 50%",
      chart5: "340 55% 50%",
    },
    dark: {
      background: "30 15% 6%",
      foreground: "30 15% 95%",
      card: "30 12% 9%",
      cardForeground: "30 15% 95%",
      popover: "30 12% 9%",
      popoverForeground: "30 15% 95%",
      primary: "30 45% 50%",
      primaryForeground: "30 15% 6%",
      secondary: "30 10% 18%",
      secondaryForeground: "30 15% 95%",
      muted: "30 10% 18%",
      mutedForeground: "30 10% 60%",
      accent: "30 12% 20%",
      accentForeground: "30 15% 95%",
      destructive: "0 55% 40%",
      destructiveForeground: "0 0% 100%",
      border: "30 10% 18%",
      input: "30 10% 18%",
      ring: "30 45% 50%",
      chart1: "30 45% 50%",
      chart2: "200 45% 50%",
      chart3: "160 40% 45%",
      chart4: "280 40% 55%",
      chart5: "340 50% 55%",
    },
  },
  ghibliStudio: {
    name: "Ghibli Studio",
    light: {
      background: "45 30% 97%",
      foreground: "45 25% 15%",
      card: "45 35% 98%",
      cardForeground: "45 25% 15%",
      popover: "45 35% 98%",
      popoverForeground: "45 25% 15%",
      primary: "150 45% 45%",
      primaryForeground: "0 0% 100%",
      secondary: "45 25% 92%",
      secondaryForeground: "45 25% 20%",
      muted: "45 20% 93%",
      mutedForeground: "45 15% 45%",
      accent: "200 50% 85%",
      accentForeground: "200 50% 20%",
      destructive: "0 70% 55%",
      destructiveForeground: "0 0% 100%",
      border: "45 20% 85%",
      input: "45 20% 85%",
      ring: "150 45% 45%",
      chart1: "150 45% 45%",
      chart2: "200 50% 55%",
      chart3: "45 60% 55%",
      chart4: "340 45% 55%",
      chart5: "280 40% 55%",
    },
    dark: {
      background: "45 20% 8%",
      foreground: "45 20% 95%",
      card: "45 18% 12%",
      cardForeground: "45 20% 95%",
      popover: "45 18% 12%",
      popoverForeground: "45 20% 95%",
      primary: "150 40% 50%",
      primaryForeground: "45 20% 8%",
      secondary: "45 15% 18%",
      secondaryForeground: "45 20% 95%",
      muted: "45 15% 18%",
      mutedForeground: "45 15% 55%",
      accent: "200 40% 25%",
      accentForeground: "200 40% 90%",
      destructive: "0 55% 40%",
      destructiveForeground: "0 0% 100%",
      border: "45 15% 20%",
      input: "45 15% 20%",
      ring: "150 40% 50%",
      chart1: "150 40% 50%",
      chart2: "200 45% 55%",
      chart3: "45 55% 55%",
      chart4: "340 40% 55%",
      chart5: "280 35% 55%",
    },
  },
  marshmallow: {
    name: "Marshmallow",
    light: {
      background: "300 20% 99%",
      foreground: "270 50% 15%",
      card: "300 30% 98%",
      cardForeground: "270 50% 15%",
      popover: "300 30% 98%",
      popoverForeground: "270 50% 15%",
      primary: "280 65% 70%",
      primaryForeground: "280 100% 10%",
      secondary: "200 60% 90%",
      secondaryForeground: "200 60% 20%",
      muted: "320 30% 95%",
      mutedForeground: "280 20% 45%",
      accent: "340 60% 85%",
      accentForeground: "340 60% 20%",
      destructive: "0 65% 65%",
      destructiveForeground: "0 0% 100%",
      border: "280 30% 88%",
      input: "280 30% 88%",
      ring: "280 65% 70%",
      chart1: "280 65% 70%",
      chart2: "200 60% 65%",
      chart3: "340 55% 70%",
      chart4: "160 50% 60%",
      chart5: "40 60% 70%",
    },
    dark: {
      background: "280 30% 8%",
      foreground: "300 20% 95%",
      card: "280 25% 12%",
      cardForeground: "300 20% 95%",
      popover: "280 25% 12%",
      popoverForeground: "300 20% 95%",
      primary: "280 60% 65%",
      primaryForeground: "280 100% 10%",
      secondary: "280 20% 20%",
      secondaryForeground: "300 20% 95%",
      muted: "280 20% 18%",
      mutedForeground: "280 15% 60%",
      accent: "280 25% 22%",
      accentForeground: "300 20% 95%",
      destructive: "0 55% 45%",
      destructiveForeground: "0 0% 100%",
      border: "280 20% 18%",
      input: "280 20% 18%",
      ring: "280 60% 65%",
      chart1: "280 60% 65%",
      chart2: "200 55% 55%",
      chart3: "340 50% 60%",
      chart4: "160 45% 50%",
      chart5: "40 55% 60%",
    },
  },
  marvel: {
    name: "Marvel",
    light: {
      background: "0 0% 100%",
      foreground: "0 0% 5%",
      card: "0 0% 100%",
      cardForeground: "0 0% 5%",
      popover: "0 0% 100%",
      popoverForeground: "0 0% 5%",
      primary: "0 85% 50%",
      primaryForeground: "0 0% 100%",
      secondary: "0 0% 95%",
      secondaryForeground: "0 0% 10%",
      muted: "0 0% 96%",
      mutedForeground: "0 0% 45%",
      accent: "45 90% 55%",
      accentForeground: "0 0% 5%",
      destructive: "0 85% 50%",
      destructiveForeground: "0 0% 100%",
      border: "0 0% 88%",
      input: "0 0% 88%",
      ring: "0 85% 50%",
      chart1: "0 85% 50%",
      chart2: "45 90% 55%",
      chart3: "220 70% 50%",
      chart4: "280 60% 55%",
      chart5: "160 55% 45%",
    },
    dark: {
      background: "0 0% 4%",
      foreground: "0 0% 98%",
      card: "0 0% 7%",
      cardForeground: "0 0% 98%",
      popover: "0 0% 7%",
      popoverForeground: "0 0% 98%",
      primary: "0 80% 55%",
      primaryForeground: "0 0% 100%",
      secondary: "0 0% 15%",
      secondaryForeground: "0 0% 98%",
      muted: "0 0% 15%",
      mutedForeground: "0 0% 60%",
      accent: "45 85% 50%",
      accentForeground: "0 0% 5%",
      destructive: "0 75% 45%",
      destructiveForeground: "0 0% 100%",
      border: "0 0% 18%",
      input: "0 0% 18%",
      ring: "0 80% 55%",
      chart1: "0 80% 55%",
      chart2: "45 85% 55%",
      chart3: "220 65% 55%",
      chart4: "280 55% 60%",
      chart5: "160 50% 50%",
    },
  },
  materialDesign: {
    name: "Material Design",
    light: {
      background: "0 0% 100%",
      foreground: "0 0% 10%",
      card: "0 0% 100%",
      cardForeground: "0 0% 10%",
      popover: "0 0% 100%",
      popoverForeground: "0 0% 10%",
      primary: "262 83% 58%",
      primaryForeground: "0 0% 100%",
      secondary: "260 20% 95%",
      secondaryForeground: "262 83% 40%",
      muted: "260 20% 95%",
      mutedForeground: "0 0% 45%",
      accent: "262 83% 95%",
      accentForeground: "262 83% 40%",
      destructive: "0 84% 60%",
      destructiveForeground: "0 0% 100%",
      border: "0 0% 90%",
      input: "0 0% 90%",
      ring: "262 83% 58%",
      chart1: "262 83% 58%",
      chart2: "174 72% 40%",
      chart3: "36 100% 50%",
      chart4: "340 82% 52%",
      chart5: "199 89% 48%",
    },
    dark: {
      background: "0 0% 6%",
      foreground: "0 0% 95%",
      card: "0 0% 9%",
      cardForeground: "0 0% 95%",
      popover: "0 0% 9%",
      popoverForeground: "0 0% 95%",
      primary: "262 83% 68%",
      primaryForeground: "0 0% 10%",
      secondary: "260 15% 18%",
      secondaryForeground: "0 0% 95%",
      muted: "260 15% 18%",
      mutedForeground: "0 0% 60%",
      accent: "262 30% 20%",
      accentForeground: "0 0% 95%",
      destructive: "0 62% 50%",
      destructiveForeground: "0 0% 100%",
      border: "0 0% 18%",
      input: "0 0% 18%",
      ring: "262 83% 68%",
      chart1: "262 83% 68%",
      chart2: "174 65% 50%",
      chart3: "36 95% 55%",
      chart4: "340 75% 60%",
      chart5: "199 80% 55%",
    },
  },
  midnightBloom: {
    name: "Midnight Bloom",
    light: {
      background: "270 30% 98%",
      foreground: "270 50% 10%",
      card: "270 25% 99%",
      cardForeground: "270 50% 10%",
      popover: "270 25% 99%",
      popoverForeground: "270 50% 10%",
      primary: "270 70% 50%",
      primaryForeground: "0 0% 100%",
      secondary: "270 20% 94%",
      secondaryForeground: "270 50% 15%",
      muted: "270 20% 94%",
      mutedForeground: "270 20% 45%",
      accent: "320 60% 90%",
      accentForeground: "320 60% 25%",
      destructive: "0 70% 55%",
      destructiveForeground: "0 0% 100%",
      border: "270 20% 88%",
      input: "270 20% 88%",
      ring: "270 70% 50%",
      chart1: "270 70% 50%",
      chart2: "320 60% 55%",
      chart3: "200 60% 50%",
      chart4: "45 70% 55%",
      chart5: "160 50% 45%",
    },
    dark: {
      background: "270 40% 6%",
      foreground: "270 20% 95%",
      card: "270 35% 10%",
      cardForeground: "270 20% 95%",
      popover: "270 35% 10%",
      popoverForeground: "270 20% 95%",
      primary: "270 65% 60%",
      primaryForeground: "270 40% 6%",
      secondary: "270 25% 18%",
      secondaryForeground: "270 20% 95%",
      muted: "270 25% 18%",
      mutedForeground: "270 15% 60%",
      accent: "320 40% 25%",
      accentForeground: "320 40% 90%",
      destructive: "0 55% 45%",
      destructiveForeground: "0 0% 100%",
      border: "270 25% 18%",
      input: "270 25% 18%",
      ring: "270 65% 60%",
      chart1: "270 65% 60%",
      chart2: "320 55% 60%",
      chart3: "200 55% 55%",
      chart4: "45 65% 60%",
      chart5: "160 45% 50%",
    },
  },
  modernMinimal: {
    name: "Modern Minimal",
    light: {
      background: "0 0% 100%",
      foreground: "0 0% 9%",
      card: "0 0% 100%",
      cardForeground: "0 0% 9%",
      popover: "0 0% 100%",
      popoverForeground: "0 0% 9%",
      primary: "0 0% 9%",
      primaryForeground: "0 0% 98%",
      secondary: "0 0% 96%",
      secondaryForeground: "0 0% 9%",
      muted: "0 0% 96%",
      mutedForeground: "0 0% 45%",
      accent: "0 0% 96%",
      accentForeground: "0 0% 9%",
      destructive: "0 84% 60%",
      destructiveForeground: "0 0% 98%",
      border: "0 0% 90%",
      input: "0 0% 90%",
      ring: "0 0% 9%",
      chart1: "0 0% 20%",
      chart2: "0 0% 35%",
      chart3: "0 0% 50%",
      chart4: "0 0% 65%",
      chart5: "0 0% 80%",
    },
    dark: {
      background: "0 0% 4%",
      foreground: "0 0% 98%",
      card: "0 0% 4%",
      cardForeground: "0 0% 98%",
      popover: "0 0% 4%",
      popoverForeground: "0 0% 98%",
      primary: "0 0% 98%",
      primaryForeground: "0 0% 9%",
      secondary: "0 0% 15%",
      secondaryForeground: "0 0% 98%",
      muted: "0 0% 15%",
      mutedForeground: "0 0% 64%",
      accent: "0 0% 15%",
      accentForeground: "0 0% 98%",
      destructive: "0 62% 30%",
      destructiveForeground: "0 0% 98%",
      border: "0 0% 15%",
      input: "0 0% 15%",
      ring: "0 0% 83%",
      chart1: "0 0% 90%",
      chart2: "0 0% 75%",
      chart3: "0 0% 60%",
      chart4: "0 0% 45%",
      chart5: "0 0% 30%",
    },
  },
  nature: {
    name: "Nature",
    light: {
      background: "80 30% 98%",
      foreground: "80 40% 10%",
      card: "80 25% 99%",
      cardForeground: "80 40% 10%",
      popover: "80 25% 99%",
      popoverForeground: "80 40% 10%",
      primary: "142 70% 35%",
      primaryForeground: "0 0% 100%",
      secondary: "80 20% 94%",
      secondaryForeground: "80 40% 15%",
      muted: "80 20% 94%",
      mutedForeground: "80 15% 45%",
      accent: "45 60% 90%",
      accentForeground: "45 60% 25%",
      destructive: "0 70% 55%",
      destructiveForeground: "0 0% 100%",
      border: "80 20% 88%",
      input: "80 20% 88%",
      ring: "142 70% 35%",
      chart1: "142 70% 35%",
      chart2: "45 65% 50%",
      chart3: "200 55% 45%",
      chart4: "25 75% 55%",
      chart5: "340 50% 50%",
    },
    dark: {
      background: "80 30% 6%",
      foreground: "80 20% 95%",
      card: "80 25% 10%",
      cardForeground: "80 20% 95%",
      popover: "80 25% 10%",
      popoverForeground: "80 20% 95%",
      primary: "142 60% 45%",
      primaryForeground: "80 30% 6%",
      secondary: "80 20% 18%",
      secondaryForeground: "80 20% 95%",
      muted: "80 20% 18%",
      mutedForeground: "80 15% 55%",
      accent: "45 40% 25%",
      accentForeground: "45 40% 90%",
      destructive: "0 55% 40%",
      destructiveForeground: "0 0% 100%",
      border: "80 20% 18%",
      input: "80 20% 18%",
      ring: "142 60% 45%",
      chart1: "142 60% 45%",
      chart2: "45 60% 55%",
      chart3: "200 50% 50%",
      chart4: "25 70% 60%",
      chart5: "340 45% 55%",
    },
  },
  neoBrutalism: {
    name: "Neo Brutalism",
    light: {
      background: "60 100% 97%",
      foreground: "0 0% 0%",
      card: "60 100% 97%",
      cardForeground: "0 0% 0%",
      popover: "60 100% 97%",
      popoverForeground: "0 0% 0%",
      primary: "0 0% 0%",
      primaryForeground: "60 100% 97%",
      secondary: "45 100% 60%",
      secondaryForeground: "0 0% 0%",
      muted: "45 30% 90%",
      mutedForeground: "0 0% 30%",
      accent: "340 82% 52%",
      accentForeground: "0 0% 100%",
      destructive: "0 100% 50%",
      destructiveForeground: "0 0% 100%",
      border: "0 0% 0%",
      input: "0 0% 0%",
      ring: "0 0% 0%",
      chart1: "0 0% 0%",
      chart2: "45 100% 50%",
      chart3: "340 82% 52%",
      chart4: "200 100% 50%",
      chart5: "120 60% 50%",
    },
    dark: {
      background: "0 0% 5%",
      foreground: "60 100% 97%",
      card: "0 0% 8%",
      cardForeground: "60 100% 97%",
      popover: "0 0% 8%",
      popoverForeground: "60 100% 97%",
      primary: "45 100% 60%",
      primaryForeground: "0 0% 0%",
      secondary: "0 0% 20%",
      secondaryForeground: "60 100% 97%",
      muted: "0 0% 15%",
      mutedForeground: "0 0% 60%",
      accent: "340 82% 52%",
      accentForeground: "0 0% 100%",
      destructive: "0 100% 50%",
      destructiveForeground: "0 0% 100%",
      border: "45 100% 60%",
      input: "0 0% 20%",
      ring: "45 100% 60%",
      chart1: "45 100% 60%",
      chart2: "340 82% 52%",
      chart3: "200 100% 60%",
      chart4: "120 60% 50%",
      chart5: "280 70% 60%",
    },
  },
  pastelDreams: {
    name: "Pastel Dreams",
    light: {
      background: "270 30% 99%",
      foreground: "270 30% 15%",
      card: "270 25% 98%",
      cardForeground: "270 30% 15%",
      popover: "270 25% 98%",
      popoverForeground: "270 30% 15%",
      primary: "270 60% 70%",
      primaryForeground: "270 100% 10%",
      secondary: "200 60% 92%",
      secondaryForeground: "200 60% 25%",
      muted: "320 30% 95%",
      mutedForeground: "270 20% 45%",
      accent: "340 60% 88%",
      accentForeground: "340 60% 25%",
      destructive: "0 65% 65%",
      destructiveForeground: "0 0% 100%",
      border: "270 25% 90%",
      input: "270 25% 90%",
      ring: "270 60% 70%",
      chart1: "270 60% 70%",
      chart2: "200 55% 70%",
      chart3: "340 50% 75%",
      chart4: "160 45% 65%",
      chart5: "40 55% 75%",
    },
    dark: {
      background: "270 35% 8%",
      foreground: "270 20% 95%",
      card: "270 30% 12%",
      cardForeground: "270 20% 95%",
      popover: "270 30% 12%",
      popoverForeground: "270 20% 95%",
      primary: "270 55% 65%",
      primaryForeground: "270 100% 10%",
      secondary: "270 20% 20%",
      secondaryForeground: "270 20% 95%",
      muted: "270 20% 18%",
      mutedForeground: "270 15% 60%",
      accent: "270 25% 22%",
      accentForeground: "270 20% 95%",
      destructive: "0 55% 45%",
      destructiveForeground: "0 0% 100%",
      border: "270 20% 18%",
      input: "270 20% 18%",
      ring: "270 55% 65%",
      chart1: "270 55% 65%",
      chart2: "200 50% 60%",
      chart3: "340 45% 65%",
      chart4: "160 40% 55%",
      chart5: "40 50% 65%",
    },
  },
};

type ThemePresetKey = keyof typeof themePresets;
const themePresetNames = Object.keys(themePresets) as ThemePresetKey[];

// Helper to convert HSL string to hex
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

// Helper to convert hex to HSL string
function hexToHsl(hex: string): string {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) return "0 0% 0%";

  let r = parseInt(result[1], 16) / 255;
  let g = parseInt(result[2], 16) / 255;
  let b = parseInt(result[3], 16) / 255;

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
  chart1: string;
  chart2: string;
  chart3: string;
  chart4: string;
  chart5: string;
}

export default function ThemeGeneratorPage() {
  const [selectedTheme, setSelectedTheme] = useState<ThemePresetKey>("pastelDreams");
  const [mode, setMode] = useState<"light" | "dark">("light");
  const [colors, setColors] = useState<ColorConfig>(themePresets.pastelDreams.light);
  const [copied, setCopied] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(true);
  const [radius, setRadius] = useState(0.625);
  const [themeDropdownOpen, setThemeDropdownOpen] = useState(false);
  const [history, setHistory] = useState<ColorConfig[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [contrastIssues] = useState(4); // Mock contrast issues count
  const historyIndexRef = useRef(historyIndex);
  historyIndexRef.current = historyIndex;

  // Load theme colors when theme changes
  useEffect(() => {
    const theme = themePresets[selectedTheme];
    if (theme) {
      const themeColors = mode === "light" ? theme.light : theme.dark;
      setColors(themeColors);
      // Add to history using ref to avoid stale closure
      const currentIndex = historyIndexRef.current;
      setHistory(prev => [...prev.slice(0, currentIndex + 1), themeColors]);
      setHistoryIndex(currentIndex + 1);
    }
  }, [selectedTheme, mode]);

  // Apply colors to document root for live preview
  const applyColors = useCallback(() => {
    const root = document.documentElement;

    Object.entries(colors).forEach(([key, value]) => {
      const cssVar = key.replace(/([A-Z])/g, "-$1").toLowerCase();
      const varName = cssVar.startsWith("chart") ? `--chart-${cssVar.slice(-1)}` : `--${cssVar}`;
      root.style.setProperty(varName, value);
    });

    root.style.setProperty("--radius", `${radius}rem`);

    if (mode === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [colors, mode, radius]);

  useEffect(() => {
    applyColors();
  }, [applyColors]);

  const updateColor = (key: keyof ColorConfig, value: string) => {
    setColors(prev => ({ ...prev, [key]: value }));
  };

  const randomizeTheme = () => {
    const randomTheme = themePresetNames[Math.floor(Math.random() * themePresetNames.length)];
    setSelectedTheme(randomTheme);
  };

  const resetTheme = () => {
    setSelectedTheme("pastelDreams");
    setMode("light");
    setRadius(0.625);
    setHistory([]);
    setHistoryIndex(-1);
  };

  const undo = () => {
    if (historyIndex > 0) {
      setHistoryIndex(prev => prev - 1);
      setColors(history[historyIndex - 1]);
    }
  };

  const redo = () => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex(prev => prev + 1);
      setColors(history[historyIndex + 1]);
    }
  };

  const canUndo = historyIndex > 0;
  const canRedo = historyIndex < history.length - 1;

  // Convert HSL to OKLCH (simplified approximation)
  const hslToOklch = (hsl: string): string => {
    try {
      const parts = hsl.split(" ");
      const h = parseFloat(parts[0]) || 0;
      const s = (parseFloat(parts[1]?.replace("%", "")) || 0) / 100;
      const l = (parseFloat(parts[2]?.replace("%", "")) || 0) / 100;
      // Simplified OKLCH approximation
      const L = (l * 0.8 + 0.1).toFixed(2);
      const C = (s * 0.25).toFixed(2);
      const H = h.toFixed(2);
      return `oklch(${L} ${C} ${H})`;
    } catch {
      return "oklch(0.5 0.1 0)";
    }
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
    --chart-1: ${colors.chart1};
    --chart-2: ${colors.chart2};
    --chart-3: ${colors.chart3};
    --chart-4: ${colors.chart4};
    --chart-5: ${colors.chart5};
    --radius: ${radius}rem;
  }
}`;
    navigator.clipboard.writeText(css);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Color input component matching reference design
  const ColorInput = ({ label, colorKey }: { label: string; colorKey: keyof ColorConfig }) => {
    const value = colors[colorKey];
    const hexValue = hslToHex(value);
    const oklchValue = hslToOklch(value);

    return (
      <div className="py-2">
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-sm">{label}</span>
          <span className="text-xs text-muted-foreground font-mono">{hexValue}</span>
        </div>
        <div className="flex items-center gap-2">
          <div
            className="w-9 h-9 rounded-lg border cursor-pointer relative overflow-hidden flex-shrink-0"
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
            value={oklchValue}
            readOnly
            className="h-9 flex-1 text-xs font-mono bg-muted/50 rounded-lg"
          />
        </div>
      </div>
    );
  };

  // Collapsible section component matching reference design
  const ColorSection = ({ title, children, defaultOpen = false }: { title: string; children: React.ReactNode; defaultOpen?: boolean }) => {
    const [isOpen, setIsOpen] = useState(defaultOpen);
    return (
      <Collapsible open={isOpen} onOpenChange={setIsOpen} className="border rounded-xl overflow-hidden">
        <CollapsibleTrigger className="flex w-full items-center justify-between px-3 py-2.5 text-sm font-semibold hover:bg-muted/50 transition-colors">
          {title}
          <ChevronUp className={cn("h-4 w-4 transition-transform text-muted-foreground", !isOpen && "rotate-180")} />
        </CollapsibleTrigger>
        <CollapsibleContent className="px-3 pb-3">
          {children}
        </CollapsibleContent>
      </Collapsible>
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <SiteNavigation />

      <div className="flex">
        {/* Main Content */}
        <main className={cn(
          "flex-1 transition-all duration-300",
          drawerOpen ? "mr-[400px]" : ""
        )}>
          {/* Hero Section */}
          <section className="relative pt-16 pb-8 px-6">
            <div className="max-w-4xl mx-auto text-center">
              <Badge variant="secondary" className="mb-4">
                <Sparkles className="w-3 h-3 mr-1" />
                Visual Theme Generator
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
                Design Stunning UIs Faster with<br />
                <span className="text-primary">Shadcn Theme Generator</span>
              </h1>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-8">
                Transform your shadcn/ui components, blocks & templates in real time - customize, save, share & ship stunning interfaces faster than ever.
              </p>
              <div className="flex items-center justify-center gap-4">
                <Button onClick={() => setDrawerOpen(true)} size="lg" className="gap-2">
                  <Palette className="w-4 h-4" />
                  Start Customizing
                </Button>
                <Button variant="outline" size="lg">
                  Explore more
                </Button>
              </div>
            </div>
          </section>

          {/* Dashboard Preview */}
          <section className="px-6 pb-16">
            <div className="max-w-6xl mx-auto">
              <Card className="shadow-xl border-2 overflow-hidden">
                {/* Preview Header - Tabs */}
                <div className="flex items-center border-b bg-card">
                  <div className="flex-1">
                    <div className="flex">
                      {["Dashboard", "Blocks", "Mail", "Components", "Color Palette"].map((tab, i) => (
                        <button
                          key={tab}
                          className={cn(
                            "px-6 py-3 text-sm font-medium border-b-2 transition-colors",
                            i === 0
                              ? "border-primary text-foreground"
                              : "border-transparent text-muted-foreground hover:text-foreground"
                          )}
                        >
                          {tab}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Toolbar */}
                <div className="flex items-center justify-between px-4 py-2 border-b bg-card">
                  <div className="flex items-center gap-3">
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Menu className="h-4 w-4" />
                    </Button>
                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-muted text-muted-foreground text-sm">
                      <Search className="w-4 h-4" />
                      <span>Type to search...</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Sparkles className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Activity className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Mail className="h-4 w-4" />
                    </Button>
                    <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                      <Users className="w-4 h-4" />
                    </div>
                  </div>
                </div>

                {/* Dashboard Content */}
                <div className="p-6 bg-background">
                  {/* Row 1: 5 Stat Cards */}
                  <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
                    {[
                      { label: "Total Sales", value: "$13.4k", change: "+38%", up: true, period: "Last 6 months", icon: Mail, bgColor: "bg-orange-100 dark:bg-orange-900/30", iconColor: "text-orange-600" },
                      { label: "Total Orders", value: "155K", change: "+22%", up: true, period: "Last 4 months", icon: CreditCard, bgColor: "bg-teal-100 dark:bg-teal-900/30", iconColor: "text-teal-600" },
                      { label: "Total Profit", value: "$89.34k", change: "-16%", up: false, period: "Last One year", icon: CreditCard, bgColor: "bg-gray-100 dark:bg-gray-800", iconColor: "text-gray-600" },
                      { label: "Bookmarks", value: "$1,200", change: "+38%", up: true, period: "Last 6 months", icon: Activity, bgColor: "bg-purple-100 dark:bg-purple-900/30", iconColor: "text-purple-600" },
                    ].map((stat) => (
                      <Card key={stat.label}>
                        <CardContent className="p-4">
                          <div className="flex items-start justify-between mb-3">
                            <div className={cn("w-10 h-10 rounded-lg flex items-center justify-center", stat.bgColor)}>
                              <stat.icon className={cn("w-5 h-5", stat.iconColor)} />
                            </div>
                            <div className={cn("flex items-center gap-1 text-xs font-medium", stat.up ? "text-green-600" : "text-red-600")}>
                              {stat.change}
                              {stat.up ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                            </div>
                          </div>
                          <div className="text-2xl font-bold mb-1">{stat.value}</div>
                          <div className="text-sm text-muted-foreground">{stat.label}</div>
                          <Badge variant="secondary" className="text-[10px] mt-2">{stat.period}</Badge>
                        </CardContent>
                      </Card>
                    ))}
                    {/* Customers Card */}
                    <Card className="lg:col-span-1">
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <div className="text-sm font-medium mb-1">Customers</div>
                            <Badge variant="secondary" className="text-[10px] mb-3">Daily customers</Badge>
                            <div className="text-2xl font-bold">42.4k</div>
                            <span className="text-xs text-green-600">+9.2%</span>
                          </div>
                          <div className="w-16 h-16">
                            <svg viewBox="0 0 64 64" className="w-full h-full">
                              <circle cx="32" cy="20" r="12" fill="hsl(var(--muted))" />
                              <ellipse cx="32" cy="50" rx="20" ry="12" fill="hsl(var(--muted))" />
                              <circle cx="32" cy="18" r="8" fill="hsl(var(--foreground))" />
                              <path d="M20 45 Q32 35 44 45 Q44 55 32 55 Q20 55 20 45" fill="hsl(var(--foreground))" />
                            </svg>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Row 2: Charts */}
                  <div className="grid lg:grid-cols-3 gap-6 mb-6">
                    {/* Total Income Chart */}
                    <Card>
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
                        {/* Y-axis labels and Area Chart */}
                        <div className="flex">
                          <div className="flex flex-col justify-between text-[10px] text-muted-foreground pr-2 h-32">
                            <span>$6k</span>
                            <span>$5k</span>
                            <span>$4k</span>
                            <span>$3k</span>
                            <span>$2k</span>
                            <span>$1k</span>
                          </div>
                          <div className="flex-1 relative h-32">
                            <svg viewBox="0 0 200 80" className="w-full h-full" preserveAspectRatio="none">
                              <defs>
                                <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
                                  <stop offset="0%" stopColor="hsl(var(--chart-1))" stopOpacity="0.3" />
                                  <stop offset="100%" stopColor="hsl(var(--chart-1))" stopOpacity="0" />
                                </linearGradient>
                              </defs>
                              <path d="M0 60 Q30 40 50 50 T100 30 T150 45 T200 20 L200 80 L0 80 Z" fill="url(#areaGradient)" />
                              <path d="M0 60 Q30 40 50 50 T100 30 T150 45 T200 20" stroke="hsl(var(--chart-1))" strokeWidth="2" fill="none" />
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

                    {/* Report Card */}
                    <Card>
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
                          { label: "Income", value: "$5,550", change: "+2.34K", bgColor: "bg-blue-100 dark:bg-blue-900/30", iconColor: "text-blue-600" },
                          { label: "Expense", value: "$3,520", change: "-1.4K", bgColor: "bg-orange-100 dark:bg-orange-900/30", iconColor: "text-orange-600" },
                          { label: "Profit", value: "$2,350", change: "+3.22K", bgColor: "bg-green-100 dark:bg-green-900/30", iconColor: "text-green-600" },
                        ].map((item) => (
                          <div key={item.label} className="flex items-center gap-3 p-3 rounded-lg border bg-card">
                            <div className={cn("w-10 h-10 rounded-lg flex items-center justify-center", item.bgColor)}>
                              <CreditCard className={cn("w-5 h-5", item.iconColor)} />
                            </div>
                            <div className="flex-1">
                              <div className="text-sm text-muted-foreground">{item.label}</div>
                              <div className="font-semibold">{item.value}</div>
                            </div>
                            <div className={cn("text-sm font-medium", item.change.startsWith("+") ? "text-green-600" : "text-red-600")}>
                              {item.change}
                            </div>
                          </div>
                        ))}
                      </CardContent>
                    </Card>

                    {/* Monthly Campaign State */}
                    <Card>
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
                      <CardContent className="space-y-2">
                        {[
                          { label: "Emails", value: "14,250", change: "0.3%", icon: Mail },
                          { label: "Opened", value: "4,523", change: "3.1%", icon: Mail },
                          { label: "Clicked", value: "1,250", change: "1.3%", icon: Activity },
                          { label: "Subscribed", value: "750", change: "9.8%", icon: Users },
                          { label: "Errors", value: "20", change: "1.5%", icon: Activity },
                          { label: "Unsubscribed", value: "86", change: "0.6%", icon: Users },
                        ].map((stat) => (
                          <div key={stat.label} className="flex items-center justify-between py-1">
                            <div className="flex items-center gap-2">
                              <stat.icon className="w-4 h-4 text-muted-foreground" />
                              <span className="text-sm">{stat.label}</span>
                            </div>
                            <div className="flex items-center gap-3">
                              <span className="font-medium">{stat.value}</span>
                              <span className="text-xs text-muted-foreground w-10">{stat.change}</span>
                            </div>
                          </div>
                        ))}
                      </CardContent>
                    </Card>
                  </div>

                  {/* Row 3: More Cards */}
                  <div className="grid lg:grid-cols-3 gap-6">
                    {/* Total Earning */}
                    <Card>
                      <CardHeader className="pb-2">
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-base">Total earning</CardTitle>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-baseline gap-2 mb-4">
                          <span className="text-4xl font-bold">87%</span>
                          <span className="text-sm text-green-600 flex items-center">
                            <TrendingUp className="w-3 h-3 mr-1" />+38%
                          </span>
                        </div>
                        <div className="flex items-end gap-1 h-24">
                          {[40, 65, 45, 80, 55, 70, 50, 85, 60].map((h, i) => (
                            <div key={i} className="flex-1 flex flex-col items-center gap-1">
                              <div
                                className="w-full rounded-t"
                                style={{
                                  height: `${h}%`,
                                  backgroundColor: i === 4 ? "hsl(var(--chart-1))" : "hsl(var(--chart-4))"
                                }}
                              />
                            </div>
                          ))}
                        </div>
                        <Separator className="my-4" />
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <CreditCard className="w-4 h-4 text-muted-foreground" />
                              <span className="text-sm">Total revenue</span>
                            </div>
                            <span className="text-sm text-green-600">+$250</span>
                          </div>
                          <div className="text-xs text-muted-foreground">Successful payments</div>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <CreditCard className="w-4 h-4 text-muted-foreground" />
                              <span className="text-sm">Total sales</span>
                            </div>
                            <span className="text-sm text-green-600">+$80</span>
                          </div>
                          <div className="text-xs text-muted-foreground">Refund</div>
                        </div>
                      </CardContent>
                    </Card>

                    {/* For Business Shark */}
                    <Card>
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
                        <div className="text-sm font-medium mb-3">Choose a plan to get started</div>
                        <div className="space-y-2 mb-4">
                          {[
                            { name: "Branding", price: "$60" },
                            { name: "Marketing", price: "$120", selected: true },
                            { name: "Web Development", price: "$250" },
                            { name: "App Development", price: "$320" },
                          ].map((plan) => (
                            <div
                              key={plan.name}
                              className={cn(
                                "flex items-center justify-between p-3 rounded-lg border cursor-pointer transition-colors",
                                plan.selected ? "border-primary bg-primary/5" : "hover:bg-muted"
                              )}
                            >
                              <div className="flex items-center gap-3">
                                <div className={cn(
                                  "w-4 h-4 rounded-full border-2",
                                  plan.selected ? "border-primary bg-primary" : "border-muted-foreground"
                                )} />
                                <span className="text-sm">{plan.name}</span>
                              </div>
                              <span className="text-sm font-medium">{plan.price}</span>
                            </div>
                          ))}
                        </div>
                        <div className="flex justify-between text-sm mb-2">
                          <span className="text-muted-foreground">Taxes</span>
                          <span>$32</span>
                        </div>
                        <div className="flex justify-between text-sm font-medium mb-4">
                          <span>Total amount</span>
                          <span>$152</span>
                        </div>
                        <Button className="w-full">Pay now</Button>
                      </CardContent>
                    </Card>

                    {/* Vehicles Condition */}
                    <Card>
                      <CardHeader className="pb-2">
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-base">Vehicles Condition</CardTitle>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        {[
                          { label: "Excellent", value: "55%", sub: "12% increase", change: "+25%", color: "chart-1" },
                          { label: "Good", value: "20%", sub: "24 vehicles", change: "+30%", color: "chart-2" },
                          { label: "Average", value: "12%", sub: "182 Tasks", change: "-15%", color: "chart-3" },
                          { label: "Bad", value: "7%", sub: "9 vehicles", change: "+35%", color: "chart-4" },
                          { label: "Not Working", value: "4%", sub: "3 vehicles", change: "-2%", color: "chart-5" },
                          { label: "Scraped", value: "2%", sub: "2 vehicles", change: "+1%", color: "muted-foreground" },
                        ].map((item) => (
                          <div key={item.label} className="flex items-center gap-3">
                            <div className="relative w-10 h-10">
                              <svg viewBox="0 0 36 36" className="w-10 h-10 -rotate-90">
                                <circle cx="18" cy="18" r="14" fill="none" stroke="hsl(var(--muted))" strokeWidth="3" />
                                <circle
                                  cx="18"
                                  cy="18"
                                  r="14"
                                  fill="none"
                                  stroke={`hsl(var(--${item.color}))`}
                                  strokeWidth="3"
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
                            <Badge variant={item.change.startsWith("+") ? "default" : "destructive"} className="text-[10px]">
                              {item.change}
                            </Badge>
                          </div>
                        ))}
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </Card>
            </div>
          </section>

          {/* Basic Features Section */}
          <section className="px-6 py-16 bg-muted/30">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <Badge variant="secondary" className="mb-4">Basic Features</Badge>
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
                  Generate Shadcn Theme Effortlessly with Advanced Tools
                </h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Effortlessly customize, generate, and manage your shadcn/ui themes with our suite of advanced tools - designed to speed up your workflow with precision.
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Real-time Customization */}
                <Card className="group hover:shadow-lg transition-shadow overflow-hidden">
                  <CardContent className="p-6">
                    <div className="h-40 mb-4 rounded-lg bg-gradient-to-br from-primary/10 via-accent/10 to-secondary/10 flex items-center justify-center overflow-hidden">
                      <svg viewBox="0 0 200 120" className="w-full h-full p-4">
                        <rect x="10" y="10" width="80" height="50" rx="4" fill="hsl(var(--primary))" opacity="0.2" />
                        <rect x="15" y="15" width="70" height="10" rx="2" fill="hsl(var(--primary))" />
                        <rect x="15" y="30" width="50" height="6" rx="2" fill="hsl(var(--muted-foreground))" opacity="0.5" />
                        <rect x="15" y="40" width="60" height="6" rx="2" fill="hsl(var(--muted-foreground))" opacity="0.3" />
                        <rect x="110" y="10" width="80" height="50" rx="4" fill="hsl(var(--secondary))" />
                        <rect x="115" y="15" width="70" height="10" rx="2" fill="hsl(var(--primary))" />
                        <rect x="115" y="30" width="50" height="6" rx="2" fill="hsl(var(--muted-foreground))" opacity="0.5" />
                        <rect x="115" y="40" width="60" height="6" rx="2" fill="hsl(var(--muted-foreground))" opacity="0.3" />
                        <path d="M95 35 L105 35" stroke="hsl(var(--primary))" strokeWidth="2" strokeDasharray="2 2" />
                        <circle cx="100" cy="80" r="15" fill="hsl(var(--primary))" opacity="0.2" />
                        <path d="M95 80 L100 85 L110 75" stroke="hsl(var(--primary))" strokeWidth="2" fill="none" />
                      </svg>
                    </div>
                    <h3 className="font-semibold text-lg mb-2">Real-time Customization</h3>
                    <p className="text-sm text-muted-foreground">
                      See your shadcn components transform instantly as you experiment with styles in real time.
                    </p>
                  </CardContent>
                </Card>

                {/* Color Mastery */}
                <Card className="group hover:shadow-lg transition-shadow overflow-hidden">
                  <CardContent className="p-6">
                    <div className="h-40 mb-4 rounded-lg bg-gradient-to-br from-chart-1/10 via-chart-2/10 to-chart-3/10 flex items-center justify-center overflow-hidden">
                      <svg viewBox="0 0 200 120" className="w-full h-full p-4">
                        <circle cx="60" cy="50" r="30" fill="hsl(var(--chart-1))" opacity="0.8" />
                        <circle cx="100" cy="50" r="30" fill="hsl(var(--chart-2))" opacity="0.8" />
                        <circle cx="140" cy="50" r="30" fill="hsl(var(--chart-3))" opacity="0.8" />
                        <rect x="40" y="90" width="120" height="20" rx="10" fill="hsl(var(--muted))" />
                        <circle cx="60" cy="100" r="6" fill="hsl(var(--chart-1))" />
                        <circle cx="100" cy="100" r="6" fill="hsl(var(--chart-2))" />
                        <circle cx="140" cy="100" r="6" fill="hsl(var(--chart-3))" />
                      </svg>
                    </div>
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-semibold text-lg">Color Mastery</h3>
                      <Badge variant="outline" className="text-[10px]">Primary Color</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Play with background, text, and border hues using a sleek color picker for a unified design.
                    </p>
                  </CardContent>
                </Card>

                {/* Typography Fine-Tuning */}
                <Card className="group hover:shadow-lg transition-shadow overflow-hidden">
                  <CardContent className="p-6">
                    <div className="h-40 mb-4 rounded-lg bg-gradient-to-br from-primary/5 to-muted/20 flex items-center justify-center overflow-hidden">
                      <svg viewBox="0 0 200 120" className="w-full h-full p-4">
                        <text x="20" y="35" fontSize="24" fontWeight="bold" fill="hsl(var(--foreground))">Heading 1</text>
                        <text x="20" y="55" fontSize="18" fontWeight="600" fill="hsl(var(--foreground))" opacity="0.8">Heading 2</text>
                        <text x="20" y="72" fontSize="14" fontWeight="500" fill="hsl(var(--foreground))" opacity="0.6">Heading 3</text>
                        <text x="20" y="88" fontSize="12" fill="hsl(var(--muted-foreground))">Paragraph text</text>
                        <rect x="130" y="20" width="50" height="8" rx="4" fill="hsl(var(--primary))" opacity="0.3" />
                        <rect x="130" y="35" width="40" height="6" rx="3" fill="hsl(var(--primary))" opacity="0.2" />
                        <rect x="130" y="48" width="45" height="6" rx="3" fill="hsl(var(--primary))" opacity="0.15" />
                      </svg>
                    </div>
                    <div className="flex items-center gap-2 mb-2">
                      <Badge className="text-[10px]">Typo</Badge>
                      <h3 className="font-semibold text-lg">Typography Fine-Tuning</h3>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Perfect your text with adjustable font sizes, weights, and transformations for a polished look.
                    </p>
                  </CardContent>
                </Card>

                {/* Import/Export Themes */}
                <Card className="group hover:shadow-lg transition-shadow overflow-hidden">
                  <CardContent className="p-6">
                    <div className="h-40 mb-4 rounded-lg bg-gradient-to-br from-secondary/20 to-accent/10 flex items-center justify-center overflow-hidden">
                      <svg viewBox="0 0 200 120" className="w-full h-full p-4">
                        <rect x="20" y="30" width="60" height="60" rx="8" fill="hsl(var(--card))" stroke="hsl(var(--border))" strokeWidth="2" />
                        <text x="35" y="55" fontSize="8" fill="hsl(var(--muted-foreground))">Your Project</text>
                        <text x="35" y="70" fontSize="8" fill="hsl(var(--muted-foreground))">Figma File</text>
                        <rect x="120" y="30" width="60" height="60" rx="8" fill="hsl(var(--primary))" opacity="0.1" stroke="hsl(var(--primary))" strokeWidth="2" />
                        <text x="125" y="55" fontSize="8" fill="hsl(var(--primary))">Theme</text>
                        <text x="125" y="70" fontSize="8" fill="hsl(var(--primary))">Generator</text>
                        <path d="M85 50 L115 50" stroke="hsl(var(--primary))" strokeWidth="2" markerEnd="url(#arrow)" />
                        <path d="M115 70 L85 70" stroke="hsl(var(--primary))" strokeWidth="2" markerEnd="url(#arrow)" />
                        <text x="88" y="45" fontSize="8" fill="hsl(var(--primary))">Import</text>
                        <text x="88" y="85" fontSize="8" fill="hsl(var(--primary))">Export</text>
                      </svg>
                    </div>
                    <h3 className="font-semibold text-lg mb-2">Import/Export Themes</h3>
                    <p className="text-sm text-muted-foreground">
                      Easily import & export your custom Shadcn themes to backup your designs, and move them between projects effortlessly.
                    </p>
                  </CardContent>
                </Card>

                {/* Theme Starters */}
                <Card className="group hover:shadow-lg transition-shadow overflow-hidden md:col-span-2 lg:col-span-2">
                  <CardContent className="p-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h3 className="font-semibold text-lg mb-2">Stunning Theme Starters</h3>
                        <p className="text-sm text-muted-foreground mb-4">
                          Kick off with gorgeous pre-built themes and customize light or dark modes in a breeze.
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {["Spotify", "Neo Brutalism", "Marshmallow", "Art Deco", "Claude"].map((theme) => (
                            <Badge key={theme} variant="secondary" className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors">
                              {theme}
                            </Badge>
                          ))}
                        </div>
                        <div className="flex gap-2 mt-4">
                          <Button size="sm" variant="outline" className="gap-1">
                            <Sun className="w-3 h-3" />
                            Light Mode
                          </Button>
                          <Button size="sm" variant="outline" className="gap-1">
                            <Moon className="w-3 h-3" />
                            Dark Mode
                          </Button>
                        </div>
                      </div>
                      <div className="h-40 rounded-lg bg-gradient-to-br from-chart-4/20 via-chart-5/20 to-chart-1/20 flex items-center justify-center">
                        <svg viewBox="0 0 200 100" className="w-full h-full p-4">
                          <rect x="10" y="10" width="40" height="30" rx="4" fill="hsl(var(--chart-1))" />
                          <rect x="55" y="10" width="40" height="30" rx="4" fill="hsl(var(--chart-2))" />
                          <rect x="100" y="10" width="40" height="30" rx="4" fill="hsl(var(--chart-3))" />
                          <rect x="145" y="10" width="40" height="30" rx="4" fill="hsl(var(--chart-4))" />
                          <rect x="10" y="50" width="85" height="40" rx="4" fill="hsl(var(--card))" stroke="hsl(var(--border))" />
                          <rect x="105" y="50" width="80" height="40" rx="4" fill="hsl(var(--primary))" opacity="0.1" stroke="hsl(var(--primary))" />
                        </svg>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>

          {/* How It Works Section */}
          <section className="px-6 py-16">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <Badge variant="secondary" className="mb-4">How It Works</Badge>
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
                  Easy Steps, Stunning Themes
                </h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Import themes or choose presets, customize visually, use AI to enhance your design, and easily export or copy to integrate into your project.
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                {[
                  {
                    step: "01",
                    title: "Import theme or select preset",
                    description: "Start your design by importing a theme or choosing from theme presets. Apply instantly to customize and align with your goals.",
                    icon: (
                      <svg viewBox="0 0 60 60" className="w-12 h-12">
                        <rect x="10" y="10" width="40" height="40" rx="8" fill="hsl(var(--primary))" opacity="0.1" />
                        <path d="M30 20 L30 40 M22 32 L30 40 L38 32" stroke="hsl(var(--primary))" strokeWidth="2" fill="none" strokeLinecap="round" />
                      </svg>
                    ),
                  },
                  {
                    step: "02",
                    title: "Customize visually with AI",
                    description: "Transform your Shadcn components visually in real time with AI. Fine-tune colors, typography, and styles for a personalized design.",
                    icon: (
                      <svg viewBox="0 0 60 60" className="w-12 h-12">
                        <rect x="10" y="10" width="40" height="40" rx="8" fill="hsl(var(--primary))" opacity="0.1" />
                        <circle cx="25" cy="30" r="8" fill="hsl(var(--chart-1))" />
                        <circle cx="35" cy="30" r="8" fill="hsl(var(--chart-2))" />
                        <path d="M42 20 L46 24 L42 28" stroke="hsl(var(--primary))" strokeWidth="2" fill="none" strokeLinecap="round" />
                      </svg>
                    ),
                  },
                  {
                    step: "03",
                    title: "Save, Share & Export",
                    description: "Save your custom themes & collaborate, sync across devices, and share with teammates. Export your theme or copy the code for quick implementation.",
                    icon: (
                      <svg viewBox="0 0 60 60" className="w-12 h-12">
                        <rect x="10" y="10" width="40" height="40" rx="8" fill="hsl(var(--primary))" opacity="0.1" />
                        <rect x="18" y="22" width="24" height="16" rx="2" fill="none" stroke="hsl(var(--primary))" strokeWidth="2" />
                        <path d="M22 30 L26 34 L38 22" stroke="hsl(var(--primary))" strokeWidth="2" fill="none" strokeLinecap="round" />
                      </svg>
                    ),
                  },
                ].map((item, i) => (
                  <Card key={i} className="relative overflow-hidden group hover:shadow-lg transition-shadow">
                    <div className="absolute top-4 right-4 text-6xl font-bold text-primary/5 group-hover:text-primary/10 transition-colors">
                      {item.step}
                    </div>
                    <CardContent className="p-6 pt-8">
                      <div className="mb-4">{item.icon}</div>
                      <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                      <p className="text-sm text-muted-foreground">{item.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>

          {/* Pro Features Section */}
          <section className="px-6 py-16 bg-muted/30">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <Badge className="mb-4">Pro Features</Badge>
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
                  AI-Powered <span className="text-primary">Shadcn Theme Generation</span>
                </h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Harness cutting-edge AI to craft beautiful, well-balanced themes, enhanced with powerful features for PRO customization.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {/* AI Theme Generation */}
                <Card className="overflow-hidden">
                  <CardContent className="p-6">
                    <div className="h-48 mb-4 rounded-lg bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center">
                      <svg viewBox="0 0 240 140" className="w-full h-full p-4">
                        <rect x="10" y="10" width="220" height="120" rx="8" fill="hsl(var(--card))" stroke="hsl(var(--border))" />
                        <rect x="20" y="20" width="80" height="10" rx="2" fill="hsl(var(--primary))" opacity="0.3" />
                        <text x="20" y="50" fontSize="8" fill="hsl(var(--muted-foreground))">AI Theme Generator</text>
                        <rect x="20" y="60" width="200" height="30" rx="4" fill="hsl(var(--muted))" />
                        <text x="30" y="80" fontSize="8" fill="hsl(var(--muted-foreground))">Create a monochrome manga-inspired theme...</text>
                        <rect x="20" y="100" width="60" height="20" rx="4" fill="hsl(var(--primary))" />
                        <text x="35" y="114" fontSize="8" fill="hsl(var(--primary-foreground))">Generate</text>
                        <circle cx="200" cy="110" r="10" fill="hsl(var(--chart-1))" opacity="0.5" />
                        <path d="M196 110 L200 114 L208 106" stroke="hsl(var(--primary-foreground))" strokeWidth="1.5" fill="none" />
                      </svg>
                    </div>
                    <h3 className="font-semibold text-lg mb-2">AI Theme Generation</h3>
                    <p className="text-sm text-muted-foreground">
                      Generate stunning themes with AI prompts, reference designs with @Theme, and track progress with checkpoints.
                    </p>
                  </CardContent>
                </Card>

                {/* Color Contrast Validation */}
                <Card className="overflow-hidden">
                  <CardContent className="p-6">
                    <div className="h-48 mb-4 rounded-lg bg-gradient-to-br from-chart-2/10 to-chart-3/10 flex items-center justify-center">
                      <svg viewBox="0 0 240 140" className="w-full h-full p-4">
                        <rect x="10" y="10" width="100" height="60" rx="4" fill="hsl(var(--secondary))" />
                        <text x="20" y="30" fontSize="8" fill="hsl(var(--muted-foreground))">Secondary</text>
                        <text x="20" y="50" fontSize="16" fontWeight="bold" fill="hsl(var(--chart-2))">16.44 ✓</text>
                        <rect x="130" y="10" width="100" height="60" rx="4" fill="hsl(var(--primary))" />
                        <text x="140" y="30" fontSize="8" fill="hsl(var(--primary-foreground))">Primary</text>
                        <text x="140" y="50" fontSize="16" fontWeight="bold" fill="hsl(var(--chart-2))">17.18 ✓</text>
                        <rect x="10" y="80" width="100" height="50" rx="4" fill="hsl(var(--destructive))" />
                        <text x="20" y="100" fontSize="8" fill="hsl(var(--destructive-foreground))">Destructive</text>
                        <text x="20" y="120" fontSize="14" fontWeight="bold" fill="hsl(var(--chart-4))">4.77 ✓</text>
                        <rect x="130" y="80" width="100" height="50" rx="4" fill="hsl(var(--card))" stroke="hsl(var(--border))" />
                        <text x="140" y="95" fontSize="7" fill="hsl(var(--muted-foreground))">WCAG AAA</text>
                        <text x="140" y="115" fontSize="12" fill="hsl(var(--foreground))">Aa Sample</text>
                      </svg>
                    </div>
                    <h3 className="font-semibold text-lg mb-2">Color Contrast Validation</h3>
                    <p className="text-sm text-muted-foreground">
                      Instantly check your theme's color contrast for WCAG compliance and ensure accessibility with real-time feedback.
                    </p>
                  </CardContent>
                </Card>

                {/* Theme Sharing */}
                <Card className="overflow-hidden">
                  <CardContent className="p-6">
                    <div className="h-48 mb-4 rounded-lg bg-gradient-to-br from-chart-4/10 to-chart-5/10 flex items-center justify-center">
                      <svg viewBox="0 0 240 140" className="w-full h-full p-4">
                        <circle cx="60" cy="70" r="25" fill="hsl(var(--primary))" opacity="0.2" />
                        <circle cx="60" cy="70" r="15" fill="hsl(var(--primary))" />
                        <circle cx="120" cy="40" r="20" fill="hsl(var(--chart-1))" opacity="0.2" />
                        <circle cx="120" cy="40" r="12" fill="hsl(var(--chart-1))" />
                        <circle cx="180" cy="70" r="25" fill="hsl(var(--chart-2))" opacity="0.2" />
                        <circle cx="180" cy="70" r="15" fill="hsl(var(--chart-2))" />
                        <circle cx="120" cy="100" r="20" fill="hsl(var(--chart-3))" opacity="0.2" />
                        <circle cx="120" cy="100" r="12" fill="hsl(var(--chart-3))" />
                        <path d="M75 60 L105 48" stroke="hsl(var(--border))" strokeWidth="2" />
                        <path d="M135 48 L165 60" stroke="hsl(var(--border))" strokeWidth="2" />
                        <path d="M75 80 L105 92" stroke="hsl(var(--border))" strokeWidth="2" />
                        <path d="M135 92 L165 80" stroke="hsl(var(--border))" strokeWidth="2" />
                      </svg>
                    </div>
                    <h3 className="font-semibold text-lg mb-2">Theme Sharing & Collaboration</h3>
                    <p className="text-sm text-muted-foreground">
                      Effortlessly save & share your themes with colleagues or the community, enabling collaboration and feedback on your designs.
                    </p>
                  </CardContent>
                </Card>

                {/* Undo/Redo */}
                <Card className="overflow-hidden">
                  <CardContent className="p-6">
                    <div className="h-48 mb-4 rounded-lg bg-gradient-to-br from-muted/50 to-accent/10 flex items-center justify-center">
                      <svg viewBox="0 0 240 140" className="w-full h-full p-4">
                        <rect x="60" y="40" width="120" height="60" rx="8" fill="hsl(var(--card))" stroke="hsl(var(--border))" />
                        <rect x="75" y="55" width="90" height="30" rx="4" fill="hsl(var(--muted))" />
                        <text x="95" y="75" fontSize="10" fill="hsl(var(--muted-foreground))">30 changes</text>
                        <g transform="translate(40, 70)">
                          <circle r="18" fill="hsl(var(--primary))" opacity="0.1" />
                          <path d="M-8 0 A8 8 0 1 1 8 0" stroke="hsl(var(--primary))" strokeWidth="2" fill="none" />
                          <path d="M-10 -4 L-8 0 L-4 -4" stroke="hsl(var(--primary))" strokeWidth="2" fill="none" />
                        </g>
                        <g transform="translate(200, 70)">
                          <circle r="18" fill="hsl(var(--primary))" opacity="0.1" />
                          <path d="M8 0 A8 8 0 1 0 -8 0" stroke="hsl(var(--primary))" strokeWidth="2" fill="none" />
                          <path d="M10 -4 L8 0 L4 -4" stroke="hsl(var(--primary))" strokeWidth="2" fill="none" />
                        </g>
                        <text x="30" y="105" fontSize="8" fill="hsl(var(--muted-foreground))">Undo</text>
                        <text x="190" y="105" fontSize="8" fill="hsl(var(--muted-foreground))">Redo</text>
                      </svg>
                    </div>
                    <h3 className="font-semibold text-lg mb-2">Undo & Redo Changes</h3>
                    <p className="text-sm text-muted-foreground">
                      Keep track of your customizations with our powerful undo/redo system that remembers your last 30 changes.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>

          {/* Impact Section */}
          <section className="px-6 py-16">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <Badge variant="secondary" className="mb-4">Impact</Badge>
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
                  shadcn/studio <span className="text-primary">Impact</span>
                </h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Join thousands of developers who are building stunning interfaces with our theme generator.
                </p>
              </div>

              <div className="grid md:grid-cols-4 gap-6">
                {[
                  { value: "10K+", label: "Active Users", description: "Developers using our tools" },
                  { value: "50K+", label: "Themes Created", description: "Custom themes generated" },
                  { value: "99%", label: "Satisfaction", description: "User satisfaction rate" },
                  { value: "24/7", label: "Support", description: "Available around the clock" },
                ].map((stat) => (
                  <Card key={stat.label} className="text-center">
                    <CardContent className="p-6">
                      <div className="text-4xl font-bold text-primary mb-2">{stat.value}</div>
                      <div className="font-semibold mb-1">{stat.label}</div>
                      <div className="text-sm text-muted-foreground">{stat.description}</div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>

          {/* Wall of Love Section */}
          <section className="px-6 py-16 bg-muted/30">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <Badge variant="secondary" className="mb-4">Testimonials</Badge>
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
                  The Wall of <span className="text-primary">Love</span>
                </h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  See what developers are saying about shadcn/studio Theme Generator.
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                {[
                  {
                    name: "Sarah Chen",
                    role: "Frontend Developer",
                    company: "TechCorp",
                    avatar: "SC",
                    content: "The theme generator has completely transformed my workflow. I can create beautiful, consistent themes in minutes instead of hours.",
                  },
                  {
                    name: "Marcus Johnson",
                    role: "UI/UX Designer",
                    company: "DesignStudio",
                    avatar: "MJ",
                    content: "Finally, a tool that understands both design and development. The real-time preview is a game-changer for my projects.",
                  },
                  {
                    name: "Elena Rodriguez",
                    role: "Full Stack Developer",
                    company: "StartupXYZ",
                    avatar: "ER",
                    content: "I've tried many theme generators, but this one stands out. The AI features and WCAG compliance checking are incredibly useful.",
                  },
                  {
                    name: "David Kim",
                    role: "Product Designer",
                    company: "InnovateLab",
                    avatar: "DK",
                    content: "The preset themes are gorgeous, and the customization options are endless. This tool has become essential in my design toolkit.",
                  },
                  {
                    name: "Lisa Wang",
                    role: "Senior Developer",
                    company: "CloudScale",
                    avatar: "LW",
                    content: "Being able to export themes directly to my shadcn/ui project saves so much time. Highly recommend for any shadcn user.",
                  },
                  {
                    name: "James Miller",
                    role: "Tech Lead",
                    company: "DevAgency",
                    avatar: "JM",
                    content: "Our team's productivity has skyrocketed since we started using this. The collaboration features make it easy to share themes.",
                  },
                ].map((testimonial) => (
                  <Card key={testimonial.name} className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold">
                          {testimonial.avatar}
                        </div>
                        <div>
                          <div className="font-semibold">{testimonial.name}</div>
                          <div className="text-sm text-muted-foreground">{testimonial.role} at {testimonial.company}</div>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed">"{testimonial.content}"</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>

          {/* Pricing Section */}
          <section className="px-6 py-16">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <Badge variant="secondary" className="mb-4">Pricing</Badge>
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
                  Simple <span className="text-primary">Pricing</span>
                </h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Choose the plan that works best for you. Start free and upgrade when you need more.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {/* Free Plan */}
                <Card>
                  <CardContent className="p-6">
                    <div className="mb-6">
                      <h3 className="font-semibold text-xl mb-2">Free</h3>
                      <div className="flex items-baseline gap-1">
                        <span className="text-4xl font-bold">$0</span>
                        <span className="text-muted-foreground">/month</span>
                      </div>
                      <p className="text-sm text-muted-foreground mt-2">Perfect for getting started</p>
                    </div>
                    <ul className="space-y-3 mb-6">
                      {[
                        "Real-time theme preview",
                        "10+ preset themes",
                        "Basic color customization",
                        "Export to CSS",
                        "Light & dark mode",
                      ].map((feature) => (
                        <li key={feature} className="flex items-center gap-2 text-sm">
                          <Check className="w-4 h-4 text-primary flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <Button variant="outline" className="w-full">Get Started</Button>
                  </CardContent>
                </Card>

                {/* Pro Plan */}
                <Card className="border-primary relative">
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <Badge className="bg-primary">Most Popular</Badge>
                  </div>
                  <CardContent className="p-6">
                    <div className="mb-6">
                      <h3 className="font-semibold text-xl mb-2">Pro</h3>
                      <div className="flex items-baseline gap-1">
                        <span className="text-4xl font-bold">$19</span>
                        <span className="text-muted-foreground">/month</span>
                      </div>
                      <p className="text-sm text-muted-foreground mt-2">For professionals and teams</p>
                    </div>
                    <ul className="space-y-3 mb-6">
                      {[
                        "Everything in Free",
                        "AI theme generation",
                        "WCAG contrast validation",
                        "Unlimited saved themes",
                        "Theme sharing & collaboration",
                        "Priority support",
                        "Early access to new features",
                      ].map((feature) => (
                        <li key={feature} className="flex items-center gap-2 text-sm">
                          <Check className="w-4 h-4 text-primary flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <Button className="w-full">Upgrade to Pro</Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>

          {/* Featured In Section */}
          <section className="px-6 py-16 bg-muted/30">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <Badge variant="secondary" className="mb-4">Featured In</Badge>
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
                  Trusted by <span className="text-primary">Developers</span>
                </h2>
              </div>

              <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
                {["Vercel", "Next.js", "React", "Tailwind", "TypeScript", "GitHub"].map((logo) => (
                  <div key={logo} className="text-xl font-bold text-muted-foreground">
                    {logo}
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* FAQ Section */}
          <section className="px-6 py-16">
            <div className="max-w-3xl mx-auto">
              <div className="text-center mb-12">
                <Badge variant="secondary" className="mb-4">FAQ</Badge>
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
                  Any <span className="text-primary">Questions?</span>
                </h2>
                <p className="text-muted-foreground">
                  Find answers to commonly asked questions about shadcn/studio Theme Generator.
                </p>
              </div>

              <div className="space-y-3">
                {[
                  {
                    question: "What is shadcn/studio Theme Generator?",
                    answer: "shadcn/studio Theme Generator is a powerful tool that allows you to create, customize, and export themes for shadcn/ui components. It provides real-time preview, AI-powered generation, and WCAG compliance checking.",
                  },
                  {
                    question: "Is it compatible with my existing shadcn/ui project?",
                    answer: "Yes! The theme generator exports standard CSS custom properties that work directly with any shadcn/ui project. Simply copy the generated CSS and paste it into your globals.css file.",
                  },
                  {
                    question: "Can I use it for commercial projects?",
                    answer: "Absolutely! Both free and pro plans allow commercial use. The pro plan offers additional features like AI generation and team collaboration.",
                  },
                  {
                    question: "How does the AI theme generation work?",
                    answer: "Our AI analyzes your text prompts and reference designs to generate harmonious color palettes. You can describe the mood, style, or reference existing themes to create unique designs.",
                  },
                  {
                    question: "Can I share themes with my team?",
                    answer: "Pro users can save unlimited themes to the cloud and share them with team members. Free users can export themes as CSS files to share manually.",
                  },
                ].map((faq, i) => (
                  <Collapsible key={i} className="border rounded-lg group">
                    <CollapsibleTrigger className="flex w-full items-center justify-between px-4 py-3 text-left font-medium hover:bg-muted/50 transition-colors [&[data-state=open]>svg]:rotate-180">
                      {faq.question}
                      <ChevronDown className="h-4 w-4 text-muted-foreground transition-transform" />
                    </CollapsibleTrigger>
                    <CollapsibleContent className="px-4 pb-4 text-sm text-muted-foreground">
                      {faq.answer}
                    </CollapsibleContent>
                  </Collapsible>
                ))}
              </div>
            </div>
          </section>

          {/* Newsletter Section */}
          <section className="px-6 py-16 bg-muted/30">
            <div className="max-w-2xl mx-auto text-center">
              <Badge variant="secondary" className="mb-4">Newsletter</Badge>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
                Stay Updated with <span className="text-primary">Shadcn Studio</span>
              </h2>
              <p className="text-muted-foreground mb-8">
                Subscribe to our newsletter for the latest updates, tips, and new features.
              </p>
              <div className="flex gap-3 max-w-md mx-auto">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1"
                />
                <Button>Subscribe</Button>
              </div>
              <p className="text-xs text-muted-foreground mt-4">
                No spam, unsubscribe at any time.
              </p>
            </div>
          </section>

          {/* Footer */}
          <footer className="px-6 py-8 border-t">
            <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-primary" />
                <span className="font-semibold">shadcn/studio</span>
              </div>
              <p className="text-sm text-muted-foreground">
                © 2024 shadcn/studio. Made for better web design.
              </p>
              <div className="flex items-center gap-4">
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                </Button>
              </div>
            </div>
          </footer>
        </main>

        {/* Theme Generator Drawer */}
        {drawerOpen && (
          <aside className="fixed top-[64px] right-0 h-[calc(100vh-64px)] w-[400px] border-l border-dashed border-primary/30 bg-gradient-to-b from-primary/5 to-background z-40 flex flex-col">
            {/* Drawer Header */}
            <div className="flex items-center justify-between px-4 py-3">
              <span className="text-base font-semibold">Theme Generator</span>
              <Button variant="ghost" size="icon" className="h-7 w-7 rounded-lg" onClick={() => setDrawerOpen(false)}>
                <X className="h-4 w-4" />
              </Button>
            </div>

            {/* Drawer Content */}
            <div className="flex-1 overflow-y-auto px-4 pb-4 space-y-4">
              {/* Copy Button */}
              <Button
                variant="outline"
                className="w-full h-10 rounded-full gap-2"
                onClick={copyCSS}
              >
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                {copied ? "Copied!" : "Copy"}
              </Button>

              {/* Undo/Redo/Reset Row */}
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  className="h-10 w-14 rounded-full"
                  onClick={undo}
                  disabled={!canUndo}
                >
                  <Undo2 className="w-4 h-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-10 w-14 rounded-full"
                  onClick={redo}
                  disabled={!canRedo}
                >
                  <Redo2 className="w-4 h-4" />
                </Button>
                <Button
                  variant="outline"
                  className="flex-1 h-10 rounded-full gap-2"
                  onClick={resetTheme}
                >
                  <RotateCcw className="w-4 h-4" />
                  Reset
                </Button>
              </div>

              {/* Mode Section */}
              <div>
                <Label className="text-sm font-semibold mb-2 block">Mode</Label>
                <div className="flex gap-2">
                  <button
                    onClick={() => setMode("light")}
                    className={cn(
                      "flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-medium transition-all",
                      mode === "light"
                        ? "bg-primary/10 border-primary text-primary"
                        : "border-border hover:border-primary/50"
                    )}
                  >
                    <Sun className="w-4 h-4" />
                    Light
                  </button>
                  <button
                    onClick={() => setMode("dark")}
                    className={cn(
                      "flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-medium transition-all",
                      mode === "dark"
                        ? "bg-primary/10 border-primary text-primary"
                        : "border-border hover:border-primary/50"
                    )}
                  >
                    <Moon className="w-4 h-4" />
                    Dark
                  </button>
                </div>
              </div>

              {/* Themes Section */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Label className="text-sm font-semibold">Themes</Label>
                  <Button variant="outline" size="sm" className="h-8 rounded-full gap-1.5 text-xs px-3">
                    <Upload className="w-3.5 h-3.5" />
                    Import
                  </Button>
                  <Button variant="outline" size="sm" className="h-8 rounded-full gap-1.5 text-xs px-3" onClick={randomizeTheme}>
                    <Shuffle className="w-3.5 h-3.5" />
                    Random
                  </Button>
                  <Button variant="outline" size="sm" className="h-8 rounded-full gap-1.5 text-xs px-3 relative">
                    <Contrast className="w-3.5 h-3.5" />
                    Contrast
                    {contrastIssues > 0 && (
                      <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-destructive text-destructive-foreground text-[10px] flex items-center justify-center">
                        {contrastIssues}
                      </span>
                    )}
                  </Button>
                </div>

                {/* Theme Dropdown */}
                <div className="relative mb-2">
                  <button
                    onClick={() => setThemeDropdownOpen(!themeDropdownOpen)}
                    className="w-full flex items-center justify-between px-3 py-2.5 rounded-full border hover:border-primary/50 transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      <div className="flex gap-0.5">
                        <div
                          className="w-3.5 h-3.5 rounded"
                          style={{ backgroundColor: `hsl(${themePresets[selectedTheme].light.primary})` }}
                        />
                        <div
                          className="w-3.5 h-3.5 rounded"
                          style={{ backgroundColor: `hsl(${themePresets[selectedTheme].light.secondary})` }}
                        />
                      </div>
                      <span className="text-sm font-medium">{themePresets[selectedTheme].name}</span>
                    </div>
                    <ChevronDown className={cn("w-4 h-4 transition-transform", themeDropdownOpen && "rotate-180")} />
                  </button>

                  {themeDropdownOpen && (
                    <div className="absolute top-full left-0 right-0 mt-1 bg-background border rounded-xl shadow-lg z-50 max-h-60 overflow-y-auto">
                      {themePresetNames.map((key) => {
                        const theme = themePresets[key];
                        const isSelected = selectedTheme === key;
                        return (
                          <button
                            key={key}
                            onClick={() => {
                              setSelectedTheme(key);
                              setThemeDropdownOpen(false);
                            }}
                            className={cn(
                              "w-full flex items-center gap-2 px-3 py-2 hover:bg-muted/50 transition-colors text-sm first:rounded-t-xl last:rounded-b-xl",
                              isSelected && "bg-primary/10"
                            )}
                          >
                            <div className="flex gap-0.5">
                              <div
                                className="w-3.5 h-3.5 rounded"
                                style={{ backgroundColor: `hsl(${theme.light.primary})` }}
                              />
                              <div
                                className="w-3.5 h-3.5 rounded"
                                style={{ backgroundColor: `hsl(${theme.light.secondary})` }}
                              />
                            </div>
                            <span className={cn("font-medium", isSelected && "text-primary")}>{theme.name}</span>
                            {isSelected && <Check className="w-3.5 h-3.5 text-primary ml-auto" />}
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>

                {/* Hold to Save Theme Button */}
                <Button
                  variant="outline"
                  className="w-full h-9 rounded-full gap-2 bg-muted/30 text-sm"
                >
                  <Hand className="w-3.5 h-3.5" />
                  Hold to save theme
                </Button>

                {/* Upgrade to Pro Banner */}
                <div className="mt-2 p-2.5 rounded-xl bg-orange-100 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800">
                  <div className="flex items-start gap-2 text-orange-700 dark:text-orange-400">
                    <Lock className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" />
                    <span className="text-xs leading-tight">Upgrade to Pro to sync your themes across devices</span>
                  </div>
                </div>
              </div>

              {/* Color Tabs */}
              <Tabs defaultValue="colors" className="w-full">
                <TabsList className="w-full grid grid-cols-4 h-9 rounded-full p-1 bg-muted/50">
                  <TabsTrigger value="colors" className="rounded-full text-xs data-[state=active]:bg-background data-[state=active]:shadow-sm">Colors</TabsTrigger>
                  <TabsTrigger value="typography" className="rounded-full text-xs data-[state=active]:bg-background data-[state=active]:shadow-sm">Typography</TabsTrigger>
                  <TabsTrigger value="other" className="rounded-full text-xs data-[state=active]:bg-background data-[state=active]:shadow-sm">Other</TabsTrigger>
                  <TabsTrigger value="ai" className="rounded-full text-xs data-[state=active]:bg-background data-[state=active]:shadow-sm gap-0.5">
                    <Sparkles className="w-3 h-3" />
                    AI
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="colors" className="mt-4 space-y-2">
                  <ColorSection title="Brand Colors" defaultOpen>
                    <ColorInput label="Primary" colorKey="primary" />
                    <ColorInput label="Primary Foreground" colorKey="primaryForeground" />
                    <ColorInput label="Secondary" colorKey="secondary" />
                    <ColorInput label="Secondary Foreground" colorKey="secondaryForeground" />
                    <ColorInput label="Destructive" colorKey="destructive" />
                  </ColorSection>

                  <ColorSection title="Base Colors">
                    <ColorInput label="Background" colorKey="background" />
                    <ColorInput label="Foreground" colorKey="foreground" />
                    <ColorInput label="Card" colorKey="card" />
                    <ColorInput label="Card Foreground" colorKey="cardForeground" />
                    <ColorInput label="Popover" colorKey="popover" />
                    <ColorInput label="Popover Foreground" colorKey="popoverForeground" />
                  </ColorSection>

                  <ColorSection title="Other Colors">
                    <ColorInput label="Muted" colorKey="muted" />
                    <ColorInput label="Muted Foreground" colorKey="mutedForeground" />
                    <ColorInput label="Accent" colorKey="accent" />
                    <ColorInput label="Accent Foreground" colorKey="accentForeground" />
                    <ColorInput label="Border" colorKey="border" />
                    <ColorInput label="Input" colorKey="input" />
                    <ColorInput label="Ring" colorKey="ring" />
                  </ColorSection>

                  <ColorSection title="Chart Colors">
                    <ColorInput label="Chart 1" colorKey="chart1" />
                    <ColorInput label="Chart 2" colorKey="chart2" />
                    <ColorInput label="Chart 3" colorKey="chart3" />
                    <ColorInput label="Chart 4" colorKey="chart4" />
                    <ColorInput label="Chart 5" colorKey="chart5" />
                  </ColorSection>
                </TabsContent>

                <TabsContent value="typography" className="mt-4">
                  <div className="text-center py-8 text-muted-foreground">
                    <Type className="w-8 h-8 mx-auto mb-3 opacity-50" />
                    <p className="text-sm">Typography customization</p>
                    <p className="text-xs mt-1">Coming soon</p>
                  </div>
                </TabsContent>

                <TabsContent value="other" className="mt-4 space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Label>Border Radius</Label>
                      <span className="text-sm text-muted-foreground font-mono">{radius}rem</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.125"
                      value={radius}
                      onChange={(e) => setRadius(parseFloat(e.target.value))}
                      className="w-full accent-primary"
                    />
                  </div>
                </TabsContent>

                <TabsContent value="ai" className="mt-4">
                  <div className="text-center py-8 text-muted-foreground">
                    <Sparkles className="w-8 h-8 mx-auto mb-3 opacity-50" />
                    <p className="text-sm">AI Theme Generation</p>
                    <p className="text-xs mt-1">Coming soon</p>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </aside>
        )}

        {/* Toggle Button when drawer is closed */}
        {!drawerOpen && (
          <button
            onClick={() => setDrawerOpen(true)}
            className="fixed right-4 top-1/2 -translate-y-1/2 z-50 p-3 bg-primary text-primary-foreground rounded-full shadow-lg hover:bg-primary/90 transition-colors"
            title="Open Theme Generator"
          >
            <Palette className="w-5 h-5" />
          </button>
        )}
      </div>
    </div>
  );
}
