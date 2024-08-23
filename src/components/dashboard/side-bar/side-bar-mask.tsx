'use client'
import { Button } from "@/components/ui/button";
import { LucideArrowLeft } from "lucide-react";
import { useState } from "react"
import { SideBar } from "./side-bar";

export const SideBarMask = ({
    vis
}: {
    vis: boolean
}) => {
    const [visible, setIsVisible] = useState(vis);
    const handleClick = () => {
        setIsVisible(!visible);
    }

    return <>
        {vis && (<div className="absolute left-1">
            <Button
                variant={"ghost"}
                onClick={handleClick}
            >
                <LucideArrowLeft />
            </Button>
            <SideBar
                
            />
        </div>
        )}
    </>
}