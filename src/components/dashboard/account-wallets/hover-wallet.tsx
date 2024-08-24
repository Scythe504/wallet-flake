'use client'

import { LucideCopy } from "lucide-react"
import { useEffect, useState } from "react"
import { SideBarMask } from "../side-bar/side-bar-mask"
import styled from "styled-components"
import { currentAccount } from "@/utils/wallet"

interface AnimatedProps {
  isVisible: boolean;
}

const AnimatedSidebar = styled.div<AnimatedProps>`
  position: absolute;
  left: 6px;
  top: 0;
  height: 100vh;
  background-color: rgba(24, 24, 27, 0.9);
  border-radius: 0.75rem;
  z-index: 20;
  transition: transform 0.3s ease-out;
  transform: ${props => props.isVisible ? 'translateX(0)' : 'translateX(-100%)'};
`

const AnimatedBackdrop = styled.div<AnimatedProps>`
  position: absolute;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  z-index: 10;
  background-color: rgba(0, 0, 0, 0.25);
  backdrop-filter: blur(5px);
  transition: opacity 0.3s ease-out;
  opacity: ${props => props.isVisible ? 1 : 0};
  pointer-events: ${props => props.isVisible ? 'auto' : 'none'};
`

export const HoverAccount = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [currentAccount, setCurrentAccount] = useState('');

    useEffect(() => {
        const curr: currentAccount = JSON.parse(window.localStorage.getItem('currentAccount')!);
        setCurrentAccount(curr.name || '');
    }, [])

    return (
        <div 
            className="sm:text-lg text-sm mt-1 font-semibold"
            onClick={() => setIsVisible(!isVisible)}
        >
            <AnimatedSidebar isVisible={isVisible} className=" z-[9999]">
                <SideBarMask vis={isVisible} />
            </AnimatedSidebar>
            <AnimatedBackdrop isVisible={isVisible} />
            <div className="flex flex-row items-center sm:gap-2 gap-1 mr-2 sm:mr-6">
                <p>{currentAccount}</p>
                <LucideCopy
                    strokeOpacity={60 / 100}
                    size={20}
                />
            </div>
        </div>
    )
}