import { solanaBlockchainConfig } from '@/blockchains-config/solana/config';
import { Keypair } from '@solana/web3.js';
import { mnemonicToSeedSync } from 'bip39';
import { derivePath } from 'ed25519-hd-key';
import nacl from 'tweetnacl';
import { encodeBase58 } from 'ethers';
import { ethereumBlockchainConfig } from '@/blockchains-config/eth/config';
import { HDNodeWallet } from 'ethers';

export type Accounts = {
    label: Blockchain,
    path: string,
    publicKey: string,
    privateKey: string,
}

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

    private constructor(password: string) {
        this.walletMap = new Map<string, { [name: string]: Accounts[] }>();
        this.wallet_counts = 0;
    }

    static getInstance(password: string) {
        if (WalletManager.instance) {
            return WalletManager.instance;
        }

        WalletManager.instance = new WalletManager(password);
        return WalletManager.instance;
    }

    private deriveSol(index: number, phrase: string) {
        const seed = mnemonicToSeedSync(phrase);

        const pathOption = solanaBlockchainConfig.DerivationPathOptions[0].pattern
        const path = pathOption.replace('x', index.toString());

        const derivedSeed = derivePath(path, seed.toString("hex")).key;
        const secret = nacl.sign.keyPair.fromSeed(derivedSeed).secretKey;

        const publicKey = Keypair.fromSecretKey(secret).publicKey.toBase58();
        const privKey = encodeBase58(secret);
        return [publicKey, privKey];
    }

    private deriveEth(index: number, phrase: string) {
        const hdNode = HDNodeWallet.fromPhrase(phrase, "", ethereumBlockchainConfig.DerivationPathOptions[5].pattern.replace('x', index.toString()));
        return [hdNode.address, hdNode.privateKey];
    }
    public addWallet(name: string, phrase: string): { [name: string]: Accounts[] } | null {
        try {
            // Retrieve existing data from localStorage
            let existingData: { [phrase: string]: { [name: string]: Accounts[] } };
            try {
                const storedData = window.localStorage.getItem('0');
                existingData = storedData ? JSON.parse(storedData) : {};
            } catch (parseError) {
                console.warn("Failed to parse localStorage, using empty object:", parseError);
                existingData = {};
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

            window.localStorage.setItem('0', updatedDataJson);

            const storedData = window.localStorage.getItem('0');

            if (storedData !== updatedDataJson) {
                console.warn("Stored data doesn't match what we tried to store!");
            }

            // Update the instance walletMap
            this.walletMap = new Map(Object.entries(existingData));

            const ret_val = {
                [name]: newAccount
            }
            window.localStorage.setItem('currentAccount', name);
            return ret_val;
        } catch (e) {
            console.error("Error adding wallet:", e);
            return null;
        }
    }

    public getWallet(): Accounts[] | undefined {
        const currentAccount = window.localStorage.getItem('currentAccount');
        if (!currentAccount) {
            console.error('No current account found in session storage');
            return undefined;
        }

        const currentPhrase = window.localStorage.getItem('currentPhrase');
        if (!currentPhrase) {
            console.error('No current phrase found in session storage');
            return undefined;
        }

        const storageData = window.localStorage.getItem('0');
        if (!storageData) {
            console.error('No data found in local storage');
            return undefined;
        }

        const data: { [phrase: string]: { [accountName: string]: Accounts[] } } = JSON.parse(storageData);

        const phraseData = data[currentPhrase];
        if (!phraseData) {
            console.error('Current phrase not found in stored data');
            return undefined;
        }

        const wallets = phraseData[currentAccount];
        if (!wallets) {
            console.error('Current account not found in stored data for the current phrase');
            return undefined;
        }
        return wallets;
    }

    public getPhraseValues() {
        const phrases: { [phrase: string]: { [account_name: string]: Accounts[] } } = JSON.parse(window.localStorage.getItem('0')!);
        const account_keys = [];
        for (let phrase in phrases) {
            let account = phrases[phrase];
            account_keys.push(account);
        }

        return account_keys;
    }
}