import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { ThemeCustomizerProvider } from "@/components/theme-customizer"

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" })

export const metadata: Metadata = {
  title: "Isaac Paredes - Product Designer Portfolio",
  description: "Case studies and portfolio of a product designer specializing in AI-powered platforms",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <body className="antialiased">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-background focus:text-foreground focus:rounded-md focus:border focus:border-border focus:shadow-lg"
        >
          Skip to main content
        </a>
        <ThemeProvider defaultTheme="neutral" defaultMode="system">
          <ThemeCustomizerProvider>
            {children}
          </ThemeCustomizerProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
