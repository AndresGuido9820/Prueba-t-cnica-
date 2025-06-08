import type React from "react"
import type { Metadata, Viewport } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Navigation from "@/components/navigation"
import QueryProvider from "@/providers/query-provider"
import { ThemeProvider } from "@/providers/theme-provider"

const inter = Inter({ subsets: ["latin"] })

// ✅ Viewport exportado por separado
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
}

// ✅ Metadata con metadataBase configurado
export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"),
  title: {
    default: "Tienda Productos - Prueba Técnica",
    template: "%s | Tienda Productos",
  },
  description: "Sistema de gestión de productos con precios especiales desarrollado con Next.js, React Query y MongoDB",
  keywords: ["tienda", "productos", "precios especiales", "e-commerce", "Next.js", "React", "MongoDB", "TypeScript"],
  authors: [{ name: "Guido Montoya", url: "https://github.com/tu-usuario" }],
  creator: "Guido Montoya",
  publisher: "Tienda Productos",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "es_ES",
    url: "/",
    title: "Tienda Productos - Sistema de Gestión",
    description: "Sistema profesional de gestión de productos con precios especiales",
    siteName: "Tienda Productos",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Tienda Productos - Sistema de Gestión",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Tienda Productos - Sistema de Gestión",
    description: "Sistema profesional de gestión de productos con precios especiales",
    images: ["/og-image.jpg"],
    creator: "@tu-usuario",
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
    generator: 'v0.dev'
}

/**
 * Layout principal de la aplicación
 * Configura providers globales y estructura base
 */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider defaultTheme="system" storageKey="tienda-theme">
          <QueryProvider>
            <Navigation />
            <main className="min-h-screen bg-background">{children}</main>
          </QueryProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
