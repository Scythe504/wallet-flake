'use client'
import { logoUris } from "@/blockchains-config/logos"
import Image from "next/image"
import { Input } from "../ui/input";
import { LucideArrowLeft, LucideArrowUpDown } from "lucide-react";
import { TokenFooter } from "./sendtoken-footer";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Transact } from "@/utils/transaction";
import { useToast } from "../ui/use-toast";
import { Textarea } from "../ui/textarea";

export const SendToken = () => {
    const { toast } = useToast();
    const router = useRouter();
    const solanaLogo = logoUris.SOL;
    const [amount, setAmount] = useState<number>(0);
    const [toPublicKey, setPublicKey] = useState<string>("");
    const [disabled, setIsDisabled] = useState(false);

    const handleClick = () => {
        setIsDisabled(!disabled);
        const transaction = new Transact();
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
    }

    const Footer = <TokenFooter
        disabled={disabled}
        handleClick={handleClick}
    />

    useEffect(()=> {

    },[])

    return <div className="w-full px-4 sm:px-20">
        <div className="flex flex-col items-center justify-center gap-4">
            <div className="w-full flex justify-between pb-6">
                <Button
                    variant={"ghost"}
                    onClick={() => router.back()}
                    className=""
                >
                    <LucideArrowLeft />
                </Button>
                <h1 className="text-4xl font-semibold self-center">Send SOL</h1>
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
            <Input
                className="p-4 py-8 text-xl"
                placeholder="Receipients Address"
                onChange={e => setPublicKey(e.target.value)}
            />
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
            handleClick={handleClick}
        />
    </div>
}