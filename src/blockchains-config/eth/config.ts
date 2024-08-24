import { getAddress} from "ethers";
import { EthereumConnectionUrl } from "./connection-url";
import { EthereumExplorer } from "./explorer";

export const ethereumBlockchainConfig = {
    caip2Id: "eip155:1", // caip-2 "namespace:reference"
    caip2Namespace: "eip155",
    caip2Reference: "1",
  
    // _defaultRpcUrl: EthereumConnectionUrl.MAINNET,
    // get defaultRpcUrl() {
    //     return this._defaultRpcUrl;
    // },
    // set defaultRpcUrl(value) {
    //     this._defaultRpcUrl = value;
    // },
    blowfishUrl:
      "https://blowfish.xnftdata.com/ethereum/v0/mainnet/scan/transactions",
    isTestnet: false,
  
    Enabled: true,
    // _Blockchain: Blockchain.ETHEREUM,
    // get Blockchain() {
    //     return this._Blockchain;
    // },
    // set Blockchain(value) {
    //     this._Blockchain = value;
    // },
    Name: "Ethereum",
    GasTokenName: "ETH",
    GasTokenDecimals: 18,
    AppTokenName: "ERC20",
    RampSupportedTokens: [
      {
        title: "ETH",
        subtitle: "Ethereum",
        icon: "/ethereum.png",
      },
    ],
  
    DerivationPathPrefix: "m/44'/60'",
    DerivationPathRequireHardening: false,
    DerivationPathOptions: [
      {
        label: "Backpack",
        pattern: "m/44'/60'/x'/0'",
      },
      {
        label: "Backpack Legacy",
        pattern: "m/44'/60'/0'/0'/x'",
      },
      {
        label: "Ethereum Legacy",
        pattern: "m/44'/60'/x'",
      },
      {
        label: "Ledger",
        pattern: "m/44'/60'/0'/x",
      },
      {
        label: "Ledger Live",
        pattern: "m/44'/60'/x'/0/0",
      },
      {
        label: "Ethereum Standard",
        pattern: "m/44'/60'/0'/0/x",
      },
    ],
  
    PreferencesDefault: {
      explorer: EthereumExplorer.DEFAULT,
      connectionUrl: EthereumConnectionUrl.DEFAULT,
      chainId: "0x1",
    },
    validatePublicKey: (address: string) => {
      try {
        getAddress(address);
      } catch (e) {
        return false;
      }
      return true;
    },
    logoUri:
      "https://s3.us-east-1.amazonaws.com/app-assets.xnfts.dev/images/useBlockchainLogo/ethereum.png",
    bip44CoinType: 60,
    localLogoUri: "./ethereum.svg",
    requiresChainId: true,
    RpcConnectionUrls: {
      MAINNET: {
        name: "Mainnet",
        url: EthereumConnectionUrl.MAINNET,
        chainId: "0x1",
      },
      SEPOLIA: {
        name: "Sepolia",
        url: EthereumConnectionUrl.SEPOLIA,
        chainId: "0xaa36a7",
      },
      GOERLI: {
        name: "Görli Testnet",
        url: EthereumConnectionUrl.GOERLI,
        chainId: "0x5",
      },
    },
  };