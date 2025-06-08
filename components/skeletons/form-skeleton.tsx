import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

/**
 * Skeleton para campos de formulario
 */
export function FormFieldSkeleton() {
  return (
    <div className="space-y-2">
      <Skeleton className="h-4 w-24" />
      <Skeleton className="h-10 w-full" />
    </div>
  )
}

/**
 * Skeleton para formularios completos
 */
export function FormSkeleton({ fields = 4 }: { fields?: number }) {
  return (
    <Card>
      <CardHeader>
        <Skeleton className="h-6 w-64" />
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {Array.from({ length: fields }).map((_, index) => (
            <FormFieldSkeleton key={index} />
          ))}
          <Skeleton className="h-10 w-full mt-6" />
        </div>
      </CardContent>
    </Card>
  )
}
