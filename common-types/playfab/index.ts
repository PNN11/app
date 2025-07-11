export namespace Playfab {
  interface ITitledRequestBody {
    TitleId: string;
  }

  export interface ILoginRequestBody extends ITitledRequestBody {
    Username: string;
    Password: string;
  }

  export interface IRegisterRequestBody {
    Username: string;
    Password: string;
  }

  export enum EEntityKeyType {
    NAMESPACE = 'namespace',
    TITLE = 'title',
    MASTER_PLAYER_ACCOUNT = 'master_player_account',
    TITLE_PLAYER_ACCOUNT = 'title_player_account',
    CHARACTER = 'character',
    GROUP = 'group',
    SERVICE = 'service',
  }

  export interface IEntityKey {
    Id: string;
    Type: EEntityKeyType;
  }

  export interface IEEntityTokenResponse {
    Entity: IEntityKey;
    EntityToken: string;
    TokenExpiration: string;
  }

  export interface IUserAccountInfo {
    PlayFabId: string;
    Username: string;
  }

  export interface IPlayerCombinedInfo {
    AccountInfo: IUserAccountInfo;
    UserData?: unknown;
  }

  export interface ILoginResponse {
    PlayFabId: string;
    InfoResultPayload: IPlayerCombinedInfo;
    EntityToken: IEEntityTokenResponse;
  }

  export interface IRegisterResponse {
    Username: string;
    PlayFabId: string;
    InfoResultPayload: IPlayerCombinedInfo;
    EntityToken: IEEntityTokenResponse;
  }

  export interface IVirtualCurrency {
    value: string;
  }

  export interface IUserIventoryResponse {
    VirtualCurrrency: IVirtualCurrency[];
  }
}
