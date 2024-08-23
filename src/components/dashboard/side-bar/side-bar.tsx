import { WalletManager } from "@/utils/wallet"
import { LucideArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "../../ui/button";
import React from "react";
import { SideBarMask } from "./side-bar-mask";
import { useToast } from "@/components/ui/use-toast";

export const SideBar = () => {
    const router = useRouter();
    const { toast } = useToast();
    const password = window.localStorage.getItem('currentPassword');
    if (!password) {
        router.push('/onboarding/1')
        return <></>;
    }
    const wallet = WalletManager.getInstance(password);
    const account_wallets = wallet.getPhraseValues();
    if (!account_wallets) {
        router.push('/onboarding/1')
        return <></>
    }

    const handleClick = (currentAccount: string) => {
        window.localStorage.setItem('currentAccount', currentAccount);
        const didUpdate = window.localStorage.getItem('currentAccount');
        if (didUpdate === currentAccount) {
            toast({
                description: "Account switched"
            })
        } else {
            toast({
                description: "Please Try Again"
            })
        }
    }

    const renderAccounts = () => {
        return account_wallets.flatMap((phraseAccounts, phraseIdx) =>
            Object.entries(phraseAccounts).flatMap(([accountName, accounts]) =>
                accounts.map((account, idx) => {
                    const str = accountName.split(' ');
                    let new_str = '';
                    if (str.length >= 2) {
                        new_str = str[0][0] + str[1][0];
                    } else {
                        new_str = str[0][0];
                    }
                    return (
                        <Button
                            key={`${phraseIdx}-${accountName}-${idx}`}
                            className="h-[50px] w-[50px] rounded-full flex items-center justify-center"
                            variant="default"
                            onClick={() => handleClick(accountName)}
                        >
                            <span>{new_str.toUpperCase()}</span>
                        </Button>
                    );
                })
            )
        );
    }

    return (
        <div className="absolute left-1">
            (
            <div className="flex flex-col items-center p-3">
                {renderAccounts()}
            </div>
            )
        </div>
    );
}