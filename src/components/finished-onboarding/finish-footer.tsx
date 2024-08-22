'use client'
import { usePathname } from "next/navigation"
import { Button } from "../ui/button"


export const FinishedOnboardingFooter = () => {
    const pathName = usePathname();

    return <div className="flex flex-col gap-3">
        {
            pathName.includes('importing') &&
            <Button variant={"outline"} className="text-lg">Found wallet</Button>
        }
        <Button className="text-lg">Finish</Button>
    </div>
}