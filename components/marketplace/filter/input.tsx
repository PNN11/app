import { forwardRef, InputHTMLAttributes } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    value: string
    setValue: (value: string) => void
    Before?: () => JSX.Element
    After?: () => JSX.Element
}

const leadingZeros = /^0+(?=\d+(\.\d+)?$)/

const Input = forwardRef<HTMLInputElement, InputProps>(
    ({ placeholder, setValue, value, className, name, Before, After, ...props }, ref) => {
        return (
            <label htmlFor={name} className="relative w-full">
                {Before ? <Before /> : null}
                <input
                    {...props}
                    ref={ref}
                    id={name}
                    placeholder={placeholder}
                    value={value}
                    onChange={e => {
                        if (props.type === 'number') {
                            setValue(e.target.value.replace(leadingZeros, ''))

                            return
                        }
                        setValue(e.target.value)
                    }}
                    className={`w-full rounded-2xl bg-transparent px-4 py-3 shadow-input transition-all duration-300
                        hover:shadow-input-hover focus:shadow-active focus:placeholder:text-transparent ${className}`}
                />
                {After ? <After /> : null}
            </label>
        )
    }
)

export default Input
