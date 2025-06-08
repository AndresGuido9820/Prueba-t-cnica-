import type { ApiResponse, ApiError, ConsultaProductosParams, CrearPrecioEspecialData } from "@/types/api"
import type { PrecioEspecial, ProductoConPrecioEspecial } from "@/types/entities"

/**
 * Clase base para manejar errores de API
 */
export class ApiErrorClass extends Error {
  constructor(
    message: string,
    public status: number,
    public codigo?: string,
    public detalles?: Array<{ campo: string; mensaje: string }>,
  ) {
    super(message)
    this.name = "ApiError"
  }
}

/**
 * Configuración base para las peticiones fetch
 */
const API_CONFIG = {
  baseURL: process.env.NEXT_PUBLIC_API_URL || "",
  headers: {
    "Content-Type": "application/json",
  },
} as const

/**
 * Wrapper para fetch con manejo de errores estandarizado
 */
async function apiFetch<T>(url: string, options?: RequestInit): Promise<T> {
  try {
    const response = await fetch(`${API_CONFIG.baseURL}${url}`, {
      ...options,
      headers: {
        ...API_CONFIG.headers,
        ...options?.headers,
      },
    })

    const data = await response.json()

    if (!response.ok) {
      const error = data as ApiError
      throw new ApiErrorClass(error.error, response.status, error.codigo, error.detalles)
    }

    return data
  } catch (error) {
    if (error instanceof ApiErrorClass) {
      throw error
    }
    throw new ApiErrorClass("Error de conexión", 500)
  }
}

/**
 * Servicio para gestionar productos
 */
export const productosService = {
  /**
   * Obtiene la lista de productos, opcionalmente con precios especiales
   * @param params - Parámetros de consulta
   * @returns Lista de productos
   */
  async obtener(params?: ConsultaProductosParams): Promise<ApiResponse<ProductoConPrecioEspecial[]>> {
    const searchParams = new URLSearchParams()

    if (params?.usuarioId) searchParams.set("usuarioId", params.usuarioId)
    if (params?.categoria) searchParams.set("categoria", params.categoria)
    if (params?.busqueda) searchParams.set("busqueda", params.busqueda)
    if (params?.precioMin !== undefined) searchParams.set("precioMin", params.precioMin.toString())
    if (params?.precioMax !== undefined) searchParams.set("precioMax", params.precioMax.toString())
    if (params?.ordenarPor) searchParams.set("ordenarPor", params.ordenarPor)
    if (params?.limite) searchParams.set("limite", params.limite.toString())
    if (params?.pagina) searchParams.set("pagina", params.pagina.toString())

    const queryString = searchParams.toString()
    const url = `/api/productos${queryString ? `?${queryString}` : ""}`

    return apiFetch<ApiResponse<ProductoConPrecioEspecial[]>>(url)
  },

  /**
   * Obtiene un producto específico por ID
   * @param id - ID del producto
   * @returns Producto encontrado
   */
  async obtenerPorId(id: string, usuarioId?: string): Promise<ApiResponse<ProductoConPrecioEspecial>> {
    const url = usuarioId ? `/api/productos/${id}?usuarioId=${encodeURIComponent(usuarioId)}` : `/api/productos/${id}`

    return apiFetch<ApiResponse<ProductoConPrecioEspecial>>(url)
  },
} as const

/**
 * Servicio para gestionar precios especiales
 */
export const preciosEspecialesService = {
  /**
   * Obtiene la lista de precios especiales
   * @param usuarioId - ID del usuario (opcional)
   * @returns Lista de precios especiales
   */
  async obtener(usuarioId?: string): Promise<ApiResponse<PrecioEspecial[]>> {
    const url = usuarioId
      ? `/api/precios-especiales?usuarioId=${encodeURIComponent(usuarioId)}`
      : "/api/precios-especiales"

    return apiFetch<ApiResponse<PrecioEspecial[]>>(url)
  },

  /**
   * Crea o actualiza un precio especial
   * @param data - Datos del precio especial
   * @returns Resultado de la operación
   */
  async crear(data: CrearPrecioEspecialData): Promise<ApiResponse<{ id: string; porcentajeDescuento: number }>> {
    return apiFetch<ApiResponse<{ id: string; porcentajeDescuento: number }>>("/api/precios-especiales", {
      method: "POST",
      body: JSON.stringify(data),
    })
  },

  /**
   * Elimina un precio especial
   * @param id - ID del precio especial
   * @returns Resultado de la operación
   */
  async eliminar(id: string): Promise<ApiResponse<void>> {
    return apiFetch<ApiResponse<void>>(`/api/precios-especiales/${id}`, {
      method: "DELETE",
    })
  },
} as const
