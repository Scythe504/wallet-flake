'use client'
import { MnemonicFooter } from "../footer"
import { MnemonicHeader } from "./header"
import { Phrases } from "./phrases"

export const Mnemonics = ()=> {
    return <div className="flex flex-col items-center h-full w-full p-5 sm:p-20 gap-6">
        <MnemonicHeader/>
        <Phrases/>
        <MnemonicFooter Content={<p>I saved my recovery phase securely</p>} />
    </div>
}