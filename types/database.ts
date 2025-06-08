import type { ObjectId, Collection, Db } from "mongodb"

// Tipos para documentos de MongoDB
export interface ProductoDocument {
  _id?: ObjectId
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

export interface PrecioEspecialDocument {
  _id?: ObjectId
  usuarioId: string
  clienteId: string
  productoId: ObjectId
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

// Tipos para operaciones de base de datos
export interface DatabaseOperationResult<T> {
  success: boolean
  data?: T
  error?: string
}

export interface MongoCollections {
  productos: Collection<ProductoDocument>
  preciosEspeciales: Collection<PrecioEspecialDocument>
}

export interface DatabaseConnection {
  db: Db
  collections: MongoCollections
}

// Tipos para filtros de consulta
export interface ProductoFilter {
  categoria?: string
  precio?: {
    $gte?: number
    $lte?: number
  }
  $or?: Array<{
    nombre?: { $regex: string; $options: string }
    descripcion?: { $regex: string; $options: string }
    marca?: { $regex: string; $options: string }
  }>
}

export interface PrecioEspecialFilter {
  usuarioId?: string
  clienteId?: string
  productoId?: ObjectId
  activo?: boolean
  fechaInicio?: { $lte: Date }
  fechaFin?: { $gte: Date }
}

// Tipos para ordenamiento
export type ProductoSort = {
  nombre?: 1 | -1
  precio?: 1 | -1
  rating?: 1 | -1
}
