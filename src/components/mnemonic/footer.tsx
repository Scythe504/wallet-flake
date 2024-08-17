import { useEffect, useState } from "react"
import { Button } from "../ui/button"
import { Checkbox } from "../ui/checkbox"

export const MnemonicFooter = () => {
    const [isChecked, setIsChecked] = useState(false);
    
    return <div className="flex flex-col gap-2">
        <div className="flex flex-row gap-2 items-center">
            <Checkbox className="size-5" onClick={()=>!isChecked}/>
            <p className="dark:text-white/70 text-sm md:text-base">I saved my secret recovery phase</p>
        </div>
        <Button className="sm:text-lg text-md font-semibold">Next</Button>
    </div>
}