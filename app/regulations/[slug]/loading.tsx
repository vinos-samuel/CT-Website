import { Spinner } from "@/components/ui/spinner"

export default function Loading() {
  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-center items-center h-64">
        <Spinner size="lg" />
      </div>
    </div>
  )
}
