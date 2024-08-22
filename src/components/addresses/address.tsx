'use client'
import { ethereumBlockchainConfig } from '@/blockchains-config/eth/config';
import { solanaBlockchainConfig } from '@/blockchains-config/solana/config';
import { WalletManager } from '@/utils/wallet';
import { Keypair } from '@solana/web3.js';
import { mnemonicToSeedSync } from 'bip39';
import { derivePath } from 'ed25519-hd-key';
import { encodeBase58, HDNodeWallet } from 'ethers';
import { useEffect, useState } from 'react';
import nacl from 'tweetnacl';
import { ImportWallet } from '../import/import-wallet';



export const Address = () => {

    return <div>
        <ImportWallet/>
    </div>
};