'use client'
import { solanaBlockchainConfig } from "@/blockchains-config/solana/config";
import { ethereumBlockchainConfig } from "@/blockchains-config/eth/config";
import { useEffect, useState } from "react";
import { Connection, LAMPORTS_PER_SOL, PublicKey } from '@solana/web3.js'
import { JsonRpcProvider, formatEther } from "ethers";
import { Accounts, WalletManager } from "@/utils/wallet";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { CurrencySkeleton } from "./skeleton";
import { useRouter } from "next/navigation";
import { toast, useToast } from "@/components/ui/use-toast";
import { BlockchainManager } from "@/utils/transaction";


interface BalanceState {
    SOL: string | null;
    ETH: string | null;
    POLYGON: string | null;
}

interface LoadingState {
    SOL: boolean;
    ETH: boolean;
    POLYGON: boolean;

}

interface ErrorState {
    SOL: string | null;
    ETH: string | null;
    POLYGON: string | null;
}

interface Currency {
    gasToken: string;
    name: string;
    logoUri: string;
    fetchBalance: (publicAddress: string) => Promise<string | null>;
}


export const Currencies: React.FC = () => {
    const { toast } = useToast();
    const router = useRouter();
    const [balances, setBalances] = useState<BalanceState>({
        SOL: "0.00",
        ETH: "0.00",
        POLYGON: "0.00",
    });
    const [solUsdBalance, setSolBalance] = useState("0.00");
    const [ethUsdBalance, setEthUsdBalance] = useState("0.00");
    const [isLoading, setIsLoading] = useState<LoadingState>({
        SOL: false,
        ETH: false,
        POLYGON: false
    });
    const [error, setError] = useState<ErrorState>({
        SOL: null,
        ETH: null,
        POLYGON: null
    });
    const transaction = new BlockchainManager();

    const currencies: Currency[] = [
        {
            gasToken: solanaBlockchainConfig.GasTokenName,
            name: solanaBlockchainConfig.Name,
            logoUri: solanaBlockchainConfig.localLogoUri,
            fetchBalance: async (publicAddress: string): Promise<string | null> => {
                setIsLoading(prev => ({ ...prev, SOL: true }));
                setError(prev => ({ ...prev, SOL: null }));
                try {
                    const valid = solanaBlockchainConfig.validatePublicKey(publicAddress);
                    if (!valid) {
                        throw new Error("Invalid Solana Public Key");
                    }

                    let url = solanaBlockchainConfig.RpcConnectionUrls.DEVNET.url;
                    if (process.env.NODE_ENV === "development") {
                        url = "http://127.0.0.1:8899";
                    }
                    const conn = new Connection(url);
                    const balance = await conn.getBalance(new PublicKey(publicAddress));
                    const sol_to_usd = await transaction.getSolPrice();
                    try {
                        if (sol_to_usd === null) {
                            toast({
                                description: "Rate Limitted"
                            })
                            setSolBalance("0.00" as string);
                            throw new Error("Rate Limitted");
                        }
                        setSolBalance(sol_to_usd as string);
                    } catch (error) {
                        console.error({ error })
                    }
                    const solBalance = (balance / LAMPORTS_PER_SOL).toFixed(2);
                    setBalances(prev => ({ ...prev, SOL: solBalance }));
                    return solBalance;
                } catch (error) {
                    console.error({ error });
                    setError(prev => ({ ...prev, SOL: (error as Error).message }));
                    return null;
                } finally {
                    setIsLoading(prev => ({ ...prev, SOL: false }));
                }
            },
        },
        {
            gasToken: ethereumBlockchainConfig.GasTokenName,
            name: ethereumBlockchainConfig.Name,
            logoUri: ethereumBlockchainConfig.localLogoUri,
            fetchBalance: async (publicAddress: string): Promise<string | null> => {
                setIsLoading(prev => ({ ...prev, ETH: true }));
                setError(prev => ({ ...prev, ETH: null }));
                try {
                    const valid = ethereumBlockchainConfig.validatePublicKey(publicAddress);
                    if (!valid) {
                        throw new Error("Invalid Ethereum Public Key");
                    }
                    const { url } = ethereumBlockchainConfig.RpcConnectionUrls.SEPOLIA;
                    const provider = new JsonRpcProvider(url);
                    const ethBalance = await provider.getBalance(publicAddress);
                    const formattedBalance = formatEther(ethBalance);
                    setBalances(prev => ({ ...prev, ETH: formattedBalance }));
                    // const eth_usd = await transaction.getUsdcValueFromWei();
                    // setEthUsdBalance(eth_usd!);
                    return formattedBalance;
                } catch (error) {
                    console.error({ error });
                    setError(prev => ({ ...prev, ETH: (error as Error).message }));
                    return null;
                } finally {
                    setIsLoading(prev => ({ ...prev, ETH: false }));
                }
            },
        }, {
            gasToken: ethereumBlockchainConfig.GasTokenName,
            name: "POLYGON",
            logoUri: './matic.svg',
            fetchBalance: async (publicAddress: string): Promise<string | null> => {
                setIsLoading(prev => ({ ...prev, POLYGON: true }));
                setError(prev => ({ ...prev, POLYGON: null }));
                try {
                    const valid = ethereumBlockchainConfig.validatePublicKey(publicAddress);
                    if (!valid) {
                        throw new Error("Invalid Ethereum Public Key");
                    }
                    const { url } = ethereumBlockchainConfig.RpcConnectionUrls.MAINNET;
                    const provider = new JsonRpcProvider(url);
                    const ethBalance = await provider.getBalance(publicAddress);
                    const formattedBalance = formatEther(ethBalance);
                    setBalances(prev => ({ ...prev, POLYGON: formattedBalance }));
                    return formattedBalance;
                } catch (error) {
                    console.error({ error });
                    setError(prev => ({ ...prev, POLYGON: (error as Error).message }));
                    return null;
                } finally {
                    setIsLoading(prev => ({ ...prev, POLYGON: false }));
                }
            },
        },
    ];

    const [currentAccount, setCurrentAccount] = useState<Accounts[]>();
    useEffect(() => {
        const wallet = WalletManager.getInstance();
        setCurrentAccount(wallet.getWallet() as Accounts[]);
    }, [])

    useEffect(() => {
        currentAccount?.forEach((account, idx) => {
            if (currencies[idx]) {
                currencies[idx].fetchBalance(account.publicKey as string);
            }
        });
    }, [currentAccount]);

    return (
        <div className="px-6 sm:px-20 w-full sm:items-center sm:flex sm:justify-center">
            <div className="flex flex-col gap-4 sm:min-w-[600px]">
                {
                    currentAccount?.map((account, idx) => {
                        const label: "SOL" | "ETH" | "POLYGON" = account.label as "SOL" | "ETH" | "POLYGON";
                        const loading = isLoading.POLYGON;
                        return loading === true ? <CurrencySkeleton /> : <Button
                            variant={"outline"}
                            key={idx}
                            className="dark:bg-zinc-900/65 bg-zinc-300/65
                                flex flex-row justify-between h-[110px] px-4 rounded-xl
                            "
                            onClick={() => {
                                if (account.label !== "SOL") {
                                    toast({
                                        description: "Currently Only Solana can be used to transfer"
                                    })
                                }
                                router.push(`/send-token`)
                            }}
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
                                    <p className="text-lg font-medium text-zinc-900/65 dark:text-zinc-300/65">{balances[label]} {label}...</p>
                                </div>
                            </div>
                            <div className="flex flex-col items-center justify-center">
                                <h1 className="font-semibold text-xl">{label === "SOL" ? "$" + solUsdBalance : "$" + ethUsdBalance}</h1>
                            </div>
                        </Button>
                    }
                    )
                }
            </div>
        </div>
    );
}