import { type NextRequest, NextResponse } from "next/server"
import clientPromise from "@/lib/mongodb"
import { ObjectId } from "mongodb"
import { conManejadorDeErrores, AppError } from "@/lib/error-handler"
import { conLogging, conCORS, componerMiddlewares } from "@/lib/middleware"

const COLECCION_PRECIOS_ESPECIALES = "preciosEspecialesGuidoMontoya25"

/**
 * Obtiene un producto específico por ID, con precios especiales si aplica
 */
async function obtenerProductoPorIdHandler(request: NextRequest, { params }: { params: { id: string } }) {
  const client = await clientPromise
  const db = client.db("tienda")

  const { id } = params
  const searchParams = request.nextUrl.searchParams
  const usuarioId = searchParams.get("usuarioId")

  // Validar ObjectId
  if (!ObjectId.isValid(id)) {
    throw new AppError("ID de producto inválido", 400, "INVALID_PRODUCT_ID")
  }

  // Obtener el producto
  const producto = await db.collection("productos").findOne({ _id: new ObjectId(id) })

  if (!producto) {
    throw new AppError("Producto no encontrado", 404, "PRODUCT_NOT_FOUND")
  }

  // Convertir ObjectId a string
  const productoBase = {
    ...producto,
    _id: producto._id.toString(),
  }

  // Si hay usuarioId, buscar precio especial
  if (usuarioId) {
    const fechaActual = new Date()
    const precioEspecial = await db.collection(COLECCION_PRECIOS_ESPECIALES).findOne({
      usuarioId,
      productoId: new ObjectId(id),
      activo: true,
      fechaInicio: { $lte: fechaActual },
      fechaFin: { $gte: fechaActual },
    })

    if (precioEspecial) {
      return NextResponse.json({
        producto: {
          ...productoBase,
          precioEspecial: precioEspecial.precioEspecial,
          porcentajeDescuento: precioEspecial.porcentajeDescuento,
          tienePrecioEspecial: true,
          fechaInicioDescuento: precioEspecial.fechaInicio,
          fechaFinDescuento: precioEspecial.fechaFin,
        },
        usuarioId,
        timestamp: new Date().toISOString(),
      })
    }
  }

  // Devolver producto sin precio especial
  return NextResponse.json({
    producto: productoBase,
    timestamp: new Date().toISOString(),
  })
}

export const GET = componerMiddlewares(conLogging, conCORS, conManejadorDeErrores)(obtenerProductoPorIdHandler)
