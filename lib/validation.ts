import { z } from "zod"

// Schema para validar productos
export const ProductoSchema = z.object({
  nombre: z.string().min(1, "El nombre es requerido").max(100, "El nombre es muy largo"),
  descripcion: z.string().min(1, "La descripción es requerida").max(500, "La descripción es muy larga"),
  precio: z.number().positive("El precio debe ser positivo"),
  precioBase: z.number().positive("El precio base debe ser positivo"),
  categoria: z.string().min(1, "La categoría es requerida"),
  stock: z.number().int().min(0, "El stock no puede ser negativo"),
  imagen: z.string().url("La imagen debe ser una URL válida").optional(),
  sku: z.string().min(1, "El SKU es requerido"),
  marca: z.string().min(1, "La marca es requerida"),
  rating: z.number().min(0).max(5, "El rating debe estar entre 0 y 5"),
})

// Schema para validar precios especiales
export const PrecioEspecialSchema = z.object({
  usuarioId: z.string().min(1, "El ID de usuario es requerido"),
  clienteId: z.string().min(1, "El ID de cliente es requerido"),
  productoId: z.string().min(1, "El ID de producto es requerido"),
  precioEspecial: z.number().positive("El precio especial debe ser positivo"),
})

// Schema para validar parámetros de consulta
export const ConsultaProductosSchema = z.object({
  usuarioId: z.string().optional(),
  categoria: z.string().optional(),
  busqueda: z.string().optional(),
  precioMin: z.string().transform(Number).pipe(z.number().min(0)).optional(),
  precioMax: z.string().transform(Number).pipe(z.number().min(0)).optional(),
  ordenarPor: z.enum(["nombre", "precio_asc", "precio_desc", "rating"]).optional(),
  limite: z.string().transform(Number).pipe(z.number().int().positive()).optional(),
  pagina: z.string().transform(Number).pipe(z.number().int().positive()).optional(),
})

// Función helper para validar datos
export function validarDatos<T>(
  schema: z.ZodSchema<T>,
  datos: unknown,
): {
  exito: boolean
  datos?: T
  errores?: Array<{ campo: string; mensaje: string }>
} {
  try {
    const datosValidados = schema.parse(datos)
    return { exito: true, datos: datosValidados }
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errores = error.errors.map((err) => ({
        campo: err.path.join("."),
        mensaje: err.message,
      }))
      return { exito: false, errores }
    }
    return {
      exito: false,
      errores: [{ campo: "general", mensaje: "Error de validación desconocido" }],
    }
  }
}
