'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Layers, Plus, RotateCcw, Check, X, Brain, Shuffle } from 'lucide-react';
import Link from 'next/link';

const sampleFlashcards = [
  {
    id: 1,
    subject: 'Biology',
    front: 'What is photosynthesis?',
    back: 'The process by which plants convert light energy into chemical energy (glucose) using carbon dioxide and water.',
    difficulty: 'medium',
    lastReviewed: '2 days ago',
    correctCount: 8,
    totalReviews: 10
  },
  {
    id: 2,
    subject: 'Physics',
    front: 'What is Newton\'s First Law?',
    back: 'An object at rest stays at rest and an object in motion stays in motion unless acted upon by an external force.',
    difficulty: 'easy',
    lastReviewed: '1 day ago',
    correctCount: 15,
    totalReviews: 18
  },
  {
    id: 3,
    subject: 'Chemistry',
    front: 'What is the molecular formula for water?',
    back: 'H₂O - Two hydrogen atoms bonded to one oxygen atom.',
    difficulty: 'easy',
    lastReviewed: '3 hours ago',
    correctCount: 20,
    totalReviews: 22
  },
  {
    id: 4,
    subject: 'Mathematics',
    front: 'What is the derivative of x²?',
    back: '2x - Using the power rule: d/dx(xⁿ) = n·xⁿ⁻¹',
    difficulty: 'medium',
    lastReviewed: '5 days ago',
    correctCount: 12,
    totalReviews: 16
  }
];

export default function FlashcardsPage() {
  const [flashcards, setFlashcards] = useState(sampleFlashcards);
  const [currentCard, setCurrentCard] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [studyMode, setStudyMode] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState('all');
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newCard, setNewCard] = useState({
    subject: '',
    front: '',
    back: '',
    difficulty: 'medium'
  });

  const filteredCards = selectedSubject === 'all' 
    ? flashcards 
    : flashcards.filter(card => card.subject.toLowerCase() === selectedSubject);


  const subjects = Array.from(new Set(flashcards.map(card => card.subject)));


  const handleCreateCard = () => {
    if (newCard.subject && newCard.front && newCard.back) {
      const card = {
        id: flashcards.length + 1,
        ...newCard,
        lastReviewed: 'Never',
        correctCount: 0,
        totalReviews: 0
      };
      setFlashcards([...flashcards, card]);
      setNewCard({ subject: '', front: '', back: '', difficulty: 'medium' });
      setShowCreateForm(false);
    }
  };

  const handleAnswer = (correct: boolean) => {
    const updatedCards = [...flashcards];
    const cardIndex = flashcards.findIndex(card => card.id === filteredCards[currentCard].id);
    
    updatedCards[cardIndex] = {
      ...updatedCards[cardIndex],
      totalReviews: updatedCards[cardIndex].totalReviews + 1,
      correctCount: correct ? updatedCards[cardIndex].correctCount + 1 : updatedCards[cardIndex].correctCount,
      lastReviewed: 'Just now'
    };
    
    setFlashcards(updatedCards);
    nextCard();
  };

  const nextCard = () => {
    setIsFlipped(false);
    setCurrentCard((prev) => (prev + 1) % filteredCards.length);
  };

  const shuffleCards = () => {
    const shuffled = [...filteredCards].sort(() => Math.random() - 0.5);
    setCurrentCard(0);
    setIsFlipped(false);
  };

  if (studyMode && filteredCards.length > 0) {
    const card = filteredCards[currentCard];
    
    return (
      <div className="min-h-screen bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between mb-8">
            <Button variant="ghost" onClick={() => setStudyMode(false)}>
              <ArrowLeft className="h-5 w-5 mr-2" />
              Back to Library
            </Button>
            <div className="flex items-center space-x-4">
              <Badge variant="outline">{currentCard + 1} of {filteredCards.length}</Badge>
              <Button variant="outline" size="sm" onClick={shuffleCards}>
                <Shuffle className="h-4 w-4 mr-2" />
                Shuffle
              </Button>
            </div>
          </div>

          <div className="flex justify-center">
            <div className="w-full max-w-2xl">
              <Card 
                className="border-0 shadow-2xl cursor-pointer transition-transform duration-300 hover:scale-105"
                onClick={() => setIsFlipped(!isFlipped)}
              >
                <CardContent className="p-12 min-h-[400px] flex items-center justify-center">
                  <div className="text-center space-y-4">
                    <Badge className="mb-4">{card.subject}</Badge>
                    <div className="text-xl font-medium leading-relaxed">
                      {isFlipped ? card.back : card.front}
                    </div>
                    {!isFlipped && (
                      <p className="text-sm text-muted-foreground mt-8">
                        Click to reveal answer
                      </p>
                    )}
                  </div>
                </CardContent>
              </Card>

              {isFlipped && (
                <div className="flex justify-center space-x-4 mt-8">
                  <Button 
                    variant="outline" 
                    size="lg"
                    onClick={() => handleAnswer(false)}
                    className="border-red-200 text-red-600 hover:bg-red-50"
                  >
                    <X className="h-5 w-5 mr-2" />
                    Incorrect
                  </Button>
                  <Button 
                    size="lg"
                    onClick={() => handleAnswer(true)}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    <Check className="h-5 w-5 mr-2" />
                    Correct
                  </Button>
                </div>
              )}

              <div className="mt-8 text-center text-sm text-muted-foreground">
                <p>Accuracy: {card.totalReviews > 0 ? Math.round((card.correctCount / card.totalReviews) * 100) : 0}% 
                ({card.correctCount}/{card.totalReviews})</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

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
              <h1 className="text-3xl font-bold">Smart Flashcards</h1>
              <p className="text-muted-foreground">AI-generated flashcards for better retention</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Select value={selectedSubject} onValueChange={setSelectedSubject}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="All Subjects" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Subjects</SelectItem>
                {subjects.map((subject) => (
                  <SelectItem key={subject} value={subject.toLowerCase()}>
                    {subject}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button onClick={() => setShowCreateForm(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Create Card
            </Button>
          </div>
        </div>

        {/* Create Card Form */}
        {showCreateForm && (
          <Card className="border-0 shadow-lg mb-8">
            <CardHeader>
              <CardTitle>Create New Flashcard</CardTitle>
              <CardDescription>Add a new flashcard to your collection</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Subject</label>
                  <Input
                    placeholder="e.g., Biology, Physics"
                    value={newCard.subject}
                    onChange={(e) => setNewCard({...newCard, subject: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Difficulty</label>
                  <Select value={newCard.difficulty} onValueChange={(value) => setNewCard({...newCard, difficulty: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="easy">Easy</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="hard">Hard</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Question (Front)</label>
                <Textarea
                  placeholder="Enter your question here..."
                  value={newCard.front}
                  onChange={(e) => setNewCard({...newCard, front: e.target.value})}
                  rows={3}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Answer (Back)</label>
                <Textarea
                  placeholder="Enter the answer here..."
                  value={newCard.back}
                  onChange={(e) => setNewCard({...newCard, back: e.target.value})}
                  rows={3}
                />
              </div>
              <div className="flex space-x-2">
                <Button onClick={handleCreateCard}>Create Flashcard</Button>
                <Button variant="outline" onClick={() => setShowCreateForm(false)}>Cancel</Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Study Options */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="border-0 shadow-md">
            <CardContent className="p-6 text-center">
              <Brain className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Quick Review</h3>
              <p className="text-sm text-muted-foreground mb-4">Review all cards quickly</p>
              <Button 
                className="w-full" 
                onClick={() => setStudyMode(true)}
                disabled={filteredCards.length === 0}
              >
                Start Review
              </Button>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-md">
            <CardContent className="p-6 text-center">
              <RotateCcw className="h-12 w-12 text-orange-500 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Difficult Cards</h3>
              <p className="text-sm text-muted-foreground mb-4">Focus on challenging cards</p>
              <Button variant="outline" className="w-full">
                Study Hard Cards
              </Button>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-md">
            <CardContent className="p-6 text-center">
              <Shuffle className="h-12 w-12 text-green-500 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Random Mode</h3>
              <p className="text-sm text-muted-foreground mb-4">Shuffle and study randomly</p>
              <Button variant="outline" className="w-full">
                Random Study
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Flashcard Library */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Layers className="h-6 w-6 text-primary" />
              <span>Your Flashcard Library</span>
            </CardTitle>
            <CardDescription>
              {filteredCards.length} cards {selectedSubject !== 'all' && `in ${selectedSubject}`}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredCards.map((card) => (
                <Card key={card.id} className="border border-muted hover:shadow-md transition-shadow cursor-pointer">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant="secondary" className="text-xs">{card.subject}</Badge>
                      <Badge 
                        variant="outline" 
                        className={`text-xs ${
                          card.difficulty === 'easy' ? 'border-green-200 text-green-600' :
                          card.difficulty === 'medium' ? 'border-yellow-200 text-yellow-600' :
                          'border-red-200 text-red-600'
                        }`}
                      >
                        {card.difficulty}
                      </Badge>
                    </div>
                    <p className="font-medium text-sm mb-2 line-clamp-2">{card.front}</p>
                    <div className="text-xs text-muted-foreground space-y-1">
                      <p>Last reviewed: {card.lastReviewed}</p>
                      <p>Accuracy: {card.totalReviews > 0 ? Math.round((card.correctCount / card.totalReviews) * 100) : 0}%</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}