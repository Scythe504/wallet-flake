import { Currencies } from "../currencies/currency"

export const Send = ()=> {
    
    return <div className="flex flex-col gap-8 pt-8">
        <h1 className="text-5xl font-semibold text-center">Send</h1>
        <Currencies/>
    </div>
}