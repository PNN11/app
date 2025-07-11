import { ENV } from '../../env'

interface IEnvironmentHandler {
    effect(callback: (...args: any[]) => any): () => void
    array<T>(arr: Array<T>): Array<T>
    condition(value: boolean): boolean
    value<T>(value: T, ...values: T[]): T
}

const makeEffect =
    (env: typeof ENV.NEXT_PUBLIC_DISPLAY) => (callback: (...args: any[]) => any) => () => {
        if (ENV.NEXT_PUBLIC_DISPLAY !== env) {
            return
        }

        callback()
    }

const makeArray =
    (env: typeof ENV.NEXT_PUBLIC_DISPLAY) =>
    <T>(arr: Array<T>): Array<T> => {
        if (ENV.NEXT_PUBLIC_DISPLAY !== env) return []

        return arr
    }

const makeCondition =
    (env: typeof ENV.NEXT_PUBLIC_DISPLAY) =>
    (value: boolean = true) =>
        ENV.NEXT_PUBLIC_DISPLAY === env && value

const makeValue =
    (env: typeof ENV.NEXT_PUBLIC_DISPLAY) =>
    <T extends any>(value: T, ...values: T[]) => {
        if (ENV.NEXT_PUBLIC_DISPLAY === env) return value

        if (values.length === 0) return

        for (const _value of values) if (typeof _value !== 'undefined') return _value
    }

class DevelopmentHandler implements IEnvironmentHandler {
    array = makeArray('development')
    effect = makeEffect('development')
    condition = makeCondition('development')
    value = makeValue('development')
}

class ProductionHandler implements IEnvironmentHandler {
    array = makeArray('production')
    effect = makeEffect('production')
    condition = makeCondition('production')
    value = makeValue('production')
}

export const dev = new DevelopmentHandler()
export const prod = new ProductionHandler()
