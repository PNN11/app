import { FC } from 'react'

import { RenderFunction } from './postElements-types'

import { TListItem } from 'common-types/richText'

type ListItemProps = TListItem & RenderFunction

const ListItem: FC<ListItemProps> = ({ children, renderFunction }) => {
    const indentList = children[0].type === 'ol' || children[0].type === 'ul'

    return (
        <li className={`text-xl font-normal ${indentList ? 'first-child:pl-8' : ''}`}>
            {children.map(renderFunction)}
        </li>
    )
}

export default ListItem
