'use client';

import { Button } from '@/components/ui/button';
import { ArrowRight, Play, Star, Users, BookOpen, Trophy } from 'lucide-react';
import Link from 'next/link';

export default function Hero() {
  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 gradient-bg opacity-10"></div>
      
      {/* Floating Elements */}
      <div className="absolute top-20 left-10 animate-float">
        <div className="glass-effect p-4 rounded-lg">
          <BookOpen className="h-8 w-8 text-primary" />
        </div>
      </div>
      <div className="absolute top-32 right-20 animate-float" style={{animationDelay: '2s'}}>
        <div className="glass-effect p-4 rounded-lg">
          <Trophy className="h-8 w-8 text-primary" />
        </div>
      </div>
      <div className="absolute bottom-32 left-20 animate-float" style={{animationDelay: '4s'}}>
        <div className="glass-effect p-4 rounded-lg">
          <Star className="h-8 w-8 text-primary" />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
        <div className="space-y-8">
          <div className="inline-flex items-center px-4 py-2 bg-primary/10 rounded-full text-primary text-sm font-medium mb-4">
            <Star className="h-4 w-4 mr-2" />
            AI-Powered Learning Platform
          </div>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight">
            Master Your Studies with{' '}
            <span className="text-gradient">AI Intelligence</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
            From exam preparation to interview practice - BrainDeck is your comprehensive companion for academic and career success.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
            <Link href="/dashboard">
              <Button size="lg" className="px-8 py-4 text-lg">
                Start Learning Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Button variant="outline" size="lg" className="px-8 py-4 text-lg">
              <Play className="mr-2 h-5 w-5" />
              Watch Demo
            </Button>
          </div>
          
          <div className="flex items-center justify-center space-x-8 pt-12">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">50K+</div>
              <div className="text-sm text-muted-foreground">Students</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">1M+</div>
              <div className="text-sm text-muted-foreground">Questions Generated</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">95%</div>
              <div className="text-sm text-muted-foreground">Success Rate</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}