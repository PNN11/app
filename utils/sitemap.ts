/* eslint-disable prettier/prettier */
import axios, { AxiosResponse, AxiosResponseHeaders } from 'axios'

import { EntityMap, EntityRequest, Extending, FunctionMap, RequestMap, TagAttribute } from './types/sitemap'

import { Core } from 'common-types/core'
import { Game } from 'common-types/game'
import { IMarketplaceToken } from 'common-types/marketplace/marketplace-token'
import { TPost } from 'components/postElements/postElements-types'

export const EXTERNAL_DATA_URL = process.env.NEXT_PUBLIC_ORIGIN
export const perSitemapPage = 50000
export const entitiesPerRequest = 100

export const entities = {
    posts: '/blog/[address]'|| '/blog/[category]/[address]',
    games: '/games/[address]',
    nfts: '/nft/[id]',
} as const

export type SitemapEntities = keyof typeof entities
export type EntityToType = {
    posts: TPost
    games: Game.IGame
    mysteryboxes: IMarketplaceToken.TBodyResponse
    nfts: IMarketplaceToken.TBodyResponse
    // challenges: Game.Challenge
}
export type EntitiesFunctionMap = FunctionMap<typeof entities, EntityToType>
export type EntitiesExtraMap = Partial<EntityMap<typeof entities, EntityToType, string>>
export type EntitiesNamespaceMap = Partial<Record<keyof typeof entities, TagAttribute[]>>

// This type insures that Entity to Type has types for all entities
// eslint-disable-next-line @typescript-eslint/no-unused-vars
type IsEntityToTypeExtendsAllEntities = Extending<SitemapEntities, EntityToType>

export const entityToLink = {
    games: ({ address }) => `/games/${address}`,
    nfts: ({ _id }) => `/nft/${_id}`,
    posts: ({ address,category }) =>{ return category === 'all'? `/blog/${address}`: `/blog/${category}/${address}` },
} satisfies EntitiesFunctionMap

export const entityToExtra = {
    games: () => toTag("lastmod", new Date().toISOString()),
    nfts: () => toTag("lastmod", new Date().toISOString()),
    posts: (value) => toNews(value.title, value.datePublication)
    // eslint-disable-next-line prettier/prettier
} satisfies EntitiesExtraMap

export const entityToNamespaces = {
    posts: [["xmlns:news", "http://www.google.com/schemas/sitemap-news/0.9"]]
    // eslint-disable-next-line prettier/prettier
} satisfies EntitiesNamespaceMap

export const entityToRequest = {
    games: {
        method: "post",
        url: "/api/v1/game",
        params: {
            updatedAt: "DESC"
        }
    },
    nfts: {
        method: "post",
        url: "/api/v1/marketplace/token",
        params: {
            resolution: "TOKEN_ERC721"
            , sort: { updatedAt: "DESC" }
        }
    },
    posts: {
        method: "get",
        url: "/api/v1/leading/blog",
        params: {
            updatedAt: "DESC"
        }
    }
} satisfies RequestMap<SitemapEntities>


export const requestEntity = async <T extends unknown>(request: EntityRequest, page: number, limit?: number, offset: number = 0): Promise<AxiosResponse<Core.PaginatedResponse<T>>> => {
    const paginationPrams = {
        offset: page * perSitemapPage + offset,
        limit: limit ?? entitiesPerRequest,
    }

    if (request.method === "get")
        return axios.get<Core.PaginatedResponse<T>>(
            request.url,
            {
                baseURL: process.env.NEXT_PUBLIC_API_URL,
                params: {
                    ...request.params,
                    ...paginationPrams
                },
            }
        )

    return axios.post<Core.PaginatedResponse<T>>(
        request.url,
        request.params,
        {
            baseURL: process.env.NEXT_PUBLIC_API_URL,
            params: paginationPrams,
        }
    )
}

export const wait = (time: number): Promise<void> =>
    new Promise((resolve) => {
        setTimeout(() => {
            resolve();
        }, time);
    });


const threshold = 5;

/**
 * Checks if rate limit reached threshold, and if so waits till rate limit resets
 * @param headers Axios headers object from response object
 */
export const checkAndWait = async (headers: AxiosResponseHeaders): Promise<void> => {
    const remaining = parseFloat(headers["x-ratelimit-remaining"]);
    const resetAt = parseFloat(headers["x-ratelimit-reset"]);

    if (remaining < threshold) await wait(resetAt * 1000)
};


export const toTag = (name: string, content: string | string[], attributes?: TagAttribute[]): string =>
    `<${name}${attributes?.length ? " " : ""}${attributes?.map(([name, value]) => `${name}="${value}"`).join("\n") ?? ""
    }>${Array.isArray(content) ? content.join("\n") : content
    }</${name}>`

const linkToTag = (tag: string, link: string, extra?: string): string =>
    toTag(tag, [
        toTag("loc", `${EXTERNAL_DATA_URL}${link}`),
        extra
    ])


export const linkToUrl = linkToTag.bind(null, "url")
export const linkToSitemap = (link: string): string => linkToTag("sitemap", link, toTag("lastmod", new Date().toISOString()))

const xml = `<?xml version="1.0" encoding="UTF-8"?>\n`

export const wrapSitemap = (value: string, namespaces: TagAttribute[] = []): string => xml
    + toTag("urlset", value, [["xmlns", "http://www.sitemaps.org/schemas/sitemap/0.9"], ...namespaces])

export const wrapSitemapIndex = (value: string, namespaces: TagAttribute[] = []): string => xml
    + toTag("sitemapindex", value, [["xmlns", "http://www.sitemaps.org/schemas/sitemap/0.9"], ...namespaces])

export const toNews = (title: string, publicationDate: Date | number | string): string =>
    toTag("news:news", [
        toTag("news:publication", [
            toTag("news:name", "Arena Games News"),
            toTag("news:language", "en"),
        ]),
        toTag("news:publication_date", new Date(publicationDate).toISOString()),
        toTag("news:title", title),
    ])