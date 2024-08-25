import { Button } from "@/components/ui/button"
import { Edit2, Plus, Settings } from "lucide-react"
import { useRouter } from "next/navigation"

export const SideBarFooter = ()=> {
    const router = useRouter();

    return <div className="flex flex-col items-center justify-center gap-2">
        <Button variant={"secondary"}
            onClick={()=> router.push('/add-wallet')}
        >
            <Plus/>
        </Button>
    </div>
}