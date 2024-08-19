import { useEffect, useState } from "react"
import { Button } from "../../ui/button"
import { Checkbox } from "../../ui/checkbox"

export const MnemonicFooter = ({Content}: {
    Content: string
}) => {
    const [isChecked, setIsChecked] = useState(false);
    
    return <div className="flex flex-col gap-5">
        <div className="flex flex-row gap-2 items-center justify-center">
            <Checkbox className="size-5" onClick={()=>!isChecked}/>
            <p className="text-black/65 dark:text-white/65 text-sm md:text-base ">{Content}</p>
        </div>
        <Button className="text-base font-semibold">Next</Button>
    </div>
}