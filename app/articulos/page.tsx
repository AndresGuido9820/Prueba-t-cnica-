"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle, Loader2 } from "lucide-react"
import TarjetaProducto from "@/components/productos/tarjeta-producto"
import { ProductGridSkeleton } from "@/components/skeletons/product-card-skeleton"
import { useProductos } from "@/hooks/use-productos"
import type { ProductoConPrecioEspecial } from "@/types/entities"
import { useRouter } from "next/navigation"
import FiltrosProductos from "@/components/productos/filtros-productos"
import type { ConsultaProductosParams } from "@/types/api"

/**
 * Página principal del catálogo de artículos
 * Permite consultar productos y aplicar precios especiales por usuario
 */
export default function ArticulosPage() {
  const [usuarioId, setUsuarioId] = useState("")
  const [usuarioConsultado, setUsuarioConsultado] = useState<string>()
  const router = useRouter()
  const [filtros, setFiltros] = useState<ConsultaProductosParams>({
    limite: 12,
    pagina: 1,
  })

  // Query de productos con React Query
  const {
    data: productos = [],
    isLoading,
    error,
    refetch,
    isFetching,
  } = useProductos(filtros, {
    // Mantener datos previos mientras carga nuevos
    keepPreviousData: true,
  })

  // Obtener categorías únicas para el filtro
  const categorias = Array.from(new Set(productos.map((p) => p.categoria))).sort()

  /**
   * Maneja la búsqueda de precios especiales para un usuario
   */
  const handleBuscarPrecios = async () => {
    const userId = usuarioId.trim()
    setFiltros((prev) => ({
      ...prev,
      usuarioId: userId || undefined,
      pagina: 1,
    }))
  }

  /**
   * Maneja el clic en una tarjeta de producto
   */
  const handleProductoClick = (producto: ProductoConPrecioEspecial) => {
    const url = filtros.usuarioId
      ? `/articulos/${producto._id}?usuarioId=${encodeURIComponent(filtros.usuarioId)}`
      : `/articulos/${producto._id}`
    router.push(url)
  }

  /**
   * Limpia la búsqueda y muestra todos los productos
   */
  const handleLimpiarBusqueda = () => {
    setUsuarioId("")
    setFiltros((prev) => ({
      ...prev,
      usuarioId: undefined,
      pagina: 1,
    }))
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold mb-4">Catálogo de Artículos</h1>

        {/* Mostrar skeleton o datos reales */}
        {isLoading && !productos.length ? (
          <div className="space-y-2 mb-6">
            <div className="h-4 bg-muted animate-pulse rounded w-48"></div>
            <div className="h-4 bg-muted animate-pulse rounded w-64"></div>
          </div>
        ) : (
          <div className="mb-6">
            <p className="text-muted-foreground">
              Total de productos: {productos.length}
              {filtros.usuarioId && ` • Mostrando precios para usuario: ${filtros.usuarioId}`}
            </p>
            {isFetching && (
              <div className="flex items-center mt-2 text-sm text-muted-foreground">
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Actualizando precios...
              </div>
            )}
          </div>
        )}

        {/* Formulario de búsqueda */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-lg md:text-xl">Consultar Precios Especiales</CardTitle>
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
                <p className="text-xs text-muted-foreground mt-1">Usuarios de prueba: USR001, USR002, USR003, USR004</p>
              </div>
              <div className="flex gap-2 mt-4 md:mt-0">
                <Button onClick={handleBuscarPrecios} disabled={isFetching} className="w-full md:w-auto">
                  {isFetching ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Cargando...
                    </>
                  ) : (
                    "Buscar Precios"
                  )}
                </Button>
                {filtros.usuarioId && (
                  <Button
                    variant="outline"
                    onClick={handleLimpiarBusqueda}
                    className="w-full md:w-auto"
                    disabled={isFetching}
                  >
                    Limpiar
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Mensaje de error */}
        {error && (
          <Alert className="mb-6 border-destructive/50 text-destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error instanceof Error ? error.message : "Error al cargar productos"}</AlertDescription>
          </Alert>
        )}
      </div>

      {/* Componente de filtros */}
      <FiltrosProductos filtros={filtros} onFiltrosChange={setFiltros} categorias={categorias} isLoading={isFetching} />

      {/* Grid de productos con skeleton */}
      {isLoading && !productos.length ? (
        <ProductGridSkeleton count={8} />
      ) : productos.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
          {productos.map((producto) => (
            <TarjetaProducto key={producto._id} producto={producto} onClick={handleProductoClick} />
          ))}
        </div>
      ) : (
        /* Estado vacío */
        <div className="text-center py-12">
          <div className="mx-auto w-24 h-24 bg-muted rounded-full flex items-center justify-center mb-4">
            <span className="text-2xl">📦</span>
          </div>
          <h3 className="text-lg font-medium mb-2">No se encontraron productos</h3>
          <p className="text-muted-foreground">
            {filtros.usuarioId
              ? `No hay productos con precios especiales para el usuario ${filtros.usuarioId}`
              : "No hay productos disponibles en este momento"}
          </p>
        </div>
      )}
    </div>
  )
}
