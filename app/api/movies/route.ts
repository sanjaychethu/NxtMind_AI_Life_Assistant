import { NextResponse } from 'next/server'
import { connectDB } from '@/lib/mongodb'
import Movie from '@/models/Movie'

export async function GET() {
  try {
    await connectDB()
    const movies = await Movie.find({})
    return NextResponse.json(movies)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch movies' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    await connectDB()
    const movie = await Movie.create(body)
    return NextResponse.json(movie, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create movie' }, { status: 500 })
  }
} 