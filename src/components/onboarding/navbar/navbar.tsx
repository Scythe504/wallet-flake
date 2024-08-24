'use client'
import Image from "next/image"
import flake_light from '../../../../public/fragments-light.svg'
import flake_dark from '../../../../public/fragments.svg'
import { ModeToggle } from "@/components/ui/mode-toggle"
import { useTheme } from "next-themes"
import React, { useState } from "react"
import { Button } from "@/components/ui/button"

export const  OnboardingNavbar = ({
    children,
    enableSidebar
}: {
    children?: React.ReactNode,
    enableSidebar: boolean
}) =>{
    const { theme } = useTheme();

    return <nav className="sm:p-6 fixed top-0 left-0 right-0 z-10 shadow-xl shadow-zinc-800/30 w-full sm:px-20 px-8 p-6 h-24">
        <div className="flex flex-row justify-between items-center">
            <div className="font-semibold sm:text-3xl text-lg">
                <div className="flex gap-1 items-center">
                    <div>
                        <Image src={(
                            theme === "dark" ||
                            theme === undefined ||
                            theme === "system") ? flake_light : flake_dark}
                            alt="logo" height={30} width={32}
                        />
                    </div>
                    <p>Flake</p>
                </div>
            </div>
            <div className="sm:mr-12">
                {children}
            </div>
            <ModeToggle />
        </div>
    </nav>
}