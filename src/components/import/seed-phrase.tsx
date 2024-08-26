'use client'
import { useRef, useState } from "react";
import { Input } from "../ui/input"
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import * as bip39 from "bip39";
import { WalletManager } from "@/utils/wallet";
import { usePathname, useRouter } from "next/navigation";
import { useToast } from "../ui/use-toast";

export const PhraseInput = () => {
    const [phraseLength, setPhraseLength] = useState<12 | 24>(12);
    const pathName = usePathname();
    const { toast } = useToast();
    const [phrase, setPhrase] = useState<string[]>(new Array(12).fill(""));
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
    const router = useRouter();

    const toggle = () => {
        const newLength = phraseLength === 12 ? 24 : 12;
        setPhraseLength(newLength);
        setPhrase(new Array(newLength).fill(""));
        inputRefs.current = new Array(newLength);
    }

    const handleInputChange = (index: number, value: string) => {
        const words = value.split(' ');
        const currentWord = words[0];

        setPhrase(prev => {
            const newPhrase = [...prev];
            newPhrase[index] = currentWord;

            // If there's more than one word, fill the next inputs
            for (let i = 1; i < words.length && index + i < phraseLength; i++) {
                newPhrase[index + i] = words[i];
            }

            return newPhrase;
        });

        // Move to next input if space is entered
        if (value.endsWith(' ') && index < phraseLength - 1) {
            inputRefs.current[index + 1]?.focus();
        }
    }

    const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === ' ') {
            e.preventDefault();
            if (index < phraseLength - 1) {
                inputRefs.current[index + 1]?.focus();
            }
        }
    }

    const handleSubmit = () => {
        if (bip39.validateMnemonic(phrase.join(" "))) {
            // Here you would typically call a function to actually import the wallet
            window.localStorage.setItem('currentPhrase', phrase.join(' '));
            if(pathName.includes("add")) {
                const wallet = WalletManager.getInstance();
                wallet.addWallet(`Account ${wallet.wallet_counts + 1}`,phrase.join(' '));
                router.push("/dashboard");
            } else{
                router.push(`/importing/${3}`)
            }
        } else {
            toast({ description: "Invalid phrase. Please check your words and try again." });
        }
    }

    return (
        <div className="flex flex-col gap-3 justify-center">
            <div className={cn(
                phraseLength === 12 ? "grid grid-cols-3" : "grid grid-cols-4",
                `sm:gap-4 gap-1 min-h-[340px] justify-center items-center
                `
            )}>
                {phrase.map((word, index) => (
                    <div key={index} className={cn("flex overflow-clip items-center pl-1 h-10 w-full rounded-md border border-input dark:bg-zinc-900/65 bg-zinc-300/65 sm:px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50")}>
                        {index + 1}
                        <Input
                            className="ring-offset-transparent ring-transparent focus-visible:ring-transparent border-transparent sm:px-3 bg-transparent"
                            onChange={(e) => handleInputChange(index, e.target.value)}
                            onKeyDown={(e) => handleKeyDown(index, e)}
                            value={word}
                            ref={el => {
                                if (el !== null) {
                                    inputRefs.current[index] = el
                                }
                            }
                            }
                        />
                    </div>
                ))}
            </div>
            <Button
                onClick={toggle}
                className="text-lg dark:text-zinc-300/65 text-zinc-900/65 bg-transparent"
                variant={"ghost"}
            >
                I have a {phraseLength === 12 ? 24 : 12} word phrase
            </Button>
            <Button
                className="text-lg"
                onClick={handleSubmit}
            >
                Import Wallet
            </Button>
        </div>
    )
}