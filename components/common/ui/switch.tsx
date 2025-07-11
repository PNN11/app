import { DetailedHTMLProps, FC, InputHTMLAttributes } from 'react'

export type DefaultInputPropsType = DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
>

type SwitchProps = DefaultInputPropsType & { label?: string }

const Switch: FC<SwitchProps> = ({ className, name, label = '', checked, ...props }) => {
    return (
        <div className="flex items-center justify-between gap-2.5">
            <label className="cursor-pointer" htmlFor={`${name}-switch`}>
                {label}
            </label>
            <div
                className={`relative inline-block h-5.25 w-10 cursor-pointer rounded-xl border 
                transition-all duration-300 content-[''] after:absolute after:top-0.5 after:inline-block after:h-3.75 after:w-3.75 after:rounded-full
                after:transition-all after:duration-300 ${
                    checked
                        ? 'border-link after:left-5.25 after:bg-link'
                        : 'border-base-300 after:left-0.5 after:bg-base-300'
                } ${className}`}
            >
                <input
                    {...props}
                    id={`${name}-switch`}
                    type="checkbox"
                    className="absolute inset-0 z-10 h-full w-full cursor-pointer opacity-0"
                />
            </div>
        </div>
    )
}

export default Switch
