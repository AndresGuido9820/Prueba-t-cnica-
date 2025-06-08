"use client"

import { useState, type ImgHTMLAttributes } from "react"
import { ImageIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { Skeleton } from "@/components/ui/skeleton"

interface ImagenProductoProps extends Omit<ImgHTMLAttributes<HTMLImageElement>, "src" | "alt"> {
  /** URL de la imagen */
  src?: string
  /** Texto alternativo para la imagen */
  alt: string
  /** Clases CSS adicionales para el contenedor */
  containerClassName?: string
  /** Clases CSS para el estado de fallback */
  fallbackClassName?: string
  /** Mostrar texto en el fallback */
  showFallbackText?: boolean
}

/**
 * Componente optimizado para mostrar imágenes de productos
 * con estados de carga, error y fallback
 */
export default function ImagenProducto({
  src,
  alt,
  className,
  containerClassName,
  fallbackClassName,
  showFallbackText = true,
  ...props
}: ImagenProductoProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)

  /**
   * Maneja la carga exitosa de la imagen
   */
  const handleLoad = () => {
    setIsLoading(false)
    setHasError(false)
  }

  /**
   * Maneja el error de carga de la imagen
   */
  const handleError = () => {
    setIsLoading(false)
    setHasError(true)
  }

  // Si no hay src o hay error, mostrar fallback
  if (!src || hasError) {
    return (
      <div className={cn("bg-muted flex items-center justify-center", containerClassName, fallbackClassName)}>
        <div className="text-center">
          <ImageIcon className="mx-auto h-8 w-8 text-muted-foreground mb-2" />
          {showFallbackText && <p className="text-xs text-muted-foreground">Sin imagen</p>}
        </div>
      </div>
    )
  }

  return (
    <div className={cn("relative", containerClassName)}>
      {/* Skeleton loader mientras carga */}
      {isLoading && <Skeleton className="absolute inset-0" />}

      <img
        src={src || "/placeholder.svg"}
        alt={alt}
        className={cn(
          "w-full h-full object-cover transition-opacity duration-300",
          isLoading ? "opacity-0" : "opacity-100",
          className,
        )}
        onLoad={handleLoad}
        onError={handleError}
        loading="lazy"
        {...props}
      />
    </div>
  )
}
