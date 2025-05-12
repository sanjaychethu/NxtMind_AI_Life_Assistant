import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, Send, X } from 'lucide-react';
import dynamic from 'next/dynamic';
import maxIdle from '@/public/animations/max-idle.json';
import maxWave from '@/public/animations/max-wave.json';
import maxThinking from '@/public/animations/max-thinking.json';

const Lottie = dynamic(() => import('lottie-react'), { ssr: false });

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: 'Hi! I\'m Max, your AI assistant. How can I help you today?'
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: userMessage }),
      });

      const data = await response.json();
      setMessages(prev => [...prev, { role: 'assistant', content: data.response }]);
    } catch (error) {
      console.error('Error:', error);
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: 'Sorry, I encountered an error. Please try again.' 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Chat Button with Character */}
      <div 
        className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Character Animation - Hidden on mobile */}
        <div className="hidden sm:block relative w-24 h-24 mb-2">
          <Lottie
            animationData={isHovered ? maxWave : maxIdle}
            loop={true}
            className="w-full h-full"
          />
        </div>
        
        {/* Chat Button */}
        <button
          onClick={() => setIsOpen(true)}
          className="bg-primary text-white rounded-full shadow-lg hover:bg-primary/90 transition-all duration-300 p-3 sm:p-4 flex items-center justify-center gap-2 sm:gap-3"
        >
          <MessageSquare className="w-5 h-5 sm:w-6 sm:h-6" />
          <span className="font-medium hidden sm:inline">Chat with Max</span>
        </button>
      </div>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed inset-0 sm:inset-auto sm:bottom-24 sm:right-6 sm:w-96 sm:h-[600px] bg-background/95 backdrop-blur-lg rounded-none sm:rounded-2xl shadow-2xl border border-foreground/10 flex flex-col z-50">
          {/* Header with Character */}
          <div className="p-4 border-b border-foreground/10 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 sm:w-12 sm:h-12">
                <Lottie
                  animationData={isLoading ? maxThinking : maxIdle}
                  loop={true}
                  className="w-full h-full"
                />
              </div>
              <div>
                <h3 className="font-semibold text-lg">Chat with Max</h3>
                <p className="text-sm text-foreground/60">Your AI Assistant</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 hover:bg-foreground/10 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[85%] sm:max-w-[80%] rounded-2xl p-3 ${
                    message.role === 'user'
                      ? 'bg-primary text-white'
                      : 'bg-foreground/10 text-foreground'
                  }`}
                >
                  <p className="text-sm sm:text-base leading-relaxed">{message.content}</p>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-foreground/10 rounded-2xl p-3">
                  <div className="flex gap-1.5">
                    <div className="w-2 h-2 rounded-full bg-primary animate-bounce" />
                    <div className="w-2 h-2 rounded-full bg-primary animate-bounce delay-100" />
                    <div className="w-2 h-2 rounded-full bg-primary animate-bounce delay-200" />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <form onSubmit={handleSubmit} className="p-4 border-t border-foreground/10">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 bg-foreground/5 rounded-xl px-4 py-3 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
              <button
                type="submit"
                disabled={isLoading || !input.trim()}
                className="p-3 bg-primary text-white rounded-xl hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
} 