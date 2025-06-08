import { useQuery, type UseQueryOptions } from "@tanstack/react-query"
import type { ProductoConPrecioEspecial } from "@/types/entities"

/**
 * Hook para obtener un producto específico por ID
 */
export function useProducto(
  id: string,
  usuarioId?: string,
  options?: Omit<UseQueryOptions<ProductoConPrecioEspecial, Error>, "queryKey" | "queryFn">,
) {
  return useQuery({
    queryKey: ["producto", id, usuarioId],
    queryFn: async () => {
      const url = usuarioId ? `/api/productos/${id}?usuarioId=${encodeURIComponent(usuarioId)}` : `/api/productos/${id}`

      const response = await fetch(url)
      if (!response.ok) {
        throw new Error("Error al obtener el producto")
      }
      const data = await response.json()
      return data.producto
    },
    enabled: !!id,
    ...options,
  })
}
