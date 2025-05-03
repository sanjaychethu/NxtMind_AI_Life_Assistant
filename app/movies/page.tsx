export default function MoviesPage() {
  return (
    <main className="min-h-screen p-8">
      <h1 className="text-4xl font-bold mb-8">Movies</h1>
      <div className="flex gap-8">
        <aside className="w-1/4">
          {/* FilterSidebar component will be added here */}
        </aside>
        <div className="w-3/4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* MovieCard components will be added here */}
        </div>
      </div>
    </main>
  )
} 