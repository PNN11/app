export type RecursivePartial<T> = {
    [P in keyof T]?: T[P] extends (infer U)[]
        ? RecursivePartial<U>[]
        : T[P] extends object
        ? RecursivePartial<T[P]>
        : T[P]
}

export type PartialPick<T, S extends keyof T> = Partial<T> & Pick<T, S>

export type FlattenFields<T, Prefix extends string = ''> = T extends Record<string, unknown>
    ? {
          [K in keyof T]: K extends string
              ? FlattenFields<T[K], `${Prefix}${K}.`> | `${Prefix}${K}`
              : never
      }[keyof T]
    : never

export type OmitFunctions<T extends unknown> = {
    [K in keyof T as T[K] extends Function ? never : K]: T[K]
}

type IfAny<T, Y, N> = 0 extends 1 & T ? Y : N
type IsAny<T> = IfAny<T, true, false>
export type IsUnknown<T> = IsAny<T> extends true ? false : unknown extends T ? true : false

export type isEmpty<T> = keyof T extends [] ? true : false

export type Difference<T, U> = Pick<T, Exclude<keyof T, keyof U>>
