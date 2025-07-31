'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Clock, FileText, Brain, MessageSquare, BarChart3 } from 'lucide-react';

const activities = [
  {
    icon: FileText,
    title: 'Generated Math Quiz',
    description: 'Created 20 MCQs for Algebra topics',
    time: '2 hours ago',
    color: 'text-blue-500'
  },
  {
    icon: Brain,
    title: 'Studied Physics Concepts',
    description: 'Learned about Quantum Mechanics basics',
    time: '4 hours ago',
    color: 'text-purple-500'
  },
  {
    icon: MessageSquare,
    title: 'Completed Mock Interview',
    description: 'Software Engineer role practice session',
    time: '1 day ago',
    color: 'text-green-500'
  },
  {
    icon: BarChart3,
    title: 'Updated Study Goals',
    description: 'Set targets for next week',
    time: '2 days ago',
    color: 'text-orange-500'
  }
];

export default function RecentActivity() {
  return (
    <Card className="border-0 shadow-md">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-xl">Recent Activity</CardTitle>
            <CardDescription>Your learning progress over the past week</CardDescription>
          </div>
          <Button variant="outline" size="sm">View All</Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity, index) => (
            <div key={index} className="flex items-start space-x-4 p-4 rounded-lg hover:bg-muted/50 transition-colors">
              <div className={`h-10 w-10 rounded-full bg-muted flex items-center justify-center ${activity.color}`}>
                <activity.icon className="h-5 w-5" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium">{activity.title}</p>
                <p className="text-sm text-muted-foreground">{activity.description}</p>
                <div className="flex items-center mt-1 text-xs text-muted-foreground">
                  <Clock className="h-3 w-3 mr-1" />
                  {activity.time}
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}