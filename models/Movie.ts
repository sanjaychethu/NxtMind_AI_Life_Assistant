import mongoose from 'mongoose'

export interface IMovie {
  title: string
  description: string
  poster: string
  rating: number
  genres: string[]
  releaseDate: Date
  duration: number // in minutes
  director: string
  cast: string[]
  createdAt: Date
  updatedAt: Date
}

const movieSchema = new mongoose.Schema<IMovie>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  poster: { type: String, required: true },
  rating: { type: Number, required: true, min: 0, max: 10 },
  genres: [{ type: String, required: true }],
  releaseDate: { type: Date, required: true },
  duration: { type: Number, required: true },
  director: { type: String, required: true },
  cast: [{ type: String, required: true }]
}, {
  timestamps: true
})

export const Movie = mongoose.models.Movie || mongoose.model<IMovie>('Movie', movieSchema)
export type MovieDocument = mongoose.Document & IMovie 