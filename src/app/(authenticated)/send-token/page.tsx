'use client'
import { HoverAccount } from "@/components/dashboard/account-wallets/hover-wallet";
import { OnboardingNavbar } from "@/components/onboarding/navbar/navbar";
import { SendToken } from "@/components/sendtoken/sendtoken";
import { useSearchParams } from "next/navigation";

export default function Token() {
    const searchParam = useSearchParams();
    const val = searchParam.get('c')
    return <div>
        <OnboardingNavbar
            enableSidebar={true}
        >
            <HoverAccount />
        </OnboardingNavbar>
        <div className="pt-32">
            <SendToken />
        </div>
    </div>
}