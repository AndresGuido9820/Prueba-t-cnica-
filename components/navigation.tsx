"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Package, Upload } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"

export default function Navigation() {
  const pathname = usePathname()

  const navItems = [
    {
      href: "/articulos",
      label: "Artículos",
      icon: Package,
    },
    {
      href: "/subida",
      label: "Subida",
      icon: Upload,
    },
  ]

  return (
    <nav className="bg-card text-card-foreground shadow-sm border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <h1 className="text-xl font-bold">Tienda Productos</h1>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              {navItems.map((item) => {
                const Icon = item.icon
                const isActive = pathname === item.href

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                      isActive
                        ? "border-primary text-foreground"
                        : "border-transparent text-muted-foreground hover:border-border hover:text-foreground"
                    }`}
                  >
                    <Icon className="w-4 h-4 mr-2" />
                    {item.label}
                  </Link>
                )
              })}
            </div>
          </div>

          {/* Mobile navigation */}
          <div className="sm:hidden flex items-center">
            <div className="flex space-x-2">
              {navItems.map((item) => {
                const Icon = item.icon
                const isActive = pathname === item.href

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`p-2 rounded-md ${
                      isActive
                        ? "bg-primary/10 text-primary"
                        : "text-muted-foreground hover:bg-accent hover:text-foreground"
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="sr-only">{item.label}</span>
                  </Link>
                )
              })}
            </div>
          </div>

          <div className="flex items-center">
            <ThemeToggle />
          </div>
        </div>
      </div>
    </nav>
  )
}
