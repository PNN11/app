import type { FC } from 'react'

import {
    confirmable,
    createConfirmationCreater,
    createMountPoint,
    createReactTreeMounter,
} from 'react-confirm'

import { ConfirmableProps, ModalFunction } from './types'

const mounter = createReactTreeMounter()

export const createConfirmation = createConfirmationCreater(mounter)
export const MountPoint = createMountPoint(mounter)

export function promisifyModal<
    C extends FC<P>,
    P extends ConfirmableProps | ConfirmableProps<unknown>
>(component: C): ModalFunction<C> {
    const wrapeed = confirmable(component)

    const confirmFunction = createConfirmation(wrapeed)

    return (async options => {
        return confirmFunction(options)
    }) as ModalFunction<C>
}
