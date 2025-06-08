"use client"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import ImagenProducto from "@/components/ui/imagen-producto"
import type { ProductoConPrecioEspecial } from "@/types/entities"
import { formatearPrecio, formatearDescuento } from "@/lib/utils"

interface TarjetaProductoProps {
  /** Producto a mostrar */
  producto: ProductoConPrecioEspecial
  /** Función callback al hacer clic en el producto */
  onClick?: (producto: ProductoConPrecioEspecial) => void
}

/**
 * Componente para mostrar la información de un producto en formato de tarjeta
 */
export default function TarjetaProducto({ producto, onClick }: TarjetaProductoProps) {
  return (
    <Card
      className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer h-full flex flex-col"
      onClick={() => onClick?.(producto)}
    >
      {/* Imagen del producto */}
      <ImagenProducto
        src={producto.imagen || "/placeholder.svg"}
        alt={producto.nombre}
        containerClassName="aspect-video w-full"
        fallbackClassName="aspect-video"
      />

      <CardContent className="p-4 flex-1 flex flex-col">
        {/* Header con nombre y categoría */}
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold line-clamp-1" title={producto.nombre}>
            {producto.nombre}
          </h3>
          <Badge variant="secondary" className="ml-2 shrink-0">
            {producto.categoria}
          </Badge>
        </div>

        {/* Descripción */}
        <p className="text-muted-foreground text-sm mb-3 line-clamp-2 flex-1" title={producto.descripcion}>
          {producto.descripcion}
        </p>

        {/* Precios y stock */}
        <div className="flex justify-between items-center mb-2 mt-auto">
          <div className="flex flex-col">
            {producto.tienePrecioEspecial ? (
              <>
                <div className="flex items-center gap-2">
                  <span className="text-lg font-bold text-green-600 dark:text-green-500">
                    {formatearPrecio(producto.precioEspecial!)}
                  </span>
                  <Badge variant="destructive" className="text-xs">
                    {formatearDescuento(producto.porcentajeDescuento!)}
                  </Badge>
                </div>
                <span className="text-sm text-muted-foreground line-through">{formatearPrecio(producto.precio)}</span>
                <Badge variant="default" className="w-fit mt-1">
                  Precio Especial
                </Badge>
              </>
            ) : (
              <span className="text-lg font-bold">{formatearPrecio(producto.precio)}</span>
            )}
          </div>

          <div className="text-right">
            <p className="text-sm text-muted-foreground">Stock</p>
            <p
              className={`font-medium ${producto.stock > 0 ? "text-green-600 dark:text-green-500" : "text-red-600 dark:text-red-500"}`}
            >
              {producto.stock}
            </p>
          </div>
        </div>

        {/* Información adicional */}
        <div className="flex justify-between items-center text-xs text-muted-foreground mt-2">
          <span>SKU: {producto.sku}</span>
          <div className="flex items-center gap-1">
            <span>⭐</span>
            <span>{producto.rating}</span>
          </div>
        </div>

        <div className="text-xs text-muted-foreground mt-1">Marca: {producto.marca}</div>
      </CardContent>
    </Card>
  )
}
