import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

/**
 * Skeleton para tarjetas de estadísticas
 */
export function StatCardSkeleton() {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center space-x-2">
          <Skeleton className="h-8 w-8 rounded" />
          <div className="space-y-1">
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-6 w-12" />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

/**
 * Skeleton para grid de estadísticas
 */
export function StatsGridSkeleton({ count = 4 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {Array.from({ length: count }).map((_, index) => (
        <StatCardSkeleton key={index} />
      ))}
    </div>
  )
}
