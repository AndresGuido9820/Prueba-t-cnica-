import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

/**
 * Skeleton para elementos de la lista de precios especiales
 */
export function PriceItemSkeleton() {
  return (
    <div className="p-3 border rounded-md">
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <Skeleton className="w-8 h-8 rounded" />
            <Skeleton className="h-4 w-32" />
          </div>
          <div className="space-y-1">
            <Skeleton className="h-3 w-24" />
            <Skeleton className="h-3 w-20" />
            <Skeleton className="h-3 w-28" />
          </div>
        </div>
        <div className="text-right space-y-1">
          <Skeleton className="h-5 w-16" />
          <Skeleton className="h-3 w-12" />
        </div>
      </div>
    </div>
  )
}

/**
 * Skeleton para la lista completa de precios especiales
 */
export function PriceListSkeleton({ count = 5 }: { count?: number }) {
  return (
    <Card>
      <CardHeader>
        <Skeleton className="h-6 w-48" />
      </CardHeader>
      <CardContent>
        <div className="space-y-3 max-h-[500px] overflow-y-auto pr-1">
          {Array.from({ length: count }).map((_, index) => (
            <PriceItemSkeleton key={index} />
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
