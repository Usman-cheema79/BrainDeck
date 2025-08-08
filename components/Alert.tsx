"use client";
import { useEffect } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { CheckCircle2Icon, AlertTriangleIcon, XCircleIcon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type AlertType = "success" | "error" | "warning";

interface DynamicAlertProps {
    type: AlertType;
    title: string;
    description: string;
    duration?: number; // in ms
    onClose: () => void;
}

export default function DynamicAlert({
                                         type,
                                         title,
                                         description,
                                         duration = 3000,
                                         onClose,
                                     }: DynamicAlertProps) {
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose();
        }, duration);

        return () => clearTimeout(timer);
    }, [duration, onClose]);

    const getIcon = () => {
        switch (type) {
            case "success":
                return <CheckCircle2Icon className="text-green-600" />;
            case "error":
                return <XCircleIcon className="text-red-600" />;
            case "warning":
                return <AlertTriangleIcon className="text-yellow-600" />;
        }
    };

    const getBgColor = () => {
        switch (type) {
            case "success":
                return "bg-green-100 border-green-500";
            case "error":
                return "bg-red-100 border-red-500";
            case "warning":
                return "bg-yellow-100 border-yellow-500";
        }
    };

    return (
        <AnimatePresence>
                <motion.div
                    className="fixed top-4 left-1/3 -translate-x-1/2 z-50 animate-slideDown"
                    initial={{ y: -50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -50, opacity: 0 }}
                    transition={{ duration: 0.6, ease: "easeInOut" }}
                >
                    <Alert className={`${getBgColor()} border-2`}>
                        {getIcon()}
                        <div>
                            <AlertTitle>{title}</AlertTitle>
                            <AlertDescription>{description}</AlertDescription>
                        </div>
                    </Alert>
                </motion.div>
        </AnimatePresence>
    );
}
