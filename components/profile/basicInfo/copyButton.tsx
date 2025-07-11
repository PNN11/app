import { FC } from 'react'

import CopyIcon from 'components/svg/copy'
import useCopyToClipboard from 'hooks/useCopyToClipboard'

interface ICopyButton {
    children: string
    value: string
    classes?: { text?: string; icon?: string }
    iconRight?: boolean
}

const CopyButton: FC<ICopyButton> = ({
    children,
    value,
    classes = {
        icon: '',
        text: '',
    },
    iconRight,
}) => {
    const [copy, copied] = useCopyToClipboard()

    return (
        <button
            type="button"
            className={`group flex items-center gap-x-2 text-gray-400 transition-none hover:text-cta ${
                copied ? 'text-cta' : 'text-gray-400'
            } ${iconRight && 'flex-row-reverse'}`}
            onClick={() => {
                copy(value)
            }}
        >
            <CopyIcon
                className={`transition-none group-hover:stroke-cta ${
                    copied ? 'stroke-cta' : classes.icon || 'stroke-gray-400'
                }`}
            />
            <p
                className={`${
                    copied ? 'capitalize text-cta' : `${classes.text}`
                } group-hover:text-cta`}
            >
                {copied ? 'copied' : children}
            </p>
        </button>
    )
}

export default CopyButton
