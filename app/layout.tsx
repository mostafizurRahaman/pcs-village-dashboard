import { TanstackQueryProvider } from "@/components/TanstackQueryProvider"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { inter } from "@/fonts"
import { cn } from "@/lib/utils"

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn("antialiased", inter.variable)}
    >
      <body>
        <ThemeProvider>
          <TanstackQueryProvider>{children}</TanstackQueryProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
