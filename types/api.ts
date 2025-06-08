export interface ApiResponse<T = any> {
  data?: T
  productos?: T
  preciosEspeciales?: T
  mensaje?: string
  timestamp: string
  total?: number
  pagina?: number
  limite?: number
  totalPaginas?: number
  usuarioId?: string
  coleccion?: string
  coleccionPrecios?: string
}

export interface ApiError {
  error: string
  codigo?: string
  detalles?: Array<{ campo: string; mensaje: string }>
  timestamp: string
}

export interface ConsultaProductosParams {
  usuarioId?: string
  categoria?: string
  busqueda?: string
  precioMin?: number
  precioMax?: number
  ordenarPor?: "nombre" | "precio_asc" | "precio_desc" | "rating"
  limite?: number
  pagina?: number
}

export interface CrearPrecioEspecialData {
  usuarioId: string
  clienteId: string
  productoId: string
  precioEspecial: number
}