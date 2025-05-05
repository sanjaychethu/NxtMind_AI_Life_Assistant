import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextResponse } from 'next/server';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

export async function POST(req: Request) {
  try {
    if (!process.env.GEMINI_API_KEY) {
      throw new Error('GEMINI_API_KEY is not configured');
    }

    const { message } = await req.json();

    // Initialize the model
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    // Create a prompt that includes context about the application
    const prompt = `You are Max, an AI assistant for NexMind, a comprehensive life optimization platform. 
    The platform offers various modules including health, fitness, nutrition, finance, learning, travel, and entertainment.
    
    User message: ${message}
    
    Provide a helpful, concise response that aligns with NexMind's focus on personal optimization and improvement.
    If the question is about a specific module, provide relevant information about that module.
    Keep responses friendly and professional.`;

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
      });

      const response = await result.response;
      const text = response.text();

      return NextResponse.json({ response: text });
    } catch (apiError: any) {
      console.error('Gemini API Error:', apiError);
      
      if (apiError.message?.includes('model not found')) {
        return NextResponse.json(
          { 
            error: 'Model not available',
            details: 'Please check if you have access to the Gemini model'
          },
          { status: 400 }
        );
      }

      return NextResponse.json(
        { 
          error: 'Failed to generate response',
          details: apiError.message || 'Unknown API error'
        },
        { status: 500 }
      );
    }
  } catch (error: any) {
    console.error('Error in chat:', error);
    return NextResponse.json(
      { 
        error: 'Failed to process request',
        details: error.message || 'Unknown error'
      },
      { status: 500 }
    );
  }
} 