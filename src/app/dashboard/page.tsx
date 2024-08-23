import { OnboardingNavbar } from "@/components/onboarding/navbar/navbar";
import { Dashboard } from "@/components/dashboard/dashboard";
import { HoverAccount } from "@/components/dashboard/account-wallets/hover-wallet";
import { SideBarMask } from "@/components/dashboard/side-bar/side-bar-mask";

export default function Dashb() {

    return <div className="min-h-screen w-screen">
        <OnboardingNavbar
            enableSidebar={true}
        >
            <HoverAccount/>
        </OnboardingNavbar>
        <Dashboard />
    </div>
}