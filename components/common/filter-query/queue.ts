import { MutableRefObject } from 'react'

import deepmerge from 'deepmerge'
import { NextRouter } from 'next/router'
import qs from 'qs'

import { getRoutingQueryParams, overwriteMerge } from './utitls'

type QueueState = Record<string, any>

export class ParamsQueue {
    private timer: NodeJS.Timer | null

    private state: QueueState

    private router: MutableRefObject<NextRouter> | null

    setRouter = (router: MutableRefObject<NextRouter>): void => {
        this.router = router
        this.set(this.state)
    }

    set = (params: QueueState): void => {
        if (this.timer) {
            clearTimeout(this.timer)
            this.timer = null
        }

        this.state = deepmerge(this.state, params ?? {}, { arrayMerge: overwriteMerge })

        if (this.router?.current)
            this.timer = setTimeout(() => {
                const qurrentSearch = window.location.search.replace(/^\?/, '')

                const currentQuery = qs.parse(qurrentSearch ?? '')
                const pageQueries = getRoutingQueryParams(this.router.current)

                this.router.current?.replace(
                    {
                        pathname: this.router.current?.pathname,
                        query: qs.stringify(
                            deepmerge.all([currentQuery, this.state, pageQueries], {
                                arrayMerge: overwriteMerge,
                            })
                        ),
                    },
                    undefined,
                    { shallow: true }
                )
                this.state = {}
            }, 100)
    }
}
