import { type NextRequest, NextResponse } from "next/server"
import clientPromise from "@/lib/mongodb"
import { ObjectId } from "mongodb"
import { validarDatos, PrecioEspecialSchema } from "@/lib/validation"
import { conManejadorDeErrores, AppError } from "@/lib/error-handler"
import { conLogging, conCORS, componerMiddlewares } from "@/lib/middleware"

// Nombre de la colección actualizado
const COLECCION_PRECIOS_ESPECIALES = "preciosEspecialesGuidoMontoya25"

async function obtenerPreciosEspecialesHandler(request: NextRequest) {
  const client = await clientPromise
  const db = client.db("tienda")

  const searchParams = request.nextUrl.searchParams
  const usuarioId = searchParams.get("usuarioId")

  let query = {}
  if (usuarioId) {
    query = { usuarioId }
  }

  const preciosEspeciales = await db.collection(COLECCION_PRECIOS_ESPECIALES).find(query).toArray()

  const preciosConId = preciosEspeciales.map((precio) => ({
    ...precio,
    _id: precio._id.toString(),
    productoId: precio.productoId.toString(),
  }))

  return NextResponse.json({
    preciosEspeciales: preciosConId,
    total: preciosConId.length,
    coleccion: COLECCION_PRECIOS_ESPECIALES,
    timestamp: new Date().toISOString(),
  })
}

async function crearPrecioEspecialHandler(request: NextRequest) {
  const client = await clientPromise
  const db = client.db("tienda")

  const body = await request.json()

  // Validar datos de entrada
  const validacion = validarDatos(PrecioEspecialSchema, body)
  if (!validacion.exito) {
    throw new AppError("Datos de entrada inválidos", 400, "VALIDATION_ERROR", validacion.errores)
  }

  const { usuarioId, clienteId, productoId, precioEspecial } = validacion.datos!

  // Obtener información del producto
  const producto = await db.collection("productos").findOne({ _id: new ObjectId(productoId) })

  if (!producto) {
    throw new AppError("Producto no encontrado", 404, "PRODUCT_NOT_FOUND")
  }

  // Validar que el precio especial sea menor al precio base
  if (precioEspecial >= producto.precioBase) {
    throw new AppError("El precio especial debe ser menor al precio base", 400, "INVALID_SPECIAL_PRICE")
  }

  // Calcular porcentaje de descuento
  const porcentajeDescuento = Math.round(((producto.precioBase - precioEspecial) / producto.precioBase) * 100 * 10) / 10

  // Verificar si ya existe un precio especial para este usuario, cliente y producto
  const precioExistente = await db.collection(COLECCION_PRECIOS_ESPECIALES).findOne({
    usuarioId,
    clienteId,
    productoId: new ObjectId(productoId),
  })

  if (precioExistente) {
    // Actualizar precio existente
    const resultado = await db.collection(COLECCION_PRECIOS_ESPECIALES).updateOne(
      { usuarioId, clienteId, productoId: new ObjectId(productoId) },
      {
        $set: {
          precioEspecial,
          porcentajeDescuento,
          fechaActualizacion: new Date(),
          activo: true,
        },
      },
    )

    return NextResponse.json(
      {
        mensaje: "Precio especial actualizado exitosamente",
        id: precioExistente._id.toString(),
        porcentajeDescuento,
        modificado: resultado.modifiedCount > 0,
        coleccion: COLECCION_PRECIOS_ESPECIALES,
        timestamp: new Date().toISOString(),
      },
      { status: 200 },
    )
  } else {
    // Crear nuevo precio especial
    const nuevoPrecio = {
      usuarioId,
      clienteId,
      productoId: new ObjectId(productoId),
      productoNombre: producto.nombre,
      productoImagen: producto.imagen,
      precioBase: producto.precioBase,
      precioEspecial,
      porcentajeDescuento,
      fechaInicio: new Date(),
      fechaFin: new Date(new Date().setFullYear(new Date().getFullYear() + 1)), // Válido por 1 año
      activo: true,
      creadoPor: "sistema", // En un sistema real, esto vendría del usuario autenticado
      fechaCreacion: new Date(),
      fechaActualizacion: new Date(),
    }

    const resultado = await db.collection(COLECCION_PRECIOS_ESPECIALES).insertOne(nuevoPrecio)

    return NextResponse.json(
      {
        mensaje: "Precio especial creado exitosamente",
        id: resultado.insertedId.toString(),
        porcentajeDescuento,
        coleccion: COLECCION_PRECIOS_ESPECIALES,
        timestamp: new Date().toISOString(),
      },
      { status: 201 },
    )
  }
}

// Aplicar middlewares
export const GET = componerMiddlewares(conLogging, conCORS, conManejadorDeErrores)(obtenerPreciosEspecialesHandler)

export const POST = componerMiddlewares(conLogging, conCORS, conManejadorDeErrores)(crearPrecioEspecialHandler)
