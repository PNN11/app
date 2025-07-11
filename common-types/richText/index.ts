type TText = 'bold' | 'italic' | 'underline' | 'strikethrough' | 'code';

export type Elements =
  | 'h1'
  | 'h2'
  | 'h3'
  | 'indent'
  | 'ol'
  | 'ul'
  | 'li'
  | 'upload'
  | 'link'
  | 'image-description'
  | 'p';

type BaseElement = {};
export type BaseLink = BaseElement & {
  type: 'link';
  url: string;
  newTab?: boolean;
  children: TTextElement[];
};
export type LinkCuston = BaseLink & { linkType: 'custom' };
export type LinkInternal = BaseLink & { linkType: 'internal'; doc: unknown };
export type TLink = LinkInternal | LinkCuston;

export type Text = { text: string; type: undefined; children: Text[] | undefined } & Partial<Record<TText, boolean>>;
export type TTextElement = Text | TLink;

export type THeading1 = BaseElement & { type: 'h1'; children: TTextElement[] };
export type THeading2 = BaseElement & { type: 'h2'; children: TTextElement[] };
export type THeading3 = BaseElement & { type: 'h3'; children: TTextElement[] };

export type TListItem = {
  type: 'li';
  children: TTextElement[] | [TUnorederedList | TOrederedList | TIndent];
};
export type TOrederedList = BaseElement & { type: 'ol'; children: TListItem[] };
export type TUnorederedList = BaseElement & { type: 'ul'; children: TListItem[] };

export type TUploadFields = { alt?: string; link?: string; newWindow?: boolean };

export type Upload = BaseElement & {
  type: 'upload';
  relationTo: string;
  value: { id: string };
  children: Text[];
  fields?: TUploadFields;
};
export type TImageDescription = BaseElement & {
  type: 'image-description';
  children: TTextElement[];
};

export type TIndent = BaseElement & { type: 'indent'; children: Children[] };

export type Children =
  | TLink
  | THeading1
  | THeading2
  | THeading3
  | TOrederedList
  | TUnorederedList
  | Upload
  | TIndent
  | Text
  | TImageDescription;
