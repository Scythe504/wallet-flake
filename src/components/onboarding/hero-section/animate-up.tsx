'use client'
import { ScrollBar } from '@/components/ui/scroll-area';
import { motion } from 'framer-motion';
import React from 'react';

export const AnimatedComponent = ({ children }: {
    children: React.ReactNode
}) => {
    return (
        <motion.div
            className='max-h-[calc(100vh-8rem)] fixed top-[8rem] left-4 right-4 z-20'
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
        >
            {children}
        </motion.div>
    );
};

