/* eslint-disable react/no-unstable-nested-components */
import { DetailedHTMLProps, forwardRef, InputHTMLAttributes } from 'react'

import Input from 'components/marketplace/filter/input'
import RemoveSvg from 'components/svg/removeSvg'
import { SearchIcon } from 'components/svg/searchIcon'

type DefaultInputPropsType = DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
>
type PropsType = DefaultInputPropsType & {
    value: string
    setValue: (value: string) => void
    name: string
}

export const SearchInput = forwardRef<HTMLInputElement, PropsType>(
    ({ className, value, setValue, name, ...restProps }, ref) => {
        return (
            <div className={`${className} `}>
                <Input
                    {...restProps}
                    name={name}
                    ref={ref}
                    value={value}
                    className="h-10 px-9"
                    setValue={setValue}
                    Before={() => (
                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 focus-within:left-[0.625rem]">
                            <SearchIcon />
                        </div>
                    )}
                    After={
                        value
                            ? () => (
                                  <button
                                      type="button"
                                      className="absolute inset-y-0 right-4"
                                      onClick={() => setValue('')}
                                  >
                                      <RemoveSvg />
                                  </button>
                              )
                            : undefined
                    }
                />
            </div>
        )
    }
)
