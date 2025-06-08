import type { UseQueryOptions, UseMutationOptions } from "@tanstack/react-query"
import type { ProductoConPrecioEspecial, PrecioEspecial } from "./entities"
import type { CrearPrecioEspecialData, ApiResponse } from "./api"

// Tipos para hooks de productos
export interface UseProductosOptions
  extends Omit<UseQueryOptions<ProductoConPrecioEspecial[], Error>, "queryKey" | "queryFn"> {}

export interface UseProductoOptions
  extends Omit<UseQueryOptions<ProductoConPrecioEspecial, Error>, "queryKey" | "queryFn"> {}

// Tipos para hooks de precios especiales
export interface UsePreciosEspecialesOptions
  extends Omit<UseQueryOptions<PrecioEspecial[], Error>, "queryKey" | "queryFn"> {}

export interface UseCrearPrecioEspecialOptions
  extends Omit<
    UseMutationOptions<ApiResponse<{ id: string; porcentajeDescuento: number }>, Error, CrearPrecioEspecialData>,
    "mutationFn"
  > {}

export interface UseEliminarPrecioEspecialOptions
  extends Omit<UseMutationOptions<ApiResponse<void>, Error, string>, "mutationFn"> {}

// Tipos para query keys
export type ProductosQueryKey = readonly ["productos", ...unknown[]]
export type PreciosEspecialesQueryKey = readonly ["precios-especiales", ...unknown[]]
