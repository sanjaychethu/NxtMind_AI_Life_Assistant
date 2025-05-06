import React from 'react';
import Image from 'next/image';

export default function About() {
  return (
    <div className="min-h-screen bg-background py-16 px-4 sm:px-8 flex items-center justify-center">
      <div className="w-full max-w-4xl rounded-3xl shadow-2xl bg-gradient-to-br from-background/80 via-background/60 to-primary/10 border border-foreground/10 backdrop-blur-xl p-6 sm:p-12">
        <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6 section-title">About Us</h1>
        <div className="flex flex-col md:flex-row items-center gap-10 md:gap-16">
          <div className="flex-1">
            <p className="text-lg sm:text-xl text-foreground/80 mb-4">
              <span className="font-semibold text-primary">Welcome to NexMind</span>, your AI life assistant. We are dedicated to providing personalized AI recommendations to enhance every aspect of your life.
            </p>
            <div className="h-1 w-20 bg-gradient-to-r from-primary to-accent rounded-full mb-4" />
            <p className="text-lg sm:text-xl text-foreground/80 mb-4">
              Our mission is to make AI accessible and beneficial for everyone, helping you live smarter and more efficiently. We believe in the power of technology to transform lives for the better.
            </p>
            <div className="h-1 w-20 bg-gradient-to-r from-accent to-secondary rounded-full mb-4" />
            <p className="text-lg sm:text-xl text-foreground/80">
              Join us on this journey to explore the future of AI-driven living. <span className="font-semibold text-accent">Empower your life with NexMind.</span>
            </p>
          </div>
          <div className="flex-1 flex justify-center">
            <div className="relative w-64 h-48 sm:w-80 sm:h-60 rounded-2xl overflow-hidden shadow-xl border border-primary/20 bg-card/60">
              <Image
                src="/images/about.jpg"
                alt="About NexMind"
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