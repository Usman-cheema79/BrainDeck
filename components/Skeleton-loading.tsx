import { Skeleton } from "@/components/ui/skeleton";

export default function QuizSkeleton() {
    return (
        <div className="max-w-2xl mx-auto p-4 space-y-6">

            {/*<Skeleton className="h-[125px] w-[250px] rounded-xl"/>*/}
            <Skeleton className="h-8 w-3/4 mx-auto"/>
            {/* Options */}
            <div className="space-y-3">
                <Skeleton className="h-12 w-full rounded-lg"/>
                <Skeleton className="h-12 w-full rounded-lg"/>
                <Skeleton className="h-12 w-full rounded-lg"/>
                <Skeleton className="h-12 w-full rounded-lg"/>
            </div>

            {/* Next button */}
            <div className="flex justify-center">
                <Skeleton className="h-12 w-32 rounded-lg"/>
            </div>

            {/*<div role="status" className="space-y-2.5 animate-pulse max-w-lg">*/}
            {/*    <div className="flex items-center w-full">*/}
            {/*        <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-32"></div>*/}
            {/*        <div className="h-2.5 ms-2 bg-gray-300 rounded-full dark:bg-gray-600 w-24"></div>*/}
            {/*        <div className="h-2.5 ms-2 bg-gray-300 rounded-full dark:bg-gray-600 w-full"></div>*/}
            {/*    </div>*/}
            {/*    <div className="flex items-center w-full max-w-[480px]">*/}
            {/*        <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-full"></div>*/}
            {/*        <div className="h-2.5 ms-2 bg-gray-300 rounded-full dark:bg-gray-600 w-full"></div>*/}
            {/*        <div className="h-2.5 ms-2 bg-gray-300 rounded-full dark:bg-gray-600 w-24"></div>*/}
            {/*    </div>*/}
            {/*    <div className="flex items-center w-full max-w-[400px]">*/}
            {/*        <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-full"></div>*/}
            {/*        <div className="h-2.5 ms-2 bg-gray-200 rounded-full dark:bg-gray-700 w-80"></div>*/}
            {/*        <div className="h-2.5 ms-2 bg-gray-300 rounded-full dark:bg-gray-600 w-full"></div>*/}
            {/*    </div>*/}
            {/*    <div className="flex items-center w-full max-w-[480px]">*/}
            {/*        <div className="h-2.5 ms-2 bg-gray-200 rounded-full dark:bg-gray-700 w-full"></div>*/}
            {/*        <div className="h-2.5 ms-2 bg-gray-300 rounded-full dark:bg-gray-600 w-full"></div>*/}
            {/*        <div className="h-2.5 ms-2 bg-gray-300 rounded-full dark:bg-gray-600 w-24"></div>*/}
            {/*    </div>*/}
            {/*    <div className="flex items-center w-full max-w-[440px]">*/}
            {/*        <div className="h-2.5 ms-2 bg-gray-300 rounded-full dark:bg-gray-600 w-32"></div>*/}
            {/*        <div className="h-2.5 ms-2 bg-gray-300 rounded-full dark:bg-gray-600 w-24"></div>*/}
            {/*        <div className="h-2.5 ms-2 bg-gray-200 rounded-full dark:bg-gray-700 w-full"></div>*/}
            {/*    </div>*/}
            {/*    <div className="flex items-center w-full max-w-[360px]">*/}
            {/*        <div className="h-2.5 ms-2 bg-gray-300 rounded-full dark:bg-gray-600 w-full"></div>*/}
            {/*        <div className="h-2.5 ms-2 bg-gray-200 rounded-full dark:bg-gray-700 w-80"></div>*/}
            {/*        <div className="h-2.5 ms-2 bg-gray-300 rounded-full dark:bg-gray-600 w-full"></div>*/}
            {/*    </div>*/}
            {/*    <span className="sr-only">Loading...</span>*/}
            {/*</div>*/}

        </div>
    );
}
