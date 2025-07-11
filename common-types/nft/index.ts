export namespace NFT {
  export const ENFT = {
    BUY: 'BUY',
    AUCTION: 'AUCTION',
  } as const;

  type ObjectValues<T> = T[keyof T];

  type NFTType = ObjectValues<typeof ENFT>;
  export type TNft = {
    _id: string;
    game: string;
    name: string;
    type: NFTType;
    class: { title: string; color: string };
    button: string;
    img: string;
    bgColor: string;
    imgGameLogo: string;
    price: { count: number; coin: string };
  };
}
