import { NextMiddleware, NextResponse } from 'next/server'
import { MiddlewareFactory } from './types'

const MAX_MIDDLEWARE_NUMBER = 10
class MiddlewareChain {
    constructor() {}

    chain(factory: MiddlewareFactory) {}
}
export function chainMiddlewares(middlewares: MiddlewareFactory[] = [], index = 0): NextMiddleware {
    if (index === MAX_MIDDLEWARE_NUMBER) throw new Error('[WARNING] You reach middleware limit')

    const current = middlewares[index]

    try {
        if (current) {
            const next = chainMiddlewares(middlewares, index + 1)
            return current(next)
        }
    } catch (e) {
        return () => NextResponse.rewrite(new URL('/500'))
    }
    return () => NextResponse.next()
}
