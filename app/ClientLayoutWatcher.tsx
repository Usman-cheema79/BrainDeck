"use client";

import { useQuizStore } from "@/app/store/quizStore";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ClientLayoutWatcher() {
    const { isQuizActive } = useQuizStore();
    const pathname = usePathname();
    const router = useRouter();

    useEffect(() => {
        if (isQuizActive && pathname !== "/dashboard/quiz-system/quiz") {
            router.push("/dashboard/quiz-system/quiz");
        }
    }, [isQuizActive, pathname, router]);

    return null;
}
