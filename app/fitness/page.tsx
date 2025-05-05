'use client'

import React, { useState } from 'react'
import { Dumbbell, Heart, Flame, Target, Star, Trophy } from 'lucide-react'

// Use a simple chevron and loader SVG inline since Lucide does not export those
const ChevronRight = (props: any) => (
  <svg {...props} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
)
const Loader = (props: any) => (
  <svg {...props} fill="none" stroke="currentColor" viewBox="0 0 24 24" className={props.className}><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path></svg>
)

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

const fitnessCategories: Category[] = [
  {
    id: 'strength',
    title: 'Strength Training',
    description: 'Assess your strength levels and get personalized weight training plans',
    icon: <Dumbbell className="w-6 h-6" />,
    color: 'from-purple-500 to-indigo-500',
    questions: [
      { id: 'experience_level', question: 'What is your experience with strength training?', 
        options: ['Beginner', 'Intermediate', 'Advanced', 'Expert'] },
      { id: 'training_frequency', question: 'How often do you strength train?', 
        options: ['Never', '1-2 times/week', '3-4 times/week', '5+ times/week'] },
      { id: 'strength_goals', question: 'What are your primary strength goals?', 
        options: ['Build Muscle', 'Increase Strength', 'Improve Tone', 'General Fitness'] },
      { id: 'equipment_access', question: 'What equipment do you have access to?', 
        options: ['None/Bodyweight', 'Basic Home Gym', 'Full Home Gym', 'Commercial Gym'] },
      { id: 'recovery_time', question: 'How well do you recover between workouts?', 
        options: ['Poor Recovery', 'Moderate Recovery', 'Good Recovery', 'Excellent Recovery'] }
    ]
  },
  {
    id: 'cardio',
    title: 'Cardiovascular Fitness',
    description: 'Evaluate your cardio fitness and receive tailored cardio workout plans',
    icon: <Heart className="w-6 h-6" />,
    color: 'from-red-500 to-pink-500',
    questions: [
      { id: 'cardio_frequency', question: 'How often do you do cardio exercises?', 
        options: ['Rarely', '1-2 times/week', '3-4 times/week', '5+ times/week'] },
      { id: 'cardio_duration', question: 'How long can you maintain moderate cardio activity?', 
        options: ['< 10 minutes', '10-20 minutes', '20-40 minutes', '40+ minutes'] },
      { id: 'preferred_cardio', question: 'What type of cardio do you prefer?', 
        options: ['Walking/Running', 'Cycling', 'Swimming', 'HIIT Training'] },
      { id: 'intensity_level', question: 'What intensity level are you comfortable with?', 
        options: ['Light', 'Moderate', 'High', 'Very High'] },
      { id: 'cardio_goals', question: 'What are your cardio fitness goals?', 
        options: ['Weight Loss', 'Endurance', 'Heart Health', 'Athletic Performance'] }
    ]
  },
  {
    id: 'flexibility',
    title: 'Flexibility & Mobility',
    description: 'Analyze your flexibility and get customized mobility improvement plans',
    icon: <Flame className="w-6 h-6" />,
    color: 'from-orange-500 to-yellow-500',
    questions: [
      { id: 'stretch_routine', question: 'Do you have a regular stretching routine?', 
        options: ['Never', 'Occasionally', 'Regular', 'Daily'] },
      { id: 'mobility_level', question: 'How would you rate your overall flexibility?', 
        options: ['Poor', 'Fair', 'Good', 'Excellent'] },
      { id: 'movement_restrictions', question: 'Do you have any movement restrictions?', 
        options: ['Several', 'A Few', 'Minor', 'None'] },
      { id: 'mobility_practice', question: 'What type of mobility work do you practice?', 
        options: ['None', 'Basic Stretching', 'Yoga/Pilates', 'Advanced Mobility Training'] },
      { id: 'flexibility_goals', question: 'What are your flexibility goals?', 
        options: ['Injury Prevention', 'Better Posture', 'Increased Range of Motion', 'Athletic Performance'] }
    ]
  },
  {
    id: 'goals',
    title: 'Fitness Goals',
    description: 'Set and track your fitness objectives for personalized guidance',
    icon: <Target className="w-6 h-6" />,
    color: 'from-emerald-500 to-teal-500',
    questions: [
      { id: 'primary_goal', question: 'What is your primary fitness goal?', 
        options: ['Weight Loss', 'Muscle Gain', 'Athletic Performance', 'Overall Health'] },
      { id: 'time_commitment', question: 'How much time can you commit to fitness weekly?', 
        options: ['2-3 hours', '4-6 hours', '7-9 hours', '10+ hours'] },
      { id: 'lifestyle_activity', question: 'How active is your daily lifestyle?', 
        options: ['Sedentary', 'Lightly Active', 'Moderately Active', 'Very Active'] },
      { id: 'motivation_level', question: 'How would you rate your fitness motivation?', 
        options: ['Low', 'Moderate', 'High', 'Very High'] },
      { id: 'progress_tracking', question: 'How do you prefer to track your progress?', 
        options: ['Measurements', 'Progress Photos', 'Performance Metrics', 'All of the Above'] }
    ]
  }
];

function calculateScore(category: Category, answers: Record<string, string>) {
  let score = 0;
  let max = category.questions.length * 3;
  category.questions.forEach((q: Question) => {
    const answer = answers[q.id];
    let value = q.options.indexOf(answer);
    // For some questions, we don't want to reverse the score
    const nonReverseIds = ['primary_goal', 'preferred_cardio', 'progress_tracking'];
    if (!nonReverseIds.includes(q.id)) {
      value = q.options.length - 1 - value;
    }
    score += value;
  });
  return { score, max };
}

function parseGeminiResponse(text: string): Section[] {
  const cleanText = text
    .replace(/\*+/g, '')
    .replace(/#+/g, '')
    .split('\n')
    .map(line => line.trim())
    .filter(Boolean)
    .join('\n');

  const sections: Section[] = [];
  let current: Section | null = null;

  cleanText.split('\n').forEach(line => {
    if (/^\d+\.\s*(.*?):/i.test(line) || /^(Overview|Workout Plan|Exercise Details|Progression|Tips):/i.test(line)) {
      if (current && (current as Section).content.length > 0) sections.push(current as Section);
      const title = line.replace(/^\d+\.\s*/, '').replace(/:$/, '');
      current = { title, content: [] };
    } else if (current) {
      const cleanLine = line
        .replace(/^\s*[-•]\s*/, '')
        .replace(/^\s*\*\s*/, '');
      if (cleanLine) {
        current.content.push(cleanLine);
      }
    } else {
      current = { title: 'Overview', content: [line] };
    }
  });

  if (current && (current as Section).content.length > 0) sections.push(current as Section);
  return sections;
}

export default function FitnessPage() {
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
    const category = fitnessCategories.find(c => c.id === selectedCategory)
    if (!category) return
    const currentQ = category.questions[currentQuestion]
    setAnswers(prev => ({ ...prev, [currentQ.id]: answer }))
    if (currentQuestion < category.questions.length - 1) {
      setCurrentQuestion(prev => prev + 1)
    } else {
      setIsLoading(true)
      const score = calculateScore(category, { ...answers, [currentQ.id]: answer })
      setScoreData(score)
      try {
        const response = await fetch('/api/fitness/recommendations', {
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

  const selectedCategoryData = fitnessCategories.find(c => c.id === selectedCategory)
  const progress = selectedCategoryData ? ((currentQuestion) / selectedCategoryData.questions.length) * 100 : 0

  return (
    <div className="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold gradient-text mb-4">Fitness Assessment</h1>
          <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
            Get personalized workout plans and fitness recommendations based on your goals and current fitness level.
          </p>
        </div>

        {/* Fitness Categories Grid */}
        {!selectedCategory && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {fitnessCategories.map((category) => (
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
              <div 
                className="h-full bg-primary rounded-full transition-all duration-300" 
                style={{ width: `${progress}%` }} 
              />
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
              <Trophy className="w-6 h-6 text-accent" /> Your Fitness Plan
            </h2>

            {/* Score Card */}
            {scoreData && (
              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-xl">
                  <Star className="w-5 h-5 text-primary" />
                  <span className="font-bold text-lg text-primary">{scoreData.score} / {scoreData.max}</span>
                  <span className="text-foreground/60 ml-2">Fitness Level</span>
                </div>
                <div className="flex-1">
                  <div className="text-sm text-foreground/60">Based on your assessment</div>
                </div>
              </div>
            )}

            {/* Summary of Answers */}
            <div className="mb-6">
              <div className="font-semibold text-foreground mb-2">Your Profile:</div>
              <ul className="list-disc pl-6 text-foreground/80">
                {selectedCategoryData?.questions.map(q => (
                  <li key={q.id}><span className="font-medium">{q.question}</span>: {answers[q.id]}</li>
                ))}
              </ul>
            </div>

            {/* Workout Recommendations */}
            <div className="mb-8">
              <div className="font-semibold text-xl text-foreground mb-4 flex items-center gap-2">
                <Dumbbell className="w-6 h-6 text-primary" />
                Personalized Workout Plan
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
                {scoreData && scoreData.score / scoreData.max > 0.7 && (
                  <li>You're at an advanced fitness level. Focus on progressive overload and specialized training.</li>
                )}
                {scoreData && scoreData.score / scoreData.max <= 0.7 && scoreData.score / scoreData.max > 0.4 && (
                  <li>You have a good foundation. Consider increasing intensity and adding variety to your workouts.</li>
                )}
                {scoreData && scoreData.score / scoreData.max <= 0.4 && (
                  <li>Start with the basics and focus on proper form. Gradually increase intensity as you build strength.</li>
                )}
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
    </div>
  )
} 