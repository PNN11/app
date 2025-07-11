import { FC } from 'react'

import Image from 'next/image'

import { RenderFunction } from './postElements-types'

import { Upload } from 'common-types/richText'
import { ConditionalLink } from 'components/common/ui/conditionalLink'

type PictureProps = Upload & RenderFunction

const Picture: FC<PictureProps> = ({ value: { id }, fields }) => {
    return (
        <div className="my-2">
            <ConditionalLink
                condition={!!fields?.link}
                href={fields?.link}
                target={fields?.newWindow ? '_blank' : '_self'}
                className="block"
            >
                <Image
                    src={`${process.env.NEXT_PUBLIC_API_URL}/api/v1/img/view-by-id/${id}`}
                    width={1440}
                    height={500}
                    alt={fields?.alt ?? ''}
                    className=""
                />
            </ConditionalLink>
        </div>
    )
}

export default Picture
