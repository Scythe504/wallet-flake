'use client'
import { generateMnemonic, mnemonicToSeedSync } from 'bip39'
import { derivePath } from 'ed25519-hd-key'
import { Keypair } from '@solana/web3.js'
import nacl from 'tweetnacl'
import { useEffect, useRef, useState } from 'react'
import { Separator } from '@/components/ui/separator'

export const Phrases = () => {
    const [mnemonic, setMnemonic] = useState<string>('');
    useEffect(() => {
        setMnemonic(generateMnemonic());
    }, [])
    // const [seed, setSeed] = useState<Buffer>();
    // setSeed(mnemonicToSeedSync(mnemonic));
    const copyRef = useRef<HTMLDivElement>(null)
    const copyToClipboard = () => {
        navigator.clipboard.writeText(mnemonic);
        alert("Copied To Clipboard");
    }
    return <div onClick={copyToClipboard} className='sm:grid sm:grid-cols-3 gap-2 sm:h-[400px] flex flex-col border dark:border-white border-black rounded-lg p-2 items-center'>
                {mnemonic.split(' ').map((str, i) => (
                    <>
                        <span key={i} className=' sm:px-20 row-span-2 px-5'>{i + 1}. {str}</span>
                    </>
                ))}
            <Separator className='col-span-3' />
            <p className='text-center col-span-3 dark:text-white/70 sm:text-base text-sm'>Click anywhere to copy</p>
        </div>
}