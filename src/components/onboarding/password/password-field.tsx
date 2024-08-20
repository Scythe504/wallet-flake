'use client'
import { Input } from "@/components/ui/input"
import { MnemonicFooter } from "../footer"
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

export const PasswordField = () => {
    const [firstInput, setFirstInput] = useState<Boolean>(false);
    const [secondInput, setSecInput] = useState<Boolean>(false);
    const handleClick = ()=> {
        // todo
    }
    return <div className="w-full flex flex-col px-2 gap-4 pt-4">
        <div className="flex flex-row items-center gap-2">
            <Input placeholder="Enter Password" className="dark:bg-zinc-900/20 bg-zinc-300/20 h-12 text-md" type={firstInput ? "text" : "password"} />
            <span onClick={() => setFirstInput(!firstInput)}>{firstInput ? <EyeOff /> : <Eye />}</span>
        </div>
        <div className="flex flex-row items-center gap-2">
            <Input placeholder="Confirm Password" className="dark:bg-zinc-900/20 bg-zinc-300/20 h-12 text-md" type={secondInput ? "text" : "password"} />
            <span onClick={() => setSecInput(!secondInput)}>{secondInput ? <EyeOff /> : <Eye />}</span>
        </div>
        <div className="translate-y-10">
            <MnemonicFooter 
            Content={<span className="gap-1 flex">
                I agree to the 
                <a className="text-blue-500" href="/terms">
                 Terms and Services
                </a>
                </span>} 
                handleClick={handleClick}
            />
        </div>
    </div>
}