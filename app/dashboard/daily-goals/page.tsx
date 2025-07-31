'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Checkbox } from '@/components/ui/checkbox';
import { ArrowLeft, Target, Plus, Calendar, Clock, CheckCircle, Circle, Trash2 } from 'lucide-react';
import Link from 'next/link';

const sampleGoals = [
  {
    id: 1,
    title: 'Complete Math Chapter 5',
    description: 'Finish all exercises in Calculus chapter',
    category: 'Study',
    priority: 'high',
    deadline: '2024-02-20',
    completed: false,
    progress: 75,
    createdAt: '2024-02-15'
  },
  {
    id: 2,
    title: 'Practice Physics MCQs',
    description: 'Solve 50 MCQs from mechanics section',
    category: 'Practice',
    priority: 'medium',
    deadline: '2024-02-18',
    completed: true,
    progress: 100,
    createdAt: '2024-02-14'
  },
  {
    id: 3,
    title: 'Review Chemistry Notes',
    description: 'Go through organic chemistry notes and make flashcards',
    category: 'Review',
    priority: 'low',
    deadline: '2024-02-22',
    completed: false,
    progress: 30,
    createdAt: '2024-02-16'
  },
  {
    id: 4,
    title: 'Prepare Interview Questions',
    description: 'Research and prepare answers for common software engineering questions',
    category: 'Career',
    priority: 'high',
    deadline: '2024-02-19',
    completed: false,
    progress: 60,
    createdAt: '2024-02-15'
  }
];

export default function DailyGoalsPage() {
  const [goals, setGoals] = useState(sampleGoals);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newGoal, setNewGoal] = useState({
    title: '',
    description: '',
    category: 'Study',
    priority: 'medium',
    deadline: ''
  });

  const handleCreateGoal = () => {
    if (newGoal.title && newGoal.deadline) {
      const goal = {
        id: goals.length + 1,
        ...newGoal,
        completed: false,
        progress: 0,
        createdAt: new Date().toISOString().split('T')[0]
      };
      setGoals([...goals, goal]);
      setNewGoal({
        title: '',
        description: '',
        category: 'Study',
        priority: 'medium',
        deadline: ''
      });
      setShowCreateForm(false);
    }
  };

  const toggleGoalCompletion = (id: number) => {
    setGoals(goals.map(goal => 
      goal.id === id 
        ? { ...goal, completed: !goal.completed, progress: !goal.completed ? 100 : 0 }
        : goal
    ));
  };

  const updateGoalProgress = (id: number, progress: number) => {
    setGoals(goals.map(goal => 
      goal.id === id 
        ? { ...goal, progress, completed: progress === 100 }
        : goal
    ));
  };

  const deleteGoal = (id: number) => {
    setGoals(goals.filter(goal => goal.id !== id));
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'border-red-200 bg-red-50 text-red-700';
      case 'medium': return 'border-yellow-200 bg-yellow-50 text-yellow-700';
      case 'low': return 'border-green-200 bg-green-50 text-green-700';
      default: return 'border-gray-200 bg-gray-50 text-gray-700';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Study': return 'bg-blue-500';
      case 'Practice': return 'bg-purple-500';
      case 'Review': return 'bg-green-500';
      case 'Career': return 'bg-orange-500';
      default: return 'bg-gray-500';
    }
  };

  const completedGoals = goals.filter(goal => goal.completed).length;
  const totalGoals = goals.length;
  const completionRate = totalGoals > 0 ? (completedGoals / totalGoals) * 100 : 0;

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
              <h1 className="text-3xl font-bold">Daily Goals</h1>
              <p className="text-muted-foreground">Set and track your academic goals</p>
            </div>
          </div>
          <Button onClick={() => setShowCreateForm(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Add Goal
          </Button>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="border-0 shadow-md">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Goals</p>
                  <p className="text-2xl font-bold">{totalGoals}</p>
                </div>
                <Target className="h-8 w-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-md">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Completed</p>
                  <p className="text-2xl font-bold">{completedGoals}</p>
                </div>
                <CheckCircle className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-md">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">In Progress</p>
                  <p className="text-2xl font-bold">{totalGoals - completedGoals}</p>
                </div>
                <Circle className="h-8 w-8 text-orange-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-md">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Success Rate</p>
                  <p className="text-2xl font-bold">{Math.round(completionRate)}%</p>
                </div>
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-primary font-bold text-sm">{Math.round(completionRate)}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Create Goal Form */}
        {showCreateForm && (
          <Card className="border-0 shadow-lg mb-8">
            <CardHeader>
              <CardTitle>Create New Goal</CardTitle>
              <CardDescription>Set a new academic or career goal</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Goal Title</label>
                  <Input
                    placeholder="e.g., Complete Math Chapter 5"
                    value={newGoal.title}
                    onChange={(e) => setNewGoal({...newGoal, title: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Deadline</label>
                  <Input
                    type="date"
                    value={newGoal.deadline}
                    onChange={(e) => setNewGoal({...newGoal, deadline: e.target.value})}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Description</label>
                <Textarea
                  placeholder="Describe your goal in detail..."
                  value={newGoal.description}
                  onChange={(e) => setNewGoal({...newGoal, description: e.target.value})}
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Category</label>
                  <Select value={newGoal.category} onValueChange={(value) => setNewGoal({...newGoal, category: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Study">Study</SelectItem>
                      <SelectItem value="Practice">Practice</SelectItem>
                      <SelectItem value="Review">Review</SelectItem>
                      <SelectItem value="Career">Career</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Priority</label>
                  <Select value={newGoal.priority} onValueChange={(value) => setNewGoal({...newGoal, priority: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="low">Low</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex space-x-2">
                <Button onClick={handleCreateGoal}>Create Goal</Button>
                <Button variant="outline" onClick={() => setShowCreateForm(false)}>Cancel</Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Goals List */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Your Goals</h2>
          
          {goals.length === 0 ? (
            <Card className="border-0 shadow-md">
              <CardContent className="p-12 text-center">
                <Target className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No goals yet</h3>
                <p className="text-muted-foreground mb-4">Create your first goal to start tracking your progress</p>
                <Button onClick={() => setShowCreateForm(true)}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Your First Goal
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {goals.map((goal) => (
                <Card key={goal.id} className={`border-0 shadow-md ${goal.completed ? 'opacity-75' : ''}`}>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-4 flex-1">
                        <Checkbox
                          checked={goal.completed}
                          onCheckedChange={() => toggleGoalCompletion(goal.id)}
                          className="mt-1"
                        />
                        <div className="flex-1 space-y-2">
                          <div className="flex items-center space-x-2">
                            <h3 className={`font-semibold ${goal.completed ? 'line-through text-muted-foreground' : ''}`}>
                              {goal.title}
                            </h3>
                            <Badge className={getCategoryColor(goal.category) + ' text-white'}>
                              {goal.category}
                            </Badge>
                            <Badge variant="outline" className={getPriorityColor(goal.priority)}>
                              {goal.priority}
                            </Badge>
                          </div>
                          
                          {goal.description && (
                            <p className="text-sm text-muted-foreground">{goal.description}</p>
                          )}
                          
                          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                            <div className="flex items-center space-x-1">
                              <Calendar className="h-4 w-4" />
                              <span>Due: {new Date(goal.deadline).toLocaleDateString()}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Clock className="h-4 w-4" />
                              <span>Created: {new Date(goal.createdAt).toLocaleDateString()}</span>
                            </div>
                          </div>

                          {!goal.completed && (
                            <div className="space-y-2">
                              <div className="flex items-center justify-between text-sm">
                                <span>Progress</span>
                                <span>{goal.progress}%</span>
                              </div>
                              <Progress value={goal.progress} className="h-2" />
                              <div className="flex space-x-2">
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => updateGoalProgress(goal.id, Math.min(goal.progress + 25, 100))}
                                >
                                  +25%
                                </Button>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => updateGoalProgress(goal.id, Math.min(goal.progress + 50, 100))}
                                >
                                  +50%
                                </Button>
                                <Button
                                  size="sm"
                                  onClick={() => updateGoalProgress(goal.id, 100)}
                                >
                                  Complete
                                </Button>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                      
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => deleteGoal(goal.id)}
                        className="text-red-500 hover:text-red-700 hover:bg-red-50"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}