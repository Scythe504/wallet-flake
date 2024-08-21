import { PublicKey } from "@solana/web3.js";
import { SolanaExplorer } from "./explorer";
import { SolanaCluster } from "./cluster";

const remoteLogoUri = "";
const bip44CoinType = 501;

export const solanaBlockchainConfig = {
    caip2Id: "solana:5eykt4UsFv8P8NJdTREpY1vzqKqZKvdp", // caip-2 "namespace:reference"
    caip2Namespace: "solana",
    caip2Reference: "5eykt4UsFv8P8NJdTREpY1vzqKqZKvdp",  
    API: process.env.SOLSCAN_API!,
    blowfishUrl:
        "https://blowfish.xnftdata.com/solana/v0/mainnet/scan/transactions",
    Name: "Solana",
    GasTokenName: "SOL",
    GasTokenDecimals: 9,
    AppTokenName: "SPL",
    RampSupportedTokens: [
        {
            title: "SOL",
            icon: remoteLogoUri,
            subtitle: "Solana"
        }
    ],
    DerivationPathPrefix: "m/44'/501'",
    DerivationPathRequireHardening: true,
    DerivationPathOptions: [
        {
            label: "Backpack",
            pattern: "m/44'/501'/x'/0'",
        },
        {
            label: "Backpack Legacy",
            pattern: "m/44'/501'/0'/0'/x'",
        },
        {
            label: "Solana Legacy",
            pattern: "m/44'/501'/x'",
        },
        {
            label: "Ledger Live",
            pattern: "m/44'/501'/x'/0'/0'",
        },
    ],
    validatePublicKey: (address: string) => {
        try {
            new PublicKey(address);
        } catch (err) {
            return false;
        }
        return true;
    },
    logoUri: remoteLogoUri,
    bip44CoinType: bip44CoinType,
    localLogoUri: "./solana.png",
    requiresChainId: false,
    RpcConnectionUrls: {
        MAINNET: {
          name: "Mainnet (Beta)",
          url: SolanaCluster.MAINNET,
        },
        DEVNET: {
          name: "Devnet",
          url: SolanaCluster.DEVNET,
        },
      },
      ConfirmationCommitments: {
        Processed: {
          commitment: "processed",
        },
        Confirmed: {
          commitment: "confirmed",
        },
        Finalized: {
          commitment: "finalized",
        },
      },
      Explorers: {
        "Solana Beach": {
          url: SolanaExplorer.SOLANA_BEACH,
        },
        "Solana Explorer": {
          url: SolanaExplorer.SOLANA_EXPLORER,
        },
        "Solana FM": {
          url: SolanaExplorer.SOLANA_FM,
        },
        Solscan: {
          url: SolanaExplorer.SOLSCAN,
        },
        XRAY: {
          url: SolanaExplorer.XRAY,
        },
      },
}