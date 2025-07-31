'use client';

import { useState, useEffect } from 'react';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import ModuleCard from '@/components/dashboard/ModuleCard';
import QuickStats from '@/components/dashboard/QuickStats';
import RecentActivity from '@/components/dashboard/RecentActivity';
import { 
  FileText, 
  Brain, 
  MessageSquare, 
  BarChart3, 
  Layers, 
  Newspaper,
  Target,
  BookOpen,
  CheckSquare,
  Clock
} from 'lucide-react';

const modules = [
  {
    id: 'paper-generator',
    title: 'Smart Paper Generator',
    description: 'Create MCQs, short and long questions from selected topics',
    icon: FileText,
    color: 'bg-blue-500',
    href: '/dashboard/paper-generator'
  },
  {
    id: 'concept-explainer',
    title: 'Concept Explainer',
    description: 'Get AI-powered explanations of any topic',
    icon: Brain,
    color: 'bg-purple-500',
    href: '/dashboard/concept-explainer'
  },
  {
    id: 'interview-practice',
    title: 'Interview Practice',
    description: 'Mock interviews with intelligent feedback',
    icon: MessageSquare,
    color: 'bg-green-500',
    href: '/dashboard/interview-practice'
  },
  {
    id: 'quiz-system',
    title: 'AI Quiz System',
    description: 'Take adaptive quizzes for various subjects and exams',
    icon: CheckSquare,
    color: 'bg-orange-500',
    href: '/dashboard/quiz-system'
  },
  {
    id: 'study-tracker',
    title: 'Study Tracker',
    description: 'Track your progress with detailed analytics',
    icon: BarChart3,
    color: 'bg-red-500',
    href: '/dashboard/study-tracker'
  },
  {
    id: 'flashcards',
    title: 'Smart Flashcards',
    description: 'AI-generated flashcards for better retention',
    icon: Layers,
    color: 'bg-cyan-500',
    href: '/dashboard/flashcards'
  },
  {
    id: 'campus-buzz',
    title: 'Campus Buzz',
    description: 'Latest updates on scholarships and opportunities',
    icon: Newspaper,
    color: 'bg-pink-500',
    href: '/dashboard/campus-buzz'
  },
  {
    id: 'daily-goals',
    title: 'Daily Goals',
    description: 'Set and track your academic goals',
    icon: Target,
    color: 'bg-indigo-500',
    href: '/dashboard/daily-goals'
  },
  {
    id: 'notes',
    title: 'Notes & Materials',
    description: 'Organize your study notes by subject',
    icon: BookOpen,
    color: 'bg-teal-500',
    href: '/dashboard/notes'
  }
];

export default function Dashboard() {
  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    };
    
    updateTime();
    const interval = setInterval(updateTime, 1000);
    
    return () => clearInterval(interval);
  }, []);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  };

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground">
                {getGreeting()}, Student! 👋
              </h1>
              <p className="text-muted-foreground mt-1">
                Ready to continue your learning journey?
              </p>
            </div>
            <div className="hidden sm:flex items-center space-x-2 text-muted-foreground">
              <Clock className="h-4 w-4" />
              <span>{currentTime}</span>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <QuickStats />

        {/* Modules Grid */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-6">Learning Modules</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {modules.map((module) => (
              <ModuleCard key={module.id} module={module} />
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <RecentActivity />
      </main>
    </div>
  );
}