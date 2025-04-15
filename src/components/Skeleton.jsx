const Skeleton = ({ className = '' }) => (
  <div className={`animate-pulse bg-gray-200 rounded ${className}`}></div>
)

export const ListingCardSkeleton = () => (
  <div className="card">
    <Skeleton className="w-full h-48 mb-4" />
    <Skeleton className="h-6 w-3/4 mb-2" />
    <Skeleton className="h-4 w-1/2 mb-2" />
    <Skeleton className="h-5 w-1/3" />  
  </div>
)

export const ListingDetailsSkeleton = () => (
  <div className="max-w-4xl mx-auto">
    <div className="card">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Skeleton className="w-full h-96" />
        <div className="space-y-4">
          <Skeleton className="h-8 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
          <Skeleton className="h-6 w-1/4" />
          <div className="grid grid-cols-3 gap-4">
            <Skeleton className="h-16" />
            <Skeleton className="h-16" />
            <Skeleton className="h-16" />
          </div>
          <Skeleton className="h-32" />
        </div>
      </div>
    </div>
  </div>
)

export default Skeleton 