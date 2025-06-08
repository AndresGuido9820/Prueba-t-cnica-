"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { CheckCircle, AlertCircle, Loader2 } from "lucide-react"
import ImagenProducto from "@/components/ui/imagen-producto"
import { FormSkeleton } from "@/components/skeletons/form-skeleton"
import { PriceListSkeleton } from "@/components/skeletons/price-list-skeleton"
import { useProductos } from "@/hooks/use-productos"
import { usePreciosEspeciales, useCrearPrecioEspecial } from "@/hooks/use-precios-especiales"

export default function SubidaPage() {
  const [formData, setFormData] = useState({
    usuarioId: "",
    clienteId: "",
    productoId: "",
    precioEspecial: "",
  })
  const [mensaje, setMensaje] = useState<{ tipo: "success" | "error"; texto: string } | null>(null)

  // Consultas con React Query
  const { data: productos = [], isLoading: loadingProductos } = useProductos()
  const { data: preciosEspeciales = [], isLoading: loadingPrecios } = usePreciosEspeciales()
  const { mutate: crearPrecioEspecial, isPending: isSubmitting } = useCrearPrecioEspecial()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setMensaje(null)

    try {
      crearPrecioEspecial(
        {
          usuarioId: formData.usuarioId,
          clienteId: formData.clienteId,
          productoId: formData.productoId,
          precioEspecial: Number.parseFloat(formData.precioEspecial),
        },
        {
          onSuccess: (data) => {
            setMensaje({
              tipo: "success",
              texto: data.mensaje || "Precio especial guardado correctamente",
            })
            setFormData({
              usuarioId: "",
              clienteId: "",
              productoId: "",
              precioEspecial: "",
            })
          },
          onError: (error) => {
            setMensaje({
              tipo: "error",
              texto: error instanceof Error ? error.message : "Error al guardar el precio especial",
            })
          },
        },
      )
    } catch (error) {
      setMensaje({
        tipo: "error",
        texto: "Error de conexión al servidor",
      })
    }
  }

  const productoSeleccionado = productos.find((p) => p._id === formData.productoId)

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl md:text-3xl font-bold mb-8">Gestión de Precios Especiales</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
        {/* Formulario con skeleton */}
        {loadingProductos ? (
          <FormSkeleton fields={4} />
        ) : (
          <Card>
            <CardHeader>
              <CardTitle className="text-lg md:text-xl">Agregar/Actualizar Precio Especial</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="usuarioId" className="block text-sm font-medium mb-2">
                    ID de Usuario *
                  </label>
                  <Input
                    id="usuarioId"
                    type="text"
                    required
                    placeholder="Ej: USR001"
                    value={formData.usuarioId}
                    onChange={(e) => setFormData({ ...formData, usuarioId: e.target.value })}
                    disabled={isSubmitting}
                  />
                </div>

                <div>
                  <label htmlFor="clienteId" className="block text-sm font-medium mb-2">
                    ID de Cliente *
                  </label>
                  <Input
                    id="clienteId"
                    type="text"
                    required
                    placeholder="Ej: CLI123"
                    value={formData.clienteId}
                    onChange={(e) => setFormData({ ...formData, clienteId: e.target.value })}
                    disabled={isSubmitting}
                  />
                </div>

                <div>
                  <label htmlFor="productoId" className="block text-sm font-medium mb-2">
                    Producto *
                  </label>
                  <Select
                    value={formData.productoId}
                    onValueChange={(value) => setFormData({ ...formData, productoId: value })}
                    disabled={isSubmitting}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona un producto" />
                    </SelectTrigger>
                    <SelectContent>
                      {productos.map((producto) => (
                        <SelectItem key={producto._id} value={producto._id!}>
                          {producto.nombre} - €{producto.precio}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {productoSeleccionado && (
                  <div className="p-3 bg-muted/50 rounded-md">
                    <div className="flex items-center gap-3 mb-2">
                      <ImagenProducto
                        src={productoSeleccionado.imagen || "/placeholder.svg"}
                        alt={productoSeleccionado.nombre}
                        className="w-12 h-12 rounded"
                        fallbackClassName="w-12 h-12 rounded"
                      />
                      <div>
                        <p className="font-medium">{productoSeleccionado.nombre}</p>
                        <p className="text-sm text-muted-foreground">SKU: {productoSeleccionado.sku}</p>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      <strong>Precio original:</strong> €{productoSeleccionado.precio}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      <strong>Categoría:</strong> {productoSeleccionado.categoria}
                    </p>
                  </div>
                )}

                <div>
                  <label htmlFor="precioEspecial" className="block text-sm font-medium mb-2">
                    Precio Especial *
                  </label>
                  <Input
                    id="precioEspecial"
                    type="number"
                    step="0.01"
                    min="0"
                    required
                    placeholder="0.00"
                    value={formData.precioEspecial}
                    onChange={(e) => setFormData({ ...formData, precioEspecial: e.target.value })}
                    disabled={isSubmitting}
                  />
                </div>

                <Button type="submit" disabled={isSubmitting} className="w-full">
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Guardando...
                    </>
                  ) : (
                    "Guardar Precio Especial"
                  )}
                </Button>
              </form>

              {mensaje && (
                <Alert
                  className={`mt-4 ${mensaje.tipo === "success" ? "border-green-600/20 text-green-600 dark:border-green-500/20 dark:text-green-500" : "border-destructive/20 text-destructive"}`}
                >
                  {mensaje.tipo === "success" ? (
                    <CheckCircle className="h-4 w-4" />
                  ) : (
                    <AlertCircle className="h-4 w-4" />
                  )}
                  <AlertDescription>{mensaje.texto}</AlertDescription>
                </Alert>
              )}
            </CardContent>
          </Card>
        )}

        {/* Lista de precios especiales con skeleton */}
        {loadingPrecios ? (
          <PriceListSkeleton count={5} />
        ) : (
          <Card>
            <CardHeader>
              <CardTitle className="text-lg md:text-xl">Precios Especiales Existentes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 max-h-[500px] overflow-y-auto pr-1">
                {preciosEspeciales.length === 0 ? (
                  <div className="text-center py-8">
                    <div className="mx-auto w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
                      <span className="text-xl">💰</span>
                    </div>
                    <h3 className="text-sm font-medium mb-1">No hay precios especiales</h3>
                    <p className="text-xs text-muted-foreground">Crea el primer precio especial usando el formulario</p>
                  </div>
                ) : (
                  preciosEspeciales.map((precio) => (
                    <div key={precio._id} className="p-3 border rounded-md hover:bg-muted/50 transition-colors">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <ImagenProducto
                              src={precio.productoImagen || "/placeholder.svg"}
                              alt={precio.productoNombre}
                              className="w-8 h-8 rounded"
                              fallbackClassName="w-8 h-8 rounded"
                            />
                            <p className="font-medium text-sm">{precio.productoNombre}</p>
                          </div>
                          <p className="text-xs text-muted-foreground">Usuario: {precio.usuarioId}</p>
                          <p className="text-xs text-muted-foreground">Cliente: {precio.clienteId}</p>
                          <p className="text-xs text-muted-foreground">Descuento: {precio.porcentajeDescuento}%</p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-green-600 dark:text-green-500">€{precio.precioEspecial}</p>
                          <p className="text-xs text-muted-foreground line-through">€{precio.precioBase}</p>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
