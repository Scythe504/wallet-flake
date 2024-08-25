'use client'
import Image from "next/image"
import walletUri from '../../../../public/image.png'
import { Button } from "@/components/ui/button"
import { useRouter } from 'next/navigation'

export const HeroSection = () => {
    const router = useRouter();

    return <div className="px-4 pt-4 md:px-8 lg:px-16 flex flex-col items-center gap-4">
        <div className="flex flex-col md:flex-row items-center justify-between w-full gap-2 md:px-12">
            <div className="flex flex-col items-center justify-center">
                <span className="flex flex-row gap-1 text-xl md:text-2xl lg:text-4xl items-center justify-center font-bold text-transparent bg-gradient-to-r from-zinc-500 via-zinc-400 to-zinc-500 bg-clip-text min-w-[285px]">
                    A
                    <p className="bg-gradient-to-r from-[#9945FF] to-[#14F195] bg-clip-text text-transparent">
                        Multichain HD
                    </p>
                    Web Wallet
                </span>
                <div className="h-2"></div>
                <span className="min-w-[240px] max-w-[350px] text-center">
                    A playground to send and recieve&nbsp;
                    <span className="bg-gradient-to-r font-semibold  from-[#9945FF] to-[#14F195] bg-clip-text text-transparent text-lg">Solana</span> from&nbsp;
                    <span className="bg-gradient-to-r text-lg font-semibold from-[#9945FF] to-[#14F195] bg-clip-text text-transparent">
                        DEVNET&nbsp;
                    </span>
                    with realtime conversion rates
                </span>
                <br />
                <div className="hidden sm:block space-x-2">
                    <Button
                        className="
                    px-6 py-6
                    dark:bg-zinc-900/80
                    bg-zinc-300/65
                    min-w-[169px]
                    "
                        onClick={() => window.location.replace("/onboarding/1")}
                        variant={"secondary"}
                    >
                        Create new Wallet
                    </Button>
                    <Button className="
                    px-6 py-6
                    dark:bg-zinc-900/80
                    bg-zinc-300/65
                    min-w-[169px]
                    "
                        onClick={() => router.push('/importing/1')}
                        variant={"secondary"}
                    >
                        Import existing
                    </Button>
                </div>
            </div>
            <div className="border rounded-xl shadow-sm shadow-[#8c7f9d] overflow-clip lg:mr-10">
                <Image
                    src={walletUri}
                    width={200}
                    height={300}
                    alt=""
                />
            </div>
        </div>
        <div className="space-x-2 sm:hidden flex flex-row">
            <Button
                className="
                    px-6 py-6
                    dark:bg-zinc-900/80
                    bg-zinc-300/65
                    min-w-[169px]
                    "
                onClick={() => window.location.replace("/onboarding/1")}
                variant={"secondary"}
            >
                Create new Wallet
            </Button>
            <Button className="
                    px-6 py-6
                    dark:bg-zinc-900/80
                    bg-zinc-300/65
                    min-w-[169px]
                    "
                onClick={() => router.push('/importing/1')}
                variant={"secondary"}
            >
                Import existing
            </Button>
        </div>
    </div>
}