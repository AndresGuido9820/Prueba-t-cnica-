import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

/**
 * Skeleton para tarjetas de productos
 * Muestra un placeholder mientras se cargan los datos del producto
 */
export function ProductCardSkeleton() {
  return (
    <Card className="overflow-hidden h-full flex flex-col">
      {/* Skeleton de imagen */}
      <Skeleton className="aspect-video w-full" />

      <CardContent className="p-4 flex-1 flex flex-col">
        {/* Header con nombre y categoría */}
        <div className="flex justify-between items-start mb-2">
          <Skeleton className="h-6 w-3/4" />
          <Skeleton className="h-5 w-16 ml-2" />
        </div>

        {/* Descripción */}
        <div className="space-y-2 mb-3 flex-1">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
        </div>

        {/* Precios y stock */}
        <div className="flex justify-between items-center mb-2 mt-auto">
          <div className="flex flex-col space-y-1">
            <Skeleton className="h-6 w-20" />
            <Skeleton className="h-4 w-16" />
          </div>
          <div className="text-right space-y-1">
            <Skeleton className="h-4 w-10" />
            <Skeleton className="h-5 w-8" />
          </div>
        </div>

        {/* Información adicional */}
        <div className="flex justify-between items-center mt-2">
          <Skeleton className="h-3 w-16" />
          <Skeleton className="h-3 w-12" />
        </div>
        <Skeleton className="h-3 w-20 mt-1" />
      </CardContent>
    </Card>
  )
}

/**
 * Grid de skeletons para múltiples productos
 */
export function ProductGridSkeleton({ count = 8 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
      {Array.from({ length: count }).map((_, index) => (
        <ProductCardSkeleton key={index} />
      ))}
    </div>
  )
}
