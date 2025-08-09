'use client';

import { Card, CardContent } from '@/components/ui/card';
import { TrendingUp, Clock, Target, Award } from 'lucide-react';
import { useMemo } from 'react';

interface StudyTimeRecord {
  date: string;
  duration: number; // minutes
}

function formatDuration(mins: number) {
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  return h > 0 ? `${h}h${m > 0 ? ' ' + m + 'min' : ''}` : `${m}min`;
}

function calculateStats(records: StudyTimeRecord[]) {
  const todayStr = new Date().toISOString().slice(0, 10);
  const last10Days = [...Array(10)].map((_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (9 - i));
    return d.toISOString().slice(0, 10);
  });

  const dailyDurations = last10Days.map(date => {
    const rec = records.find(r => r.date === date);
    return rec ? rec.duration : 0;
  });

  const todayDuration = dailyDurations[9];
  const previousDurations = dailyDurations.slice(0, 9);

  const avgPrevious = previousDurations.reduce((a, b) => a + b, 0) / 9 || 0;

  const changePercent = avgPrevious === 0
      ? (todayDuration === 0 ? 0 : 100)
      : ((todayDuration - avgPrevious) / avgPrevious) * 100;

  const targetMins = 180;
  const weeklyProgressPercent = (avgPrevious / targetMins) * 100;

  return {
    weeklyProgress: `${weeklyProgressPercent.toFixed(0)}%`,
    studyTimeToday: formatDuration(todayDuration),
    changePercent: (changePercent >= 0 ? '+' : '') + changePercent.toFixed(0) + '%',
  };
}

export default function QuickStats({ records }: { records: StudyTimeRecord[] }) {
  const statsValues = useMemo(() => calculateStats(records), [records]);

  const stats = [
    {
      icon: TrendingUp,
      label: 'Weekly Progress',
      value: statsValues.weeklyProgress,
      change: statsValues.changePercent,
      color: 'text-green-500'
    },
    {
      icon: Clock,
      label: 'Study Time Today',
      value: statsValues.studyTimeToday,
      change: statsValues.changePercent,
      color: 'text-blue-500'
    },
    // ... add Goals Completed and Current Streak with your logic or props
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
