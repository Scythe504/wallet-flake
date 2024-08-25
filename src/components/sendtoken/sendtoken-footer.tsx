import { useRouter } from "next/navigation"
import { Button } from "../ui/button"

export const TokenFooter = ({ disabled, handleNext, handleClose }: {
    disabled: boolean,
    handleNext: () => void,
    handleClose: () => void,
}) => {
    const router = useRouter();

    return <div className="w-full fixed bottom-0 left-0 px-4 py-5 border-t h-24 flex flex-row gap-4 items-center sm:px-20">
        <Button
            variant={"secondary"}
            className="w-full h-[55px] text-lg font-semibold"
            onClick={handleClose}
            disabled={disabled}
        >
            Close
        </Button>
        <Button
            variant={"secondary"}
            className="w-full h-[55px] opacity-95 text-lg font-semibold dark:bg-zinc-800/65 bg-zinc-300/65 text-opacity-90"
            disabled={disabled}
            onClick={handleNext}
        >
            Next
        </Button>
    </div>
}