import { GetServerSideProps } from 'next'

import {
    entityToRequest,
    linkToSitemap,
    perSitemapPage,
    requestEntity,
    wrapSitemapIndex,
} from 'utils/sitemap'

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
function SiteMap() {}

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
    // We make an API call to gather the URLs for our site
    const entities = Object.entries(entityToRequest)

    const results = await Promise.allSettled(
        entities.map(([entity, request]) =>
            requestEntity(request, 0, 1).then(info => ({ entity, info: info.data }))
        )
    )

    const entityToSitemaps: {
        entity: string
        links: string[]
    }[] = [{ entity: 'main', links: ['/sitemap'] }]

    results.forEach(response => {
        if (response.status !== 'fulfilled') return

        const { value } = response
        const totalPages = Math.ceil(value.info.totalDocs / perSitemapPage)

        entityToSitemaps.push({
            entity: value.entity,
            links: Array.from({ length: totalPages }).map(
                (el, index) => `/sitemap/${value.entity}/${index}`
            ),
        })
    })

    const sitemap = wrapSitemapIndex(
        entityToSitemaps.map(({ links }) => links.map(l => linkToSitemap(l)).join('')).join('')
    )

    res.setHeader('Content-Type', 'text/xml')
    res.write(sitemap)
    res.end()

    return {
        props: {},
    }
}

export default SiteMap
