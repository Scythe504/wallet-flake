import { ethereumConfig, solanaConfig } from "@/types/blockchain.type";
import { Accounts, currentAccount, WalletManager } from "./wallet";
import { Connection, Keypair, LAMPORTS_PER_SOL, PublicKey, sendAndConfirmTransaction, SystemProgram, Transaction } from "@solana/web3.js";
import { solanaBlockchainConfig } from "@/blockchains-config/solana/config";
import { ethereumBlockchainConfig } from "@/blockchains-config/eth/config";
import { Alchemy, Network, Wallet, Utils } from 'alchemy-sdk';
import { PoolInfoLayout, SqrtPriceMath } from "@raydium-io/raydium-sdk"

export class Transact {

    constructor() {

    }
    public async sendEth(amount: number, toPubKey: string) {
        const { API_KEY } = process.env;
        const password = window.localStorage.getItem('currentPassword');
        const wallet = WalletManager.getInstance(password!);
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
        // const { url } = this.solana.RpcConnectionUrls.DEVNET;
        const url = "http://127.0.0.1:8899";
        const password = window.localStorage.getItem('currentPassword');
        const wallet = WalletManager.getInstance(password!);
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

            const airdropSignature = await connection.requestAirdrop(
                fromKeypair.publicKey,
                amount * LAMPORTS_PER_SOL,
            );

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
            console.log({ "done": "transaction" });
            return { message: `Transaction Succesfull` }
        } catch (error) {
            console.error({ error });
            return null;
        }
    }

    public async getSolPrice() {
        const password = window.localStorage.getItem('password');

        const wallet = WalletManager.getInstance(password!);
        const account: Accounts[] = wallet.getWallet()!;

        try {

            const publicKey = new PublicKey(account[0].publicKey);

            const url = "http://127.0.0.1:8899"
            const solConnection = new Connection(url);

            const accountInfo = await solConnection.getAccountInfo(publicKey);


            if (accountInfo === null) throw Error(' get pool info error ')

            const poolData = PoolInfoLayout.decode(accountInfo.data)

            return (SqrtPriceMath.sqrtPriceX64ToPrice(poolData.sqrtPriceX64, poolData.mintDecimalsA, poolData.mintDecimalsB).toFixed(2))
        }
        catch (error) {
            console.error({ error });
            return null;
        }
    }
}