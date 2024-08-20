import { Button } from "@/components/ui/button"
import { OnboardingHeader } from "./header"
import { PasswordField } from "./password-field"
import { MoveLeft } from "lucide-react"

export const CreatePassword = () => {
    // return <div className="rounded-t-lg border-x border-t sm:min-w-[500px] p-3 translate-y-2 flex flex-row items-center justify-between w-fit">
    //         <Button variant={"ghost"}>
    //             <MoveLeft/>
    //         </Button>
    //         <div>
    //             Progress
    //         </div>
    //     </div>
    return <div className="flex flex-col py-12 px-8 rounded-b-lg
        items-center justify-center gap-5 sm:py-20 border sm:min-w-[500px] sm:min-h-[500px]">
            <OnboardingHeader />
            <PasswordField />
        </div>
}