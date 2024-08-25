'use client'
import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Receive } from "../actions/receive"
import { Send } from "../actions/send"
import { Swap } from "../actions/swap"
import { DollarSign, LucideArrowRightLeft, LucidePlus, LucideSend, SendIcon, X } from "lucide-react"
import { SendToken } from '@/components/sendtoken/sendtoken'
import { TokenFooter } from '@/components/sendtoken/sendtoken-footer'

interface action {
    label: string,
    icon: React.JSX.Element,
    component: React.JSX.Element
}

export const GroupedActions = () => {
    const [selectedAction, setSelectedAction] = useState<action | null>(null)
    const [navbarHeight, setNavbarHeight] = useState(0)

    useEffect(() => {
        // Get the navbar height
        const navbar = document.querySelector('nav') // Adjust this selector if needed
        if (navbar) {
            setNavbarHeight(navbar.offsetHeight)
        }
    }, [])

    const handleClick = (action: action) => {
        setSelectedAction(action)
    }

    const closeSlideUp = () => {
        setSelectedAction(null)
    }
    const actions: action[] = [
        {
            label: "Receive",
            icon: <LucidePlus size={27} />,
            component: <Receive />
        },
        {
            label: "Send",
            icon: <LucideSend size={27} />,
            component: <Send />
        },
        {
            label: "Swap",
            icon: <LucideArrowRightLeft size={27} />,
            component: <Swap />
        },
        {
            label: "Get SOL",
            icon: <DollarSign size={27} />,
            component: <SendToken
                title={'Airdrop'}
                handleClose={closeSlideUp}
            />
        }
    ]



    return (
        <div className="py-4 relative px-4">
            <div className="flex flex-row h-[100px] w-full items-center justify-center gap-2">
                {actions.map((action, idx) => (
                    <Button
                        key={idx}
                        onClick={() => handleClick(action)}
                        className="h-[85px] w-[85px] sm:h-[110px] sm:w-[110px] rounded-xl flex flex-col font-semibold dark:bg-zinc-900/65 gap-2 bg-zinc-300/65"
                        variant={"outline"}
                    >
                        <span>{action.icon}</span>
                        <p className="dark:text-zinc-300/65 text-zinc-900/65 text-lg">{action.label}</p>
                    </Button>
                ))}
            </div>

            <AnimatePresence>
                {selectedAction && (
                    <motion.div
                        initial={{ y: "100%" }}
                        animate={{ y: 0 }}
                        exit={{ y: "100%" }}
                        transition={{ type: "spring", damping: 30, stiffness: 500 }}
                        className="fixed left-0 right-0 bottom-0 bg-white dark:bg-black z-50 overflow-y-auto"
                        style={{
                            top: `${navbarHeight}px`,
                            height: `calc(100% - ${navbarHeight}px)`
                        }}
                    >
                        <div className="relative h-full">
                            <div className="p-1 pt-16">
                                {selectedAction.component}
                            </div>
                            {
                                selectedAction.label !== "Get SOL" &&
                                <div className="w-full fixed bottom-0 left-0 px-4 py-5 border-t h-24 flex items-center">
                                    <Button
                                        onClick={closeSlideUp}
                                        variant={"secondary"}
                                        className="w-full h-[55px] text-lg font-semibold dark:bg-zinc-900/65 bg-zinc-300/65"
                                    >
                                        Close
                                    </Button>
                                </div>
                            }
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}