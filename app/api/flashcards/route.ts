import { NextRequest, NextResponse } from 'next/server';

interface FlashcardRequest {
  subject: string;
  topic: string;
  count: number;
  difficulty: string;
}

export async function POST(request: NextRequest) {
  try {
    const body: FlashcardRequest = await request.json();
    
    const flashcards = generateFlashcards(body);
    
    return NextResponse.json({
      success: true,
      flashcards: flashcards
    });
  } catch (error) {
    console.error('Flashcard generation error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to generate flashcards' },
      { status: 500 }
    );
  }
}

function generateFlashcards(config: FlashcardRequest) {
  const { subject, topic, count, difficulty } = config;
  
  const flashcardTemplates = {
    biology: [
      {
        front: "What is photosynthesis?",
        back: "The process by which plants convert light energy into chemical energy (glucose) using carbon dioxide and water.",
        difficulty: "medium"
      },
      {
        front: "What is the function of mitochondria?",
        back: "Mitochondria are the powerhouses of the cell, responsible for producing ATP through cellular respiration.",
        difficulty: "easy"
      },
      {
        front: "What is DNA?",
        back: "Deoxyribonucleic acid - the hereditary material that contains genetic instructions for all living organisms.",
        difficulty: "medium"
      },
      {
        front: "What is the difference between mitosis and meiosis?",
        back: "Mitosis produces identical diploid cells for growth, while meiosis produces genetically diverse gametes for reproduction.",
        difficulty: "hard"
      }
    ],
    physics: [
      {
        front: "What is Newton's First Law?",
        back: "An object at rest stays at rest, and an object in motion stays in motion, unless acted upon by an external force.",
        difficulty: "easy"
      },
      {
        front: "What is the formula for kinetic energy?",
        back: "KE = ½mv² where m is mass and v is velocity.",
        difficulty: "medium"
      },
      {
        front: "What is the speed of light?",
        back: "Approximately 3 × 10⁸ meters per second in a vacuum.",
        difficulty: "easy"
      },
      {
        front: "What is quantum mechanics?",
        back: "The branch of physics that describes the behavior of matter and energy at the atomic and subatomic level.",
        difficulty: "hard"
      }
    ],
    chemistry: [
      {
        front: "What is the periodic table?",
        back: "A systematic arrangement of chemical elements ordered by atomic number and organized by similar properties.",
        difficulty: "easy"
      },
      {
        front: "What is a covalent bond?",
        back: "A chemical bond formed when atoms share electrons to achieve stable electron configurations.",
        difficulty: "medium"
      },
      {
        front: "What is pH?",
        back: "A scale measuring the acidity or alkalinity of a solution, ranging from 0 (acidic) to 14 (basic).",
        difficulty: "medium"
      },
      {
        front: "What is organic chemistry?",
        back: "The study of carbon-containing compounds and their properties, reactions, and structures.",
        difficulty: "hard"
      }
    ],
    mathematics: [
      {
        front: "What is the derivative of x²?",
        back: "2x (using the power rule: d/dx(xⁿ) = n·xⁿ⁻¹)",
        difficulty: "medium"
      },
      {
        front: "What is the Pythagorean theorem?",
        back: "In a right triangle, a² + b² = c², where c is the hypotenuse and a, b are the other sides.",
        difficulty: "easy"
      },
      {
        front: "What is integration?",
        back: "The process of finding the antiderivative or the area under a curve in calculus.",
        difficulty: "hard"
      },
      {
        front: "What is a prime number?",
        back: "A natural number greater than 1 that has no positive divisors other than 1 and itself.",
        difficulty: "easy"
      }
    ]
  };

  const subjectKey = subject.toLowerCase() as keyof typeof flashcardTemplates;
  const availableCards = flashcardTemplates[subjectKey] || flashcardTemplates.mathematics;
  
  // Filter by difficulty if specified
  let filteredCards = availableCards;
  if (difficulty !== 'all') {
    filteredCards = availableCards.filter(card => card.difficulty === difficulty);
  }
  
  // If not enough cards of specified difficulty, use all cards
  if (filteredCards.length < count) {
    filteredCards = availableCards;
  }
  
  // Generate the requested number of cards
  const selectedCards = [];
  for (let i = 0; i < Math.min(count, filteredCards.length); i++) {
    const card = filteredCards[i % filteredCards.length];
    selectedCards.push({
      id: i + 1,
      subject: subject,
      front: card.front,
      back: card.back,
      difficulty: card.difficulty,
      lastReviewed: 'Never',
      correctCount: 0,
      totalReviews: 0
    });
  }
  
  return selectedCards;
}

export async function GET(request: NextRequest) {
  // Return sample flashcards for testing
  const sampleCards = [
    {
      id: 1,
      subject: 'Biology',
      front: 'What is photosynthesis?',
      back: 'The process by which plants convert light energy into chemical energy using carbon dioxide and water.',
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
    }
  ];

  return NextResponse.json({
    success: true,
    flashcards: sampleCards
  });
}