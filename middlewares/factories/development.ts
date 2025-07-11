// middleware/withLogging.ts
import { NextFetchEvent, NextRequest, NextResponse } from 'next/server'

import { ENV } from 'env'
import { MiddlewareFactory } from 'middlewares/types'

const disablePages = []

export const onlyDevelopment: MiddlewareFactory = next => {
    return function middleware(request: NextRequest, _next: NextFetchEvent) {
        if (disablePages.length === 0) return next(request, _next)

        const url = request.nextUrl.pathname

        if (
            ENV.NEXT_PUBLIC_DISPLAY === 'production' &&
            disablePages.some(regexp => regexp.test(url))
        ) {
            return NextResponse.rewrite(new URL('/404', request.url))
        }

        return next(request, _next)
    }
}
