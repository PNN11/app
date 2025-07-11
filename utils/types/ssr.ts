import { DehydratedState } from 'react-query'

export type DehydretedProps<T> = Promise<{
    props: { dehydratedState: DehydratedState } & T
}>
