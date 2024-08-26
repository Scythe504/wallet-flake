'use client'
import Image from "next/image"
import { Input } from "../ui/input";
import { LucideArrowLeft, LucideArrowUpDown } from "lucide-react";
import { TokenFooter } from "./sendtoken-footer";
import { Button } from "../ui/button";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { BlockchainManager } from "@/utils/transaction";
import { useToast } from "../ui/use-toast";
import solana from '../../../public/solana.svg'
import eth from '../../../public/ethereum.svg'
import matic from '../../../public/matic.svg'


export const SendToken = ({ title, handleClose }: {
    title: string,
    handleClose: () => void,
}) => {
    const { toast } = useToast();
    const pahtName = usePathname();
    const router = useRouter();
    const logoUris = {
        "SOL": solana,
        "ETH": eth,
        "MATIC": matic
    }
    const solanaLogo = logoUris.SOL;
    const [amount, setAmount] = useState<number>(0);
    const [toPublicKey, setPublicKey] = useState<string>("");
    const [disabled, setIsDisabled] = useState(false);

    const handleNext = () => {
        setIsDisabled(!disabled);
        const transaction = new BlockchainManager();
        if (pahtName.includes("send-token")) {
            transaction.sendSol(amount, toPublicKey)
                .then((data) => {
                    if (data) {
                        toast({
                            description: data?.message
                        })
                    }
                    setIsDisabled(!disabled);
                }).catch(err => {
                    console.error(err)
                    toast({
                        description: "Some Error Occured"
                    })
                    setIsDisabled(!disabled);
                })
        } else {
            transaction.airdropSol(amount).then((data)=>{
                if(data.error) {
                    throw new Error(data.error);
                }
                if(data.success) {
                    toast({
                        description : data.success
                    })
                }
            }).catch((err) => {
                console.error({err});
                toast({
                    description : "Airdrop Failed or Rate Limitted"
                })
            })
        }
    }

    return <div className="w-full px-4 sm:px-20">
        <div className="flex flex-col items-center justify-center gap-4">
            <div className="w-full flex justify-between pb-6">
                <Button
                    variant={"ghost"}
                    onClick={() => pahtName.includes("send") ? router.back() : window.location.reload()}
                    className=""
                >
                    <LucideArrowLeft />
                </Button>
                <h1 className="text-4xl font-semibold self-center">{title} SOL</h1>
                <div className="w-[calc(40px)]"></div>
            </div>
            <div className="flex items-center justify-center">
                <div className="h-[120px] w-[120px] bg-black rounded-full flex items-center justify-center">
                    <Image
                        src={solanaLogo}
                        alt="logo"
                        height={70}
                        width={70}
                    />
                </div>
            </div>
            {
                pahtName.includes("/send-token") &&
                <Input
                    className="p-4 py-8 text-xl"
                    placeholder="Receipients Address"
                    onChange={e => setPublicKey(e.target.value)}
                />
            }
            <Input
                className="p-4 py-8 text-xl"
                placeholder="Amount"
                type="number"
                pattern="^\d*(\.\d{0,9})?$"
                onChange={e => setAmount(e.target.valueAsNumber)}
            />
            <div className="flex flex-row items-center justify-between w-full px-4">
                <div className="text-zinc-900/65 dark:text-zinc-300/65 flex gap-2 text-lg items-center">
                    <p>0.00 USD</p>
                    <LucideArrowUpDown size={20} />
                </div>
                <div className="text-zinc-900/65 dark:text-zinc-300/65 text-lg">
                    Available 0 SOL
                </div>
            </div>
        </div>
        <TokenFooter
            disabled={disabled}
            handleNext={handleNext}
            handleClose={handleClose}
        />
    </div>
}