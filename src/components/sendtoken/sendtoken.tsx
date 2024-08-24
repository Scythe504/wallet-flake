'use client'
import { logoUris } from "@/blockchains-config/logos"
import Image from "next/image"
import { Input } from "../ui/input";
import { LucideArrowLeft, LucideArrowUpDown } from "lucide-react";
import { TokenFooter } from "./sendtoken-footer";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

export const SendToken = () => {
    const router = useRouter();
    const solanaLogo = logoUris.SOL;
    return <div className="w-full px-4 sm:px-20">
        <div className="flex flex-col items-center justify-center gap-4">
            <div className="flex items-start w-full justify-between">
                <Button
                    variant={"ghost"}
                    onClick={() => router.push(`/dashboard`)}
                >
                    <svg width="24" height="24" viewBox="0 0 15 13" fill="white" xmlns="http://www.w3.org/2000/svg"><path d="M5.87775 0L0.343854 5.65148C0.123673 5.87662 0 6.1818 0 6.5C0 6.8182 0.123673 7.12338 0.343854 7.34852L5.87775 13L7.53949 11.303L4.01222 7.70074H15V5.29926H12.0288H4.01222L7.53949 1.69704L5.87775 0Z"></path></svg>
                </Button>
                <h1 className="text-4xl font-semibold text-center">Send SOL</h1>
                <div>
                </div>
                <div>
                </div>
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
                type="text"
                spellCheck="false"
            />
            <Input
                className="p-4 py-8 text-xl"
                placeholder="Amount"
                type="number"
                pattern="^\d*(\.\d{0,9})?$"
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
        <TokenFooter />
    </div>
}