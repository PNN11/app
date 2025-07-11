import { FC } from 'react'

type Remover<T> = T extends (infer U)[]
    ? (value: T, current: U) => T | null
    : (value: T, current: T) => T | null

export type UseFilterStateOptions<T> = {
    defaultValue: T | null
    debounceTime: number
    remover: Remover<T>
}

export type FilterPreview<T, S> = {
    selector: (store: T) => S
    Component: S extends (infer U)[] ? FC<{ value: U }> : FC<{ value: S }>
}
