"use client"

import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { useState, type ReactNode } from "react"

interface QueryProviderProps {
  children: ReactNode
}

/**
 * Provider para React Query que configura el cliente de consultas
 * y proporciona herramientas de desarrollo en modo desarrollo
 */
export default function QueryProvider({ children }: QueryProviderProps) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            // Tiempo de vida de los datos en cache (5 minutos)
            staleTime: 1000 * 60 * 5,
            // Tiempo antes de que los datos se consideren obsoletos (10 minutos)
            gcTime: 1000 * 60 * 10,
            // Reintentos en caso de error
            retry: 2,
            // Intervalo de reintento
            retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
            // Refetch en focus de ventana
            refetchOnWindowFocus: false,
          },
          mutations: {
            // Reintentos para mutaciones
            retry: 1,
          },
        },
      }),
  )

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {process.env.NODE_ENV === "development" && <ReactQueryDevtools initialIsOpen={false} />}
    </QueryClientProvider>
  )
}
