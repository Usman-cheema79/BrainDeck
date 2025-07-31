import { NextRequest, NextResponse } from 'next/server';

interface PaperRequest {
  subject: string;
  topics: string;
  mcqCount: number;
  shortCount: number;
  longCount: number;
  difficulty: string;
  timeLimit: number;
  includeSolutions: boolean;
}

export async function POST(request: NextRequest) {
  try {
    const body: PaperRequest = await request.json();
    
    const paper = generatePaper(body);
    
    return NextResponse.json({
      success: true,
      paper: paper
    });
  } catch (error) {
    console.error('Paper generation error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to generate paper' },
      { status: 500 }
    );
  }
}

function generatePaper(config: PaperRequest): string {
  const { subject, topics, mcqCount, shortCount, longCount, difficulty, timeLimit, includeSolutions } = config;
  
  const topicList = topics.split(',').map(t => t.trim());
  
  // Generate MCQs
  const mcqs = generateMCQs(topicList, mcqCount, difficulty);
  
  // Generate Short Questions
  const shortQuestions = generateShortQuestions(topicList, shortCount, difficulty);
  
  // Generate Long Questions
  const longQuestions = generateLongQuestions(topicList, longCount, difficulty);
  
  let paper = `# ${subject.toUpperCase()} EXAMINATION PAPER
**Time Allowed: ${timeLimit} minutes**
**Topics: ${topics}**
**Difficulty Level: ${difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}**

---

## SECTION A: MULTIPLE CHOICE QUESTIONS (${mcqCount} marks)
*Choose the correct answer from the options given below. Each question carries 1 mark.*

${mcqs.map((mcq, index) => `${index + 1}. ${mcq.question}
   a) ${mcq.options[0]}
   b) ${mcq.options[1]}
   c) ${mcq.options[2]}
   d) ${mcq.options[3]}`).join('\n\n')}

---

## SECTION B: SHORT ANSWER QUESTIONS (${shortCount} × 3 = ${shortCount * 3} marks)
*Answer any ${shortCount} questions. Each question carries 3 marks.*

${shortQuestions.map((q, index) => `${index + 1}. ${q}`).join('\n\n')}

---

## SECTION C: LONG ANSWER QUESTIONS (${longCount} × 10 = ${longCount * 10} marks)
*Answer any ${longCount} questions. Each question carries 10 marks.*

${longQuestions.map((q, index) => `${index + 1}. ${q}`).join('\n\n')}

---

**Total Marks: ${mcqCount + (shortCount * 3) + (longCount * 10)}**
`;

  if (includeSolutions) {
    paper += `
---

## ANSWER KEY

### SECTION A SOLUTIONS:
${mcqs.map((mcq, index) => `${index + 1}. ${mcq.correct}) ${mcq.options[mcq.correctIndex]} - ${mcq.explanation}`).join('\n')}

### SECTION B SOLUTIONS:
${shortQuestions.map((q, index) => `${index + 1}. ${generateShortAnswer(q)}`).join('\n\n')}

### SECTION C SOLUTIONS:
${longQuestions.map((q, index) => `${index + 1}. ${generateLongAnswer(q)}`).join('\n\n')}
`;
  }

  return paper;
}

function generateMCQs(topics: string[], count: number, difficulty: string) {
  const mcqTemplates = {
    biology: [
      {
        question: "What is the primary function of mitochondria?",
        options: ["Protein synthesis", "Energy production", "DNA replication", "Waste removal"],
        correctIndex: 1,
        explanation: "Mitochondria are known as the powerhouses of the cell"
      },
      {
        question: "Which process occurs in chloroplasts?",
        options: ["Respiration", "Photosynthesis", "Digestion", "Excretion"],
        correctIndex: 1,
        explanation: "Chloroplasts contain chlorophyll for photosynthesis"
      }
    ],
    physics: [
      {
        question: "What is the SI unit of force?",
        options: ["Joule", "Newton", "Watt", "Pascal"],
        correctIndex: 1,
        explanation: "Newton (N) is the SI unit of force"
      },
      {
        question: "What is the speed of light in vacuum?",
        options: ["3 × 10⁶ m/s", "3 × 10⁸ m/s", "3 × 10¹⁰ m/s", "3 × 10⁹ m/s"],
        correctIndex: 1,
        explanation: "Speed of light in vacuum is 3 × 10⁸ m/s"
      }
    ],
    chemistry: [
      {
        question: "What is the chemical formula for water?",
        options: ["H₂O", "CO₂", "NaCl", "CH₄"],
        correctIndex: 0,
        explanation: "Water consists of two hydrogen atoms and one oxygen atom"
      }
    ],
    math: [
      {
        question: "What is the derivative of x²?",
        options: ["x", "2x", "x²", "2"],
        correctIndex: 1,
        explanation: "Using the power rule: d/dx(x²) = 2x"
      }
    ]
  };

  const mcqs = [];
  const availableTemplates = Object.values(mcqTemplates).flat();
  
  for (let i = 0; i < count; i++) {
    const template = availableTemplates[i % availableTemplates.length];
    mcqs.push({
      ...template,
      correct: ['a', 'b', 'c', 'd'][template.correctIndex]
    });
  }
  
  return mcqs;
}

function generateShortQuestions(topics: string[], count: number, difficulty: string): string[] {
  const questionTemplates = [
    "Define and explain the concept of {topic}.",
    "What are the main characteristics of {topic}?",
    "Describe the process involved in {topic}.",
    "List three important features of {topic}.",
    "Explain the significance of {topic} in its field.",
    "What are the applications of {topic}?",
    "Compare and contrast different aspects of {topic}.",
    "Describe the structure and function related to {topic}."
  ];

  const questions = [];
  for (let i = 0; i < count; i++) {
    const template = questionTemplates[i % questionTemplates.length];
    const topic = topics[i % topics.length];
    questions.push(template.replace('{topic}', topic.toLowerCase()));
  }
  
  return questions;
}

function generateLongQuestions(topics: string[], count: number, difficulty: string): string[] {
  const questionTemplates = [
    "Discuss in detail the theory and applications of {topic}. Provide relevant examples and explain its importance in the field.",
    "Analyze the various aspects of {topic}. Include its historical development, current understanding, and future prospects.",
    "Explain the comprehensive framework of {topic}. Discuss its components, processes, and real-world applications.",
    "Critically evaluate the role of {topic} in its respective domain. Support your answer with examples and case studies.",
    "Describe the detailed mechanism and significance of {topic}. Include diagrams where necessary and explain its practical implications."
  ];

  const questions = [];
  for (let i = 0; i < count; i++) {
    const template = questionTemplates[i % questionTemplates.length];
    const topic = topics[i % topics.length];
    questions.push(template.replace('{topic}', topic.toLowerCase()));
  }
  
  return questions;
}

function generateShortAnswer(question: string): string {
  return "This question requires a concise explanation covering the key concepts, definitions, and main points related to the topic. Students should provide specific examples and demonstrate understanding of the fundamental principles.";
}

function generateLongAnswer(question: string): string {
  return "This comprehensive question requires detailed analysis including: 1) Introduction and background, 2) Main concepts and theories, 3) Practical applications and examples, 4) Current developments and research, 5) Conclusion with personal insights. Students should demonstrate critical thinking and in-depth knowledge.";
}