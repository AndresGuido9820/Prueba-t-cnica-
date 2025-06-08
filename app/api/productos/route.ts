import { type NextRequest, NextResponse } from "next/server"
import clientPromise from "@/lib/mongodb"
import { validarDatos, ConsultaProductosSchema } from "@/lib/validation"
import { conManejadorDeErrores, AppError } from "@/lib/error-handler"
import { conLogging, conCORS, componerMiddlewares } from "@/lib/middleware"

// Nombre de la colección actualizado
const COLECCION_PRECIOS_ESPECIALES = "preciosEspecialesGuidoMontoya25"

/**
 * Obtiene la lista de productos, opcionalmente con precios especiales aplicados
 */
async function obtenerProductosHandler(request: NextRequest) {
  const client = await clientPromise
  const db = client.db("tienda")

  // Validar parámetros de consulta
  const searchParams = Object.fromEntries(request.nextUrl.searchParams.entries())
  const validacion = validarDatos(ConsultaProductosSchema, searchParams)

  if (!validacion.exito) {
    throw new AppError("Parámetros de consulta inválidos", 400, "VALIDATION_ERROR", validacion.errores)
  }

  const {
    usuarioId,
    categoria,
    limite = 50,
    pagina = 1,
    busqueda,
    precioMin,
    precioMax,
    ordenarPor = "nombre",
  } = validacion.datos!

  // Construir filtros de consulta
  const filtros: any = {}
  if (categoria) {
    filtros.categoria = categoria
  }
  if (busqueda) {
    filtros.$or = [
      { nombre: { $regex: busqueda, $options: "i" } },
      { descripcion: { $regex: busqueda, $options: "i" } },
      { marca: { $regex: busqueda, $options: "i" } },
    ]
  }
  if (precioMin !== undefined || precioMax !== undefined) {
    filtros.precio = {}
    if (precioMin !== undefined) filtros.precio.$gte = precioMin
    if (precioMax !== undefined) filtros.precio.$lte = precioMax
  }

  // Calcular skip para paginación
  const skip = (pagina - 1) * limite

  // Configurar ordenamiento
  const ordenamiento: any = {}
  switch (ordenarPor) {
    case "precio_asc":
      ordenamiento.precio = 1
      break
    case "precio_desc":
      ordenamiento.precio = -1
      break
    case "rating":
      ordenamiento.rating = -1
      break
    case "nombre":
    default:
      ordenamiento.nombre = 1
      break
  }

  // Obtener productos con filtros, paginación y ordenamiento
  const productos = await db.collection("productos").find(filtros).sort(ordenamiento).skip(skip).limit(limite).toArray()

  // Obtener total para paginación
  const total = await db.collection("productos").countDocuments(filtros)

  if (usuarioId) {
    // Obtener precios especiales para el usuario con fechas válidas
    const fechaActual = new Date()
    const preciosEspeciales = await db
      .collection(COLECCION_PRECIOS_ESPECIALES)
      .find({
        usuarioId,
        activo: true,
        fechaInicio: { $lte: fechaActual },
        fechaFin: { $gte: fechaActual },
      })
      .toArray()

    // Crear un mapa de precios especiales por productoId
    const preciosMap = new Map()
    preciosEspeciales.forEach((precio) => {
      preciosMap.set(precio.productoId.toString(), {
        precioEspecial: precio.precioEspecial,
        porcentajeDescuento: precio.porcentajeDescuento,
      })
    })

    // Combinar productos con precios especiales
    const productosConPrecios = productos.map((producto) => {
      const precioInfo = preciosMap.get(producto._id.toString())
      return {
        ...producto,
        _id: producto._id.toString(),
        precioEspecial: precioInfo?.precioEspecial,
        porcentajeDescuento: precioInfo?.porcentajeDescuento,
        tienePrecioEspecial: !!precioInfo,
      }
    })

    return NextResponse.json({
      productos: productosConPrecios,
      total,
      pagina,
      limite,
      totalPaginas: Math.ceil(total / limite),
      usuarioId,
      coleccionPrecios: COLECCION_PRECIOS_ESPECIALES,
      timestamp: new Date().toISOString(),
    })
  }

  // Si no hay usuarioId, devolver productos normales
  const productosNormales = productos.map((producto) => ({
    ...producto,
    _id: producto._id.toString(),
  }))

  return NextResponse.json({
    productos: productosNormales,
    total,
    pagina,
    limite,
    totalPaginas: Math.ceil(total / limite),
    timestamp: new Date().toISOString(),
  })
}

// Aplicar middlewares y exportar
export const GET = componerMiddlewares(conLogging, conCORS, conManejadorDeErrores)(obtenerProductosHandler)
