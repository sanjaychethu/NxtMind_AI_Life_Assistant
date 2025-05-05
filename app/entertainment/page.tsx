import React from 'react'

export default function EntertainmentPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12">
      <div className="max-w-2xl w-full bg-background/60 rounded-2xl shadow-xl p-8 border border-foreground/10">
        <h1 className="text-4xl font-bold gradient-text mb-4">Entertainment</h1>
        <p className="text-lg text-foreground/70 mb-8">
          Discover movies, music, games, and personalized entertainment recommendations to unwind and enjoy your free time.
        </p>
        <div className="bg-background/80 border border-foreground/10 rounded-xl p-6 flex flex-col items-center">
          <span className="text-foreground/60 mb-2">[Entertainment Assistant Interface Coming Soon]</span>
          {/* Add entertainment recommendations, playlists, etc. here */}
        </div>
      </div>
    </div>
  )
} 