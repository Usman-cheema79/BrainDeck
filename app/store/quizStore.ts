import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface Question {
    category: string;
    correct_answer: string;
    difficulty: string;
    explanation: string;
    level: string;
    options: string[];
    question: string;
}

interface QuizState {
    questions: Question[];
    currentIndex: number;
    selectedAnswers: Record<number, string>;
    isQuizActive: boolean;
    setQuiz: (questions: Question[], duration: number) => void;
    selectAnswer: (index: number, answer: string) => void;
    nextQuestion: () => void;
    prevQuestion: () => void;
    endQuiz: () => void;
    endTime: number | null;
}

export const useQuizStore = create<QuizState>()(
    persist(
        (set) => ({
            questions: [],
            currentIndex: 0,
            selectedAnswers: {},
            isQuizActive: false,
            endTime: null,
            setQuiz: (questions, duration) =>
                set({ questions, currentIndex: 0, selectedAnswers: {}, isQuizActive: true, endTime: Date.now() + duration * 1000 }),
            selectAnswer: (index, answer) =>
                set((state) => ({
                    selectedAnswers: { ...state.selectedAnswers, [index]: answer },
                })),
            nextQuestion: () =>
                set((state) => ({
                    currentIndex: Math.min(state.currentIndex + 1, state.questions.length - 1),
                })),
            prevQuestion: () =>
                set((state) => ({
                    currentIndex: Math.max(state.currentIndex - 1, 0),
                })),
            endQuiz: () =>
                set((state) => ({
                    ...state,
                    isQuizActive: false,
                    endTime: Date.now(),
                })),
        }),
        {
            name: 'quiz-storage',
        }
    )
);
