import { Button } from "@/components/ui/button"
import { Edit2, Plus, Settings } from "lucide-react"

export const SideBarFooter = ()=> {

    return <div className="flex flex-col items-center justify-center gap-2">
        <Button variant={"secondary"}>
            <Plus/>
        </Button>
        <Button variant={"secondary"}>
            <Edit2/>
        </Button>
        <Button variant={"secondary"}>
            <Settings/>
        </Button>
    </div>
}