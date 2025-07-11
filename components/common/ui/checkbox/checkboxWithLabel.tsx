import { ReactNode } from 'react'

import { Checkbox } from 'components/common/ui/checkbox/checkbox'

type PropsType<T> = {
    children: ReactNode
    className?: string
    onClick: (value: T) => void
    value: T
    checked: boolean
    id: string
}

type CheckboxWithLabelType = <T = unknown>(props: PropsType<T>) => JSX.Element

export const CheckboxWithLabel: CheckboxWithLabelType = ({
    children,
    className,
    checked,
    onClick,
    value,
    id,
}) => {
    return (
        <label htmlFor={id} className={`${className} flex items-center gap-2 py-3`}>
            <Checkbox
                onChange={() => onClick(value)}
                checked={checked}
                onKeyDown={e => e.key === 'Enter' && onClick(value)}
                id={id}
            />
            <div className="w-full">{children}</div>
        </label>
    )
}
