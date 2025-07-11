export namespace Core {
  export type Nullable<T> = T | null;

  export interface IAuthHeaders {
    'access-token': string;
    'refresh-token': string;
  }

  export type DefaultResponse = {};

  export type Response<T> = T;

  export type PaginatedResponse<T> = {
    totalDocs: number;
    offset: number;
    limit: number;
    totalPages: number;
    page: number;
    hasPrevPage: boolean;
    hasNextPage: boolean;
    prevPage: Nullable<number>;
    nextPage: Nullable<number>;
    docs: T[];
  };

  export type PaginatedRequestBaseParams = { limit: string; offset: string };

  export interface IServerError<T extends unknown = {}> {
    id: string;
    type: string;
    code: string;
    message: string;
    parameters?: T;
  }

  export interface IEntity {
    _id: string;
  }

  export const SortVariants = {
    DESC: 'DESC',
    ASC: 'ASC',
  } as const;

  export type ObjectValues<T> = T[keyof T];

  export type SortParams = ObjectValues<typeof SortVariants>;

  export type ImageMeta = {
    image: string;
    preview: string;
  };

  export interface Media {
    id: string;
    url?: string;
    filename?: string;
    mimeType?: string;
    filesize?: number;
    width?: number;
    height?: number;
    uuid?: string;
    createdAt: string;
    updatedAt: string;
  }
}
