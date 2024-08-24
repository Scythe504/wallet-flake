import { ethereumConfig, solanaConfig } from "@/types/blockchain.type";
import { Accounts, WalletManager } from "./wallet";
import { Connection, Keypair, LAMPORTS_PER_SOL, PublicKey, sendAndConfirmTransaction, SystemProgram, Transaction } from "@solana/web3.js";
import { solanaBlockchainConfig } from "@/blockchains-config/solana/config";
import { ethereumBlockchainConfig } from "@/blockchains-config/eth/config";

export class Transact {

    constructor() {

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
            console.log({"done": "transaction"});
            return { message: `Transaction Succesfull` }
        } catch (error) {
            console.error({ error });
            return null;
        }
    }
}