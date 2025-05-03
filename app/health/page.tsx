'use client'

import { useState } from 'react'
import Image from 'next/image'

const healthCategories = [
  {
    id: '1',
    title: 'Mental Health',
    description: 'Get personalized mental wellness recommendations',
    icon: '🧠'
  },
  {
    id: '2',
    title: 'Physical Health',
    description: 'Track and improve your physical well-being',
    icon: '💪'
  },
  {
    id: '3',
    title: 'Sleep Quality',
    description: 'Optimize your sleep patterns and habits',
    icon: '😴'
  },
  {
    id: '4',
    title: 'Stress Management',
    description: 'Learn effective stress reduction techniques',
    icon: '🧘'
  }
]

export default function HealthPage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [recommendations, setRecommendations] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const handleCategorySelect = async (categoryId: string) => {
    setSelectedCategory(categoryId)
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setRecommendations([
        {
          id: '1',
          title: 'Morning Meditation',
          description: 'Start your day with a 10-minute guided meditation',
          duration: '10 min',
          difficulty: 'Beginner'
        },
        {
          id: '2',
          title: 'Deep Breathing Exercise',
          description: 'Practice 4-7-8 breathing technique for stress relief',
          duration: '5 min',
          difficulty: 'Beginner'
        }
      ])
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
              Health & Wellness
            </h1>
            <p className="text-foreground/80">
              Get personalized health recommendations based on your lifestyle and goals
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {healthCategories.map((category) => (
              <button
                key={category.id}
                onClick={() => handleCategorySelect(category.id)}
                className={`p-6 rounded-2xl text-left transition-all ${
                  selectedCategory === category.id
                    ? 'bg-primary text-white'
                    : 'bg-background/50 backdrop-blur-lg border border-foreground/10 hover:border-primary/30'
                }`}
              >
                <div className="text-4xl mb-4">{category.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{category.title}</h3>
                <p className={`${
                  selectedCategory === category.id
                    ? 'text-white/80'
                    : 'text-foreground/60'
                }`}>
                  {category.description}
                </p>
              </button>
            ))}
          </div>

          {selectedCategory && (
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl font-bold mb-6">Recommended Activities</h2>
              {isLoading ? (
                <div className="flex justify-center items-center h-48">
                  <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent" />
                </div>
              ) : (
                <div className="grid gap-6">
                  {recommendations.map((recommendation) => (
                    <div
                      key={recommendation.id}
                      className="p-6 rounded-2xl bg-background/50 backdrop-blur-lg border border-foreground/10 hover:border-primary/30 transition-all"
                    >
                      <h3 className="text-xl font-semibold mb-2">{recommendation.title}</h3>
                      <p className="text-foreground/60 mb-4">{recommendation.description}</p>
                      <div className="flex gap-4 text-sm">
                        <span className="px-3 py-1 rounded-full bg-primary/10 text-primary">
                          {recommendation.duration}
                        </span>
                        <span className="px-3 py-1 rounded-full bg-accent/10 text-accent">
                          {recommendation.difficulty}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </section>
    </main>
  )
} 