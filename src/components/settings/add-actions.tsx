'use client'
import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { AddWallet } from './add_account'
import { LucideImport, LucidePlus } from "lucide-react"
import { ImportWallet } from '../import/import-wallet'
import { AddOptions } from './add_options'
import { useRouter } from 'next/navigation'

interface action {
    label: string,
    icon: React.JSX.Element,
    component: React.JSX.Element
}

export const AddActions = () => {
    const [selectedAction, setSelectedAction] = useState<action | null>(null)
    const [navbarHeight, setNavbarHeight] = useState(0)
    const router = useRouter();

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
            label: "Add a new multi-chain wallet",
            icon: <LucidePlus size={27} />,
            component: <AddOptions />
        },
        {
            label: "Import an existing wallet",
            icon: <LucideImport size={27} />,
            component: <ImportWallet />
        },
    ]



    return (
        <div className="py-4 relative px-4 w-screen pt-28">
            <div className="flex flex-col justify-center items-center w-full gap-4 h-1/2">
                {actions.map((action, idx) => (
                    <AddWallet
                        key={idx}
                        title={action.label}
                        icon={action.icon}
                        handleClick={() => handleClick(action)}
                    />
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
            <div>
                <Button
                    className='fixed bottom-4 left-4 right-4 h-[55px] text-lg
                    dark:bg-zinc-900/65 dark:text-white bg-zinc-300/65
                    '
                    onClick={()=> router.push("/dashboard")}
                >
                    Close
                </Button>
            </div>
        </div >
    )
}