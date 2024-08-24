'use client'
import { Button } from "@/components/ui/button";
import { LucideArrowLeft } from "lucide-react";
import { useState } from "react"
import { SideBar } from "./side-bar";
import { SideBarFooter } from "./side-bar-footer";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";

export const SideBarMask = ({
    vis
}: {
    vis: boolean
}) => {
    const [visible, setIsVisible] = useState(!vis);
    const handleClick = () => {
        setIsVisible(!visible);
    }

    return <>
        {vis && (
            <div className="h-full py-4 w-[80px] flex flex-col px-2">
                <div className="flex flex-col justify-start h-3/4">
                    <div className="flex flex-col items-center gap-6 h-full">
                        <Button
                            variant={"secondary"}
                            onClick={handleClick}
                        >
                            <LucideArrowLeft />
                        </Button>
                        <SideBar />
                    </div>
                </div>
                <div className="mt-auto z-20 border-t py-2 dark:border-zinc-300/65 border-zinc-900">
                    <SideBarFooter />
                </div>
            </div>
        )}
    </>
}