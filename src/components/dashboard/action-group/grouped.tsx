'use client'
import { LucideArrowRightLeft, LucidePlus, LucideSend, Plus } from "lucide-react"
import { Receive } from "../actions/receive"
import { Send } from "../actions/send"
import { Swap } from "../actions/swap"
import { Button } from "@/components/ui/button"

export const GroupedActions = () => {

    const actions = [{
        label: "Recieve",
        icon: <LucidePlus size={35} />,
        action: <Receive />
    }, {
        label: "Send",
        icon: <LucideSend size={35} />,
        action: <Send />
    }, {
        label: "Swap",
        icon: <LucideArrowRightLeft size={35} />,
        action: <Swap />
    }]
    const handleClick = () => {
        // TODO - OPEN UP COMPONENT
    }

    return <div className="py-4">
        <div className="flex flex-row h-[100px] w-full items-center justify-center gap-4">
            {
                actions.map((action, idx) =>
                    <Button
                        key={idx}
                        onClick={handleClick}
                        className="h-[110px] w-[110px] rounded-xl flex flex-col font-semibold dark:bg-zinc-900/65 gap-2 bg-zinc-300/65"
                        variant={"outline"}
                    >
                        <span>{action.icon}</span>
                        <p className="dark:text-zinc-300/65 text-zinc-900/65 text-lg">{action.label}</p>
                    </Button>)
            }
        </div>
    </div>
}