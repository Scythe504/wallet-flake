'use client'
import { useRouter } from "next/navigation"
import { MnemonicFooter } from "../footer"
import { MnemonicHeader } from "./header"
import { Phrases } from "./phrases"

export const Mnemonics = () => {
    const router = useRouter();
    // return <div className="flex flex-col items-center h-full w-full p-5 sm:p-20 gap-6">
    const handleClick = () => {
        router.push('/onboarding/3');
    }
    return <div className="p-2 rounded-b-lg flex flex-col gap-2 pt-12">
        <MnemonicHeader />
        <Phrases />
        <div></div>
        <MnemonicFooter
            Content={<span>I saved my recovery phase securely</span>}
            handleClick={handleClick}
        />
    </div>
}