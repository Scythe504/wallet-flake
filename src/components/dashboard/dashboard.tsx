import { Balance } from "./balance"
import { GroupedActions } from "./action-group/grouped"
import { Currencies } from "./currencies/currency"
import { ScrollArea, ScrollBar } from "../ui/scroll-area"

export const Dashboard = () => {
    return <div className="w-full h-full space-y-8 flex flex-col">
        <Balance/>
        <GroupedActions />
        <ScrollArea>
            <Currencies />
            <ScrollBar orientation="vertical"></ScrollBar>
        </ScrollArea>
    </div>
}