
"use server";

import { NextRequest, NextResponse } from 'next/server';
import { connect } from "@/dbConfig/dbConfig";
import { MCQ } from '@/models/MCQ';


export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const subject = searchParams.get('subject') || 'JavaScript';
  const level = searchParams.get('level') || '';
  const difficulty = searchParams.get('difficulty') || 'easy';
  const limit = parseInt(searchParams.get('limit') || '10');
  const prompt = `Generate ${limit} ${subject} multiple-choice questions of ${difficulty} difficulty for level ${level}. Each question must have 4 options and only one correct answer.
    Respond strictly in JSON array format ONLY. Do not include any extra text, explanation, notes, speech, or markdown formatting. The format must look exactly like this:
   
    [
      {
        "id": 1,
        "question": "Your question here?",
        "options": ["Option A", "Option B", "Option C", "Option D"],
        "correct_answer": "Option A"
        "category": "english",
        "difficulty": "Easy",
        "explanation":"explain the answer in 1 to 2 lines"
      },
      ...
    ]
    `;

  try {
    const response = await fetch('https://router.huggingface.co/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'deepseek-ai/DeepSeek-R1:together',
        messages: [
          {
            role: 'user',
            content: prompt,
          },
        ],
        stream: false,
      }),
    });

    const json = await response.json();
    console.log(json)
    const content = json.choices?.[0]?.message?.content || '';
    console.log(content);
    let questions = [];

    try {

      const startIndex = content.indexOf('[');
      const endIndex = content.lastIndexOf(']');

      if (startIndex !== -1 && endIndex !== -1 && endIndex > startIndex) {
        const jsonString = content.slice(startIndex, endIndex + 1);
        const cleanString = jsonString
            .replace(/```json|```/g, '')
            .replace(/\\n/g, '')
            .trim();

        questions = JSON.parse(cleanString);
      } else {
        console.warn('No valid JSON array found in content');
        console.log('Raw response content:', content);
      }
    } catch (parseErr) {
      console.error('Failed to parse JSON from model output:', parseErr);
      console.log('Model raw output:', content);
    }
    storeUniqueMCQs(questions,level);
    return NextResponse.json({
      success: true,
      questions,
      total: questions.length,
    });
  } catch (error) {
    console.error('Hugging Face API Error:', error);

    return NextResponse.json({
      success: false,
      error: 'Failed to fetch questions',
    });
  }
}
async function storeUniqueMCQs(questions: any[],level :any) {
  try {
    await connect();

    for (const mcq of questions) {
      const exists = await MCQ.findOne({ question: mcq.question });
      if (!exists) {
        const newMCQ = new MCQ({
          question: mcq.question,
          options: mcq.options,
          correct_answer: mcq.correct_answer,
          explanation: mcq.explanation,
          difficulty: mcq.difficulty,
          category: mcq.category,
          level: level,
        });
        await newMCQ.save();
      }
    }
    console.log("all mcqs saved")
  } catch (err) {
    console.error('DB insert error:', err);
  }
}

// interface QuizQuestion {
//   id: number;
//   question: string;
//   description?: string;
//   answers: {
//     [key: string]: string;
//   };
//   multiple_correct_answers: string;
//   correct_answers: {
//     [key: string]: string;
//   };
//   correct_answer?: string;
//   explanation?: string;
//   tip?: string;
//   tags: Array<{
//     name: string;
//   }>;
//   category: string;
//   difficulty: string;
// }
//
// export async function GET(request: NextRequest) {
//
//   const searchParams = request.nextUrl.searchParams;
//   const subject = searchParams.get('subject') || 'general';
//   const difficulty = searchParams.get('difficulty') || 'easy';
//   const limit = searchParams.get('limit') || '10';
//
//   try {
//
//     const subjectMap: { [key: string]: string } = {
//       linux: 'Linux',
//       devops: 'DevOps',
//       networking: 'Networking',
//       programming: 'Programming',
//       cloud: 'Cloud',
//       docker: 'Docker',
//       general: 'Linux'
//     };
//
//     const apiSubject = subjectMap[subject.toLowerCase()] || 'Linux';
//
//     const url = new URL('https://quizapi.io/api/v1/questions');
//     url.searchParams.append('apiKey', QUIZ_API_KEY);
//     url.searchParams.append('limit', limit);
//     url.searchParams.append('category', apiSubject);
//     url.searchParams.append('difficulty', difficulty);
//
//     const response = await fetch(url.toString(), {
//       method: 'GET',
//       headers: {
//         Accept: 'application/json',
//       },
//     });
//
//     console.log(response)
//     if (!response.ok) {
//       throw new Error('Failed to fetch quiz questions');
//     }
//
//     const data: QuizQuestion[] = await response.json();
//
//     // Transform the data to a more usable format
//     const transformedQuestions = data.map((question, index) => ({
//       id: index + 1,
//       question: question.question,
//       options: Object.values(question.answers).filter(answer => answer !== null),
//       correct_answer: question.correct_answer || Object.keys(question.correct_answers).find(key =>
//         question.correct_answers[key] === 'true'
//       )?.replace('_correct', ''),
//       explanation: question.explanation || question.description,
//       difficulty: question.difficulty,
//       category: question.category,
//       type: question.multiple_correct_answers === 'true' ? 'multiple' : 'single'
//     }));
//
//     return NextResponse.json({
//       success: true,
//       questions: transformedQuestions,
//       total: transformedQuestions.length
//     });
//   } catch (error) {
//     console.error('Quiz API Error:', error);
//
//     // const sampleQuestions = generateSampleQuestions(subject, parseInt(limit));
//
//     return NextResponse.json({
//       success: false,
//       note: error
//     });
//   }
// }