'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Users, BookOpen, Award, Clock } from 'lucide-react';

const stats = [
  {
    icon: Users,
    value: '50,000+',
    label: 'Active Students',
    description: 'Students using BrainDeck daily'
  },
  {
    icon: BookOpen,
    value: '1M+',
    label: 'Questions Generated',
    description: 'AI-powered questions created'
  },
  {
    icon: Award,
    value: '95%',
    label: 'Success Rate',
    description: 'Students improving their scores'
  },
  {
    icon: Clock,
    value: '24/7',
    label: 'Available',
    description: 'Round-the-clock learning support'
  }
];

export default function Stats() {
  return (
    <section className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Trusted by Students <span className="text-gradient">Worldwide</span>
          </h2>
          <p className="text-xl text-muted-foreground">
            Join thousands of successful learners who have transformed their academic journey with BrainDeck.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <Card key={index} className="text-center border-0 shadow-lg card-hover">
              <CardContent className="pt-8">
                <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary mb-4">
                  <stat.icon className="h-8 w-8" />
                </div>
                <div className="text-4xl font-bold text-primary mb-2">{stat.value}</div>
                <div className="text-lg font-semibold mb-2">{stat.label}</div>
                <div className="text-sm text-muted-foreground">{stat.description}</div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}