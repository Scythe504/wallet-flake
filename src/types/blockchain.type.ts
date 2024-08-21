import { ethereumBlockchainConfig } from "@/blockchains-config/eth/config";
import { solanaBlockchainConfig } from "@/blockchains-config/solana/config";

export type ethereumConfig = typeof ethereumBlockchainConfig;
export type solanaConfig = typeof solanaBlockchainConfig;

