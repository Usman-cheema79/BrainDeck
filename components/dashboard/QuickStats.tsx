'use client';

import { Card, CardContent } from '@/components/ui/card';
import { TrendingUp, Clock, Target, Award } from 'lucide-react';

const stats = [
  {
    icon: TrendingUp,
    label: 'Weekly Progress',
    value: '78%',
    change: '+12%',
    color: 'text-green-500'
  },
  {
    icon: Clock,
    label: 'Study Time Today',
    value: '2.5h',
    change: '+30min',
    color: 'text-blue-500'
  },
  {
    icon: Target,
    label: 'Goals Completed',
    value: '4/6',
    change: '2 left',
    color: 'text-orange-500'
  },
  {
    icon: Award,
    label: 'Current Streak',
    value: '12 days',
    change: 'Personal best!',
    color: 'text-purple-500'
  }
];

export default function QuickStats() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((stat, index) => (
        <Card key={index} className="border-0 shadow-md">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
                <p className="text-2xl font-bold">{stat.value}</p>
                <p className={`text-sm ${stat.color}`}>{stat.change}</p>
              </div>
              <div className={`h-12 w-12 rounded-full bg-muted flex items-center justify-center ${stat.color}`}>
                <stat.icon className="h-6 w-6" />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}