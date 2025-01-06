export default function DashboardSkeleton() {
  return (
    <div className="h-screen flex">
      {/* Sidebar Skeleton */}
      {/* <aside className="w-64 bg-base-200 p-4 hidden md:block">
        <div className="h-8 bg-gray-200 rounded mb-4"></div>
        <ul className="menu">
          {[...Array(4)].map((_, idx) => (
            <li key={idx} className="mb-2">
              <div className="h-6 bg-gray-200 rounded"></div>
            </li>
          ))}
        </ul>
      </aside> */}

      {/* Main Content Skeleton */}
      <main className="flex-1 bg-base-100 p-4">
        {/* Navbar Skeleton */}
        <div className="navbar bg-base-300 rounded-lg p-4 mb-6">
          <div className="flex-1">
            <div className="h-6 bg-gray-100 rounded w-3/4"></div>
          </div>
          <div className="flex-none">
            <div className="h-8 bg-gray-100 rounded w-20"></div>
          </div>
        </div>

        {/* Cards Skeleton */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          {[...Array(3)].map((_, idx) => (
            <div key={idx} className="card shadow-lg bg-base-100 p-4">
              <div className="h-6 bg-gray-100 rounded mb-2"></div>
              <div className="h-4 bg-gray-100 rounded w-3/4"></div>
              <div className="h-4 bg-gray-100 rounded w-1/2 mt-2"></div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
