import { Skeleton } from "@/components/ui/skeleton"

/**
 * Skeleton para la barra de navegación
 */
export function NavigationSkeleton() {
  return (
    <nav className="bg-card text-card-foreground shadow-sm border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Skeleton className="h-6 w-32" />
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Skeleton className="h-8 w-20" />
              <Skeleton className="h-8 w-16" />
            </div>
          </div>
          <div className="flex items-center">
            <Skeleton className="h-9 w-9 rounded-full" />
          </div>
        </div>
      </div>
    </nav>
  )
}
