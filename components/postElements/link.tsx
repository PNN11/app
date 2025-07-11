import { FC } from 'react'

import Link from 'next/link'

import { RenderFunction } from './postElements-types'

import { TLink } from 'common-types/richText'

type PostLinkElementProps = TLink & RenderFunction

const PostLinkElement: FC<PostLinkElementProps> = ({ children, url, newTab, renderFunction }) => {
    return (
        <Link className="text-link underline" href={url} target={newTab ? '_blank' : '_self'}>
            {children.map(renderFunction)}
        </Link>
    )
}

export default PostLinkElement
