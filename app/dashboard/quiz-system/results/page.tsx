"use client";
import { useQuizStore } from "@/app/store/quizStore";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import mongoose from 'mongoose';
import { useAuth } from "@/context/AuthContext";
import { useState } from "react";
export default function ResultsPage() {
    const { fullUserData } = useAuth();
    const router = useRouter();
    const { questions, selectedAnswers } = useQuizStore();
    const [isSaved, setIsSaved] = useState(false);

    useEffect(() => {
        if (!questions.length) {
            router.push("/");
        }
    }, [questions, router]);

    // console.log(questions);

    const total = questions.length;
    const correctCount = questions.filter((q, i) => selectedAnswers[i] === q.correct_answer).length;
    const percentage = ((correctCount / total) * 100).toFixed(2);
    const totalQuestions = questions.length;
    // useQuizStore.getState().endQuiz();
    const prepareResultData = () => {
        const attemptId = useQuizStore.getState().attemptId;
        const data = {
            userId: fullUserData?._id || "",
            attemptId: attemptId,
            examType: "final",
            subject: questions[0]?.category || "N/A",
            difficulty: questions[0]?.difficulty || "",
            startTime: new Date(Date.now() - 600000).toISOString(),
            endTime: new Date().toISOString(),
            totalQuestions,
            solvedQuestions: Object.values(selectedAnswers).filter(Boolean).length,
            totalTimeTaken: 600,
            totalMarks: totalQuestions,
            obtainedMarks: correctCount,
            questions: questions.map((q, i) => ({
                questionId: new mongoose.Types.ObjectId().toString(),
                questionText: q.question,
                options: q.options,
                correctAnswer: q.correct_answer,
                selectedAnswer: selectedAnswers[i],
                explanation: q.explanation || "",
            })),
            isPassed: Number(percentage) >= 50,
            percentage: Number(percentage),
        };
        return data;
    };

    async function saveQuizResult() {
        if (isSaved) return;
        setIsSaved(true);

        const data = prepareResultData();
        // console.log(data)
        try {
            const res = await fetch(
                `/api/quiz`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data)
                }
            );

            const json = await res.json();

            if (res.ok && json.success) {
                // console.log(json)
            } else {
                // console.log(json)
            }
        } catch (error) {
            console.log("fail to save quiz in DB:",error)
        }
    }
    useEffect(() => {
        saveQuizResult();
    }, []);
    return (
        <div className="max-w-3xl mx-auto p-6">
            <h1 className="text-3xl font-bold mb-4">Quiz Results</h1>

            <Card className="p-6 mb-6 shadow-md">
                <h1 className="text-2xl font-bold mb-4">Quiz Results</h1>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    <div>
                        <p className="font-semibold">Total Questions:</p>
                        <p>{total}</p>
                    </div>
                    <div>
                        <p className="font-semibold">Obtained Marks:</p>
                        <p>{correctCount}</p>
                    </div>
                    <div>
                        <p className="font-semibold">Total Marks:</p>
                        <p>{totalQuestions}</p>
                    </div>
                    <div>
                        <p className="font-semibold">Percentage:</p>
                        <p>{percentage}%</p>
                    </div>
                    <div>
                        <p className="font-semibold">Subject:</p>
                        <p>{questions[0]?.category || "N/A"}</p>
                    </div>
                    <div>
                        <p className="font-semibold">Time Taken:</p>
                        <p>Auto-calculation later</p>
                    </div>
                </div>
            </Card>
            {/* Questions Review */}
            <h2 className="text-xl font-bold mb-4">Review Questions</h2>
            <div className="space-y-4">
                {questions.map((q, i) => {
                    const isCorrect = selectedAnswers[i] === q.correct_answer;
                    return (
                        <Card
                            key={i}
                            className={`p-4 shadow-md border-2 ${
                                isCorrect ? "border-green-500" : "border-red-500"
                            }`}
                        >
                            <p className="font-semibold mb-2">
                                {i + 1}. {q.question}
                            </p>
                            <div className="space-y-2">
                                {q.options.map((opt, idx) => {
                                    const isUserSelected = selectedAnswers[i] === opt;
                                    const isRightAnswer = opt === q.correct_answer;

                                    return (
                                        <div
                                            key={idx}
                                            className={`p-2 rounded ${
                                                isRightAnswer
                                                    ? "bg-green-200"
                                                    : isUserSelected && !isRightAnswer
                                                        ? "bg-red-200"
                                                        : "bg-gray-100"
                                            }`}
                                        >
                                            {opt}
                                            {isRightAnswer && (
                                                <span className="ml-2 text-green-700 font-semibold">
                          ✔ Correct
                        </span>
                                            )}
                                            {isUserSelected && !isRightAnswer && (
                                                <span className="ml-2 text-red-700 font-semibold">
                          ✘ Your Answer
                        </span>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                            {!isCorrect && q.explanation && (
                                <p className="mt-3 text-sm text-gray-700">
                                    <span className="font-semibold">Explanation: </span>
                                    {q.explanation}
                                </p>
                            )}
                        </Card>
                    );
                })}
            </div>
            <div className="mt-6 flex gap-4">
                <Button onClick={() => router.push("/dashboard")}>Go Home</Button>
                {/*<Button*/}
                {/*    variant="outline"*/}
                {/*    onClick={() => {*/}
                {/*        router.push("/dashboard/quiz-system/quiz");*/}
                {/*    }}*/}
                {/*>*/}
                {/*    Retake Quiz*/}
                {/*</Button>*/}
            </div>

        </div>
    );
}
