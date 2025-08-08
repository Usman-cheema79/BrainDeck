"use client";
import { useQuizStore } from "@/app/store/quizStore";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { AlertCircleIcon, CheckCircle2Icon, PopcornIcon } from "lucide-react"
import {
    Alert,
    AlertDescription,
    AlertTitle,
} from "@/components/ui/alert"

export default function QuizPage() {
    const router = useRouter();
    const { questions, currentIndex, selectedAnswers, selectAnswer, nextQuestion, prevQuestion, isQuizActive } = useQuizStore();
    const { endTime, endQuiz } = useQuizStore();
    const [timeLeft, setTimeLeft] = useState(0);
    const [showAlert, setShowAlert] = useState(false);


    useEffect(() => {
        if (!isQuizActive || !endTime) {
            handleQuizEnd();
            return;
        }

        const remaining = Math.floor((endTime - Date.now()) / 1000);
        setTimeLeft(remaining > 0 ? remaining : 0);

        const timer = setInterval(() => {
            if (!endTime) return;

            const newRemaining = Math.floor((endTime - Date.now()) / 1000);

            if (newRemaining <= 0) {
                clearInterval(timer);
                handleQuizEnd();
            } else {
                setTimeLeft(newRemaining);
            }
        }, 1000);

        return () => clearInterval(timer);
    }, [isQuizActive, endTime, endQuiz, router]);


    const handleQuizEnd = () => {
        setShowAlert(true);
        setTimeout(() => {
            endQuiz();
            router.push("/dashboard/quiz-system/results");
        }, 3000);
    };
    const q = questions[currentIndex];

    return (
        <div className="max-w-2xl mx-auto mt-10">
            {showAlert && (
                <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 animate-slideDown">
                    <Alert>
                        <CheckCircle2Icon />
                        <AlertTitle>Quiz Completed!</AlertTitle>
                        <AlertDescription>
                            Redirecting to results...
                        </AlertDescription>
                    </Alert>
                </div>
            )}

            <div className="flex justify-between mb-4">
                <span>Question {currentIndex + 1} / {questions.length}</span>
                <span>Time Left: {Math.floor(timeLeft / 60)}:{String(timeLeft % 60).padStart(2, "0")}</span>
            </div>

            <Card className="p-6">
                <h2 className="mb-4 font-bold">{q?.question}</h2>
                <div className="space-y-2">
                    {q?.options.map((opt, i) => (
                        <Button
                            key={i}
                            variant={selectedAnswers[currentIndex] === opt ? "default" : "outline"}
                            className="w-full justify-start"
                            onClick={() => selectAnswer(currentIndex, opt)}
                        >
                            {opt}
                        </Button>
                    ))}
                </div>
            </Card>

            <div className="flex justify-between mt-6">
                <Button disabled={currentIndex === 0} onClick={prevQuestion}>Previous</Button>
                <Button
                    disabled={!selectedAnswers[currentIndex]}
                    onClick={() => {
                        if (currentIndex === questions.length - 1) {
                            useQuizStore.getState().endQuiz();
                            handleQuizEnd();
                        } else {
                            nextQuestion();
                        }
                    }}
                >
                    {currentIndex === questions.length - 1 ? "Finish" : "Next"}
                </Button>
            </div>

            <div className="flex gap-2 mt-4 flex-wrap">
                {questions.map((_, i) => (
                    <Button
                        key={i}
                        variant={currentIndex === i ? "default" : "outline"}
                        disabled={i > currentIndex}
                    >
                        {i + 1}
                    </Button>
                ))}
            </div>
        </div>
    );
}
