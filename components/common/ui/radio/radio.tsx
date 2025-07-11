import {
    ChangeEvent,
    DetailedHTMLProps,
    FC,
    HTMLAttributes,
    InputHTMLAttributes,
    ReactNode,
} from 'react'

import RadioSvg from 'components/svg/radioSvg'

export type OptionsType = {
    title: string
    value: string | number
    icon: string
}
type DefaultRadioPropsType = DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
>
type DefaultSpanPropsType = DetailedHTMLProps<HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>

export type RadioPropsType = Omit<DefaultRadioPropsType, 'type'> & {
    name: string
    options: OptionsType[]
    onChangeOption?: (option: any) => void
    spanProps?: DefaultSpanPropsType
    itemToLabel: (item: OptionsType, isSelected: boolean) => ReactNode
}
const Radio: FC<RadioPropsType> = ({
    name,
    className,
    options,
    value,
    onChange,
    onChangeOption,
    itemToLabel,
    ...restProps
}) => {
    const onChangeCallback = (e: ChangeEvent<HTMLInputElement>): void => {
        onChange?.(e)
        onChangeOption?.(e.currentTarget.value)
    }

    return (
        <div className="flex flex-col items-start gap-2">
            {options.map(o => {
                const isSelected = o.value.toString() === value

                return (
                    <label
                        htmlFor={o.value + name}
                        key={`${name}-${o.value}`}
                        className="flex cursor-pointer items-center gap-1"
                    >
                        <input
                            id={o.value + name}
                            className={`${className} hidden`}
                            type="radio"
                            name={name}
                            checked={isSelected}
                            value={o.value}
                            onChange={onChangeCallback}
                            {...restProps}
                        />
                        <RadioSvg isSelected={isSelected} />
                        <div>{itemToLabel(o, isSelected)}</div>
                    </label>
                )
            })}
        </div>
    )
}

export default Radio
