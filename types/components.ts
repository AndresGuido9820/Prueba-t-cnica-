import type { ReactNode, HTMLAttributes, ButtonHTMLAttributes, InputHTMLAttributes } from "react"
import type { ProductoConPrecioEspecial } from "./entities"
import type { ConsultaProductosParams } from "./api"

// Tipos para componentes UI base
export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link"
  size?: "default" | "sm" | "lg" | "icon"
  asChild?: boolean
}

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
}

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}

export interface BadgeProps extends HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "secondary" | "destructive" | "outline"
}

export interface AlertProps extends HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "destructive"
}

export interface SkeletonProps extends HTMLAttributes<HTMLDivElement> {}

// Tipos para componentes específicos del proyecto
export interface ImagenProductoProps {
  src?: string
  alt: string
  className?: string
  containerClassName?: string
  fallbackClassName?: string
  showFallbackText?: boolean
}

export interface TarjetaProductoProps {
  producto: ProductoConPrecioEspecial
  onClick?: (producto: ProductoConPrecioEspecial) => void
}

export interface FiltrosProductosProps {
  filtros: ConsultaProductosParams
  onFiltrosChange: (filtros: ConsultaProductosParams) => void
  categorias: string[]
  isLoading?: boolean
}

export interface NavigationProps {
  className?: string
}

export interface ThemeToggleProps {
  className?: string
}

// Tipos para skeletons
export interface ProductCardSkeletonProps {
  className?: string
}

export interface ProductGridSkeletonProps {
  count?: number
}

export interface PriceItemSkeletonProps {
  className?: string
}

export interface PriceListSkeletonProps {
  count?: number
}

export interface FormSkeletonProps {
  fields?: number
}

export interface FormFieldSkeletonProps {
  className?: string
}

// Tipos para providers
export interface QueryProviderProps {
  children: ReactNode
}

export interface ThemeProviderProps {
  children: ReactNode
  defaultTheme?: "dark" | "light" | "system"
  storageKey?: string
}

export interface ThemeProviderState {
  theme: "dark" | "light" | "system"
  setTheme: (theme: "dark" | "light" | "system") => void
}
