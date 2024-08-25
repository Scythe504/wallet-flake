'use client'
import { BlockchainManager } from "@/utils/transaction";
import { useEffect, useState } from "react";
import { toast } from "../ui/use-toast";

export const Balance = () => {
    const [sumBalance, setSumBalance] = useState("0.00");
    const blockchain = new BlockchainManager();
    useEffect(() => {
        fetchBalance();
    }, [])

    const fetchBalance = async () => {
        try {
            const sol_usd_balance = await blockchain.getSolPrice();
            // const eth_usd_balance = await blockchain.getUsdcValueFromWei();
            if(sol_usd_balance === null){
                const parsedSum = parseFloat(sol_usd_balance!).toFixed(2);
                setSumBalance(parsedSum)
            } else {
                throw new Error("Rate Limitted")
            }
        
        } catch (error) {
            console.error({error})
            toast({
                description: "Rate Limitted",
            });
            setSumBalance("0.00");
        }
    }

    return <div className="w-full pt-12">
        <div className="flex flex-col items-center gap-4 justify-center">
            <h1 className="font-bold text-6xl h-16">
                &#x24;{sumBalance}
            </h1>
            <div className="text-2xl flex flex-row gap-6 dark:text-zinc-300/65 text-zinc-900/65">
                <p>Total Balance</p>
            </div>
        </div>
    </div>
}