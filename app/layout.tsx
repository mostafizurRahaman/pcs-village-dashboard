import { TanstackQueryProvider } from "@/components/TanstackQueryProvider"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { inter, lexend } from "@/fonts"
import { cn } from "@/lib/utils"
import { TooltipProvider } from "@/components/ui/tooltip"

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
            <TooltipProvider>{children}</TooltipProvider>
          </TanstackQueryProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
