import type { Metadata, Viewport } from "next"
import { TanstackQueryProvider } from "@/components/TanstackQueryProvider"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { lexend } from "@/fonts"
import { cn } from "@/lib/utils"
import { TooltipProvider } from "@/components/ui/tooltip"
import { AuthProvider } from "@/components/auth-provider"
import { Toaster } from "@/components/ui/sonner"
/* ─────────────────────────────────────────────────────────────
   Root metadata — inherited by every page unless overridden
───────────────────────────────────────────────────────────── */
export const metadata: Metadata = {
  title: {
    default: "PCS Village Admin",
    template: "%s | PCS Village Admin",
  },
  description:
    "PCS Village Admin Portal — manage military bases, personnel, branch locations, subscriptions, and community resources all in one place.",
  keywords: [
    "PCS Village",
    "military admin",
    "base management",
    "military dashboard",
    "personnel management",
    "branch management",
  ],
  authors: [{ name: "PCS Village" }],
  creator: "PCS Village",
  metadataBase: new URL("https://admin.pcsvillage.com"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://admin.pcsvillage.com",
    siteName: "PCS Village Admin",
    title: "PCS Village Admin Portal",
    description:
      "Manage military bases, personnel, branch locations, and community resources from a single admin dashboard.",
    images: [
      {
        url: "/auth-banner.png",
        width: 1200,
        height: 630,
        alt: "PCS Village Admin Portal",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "PCS Village Admin Portal",
    description:
      "Manage military bases, personnel, and community resources — all in one place.",
    images: ["/auth-banner.png"],
  },
  robots: {
    index: false, // admin portal — keep out of search engines
    follow: false,
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
  },
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#1F3A5F" },
    { media: "(prefers-color-scheme: dark)", color: "#1F3A5F" },
  ],
  width: "device-width",
  initialScale: 1,
}

/* ─────────────────────────────────────────────────────────────
   Root layout
───────────────────────────────────────────────────────────── */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn("antialiased", lexend.variable)}
    >
      <body>
        <ThemeProvider>
          <TanstackQueryProvider>
            <AuthProvider>
              <TooltipProvider >{children}</TooltipProvider>
              <Toaster />
            </AuthProvider>
          </TanstackQueryProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
