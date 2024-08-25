import { useState } from "react"
import { ImportHeader } from "./import-header"
import { PhraseInput } from "./seed-phrase"

export const ImportWallet = ()=> {
    return <div className="flex w-full items-center justify-center">
        <div className="flex flex-col gap-3 md:w-[560px] h-[600px] px-4">
            <ImportHeader/>
            <PhraseInput/>
        </div>
    </div>
}