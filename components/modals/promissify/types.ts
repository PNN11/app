import type { FC } from 'react'

import { Difference, IsUnknown, isEmpty } from 'utils/types/helpers'

type EnsureBoolean<T> = T extends boolean ? boolean : T

export type ConfirmableProps<T extends unknown = undefined> = T extends undefined
    ? {
          show: boolean
          proceed: () => void
          cancel: () => void
      }
    : {
          show: boolean
          proceed: (value: EnsureBoolean<T>) => void
          cancel: () => void
      }

type ExtractProceed<P> = P extends ConfirmableProps<infer R>
    ? IsUnknown<R> extends true
        ? void
        : R
    : void

export type ModalFunction<C extends FC> = C extends FC<infer P>
    ? isEmpty<Difference<P, ConfirmableProps>> extends true
        ? () => Promise<ExtractProceed<P>>
        : (options: Difference<P, ConfirmableProps>) => Promise<ExtractProceed<P>>
    : never
