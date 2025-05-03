'use client'

import { useState } from 'react'
import Image from 'next/image'
import MovieCard from '@/components/MovieCard'

// Sample movie data - replace with API call
const recommendedMovies = [
  {
    id: '1',
    title: 'Asuran',
    poster: '/images/asuran.jpg',
    rating: 8.8
  },
  {
    id: '2',
    title: 'VadaChennai',
    poster: '/images/vadachennai.jpg',
    rating: 9.0
  },
  {
    id: '3',
    title: 'Jai Bhim',
    poster: '/images/jaibhim.jpg',
    rating: 8.6
  }
]

const genres = [
  'Action', 'Drama', 'Comedy', 'Thriller', 'Romance', 
  'Sci-Fi', 'Horror', 'Documentary', 'Animation', 'Adventure'
]

const moods = [
  'Happy', 'Thoughtful', 'Excited', 'Relaxed', 'Emotional'
]

export default function RecommenderPage() {
  const [selectedGenres, setSelectedGenres] = useState<string[]>([])
  const [selectedMood, setSelectedMood] = useState<string>('')
  const [isLoading, setIsLoading] = useState(false)

  const toggleGenre = (genre: string) => {
    setSelectedGenres(prev => 
      prev.includes(genre) 
        ? prev.filter(g => g !== genre)
        : [...prev, genre]
    )
  }

  const handleGetRecommendations = () => {
    setIsLoading(true)
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
    }, 1500)
  }

  return (
    <main className="min-h-screen bg-background">
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/10 via-accent/5 to-background" />
        <div className="container relative z-10">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h1 className="text-4xl font-bold mb-4 gradient-text">
              AI Movie Recommendations
            </h1>
            <p className="text-foreground/80">
              Let our AI understand your taste and suggest the perfect movies for you
            </p>
          </div>

          <div className="max-w-4xl mx-auto bg-background/50 backdrop-blur-lg rounded-2xl p-6 shadow-lg border border-foreground/10">
            {/* Genre Selection */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-4">Select Your Preferred Genres</h2>
              <div className="flex flex-wrap gap-2">
                {genres.map(genre => (
                  <button
                    key={genre}
                    onClick={() => toggleGenre(genre)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                      selectedGenres.includes(genre)
                        ? 'bg-primary text-white'
                        : 'bg-foreground/10 hover:bg-foreground/20 text-foreground'
                    }`}
                  >
                    {genre}
                  </button>
                ))}
              </div>
            </div>

            {/* Mood Selection */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-4">How are you feeling today?</h2>
              <div className="flex flex-wrap gap-2">
                {moods.map(mood => (
                  <button
                    key={mood}
                    onClick={() => setSelectedMood(mood === selectedMood ? '' : mood)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                      mood === selectedMood
                        ? 'bg-accent text-white'
                        : 'bg-foreground/10 hover:bg-foreground/20 text-foreground'
                    }`}
                  >
                    {mood}
                  </button>
                ))}
              </div>
            </div>

            {/* Get Recommendations Button */}
            <button
              onClick={handleGetRecommendations}
              disabled={isLoading || (selectedGenres.length === 0 && !selectedMood)}
              className="w-full btn btn-primary py-3 relative"
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent" />
                  <span className="ml-2">Finding perfect movies for you...</span>
                </div>
              ) : (
                'Get Personalized Recommendations'
              )}
            </button>
          </div>
        </div>
      </section>

      {/* Recommendations Section */}
      <section className="py-16">
        <div className="container">
          <h2 className="text-2xl font-bold mb-8">Recommended for You</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {recommendedMovies.map((movie) => (
              <MovieCard
                key={movie.id}
                id={movie.id}
                title={movie.title}
                poster={movie.poster}
                rating={movie.rating}
              />
            ))}
          </div>
        </div>
      </section>
    </main>
  )
} 