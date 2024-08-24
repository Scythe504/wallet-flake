'use client'
import { OnboardingNavbar } from "@/components/onboarding/navbar/navbar";
import { SendToken } from "@/components/sendtoken/sendtoken";
import { useSearchParams } from "next/navigation";

export default function Token() {
    const searchParam = useSearchParams();

    return <div>
        <OnboardingNavbar
            enableSidebar={true}
        />
        <div className="pt-32">
            <SendToken />
        </div>
    </div>
}