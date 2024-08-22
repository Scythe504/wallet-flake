import Lottie from 'react-lottie-player'
import finishAnimation from '@/animations/finish-onboarding.json'
import { FinishedFooter } from './finish-footer'
import { FinishedHeader } from './finish-header';

export const FinishedSteps = () => {  

    return (
        <div className='flex flex-col md:w-[500px] p-4 border rounded-lg shadow-zinc-900/65 shadow-md'>
            <div className='flex flex-col items-center'>
                <FinishedHeader/>
                <Lottie
                    loop
                    animationData={finishAnimation}
                    play
                    className='h-[400px] w-full'
                />
            </div>
            <FinishedFooter/>
        </div>
    );
}