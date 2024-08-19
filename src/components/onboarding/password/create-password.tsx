import { OnboardingHeader } from "./header"
import { PasswordField } from "./password-field"

export const CreatePassword = () => {
    return <div className="w-screen p-5 h-screen flex flex-col items-center justify-center
    ">
        <div className="flex flex-col py-12 px-8 rounded-lg
    items-center justify-center gap-5 sm:py-20 border">
            <OnboardingHeader />
            <PasswordField />
        </div>
    </div>
}