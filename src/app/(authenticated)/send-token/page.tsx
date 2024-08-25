'use client'
import { HoverAccount } from "@/components/dashboard/account-wallets/hover-wallet";
import { OnboardingNavbar } from "@/components/onboarding/navbar/navbar";
import { SendToken } from "@/components/sendtoken/sendtoken";
import { useRouter, useSearchParams } from "next/navigation";

export default function _Token() {
    const router = useRouter()
    return <div>
        <OnboardingNavbar
            enableSidebar={true}
        >
            <HoverAccount />
        </OnboardingNavbar>
        <div className="pt-32">
            <SendToken
                title={"Send"}
                handleClose={() => {
                    router.push('/dashboard')
                }}
            />
        </div>
    </div>
}