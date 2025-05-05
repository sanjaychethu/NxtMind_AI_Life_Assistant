// app/page.tsx (Home Page in Next.js 13+ App Router)

'use client'

import Image from 'next/image';
import Link from 'next/link';
import "./globals.css";
import * as LucideIcons from 'lucide-react';
import Chatbot from '@/components/Chatbot';

const {
  HeartPulse,
  Dumbbell,
  Brain,
  Apple,
  Wallet,
  GraduationCap,
  Plane,
  Clapperboard,
  Users,
  Moon,
  Star,
  Briefcase
} = LucideIcons;

const modules = [
  {
    id: '1',
    title: 'Health AI',
    description: 'Personalized health tracking and medical insights',
    icon: <HeartPulse className="w-8 h-8 sm:w-10 sm:h-10 text-primary" />,
    path: '/health'
  },
  {
    id: '2',
    title: 'Fitness Coach',
    description: 'AI-powered workout plans and fitness guidance',
    icon: <Dumbbell className="w-8 h-8 sm:w-10 sm:h-10 text-primary" />,
    path: '/fitness'
  },
  {
    id: '3',
    title: 'Mind Wellness',
    description: 'Mental health and meditation recommendations',
    icon: <Brain className="w-8 h-8 sm:w-10 sm:h-10 text-primary" />,
    path: '/mind'
  },
  {
    id: '4',
    title: 'Nutrition Guide',
    description: 'Smart meal planning and dietary suggestions',
    icon: <Apple className="w-8 h-8 sm:w-10 sm:h-10 text-primary" />,
    path: '/nutrition'
  },
  {
    id: '5',
    title: 'Smart Finance',
    description: 'AI-driven financial planning and investments',
    icon: <Wallet className="w-8 h-8 sm:w-10 sm:h-10 text-primary" />,
    path: '/finance'
  },
  {
    id: '6',
    title: 'Learn AI',
    description: 'Personalized learning paths and resources',
    icon: <GraduationCap className="w-8 h-8 sm:w-10 sm:h-10 text-primary" />,
    path: '/learn'
  },
  {
    id: '7',
    title: 'Travel Planner',
    description: 'Intelligent travel recommendations and itineraries',
    icon: <Plane className="w-8 h-8 sm:w-10 sm:h-10 text-primary" />,
    path: '/travel'
  },
  {
    id: '8',
    title: 'Entertainment AI',
    description: 'Curated movies, shows, and content suggestions',
    icon: <Clapperboard className="w-8 h-8 sm:w-10 sm:h-10 text-primary" />,
    path: '/entertainment'
  },
  {
    id: '9',
    title: 'Social Connect',
    description: 'AI-powered social activity recommendations',
    icon: <Users className="w-8 h-8 sm:w-10 sm:h-10 text-primary" />,
    path: '/social'
  },
  {
    id: '10',
    title: 'Sleep Better',
    description: 'Smart sleep analysis and improvement tips',
    icon: <Moon className="w-8 h-8 sm:w-10 sm:h-10 text-primary" />,
    path: '/sleep'
  },
  {
    id: '11',
    title: 'Habit Builder',
    description: 'AI coach for building positive habits',
    icon: <Star className="w-8 h-8 sm:w-10 sm:h-10 text-primary" />,
    path: '/habits'
  },
  {
    id: '12',
    title: 'Career Growth',
    description: 'Professional development and career guidance',
    icon: <Briefcase className="w-8 h-8 sm:w-10 sm:h-10 text-primary" />,
    path: '/career'
  }
];

const mongodbUri = process.env.MONGODB_URI;
const jwtSecret = process.env.JWT_SECRET;
const dbName = process.env.MONGODB_DB;

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-[90vh] sm:min-h-screen w-full flex items-center overflow-hidden px-4 sm:px-6 lg:px-8">
        {/* Background Effects */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-background">
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 via-background to-background" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/10 via-background to-transparent" />
          </div>
          {/* Animated Grid Pattern */}
          <div className="absolute inset-0 bg-grid-white/5" />
          {/* Floating Elements */}
          <div className="absolute top-20 left-[5%] sm:left-[10%] w-48 sm:w-72 h-48 sm:h-72 bg-primary/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 right-[5%] sm:right-[10%] w-64 sm:w-96 h-64 sm:h-96 bg-secondary/10 rounded-full blur-3xl animate-pulse delay-1000" />
        </div>

        <div className="container relative z-20 mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-center">
            {/* Content */}
            <div className="space-y-6 sm:space-y-8">
              <div className="space-y-3 sm:space-y-4">
                <h4 className="text-primary font-medium tracking-wider animate-fade-in text-sm sm:text-base">
                  WELCOME TO THE FUTURE
                </h4>
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-tight animate-slide-up">
                  Meet Your AI Life
                  <span className="block mt-1 sm:mt-2">
                    Assistant <span className="gradient-text">NexMind</span>
                  </span>
                </h1>
                <p className="text-base sm:text-lg md:text-xl text-gray-300 max-w-xl animate-fade-in delay-200">
                  Experience the power of personalized AI recommendations across every aspect of your life.
                  Your intelligent companion for smarter living.
                </p>
              </div>

              <div className="flex flex-wrap gap-3 sm:gap-4 animate-fade-in delay-300">
                <Link 
                  href="/register"
                  className="btn btn-primary text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 rounded-xl hover:scale-105 transition-transform relative overflow-hidden group w-full sm:w-auto text-center"
                >
                  <span className="relative z-10">Get Started Free</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-primary via-accent to-primary bg-[length:200%] animate-gradient opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
                <Link 
                  href="/about"
                  className="btn btn-secondary text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 rounded-xl hover:scale-105 transition-transform flex items-center gap-2 w-full sm:w-auto justify-center"
                >
                  Learn More
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </Link>
              </div>

              {/* Feature Pills */}
              <div className="flex flex-wrap gap-2 sm:gap-3 animate-fade-in delay-400">
                {['Smart Recommendations', 'Personal AI', 'Life Optimization', '24/7 Assistant'].map((feature, index) => (
                  <span 
                    key={feature}
                    className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-background/50 border border-primary/20 text-xs sm:text-sm text-primary/80"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    {feature}
                  </span>
                ))}
              </div>
            </div>

            {/* Hero Image/Illustration */}
            <div className="relative h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] animate-fade-in delay-500 mt-8 lg:mt-0">
              <div className="relative z-10 h-full w-full rounded-2xl overflow-hidden shadow-2xl">
                <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent" />
                <Image
                  src="/images/ai.jpg"
                  alt="NexMind AI Assistant"
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
              {/* Decorative Elements */}
              <div className="absolute -top-5 sm:-top-10 -right-5 sm:-right-10 w-20 sm:w-40 h-20 sm:h-40 bg-accent/20 rounded-full blur-2xl" />
              <div className="absolute -bottom-5 sm:-bottom-10 -left-5 sm:-left-10 w-20 sm:w-40 h-20 sm:h-40 bg-primary/20 rounded-full blur-2xl" />
              
              {/* Stats */}
              <div className="absolute -right-2 sm:-right-4 top-1/4 transform translate-x-1/2 bg-card/80 backdrop-blur-lg rounded-2xl p-2 sm:p-4 shadow-lg border border-foreground/10">
                <div className="text-xl sm:text-2xl font-bold text-primary">50K+</div>
                <div className="text-xs sm:text-sm text-foreground/80">Active Users</div>
              </div>
              <div className="absolute -left-2 sm:-left-4 bottom-1/4 transform -translate-x-1/2 bg-card/80 backdrop-blur-lg rounded-2xl p-2 sm:p-4 shadow-lg border border-foreground/10">
                <div className="text-xl sm:text-2xl font-bold text-accent">98%</div>
                <div className="text-xs sm:text-sm text-foreground/80">Satisfaction</div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-4 sm:bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <svg className="w-5 h-5 sm:w-6 sm:h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </section>

      {/* Modules Section */}
      <section className="py-16 sm:py-24 bg-background relative overflow-hidden px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-background to-background" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/10 via-background to-background" />
        
        <div className="container relative mx-auto">
          <div className="text-center mb-8 sm:mb-16">
            <h4 className="text-primary mb-2 font-medium tracking-wider text-sm sm:text-base">AI-POWERED SOLUTIONS</h4>
            <h2 className="text-3xl sm:text-4xl font-bold mb-3 sm:mb-4 section-title">
              Discover Our Smart Features
            </h2>
            <p className="text-foreground/80 max-w-2xl mx-auto text-sm sm:text-base">
              Explore our comprehensive suite of AI-powered tools designed to enhance every aspect of your life
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {modules.map((module) => (
              <Link 
                key={module.id}
                href={module.path}
                className="module-card group p-4 sm:p-6 hover:scale-105 transition-transform duration-300"
              >
                <div className="module-icon mb-3 sm:mb-4 flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors duration-300">
                  {module.icon}
                </div>
                <h3 className="module-title text-lg sm:text-xl font-semibold mb-2">{module.title}</h3>
                <p className="module-description text-sm sm:text-base text-foreground/80">{module.description}</p>
                <div className="module-overlay" />
                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* AI Features Section */}
      <section className="py-16 sm:py-24 bg-gradient-to-b from-background via-primary/5 to-background relative px-4 sm:px-6 lg:px-8">
        <div className="container relative z-10 mx-auto">
          <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl bg-gradient-to-br from-background/80 via-background/60 to-primary/10 backdrop-blur-xl">
            <div className="absolute inset-0 bg-grid-white/5" />
            <div className="relative p-6 sm:p-8 md:p-12 lg:p-16 flex flex-col md:flex-row items-center gap-8 sm:gap-12">
              <div className="flex-1 text-left">
                <h4 className="text-primary mb-2 font-medium tracking-wider text-sm sm:text-base">ADVANCED AI</h4>
                <h2 className="text-3xl sm:text-4xl font-bold mb-4 sm:mb-6 section-title">
                  Personalized Intelligence
                </h2>
                <p className="text-base sm:text-lg text-foreground/80 mb-6 sm:mb-8 leading-relaxed">
                  Our AI analyzes your preferences, habits, and goals to provide tailored 
                  recommendations that evolve with you. Experience the future of personal optimization 
                  across health, lifestyle, learning, and more.
                </p>
                <Link 
                  href="/how-it-works"
                  className="btn btn-primary text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 rounded-full inline-flex items-center gap-2 hover:scale-105 transition-transform w-full sm:w-auto justify-center"
                >
                  Learn How It Works
                  <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Link>
              </div>
              <div className="flex-1 relative w-full md:w-auto">
                <div className="aspect-square relative rounded-2xl overflow-hidden shadow-2xl">
                  <Image
                    src="/images/ai-features.jpg"
                    alt="AI Features"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/20 to-transparent" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Chatbot Component */}
      <Chatbot />
    </>
  );
}
