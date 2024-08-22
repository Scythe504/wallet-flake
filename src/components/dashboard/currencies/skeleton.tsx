import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"

export const CurrencySkeleton = () => {
    return <div className="px-2">
        <div className="flex flex-col gap-4">
            <Button
                className="flex flex-row justify-between h-[100px] px-4 rounded-xl"
                variant={"ghost"}
            >
                <div className="flex flex-row items-center justify-center gap-2">
                    <div className="bg-zinc-900/65 h-[65px] w-[65px] rounded-3xl flex justify-center">
                        <Skeleton />
                    </div>
                    <div className="flex flex-col items-start gap-4">
                        <Skeleton className="w-[120px] h-6" />
                        <Skeleton className="w-[100px] h-4" />
                    </div>
                </div>
                <div className="flex flex-col items-start justify-center gap-4">
                    <Skeleton className="w-[70px] h-6" />
                    <Skeleton className="w-[50px] h-4" />
                </div>
            </Button>
        </div>
    </div >
}