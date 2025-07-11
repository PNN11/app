import { FC } from 'react'

import { RenderFunction } from './postElements-types'

import { TOrederedList } from 'common-types/richText'

type OrderedListProps = TOrederedList & RenderFunction

const OrderedList: FC<OrderedListProps> = ({ children, renderFunction }) => {
    return <ol className="my-2 list-inside list-decimal pl-2">{children.map(renderFunction)}</ol>
}

export default OrderedList
