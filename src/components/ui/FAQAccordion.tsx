import React, { useState } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';

interface FAQItemProps {
    question: string;
    answer: string;
}

interface FAQAccordionProps {
    items: FAQItemProps[];
    variant?: 'light' | 'dark' | 'auto';
}

const FAQItem = ({ question, answer, variant = 'auto' }: FAQItemProps & { variant?: 'light' | 'dark' | 'auto' }) => {
    const [isOpen, setIsOpen] = useState(false);

    const borderColor = variant === 'dark' ? 'border-slate-700' : 'border-slate-200 dark:border-slate-800';
    const questionColor = variant === 'dark' ? 'text-white' : 'text-slate-900 dark:text-white';
    const answerColor = variant === 'dark' ? 'text-slate-400' : 'text-slate-600 dark:text-slate-400';

    // Icon colors
    const iconActiveBg = variant === 'dark' ? 'bg-slate-800 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white';
    const iconInactiveColor = variant === 'dark' ? 'text-slate-500' : 'text-slate-400';

    return (
        <div className={`border-b ${borderColor}`}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full py-6 flex items-center justify-between text-left focus:outline-none group"
            >
                <span className={`text-lg font-semibold ${questionColor} group-hover:underline decoration-2 underline-offset-4 decoration-transparent group-hover:decoration-current transition-all`}>
                    {question}
                </span>
                <span className={`p-2 rounded-full transition-colors ${isOpen ? iconActiveBg : iconInactiveColor}`}>
                    {isOpen ? <Minus size={20} /> : <Plus size={20} />}
                </span>
            </button>
            <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
            >
                <p className={`pb-6 leading-relaxed ${answerColor}`}>
                    {answer}
                </p>
            </div>
        </div>
    );
};

export default function FAQAccordion({ items, variant = 'auto' }: FAQAccordionProps) {
    if (!items || !Array.isArray(items) || items.length === 0) {
        return null;
    }

    return (
        <div className="w-full flex flex-col gap-2">
            {items.map((item, index) => (
                <FAQItem key={index} {...item} variant={variant} />
            ))}
        </div>
    );
}
