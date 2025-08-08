"use client";

import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Toaster } from '@/components/ui/toaster';
import { AuthProvider } from '@/context/AuthContext';
import { useQuizStore } from "@/app/store/quizStore";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

const inter = Inter({ subsets: ['latin'] });

// export const metadata: Metadata = {
//     title: 'BrainDeck - AI-Powered Study & Interview Companion',
//     description: 'Your all-in-one platform for exam preparation, interview practice, and academic success with AI-powered tools.',
// };

export default function RootLayout({children,}: {
    children: React.ReactNode;
}) {
    const { isQuizActive } = useQuizStore();
    const pathname = usePathname();
    const router = useRouter();
    console.log(isQuizActive)
    useEffect(() => {
        if (isQuizActive && pathname !== "/dashboard/quiz-system/quiz") {
            router.push("/dashboard/quiz-system/quiz");
        }
    }, [isQuizActive, pathname, router]);
    return (
        <html lang="en">
        <body className={inter.className}>
           <AuthProvider>
            {children}
             <Toaster />
           </AuthProvider>
        </body>
        </html>
    );
}
