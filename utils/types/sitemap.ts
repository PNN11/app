/* eslint-disable @typescript-eslint/no-unused-vars */
export type ExtractKeys<S extends string> = S extends `/${infer T}`
    ? ExtractKeys<T>
    : S extends `${infer _}[${infer K}]${infer Rest}`
    ? K | ExtractKeys<Rest>
    : never

export type PathToObject<T extends string> = { [K in ExtractKeys<T>]: string }

export type LinkFunction<T extends string> = T extends string
    ? (value: PathToObject<T>) => string
    : never
export type ReplaceBrackets<S extends string> = S extends `${infer Head}[${infer _}]${infer Tail}`
    ? `${Head}${string}${ReplaceBrackets<Tail>}`
    : S

export type EntityMap<
    T extends Record<string, string>,
    M extends Record<string, unknown>,
    R extends unknown
> = T extends Record<string, string>
    ? {
          [K in keyof T]: K extends keyof M ? (value: M[K]) => R : never
      }
    : never

export type FunctionMap<
    T extends Record<string, string>,
    M extends Record<string, unknown>
> = T extends Record<string, string>
    ? {
          [K in keyof T]: K extends keyof M ? (value: M[K]) => ReplaceBrackets<T[K]> : never
      }
    : never

export type EntityRequest = {
    method: 'get' | 'post'
    url: string
    params: Record<string, unknown>
}

export type RequestMap<T extends string> = {
    [K in T]: EntityRequest
}

export type Extending<T extends string, K extends Record<T, unknown>> = K extends Record<T, unknown>
    ? true
    : false

export type TagAttribute = [name: string, value: string]
