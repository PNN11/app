import { Core } from '../core';
import { Economics } from '../economics';
export namespace WheelCore {
  type FixedDrop = {
    type: 'FIXED';
    properties: { value: number };
  };

  type RandomDrop = {
    type: 'RANDOM';
    properties: {
      min: number;
      max: number;
    };
  };

  type MaxQuantityDrop = RandomDrop;

  export type RewardType = 'VIRTUAL' | 'VIRTUAL_CURRENCY' | 'CRYPTO_CURRENCY' | 'ERC721' | 'PRIVILEGE' | 'LOSS';

  export interface Reward {
    id: string;
    type: RewardType;
    meta: {
      image: string;
      preview: string;
    };
    currency?: Economics.IAsset;
    updatedAt: string;
    createdAt: string;
  }

  export interface WheelReward {
    id: string;
    drop: {
      conditions: {
        conditionType: 'RANDOM' | 'GUARANTEED';
        conditionProperties: {
          chance: number;
        };
        id?: string;
      }[];
      limit: {
        maxDropForUser?: number;
        maxDropForDay?: number;
        maxQuantityDrop?: MaxQuantityDrop;
        poolReward: number;
      };
      state: {
        countDropReward: number;
      };
    };
    reward: Reward;
    updatedAt: string;
    createdAt: string;
  }

  export interface Wheel {
    id: string;
    alias: string;
    meta: {
      name: string;
    };
    limit: {
      countFreeSpinsPerDay: number;
    };
    rewards: WheelReward[];
    availableSpins?: number;
    totalMaxSpins: number;
  }

  export interface IWheelLogEntry {
    name: string;
    amount: number;
    user: string;
    type: RewardType;
  }

  export type BaseSpinResult = {
    meta: Core.ImageMeta;
    amount: number;
    indexReward: number;
  };

  type ExtendBaseSpinResult<T extends { type: RewardType }> = BaseSpinResult & T;

  export type ERC721SpinResult = ExtendBaseSpinResult<{ type: 'ERC721' }>;
  export type VirtualSpinResult = ExtendBaseSpinResult<{ type: 'VIRTUAL' }>;
  export type VirtualCurrencYSpinResult = ExtendBaseSpinResult<{
    type: 'VIRTUAL_CURRENCY';
    currency: Economics.IAsset;
  }>;
  export type CryptoSpinResult = ExtendBaseSpinResult<{ type: 'CRYPTO_CURRENCY'; currency: Economics.IAsset }>;
  export type PrivilegeSpinResult = ExtendBaseSpinResult<{ type: 'PRIVILEGE' }>;
  export type LossSpinResult = ExtendBaseSpinResult<{ type: 'LOSS' }>;

  export type SpinResult =
    | ERC721SpinResult
    | VirtualSpinResult
    | VirtualCurrencYSpinResult
    | CryptoSpinResult
    | PrivilegeSpinResult
    | LossSpinResult;

  type BaseReward<T extends unknown> = T & {
    meta: Core.ImageMeta;
  };

  type BaseRewardWithType<R extends unknown, T extends string> = BaseReward<R> & {
    type: T;
  };

  export type CryptoCurrencyReward = BaseRewardWithType<{ currency: Economics.ICryptolAsset }, 'CRYPTO_CURRENCY'>;

  export type VirutalCurrencyReward = BaseRewardWithType<{ currency: Economics.IVirtualAsset }, 'VIRTUAL_CURRENCY'>;

  export type CurrencyReward = VirutalCurrencyReward | CryptoCurrencyReward;

  export type ERC721Reward = BaseRewardWithType<{}, 'ERC721'>;

  export type StatReward = CurrencyReward | ERC721Reward;

  export type Drop<T extends StatReward = StatReward> = {
    reward: T;
    countDrop: number;
  };

  export type MyRewardsResponse = Drop[];
}
