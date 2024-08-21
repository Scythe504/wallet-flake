'use client'
import { ImportWallet } from "@/components/import/import-wallet";
import { CreatePassword } from "@/components/onboarding/password/create-password";
import { Circle } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const TOTAL_STEPS = 3; // Adjust this to the total number of onboarding steps

export default function Importing() {
    const path = usePathname();
    const router = useRouter();
    const currentStep = parseInt(path.split('/importing/')[1]) || 1;
    const [progress, setProgress] = useState<React.JSX.Element[]>([]);

    const handleClick = (step: number) => {
        if (step <= currentStep) {
            router.push(`/importing/${step}`);
        }
    }

    useEffect(() => {
        const newProgress = Array(TOTAL_STEPS).fill(null).map((_, index) => {
            const stepNumber = index + 1;
            const isFilled = stepNumber <= currentStep;
            return (
                <Circle 
                    key={index}
                    className={`w-5 h-5 ${
                        isFilled ? 'fill-white/90' : 'fill-transparent'
                    } ${
                        isFilled ? 'cursor-pointer' : 'cursor-not-allowed'
                    }`}
                    onClick={() => handleClick(stepNumber)}
                />
            );
        });
        setProgress(newProgress);
    }, [currentStep]);
    
    return (
        <div className="p-5 min-h-screen flex flex-col items-center justify-center">
            {/* Render different components based on currentStep */}
            {currentStep === 1 && <CreatePassword />}
            {currentStep === 2 && <ImportWallet  />}
            {/* {currentStep === 3 && <FinishedSteps/>} */}
            {/* Add other step components here */}
            <div className="rounded-t-lg sm:min-w-[500px] p-3 px-5 translate-y-2 flex flex-row items-center justify-center gap-2">
                {progress}
            </div>
        </div>
    );
}