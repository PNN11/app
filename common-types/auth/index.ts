import { Core } from '../core';
import { Web3Core } from '../web3core';

export namespace Auth {
  // Body
  export type TSignIn = {
    user: TUsernameSignIn;
    walletWeb3: Web3Core.TWalletWeb3;
    signature: string;
    lastName?: string;
    firstName?: string;
    photoHash?: string;
  };

  export type TSignUp = {
    login: string;
    password: string;
  };

  export type TSignInWeb3 = Web3Core.TWalletWeb3 & {
    signature: any;
  };

  export type TAddressAndChainId = {
    address: string;
    chainId: Web3Core.TWalletWeb3['chainId'];
  };

  export type TUsernameSignIn = {
    name: string;
    password: string;
  };

  export type TCodeConfirmation = {
    code: string;
  };

  export type TCodeConfirmationAndEmail = TCodeConfirmation & {
    email: string;
  };

  export type TJwtToken = {
    token: string;
    expiresIn: number;
  };

  // RESPONSES
  export type TJwtTokensResponse = Core.Response<TJWTAccessTokenResponse & TJWTRefreshTokenResponse>;

  export type TJWTAccessTokenResponse = Core.Response<{
    accessToken: TJwtToken;
  }>;

  export type TJWTRefreshTokenResponse = Core.Response<{
    refreshToken: TJwtToken;
  }>;

  export type TJwtTokenResponse = Core.Response<TJwtToken>;

  export type TNextAttemptResponse = Core.Response<{
    nextAttemptTime: number;
  }>;
  export type TAdminSignResponse = Core.Response<{
    id: string;
  }>;
}
