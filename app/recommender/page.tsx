'use client'

import { useState } from 'react'
import Image from 'next/image'
import MovieCard from '@/components/MovieCard'
import { Star, HeartPulse, Brain } from 'lucide-react'

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

// Add these interfaces at the top of the file
interface Question {
  id: string;
  question: string;
  options: string[];
}

interface Category {
  id: string;
  title: string;
  description: string;
  icon: JSX.Element;
  color: string;
  questions: Question[];
}

interface Section {
  title: string;
  content: string[];
}

// Add movie assessment categories
const movieCategories: Category[] = [
  {
    id: 'preferences',
    title: 'Movie Preferences',
    description: 'Tell us about your movie preferences',
    icon: <Star className="w-6 h-6" />,
    color: 'from-yellow-500 to-orange-500',
    questions: [
      { id: 'favorite_genre', question: 'What is your favorite movie genre?', options: ['Action', 'Drama', 'Comedy', 'Thriller', 'Romance', 'Sci-Fi', 'Horror', 'Documentary', 'Animation', 'Adventure'] },
      { id: 'watch_frequency', question: 'How often do you watch movies?', options: ['Daily', 'Weekly', 'Monthly', 'Occasionally'] },
      { id: 'preferred_language', question: 'What is your preferred movie language?', options: ['English', 'Hindi', 'Tamil', 'Telugu', 'Korean', 'Japanese', 'Spanish', 'French', 'German', 'Other'] },
      { id: 'movie_length', question: 'What is your preferred movie length?', options: ['Short (<90 mins)', 'Medium (90-120 mins)', 'Long (120-150 mins)', 'Epic (>150 mins)'] },
      { id: 'watch_time', question: 'When do you usually watch movies?', options: ['Morning', 'Afternoon', 'Evening', 'Night'] }
    ]
  },
  {
    id: 'history',
    title: 'Viewing History',
    description: 'Share your recent movie experiences',
    icon: <Brain className="w-6 h-6" />,
    color: 'from-blue-500 to-indigo-500',
    questions: [
      { id: 'last_movie', question: 'What was the last movie you watched?', options: ['Action Movie', 'Drama', 'Comedy', 'Thriller', 'Romance', 'Other'] },
      { id: 'last_rating', question: 'How would you rate your last movie?', options: ['1-2 Stars', '3-4 Stars', '5-6 Stars', '7-8 Stars', '9-10 Stars'] },
      { id: 'watch_platform', question: 'Where do you usually watch movies?', options: ['Theater', 'Netflix', 'Amazon Prime', 'Disney+', 'Other Streaming', 'TV'] },
      { id: 'watch_company', question: 'Who do you usually watch movies with?', options: ['Alone', 'Family', 'Friends', 'Partner', 'Group'] },
      { id: 'rewatch_frequency', question: 'How often do you rewatch movies?', options: ['Never', 'Rarely', 'Sometimes', 'Often', 'Very Often'] }
    ]
  },
  {
    id: 'mood',
    title: 'Current Mood',
    description: 'How are you feeling today?',
    icon: <HeartPulse className="w-6 h-6" />,
    color: 'from-pink-500 to-rose-500',
    questions: [
      { id: 'current_mood', question: 'What is your current mood?', options: ['Happy', 'Thoughtful', 'Excited', 'Relaxed', 'Emotional', 'Stressed', 'Bored', 'Energetic'] },
      { id: 'mood_intensity', question: 'How intense is your current mood?', options: ['Very Low', 'Low', 'Moderate', 'High', 'Very High'] },
      { id: 'mood_duration', question: 'How long have you been feeling this way?', options: ['Just Started', 'Few Hours', 'All Day', 'Few Days', 'Longer'] },
      { id: 'mood_change', question: 'Would you like to change your mood?', options: ['Yes, Lift Up', 'Yes, Calm Down', 'Yes, Get Excited', 'No, Maintain Current'] },
      { id: 'mood_activity', question: 'What kind of activity are you in the mood for?', options: ['Relaxing', 'Exciting', 'Thought-provoking', 'Emotional', 'Funny'] }
    ]
  }
]

export default function RecommenderPage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [recommendations, setRecommendations] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [selectedGenres, setSelectedGenres] = useState<string[]>([])
  const [selectedMood, setSelectedMood] = useState<string>('')

  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategory(categoryId)
    setCurrentQuestion(0)
    setAnswers({})
    setRecommendations(null)
  }

  const handleAnswer = async (answer: string) => {
    const category = movieCategories.find(c => c.id === selectedCategory)
    if (!category) return
    const currentQ = category.questions[currentQuestion]
    setAnswers(prev => ({ ...prev, [currentQ.id]: answer }))
    if (currentQuestion < category.questions.length - 1) {
      setCurrentQuestion(prev => prev + 1)
    } else {
      // All questions answered, get recommendations
      setIsLoading(true)
      try {
        const response = await fetch('/api/movies/recommendations', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            category: selectedCategory,
            userProfile: { ...answers, [currentQ.id]: answer, category: selectedCategory }
          }),
        })
        const data = await response.json()
        setRecommendations(data.recommendations)
      } catch (error) {
        console.error('Error fetching recommendations:', error)
      } finally {
        setIsLoading(false)
      }
    }
  }

  const selectedCategoryData = movieCategories.find(c => c.id === selectedCategory)

  // Progress bar percentage
  const progress = selectedCategoryData ? ((currentQuestion) / selectedCategoryData.questions.length) * 100 : 0

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

          {/* Movie Categories Grid */}
          {!selectedCategory && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {movieCategories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => handleCategorySelect(category.id)}
                  className="relative group p-10 min-h-[260px] rounded-3xl transition-all duration-300 bg-background/60 hover:bg-background/80 border border-foreground/10 hover:border-primary/30 shadow-xl"
                >
                  <div className="flex items-center justify-between mb-6">
                    <div className={`p-4 rounded-2xl bg-gradient-to-br ${category.color}`}>
                      {category.icon}
                    </div>
                    <ChevronRight className="w-6 h-6 text-foreground/60 group-hover:text-primary transition-transform duration-300" />
                  </div>
                  <h3 className="text-2xl font-semibold mb-3 text-foreground">
                    {category.title}
                  </h3>
                  <p className="text-base text-foreground/60">
                    {category.description}
                  </p>
                </button>
              ))}
            </div>
          )}

          {/* Assessment Questions */}
          {selectedCategory && !recommendations && (
            <div className="max-w-2xl mx-auto bg-background/60 rounded-2xl p-8 border border-foreground/10">
              <h2 className="text-2xl font-semibold mb-6">
                {selectedCategoryData?.title} Assessment
              </h2>
              {/* Progress Bar */}
              <div className="w-full h-2 bg-foreground/10 rounded-full mb-6 overflow-hidden">
                <div className="h-full bg-primary rounded-full transition-all duration-300" style={{ width: `${progress}%` }} />
              </div>
              {selectedCategoryData && (
                <div className="space-y-6">
                  <p className="text-foreground/70">
                    Question {currentQuestion + 1} of {selectedCategoryData.questions.length}
                  </p>
                  <h3 className="text-xl font-medium">
                    {selectedCategoryData.questions[currentQuestion].question}
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {selectedCategoryData.questions[currentQuestion].options.map((option) => (
                      <button
                        key={option}
                        onClick={() => handleAnswer(option)}
                        className="p-4 rounded-xl bg-background/80 border border-foreground/10 hover:border-primary/30 transition-all duration-300 text-left"
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Recommendations Section */}
          {recommendations && (
            <div className="max-w-2xl mx-auto bg-background/60 rounded-2xl p-8 border border-foreground/10 mt-8">
              <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
                <Star className="w-6 h-6 text-accent" /> Your Movie Recommendations
              </h2>
              
              {/* Summary of Answers */}
              <div className="mb-6">
                <div className="font-semibold text-foreground mb-2">Your Preferences:</div>
                <ul className="list-disc pl-6 text-foreground/80">
                  {selectedCategoryData?.questions.map((q: { id: string; question: string }, idx: number) => (
                    <li key={q.id}><span className="font-medium">{q.question}</span>: {answers[q.id]}</li>
                  ))}
                </ul>
              </div>

              {/* AI Recommendations */}
              <div className="mb-8">
                <div className="font-semibold text-xl text-foreground mb-4 flex items-center gap-2">
                  <Star className="w-6 h-6 text-primary" />
                  Personalized Movie Suggestions
                </div>
                {isLoading ? (
                  <div className="flex items-center justify-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-2 border-primary border-t-transparent" />
                  </div>
                ) : (
                  <div className="space-y-6">
                    {parseGeminiResponse(recommendations).map((section: Section, idx: number) => (
                      <div key={idx} className="bg-card/60 backdrop-blur-sm rounded-xl p-6 border border-foreground/10 hover:border-primary/30 transition-all duration-300">
                        <h3 className="text-lg font-semibold text-primary mb-3">
                          {section.title}
                        </h3>
                        <div className="space-y-2">
                          {section.content.map((line, i) => (
                            <p key={i} className="text-foreground/90 leading-relaxed">
                              {line}
                            </p>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <button
                onClick={() => {
                  setSelectedCategory(null)
                  setCurrentQuestion(0)
                  setAnswers({})
                  setRecommendations(null)
                }}
                className="mt-6 btn btn-primary"
              >
                Start New Assessment
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Movie Grid Section */}
      <section className="py-16">
        <div className="container">
          <h2 className="text-2xl font-bold mb-8">Recommended Movies</h2>
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

// Add the ChevronRight component
const ChevronRight = (props: any) => (
  <svg {...props} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
)

// Add the parseGeminiResponse function
function parseGeminiResponse(text: string): Section[] {
  // Clean up the text first
  const cleanText = text
    .replace(/\*+/g, '') // Remove all stars
    .replace(/#+/g, '') // Remove any hashtags
    .split('\n')
    .map(line => line.trim())
    .filter(Boolean)
    .join('\n');

  // Try to split into sections
  const sections: Section[] = [];
  let current: Section | null = null;

  cleanText.split('\n').forEach(line => {
    // Check for numbered sections or keywords
    if (/^\d+\.\s*(.*?):/i.test(line) || /^(Overview|Current State|Recommendations|Benefits|Tracking Tip):/i.test(line)) {
      if (current && (current as Section).content.length > 0) sections.push(current as Section);
      const title = line.replace(/^\d+\.\s*/, '').replace(/:$/, '');
      current = { title, content: [] };
    } else if (current) {
      // Clean up the content line
      const cleanLine = line
        .replace(/^\s*[-•]\s*/, '') // Remove bullet points
        .replace(/^\s*\*\s*/, ''); // Remove starting asterisks
      if (cleanLine) {
        current.content.push(cleanLine);
      }
    } else {
      // First block (overview)
      current = { title: 'Overview', content: [line] };
    }
  });

  if (current && (current as Section).content.length > 0) sections.push(current as Section);
  return sections;
} 