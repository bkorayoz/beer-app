import React from 'react';
import { cn } from '@/lib/utils';
import { Lightbulb } from 'lucide-react';

interface AnswerTargetProps {
    children: React.ReactNode;
    className?: string;
}

export function AnswerTarget({ children, className }: AnswerTargetProps) {
    return (
        <div className={cn("my-6 rounded-lg border-l-4 border-beer-amber bg-muted/50 p-6", className)}>
            <div className="flex items-center gap-2 mb-2 text-beer-amber font-semibold">
                <Lightbulb className="h-5 w-5" />
                <span>Key Takeaway</span>
            </div>
            <div className="text-lg leading-relaxed">
                {children}
            </div>
        </div>
    );
}
