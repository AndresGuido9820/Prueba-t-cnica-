export interface Producto {
  _id?: string
  nombre: string
  descripcion: string
  precio: number
  precioBase: number
  categoria: string
  stock: number
  imagen?: string
  sku: string
  marca: string
  rating: number
}

export interface PrecioEspecial {
  _id?: string
  usuarioId: string
  clienteId: string
  productoId: string
  productoNombre: string
  productoImagen: string
  precioBase: number
  precioEspecial: number
  porcentajeDescuento: number
  fechaInicio: Date
  fechaFin: Date
  activo: boolean
  creadoPor: string
  fechaCreacion: Date
  fechaActualizacion: Date
}

export interface ProductoConPrecioEspecial extends Producto {
  precioEspecial?: number
  porcentajeDescuento?: number
  tienePrecioEspecial?: boolean
}
