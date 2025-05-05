'use client'

import dynamic from 'next/dynamic'

const Chatbot = dynamic(() => import('@/components/Chatbot'), {
  ssr: false,
  loading: () => (
    <div className="min-h-[400px] flex items-center justify-center">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
    </div>
  ),
})

export default function ChatPage() {
  return (
    <div className="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold gradient-text mb-4">Chat with Max</h1>
          <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
            Your AI assistant for personalized guidance across all aspects of life.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="bg-background/60 rounded-2xl p-8 border border-foreground/10">
            <Chatbot />
          </div>
        </div>
      </div>
    </div>
  )
} 