// Cargar variables de entorno
require("dotenv").config()

const { MongoClient } = require("mongodb")

// Usar variable de entorno en lugar de hardcoded
const MONGODB_URI = process.env.MONGODB_URI

// Verificar que la variable existe
if (!MONGODB_URI) {
  console.error("❌ Error: MONGODB_URI no está definida en .env.local")
  console.log("📝 Crea un archivo .env.local con:")
  
  process.exit(1)
}



// Nombre de la colección actualizado
const COLECCION_PRECIOS_ESPECIALES = "preciosEspecialesGuidoMontoya25"

async function seedDatabase() {
  const client = new MongoClient(MONGODB_URI)

  try {
    console.log("🔄 Conectando a MongoDB...")
    await client.connect()
    console.log("✅ Conectado a MongoDB exitosamente")

    const db = client.db("tienda")

    // Verificar si las colecciones existen
    const collections = await db.listCollections().toArray()
    const collectionNames = collections.map((col) => col.name)

    console.log("📋 Colecciones existentes:", collectionNames)

    // Limpiar colecciones existentes (opcional)
    console.log("🧹 Limpiando colecciones existentes...")

    if (collectionNames.includes("productos")) {
      await db.collection("productos").deleteMany({})
      console.log("   ✅ Colección 'productos' limpiada")
    }

    if (collectionNames.includes(COLECCION_PRECIOS_ESPECIALES)) {
      await db.collection(COLECCION_PRECIOS_ESPECIALES).deleteMany({})
      console.log(`   ✅ Colección '${COLECCION_PRECIOS_ESPECIALES}' limpiada`)
    }

    // Datos de productos expandidos con más variedad
    console.log("📦 Insertando productos...")
    const productos = [
      // ELECTRÓNICOS - LAPTOPS
      {
        nombre: "MacBook Pro 16 M3 Max",
        descripcion: "Laptop profesional con chip M3 Max, 32GB RAM, SSD 1TB, pantalla Liquid Retina XDR",
        precio: 3499.99,
        precioBase: 3499.99,
        categoria: "Electrónicos",
        stock: 8,
        imagen: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500&h=300&fit=crop",
        sku: "MBP16M3-001",
        marca: "Apple",
        rating: 4.9,
      },
      {
        nombre: "Dell XPS 13 Plus",
        descripcion: "Ultrabook premium con Intel i7-13700H, 16GB RAM, SSD 512GB, pantalla OLED 4K",
        precio: 1899.99,
        precioBase: 1899.99,
        categoria: "Electrónicos",
        stock: 12,
        imagen: "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=500&h=300&fit=crop",
        sku: "XPS13P-002",
        marca: "Dell",
        rating: 4.7,
      },
      {
        nombre: "ASUS ROG Strix G15",
        descripcion: "Laptop gaming con AMD Ryzen 9, RTX 4070, 32GB RAM, SSD 1TB, pantalla 165Hz",
        precio: 2299.99,
        precioBase: 2299.99,
        categoria: "Electrónicos",
        stock: 15,
        imagen: "https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=500&h=300&fit=crop",
        sku: "ROGSTX-003",
        marca: "ASUS",
        rating: 4.6,
      },
      {
        nombre: "Lenovo ThinkPad X1 Carbon",
        descripcion: "Laptop empresarial ultraliviana, Intel i7, 16GB RAM, SSD 512GB, certificación militar",
        precio: 1699.99,
        precioBase: 1699.99,
        categoria: "Electrónicos",
        stock: 20,
        imagen: "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=500&h=300&fit=crop",
        sku: "TPX1C-004",
        marca: "Lenovo",
        rating: 4.5,
      },

      // ELECTRÓNICOS - SMARTPHONES
      {
        nombre: "iPhone 15 Pro Max",
        descripcion: "Smartphone premium con chip A17 Pro, cámara de 48MP, titanio, 256GB",
        precio: 1299.99,
        precioBase: 1299.99,
        categoria: "Electrónicos",
        stock: 25,
        imagen: "https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=500&h=300&fit=crop",
        sku: "IP15PM-005",
        marca: "Apple",
        rating: 4.8,
      },
      {
        nombre: "Samsung Galaxy S24 Ultra",
        descripcion: "Smartphone Android flagship con S Pen, cámara 200MP, 12GB RAM, 512GB",
        precio: 1199.99,
        precioBase: 1199.99,
        categoria: "Electrónicos",
        stock: 30,
        imagen: "https://images.unsplash.com/phone-1052023-unsplash.jpg?w=500&h=300&fit=crop",
        sku: "SGS24U-006",
        marca: "Samsung",
        rating: 4.7,
      },
      {
        nombre: "Google Pixel 8 Pro",
        descripcion: "Smartphone con IA avanzada, cámara computacional, 12GB RAM, 256GB, Android puro",
        precio: 999.99,
        precioBase: 999.99,
        categoria: "Electrónicos",
        stock: 18,
        imagen: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500&h=300&fit=crop",
        sku: "GP8P-007",
        marca: "Google",
        rating: 4.6,
      },
      {
        nombre: "OnePlus 12",
        descripcion: "Smartphone flagship killer, Snapdragon 8 Gen 3, carga rápida 100W, 16GB RAM",
        precio: 799.99,
        precioBase: 799.99,
        categoria: "Electrónicos",
        stock: 22,
        imagen: "https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?w=500&h=300&fit=crop",
        sku: "OP12-008",
        marca: "OnePlus",
        rating: 4.5,
      },

      // AUDIO
      {
        nombre: "Sony WH-1000XM5",
        descripcion: "Auriculares inalámbricos premium con cancelación de ruido líder en la industria",
        precio: 399.99,
        precioBase: 399.99,
        categoria: "Audio",
        stock: 45,
        imagen: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=300&fit=crop",
        sku: "SNWH1K-009",
        marca: "Sony",
        rating: 4.8,
      },
      {
        nombre: "AirPods Pro 2",
        descripcion: "Auriculares inalámbricos con cancelación activa de ruido y audio espacial",
        precio: 279.99,
        precioBase: 279.99,
        categoria: "Audio",
        stock: 60,
        imagen: "https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=500&h=300&fit=crop",
        sku: "APP2-010",
        marca: "Apple",
        rating: 4.7,
      },
      {
        nombre: "Bose QuietComfort 45",
        descripcion: "Auriculares over-ear con cancelación de ruido excepcional y comodidad todo el día",
        precio: 329.99,
        precioBase: 329.99,
        categoria: "Audio",
        stock: 35,
        imagen: "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=500&h=300&fit=crop",
        sku: "BQC45-011",
        marca: "Bose",
        rating: 4.6,
      },
      {
        nombre: "Sennheiser HD 660S2",
        descripcion: "Auriculares audiófilo de referencia, drivers dinámicos de 38mm, impedancia 300Ω",
        precio: 599.99,
        precioBase: 599.99,
        categoria: "Audio",
        stock: 15,
        imagen: "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=500&h=300&fit=crop",
        sku: "SNHD660-012",
        marca: "Sennheiser",
        rating: 4.9,
      },

      // MONITORES
      {
        nombre: "LG UltraGear 27GP950",
        descripcion: 'Monitor gaming 27" 4K 144Hz, Nano IPS, HDR600, compatible con NVIDIA G-SYNC',
        precio: 799.99,
        precioBase: 799.99,
        categoria: "Monitores",
        stock: 12,
        imagen: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=500&h=300&fit=crop",
        sku: "LGUG27-013",
        marca: "LG",
        rating: 4.7,
      },
      {
        nombre: "Samsung Odyssey G9",
        descripcion: 'Monitor curvo ultrawide 49" QLED, 240Hz, 1ms, resolución 5120x1440',
        precio: 1299.99,
        precioBase: 1299.99,
        categoria: "Monitores",
        stock: 6,
        imagen: "https://images.unsplash.com/photo-1547082299-de196ea013d6?w=500&h=300&fit=crop",
        sku: "SMODG9-014",
        marca: "Samsung",
        rating: 4.8,
      },
      {
        nombre: "Dell UltraSharp U2723QE",
        descripcion: 'Monitor profesional 27" 4K IPS, 99% sRGB, USB-C 90W, altura ajustable',
        precio: 649.99,
        precioBase: 649.99,
        categoria: "Monitores",
        stock: 18,
        imagen: "https://images.unsplash.com/photo-1593640408182-31c70c8268f5?w=500&h=300&fit=crop",
        sku: "DLUS27-015",
        marca: "Dell",
        rating: 4.6,
      },

      // PERIFÉRICOS
      {
        nombre: "Logitech MX Master 3S",
        descripcion: "Mouse inalámbrico premium para productividad, sensor 8000 DPI, batería 70 días",
        precio: 109.99,
        precioBase: 109.99,
        categoria: "Periféricos",
        stock: 50,
        imagen: "https://images.unsplash.com/photo-1527814050087-3793815479db?w=500&h=300&fit=crop",
        sku: "LGMX3S-016",
        marca: "Logitech",
        rating: 4.8,
      },
      {
        nombre: "Razer DeathAdder V3 Pro",
        descripcion: "Mouse gaming inalámbrico, sensor Focus Pro 30K, switches ópticas, 90h batería",
        precio: 149.99,
        precioBase: 149.99,
        categoria: "Periféricos",
        stock: 40,
        imagen: "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=500&h=300&fit=crop",
        sku: "RZDA3P-017",
        marca: "Razer",
        rating: 4.7,
      },
      {
        nombre: "Keychron K8 Pro",
        descripcion: "Teclado mecánico inalámbrico 75%, switches Gateron Pro, retroiluminación RGB",
        precio: 199.99,
        precioBase: 199.99,
        categoria: "Periféricos",
        stock: 30,
        imagen: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500&h=300&fit=crop",
        sku: "KCK8P-018",
        marca: "Keychron",
        rating: 4.6,
      },
      {
        nombre: "SteelSeries Apex Pro TKL",
        descripcion: "Teclado gaming mecánico sin numpad, switches OmniPoint ajustables, OLED display",
        precio: 189.99,
        precioBase: 189.99,
        categoria: "Periféricos",
        stock: 25,
        imagen: "https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=500&h=300&fit=crop",
        sku: "SSAPTKL-019",
        marca: "SteelSeries",
        rating: 4.5,
      },

      // TABLETS
      {
        nombre: "iPad Pro 12.9 M2",
        descripcion: "Tablet profesional con chip M2, pantalla Liquid Retina XDR, 256GB, compatible con Apple Pencil",
        precio: 1199.99,
        precioBase: 1199.99,
        categoria: "Tablets",
        stock: 15,
        imagen: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=500&h=300&fit=crop",
        sku: "IPP12M2-020",
        marca: "Apple",
        rating: 4.8,
      },
      {
        nombre: "Samsung Galaxy Tab S9 Ultra",
        descripcion: "Tablet Android premium 14.6', Snapdragon 8 Gen 2, S Pen incluido, 12GB RAM",
        precio: 1099.99,
        precioBase: 1099.99,
        categoria: "Tablets",
        stock: 12,
        imagen: "https://images.unsplash.com/photo-1561154464-82e9adf32764?w=500&h=300&fit=crop",
        sku: "SGTS9U-021",
        marca: "Samsung",
        rating: 4.7,
      },
      {
        nombre: "Microsoft Surface Pro 9",
        descripcion: "Tablet 2-en-1 con Windows 11, Intel i7, 16GB RAM, SSD 512GB, Type Cover incluido",
        precio: 1599.99,
        precioBase: 1599.99,
        categoria: "Tablets",
        stock: 10,
        imagen: "https://images.unsplash.com/photo-1585792180666-f7347c490ee2?w=500&h=300&fit=crop",
        sku: "MSSP9-022",
        marca: "Microsoft",
        rating: 4.5,
      },

      // FOTOGRAFÍA
      {
        nombre: "Canon EOS R5",
        descripcion: "Cámara mirrorless profesional 45MP, grabación 8K, estabilización IBIS, dual card slots",
        precio: 3899.99,
        precioBase: 3899.99,
        categoria: "Fotografía",
        stock: 5,
        imagen: "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=500&h=300&fit=crop",
        sku: "CNEOSR5-023",
        marca: "Canon",
        rating: 4.9,
      },
      {
        nombre: "Sony A7 IV",
        descripcion: "Cámara mirrorless full-frame 33MP, grabación 4K 60p, enfoque híbrido avanzado",
        precio: 2499.99,
        precioBase: 2499.99,
        categoria: "Fotografía",
        stock: 8,
        imagen: "https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?w=500&h=300&fit=crop",
        sku: "SNA7IV-024",
        marca: "Sony",
        rating: 4.8,
      },
      {
        nombre: "Fujifilm X-T5",
        descripcion: "Cámara mirrorless APS-C 40MP, simulaciones de película, estabilización 7 stops",
        precio: 1699.99,
        precioBase: 1699.99,
        categoria: "Fotografía",
        stock: 12,
        imagen: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=500&h=300&fit=crop",
        sku: "FJXT5-025",
        marca: "Fujifilm",
        rating: 4.7,
      },

      // GAMING
      {
        nombre: "PlayStation 5 Pro",
        descripcion: "Consola de videojuegos de nueva generación, SSD ultra rápido, ray tracing, 4K 120fps",
        precio: 699.99,
        precioBase: 699.99,
        categoria: "Gaming",
        stock: 20,
        imagen: "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=500&h=300&fit=crop",
        sku: "PS5PRO-026",
        marca: "Sony",
        rating: 4.9,
      },
      {
        nombre: "Xbox Series X",
        descripcion: "Consola gaming 4K, 12 teraflops, SSD 1TB, Quick Resume, retrocompatibilidad",
        precio: 499.99,
        precioBase: 499.99,
        categoria: "Gaming",
        stock: 25,
        imagen: "https://images.unsplash.com/photo-1621259182978-fbf93132d53d?w=500&h=300&fit=crop",
        sku: "XBSX-027",
        marca: "Microsoft",
        rating: 4.8,
      },
      {
        nombre: "Nintendo Switch OLED",
        descripcion: "Consola híbrida con pantalla OLED 7', dock mejorado, 64GB almacenamiento interno",
        precio: 349.99,
        precioBase: 349.99,
        categoria: "Gaming",
        stock: 35,
        imagen: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=500&h=300&fit=crop",
        sku: "NSWOLED-028",
        marca: "Nintendo",
        rating: 4.6,
      },

      // ALMACENAMIENTO
      {
        nombre: "Samsung 980 PRO 2TB",
        descripcion: "SSD NVMe PCIe 4.0, velocidades hasta 7000 MB/s, ideal para gaming y creación de contenido",
        precio: 199.99,
        precioBase: 199.99,
        categoria: "Almacenamiento",
        stock: 40,
        imagen: "https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=500&h=300&fit=crop",
        sku: "SM980P2T-029",
        marca: "Samsung",
        rating: 4.8,
      },
      {
        nombre: "WD Black SN850X 1TB",
        descripcion: "SSD gaming NVMe Gen4, hasta 7300 MB/s, disipador incluido, optimizado para PS5",
        precio: 149.99,
        precioBase: 149.99,
        categoria: "Almacenamiento",
        stock: 50,
        imagen: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&h=300&fit=crop",
        sku: "WDSN850X-030",
        marca: "Western Digital",
        rating: 4.7,
      },
    ]

    // Insertar productos
    const resultadoProductos = await db.collection("productos").insertMany(productos)
    console.log(`   ✅ ${resultadoProductos.insertedCount} productos insertados`)

    // Obtener IDs de productos insertados
    const productosInsertados = await db.collection("productos").find({}).toArray()

    // Crear precios especiales más variados
    console.log(`💰 Creando colección '${COLECCION_PRECIOS_ESPECIALES}'...`)

    const preciosEspeciales = [
      // Usuario USR001 - Cliente Premium (muchos descuentos)
      {
        usuarioId: "USR001",
        clienteId: "CLI001",
        productoId: productosInsertados[0]._id, // MacBook Pro
        productoNombre: productosInsertados[0].nombre,
        productoImagen: productosInsertados[0].imagen,
        precioBase: productosInsertados[0].precioBase,
        precioEspecial: 2999.99, // 14% descuento
        porcentajeDescuento: 14.3,
        fechaInicio: new Date("2024-01-01"),
        fechaFin: new Date("2024-12-31"),
        activo: true,
        creadoPor: "admin@tienda.com",
        fechaCreacion: new Date(),
        fechaActualizacion: new Date(),
      },
      {
        usuarioId: "USR001",
        clienteId: "CLI001",
        productoId: productosInsertados[4]._id, // iPhone 15 Pro Max
        productoNombre: productosInsertados[4].nombre,
        productoImagen: productosInsertados[4].imagen,
        precioBase: productosInsertados[4].precioBase,
        precioEspecial: 1099.99, // 15% descuento
        porcentajeDescuento: 15.4,
        fechaInicio: new Date("2024-01-01"),
        fechaFin: new Date("2024-12-31"),
        activo: true,
        creadoPor: "admin@tienda.com",
        fechaCreacion: new Date(),
        fechaActualizacion: new Date(),
      },
      {
        usuarioId: "USR001",
        clienteId: "CLI001",
        productoId: productosInsertados[8]._id, // Sony WH-1000XM5
        productoNombre: productosInsertados[8].nombre,
        productoImagen: productosInsertados[8].imagen,
        precioBase: productosInsertados[8].precioBase,
        precioEspecial: 319.99, // 20% descuento
        porcentajeDescuento: 20.0,
        fechaInicio: new Date("2024-01-01"),
        fechaFin: new Date("2024-12-31"),
        activo: true,
        creadoPor: "admin@tienda.com",
        fechaCreacion: new Date(),
        fechaActualizacion: new Date(),
      },

      // Usuario USR002 - Cliente Corporativo
      {
        usuarioId: "USR002",
        clienteId: "CLI002",
        productoId: productosInsertados[1]._id, // Dell XPS 13
        productoNombre: productosInsertados[1].nombre,
        productoImagen: productosInsertados[1].imagen,
        precioBase: productosInsertados[1].precioBase,
        precioEspecial: 1599.99, // 16% descuento
        porcentajeDescuento: 15.8,
        fechaInicio: new Date("2024-01-01"),
        fechaFin: new Date("2024-12-31"),
        activo: true,
        creadoPor: "admin@tienda.com",
        fechaCreacion: new Date(),
        fechaActualizacion: new Date(),
      },
      {
        usuarioId: "USR002",
        clienteId: "CLI002",
        productoId: productosInsertados[3]._id, // ThinkPad X1
        productoNombre: productosInsertados[3].nombre,
        productoImagen: productosInsertados[3].imagen,
        precioBase: productosInsertados[3].precioBase,
        precioEspecial: 1399.99, // 18% descuento
        porcentajeDescuento: 17.6,
        fechaInicio: new Date("2024-01-01"),
        fechaFin: new Date("2024-12-31"),
        activo: true,
        creadoPor: "admin@tienda.com",
        fechaCreacion: new Date(),
        fechaActualizacion: new Date(),
      },
      {
        usuarioId: "USR002",
        clienteId: "CLI002",
        productoId: productosInsertados[15]._id, // Dell Monitor
        productoNombre: productosInsertados[15].nombre,
        productoImagen: productosInsertados[15].imagen,
        precioBase: productosInsertados[15].precioBase,
        precioEspecial: 549.99, // 15% descuento
        porcentajeDescuento: 15.4,
        fechaInicio: new Date("2024-01-01"),
        fechaFin: new Date("2024-12-31"),
        activo: true,
        creadoPor: "admin@tienda.com",
        fechaCreacion: new Date(),
        fechaActualizacion: new Date(),
      },

      // Usuario USR003 - Gamer
      {
        usuarioId: "USR003",
        clienteId: "CLI003",
        productoId: productosInsertados[2]._id, // ASUS ROG
        productoNombre: productosInsertados[2].nombre,
        productoImagen: productosInsertados[2].imagen,
        precioBase: productosInsertados[2].precioBase,
        precioEspecial: 1999.99, // 13% descuento
        porcentajeDescuento: 13.0,
        fechaInicio: new Date("2024-01-01"),
        fechaFin: new Date("2024-12-31"),
        activo: true,
        creadoPor: "admin@tienda.com",
        fechaCreacion: new Date(),
        fechaActualizacion: new Date(),
      },
      {
        usuarioId: "USR003",
        clienteId: "CLI003",
        productoId: productosInsertados[14]._id, // Samsung Odyssey G9
        productoNombre: productosInsertados[14].nombre,
        productoImagen: productosInsertados[14].imagen,
        precioBase: productosInsertados[14].precioBase,
        precioEspecial: 1099.99, // 15% descuento
        porcentajeDescuento: 15.4,
        fechaInicio: new Date("2024-01-01"),
        fechaFin: new Date("2024-12-31"),
        activo: true,
        creadoPor: "admin@tienda.com",
        fechaCreacion: new Date(),
        fechaActualizacion: new Date(),
      },
      {
        usuarioId: "USR003",
        clienteId: "CLI003",
        productoId: productosInsertados[17]._id, // Razer Mouse
        productoNombre: productosInsertados[17].nombre,
        productoImagen: productosInsertados[17].imagen,
        precioBase: productosInsertados[17].precioBase,
        precioEspecial: 119.99, // 20% descuento
        porcentajeDescuento: 20.0,
        fechaInicio: new Date("2024-01-01"),
        fechaFin: new Date("2024-12-31"),
        activo: true,
        creadoPor: "admin@tienda.com",
        fechaCreacion: new Date(),
        fechaActualizacion: new Date(),
      },
      {
        usuarioId: "USR003",
        clienteId: "CLI003",
        productoId: productosInsertados[26]._id, // PlayStation 5 Pro
        productoNombre: productosInsertados[26].nombre,
        productoImagen: productosInsertados[26].imagen,
        precioBase: productosInsertados[26].precioBase,
        precioEspecial: 599.99, // 14% descuento
        porcentajeDescuento: 14.3,
        fechaInicio: new Date("2024-01-01"),
        fechaFin: new Date("2024-12-31"),
        activo: true,
        creadoPor: "admin@tienda.com",
        fechaCreacion: new Date(),
        fechaActualizacion: new Date(),
      },

      // Usuario USR004 - Creador de Contenido
      {
        usuarioId: "USR004",
        clienteId: "CLI004",
        productoId: productosInsertados[23]._id, // Canon EOS R5
        productoNombre: productosInsertados[23].nombre,
        productoImagen: productosInsertados[23].imagen,
        precioBase: productosInsertados[23].precioBase,
        precioEspecial: 3399.99, // 13% descuento
        porcentajeDescuento: 12.8,
        fechaInicio: new Date("2024-01-01"),
        fechaFin: new Date("2024-12-31"),
        activo: true,
        creadoPor: "admin@tienda.com",
        fechaCreacion: new Date(),
        fechaActualizacion: new Date(),
      },
      {
        usuarioId: "USR004",
        clienteId: "CLI004",
        productoId: productosInsertados[20]._id, // iPad Pro
        productoNombre: productosInsertados[20].nombre,
        productoImagen: productosInsertados[20].imagen,
        precioBase: productosInsertados[20].precioBase,
        precioEspecial: 999.99, // 17% descuento
        porcentajeDescuento: 16.7,
        fechaInicio: new Date("2024-01-01"),
        fechaFin: new Date("2024-12-31"),
        activo: true,
        creadoPor: "admin@tienda.com",
        fechaCreacion: new Date(),
        fechaActualizacion: new Date(),
      },
      {
        usuarioId: "USR004",
        clienteId: "CLI004",
        productoId: productosInsertados[13]._id, // LG Monitor
        productoNombre: productosInsertados[13].nombre,
        productoImagen: productosInsertados[13].imagen,
        precioBase: productosInsertados[13].precioBase,
        precioEspecial: 679.99, // 15% descuento
        porcentajeDescuento: 15.0,
        fechaInicio: new Date("2024-01-01"),
        fechaFin: new Date("2024-12-31"),
        activo: true,
        creadoPor: "admin@tienda.com",
        fechaCreacion: new Date(),
        fechaActualizacion: new Date(),
      },

      // Usuario USR005 - Audiófilo
      {
        usuarioId: "USR005",
        clienteId: "CLI005",
        productoId: productosInsertados[11]._id, // Sennheiser HD 660S2
        productoNombre: productosInsertados[11].nombre,
        productoImagen: productosInsertados[11].imagen,
        precioBase: productosInsertados[11].precioBase,
        precioEspecial: 479.99, // 20% descuento
        porcentajeDescuento: 20.0,
        fechaInicio: new Date("2024-01-01"),
        fechaFin: new Date("2024-12-31"),
        activo: true,
        creadoPor: "admin@tienda.com",
        fechaCreacion: new Date(),
        fechaActualizacion: new Date(),
      },
      {
        usuarioId: "USR005",
        clienteId: "CLI005",
        productoId: productosInsertados[10]._id, // Bose QC45
        productoNombre: productosInsertados[10].nombre,
        productoImagen: productosInsertados[10].imagen,
        precioBase: productosInsertados[10].precioBase,
        precioEspecial: 279.99, // 15% descuento
        porcentajeDescuento: 15.2,
        fechaInicio: new Date("2024-01-01"),
        fechaFin: new Date("2024-12-31"),
        activo: true,
        creadoPor: "admin@tienda.com",
        fechaCreacion: new Date(),
        fechaActualizacion: new Date(),
      },

      // Usuario USR006 - Estudiante
      {
        usuarioId: "USR006",
        clienteId: "CLI006",
        productoId: productosInsertados[7]._id, // OnePlus 12
        productoNombre: productosInsertados[7].nombre,
        productoImagen: productosInsertados[7].imagen,
        precioBase: productosInsertados[7].precioBase,
        precioEspecial: 649.99, // 19% descuento
        porcentajeDescuento: 18.8,
        fechaInicio: new Date("2024-01-01"),
        fechaFin: new Date("2024-12-31"),
        activo: true,
        creadoPor: "admin@tienda.com",
        fechaCreacion: new Date(),
        fechaActualizacion: new Date(),
      },
      {
        usuarioId: "USR006",
        clienteId: "CLI006",
        productoId: productosInsertados[28]._id, // Nintendo Switch
        productoNombre: productosInsertados[28].nombre,
        productoImagen: productosInsertados[28].imagen,
        precioBase: productosInsertados[28].precioBase,
        precioEspecial: 299.99, // 14% descuento
        porcentajeDescuento: 14.3,
        fechaInicio: new Date("2024-01-01"),
        fechaFin: new Date("2024-12-31"),
        activo: true,
        creadoPor: "admin@tienda.com",
        fechaCreacion: new Date(),
        fechaActualizacion: new Date(),
      },
    ]

    // Insertar precios especiales en la nueva colección
    const resultadoPrecios = await db.collection(COLECCION_PRECIOS_ESPECIALES).insertMany(preciosEspeciales)
    console.log(`   ✅ ${resultadoPrecios.insertedCount} precios especiales insertados`)

    // Crear índices para optimizar consultas
    console.log("🔍 Creando índices para optimización...")

    // Índice único compuesto
    await db.collection(COLECCION_PRECIOS_ESPECIALES).createIndex(
      {
        usuarioId: 1,
        clienteId: 1,
        productoId: 1,
      },
      {
        unique: true,
        name: "idx_usuario_cliente_producto_unique",
      },
    )

    // Índices individuales para consultas rápidas
    await db.collection(COLECCION_PRECIOS_ESPECIALES).createIndex({ usuarioId: 1 }, { name: "idx_usuario" })

    await db.collection(COLECCION_PRECIOS_ESPECIALES).createIndex({ clienteId: 1 }, { name: "idx_cliente" })

    await db.collection(COLECCION_PRECIOS_ESPECIALES).createIndex({ productoId: 1 }, { name: "idx_producto" })

    await db.collection(COLECCION_PRECIOS_ESPECIALES).createIndex({ activo: 1 }, { name: "idx_activo" })

    await db
      .collection(COLECCION_PRECIOS_ESPECIALES)
      .createIndex({ fechaInicio: 1, fechaFin: 1 }, { name: "idx_fechas_vigencia" })

    // Índices adicionales para productos
    await db.collection("productos").createIndex({ categoria: 1 }, { name: "idx_categoria" })
    await db.collection("productos").createIndex({ precio: 1 }, { name: "idx_precio" })
    await db.collection("productos").createIndex({ rating: -1 }, { name: "idx_rating" })
    await db.collection("productos").createIndex({ marca: 1 }, { name: "idx_marca" })
    await db
      .collection("productos")
      .createIndex({ nombre: "text", descripcion: "text", marca: "text" }, { name: "idx_busqueda_texto" })

    console.log("   ✅ Índices creados exitosamente")

    // Mostrar estadísticas finales
    const totalProductos = await db.collection("productos").countDocuments()
    const totalPrecios = await db.collection(COLECCION_PRECIOS_ESPECIALES).countDocuments()
    const indices = await db.collection(COLECCION_PRECIOS_ESPECIALES).indexes()
    const categorias = await db.collection("productos").distinct("categoria")
    const marcas = await db.collection("productos").distinct("marca")

    console.log("\n" + "=".repeat(60))
    console.log("🎉 BASE DE DATOS CONFIGURADA EXITOSAMENTE")
    console.log("=".repeat(60))
    console.log(`📊 Estadísticas:`)
    console.log(`   • Base de datos: tienda`)
    console.log(`   • Productos: ${totalProductos}`)
    console.log(`   • Categorías: ${categorias.length} (${categorias.join(", ")})`)
    console.log(`   • Marcas: ${marcas.length} (${marcas.slice(0, 5).join(", ")}...)`)
    console.log(`   • Precios especiales: ${totalPrecios}`)
    console.log(`   • Colección creada: ${COLECCION_PRECIOS_ESPECIALES}`)
    console.log(`   • Índices creados: ${indices.length}`)
    console.log(`\n🧪 Usuarios de prueba disponibles:`)
    console.log(`   • USR001 - Cliente Premium (3 productos con descuento)`)
    console.log(`   • USR002 - Cliente Corporativo (3 productos con descuento)`)
    console.log(`   • USR003 - Gamer (4 productos con descuento)`)
    console.log(`   • USR004 - Creador de Contenido (3 productos con descuento)`)
    console.log(`   • USR005 - Audiófilo (2 productos con descuento)`)
    console.log(`   • USR006 - Estudiante (2 productos con descuento)`)
    console.log(`\n💡 Funcionalidades disponibles:`)
    console.log(`   • Filtros por categoría, precio, búsqueda`)
    console.log(`   • Ordenamiento por nombre, precio, rating`)
    console.log(`   • Página de detalle de productos`)
    console.log(`   • Sistema de precios especiales por usuario`)
    console.log(`   • Navegación responsive y moderna`)
    console.log("\n✅ ¡Listo para usar la aplicación!")
  } catch (error) {
    console.error("❌ Error al configurar la base de datos:", error)
    process.exit(1)
  } finally {
    await client.close()
    console.log("🔌 Conexión a MongoDB cerrada")
  }
}

// Ejecutar el script
seedDatabase()
