'use client'
import Image from "next/image"
import flake_light from '../../../../public/fragments-light.svg'
import flake_dark from '../../../../public/fragments.svg'
import { ModeToggle } from "@/components/ui/mode-toggle"
import { useTheme } from "next-themes"
import React from "react"

export const OnboardingNavbar = ({
    children
}: {
    children?: React.JSX.Element
}) => {
    const { theme } = useTheme();
    return <nav className="sm:p-6 absolute top-0 left-0 z-10 shadow-xl shadow-zinc-800/30 w-full sm:px-20 px-8 p-6 h-24">
        <div className="flex flex-row justify-between items-center">
            <div className="font-semibold sm:text-3xl text-xl">
                <a className="flex items-center gap-2">
                    <Image src={(
                        theme === "dark" ||
                        theme === undefined ||
                        theme === "system") ? flake_light : flake_dark}
                        alt="logo" height={30} width={40}
                    />
                    <p>Flake</p>
                </a>
            </div>
            {children}
            <ModeToggle />
        </div>
    </nav>
}