'use client'
import Lottie from 'react-lottie-player'
import finishAnimation from '@/animations/finish-onboarding.json'
import { FinishedOnboardingFooter } from './finish-footer'
import { useEffect, useState } from 'react';
import { wallet_map, WalletManager } from '@/utils/wallet';
import { useRouter } from 'next/navigation';  // Change this import

export const FinishedSteps = (
//     phrase,
// }: {
//     phrase : string,
) => {
    const [onboarding, setOnboarding] = useState(false);
    const [message, setMessage] = useState<"Processing" | "Failed" | "Finished">("Processing");
    const router = useRouter();
    
    return (
        <div className='flex flex-col md:w-[500px] p-4 border rounded-lg shadow-zinc-900/65 shadow-md'>
            <div className='flex flex-col items-center'>
                <h1 className='text-4xl font-semibold'>
                    {message}
                </h1>
                <Lottie
                    loop
                    animationData={finishAnimation}
                    play
                    className='h-[400px] w-full'
                />
            </div>
            {message === "Finished" && <FinishedOnboardingFooter />}
        </div>
    );
}