import mongoose from 'mongoose'
import { IMovie } from './Movie'
import { IUser } from './User'

export interface IBooking {
  movie: mongoose.Types.ObjectId | IMovie
  user: mongoose.Types.ObjectId | IUser
  showtime: Date
  seats: string[]
  totalAmount: number
  status: 'pending' | 'confirmed' | 'cancelled'
  createdAt: Date
  updatedAt: Date
}

const bookingSchema = new mongoose.Schema<IBooking>({
  movie: { type: mongoose.Schema.Types.ObjectId, ref: 'Movie', required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  showtime: { type: Date, required: true },
  seats: [{ type: String, required: true }],
  totalAmount: { type: Number, required: true },
  status: { 
    type: String, 
    enum: ['pending', 'confirmed', 'cancelled'], 
    default: 'pending' 
  }
}, {
  timestamps: true
})

export const Booking = mongoose.models.Booking || mongoose.model<IBooking>('Booking', bookingSchema)
export type BookingDocument = mongoose.Document & IBooking 