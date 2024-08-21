import { ethereumBlockchainConfig } from '@/blockchains-config/eth/config';
import { solanaBlockchainConfig } from '@/blockchains-config/solana/config';
import { Keypair } from '@solana/web3.js';
import { mnemonicToSeedSync } from 'bip39';
import { derivePath } from 'ed25519-hd-key';
import { encodeBase58, HDNodeWallet } from 'ethers';
import nacl from 'tweetnacl';

function deriveEthAddress(mnemonic: string, pattern: string) {
    try {
        const firstWallet = HDNodeWallet.fromPhrase(mnemonic, "", pattern.replace('x', '0'));
        const privKey = firstWallet.privateKey;
        console.log({
            firstWallet,
            privKey,
        })
        for (let i = 0; i < 3; i++) {
            const path = pattern.replace('x', i.toString());
            const hdNode = HDNodeWallet.fromPhrase(mnemonic, "", path);
            // console.log({
            //     path,
            //     hdNode,
            // })
        }
    } catch (error) {
        console.error('Error deriving addresses:', error);
    }
}

function deriveSolAddress() {
    // const mnemonic = "scan banana transfer round find awake other useful half engage control share";
    // const mnemonic_legacy = "bike elegant scrap until arrest improve victory dizzy already fiber dove enroll"
    const metamask = "fold exit require motor pluck hundred sad educate cook toast debate bean"
    const seed = mnemonicToSeedSync(metamask);
    for (let i = 0; i < 2; i++) {
        const path = solanaBlockchainConfig.DerivationPathOptions[0].pattern.replace('x', i.toString());
        const derivedSeed = derivePath(path, seed.toString("hex")).key;
        const secret = nacl.sign.keyPair.fromSeed(derivedSeed).secretKey;
        const address = Keypair.fromSecretKey(secret).publicKey.toBase58();
        const privKey = encodeBase58(secret);
        console.log({
            address,
            privKey,
            path
        });
    }
}

export const Address = () => {
    // const mnemonic = "fold exit require motor pluck hundred sad educate cook toast debate bean";
    const mnemonic_legacy = "bike elegant scrap until arrest improve victory dizzy already fiber dove enroll"

    const addresses: string[] = [];
    deriveEthAddress(mnemonic_legacy, ethereumBlockchainConfig.DerivationPathOptions[5].pattern);
    deriveSolAddress();
    return (
        <div>
            <p>{addresses.join(', ')}</p>
        </div>
    );
};