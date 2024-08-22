import { LucideCopy } from "lucide-react"

export const HoverAccount = () => {
    return <div className="mr-6 text-xl font-semibold 
            flex flex-row items-center gap-2"
            >
            <p>Account</p>
            <LucideCopy
                strokeOpacity={60 / 100}
                size={20}
            />
        </div>
}