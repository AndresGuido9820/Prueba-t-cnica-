"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Search, Filter, X, SlidersHorizontal } from "lucide-react"
import type { ConsultaProductosParams } from "@/types/api"

interface FiltrosProductosProps {
  filtros: ConsultaProductosParams
  onFiltrosChange: (filtros: ConsultaProductosParams) => void
  categorias: string[]
  isLoading?: boolean
}

export default function FiltrosProductos({
  filtros,
  onFiltrosChange,
  categorias,
  isLoading = false,
}: FiltrosProductosProps) {
  const [mostrarFiltrosAvanzados, setMostrarFiltrosAvanzados] = useState(false)

  const handleBusquedaChange = (busqueda: string) => {
    onFiltrosChange({ ...filtros, busqueda: busqueda || undefined, pagina: 1 })
  }

  const handleCategoriaChange = (categoria: string) => {
    onFiltrosChange({
      ...filtros,
      categoria: categoria === "todas" ? undefined : categoria,
      pagina: 1,
    })
  }

  const handleOrdenamientoChange = (ordenarPor: string) => {
    onFiltrosChange({
      ...filtros,
      ordenarPor: ordenarPor as ConsultaProductosParams["ordenarPor"],
      pagina: 1,
    })
  }

  const handlePrecioChange = (tipo: "min" | "max", valor: string) => {
    const precio = valor ? Number.parseFloat(valor) : undefined
    onFiltrosChange({
      ...filtros,
      [tipo === "min" ? "precioMin" : "precioMax"]: precio,
      pagina: 1,
    })
  }

  const limpiarFiltros = () => {
    onFiltrosChange({
      usuarioId: filtros.usuarioId, // Mantener el usuario
      limite: filtros.limite,
      pagina: 1,
    })
  }

  const tienesFiltrosActivos = !!(
    filtros.categoria ||
    filtros.busqueda ||
    filtros.precioMin !== undefined ||
    filtros.precioMax !== undefined ||
    (filtros.ordenarPor && filtros.ordenarPor !== "nombre")
  )

  return (
    <Card className="mb-6">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filtros y Búsqueda
          </CardTitle>
          <Button variant="outline" size="sm" onClick={() => setMostrarFiltrosAvanzados(!mostrarFiltrosAvanzados)}>
            <SlidersHorizontal className="h-4 w-4 mr-2" />
            {mostrarFiltrosAvanzados ? "Ocultar" : "Más filtros"}
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Búsqueda principal */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Buscar productos por nombre, descripción o marca..."
            value={filtros.busqueda || ""}
            onChange={(e) => handleBusquedaChange(e.target.value)}
            className="pl-10"
            disabled={isLoading}
          />
        </div>

        {/* Filtros básicos */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Categoría */}
          <div>
            <label className="block text-sm font-medium mb-2">Categoría</label>
            <Select value={filtros.categoria || "todas"} onValueChange={handleCategoriaChange} disabled={isLoading}>
              <SelectTrigger>
                <SelectValue placeholder="Todas las categorías" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todas">Todas las categorías</SelectItem>
                {categorias.map((categoria) => (
                  <SelectItem key={categoria} value={categoria}>
                    {categoria}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Ordenamiento */}
          <div>
            <label className="block text-sm font-medium mb-2">Ordenar por</label>
            <Select
              value={filtros.ordenarPor || "nombre"}
              onValueChange={handleOrdenamientoChange}
              disabled={isLoading}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="nombre">Nombre (A-Z)</SelectItem>
                <SelectItem value="precio_asc">Precio (menor a mayor)</SelectItem>
                <SelectItem value="precio_desc">Precio (mayor a menor)</SelectItem>
                <SelectItem value="rating">Mejor valorados</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Botón limpiar */}
          <div className="flex items-end">
            {tienesFiltrosActivos && (
              <Button variant="outline" onClick={limpiarFiltros} disabled={isLoading} className="w-full">
                <X className="h-4 w-4 mr-2" />
                Limpiar filtros
              </Button>
            )}
          </div>
        </div>

        {/* Filtros avanzados */}
        {mostrarFiltrosAvanzados && (
          <div className="border-t pt-4">
            <h4 className="text-sm font-medium mb-3">Filtros avanzados</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Rango de precios */}
              <div>
                <label className="block text-sm font-medium mb-2">Precio mínimo (€)</label>
                <Input
                  type="number"
                  placeholder="0.00"
                  value={filtros.precioMin || ""}
                  onChange={(e) => handlePrecioChange("min", e.target.value)}
                  disabled={isLoading}
                  min="0"
                  step="0.01"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Precio máximo (€)</label>
                <Input
                  type="number"
                  placeholder="999.99"
                  value={filtros.precioMax || ""}
                  onChange={(e) => handlePrecioChange("max", e.target.value)}
                  disabled={isLoading}
                  min="0"
                  step="0.01"
                />
              </div>
            </div>
          </div>
        )}

        {/* Filtros activos */}
        {tienesFiltrosActivos && (
          <div className="flex flex-wrap gap-2 pt-2 border-t">
            <span className="text-sm text-muted-foreground">Filtros activos:</span>
            {filtros.categoria && (
              <Badge variant="secondary">
                Categoría: {filtros.categoria}
                <X className="h-3 w-3 ml-1 cursor-pointer" onClick={() => handleCategoriaChange("todas")} />
              </Badge>
            )}
            {filtros.busqueda && (
              <Badge variant="secondary">
                Búsqueda: {filtros.busqueda}
                <X className="h-3 w-3 ml-1 cursor-pointer" onClick={() => handleBusquedaChange("")} />
              </Badge>
            )}
            {filtros.precioMin !== undefined && (
              <Badge variant="secondary">
                Precio min: €{filtros.precioMin}
                <X className="h-3 w-3 ml-1 cursor-pointer" onClick={() => handlePrecioChange("min", "")} />
              </Badge>
            )}
            {filtros.precioMax !== undefined && (
              <Badge variant="secondary">
                Precio max: €{filtros.precioMax}
                <X className="h-3 w-3 ml-1 cursor-pointer" onClick={() => handlePrecioChange("max", "")} />
              </Badge>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
