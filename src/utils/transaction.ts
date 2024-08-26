import { Accounts, WalletManager } from "./wallet";
import { Connection, Keypair, LAMPORTS_PER_SOL, PublicKey, sendAndConfirmTransaction, SystemProgram, Transaction } from "@solana/web3.js";
import { solanaBlockchainConfig } from "@/blockchains-config/solana/config";
import { ethereumBlockchainConfig } from "@/blockchains-config/eth/config";
import { Alchemy, Network, Wallet, Utils } from 'alchemy-sdk';
import axios from 'axios';
import { ethers, JsonRpcProvider } from "ethers";



export class BlockchainManager {

    constructor() {
        
    }
    public async sendEth(amount: number, toPubKey: string) {
        const { API_KEY } = process.env;
        const wallet = WalletManager.getInstance();
        const ethObj = wallet.getWallet();

        const settings = {
            api_key: API_KEY,
            network: Network.ETH_SEPOLIA
        }
        const alchemy = new Alchemy(settings);
        try {
            if (ethObj === undefined) {
                throw new Error("Some error Occured");
            }
            const { privateKey } = ethObj[1];
            let ethWallet = new Wallet(privateKey);

            const nonce = await alchemy.core.getTransactionCount(
                ethWallet.address,
                "latest"
            );

            let transaction = {
                to: toPubKey,
                value: Utils.parseEther(amount.toString()),
                gasLimit: "21000",
                maxPriorityFeePerGas: Utils.parseUnits("5", "gwei"),
                maxFeePerGas: Utils.parseUnits("20", "gwei"),
                nonce: nonce,
                type: 2,
                chainId: 11155111,
            };

            let raw_transaction = await ethWallet.signTransaction(transaction);
            let tx = await alchemy.core.sendTransaction(raw_transaction);

            return { message: tx };
        }
        catch (error) {
            console.error({ error })
            return null;
        }
    }

    public async sendSol(amount: number, toPubkey: string) {
        let { url } = solanaBlockchainConfig.RpcConnectionUrls.DEVNET;
        if (process.env.NODE_ENV === "development") {
            url = "http://127.0.0.1:8899";
        }
        const wallet = WalletManager.getInstance();
        const solanaObj = wallet.getWallet();
        try {
            if (solanaObj === undefined) {
                throw new Error("Some Error Occured, Please Try Again Later");
            }
            const connection = new Connection(url, "confirmed");

            const account = solanaObj[0];
            const { privateKey } = account;
            const fromKeypair = new Keypair({
                publicKey: Keypair.fromSecretKey(new Uint8Array(privateKey as number[])).publicKey.toBytes(),
                secretKey: new Uint8Array(privateKey as number[]) as Uint8Array
            })
            const toPublicKey = new PublicKey(toPubkey);

            const transfer_transaction = new Transaction().add(
                SystemProgram.transfer({
                    fromPubkey: fromKeypair.publicKey,
                    toPubkey: toPublicKey,
                    lamports: amount * LAMPORTS_PER_SOL
                })
            )

            await sendAndConfirmTransaction(connection, transfer_transaction, [
                fromKeypair
            ]);
            return { message: `Transaction Successful` }
        } catch (error) {
            console.error({ error });
            return null;
        }
    }


    public async getCurrentSolUsdcPrice(): Promise<number | null> {
        try {
            const response = await axios.get('https://api.coingecko.com/api/v3/simple/price?ids=solana&vs_currencies=usd');
            const price = response.data.solana.usd;
            return price;
        } catch (error) {
            console.error('Error fetching SOL/USD price:', error);
            return null;
        }
    }

    public async getSolPrice() {

        const wallet = WalletManager.getInstance();
        const account: Accounts[] = wallet.getWallet()!;

        try {
            const publicKey = new PublicKey(account[0].publicKey);
            let url = solanaBlockchainConfig.RpcConnectionUrls.DEVNET.url;
            if (process.env.NODE_ENV === "development") url = "http://127.0.0.1:8899";

            const solConnection = new Connection(url);

            const accountInfo = await solConnection.getAccountInfo(publicKey);

            if (accountInfo === null) throw Error(' get pool info error ')

            const lamports = accountInfo.lamports;
            const solBalance = lamports / 1e9; // Convert lamports to SOL

            const solUsdcPrice = await this.getCurrentSolUsdcPrice();

            const usdcValue = solBalance * solUsdcPrice!;

            return usdcValue.toFixed(2);
        }
        catch (error) {
            console.error({ error });
            return null;
        }
    }

    public async airdropSol(amount: number) {
        let { url } = solanaBlockchainConfig.RpcConnectionUrls.DEVNET;
        if (process.env.NODE_ENV === "development") {
            url = "http://127.0.0.1:8899";
        }
        const wallet = WalletManager.getInstance();
        const solanaObj = wallet.getWallet();
        try {
            if (solanaObj === undefined) {
                throw new Error("Some Error Occured, Please Try Again Later");
            }
            const connection = new Connection(url, "confirmed");
            const account = solanaObj[0];
            const { privateKey } = account;
            const fromKeypair = new Keypair({
                publicKey: Keypair.fromSecretKey(new Uint8Array(privateKey as number[])).publicKey.toBytes(),
                secretKey: new Uint8Array(privateKey as number[]) as Uint8Array
            })
            console.log({ fromKeypair })
            const airdropSignature = await connection.requestAirdrop(
                fromKeypair.publicKey,
                amount * LAMPORTS_PER_SOL,
            );

            const latestBlockHash = await connection.getLatestBlockhash();
            console.log({ latestBlockHash })

            const result = await connection.confirmTransaction({
                blockhash: latestBlockHash.blockhash,
                lastValidBlockHeight: latestBlockHash.lastValidBlockHeight,
                signature: airdropSignature,
            });
            console.log({ result })
            if (result.value.err) {
                throw new Error("Airdrop Failed, SOL not received")
            }

            return { success: "SOL Recieved from devnet" }
        } catch (err) {
            console.error({ err });
            return { error: "Airdrop Failed, SOL not received" }
        }
    }

    // public async getUsdcValueFromWei(): Promise<string | null> {
    //     try {
    //         const weiBalance = await this.getAccountBalance();
    //         const ethBalance = ethers.formatEther(weiBalance!);

    //         const ethUsdcPrice = await this.getCurrentEthUsdcPrice();

    //         const usdcValue = parseFloat(ethBalance) * ethUsdcPrice!;

    //         return usdcValue.toFixed(2);
    //     } catch (error) {
    //         console.error('Error in getUsdcValueFromWei:', error);
    //         return null;
    //     }
    // }

    // private async getAccountBalance(): Promise<bigint | null> {
    //     const password = window.localStorage.getItem('currentPassword');
    //     const wallet = WalletManager.getInstance(password!);
    //     const ethObj = wallet.getWallet()![1];
    //     try {
    //         const newWallet = new Wallet(ethObj.privateKey);
    //         const balance = await this.providerUrl.getBalance(newWallet.address);

    //         return balance;
    //     } catch (error) {
    //         console.error('Error fetching account balance:', error);
    //         return null;
    //     }
    // }

    // private async getCurrentEthUsdcPrice(): Promise<number | null> {
    //     try {
    //         const response = await axios.get('https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd');
    //         const price = response.data.ethereum.usd;
    //         return price;
    //     } catch (error) {
    //         console.error('Error fetching ETH/USD price:', error);
    //         return null;
    //     }
    // }
}