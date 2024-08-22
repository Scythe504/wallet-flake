'use client'
import { Button } from "@/components/ui/button";
import { LucideArrowLeft } from "lucide-react";
import { useState } from "react"

export const SideBarMask = () => {
    const [visible, setIsVisible] = useState(false);
    const handleClick = () => {
        setIsVisible(!visible);
    }

    return <Button
        variant={"ghost"}
    >
        <LucideArrowLeft />
    </Button>
}