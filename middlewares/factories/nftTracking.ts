// middleware/withLogging.ts
import axios, { AxiosHeaders } from 'axios'
import { ENV } from 'env'
import { MiddlewareFactory } from 'middlewares/types'
import { NextFetchEvent, NextRequest, NextResponse } from 'next/server'
import { accessTokenKey, refreshTokenKey } from 'utils/constants/auth'

const config = new Map([
    [/\/secret/, ['P1']],
    [/\/secret-2/, ['P2']],
])

const wrapRegex = (regex: RegExp): RegExp =>
    new RegExp(`(${regex.source}$)|(${regex.source}(\.js))`)

export const nftTracking: MiddlewareFactory = next => {
    return async function middleware(request: NextRequest, _next: NextFetchEvent) {
        const url = request.nextUrl.pathname
        const matchers = config.entries()
        let privileges

        for (let [matcher, requirements] of Array.from(matchers)) {
            if (wrapRegex(matcher).test(url)) {
                if (typeof privileges === 'undefined') {
                    const token = request.cookies.get(accessTokenKey)

                    if (!token) return NextResponse.rewrite(new URL('/auth/sign-in', request.url))

                    privileges = await fetch(
                        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/privileges`,
                        {
                            method: 'GET',
                            headers: {
                                'access-token': token.value,
                            },
                        }
                    ).then(r => r.json())
                }

                const aliases = Object.keys(privileges)

                if (aliases.some(alias => requirements.includes(alias))) {
                    return next(request, _next)
                }

                return NextResponse.rewrite(new URL('/404', request.url))
            }

            continue
        }

        return next(request, _next)
    }
}
