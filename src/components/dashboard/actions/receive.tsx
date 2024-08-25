'use client'
import { Button } from "@/components/ui/button"
import { Accounts, WalletManager } from "@/utils/wallet";
import { useEffect, useState } from "react"
import { Currencies } from "../currencies/currency";
import Image from "next/image";
import { CurrencySkeleton } from "../currencies/skeleton";
import { ethereumBlockchainConfig } from "@/blockchains-config/eth/config";
import { solanaBlockchainConfig } from "@/blockchains-config/solana/config";
import { Copy, CopyCheck } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

export const Receive = () => {
    const [currentAccount, setCurrentAccount] = useState<Accounts[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const { toast } = useToast();

    useEffect(() => {
        const wallet = WalletManager.getInstance();
        const account = wallet.getWallet() as Accounts[];
        setCurrentAccount([...account]);
        setIsLoading(!isLoading)
    }, [])

    const currencies = [
        {
            gasToken: solanaBlockchainConfig.GasTokenName,
            name: solanaBlockchainConfig.Name,
            logoUri: solanaBlockchainConfig.localLogoUri,

        },
        {
            gasToken: ethereumBlockchainConfig.GasTokenName,
            name: ethereumBlockchainConfig.Name,
            logoUri: ethereumBlockchainConfig.localLogoUri,
        }, {
            gasToken: ethereumBlockchainConfig.GasTokenName,
            name: "POLYGON",
            logoUri: './matic.svg',
        },
    ];

    return <div className="px-6 sm:px-20
    w-full pt-8 flex flex-col gap-8">
        <h1 className="text-5xl font-semibold text-center">Receive</h1>
        <div className="flex flex-col gap-4 sm:min-w-[600px]">
            {currentAccount.map((acc, idx) => {
                const original_text = acc.publicKey;
                const text_len = original_text.length;
                if(typeof original_text !== "string") return ;
                const vis_text = original_text.startsWith("0x") ? original_text.substring(0, 6) + "..." + original_text.substring(text_len - 4, text_len) : original_text.substring(0, 4) + "..." + original_text.substring(text_len - 4, text_len);
                return (isLoading ? <CurrencySkeleton /> : <Button
                    variant={"outline"}
                    key={idx}
                    className="dark:bg-zinc-900/65 bg-zinc-300/65
                        flex flex-row justify-between h-[110px] px-4 rounded-xl
                        "
                >
                    <div className="flex flex-row items-center justify-center gap-2">
                        <div className="bg-black h-[75px] w-[75px] rounded-full flex justify-center">
                            <Image
                                src={currencies[idx].logoUri}
                                alt="logo"
                                height={35}
                                width={35}
                            />
                        </div>
                        <div className="flex flex-col items-start">
                            <h1 className="font-semibold text-xl">{currencies[idx].name}</h1>
                            <p className="text-lg font-medium text-zinc-900/65 dark:text-zinc-300/65">{vis_text}</p>
                        </div>
                    </div>
                    <div className="flex flex-row gap-2 items-center justify-center px-2"
                        onClick={() => {
                            navigator.clipboard.writeText(original_text);
                            toast({
                                description: `Copied ${currencies[idx].name} Address to Clipboard`
                            })
                        }}
                    >
                        <span className="text-lg font-medium text-zinc-900/65 dark:text-zinc-300/65"
                        >
                            <Copy size={30} />
                        </span>
                    </div>
                </Button>)
            }
            )}
        </div>
    </div >
}