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
            <div className="w-full flex justify-between pb-6">
                <Button
                    variant={"ghost"}
                    onClick={() => router.push(`/dashboard`)}
                    className=""
                >
                    <LucideArrowLeft/>
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