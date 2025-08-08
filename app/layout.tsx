import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Toaster } from '@/components/ui/toaster';
import { AuthProvider } from '@/context/AuthContext';
import ClientLayoutWatcher from './ClientLayoutWatcher';
import { Brain } from 'lucide-react';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'BrainDeck - AI-Powered Study & Interview Companion',
    description: 'Your all-in-one platform for exam preparation, interview practice, and academic success with AI-powered tools.',
    icons: {
        icon: '/brain.svg?v=2', // v=2 busts cache
    },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
        <body className={inter.className}>
        <AuthProvider>
            <ClientLayoutWatcher />
            {children}
            <Toaster />
        </AuthProvider>
        </body>
        </html>
    );
}
