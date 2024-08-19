'use client'
import { Input } from "@/components/ui/input"
import { MnemonicFooter } from "../mnemonic/footer"

export const PasswordField = ()=> {
    return <div className="w-full flex flex-col px-2 gap-4 pt-4">
        <Input placeholder="Enter Password" className="dark:bg-zinc-900/20 bg-zinc-300/20 h-12 text-md"/>
        <Input placeholder="Confirm Password" className="dark:bg-zinc-900/20 bg-zinc-300/20 h-12 text-md"/>
        <div className="translate-y-6">
        <MnemonicFooter Content="I agree to the terms and service"/>
        </div>
    </div>
}