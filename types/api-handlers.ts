import type { NextRequest, NextResponse } from "next/server"
import type { ApiResponse, ApiError } from "./api"

// Tipos para handlers de API
export type ApiHandler<T = unknown> = (
  request: NextRequest,
  context?: RequestContext,
) => Promise<NextResponse<ApiResponse<T> | ApiError>>

export type ApiHandlerWithParams<T = unknown, P = Record<string, string>> = (
  request: NextRequest,
  context: { params: P },
) => Promise<NextResponse<ApiResponse<T> | ApiError>>

export interface RequestContext {
  params?: Record<string, string>
}

// Tipos para middleware
export type MiddlewareHandler<T = unknown> = (handler: ApiHandler<T>) => ApiHandler<T>

export type MiddlewareHandlerWithParams<T = unknown, P = Record<string, string>> = (
  handler: ApiHandlerWithParams<T, P>,
) => ApiHandlerWithParams<T, P>

// Tipos para validación de requests
export interface ValidatedRequest<T = Record<string, unknown>> extends NextRequest {
  validatedData: T
}

export interface ValidationResult<T> {
  success: boolean
  data?: T
  errors?: ValidationError[]
}

export interface ValidationError {
  field: string
  message: string
}
