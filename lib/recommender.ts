import { Movie } from '@/models/Movie'

interface RecommendationResult {
  movieId: string
  confidence: number
  reason: string
}

export async function getRecommendations(
  userId: string,
  userPreferences: {
    favoriteGenres: string[]
    watchHistory: string[]
    ratings: Record<string, number>
  }
): Promise<RecommendationResult[]> {
  // This is a simple recommendation algorithm
  // In a real app, you would use a more sophisticated ML model
  try {
    const allMovies = await Movie.find({
      _id: { $nin: userPreferences.watchHistory }
    })

    const recommendations = allMovies.map(movie => {
      let confidence = 0
      let reasons = []

      // Genre match
      const genreMatch = movie.genres.some(g => 
        userPreferences.favoriteGenres.includes(g)
      )
      if (genreMatch) {
        confidence += 0.4
        reasons.push('Matches your favorite genres')
      }

      // Rating based
      const avgUserRating = Object.values(userPreferences.ratings).reduce(
        (a, b) => a + b, 0
      ) / Object.values(userPreferences.ratings).length

      if (movie.rating >= avgUserRating) {
        confidence += 0.3
        reasons.push('High rating similar to movies you like')
      }

      // Popularity boost
      if (movie.rating > 8) {
        confidence += 0.3
        reasons.push('Highly rated by other users')
      }

      return {
        movieId: movie._id.toString(),
        confidence: Math.min(confidence, 1),
        reason: reasons.join('. ')
      }
    })

    return recommendations
      .filter(r => r.confidence > 0.5)
      .sort((a, b) => b.confidence - a.confidence)
      .slice(0, 6)

  } catch (error) {
    console.error('Recommendation error:', error)
    return []
  }
} 