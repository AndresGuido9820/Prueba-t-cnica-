"use client"

import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Skeleton } from "@/components/ui/skeleton"
import { ArrowLeft, Star, Package, Tag, Calendar, AlertCircle, CheckCircle, Loader2 } from "lucide-react"
import ImagenProducto from "@/components/ui/imagen-producto"
import { useProducto } from "@/hooks/use-producto"
import { formatearPrecio, formatearDescuento } from "@/lib/utils"

export default function DetalleProductoPage() {
  const params = useParams()
  const router = useRouter()
  const [usuarioId, setUsuarioId] = useState("")
  const [usuarioConsultado, setUsuarioConsultado] = useState<string>()

  const productId = params.id as string

  const {
    data: producto,
    isLoading,
    error,
    refetch,
    isFetching,
  } = useProducto(productId, usuarioConsultado, {
    keepPreviousData: true,
  })

  const handleBuscarPrecios = async () => {
    const userId = usuarioId.trim()
    setUsuarioConsultado(userId || undefined)
    await refetch()
  }

  const handleLimpiarBusqueda = () => {
    setUsuarioId("")
    setUsuarioConsultado(undefined)
  }

  if (isLoading && !producto) {
    return <DetalleProductoSkeleton />
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Alert className="border-destructive/50 text-destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error instanceof Error ? error.message : "Error al cargar el producto"}</AlertDescription>
        </Alert>
      </div>
    )
  }

  if (!producto) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>Producto no encontrado</AlertDescription>
        </Alert>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header con navegación */}
      <div className="mb-6">
        <Button variant="outline" onClick={() => router.back()} className="mb-4">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Volver al catálogo
        </Button>

        {/* Formulario de búsqueda de precios */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-lg">Consultar Precio Especial</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4 md:items-end">
              <div className="flex-1">
                <label htmlFor="usuarioId" className="block text-sm font-medium mb-2">
                  ID de Usuario
                </label>
                <Input
                  id="usuarioId"
                  type="text"
                  placeholder="Ej: USR001, USR002, USR003, USR004"
                  value={usuarioId}
                  onChange={(e) => setUsuarioId(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleBuscarPrecios()}
                  disabled={isFetching}
                />
              </div>
              <div className="flex gap-2">
                <Button onClick={handleBuscarPrecios} disabled={isFetching}>
                  {isFetching ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Cargando...
                    </>
                  ) : (
                    "Buscar Precio"
                  )}
                </Button>
                {usuarioConsultado && (
                  <Button variant="outline" onClick={handleLimpiarBusqueda} disabled={isFetching}>
                    Limpiar
                  </Button>
                )}
              </div>
            </div>
            {usuarioConsultado && (
              <p className="text-sm text-muted-foreground mt-2">
                Mostrando precio para usuario: <strong>{usuarioConsultado}</strong>
              </p>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Contenido principal del producto */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Imagen del producto */}
        <div className="space-y-4">
          <ImagenProducto
            src={producto.imagen || "/placeholder.svg"}
            alt={producto.nombre}
            containerClassName="aspect-square w-full rounded-lg overflow-hidden"
            className="w-full h-full object-cover"
          />

          {/* Galería adicional (placeholder para futuras imágenes) */}
          <div className="grid grid-cols-4 gap-2">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="aspect-square bg-muted rounded-md flex items-center justify-center">
                <span className="text-xs text-muted-foreground">+{i}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Información del producto */}
        <div className="space-y-6">
          {/* Header del producto */}
          <div>
            <div className="flex items-start justify-between mb-2">
              <h1 className="text-2xl md:text-3xl font-bold">{producto.nombre}</h1>
              <Badge variant="secondary">{producto.categoria}</Badge>
            </div>

            {/* Rating y marca */}
            <div className="flex items-center gap-4 mb-4">
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span className="font-medium">{producto.rating}</span>
                <span className="text-sm text-muted-foreground">(4.2k reseñas)</span>
              </div>
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <Tag className="h-4 w-4" />
                <span>{producto.marca}</span>
              </div>
            </div>

            {/* Precios */}
            <div className="space-y-2">
              {producto.tienePrecioEspecial ? (
                <>
                  <div className="flex items-center gap-3">
                    <span className="text-3xl font-bold text-green-600 dark:text-green-500">
                      {formatearPrecio(producto.precioEspecial!)}
                    </span>
                    <Badge variant="destructive" className="text-sm">
                      {formatearDescuento(producto.porcentajeDescuento!)}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-lg text-muted-foreground line-through">
                      {formatearPrecio(producto.precio)}
                    </span>
                    <span className="text-sm text-green-600 dark:text-green-500">
                      Ahorras {formatearPrecio(producto.precio - producto.precioEspecial!)}
                    </span>
                  </div>
                  <Badge variant="default" className="w-fit">
                    <CheckCircle className="h-3 w-3 mr-1" />
                    Precio Especial Activo
                  </Badge>
                  {producto.fechaFinDescuento && (
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Calendar className="h-3 w-3" />
                      <span>Válido hasta: {new Date(producto.fechaFinDescuento).toLocaleDateString("es-ES")}</span>
                    </div>
                  )}
                </>
              ) : (
                <div className="flex items-center gap-3">
                  <span className="text-3xl font-bold">{formatearPrecio(producto.precio)}</span>
                  {usuarioConsultado && <Badge variant="outline">Sin descuento especial</Badge>}
                </div>
              )}
            </div>
          </div>

          {/* Descripción */}
          <div>
            <h3 className="text-lg font-semibold mb-2">Descripción</h3>
            <p className="text-muted-foreground leading-relaxed">{producto.descripcion}</p>
          </div>

          {/* Información adicional */}
          <div className="grid grid-cols-2 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-1">
                  <Package className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">Stock</span>
                </div>
                <span
                  className={`text-lg font-bold ${
                    producto.stock > 0 ? "text-green-600 dark:text-green-500" : "text-red-600 dark:text-red-500"
                  }`}
                >
                  {producto.stock > 0 ? `${producto.stock} disponibles` : "Sin stock"}
                </span>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-1">
                  <Tag className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">SKU</span>
                </div>
                <span className="text-lg font-mono">{producto.sku}</span>
              </CardContent>
            </Card>
          </div>

          {/* Acciones */}
          <div className="space-y-3">
            <Button size="lg" className="w-full" disabled={producto.stock === 0}>
              {producto.stock > 0 ? "Añadir al carrito" : "Sin stock"}
            </Button>
            <Button variant="outline" size="lg" className="w-full">
              Añadir a favoritos
            </Button>
          </div>

          {/* Información de envío */}
          <Card>
            <CardContent className="p-4">
              <h4 className="font-medium mb-2">Información de envío</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Envío gratis en pedidos superiores a €50</li>
                <li>• Entrega en 24-48 horas</li>
                <li>• Devoluciones gratuitas en 30 días</li>
                <li>• Garantía del fabricante incluida</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

// Componente skeleton para la carga
function DetalleProductoSkeleton() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Skeleton className="h-10 w-40 mb-6" />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-4">
          <Skeleton className="aspect-square w-full rounded-lg" />
          <div className="grid grid-cols-4 gap-2">
            {[1, 2, 3, 4].map((i) => (
              <Skeleton key={i} className="aspect-square rounded-md" />
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <Skeleton className="h-8 w-3/4 mb-2" />
            <Skeleton className="h-6 w-1/2 mb-4" />
            <Skeleton className="h-10 w-1/3" />
          </div>
          <div>
            <Skeleton className="h-6 w-1/4 mb-2" />
            <Skeleton className="h-20 w-full" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Skeleton className="h-20 w-full" />
            <Skeleton className="h-20 w-full" />
          </div>
          <div className="space-y-3">
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-12 w-full" />
          </div>
        </div>
      </div>
    </div>
  )
}
