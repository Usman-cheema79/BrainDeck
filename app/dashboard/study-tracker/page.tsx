'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, BarChart3, TrendingUp, Calendar, Target, BookOpen, Clock } from 'lucide-react';
import Link from 'next/link';

const subjects = [
  { id: 'math', name: 'Mathematics', progress: 75, color: 'bg-blue-500' },
  { id: 'physics', name: 'Physics', progress: 60, color: 'bg-purple-500' },
  { id: 'chemistry', name: 'Chemistry', progress: 85, color: 'bg-green-500' },
  { id: 'biology', name: 'Biology', progress: 45, color: 'bg-red-500' },
  { id: 'english', name: 'English', progress: 90, color: 'bg-orange-500' },
  { id: 'urdu', name: 'Urdu', progress: 70, color: 'bg-cyan-500' }
];

const weeklyData = [
  { day: 'Mon', hours: 3.5 },
  { day: 'Tue', hours: 2.8 },
  { day: 'Wed', hours: 4.2 },
  { day: 'Thu', hours: 3.1 },
  { day: 'Fri', hours: 2.5 },
  { day: 'Sat', hours: 5.0 },
  { day: 'Sun', hours: 4.8 }
];

const recentSessions = [
  { subject: 'Mathematics', topic: 'Calculus', duration: '45 min', score: '92%', date: '2 hours ago' },
  { subject: 'Physics', topic: 'Quantum Mechanics', duration: '30 min', score: '78%', date: '1 day ago' },
  { subject: 'Chemistry', topic: 'Organic Chemistry', duration: '60 min', score: '85%', date: '2 days ago' },
  { subject: 'Biology', topic: 'Cell Biology', duration: '35 min', score: '88%', date: '3 days ago' }
];

export default function StudyTrackerPage() {
  const [selectedPeriod, setSelectedPeriod] = useState('week');
  const [totalHours, setTotalHours] = useState(0);
  const [averageScore, setAverageScore] = useState(0);

  useEffect(() => {
    const total = weeklyData.reduce((sum, day) => sum + day.hours, 0);
    setTotalHours(total);
    setAverageScore(85.75); // Mock average
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <Link href="/dashboard">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold">Study Tracker</h1>
              <p className="text-muted-foreground">Track your progress with detailed analytics</p>
            </div>
          </div>
          <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="week">This Week</SelectItem>
              <SelectItem value="month">This Month</SelectItem>
              <SelectItem value="year">This Year</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="border-0 shadow-md">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Study Time</p>
                  <p className="text-2xl font-bold">{totalHours.toFixed(1)}h</p>
                  <p className="text-sm text-green-500">+2.5h from last week</p>
                </div>
                <Clock className="h-8 w-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-md">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Average Score</p>
                  <p className="text-2xl font-bold">{averageScore}%</p>
                  <p className="text-sm text-green-500">+3.2% improvement</p>
                </div>
                <TrendingUp className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-md">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Subjects Studied</p>
                  <p className="text-2xl font-bold">{subjects.length}</p>
                  <p className="text-sm text-blue-500">Active subjects</p>
                </div>
                <BookOpen className="h-8 w-8 text-purple-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-md">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Goals Completed</p>
                  <p className="text-2xl font-bold">12/15</p>
                  <p className="text-sm text-orange-500">80% completion</p>
                </div>
                <Target className="h-8 w-8 text-orange-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Subject Progress */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <BarChart3 className="h-6 w-6 text-primary" />
                <span>Subject Progress</span>
              </CardTitle>
              <CardDescription>Your progress across different subjects</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {subjects.map((subject) => (
                <div key={subject.id} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className={`w-3 h-3 rounded-full ${subject.color}`}></div>
                      <span className="font-medium">{subject.name}</span>
                    </div>
                    <span className="text-sm font-semibold">{subject.progress}%</span>
                  </div>
                  <Progress value={subject.progress} className="h-2" />
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Weekly Study Hours */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Calendar className="h-6 w-6 text-primary" />
                <span>Weekly Study Hours</span>
              </CardTitle>
              <CardDescription>Your daily study time this week</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {weeklyData.map((day, index) => (
                  <div key={index} className="flex items-center space-x-4">
                    <div className="w-12 text-sm font-medium">{day.day}</div>
                    <div className="flex-1">
                      <div className="bg-muted rounded-full h-4 relative overflow-hidden">
                        <div 
                          className="bg-primary h-full rounded-full transition-all duration-500"
                          style={{ width: `${(day.hours / 5) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                    <div className="w-12 text-sm font-semibold text-right">{day.hours}h</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Study Sessions */}
        <Card className="border-0 shadow-lg mt-8">
          <CardHeader>
            <CardTitle>Recent Study Sessions</CardTitle>
            <CardDescription>Your latest learning activities</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentSessions.map((session, index) => (
                <div key={index} className="flex items-center justify-between p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <BookOpen className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">{session.subject}</p>
                      <p className="text-sm text-muted-foreground">{session.topic}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4 text-sm">
                    <span className="text-muted-foreground">{session.duration}</span>
                    <Badge variant={parseInt(session.score) >= 80 ? "default" : "secondary"}>
                      {session.score}
                    </Badge>
                    <span className="text-muted-foreground">{session.date}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}