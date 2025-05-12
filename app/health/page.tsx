'use client'

import React, { useState } from 'react'
import { HeartPulse, Brain, Moon, Dumbbell, Star } from 'lucide-react'

// Use a simple chevron and loader SVG inline since Lucide does not export those
const ChevronRight = (props: any) => (
  <svg {...props} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
)
const Loader = (props: any) => (
  <svg {...props} fill="none" stroke="currentColor" viewBox="0 0 24 24" className={props.className}><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path></svg>
)

// Add these interfaces at the top of the file
interface Question {
  id: string;
  question: string;
  options: string[];
}

interface Category {
  id: string;
  title: string;
  description: string;
  icon: JSX.Element;
  color: string;
  questions: Question[];
}

interface Section {
  title: string;
  content: string[];
}

const healthCategories: Category[] = [
  {
    id: 'mental',
    title: 'Mental Health',
    description: 'Get personalized mental wellness recommendations',
    icon: <Brain className="w-6 h-6" />,
    color: 'from-blue-500 to-purple-500',
    questions: [
      { id: 'stress_level', question: 'How would you rate your current stress level?', options: ['Low', 'Moderate', 'High', 'Very High'] },
      { id: 'sleep_quality', question: 'How would you rate your sleep quality?', options: ['Poor', 'Fair', 'Good', 'Excellent'] },
      { id: 'mood', question: 'How would you describe your current mood?', options: ['Depressed', 'Neutral', 'Good', 'Excellent'] },
      { id: 'focus', question: 'How well can you concentrate on tasks?', options: ['Very Poor', 'Poor', 'Good', 'Excellent'] },
      { id: 'social_interaction', question: 'How satisfied are you with your social interactions?', options: ['Not at all', 'Somewhat', 'Mostly', 'Very satisfied'] }
    ]
  },
  {
    id: 'physical',
    title: 'Physical Health',
    description: 'Track and improve your physical well-being',
    icon: <Dumbbell className="w-6 h-6" />,
    color: 'from-green-500 to-emerald-500',
    questions: [
      { id: 'exercise_frequency', question: 'How often do you exercise?', options: ['Never', '1-2 times/week', '3-4 times/week', '5+ times/week'] },
      { id: 'energy_level', question: 'How would you rate your energy levels?', options: ['Low', 'Moderate', 'Good', 'High'] },
      { id: 'physical_activity', question: 'How active are you during the day?', options: ['Mostly Sedentary', 'Lightly Active', 'Moderately Active', 'Very Active'] },
      { id: 'diet_quality', question: 'How would you rate your diet quality?', options: ['Poor', 'Fair', 'Good', 'Excellent'] },
      { id: 'hydration', question: 'How much water do you drink daily?', options: ['<1L', '1-2L', '2-3L', '3L+'] }
    ]
  },
  {
    id: 'sleep',
    title: 'Sleep Quality',
    description: 'Optimize your sleep patterns and habits',
    icon: <Moon className="w-6 h-6" />,
    color: 'from-indigo-500 to-violet-500',
    questions: [
      { id: 'sleep_duration', question: 'How many hours do you sleep on average?', options: ['Less than 5 hours', '5-6 hours', '7-8 hours', 'More than 8 hours'] },
      { id: 'sleep_quality', question: 'How would you rate your sleep quality?', options: ['Poor', 'Fair', 'Good', 'Excellent'] },
      { id: 'sleep_issues', question: 'Do you experience any sleep issues?', options: ['Frequent Insomnia', 'Occasional Issues', 'Rare Issues', 'No Issues'] },
      { id: 'bedtime_consistency', question: 'How consistent is your bedtime?', options: ['Very inconsistent', 'Somewhat inconsistent', 'Mostly consistent', 'Very consistent'] },
      { id: 'wake_feeling', question: 'How do you feel upon waking up?', options: ['Very tired', 'Somewhat tired', 'Refreshed', 'Energized'] }
    ]
  },
  {
    id: 'stress',
    title: 'Stress Management',
    description: 'Learn effective stress reduction techniques',
    icon: <HeartPulse className="w-6 h-6" />,
    color: 'from-rose-500 to-pink-500',
    questions: [
      { id: 'stress_sources', question: 'What are your main sources of stress?', options: ['Work', 'Relationships', 'Health', 'Financial'] },
      { id: 'stress_management', question: 'How do you currently manage stress?', options: ['No Management', 'Basic Techniques', 'Regular Practice', 'Comprehensive Approach'] },
      { id: 'stress_impact', question: 'How does stress affect your daily life?', options: ['Severely', 'Moderately', 'Slightly', 'Minimally'] },
      { id: 'relaxation_frequency', question: 'How often do you practice relaxation techniques?', options: ['Never', 'Occasionally', 'Regularly', 'Daily'] },
      { id: 'support_system', question: 'How strong is your support system?', options: ['None', 'Weak', 'Moderate', 'Strong'] }
    ]
  }
]

function calculateScore(category: Category, answers: Record<string, string>) {
  let score = 0;
  let max = category.questions.length * 3;
  category.questions.forEach((q: Question) => {
    const answer = answers[q.id];
    let value = q.options.indexOf(answer);
    if (q.id.includes('stress') || q.id === 'mood' || q.id === 'sleep_issues') {
      value = q.options.length - 1 - value;
    }
    score += value;
  });
  return { score, max };
}

function parseGeminiResponse(text: string): Section[] {
  // Clean up the text first
  const cleanText = text
    .replace(/\*+/g, '') // Remove all stars
    .replace(/#+/g, '') // Remove any hashtags
    .split('\n')
    .map(line => line.trim())
    .filter(Boolean)
    .join('\n');

  // Try to split into sections
  const sections: Section[] = [];
  let current: Section | null = null;

  cleanText.split('\n').forEach(line => {
    // Check for numbered sections or keywords
    if (/^\d+\.\s*(.*?):/i.test(line) || /^(Overview|Current State|Recommendations|Benefits|Tracking Tip):/i.test(line)) {
      if (current && (current as Section).content.length > 0) sections.push(current as Section);
      const title = line.replace(/^\d+\.\s*/, '').replace(/:$/, '');
      current = { title, content: [] };
    } else if (current) {
      // Clean up the content line
      const cleanLine = line
        .replace(/^\s*[-•]\s*/, '') // Remove bullet points
        .replace(/^\s*\*\s*/, ''); // Remove starting asterisks
      if (cleanLine) {
        current.content.push(cleanLine);
      }
    } else {
      // First block (overview)
      current = { title: 'Overview', content: [line] };
    }
  });

  if (current && (current as Section).content.length > 0) sections.push(current as Section);
  return sections;
}

export default function HealthPage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [recommendations, setRecommendations] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [scoreData, setScoreData] = useState<{ score: number, max: number } | null>(null)

  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategory(categoryId)
    setCurrentQuestion(0)
    setAnswers({})
    setRecommendations(null)
    setScoreData(null)
  }

  const handleAnswer = async (answer: string) => {
    const category = healthCategories.find(c => c.id === selectedCategory)
    if (!category) return
    const currentQ = category.questions[currentQuestion]
    setAnswers(prev => ({ ...prev, [currentQ.id]: answer }))
    if (currentQuestion < category.questions.length - 1) {
      setCurrentQuestion(prev => prev + 1)
    } else {
      // All questions answered, get recommendations and score
      setIsLoading(true)
      const score = calculateScore(category, { ...answers, [currentQ.id]: answer })
      setScoreData(score)
      try {
        const response = await fetch('/api/health/recommendations', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            category: selectedCategory,
            userProfile: { ...answers, [currentQ.id]: answer, category: selectedCategory }
          }),
        })
        const data = await response.json()
        setRecommendations(data.recommendations)
      } catch (error) {
        console.error('Error fetching recommendations:', error)
      } finally {
        setIsLoading(false)
      }
    }
  }

  const selectedCategoryData = healthCategories.find(c => c.id === selectedCategory)

  // Progress bar percentage
  const progress = selectedCategoryData ? ((currentQuestion) / selectedCategoryData.questions.length) * 100 : 0

  return (
    <div className="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold gradient-text mb-4">Health & Wellness</h1>
          <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
            Get personalized health and wellness recommendations based on your current state and goals.
          </p>
        </div>
        {/* Health Categories Grid */}
        {!selectedCategory && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {healthCategories.map((category) => (
              <button
                key={category.id}
                onClick={() => handleCategorySelect(category.id)}
                className="relative group p-10 min-h-[260px] rounded-3xl transition-all duration-300 bg-background/60 hover:bg-background/80 border border-foreground/10 hover:border-primary/30 shadow-xl"
              >
                <div className="flex items-center justify-between mb-6">
                  <div className="p-4 rounded-2xl bg-primary/10">
                    {category.icon}
                  </div>
                  <ChevronRight className="w-6 h-6 text-foreground/60 group-hover:text-primary transition-transform duration-300" />
                </div>
                <h3 className="text-2xl font-semibold mb-3 text-foreground">
                  {category.title}
                </h3>
                <p className="text-base text-foreground/60">
                  {category.description}
                </p>
              </button>
            ))}
          </div>
        )}
        {/* Questionnaire */}
        {selectedCategory && !recommendations && (
          <div className="max-w-2xl mx-auto bg-background/60 rounded-2xl p-8 border border-foreground/10">
            <h2 className="text-2xl font-semibold mb-6">
              {selectedCategoryData?.title} Assessment
            </h2>
            {/* Progress Bar */}
            <div className="w-full h-2 bg-foreground/10 rounded-full mb-6 overflow-hidden">
              <div className="h-full bg-primary rounded-full transition-all duration-300" style={{ width: `${progress}%` }} />
            </div>
            {selectedCategoryData && (
              <div className="space-y-6">
                <p className="text-foreground/70">
                  Question {currentQuestion + 1} of {selectedCategoryData.questions.length}
                </p>
                <h3 className="text-xl font-medium">
                  {selectedCategoryData.questions[currentQuestion].question}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {selectedCategoryData.questions[currentQuestion].options.map((option) => (
                    <button
                      key={option}
                      onClick={() => handleAnswer(option)}
                      className="p-4 rounded-xl bg-background/80 border border-foreground/10 hover:border-primary/30 transition-all duration-300 text-left"
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
        {/* Recommendations Section */}
        {recommendations && (
          <div className="max-w-2xl mx-auto bg-background/60 rounded-2xl p-8 border border-foreground/10 mt-8">
            <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
              <Star className="w-6 h-6 text-accent" /> Your Results
            </h2>
            {/* Score Card */}
            {scoreData && (
              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-xl">
                  <Star className="w-5 h-5 text-primary" />
                  <span className="font-bold text-lg text-primary">{scoreData.score} / {scoreData.max}</span>
                  <span className="text-foreground/60 ml-2">Wellness Score</span>
                </div>
                <div className="flex-1">
                  <div className="text-sm text-foreground/60">Higher is better</div>
                </div>
              </div>
            )}
            {/* Summary of Answers */}
            <div className="mb-6">
              <div className="font-semibold text-foreground mb-2">Your Answers:</div>
              <ul className="list-disc pl-6 text-foreground/80">
                {selectedCategoryData?.questions.map((q: { id: string; question: string }, idx: number) => (
                  <li key={q.id}><span className="font-medium">{q.question}</span>: {answers[q.id]}</li>
                ))}
              </ul>
            </div>
            {/* Gemini Recommendations */}
            <div className="mb-8">
              <div className="font-semibold text-xl text-foreground mb-4 flex items-center gap-2">
                <Brain className="w-6 h-6 text-primary" />
                AI Recommendations
              </div>
              {isLoading ? (
                <div className="flex items-center justify-center py-8">
                  <Loader className="w-8 h-8 animate-spin text-primary" />
                </div>
              ) : (
                <div className="space-y-6">
                  {parseGeminiResponse(recommendations).map((section: Section, idx: number) => (
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
              )}
            </div>
            {/* Insights */}
            <div className="mb-6">
              <div className="font-semibold text-foreground mb-2">Key Insights:</div>
              <ul className="list-disc pl-6 text-foreground/80">
                {scoreData && scoreData.score / scoreData.max > 0.7 && <li>Great job! Your wellness score is above average.</li>}
                {scoreData && scoreData.score / scoreData.max <= 0.7 && scoreData.score / scoreData.max > 0.4 && <li>Your wellness is moderate. Consider focusing on areas with lower scores.</li>}
                {scoreData && scoreData.score / scoreData.max <= 0.4 && <li>Your wellness score is low. Prioritize self-care and follow the recommendations closely.</li>}
              </ul>
            </div>
            <button
              onClick={() => {
                setSelectedCategory(null)
                setCurrentQuestion(0)
                setAnswers({})
                setRecommendations(null)
                setScoreData(null)
              }}
              className="mt-6 btn btn-primary"
            >
              Start New Assessment
            </button>
          </div>
        )}
      </div>
      <footer className="hidden lg:flex items-center justify-center w-full py-4 border-t border-foreground/10 text-foreground/70 text-sm gap-2">
        <a
          href="https://github.com/sanjaychethu"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 hover:text-primary transition-colors"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
          </svg>
          Developed by V Sanjay
        </a>
      </footer>
    </div>
  )
} 