import Image from 'next/image'
import Link from 'next/link'

interface RecommendationCardProps {
  id: string
  title: string
  poster: string
  confidence: number
  reason: string
}

export default function RecommendationCard({ 
  id, 
  title, 
  poster, 
  confidence, 
  reason 
}: RecommendationCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="relative h-48">
        <Image
          src={poster}
          alt={title}
          fill
          className="object-cover"
        />
        <div className="absolute top-2 right-2 bg-blue-600 text-white px-2 py-1 rounded">
          {Math.round(confidence * 100)}% Match
        </div>
      </div>
      <div className="p-4">
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-gray-600 mb-4 text-sm">{reason}</p>
        <Link 
          href={`/bookings?movieId=${id}`}
          className="block w-full bg-blue-600 text-white text-center py-2 rounded hover:bg-blue-700"
        >
          Book Now
        </Link>
      </div>
    </div>
  )
} 