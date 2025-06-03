import { Skeleton } from "@/components/ui/skeleton"

export default function ArticleLoading() {
  return (
    <div className="container py-8 md:py-12">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <Skeleton className="h-10 w-32" />
        </div>

        <div className="mb-8">
          <Skeleton className="h-12 w-full mb-4" />

          <div className="flex flex-wrap items-center gap-4 mb-6">
            <Skeleton className="h-6 w-24" />
            <Skeleton className="h-6 w-24" />
            <Skeleton className="h-6 w-24" />
          </div>

          <Skeleton className="w-full h-[300px] md:h-[400px] mb-8 rounded-lg" />

          <Skeleton className="w-full h-24 mb-8" />

          <div className="space-y-4">
            <Skeleton className="w-full h-6" />
            <Skeleton className="w-full h-6" />
            <Skeleton className="w-full h-6" />
            <Skeleton className="w-3/4 h-6" />
          </div>
        </div>
      </div>
    </div>
  )
}
