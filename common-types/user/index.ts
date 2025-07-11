import { Core } from '../core';
import { Web3Core } from '../web3core';

import { Economics } from '../economics';

export namespace User {
  export interface IProfile extends Core.IEntity {
    lastName: string;
    firstName: string;
    username: string;
    image: string;
    email: {
      value: string;
      isConfirmed: true;
    };
    currencies: Economics.IAsset[];
    wallets: Web3Core.TWalletWeb3[];
    credentials: 'EXCHANGE';
  }

  export interface IWallet {
    title: string;
    provider: Web3Core.EWalletProvider;
    chainId: Web3Core.EChainID;
    address: string;
    balance: BigInteger;
    _asset: string;
  }

  export interface IUser extends Core.IEntity {
    profile: IProfile;
    // wallets: IWallet[];
  }

  export type UsersResponse = Core.PaginatedResponse<IUser>;
}
