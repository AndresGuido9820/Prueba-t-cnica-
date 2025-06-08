import { NextResponse } from "next/server"

export interface ErrorResponse {
  error: string
  codigo?: string
  detalles?: Array<{ campo: string; mensaje: string }>
  timestamp: string
}

export class AppError extends Error {
  public readonly statusCode: number
  public readonly codigo?: string
  public readonly detalles?: Array<{ campo: string; mensaje: string }>

  constructor(
    message: string,
    statusCode = 500,
    codigo?: string,
    detalles?: Array<{ campo: string; mensaje: string }>,
  ) {
    super(message)
    this.statusCode = statusCode
    this.codigo = codigo
    this.detalles = detalles
    this.name = "AppError"
  }
}

export function manejarError(error: unknown): NextResponse<ErrorResponse> {
  console.error("Error en API:", error)

  // Error personalizado de la aplicación
  if (error instanceof AppError) {
    return NextResponse.json(
      {
        error: error.message,
        codigo: error.codigo,
        detalles: error.detalles,
        timestamp: new Date().toISOString(),
      },
      { status: error.statusCode },
    )
  }

  // Error de MongoDB
  if (error && typeof error === "object" && "code" in error) {
    const mongoError = error as { code: number; message: string }

    switch (mongoError.code) {
      case 11000:
        return NextResponse.json(
          {
            error: "Ya existe un registro con estos datos",
            codigo: "DUPLICADO",
            timestamp: new Date().toISOString(),
          },
          { status: 409 },
        )
      default:
        return NextResponse.json(
          {
            error: "Error de base de datos",
            codigo: "DB_ERROR",
            timestamp: new Date().toISOString(),
          },
          { status: 500 },
        )
    }
  }

  // Error genérico
  return NextResponse.json(
    {
      error: "Error interno del servidor",
      codigo: "INTERNAL_ERROR",
      timestamp: new Date().toISOString(),
    },
    { status: 500 },
  )
}

// Wrapper para manejar errores en endpoints
export function conManejadorDeErrores<T extends any[], R>(handler: (...args: T) => Promise<NextResponse<R>>) {
  return async (...args: T): Promise<NextResponse<R | ErrorResponse>> => {
    try {
      return await handler(...args)
    } catch (error) {
      return manejarError(error)
    }
  }
}
