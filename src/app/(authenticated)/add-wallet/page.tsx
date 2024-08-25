import { HoverAccount } from "@/components/dashboard/account-wallets/hover-wallet";
import { OnboardingNavbar } from "@/components/onboarding/navbar/navbar";
import { AddActions } from "@/components/settings/add-actions";

export default function CreateWallet () {
    return <div>
        <OnboardingNavbar enableSidebar={false}>
            <HoverAccount/>
        </OnboardingNavbar>
        <AddActions/>
    </div>
}