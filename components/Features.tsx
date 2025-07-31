'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  FileText, 
  Brain, 
  MessageSquare, 
  BarChart3, 
  Layers, 
  Newspaper,
  Target,
  Mic,
  BookOpen,
  CheckSquare
} from 'lucide-react';

const features = [
  {
    icon: FileText,
    title: 'Smart Paper Generator',
    description: 'Create MCQs, short and long questions from selected topics with AI precision.',
    color: 'text-blue-500'
  },
  {
    icon: Brain,
    title: 'Concept Explainer',
    description: 'Get simplified explanations of any topic using advanced AI models.',
    color: 'text-purple-500'
  },
  {
    icon: MessageSquare,
    title: 'Interview Practice',
    description: 'Role-based mock interviews with intelligent feedback and scoring.',
    color: 'text-green-500'
  },
  {
    icon: BarChart3,
    title: 'Study Tracker',
    description: 'Track your progress across subjects with detailed analytics and insights.',
    color: 'text-orange-500'
  },
  {
    icon: Layers,
    title: 'Smart Flashcards',
    description: 'Automatically generate and review revision cards for better retention.',
    color: 'text-red-500'
  },
  {
    icon: Newspaper,
    title: 'Campus Buzz',
    description: 'Stay updated with scholarships, internships, exams, and opportunities.',
    color: 'text-cyan-500'
  },
  {
    icon: Target,
    title: 'Daily Goal Setter',
    description: 'Create and track your academic goals with smart reminders.',
    color: 'text-pink-500'
  },
  {
    icon: Mic,
    title: 'Voice Input',
    description: 'Use your voice to input answers and notes with speech recognition.',
    color: 'text-indigo-500'
  },
  {
    icon: BookOpen,
    title: 'Notes & Materials',
    description: 'Create, edit, and organize personal study notes by subject.',
    color: 'text-teal-500'
  },
  {
    icon: CheckSquare,
    title: 'MSQ Generator',
    description: 'Generate multiple-select questions for comprehensive practice.',
    color: 'text-amber-500'
  }
];

export default function Features() {
  return (
    <section id="features" className="py-24 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Powerful Features for <span className="text-gradient">Every Learner</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            From AI-powered content generation to comprehensive progress tracking, 
            BrainDeck provides everything you need for academic success.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="card-hover border-0 shadow-md">
              <CardHeader>
                <div className={`inline-flex h-12 w-12 items-center justify-center rounded-lg bg-muted ${feature.color}`}>
                  <feature.icon className="h-6 w-6" />
                </div>
                <CardTitle className="text-xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}