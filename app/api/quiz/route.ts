import { NextRequest, NextResponse } from 'next/server';

const QUIZ_API_KEY = '16LaKcwe1MzutRe9g8OeBLmh0H1DF6atOfo6lXdn';

interface QuizQuestion {
  id: number;
  question: string;
  description?: string;
  answers: {
    [key: string]: string;
  };
  multiple_correct_answers: string;
  correct_answers: {
    [key: string]: string;
  };
  correct_answer?: string;
  explanation?: string;
  tip?: string;
  tags: Array<{
    name: string;
  }>;
  category: string;
  difficulty: string;
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const subject = searchParams.get('subject') || 'general';
  const difficulty = searchParams.get('difficulty') || 'easy';
  const limit = searchParams.get('limit') || '20';

  try {
    // Map subjects to API categories/tags
    const subjectMap: { [key: string]: string } = {
      'math': 'Math',
      'physics': 'Science',
      'chemistry': 'Science', 
      'biology': 'Science',
      'english': 'English',
      'general': 'General Knowledge'
    };

    const apiSubject = subjectMap[subject.toLowerCase()] || 'General Knowledge';
    
    const response = await fetch(
      `https://quizapi.io/api/v1/questions?apiKey=${QUIZ_API_KEY}&limit=${limit}&category=${apiSubject}&difficulty=${difficulty}`,
      {
        headers: {
          'Accept': 'application/json',
        },
      }
    );

    if (!response.ok) {
      throw new Error('Failed to fetch quiz questions');
    }

    const data: QuizQuestion[] = await response.json();
    
    // Transform the data to a more usable format
    const transformedQuestions = data.map((question, index) => ({
      id: index + 1,
      question: question.question,
      options: Object.values(question.answers).filter(answer => answer !== null),
      correct_answer: question.correct_answer || Object.keys(question.correct_answers).find(key => 
        question.correct_answers[key] === 'true'
      )?.replace('_correct', ''),
      explanation: question.explanation || question.description,
      difficulty: question.difficulty,
      category: question.category,
      type: question.multiple_correct_answers === 'true' ? 'multiple' : 'single'
    }));

    return NextResponse.json({
      success: true,
      questions: transformedQuestions,
      total: transformedQuestions.length
    });
  } catch (error) {
    console.error('Quiz API Error:', error);
    
    // Fallback to sample questions if API fails
    const sampleQuestions = generateSampleQuestions(subject, parseInt(limit));
    
    return NextResponse.json({
      success: true,
      questions: sampleQuestions,
      total: sampleQuestions.length,
      note: 'Using sample questions due to API limitations'
    });
  }
}

function generateSampleQuestions(subject: string, count: number) {
  const sampleQuestions = {
    math: [
      {
        id: 1,
        question: "What is the value of x in the equation 2x + 5 = 15?",
        options: ["5", "10", "7.5", "2.5"],
        correct_answer: "5",
        explanation: "Solve: 2x + 5 = 15, so 2x = 10, therefore x = 5",
        difficulty: "medium",
        category: "Algebra"
      },
      {
        id: 2,
        question: "What is the derivative of x²?",
        options: ["x", "2x", "x²", "2"],
        correct_answer: "2x",
        explanation: "The derivative of x² is 2x using the power rule",
        difficulty: "easy",
        category: "Calculus"
      }
    ],
    physics: [
      {
        id: 1,
        question: "What is the unit of force in SI system?",
        options: ["Newton", "Joule", "Watt", "Pascal"],
        correct_answer: "Newton",
        explanation: "Newton (N) is the SI unit of force, named after Isaac Newton",
        difficulty: "easy",
        category: "Mechanics"
      },
      {
        id: 2,
        question: "What is the speed of light in vacuum?",
        options: ["3 × 10⁸ m/s", "3 × 10⁶ m/s", "3 × 10¹⁰ m/s", "3 × 10⁹ m/s"],
        correct_answer: "3 × 10⁸ m/s",
        explanation: "The speed of light in vacuum is approximately 3 × 10⁸ meters per second",
        difficulty: "medium",
        category: "Optics"
      }
    ],
    general: [
      {
        id: 1,
        question: "What is the capital of Pakistan?",
        options: ["Karachi", "Lahore", "Islamabad", "Rawalpindi"],
        correct_answer: "Islamabad",
        explanation: "Islamabad is the capital city of Pakistan",
        difficulty: "easy",
        category: "Geography"
      }
    ]
  };

  const questions = sampleQuestions[subject as keyof typeof sampleQuestions] || sampleQuestions.general;
  return questions.slice(0, Math.min(count, questions.length));
}