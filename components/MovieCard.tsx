import Image from 'next/image'
import Link from 'next/link'

interface MovieCardProps {
  id: string
  title: string
  poster: string
  rating: number
}

export default function MovieCard({ id, title, poster, rating }: MovieCardProps) {
  return (
    <div className="group relative h-full flex flex-col bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
      <div className="relative aspect-[2/3] w-full overflow-hidden bg-slate-200 dark:bg-slate-700">
        <Image
          src={poster}
          alt={title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="absolute bottom-4 right-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
          {rating.toFixed(1)}
        </div>
      </div>
      <div className="flex-1 p-4 flex flex-col">
        <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
          {title}
        </h3>
        <div className="mt-auto">
          <Link
            href={`/movies/${id}`}
            className="btn btn-primary w-full text-center"
          >
            Book Now
          </Link>
        </div>
      </div>
    </div>
  )
} 