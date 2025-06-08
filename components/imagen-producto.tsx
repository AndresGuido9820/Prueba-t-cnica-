"use client"

import { useState } from "react"
import { ImageIcon } from "lucide-react"

interface ImagenProductoProps {
  src?: string
  alt: string
  className?: string
  fallbackClassName?: string
}

export default function ImagenProducto({ src, alt, className = "", fallbackClassName = "" }: ImagenProductoProps) {
  const [imagenCargada, setImagenCargada] = useState(false)
  const [errorImagen, setErrorImagen] = useState(false)

  const handleImagenCargada = () => {
    setImagenCargada(true)
    setErrorImagen(false)
  }

  const handleErrorImagen = () => {
    setErrorImagen(true)
    setImagenCargada(false)
  }

  // Si no hay src o hay error, mostrar placeholder
  if (!src || errorImagen) {
    return (
      <div className={`bg-gray-200 flex items-center justify-center ${className} ${fallbackClassName}`}>
        <div className="text-center">
          <ImageIcon className="mx-auto h-8 w-8 text-gray-400 mb-2" />
          <p className="text-xs text-gray-500">Sin imagen</p>
        </div>
      </div>
    )
  }

  return (
    <div className={`relative ${className}`}>
      {/* Skeleton loader mientras carga */}
      {!imagenCargada && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center">
          <div className="text-gray-400 text-sm">Cargando...</div>
        </div>
      )}

      <img
        src={src || "/placeholder.svg"}
        alt={alt}
        className={`w-full h-full object-cover transition-opacity duration-300 ${
          imagenCargada ? "opacity-100" : "opacity-0"
        }`}
        onLoad={handleImagenCargada}
        onError={handleErrorImagen}
        loading="lazy"
      />
    </div>
  )
}
