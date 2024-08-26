import { Accounts } from "@/utils/wallet"
import { Copy } from "lucide-react"
import Image from "next/image"
import solana from '../../../../public/solana.svg'
import eth from '../../../../public/ethereum.svg'
import matic from '../../../../public/matic.svg'

export const HoverRevealCard = ({ accounts }: {
    accounts: Accounts[]
}) => {
    const logoUris = {
        "SOL": solana,
        "ETH": eth,
        "MATIC": matic
    }

    return <div className="p-1 min-w-fit">
        <div className="flex flex-col gap-2 w-full">
            {accounts.map((acc, idx) => {
                const { label } = acc;
                const logo = logoUris[label as "SOL" | "ETH" | "MATIC"];
                const original_text = acc.publicKey;
                const text_len = original_text.length;
                if (typeof original_text !== "string") return;
                const vis_text =
                    original_text.startsWith("0x") ?
                        original_text.substring(0, 6) + "..." + original_text.substring(text_len - 4, text_len)
                        :
                        original_text.substring(0, 4) + "..." + original_text.substring(text_len - 4, text_len);


                return <div key={idx} className="flex flex-row justify-between w-full gap-2">
                    <span className="flex flex-row items-center">
                        <div className="flex items-center h-[30px] w-[30px] bg-black rounded-full">
                            <Image
                                src={logo}
                                height={15}
                                width={15}
                                alt=""
                            />
                        </div>
                        <p className="text-sm">{acc.label}</p>
                    </span>
                    <span className="hover:text-purple-400 flex flex-row text-sm items-center justify-end gap-1"
                        onClick={() => navigator.clipboard.writeText(acc.publicKey as string)}
                    >
                        <p className="dark:text-zinc-300/65 text-zinc-900/65">{vis_text}</p>
                        <Copy
                            size={15}
                        />
                    </span>
                </div>
            })
            }
        </div>
    </div>
}