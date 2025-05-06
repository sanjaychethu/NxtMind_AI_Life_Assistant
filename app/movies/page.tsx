'use client'

import { useState } from 'react'
import Image from 'next/image'
import MovieCard from '@/components/MovieCard'
import MobileNav from '@/components/MobileNav'
import { Star, HeartPulse, Brain } from 'lucide-react'
import { FilmIcon, ClockIcon, SparklesIcon } from '@heroicons/react/24/solid'

interface Question {
  id: string
  text: string
  options: string[]
}

interface Category {
  id: string
  title: string
  icon: React.ReactNode
  questions: Question[]
}

interface MovieRecommendation {
  id: string
  title: string
  description: string
  matchReason: string
  rating: number
  poster: string
}

const movieCategories: Category[] = [
  {
    id: 'preferences',
    title: 'Movie Preferences',
    icon: <FilmIcon className="w-6 h-6" />,
    questions: [
      {
        id: 'genre',
        text: 'What genres do you enjoy the most?',
        options: ['Action', 'Comedy', 'Drama', 'Sci-Fi', 'Horror', 'Romance', 'Thriller', 'Documentary']
      },
      {
        id: 'mood',
        text: 'What mood are you in right now?',
        options: ['Excited', 'Relaxed', 'Thoughtful', 'Adventurous', 'Nostalgic', 'Inspired']
      },
      {
        id: 'length',
        text: 'Preferred movie length?',
        options: ['Short (< 90 mins)', 'Medium (90-120 mins)', 'Long (> 120 mins)']
      }
    ]
  },
  {
    id: 'history',
    title: 'Viewing History',
    icon: <ClockIcon className="w-6 h-6" />,
    questions: [
      {
        id: 'recent',
        text: 'What was the last movie you watched?',
        options: ['Action movie', 'Comedy', 'Drama', 'Documentary', 'Haven\'t watched recently']
      },
      {
        id: 'favorite',
        text: 'What\'s your all-time favorite movie?',
        options: ['Action/Adventure', 'Comedy', 'Drama', 'Sci-Fi/Fantasy', 'Romance', 'Other']
      }
    ]
  }
]

export default function MoviesPage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [recommendations, setRecommendations] = useState<MovieRecommendation[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategory(categoryId)
    setCurrentQuestion(0)
    setAnswers({})
    setRecommendations([])
    setError(null)
  }

  const handleAnswer = async (answer: string) => {
    const category = movieCategories.find(c => c.id === selectedCategory)
    if (!category) return

    const currentQ = category.questions[currentQuestion]
    const newAnswers = { ...answers, [currentQ.id]: answer }
    setAnswers(newAnswers)

    if (currentQuestion < category.questions.length - 1) {
      setCurrentQuestion(prev => prev + 1)
    } else {
      // All questions answered, get recommendations
      setLoading(true)
      setError(null)
      try {
        const response = await fetch('/api/recommendations', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            category: selectedCategory,
            answers: newAnswers
          })
        })

        if (!response.ok) {
          throw new Error('Failed to get recommendations')
        }

        const data = await response.json()
        if (data.error) {
          throw new Error(data.error)
        }

        setRecommendations(data.recommendations)
      } catch (error) {
        console.error('Error getting recommendations:', error)
        setError('Failed to get recommendations. Please try again.')
      } finally {
        setLoading(false)
      }
    }
  }

  const getProgress = () => {
    if (!selectedCategory) return 0
    const category = movieCategories.find(c => c.id === selectedCategory)
    if (!category) return 0
    return ((currentQuestion + 1) / category.questions.length) * 100
  }

  return (
    <main className="min-h-screen bg-background">
      {/* Mobile Navigation */}
      <MobileNav />

      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/10 via-accent/5 to-background" />
        <div className="container relative z-10 px-4 sm:px-6">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h1 className="text-3xl sm:text-4xl font-bold mb-4 gradient-text">
              Find Your Perfect Movie Match
            </h1>
            <p className="text-foreground/80 text-sm sm:text-base">
              Answer a few questions and let our AI recommend the perfect movie for you
            </p>
          </div>

          {!selectedCategory ? (
            // Category Selection
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 max-w-4xl mx-auto">
              {movieCategories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => handleCategorySelect(category.id)}
                  className="p-4 sm:p-6 rounded-2xl bg-background/60 border border-foreground/10 hover:border-primary/30 transition-all duration-300 text-left group"
                >
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                    {category.icon}
                  </div>
                  <h3 className="text-lg sm:text-xl font-semibold mb-2">{category.title}</h3>
                  <p className="text-sm sm:text-base text-foreground/60">
                    {category.questions.length} questions to help us understand your preferences
                  </p>
                </button>
              ))}
            </div>
          ) : (
            // Question and Answer Section
            <div className="max-w-2xl mx-auto">
              {loading ? (
                <div className="text-center py-12">
                  <div className="w-14 h-14 sm:w-16 sm:h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center animate-spin">
                    <SparklesIcon className="w-7 h-7 sm:w-8 sm:h-8 text-primary" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-semibold mb-2">Finding your perfect movies...</h3>
                  <p className="text-sm sm:text-base text-foreground/60">This may take a few moments</p>
                </div>
              ) : error ? (
                <div className="text-center py-12">
                  <div className="w-14 h-14 sm:w-16 sm:h-16 mx-auto mb-4 rounded-full bg-red-500/10 flex items-center justify-center">
                    <span className="text-red-500 text-2xl">!</span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-semibold mb-2 text-red-500">Oops! Something went wrong</h3>
                  <p className="text-sm sm:text-base text-foreground/60 mb-4">{error}</p>
                  <button
                    onClick={() => setSelectedCategory(null)}
                    className="px-4 sm:px-6 py-2 sm:py-3 rounded-xl bg-primary text-white hover:bg-primary/90 transition-colors text-sm sm:text-base"
                  >
                    Try Again
                  </button>
                </div>
              ) : recommendations.length > 0 ? (
                // Recommendations Section
                <div className="space-y-6 sm:space-y-8">
                  <div className="text-center mb-6 sm:mb-8">
                    <h2 className="text-xl sm:text-2xl font-bold mb-2">Your Personalized Recommendations</h2>
                    <p className="text-sm sm:text-base text-foreground/60">Based on your preferences and viewing history</p>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                    {recommendations.map((movie) => (
                      <div
                        key={movie.id}
                        className="bg-background/60 border border-foreground/10 rounded-2xl overflow-hidden group"
                      >
                        <div className="relative aspect-[2/3]">
                          <Image
                            src={movie.poster}
                            alt={movie.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="p-3 sm:p-4">
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="text-base sm:text-lg font-semibold">{movie.title}</h3>
                            <div className="flex items-center gap-1">
                              <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                              <span className="text-sm font-medium">{movie.rating.toFixed(1)}</span>
                            </div>
                          </div>
                          <p className="text-xs sm:text-sm text-foreground/60 mb-2 sm:mb-3">{movie.description}</p>
                          <p className="text-xs sm:text-sm text-primary">{movie.matchReason}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="text-center">
                    <button
                      onClick={() => setSelectedCategory(null)}
                      className="px-4 sm:px-6 py-2 sm:py-3 rounded-xl bg-primary text-white hover:bg-primary/90 transition-colors text-sm sm:text-base"
                    >
                      Start Over
                    </button>
                  </div>
                </div>
              ) : (
                // Question Display
                <>
                  <div className="mb-6 sm:mb-8">
                    <div className="h-2 bg-foreground/10 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary transition-all duration-300"
                        style={{ width: `${getProgress()}%` }}
                      />
                    </div>
                  </div>
                  <div className="bg-background/60 border border-foreground/10 rounded-2xl p-4 sm:p-8">
                    <h3 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-6">
                      {movieCategories.find(c => c.id === selectedCategory)?.questions[currentQuestion].text}
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                      {movieCategories
                        .find(c => c.id === selectedCategory)
                        ?.questions[currentQuestion].options.map((option) => (
                          <button
                            key={option}
                            onClick={() => handleAnswer(option)}
                            className="p-3 sm:p-4 rounded-xl bg-background/60 border border-foreground/10 hover:border-primary/30 transition-all duration-300 text-left text-sm sm:text-base"
                          >
                            {option}
                          </button>
                        ))}
                    </div>
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      </section>
    </main>
  )
} 