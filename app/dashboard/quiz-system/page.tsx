'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, Play, BookOpen, Clock, Users, Award } from 'lucide-react';
import Link from 'next/link';

const examTypes = [
  { id: 'matric', name: 'Matriculation (9th-10th)', subjects: ['Math', 'Physics', 'Chemistry', 'Biology', 'English', 'Urdu'] },
  { id: 'inter', name: 'Intermediate (11th-12th)', subjects: ['Math', 'Physics', 'Chemistry', 'Biology', 'English', 'Urdu'] },
  { id: 'css', name: 'CSS (Central Superior Services)', subjects: ['General Knowledge', 'Pakistan Affairs', 'Islamic Studies', 'English'] },
  { id: 'ppsc', name: 'PPSC (Punjab Public Service)', subjects: ['General Knowledge', 'Current Affairs', 'Pakistan Studies', 'English'] },
  { id: 'nts', name: 'NTS (National Testing Service)', subjects: ['Analytical Reasoning', 'Quantitative', 'English', 'General Knowledge'] },
  { id: 'mdcat', name: 'MDCAT (Medical Entrance)', subjects: ['Biology', 'Chemistry', 'Physics', 'English'] },
  { id: 'ecat', name: 'ECAT (Engineering Entrance)', subjects: ['Math', 'Physics', 'Chemistry', 'English'] }
];

const difficultyLevels = [
  { id: 'easy', name: 'Easy', color: 'bg-green-500' },
  { id: 'medium', name: 'Medium', color: 'bg-yellow-500' },
  { id: 'hard', name: 'Hard', color: 'bg-red-500' }
];

const recentQuizzes = [
  { title: 'Physics - Mechanics', score: '85%', time: '15 min', date: '2 hours ago' },
  { title: 'Math - Algebra', score: '92%', time: '20 min', date: '1 day ago' },
  { title: 'Chemistry - Organic', score: '78%', time: '18 min', date: '2 days ago' },
  { title: 'Biology - Cell Structure', score: '88%', time: '12 min', date: '3 days ago' }
];

export default function QuizSystemPage() {
  const [selectedExam, setSelectedExam] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState('');
  const [questionCount, setQuestionCount] = useState('20');

  const handleStartQuiz = async () => {
    if (selectedExam && selectedSubject && selectedDifficulty) {
      try {
        const response = await fetch(
            `/api/quiz?subject=${selectedSubject}&difficulty=${selectedDifficulty}&limit=${questionCount}&level=${selectedExam}`,
            {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
              },
            }
        );

        if (!response.ok) {
          throw new Error('Failed to fetch quiz data');
        }

        const data = await response.json();
        console.log(data);
      } catch (error) {
        console.error('Error fetching quiz:', error);
      }
    } else {
      console.warn("Please select exam, subject, and difficulty first.");
    }
  };


  const selectedExamData = examTypes.find(exam => exam.id === selectedExam);

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
              <h1 className="text-3xl font-bold">AI Quiz System</h1>
              <p className="text-muted-foreground">Take adaptive quizzes for various subjects and exams</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Quiz Configuration */}
          <div className="lg:col-span-2">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <BookOpen className="h-6 w-6 text-primary" />
                  <span>Create Custom Quiz</span>
                </CardTitle>
                <CardDescription>
                  Select your exam type, subject, and difficulty to generate a personalized quiz
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Exam Type Selection */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">Exam Type</label>
                  <Select value={selectedExam} onValueChange={setSelectedExam}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select exam type" />
                    </SelectTrigger>
                    <SelectContent>
                      {examTypes.map((exam) => (
                        <SelectItem key={exam.id} value={exam.id}>
                          {exam.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Subject Selection */}
                {selectedExamData && (
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Subject</label>
                    <Select value={selectedSubject} onValueChange={setSelectedSubject}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select subject" />
                      </SelectTrigger>
                      <SelectContent>
                        {selectedExamData.subjects.map((subject) => (
                          <SelectItem key={subject} value={subject.toLowerCase()}>
                            {subject}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}

                {/* Difficulty Level */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">Difficulty Level</label>
                  <div className="flex space-x-2">
                    {difficultyLevels.map((level) => (
                      <Button
                        key={level.id}
                        variant={selectedDifficulty === level.id ? "default" : "outline"}
                        size="sm"
                        onClick={() => setSelectedDifficulty(level.id)}
                        className="flex-1"
                      >
                        <div className={`w-2 h-2 rounded-full ${level.color} mr-2`}></div>
                        {level.name}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Question Count */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">Number of Questions</label>
                  <Select value={questionCount} onValueChange={setQuestionCount}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="10">10 Questions</SelectItem>
                      <SelectItem value="20">20 Questions</SelectItem>
                      <SelectItem value="30">30 Questions</SelectItem>
                      <SelectItem value="50">50 Questions</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Start Quiz Button */}
                <Button 
                  className="w-full" 
                  size="lg" 
                  onClick={handleStartQuiz}
                  disabled={!selectedExam || !selectedSubject || !selectedDifficulty}
                >
                  <Play className="mr-2 h-5 w-5" />
                  Start Quiz
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Stats */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg">Your Quiz Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Award className="h-4 w-4 text-primary" />
                    <span className="text-sm">Average Score</span>
                  </div>
                  <span className="font-bold">86%</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4 text-primary" />
                    <span className="text-sm">Avg. Time</span>
                  </div>
                  <span className="font-bold">16 min</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Users className="h-4 w-4 text-primary" />
                    <span className="text-sm">Quizzes Taken</span>
                  </div>
                  <span className="font-bold">47</span>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Weekly Goal</span>
                    <span>12/15</span>
                  </div>
                  <Progress value={80} className="h-2" />
                </div>
              </CardContent>
            </Card>

            {/* Recent Quizzes */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg">Recent Quizzes</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {recentQuizzes.map((quiz, index) => (
                  <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                    <div className="space-y-1">
                      <p className="text-sm font-medium">{quiz.title}</p>
                      <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                        <span>{quiz.time}</span>
                        <span>•</span>
                        <span>{quiz.date}</span>
                      </div>
                    </div>
                    <Badge variant={parseInt(quiz.score) >= 80 ? "default" : "secondary"}>
                      {quiz.score}
                    </Badge>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}