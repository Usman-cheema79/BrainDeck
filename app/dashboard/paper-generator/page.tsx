'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { ArrowLeft, FileText, Download, Wand2 } from 'lucide-react';
import Link from 'next/link';

export default function PaperGeneratorPage() {
  const [generatedPaper, setGeneratedPaper] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [formData, setFormData] = useState({
    subject: '',
    topics: '',
    mcqCount: '10',
    shortCount: '5',
    longCount: '3',
    difficulty: 'medium',
    timeLimit: '60',
    includeSolutions: true
  });

  const handleGenerate = async () => {
    setIsGenerating(true);
    
    // Simulate paper generation
    setTimeout(() => {
      const paper = generateSamplePaper(formData);
      setGeneratedPaper(paper);
      setIsGenerating(false);
    }, 2000);
  };

  const generateSamplePaper = (data: typeof formData) => {
    return `
# ${data.subject.toUpperCase()} EXAMINATION PAPER
**Time Allowed: ${data.timeLimit} minutes**
**Topics: ${data.topics}**

## SECTION A: MULTIPLE CHOICE QUESTIONS (${data.mcqCount} marks)
*Choose the correct answer from the options given below.*

1. What is the primary function of mitochondria in a cell?
   a) Protein synthesis
   b) Energy production
   c) DNA replication
   d) Waste removal

2. Which of the following is NOT a renewable source of energy?
   a) Solar energy
   b) Wind energy
   c) Natural gas
   d) Hydroelectric energy

3. The process of photosynthesis occurs in which part of the plant cell?
   a) Nucleus
   b) Mitochondria
   c) Chloroplasts
   d) Ribosomes

## SECTION B: SHORT ANSWER QUESTIONS (${data.shortCount} × 3 = ${parseInt(data.shortCount) * 3} marks)
*Answer any ${data.shortCount} questions. Each question carries 3 marks.*

1. Explain the difference between mitosis and meiosis.

2. Define the concept of ecosystem and give two examples.

3. What are the main components of the water cycle?

4. Describe the structure and function of DNA.

5. Explain the process of respiration in plants.

## SECTION C: LONG ANSWER QUESTIONS (${data.longCount} × 10 = ${parseInt(data.longCount) * 10} marks)
*Answer any ${data.longCount} questions. Each question carries 10 marks.*

1. Discuss the theory of evolution and provide evidence supporting it.

2. Explain the process of protein synthesis in detail, including transcription and translation.

3. Describe the structure and function of the human circulatory system.

${data.includeSolutions ? `
## ANSWER KEY

### SECTION A SOLUTIONS:
1. b) Energy production - Mitochondria are known as the powerhouses of the cell
2. c) Natural gas - It is a fossil fuel and non-renewable
3. c) Chloroplasts - These contain chlorophyll for photosynthesis

### SECTION B SOLUTIONS:
1. Mitosis produces identical diploid cells for growth, meiosis produces genetically diverse gametes
2. Ecosystem: A community of living organisms interacting with their environment (e.g., forest, pond)
3. Evaporation, condensation, precipitation, collection

### SECTION C SOLUTIONS:
1. Evolution theory explains species change over time through natural selection...
2. Protein synthesis involves DNA transcription to mRNA, then mRNA translation to proteins...
3. Circulatory system includes heart, blood vessels, and blood for nutrient/oxygen transport...
` : ''}
    `.trim();
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
              <h1 className="text-3xl font-bold">Smart Paper Generator</h1>
              <p className="text-muted-foreground">Create MCQs, short and long questions from selected topics</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Configuration Form */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <FileText className="h-6 w-6 text-primary" />
                <span>Paper Configuration</span>
              </CardTitle>
              <CardDescription>
                Set up your examination paper parameters
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Input
                    id="subject"
                    placeholder="e.g., Biology, Physics, Math"
                    value={formData.subject}
                    onChange={(e) => setFormData({...formData, subject: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="difficulty">Difficulty Level</Label>
                  <Select value={formData.difficulty} onValueChange={(value) => setFormData({...formData, difficulty: value})}>
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
                <Label htmlFor="topics">Topics to Cover</Label>
                <Textarea
                  id="topics"
                  placeholder="Enter topics separated by commas (e.g., Cell Structure, Photosynthesis, Respiration)"
                  value={formData.topics}
                  onChange={(e) => setFormData({...formData, topics: e.target.value})}
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="mcq">MCQs</Label>
                  <Input
                    id="mcq"
                    type="number"
                    min="1"
                    max="50"
                    value={formData.mcqCount}
                    onChange={(e) => setFormData({...formData, mcqCount: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="short">Short Questions</Label>
                  <Input
                    id="short"
                    type="number"
                    min="1"
                    max="20"
                    value={formData.shortCount}
                    onChange={(e) => setFormData({...formData, shortCount: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="long">Long Questions</Label>
                  <Input
                    id="long"
                    type="number"
                    min="1"
                    max="10"
                    value={formData.longCount}
                    onChange={(e) => setFormData({...formData, longCount: e.target.value})}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="time">Time Limit (minutes)</Label>
                <Input
                  id="time"
                  type="number"
                  min="30"
                  max="180"
                  value={formData.timeLimit}
                  onChange={(e) => setFormData({...formData, timeLimit: e.target.value})}
                />
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="solutions"
                  checked={formData.includeSolutions}
                  onCheckedChange={(checked) => setFormData({...formData, includeSolutions: checked as boolean})}
                />
                <Label htmlFor="solutions">Include answer key</Label>
              </div>

              <Button 
                className="w-full" 
                onClick={handleGenerate}
                disabled={isGenerating || !formData.subject || !formData.topics}
              >
                {isGenerating ? (
                  <>Generating Paper...</>
                ) : (
                  <>
                    <Wand2 className="mr-2 h-5 w-5" />
                    Generate Paper
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          {/* Generated Paper Preview */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Generated Paper Preview</CardTitle>
                {generatedPaper && (
                  <Button variant="outline" size="sm">
                    <Download className="mr-2 h-4 w-4" />
                    Download PDF
                  </Button>
                )}
              </div>
            </CardHeader>
            <CardContent>
              {generatedPaper ? (
                <div className="bg-muted/30 rounded-lg p-6 max-h-[600px] overflow-y-auto">
                  <pre className="whitespace-pre-wrap text-sm font-mono">
                    {generatedPaper}
                  </pre>
                </div>
              ) : (
                <div className="flex items-center justify-center h-[400px] text-muted-foreground">
                  <div className="text-center">
                    <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>Your generated paper will appear here</p>
                    <p className="text-sm mt-2">Fill in the configuration and click "Generate Paper"</p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}