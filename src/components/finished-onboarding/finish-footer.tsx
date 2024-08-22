'use client'
import { usePathname, useRouter } from "next/navigation"
import { Button } from "../ui/button"
import { WalletManager, Accounts } from "@/utils/wallet";
import { useEffect, useState } from "react";
import Link from "next/link";


export const FinishedFooter = () => {
    const pathName = usePathname();
    const [message, setMessage] = useState<"Processing" | "Failed" | "Finished">();
    const [importedWallet, setImportedWallets] = useState<Accounts[]>([])
    
    useEffect(() => {
        const initializeWallet = async () => {
            try {
                const password = window.localStorage.getItem('currentPassword');
                const phrase = window.localStorage.getItem('currentPhrase');

                if (!password || !phrase) {
                    setMessage("Failed");
                    // router.push('/onboarding/1')
                    return;
                }

                const wallet = WalletManager.getInstance(password);
                const added = wallet.addWallet(`Account ${Number(wallet.wallet_counts / 3)}`, phrase);

                if (added) {
                    const accountName = Object.keys(added)[0];
                    const accounts: Accounts[] = added[accountName];

                    setImportedWallets([...accounts]);
                    setMessage("Finished");
                    // accounts.forEach((account: Accounts) => {
                    //     console.log(`Label: ${account.label}`);
                    //     console.log(`Public Key: ${account.publicKey}`);
                    // });
                } else {
                    setMessage("Failed");
                }
            } catch (error) {
                console.error("Error initializing wallet:", error);
                setMessage("Failed");
            }
        };

        initializeWallet();
    }, []);

    const router = useRouter()

    const handleFinish = () => {
        router.push('/dashboard')
    }

    return <div className="flex flex-col gap-3">
        {
            pathName.includes('importing') &&
            <Button variant={"outline"}
                className="text-lg"
            >
                Found wallet
            </Button>
        }
        <Button className="text-lg"
            onClick={handleFinish}
        >
            Finish
        </Button>
    </div>
}