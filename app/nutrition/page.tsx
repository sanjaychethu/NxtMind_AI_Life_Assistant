import React from 'react'

export default function NutritionPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12">
      <div className="max-w-2xl w-full bg-background/60 rounded-2xl shadow-xl p-8 border border-foreground/10">
        <h1 className="text-4xl font-bold gradient-text mb-4">Nutrition</h1>
        <p className="text-lg text-foreground/70 mb-8">
          Discover meal plans, nutrition tips, and personalized dietary recommendations to fuel your body and mind.
        </p>
        <div className="bg-background/80 border border-foreground/10 rounded-xl p-6 flex flex-col items-center">
          <span className="text-foreground/60 mb-2">[Nutrition Assistant Interface Coming Soon]</span>
          {/* Add meal planning, nutrition tracking, etc. here */}
        </div>
      </div>
    </div>
  )
} 