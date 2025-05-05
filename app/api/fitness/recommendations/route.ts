import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextResponse } from 'next/server';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

export async function POST(req: Request) {
  try {
    if (!process.env.GEMINI_API_KEY) {
      throw new Error('GEMINI_API_KEY is not configured');
    }

    const { category, userProfile } = await req.json();

    // Initialize the model
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    // Create a category-specific prompt
    let prompt = '';
    switch (category) {
      case 'strength':
        prompt = `As a professional fitness trainer, create a personalized strength training plan based on this profile:
        Experience Level: ${userProfile.experience_level}
        Training Frequency: ${userProfile.training_frequency}
        Goals: ${userProfile.strength_goals}
        Equipment Access: ${userProfile.equipment_access}
        Recovery: ${userProfile.recovery_time}

        Provide:
        1. Current State Overview: Brief assessment of their fitness level
        2. Workout Plan: Detailed weekly workout structure
        3. Exercise Details: Specific exercises, sets, reps, and progression plan
        4. Tips: Form guidance and safety considerations
        
        Format the response clearly with sections and keep it actionable.`;
        break;

      case 'cardio':
        prompt = `As a cardio fitness specialist, create a personalized cardio training plan based on this profile:
        Cardio Frequency: ${userProfile.cardio_frequency}
        Duration Capacity: ${userProfile.cardio_duration}
        Preferred Activity: ${userProfile.preferred_cardio}
        Intensity Level: ${userProfile.intensity_level}
        Goals: ${userProfile.cardio_goals}

        Provide:
        1. Current State Overview: Brief assessment of their cardio fitness
        2. Workout Plan: Weekly cardio schedule with varied activities
        3. Exercise Details: Duration, intensity, and progression guidelines
        4. Tips: Heart rate zones and monitoring advice
        
        Format the response clearly with sections and keep it practical.`;
        break;

      case 'flexibility':
        prompt = `As a mobility and flexibility expert, create a personalized flexibility program based on this profile:
        Stretching Routine: ${userProfile.stretch_routine}
        Flexibility Level: ${userProfile.mobility_level}
        Movement Restrictions: ${userProfile.movement_restrictions}
        Current Practice: ${userProfile.mobility_practice}
        Goals: ${userProfile.flexibility_goals}

        Provide:
        1. Current State Overview: Brief assessment of their flexibility
        2. Workout Plan: Daily mobility routine structure
        3. Exercise Details: Key stretches and mobility drills
        4. Tips: Proper form and breathing techniques
        
        Format the response clearly with sections and focus on safety.`;
        break;

      case 'goals':
        prompt = `As a fitness planning specialist, create a comprehensive fitness strategy based on this profile:
        Primary Goal: ${userProfile.primary_goal}
        Time Commitment: ${userProfile.time_commitment}
        Activity Level: ${userProfile.lifestyle_activity}
        Motivation: ${userProfile.motivation_level}
        Tracking Preference: ${userProfile.progress_tracking}

        Provide:
        1. Current State Overview: Brief assessment of their starting point
        2. Action Plan: Structured approach to reaching their goals
        3. Milestones: Key progress indicators and timeframes
        4. Tips: Motivation strategies and tracking methods
        
        Format the response clearly with sections and make it motivating.`;
        break;

      default:
        prompt = `Create a general fitness plan based on the user's profile: ${JSON.stringify(userProfile)}`;
    }

    try {
      // Generate content with optimized settings
      const result = await model.generateContent({
        contents: [{ role: 'user', parts: [{ text: prompt }] }],
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 800,
        },
      });

      const response = await result.response;
      const recommendations = response.text();

      return NextResponse.json({ recommendations });
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
          error: 'Failed to generate recommendations',
          details: apiError.message || 'Unknown API error'
        },
        { status: 500 }
      );
    }
  } catch (error: any) {
    console.error('Error in fitness recommendations:', error);
    return NextResponse.json(
      { 
        error: 'Failed to process request',
        details: error.message || 'Unknown error'
      },
      { status: 500 }
    );
  }
} 