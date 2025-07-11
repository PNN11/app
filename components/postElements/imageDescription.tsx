import { FC } from 'react'

import { RenderFunction } from './postElements-types'

import { TImageDescription } from 'common-types/richText'

type ImageDescriptionProps = TImageDescription & RenderFunction

const ImageDescription: FC<ImageDescriptionProps> = ({ children, renderFunction }) => {
    return (
        <div className="my-2 text-center text-base font-medium text-base-300">
            {children.map(renderFunction)}
        </div>
    )
}

export default ImageDescription
