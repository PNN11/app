export namespace Gallery {
  export enum ListingType {
    NULL,
    BUY,
    AUCTION,
  }
  export type TxInfoType = {
    priceValue: number;
    startDate: Date;
    stopDate: Date;
    coin: string;
    currencyIcon?: string;
    listingType: Gallery.ListingType;
  };
}
