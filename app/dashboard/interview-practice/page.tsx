'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, MessageSquare, Mic, MicOff, Play, Pause, RotateCcw } from 'lucide-react';
import Link from 'next/link';

const interviewTypes = [
  { id: 'software', name: 'Software Engineer', questions: 15 },
  { id: 'data', name: 'Data Scientist', questions: 12 },
  { id: 'marketing', name: 'Marketing Manager', questions: 10 },
  { id: 'finance', name: 'Financial Analyst', questions: 14 },
  { id: 'hr', name: 'HR Manager', questions: 11 },
  { id: 'sales', name: 'Sales Representative', questions: 13 }
];

const sampleQuestions = {
  software: [
    "Tell me about yourself and your programming background.",
    "What's the difference between let, const, and var in JavaScript?",
    "How do you handle errors in your code?",
    "Describe a challenging project you've worked on.",
    "What are your favorite programming languages and why?"
  ],
  data: [
    "How do you approach a new data science project?",
    "What's the difference between supervised and unsupervised learning?",
    "How do you handle missing data in datasets?",
    "Explain the concept of overfitting in machine learning.",
    "What tools do you use for data visualization?"
  ],
  marketing: [
    "How do you measure the success of a marketing campaign?",
    "What's your experience with digital marketing channels?",
    "How do you identify target audiences?",
    "Describe a successful marketing strategy you've implemented.",
    "How do you stay updated with marketing trends?"
  ]
};

export default function InterviewPracticePage() {
  const [selectedRole, setSelectedRole] = useState('');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [answer, setAnswer] = useState('');
  const [feedback, setFeedback] = useState('');
  const [sessionStarted, setSessionStarted] = useState(false);
  const [sessionComplete, setSessionComplete] = useState(false);
  const [score, setScore] = useState(0);

  const questions = sampleQuestions[selectedRole as keyof typeof sampleQuestions] || [];
  const progress = questions.length > 0 ? ((currentQuestion + 1) / questions.length) * 100 : 0;

  const startSession = () => {
    if (selectedRole) {
      setSessionStarted(true);
      setCurrentQuestion(0);
      setAnswer('');
      setFeedback('');
      setSessionComplete(false);
    }
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      // Generate mock feedback
      const mockFeedback = generateFeedback(answer);
      setFeedback(mockFeedback);
      
      setTimeout(() => {
        setCurrentQuestion(currentQuestion + 1);
        setAnswer('');
        setFeedback('');
      }, 3000);
    } else {
      completeSession();
    }
  };

  const completeSession = () => {
    const finalScore = Math.floor(Math.random() * 30) + 70; // Mock score 70-100
    setScore(finalScore);
    setSessionComplete(true);
  };

  const generateFeedback = (userAnswer: string) => {
    const feedbacks = [
      "Great answer! You demonstrated clear understanding and provided specific examples.",
      "Good response. Consider adding more concrete examples to strengthen your answer.",
      "Nice explanation. Try to be more concise while maintaining the key points.",
      "Excellent! Your answer shows strong analytical thinking and problem-solving skills.",
      "Well structured answer. You could improve by mentioning relevant technologies or tools."
    ];
    return feedbacks[Math.floor(Math.random() * feedbacks.length)];
  };

  const toggleRecording = () => {
    if ('webkitSpeechRecognition' in window) {
      if (!isRecording) {
        const recognition = new (window as any).webkitSpeechRecognition();
        recognition.continuous = true;
        recognition.interimResults = true;
        recognition.lang = 'en-US';

        recognition.onstart = () => setIsRecording(true);
        recognition.onresult = (event: any) => {
          let transcript = '';
          for (let i = event.resultIndex; i < event.results.length; i++) {
            transcript += event.results[i][0].transcript;
          }
          setAnswer(transcript);
        };
        recognition.onerror = () => setIsRecording(false);
        recognition.onend = () => setIsRecording(false);

        recognition.start();
      } else {
        setIsRecording(false);
      }
    }
  };

  const resetSession = () => {
    setSessionStarted(false);
    setSessionComplete(false);
    setCurrentQuestion(0);
    setAnswer('');
    setFeedback('');
    setScore(0);
  };

  if (sessionComplete) {
    return (
      <div className="min-h-screen bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-4">
              <Link href="/dashboard">
                <Button variant="ghost" size="icon">
                  <ArrowLeft className="h-5 w-5" />
                </Button>
              </Link>
              <div>
                <h1 className="text-3xl font-bold">Interview Complete!</h1>
                <p className="text-muted-foreground">Great job on completing your mock interview</p>
              </div>
            </div>
          </div>

          <Card className="border-0 shadow-lg text-center">
            <CardHeader>
              <CardTitle className="text-2xl">Your Interview Results</CardTitle>
              <CardDescription>Here's how you performed in your {interviewTypes.find(t => t.id === selectedRole)?.name} interview</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-6xl font-bold text-primary">{score}%</div>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span>Communication Skills</span>
                  <span className="font-semibold">{Math.floor(score * 0.9)}%</span>
                </div>
                <div className="flex justify-between">
                  <span>Technical Knowledge</span>
                  <span className="font-semibold">{Math.floor(score * 0.95)}%</span>
                </div>
                <div className="flex justify-between">
                  <span>Problem Solving</span>
                  <span className="font-semibold">{Math.floor(score * 1.05)}%</span>
                </div>
              </div>
              <div className="flex space-x-4 justify-center">
                <Button onClick={resetSession}>
                  <RotateCcw className="mr-2 h-4 w-4" />
                  Try Again
                </Button>
                <Link href="/dashboard">
                  <Button variant="outline">Back to Dashboard</Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <Link href="/dashboard">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold">Interview Practice</h1>
              <p className="text-muted-foreground">Practice mock interviews with AI feedback</p>
            </div>
          </div>
        </div>

        {!sessionStarted ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <MessageSquare className="h-6 w-6 text-primary" />
                  <span>Select Interview Type</span>
                </CardTitle>
                <CardDescription>Choose the role you want to practice for</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Job Role</label>
                  <Select value={selectedRole} onValueChange={setSelectedRole}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a role to practice" />
                    </SelectTrigger>
                    <SelectContent>
                      {interviewTypes.map((type) => (
                        <SelectItem key={type.id} value={type.id}>
                          {type.name} ({type.questions} questions)
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <Button 
                  className="w-full" 
                  onClick={startSession}
                  disabled={!selectedRole}
                >
                  <Play className="mr-2 h-5 w-5" />
                  Start Interview
                </Button>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>How It Works</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center text-sm font-bold">1</div>
                  <div>
                    <p className="font-medium">Select Your Role</p>
                    <p className="text-sm text-muted-foreground">Choose the job position you want to practice for</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center text-sm font-bold">2</div>
                  <div>
                    <p className="font-medium">Answer Questions</p>
                    <p className="text-sm text-muted-foreground">Type or speak your answers to interview questions</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center text-sm font-bold">3</div>
                  <div>
                    <p className="font-medium">Get Feedback</p>
                    <p className="text-sm text-muted-foreground">Receive AI-powered feedback and improvement suggestions</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        ) : (
          <div className="space-y-6">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Question {currentQuestion + 1} of {questions.length}</CardTitle>
                  <Badge variant="outline">{interviewTypes.find(t => t.id === selectedRole)?.name}</Badge>
                </div>
                <Progress value={progress} className="w-full" />
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="p-6 bg-muted/30 rounded-lg">
                  <h3 className="text-lg font-semibold mb-2">Interview Question:</h3>
                  <p className="text-base">{questions[currentQuestion]}</p>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium">Your Answer:</label>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={toggleRecording}
                      className={isRecording ? 'bg-red-50 border-red-200' : ''}
                    >
                      {isRecording ? <MicOff className="h-4 w-4 mr-2" /> : <Mic className="h-4 w-4 mr-2" />}
                      {isRecording ? 'Stop Recording' : 'Voice Input'}
                    </Button>
                  </div>
                  <Textarea
                    placeholder="Type your answer here or use voice input..."
                    value={answer}
                    onChange={(e) => setAnswer(e.target.value)}
                    rows={6}
                    className="resize-none"
                  />
                </div>

                {feedback && (
                  <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                    <h4 className="font-semibold text-green-800 mb-2">Feedback:</h4>
                    <p className="text-green-700">{feedback}</p>
                  </div>
                )}

                <Button 
                  onClick={nextQuestion}
                  disabled={!answer.trim()}
                  className="w-full"
                >
                  {currentQuestion === questions.length - 1 ? 'Complete Interview' : 'Next Question'}
                </Button>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}