export type PieDataType = { name: string; value: number; index: number }

export interface IServerError<T extends unknown = {}> {
    id: string
    type: string
    code: string
    message: string
    parameters?: T
}

export enum SlidersBreackpoints {
    '0px' = 0,
    '640px' = 640,
    '768px' = 768,
    '1024px' = 1024,
    '1280px' = 1280,
}

export type WithClassName<T, C = string> = T & {
    className?: C
}
