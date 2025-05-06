import React from 'react';
import Image from 'next/image';

export default function HowItWorks() {
  return (
    <div className="min-h-screen bg-background py-16 px-4 sm:px-8 flex items-center justify-center">
      <div className="w-full max-w-4xl rounded-3xl shadow-2xl bg-gradient-to-br from-background/80 via-background/60 to-primary/10 border border-foreground/10 backdrop-blur-xl p-6 sm:p-12">
        <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6 section-title">How It Works</h1>
        <div className="flex flex-col md:flex-row items-center gap-10 md:gap-16">
          <div className="flex-1">
            <p className="text-lg sm:text-xl text-foreground/80 mb-4">
              <span className="font-semibold text-primary">NexMind</span> uses advanced AI algorithms to analyze your preferences, habits, and goals. This allows us to provide tailored recommendations that evolve with you.
            </p>
            <div className="h-1 w-20 bg-gradient-to-r from-primary to-accent rounded-full mb-4" />
            <p className="text-lg sm:text-xl text-foreground/80 mb-4">
              Our AI continuously learns from your interactions, ensuring that the suggestions become more personalized over time. The more you use NexMind, the smarter and more helpful it becomes.
            </p>
            <div className="h-1 w-20 bg-gradient-to-r from-accent to-secondary rounded-full mb-4" />
            <ul className="list-disc pl-5 text-foreground/80 text-lg sm:text-xl mb-4">
              <li>Personalized recommendations for health, finance, learning, and more</li>
              <li>24/7 intelligent assistance</li>
              <li>Secure and private data handling</li>
              <li>Continuous improvement through AI learning</li>
            </ul>
            <p className="text-lg sm:text-xl text-foreground/80">
              <span className="font-semibold text-accent">Experience the future</span> of personal optimization with NexMind, your intelligent companion for smarter living.
            </p>
          </div>
          <div className="flex-1 flex justify-center">
            <div className="relative w-64 h-48 sm:w-80 sm:h-60 rounded-2xl overflow-hidden shadow-xl border border-primary/20 bg-card/60">
              <Image
                src="/images/how-it-works.jpg"
                alt="How NexMind Works"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 