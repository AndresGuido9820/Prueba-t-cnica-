import { useQuery, type UseQueryOptions } from "@tanstack/react-query"
import { productosService } from "@/services/api"
import type { ConsultaProductosParams } from "@/types/api"
import type { ProductoConPrecioEspecial } from "@/types/entities"

/**
 * Claves de consulta para productos
 */
export const productosKeys = {
  all: ["productos"] as const,
  lists: () => [...productosKeys.all, "list"] as const,
  list: (params?: ConsultaProductosParams) => [...productosKeys.lists(), params] as const,
  details: () => [...productosKeys.all, "detail"] as const,
  detail: (id: string) => [...productosKeys.details(), id] as const,
}

/**
 * Hook para obtener productos con React Query
 * @param params - Parámetros de consulta
 * @param options - Opciones adicionales de React Query
 * @returns Query de productos
 */
export function useProductos(
  params?: ConsultaProductosParams,
  options?: Omit<UseQueryOptions<ProductoConPrecioEspecial[], Error>, "queryKey" | "queryFn">,
) {
  return useQuery({
    queryKey: productosKeys.list(params),
    queryFn: async () => {
      const response = await productosService.obtener(params)
      return response.productos || response.data || []
    },
    ...options,
  })
}

/**
 * Hook para obtener un producto específico
 * @param id - ID del producto
 * @param options - Opciones adicionales de React Query
 * @returns Query del producto
 */
export function useProducto(
  id: string,
  options?: Omit<UseQueryOptions<ProductoConPrecioEspecial, Error>, "queryKey" | "queryFn">,
) {
  return useQuery({
    queryKey: productosKeys.detail(id),
    queryFn: async () => {
      const response = await productosService.obtenerPorId(id)
      return response.data
    },
    enabled: !!id,
    ...options,
  })
}
