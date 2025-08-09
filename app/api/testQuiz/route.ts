import quiz from "@/models/QuizResult";
import { connect } from "@/dbConfig/dbConfig";
// import { authorize } from "@/middleware/authorize";
import { type NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

connect();

// Create a new quiz (superuser or teacher)
export async function POST(request: NextRequest) {
  try {
    

    const reqBody = await request.json();
    const { subject, level, questions, createdBy } = reqBody;

    // Validate required fields
    if (!subject || !level || !questions || !Array.isArray(questions) || questions.length === 0) {
      return NextResponse.json({
        error: "Missing required fields",
        details: "Subject, level, and at least one question are required",
      }, { status: 400 });
    }

    // Validate questions format
    // for (let index = 0; index < questions.length; index++) {
    //   const q = questions[index];
    //   if (!q.question || !Array.isArray(q.options) || q.options.length < 2 || !q.correctAnswer) {
    //     return NextResponse.json({
    //       error: "Invalid question format",
    //       details: `Each question must have a question text, at least 2 options, and a correct answer. Error at index ${index}`,
    //     }, { status: 400 });
    //   }
    // }

    // Create new quiz document
    const newQuiz = new (quiz)({
      subject,
      level,
      questions,
      createdBy: createdBy || "manual", // default to 'manual' if not provided
    });

    const savedQuiz = await newQuiz.save();

    return NextResponse.json({
      message: "Quiz created successfully",
      success: true,
      quiz: {
        id: savedQuiz._id,
        subject: savedQuiz.subject,
        level: savedQuiz.level,
        createdBy: savedQuiz.createdBy,
        createdAt: savedQuiz.createdAt,
        questionCount: savedQuiz.questions.length,
      },
    });

  } catch (error: any) {
    console.error("Error creating quiz:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
