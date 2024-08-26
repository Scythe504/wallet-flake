'use client'
import { solanaBlockchainConfig } from "@/blockchains-config/solana/config"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { BlockchainManager } from "@/utils/transaction"
import { LucideGitCompareArrows } from "lucide-react"
import Image from "next/image"
import React, { useEffect, useState } from "react"
import solana from '../../../../public/solana.svg'
import usdc from '../../../../public/usdc.svg'


type currency = "SOL" | "USDC";
type to = "USDC" | currency;

interface exchange {
    value?: string,
    from: currency,
    to: to
}

export const Swap = () => {
    const [currentCurrency, setCurrentCurrency] = useState<exchange>({
        from: "SOL",
        to: "USDC"
    });
    const logoUris = {
        "SOL": solana,
        "USDC" : usdc,
    }
    const [fromCurrency, setFrom] = useState("0");
    const [isLoading, setIsLoading] = useState(false);
    const [convertedVal, setConvertedVal] = useState("0");
    const blockchain = new BlockchainManager();
    useEffect(() => {
        handleSwitch();
    }, [fromCurrency])

    const handleSwitch = async () => {
        setFrom("0");
        setConvertedVal("0")
        setIsLoading(!isLoading);
        const usdc = await blockchain.getCurrentSolUsdcPrice();
        if (currentCurrency.from === "SOL") {
            setConvertedVal((parseFloat(fromCurrency) * usdc!).toFixed(2));
        }
        if (currentCurrency.from === "USDC") {
            setConvertedVal((parseFloat(fromCurrency) / parseFloat(usdc!.toFixed(2))).toFixed(2))
        }
    }

    return <div className="flex flex-col gap-4 px-4 items-center sm:-translate-y-16">
        <h1 className="text-5xl font-semibold text-center">Swap</h1>
        <div className="flex flex-col items-center justify-start max-h-[500px] tran">
            <div className="
            translate-y-4
            w-full dark:bg-zinc-900/65 h-[200px]
            rounded-xl p-8 dark:text-zinc-300/65 text-zinc-900/65
            flex flex-col gap-4
            ">
                <span className="text-2xl font-semibold">You pay</span>
                <div className="flex flex-row items-center justify-center">
                    <Input
                        className="
                         outline-none
                    bg-transparent border-0
                    text-3xl font-semibold ring-0
                    focus-visible:ring-0
                    focus-visible:outline-none
                    "
                        type="number"
                        placeholder="0"
                        onChange={e => setFrom(e.target.value)}
                    />
                    <div className="bg-zinc-800/65 flex flex-row items-center justify-center p-1 min-w-[120px] gap-2 px-2 rounded-xl">
                        <div className="h-[40px] w-[40px] bg-black rounded-full flex items-center justify-center">
                            <Image
                                src={logoUris[currentCurrency.from] || solanaBlockchainConfig.localLogoUri}
                                alt="logo"
                                height={20}
                                width={20}
                            />
                        </div>
                        <p className="text-xl font-semibold">
                            {currentCurrency.from || "SOL"}
                        </p>
                    </div>
                </div>
            </div>
            {/* BREAKPOINT  */}
            <Button
                className="rounded-full h-[60px] w-[60px] z-40 relative"
                onClick={() => {
                    const temp = currentCurrency.from
                    setCurrentCurrency({
                        value: "0",
                        from: currentCurrency.to,
                        to: temp,
                    })
                }
                }
            >
                <svg fill="none" viewBox="0 0 24 24" width="24px" height="24px" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path stroke="#3B3C40" stroke-linecap="round" stroke-linejoin="round" d="m14 15 4 4m0 0 4-4m-4 4V8a4 4 0 0 0-4-4m-4 5L6 5m0 0L2 9m4-4v11a4 4 0 0 0 4 4"></path></svg>
            </Button>
            {/*  BREAKPOINT */}
            <div className="-translate-y-4
            w-full dark:bg-zinc-900/65 h-[200px]
            rounded-xl p-8 dark:text-zinc-300/65 text-zinc-900/65
            flex flex-col gap-4
            ">
                <span className="text-2xl font-semibold">You Receive</span>
                <div className="flex flex-row items-center justify-center">
                    <Input
                        className="
                         outline-none
                    bg-transparent border-0
                    text-3xl font-semibold ring-0
                    focus-visible:ring-0
                    focus-visible:outline-none
                    "
                        type="number"
                        placeholder="0"
                        disabled={true}
                        value={convertedVal}
                    />
                    <div className="bg-zinc-800/65 flex flex-row items-center justify-center p-1 min-w-[120px] gap-2 px-2 rounded-xl">
                        <div className="h-[40px] w-[40px] bg-black rounded-full flex items-center justify-center">
                            <Image
                                src={logoUris[currentCurrency.to]}
                                alt="logo"
                                height={currentCurrency.to === "USDC" ? 30 : 20}
                                width={currentCurrency.to === "USDC" ? 30 : 20}
                            />
                        </div>
                        <p className="text-xl font-semibold">
                            {currentCurrency.to || "SOL"}
                        </p>
                    </div>
                </div>
                
            </div>
        </div>
    </div>
}