export default function Loading() {
  return (
    <div className="p-6 space-y-6">
      {/* Title Skeleton */}
      <div className="skeleton h-8 w-1/3"></div>

      {/* Cards Skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Card Skeletons */}
        {Array.from({ length: 6 }).map((_, index) => (
          <div key={index} className="skeleton h-40 w-full rounded-lg"></div>
        ))}
      </div>
    </div>
  );
}
