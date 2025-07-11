/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import {
    FC,
    MutableRefObject,
    SetStateAction,
    useCallback,
    useEffect,
    useMemo,
    useRef,
    useState,
} from 'react'

import { flip } from '@floating-ui/react'
import {
    autoUpdate,
    offset,
    useClick,
    useDismiss,
    useFloating,
    useFloatingNodeId,
    useInteractions,
} from '@floating-ui/react-dom-interactions'
import { Country, countries } from 'countries-list'
import { useField } from 'formik'
import { CountryCode } from 'libphonenumber-js'
import ReactCountryFlag from 'react-country-flag'
import { NumberFormatValues, PatternFormat } from 'react-number-format'

import { SearchIcon } from 'components/svg/searchIcon'
import SelectIcon from 'components/svg/selectPhone'

export interface IInput {
    value?: string | number
    name: string
    onChange?: SetStateAction<any>
    min?: string
    max?: string
    defaultValue?: string
    type?: string | 'text' | 'number'
    disabled?: boolean
    error?: boolean
    placeholder?: string
}

export type PhoneInputPropsType = {
    name: string
    placeholder: string
    title?: string
    above?: boolean
    storageKey?: string
}

const defaultPhoneCountryChar = 'AD'

const PhoneInput: FC<PhoneInputPropsType> = ({ placeholder = '', above = false, name, title }) => {
    const [open, setOpen] = useState(false)
    const [countryChar, setCountryChar] = useState(defaultPhoneCountryChar)
    const [value, setValue] = useState('')
    const [, , phoneNumberHelpers] = useField(name)

    const initializeCountryCode = useCallback(() => {
        try {
            return (countries as Record<string, Country>)[countryChar].phone.split(',')[0]
        } catch (e) {
            return defaultPhoneCountryChar
        }
    }, [])

    const [countryCode, setCountryCode] = useState(initializeCountryCode)

    const nodeId = useFloatingNodeId()
    const { x, y, reference, floating, strategy, context } = useFloating({
        open,
        onOpenChange: setOpen,
        middleware: [offset({ mainAxis: 0, alignmentAxis: 0 }), flip()],
        nodeId,
        placement: 'bottom-start',
        whileElementsMounted: autoUpdate,
    })
    const { getReferenceProps, getFloatingProps } = useInteractions([
        useDismiss(context),
        useClick(context),
    ])

    const inputRef = useRef() as MutableRefObject<HTMLInputElement>
    const searchRef = useRef() as MutableRefObject<HTMLInputElement>

    const [searchRequest, setSearchRequest] = useState('')

    const mountedRef = useRef<boolean>(false)

    const filteredTokens = useMemo(
        () =>
            Object.keys(countries).filter(
                item =>
                    !searchRequest ||
                    item.toLowerCase().includes(searchRequest.toLowerCase()) ||
                    (countries as Record<string, Country>)[item].name
                        .toLowerCase()
                        .includes(searchRequest.toLowerCase()) ||
                    (countries as Record<string, Country>)[item].phone.includes(
                        searchRequest.replace('+', '')
                    )
            ),
        [searchRequest]
    )
    const onChangeInputValue = (values: NumberFormatValues): void => {
        setValue(values.value)
    }

    useEffect(() => {
        if (mountedRef.current) {
            setCountryCode((countries as Record<string, Country>)[countryChar].phone.split(',')[0])
        } else mountedRef.current = true
    }, [countryChar])

    useEffect(() => {
        if (value) phoneNumberHelpers.setValue(`+${countryCode}${value}`)
    }, [countryCode, value])

    return (
        <div className="mb-5">
            {title && (
                <label htmlFor={name} className="mb-2 text-sm 2xs:text-custom-base">
                    {title}
                </label>
            )}
            <div className="relative rounded-2xl border border-transparent bg-base-800 outline-none transition-colors duration-200">
                <div className="relative isolate grid grid-cols-[max-content_1fr]">
                    <button
                        type="button"
                        {...getReferenceProps({ ref: reference })}
                        onClick={() => setOpen(true)}
                        className="country-select-button flex items-center rounded-l-md py-2.5 pl-4 pr-1 outline-none"
                    >
                        <ReactCountryFlag
                            className="mr-1"
                            countryCode={countryChar}
                            style={{ height: '1em', width: 'auto' }}
                            svg
                        />
                        <SelectIcon />
                    </button>
                    <div className="-z-10 flex w-full items-center rounded-r-lg py-2.5 pr-4 pl-2">
                        <div className="mr-2">+{countryCode}</div>
                        <div
                            id="phone-input-container"
                            className="flex w-full items-center justify-between"
                        >
                            <PatternFormat
                                name={name}
                                id={name}
                                placeholder={placeholder}
                                format="##########"
                                getInputRef={
                                    // @ts-ignore
                                    // eslint-disable-next-line no-return-assign
                                    elm => (inputRef.current = elm)
                                }
                                className="pointer-events-auto mr-4 w-full bg-transparent outline-none"
                                onValueChange={onChangeInputValue}
                                value={value}
                            />
                        </div>
                    </div>
                </div>
                {open && (
                    <div
                        {...getFloatingProps({
                            ref: floating,
                            style: {
                                position: strategy,
                                top: y ?? 0,
                                left: x ?? 0,
                            },
                        })}
                        className="z-10 w-full py-2"
                    >
                        <div
                            className={`${
                                above ? 'above-2 row-min-fr-1' : 'row-min-1-fr'
                            } row-min-1-fr group z-20 max-h-56 w-full overflow-hidden rounded bg-base-800`}
                        >
                            <div className="shadow-bottom">
                                <div className="area-input relative ">
                                    <input
                                        ref={searchRef}
                                        value={searchRequest}
                                        onChange={e => setSearchRequest(e.target.value)}
                                        className="w-full bg-transparent p-4 pl-12 outline-none"
                                        placeholder="Search for countries"
                                    />
                                    <SearchIcon className="absolute left-5 top-1/2 -translate-y-1/2 text-base-100" />
                                </div>
                                <div className="h-px w-full bg-base-700" />
                            </div>
                            <ul className="area-items scroll scrollbar h-full w-full overflow-y-auto">
                                {filteredTokens.map((item, index) => (
                                    <li
                                        key={item}
                                        className={`flex w-full cursor-pointer items-center px-4 py-3 transition-colors hover:bg-base-700 ${
                                            index === 1 ? 'bg-blue-5' : 'bg-transparent'
                                        } text-2xl.1 ${
                                            countryChar === item
                                                ? 'text-secondary'
                                                : 'text-theme-black'
                                        }`}
                                        onClick={() => {
                                            setOpen(false)
                                            setCountryChar(item as CountryCode)
                                        }}
                                    >
                                        <ReactCountryFlag
                                            countryCode={item}
                                            style={{ height: '0.75rem', width: 'auto' }}
                                            svg
                                        />
                                        <div className="ml-2 flex w-full justify-between text-base">
                                            <div>
                                                {(countries as Record<string, Country>)[item].name}
                                            </div>
                                            <div>
                                                +
                                                {
                                                    (countries as Record<string, Country>)[
                                                        item
                                                    ].phone.split(',')[0]
                                                }
                                            </div>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default PhoneInput
