'use client'
import React, { useState } from 'react'
import { Apple, Star } from 'lucide-react'

// Custom Loader SVG
const Loader = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} fill="none" stroke="currentColor" viewBox="0 0 24 24" className={props.className}><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path></svg>
)

type Section = { title: string; content: string[] }

type Answers = Record<string, string>

const nutritionQuestions = [
  {
    id: 'goal',
    question: 'What is your primary nutrition goal?',
    options: ['Weight Loss', 'Muscle Gain', 'General Wellness', 'Special Diet']
  },
  {
    id: 'diet_type',
    question: 'Do you follow a specific diet?',
    options: ['None', 'Vegetarian', 'Vegan', 'Keto', 'Low-Carb', 'Other']
  },
  {
    id: 'meals_per_day',
    question: 'How many meals do you eat per day?',
    options: ['1', '2', '3', '4+']
  },
  {
    id: 'snacking',
    question: 'How often do you snack?',
    options: ['Rarely', 'Sometimes', 'Often', 'Very Often']
  },
  {
    id: 'water_intake',
    question: 'How much water do you drink daily?',
    options: ['<1L', '1-2L', '2-3L', '3L+']
  }
]

function parseGeminiResponse(text: string): Section[] {
  const cleanText = text
    .replace(/\*+/g, '')
    .replace(/#+/g, '')
    .split('\n')
    .map((line: string) => line.trim())
    .filter(Boolean)
    .join('\n');
  const sections: Section[] = [];
  let current: Section | null = null;
  cleanText.split('\n').forEach((line: string) => {
    if (/^\d+\.\s*(.*?):/i.test(line) || /^(Overview|Current State|Recommendations|Benefits|Tracking Tip):/i.test(line)) {
      if (current && (current as Section).content.length > 0) sections.push(current as Section);
      const title = line.replace(/^\d+\.\s*/, '').replace(/:$/, '');
      current = { title, content: [] };
    } else if (current) {
      const cleanLine = line.replace(/^\s*[-•]\s*/, '').replace(/^\s*\*\s*/, '');
      if (cleanLine) current.content.push(cleanLine);
    } else {
      current = { title: 'Overview', content: [line] };
    }
  });
  if (current && (current as Section).content.length > 0) sections.push(current as Section);
  return sections;
}

export default function NutritionPage() {
  const [currentQuestion, setCurrentQuestion] = useState<number>(0)
  const [answers, setAnswers] = useState<Answers>({})
  const [recommendations, setRecommendations] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const handleAnswer = async (answer: string) => {
    const q = nutritionQuestions[currentQuestion]
    setAnswers(prev => ({ ...prev, [q.id]: answer }))
    if (currentQuestion < nutritionQuestions.length - 1) {
      setCurrentQuestion(prev => prev + 1)
    } else {
      setIsLoading(true)
      try {
        const response = await fetch('/api/nutrition/recommendations', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ userProfile: { ...answers, [q.id]: answer } })
        })
        const data = await response.json()
        setRecommendations(data.recommendations)
      } catch (error) {
        setRecommendations('Sorry, we could not fetch recommendations at this time.')
      } finally {
        setIsLoading(false)
      }
    }
  }

  const progress = ((currentQuestion) / nutritionQuestions.length) * 100

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12 bg-background">
      <div className="max-w-2xl w-full bg-gradient-to-br from-background/80 via-background/60 to-primary/10 rounded-2xl shadow-xl p-8 border border-foreground/10 backdrop-blur-xl">
        <h1 className="text-4xl font-bold gradient-text mb-4 flex items-center gap-2"><Apple className="w-8 h-8 text-primary" /> Nutrition</h1>
        <p className="text-lg text-foreground/70 mb-8">
          Discover meal plans, nutrition tips, and personalized dietary recommendations to fuel your body and mind.
        </p>
        {!recommendations && (
          <div className="bg-background/80 border border-foreground/10 rounded-xl p-6 flex flex-col items-center">
            <h2 className="text-2xl font-semibold mb-6">Nutrition Assessment</h2>
            <div className="w-full h-2 bg-foreground/10 rounded-full mb-6 overflow-hidden">
              <div className="h-full bg-primary rounded-full transition-all duration-300" style={{ width: `${progress}%` }} />
            </div>
            <p className="text-foreground/70 mb-2">
              Question {currentQuestion + 1} of {nutritionQuestions.length}
            </p>
            <h3 className="text-xl font-medium mb-4">
              {nutritionQuestions[currentQuestion].question}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
              {nutritionQuestions[currentQuestion].options.map(option => (
                <button
                  key={option}
                  onClick={() => handleAnswer(option)}
                  className="p-4 rounded-xl bg-background/80 border border-foreground/10 hover:border-primary/30 transition-all duration-300 text-left w-full"
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        )}
        {isLoading && (
          <div className="flex items-center justify-center py-8">
            <Loader className="w-8 h-8 animate-spin text-primary" />
          </div>
        )}
        {recommendations && !isLoading && (
          <div className="bg-background/80 border border-foreground/10 rounded-xl p-6 mt-6">
            <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
              <Star className="w-6 h-6 text-accent" /> Your Nutrition Plan
            </h2>
            <div className="space-y-6">
              {parseGeminiResponse(recommendations).map((section, idx) => (
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
            <button
              onClick={() => {
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
    </div>
  )
} 