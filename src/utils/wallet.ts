import { solanaBlockchainConfig } from '@/blockchains-config/solana/config';
import { Keypair } from '@solana/web3.js';
import { mnemonicToSeedSync } from 'bip39';
import { derivePath } from 'ed25519-hd-key';
import nacl from 'tweetnacl';
import { ethereumBlockchainConfig } from '@/blockchains-config/eth/config';
import { HDNodeWallet } from 'ethers';
import { useRouter } from 'next/navigation';
import bs58 from 'bs58'

export type Accounts = {
    label: Blockchain,
    path: string,
    publicKey: string | Array<number>,
    privateKey: Array<number> | string,
}

export interface currentAccount {
    phrase: string,
    name: string,
    idx: number
}

export type storageObject = { [phrase: string]: { [account_name: string]: Accounts[] } }

export type wallet_map = Map<string, { [name: string]: Accounts[] }>

export enum Blockchain {
    SOL = "SOL",
    ETH = "ETH",
    BTC = "BTC",
    POLYGON = "MATIC"
}

export class WalletManager {
    private static instance: WalletManager;
    public walletMap: wallet_map;
    public wallet_counts: number;

    private constructor() {
        this.walletMap = new Map<string, { [name: string]: Accounts[] }>();
        this.wallet_counts = 0;
    }

    static getInstance() {
        if (WalletManager.instance) {
            return WalletManager.instance;
        }

        WalletManager.instance = new WalletManager();
        return WalletManager.instance;
    }

    private deriveSol(index: number, phrase: string) {
        const seed = mnemonicToSeedSync(phrase);

        const pathOption = solanaBlockchainConfig.DerivationPathOptions[0].pattern
        const path = pathOption.replace('x', index.toString());

        const derivedSeed = derivePath(path, seed.toString("hex")).key;
        const secret = nacl.sign.keyPair.fromSeed(derivedSeed).secretKey;

        const publicKey = Keypair.fromSecretKey(secret).publicKey.toBase58();

        return [publicKey, Array.from(secret)];
    }

    private deriveEth(index: number, phrase: string) {
        const hdNode = HDNodeWallet.fromPhrase(phrase, "", ethereumBlockchainConfig.DerivationPathOptions[5].pattern.replace('x', index.toString()));
        return [hdNode.address, hdNode.privateKey];
    }
    public addWallet(name: string, phrase: string): { [name: string]: Accounts[] } | null {
        if (typeof window === 'undefined') {
            console.warn("addWallet called in a non-browser environment");
            return null;
        }
    
        try {
            // Retrieve existing data from localStorage
            let existingData: { [phrase: string]: { [name: string]: Accounts[] } } = {};
            try {
                const storedData = window.localStorage.getItem('0');
                if (storedData !== null) {
                    const decoded = bs58.decode(storedData);
                    existingData = JSON.parse(Buffer.from(decoded).toString('utf8'));
                }
            } catch (parseError) {
                console.warn("Failed to parse localStorage, using empty object:", parseError);
            }
    
            // Initialize wallet data for this phrase if it doesn't exist
            if (!existingData[phrase]) {
                existingData[phrase] = {};
            }
    
            let values_len = Object.keys(existingData[phrase]).length || 0;
    
            const newAccount = [
                {
                    label: Blockchain.SOL,
                    path: solanaBlockchainConfig.DerivationPathOptions[0].pattern.replace('x', values_len.toString()),
                    publicKey: this.deriveSol(values_len, phrase)[0],
                    privateKey: this.deriveSol(values_len, phrase)[1],
                },
                {
                    label: Blockchain.ETH,
                    path: ethereumBlockchainConfig.DerivationPathOptions[5].pattern.replace('x', values_len.toString()),
                    publicKey: this.deriveEth(values_len, phrase)[0],
                    privateKey: this.deriveEth(values_len, phrase)[1],
                },
                {
                    label: Blockchain.POLYGON,
                    path: ethereumBlockchainConfig.DerivationPathOptions[5].pattern.replace('x', values_len.toString()),
                    publicKey: this.deriveEth(values_len, phrase)[0],
                    privateKey: this.deriveEth(values_len, phrase)[1],
                },
            ];
    
            // Add new account to existing data
            if (!existingData[phrase][name]) {
                existingData[phrase][name] = [];
            }
            existingData[phrase][name].push(...newAccount);
    
            // Update wallet_counts
            this.wallet_counts += 3;
    
            // Convert back to JSON and store in localStorage
            const updatedDataJson = JSON.stringify(existingData);
            const byte_arr = new TextEncoder().encode(updatedDataJson);
            const encoded = bs58.encode(byte_arr);
    
            window.localStorage.setItem('0', encoded);
    
            const storedData = window.localStorage.getItem('0');
            if (storedData !== encoded) {
                console.warn("Stored data doesn't match what we tried to store!");
            }
    
            // Update the instance walletMap
            this.walletMap = new Map(Object.entries(existingData));
    
            const ret_val = {
                [name]: newAccount
            };
    
            const currentAccount: currentAccount = {
                phrase: phrase,
                name: name,
                idx: values_len++
            };
    
            const encoded_currentAccount = new TextEncoder().encode(JSON.stringify(currentAccount));
            const enc = bs58.encode(encoded_currentAccount);
            console.log({enc});
            
            try {
                window.localStorage.setItem('currentAccount', enc);
            } catch (error) {
                console.error("Error storing currentAccount:", error);
            }
    
            return ret_val;
        } catch (e) {
            console.error("Error adding wallet:", e);
            return null;
        }
    }

    public getWallet(): Accounts[] | undefined {
        const storedAccount = window.localStorage.getItem('currentAccount');
        const decoded = bs58.decode(storedAccount as string);
        const currentAccount: currentAccount = JSON.parse(Buffer.from(decoded).toString('utf8'));
        const { phrase, name } = currentAccount;
        const storageString = window.localStorage.getItem('0');
        const decode = bs58.decode(storageString!);
        const decodedObject: storageObject = JSON.parse(Buffer.from(decode).toString('utf8'));

        const wallets: Accounts[] = decodedObject[phrase][name];
        return wallets;
    }

    public getStorage() {
        const storedPhrase = window.localStorage.getItem('0');
        const decoded = bs58.decode(storedPhrase!)
        const phrases: storageObject = JSON.parse(Buffer.from(decoded).toString('utf8'))

        return phrases;
    }

    public changeAccount({ phrase, name, idx }: currentAccount) {
        const currentAccount = {
            phrase,
            name,
            idx
        }
        const encoded = new TextEncoder().encode(JSON.stringify(currentAccount));
        const toBase58 = bs58.encode(encoded);
        window.localStorage.setItem('currentAccount', toBase58);
    }
}