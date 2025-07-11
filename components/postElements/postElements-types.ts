import { Core } from 'common-types/core'
import { Children, TListItem } from 'common-types/richText'

type TKeyword = {
    word: string
    id: string
}

type TSeoPost = {
    title?: string
    metaDescription?: string
    keywords?: TKeyword[]
}

export type TPreviewLink = {
    link?: string
    newWindow?: boolean
}

export type TPost = {
    id: string
    title: string
    category: string
    address: string
    description?: string
    preview: string
    content?: Children[]
    createdAt: number
    datePublication: number
    previewAltText?: string
    seo: TSeoPost
    previewLink?: TPreviewLink
    isVisible: boolean
    status: 'draft' | 'published'
}

export type TMainPost = {
    article: Omit<TPost, 'createdAt' | 'preview'> & { createdAt: string; preview: Core.Media }
    banner: Core.Media
}

export type MainPostResponse = TMainPost[]

export type BlogPostsResponse = TPost[]

export type NodeToElementFunction = (node: Children | TListItem, index?: number) => JSX.Element

export type RenderFunction = {
    renderFunction: NodeToElementFunction
}
