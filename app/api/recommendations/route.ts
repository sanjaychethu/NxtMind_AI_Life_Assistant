import { GoogleGenerativeAI } from '@google/generative-ai'
import { NextResponse } from 'next/server'

// Initialize Gemini API
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY || '')

export async function POST(request: Request) {
  try {
    const { category, answers } = await request.json()

    // Create a prompt based on the user's answers
    const prompt = `Based on the following movie preferences and answers, recommend 5 movies that would be perfect for this user. 
    For each movie, provide:
    - Title
    - A brief description (1-2 sentences)
    - Why it matches their preferences
    - A rating out of 10
    
    User Preferences:
    ${Object.entries(answers).map(([key, value]) => `${key}: ${value}`).join('\n')}
    
    Format the response as a JSON array with the following structure:
    {
      "recommendations": [
        {
          "id": "unique_id",
          "title": "Movie Title",
          "description": "Brief description",
          "matchReason": "Why it matches their preferences",
          "rating": 8.5,
          "poster": "/images/movie-poster.jpg"
        }
      ]
    }`

    // Get response from Gemini
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' })
    const result = await model.generateContent(prompt)
    const response = await result.response
    const text = response.text()

    // Parse the response and extract the JSON
    const jsonMatch = text.match(/\{[\s\S]*\}/)
    if (!jsonMatch) {
      throw new Error('Invalid response format from Gemini')
    }

    const recommendations = JSON.parse(jsonMatch[0])

    return NextResponse.json(recommendations)
  } catch (error) {
    console.error('Error generating recommendations:', error)
    return NextResponse.json(
      { error: 'Failed to generate recommendations' },
      { status: 500 }
    )
  }
} 