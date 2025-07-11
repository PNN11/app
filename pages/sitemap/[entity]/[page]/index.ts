import { AxiosResponseHeaders } from 'axios'
import { GetServerSideProps } from 'next'

import {
    SitemapEntities,
    checkAndWait,
    entitiesPerRequest,
    entityToExtra,
    entityToLink,
    entityToNamespaces,
    entityToRequest,
    linkToUrl,
    perSitemapPage,
    requestEntity,
    wrapSitemap,
} from 'utils/sitemap'

function EntitySiteMap(): any {
    // getServerSideProps will do the heavy lifting
}

export const getServerSideProps: GetServerSideProps = async ({ res, query }) => {
    const entity = query.entity as unknown as SitemapEntities
    const page = Number(query.page) || 0

    if (!entity) {
        res.end()

        return
    }

    const toLink = entityToLink[entity]
    const request = entityToRequest[entity]
    const extra = entityToExtra[entity]
    const namespaces = entityToNamespaces[entity]

    let hasNext = true
    let offset = 0
    const urls: string[] = []

    while (hasNext && offset < perSitemapPage) {
        // eslint-disable-next-line no-await-in-loop
        const response = await requestEntity(
            request,
            page,
            offset + entitiesPerRequest > perSitemapPage ? perSitemapPage - offset : undefined,
            offset
        )

        response.data.docs.forEach(i => {
            urls.push(
                linkToUrl(
                    // @ts-ignore
                    toLink(i),
                    // @ts-ignore
                    extra?.(i)
                )
            )
        })

        hasNext = response.data.hasNextPage
        offset += entitiesPerRequest

        // eslint-disable-next-line no-await-in-loop
        await checkAndWait(response.headers as AxiosResponseHeaders)
    }

    res.setHeader('Content-Type', 'text/xml')
    res.write(wrapSitemap(urls.join(''), namespaces))
    res.end()

    return { props: {} }
}

export default EntitySiteMap
