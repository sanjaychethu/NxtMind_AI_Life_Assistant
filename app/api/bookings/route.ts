import { NextResponse } from 'next/server'
import { connectDB } from '@/lib/mongodb'
import Booking from '@/models/Booking'

export async function GET() {
  try {
    await connectDB()
    const bookings = await Booking.find({}).populate('movie')
    return NextResponse.json(bookings)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch bookings' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    await connectDB()
    const booking = await Booking.create(body)
    return NextResponse.json(booking, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create booking' }, { status: 500 })
  }
} 