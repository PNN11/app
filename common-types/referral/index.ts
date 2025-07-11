import { Core } from '../core';
import { Economics } from '../economics';

export namespace IReferral {
  export type ReferralCode = {
    count: number;
    activeCount: number;
    commonCount: number;
    referralCode: string;
    url: string;
    rewardAmount: number;
    bonusReward: number;
    name: string;
    currency?: Economics.IAsset;
  };

  export type GetManyCodesResponse = Core.PaginatedResponse<ReferralCode>;

  export type Reward = {
    id: string;
    countReferrals: number;
    countReward: number;
  };

  export type RewardsResponse = {
    list: Reward[];
    countReferrals: number;
  };
}
