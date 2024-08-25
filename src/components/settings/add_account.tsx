import { LucideWallet2, Plus } from "lucide-react"
import { Button } from "../ui/button"

export const AddWallet = ({
    handleClick,
    icon,
    title,
}: {
    handleClick: () => void,
    icon: JSX.Element,
    title: string
}) => {
    return (
        <Button
            variant={"secondary"}
            className="w-full h-[100px] dark:bg-zinc-900/65 bg-zinc-300/65 flex items-center justify-start pl-8 gap-4"
            onClick={handleClick}
        >
            <div className="flex items-center">
                {icon}
            </div>
            <p className="text-xl">{title}</p>
        </Button>
    )
}