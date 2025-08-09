
"use server";

import { NextRequest, NextResponse } from 'next/server';
import { connect } from "@/dbConfig/dbConfig";
import { MCQ } from '@/models/MCQ';
import  QuizResult  from '@/models/QuizResult';
interface QuizQuestion {
  id: number;
  question: string;
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
  // const searchParams = request.nextUrl.searchParams;
  // const subject = searchParams.get('subject') || 'JavaScript';
  // const level = searchParams.get('level') || '';
  // const difficulty = searchParams.get('difficulty') || 'easy';
  // const limit = parseInt(searchParams.get('limit') || '10');
  // const prompt = `Generate ${limit} ${subject} multiple-choice questions of ${difficulty} difficulty for level ${level}. Each question must have 4 options and only one correct answer.
  //   Respond strictly in JSON array format ONLY. Do not include any extra text, explanation, notes, speech, or markdown formatting. The format must look exactly like this:
  //
  //   [
  //     {
  //       "id": 1,
  //       "question": "Your question here?",
  //       "options": ["Option A", "Option B", "Option C", "Option D"],
  //       "correct_answer": "Option A"
  //       "category": "english",
  //       "difficulty": "Easy",
  //       "explanation":"explain the answer in 1 to 2 lines"
  //     },
  //     ...
  //   ]
  //   `;

  // try {
  //   const response = await fetch('https://router.huggingface.co/v1/chat/completions', {
  //     method: 'POST',
  //     headers: {
  //       Authorization: `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify({
  //       model: 'deepseek-ai/DeepSeek-R1:together',
  //       messages: [
  //         {
  //           role: 'user',
  //           content: prompt,
  //         },
  //       ],
  //       stream: false,
  //     }),
  //   });
  //
  //   const json = await response.json();
  //   console.log(json)
  //   const content = json.choices?.[0]?.message?.content || '';
  //   console.log(content);
  //   let questions = [];
  //
  //   try {
  //
  //     const startIndex = content.indexOf('[');
  //     const endIndex = content.lastIndexOf(']');
  //
  //     if (startIndex !== -1 && endIndex !== -1 && endIndex > startIndex) {
  //       const jsonString = content.slice(startIndex, endIndex + 1);
  //       const cleanString = jsonString
  //           .replace(/```json|```/g, '')
  //           .replace(/\\n/g, '')
  //           .trim();
  //
  //       questions = JSON.parse(cleanString);
  //     } else {
  //       console.warn('No valid JSON array found in content');
  //       console.log('Raw response content:', content);
  //     }
  //   } catch (parseErr) {
  //     console.error('Failed to parse JSON from model output:', parseErr);
  //     console.log('Model raw output:', content);
  //   }
  //   storeUniqueMCQs(questions,level);
  //   return NextResponse.json({
  //     success: true,
  //     questions,
  //     total: questions.length,
  //   });
  // } catch (error) {
  //   console.error('Hugging Face API Error:', error);
  //
  //   return NextResponse.json({
  //     success: false,
  //     error: 'Failed to fetch questions',
  //   });
  // }

  const searchParams = request.nextUrl.searchParams;
  const subject = searchParams.get('subject') || 'general';
  const difficulty = searchParams.get('difficulty') || 'easy';
  const limit = searchParams.get('limit') || '10';
  const level = searchParams.get('level') || '';
  try {
    const subjectMap: { [key: string]: string } = {
      linux: 'Linux',
      devops: 'DevOps',
      networking: 'Networking',
      programming: 'Programming',
      cloud: 'Cloud',
      docker: 'Docker',
      kubernetes: 'Kubernetes',
      terraform: 'Terraform',
      html: 'HTML',
      javascript: 'JavaScript',
      mysql: 'MySQL',
      postgresql: 'PostgreSQL',
      nextjs: 'Next.js',
      react: 'React',
      vue: 'VueJS',
      node: 'NodeJS',
      python: 'Python',
      django: 'Django',
      laravel: 'Laravel',
      wordpress: 'WordPress',
      kafka: 'Apache Kafka',
      cpanel: 'cPanel',
      ubuntu: 'Ubuntu',
      general: 'Linux'
    };

    const apiSubject = subjectMap[subject.toLowerCase()] || 'Linux';

    const url = new URL('https://quizapi.io/api/v1/questions');
    url.searchParams.append('apiKey', process.env.QUIZ_API_KEY || '');
    url.searchParams.append('limit', limit);
    url.searchParams.append('category', apiSubject);
    url.searchParams.append('difficulty', difficulty);

    const response = await fetch(url.toString(), {
      method: 'GET',
      headers: { Accept: 'application/json' },
    });
    console.log("response",response)
    if (!response.ok) {
      const errorText = await response.text(); // Read body of the response
      console.error('❌ Failed to fetch quiz questions');
      console.error('Status:', response.status);
      console.error('StatusText:', response.statusText);
      console.error('Body:', errorText);
      throw new Error(`Fetch failed with status ${response.status}`);
    }

    const data: QuizQuestion[] = await response.json();

    const transformedQuestions = data.map((question, index) => {
      const options = Object.values(question.answers).filter(ans => ans !== null);

      let correctAnswer: string = '';
      const correctKeys = Object.entries(question.correct_answers)
          .filter(([_, value]) => value === 'true')
          .map(([key]) => key.replace('_correct', ''));

      const correctFromAnswers = correctKeys
          .map(key => question.answers[key])
          .filter(Boolean);

      if (correctFromAnswers.length > 0) {
        correctAnswer = correctFromAnswers.join(', ');
      } else if (question.correct_answer && question.answers[question.correct_answer]) {
        correctAnswer = question.answers[question.correct_answer];
      }

      return {
        question: question.question,
        options: options,
        correct_answer: correctAnswer,
        explanation: question.explanation || '',
        difficulty: question.difficulty,
        category: question.category,
        level: question.multiple_correct_answers === 'true' ? 'hard' : 'easy'
      };
    });

    storeUniqueMCQs(transformedQuestions, level);

    return NextResponse.json({
      success: true,
      questions: transformedQuestions,
      total: transformedQuestions.length
    });

  } catch (error) {
    console.error('❌ Quiz API Error:', error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : String(error),
    });
  }

}
async function storeUniqueMCQs(questions: any[],level :any) {
  try {
    await connect();
    // console.log(level)
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
export async function POST(request: NextRequest) {
  try {
    await connect();
    const data = await request.json();


    if (!data.userId || !data.startTime || !data.endTime || !data.questions) {
      return NextResponse.json({ success: false, message: 'Missing required fields' }, { status: 400 });
    }
    console.log("data.attemptId",data.attemptId)
    const exists = await QuizResult.findOne({ attemptId: data.attemptId });
    if (exists) {
      return NextResponse.json({ success: false, message: 'Quiz result already saved.' }, { status: 409 });
    }
    const quizResult = new QuizResult({
      userId: data.userId,
      examType: data.examType,
      subject: data.subject,
      difficulty: data.difficulty,
      startTime: new Date(data.startTime),
      endTime: new Date(data.endTime),
      totalQuestions: data.totalQuestions,
      solvedQuestions: data.solvedQuestions,
      totalTimeTaken: data.totalTimeTaken,
      totalMarks: data.totalMarks,
      obtainedMarks: data.obtainedMarks,
      questions: data.questions,
      isPassed: data.isPassed,
      percentage: data.percentage,
      attemptId: data.attemptId,
    });

    const savedResult = await quizResult.save();

    return NextResponse.json({ success: true, data: savedResult }, { status: 201 });
  } catch (error) {
    console.error('Error saving quiz result:', error);
    return NextResponse.json({ success: false, message: 'Server Error' }, { status: 500 });
  }
}