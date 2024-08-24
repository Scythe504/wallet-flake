import { Balance } from "./balance"
import { GroupedActions } from "./action-group/grouped"
import { Currencies } from "./currencies/currency"
import { ScrollArea, ScrollBar } from "../ui/scroll-area"

export const Dashboard = () => {
    return <div className="w-full h-full space-y-8 pb-12">
        <Balance
            amount={"40.00"}
            change={"40.00"}
            rate_of_change={"4000.00"}
        />
        <GroupedActions />
        <ScrollArea>
            <Currencies />
            <ScrollBar orientation="vertical"></ScrollBar>
        </ScrollArea>
    </div>
}