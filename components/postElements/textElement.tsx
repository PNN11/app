import { CSSProperties, FC } from 'react'

import { RenderFunction } from './postElements-types'

import { Text } from 'common-types/richText'

type TextElementProps = Text & RenderFunction

const Element = ({
    classNames,
    styles,
    text,
}: {
    styles: CSSProperties
    classNames: string[]
    text: string
}): JSX.Element => (
    <span style={styles} className={`${classNames.join(' ')}`}>
        {text}
    </span>
)

const TextElement: FC<TextElementProps> = ({
    text,
    bold,
    code,
    italic,
    strikethrough,
    underline,
    children,
    renderFunction,
}) => {
    if (children)
        return <div className="my-2 text-xl font-normal">{children.map(renderFunction)}</div>

    if (text === '') return <div className="h-6" />

    const classNames = []
    const styles: CSSProperties = {}

    if (bold) classNames.push('font-semibold')
    if (italic) classNames.push('italic')
    if (strikethrough) styles.textDecoration = 'line-through'
    if (underline) styles.textDecoration = `${styles.textDecoration ?? ''} underline`

    if (code)
        return (
            <code>
                <Element classNames={classNames} styles={styles} text={text} />
            </code>
        )

    return <Element classNames={classNames} styles={styles} text={text} />
}

export default TextElement
