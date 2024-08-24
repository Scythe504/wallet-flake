'use client'
import { currentAccount, WalletManager } from "@/utils/wallet"
import { usePathname, useRouter } from "next/navigation";
import { Button } from "../../ui/button";
import React from "react";
import { useToast } from "@/components/ui/use-toast";
import { ScrollArea } from "@/components/ui/scroll-area";

export const SideBar = () => {
    const router = useRouter();
    const { toast } = useToast();
    const pathName = usePathname();
    const password = window.localStorage.getItem('currentPassword');
    if (!password) {
        router.push('/onboarding/1')
        return <></>;
    }
    const wallet = WalletManager.getInstance(password);
    const account_wallets = wallet.getStorage();
    if (!account_wallets) {
        router.push('/onboarding/1')
        return <></>
    }

    const handleClick = (currentAccount: currentAccount) => {
        // wallet class todo
        // window.localStorage.setItem('currentAccount', JSON.stringify(currentAccount));
        wallet.changeAccount(currentAccount)
        const didUpdate: currentAccount = JSON.parse(window.localStorage.getItem('currentAccount')!);
        if (didUpdate.name === currentAccount.name) {
            toast({
                description: "Account switched"
            });

            router.push('/dashboard');
            if (pathName.includes('dashboard')) {
                window.location.reload();
            }
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
                return (
                    <Button
                        key={`${phrase}-${name}-${idx}`}
                        className="h-[50px] w-[50px] rounded-full flex items-center justify-center"
                        variant={"secondary"}
                        onClick={() => handleClick(currentAccount)}
                    >
                        <span>{new_str.toUpperCase()}</span>
                    </Button>
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