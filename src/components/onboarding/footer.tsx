import { useEffect, useState } from "react"
import { Button } from "../ui/button"
import { Checkbox } from "../ui/checkbox"

export const MnemonicFooter = ({Content, handleClick}: {
    Content: JSX.Element
    handleClick: ()=>void
}) => {
    const [isChecked, setIsChecked] = useState(false);
    
    return <div className="flex flex-col gap-5">
        <div className="flex flex-row gap-2 items-center justify-center">
            <Checkbox className="size-5" onClick={()=>setIsChecked(!isChecked)}/>
            <p className="text-black/65 dark:text-white/65 text-sm md:text-base ">{Content}</p>
        </div>
        <Button className="text-base font-semibold"
            disabled={!isChecked}
            onClick={handleClick}
        >Next</Button>
    </div>
}