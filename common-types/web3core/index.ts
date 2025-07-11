import { Core } from '../core';

export namespace Web3Core {
  export enum EChainID {
    POLYGON = '0x89',
    TPOLYGON = '0x13881',
    SKALE_TESTNET = '0x3a14269b',
  }

  export type TCainCode = keyof typeof EChainID;

  export type TWalletWeb3 = {
    address: string;
    chainId: '0x89' | '0x13881';
    provider: TWalletProvider;
    chainType: ChainType;
  };

  export enum EWalletProvider {
    METAMASK = 'METAMASK',
    PHANTOM = 'PHANTOM',
    OKX = 'OKX',
    BLOCTO = 'BLOCTO',
    CUSTODIAL_ETH = 'CUSTODIAL_ETH',
  }

  export enum ChainTypeEnum {
    ETH = 'ETH',
  }

  export type TWalletProvider = keyof typeof EWalletProvider;
  export type ChainType = `${ChainTypeEnum}`;

  export type TNonceResponse = Core.Response<{
    msg: string;
    nonce: number;
  }>;

  export interface IBlockchainRequestParams {
    chain: Web3Core.EChainID;
  }

  export interface IBaseTxResult {
    hash: string;
    blockHash: Core.Nullable<string>;
    nonce: number;
    data: string;
    chainId: number;
  }

  export interface WalletInfo {
    seed: string;
    addresses: {
      address: string;
      chainType: Web3Core.ChainType;
      derivation: string;
    }[];
  }
}
