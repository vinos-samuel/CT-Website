import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="container py-8">
      <div className="mb-8">
        <Skeleton className="h-10 w-40" />
      </div>

      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <Skeleton className="h-10 w-3/4 mb-4" />
          <Skeleton className="h-4 w-32 mb-2" />
          <Skeleton className="h-4 w-48" />
        </div>

        <div className="mb-8">
          <Skeleton className="h-6 w-full" />
        </div>

        <Skeleton className="h-96 w-full mb-8 rounded-lg" />

        <div className="flex justify-center">
          <Skeleton className="h-10 w-48" />
        </div>
      </div>
    </div>
  )
}
