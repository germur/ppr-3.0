import { motion } from 'framer-motion';
import React from 'react';

interface BentoCardProps {
    children: React.ReactNode;
    className?: string;
    href: string;
}

export default function BentoCard({ children, className, href }: BentoCardProps) {
    return (
        <motion.a
            href={href}
            className={`relative overflow-hidden rounded-3xl p-6 group transition-all duration-300 hover:shadow-xl ${className || ''}`}
            whileHover={{ y: -4 }}
        >
            {children}
        </motion.a>
    );
}
