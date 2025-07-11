import { Core } from '../core';

export namespace Economics {
  export type AssetType = 'ERC20' | 'VIRTUAL';

  export interface IBaseAsset extends Core.IEntity {
    title: string;
    symbol: string;
    icon: string;
    decimals: number;
    chaiId: string;
    address: string;
  }

  type AssetWithType<T extends AssetType> = { type: T };
  export type IVirtualAsset = IBaseAsset & AssetWithType<'VIRTUAL'>;
  export type ICryptolAsset = IBaseAsset & AssetWithType<'ERC20'>;

  export type IAsset = IVirtualAsset | ICryptolAsset;

  export interface IPair {
    fromCurrency: IAsset;
    toCurrency: IAsset;
    rate: number;
  }

  export interface IAccount extends Core.IEntity {
    _user: string;
    _asset: string;
    balance: number;
    precision: number;
  }

  export interface ITransaction extends Core.IEntity {
    _userCredit: string;
    _userDebit: string;
    amount: number;
    comment: string;
  }

  // responses

  export type TransactionsResponse = Core.PaginatedResponse<ITransaction>;
  export type AssetsResponse = Core.PaginatedResponse<IAsset>;
  export type AssetsPairResponse = Core.PaginatedResponse<IPair>;
  export type AccountsResponse = Core.PaginatedResponse<IAccount>;
}
