import type { NextRequest, NextResponse } from "next/server"

// Middleware de logging
export function conLogging<T extends any[], R>(handler: (...args: T) => Promise<NextResponse<R>>) {
  return async (...args: T): Promise<NextResponse<R>> => {
    const request = args[0] as NextRequest
    const inicio = Date.now()

    console.log(`[${new Date().toISOString()}] ${request.method} ${request.url}`)

    const response = await handler(...args)

    const duracion = Date.now() - inicio
    console.log(`[${new Date().toISOString()}] ${request.method} ${request.url} - ${response.status} (${duracion}ms)`)

    return response
  }
}

// Middleware de validación
export function conValidacion<T extends any[], R>(validador: (request: NextRequest) => Promise<void> | void) {
  return (handler: (...args: T) => Promise<NextResponse<R>>) =>
    async (...args: T): Promise<NextResponse<R>> => {
      const request = args[0] as NextRequest
      await validador(request)
      return handler(...args)
    }
}

// Middleware de CORS
export function conCORS<T extends any[], R>(handler: (...args: T) => Promise<NextResponse<R>>) {
  return async (...args: T): Promise<NextResponse<R>> => {
    const response = await handler(...args)

    response.headers.set("Access-Control-Allow-Origin", "*")
    response.headers.set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
    response.headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization")

    return response
  }
}

// Composición de middlewares
export function componerMiddlewares<T extends any[], R>(
  ...middlewares: Array<(handler: (...args: T) => Promise<NextResponse<R>>) => (...args: T) => Promise<NextResponse<R>>>
) {
  return (handler: (...args: T) => Promise<NextResponse<R>>) =>
    middlewares.reduceRight((acc, middleware) => middleware(acc), handler)
}
