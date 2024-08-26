'use client'
import bs58 from 'bs58'
import { LucideCopy } from "lucide-react"
import { useEffect, useState } from "react"
import { SideBarMask } from "../side-bar/side-bar-mask"
import styled from "styled-components"
import { Accounts, currentAccount, WalletManager } from "@/utils/wallet"

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
    const [currentAccount, setCurrentAccount] = useState<currentAccount>();

    useEffect(() => {
        const wallet = WalletManager.getInstance()
        let curr: string | Accounts[] | null = window.localStorage.getItem('currentAccount');
        if(curr === null) {
            curr = JSON.stringify(wallet.getWallet() as Accounts[])
        }
        const decode = bs58.decode(curr);
        const current: currentAccount = JSON.parse(Buffer.from(decode).toString('utf8'));

        setCurrentAccount(current);
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
                <p>{currentAccount?.name}</p>
                <LucideCopy
                    strokeOpacity={60 / 100}
                    size={20}
                />
            </div>
        </div>
    )
}