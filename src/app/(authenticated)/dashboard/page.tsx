import { OnboardingNavbar } from "@/components/onboarding/navbar/navbar";
import { Dashboard } from "@/components/dashboard/dashboard";
import { HoverAccount } from "@/components/dashboard/account-wallets/hover-wallet";
import { SideBarMask } from "@/components/dashboard/side-bar/side-bar-mask";

export default function Dashb() {
    return (
        <div className="h-screen w-screen flex flex-col overflow-hidden">
            <div className="flex-shrink-0">
                <OnboardingNavbar enableSidebar={true}>
                    <HoverAccount />
                </OnboardingNavbar>
            </div>
            <div className="flex-grow overflow-y-auto pt-20 max-h-[calc(100%)]">
                <Dashboard />
            </div>
        </div>
    );
}