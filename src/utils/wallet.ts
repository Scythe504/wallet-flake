import { solanaBlockchainConfig } from '@/blockchains-config/solana/config';
import { Keypair } from '@solana/web3.js';
import { mnemonicToSeedSync } from 'bip39';
import { derivePath } from 'ed25519-hd-key';
import nacl from 'tweetnacl';
import { encodeBase58 } from 'ethers';
import { ethereumBlockchainConfig } from '@/blockchains-config/eth/config';
import { HDNodeWallet } from 'ethers';

type Accounts = {
    label: Blockchain,
    path: string,
    publicKey: string,
    privateKey: string,
}

enum Blockchain {
    SOL = "SOL",
    ETH = "ETH",
    BTC = "BTC",
    POLYGON = "MATIC"
}

export class WalletManager {
    private static instance: WalletManager;
    private walletMap: Map<string, { [name: string]: Accounts[] }>;
    // private password: string;
    public wallet_counts: number;

    private constructor(phrase: string) {
        this.walletMap = new Map<string, { [name: string]: Accounts[] }>();
        this.wallet_counts = 0;
    }

    static getInstance(phrase: string) {
        if (WalletManager.instance) {
            return WalletManager.instance;
        }
        
        WalletManager.instance = new WalletManager(phrase);
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

    public addWallet(name: string, phrase: string) {
        let values_len = this.walletMap.get(phrase)![name].length;
        if (values_len === undefined) {
            values_len = 0;
        } else {
            values_len++;
        }
        const walletObject = {
            [name]: [
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
            ]
        };
        this.walletMap.set(phrase, walletObject);
    }
}