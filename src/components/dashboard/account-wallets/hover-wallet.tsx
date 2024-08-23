'use client'
import { LucideCopy } from "lucide-react"
import { useState } from "react";
import { SideBarMask } from "../side-bar/side-bar-mask";

export const HoverAccount = () => {
    const currentAccount = window.localStorage.getItem('currentAccount');
    const [isVisible, setIsVisible] = useState(false);

    return <div className="mr-6 text-lg mt-1 font-semibold 
            flex flex-row items-center gap-2"
            onClick={()=>setIsVisible(!isVisible)}
            >
            <SideBarMask
                vis={isVisible}
            />
            <p>{currentAccount as string}</p>
            <LucideCopy
                strokeOpacity={60 / 100}
                size={20}
            />
        </div>
}