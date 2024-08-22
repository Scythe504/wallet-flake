import { WalletManager } from "@/utils/wallet"
import { LucideArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "../../ui/button";
import React from "react";
import { SideBarMask } from "./side-bar-mask";
import { useToast } from "@/components/ui/use-toast";

export const SideBar = ({
    visible
}: {
    visible: boolean
}) => {
    const router = useRouter();
    const { toast } = useToast();
    const password = window.localStorage.getItem('currentPassword');
    if (!password) {
        router.push('/onboarding/1')
        return <></>;
    }
    const wallet = WalletManager.getInstance(password);
    const account_wallets = wallet.getAllPhraseWallets();
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

    return <div>
        {visible && <div>
            <SideBarMask />
            {
                Object.entries(account_wallets).map((accounts, idx) => {
                    const str = accounts[0].split(' ');
                    let new_str = '';
                    if (str.length >= 2) {
                        new_str = str[0][0] + str[1][0];
                    } else {
                        new_str = str[0][0]
                    }
                    return <Button key={idx}
                        className="h-[50px] w-[50px] rounded-full
                            flex items-center justify-center
                        "
                        variant={"ghost"}
                        onClick={() => handleClick(accounts[0])}
                    >
                        <span>{new_str}</span>
                    </Button>
                })
            }
        </div>
        }
    </div>
}