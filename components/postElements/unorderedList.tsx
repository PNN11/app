import { FC } from 'react'

import { RenderFunction } from './postElements-types'

import { TUnorederedList } from 'common-types/richText'

type UnorderedListProps = TUnorederedList & RenderFunction

const UnorderedList: FC<UnorderedListProps> = ({ children, renderFunction }) => {
    return <ul className="my-2 list-inside list-disc pl-2">{children.map(renderFunction)}</ul>
}

export default UnorderedList
