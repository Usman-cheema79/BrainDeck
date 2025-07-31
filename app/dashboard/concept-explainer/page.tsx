'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Brain, Send, Lightbulb, BookOpen, Mic, Volume2 } from 'lucide-react';
import Link from 'next/link';

const conceptExamples = [
  { topic: 'Photosynthesis', subject: 'Biology' },
  { topic: 'Quantum Mechanics', subject: 'Physics' },
  { topic: 'Calculus Integration', subject: 'Mathematics' },
  { topic: 'Machine Learning', subject: 'Computer Science' },
  { topic: 'World War II', subject: 'History' },
  { topic: 'Supply and Demand', subject: 'Economics' }
];

export default function ConceptExplainerPage() {
  const [query, setQuery] = useState('');
  const [explanation, setExplanation] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);

  const handleExplain = async () => {
    if (!query.trim()) return;
    
    setIsLoading(true);
    
    // Simulate AI explanation generation
    setTimeout(() => {
      const mockExplanation = generateMockExplanation(query);
      setExplanation(mockExplanation);
      setIsLoading(false);
    }, 2000);
  };

  const generateMockExplanation = (topic: string) => {
    const explanations: { [key: string]: string } = {
      'photosynthesis': `
**Photosynthesis: The Process of Life**

Photosynthesis is one of the most important biological processes on Earth. Here's a simple breakdown:

**What is it?**
Photosynthesis is the process by which plants, algae, and some bacteria convert light energy (usually from the sun) into chemical energy stored in glucose.

**The Simple Equation:**
6CO₂ + 6H₂O + Light Energy → C₆H₁₂O₆ + 6O₂

**Key Components:**
• **Chloroplasts**: The tiny factories in plant cells where photosynthesis happens
• **Chlorophyll**: The green pigment that captures sunlight
• **Stomata**: Tiny pores in leaves that allow gas exchange

**Two Main Stages:**

1. **Light-Dependent Reactions (Photo)**
   - Occur in the thylakoids
   - Chlorophyll absorbs light energy
   - Water molecules are split, releasing oxygen
   - Energy is captured in molecules called ATP and NADPH

2. **Light-Independent Reactions (Synthesis)**
   - Also called the Calvin Cycle
   - Occurs in the stroma
   - CO₂ is converted into glucose using ATP and NADPH
   - This is where the actual "food" is made

**Why is it Important?**
• Produces oxygen that we breathe
• Forms the base of almost all food chains
• Removes CO₂ from the atmosphere
• Converts solar energy into chemical energy

**Fun Fact:** A single tree can produce enough oxygen for two people for an entire year!
      `,
      'default': `
**Understanding: ${topic}**

This is a complex topic that involves several key concepts and principles. Let me break it down for you:

**Core Definition:**
${topic} is a fundamental concept that plays a crucial role in its respective field. Understanding this topic requires grasping both its theoretical foundations and practical applications.

**Key Points to Remember:**
• The basic principles that govern this concept
• How it connects to other related topics
• Real-world applications and examples
• Common misconceptions to avoid

**Detailed Explanation:**
The concept encompasses various aspects that work together to form a comprehensive understanding. When studying this topic, it's important to consider both the micro and macro perspectives.

**Practical Applications:**
This concept has numerous applications in everyday life and professional settings. Understanding these applications helps solidify your grasp of the theoretical aspects.

**Study Tips:**
• Break down complex parts into smaller, manageable pieces
• Use visual aids and diagrams when possible
• Practice with real examples
• Connect new information to what you already know

**Related Topics:**
This concept is closely related to several other important topics in the field, creating a network of interconnected knowledge.
      `
    };

    return explanations[topic.toLowerCase()] || explanations['default'];
  };

  const handleVoiceInput = () => {
    if ('webkitSpeechRecognition' in window) {
      const recognition = new (window as any).webkitSpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'en-US';

      recognition.onstart = () => {
        setIsListening(true);
      };

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setQuery(transcript);
        setIsListening(false);
      };

      recognition.onerror = () => {
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognition.start();
    } else {
      alert('Speech recognition is not supported in your browser.');
    }
  };

  const handleSpeak = () => {
    if ('speechSynthesis' in window && explanation) {
      const utterance = new SpeechSynthesisUtterance(explanation.replace(/\*\*/g, '').replace(/•/g, ''));
      utterance.rate = 0.8;
      utterance.pitch = 1;
      speechSynthesis.speak(utterance);
    }
  };

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
              <h1 className="text-3xl font-bold">Concept Explainer</h1>
              <p className="text-muted-foreground">Get AI-powered explanations of any topic</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Input Section */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Brain className="h-6 w-6 text-primary" />
                  <span>Ask About Any Concept</span>
                </CardTitle>
                <CardDescription>
                  Enter a topic, concept, or question you'd like explained
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex space-x-2">
                  <Input
                    placeholder="e.g., Photosynthesis, Quantum Physics, Machine Learning..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleExplain()}
                    className="flex-1"
                  />
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={handleVoiceInput}
                    disabled={isListening}
                    className={isListening ? 'animate-pulse' : ''}
                  >
                    <Mic className="h-4 w-4" />
                  </Button>
                </div>
                <Button 
                  onClick={handleExplain}
                  disabled={isLoading || !query.trim()}
                  className="w-full"
                >
                  {isLoading ? (
                    <>Generating Explanation...</>
                  ) : (
                    <>
                      <Send className="mr-2 h-4 w-4" />
                      Explain This Concept
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>

            {/* Explanation Output */}
            {explanation && (
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center space-x-2">
                      <Lightbulb className="h-6 w-6 text-primary" />
                      <span>Explanation</span>
                    </CardTitle>
                    <Button variant="outline" size="sm" onClick={handleSpeak}>
                      <Volume2 className="mr-2 h-4 w-4" />
                      Listen
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="prose prose-sm max-w-none">
                    <div className="whitespace-pre-wrap text-sm leading-relaxed">
                      {explanation}
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Popular Topics */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg">Popular Topics</CardTitle>
                <CardDescription>Click to explore these concepts</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {conceptExamples.map((concept, index) => (
                    <Button
                      key={index}
                      variant="ghost"
                      className="w-full justify-start h-auto p-3"
                      onClick={() => setQuery(concept.topic)}
                    >
                      <div className="text-left">
                        <div className="font-medium">{concept.topic}</div>
                        <Badge variant="secondary" className="text-xs mt-1">
                          {concept.subject}
                        </Badge>
                      </div>
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Tips */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg flex items-center space-x-2">
                  <BookOpen className="h-5 w-5" />
                  <span>Study Tips</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="text-sm">
                  <p className="font-medium mb-1">Be Specific</p>
                  <p className="text-muted-foreground">The more specific your question, the better the explanation.</p>
                </div>
                <div className="text-sm">
                  <p className="font-medium mb-1">Use Voice Input</p>
                  <p className="text-muted-foreground">Click the microphone to ask questions verbally.</p>
                </div>
                <div className="text-sm">
                  <p className="font-medium mb-1">Listen Mode</p>
                  <p className="text-muted-foreground">Use the listen feature to hear explanations aloud.</p>
                </div>
                <div className="text-sm">
                  <p className="font-medium mb-1">Follow Up</p>
                  <p className="text-muted-foreground">Ask follow-up questions to dive deeper into topics.</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}