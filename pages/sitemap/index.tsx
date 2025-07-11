import { GetServerSideProps } from 'next'

import { linkToUrl, toTag, wrapSitemap } from 'utils/sitemap'

const IndexSitemap = (): any => {
    return <div>index</div>
}

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
    const entityToURLMaps: {
        entity: string
        links: string[]
    }[] = [
        { entity: 'ido', links: ['/ido'] },
        { entity: 'about', links: ['/about'] },
        { entity: 'sign-in', links: ['/auth/sign-in'] },
        { entity: 'google-sign-in', links: ['/auth/sign-in/google'] },
        { entity: 'sign-up', links: ['/auth/sign-up'] },
        { entity: 'email-change', links: ['/auth/email/change'] },
        { entity: 'email-change-confirm', links: ['/auth/email/change/confirm'] },
        {
            entity: 'email-change-confirm-completed',
            links: ['/auth/email/change/confirm/complete'],
        },
        { entity: 'email-confirm', links: ['/auth/email/confirm'] },
        {
            entity: 'email-confirm-completed',
            links: ['/auth/email/confirm/completed'],
        },
        { entity: 'password-new', links: ['/auth/password/new'] },
        { entity: 'password-reset', links: ['/auth/password/reset'] },
        { entity: 'community', links: ['/community'] },
        { entity: 'conferences-reward', links: ['/conferences-reward'] },
        { entity: 'deleteaccount', links: ['/deleteaccount'] },
        { entity: 'developers', links: ['/developers'] },
        { entity: 'ino', links: ['/ino'] },
        { entity: 'marketplace', links: ['/marketplace'] },
        { entity: 'nft-giveaway', links: ['/nft-giveaway'] },
        { entity: 'privacy', links: ['/privacy'] },
        { entity: 'policy', links: ['/policy'] },
        { entity: 'profile', links: ['/profile'] },
        { entity: 'raffle', links: ['/raffle'] },
        { entity: 'stacking', links: ['/stacking'] },
        { entity: 'swap', links: ['/swap'] },
        { entity: 'terms', links: ['/terms'] },
        { entity: 'unitysdk', links: ['/unitysdk'] },
    ]

    const sitemap = wrapSitemap(
        entityToURLMaps
            .map(({ links }) =>
                links.map(l => linkToUrl(l, toTag('lastmod', new Date().toISOString()))).join('')
            )
            .join('')
    )

    res.setHeader('Content-Type', 'text/xml')
    res.write(sitemap)
    res.end()

    return {
        props: {},
    }
}

export default IndexSitemap
