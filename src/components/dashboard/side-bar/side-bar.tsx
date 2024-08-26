'use client'
import { currentAccount, WalletManager, Accounts } from "@/utils/wallet"
import { usePathname, useRouter } from "next/navigation";
import { Button } from "../../ui/button";
import React, { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { ScrollArea } from "@/components/ui/scroll-area";
import { HoverRevealCard } from "./hover";
import bs58 from 'bs58'
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@/components/ui/hover-card"

export const SideBar = () => {
    const router = useRouter();
    const { toast } = useToast();
    const pathName = usePathname();
    const password = window.localStorage.getItem('currentPassword');

    if (!password) {
        router.push('/onboarding/1')
        return <></>;
    }

    const wallet = WalletManager.getInstance();
    const account_wallets = wallet.getStorage();

    if (!account_wallets) {
        router.push('/onboarding/1')
        return <></>
    }

    const handleClick = (currentAccount: currentAccount) => {
        wallet.changeAccount(currentAccount)
        const didUpdate = window.localStorage.getItem('currentAccount')!;
        const temp = new TextEncoder().encode(JSON.stringify(currentAccount));
        const tobase58 = bs58.encode(temp);
        if (didUpdate === tobase58) {
            toast({
                description: "Account switched"
            });

            if (pathName.includes('dashboard')) {
                window.location.reload();
            }
            router.push('/dashboard');
        } else {
            toast({
                description: "Please Try Again"
            })
        }
    }

    const renderAccounts = () => {
        return Object.entries(account_wallets).map((account, idx) => {
            const phrase = account[0];
            return Object.entries(account[1]).map((acc_name, idx) => {
                const name = acc_name[0];
                const currentAccount: currentAccount = {
                    phrase,
                    name,
                    idx
                }
                const str = name.split(' ');
                let new_str = '';
                if (str.length >= 2) {
                    new_str = str[0][0] + str[1][0];
                } else {
                    new_str = str[0][0];
                }

                const wallet = WalletManager.getInstance();
                const accounts: Accounts[] = account_wallets[phrase][acc_name[0]]

                return (
                    <HoverCard key={`${phrase}-${name}-${idx}`}>
                        <HoverCardTrigger
                            asChild
                        >
                            <Button
                                className="h-[50px] w-[50px] rounded-full flex items-center justify-center"
                                variant={"secondary"}
                                onClick={() => handleClick(currentAccount)}
                            >
                                <span>{new_str.toUpperCase()}</span>
                            </Button>
                        </HoverCardTrigger>
                        <HoverCardContent>
                            <HoverRevealCard accounts={accounts} />
                        </HoverCardContent>
                    </HoverCard>
                );
            })
        })
    }

    return (
        <div className="w-[80px] rounded-xl flex items-start justify-center h-full">
            <ScrollArea className="h-full">
                <div className="flex flex-col items-start justify-center gap-2 h-full text-black">
                    {renderAccounts()}
                </div>
            </ScrollArea>
        </div>
    );
}