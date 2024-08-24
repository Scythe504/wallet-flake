import { solanaBlockchainConfig } from '@/blockchains-config/solana/config'
import {
    Connection,
    clusterApiUrl,
    LAMPORTS_PER_SOL,
    Transaction,
    sendAndConfirmTransaction,
    SystemProgram,
    Keypair
} from '@solana/web3.js'

const config = solanaBlockchainConfig;
const { url } = config.RpcConnectionUrls.DEVNET;

const connection = new Connection(url, "confirmed");



// hEGoxt8MNzqjcbTdc6vVCGx9pmDJnrjduH57UAzXe28RqbNXnNMmeWAJpXXvcQSg94LUQpcq4r3VjGHefSBSzhq
