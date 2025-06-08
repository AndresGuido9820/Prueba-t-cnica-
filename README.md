# Tienda Productos - Prueba Técnica

Sistema completo de gestión de productos con precios especiales desarrollado con React/Next.js, TypeScript y MongoDB.

## 🚀 Características Principales

- **Frontend**: React con Next.js 14 y TypeScript
- **Backend**: API Routes de Next.js con middleware personalizado
- **Base de datos**: MongoDB con colección `preciosEspecialesGuidoMontoya25`
- **UI/UX**: Tailwind CSS con componentes de shadcn/ui
- **Estado**: React Query para gestión de estado del servidor
- **Validación**: Esquemas Zod para validación de datos
- **Temas**: Sistema de temas claro/oscuro

### 🎯 Funcionalidades Implementadas

#### 📦 **Gestión de Productos**
- ✅ Catálogo completo con 30+ productos variados
- ✅ Página de detalle individual para cada producto
- ✅ Información completa: descripción, precios, stock, SKU, rating, marca
- ✅ Imágenes optimizadas con estados de carga y fallback
- ✅ Navegación fluida entre catálogo y detalle

#### 🔍 **Sistema de Filtros Avanzados**
- ✅ **Búsqueda por texto**: Nombre, descripción y marca
- ✅ **Filtro por categoría**: 8 categorías disponibles
- ✅ **Rango de precios**: Precio mínimo y máximo personalizables
- ✅ **Ordenamiento múltiple**: Por nombre, precio (asc/desc) y rating
- ✅ **Filtros activos**: Visualización y eliminación individual
- ✅ **Filtros persistentes**: Se mantienen al navegar

#### 💰 **Sistema de Precios Especiales**
- ✅ Precios personalizados por usuario y cliente
- ✅ Validación de fechas de vigencia
- ✅ Cálculo automático de porcentajes de descuento
- ✅ Visualización destacada de ofertas especiales
- ✅ Formulario para crear/actualizar precios especiales
- ✅ Lista completa de precios especiales existentes

#### 🎨 **Experiencia de Usuario**
- ✅ **Diseño responsive**: Adaptado a móviles, tablets y desktop
- ✅ **Estados de carga**: Skeletons y indicadores de progreso
- ✅ **Manejo de errores**: Alertas informativas y recuperación
- ✅ **Navegación intuitiva**: Breadcrumbs y botones de retorno
- ✅ **Feedback visual**: Badges, alertas y animaciones
- ✅ **Accesibilidad**: Etiquetas ARIA y navegación por teclado

## 📋 Requisitos Previos

- Node.js 18+ 
- MongoDB Atlas o instancia local de MongoDB
- npm o yarn

## 🛠️ Instalación y Configuración

### 1. Clonar el repositorio

\`\`\`bash
git clone <url-del-repositorio>
cd tienda-productos
\`\`\`

### 2. Instalar dependencias

\`\`\`bash
npm install
\`\`\`

### 3. Configurar variables de entorno

Crear un archivo \`.env.local\` en la raíz del proyecto:

\`\`\`env
# MongoDB Connection String - Información Real
MONGODB_URI=mongodb+srv://drenviochallenge:m1jWly3uw42cBwp6@drenviochallenge.2efc0.mongodb.net/tienda?retryWrites=true&w=majority

# App URL para metadata
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Next.js
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key

# API URL (opcional para desarrollo)
NEXT_PUBLIC_API_URL=http://localhost:3000
\`\`\`

### 4. Poblar la base de datos

Para cargar datos de ejemplo (30+ productos y múltiples precios especiales):

\`\`\`bash
npm run seed
\`\`\`

### 5. Verificar conexión (opcional)

Para probar la conexión a MongoDB:

\`\`\`bash
node scripts/test-connection.js
\`\`\`

### 6. Ejecutar en desarrollo

\`\`\`bash
npm run dev
\`\`\`

La aplicación estará disponible en \`http://localhost:3000\`

## 🏗️ Estructura del Proyecto

\`\`\`
├── app/
│   ├── api/
│   │   ├── productos/
│   │   │   ├── route.ts              # API para listar productos con filtros
│   │   │   └── [id]/route.ts         # API para producto específico
│   │   └── precios-especiales/
│   │       └── route.ts              # API para gestión de precios especiales
│   ├── articulos/
│   │   ├── page.tsx                  # Página principal del catálogo
│   │   └── [id]/page.tsx            # Página de detalle del producto
│   ├── subida/page.tsx              # Página de gestión de precios especiales
│   ├── layout.tsx                   # Layout principal con providers
│   ├── page.tsx                     # Página de inicio (redirect)
│   └── globals.css                  # Estilos globales con variables CSS
├── components/
│   ├── productos/
│   │   ├── tarjeta-producto.tsx     # Componente de tarjeta de producto
│   │   └── filtros-productos.tsx   # Componente de filtros avanzados
│   ├── skeletons/                   # Componentes de loading states
│   ├── ui/                          # Componentes de shadcn/ui
│   │   ├── imagen-producto.tsx      # Componente optimizado para imágenes
│   │   └── ...                      # Otros componentes UI
│   ├── navigation.tsx               # Componente de navegación
│   └── theme-toggle.tsx            # Selector de tema
├── hooks/
│   ├── use-productos.ts            # Hook para gestión de productos
│   ├── use-producto.ts             # Hook para producto individual
│   └── use-precios-especiales.ts  # Hook para precios especiales
├── lib/
│   ├── mongodb.ts                  # Configuración de MongoDB
│   ├── validation.ts               # Esquemas de validación Zod
│   ├── error-handler.ts            # Manejo centralizado de errores
│   ├── middleware.ts               # Middlewares para APIs
│   └── utils.ts                    # Utilidades y helpers
├── providers/
│   ├── query-provider.tsx          # Provider de React Query
│   └── theme-provider.tsx          # Provider de temas
├── services/
│   └── api.ts                      # Servicios para llamadas a API
├── types/
│   ├── index.ts                    # Tipos principales
│   ├── api.ts                      # Tipos para APIs
│   └── entities.ts                 # Tipos de entidades
├── scripts/
│   ├── seed-database.js            # Script para poblar BD
│   └── test-connection.js          # Script para probar conexión
└── README.md
\`\`\`

## 🗄️ Estructura de la Base de Datos

### Colección: \`productos\`
\`\`\`javascript
{
  _id: ObjectId,
  nombre: String,                    // Nombre del producto
  descripcion: String,               // Descripción detallada
  precio: Number,                    // Precio actual de venta
  precioBase: Number,                // Precio base original
  categoria: String,                 // Categoría del producto
  stock: Number,                     // Cantidad en stock
  imagen: String,                    // URL de la imagen principal
  sku: String,                       // Código SKU único
  marca: String,                     // Marca del producto
  rating: Number                     // Calificación promedio (0-5)
}
\`\`\`

### Colección: \`preciosEspecialesGuidoMontoya25\`
\`\`\`javascript
{
  _id: ObjectId,
  usuarioId: String,                 // ID del usuario que gestiona
  clienteId: String,                 // ID del cliente beneficiario
  productoId: ObjectId,              // Referencia al producto
  productoNombre: String,            // Nombre del producto (desnormalizado)
  productoImagen: String,            // Imagen del producto (desnormalizado)
  precioBase: Number,                // Precio base del producto
  precioEspecial: Number,            // Precio especial aplicado
  porcentajeDescuento: Number,       // Porcentaje de descuento calculado
  fechaInicio: Date,                 // Fecha de inicio de vigencia
  fechaFin: Date,                    // Fecha de fin de vigencia
  activo: Boolean,                   // Estado activo/inactivo
  creadoPor: String,                 // Usuario que creó el registro
  fechaCreacion: Date,               // Fecha de creación
  fechaActualizacion: Date           // Fecha de última actualización
}
\`\`\`

**Índices optimizados:**
- \`{ usuarioId: 1, clienteId: 1, productoId: 1 }\` (único)
- \`{ usuarioId: 1 }\` - Consultas por usuario
- \`{ clienteId: 1 }\` - Consultas por cliente
- \`{ productoId: 1 }\` - Consultas por producto
- \`{ activo: 1 }\` - Filtrar precios activos
- \`{ fechaInicio: 1, fechaFin: 1 }\` - Validación de fechas
- \`{ categoria: 1 }\` - Filtros por categoría
- \`{ precio: 1 }\` - Ordenamiento por precio
- \`{ rating: -1 }\` - Ordenamiento por rating
- \`{ nombre: "text", descripcion: "text", marca: "text" }\` - Búsqueda de texto

## 🔧 Decisiones Técnicas

### ¿Por qué Next.js 14?
- **App Router**: Nueva arquitectura con mejor rendimiento
- **Server Components**: Renderizado del lado del servidor por defecto
- **API Routes**: Endpoints REST integrados
- **TypeScript**: Soporte nativo y optimizado
- **Optimizaciones**: Automáticas para imágenes, fuentes y bundles

### ¿Por qué TypeScript?
- **Tipado estático**: Reduce errores en tiempo de ejecución
- **IntelliSense**: Mejor autocompletado y documentación
- **Refactoring**: Cambios más seguros en el código
- **Escalabilidad**: Mejor mantenimiento en proyectos grandes
- **Integración**: Excelente soporte con React y Next.js

### ¿Por qué React Query?
- **Cache inteligente**: Gestión automática de estado del servidor
- **Sincronización**: Actualizaciones en tiempo real
- **Optimistic Updates**: Mejor experiencia de usuario
- **Background Refetching**: Datos siempre actualizados
- **Error Handling**: Manejo robusto de errores

### Arquitectura de la Base de Datos
- **Colección separada**: Escalabilidad y consultas optimizadas
- **Índices compuestos**: Optimizan las consultas más frecuentes
- **Desnormalización selectiva**: Mejora el rendimiento de lectura
- **Validación de fechas**: Control de vigencia de ofertas

## 📱 Guía de Uso

### 🏠 Página Principal (Catálogo)
1. **Navegación**: Accede desde el menú "Artículos"
2. **Búsqueda de precios especiales**: 
   - Ingresa un ID de usuario (USR001-USR006)
   - Haz clic en "Buscar Precios"
   - Los productos con descuento se destacan automáticamente
3. **Filtros avanzados**:
   - Busca por texto en nombre, descripción o marca
   - Filtra por categoría específica
   - Establece rangos de precio
   - Ordena por diferentes criterios
4. **Navegación**: Haz clic en cualquier producto para ver detalles

### 🔍 Página de Detalle del Producto
1. **Información completa**: Descripción, especificaciones, precios
2. **Precios especiales**: Consulta descuentos específicos por usuario
3. **Galería**: Imagen principal y thumbnails adicionales
4. **Acciones**: Añadir al carrito, favoritos (UI preparada)
5. **Navegación**: Botón "Volver" para regresar al catálogo

### 📝 Página de Gestión (Subida)
1. **Formulario de precios especiales**:
   - Selecciona usuario y cliente
   - Elige producto del dropdown
   - Define precio especial
   - Guarda o actualiza automáticamente
2. **Lista de precios existentes**: Visualiza todos los descuentos activos
3. **Validaciones**: El sistema previene precios inválidos

## 🧪 Datos de Prueba

### 👥 Usuarios de Prueba Disponibles

| Usuario | Perfil | Productos con Descuento | Descuentos |
|---------|--------|-------------------------|------------|
| **USR001** | Cliente Premium | 3 productos | 14-20% OFF |
| **USR002** | Cliente Corporativo | 3 productos | 15-18% OFF |
| **USR003** | Gamer | 4 productos | 13-20% OFF |
| **USR004** | Creador de Contenido | 3 productos | 13-17% OFF |
| **USR005** | Audiófilo | 2 productos | 15-20% OFF |
| **USR006** | Estudiante | 2 productos | 14-19% OFF |

### 📦 Categorías de Productos (30+ productos)

- **Electrónicos** (8 productos): Laptops y smartphones premium
- **Audio** (4 productos): Auriculares y equipos de sonido
- **Monitores** (3 productos): Pantallas gaming y profesionales
- **Periféricos** (4 productos): Teclados, ratones y accesorios
- **Tablets** (3 productos): Tablets profesionales y creativas
- **Fotografía** (3 productos): Cámaras profesionales
- **Gaming** (3 productos): Consolas de videojuegos
- **Almacenamiento** (2 productos): SSDs de alta velocidad

### 🏷️ Marcas Disponibles
Apple, Samsung, Sony, Dell, ASUS, Lenovo, Google, OnePlus, Bose, Sennheiser, LG, Canon, Fujifilm, Microsoft, Nintendo, Logitech, Razer, Keychron, SteelSeries, Western Digital

## 🚀 Scripts Disponibles

\`\`\`bash
# Desarrollo
npm run dev              # Inicia servidor de desarrollo
npm run build           # Construye para producción
npm run start           # Inicia servidor de producción
npm run lint            # Ejecuta ESLint

# Base de datos
npm run seed            # Pobla la BD con datos de prueba
node scripts/test-connection.js  # Prueba conexión a MongoDB

# Utilidades
npm run type-check      # Verifica tipos de TypeScript
\`\`\`

## 🌐 Despliegue

### Vercel (Recomendado)
1. Conectar repositorio de GitHub a Vercel
2. Configurar variables de entorno en el dashboard
3. Deploy automático en cada push

### Variables de Entorno para Producción
\`\`\`env
MONGODB_URI=mongodb+srv://...
NEXT_PUBLIC_APP_URL=https://tu-dominio.vercel.app
NEXTAUTH_URL=https://tu-dominio.vercel.app
NEXTAUTH_SECRET=tu-secret-super-seguro
\`\`\`

### Otras Plataformas Compatibles
- **Netlify**: Con adaptador para Next.js
- **Railway**: Soporte nativo para Next.js
- **Heroku**: Con buildpack de Node.js

## 🧪 Testing y Validación

### Casos de Prueba Recomendados

1. **Funcionalidad básica**:
   - Navegación entre páginas
   - Carga de productos sin errores
   - Responsive design en diferentes dispositivos

2. **Sistema de filtros**:
   - Búsqueda por texto funcional
   - Filtros por categoría y precio
   - Combinación de múltiples filtros
   - Limpieza de filtros

3. **Precios especiales**:
   - Consulta con usuarios válidos (USR001-USR006)
   - Visualización correcta de descuentos
   - Cálculo preciso de porcentajes
   - Validación de fechas de vigencia

4. **Gestión de precios**:
   - Creación de nuevos precios especiales
   - Actualización de precios existentes
   - Validaciones de formulario
   - Manejo de errores

## 📊 Métricas y Rendimiento

### Optimizaciones Implementadas
- **Lazy Loading**: Imágenes y componentes bajo demanda
- **Code Splitting**: Bundles optimizados por ruta
- **React Query Cache**: Reducción de llamadas a API
- **Índices MongoDB**: Consultas optimizadas
- **Skeleton Loading**: Mejor percepción de velocidad

### Métricas Objetivo
- **First Contentful Paint**: < 1.5s
- **Largest Contentful Paint**: < 2.5s
- **Cumulative Layout Shift**: < 0.1
- **Time to Interactive**: < 3s

## 🔒 Seguridad

### Medidas Implementadas
- **Validación de entrada**: Esquemas Zod en frontend y backend
- **Sanitización**: Prevención de inyección NoSQL
- **Rate Limiting**: Control de frecuencia de requests
- **Error Handling**: No exposición de información sensible
- **CORS**: Configuración adecuada para APIs

## 🤝 Contribución

### Flujo de Desarrollo
1. Fork del proyecto
2. Crear rama para feature (\`git checkout -b feature/nueva-funcionalidad\`)
3. Commit de cambios (\`git commit -am 'Agregar nueva funcionalidad'\`)
4. Push a la rama (\`git push origin feature/nueva-funcionalidad\`)
5. Crear Pull Request

### Estándares de Código
- **ESLint**: Configuración estricta
- **Prettier**: Formateo automático
- **TypeScript**: Tipado estricto
- **Conventional Commits**: Mensajes de commit estandarizados

## 📄 Licencia

Este proyecto es parte de una prueba técnica y está disponible bajo licencia MIT.

## 🔗 Enlaces

- **Repositorio**: [GitHub URL]
- **Demo en vivo**: [Vercel URL]
- **Documentación API**: Disponible en \`/api\`
- **Storybook**: [Storybook URL] (si aplica)

---

**Desarrollado por**: Guido Montoya  
**Email**: [tu-email@ejemplo.com]  
**Fecha**: $(new Date().toLocaleDateString('es-ES'))  
**Versión**: 1.0.0

### 🎯 Próximas Funcionalidades

- [ ] Carrito de compras persistente
- [ ] Sistema de favoritos
- [ ] Comparación de productos
- [ ] Reseñas y valoraciones
- [ ] Historial de precios
- [ ] Notificaciones push
- [ ] Modo offline
- [ ] Exportación de datos
- [ ] Dashboard de analytics
- [ ] API GraphQL
