import { useQuery, useMutation, useQueryClient, type UseQueryOptions } from "@tanstack/react-query"
import { preciosEspecialesService } from "@/services/api"
import type { CrearPrecioEspecialData } from "@/types/api"
import type { PrecioEspecial } from "@/types/entities"
import { productosKeys } from "./use-productos"

/**
 * Claves de consulta para precios especiales
 */
export const preciosEspecialesKeys = {
  all: ["precios-especiales"] as const,
  lists: () => [...preciosEspecialesKeys.all, "list"] as const,
  list: (usuarioId?: string) => [...preciosEspecialesKeys.lists(), usuarioId] as const,
}

/**
 * Hook para obtener precios especiales
 * @param usuarioId - ID del usuario (opcional)
 * @param options - Opciones adicionales de React Query
 * @returns Query de precios especiales
 */
export function usePreciosEspeciales(
  usuarioId?: string,
  options?: Omit<UseQueryOptions<PrecioEspecial[], Error>, "queryKey" | "queryFn">,
) {
  return useQuery({
    queryKey: preciosEspecialesKeys.list(usuarioId),
    queryFn: async () => {
      const response = await preciosEspecialesService.obtener(usuarioId)
      return response.preciosEspeciales || response.data || []
    },
    ...options,
  })
}

/**
 * Hook para crear precios especiales
 * @returns Mutación para crear precio especial
 */
export function useCrearPrecioEspecial() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: CrearPrecioEspecialData) => preciosEspecialesService.crear(data),
    onSuccess: (data, variables) => {
      // Invalidar consultas relacionadas
      queryClient.invalidateQueries({ queryKey: preciosEspecialesKeys.all })
      queryClient.invalidateQueries({ queryKey: productosKeys.all })

      // Actualizar cache específico si existe
      queryClient.invalidateQueries({
        queryKey: preciosEspecialesKeys.list(variables.usuarioId),
      })
    },
    onError: (error) => {
      console.error("Error al crear precio especial:", error)
    },
  })
}

/**
 * Hook para eliminar precios especiales
 * @returns Mutación para eliminar precio especial
 */
export function useEliminarPrecioEspecial() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string) => preciosEspecialesService.eliminar(id),
    onSuccess: () => {
      // Invalidar todas las consultas relacionadas
      queryClient.invalidateQueries({ queryKey: preciosEspecialesKeys.all })
      queryClient.invalidateQueries({ queryKey: productosKeys.all })
    },
    onError: (error) => {
      console.error("Error al eliminar precio especial:", error)
    },
  })
}
