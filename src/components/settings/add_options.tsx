'use client'
import { storageObject, WalletManager } from "@/utils/wallet";
import React, { useEffect, useState } from "react"
import { Input } from "../ui/input";
import { ChevronRight } from "lucide-react";
import { Button } from "../ui/button";
import { AnimatePresence, motion } from "framer-motion";
import { toast } from "../ui/use-toast";
import { useRouter } from "next/navigation";

export const AddOptions = () => {
    const [wallets, setWallets] = useState<storageObject>({});
    const [phraseIdx, setPhraseIdx] = useState(0);
    const [name, setName] = useState("");
    const [wallet_len, setWalletLength] = useState(0);
    const [navbarHeight, setNavbarHeight] = useState(0)
    const router = useRouter();

    useEffect(() => {
        // Get the navbar height
        const navbar = document.querySelector('nav') // Adjust this selector if needed
        if (navbar) {
            setNavbarHeight(navbar.offsetHeight)
        }
    }, [])
    const wallet = WalletManager.getInstance();
    useEffect(() => {   
        const walletPhrases = wallet.getStorage();
        setWallets(walletPhrases);
        const currentWallet = Object.keys(walletPhrases)[phraseIdx];
        const wallet_length = (Object.values(walletPhrases[currentWallet]).length)++;
        setName(`Account ${wallet_length+1}`);
        setWalletLength(wallet_length);
    }, [phraseIdx])

    const [selectedAction, setSelectedAction] = useState<React.JSX.Element | null>(null)

    const handleClick = () => {
        setSelectedAction(<ChooseWallets />)
    }

    const closeSlideUp = ({
        idx,
    }: {
        idx: number
    }) => {
        setPhraseIdx(idx)
        setSelectedAction(null)
    }



    const ChooseWallets = () => {
        return <div>
            <div className="">
                {
                    Object.keys(wallets).map((phrase, idx) => {
                        const wallet_length = (Object.values(wallets[phrase]).length)++;
                        return (

                            <div className="h-[70px] text-xl"
                                key={idx}
                                onClick={() => closeSlideUp({ idx })}
                            >
                                <div className="flex flex-col gap-2">
                                    <Button
                                        variant={"default"}
                                        className="w-full dark:bg-zinc-900/65 bg-zinc-300/65 text-white h-[70px] text-xl items-center justify-between"
                                    >
                                        <span className="flex flex-row gap-2 items-center justify-center">
                                            <p>Secret Phrase {idx + 1}</p> <p className="text-zinc-400">({wallet_length} Accounts)</p>
                                        </span>
                                        <ChevronRight
                                            color="gray"
                                            size={30}
                                        />
                                    </Button>
                                </div>
                            </div>
                        )
                    }
                    )
                }
            </div>
        </div>
    }

    const ChooseWalletButton = () => {
        return <div className="h-[70px] text-xl">
            <div className="flex flex-col gap-2">
                <p className="text-zinc-400">Secret Phrase</p>
                <Button
                    title={`Phrase ${1}`}
                    variant={"default"}
                    className="w-full dark:bg-zinc-900/65 bg-zinc-300/65 text-white h-[70px] text-xl items-center justify-between"
                    onClick={handleClick}
                >
                    <span className="flex flex-row gap-2 items-center justify-center">
                        <p>Secret Phrase {phraseIdx + 1}</p> <p className="text-zinc-400">({wallet_len} Accounts)</p>
                    </span>
                    <ChevronRight
                        color="gray"
                        size={30}
                    />
                </Button>
                <p className="text-zinc-400 text-lg">Your new account will be generated from this Secret Phrase</p>
            </div>
        </div>
    }

    const handleWallet = () => {
        const added = wallet.addWallet(name, Object.keys(wallets)[phraseIdx])
        if (added !== null) {
            toast({
                description: "Account Created Successfully"
            })
            router.push('/dashboard');
        } else {
            toast({
                description: "Please Try again"
            })
        }
    }

    const SlideUp = () => {

        return <div className="py-4 relative px-4">
            {selectedAction && (
                <motion.div
                    initial={{ y: "100%" }}
                    animate={{ y: 0 }}
                    exit={{ y: "100%" }}
                    transition={{ type: "spring", damping: 30, stiffness: 500 }}
                    className="fixed left-4 right-4 bottom-0 bg-white dark:bg-black z-50 overflow-y-auto"
                    style={{
                        top: `${navbarHeight}px`,
                        height: `calc(100% - ${navbarHeight}px)`
                    }}
                >
                    <div className="relative h-full">
                        <div className="p-1 pt-16">
                            {selectedAction}
                        </div>
                        <div className="w-full fixed bottom-0 left-0 px-4 py-5 border-t h-24 flex items-center">
                            <Button
                                onClick={() => setSelectedAction(null)}
                                variant={"secondary"}
                                className="w-full h-[55px] text-lg font-semibold dark:bg-zinc-900/65 bg-zinc-300/65"
                            >
                                Close
                            </Button>
                        </div>
                    </div>
                </motion.div>
            )}
        </div>
    }

    return <div className="px-4 w-full">
        <div className="w-full flex flex-col gap-4">
            <Input
                onChange={e => setName(e.target.value)}
                value={name}
                className="h-[70px] px-6 text-xl"
                placeholder="Wallet Name"
            />
            <ChooseWalletButton />
            <div className="w-[calc(100 - 1rem)] h-[60px] fixed bottom-[calc(98px)] left-4 right-4">
                <Button className="w-full h-full text-lg font-semibold"
                    onClick={handleWallet}
                >
                    Create
                </Button>
            </div>
            <AnimatePresence>
                {selectedAction && <SlideUp />}
            </AnimatePresence>
        </div>
    </div>
}