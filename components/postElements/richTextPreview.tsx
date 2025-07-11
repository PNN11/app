import { FC } from 'react'

import Heading1 from './heading1'
import Heading2 from './heading2'
import Heading3 from './heading3'
import ImageDescription from './imageDescription'
import Indent from './indent'
import PostLinkElement from './link'
import ListItem from './listItem'
import OrderedList from './orderedList'
import Picture from './picture'
import { NodeToElementFunction, RenderFunction } from './postElements-types'
import TextElement from './textElement'
import UnorderedList from './unorderedList'

import { Children, TListItem, Elements, TTextElement, Text } from 'common-types/richText'

const componentsMap = new Map<
    Elements,
    FC<{ children: Text | Children[] | TTextElement[] | TListItem[] } & RenderFunction>
>([
    ['h1', Heading1],
    ['h2', Heading2],
    ['h3', Heading3],
    ['ol', OrderedList],
    ['ul', UnorderedList],
    ['li', ListItem],
    ['indent', Indent],
    ['link', PostLinkElement],
    ['upload', Picture],
    ['image-description', ImageDescription],
    ['p', TextElement],
    [undefined, TextElement],
])

interface RichTextPreniewProps {
    content: Children[]
}

export const nodeToElement: NodeToElementFunction = (node, index) => {
    const Component = componentsMap.get(node.type)

    if (!Component) return

    return (
        <Component renderFunction={nodeToElement} {...node} key={`${index}${node.type}`}>
            {node.children}
        </Component>
    )
}

const RichTextPreview: FC<RichTextPreniewProps> = ({ content }) => {
    return <div>{content.map(nodeToElement)}</div>
}

export default RichTextPreview
