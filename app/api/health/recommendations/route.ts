import { NextResponse } from 'next/server'
import { GoogleGenerativeAI } from '@google/generative-ai'

// Initialize Gemini API
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '')

export async function POST(req: Request) {
  try {
    if (!process.env.GEMINI_API_KEY) {
      throw new Error('GEMINI_API_KEY is not configured')
    }

    const { category, userProfile } = await req.json()

    // Initialize the model with Gemini 2.0 Flash for faster responses
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" })

    // Optimized prompt for faster processing
    const prompt = `Health recommendations for ${category}:
    User Profile: ${JSON.stringify(userProfile)}
    
    Provide:
    1. Current state overview (1-2 sentences)
    2. 3 specific recommendations
    3. Brief benefit explanation for each
    4. One tracking tip
    
    Keep it concise and actionable.`

    try {
      // Generate content with optimized settings
      const result = await model.generateContent({
        contents: [{ role: 'user', parts: [{ text: prompt }] }],
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 500,
        },
      })
      
      const response = await result.response
      const recommendations = response.text()

      return NextResponse.json({ recommendations })
    } catch (apiError: any) {
      console.error('Gemini API Error:', apiError)
      
      // Check if it's a model not found error
      if (apiError.message?.includes('model not found')) {
        return NextResponse.json(
          { 
            error: 'Model not available',
            details: 'Please check if you have access to the Gemini 2.0 Flash model'
          },
          { status: 400 }
        )
      }

      return NextResponse.json(
        { 
          error: 'Failed to generate recommendations',
          details: apiError.message || 'Unknown API error'
        },
        { status: 500 }
      )
    }
  } catch (error: any) {
    console.error('Error in health recommendations:', error)
    return NextResponse.json(
      { 
        error: 'Failed to process request',
        details: error.message || 'Unknown error'
      },
      { status: 500 }
    )
  }
} 