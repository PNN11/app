import { Core } from '../core';

export const formOptions = {
  ambassadors: 'ambassadors',
  formGames: 'form-games',
  deleteAccount: 'delete-account',
} as const;

export namespace FormTypes {
  export type Options = Core.ObjectValues<typeof formOptions>;

  export interface AmbassadorFormValues {
    personalInfo: {
      firstName: string;
      lastName: string;
      email: string;
      phone?: string;
      country?: string;
    };
    socials?: {
      discord?: string;
      twitter?: string;
      telegram?: string;
      youtube?: string;
      tiktok?: string;
      other?: string;
    };
    about: {
      occupation: string;
      experience: string;
      other: string;
    };
    interactions: {
      duration: string;
      favorite: string;
    };
    role: {
      role: string;
      strategy: string;
    };
  }

  type YesNoField = 'yes' | 'no';

  export interface FormGameValues {
    personalInfo: {
      firstName: string;
      lastName: string;
      phone?: string;
    };
    gameInfo: {
      name: string;
      genre: string;
      description: string;
    };
    development: {
      conceptIsReady: YesNoField;
      inDevelopment: YesNoField;
      launched: YesNoField;
    };
    agreements: {
      correctInfo: boolean;
      privacyPolicy: boolean;
    };
  }

  export interface DeleteAccountFormValues {
    name: string;
    email: string;
    message: string;
  }
  export interface IDOFormValues {
    name: string;
    email: string;
    walletAddress: string;
  }
  export interface TankMasterWhitelistForm {
    name: string;
    email: string;
    walletAddress: string;
  }
  export interface NFTGiveawayFormValues {
    name: string;
    email: string;
    walletAddress: string;
    code: string;
  }

  export type FormsParams = {
    ambassadors: AmbassadorFormValues;
    'form-games': FormGameValues;
    'delete-account': DeleteAccountFormValues;
    'ido-participants': IDOFormValues;
    'nft-giveaway': NFTGiveawayFormValues;
    'tank-master-whitelist-participants': TankMasterWhitelistForm;
  };

  export type SubmitFormFunc = <K extends keyof FormsParams>(
    params: { form: K } & FormsParams[K]
  ) => Promise<{ _id: string }[] | { errors?: { message: string }[] }>;
}
