'use client';

import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { DivideIcon as LucideIcon } from 'lucide-react';

interface ModuleCardProps {
  module: {
    id: string;
    title: string;
    description: string;
    icon: typeof LucideIcon;
    color: string;
    href: string;
  };
}

export default function ModuleCard({ module }: ModuleCardProps) {
  const { title, description, icon: Icon, color, href } = module;

  return (
    <Link href={href}>
      <Card className="card-hover cursor-pointer group border-0 shadow-md">
        <CardHeader>
          <div className={`inline-flex h-12 w-12 items-center justify-center rounded-lg ${color} text-white mb-4 group-hover:scale-110 transition-transform duration-200`}>
            <Icon className="h-6 w-6" />
          </div>
          <CardTitle className="text-xl group-hover:text-primary transition-colors">
            {title}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <CardDescription className="text-base">
            {description}
          </CardDescription>
        </CardContent>
      </Card>
    </Link>
  );
}