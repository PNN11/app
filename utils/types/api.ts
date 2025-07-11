type BaseParams = { signal?: AbortSignal }

export type RequestFn<Params = undefined, ReturnType = void> = (
    params: Params & BaseParams
) => Promise<ReturnType>
export type EmptyRequestFn<ReturnType = void> = (params?: BaseParams) => Promise<ReturnType>
